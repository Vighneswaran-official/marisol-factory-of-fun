// Shared Batch Wall State Service for MLP41PT Batch Students with Firebase Firestore
import { db, collection, onSnapshot, query, orderBy, limit, doc, setDoc, deleteDoc } from './firebase';

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
  votes: string[]; // array of voter names
}

export interface ChatPoll {
  question: string;
  options: ChatPollOption[];
}

export interface GroupChatMessage {
  id: string;
  senderId?: string;
  senderName: string;
  senderEmail?: string;
  avatarUrl?: string;
  text: string;
  imageUrl?: string; // Image attachment for WhatsApp style chat
  senderIsNewUser?: boolean;
  senderUserTag?: string;
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  poll?: ChatPoll;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean;
  isEdited?: boolean;
  isDeletedForEveryone?: boolean;
  reactionEmoji?: string;
  reactions?: Record<string, number>; // emoji -> count
  seenBy?: MessageReceipt[]; // Read receipts tracking who has seen this message
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
}

export interface DirectChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderEmail?: string;
  senderAvatarUrl?: string;
  senderIsNewUser?: boolean;
  senderUserTag?: string;
  recipientId: string;
  recipientName: string;
  recipientEmail?: string;
  recipientAvatarUrl?: string;
  text: string;
  imageUrl?: string;
  timestamp: string;
  createdAt: number;
  isRead?: boolean;
}

export const getDirectConversationId = (userA: string, userB: string): string => {
  const cleanA = (userA || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const cleanB = (userB || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  return [cleanA, cleanB].sort().join('___');
};

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
  filter?: string; // 'none' | 'warm' | 'vintage' | 'pink' | 'golden' | 'bw'
  caption: string;
  hashtags: string[];
  likesCount: number;
  likedByCurrentUser?: boolean;
  likedByUsers?: string[];
  comments: InstagramComment[];
  saved?: boolean;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean;
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: number;
  isEdited?: boolean;
}

const STORAGE_KEY = 'marisol_batch_updates_v2';
const CHAT_STORAGE_KEY = 'marisol_group_chat_messages_v2';
const INSTA_STORAGE_KEY = 'marisol_instagram_posts_v2';
const DM_STORAGE_KEY = 'marisol_direct_chat_messages_v2';
const QUEUE_KEY = 'marisol_batch_offline_queue_v2';

const nowTs = Date.now();

const DEFAULT_GROUP_CHAT_MESSAGES: GroupChatMessage[] = [
  {
    id: 'chat_init_1',
    senderId: 'member_kritika',
    senderName: 'Kritika Gupta 👑',
    senderEmail: 'kritika.gupta@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    text: 'Hey Batch 41 family! Welcome to our comfort lounge! Savoring every sweet memory together ♡ ✨',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    timestamp: 'Today at 2:30 PM',
    createdAt: nowTs - 3600000 * 3,
    isKritika: true,
    reactionEmoji: '💖',
    reactions: { '💖': 8, '✨': 5 },
    seenBy: [
      { userId: 'member_kritika', userName: 'Kritika Gupta 👑', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 3 },
      { userId: 'member_priyanshu', userName: 'Priyanshu Sharma', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 2.8 },
      { userId: 'member_ananya', userName: 'Ananya Deshmukh', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 2.5 },
      { userId: 'member_rohan', userName: 'Rohan Mehra', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 2.1 }
    ]
  },
  {
    id: 'chat_init_2',
    senderId: 'member_priyanshu',
    senderName: 'Priyanshu Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
    text: '@Kritika Gupta 👑 The music player and comfort arcade are pure vibes! 🧀🍕',
    timestamp: 'Today at 3:15 PM',
    createdAt: nowTs - 3600000 * 2,
    reactions: { '🍕': 4, '🔥': 3 },
    seenBy: [
      { userId: 'member_priyanshu', userName: 'Priyanshu Sharma', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 2 },
      { userId: 'member_kritika', userName: 'Kritika Gupta 👑', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 * 1.8 }
    ]
  },
  {
    id: 'chat_init_3',
    senderId: 'member_ananya',
    senderName: 'Ananya Deshmukh',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    text: 'Who wants to do the Chai Enthusiast movie quiz round together tonight? ☕🎬',
    timestamp: 'Today at 3:45 PM',
    createdAt: nowTs - 3600000,
    reactions: { '☕': 5, '👏': 3 },
    seenBy: [
      { userId: 'member_ananya', userName: 'Ananya Deshmukh', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop', seenAt: nowTs - 3600000 },
      { userId: 'member_kritika', userName: 'Kritika Gupta 👑', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', seenAt: nowTs - 1800000 }
    ]
  }
];

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
    comments: [
      {
        id: 'c1',
        authorName: 'Priyanshu Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
        text: 'Royal aesthetic as always! Keep shining Kritika! 👑🔥',
        timestamp: '1 hour ago',
        createdAt: Date.now() - 3600000
      },
      {
        id: 'c2',
        authorName: 'Ananya Deshmukh',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
        text: 'Best batch memories ever! 💖✨',
        timestamp: '30 mins ago',
        createdAt: Date.now() - 1800000
      }
    ],
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000,
    isKritika: true
  },
  {
    id: 'insta_init_2',
    authorId: 'member_rohan',
    authorName: 'Rohan Mehra',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    location: 'Pizza & Macaroni Hub 🍕🧀',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80',
    filter: 'golden',
    caption: 'Just unlocked the Gourmet Truffle Macaroni dish in the Mood Quiz! Best comfort meal ever 🧀🤤',
    hashtags: ['#MacaroniMagic', '#MoodQuiz', '#Batch41Foodies'],
    likesCount: 24,
    likedByCurrentUser: false,
    comments: [
      {
        id: 'c3',
        authorName: 'Kritika Gupta 👑',
        isKritika: true,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        text: 'Yummm! Save some for the entire batch next time! 🍕🧀',
        timestamp: '15 mins ago',
        createdAt: Date.now() - 900000
      }
    ],
    timestamp: '4 hours ago',
    createdAt: Date.now() - 14400000
  }
];

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private chatMessages: GroupChatMessage[] = [];
  private directMessages: DirectChatMessage[] = [];
  private instagramPosts: InstagramPost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;

  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
      
      // Multi-client real-time sync across windows/tabs
      try {
        if ('BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel('marisol_multiuser_sync');
          this.broadcastChannel.onmessage = (event) => {
            if (event.data?.type === 'DELETE_CHAT_MESSAGE' && event.data?.messageId) {
              this.chatMessages = this.chatMessages.filter(m => m.id !== event.data.messageId);
              this.saveChatToStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_CHAT') {
              this.loadFromStorage();
              this.notify();
            } else if (event.data?.type === 'SYNC_DM') {
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
        // Bulletin Posts
        const postsQuery = query(
          collection(db, 'batch_updates'),
          orderBy('createdAt', 'desc'),
          limit(100)
        );
        onSnapshot(postsQuery, (snapshot) => {
          if (!snapshot.empty) {
            const remotePosts: BatchUpdatePost[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as BatchUpdatePost;
              remotePosts.push({ ...data, id: docSnap.id });
            });

            this.posts = remotePosts.sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              return (b.createdAt || 0) - (a.createdAt || 0);
            });
            this.saveToStorage();
            this.notify();
          }
        }, (err) => {
          console.warn('Firestore posts sync notice:', err);
        });

        // Group Chat Firestore Listener
        const chatQuery = query(
          collection(db, 'group_chat_messages'),
          orderBy('createdAt', 'asc'),
          limit(200)
        );
        onSnapshot(chatQuery, (snapshot) => {
          if (!snapshot.empty) {
            const remoteChat: GroupChatMessage[] = [];
            snapshot.forEach((docSnap) => {
              remoteChat.push({ ...(docSnap.data() as GroupChatMessage), id: docSnap.id });
            });
            this.chatMessages = remoteChat.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            this.saveChatToStorage();
            this.notify();
          }
        }, (err) => {
          console.warn('Firestore chat listener notice:', err);
        });

        // Direct Messages (1-on-1 between each user) Firestore Listener
        const dmQuery = query(
          collection(db, 'direct_chat_messages'),
          orderBy('createdAt', 'asc'),
          limit(300)
        );
        onSnapshot(dmQuery, (snapshot) => {
          if (!snapshot.empty) {
            const remoteDMs: DirectChatMessage[] = [];
            snapshot.forEach((docSnap) => {
              remoteDMs.push({ ...(docSnap.data() as DirectChatMessage), id: docSnap.id });
            });
            this.directMessages = remoteDMs.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            this.saveDirectMessagesToStorage();
            this.notify();
          }
        }, (err) => {
          console.warn('Firestore direct messages sync notice:', err);
        });

        // Instagram Posts Firestore Listener
        const instaQuery = query(
          collection(db, 'instagram_posts'),
          orderBy('createdAt', 'desc'),
          limit(100)
        );
        onSnapshot(instaQuery, (snapshot) => {
          if (!snapshot.empty) {
            const remoteInsta: InstagramPost[] = [];
            snapshot.forEach((docSnap) => {
              remoteInsta.push({ ...(docSnap.data() as InstagramPost), id: docSnap.id });
            });
            this.instagramPosts = remoteInsta.sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              return (b.createdAt || 0) - (a.createdAt || 0);
            });
            this.saveInstaToStorage();
            this.notify();
          }
        }, (err) => {
          console.warn('Firestore insta listener notice:', err);
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
        this.posts = parsed.filter(p => !['post_01', 'post_02', 'post_03', 'post_04'].includes(p.id));
      } else {
        this.posts = [];
        this.saveToStorage();
      }

      const storedChat = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedChat) {
        this.chatMessages = JSON.parse(storedChat);
      } else {
        this.chatMessages = [...DEFAULT_GROUP_CHAT_MESSAGES];
        this.saveChatToStorage();
      }

      const storedDMs = localStorage.getItem(DM_STORAGE_KEY);
      if (storedDMs) {
        this.directMessages = JSON.parse(storedDMs);
      } else {
        this.directMessages = [];
        this.saveDirectMessagesToStorage();
      }

      const storedInsta = localStorage.getItem(INSTA_STORAGE_KEY);
      if (storedInsta) {
        this.instagramPosts = JSON.parse(storedInsta);
      } else {
        this.instagramPosts = [...DEFAULT_INSTAGRAM_POSTS];
        this.saveInstaToStorage();
      }

      const queue = localStorage.getItem(QUEUE_KEY);
      if (queue) {
        this.offlineQueue = JSON.parse(queue);
      }
    } catch {
      this.posts = [];
      this.chatMessages = [...DEFAULT_GROUP_CHAT_MESSAGES];
      this.directMessages = [];
      this.instagramPosts = [...DEFAULT_INSTAGRAM_POSTS];
    }
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

  private saveDirectMessagesToStorage() {
    try {
      localStorage.setItem(DM_STORAGE_KEY, JSON.stringify(this.directMessages));
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
        await setDoc(doc(db, 'batch_updates', post.id), post);
      } catch (err) {
        console.warn('Failed to add post to Firestore:', err);
      }
    }
  }

  public getPosts(onlyCurrentUser?: boolean, currentUserId?: string): BatchUpdatePost[] {
    let list = [...this.posts];
    if (onlyCurrentUser && currentUserId) {
      list = list.filter(p => p.userId === currentUserId);
    }
    return list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  public getChatMessages(): GroupChatMessage[] {
    return [...this.chatMessages];
  }

  public getPinnedChatMessage(): GroupChatMessage | null {
    return this.chatMessages.slice().reverse().find(m => m.isPinned) || null;
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

  public markAllMessagesAsSeen(user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    if (!user.userName) return;
    const now = Date.now();
    let changed = false;

    this.chatMessages.forEach(msg => {
      if (!msg.seenBy) {
        msg.seenBy = [];
      }

      const alreadySeen = msg.seenBy.some(s =>
        (user.userId && s.userId === user.userId) ||
        (user.userEmail && s.userEmail && s.userEmail.toLowerCase() === user.userEmail.toLowerCase()) ||
        (s.userName && s.userName.toLowerCase().trim() === user.userName.toLowerCase().trim())
      );

      if (!alreadySeen) {
        msg.seenBy.push({
          userId: user.userId || `user_${Date.now()}`,
          userName: user.userName,
          userEmail: user.userEmail,
          avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          seenAt: now
        });
        changed = true;

        if (db && msg.id) {
          try {
            setDoc(doc(db, 'group_chat_messages', msg.id), { seenBy: msg.seenBy }, { merge: true });
          } catch {}
        }
      }
    });

    if (changed) {
      this.saveChatToStorage();
      try {
        this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
      } catch {}
      this.notify();
    }
  }

  public markMessageAsSeen(messageId: string, user: { userId: string; userName: string; userEmail?: string; avatarUrl?: string }) {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || !user.userName) return;

    if (!msg.seenBy) msg.seenBy = [];
    const alreadySeen = msg.seenBy.some(s =>
      (user.userId && s.userId === user.userId) ||
      (user.userEmail && s.userEmail && s.userEmail.toLowerCase() === user.userEmail.toLowerCase()) ||
      (s.userName && s.userName.toLowerCase().trim() === user.userName.toLowerCase().trim())
    );

    if (!alreadySeen) {
      msg.seenBy.push({
        userId: user.userId || `user_${Date.now()}`,
        userName: user.userName,
        userEmail: user.userEmail,
        avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
        seenAt: Date.now()
      });
      this.saveChatToStorage();
      try {
        this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
      } catch {}
      if (db && msg.id) {
        try {
          setDoc(doc(db, 'group_chat_messages', msg.id), { seenBy: msg.seenBy }, { merge: true });
        } catch {}
      }
      this.notify();
    }
  }

  public getInstagramPosts(): InstagramPost[] {
    return [...this.instagramPosts].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
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
      try {
        this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
      } catch {}
      this.notify();
      return { queued: false, post: newPost };
    }
  }

  public async sendGroupChatMessage(data: {
    senderId?: string;
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
  }): Promise<GroupChatMessage> {
    const name = data.senderName.trim() || 'Batch 41 Student';
    const email = data.senderEmail || '';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      email.toLowerCase().includes('kritika') ||
                      name.toLowerCase().includes('marisol');

    const resolvedSenderId = data.senderId?.trim() || 
      (email ? `user_${email.split('@')[0]}` : `user_${name.toLowerCase().replace(/\s+/g, '_')}`);

    const isNewUser = data.senderIsNewUser ?? true;
    const userTag = data.senderUserTag || (isKritika ? 'Founder 👑' : 'New User');

    const msg: GroupChatMessage = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      senderId: resolvedSenderId,
      senderName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      senderEmail: data.senderEmail,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      senderIsNewUser: isNewUser,
      senderUserTag: userTag,
      text: data.text.trim(),
      imageUrl: data.imageUrl,
      replyTo: data.replyTo,
      poll: data.poll,
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika,
      reactions: {},
      seenBy: [
        {
          userId: resolvedSenderId,
          userName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
          userEmail: data.senderEmail,
          avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          seenAt: Date.now()
        }
      ]
    };

    this.chatMessages.push(msg);
    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'group_chat_messages', msg.id), msg);
      } catch (err) {
        console.warn('Failed to sync chat message to Firestore:', err);
      }
    }

    this.notify();
    return msg;
  }

  // =========================================================================
  // DIRECT MESSAGING (Chat With Each Other User)
  // =========================================================================

  public getDirectMessages(
    convIdOrUserA: string,
    userB?: string,
    emailA?: string,
    emailB?: string
  ): DirectChatMessage[] {
    let convId = convIdOrUserA;
    if (userB) {
      convId = getDirectConversationId(emailA || convIdOrUserA, emailB || userB);
    }
    return this.directMessages
      .filter(m => m.conversationId === convId)
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }

  public getAllDirectConversations(myUserId?: string, myUserEmail?: string): {
    conversationId: string;
    partnerId: string;
    partnerName: string;
    partnerEmail?: string;
    partnerAvatarUrl?: string;
    partnerIsNewUser?: boolean;
    lastMessage: DirectChatMessage;
    unreadCount: number;
  }[] {
    const cleanMyId = (myUserId || '').toLowerCase();
    const cleanMyEmail = (myUserEmail || '').toLowerCase();

    const conversationMap = new Map<string, DirectChatMessage[]>();

    this.directMessages.forEach(msg => {
      const sId = (msg.senderId || '').toLowerCase();
      const sEmail = (msg.senderEmail || '').toLowerCase();
      const rId = (msg.recipientId || '').toLowerCase();
      const rEmail = (msg.recipientEmail || '').toLowerCase();

      const involvesMe = (cleanMyId && (sId === cleanMyId || rId === cleanMyId)) ||
                         (cleanMyEmail && (sEmail === cleanMyEmail || rEmail === cleanMyEmail));

      if (involvesMe) {
        if (!conversationMap.has(msg.conversationId)) {
          conversationMap.set(msg.conversationId, []);
        }
        conversationMap.get(msg.conversationId)!.push(msg);
      }
    });

    const result: {
      conversationId: string;
      partnerId: string;
      partnerName: string;
      partnerEmail?: string;
      partnerAvatarUrl?: string;
      partnerIsNewUser?: boolean;
      lastMessage: DirectChatMessage;
      unreadCount: number;
    }[] = [];

    conversationMap.forEach((msgs, convId) => {
      const sorted = msgs.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      const lastMsg = sorted[sorted.length - 1];
      const isSender = (lastMsg.senderId.toLowerCase() === cleanMyId) || (Boolean(cleanMyEmail) && lastMsg.senderEmail?.toLowerCase() === cleanMyEmail);
      
      const partnerId = isSender ? lastMsg.recipientId : lastMsg.senderId;
      const partnerName = isSender ? lastMsg.recipientName : lastMsg.senderName;
      const partnerEmail = isSender ? lastMsg.recipientEmail : lastMsg.senderEmail;
      const partnerAvatarUrl = isSender ? lastMsg.recipientAvatarUrl : lastMsg.senderAvatarUrl;
      const partnerIsNewUser = isSender ? undefined : lastMsg.senderIsNewUser;

      const unreadCount = sorted.filter(m => {
        const fromOther = (m.senderId.toLowerCase() !== cleanMyId) && (!cleanMyEmail || m.senderEmail?.toLowerCase() !== cleanMyEmail);
        return fromOther && !m.isRead;
      }).length;

      result.push({
        conversationId: convId,
        partnerId,
        partnerName,
        partnerEmail,
        partnerAvatarUrl,
        partnerIsNewUser,
        lastMessage: lastMsg,
        unreadCount
      });
    });

    return result.sort((a, b) => (b.lastMessage.createdAt || 0) - (a.lastMessage.createdAt || 0));
  }

  public async sendDirectMessage(data: {
    senderId: string;
    senderName: string;
    senderEmail?: string;
    senderAvatarUrl?: string;
    senderIsNewUser?: boolean;
    senderUserTag?: string;
    recipientId: string;
    recipientName: string;
    recipientEmail?: string;
    recipientAvatarUrl?: string;
    text: string;
    imageUrl?: string;
  }): Promise<DirectChatMessage> {
    const convId = getDirectConversationId(
      data.senderEmail || data.senderId,
      data.recipientEmail || data.recipientId
    );

    const msg: DirectChatMessage = {
      id: `dm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      conversationId: convId,
      senderId: data.senderId,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderAvatarUrl: data.senderAvatarUrl || '/marisol/avatars/01_brighter_ideas.png',
      senderIsNewUser: data.senderIsNewUser ?? true,
      senderUserTag: data.senderUserTag || 'New User',
      recipientId: data.recipientId,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      recipientAvatarUrl: data.recipientAvatarUrl,
      text: data.text.trim(),
      imageUrl: data.imageUrl,
      timestamp: 'Just now',
      createdAt: Date.now(),
      isRead: false
    };

    this.directMessages.push(msg);
    this.saveDirectMessagesToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_DM' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'direct_chat_messages', msg.id), msg);
      } catch (err) {
        console.warn('Failed to sync DM to Firestore:', err);
      }
    }

    this.notify();

    // Friendly automated comforting reply from built-in batch members for instant interactivity
    const rLower = (data.recipientName || '').toLowerCase();
    const isBotRecipient = rLower.includes('kritika') || rLower.includes('priyanshu') || rLower.includes('ananya') || rLower.includes('rohan');
    
    if (isBotRecipient) {
      setTimeout(async () => {
        let replyText = `Hey ${data.senderName.split(' ')[0]}! Great to hear from you. Welcome to Factory of Fun as our new user! ♡ 🌸`;
        if (rLower.includes('kritika')) {
          replyText = `Hey ${data.senderName.split(' ')[0]}! 👑 So wonderful chatting with you! Welcome as a New User to our Factory of Fun comfort hub ♡ Savoring sweet memories together! ✨`;
        } else if (rLower.includes('priyanshu')) {
          replyText = `Hey ${data.senderName.split(' ')[0]}! 🍕 Welcome! Ready for a quick round of 1,000+ Food & Movie trivia anytime!`;
        } else if (rLower.includes('ananya')) {
          replyText = `Hi ${data.senderName.split(' ')[0]}! ☕ Enjoying a warm cup of chai right now. So happy you reached out and joined us!`;
        } else if (rLower.includes('rohan')) {
          replyText = `Hey ${data.senderName.split(' ')[0]}! 🎸 Welcome! Listening to some relaxing music on the jukebox. Hope you have a wonderful day!`;
        }

        const autoMsg: DirectChatMessage = {
          id: `dm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          conversationId: convId,
          senderId: data.recipientId,
          senderName: data.recipientName,
          senderEmail: data.recipientEmail,
          senderAvatarUrl: data.recipientAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          recipientId: data.senderId,
          recipientName: data.senderName,
          recipientEmail: data.senderEmail,
          recipientAvatarUrl: data.senderAvatarUrl,
          text: replyText,
          timestamp: 'Just now',
          createdAt: Date.now(),
          isRead: false
        };

        this.directMessages.push(autoMsg);
        this.saveDirectMessagesToStorage();
        try {
          this.broadcastChannel?.postMessage({ type: 'SYNC_DM' });
        } catch {}
        if (db) {
          try {
            await setDoc(doc(db, 'direct_chat_messages', autoMsg.id), autoMsg);
          } catch {}
        }
        this.notify();
      }, 1200);
    }

    return msg;
  }

  public async markDirectMessagesAsRead(conversationId: string, currentUserId: string) {
    let changed = false;
    this.directMessages.forEach(m => {
      if (m.conversationId === conversationId && m.recipientId === currentUserId && !m.isRead) {
        m.isRead = true;
        changed = true;
        if (db) {
          try {
            setDoc(doc(db, 'direct_chat_messages', m.id), { isRead: true }, { merge: true });
          } catch {}
        }
      }
    });
    if (changed) {
      this.saveDirectMessagesToStorage();
      this.notify();
    }
  }

  public async pinChatMessage(messageId: string, pinnedBy?: string) {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    const willPin = !msg.isPinned;
    this.chatMessages.forEach(m => {
      if (m.id === messageId) {
        m.isPinned = willPin;
        m.pinnedBy = willPin ? (pinnedBy || 'Classmate') : undefined;
        m.pinnedAt = willPin ? Date.now() : undefined;
      } else if (willPin) {
        m.isPinned = false;
      }
    });

    this.saveChatToStorage();
    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'group_chat_messages', messageId), {
          isPinned: willPin,
          pinnedBy: willPin ? (pinnedBy || 'Classmate') : null,
          pinnedAt: willPin ? Date.now() : null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to update pin on Firestore:', err);
      }
    }

    this.notify();
  }

  public async unpinChatMessage(messageId: string) {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    msg.isPinned = false;
    msg.pinnedBy = undefined;
    msg.pinnedAt = undefined;
    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'group_chat_messages', messageId), {
          isPinned: false,
          pinnedBy: null,
          pinnedAt: null
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to unpin message on Firestore:', err);
      }
    }

    this.notify();
  }

  public votePoll(messageId: string, optionId: string, voterName: string) {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || !msg.poll) return;

    const voter = voterName.trim() || 'You';
    msg.poll.options.forEach(opt => {
      // Toggle or switch vote
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

    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'group_chat_messages', messageId), { poll: msg.poll }, { merge: true });
      } catch {}
    }

    this.notify();
  }

  public reactToChatMessage(messageId: string, emoji: string) {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return;

    if (!msg.reactions) {
      msg.reactions = {};
    }

    msg.reactions[emoji] = (msg.reactions[emoji] || 0) + 1;
    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'group_chat_messages', messageId), { reactions: msg.reactions }, { merge: true });
      } catch {}
    }

    this.notify();
  }

  public async editChatMessage(
    messageId: string, 
    newText: string,
    editor?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg || msg.isDeletedForEveryone) {
      return { success: false, error: 'Message not found or deleted.' };
    }

    // Strict author verification: ONLY author can edit their own message!
    if (editor) {
      const editorNameClean = (editor.name || '').replace(' 👑', '').trim().toLowerCase();
      const senderNameClean = (msg.senderName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (editor.id && msg.senderId && editor.id === msg.senderId) ||
        (editor.email && msg.senderEmail && editor.email.toLowerCase().trim() === msg.senderEmail.toLowerCase().trim()) ||
        (editorNameClean !== '' && editorNameClean === senderNameClean)
      );

      if (!isAuthor) {
        return { success: false, error: 'Permission denied: You can only edit your own messages.' };
      }
    }

    msg.text = newText.trim();
    msg.isEdited = true;
    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'group_chat_messages', messageId), { text: msg.text, isEdited: true }, { merge: true });
      } catch (err) {
        console.warn('Failed to edit chat message on Firestore:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public deleteChatMessageForMe(messageId: string) {
    this.chatMessages = this.chatMessages.filter(m => m.id !== messageId);
    this.saveChatToStorage();
    this.notify();
  }

  public async deleteChatMessageForEveryone(
    messageId: string,
    deleter?: { id?: string; email?: string; name?: string }
  ): Promise<{ success: boolean; error?: string }> {
    const msg = this.chatMessages.find(m => m.id === messageId);
    if (!msg) return { success: false, error: 'Message not found.' };

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const senderNameClean = (msg.senderName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && msg.senderId && deleter.id === msg.senderId) ||
        (deleter.email && msg.senderEmail && deleter.email.toLowerCase().trim() === msg.senderEmail.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === senderNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this message for everyone.' };
      }
    }

    // Remove from local in-memory message list
    this.chatMessages = this.chatMessages.filter(m => m.id !== messageId);
    this.saveChatToStorage();

    // Broadcast instant removal to all tabs/windows
    try {
      this.broadcastChannel?.postMessage({ type: 'DELETE_CHAT_MESSAGE', messageId });
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    // Delete document directly from Firebase Firestore
    if (db) {
      try {
        await deleteDoc(doc(db, 'group_chat_messages', messageId));
      } catch (err) {
        console.warn('Failed to delete for everyone on Firestore:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  // =================== INSTAGRAM POSTS MANAGEMENT ===================
  public async addInstagramPost(data: {
    userId?: string;
    userEmail?: string;
    authorName: string;
    authorAvatarUrl?: string;
    location?: string;
    imageUrl: string;
    filter?: string;
    caption: string;
    hashtags?: string[];
  }): Promise<InstagramPost> {
    const name = data.authorName.trim() || 'Batch 41 Creator';
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (data.userEmail && data.userEmail.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    const newPost: InstagramPost = {
      id: `insta_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: data.userId,
      userEmail: data.userEmail,
      authorName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      authorAvatarUrl: data.authorAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      location: data.location || 'Batch 41 Comfort Hub 🌸',
      imageUrl: data.imageUrl,
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
        await setDoc(doc(db, 'instagram_posts', newPost.id), newPost);
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
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return { success: false, error: 'Post not found.' };

    if (deleter) {
      const isKritika = (deleter.name || '').toLowerCase().includes('kritika') || (deleter.email || '').toLowerCase().includes('kritika');
      const deleterNameClean = (deleter.name || '').replace(' 👑', '').trim().toLowerCase();
      const authorNameClean = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
      const isAuthor = Boolean(
        (deleter.id && post.userId && deleter.id === post.userId) ||
        (deleter.email && (post.userEmail || post.authorEmail) && deleter.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
        (deleterNameClean !== '' && deleterNameClean === authorNameClean)
      );

      if (!isAuthor && !isKritika) {
        return { success: false, error: 'Permission denied: Only the author can delete this post.' };
      }
    }

    this.instagramPosts = this.instagramPosts.filter(p => p.id !== postId);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await deleteDoc(doc(db, 'instagram_posts', postId));
      } catch (err) {
        console.warn('Failed to delete post on Firestore:', err);
      }
    }

    this.notify();
    return { success: true };
  }

  public likeInstagramPost(postId: string, currentUserName?: string) {
    const post = this.instagramPosts.find(p => p.id === postId);
    if (!post) return;

    if (post.likedByCurrentUser) {
      post.likedByCurrentUser = false;
      post.likesCount = Math.max(0, post.likesCount - 1);
      if (currentUserName && post.likedByUsers) {
        post.likedByUsers = post.likedByUsers.filter(u => u !== currentUserName);
      }
    } else {
      post.likedByCurrentUser = true;
      post.likesCount += 1;
      if (!post.likedByUsers) post.likedByUsers = [];
      if (currentUserName && !post.likedByUsers.includes(currentUserName)) {
        post.likedByUsers.push(currentUserName);
      }
    }

    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        setDoc(doc(db, 'instagram_posts', postId), { 
          likesCount: post.likesCount,
          likedByUsers: post.likedByUsers || []
        }, { merge: true });
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
      isKritika
    };

    post.comments.push(newComment);
    this.saveInstaToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_INSTA' });
    } catch {}

    if (db) {
      try {
        await setDoc(doc(db, 'instagram_posts', postId), { comments: post.comments }, { merge: true });
      } catch (err) {
        console.warn('Failed to sync insta comment to Firestore:', err);
      }
    }

    this.notify();
    return newComment;
  }

  public async deletePost(postId: string) {
    this.posts = this.posts.filter(p => p.id !== postId);
    this.saveToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_POSTS' });
    } catch {}

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

