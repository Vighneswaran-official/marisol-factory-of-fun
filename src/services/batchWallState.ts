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
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  poll?: ChatPoll;
  timestamp: string;
  createdAt: number;
  isKritika?: boolean;
  reactionEmoji?: string;
  reactions?: Record<string, number>; // emoji -> count
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
}

const STORAGE_KEY = 'marisol_batch_updates_v2';
const CHAT_STORAGE_KEY = 'marisol_group_chat_messages_v2';
const INSTA_STORAGE_KEY = 'marisol_instagram_posts_v2';
const QUEUE_KEY = 'marisol_batch_offline_queue_v2';

const DEFAULT_GROUP_CHAT_MESSAGES: GroupChatMessage[] = [
  {
    id: 'chat_init_1',
    senderName: 'Kritika Gupta 👑',
    senderEmail: 'kritika.gupta@mlp41.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    text: 'Hey Batch 41 family! Welcome to our comfort lounge! Savoring every sweet memory together ♡ ✨',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    timestamp: 'Today at 2:30 PM',
    createdAt: Date.now() - 3600000 * 3,
    isKritika: true,
    reactionEmoji: '💖',
    reactions: { '💖': 8, '✨': 5 }
  },
  {
    id: 'chat_init_2',
    senderName: 'Priyanshu Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop',
    text: '@Kritika Gupta 👑 The music player and comfort arcade are pure vibes! 🧀🍕',
    timestamp: 'Today at 3:15 PM',
    createdAt: Date.now() - 3600000 * 2,
    reactions: { '🍕': 4, '🔥': 3 }
  },
  {
    id: 'chat_init_3',
    senderName: 'Ananya Deshmukh',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop',
    text: 'Who wants to do the Chai Enthusiast movie quiz round together tonight? ☕🎬',
    timestamp: 'Today at 3:45 PM',
    createdAt: Date.now() - 3600000,
    reactions: { '☕': 5, '👏': 3 }
  }
];

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta_init_1',
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
            if (event.data?.type === 'SYNC_CHAT') {
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

            this.posts = remotePosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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
            this.instagramPosts = remoteInsta.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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

  public getChatMessages(): GroupChatMessage[] {
    return [...this.chatMessages];
  }

  public getInstagramPosts(): InstagramPost[] {
    return [...this.instagramPosts];
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

    const msg: GroupChatMessage = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      senderId: data.senderId,
      senderName: isKritika && !name.includes('👑') ? `${name} 👑` : name,
      senderEmail: data.senderEmail,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      text: data.text.trim(),
      imageUrl: data.imageUrl,
      replyTo: data.replyTo,
      poll: data.poll,
      timestamp: 'Just now',
      createdAt: Date.now(),
      isKritika,
      reactions: {}
    };

    this.chatMessages.push(msg);
    this.saveChatToStorage();

    try {
      this.broadcastChannel?.postMessage({ type: 'SYNC_CHAT' });
    } catch {}

    if (db) {
      try {
        await addDoc(collection(db, 'group_chat_messages'), msg);
      } catch (err) {
        console.warn('Failed to sync chat message to Firestore:', err);
      }
    }

    this.notify();
    return msg;
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
        await addDoc(collection(db, 'instagram_posts'), newPost);
      } catch (err) {
        console.warn('Failed to add insta post to Firestore:', err);
      }
    }

    this.notify();
    return newPost;
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

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const batchWallService = new BatchWallService();

