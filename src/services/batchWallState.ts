// Shared Batch Wall State Service for MLP41PT Batch Students with Firebase Firestore
import { 
  db, 
  auth,
  collection, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  doc, 
  setDoc, 
  deleteDoc
} from './firebase';
import { authService } from './authService';

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
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
  isDeleted?: boolean;
  isDeletedForEveryone?: boolean;
  deletedAt?: number;
}

export interface MessageReceipt {
  userId: string;
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  seenAt: number;
}

export interface BatchMember {
  id: string;
  name: string;
  email?: string;
  avatarUrl: string;
  isKritika?: boolean;
}

export const KNOWN_BATCH_MEMBERS: BatchMember[] = [
  {
    id: 'member_kritika',
    name: 'Kritika Gupta 👑',
    email: 'kritika.gupta@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    isKritika: true,
  },
  {
    id: 'member_priyanshu',
    name: 'Priyanshu Sharma',
    email: 'priyanshu.sharma@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
  },
  {
    id: 'member_ananya',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
  },
  {
    id: 'member_rohan',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
  },
];

export interface ChatPollOption {
  id: string;
  text: string;
  votes: string[]; // array of voter Firebase UIDs (or legacy names)
}

export interface ChatPoll {
  question: string;
  options: ChatPollOption[];
}

export interface GroupChatMessage {
  id: string;
  senderId: string; // Firebase Auth UID
  senderName: string;
  senderEmail?: string;
  avatarUrl?: string;

  text: string;
  imageUrl?: string;

  senderIsNewUser?: boolean;
  senderUserTag?: string;

  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };

  poll?: {
    question: string;
    options: {
      id: string;
      text: string;
      votes: string[];
    }[];
  };

  timestamp: string;
  createdAt: number;

  isKritika?: boolean;

  isEdited?: boolean;
  isDeletedForEveryone?: boolean;

  reactions?: Record<string, number>;

  seenBy?: {
    userId: string;
    userName: string;
    userEmail?: string;
    avatarUrl?: string;
    seenAt: number;
  }[];

  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
}

export interface LikedMember {
  userId?: string;
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  likedAt?: number;
}

export interface InstagramComment {
  id: string;
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
  createdAt: number;
  likesCount?: number;
  likedByUsers?: string[];
  reactions?: Record<string, number>;
  isKritika?: boolean;
}

export interface InstagramPost {
  id: string;
  userId?: string;
  authorId?: string;
  userEmail?: string;
  authorName: string;
  authorEmail?: string;
  authorAvatarUrl: string;
  location?: string;
  imageUrl: string;
  images?: string[]; // Multiple photos in one 9:16 poster
  filter?: string; // 'none' | 'warm' | 'vintage' | 'pink' | 'golden' | 'bw'
  caption: string;
  hashtags: string[];
  likesCount: number;
  likedByCurrentUser?: boolean;
  likedByUsers?: string[];
  likedByMembers?: LikedMember[]; // Unique users who liked/hearted
  reactions?: Record<string, number>; // emoji -> count, e.g. { '❤️': 38, '🔥': 12, '🌸': 9 }
  reactedUsers?: Record<string, string[]>; // emoji -> array of user names
  sharesCount?: number; // Total unique shares count
  sharedByUsers?: string[]; // Users who shared
  comments: InstagramComment[];
  saved?: boolean;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean;
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
  isEdited?: boolean;
  isDeleted?: boolean;
  isDeletedForEveryone?: boolean;
  deletedAt?: number;
}

export const formatChatTimestamp = (createdAt: number): string => {
  if (!createdAt) return 'Just now';
  const now = Date.now();
  const diff = now - createdAt;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  const date = new Date(createdAt);
  const isToday = new Date().toDateString() === date.toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `Today at ${timeStr}`;
  const yesterday = new Date(now - 86400000);
  if (yesterday.toDateString() === date.toDateString()) return `Yesterday at ${timeStr}`;
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${timeStr}`;
};

const STORAGE_KEY = 'marisol_batch_updates_v2';
const CHAT_STORAGE_KEY = 'marisol_group_chat_messages_v2';
const CHAT_QUEUE_KEY = 'marisol_chat_offline_queue_v2';
const INSTA_STORAGE_KEY = 'marisol_instagram_posts_v2';
const QUEUE_KEY = 'marisol_batch_offline_queue_v2';
const DELETED_POSTS_STORAGE_KEY = 'marisol_deleted_posts_v2';

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta_init_1',
    authorId: 'member_kritika',
    authorName: 'Kritika Gupta 👑',
    authorEmail: 'kritika.gupta@mlp41.edu',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    location: 'Factory of Fun • Comfort Lounge 🌸',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80',
    filter: 'warm',
    caption: 'Celebrating our amazing batch milestones together! Savoring warm chai, hot pizza, and sweet memories with everyone ♡ 👑✨',
    hashtags: ['#Batch41', '#KritikaQueen', '#FactoryOfFun', '#ComfortVibes'],
    likesCount: 38,
    likedByCurrentUser: true,
    likedByUsers: ['Kritika Gupta 👑', 'Priyanshu Sharma', 'Ananya Deshmukh', 'Rohan Mehra'],
    likedByMembers: [
      { userId: 'member_kritika', userName: 'Kritika Gupta 👑', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', likedAt: Date.now() - 3600000 },
      { userId: 'member_priyanshu', userName: 'Priyanshu Sharma', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop', likedAt: Date.now() - 2500000 },
      { userId: 'member_ananya', userName: 'Ananya Deshmukh', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop', likedAt: Date.now() - 1800000 },
      { userId: 'member_rohan', userName: 'Rohan Mehra', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', likedAt: Date.now() - 900000 }
    ],
    reactions: { '❤️': 38, '🌸': 15, '✨': 12, '🔥': 9 },
    reactedUsers: {
      '❤️': ['Kritika Gupta 👑', 'Priyanshu Sharma', 'Ananya Deshmukh'],
      '🌸': ['Ananya Deshmukh', 'Kritika Gupta 👑'],
      '✨': ['Rohan Mehra'],
      '🔥': ['Priyanshu Sharma']
    },
    sharesCount: 7,
    sharedByUsers: ['Priyanshu Sharma', 'Ananya Deshmukh', 'Rohan Mehra'],
    comments: [
      {
        id: 'c1',
        authorName: 'Priyanshu Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
        text: 'Royal aesthetic as always! Keep shining Kritika! 👑🔥',
        timestamp: '1 hour ago',
        createdAt: Date.now() - 3600000,
        likesCount: 4,
        likedByUsers: ['Kritika Gupta 👑', 'Ananya Deshmukh']
      },
      {
        id: 'c2',
        authorName: 'Ananya Deshmukh',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
        text: 'Best batch memories ever! 💖✨',
        timestamp: '30 mins ago',
        createdAt: Date.now() - 1800000,
        likesCount: 2,
        likedByUsers: ['Kritika Gupta 👑']
      }
    ],
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000,
    isKritika: true
  }
];

/**
 * Recursively removes all `undefined` fields from an object/array so Firestore SDK
 * never throws "Unsupported field value: undefined".
 */
export function cleanForFirestore<T>(val: T): T {
  if (val === null || val === undefined) {
    return null as any;
  }
  if (Array.isArray(val)) {
    return val
      .filter(item => item !== undefined)
      .map(item => cleanForFirestore(item)) as any;
  }
  if (typeof val === 'object' && val.constructor === Object) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        res[k] = cleanForFirestore(v);
      }
    }
    return res as any;
  }
  return val;
}

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private chatMessages: GroupChatMessage[] = [];
  private instagramPosts: InstagramPost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private chatOfflineQueue: GroupChatMessage[] = [];
  private deletedPostIds: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;
  private broadcastChannel: BroadcastChannel | null = null;

  // Real-Time Group Chat State
  private chatConnectionStatus: 'connecting' | 'connected' | 'offline' | 'error' = 'offline';
  private chatErrorMessage: string | null = null;
  private chatUnsubscribe: (() => void) | null = null;
  private deletedUnsubscribe: (() => void) | null = null;
  private postsUnsubscribe: (() => void) | null = null;
  private instaUnsubscribe: (() => void) | null = null;
  private isFirestoreSyncActive: boolean = false;

  constructor() {
    this.cleanLegacyStorage();
    if (authService.isLoggedIn()) {
      this.loadFromStorage();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());

      try {
        if ('BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel('marisol_multiuser_sync');
          this.broadcastChannel.onmessage = (event) => {
            if (event.data?.type === 'DELETE_CHAT_MESSAGE' && event.data?.messageId) {
              this.chatMessages = this.chatMessages.filter(m => m.id !== event.data.messageId);
              this.saveChatToStorage();
              this.notify();
            } else if (event.data?.type === 'DELETE_INSTA_POST' && event.data?.postId) {
              this.deletedPostIds.add(event.data.postId);
              this.saveDeletedPostsToStorage();
              this.instagramPosts = this.instagramPosts.filter(p => p.id !== event.data.postId);
              this.saveInstaToStorage();
              this.notify();
            } else if (event.data?.type === 'DELETE_BULLETIN_POST' && event.data?.postId) {
              this.deletedPostIds.add(event.data.postId);
              this.saveDeletedPostsToStorage();
              this.posts = this.posts.filter(p => p.id !== event.data.postId);
              this.offlineQueue = this.offlineQueue.filter(p => p.id !== event.data.postId);
              this.saveToStorage();
              this.saveQueueToStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_CHAT') {
              this.loadFromStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_POSTS') {
              this.loadFromStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_INSTA') {
              this.loadFromStorage();
              this.notify();
            }
          };
        }
      } catch {}
    }

    // NEVER start Firestore sync on boot regardless of auth state.
    // Strictly subscribe to authService state changes to start/stop sync.
    authService.subscribe(() => {
      if (authService.isLoggedIn()) {
        this.startFirestoreSync();
      } else {
        this.stopFirestoreSync();
      }
    });
  }

  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_updates_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v2');
      localStorage.removeItem('marisol_deleted_posts_v1');
    } catch {}
  }

  /**
   * Starts Firestore subscriptions across deleted_posts, batch_updates, instagram_posts, and group_chat.
   * Strictly called ONLY AFTER user authentication is confirmed.
   */
  public startFirestoreSync(): void {
    if (!authService.isLoggedIn() || !db) {
      return;
    }

    if (this.isFirestoreSyncActive) {
      return;
    }

    this.isFirestoreSyncActive = true;
    this.loadFromStorage();

    try {
      // 0. Shared Deleted Posts Registry Listener
      if (this.deletedUnsubscribe) {
        this.deletedUnsubscribe();
        this.deletedUnsubscribe = null;
      }
      const deletedQuery = collection(db, 'deleted_posts');
      this.deletedUnsubscribe = onSnapshot(deletedQuery, (snapshot) => {
        let hasNewDeletions = false;
        snapshot.forEach((docSnap) => {
          if (!this.deletedPostIds.has(docSnap.id)) {
            this.deletedPostIds.add(docSnap.id);
            hasNewDeletions = true;
          }
        });
        if (hasNewDeletions) {
          this.saveDeletedPostsToStorage();
          this.posts = this.posts.filter(p => !this.deletedPostIds.has(p.id));
          this.instagramPosts = this.instagramPosts.filter(p => !this.deletedPostIds.has(p.id));
          this.saveToStorage();
          this.saveInstaToStorage();
          this.notify();
        }
      }, (err) => {
        console.warn('[BatchWall] Firestore deleted_posts listener notice:', err);
      });

      // 1. Bulletin Corkboard Posts Listener
      if (this.postsUnsubscribe) {
        this.postsUnsubscribe();
        this.postsUnsubscribe = null;
      }
      const postsQuery = query(
        collection(db, 'batch_updates'),
        orderBy('createdAt', 'desc')
      );
      this.postsUnsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const postMap = new Map<string, BatchUpdatePost>();

        this.posts.forEach(p => {
          if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
            postMap.set(p.id, p);
          }
        });

        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data() as BatchUpdatePost;
          const postId = docSnap.id;
          if (data.isDeleted || data.isDeletedForEveryone || this.deletedPostIds.has(postId)) {
            if (!this.deletedPostIds.has(postId)) {
              this.deletedPostIds.add(postId);
              this.saveDeletedPostsToStorage();
            }
            postMap.delete(postId);
            return;
          }
          postMap.set(postId, {
            ...data,
            id: postId,
            createdAt: data.createdAt || (typeof data.timestamp === 'number' ? data.timestamp : Date.now()),
            replies: Array.isArray(data.replies) ? data.replies : []
          });
        });

        this.posts = Array.from(postMap.values())
          .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone)
          .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return (b.createdAt || 0) - (a.createdAt || 0);
          });
        this.saveToStorage();
        this.notify();
      }, (err) => {
        console.warn('[BatchWall] Firestore posts sync notice:', err);
      });

      // 2. Authoritative Group Chat Listener
      const cur = authService.getCurrentUser();
      this.initChatListener(cur?.joinedAt, cur?.isNewUser);

      // 3. Instagram / Photo Wall Posts Listener
      if (this.instaUnsubscribe) {
        this.instaUnsubscribe();
        this.instaUnsubscribe = null;
      }
      const instaQuery = query(
        collection(db, 'instagram_posts'),
        orderBy('createdAt', 'desc')
      );
      this.instaUnsubscribe = onSnapshot(instaQuery, (snapshot) => {
        const postMap = new Map<string, InstagramPost>();

        DEFAULT_INSTAGRAM_POSTS.forEach(dp => {
          if (!this.deletedPostIds.has(dp.id)) {
            postMap.set(dp.id, dp);
          }
        });

        this.instagramPosts.forEach(p => {
          if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
            postMap.set(p.id, p);
          }
        });

        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data() as InstagramPost;
          const postId = docSnap.id;

          if (data.isDeleted || data.isDeletedForEveryone || this.deletedPostIds.has(postId)) {
            if (!this.deletedPostIds.has(postId)) {
              this.deletedPostIds.add(postId);
              this.saveDeletedPostsToStorage();
            }
            postMap.delete(postId);
            return;
          }

          const mergedPost: InstagramPost = {
            ...data,
            id: postId,
            createdAt: data.createdAt || (typeof data.timestamp === 'number' ? data.timestamp : Date.now()),
            images: data.images && data.images.length > 0 ? data.images : (data.imageUrl ? [data.imageUrl] : []),
            comments: Array.isArray(data.comments) ? data.comments : [],
            reactions: data.reactions || {},
            reactedUsers: data.reactedUsers || {},
            likedByUsers: Array.isArray(data.likedByUsers) ? data.likedByUsers : [],
            likedByMembers: Array.isArray(data.likedByMembers) ? data.likedByMembers : []
          };

          postMap.set(postId, mergedPost);
        });

        this.instagramPosts = Array.from(postMap.values())
          .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone)
          .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return (b.createdAt || 0) - (a.createdAt || 0);
          });

        this.saveInstaToStorage();
        this.notify();
      }, (err) => {
        console.warn('[BatchWall] Firestore insta listener notice:', err);
      });

    } catch (err) {
      console.warn('[BatchWall] Firestore sync setup error:', err);
    }
  }

  /**
   * Unsubscribes and tears down all active Firestore listeners on sign out or session termination.
   */
  public stopFirestoreSync(): void {
    this.isFirestoreSyncActive = false;

    if (this.deletedUnsubscribe) {
      this.deletedUnsubscribe();
      this.deletedUnsubscribe = null;
    }
    if (this.postsUnsubscribe) {
      this.postsUnsubscribe();
      this.postsUnsubscribe = null;
    }
    if (this.instaUnsubscribe) {
      this.instaUnsubscribe();
      this.instaUnsubscribe = null;
    }
    if (this.chatUnsubscribe) {
      this.chatUnsubscribe();
      this.chatUnsubscribe = null;
    }

    this.posts = [];
    this.instagramPosts = [];
    this.chatMessages = [];
    this.chatConnectionStatus = 'offline';
    this.chatErrorMessage = null;
    this.notify();
  }

  /**
   * Initializes exactly ONE authoritative group-chat Firestore listener.
   * If called again, cleans up previous listener to prevent duplicates.
   * Enforces New User Privacy at the Firestore query level when userJoinedAt and isNewUser are set.
   */
  /**
   * Initializes exactly ONE authoritative group-chat Firestore listener.
   * If called again, cleans up previous listener to prevent duplicates.
   * Guarantees Firebase Auth session is fully established before querying Firestore.
   * Validates userJoinedAt and enforces New User Privacy at the Firestore query level with client-side fallback.
   */
  public async initChatListener(userJoinedAt?: number, isNewUser?: boolean): Promise<void> {
    if (this.chatUnsubscribe) {
      this.chatUnsubscribe();
      this.chatUnsubscribe = null;
    }

    // 0. Gating Firestore Chat Access:
    // If user is NOT logged in, NEVER attempt to read Firestore or attach a listener!
    if (!authService.isLoggedIn()) {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = null;
      this.chatMessages = [];
      this.notify();
      return;
    }

    if (!db) {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = 'Firebase Firestore is not configured.';
      this.notify();
      return;
    }

    this.chatConnectionStatus = 'connecting';
    this.chatErrorMessage = null;
    this.notify();

    // 1. Wait for Firebase Auth session confirmation before attaching listener
    await authService.waitForAuthReady();

    // Re-verify login status after auth is confirmed
    if (!authService.isLoggedIn()) {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = null;
      this.chatMessages = [];
      this.notify();
      return;
    }

    // 2. Resolve currentUser profile & validate userJoinedAt
    const cur = authService.getCurrentUser();
    const effectiveIsNewUser = isNewUser !== undefined ? isNewUser : (cur?.isNewUser ?? false);

    let effectiveJoinedAt: number = 0;
    if (effectiveIsNewUser) {
      // Must never run with a missing, null, NaN, or non-positive userJoinedAt value
      const candidate = userJoinedAt !== undefined ? userJoinedAt : cur?.joinedAt;
      if (typeof candidate === 'number' && !isNaN(candidate) && candidate > 0) {
        effectiveJoinedAt = candidate;
      } else if (cur?.createdAt && typeof cur.createdAt === 'number' && !isNaN(cur.createdAt) && cur.createdAt > 0) {
        effectiveJoinedAt = cur.createdAt;
      } else {
        effectiveJoinedAt = Date.now();
        if (cur) {
          cur.joinedAt = effectiveJoinedAt;
          if (!cur.createdAt) cur.createdAt = effectiveJoinedAt;
        }
      }
    } else {
      effectiveJoinedAt = 0; // Existing member / founder sees full history
    }

    // 3. New User Privacy: immediately clear any stale cached messages prior to joinedAt
    if (effectiveIsNewUser && effectiveJoinedAt > 0) {
      this.chatMessages = this.chatMessages.filter(m => (m.createdAt || 0) >= effectiveJoinedAt);
      this.saveChatToStorage();
    }

    try {
      const messagesCol = collection(db, 'group_chat_messages');
      let chatQuery;

      if (effectiveIsNewUser && effectiveJoinedAt > 0) {
        chatQuery = query(
          messagesCol,
          where('createdAt', '>=', effectiveJoinedAt),
          orderBy('createdAt', 'asc')
        );
      } else {
        chatQuery = query(
          messagesCol,
          orderBy('createdAt', 'asc')
        );
      }

      const attachListener = (q: any, isFallback: boolean = false) => {
        return onSnapshot(
          q,
          (snapshot: any) => {
            const remoteChat: GroupChatMessage[] = [];

            snapshot.forEach((docSnap: any) => {
              remoteChat.push({
                ...(docSnap.data() as GroupChatMessage),
                id: docSnap.id,
              });
            });

            remoteChat.sort(
              (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
            );

            // If fallback mode (base query without where clause), enforce client-side privacy filtering
            let finalChat = remoteChat;
            if (isFallback && effectiveIsNewUser && effectiveJoinedAt > 0) {
              finalChat = remoteChat.filter(m => (m.createdAt || 0) >= effectiveJoinedAt);
            }

            this.chatMessages = finalChat;
            this.chatConnectionStatus = 'connected';
            this.chatErrorMessage = null;

            this.saveChatToStorage();
            this.notify();
          },
          (error: any) => {
            console.error('[Batch 41 Group Chat Debug] Firestore listener error:', {
              code: error?.code,
              message: error?.message,
              effectiveJoinedAt,
              effectiveIsNewUser,
              isFallback
            });

            // Resilient Privacy Fallback:
            // If range query failed (e.g. index issue or rule condition on range filter),
            // fallback to base query with client-side filter so chat never breaks for new users
            if (!isFallback && effectiveIsNewUser && (error?.code === 'permission-denied' || error?.code === 'failed-precondition')) {
              console.warn('[Batch 41 Group Chat Debug] Range query encountered error, falling back to base query with client-side filter...');
              if (this.chatUnsubscribe) {
                this.chatUnsubscribe();
              }
              const fallbackQuery = query(messagesCol, orderBy('createdAt', 'asc'));
              this.chatUnsubscribe = attachListener(fallbackQuery, true);
              return;
            }

            this.chatConnectionStatus = 'error';
            this.chatErrorMessage = error?.code === 'permission-denied'
              ? 'Permission denied: Chat access restricted by Firestore security rules.'
              : 'Unable to connect to the group chat. Please check your internet connection.';
            this.notify();
          }
        );
      };

      this.chatUnsubscribe = attachListener(chatQuery, false);
    } catch (err: any) {
      console.error('[Batch 41 Group Chat Debug] Firestore init error:', {
        code: err?.code,
        message: err?.message,
        error: err
      });
      this.chatConnectionStatus = 'error';
      this.chatErrorMessage = 'Unable to connect to the group chat. Please check your internet connection.';
      this.notify();
    }
  }

  private loadFromStorage() {
    try {
      const storedDeleted = localStorage.getItem(DELETED_POSTS_STORAGE_KEY);
      if (storedDeleted) {
        try {
          const ids: string[] = JSON.parse(storedDeleted);
          this.deletedPostIds = new Set(ids);
        } catch {
          this.deletedPostIds = new Set();
        }
      } else {
        this.deletedPostIds = new Set();
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BatchUpdatePost[] = JSON.parse(stored);
        this.posts = parsed
          .filter(p => !['post_01', 'post_02', 'post_03', 'post_04'].includes(p.id))
          .filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
      } else {
        this.posts = [];
        this.saveToStorage();
      }

      // Startup / Offline Cache for Group Chat (only loaded if user is actively logged in)
      if (authService.isLoggedIn()) {
        const storedChat = localStorage.getItem(CHAT_STORAGE_KEY);
        if (storedChat) {
          this.chatMessages = JSON.parse(storedChat);
        } else {
          this.chatMessages = [];
        }
      } else {
        this.chatMessages = [];
        try {
          localStorage.removeItem(CHAT_STORAGE_KEY);
        } catch {}
      }

      const storedInsta = localStorage.getItem(INSTA_STORAGE_KEY);
      if (storedInsta) {
        const parsed: InstagramPost[] = JSON.parse(storedInsta);
        this.instagramPosts = parsed.filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
      } else {
        this.instagramPosts = DEFAULT_INSTAGRAM_POSTS.filter(p => !this.deletedPostIds.has(p.id));
        this.saveInstaToStorage();
      }

      if (!this.instagramPosts || this.instagramPosts.length === 0) {
        DEFAULT_INSTAGRAM_POSTS.forEach(dp => this.deletedPostIds.delete(dp.id));
        this.saveDeletedPostsToStorage();
        this.instagramPosts = [...DEFAULT_INSTAGRAM_POSTS];
        this.saveInstaToStorage();
      }

      const queue = localStorage.getItem(QUEUE_KEY);
      if (queue) {
        const parsedQueue: BatchUpdatePost[] = JSON.parse(queue);
        this.offlineQueue = parsedQueue.filter(p => !this.deletedPostIds.has(p.id));
      }

      const chatQueue = localStorage.getItem(CHAT_QUEUE_KEY);
      if (chatQueue) {
        this.chatOfflineQueue = JSON.parse(chatQueue);
      }
    } catch {
      this.deletedPostIds = new Set();
      this.posts = [];
      this.chatMessages = [];
      this.instagramPosts = DEFAULT_INSTAGRAM_POSTS.filter(p => !this.deletedPostIds.has(p.id));
      this.offlineQueue = [];
      this.chatOfflineQueue = [];
    }
  }

  private saveDeletedPostsToStorage() {
    try {
      localStorage.setItem(DELETED_POSTS_STORAGE_KEY, JSON.stringify(Array.from(this.deletedPostIds)));
    } catch {}
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    } catch {}
  }

  private saveChatToStorage() {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.chatMessages));
    } catch {}
  }

  private saveChatQueueToStorage() {
    try {
      localStorage.setItem(CHAT_QUEUE_KEY, JSON.stringify(this.chatOfflineQueue));
    } catch {}
  }

  private saveInstaToStorage() {
    try {
      localStorage.setItem(INSTA_STORAGE_KEY, JSON.stringify(this.instagramPosts));
    } catch {}
  }

  private saveQueueToStorage() {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(this.offlineQueue));
    } catch {}
  }

  private handleOnline() {
    this.isOnline = true;
    this.chatConnectionStatus = 'connecting';

    // Flush queued bulletin posts
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
    }

    // Flush queued group chat messages
    if (this.chatOfflineQueue.length > 0) {
      const chatCount = this.chatOfflineQueue.length;
      this.chatOfflineQueue.forEach(async (msg) => {
        if (db) {
          try {
            await setDoc(doc(db, 'group_chat_messages', msg.id), cleanForFirestore(msg));
          } catch (e) {
            console.warn('[Batch 41 Group Chat] Error syncing queued message:', e);
          }
        }
      });
      this.chatOfflineQueue = [];
      this.saveChatQueueToStorage();
      this.lastSyncToast = `Back online! Synced ${chatCount} chat message${chatCount > 1 ? 's' : ''} 📡`;
    }

    // Re-establish authoritative chat listener
    const cur = authService.getCurrentUser();
    this.initChatListener(cur?.joinedAt, cur?.isNewUser);
    this.notify();
  }

  private handleOffline() {
    this.isOnline = false;
    this.chatConnectionStatus = 'offline';
    this.notify();
  }

  private async syncPostToFirestore(post: BatchUpdatePost) {
    if (db) {
      try {
        await setDoc(doc(db, 'batch_updates', post.id), cleanForFirestore(post));
      } catch (err) {
        console.warn('Failed to add post to Firestore:', err);
      }
    }
  }

  // =========================================================================
  // GROUP CHAT METHODS (Authoritative Real-Time Architecture)
  // =========================================================================

  public getChatConnectionStatus(): {
    status: 'connecting' | 'connected' | 'offline' | 'error';
    errorMessage: string | null;
  } {
    return {
      status: !this.isOnline ? 'offline' : this.chatConnectionStatus,
      errorMessage: this.chatErrorMessage
    };
  }

  public clearChatCache(): void {
    if (this.chatUnsubscribe) {
      this.chatUnsubscribe();
      this.chatUnsubscribe = null;
    }
    this.chatMessages = [];
    this.chatConnectionStatus = 'offline';
    this.chatErrorMessage = null;
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {}
    this.notify();
  }

  public getChatMessages(currentUserId?: string, userJoinedAt?: number, isNewUser?: boolean): GroupChatMessage[] {
    if (!authService.isLoggedIn()) {
      return [];
    }

    let list = this.chatMessages;

    if (userJoinedAt === undefined || isNewUser === undefined) {
      const cur = authService.getCurrentUser();
      if (cur) {
        userJoinedAt = userJoinedAt ?? cur.joinedAt;
        isNewUser = isNewUser ?? cur.isNewUser;
      }
    }

    // Defense-in-depth: Ensure new users never see older chat messages sent before their join time
    if (isNewUser && userJoinedAt && userJoinedAt > 0) {
      list = list.filter(m => (m.createdAt || 0) >= userJoinedAt!);
    }

    if (!currentUserId) {
      return [...list];
    }
    try {
      const hiddenKey = `marisol_chat_hidden_${currentUserId}`;
      const stored = localStorage.getItem(hiddenKey);
      if (stored) {
        const hiddenIds: string[] = JSON.parse(stored);
        const hiddenSet = new Set(hiddenIds);
        return list.filter(m => !hiddenSet.has(m.id));
      }
    } catch {}
    return [...list];
  }

  public getPinnedMessages(): GroupChatMessage[] {
    return this.chatMessages
      .filter(m => m.isPinned)
      .sort((a, b) => (b.pinnedAt || 0) - (a.pinnedAt || 0));
  }

  public getPinnedChatMessage(): GroupChatMessage | null {
    return this.chatMessages.slice().reverse().find(m => m.isPinned) || null;
  }

  /**
   * Writes a new group chat message to Firestore.
   * Does NOT manually push permanently to local chat state; onSnapshot distributes it.
   */
  public async sendGroupChatMessage(data: {
    senderId: string; // Firebase Auth UID
    senderName: string;
    senderEmail?: string;
    avatarUrl?: string;
    senderIsNewUser?: boolean;
    senderUserTag?: string;
    text: string;
    imageUrl?: string;
    replyTo?: {
      id: string;
      senderName: string;
      text: string;
    };
    poll?: ChatPoll;
    isPinned?: boolean;
    pinnedBy?: string;
    pinnedAt?: number;
  }): Promise<GroupChatMessage> {
    if (!db) {
      const err: any = new Error('Database is not initialized.');
      err.code = 'unavailable';
      throw err;
    }

    const text = data.text.trim();
    if (!text && !data.imageUrl && !data.poll) {
      const err: any = new Error('Message cannot be empty.');
      err.code = 'invalid-argument';
      throw err;
    }

    // 1. Ensure user has a valid Firebase Auth session before attempting write
    let fbUser = auth?.currentUser || null;
    if (!fbUser && auth) {
      try {
        fbUser = await authService.ensureFirebaseAuthSession();
      } catch (authErr) {
        console.warn('[Batch 41 Group Chat] Error ensuring auth session:', authErr);
      }
    }

    // 2. Refresh token before writing to avoid expired session errors
    if (fbUser) {
      try {
        await fbUser.getIdToken(false);
      } catch (tokenErr) {
        console.warn('[Batch 41 Group Chat] Token refresh attempt failed, forcing refresh:', tokenErr);
        try {
          await fbUser.getIdToken(true);
        } catch (forceErr) {
          const err: any = new Error('Login session expired. Please sign in again.');
          err.code = 'unauthenticated';
          throw err;
        }
      }
    }

    // 3. Sender ID MUST match request.auth.uid for security rules
    const effectiveSenderId = fbUser?.uid || data.senderId;
    if (!effectiveSenderId) {
      const err: any = new Error('User identity could not be verified.');
      err.code = 'unauthenticated';
      throw err;
    }

    const messageRef = doc(collection(db, 'group_chat_messages'));
    const now = Date.now();

    const isKritika = data.senderName.toLowerCase().includes('kritika') ||
                      Boolean(data.senderEmail && data.senderEmail.toLowerCase().includes('kritika')) ||
                      data.senderName.toLowerCase().includes('marisol');

    // If signed in with verified Google email, use that; otherwise data.senderEmail
    const effectiveSenderEmail = fbUser?.email || data.senderEmail;

    const message: GroupChatMessage = {
      id: messageRef.id,
      senderId: effectiveSenderId,
      senderName: isKritika && !data.senderName.includes('👑') ? `${data.senderName.trim()} 👑` : data.senderName.trim(),
      senderEmail: effectiveSenderEmail,
      avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      senderIsNewUser: data.senderIsNewUser ?? false,
      senderUserTag: data.senderUserTag || (isKritika ? 'Founder 👑' : 'New User'),
      text,
      imageUrl: data.imageUrl,
      replyTo: data.replyTo,
      poll: data.poll,
      timestamp: new Date(now).toISOString(),
      createdAt: now,
      isKritika,
      isPinned: data.isPinned ?? false,
      pinnedBy: data.pinnedBy,
      pinnedAt: data.pinnedAt,
      reactions: {},
      seenBy: [
        {
          userId: effectiveSenderId,
          userName: data.senderName,
          userEmail: effectiveSenderEmail,
          avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
          seenAt: now,
        }
      ]
    };

    // If offline, queue message and display optimistically
    if (!this.isOnline) {
      this.chatOfflineQueue.push(message);
      this.saveChatQueueToStorage();
      this.chatMessages.push(message);
      this.saveChatToStorage();
      this.notify();
      return message;
    }

    // 4. Write authoritative record directly to Firestore with exponential backoff for transient errors
    let attempt = 0;
    const maxRetries = 3;
    const baseDelayMs = 400;

    while (true) {
      attempt++;
      try {
        const payload = cleanForFirestore(message);
        await setDoc(messageRef, payload);
        break; // Successfully written to Firestore!
      } catch (err: any) {
        const errCode = err?.code || '';
        const isTransient = errCode === 'unavailable' || 
                            errCode === 'deadline-exceeded' || 
                            errCode === 'resource-exhausted' ||
                            err?.message?.includes('offline') ||
                            err?.message?.includes('transport') ||
                            err?.message?.includes('network');

        if (attempt < maxRetries && isTransient) {
          const delay = baseDelayMs * Math.pow(2, attempt - 1);
          console.warn(`[Batch 41 Group Chat] Transient Firestore error [${errCode || err?.message}]. Retrying attempt ${attempt}/${maxRetries} in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        console.error('[Batch 41 Group Chat] Firestore error sending message:', {
          code: errCode,
          message: err?.message,
          attempt,
          authUid: fbUser?.uid || null,
          authEmail: fbUser?.email || null,
          senderId: message.senderId,
          networkOnline: typeof navigator !== 'undefined' ? navigator.onLine : null
        });

        // Queue offline on failure
        this.chatOfflineQueue.push(message);
        this.saveChatQueueToStorage();
        this.chatMessages.push(message);
        this.saveChatToStorage();
        this.notify();
        throw err;
      }
    }

    // Note: onSnapshot listener receives the Firestore doc and updates this.chatMessages authoritatively
    return message;
  }

  public async reactToChatMessage(messageId: string, emoji: string) {
    if (!db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    const currentReactions = msg.reactions || {};
    const updatedReactions = {
      ...currentReactions,
      [emoji]: (currentReactions[emoji] || 0) + 1
    };

    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({ reactions: updatedReactions }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error reacting to message:', err);
    }
  }

  public async pinChatMessage(messageId: string, pinnedByUid?: string) {
    if (!db) return;
    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({
          isPinned: true,
          pinnedBy: pinnedByUid || 'Classmate',
          pinnedAt: Date.now()
        }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error pinning message:', err);
    }
  }

  public async unpinChatMessage(messageId: string) {
    if (!db) return;
    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        {
          isPinned: false,
          pinnedBy: null,
          pinnedAt: null
        },
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error unpinning message:', err);
    }
  }

  public async votePoll(messageId: string, optionId: string, voterId: string, voterName?: string) {
    if (!db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || !msg.poll) return;

    const voter = (voterId || voterName || '').trim();
    if (!voter) return;

    msg.poll.options.forEach(opt => {
      if (opt.id === optionId) {
        if (opt.votes.includes(voter)) {
          opt.votes = opt.votes.filter(v => v !== voter);
        } else {
          opt.votes.push(voter);
        }
      } else {
        opt.votes = opt.votes.filter(v => v !== voter);
      }
    });

    try {
      await setDoc(
        doc(db, 'group_chat_messages', messageId),
        cleanForFirestore({ poll: msg.poll }),
        { merge: true }
      );
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error voting on poll:', err);
    }
  }

  /**
   * Edit chat message with strict Firebase UID author verification.
   */
  public async editChatMessage(
    messageId: string, 
    newText: string,
    currentUserId?: string
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || msg.isDeletedForEveryone) {
      return { success: false, error: 'Message not found or deleted.' };
    }

    if (!currentUserId || msg.senderId !== currentUserId) {
      return { success: false, error: 'Permission denied: You can only edit your own messages.' };
    }

    const trimmed = newText.trim();
    if (!trimmed) {
      return { success: false, error: 'Message text cannot be empty.' };
    }

    if (db) {
      try {
        await setDoc(
          doc(db, 'group_chat_messages', messageId),
          { text: trimmed, isEdited: true },
          { merge: true }
        );
      } catch (err) {
        console.error('[Batch 41 Group Chat] Firestore error editing message:', err);
        return { success: false, error: 'Failed to edit message in Firestore.' };
      }
    }

    return { success: true };
  }

  /**
   * Delete for me: hides message locally on this client for current user.
   */
  public deleteChatMessageForMe(messageId: string, currentUserId: string) {
    if (!currentUserId) return;
    const hiddenKey = `marisol_chat_hidden_${currentUserId}`;
    try {
      const stored = localStorage.getItem(hiddenKey);
      const hiddenIds: string[] = stored ? JSON.parse(stored) : [];
      if (!hiddenIds.includes(messageId)) {
        hiddenIds.push(messageId);
        localStorage.setItem(hiddenKey, JSON.stringify(hiddenIds));
      }
    } catch {}
    this.notify();
  }

  /**
   * Delete for everyone: deletes document from Firestore (strictly author-only by UID).
   */
  public async deleteChatMessageForEveryone(
    messageId: string,
    currentUserId?: string
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return { success: false, error: 'Message not found.' };

    if (!currentUserId || msg.senderId !== currentUserId) {
      return { success: false, error: 'Permission denied: Only the author can delete this message for everyone.' };
    }

    if (db) {
      try {
        await deleteDoc(doc(db, 'group_chat_messages', messageId));
      } catch (err) {
        console.error('[Batch 41 Group Chat] Firestore error deleting message for everyone:', err);
        return { success: false, error: 'Failed to delete message from Firestore.' };
      }
    }

    return { success: true };
  }

  /**
   * Read receipts: updates seenBy in Firestore using Firebase UID.
   */
  public async markMessageAsSeen(messageId: string, user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    if (!user.userId || !db) return;
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    if (!msg.seenBy) msg.seenBy = [];
    const alreadySeen = msg.seenBy.some(s => s.userId === user.userId);
    if (alreadySeen) return;

    const receipt: MessageReceipt = {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      avatarUrl: user.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      seenAt: Date.now()
    };
    msg.seenBy.push(receipt);

    try {
      await setDoc(
        doc(db, 'group_chat_messages', msg.id),
        cleanForFirestore({ seenBy: msg.seenBy }),
        { merge: true }
      );
    } catch {}
  }

  public async markAllMessagesAsSeen(user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    if (!user.userId || !db) return;
    const now = Date.now();

    for (const msg of this.chatMessages) {
      if (!msg.seenBy) msg.seenBy = [];
      const alreadySeen = msg.seenBy.some(s => s.userId === user.userId);
      if (!alreadySeen) {
        msg.seenBy.push({
          userId: user.userId,
          userName: user.userName,
          userEmail: user.userEmail,
          avatarUrl: user.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
          seenAt: now
        });
        try {
          await setDoc(
            doc(db, 'group_chat_messages', msg.id),
            cleanForFirestore({ seenBy: msg.seenBy }),
            { merge: true }
          );
        } catch {}
      }
    }
  }

  // =========================================================================
  // BULLETIN & INSTAGRAM POSTS MANAGEMENT
  // =========================================================================

  public getPosts(onlyCurrentUser?: boolean, currentUserId?: string): BatchUpdatePost[] {
    if (!authService.isLoggedIn()) {
      return [];
    }
    let list = this.posts.filter(p => !this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone);
    if (onlyCurrentUser && currentUserId) {
      list = list.filter(p => p.userId === currentUserId);
    }
    return list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  public getAllBatchMembers(additionalClassmates: Array<{ id?: string; name?: string; email?: string; avatarUrl?: string }> = []): BatchMember[] {
    const memberMap = new Map<string, BatchMember>();

    KNOWN_BATCH_MEMBERS.forEach(m => memberMap.set(m.name.toLowerCase(), m));

    additionalClassmates.forEach(c => {
      if (!c.name) return;
      const key = c.name.toLowerCase();
      if (!memberMap.has(key)) {
        memberMap.set(key, {
          id: c.id || `member_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: c.name,
          email: c.email,
          avatarUrl: c.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          isKritika: c.name.toLowerCase().includes('kritika') || Boolean(c.email && c.email.toLowerCase().includes('kritika'))
        });
      }
    });

    return Array.from(memberMap.values());
  }

  public getInstagramPosts(): InstagramPost[] {
    if (!authService.isLoggedIn()) {
      return [];
    }
    const postMap = new Map<string, InstagramPost>();

    DEFAULT_INSTAGRAM_POSTS.forEach(dp => {
      if (!this.deletedPostIds.has(dp.id)) {
        postMap.set(dp.id, dp);
      }
    });

    this.instagramPosts.forEach(p => {
      if (!this.deletedPostIds.has(p.id) && !p.isDeleted && !p.isDeletedForEveryone) {
        postMap.set(p.id, p);
      }
    });

    return Array.from(postMap.values()).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  public isPostDeleted(postId: string): boolean {
    return this.deletedPostIds.has(postId);
  }

  public getNetworkStatus(): { isOnline: boolean; queuedCount: number; syncToast: string | null } {
    return {
      isOnline: this.isOnline,
      queuedCount: this.offlineQueue.length + this.chatOfflineQueue.length,
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
      userId: postData.userId || (auth?.currentUser?.uid ?? undefined),
      userEmail: postData.userEmail || (auth?.currentUser?.email ?? undefined),
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

  public async addInstagramPost(data: {
    userId?: string;
    authorId?: string;
    userEmail?: string;
    authorEmail?: string;
    authorName: string;
    authorAvatarUrl?: string;
    location?: string;
    imageUrl?: string;
    images?: string[];
    filter?: string;
    caption: string;
    hashtags?: string[];
  }): Promise<InstagramPost> {
    const name = data.authorName.trim() || 'Batch 41 Creator';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (data.userEmail && data.userEmail.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    const imagesList = data.images && data.images.length > 0 ? data.images : (data.imageUrl ? [data.imageUrl] : []);
    const mainImageUrl = imagesList[0] || data.imageUrl || '';

    const newPost: InstagramPost = {
      id: `insta_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: data.userId || (auth?.currentUser?.uid ?? undefined),
      authorId: data.authorId || data.userId || (auth?.currentUser?.uid ?? undefined),
      userEmail: data.userEmail || (auth?.currentUser?.email ?? undefined),
      authorEmail: data.authorEmail || data.userEmail || (auth?.currentUser?.email ?? undefined),
      authorName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      authorAvatarUrl: data.authorAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      location: data.location || 'Batch 41 Comfort Hub 🌸',
      imageUrl: mainImageUrl,
      images: imagesList,
      filter: data.filter || 'none',
      caption: data.caption.trim(),
      hashtags: data.hashtags && data.hashtags.length > 0 ? data.hashtags : ['#Batch41', '#FactoryOfFun'],
      likesCount: 1,
      likedByCurrentUser: true,
      likedByUsers: [name],
      comments: [],
      saved: false,
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika
    };

    this.instagramPosts.unshift(newPost);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', newPost.id), cleanForFirestore(newPost));
      } catch (err) {
        console.warn('Failed to add insta post to Firestore:', err);
      }
    }

    this.notify();
    return newPost;
  }

  public async pinInstagramPost(postId: string, pinnedBy?: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const willPin = !post.isPinned;
    post.isPinned = willPin;
    post.pinnedBy = willPin ? (pinnedBy || 'Classmate') : undefined;
    post.pinnedAt = willPin ? Date.now() : undefined;

    this.saveInstaToStorage();
    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), {
          isPinned: willPin,
          pinnedBy: willPin ? (pinnedBy || 'Classmate') : null,
          pinnedAt: willPin ? Date.now() : null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to update post pin on Firestore:', err);
      }
    }

    this.notify();
  }

  public async unpinInstagramPost(postId: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    post.isPinned = false;
    post.pinnedBy = undefined;
    post.pinnedAt = undefined;
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), {
          isPinned: false,
          pinnedBy: null,
          pinnedAt: null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to unpin post on Firestore:', err);
      }
    }

    this.notify();
  }

  public async editInstagramPost(
    postId: string, 
    newCaption: string,
    editor?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return { success: false, error: 'Post not found.' };

    if (editor) {
      const editorNameClean = (editor.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (editor.id && post.userId && editor.id === post.userId) ||
        (editor.email && (post.userEmail || post.authorEmail) && editor.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
        (editorNameClean !== '' && editorNameClean === authorNameClean)
      );

      if (!isAuthor) {
        return { success: false, error: 'Permission denied: You can only edit your own posts.' };
      }
    }

    post.caption = newCaption.trim();
    post.isEdited = true;
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), { caption: post.caption, isEdited: true }, { merge: true });
      } catch (err) {
        console.warn('Failed to edit post on Firestore:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public async deleteInstagramPost(
    postId: string,
    deleter?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!postId) return { success: false, error: 'Invalid post ID' };
    const post = this.instagramPosts.find(p => p.id === postId) || DEFAULT_INSTAGRAM_POSTS.find(p => p.id === postId);
    if (!post) {
      return { success: true };
    }

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && (post.userId || post.authorId) && (deleter.id === post.userId || deleter.id === post.authorId)) ||
        (deleter.email && (post.userEmail || post.authorEmail) && deleter.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === authorNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this post.' };
      }
    }

    // 1. Instantly purge locally and record deleted post ID
    this.deletedPostIds.add(postId);
    this.saveDeletedPostsToStorage();
    this.instagramPosts = this.instagramPosts.filter(p => p.id !== postId);
    this.saveInstaToStorage();

    // 2. Broadcast to other open browser tabs
    try {
      this.broadcastChannel?.postMessage({ type: 'DELETE_INSTA_POST', postId });
    } catch {}

    // 3. Multi-layer authoritative purge in Firestore for all users
    if (db) {
      // Step A: Mark as deleted on post doc (soft-delete safeguard so any cached reads immediately ignore it)
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          isDeleted: true,
          isDeletedForEveryone: true,
          deletedAt: Date.now()
        }), { merge: true });
      } catch (err) {
        console.warn('[BatchWall] Firestore soft-delete mark notice:', err);
      }

      // Step B: Hard-delete document from collection
      try {
        await deleteDoc(doc(db, 'instagram_posts', postId));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleteDoc notice:', err);
      }

      // Step C: Save to shared 'deleted_posts' registry so other users sync deletion permanently
      try {
        await setDoc(doc(db, 'deleted_posts', postId), cleanForFirestore({
          id: postId,
          type: 'instagram_post',
          deletedAt: Date.now(),
          deleterName: deleter?.name || 'Author'
        }));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleted_posts registry notice:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public likeInstagramPost(
    postId: string, 
    userInfo?: { id?: string; name?: string; email?: string; avatarUrl?: string } | string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');
    const userId = typeof userInfo === 'object' ? userInfo?.id : undefined;
    const userEmail = typeof userInfo === 'object' ? userInfo?.email : undefined;
    const avatarUrl = typeof userInfo === 'object' ? userInfo?.avatarUrl : undefined;

    if (!post.likedByUsers) post.likedByUsers = [];
    if (!post.likedByMembers) post.likedByMembers = [];

    const existingMemberIdx = post.likedByMembers.findIndex(m => 
      (userId && m.userId === userId) ||
      (userEmail && m.userEmail && m.userEmail.toLowerCase() === userEmail.toLowerCase()) ||
      (m.userName && m.userName.toLowerCase().trim() === userName.toLowerCase().trim())
    );

    const isAlreadyLiked = post.likedByCurrentUser || existingMemberIdx >= 0 || post.likedByUsers.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim());

    if (isAlreadyLiked) {
      post.likedByCurrentUser = false;
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.likedByUsers = post.likedByUsers.filter(u => u.toLowerCase().trim() !== userName.toLowerCase().trim());
      if (existingMemberIdx >= 0) {
        post.likedByMembers.splice(existingMemberIdx, 1);
      }
    } else {
      post.likedByCurrentUser = true;
      post.likesCount += 1;
      if (!post.likedByUsers.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim())) {
        post.likedByUsers.push(userName);
      }
      post.likedByMembers.push({
        userId,
        userName,
        userEmail,
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        likedAt: Date.now()
      });
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ 
          likesCount: post.likesCount,
          likedByUsers: post.likedByUsers || [],
          likedByMembers: post.likedByMembers || []
        }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public reactToInstagramPost(
    postId: string,
    emoji: string,
    userInfo?: { id?: string; name?: string; email?: string } | string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');

    if (!post.reactions) post.reactions = {};
    if (!post.reactedUsers) post.reactedUsers = {};

    const usersForEmoji = post.reactedUsers[emoji] || [];
    const hasReacted = usersForEmoji.some(u => u.toLowerCase().trim() === userName.toLowerCase().trim());

    if (hasReacted) {
      // Toggle off
      post.reactedUsers[emoji] = usersForEmoji.filter(u => u.toLowerCase().trim() !== userName.toLowerCase().trim());
      post.reactions[emoji] = Math.max(0, (post.reactions[emoji] || 1) - 1);
      if (post.reactions[emoji] === 0) {
        delete post.reactions[emoji];
        delete post.reactedUsers[emoji];
      }
    } else {
      // Toggle on
      post.reactedUsers[emoji] = [...usersForEmoji, userName];
      post.reactions[emoji] = (post.reactions[emoji] || 0) + 1;
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          reactions: post.reactions || {},
          reactedUsers: post.reactedUsers || {}
        }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public async shareInstagramPost(
    postId: string,
    userInfo?: { id?: string; name?: string } | string
  ): Promise<number> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return 0;

    const userName = typeof userInfo === 'string' ? userInfo : (userInfo?.name || 'Classmate');

    post.sharesCount = (post.sharesCount || 0) + 1;
    if (!post.sharedByUsers) post.sharedByUsers = [];
    if (!post.sharedByUsers.includes(userName)) {
      post.sharedByUsers.push(userName);
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({
          sharesCount: post.sharesCount,
          sharedByUsers: post.sharedByUsers || []
        }), { merge: true });
      } catch {}
    }

    this.notify();
    return post.sharesCount;
  }

  public likeInstagramComment(
    postId: string,
    commentId: string,
    currentUserName?: string
  ) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post || !post.comments) return;

    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;

    const user = currentUserName || 'Classmate';
    if (!comment.likedByUsers) comment.likedByUsers = [];

    if (comment.likedByUsers.includes(user)) {
      comment.likedByUsers = comment.likedByUsers.filter(u => u !== user);
      comment.likesCount = Math.max(0, (comment.likesCount || 1) - 1);
    } else {
      comment.likedByUsers.push(user);
      comment.likesCount = (comment.likesCount || 0) + 1;
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ comments: post.comments }), { merge: true });
      } catch {}
    }

    this.notify();
  }

  public toggleBookmarkInstagramPost(postId: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    post.saved = !post.saved;
    this.saveInstaToStorage();
    this.notify();
  }

  public async addInstagramComment(postId: string, commentData: {
    authorId?: string;
    authorName: string;
    authorEmail?: string;
    avatarUrl?: string;
    text: string;
  }): Promise<InstagramComment | null> {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return null;

    if (!post.comments) {
      post.comments = [];
    }

    const name = commentData.authorName.trim() || 'Classmate';
    const email = commentData.authorEmail || '';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      email.toLowerCase().includes('kritika') ||
                      name.toLowerCase().includes('marisol');

    const newComment: InstagramComment = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      authorId: commentData.authorId,
      authorName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      authorEmail: commentData.authorEmail,
      avatarUrl: commentData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      text: commentData.text.trim(),
      timestamp: 'Just now',
      createdAt: Date.now(),
      likesCount: 0,
      likedByUsers: [],
      isKritika
    };

    post.comments.push(newComment);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), cleanForFirestore({ comments: post.comments }), { merge: true });
      } catch (err) {
        console.warn('Failed to sync insta comment to Firestore:', err);
      }
    }

    this.notify();
    return newComment;
  }

  public async deletePost(
    postId: string,
    deleter?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!postId) return { success: false, error: 'Invalid post ID' };
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      return { success: true };
    }

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.studentName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && post.userId && deleter.id === post.userId) ||
        (deleter.email && post.userEmail && deleter.email.toLowerCase().trim() === post.userEmail?.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === authorNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this sticky note.' };
      }
    }

    // 1. Instantly purge locally and record deleted post ID
    this.deletedPostIds.add(postId);
    this.saveDeletedPostsToStorage();
    this.posts = this.posts.filter(p => p.id !== postId);
    this.offlineQueue = this.offlineQueue.filter(p => p.id !== postId);
    this.saveToStorage();
    this.saveQueueToStorage();

    // 2. Broadcast to other open browser tabs
    try {
      this.broadcastChannel?.postMessage({ type: 'DELETE_BULLETIN_POST', postId });
    } catch {}

    // 3. Multi-layer authoritative purge in Firestore for all users
    if (db) {
      // Step A: Mark as deleted on post doc
      try {
        await setDoc(doc(db, 'batch_updates', postId), cleanForFirestore({
          isDeleted: true,
          isDeletedForEveryone: true,
          deletedAt: Date.now()
        }), { merge: true });
      } catch (err) {
        console.warn('[BatchWall] Firestore soft-delete mark notice:', err);
      }

      // Step B: Hard-delete document from collection
      try {
        await deleteDoc(doc(db, 'batch_updates', postId));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleteDoc notice:', err);
      }

      // Step C: Save to shared 'deleted_posts' registry so other users sync deletion permanently
      try {
        await setDoc(doc(db, 'deleted_posts', postId), cleanForFirestore({
          id: postId,
          type: 'bulletin_post',
          deletedAt: Date.now(),
          deleterName: deleter?.name || 'Author'
        }));
      } catch (err) {
        console.warn('[BatchWall] Firestore deleted_posts registry notice:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public reactToPost(postId: string, stickerAliasOrId: string) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.reactions) {
      post.reactions = {};
    }

    post.reactions[stickerAliasOrId] = (post.reactions[stickerAliasOrId] || 0) + 1;
    this.saveToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'batch_updates', postId), { reactions: post.reactions }, { merge: true });
      } catch {}
    }

    this.notify();
  }

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

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
    } catch {}

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

  /**
   * Matches the group chat messages table for the current session user:
   * Extracts user ID, finds all matched messages in the table,
   * identifies the user's current (latest) message, and returns the matched dataset.
   */
  public getUserMatchedChatData(userQuery: { id?: string; email?: string; name?: string }): {
    userId: string;
    userName: string;
    userEmail: string;
    matchedMessages: GroupChatMessage[];
    currentMessage: GroupChatMessage | null;
    totalMatched: number;
  } {
    const rawId = userQuery.id?.trim() || '';
    const rawEmail = userQuery.email?.trim().toLowerCase() || '';
    const rawName = (userQuery.name || '').replace(' 👑', '').trim().toLowerCase();

    const resolvedUserId = rawId || (rawEmail ? `user_${rawEmail.split('@')[0]}` : (rawName ? `user_${rawName.replace(/\s+/g, '_')}` : 'user_student'));

    const matchedMessages = this.chatMessages.filter(msg => {
      const msgSenderId = msg.senderId?.trim();
      const msgEmail = msg.senderEmail?.trim().toLowerCase();
      const msgName = (msg.senderName || '').replace(' 👑', '').trim().toLowerCase();

      if (rawId && msgSenderId && rawId === msgSenderId) return true;
      if (rawEmail && msgEmail && rawEmail === msgEmail) return true;
      if (rawName && msgName && rawName === msgName) return true;
      return false;
    });

    const currentMessage = matchedMessages.length > 0 ? matchedMessages[matchedMessages.length - 1] : null;

    return {
      userId: resolvedUserId,
      userName: userQuery.name || 'Student',
      userEmail: rawEmail,
      matchedMessages,
      currentMessage,
      totalMatched: matchedMessages.length
    };
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
