import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService, type InstagramPost, type GroupChatMessage } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Plus, Sparkles, Send, X, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin, Camera, Paperclip, Smile,
  Bookmark, Share2, CheckCheck, Eye, Compass, Tag, Edit3, Check,
  Reply, BarChart2, AtSign, Video, Phone, MoreVertical, Mic,
  Trash2, ChevronDown, Ban, Globe, Lock, Clock,
  Search, Filter, Users, ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';

interface BatchUpdatesWallProps {
  onNavigate?: (screen: ScreenState) => void;
  initialMode?: 'chat' | 'posts' | 'bulletin';
}

// Client-side image compression for fast sync and storage
const compressImageFile = (file: File, maxDimension = 960, quality = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Image failed to load'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
};

const FILTER_STYLES: Record<string, { label: string; style: string; icon: string }> = {
  none: { label: 'Natural', style: '', icon: '✨' },
  warm: { label: 'Warm Glow', style: 'sepia(25%) saturate(140%) brightness(105%)', icon: '🌅' },
  golden: { label: 'Golden Hour', style: 'contrast(110%) brightness(110%) sepia(35%) saturate(150%)', icon: '☀️' },
  pink: { label: 'Pastel Rose', style: 'hue-rotate(330deg) saturate(130%) brightness(108%)', icon: '🌸' },
  vintage: { label: 'Vintage', style: 'sepia(50%) contrast(90%) brightness(95%)', icon: '🎞️' },
  bw: { label: 'Noir B&W', style: 'grayscale(100%) contrast(120%)', icon: '🖤' },
};

const SUGGESTED_HASHTAGS = [
  '#Batch41', '#KritikaQueen', '#ComfortVibes', '#FactoryOfFun', 
  '#MacaroniMagic', '#Memories', '#ChaiEnthusiast', '#DailyJoy'
];

const PRESET_PHOTOS = [
  { label: 'Batch Celebration 🎉', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80' },
  { label: 'Pizza & Macaroni 🍕', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80' },
  { label: 'Warm Chai & Vibes ☕', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80' },
  { label: 'Golden Sunset Moment 🌅', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80' },
  { label: 'Comfort Study Corner 📚', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80' }
];

const AVATAR_PRESETS = [
  { label: 'Kritika 👑', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' },
  { label: 'Priyanshu 🍕', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop' },
  { label: 'Ananya ☕', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop' },
  { label: 'Rohan 🎸', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
  { label: 'Marisol Star ✨', url: '/marisol/avatars/01_brighter_ideas.png' },
  { label: 'Sparkle Vibe 🌸', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
];

const COMMON_EMOJIS = ['💖', '🌸', '👑', '✨', '🍕', '☕', '🔥', '👏', '🎉', '🥳', '🌈', '🌻', '💌', '🥰', '🤗', '⭐'];

// Curated harmonious color palettes for chat members (Comfort Wall theme)
const SENDER_COLORS: Record<string, string> = {
  'kritika': 'text-rose-600', // Rose
  'priyanshu': 'text-indigo-600', // Indigo
  'ananya': 'text-purple-600', // Purple
  'rohan': 'text-amber-600', // Warm Amber
  'marisol': 'text-rose-600', // Rose
  'dhanashree': 'text-sky-600', // Sky Blue
  'knit kingdom': 'text-teal-600', // Teal
};

const getWhatsAppSenderColor = (name: string, isKritika?: boolean) => {
  if (isKritika || name.toLowerCase().includes('kritika')) return 'text-rose-600 font-black';
  const lower = name.toLowerCase();
  for (const [key, color] of Object.entries(SENDER_COLORS)) {
    if (lower.includes(key)) return color;
  }
  const fallbackColors = ['text-rose-600', 'text-indigo-600', 'text-amber-600', 'text-teal-600', 'text-purple-600', 'text-pink-600'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
};

// Render message text with highlighted @mentions and bold headings in Marisol style
const renderFormattedMessageText = (text: string, isCurrentUser: boolean) => {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens = line.split(/(@[A-Za-z0-9_👑\s]+?(?=\s|$|[.,!?\n])|#\d{5,}|\b\d{10}\b|\b(?:GRAND FESTIVE SALE|Start Date|End Date):?)/g);
    
    return (
      <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
        {tokens.map((token, tokIdx) => {
          if (!token) return null;
          if (token.startsWith('@')) {
            return (
              <span 
                key={tokIdx} 
                className={`font-bold ${isCurrentUser ? 'text-amber-200 underline' : 'text-rose-600 bg-rose-50/90 px-1 py-0.5 rounded'} hover:underline cursor-pointer`}
              >
                {token}
              </span>
            );
          }
          if (token.startsWith('#') || /^\d{10}$/.test(token)) {
            return (
              <span 
                key={tokIdx} 
                className={`font-bold underline cursor-pointer ${isCurrentUser ? 'text-amber-100' : 'text-rose-600'}`}
              >
                {token}
              </span>
            );
          }
          if (/^(?:GRAND FESTIVE SALE|Start Date|End Date):?$/.test(token)) {
            return (
              <span key={tokIdx} className={isCurrentUser ? 'font-black text-white' : 'font-black text-stone-900'}>
                {token}
              </span>
            );
          }
          return <span key={tokIdx}>{token}</span>;
        })}
      </div>
    );
  });
};

export const BatchUpdatesWall: React.FC<BatchUpdatesWallProps> = ({ onNavigate: _onNavigate, initialMode }) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Mode Switcher: 'chat' | 'posts' | 'bulletin'
  const [activeMode, setActiveMode] = useState<'chat' | 'posts' | 'bulletin'>(initialMode || 'chat');

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Modals & Popups
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showNewPhotoPostModal, setShowNewPhotoPostModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);
  const [seenInfoMsg, setSeenInfoMsg] = useState<GroupChatMessage | null>(null);

  // Profile Editor Form State
  const [profileNameInput, setProfileNameInput] = useState(currentUser?.name || player.nickname || 'Kritika Gupta 👑');
  const [profileAvatarInput, setProfileAvatarInput] = useState(currentUser?.avatarUrl || AVATAR_PRESETS[0].url);
  const [profileMoodInput, setProfileMoodInput] = useState(currentUser?.currentMood || 'Radiant Sunshine 🌸');
  const [profileMoodEmojiInput, setProfileMoodEmojiInput] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [profileStatusInput, setProfileStatusInput] = useState(currentUser?.statusNote || 'Savoring sweet memories ♡ ✨');
  const [profileBatchInput, setProfileBatchInput] = useState(currentUser?.batch || 'MLP41PT');
  const profileAvatarFileInputRef = useRef<HTMLInputElement | null>(null);

  // Group Chat State (WhatsApp Group Style)
  const [chatInput, setChatInput] = useState('');
  const [chatImageAttachment, setChatImageAttachment] = useState<string | null>(null);
  const [replyingToMessage, setReplyingToMessage] = useState<GroupChatMessage | null>(null);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [showChatEmojiPicker, setShowChatEmojiPicker] = useState(false);
  const [showMentionPicker, setShowMentionPicker] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [highlightedChatMsgId, setHighlightedChatMsgId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement | null>(null);

  // Message Edit & Delete State
  const [editingMessage, setEditingMessage] = useState<GroupChatMessage | null>(null);
  const [editingText, setEditingText] = useState('');
  const [activeActionMenuMsgId, setActiveActionMenuMsgId] = useState<string | null>(null);
  const [deleteModalMsg, setDeleteModalMsg] = useState<GroupChatMessage | null>(null);
  const [deletionReaction, setDeletionReaction] = useState<{ text: string; emoji: string } | null>(null);

  // Post Edit & Options State
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [editingPostCaption, setEditingPostCaption] = useState('');
  const [activePostMenuId, setActivePostMenuId] = useState<string | null>(null);

  // Group Poll Creation State
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOption1, setPollOption1] = useState('');
  const [pollOption2, setPollOption2] = useState('');
  const [pollOption3, setPollOption3] = useState('');

  // Post Feed State
  const [postCommentText, setPostCommentText] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [heartBurstId, setHeartBurstId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // New Photo Post Form State
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('Comfort Lounge 🌸');
  const [newPostFilter, setNewPostFilter] = useState('none');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#Batch41', '#ComfortVibes']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [isPublishingPost, setIsPublishingPost] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Bulletin Corkboard State
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [isSendingReply, setIsSendingReply] = useState<Record<string, boolean>>({});

  // Bulletin New Note Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Student');
  const [selectedPose] = useState(player.activeSticker || 'brighter_ideas');
  const [selectedMood, setSelectedMood] = useState(currentUser?.currentMood || 'Radiant Sunshine');
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [bulletinText, setBulletinText] = useState('');

  // Data state
  const allBulletinPosts = batchWallService.getPosts();
  const chatMessages = batchWallService.getChatMessages();
  const photoPosts = batchWallService.getInstagramPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // Chat Subtabs & Direct 1-on-1 Chatting State
  const [chatSubTab, setChatSubTab] = useState<'lounge' | 'direct' | 'users'>('lounge');
  const [selectedDirectUser, setSelectedDirectUser] = useState<StudentProfile | null>(null);
  const [directInput, setDirectInput] = useState('');
  const [directImageAttachment, setDirectImageAttachment] = useState<string | null>(null);
  const [showDirectEmojiPicker, setShowDirectEmojiPicker] = useState(false);
  const [isSendingDirect, setIsSendingDirect] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const directChatBottomRef = useRef<HTMLDivElement | null>(null);
  const directFileInputRef = useRef<HTMLInputElement | null>(null);

  // Matched Message Table & Session Inspection State
  const [chatFilterMode, setChatFilterMode] = useState<'all' | 'my_messages'>('all');

  // Compute matched session user data by querying the message table
  const userMatchedSessionData = useMemo(() => {
    return batchWallService.getUserMatchedChatData({
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput || studentName
    });
  }, [currentUser, profileNameInput, studentName, chatMessages]);

  useEffect(() => {
    const unsubWall = batchWallService.subscribe(() => setTick(t => t + 1));
    const unsubAuth = authService.subscribe(() => setTick(t => t + 1));
    return () => { 
      unsubWall(); 
      unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (activeMode === 'chat') {
      if (chatSubTab === 'lounge') {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (chatSubTab === 'direct' && selectedDirectUser) {
        directChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      const userToMark = currentUser ? {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        avatarUrl: currentUser.avatarUrl
      } : {
        userId: `user_${player.nickname || 'Student'}`,
        userName: player.nickname || 'Student',
        avatarUrl: '/marisol/avatars/01_brighter_ideas.png'
      };
      batchWallService.markAllMessagesAsSeen(userToMark);
    }
  }, [activeMode, chatSubTab, selectedDirectUser, currentUser]);

  useEffect(() => {
    if (currentUser?.name) {
      setStudentName(currentUser.name);
      setProfileNameInput(currentUser.name);
      if (currentUser.avatarUrl) setProfileAvatarInput(currentUser.avatarUrl);
      if (currentUser.currentMood) {
        setSelectedMood(currentUser.currentMood);
        setProfileMoodInput(currentUser.currentMood);
      }
      if (currentUser.currentMoodEmoji) {
        setSelectedMoodEmoji(currentUser.currentMoodEmoji);
        setProfileMoodEmojiInput(currentUser.currentMoodEmoji);
      }
      if (currentUser.statusNote) setProfileStatusInput(currentUser.statusNote);
      if (currentUser.batch) setProfileBatchInput(currentUser.batch);
    }
  }, [currentUser]);

  // Send Direct Message (1-on-1 between any two users)
  const handleSendDirectMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please sign in with your Mail ID to chat! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    if (!selectedDirectUser) return;
    const text = directInput.trim();
    if (!text && !directImageAttachment) return;

    setIsSendingDirect(true);
    audioEngine.playSfx('fanfare');

    const myId = currentUser?.id || `user_${player.nickname || 'Student'}`;
    const myName = currentUser?.name || profileNameInput || 'Batch 41 Student';
    const myEmail = currentUser?.email;
    const myAvatar = currentUser?.avatarUrl || profileAvatarInput;

    await batchWallService.sendDirectMessage({
      senderId: myId,
      senderName: myName,
      senderEmail: myEmail,
      senderAvatarUrl: myAvatar,
      senderIsNewUser: currentUser?.isNewUser ?? true,
      senderUserTag: currentUser?.userTag || 'New User',
      recipientId: selectedDirectUser.id,
      recipientName: selectedDirectUser.name,
      recipientEmail: selectedDirectUser.email,
      recipientAvatarUrl: selectedDirectUser.avatarUrl,
      text: text || (directImageAttachment ? '📷 Photo' : ''),
      imageUrl: directImageAttachment || undefined
    });

    setDirectInput('');
    setDirectImageAttachment(null);
    setShowDirectEmojiPicker(false);
    setIsSendingDirect(false);

    setTimeout(() => {
      directChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Direct Chat Image Upload
  const handleDirectImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 960, 0.75);
      setDirectImageAttachment(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Direct message image error:', err);
    }
    if (directFileInputRef.current) directFileInputRef.current.value = '';
  };

  // Chat Image Upload
  const handleChatImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 960, 0.75);
      setChatImageAttachment(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Image processing failed:', err);
    }
    if (chatFileInputRef.current) chatFileInputRef.current.value = '';
  };

  // Photo Post Image Upload
  const handlePhotoPostImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 1080, 0.8);
      setNewPostImage(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Image processing failed:', err);
    }
    if (photoFileInputRef.current) photoFileInputRef.current.value = '';
  };

  // Profile Avatar Upload
  const handleProfileAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 300, 0.8);
      setProfileAvatarInput(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Avatar image error:', err);
    }
    if (profileAvatarFileInputRef.current) profileAvatarFileInputRef.current.value = '';
  };

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = authService.updateProfile({
      name: profileNameInput.trim() || 'Batch 41 Student',
      avatarUrl: profileAvatarInput,
      batch: profileBatchInput.trim() || 'MLP41PT',
      currentMood: profileMoodInput,
      currentMoodEmoji: profileMoodEmojiInput,
      statusNote: profileStatusInput.trim()
    });

    setStudentName(updated.name);
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setShowProfileModal(false);
    setShareToast('Profile updated & reflected in group chat! ✨');
    setTimeout(() => setShareToast(null), 2500);
  };

  // Tag Management
  const toggleTag = (tag: string) => {
    audioEngine.playSfx('pop');
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const tagClean = customTagInput.trim().replace(/^#+/, '');
    if (!tagClean) return;
    const formattedTag = `#${tagClean}`;
    if (!selectedTags.includes(formattedTag)) {
      setSelectedTags(prev => [...prev, formattedTag]);
      audioEngine.playSfx('pop');
    }
    setCustomTagInput('');
  };

  // Send WhatsApp Group Message (with replyTo support)
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isGoogleAuthenticated()) {
      setShowGoogleModal(true);
      setShareToast('Please sign in with a Google account to chat! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    const text = chatInput.trim();
    if (!text && !chatImageAttachment) return;

    setIsSendingChat(true);
    audioEngine.playSfx('fanfare');

    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    const email = currentUser?.email;
    const avatar = currentUser?.avatarUrl || profileAvatarInput;
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (email && email.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }

    const replyData = replyingToMessage ? {
      id: replyingToMessage.id,
      senderName: replyingToMessage.senderName,
      text: replyingToMessage.text.slice(0, 80)
    } : undefined;

    await batchWallService.sendGroupChatMessage({
      senderId: currentUser?.id,
      senderName: name,
      senderEmail: email,
      avatarUrl: avatar,
      text: text || (chatImageAttachment ? '📷 Photo' : ''),
      imageUrl: chatImageAttachment || undefined,
      replyTo: replyData
    });

    setChatInput('');
    setChatImageAttachment(null);
    setReplyingToMessage(null);
    setShowChatEmojiPicker(false);
    setShowMentionPicker(false);
    setIsSendingChat(false);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenEditMessage = (msg: GroupChatMessage) => {
    setEditingMessage(msg);
    setEditingText(msg.text);
    setActiveActionMenuMsgId(null);
  };

  const handleSaveEditMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessage || !editingText.trim()) return;
    audioEngine.playSfx('click');
    const result = await batchWallService.editChatMessage(editingMessage.id, editingText, {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    });
    if (!result.success) {
      setShareToast(result.error || 'Failed to edit message');
    } else {
      setShareToast('Message edited ✏️');
    }
    setEditingMessage(null);
    setEditingText('');
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleTogglePinMessage = async (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    if (msg.isPinned) {
      await batchWallService.unpinChatMessage(msg.id);
      setShareToast('Message unpinned 📌');
    } else {
      const pinner = currentUser?.name || profileNameInput || 'Batch Member';
      await batchWallService.pinChatMessage(msg.id, pinner);
      setShareToast('Message pinned to top 📌✨');
    }
    setActiveActionMenuMsgId(null);
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleJumpToMessage = (messageId: string) => {
    const el = document.getElementById(`chat-msg-${messageId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedChatMsgId(messageId);
      setTimeout(() => setHighlightedChatMsgId(null), 2500);
    }
  };

  const handleDeleteForMe = (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    batchWallService.deleteChatMessageForMe(msg.id);
    setDeleteModalMsg(null);
    setActiveActionMenuMsgId(null);
    setDeletionReaction({ text: 'Message deleted for you', emoji: '🗑️' });
    setTimeout(() => setDeletionReaction(null), 2500);
  };

  const handleDeleteForEveryone = async (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    const result = await batchWallService.deleteChatMessageForEveryone(msg.id, {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    });
    if (!result.success) {
      setShareToast(result.error || 'Failed to delete message');
      setTimeout(() => setShareToast(null), 2500);
    } else {
      setDeletionReaction({ text: 'Message deleted for everyone', emoji: '🗑️✨' });
      setTimeout(() => setDeletionReaction(null), 2500);
    }
    setDeleteModalMsg(null);
    setActiveActionMenuMsgId(null);
  };

  // Post Pinning, Editing & Deletion Handlers
  const handleOpenEditPost = (post: InstagramPost) => {
    setEditingPost(post);
    setEditingPostCaption(post.caption);
    setActivePostMenuId(null);
  };

  const handleSaveEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    audioEngine.playSfx('click');
    const result = await batchWallService.editInstagramPost(editingPost.id, editingPostCaption, {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    });
    if (!result.success) {
      setShareToast(result.error || 'Failed to edit post');
    } else {
      setShareToast('Post caption updated ✏️✨');
    }
    setEditingPost(null);
    setEditingPostCaption('');
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleTogglePinPost = async (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    if (post.isPinned) {
      await batchWallService.unpinInstagramPost(post.id);
      setShareToast('Post unpinned 📌');
    } else {
      const pinner = currentUser?.name || profileNameInput || 'Batch Member';
      await batchWallService.pinInstagramPost(post.id, pinner);
      setShareToast('Post pinned to top 📌✨');
    }
    setActivePostMenuId(null);
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleDeletePost = async (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    const result = await batchWallService.deleteInstagramPost(post.id, {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    });
    if (!result.success) {
      setShareToast(result.error || 'Failed to delete post');
    } else {
      setShareToast('Post deleted 🗑️');
    }
    setActivePostMenuId(null);
    setTimeout(() => setShareToast(null), 2500);
  };

  // Create & Send Live Group Poll
  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isGoogleAuthenticated()) {
      setShowGoogleModal(true);
      setShareToast('Please sign in with a Google account to create polls! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    if (!pollQuestion.trim() || !pollOption1.trim() || !pollOption2.trim()) return;

    audioEngine.playSfx('fanfare');
    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    const email = currentUser?.email;
    const avatar = currentUser?.avatarUrl || profileAvatarInput;

    const options = [
      { id: 'opt_1', text: pollOption1.trim(), votes: [] },
      { id: 'opt_2', text: pollOption2.trim(), votes: [] }
    ];
    if (pollOption3.trim()) {
      options.push({ id: 'opt_3', text: pollOption3.trim(), votes: [] });
    }

    await batchWallService.sendGroupChatMessage({
      senderId: currentUser?.id,
      senderName: name,
      senderEmail: email,
      avatarUrl: avatar,
      text: `📊 Group Poll: ${pollQuestion.trim()}`,
      poll: {
        question: pollQuestion.trim(),
        options
      }
    });

    setPollQuestion('');
    setPollOption1('');
    setPollOption2('');
    setPollOption3('');
    setShowCreatePollModal(false);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Vote on Poll
  const handleVotePoll = (messageId: string, optionId: string) => {
    if (!authService.isGoogleAuthenticated()) {
      setShowGoogleModal(true);
      setShareToast('Please sign in with a Google account to vote! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    audioEngine.playSfx('pop');
    const voter = currentUser?.name || profileNameInput || 'You';
    batchWallService.votePoll(messageId, optionId, voter);
  };

  // Double tap to like Photo Post
  const handleDoubleTapPost = (post: InstagramPost) => {
    audioEngine.playSfx('fanfare');
    setHeartBurstId(post.id);
    batchWallService.likeInstagramPost(post.id, currentUser?.name);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setHeartBurstId(null), 900);
  };

  // Submit Photo Post
  const handleCreatePhotoPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostImage) {
      alert('Please upload or select a photo for your post!');
      return;
    }
    setIsPublishingPost(true);
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } });

    await batchWallService.addInstagramPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      authorName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      authorAvatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      location: newPostLocation,
      imageUrl: newPostImage,
      filter: newPostFilter,
      caption: newPostCaption.trim(),
      hashtags: selectedTags
    });

    setNewPostImage(null);
    setNewPostCaption('');
    setNewPostFilter('none');
    setSelectedTags(['#Batch41', '#ComfortVibes']);
    setIsPublishingPost(false);
    setShowNewPhotoPostModal(false);
  };

  // Submit Post Comment
  const handleSendPostComment = async (postId: string) => {
    const text = (postCommentText[postId] || '').trim();
    if (!text) return;

    audioEngine.playSfx('pop');
    await batchWallService.addInstagramComment(postId, {
      authorId: currentUser?.id,
      authorName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Classmate',
      authorEmail: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      text
    });

    setPostCommentText(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Submit Bulletin Note
  const handleCreateBulletinPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinText.trim()) return;

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 55, spread: 65, origin: { y: 0.6 } });

    batchWallService.addPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      studentName: studentName.trim() || currentUser?.name || profileNameInput || 'Student',
      avatarPose: selectedPose,
      mood: selectedMood,
      moodEmoji: selectedMoodEmoji,
      text: bulletinText.trim(),
    });

    if (isAuthenticated) {
      authService.updateDailyMood(selectedMood, selectedMoodEmoji, bulletinText.trim().slice(0, 80));
    }

    setBulletinText('');
    setShowNewPostModal(false);
  };

  // Submit Bulletin Reply
  const handleSendReply = async (postId: string) => {
    const text = (replyInputMap[postId] || '').trim();
    if (!text) return;

    setIsSendingReply(prev => ({ ...prev, [postId]: true }));
    audioEngine.playSfx('fanfare');

    const authorName = currentUser?.name || profileNameInput || studentName || 'Batch Classmate';
    const authorEmail = currentUser?.email;
    const isKritika = authorName.toLowerCase().includes('kritika') || 
                      (authorEmail && authorEmail.toLowerCase().includes('kritika')) ||
                      authorName.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 } });
    }

    await batchWallService.addReply(postId, {
      authorId: currentUser?.id,
      authorName,
      authorEmail,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
      text,
      isKritika
    });

    setIsSendingReply(prev => ({ ...prev, [postId]: false }));
    setReplyInputMap(prev => ({ ...prev, [postId]: '' }));
    setExpandedReplies(prev => ({ ...prev, [postId]: true }));
  };

  const handleShareClick = (title: string) => {
    audioEngine.playSfx('pop');
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(`Link for "${title || 'Post'}" copied to clipboard! ✨`);
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-2.5 sm:p-5 pb-28 text-stone-900">
      <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-3 sm:space-y-4">

        {/* Sync Toast Notification */}
        {network.syncToast && (
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-2.5 px-4 rounded-2xl shadow-xs flex items-center justify-between text-xs font-display font-black animate-scale-up">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>{network.syncToast}</span>
            </span>
            <button
              onClick={() => batchWallService.clearSyncToast()}
              className="p-1 hover:bg-white/20 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Share Feedback Toast */}
        {shareToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-display font-black shadow-lg flex items-center gap-2 animate-scale-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* Deletion Reaction Floating Toast */}
        {deletionReaction && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-xs font-display font-black shadow-2xl border border-rose-500/40 flex items-center gap-2 animate-scale-up">
            <span className="text-base">{deletionReaction.emoji}</span>
            <span className="text-rose-200">{deletionReaction.text}</span>
          </div>
        )}

        {/* 1. MULTI-PERSON ACTIVE USER BAR WITH SESSION USER DATA & MESSAGE TABLE MATCH */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-2.5 px-3.5 shadow-2xs flex items-center justify-between gap-2.5 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-rose-400 shrink-0 bg-rose-50 shadow-2xs">
              <img 
                src={currentUser?.avatarUrl || profileAvatarInput || AVATAR_PRESETS[0].url} 
                alt="Your Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-display font-black text-rose-600 uppercase tracking-wider">
                  You are active as:
                </span>
                {currentUser?.isGoogleVerified && (
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    Google Verified ✓
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-display font-black text-xs sm:text-sm text-stone-900 truncate">
                  {currentUser?.name || profileNameInput || 'Batch 41 Member'}
                </h4>
                {/* Session User ID Tag */}
                <span 
                  className="font-mono text-[9px] sm:text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded border border-stone-300 font-bold"
                  title="Current Session User ID"
                >
                  UID: {userMatchedSessionData.userId}
                </span>
              </div>
            </div>
          </div>

          {/* Current Message for User Snippet (Quick Jump) */}
          {userMatchedSessionData.currentMessage ? (
            <button
              type="button"
              onClick={() => handleJumpToMessage(userMatchedSessionData.currentMessage!.id)}
              className="hidden md:flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 px-2.5 py-1 rounded-xl text-xs font-medium cursor-pointer transition-colors max-w-[240px] lg:max-w-[320px] truncate"
              title={`Current message: "${userMatchedSessionData.currentMessage.text}". Click to jump.`}
            >
              <span className="font-bold text-rose-700 text-[10px] uppercase shrink-0">Current Msg:</span>
              <span className="truncate italic">"{userMatchedSessionData.currentMessage.text.slice(0, 30)}..."</span>
              <span className="text-rose-600 text-[10px] font-bold underline shrink-0">Jump ↗</span>
            </button>
          ) : (
            <span className="hidden md:inline text-[11px] text-stone-400 italic">No messages sent in table yet</span>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Direct Chats Quick Button */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setActiveMode('chat');
                setChatSubTab('direct');
              }}
              className="py-1.5 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-display font-bold flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
              title="Chat 1-on-1 with each other user"
            >
              <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Direct Chats</span>
            </button>

            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="py-1.5 px-3 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 rounded-xl text-xs font-display font-bold flex items-center gap-1 transition-colors cursor-pointer border border-stone-200"
              title="Switch user profile or test as different batch member"
            >
              <UserCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Switch Profile</span>
            </button>
            {!authService.isUserAllowedToChat() && (
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="py-1.5 px-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs font-display font-black flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
              >
                <span>Sign In With Mail</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. UNIFIED COHESIVE TAB SWITCHER */}
        <div className="grid grid-cols-3 gap-1 bg-stone-200/70 p-1 rounded-2xl border border-stone-300/80">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('chat');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessagesSquare className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">Batch Lounge ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('posts');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'posts'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">Post Feed ({photoPosts.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('bulletin');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'bulletin'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Pin className="w-3.5 h-3.5 text-amber-600" />
            <span className="truncate">Bulletin ({allBulletinPosts.length})</span>
          </button>
        </div>

        {/* ==================== 1. BATCH LOUNGE & DIRECT CHAT ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs flex flex-col h-[580px] sm:h-[650px] lg:h-[700px] animate-fade-in relative">
            
            {/* 3-Way Subtab Selector: Batch Lounge | Direct Chats (1-on-1) | All Users */}
            <div className="bg-stone-100/90 border-b border-stone-200/90 p-1.5 px-3 flex items-center justify-between gap-2 shrink-0 flex-wrap">
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-stone-200/90 shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setChatSubTab('lounge');
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-display font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    chatSubTab === 'lounge'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MessagesSquare className="w-3.5 h-3.5" />
                  <span>Batch Lounge</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    chatSubTab === 'lounge' ? 'bg-rose-800 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {chatMessages.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setChatSubTab('direct');
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-display font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    chatSubTab === 'direct'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct Chats (1-on-1)</span>
                  {selectedDirectUser && (
                    <span className="text-[10px] bg-rose-200 text-rose-950 px-1.5 py-0.2 rounded-full font-bold truncate max-w-[80px]">
                      {selectedDirectUser.name.split(' ')[0]}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setChatSubTab('users');
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-display font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    chatSubTab === 'users'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>All Users</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    chatSubTab === 'users' ? 'bg-rose-800 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {classmates.length}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {currentUser ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>Allowed to Chat ✓</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[10px] font-display font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                  >
                    <span>Sign In With Mail</span>
                  </button>
                )}
              </div>
            </div>

            {/* A. BATCH LOUNGE (GROUP CHAT) */}
            {chatSubTab === 'lounge' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Clean Modern Lounge Top Bar */}
                <div className="bg-white border-b border-stone-200/80 text-stone-900 p-2.5 px-4 flex items-center justify-between shrink-0 shadow-2xs">
              <div 
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-85 transition-opacity"
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 overflow-hidden flex items-center justify-center text-lg font-bold shadow-2xs">
                    🌸
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-black text-sm text-stone-900 leading-tight truncate">
                    Batch 41 Lounge
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium truncate">
                    Kritika Gupta 👑, Priyanshu, Ananya, You
                  </p>
                </div>
              </div>

              {/* Chat Message Table Filter (All vs My Messages Matched) */}
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setChatFilterMode('all');
                  }}
                  className={`px-2 py-1 rounded-lg font-display font-bold text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
                    chatFilterMode === 'all'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Show all messages in the chat lounge"
                >
                  All ({chatMessages.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setChatFilterMode('my_messages');
                  }}
                  className={`px-2 py-1 rounded-lg font-display font-bold text-[10px] sm:text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
                    chatFilterMode === 'my_messages'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title={`Show only messages matching your session User ID: ${userMatchedSessionData.userId}`}
                >
                  <span>My Messages</span>
                  <span className={`text-[9px] px-1 rounded-full ${
                    chatFilterMode === 'my_messages' ? 'bg-purple-800 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {userMatchedSessionData.totalMatched}
                  </span>
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-stone-600">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    setShareToast('Video room connection ready 📹');
                    setTimeout(() => setShareToast(null), 2000);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full cursor-pointer transition-colors"
                  title="Video Call"
                >
                  <Video className="w-4.5 h-4.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    setShareToast('Voice lounge active 📞');
                    setTimeout(() => setShareToast(null), 2000);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full cursor-pointer transition-colors"
                  title="Voice Call"
                >
                  <Phone className="w-4.5 h-4.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCreatePollModal(true)}
                  className="p-1.5 hover:bg-stone-100 hover:text-rose-600 rounded-full cursor-pointer text-stone-600 transition-colors"
                  title="Group Poll"
                >
                  <BarChart2 className="w-4.5 h-4.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full cursor-pointer transition-colors"
                  title="Group Info & Profile"
                >
                  <MoreVertical className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Interactive Pinned Message Banner */}
            {(() => {
              const pinnedMsg = chatMessages.slice().reverse().find(m => m.isPinned);
              if (!pinnedMsg) return null;

              return (
                <div 
                  onClick={() => handleJumpToMessage(pinnedMsg.id)}
                  className="bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-b border-amber-200/90 px-3.5 py-2 flex items-center justify-between gap-2.5 z-20 shadow-xs cursor-pointer hover:bg-amber-100/60 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Pin className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-black text-[11px] text-amber-900 truncate">
                          Pinned Message
                        </span>
                        <span className="text-[10px] text-stone-500 truncate">
                          • {pinnedMsg.senderName}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-stone-700 truncate max-w-md">
                        {pinnedMsg.text || (pinnedMsg.imageUrl ? '📷 Photo attachment' : 'Group message')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleJumpToMessage(pinnedMsg.id)}
                      className="px-2 py-0.5 bg-white/90 hover:bg-white text-amber-900 border border-amber-300 rounded-md text-[10px] font-display font-black shadow-2xs transition-all cursor-pointer"
                      title="Jump to pinned message"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTogglePinMessage(pinnedMsg)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
                      title="Unpin message"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Clean Stream Area (Pure, Clean Minimal Surface) */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3.5 scrollbar-thin bg-[#FAFAFA]">
              {/* Active Filter Notice if in my_messages mode */}
              {chatFilterMode === 'my_messages' && (
                <div className="bg-purple-50 border border-purple-200 text-purple-900 px-3 py-2 rounded-2xl flex items-center justify-between text-xs mb-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Showing <strong>{userMatchedSessionData.totalMatched}</strong> message(s) matched for User ID: <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 font-mono text-[11px] font-bold text-purple-950">{userMatchedSessionData.userId}</code></span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setChatFilterMode('all')}
                    className="text-xs font-bold text-purple-700 hover:text-purple-950 underline cursor-pointer shrink-0 ml-2"
                  >
                    Show All
                  </button>
                </div>
              )}

              {/* Empty state if my_messages has 0 items */}
              {chatFilterMode === 'my_messages' && userMatchedSessionData.matchedMessages.length === 0 && (
                <div className="p-8 text-center space-y-2.5 my-8">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 mx-auto flex items-center justify-center font-bold text-xl border border-purple-200">
                    💬
                  </div>
                  <h4 className="font-display font-black text-sm text-stone-800">No Messages Matched in Table</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    No messages found matching your session User ID: <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">{userMatchedSessionData.userId}</code>.
                    Send a message below and it will immediately match!
                  </p>
                  <button
                    type="button"
                    onClick={() => setChatFilterMode('all')}
                    className="mt-2 py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    View All Messages
                  </button>
                </div>
              )}

              {/* Date Separators & Chat Stream */}
              {(chatFilterMode === 'my_messages' ? userMatchedSessionData.matchedMessages : chatMessages).map((msg, index) => {
                const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
                const msgSenderName = (msg.senderName || '').replace(' 👑', '').trim().toLowerCase();
                const isCurrentUser = Boolean(
                  (currentUser?.id && msg.senderId && currentUser.id === msg.senderId) ||
                  (currentUser?.email && msg.senderEmail && currentUser.email.trim().toLowerCase() === msg.senderEmail.trim().toLowerCase()) ||
                  (currentUserName !== '' && currentUserName === msgSenderName)
                );
                const reactionsList = Object.entries(msg.reactions || {}).filter(([, count]) => count > 0);
                const senderColor = getWhatsAppSenderColor(msg.senderName, msg.isKritika);

                const showDatePill = index === 0 ? 'Today' : null;

                return (
                  <React.Fragment key={msg.id}>
                    {/* Date separator pill */}
                    {showDatePill && (
                      <div className="flex justify-center my-1.5">
                        <span className="bg-white text-stone-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs border border-stone-200">
                          {showDatePill}
                        </span>
                      </div>
                    )}

                    <div
                      id={`chat-msg-${msg.id}`}
                      onMouseEnter={() => setHoveredMessageId(msg.id)}
                      onMouseLeave={() => setHoveredMessageId(null)}
                      className={`flex items-start gap-1.5 group transition-all duration-300 ${isCurrentUser ? 'justify-end' : 'justify-start'} ${highlightedChatMsgId === msg.id ? 'p-1 bg-amber-100/60 rounded-2xl ring-2 ring-amber-400' : ''}`}
                    >
                      {/* Member Profile Avatar on the Left (for incoming messages) */}
                      {!isCurrentUser && (
                        <div 
                          onClick={() => {
                            const cm = classmates.find(c => c.name.toLowerCase() === msg.senderName.toLowerCase().replace(' 👑', ''));
                            if (cm) setSelectedClassmateDetail(cm);
                          }}
                          className={`w-7.5 h-7.5 rounded-full overflow-hidden border shrink-0 mt-0.5 cursor-pointer hover:scale-105 transition-transform ${
                            msg.isKritika ? 'border-amber-400 ring-2 ring-pink-300' : 'border-stone-200'
                          }`}
                          title={`Click to view ${msg.senderName}`}
                        >
                          <img src={msg.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'} alt={msg.senderName} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Speech Bubble Card */}
                      <div className="relative max-w-[85%] sm:max-w-[75%] space-y-1">
                        <div
                          className={`p-2.5 px-3 rounded-2xl shadow-2xs text-xs sm:text-sm leading-relaxed relative ${
                            isCurrentUser
                              ? 'bg-rose-500 text-white rounded-tr-xs shadow-xs'
                              : 'bg-white text-stone-900 rounded-tl-xs border border-stone-200/80 shadow-2xs'
                          }`}
                        >
                          {/* Pinned pill if message is pinned */}
                          {msg.isPinned && (
                            <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full w-fit mb-1 shadow-2xs ${
                              isCurrentUser ? 'bg-amber-400/30 text-amber-100 border border-amber-300/40' : 'bg-amber-50 text-amber-800 border border-amber-300'
                            }`}>
                              <Pin className="w-2.5 h-2.5 fill-current" />
                              <span>Pinned</span>
                            </div>
                          )}

                          {/* 1. Distinct Bold Sender Name & Action Dropdown Trigger */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                              <span 
                                onClick={() => {
                                  setChatInput((prev: string) => `${prev ? prev + ' ' : ''}@${msg.senderName} `);
                                }}
                                className={`font-display font-black text-xs sm:text-[13px] tracking-tight ${isCurrentUser ? 'text-white' : senderColor} hover:underline cursor-pointer truncate`}
                                title="Click to mention in chat"
                              >
                                {isCurrentUser ? 'You' : msg.senderName}
                              </span>
                              {msg.isKritika && (
                                <span className={`${isCurrentUser ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'} font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0`}>
                                  👑 QUEEN
                                </span>
                              )}
                              {msg.senderIsNewUser && (
                                <span className={`${isCurrentUser ? 'bg-white/20 text-white border border-white/30' : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'} font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0 flex items-center gap-0.5`}>
                                  <span>✨</span>
                                  <span>NEW USER</span>
                                </span>
                              )}
                              {/* Matched User ID badge on bubble */}
                              {msg.senderId && (
                                <span 
                                  className={`font-mono text-[8px] px-1 py-0.2 rounded border font-medium ${
                                    isCurrentUser
                                      ? 'bg-white/20 text-white border-white/30'
                                      : 'bg-stone-100 text-stone-500 border-stone-200'
                                  }`}
                                  title={`Message sender User ID: ${msg.senderId}`}
                                >
                                  UID: {msg.senderId}
                                </span>
                              )}
                              {isCurrentUser && (
                                <span className="bg-white/25 text-white font-mono text-[7px] font-black uppercase px-1 py-0.2 rounded shadow-2xs shrink-0">
                                  MATCHED
                                </span>
                              )}
                            </div>

                            {/* Dropdown Menu Trigger Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActionMenuMsgId(activeActionMenuMsgId === msg.id ? null : msg.id);
                                }}
                                className="p-0.5 hover:bg-black/5 rounded text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                                title="Message options"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>

                              {/* WhatsApp Message Action Dropdown */}
                              {activeActionMenuMsgId === msg.id && (
                                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 animate-scale-up text-xs font-medium">
                                  {/* Direct 1-on-1 Chat option */}
                                  {!isCurrentUser && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        audioEngine.playSfx('click');
                                        const partner = classmates.find(c => c.name.toLowerCase() === msg.senderName.toLowerCase().replace(' 👑', '')) || {
                                          id: msg.senderId || `user_${msg.senderName.toLowerCase().replace(/\s+/g, '_')}`,
                                          name: msg.senderName,
                                          email: msg.senderEmail || '',
                                          avatarUrl: msg.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
                                          batch: 'MLP41PT',
                                          currentMood: 'Radiant Sunshine 🌸',
                                          currentMoodEmoji: '🌸',
                                          statusNote: 'Active in Factory of Fun ♡',
                                          lastUpdated: 'Just now',
                                          isGoogleVerified: true,
                                          isNewUser: msg.senderIsNewUser
                                        };
                                        setSelectedDirectUser(partner);
                                        setChatSubTab('direct');
                                        setActiveActionMenuMsgId(null);
                                      }}
                                      className="w-full px-3 py-1.5 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-700 cursor-pointer font-bold border-b border-stone-100"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
                                      <span>Chat 1-on-1</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      audioEngine.playSfx('pop');
                                      setReplyingToMessage(msg);
                                      setActiveActionMenuMsgId(null);
                                    }}
                                    className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                  >
                                    <Reply className="w-3.5 h-3.5 text-[#008069]" />
                                    <span>Reply</span>
                                  </button>

                                  {/* Pin / Unpin option */}
                                  <button
                                    type="button"
                                    onClick={() => handleTogglePinMessage(msg)}
                                    className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                  >
                                    <Pin className="w-3.5 h-3.5 text-amber-600" />
                                    <span>{msg.isPinned ? 'Unpin message' : 'Pin message'}</span>
                                  </button>

                                  {/* STRICT AUTHOR-ONLY: Edit message ONLY if isCurrentUser is true */}
                                  {isCurrentUser && !msg.isDeletedForEveryone && (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditMessage(msg)}
                                      className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                      <span>Edit message</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteModalMsg(msg);
                                      setActiveActionMenuMsgId(null);
                                    }}
                                    className="w-full px-3 py-1.5 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer border-t border-stone-100"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Delete message</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                        {/* Quoted Reply Banner */}
                        {msg.replyTo && !msg.isDeletedForEveryone && (
                          <div className={`mb-1.5 p-1.5 px-2 rounded-lg border-l-4 text-[11px] ${
                            isCurrentUser
                              ? 'bg-emerald-50/80 border-[#005C4B] text-emerald-950'
                              : 'bg-stone-100 border-[#008069] text-stone-700'
                          }`}>
                            <span className="font-display font-black block text-[10px] text-[#008069]">
                              {msg.replyTo.senderName}
                            </span>
                            <span className="truncate block font-sans">
                              {msg.replyTo.text}
                            </span>
                          </div>
                        )}

                        {/* Deleted for Everyone Banner */}
                        {msg.isDeletedForEveryone ? (
                          <div className="flex items-center gap-1.5 text-stone-400 italic text-xs py-1">
                            <Ban className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>This message was deleted</span>
                          </div>
                        ) : (
                          <>
                            {/* Photo Attachment */}
                            {msg.imageUrl && (
                              <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-black/5 relative group/img cursor-pointer">
                                <img
                                  src={msg.imageUrl}
                                  alt="Attached photo"
                                  onClick={() => setLightboxImage({ url: msg.imageUrl!, caption: msg.text })}
                                  className="w-full max-h-60 object-cover hover:scale-101 transition-transform duration-200"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity">
                                  <Eye className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            )}

                            {/* Interactive Live Poll */}
                            {msg.poll && (
                              <div className="p-2.5 rounded-xl space-y-2 my-1 bg-[#F0F2F5] border border-stone-200">
                                <div className="flex items-center gap-1.5 font-display font-black text-xs text-stone-900">
                                  <BarChart2 className="w-4 h-4 text-[#008069]" />
                                  <span>{msg.poll.question}</span>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                  {(() => {
                                    const totalVotes = msg.poll.options.reduce((acc, opt) => acc + opt.votes.length, 0);
                                    const currentVoter = currentUser?.name || profileNameInput || 'You';

                                    return msg.poll.options.map(opt => {
                                      const voteCount = opt.votes.length;
                                      const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                                      const hasVoted = opt.votes.includes(currentVoter);

                                      return (
                                        <div
                                          key={opt.id}
                                          onClick={() => handleVotePoll(msg.id, opt.id)}
                                          className={`p-2 rounded-xl text-xs cursor-pointer transition-all relative overflow-hidden border bg-white ${
                                            hasVoted 
                                              ? 'border-[#008069] font-bold' 
                                              : 'border-stone-200 hover:border-stone-400'
                                          }`}
                                        >
                                          <div
                                            className="absolute inset-y-0 left-0 transition-all duration-300 bg-[#008069]/20"
                                            style={{ width: `${percentage}%` }}
                                          />

                                          <div className="relative flex items-center justify-between z-1">
                                            <div className="flex items-center gap-1.5">
                                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                                                hasVoted ? 'bg-[#008069] text-white border-[#008069]' : 'border-stone-400'
                                              }`}>
                                                {hasVoted ? '✓' : ''}
                                              </span>
                                              <span>{opt.text}</span>
                                            </div>
                                            <span className="font-display font-bold text-[10px] text-stone-600">
                                              {percentage}% ({voteCount})
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    });
                                  })()}
                                </div>
                              </div>
                            )}

                            {/* Formatted Text with Highlighted @Mentions */}
                            {msg.text && !msg.poll && (
                              <div className="whitespace-pre-wrap font-sans text-stone-900 leading-snug">
                                {renderFormattedMessageText(msg.text, isCurrentUser)}
                              </div>
                            )}
                          </>
                        )}

                        {/* Timestamp, Edited Badge & Double Checkmark Read Receipt */}
                        {(() => {
                          const allMembers = batchWallService.getAllBatchMembers(classmates);
                          const seenByList = msg.seenBy || [];
                          const unseenMembers = allMembers.filter(m => !seenByList.some(s => (s.userId && s.userId === m.id) || (m.email && s.userEmail && s.userEmail.toLowerCase() === m.email.toLowerCase()) || (s.userName && s.userName.toLowerCase().trim() === m.name.toLowerCase().trim())));
                          const isAllSeen = seenByList.length > 0 && unseenMembers.length === 0;

                          return (
                            <div className="flex items-center justify-end gap-1.5 mt-1 text-[9px] text-stone-400 font-medium">
                              {msg.isEdited && !msg.isDeletedForEveryone && (
                                <span className="italic text-stone-400">Edited</span>
                              )}
                              <span>{msg.timestamp}</span>
                              
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSeenInfoMsg(msg);
                                }}
                                className="flex items-center gap-0.5 hover:opacity-80 transition-all cursor-pointer p-0.5 rounded group/seen"
                                title={isAllSeen ? `Seen by all ${allMembers.length} members (Click to view seen details)` : `Delivered (${seenByList.length}/${allMembers.length} seen - Click to view details)`}
                              >
                                <CheckCheck
                                  className={`w-3.5 h-3.5 transition-colors ${
                                    isAllSeen 
                                      ? 'text-[#00A884] dark:text-[#53BDEB] fill-[#00A884]/20 stroke-[2.5]' 
                                      : 'text-stone-400'
                                  }`}
                                />
                                <span className={`text-[8px] font-bold ${isAllSeen ? 'text-[#00A884] dark:text-[#53BDEB]' : 'text-stone-400'}`}>
                                  {seenByList.length}/{allMembers.length}
                                </span>
                              </button>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Emoji Reactions at bottom of bubble */}
                      {reactionsList.length > 0 && (
                        <div className={`flex items-center gap-1 flex-wrap ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {reactionsList.map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                batchWallService.reactToChatMessage(msg.id, emoji);
                              }}
                              className="bg-white border border-stone-200 rounded-full px-1.5 py-0.2 text-[10px] font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            >
                              <span>{emoji}</span> <span>{count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Hover Action Bar: Emoji Reactions & Reply */}
                      {hoveredMessageId === msg.id && (
                        <div className={`absolute -top-7 ${isCurrentUser ? 'right-0' : 'left-0'} bg-white border border-stone-200 rounded-full px-2 py-0.5 shadow-md flex items-center gap-1 z-10 animate-fade-in`}>
                          {['❤️', '👍', '😂', '😮', '🍕', '👑'].map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                batchWallService.reactToChatMessage(msg.id, emoji);
                              }}
                              className="text-xs hover:scale-125 transition-transform cursor-pointer p-0.5"
                            >
                              {emoji}
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              setReplyingToMessage(msg);
                            }}
                            className="text-xs hover:text-emerald-700 font-bold flex items-center gap-0.5 p-0.5 pl-1 border-l border-stone-200 cursor-pointer"
                            title="Reply to this message"
                          >
                            <Reply className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              setSeenInfoMsg(msg);
                            }}
                            className="text-xs hover:text-sky-600 font-bold flex items-center gap-0.5 p-0.5 pl-1 border-l border-stone-200 cursor-pointer text-stone-500"
                            title="View who has seen this message"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
              <div ref={chatBottomRef} />
            </div>

            {/* Quoted Message Preview Banner before sending */}
            {replyingToMessage && (
              <div className="bg-white p-2 px-3 border-t border-stone-200 flex items-center justify-between shrink-0 animate-fade-in">
                <div className="flex items-center gap-2 min-w-0">
                  <Reply className="w-4 h-4 text-[#008069] shrink-0" />
                  <div className="min-w-0 text-xs">
                    <span className="font-display font-black text-[#008069] block truncate">
                      Replying to {replyingToMessage.senderName}
                    </span>
                    <span className="text-[10px] text-stone-500 truncate block">
                      {replyingToMessage.text || 'Photo attachment'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingToMessage(null)}
                  className="p-1 hover:bg-stone-100 rounded-full text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chat Attachment Preview */}
            {chatImageAttachment && (
              <div className="bg-stone-100 p-2 px-3 border-t border-stone-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300 shadow-2xs">
                    <img src={chatImageAttachment} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-stone-800 block">Photo attached 📸</span>
                    <span className="text-[10px] text-stone-500">Send with or without message</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatImageAttachment(null)}
                  className="p-1 hover:bg-stone-200 rounded-full text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* @Mention Quick Pick List */}
            {showMentionPicker && (
              <div className="bg-white border-t border-stone-200 p-2 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">@Mention:</span>
                {classmates.map(cm => (
                  <button
                    key={cm.id}
                    type="button"
                    onClick={() => {
                      setChatInput(prev => `${prev}@${cm.name.split(' ')[0]} `);
                      setShowMentionPicker(false);
                    }}
                    className="px-2 py-1 bg-stone-100 hover:bg-emerald-50 text-stone-800 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    @{cm.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Emoji Tray */}
            {showChatEmojiPicker && (
              <div className="bg-white border-t border-stone-200 p-2 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">Emojis:</span>
                {COMMON_EMOJIS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setChatInput(prev => prev + emoji);
                      audioEngine.playSfx('pop');
                    }}
                    className="w-7 h-7 rounded-xl hover:bg-emerald-50 flex items-center justify-center text-sm transition-transform active:scale-90 cursor-pointer shrink-0"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Input Bar: Mail Auth Lock Banner if not signed in */}
            {!authService.isUserAllowedToChat() ? (
              <div className="p-3 px-4 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 border-t border-rose-500/30 flex items-center justify-between gap-3 text-white shrink-0 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0 animate-pulse">
                    <Lock className="w-4.5 h-4.5 text-rose-300" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="font-display font-black text-xs text-rose-200 truncate flex items-center gap-1.5">
                      <span>Sign In with Mail ID Required to Chat</span>
                      <span className="bg-rose-500/30 text-rose-300 text-[9px] px-1.5 py-0.2 rounded-full border border-rose-400/40 font-bold uppercase">Locked</span>
                    </h4>
                    <p className="text-[10px] text-stone-300 truncate font-medium">
                      All new users signed in with their mail ID can send messages, reply & chat with each other user
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="px-3.5 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer active:scale-95"
                >
                  <span>Sign In with Mail ID</span>
                </button>
              </div>
            ) : (
              /* Bottom Input Bar with Pill & Circular Send (Clean Modern Lounge Style) */
              <form onSubmit={handleSendChatMessage} className="p-2.5 px-3 flex items-center gap-2 shrink-0 bg-white border-t border-stone-200/80">
                {/* Left Rounded Pill Container */}
                <div className="flex-1 bg-stone-50 focus-within:bg-white focus-within:border-rose-300 rounded-full flex items-center px-2 py-1 shadow-2xs border border-stone-200 transition-all">
                  {/* Emoji Smile Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowChatEmojiPicker(!showChatEmojiPicker);
                      setShowMentionPicker(false);
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Smileys"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Text Input */}
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-2.5 py-1 text-xs sm:text-sm outline-none bg-transparent text-stone-900"
                  />

                  {/* @Mention Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMentionPicker(!showMentionPicker);
                      setShowChatEmojiPicker(false);
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="@Mention someone"
                  >
                    <AtSign className="w-4.5 h-4.5" />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    ref={chatFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChatImageSelect}
                    className="hidden"
                  />

                  {/* Attachment Paperclip */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!authService.isUserAllowedToChat()) {
                        setShowGoogleModal(true);
                        setShareToast('Please sign in with your Mail ID to send photos! 🔒');
                        setTimeout(() => setShareToast(null), 3000);
                        return;
                      }
                      chatFileInputRef.current?.click();
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Attach Photo"
                  >
                    <Paperclip className="w-4.5 h-4.5" />
                  </button>

                  {/* Camera Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!authService.isUserAllowedToChat()) {
                        setShowGoogleModal(true);
                        setShareToast('Please sign in with your Mail ID to send photos! 🔒');
                        setTimeout(() => setShareToast(null), 3000);
                        return;
                      }
                      chatFileInputRef.current?.click();
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Camera"
                  >
                    <Camera className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Right Floating Circular Send / Mic Button */}
                <button
                  type={chatInput.trim() || chatImageAttachment ? "submit" : "button"}
                  disabled={isSendingChat}
                  onClick={() => {
                    if (!chatInput.trim() && !chatImageAttachment) {
                      audioEngine.playSfx('fanfare');
                      setShareToast('Voice cheer sent! 🎙️✨');
                      setTimeout(() => setShareToast(null), 2000);
                    }
                  }}
                  className={`w-10 h-10 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center ${isSendingChat ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={chatInput.trim() || chatImageAttachment ? "Send" : "Hold for voice note"}
                >
                  {chatInput.trim() || chatImageAttachment ? (
                    <Send className="w-4.5 h-4.5" />
                  ) : (
                    <Mic className="w-4.5 h-4.5" />
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* B. DIRECT 1-ON-1 CHAT */}
        {chatSubTab === 'direct' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {!selectedDirectUser ? (
              /* 1. Direct Conversations & Member Picker */
              <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
                <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-black text-sm text-stone-900 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-rose-500" />
                        <span>1-on-1 Direct Messaging</span>
                      </h3>
                      <p className="text-xs text-stone-500">
                        Select any new user or classmate below to start a private real-time chat
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setChatSubTab('users')}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-display font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>View All Users</span>
                    </button>
                  </div>

                  {/* Search Users Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      placeholder="Search users by name or mail ID..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-100/80 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-300 focus:bg-white transition-all text-stone-900"
                    />
                  </div>
                </div>

                {/* Active Conversations List */}
                {(() => {
                  const myId = currentUser?.id || `user_${player.nickname || 'Student'}`;
                  const conversations = batchWallService.getAllDirectConversations(myId, currentUser?.email);

                  if (conversations.length === 0) return null;

                  return (
                    <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-2xs space-y-2">
                      <span className="text-[11px] font-display font-black text-stone-500 uppercase tracking-wider px-1">
                        Recent Conversations
                      </span>
                      <div className="divide-y divide-stone-100">
                        {conversations.map(conv => {
                          const partnerProfile = classmates.find(c => c.id === conv.partnerId) || {
                            id: conv.partnerId,
                            name: conv.partnerName,
                            email: conv.partnerEmail || '',
                            avatarUrl: conv.partnerAvatarUrl || '/marisol/avatars/01_brighter_ideas.png',
                            batch: 'MLP41PT',
                            currentMood: 'Radiant Sunshine 🌸',
                            currentMoodEmoji: '🌸',
                            statusNote: 'Active in Factory of Fun ♡',
                            lastUpdated: 'Recently',
                            isGoogleVerified: true,
                            isNewUser: conv.partnerIsNewUser
                          };

                          return (
                            <div
                              key={conv.conversationId}
                              onClick={() => {
                                audioEngine.playSfx('click');
                                setSelectedDirectUser(partnerProfile);
                                batchWallService.markDirectMessagesAsRead(conv.conversationId, myId);
                              }}
                              className="p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200 shrink-0">
                                  <img
                                    src={conv.partnerAvatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                                    alt={conv.partnerName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-display font-bold text-xs text-stone-900 group-hover:text-rose-600 transition-colors truncate">
                                      {conv.partnerName}
                                    </h4>
                                    {conv.partnerIsNewUser && (
                                      <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-mono text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0">
                                        NEW USER
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-stone-500 truncate max-w-xs sm:max-w-md">
                                    {conv.lastMessage.text || 'Photo attachment'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-[10px] text-stone-400 font-medium">
                                  {conv.lastMessage.timestamp}
                                </span>
                                {conv.unreadCount > 0 && (
                                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                                    {conv.unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* All Classmates & Users Directory Quick List */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-2xs space-y-2">
                  <span className="text-[11px] font-display font-black text-stone-500 uppercase tracking-wider px-1">
                    Select a User to Chat With
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {classmates
                      .filter(cm => {
                        if (!userSearchQuery) return true;
                        const q = userSearchQuery.toLowerCase();
                        return cm.name.toLowerCase().includes(q) || (cm.email && cm.email.toLowerCase().includes(q));
                      })
                      .map(cm => {
                        const isMe = (currentUser?.id && cm.id === currentUser.id) || (currentUser?.email && cm.email && currentUser.email === cm.email);

                        return (
                          <div
                            key={cm.id}
                            className={`p-2.5 rounded-xl border border-stone-200/90 hover:border-rose-300 bg-stone-50/60 hover:bg-rose-50/40 transition-all flex items-center justify-between gap-2.5 ${isMe ? 'opacity-75' : ''}`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative shrink-0">
                                <div className="w-9 h-9 rounded-full overflow-hidden border border-stone-200">
                                  <img src={cm.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'} alt={cm.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 text-[10px]">
                                  {cm.currentMoodEmoji || '🌸'}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="font-display font-bold text-xs text-stone-900 truncate">
                                    {cm.name}
                                  </span>
                                  {(cm.isNewUser || cm.userTag === 'New User') && (
                                    <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-mono text-[7px] font-black uppercase px-1 py-0.2 rounded-full shrink-0">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-stone-500 truncate">
                                  {cm.email || cm.statusNote || 'Batch Member'}
                                </p>
                              </div>
                            </div>

                            {isMe ? (
                              <span className="text-[10px] font-bold text-stone-400 px-2 py-1 bg-stone-100 rounded-lg shrink-0">
                                You
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  audioEngine.playSfx('click');
                                  setSelectedDirectUser(cm);
                                }}
                                className="px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-display font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer shrink-0 active:scale-95"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Chat</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              /* 2. Direct 1-on-1 Conversation View with Selected User */
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Direct Chat Header */}
                <div className="bg-white border-b border-stone-200/80 p-2.5 px-3 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playSfx('click');
                        setSelectedDirectUser(null);
                      }}
                      className="p-1 hover:bg-stone-100 rounded-full text-stone-600 cursor-pointer transition-colors"
                      title="Back to all direct chats"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-stone-200">
                        <img
                          src={selectedDirectUser.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                          alt={selectedDirectUser.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 truncate">
                          {selectedDirectUser.name}
                        </h3>
                        {(selectedDirectUser.isNewUser || selectedDirectUser.userTag === 'New User') && (
                          <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-mono text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0">
                            NEW USER
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500 truncate">
                        {selectedDirectUser.email || selectedDirectUser.statusNote || 'Direct Chat'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-stone-600">
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playSfx('pop');
                        setShareToast(`Direct video connection ready with ${selectedDirectUser.name.split(' ')[0]} 📹`);
                        setTimeout(() => setShareToast(null), 2500);
                      }}
                      className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full cursor-pointer transition-colors"
                      title="Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playSfx('pop');
                        setShareToast(`Voice line ready with ${selectedDirectUser.name.split(' ')[0]} 📞`);
                        setTimeout(() => setShareToast(null), 2500);
                      }}
                      className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full cursor-pointer transition-colors"
                      title="Voice Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Direct Messages Stream */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin bg-[#FAFAFA]">
                  {(() => {
                    const myId = currentUser?.id || `user_${player.nickname || 'Student'}`;
                    const dms = batchWallService.getDirectMessages(
                      myId,
                      selectedDirectUser.id,
                      currentUser?.email,
                      selectedDirectUser.email
                    );

                    if (dms.length === 0) {
                      return (
                        <div className="text-center py-12 space-y-2 text-stone-500">
                          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-xl border border-rose-100 shadow-2xs">
                            💬
                          </div>
                          <h4 className="font-display font-bold text-xs text-stone-800">
                            Start of Direct Chat with {selectedDirectUser.name}
                          </h4>
                          <p className="text-[11px] max-w-xs mx-auto text-stone-500">
                            Send a cheerful hello or share a photo below. Messages sync in real-time!
                          </p>
                        </div>
                      );
                    }

                    return dms.map(msg => {
                      const isSentByMe = (msg.senderId.toLowerCase() === myId.toLowerCase()) ||
                        (Boolean(currentUser?.email) && msg.senderEmail?.toLowerCase() === currentUser?.email.toLowerCase());

                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-1.5 ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isSentByMe && (
                            <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-200 shrink-0 mt-0.5">
                              <img
                                src={msg.senderAvatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                                alt={msg.senderName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="max-w-[80%] space-y-1">
                            <div
                              className={`p-2.5 px-3 rounded-2xl text-xs sm:text-sm leading-relaxed relative ${
                                isSentByMe
                                  ? 'bg-rose-500 text-white rounded-tr-xs shadow-xs'
                                  : 'bg-white text-stone-900 rounded-tl-xs border border-stone-200 shadow-2xs'
                              }`}
                            >
                              {msg.imageUrl && (
                                <div className="mb-2 rounded-xl overflow-hidden border border-black/10">
                                  <img
                                    src={msg.imageUrl}
                                    alt="Attachment"
                                    onClick={() => setLightboxImage({ url: msg.imageUrl!, caption: msg.text })}
                                    className="w-full max-h-56 object-cover cursor-pointer hover:scale-101 transition-transform"
                                  />
                                </div>
                              )}
                              <p className="break-words font-sans">{msg.text}</p>
                              <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isSentByMe ? 'text-rose-100' : 'text-stone-400'}`}>
                                <span>{msg.timestamp}</span>
                                {isSentByMe && <CheckCheck className="w-3 h-3 text-rose-200" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                  <div ref={directChatBottomRef} />
                </div>

                {/* Direct Chat Attachment Preview */}
                {directImageAttachment && (
                  <div className="bg-stone-100 p-2 px-3 border-t border-stone-200 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300 shadow-2xs">
                        <img src={directImageAttachment} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-xs text-stone-800 block">Photo attached 📸</span>
                        <span className="text-[10px] text-stone-500">Ready to send directly</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDirectImageAttachment(null)}
                      className="p-1 hover:bg-stone-200 rounded-full text-stone-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Direct Chat Emoji Tray */}
                {showDirectEmojiPicker && (
                  <div className="bg-white border-t border-stone-200 p-2 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                    <span className="text-[10px] font-bold text-stone-400 shrink-0">Emojis:</span>
                    {COMMON_EMOJIS.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setDirectInput(prev => prev + emoji);
                          audioEngine.playSfx('pop');
                        }}
                        className="w-7 h-7 rounded-xl hover:bg-rose-50 flex items-center justify-center text-sm transition-transform active:scale-90 cursor-pointer shrink-0"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* Direct Chat Input Bar */}
                {!authService.isUserAllowedToChat() ? (
                  <div className="p-3 px-4 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 border-t border-rose-500/30 flex items-center justify-between gap-3 text-white shrink-0 shadow-md">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Lock className="w-4.5 h-4.5 text-rose-300 shrink-0" />
                      <div className="min-w-0 text-left">
                        <h4 className="font-display font-black text-xs text-rose-200 truncate">
                          Sign In with Mail ID Required
                        </h4>
                        <p className="text-[10px] text-stone-300 truncate">
                          Sign in with your email to chat 1-on-1 with {selectedDirectUser.name}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGoogleModal(true)}
                      className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-display font-bold transition-all cursor-pointer shrink-0 active:scale-95"
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendDirectMessage} className="p-2.5 px-3 flex items-center gap-2 shrink-0 bg-white border-t border-stone-200/80">
                    <div className="flex-1 bg-stone-50 focus-within:bg-white focus-within:border-rose-300 rounded-full flex items-center px-2 py-1 shadow-2xs border border-stone-200 transition-all">
                      <button
                        type="button"
                        onClick={() => setShowDirectEmojiPicker(!showDirectEmojiPicker)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                        title="Smileys"
                      >
                        <Smile className="w-5 h-5" />
                      </button>

                      <input
                        type="text"
                        value={directInput}
                        onChange={(e) => setDirectInput(e.target.value)}
                        placeholder={`Message ${selectedDirectUser.name}...`}
                        className="flex-1 px-2.5 py-1 text-xs sm:text-sm outline-none bg-transparent text-stone-900"
                      />

                      <input
                        ref={directFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleDirectImageSelect}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => directFileInputRef.current?.click()}
                        className="p-1.5 text-stone-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer shrink-0"
                        title="Attach Photo"
                      >
                        <Paperclip className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingDirect || (!directInput.trim() && !directImageAttachment)}
                      className="w-10 h-10 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Send Direct Message"
                    >
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* C. ALL USERS DIRECTORY */}
        {chatSubTab === 'users' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-sm text-stone-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-rose-500" />
                    <span>All Community Members & New Users ({classmates.length})</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Anyone who signs in with their mail ID is called as a New User and is allowed to chat with everyone!
                  </p>
                </div>
              </div>

              {/* Search Directory */}
              <div className="relative pt-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search community users by name or email..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-100/80 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-300 focus:bg-white transition-all text-stone-900"
                />
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {classmates
                .filter(cm => {
                  if (!userSearchQuery) return true;
                  const q = userSearchQuery.toLowerCase();
                  return cm.name.toLowerCase().includes(q) || (cm.email && cm.email.toLowerCase().includes(q));
                })
                .map(cm => {
                  const isMe = (currentUser?.id && cm.id === currentUser.id) || (currentUser?.email && cm.email && currentUser.email === cm.email);
                  const isKritika = cm.name.toLowerCase().includes('kritika');
                  const isNew = cm.isNewUser || cm.userTag === 'New User' || cm.loginMethod === 'email';

                  return (
                    <div
                      key={cm.id}
                      className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between gap-3 hover:border-rose-300 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${isKritika ? 'border-amber-400 ring-2 ring-pink-300' : 'border-stone-200'}`}>
                            <img src={cm.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'} alt={cm.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                            {cm.currentMoodEmoji || '🌸'}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-display font-black text-xs text-stone-900 truncate">
                              {cm.name}
                            </h4>
                            {isNew && (
                              <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white font-mono text-[8px] font-black uppercase px-2 py-0.2 rounded-full shadow-2xs shrink-0">
                                ✨ NEW USER
                              </span>
                            )}
                            {isMe && (
                              <span className="bg-stone-900 text-white font-mono text-[7px] font-black uppercase px-1.5 py-0.2 rounded shadow-2xs shrink-0">
                                YOU
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
                            {cm.email || 'Registered Member'}
                          </p>

                          <p className="text-[10px] text-stone-600 italic truncate mt-1">
                            "{cm.statusNote || cm.currentMood || 'Comfort & Joy'}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-stone-400 font-medium">
                          Batch: {cm.batch || 'MLP41PT'}
                        </span>

                        {isMe ? (
                          <span className="text-xs font-bold text-stone-400 px-3 py-1 bg-stone-100 rounded-lg">
                            Signed In
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              audioEngine.playSfx('click');
                              setSelectedDirectUser(cm);
                              setChatSubTab('direct');
                            }}
                            className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-display font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Chat 1-on-1</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    )}

        {/* ==================== 2. CONCISE POST FEED ==================== */}
        {activeMode === 'posts' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Story Mood Rings Bar */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-display font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>🌸</span>
                  <span>Batch Moments & Stories</span>
                </span>
                <span className="font-handwritten text-xs text-rose-600 font-bold hidden sm:inline">
                  Tap friend to view & cheer ♡
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                <div
                  onClick={() => setShowNewPhotoPostModal(true)}
                  className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                >
                  <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform shadow-2xs">
                    <Plus className="w-4 h-4" />
                    <span className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      📸
                    </span>
                  </div>
                  <span className="font-display font-bold text-[10px] text-rose-900 truncate max-w-[52px] text-center">
                    New Post
                  </span>
                </div>

                {classmates.map(cm => (
                  <div
                    key={cm.id}
                    onClick={() => setSelectedClassmateDetail(cm)}
                    className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                  >
                    <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-500 group-hover:scale-105 transition-transform shadow-2xs">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                        <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                        {cm.currentMoodEmoji || '✨'}
                      </span>
                    </div>
                    <span className="font-display font-bold text-[10px] text-stone-800 truncate max-w-[54px] text-center">
                      {cm.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick "Share a Memory" Action Banner */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <p className="font-display font-bold text-xs text-rose-950 truncate">
                  Share a food snap, memory, or celebration with Batch 41
                </p>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPhotoPostModal(true);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>CREATE</span>
              </button>
            </div>

            {/* Photo Post Cards Stream (Responsive 2-column grid on desktop, 1-column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {photoPosts.map(post => {
                const isExpanded = Boolean(expandedComments[post.id]);
                const commentText = postCommentText[post.id] || '';
                const filterDef = FILTER_STYLES[post.filter || 'none'] || FILTER_STYLES.none;

                const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
                const postAuthorName = (post.authorName || '').replace(' 👑', '').trim().toLowerCase();
                const isPostAuthor = Boolean(
                  (currentUser?.id && post.userId && currentUser.id === post.userId) ||
                  (currentUser?.email && (post.userEmail || post.authorEmail) && currentUser.email.toLowerCase().trim() === (post.userEmail || post.authorEmail)?.toLowerCase().trim()) ||
                  (currentUserName !== '' && currentUserName === postAuthorName)
                );
                const isKritika = currentUserName.includes('kritika') || (currentUser?.email || '').toLowerCase().includes('kritika');

                return (
                  <div
                    key={post.id}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs space-y-2.5 transition-all hover:border-rose-300"
                  >
                    {/* Pinned Post Badge */}
                    {post.isPinned && (
                      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white px-3.5 py-1 text-[10px] font-display font-black flex items-center justify-between shadow-2xs">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                          <Pin className="w-3 h-3 fill-white" />
                          <span>Pinned Post</span>
                        </span>
                        <span className="text-white/90 text-[9px] font-bold">
                          {post.pinnedBy ? `Pinned by ${post.pinnedBy}` : 'Featured'}
                        </span>
                      </div>
                    )}

                    <div className="p-3 px-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-rose-400 to-amber-400">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display font-black text-xs text-stone-900 leading-none">
                              {post.authorName}
                            </h3>
                            {post.isKritika && (
                              <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                                👑 QUEEN
                              </span>
                            )}
                          </div>
                          {post.location && (
                            <span className="text-[10px] text-stone-400 font-medium block">
                              {post.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-stone-400 font-medium">
                          {post.timestamp}
                        </span>

                        {/* Post Action Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setActivePostMenuId(activePostMenuId === post.id ? null : post.id)}
                            className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                            title="Post options"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {activePostMenuId === post.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 animate-scale-up text-xs font-medium">
                              <button
                                type="button"
                                onClick={() => handleTogglePinPost(post)}
                                className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                              >
                                <Pin className="w-3.5 h-3.5 text-amber-600" />
                                <span>{post.isPinned ? 'Unpin post' : 'Pin to top'}</span>
                              </button>

                              {/* STRICT AUTHOR-ONLY: Edit Caption ONLY if isPostAuthor is true */}
                              {isPostAuthor && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditPost(post)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-stone-50 flex items-center gap-2 text-stone-700 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Edit caption</span>
                                </button>
                              )}

                              {(isPostAuthor || isKritika) && (
                                <button
                                  type="button"
                                  onClick={() => handleDeletePost(post)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer border-t border-stone-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Delete post</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div 
                      className="relative w-full aspect-4/3 sm:aspect-16/10 bg-stone-950 overflow-hidden cursor-pointer select-none group"
                      onDoubleClick={() => handleDoubleTapPost(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt="Post visual"
                        style={{ filter: filterDef.style }}
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />

                      {heartBurstId === post.id && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-up">
                          <Heart className="w-20 h-20 text-white fill-rose-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    <div className="px-3.5 pt-0.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            audioEngine.playSfx('pop');
                            batchWallService.likeInstagramPost(post.id, currentUser?.name);
                          }}
                          className={`flex items-center gap-1 text-xs font-display font-black transition-transform active:scale-90 cursor-pointer ${
                            post.likedByCurrentUser ? 'text-rose-600' : 'text-stone-600 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-4.5 h-4.5 ${post.likedByCurrentUser ? 'fill-rose-600' : ''}`} />
                          <span>{post.likesCount}</span>
                        </button>

                        <button
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="flex items-center gap-1 text-xs font-display font-bold text-stone-600 hover:text-purple-700 transition-transform active:scale-90 cursor-pointer"
                        >
                          <MessageCircle className="w-4.5 h-4.5" />
                          <span>{post.comments?.length || 0}</span>
                        </button>

                        <button
                          onClick={() => handleShareClick(post.caption.slice(0, 30))}
                          className="text-stone-600 hover:text-blue-600 transition-transform active:scale-90 cursor-pointer"
                        >
                          <Share2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          audioEngine.playSfx('pop');
                          batchWallService.toggleBookmarkInstagramPost(post.id);
                        }}
                        className={`transition-transform active:scale-90 cursor-pointer ${
                          post.saved ? 'text-amber-500' : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <Bookmark className={`w-4.5 h-4.5 ${post.saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="px-3.5 space-y-1">
                      <p className="text-xs text-stone-800 font-sans leading-relaxed">
                        <span className="font-display font-black mr-1.5 text-stone-900">
                          {post.authorName}
                        </span>
                        {post.caption}
                        {post.isEdited && (
                          <span className="text-[10px] text-stone-400 italic ml-1">
                            (edited)
                          </span>
                        )}
                      </p>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-0.5">
                          {post.hashtags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.2 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-3.5 pb-3 space-y-2">
                      {post.comments && post.comments.length > 0 && (
                        <button
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-[11px] font-display font-bold text-stone-400 hover:text-stone-600 cursor-pointer block"
                        >
                          {isExpanded
                            ? 'Hide comments'
                            : `View all ${post.comments.length} comment${post.comments.length > 1 ? 's' : ''}`}
                        </button>
                      )}

                      {isExpanded && post.comments && (
                        <div className="space-y-1.5 pt-1 border-t border-stone-100">
                          {post.comments.map(c => (
                            <div key={c.id} className="text-xs flex items-start gap-1.5">
                              <span className="font-display font-black text-stone-900 shrink-0">
                                {c.authorName}:
                              </span>
                              <span className="text-stone-700">{c.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setPostCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Add a kind comment..."
                          className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendPostComment(post.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          disabled={!commentText.trim()}
                          onClick={() => handleSendPostComment(post.id)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl text-xs font-display font-black uppercase cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 3. BULLETIN CORKBOARD ==================== */}
        {activeMode === 'bulletin' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 border border-amber-200/80 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl border border-amber-300 bg-white shadow-2xs shrink-0 flex items-center justify-center text-base">
                  📌
                </div>
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm text-stone-900">
                    Bulletin Sticky Notes
                  </h3>
                  <p className="font-handwritten text-xs text-stone-600 font-bold truncate">
                    Leave appreciation notes & emojis for Kritika!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPostModal(true);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>PIN NOTE</span>
              </button>
            </div>

            {/* Bulletin Notes Grid (Responsive 2-column grid on desktop, 1-column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allBulletinPosts.map(post => {
                const sticker = STICKERS.find(s => s.alias === post.avatarPose) || STICKERS[0];
                const reactionEntries = Object.entries(post.reactions || {}).filter(([, count]) => count > 0);
                const replies = post.replies || [];
                const hasKritikaReply = replies.some(r => r.isKritika);
                const isExpanded = Boolean(expandedReplies[post.id]);
                const replyText = replyInputMap[post.id] || '';
                const sending = Boolean(isSendingReply[post.id]);

                return (
                  <div
                    key={post.id}
                    className={`bg-white border rounded-2xl p-4 shadow-2xs space-y-2.5 transition-all relative ${
                      hasKritikaReply
                        ? 'border-pink-300 bg-gradient-to-b from-pink-50/25 via-white to-white'
                        : 'border-stone-200/90 hover:border-rose-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-6 text-sm select-none pointer-events-none">
                      📌
                    </div>

                    {hasKritikaReply && (
                      <div className="bg-gradient-to-r from-pink-100/90 via-rose-50 to-amber-50 border border-pink-300 rounded-xl p-2 px-3 flex items-center justify-between text-xs animate-scale-up">
                        <span className="font-display font-black text-rose-900 flex items-center gap-1.5 text-[11px]">
                          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
                          <span>KRITIKA REPLIED 💌</span>
                        </span>
                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-[10px] font-handwritten font-bold text-rose-700 underline cursor-pointer"
                        >
                          {isExpanded ? 'Hide' : 'Read Reply ↓'}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl border border-stone-200 overflow-hidden bg-rose-50 shrink-0">
                          <img src={sticker.avatarUrl} alt={post.studentName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-display font-black text-xs text-stone-900 leading-none">
                              {post.studentName}
                            </h3>
                            <span className="bg-rose-50 text-rose-800 font-handwritten text-[10px] font-black px-1.5 py-0.2 rounded-full border border-rose-200">
                              {post.batch}
                            </span>
                          </div>
                          <span className="font-handwritten text-[10px] text-stone-400 font-bold">
                            {post.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                        <span>{post.moodEmoji}</span>
                        <span>{post.mood}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                      {post.text}
                    </p>

                    <div className="pt-2 border-t border-stone-100 space-y-2">
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                        <span className="text-[10px] font-bold text-stone-400 shrink-0">React:</span>
                        {['💖', '🌸', '👑', '✨', '🍕', '☕', '🎉', '🔥', '🥰'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => {
                              audioEngine.playSfx('pop');
                              batchWallService.reactToPost(post.id, emoji);
                            }}
                            className="w-6.5 h-6.5 rounded-lg bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-xs transition-transform active:scale-90 cursor-pointer shrink-0"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 flex-wrap">
                          {reactionEntries.map(([alias, count]) => (
                            <span
                              key={alias}
                              className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full text-xs font-bold text-stone-700"
                            >
                              <span>{alias}</span>
                              <span>{count}</span>
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-xs font-display font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{replies.length > 0 ? `${replies.length} Replies` : 'Reply'}</span>
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-stone-100 space-y-2 bg-stone-50/80 p-3 rounded-xl">
                        {replies.map(r => (
                          <div key={r.id} className="p-2 rounded-xl bg-white border border-stone-200 text-xs space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-black text-stone-800">
                                {r.authorName} {r.isKritika ? '👑' : ''}
                              </span>
                              <span className="text-[10px] text-stone-400">{r.timestamp}</span>
                            </div>
                            <p className="text-stone-700">{r.text}</p>
                          </div>
                        ))}

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendReply(post.id);
                          }}
                          className="flex items-center gap-2 pt-1"
                        >
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyInputMap(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Reply with love and cheer..."
                            className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs outline-none"
                            required
                          />
                          <button
                            type="submit"
                            disabled={sending || !replyText.trim()}
                            className="px-3.5 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
                          >
                            Reply
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL: CREATE GROUP POLL */}
        {showCreatePollModal && (
          <BaseModal
            onClose={() => setShowCreatePollModal(false)}
            title="CREATE BATCH GROUP POLL"
            subtitle="Ask Batch 41 a question and see real-time votes"
            icon={<BarChart2 className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePoll} className="space-y-3 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Poll Question:
                </label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Tonight's comfort choice? 🍕 vs 🧀"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white font-bold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-display font-black text-xs text-stone-700 uppercase block">
                  Options:
                </label>
                <input
                  type="text"
                  value={pollOption1}
                  onChange={(e) => setPollOption1(e.target.value)}
                  placeholder="Option 1 (e.g. Pizza Night 🍕)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
                <input
                  type="text"
                  value={pollOption2}
                  onChange={(e) => setPollOption2(e.target.value)}
                  placeholder="Option 2 (e.g. Gourmet Macaroni 🧀)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
                <input
                  type="text"
                  value={pollOption3}
                  onChange={(e) => setPollOption3(e.target.value)}
                  placeholder="Option 3 (Optional, e.g. Hot Chai ☕)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Publish Group Poll 📊</span>
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: PROFILE SETTINGS & AVATAR EDITOR */}
        {showProfileModal && (
          <BaseModal
            onClose={() => setShowProfileModal(false)}
            title="YOUR CHAT & SOCIAL PROFILE"
            subtitle="Customize how your name and avatar appear to all group members"
            icon={<UserCheck className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1.5">
                  1. Profile Picture / Avatar:
                </label>
                
                <input
                  ref={profileAvatarFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileAvatarSelect}
                  className="hidden"
                />

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-400 shadow-sm bg-stone-100">
                      <img src={profileAvatarInput} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      {profileMoodEmojiInput}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => profileAvatarFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-display font-bold text-stone-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-rose-600" />
                    <span>Upload Custom Photo</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-stone-400 block mb-1">Or choose a preset:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {AVATAR_PRESETS.map((p, idx) => {
                      const isSelected = profileAvatarInput === p.url;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setProfileAvatarInput(p.url);
                            audioEngine.playSfx('pop');
                          }}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-transform shrink-0 ${
                            isSelected ? 'border-rose-600 scale-110 ring-2 ring-rose-200' : 'border-stone-300 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  2. Display Name (Seen by all members):
                </label>
                <input
                  type="text"
                  value={profileNameInput}
                  onChange={(e) => setProfileNameInput(e.target.value)}
                  placeholder="e.g. Kritika Gupta 👑 or Your Name"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  3. Status Note / Bio:
                </label>
                <input
                  type="text"
                  value={profileStatusInput}
                  onChange={(e) => setProfileStatusInput(e.target.value)}
                  placeholder="e.g. Savoring sweet memories ♡ ✨"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  4. Current Mood Emoji:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none mb-1.5">
                  {COMMON_EMOJIS.map(emoji => {
                    const isSelected = profileMoodEmojiInput === emoji;
                    return (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setProfileMoodEmojiInput(emoji);
                          audioEngine.playSfx('pop');
                        }}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-transform ${
                          isSelected ? 'bg-rose-100 border border-rose-400 scale-110' : 'bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile & Reflect in Group Chat</span>
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: CREATE NEW PHOTO POST */}
        {showNewPhotoPostModal && (
          <BaseModal
            onClose={() => setShowNewPhotoPostModal(false)}
            title="CREATE PHOTO POST"
            subtitle="Share memories, food & aesthetic moments with Batch 41"
            icon={<Camera className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePhotoPost} className="space-y-3.5 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  1. Choose / Upload Photo:
                </label>
                <input
                  ref={photoFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoPostImageSelect}
                  className="hidden"
                />

                {newPostImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-stone-300 aspect-4/3 bg-black shadow-xs">
                    <img
                      src={newPostImage}
                      alt="Selected"
                      style={{ filter: FILTER_STYLES[newPostFilter]?.style }}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setNewPostImage(null)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div
                      onClick={() => photoFileInputRef.current?.click()}
                      className="border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-2xl p-5 text-center bg-rose-50/40 hover:bg-rose-50 transition-colors cursor-pointer space-y-1.5"
                    >
                      <div className="w-9 h-9 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                        <Camera className="w-5 h-5" />
                      </div>
                      <p className="font-display font-bold text-xs text-rose-900">
                        Tap to upload from device 📸
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 block mb-1">Or pick a comfort preset:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {PRESET_PHOTOS.slice(0, 3).map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => setNewPostImage(preset.url)}
                            className="border border-stone-200 hover:border-rose-400 rounded-xl overflow-hidden cursor-pointer group relative aspect-4/3"
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] font-bold p-0.5 truncate text-center">
                              {preset.label.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {newPostImage && (
                <div>
                  <label className="font-display font-black text-[11px] text-stone-700 uppercase block mb-1">
                    2. Filter Preset:
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {Object.entries(FILTER_STYLES).map(([key, def]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNewPostFilter(key)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-display font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                          newPostFilter === key
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>{def.icon}</span>
                        <span>{def.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Location / Vibe:
                </label>
                <input
                  type="text"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  placeholder="e.g. Factory of Fun • Comfort Lounge 🌸"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Caption:
                </label>
                <textarea
                  rows={2}
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  placeholder="Share a sweet memory, shoutout, or food review..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display font-black text-xs text-stone-700 uppercase flex items-center justify-between">
                  <span>Hashtags / Tags:</span>
                  <span className="text-[10px] text-stone-400 font-normal">Tap tag to select/unselect</span>
                </label>

                {selectedTags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap p-2 bg-rose-50/60 border border-rose-200 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-900 mr-1">Active:</span>
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer hover:bg-rose-700 transition-colors shadow-2xs"
                      >
                        <span>{tag}</span>
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 flex-wrap">
                  {SUGGESTED_HASHTAGS.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={customTagInput}
                      onChange={(e) => setCustomTagInput(e.target.value)}
                      placeholder="Add custom tag (e.g. ChaiNight)..."
                      className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomTag();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddCustomTag()}
                    disabled={!customTagInput.trim()}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 disabled:opacity-40 text-white text-xs font-display font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPublishingPost || !newPostImage}
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer mt-1"
              >
                Publish Memory Post 📸✨
              </button>
            </form>
          </BaseModal>
        )}

        {/* MODAL: PIN A BULLETIN NOTE */}
        {showNewPostModal && (
          <BaseModal
            onClose={() => setShowNewPostModal(false)}
            title="PIN A NOTE TO BULLETIN"
            subtitle="Share memories, appreciation & comfort with Batch 41"
            icon={<Pin className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreateBulletinPost} className="space-y-3.5 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Your Display Name:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Message / Note:
                </label>
                <textarea
                  rows={3}
                  value={bulletinText}
                  onChange={(e) => setBulletinText(e.target.value)}
                  placeholder="Leave a heartfelt note, inside joke, or cheer for Kritika..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div>
                <span className="font-display font-black text-[10px] text-stone-500 uppercase block mb-1">
                  Add Emojis:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COMMON_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setBulletinText(prev => prev + ' ' + emoji)}
                      className="w-7 h-7 rounded-xl bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-xs transition-transform active:scale-90 cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Pin to Bulletin Board ✨
              </button>
            </form>
          </BaseModal>
        )}

        {/* Lightbox Image Zoom */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] flex flex-col items-center gap-3 relative"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxImage.url}
                alt="Enlarged preview"
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              {lightboxImage.caption && (
                <p className="text-white font-sans text-xs sm:text-sm text-center bg-black/60 px-4 py-2 rounded-xl">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal: Classmate Cheer & Status */}
        {selectedClassmateDetail && (
          <BaseModal
            onClose={() => setSelectedClassmateDetail(null)}
            title={selectedClassmateDetail.name}
            subtitle={`Batch ${selectedClassmateDetail.batch} Member`}
            icon={<div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300"><img src={selectedClassmateDetail.avatarUrl} alt="" className="w-full h-full object-cover" /></div>}
            maxWidth="max-w-sm"
          >
            <div className="space-y-3.5 text-center">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-handwritten font-bold text-amber-900">
                <span>{selectedClassmateDetail.currentMoodEmoji}</span>
                <span>{selectedClassmateDetail.currentMood}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <p className="font-handwritten text-xs sm:text-sm text-stone-700 italic">
                  "{selectedClassmateDetail.statusNote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    audioEngine.playSfx('fanfare');
                    confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
                    batchWallService.sendGroupChatMessage({
                      senderId: currentUser?.id,
                      senderName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
                      senderEmail: currentUser?.email,
                      avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
                      text: `Sending a big warm cheer to @${selectedClassmateDetail.name}! Keep glowing! ✨💖`
                    });
                    setSelectedClassmateDetail(null);
                    setActiveMode('chat');
                  }}
                  className="py-2.5 px-2 bg-[#00A884] hover:bg-[#008F6F] text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Cheer in Chat 💬
                </button>

                <button
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    setChatInput(prev => `${prev}@${selectedClassmateDetail.name.split(' ')[0]} `);
                    setSelectedClassmateDetail(null);
                    setActiveMode('chat');
                  }}
                  className="py-2.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-display font-bold uppercase shadow-2xs transition-colors cursor-pointer"
                >
                  @Mention In Chat
                </button>
              </div>
            </div>
          </BaseModal>
        )}

        {/* MODAL: EDIT CHAT MESSAGE */}
        {editingMessage && (
          <BaseModal
            onClose={() => setEditingMessage(null)}
            title="EDIT MESSAGE"
            subtitle="Update your message in Batch 41 Lounge"
            icon={<Edit3 className="w-5 h-5 text-amber-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveEditMessage} className="space-y-3.5 text-left">
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Message Text:
                </label>
                <textarea
                  rows={4}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMessage(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-display font-bold uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editingText.trim()}
                  className="flex-1 py-2.5 bg-[#00A884] hover:bg-[#008F6F] disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes ✓
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* MODAL: EDIT POST CAPTION */}
        {editingPost && (
          <BaseModal
            onClose={() => setEditingPost(null)}
            title="EDIT POST CAPTION"
            subtitle="Update your caption for this post"
            icon={<Edit3 className="w-5 h-5 text-amber-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveEditPost} className="space-y-3.5 text-left">
              <div className="rounded-xl overflow-hidden border border-stone-200 aspect-16/9 max-h-40 bg-black/5">
                <img src={editingPost.imageUrl} alt="Post preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Post Caption:
                </label>
                <textarea
                  rows={4}
                  value={editingPostCaption}
                  onChange={(e) => setEditingPostCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-display font-bold uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editingPostCaption.trim()}
                  className="flex-1 py-2.5 bg-[#00A884] hover:bg-[#008F6F] disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
                >
                  Save Caption ✓
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* MODAL: DELETE MESSAGE (WHATSAPP STYLE) */}
        {deleteModalMsg && (() => {
          const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
          const msgSenderName = (deleteModalMsg.senderName || '').replace(' 👑', '').trim().toLowerCase();
          const isAuthor = Boolean(
            (currentUser?.id && deleteModalMsg.senderId && currentUser.id === deleteModalMsg.senderId) ||
            (currentUser?.email && deleteModalMsg.senderEmail && currentUser.email.trim().toLowerCase() === deleteModalMsg.senderEmail.trim().toLowerCase()) ||
            (currentUserName !== '' && currentUserName === msgSenderName)
          );
          const isKritika = currentUserName.includes('kritika') || (currentUser?.email || '').toLowerCase().includes('kritika');

          return (
            <BaseModal
              onClose={() => setDeleteModalMsg(null)}
              title="DELETE MESSAGE?"
              subtitle="Choose how you would like to delete this message"
              icon={<Trash2 className="w-5 h-5 text-rose-500" />}
              maxWidth="max-w-sm"
            >
              <div className="space-y-2.5 text-left">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
                  <span className="font-bold text-stone-900 block mb-0.5">{deleteModalMsg.senderName}:</span>
                  <p className="line-clamp-2 italic">"{deleteModalMsg.text || 'Photo attachment'}"</p>
                </div>

                <div className="space-y-2 pt-1">
                  {/* Delete for Everyone: ONLY visible to message author or Kritika */}
                  {(isAuthor || isKritika) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteForEveryone(deleteModalMsg)}
                      className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Delete for Everyone</span>
                    </button>
                  )}

                  {/* Delete for Me */}
                  <button
                    type="button"
                    onClick={() => handleDeleteForMe(deleteModalMsg)}
                    className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-stone-500" />
                    <span>Delete for Me</span>
                  </button>

                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => setDeleteModalMsg(null)}
                    className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-display font-bold text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </BaseModal>
          );
        })()}

        {/* MODAL: MESSAGE READ RECEIPTS / SEEN STATUS */}
        {seenInfoMsg && (
          <BaseModal
            onClose={() => setSeenInfoMsg(null)}
            title="MESSAGE READ STATUS"
            subtitle="Check who has seen this message and who hasn't yet"
            icon={<Eye className="w-5 h-5 text-sky-500" />}
            maxWidth="max-w-md"
          >
            {(() => {
              const allMembers = batchWallService.getAllBatchMembers(classmates);
              const seenByList = seenInfoMsg.seenBy || [];
              const unseenMembers = allMembers.filter(m => !seenByList.some(s => (s.userId && s.userId === m.id) || (m.email && s.userEmail && s.userEmail.toLowerCase() === m.email.toLowerCase()) || (s.userName && s.userName.toLowerCase().trim() === m.name.toLowerCase().trim())));
              const isAllSeen = seenByList.length > 0 && unseenMembers.length === 0;

              return (
                <div className="space-y-4 text-left">
                  {/* Message Preview Box */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-display font-black text-stone-900">{seenInfoMsg.senderName}</span>
                      <span className="text-[10px] text-stone-400">{seenInfoMsg.timestamp}</span>
                    </div>
                    <p className="text-xs text-stone-700 font-sans italic line-clamp-2">
                      "{seenInfoMsg.text || (seenInfoMsg.imageUrl ? 'Photo Attachment' : 'Group Message')}"
                    </p>
                  </div>

                  {/* Read Status Banner */}
                  <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 text-xs font-bold ${
                    isAllSeen 
                      ? 'bg-sky-50 border-sky-200 text-sky-900' 
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCheck className={`w-4 h-4 ${isAllSeen ? 'text-sky-500' : 'text-stone-400'}`} />
                      <span>{isAllSeen ? 'Seen by all batch members!' : `Delivered (${seenByList.length} of ${allMembers.length} seen)`}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isAllSeen ? 'bg-sky-500 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {isAllSeen ? 'All Read ✓✓' : 'Partial'}
                    </span>
                  </div>

                  {/* Seen By Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs text-stone-700 uppercase flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sky-500" />
                        <span>Seen By ({seenByList.length})</span>
                      </h4>
                    </div>

                    {seenByList.length === 0 ? (
                      <p className="text-xs text-stone-400 italic p-2">No read receipts recorded yet.</p>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {seenByList.map((s, idx) => (
                          <div key={idx} className="p-2 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-300 bg-white">
                                <img src={s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'} alt={s.userName} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-display font-bold text-stone-900">{s.userName}</span>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-medium bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                              Seen {s.seenAt ? new Date(s.seenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Not Seen Yet Section */}
                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs text-stone-700 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Not Seen Yet ({unseenMembers.length})</span>
                      </h4>
                    </div>

                    {unseenMembers.length === 0 ? (
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 text-center">
                        ✨ Everyone in the batch has seen this message!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {unseenMembers.map((m) => (
                          <div key={m.id} className="p-2 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300 bg-white">
                                <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-display font-bold text-stone-800">{m.name}</span>
                            </div>
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              Unread ⏳
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSeenInfoMsg(null)}
                    className="w-full py-2 bg-stone-900 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </BaseModal>
        )}

        {/* Modal: Google Sign In */}
        {showGoogleModal && (
          <GoogleSignInModal onClose={() => setShowGoogleModal(false)} />
        )}

      </div>
    </div>
  );
};
