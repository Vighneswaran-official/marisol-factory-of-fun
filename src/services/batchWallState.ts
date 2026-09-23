// Shared Batch Wall State Service for MLP41PT Batch Students

export interface BatchUpdatePost {
  id: string;
  studentName: string;
  batch: string; // "MLP41PT"
  avatarPose: string; // alias or avatar URL
  mood: string;
  moodEmoji: string;
  text: string;
  imageUrl?: string;
  timestamp: string; // ISO or human readable
  reactions: Record<string, number>; // stickerAlias -> count
}

const STORAGE_KEY = 'marisol_batch_updates_v1';
const QUEUE_KEY = 'marisol_batch_offline_queue_v1';

// Initial preloaded nostalgic memories from MLP41PT batch mates
const DEFAULT_POSTS: BatchUpdatePost[] = [
  {
    id: 'post_01',
    studentName: 'Kritika (The Queen)',
    batch: 'MLP41PT',
    avatarPose: 'brighter_ideas',
    mood: 'Radiant & Grateful',
    moodEmoji: '💡',
    text: 'So proud of all of us in Batch 41! Every late-night study call and chai break made this journey magical. Main apni favourite hoon! ♡',
    timestamp: 'Just now',
    reactions: {
      '01_brighter_ideas': 14,
      '02_happier_days': 19,
      '05_chai_happiness': 27,
    }
  },
  {
    id: 'post_02',
    studentName: 'Aarav Patel',
    batch: 'MLP41PT',
    avatarPose: 'chai_happiness',
    mood: 'Caffeinated & Victorious',
    moodEmoji: '☕',
    text: 'Surviving the final submissions with 14 cups of cutting chai. Batch 41 legends forever! Who remembers the samosa treat?!',
    timestamp: '2 hours ago',
    reactions: {
      '05_chai_happiness': 32,
      '06_silly_vibe': 18,
    }
  },
  {
    id: 'post_03',
    studentName: 'Pooja Sharma',
    batch: 'MLP41PT',
    avatarPose: 'happier_days',
    mood: 'Nostalgic & Cheerful',
    moodEmoji: '☀️',
    text: 'Remember when our code crashed 5 minutes before presentation and we all laughed instead of crying? That was peak MLP41PT energy!',
    timestamp: 'Yesterday',
    reactions: {
      '02_happier_days': 24,
      '03_wink_conquer': 15,
      '04_overthinking': 11,
    }
  },
  {
    id: 'post_04',
    studentName: 'Rohan Deshmukh',
    batch: 'MLP41PT',
    avatarPose: 'overthinking',
    mood: 'Deep Thinking & Relieved',
    moodEmoji: '💻',
    text: 'Still overthinking whether that variable was properly scoped, but hey, we made it! Miss you guys already!',
    timestamp: '2 days ago',
    reactions: {
      '04_overthinking': 29,
      '07_big_dreams': 12,
    }
  }
];

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;

  constructor() {
    this.loadFromStorage();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.posts = JSON.parse(stored);
      } else {
        this.posts = DEFAULT_POSTS;
        this.saveToStorage();
      }

      const queue = localStorage.getItem(QUEUE_KEY);
      if (queue) {
        this.offlineQueue = JSON.parse(queue);
      }
    } catch {
      this.posts = DEFAULT_POSTS;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    } catch {}
  }

  private saveQueueToStorage() {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(this.offlineQueue));
    } catch {}
  }

  private handleOnline() {
    this.isOnline = true;
    if (this.offlineQueue.length > 0) {
      // Flush queued posts to the main feed
      const count = this.offlineQueue.length;
      this.posts = [...this.offlineQueue, ...this.posts];
      this.offlineQueue = [];
      this.saveToStorage();
      this.saveQueueToStorage();
      this.lastSyncToast = `Back online! Synced ${count} queued update${count > 1 ? 's' : ''} to Batch Wall 📡`;
    } else {
      this.lastSyncToast = 'Back online! Connected to Batch 41 Wall 📡';
    }
    this.notify();
  }

  private handleOffline() {
    this.isOnline = false;
    this.notify();
  }

  public getPosts(): BatchUpdatePost[] {
    return [...this.posts];
  }

  public getOfflineQueue(): BatchUpdatePost[] {
    return [...this.offlineQueue];
  }

  public getNetworkStatus(): { isOnline: boolean; queuedCount: number; syncToast: string | null } {
    return {
      isOnline: this.isOnline,
      queuedCount: this.offlineQueue.length,
      syncToast: this.lastSyncToast
    };
  }

  public clearSyncToast() {
    this.lastSyncToast = null;
    this.notify();
  }

  public addPost(postData: {
    studentName: string;
    avatarPose: string;
    mood: string;
    moodEmoji: string;
    text: string;
    imageUrl?: string;
  }): { queued: boolean } {
    const newPost: BatchUpdatePost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      batch: 'MLP41PT',
      studentName: postData.studentName.trim() || 'MLP41PT Student',
      avatarPose: postData.avatarPose,
      mood: postData.mood,
      moodEmoji: postData.moodEmoji,
      text: postData.text.trim(),
      imageUrl: postData.imageUrl,
      timestamp: 'Just now',
      reactions: {}
    };

    if (!this.isOnline) {
      // Queue offline
      this.offlineQueue.unshift(newPost);
      this.saveQueueToStorage();
      this.lastSyncToast = 'Offline: update queued, will sync automatically when back online 📡';
      this.notify();
      return { queued: true };
    } else {
      // Post live
      this.posts.unshift(newPost);
      this.saveToStorage();
      this.notify();
      return { queued: false };
    }
  }

  public reactToPost(postId: string, stickerAliasOrId: string) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.reactions) {
      post.reactions = {};
    }

    post.reactions[stickerAliasOrId] = (post.reactions[stickerAliasOrId] || 0) + 1;
    this.saveToStorage();
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

export const batchWallService = new BatchWallService();
