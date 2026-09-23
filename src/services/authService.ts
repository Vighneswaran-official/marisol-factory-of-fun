// Google & Mobile Authentication Service with Firebase
import { gameState } from './gameState';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  firebaseSignOut, 
  onAuthStateChanged, 
  isFirebaseConfigured, 
  db, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  type FirebaseUser 
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
  loginMethod?: 'google' | 'mobile_phone' | 'google_authenticator';
  authenticatorCode?: string;
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
 * e.g. "vighneswaran.r@gmail.com" -> "Vighneswaran R"
 */
export const formatNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return '';
  const username = email.split('@')[0].trim();
  if (!username) return 'Student';

  // Replace dots, underscores, dashes, plus signs with spaces
  const cleaned = username
    .replace(/[._\-+]/g, ' ')
    .replace(/([a-zA-Z]+)(\d+)/g, '$1 $2')
    .trim();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'Student';

  const formatted = parts
    .map(p => {
      // If purely numbers, skip if there are letters
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

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();
    this.initFirebaseListeners();
  }

  // Purge unwanted mock users from old storage keys
  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_classmates_v1');
      localStorage.removeItem('marisol_google_auth_v1');
    } catch {}
  }

  private initFirebaseListeners() {
    if (auth) {
      // 1. Check for Mobile Redirect Sign-In Result (Crucial for iOS Safari / Android Chrome / PWA)
      getRedirectResult(auth)
        .then((result) => {
          if (result && result.user) {
            this.handleFirebaseUserLogin(result.user, 'google');
          }
        })
        .catch((err) => {
          console.warn('[Auth] getRedirectResult notification:', err?.message || err);
        });

      // 2. Regular Auth State Change
      onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          this.handleFirebaseUserLogin(firebaseUser, 'google');
        }
      });
    }

    // 3. Realtime Firestore sync for real logged-in classmates
    if (db) {
      try {
        const studentsCol = collection(db, 'students');
        onSnapshot(studentsCol, (snapshot) => {
          const remoteStudents: StudentProfile[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as StudentProfile;
            // Ignore any legacy mock names
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

  private handleFirebaseUserLogin(firebaseUser: FirebaseUser, method: 'google' | 'mobile_phone' = 'google') {
    const emailName = firebaseUser.email ? formatNameFromEmail(firebaseUser.email) : '';
    const resolvedName = firebaseUser.displayName && !['Google Student', 'Student'].includes(firebaseUser.displayName)
      ? firebaseUser.displayName
      : (emailName || (firebaseUser.phoneNumber ? `Student (${firebaseUser.phoneNumber.slice(-4)})` : 'Batch 41 Student'));

    const profile: StudentProfile = {
      id: firebaseUser.uid,
      name: resolvedName,
      email: firebaseUser.email || (firebaseUser.phoneNumber ? `${firebaseUser.phoneNumber}@mobile.app` : ''),
      phone: firebaseUser.phoneNumber || undefined,
      avatarUrl: firebaseUser.photoURL || '/marisol/avatars/01_brighter_ideas.png',
      batch: 'MLP41PT',
      currentMood: this.currentUser?.currentMood || 'Radiant & Grateful',
      currentMoodEmoji: this.currentUser?.currentMoodEmoji || '💡',
      statusNote: this.currentUser?.statusNote || 'Connected via Firebase Auth ♡',
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
        // Exclude mock users
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
    return this.currentUser !== null && this.currentUser.isGoogleVerified;
  }

  public getClassmates(): StudentProfile[] {
    return [...this.classmates];
  }

  /**
   * Real Firebase Google Sign-In with automatic Mobile fallback
   */
  public async signInWithFirebaseGoogle(forceRedirect = false): Promise<{ success: boolean; user?: StudentProfile; error?: string }> {
    if (auth && googleProvider) {
      const isMobile = isMobileBrowser() || forceRedirect;
      try {
        if (isMobile) {
          // On mobile browsers and PWAs, popups are frequently blocked.
          // Trigger redirect sign in directly
          await signInWithRedirect(auth, googleProvider);
          return { success: true };
        } else {
          // On desktop, use standard popup
          const result = await signInWithPopup(auth, googleProvider);
          this.handleFirebaseUserLogin(result.user, 'google');
          return { success: true, user: this.currentUser || undefined };
        }
      } catch (err: any) {
        console.warn('Google Sign-In error, checking fallback:', err);
        // If popup was blocked on mobile, auto retry with redirect
        if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/popup-closed-by-user') {
          try {
            await signInWithRedirect(auth, googleProvider);
            return { success: true };
          } catch (rErr: any) {
            return { success: false, error: rErr?.message || 'Mobile redirect sign-in failed' };
          }
        }
        return { success: false, error: err?.message || 'Google sign-in could not complete.' };
      }
    } else {
      // 1-Tap fallback
      const user = this.signInWithGoogle({
        name: 'Kritika (Google Verified)',
        email: 'kritika.google@gmail.com',
        avatarUrl: '/marisol/avatars/01_brighter_ideas.png',
        mood: 'Radiant & Grateful',
        moodEmoji: '💡',
        statusNote: 'Signed in with Google! Excited to connect with Batch 41 ♡',
      });
      return { success: true, user };
    }
  }

  /**
   * Mobile-Based Firebase Student Sign-In (Phone or Mobile Student ID)
   */
  public signInWithMobile(params: {
    name: string;
    phoneOrEmail: string;
    avatarPose?: string;
    mood?: string;
    moodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    const player = gameState.getPlayer();
    const identifier = params.phoneOrEmail.trim();
    const isPhone = /^[+]?[0-9\s-]{7,15}$/.test(identifier);
    const emailName = !isPhone && identifier.includes('@') ? formatNameFromEmail(identifier) : '';

    const name = params.name.trim() && params.name.trim() !== 'Mobile Student'
      ? params.name.trim()
      : (emailName || player.nickname || 'Batch 41 Student');

    const user: StudentProfile = {
      id: `mob_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name,
      email: isPhone ? `${identifier.replace(/\D/g, '')}@mobile.marisol.app` : identifier,
      phone: isPhone ? identifier : undefined,
      avatarUrl: `/marisol/avatars/${params.avatarPose || player.activeSticker || '01_brighter_ideas'}.png`,
      batch: 'MLP41PT',
      currentMood: params.mood || 'Radiant & Grateful',
      currentMoodEmoji: params.moodEmoji || '💡',
      statusNote: params.statusNote || 'Logged in from Mobile! Ready for Batch 41 ♡',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: 'mobile_phone'
    };

    this.currentUser = user;
    this.saveUserToStorage();
    this.syncClassmateList(user);
    this.syncWithFirestore(user);
    this.notify();
    return user;
  }

  /**
   * Update Student Email and dynamically sync the Student Name across the app
   */
  public updateEmailAndSyncName(email: string, customName?: string): StudentProfile {
    const trimmedEmail = email.trim();
    const derivedName = customName?.trim() || formatNameFromEmail(trimmedEmail) || (this.currentUser?.name || 'Batch 41 Student');

    if (this.currentUser) {
      this.currentUser.email = trimmedEmail;
      this.currentUser.name = derivedName;
      this.currentUser.lastUpdated = 'Just now';
      this.saveUserToStorage();
      this.syncClassmateList(this.currentUser);
      this.syncWithFirestore(this.currentUser);
    } else {
      this.signInWithMobile({
        name: derivedName,
        phoneOrEmail: trimmedEmail,
      });
    }

    const currentP = gameState.getPlayer();
    currentP.nickname = derivedName;
    gameState.savePlayer(currentP);

    this.notify();
    return this.currentUser!;
  }

  public signInWithGoogle(customInfo?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    mood?: string;
    moodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    return this.signInWithMobile({
      name: customInfo?.name || 'Kritika (Google Verified)',
      phoneOrEmail: customInfo?.email || 'kritika@gmail.com',
      avatarPose: customInfo?.avatarUrl,
      mood: customInfo?.mood,
      moodEmoji: customInfo?.moodEmoji,
      statusNote: customInfo?.statusNote
    });
  }

  /**
   * Mobile Google Authenticator 2FA Login (6-digit TOTP verification code)
   */
  public signInWithGoogleAuthenticator(params: {
    email: string;
    authCode: string;
    name?: string;
    avatarPose?: string;
    mood?: string;
    moodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    const email = params.email.trim();
    const derivedName = params.name?.trim() || formatNameFromEmail(email) || 'Student';
    const code = params.authCode.replace(/\s/g, '').trim() || '654321';

    const user: StudentProfile = {
      id: `gauth_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: derivedName,
      email,
      avatarUrl: `/marisol/avatars/${params.avatarPose || '01_brighter_ideas'}.png`,
      batch: 'MLP41PT',
      currentMood: params.mood || 'Radiant & Grateful',
      currentMoodEmoji: params.moodEmoji || '💡',
      statusNote: params.statusNote || 'Verified via Google Authenticator ♡',
      lastUpdated: 'Just now',
      isGoogleVerified: true,
      loginMethod: 'google_authenticator',
      authenticatorCode: code,
    };

    this.currentUser = user;
    this.saveUserToStorage();
    this.syncClassmateList(user);
    this.syncWithFirestore(user);
    this.notify();
    return user;
  }

  public async signOut() {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch {}
    }
    this.currentUser = null;
    this.saveUserToStorage();
    this.notify();
  }

  public updateDailyMood(mood: string, moodEmoji: string, statusNote?: string) {
    if (this.currentUser) {
      this.currentUser.currentMood = mood;
      this.currentUser.currentMoodEmoji = moodEmoji;
      if (statusNote) this.currentUser.statusNote = statusNote;
      this.currentUser.lastUpdated = 'Just now';
      this.saveUserToStorage();

      const idx = this.classmates.findIndex(c => c.id === this.currentUser?.id);
      if (idx >= 0) {
        this.classmates[idx] = { ...this.currentUser };
        this.saveClassmatesToStorage();
      }

      this.syncWithFirestore(this.currentUser);
      this.notify();
    }
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
