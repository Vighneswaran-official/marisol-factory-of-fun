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
          if (result && result.user) {
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
        if (firebaseUser) {
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

  public getClassmates(): StudentProfile[] {
    return this.classmates;
  }

  public getSavedAccounts(): StudentProfile[] {
    const list = [...this.classmates];
    if (this.currentUser && !list.some(a => a.id === this.currentUser?.id)) {
      list.unshift(this.currentUser);
    }
    // Ensure default core profiles exist
    if (!list.some(a => a.name.toLowerCase().includes('kritika'))) {
      list.unshift({
        id: 'user_kritika_main',
        name: 'Kritika Verma 👑',
        email: 'kritika.verma@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        batch: 'MLP41PT',
        currentMood: 'Radiant Sunshine 🌸',
        currentMoodEmoji: '🌸',
        statusNote: 'Queen of Factory of Fun ♡',
        lastUpdated: 'Just now',
        isGoogleVerified: true,
        loginMethod: 'google'
      });
    }
    if (!list.some(a => a.name.toLowerCase().includes('vighneswaran'))) {
      list.push({
        id: 'user_vighneswaran_main',
        name: 'Vighneswaran',
        email: 'vighneswaran@gmail.com',
        avatarUrl: '/marisol/avatars/01_brighter_ideas.png',
        batch: 'MLP41PT',
        currentMood: 'Chai Enthusiast ☕',
        currentMoodEmoji: '☕',
        statusNote: 'Batch 41 Admin',
        lastUpdated: 'Just now',
        isGoogleVerified: true,
        loginMethod: 'google'
      });
    }
    return list;
  }

  public switchAccount(userId: string): StudentProfile | null {
    const accounts = this.getSavedAccounts();
    const target = accounts.find(a => a.id === userId);
    if (target) {
      this.currentUser = target;
      this.saveUserToStorage();
      this.notify();
      return target;
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
   * Uses signInWithPopup on Desktop, and signInWithRedirect on Mobile browsers
   */
  public async signInWithFirebaseGoogle(forceRedirect: boolean = false): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase authentication is not configured yet.' };
    }

    try {
      const isMobile = forceRedirect || isMobileBrowser();
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
        return { success: true };
      } else {
        const userCredential = await signInWithPopup(auth, googleProvider);
        if (userCredential.user) {
          this.handleFirebaseUserLogin(userCredential.user, 'google');
          return { success: true, user: this.currentUser || undefined };
        }
        return { success: false, error: 'No user credential received from Google.' };
      }
    } catch (err: any) {
      console.error('[Auth] Real Firebase Google Sign-In Error:', err);
      let errorMsg = 'Google sign-in could not complete.';

      if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in was cancelled (popup window closed).';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMsg = 'Domain not authorized. In Firebase Console → Authentication → Settings, add this domain to Authorized Domains.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        errorMsg = err.message;
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
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const authService = new AuthService();
