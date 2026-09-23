// Shared Batch Wall State Service for MLP41PT Batch Students with Firebase Firestore
import { db, collection, addDoc, onSnapshot, query, orderBy, limit, doc, setDoc, deleteDoc } from './firebase';

export interface BulletinReply {
  id: string;
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean; // Highlighted special reply from Kritika!
}

export interface BatchUpdatePost {
  id: string;
  userId?: string;
  userEmail?: string;
  studentName: string;
  batch: string; // "MLP41PT"
  avatarPose: string; // alias or avatar URL
  mood: string;
  moodEmoji: string;
  text: string;
  imageUrl?: string;
  timestamp: string; // ISO or human readable
  createdAt?: number;
  reactions: Record<string, number>; // stickerAlias -> count
  replies?: BulletinReply[]; // Asynchronous threaded replies from Kritika and classmates
  category?: 'tribute' | 'question' | 'cheer' | 'general';
}

const STORAGE_KEY = 'marisol_batch_updates_v2';
const QUEUE_KEY = 'marisol_batch_offline_queue_v2';

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
    this.initFirestoreSync();
  }

  // Purge unwanted old mock posts from v1 storage
  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_updates_v1');
    } catch {}
  }

  private initFirestoreSync() {
    if (db) {
      try {
        const postsQuery = query(
          collection(db, 'batch_updates'),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        onSnapshot(postsQuery, (snapshot) => {
          const remotePosts: BatchUpdatePost[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as BatchUpdatePost;
            // Exclude any unwanted legacy demo post IDs
            if (!['post_01', 'post_02', 'post_03', 'post_04'].includes(docSnap.id)) {
              remotePosts.push({ ...data, id: docSnap.id });
            }
          });

          this.posts = remotePosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          this.saveToStorage();
          this.notify();
        }, (err) => {
          console.warn('Firestore onSnapshot error, using local posts:', err);
        });
      } catch (err) {
        console.warn('Firestore sync setup error:', err);
      }
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BatchUpdatePost[] = JSON.parse(stored);
        // Clean out any unwanted legacy demo posts
        this.posts = parsed.filter(p => !['post_01', 'post_02', 'post_03', 'post_04'].includes(p.id));
      } else {
        this.posts = [];
        this.saveToStorage();
      }

      const queue = localStorage.getItem(QUEUE_KEY);
      if (queue) {
        this.offlineQueue = JSON.parse(queue);
      }
    } catch {
      this.posts = [];
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
      const count = this.offlineQueue.length;
      this.offlineQueue.forEach(p => {
        this.posts.unshift(p);
        this.syncPostToFirestore(p);
      });
      this.offlineQueue = [];
      this.saveToStorage();
      this.saveQueueToStorage();
      this.lastSyncToast = `Back online! Synced ${count} update${count > 1 ? 's' : ''} to Batch Wall 📡`;
    } else {
      this.lastSyncToast = 'Back online! Connected to Batch 41 Wall 📡';
    }
    this.notify();
  }

  private handleOffline() {
    this.isOnline = false;
    this.notify();
  }

  private async syncPostToFirestore(post: BatchUpdatePost) {
    if (db) {
      try {
        await addDoc(collection(db, 'batch_updates'), post);
      } catch (err) {
        console.warn('Failed to add post to Firestore:', err);
      }
    }
  }

  public getPosts(onlyCurrentUser?: boolean, currentUserId?: string): BatchUpdatePost[] {
    if (onlyCurrentUser && currentUserId) {
      return this.posts.filter(p => p.userId === currentUserId);
    }
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
    userId?: string;
    userEmail?: string;
    studentName: string;
    avatarPose: string;
    mood: string;
    moodEmoji: string;
    text: string;
    imageUrl?: string;
  }): { queued: boolean; post: BatchUpdatePost } {
    const newPost: BatchUpdatePost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: postData.userId,
      userEmail: postData.userEmail,
      batch: 'MLP41PT',
      studentName: postData.studentName.trim() || 'MLP41PT Student',
      avatarPose: postData.avatarPose,
      mood: postData.mood,
      moodEmoji: postData.moodEmoji,
      text: postData.text.trim(),
      imageUrl: postData.imageUrl,
      timestamp: 'Just now',
      createdAt: Date.now(),
      reactions: {}
    };

    if (!this.isOnline) {
      this.offlineQueue.unshift(newPost);
      this.saveQueueToStorage();
      this.lastSyncToast = 'Offline: update queued, will sync automatically when back online 📡';
      this.notify();
      return { queued: true, post: newPost };
    } else {
      this.posts.unshift(newPost);
      this.saveToStorage();
      this.syncPostToFirestore(newPost);
      this.notify();
      return { queued: false, post: newPost };
    }
  }

  public async deletePost(postId: string) {
    this.posts = this.posts.filter(p => p.id !== postId);
    this.saveToStorage();

    if (db) {
      try {
        await deleteDoc(doc(db, 'batch_updates', postId));
      } catch (err) {
        console.warn('Failed to delete post from Firestore:', err);
      }
    }

    this.notify();
  }

  public reactToPost(postId: string, stickerAliasOrId: string) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.reactions) {
      post.reactions = {};
    }

    post.reactions[stickerAliasOrId] = (post.reactions[stickerAliasOrId] || 0) + 1;
    this.saveToStorage();

    if (db) {
      try {
        setDoc(doc(db, 'batch_updates', postId), { reactions: post.reactions }, { merge: true });
      } catch {}
    }

    this.notify();
  }

  /**
   * Post an async reply to a bulletin note (allows Kritika or classmates to reply at their own time)
   */
  public async addReply(postId: string, replyData: {
    authorId?: string;
    authorName: string;
    authorEmail?: string;
    avatarUrl?: string;
    text: string;
    isKritika?: boolean;
  }): Promise<BulletinReply | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.replies) {
      post.replies = [];
    }

    const email = replyData.authorEmail || '';
    const name = replyData.authorName || '';
    const isKritika = replyData.isKritika || 
      name.toLowerCase().includes('kritika') || 
      email.toLowerCase().includes('kritika') ||
      name.toLowerCase().includes('marisol');

    const newReply: BulletinReply = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      authorId: replyData.authorId,
      authorName: replyData.authorName.trim() || 'Batch 41 Classmate',
      authorEmail: replyData.authorEmail,
      avatarUrl: replyData.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      text: replyData.text.trim(),
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika
    };

    post.replies.push(newReply);
    this.saveToStorage();

    if (db) {
      try {
        await setDoc(doc(db, 'batch_updates', postId), { replies: post.replies }, { merge: true });
      } catch (err) {
        console.warn('Failed to sync reply to Firestore:', err);
      }
    }

    this.notify();
    return newReply;
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
