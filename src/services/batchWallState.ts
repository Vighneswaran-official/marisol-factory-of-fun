// Shared Batch Wall State Service for MLP41PT Batch Students with Firebase Firestore
import { 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  setDoc, 
  deleteDoc 
} from './firebase';

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
    likedByUsers: ['Kritika Gupta 👑'],
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
  }
];

class BatchWallService {
  private posts: BatchUpdatePost[] = [];
  private chatMessages: GroupChatMessage[] = [];
  private instagramPosts: InstagramPost[] = [];
  private offlineQueue: BatchUpdatePost[] = [];
  private chatOfflineQueue: GroupChatMessage[] = [];
  private listeners: Set<() => void> = new Set();
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private lastSyncToast: string | null = null;
  private broadcastChannel: BroadcastChannel | null = null;

  // Real-Time Group Chat State
  private chatConnectionStatus: 'connecting' | 'connected' | 'offline' | 'error' = 'connecting';
  private chatErrorMessage: string | null = null;
  private chatUnsubscribe: (() => void) | null = null;

  constructor() {
    this.cleanLegacyStorage();
    this.loadFromStorage();

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

    this.initFirestoreSync();
  }

  private cleanLegacyStorage() {
    try {
      localStorage.removeItem('marisol_batch_updates_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v1');
      localStorage.removeItem('marisol_direct_chat_messages_v2');
    } catch {}
  }

  private initFirestoreSync() {
    if (db) {
      try {
        // 1. Bulletin Corkboard Posts
        const postsQuery = query(
          collection(db, 'batch_updates'),
          orderBy('createdAt', 'desc')
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
          console.warn('[BatchWall] Firestore posts sync notice:', err);
        });

        // 2. Authoritative Group Chat Listener
        this.initChatListener();

        // 3. Instagram / Photo Wall Posts Listener
        const instaQuery = query(
          collection(db, 'instagram_posts'),
          orderBy('createdAt', 'desc')
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
          console.warn('[BatchWall] Firestore insta listener notice:', err);
        });

      } catch (err) {
        console.warn('[BatchWall] Firestore sync setup error:', err);
      }
    } else {
      this.chatConnectionStatus = 'offline';
      this.chatErrorMessage = 'Firebase Firestore is not configured.';
      this.notify();
    }
  }

  /**
   * Initializes exactly ONE authoritative group-chat Firestore listener.
   * If called again, cleans up previous listener to prevent duplicates.
   */
  public initChatListener() {
    if (this.chatUnsubscribe) {
      this.chatUnsubscribe();
      this.chatUnsubscribe = null;
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

    try {
      const chatQuery = query(
        collection(db, 'group_chat_messages'),
        orderBy('createdAt', 'asc')
      );

      this.chatUnsubscribe = onSnapshot(
        chatQuery,
        (snapshot) => {
          const remoteChat: GroupChatMessage[] = [];

          snapshot.forEach((docSnap) => {
            remoteChat.push({
              ...(docSnap.data() as GroupChatMessage),
              id: docSnap.id,
            });
          });

          remoteChat.sort(
            (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
          );

          // Overwrite local chat state unconditionally — authoritative from Firestore
          this.chatMessages = remoteChat;
          this.chatConnectionStatus = 'connected';
          this.chatErrorMessage = null;

          this.saveChatToStorage();
          this.notify();
        },
        (error) => {
          console.error('[Batch 41 Group Chat] Firestore listener error:', error);
          this.chatConnectionStatus = 'error';
          this.chatErrorMessage = 'Unable to connect to the group chat. Please check your internet connection.';
          this.notify();
        }
      );
    } catch (err: any) {
      console.error('[Batch 41 Group Chat] Firestore init error:', err);
      this.chatConnectionStatus = 'error';
      this.chatErrorMessage = 'Unable to connect to the group chat. Please check your internet connection.';
      this.notify();
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

      // Startup / Offline Cache for Group Chat (begins empty if no cache, never seeds fake mock chat messages)
      const storedChat = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedChat) {
        this.chatMessages = JSON.parse(storedChat);
      } else {
        this.chatMessages = [];
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

      const chatQueue = localStorage.getItem(CHAT_QUEUE_KEY);
      if (chatQueue) {
        this.chatOfflineQueue = JSON.parse(chatQueue);
      }
    } catch {
      this.posts = [];
      this.chatMessages = [];
      this.instagramPosts = [...DEFAULT_INSTAGRAM_POSTS];
      this.offlineQueue = [];
      this.chatOfflineQueue = [];
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
            await setDoc(doc(db, 'group_chat_messages', msg.id), msg);
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
    this.initChatListener();
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
        await setDoc(doc(db, 'batch_updates', post.id), post);
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

  public getChatMessages(currentUserId?: string): GroupChatMessage[] {
    if (!currentUserId) {
      return [...this.chatMessages];
    }
    try {
      const hiddenKey = `marisol_chat_hidden_${currentUserId}`;
      const stored = localStorage.getItem(hiddenKey);
      if (stored) {
        const hiddenIds: string[] = JSON.parse(stored);
        const hiddenSet = new Set(hiddenIds);
        return this.chatMessages.filter(m => !hiddenSet.has(m.id));
      }
    } catch {}
    return [...this.chatMessages];
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
      throw new Error('Firebase Firestore is not configured.');
    }

    const text = data.text.trim();
    if (!text && !data.imageUrl && !data.poll) {
      throw new Error('Message cannot be empty.');
    }

    if (!data.senderId) {
      throw new Error('Authenticated user ID (Firebase UID) is required to chat.');
    }

    const messageRef = doc(collection(db, 'group_chat_messages'));
    const now = Date.now();

    const isKritika = data.senderName.toLowerCase().includes('kritika') ||
                      Boolean(data.senderEmail && data.senderEmail.toLowerCase().includes('kritika')) ||
                      data.senderName.toLowerCase().includes('marisol');

    const message: GroupChatMessage = {
      id: messageRef.id,
      senderId: data.senderId,
      senderName: isKritika && !data.senderName.includes('👑') ? `${data.senderName.trim()} 👑` : data.senderName.trim(),
      senderEmail: data.senderEmail,
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
          userId: data.senderId,
          userName: data.senderName,
          userEmail: data.senderEmail,
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

    // Write authoritative record directly to Firestore
    try {
      await setDoc(messageRef, message);
    } catch (err) {
      console.error('[Batch 41 Group Chat] Firestore error sending message:', err);
      // Queue offline on network failure
      this.chatOfflineQueue.push(message);
      this.saveChatQueueToStorage();
      this.chatMessages.push(message);
      this.saveChatToStorage();
      this.notify();
      throw err;
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
        { reactions: updatedReactions },
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
        {
          isPinned: true,
          pinnedBy: pinnedByUid || 'Classmate',
          pinnedAt: Date.now()
        },
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
        { poll: msg.poll },
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
        { seenBy: msg.seenBy },
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
            { seenBy: msg.seenBy },
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
    return [...this.instagramPosts].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
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
