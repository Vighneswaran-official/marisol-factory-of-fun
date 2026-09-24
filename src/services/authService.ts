// Google & Phone Authentication Service with Real Firebase OAuth (Spec v2)
import { gameState } from './gameState';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  firebaseSignOut, 
  onAuthStateChanged, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  isFirebaseConfigured, 
  db, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  type FirebaseUser,
  type ConfirmationResult
} from './firebase';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  batch: string; // e.g. "MLP41PT"
  currentMood: string;
  currentMoodEmoji: string;
  statusNote: string;
  lastUpdated: string;
  isGoogleVerified: boolean;
  loginMethod?: 'google' | 'phone_otp';
}

const AUTH_STORAGE_KEY = 'marisol_google_auth_v2';
const CLASSMATES_STORAGE_KEY = 'marisol_batch_classmates_v2';

export const isMobileBrowser = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;
};

/**
 * Format human-readable Student Name from email address.
 * e.g. "kritika.singh@gmail.com" -> "Kritika Singh"
 */
export const formatNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return '';
  const username = email.split('@')[0].trim();
  if (!username) return 'Student';

  const cleaned = username
    .replace(/[._\-+]/g, ' ')
    .replace(/([a-zA-Z]+)(\d+)/g, '$1 $2')
    .trim();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'Student';

  const formatted = parts
    .map(p => {
      if (/^\d+$/.test(p) && parts.some(item => /[a-zA-Z]/.test(item))) return '';
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    })
    .filter(Boolean)
    .join(' ');

  return formatted || 'Student';
};

class AuthService {
  private currentUser: StudentProfile | null = null;
  private classmates: StudentProfile[] = [];
  private listeners: Set<() => void> = new Set();
  public isFirebaseEnabled = isFirebaseConfigured;
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();
    this.initFirebaseListeners();
  }

  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_classmates_v1');
      localStorage.removeItem('marisol_google_auth_v1');
    } catch {}
  }

  private initFirebaseListeners() {
    if (auth) {
      // 1. Check for Mobile Redirect Sign-In Result on Boot (Essential for mobile browsers)
      getRedirectResult(auth)
        .then((result) => {
          if (result && result.user && !result.user.isAnonymous) {
            this.handleFirebaseUserLogin(result.user, 'google');
          }
        })
        .catch((err) => {
          if (err?.code !== 'auth/null-user') {
            console.warn('[Auth] getRedirectResult notice:', err?.message || err);
          }
        });

      // 2. Regular Auth State Change
      onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser && !firebaseUser.isAnonymous) {
          this.handleFirebaseUserLogin(firebaseUser, firebaseUser.phoneNumber ? 'phone_otp' : 'google');
        }
      });
    }

    // 3. Realtime Firestore sync for logged-in batch members
    if (db) {
      try {
        const studentsCol = collection(db, 'students');
        onSnapshot(studentsCol, (snapshot) => {
          const remoteStudents: StudentProfile[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as StudentProfile;
            if (!['user_aarav', 'user_pooja', 'user_rohan', 'user_meera'].includes(d.id)) {
              remoteStudents.push(data);
            }
          });

          const map = new Map<string, StudentProfile>();
          remoteStudents.forEach(c => map.set(c.id, c));
          if (this.currentUser) map.set(this.currentUser.id, this.currentUser);
          this.classmates = Array.from(map.values());
          this.saveClassmatesToStorage();
          this.notify();
        }, (err) => {
          console.warn('Firestore students sync error:', err);
        });
      } catch (err) {
        console.warn('Firestore sync setup error:', err);
      }
    }
  }

  private handleFirebaseUserLogin(firebaseUser: FirebaseUser, method: 'google' | 'phone_otp' = 'google') {
    const emailName = firebaseUser.email ? formatNameFromEmail(firebaseUser.email) : '';
    const resolvedName = firebaseUser.displayName && !['Google Student', 'Student'].includes(firebaseUser.displayName)
      ? firebaseUser.displayName
      : (emailName || (firebaseUser.phoneNumber ? `Student (${firebaseUser.phoneNumber.slice(-4)})` : 'Batch 41 Member'));

    const profile: StudentProfile = {
      id: firebaseUser.uid,
      name: resolvedName,
      email: firebaseUser.email || (firebaseUser.phoneNumber ? `${firebaseUser.phoneNumber}@mobile.auth` : ''),
      phone: firebaseUser.phoneNumber || undefined,
      avatarUrl: firebaseUser.photoURL || '/marisol/avatars/01_brighter_ideas.png',
      batch: 'MLP41PT',
      currentMood: this.currentUser?.currentMood || 'Radiant Sunshine 🌸',
      currentMoodEmoji: this.currentUser?.currentMoodEmoji || '🌸',
      statusNote: this.currentUser?.statusNote || 'Connected via Google Auth ♡',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: method
    };

    this.currentUser = profile;
    this.saveUserToStorage();
    this.syncClassmateList(profile);
    this.syncWithFirestore(profile);
    this.notify();
  }

  private loadFromStorage() {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }

      const storedClassmates = localStorage.getItem(CLASSMATES_STORAGE_KEY);
      if (storedClassmates) {
        const parsed: StudentProfile[] = JSON.parse(storedClassmates);
        this.classmates = parsed.filter(c => !['user_aarav', 'user_pooja', 'user_rohan', 'user_meera'].includes(c.id));
      } else {
        this.classmates = [];
        this.saveClassmatesToStorage();
      }
    } catch {
      this.currentUser = null;
      this.classmates = [];
    }
  }

  private saveUserToStorage() {
    try {
      if (this.currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }

  private saveClassmatesToStorage() {
    try {
      localStorage.setItem(CLASSMATES_STORAGE_KEY, JSON.stringify(this.classmates));
    } catch {}
  }

  private syncClassmateList(user: StudentProfile) {
    const existingIdx = this.classmates.findIndex(c => (user.email && c.email.toLowerCase() === user.email.toLowerCase()) || c.id === user.id);
    if (existingIdx >= 0) {
      this.classmates[existingIdx] = user;
    } else {
      this.classmates.unshift(user);
    }
    this.saveClassmatesToStorage();

    const currentP = gameState.getPlayer();
    if (user.name && user.name !== currentP.nickname) {
      currentP.nickname = user.name;
      gameState.savePlayer(currentP);
    }
  }

  private async syncWithFirestore(profile: StudentProfile) {
    if (db) {
      try {
        const studentDoc = doc(db, 'students', profile.id);
        await setDoc(studentDoc, profile, { merge: true });
      } catch (err) {
        console.warn('Failed to sync student with Firestore:', err);
      }
    }
  }

  public getCurrentUser(): StudentProfile | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return Boolean(this.currentUser);
  }

  public isGoogleAuthenticated(): boolean {
    if (!this.currentUser) return false;
    return Boolean(
      this.currentUser.isGoogleVerified ||
      this.currentUser.loginMethod === 'google' ||
      (this.currentUser.email && this.currentUser.email.includes('@'))
    );
  }

  public getClassmates(): StudentProfile[] {
    return this.classmates;
  }

  public getSavedAccounts(): StudentProfile[] {
    // Single-user privacy: Return only current user or empty
    return this.currentUser ? [this.currentUser] : [];
  }

  public switchAccount(userId: string): StudentProfile | null {
    if (this.currentUser?.id === userId) {
      return this.currentUser;
    }
    return null;
  }

  public removeAccount(userId: string) {
    this.classmates = this.classmates.filter(c => c.id !== userId);
    this.saveClassmatesToStorage();
    if (this.currentUser?.id === userId) {
      this.currentUser = this.classmates[0] || null;
      this.saveUserToStorage();
    }
    this.notify();
  }

  public formatEmailName(email: string): string {
    return formatNameFromEmail(email);
  }

  /**
   * Multi-User: Add or Login Student / Google Profile
   */
  public loginStudentProfile(name: string, email?: string): StudentProfile {
    const trimmed = name.trim() || 'Batch 41 Student';
    const isKritika = trimmed.toLowerCase().includes('kritika') || trimmed.toLowerCase().includes('marisol');
    const existing = this.classmates.find(c => 
      (email && c.email.toLowerCase() === email.toLowerCase()) || 
      c.name.toLowerCase() === trimmed.toLowerCase()
    );

    const profile: StudentProfile = existing || {
      id: `student_${Date.now()}`,
      name: isKritika && !trimmed.includes('👑') ? `${trimmed} 👑` : trimmed,
      email: email || `${trimmed.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      avatarUrl: isKritika ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' : '/marisol/avatars/01_brighter_ideas.png',
      batch: 'MLP41PT',
      currentMood: this.currentUser?.currentMood || 'Radiant Sunshine 🌸',
      currentMoodEmoji: this.currentUser?.currentMoodEmoji || '🌸',
      statusNote: isKritika ? 'Queen of Factory of Fun ♡' : 'Active in Batch 41 Comfort Hub ✨',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: 'google'
    };

    this.currentUser = profile;
    this.saveUserToStorage();
    this.syncClassmateList(profile);
    this.syncWithFirestore(profile);
    this.notify();
    return profile;
  }

  /**
   * 100% Real Firebase Google Sign-In Flow
   * Uses popup-first strategy across desktop and mobile, with seamless redirect fallback
   */
  public async signInWithFirebaseGoogle(forceRedirect: boolean = false): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase authentication is not configured yet.' };
    }

    if (forceRedirect) {
      try {
        await signInWithRedirect(auth, googleProvider);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Redirect sign-in failed.' };
      }
    }

    try {
      // Primary: signInWithPopup keeps user on the same page/route without full refresh
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (userCredential.user) {
        this.handleFirebaseUserLogin(userCredential.user, 'google');
        return { success: true, user: this.currentUser || undefined };
      }
      return { success: false, error: 'No user credential received from Google.' };
    } catch (popupErr: any) {
      console.warn('[Auth] Google Popup notice:', popupErr?.code || popupErr);
      
      // If popup was blocked by mobile browser, gracefully fallback to redirect
      if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return { success: true };
        } catch (redirectErr: any) {
          return { success: false, error: redirectErr.message || 'Redirect sign-in failed.' };
        }
      }

      let errorMsg = 'Google sign-in could not complete.';
      if (popupErr.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in was cancelled (popup window closed).';
      } else if (popupErr.code === 'auth/unauthorized-domain') {
        errorMsg = 'Domain not authorized. Please add this domain to Firebase Console → Authentication → Authorized Domains.';
      } else if (popupErr.code === 'auth/network-request-failed') {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (popupErr.message) {
        errorMsg = popupErr.message;
      }

      return { success: false, error: errorMsg };
    }
  }

  /**
   * Secondary Sign-In: Firebase Phone / OTP Auth
   */
  public async sendPhoneOtp(phoneNumber: string, containerId: string): Promise<{ success: boolean; confirmationResult?: ConfirmationResult; error?: string }> {
    if (!auth) {
      return { success: false, error: 'Firebase Auth is not initialized.' };
    }

    try {
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
          size: 'invisible'
        });
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, this.recaptchaVerifier);
      return { success: true, confirmationResult };
    } catch (err: any) {
      console.error('[Auth] Phone OTP Error:', err);
      return { success: false, error: err.message || 'Failed to send OTP to mobile phone.' };
    }
  }

  public async confirmPhoneOtp(confirmationResult: ConfirmationResult, code: string): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    try {
      const credential = await confirmationResult.confirm(code);
      if (credential.user) {
        this.handleFirebaseUserLogin(credential.user, 'phone_otp');
        return { success: true, user: this.currentUser || undefined };
      }
      return { success: false, error: 'Invalid verification code.' };
    } catch (err: any) {
      console.error('[Auth] Confirm OTP Error:', err);
      return { success: false, error: err.message || 'Invalid verification code. Please try again.' };
    }
  }

  public updateDailyMood(moodLabel: string, moodEmoji: string, statusNote?: string) {
    if (!this.currentUser) return;
    this.currentUser.currentMood = moodLabel;
    this.currentUser.currentMoodEmoji = moodEmoji;
    if (statusNote !== undefined) {
      this.currentUser.statusNote = statusNote;
    }
    this.currentUser.lastUpdated = 'Just now';
    this.saveUserToStorage();
    this.syncClassmateList(this.currentUser);
    this.syncWithFirestore(this.currentUser);
    this.notify();
  }

  public updateProfile(data: {
    name?: string;
    avatarUrl?: string;
    batch?: string;
    currentMood?: string;
    currentMoodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    if (!this.currentUser) {
      const defaultName = data.name?.trim() || 'Batch 41 Student';
      this.currentUser = {
        id: `student_${Date.now()}`,
        name: defaultName,
        email: `${defaultName.toLowerCase().replace(/\s+/g, '.')}@mlp41.edu`,
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        batch: data.batch || 'MLP41PT',
        currentMood: data.currentMood || 'Radiant Sunshine 🌸',
        currentMoodEmoji: data.currentMoodEmoji || '🌸',
        statusNote: data.statusNote || 'Savoring sweet memories ♡ ✨',
        lastUpdated: 'Just now',
        isGoogleVerified: false
      };
    } else {
      if (data.name) this.currentUser.name = data.name.trim();
      if (data.avatarUrl) this.currentUser.avatarUrl = data.avatarUrl;
      if (data.batch) this.currentUser.batch = data.batch.trim();
      if (data.currentMood) this.currentUser.currentMood = data.currentMood;
      if (data.currentMoodEmoji) this.currentUser.currentMoodEmoji = data.currentMoodEmoji;
      if (data.statusNote !== undefined) this.currentUser.statusNote = data.statusNote;
      this.currentUser.lastUpdated = 'Just now';
    }

    this.saveUserToStorage();
    this.syncClassmateList(this.currentUser);
    this.syncWithFirestore(this.currentUser);
    this.notify();
    return this.currentUser;
  }

  public async signOut(): Promise<void> {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    this.currentUser = null;
    this.saveUserToStorage();
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const authService = new AuthService();
