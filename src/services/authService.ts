// Google Authentication & Student Community Presence Service
import { gameState } from './gameState';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  batch: string; // e.g. "MLP41PT"
  currentMood: string;
  currentMoodEmoji: string;
  statusNote: string;
  lastUpdated: string;
  isGoogleVerified: boolean;
}

const AUTH_STORAGE_KEY = 'marisol_google_auth_v1';
const CLASSMATES_STORAGE_KEY = 'marisol_batch_classmates_v1';

// Initial classmates in Batch MLP41PT with their live daily moods & life updates
const DEFAULT_CLASSMATES: StudentProfile[] = [
  {
    id: 'user_kritika',
    name: 'Kritika (Queen)',
    email: 'kritika.queen@batch41.fun',
    avatarUrl: '/marisol/avatars/01_brighter_ideas.png',
    batch: 'MLP41PT',
    currentMood: 'Radiant & Grateful',
    currentMoodEmoji: '💡',
    statusNote: 'Cracking trivia, sipping hot ginger chai, and loving life! ♡',
    lastUpdated: '10m ago',
    isGoogleVerified: true,
  },
  {
    id: 'user_aarav',
    name: 'Aarav Patel',
    email: 'aarav.patel@batch41.fun',
    avatarUrl: '/marisol/avatars/05_chai_happiness.png',
    batch: 'MLP41PT',
    currentMood: 'Caffeinated & Victorious',
    currentMoodEmoji: '☕',
    statusNote: 'Finished the cloud assignment! Heading out for tapri chai 🚀',
    lastUpdated: '25m ago',
    isGoogleVerified: true,
  },
  {
    id: 'user_pooja',
    name: 'Pooja Sharma',
    email: 'pooja.sharma@batch41.fun',
    avatarUrl: '/marisol/avatars/02_happier_days.png',
    batch: 'MLP41PT',
    currentMood: 'Cozy & Chill',
    currentMoodEmoji: '☁️',
    statusNote: 'Re-watching Jab We Met with hot Maggi. Peak happiness! 🎬',
    lastUpdated: '1h ago',
    isGoogleVerified: true,
  },
  {
    id: 'user_rohan',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@batch41.fun',
    avatarUrl: '/marisol/avatars/04_overthinking.png',
    batch: 'MLP41PT',
    currentMood: 'Deep Thinking',
    currentMoodEmoji: '💻',
    statusNote: 'Debugging a weird memory leak... Send snacks and prayers! 😅',
    lastUpdated: '2h ago',
    isGoogleVerified: true,
  },
  {
    id: 'user_meera',
    name: 'Meera Iyer',
    email: 'meera.iyer@batch41.fun',
    avatarUrl: '/marisol/avatars/03_wink_conquer.png',
    batch: 'MLP41PT',
    currentMood: 'Bold & Excited',
    currentMoodEmoji: '😉',
    statusNote: 'Just got shortlisted for the hackathon finals! Let’s celebrate! 🎉',
    lastUpdated: '3h ago',
    isGoogleVerified: true,
  }
];

class AuthService {
  private currentUser: StudentProfile | null = null;
  private classmates: StudentProfile[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }

      const storedClassmates = localStorage.getItem(CLASSMATES_STORAGE_KEY);
      if (storedClassmates) {
        this.classmates = JSON.parse(storedClassmates);
      } else {
        this.classmates = DEFAULT_CLASSMATES;
        this.saveClassmatesToStorage();
      }
    } catch {
      this.currentUser = null;
      this.classmates = DEFAULT_CLASSMATES;
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
   * Sign In with Google
   * Can accept a custom profile from Google One-Tap/GIS or a friendly fast profile
   */
  public signInWithGoogle(customInfo?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    mood?: string;
    moodEmoji?: string;
    statusNote?: string;
  }): StudentProfile {
    const player = gameState.getPlayer();
    const name = customInfo?.name?.trim() || player.nickname || 'Kritika (Signed in)';
    const email = customInfo?.email?.trim() || `${name.toLowerCase().replace(/\s+/g, '.') || 'student'}@gmail.com`;
    const avatarUrl = customInfo?.avatarUrl || `/marisol/avatars/${player.activeSticker || '01_brighter_ideas'}.png`;

    const user: StudentProfile = {
      id: `google_${Date.now()}`,
      name,
      email,
      avatarUrl,
      batch: 'MLP41PT',
      currentMood: customInfo?.mood || 'Radiant & Grateful',
      currentMoodEmoji: customInfo?.moodEmoji || '💡',
      statusNote: customInfo?.statusNote || "Just joined Batch 41 with Google! Ready to share daily life & good vibes ♡",
      lastUpdated: 'Just now',
      isGoogleVerified: true,
    };

    this.currentUser = user;
    this.saveUserToStorage();

    // Update or prepend to classmates list
    const existingIdx = this.classmates.findIndex(c => c.email.toLowerCase() === user.email.toLowerCase() || c.id === user.id);
    if (existingIdx >= 0) {
      this.classmates[existingIdx] = user;
    } else {
      this.classmates.unshift(user);
    }
    this.saveClassmatesToStorage();

    // Sync with game state player nickname
    const currentP = gameState.getPlayer();
    if (name && name !== currentP.nickname) {
      currentP.nickname = name;
      gameState.savePlayer(currentP);
    }

    this.notify();
    return user;
  }

  public signOut() {
    this.currentUser = null;
    this.saveUserToStorage();
    this.notify();
  }

  /**
   * Update student's daily life mood & status
   */
  public updateDailyMood(mood: string, moodEmoji: string, statusNote?: string) {
    if (this.currentUser) {
      this.currentUser.currentMood = mood;
      this.currentUser.currentMoodEmoji = moodEmoji;
      if (statusNote) this.currentUser.statusNote = statusNote;
      this.currentUser.lastUpdated = 'Just now';
      this.saveUserToStorage();

      // Sync in classmates list
      const idx = this.classmates.findIndex(c => c.id === this.currentUser?.id);
      if (idx >= 0) {
        this.classmates[idx] = { ...this.currentUser };
        this.saveClassmatesToStorage();
      }
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
