import React, { useState, useEffect, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService, type InstagramPost, type GroupChatMessage, type LikedMember, formatChatTimestamp } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Plus, Sparkles, Send, X, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin, Camera, Paperclip, Smile,
  Bookmark, Share2, CheckCheck, Eye, Compass, Tag, Edit3, Check,
  Reply, BarChart2, AtSign, MoreVertical, Mic, Volume2, VolumeX, Headphones, MicOff, PhoneOff,
  Trash2, ChevronDown, Ban, Globe, Lock, Clock,
  AlertCircle, RefreshCw, Video, Phone, ChevronLeft, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';
import { voiceRoomService } from '../services/voiceRoomService';

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
                className={`font-bold ${isCurrentUser ? 'text-rose-700 bg-white/80 px-1 py-0.5 rounded shadow-2xs' : 'text-rose-600 bg-rose-50/90 px-1 py-0.5 rounded'} hover:underline cursor-pointer`}
              >
                {token}
              </span>
            );
          }
          if (token.startsWith('#') || /^\d{10}$/.test(token)) {
            return (
              <span 
                key={tokIdx} 
                className={`font-bold underline cursor-pointer ${isCurrentUser ? 'text-stone-900 hover:text-rose-600' : 'text-rose-600'}`}
              >
                {token}
              </span>
            );
          }
          if (/^(?:GRAND FESTIVE SALE|Start Date|End Date):?$/.test(token)) {
            return (
              <span key={tokIdx} className="font-black text-stone-900">
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
  const [chatFilter, setChatFilter] = useState<'all' | 'mine'>('all');
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
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<{ id: string; type: 'photo' | 'bulletin'; title?: string } | null>(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

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
  const [activePostImgIndex, setActivePostImgIndex] = useState<Record<string, number>>({});
  const [showLikedByModalPost, setShowLikedByModalPost] = useState<InstagramPost | null>(null);
  const [activeReactionPickerPostId, setActiveReactionPickerPostId] = useState<string | null>(null);

  // New Photo Post Form State (Supports Multiple Photos in one poster)
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [activeCreatePreviewIndex, setActiveCreatePreviewIndex] = useState(0);
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
  const chatMessages = batchWallService.getChatMessages(currentUser?.id);
  const chatStatus = batchWallService.getChatConnectionStatus();
  const photoPosts = batchWallService.getInstagramPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // ==================== DISCORD-STYLE VOICE ROOM STATE ====================
  const [, setVoiceTick] = useState(0);
  const [showVoiceRoomModal, setShowVoiceRoomModal] = useState(false);

  useEffect(() => {
    const unsubVoice = voiceRoomService.subscribe(() => setVoiceTick(t => t + 1));
    const unsubCheer = voiceRoomService.onCheer((cheer) => {
      setShareToast(`🎉 ${cheer.senderName} sent voice cheer: ${cheer.emoji} ${cheer.label}!`);
      setTimeout(() => setShareToast(null), 2500);
    });
    return () => {
      unsubVoice();
      unsubCheer();
    };
  }, []);

  const isVoiceRoomConnected = voiceRoomService.getIsJoined();
  const isVoiceMuted = voiceRoomService.getIsMuted();
  const isVoiceDeafened = voiceRoomService.getIsDeafened();
  const userIsSpeaking = voiceRoomService.getIsSpeaking();
  const voiceParticipants = voiceRoomService.getParticipants();

  const handleJoinVoiceRoom = async () => {
    audioEngine.playSfx('levelup');
    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    const email = currentUser?.email || authService.getFirebaseUser()?.email || undefined;
    const avatar = currentUser?.avatarUrl || profileAvatarInput || '/marisol/avatars/01_brighter_ideas.png';
    const uid = currentUser?.id || authService.getFirebaseUser()?.uid || `user_${player.nickname || 'Student'}`;

    await voiceRoomService.joinRoom({
      id: uid,
      name,
      email,
      avatarUrl: avatar
    });

    setShowVoiceRoomModal(true);
    setShareToast('Joined Batch 41 Voice Room 🔊✨');
    setTimeout(() => setShareToast(null), 2500);
  };

  const toggleVoiceRoomMute = () => {
    const muted = voiceRoomService.toggleMute();
    setShareToast(muted ? 'Microphone Muted 🔇' : 'Microphone Live 🎙️');
    setTimeout(() => setShareToast(null), 1800);
  };

  const toggleVoiceRoomDeafen = () => {
    const deafened = voiceRoomService.toggleDeafen();
    setShareToast(deafened ? 'Audio Deafened 🎧' : 'Audio Active 🔊');
    setTimeout(() => setShareToast(null), 1800);
  };

  const handleDisconnectVoiceRoom = () => {
    voiceRoomService.leaveRoom();
    setShowVoiceRoomModal(false);
    setShareToast('Left Voice Room 📞');
    setTimeout(() => setShareToast(null), 2000);
  };

  const handleSendVoiceCheer = (emoji: string, label: string, sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup') => {
    voiceRoomService.sendCheer(emoji, label, sfx);
    if (label === 'Cheer') {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
    setShareToast(`Sent voice cheer: ${emoji} ${label}!`);
    setTimeout(() => setShareToast(null), 1800);
  };

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
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  }, [activeMode, currentUser]);

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

  // Photo Post Image Upload (Supports uploading multiple photos in one poster)
  const handlePhotoPostImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i], 1080, 0.8);
        compressedList.push(compressed);
      }
      setNewPostImages(prev => {
        const updated = [...prev, ...compressedList];
        if (!newPostImage && updated.length > 0) {
          setNewPostImage(updated[0]);
        }
        return updated;
      });
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
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to chat! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    const fbUser = authService.getFirebaseUser();
    const senderId = fbUser?.uid || currentUser?.id;
    if (!senderId) {
      setShowGoogleModal(true);
      setShareToast('Authentication required. Please sign in to chat! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    const text = chatInput.trim();
    if (!text && !chatImageAttachment) return;

    setIsSendingChat(true);
    audioEngine.playSfx('fanfare');

    const name = currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student';
    const email = fbUser?.email || currentUser?.email || undefined;
    const avatar = fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput;
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

    try {
      await batchWallService.sendGroupChatMessage({
        senderId,
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
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('[Batch 41 Group Chat] Error sending message:', err);
      const errCode = err?.code || '';
      let errorMsg = 'Unable to send message to Firestore.';
      if (errCode === 'permission-denied') {
        errorMsg = 'Permission denied by Firestore rules. Please check Firebase Console.';
      } else if (err?.message) {
        errorMsg = `Firestore error: ${err.message}`;
      }
      setShareToast(errorMsg);
      setTimeout(() => setShareToast(null), 4000);
    } finally {
      setIsSendingChat(false);
    }
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
    const authorId = currentUser?.id || authService.getFirebaseUser()?.uid;
    const result = await batchWallService.editChatMessage(editingMessage.id, editingText, authorId);
    if (!result.success) {
      setShareToast(result.error || 'Failed to edit message');
    } else {
      setShareToast('Message edited ✏️');
    }
    setEditingMessage(null);
    setEditingText('');
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
    const uid = currentUser?.id || authService.getFirebaseUser()?.uid || 'guest';
    batchWallService.deleteChatMessageForMe(msg.id, uid);
    setDeleteModalMsg(null);
    setActiveActionMenuMsgId(null);
    setDeletionReaction({ text: 'Message deleted for you', emoji: '🗑️' });
    setTimeout(() => setDeletionReaction(null), 2500);
  };

  const handleDeleteForEveryone = async (msg: GroupChatMessage) => {
    audioEngine.playSfx('pop');
    const authorId = currentUser?.id || authService.getFirebaseUser()?.uid;
    const result = await batchWallService.deleteChatMessageForEveryone(msg.id, authorId);
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

  const handleDeletePost = (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    setActivePostMenuId(null);
    setDeleteConfirmPost({
      id: post.id,
      type: 'photo',
      title: post.caption ? `"${post.caption.slice(0, 35)}..."` : 'Photo Post'
    });
  };

  const handleConfirmDeletePost = async () => {
    if (!deleteConfirmPost) return;
    setIsDeletingPost(true);
    audioEngine.playSfx('pop');

    const deleter = {
      id: currentUser?.id,
      email: currentUser?.email,
      name: currentUser?.name || profileNameInput
    };

    let result: { success: boolean; error?: string };
    if (deleteConfirmPost.type === 'photo') {
      result = await batchWallService.deleteInstagramPost(deleteConfirmPost.id, deleter);
    } else {
      result = await batchWallService.deletePost(deleteConfirmPost.id, deleter);
    }

    setIsDeletingPost(false);
    setDeleteConfirmPost(null);
    setActivePostMenuId(null);

    if (!result.success) {
      setShareToast(result.error || 'Failed to delete post');
    } else {
      setShareToast('Post completely deleted 🗑️');
    }
    setTimeout(() => setShareToast(null), 2500);
  };

  // Create & Send Live Group Poll
  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to create polls! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }

    const fbUser = authService.getFirebaseUser();
    const senderId = fbUser?.uid || currentUser?.id;
    if (!senderId) {
      setShowGoogleModal(true);
      return;
    }

    if (!pollQuestion.trim() || !pollOption1.trim() || !pollOption2.trim()) return;

    audioEngine.playSfx('fanfare');
    const name = currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student';
    const email = fbUser?.email || currentUser?.email || undefined;
    const avatar = fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput;

    const options = [
      { id: 'opt_1', text: pollOption1.trim(), votes: [] },
      { id: 'opt_2', text: pollOption2.trim(), votes: [] }
    ];
    if (pollOption3.trim()) {
      options.push({ id: 'opt_3', text: pollOption3.trim(), votes: [] });
    }

    try {
      await batchWallService.sendGroupChatMessage({
        senderId,
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
    } catch (err: any) {
      console.error('[Batch 41 Group Chat] Error creating poll:', err);
      const errCode = err?.code || '';
      let errorMsg = 'Failed to create poll in Firestore.';
      if (errCode === 'permission-denied') {
        errorMsg = 'Permission denied by Firestore rules. Check Firebase Console.';
      } else if (err?.message) {
        errorMsg = `Firestore error: ${err.message}`;
      }
      setShareToast(errorMsg);
      setTimeout(() => setShareToast(null), 4000);
    }
  };

  // Vote on Poll
  const handleVotePoll = (messageId: string, optionId: string) => {
    if (!authService.isUserAllowedToChat()) {
      setShowGoogleModal(true);
      setShareToast('Please connect with your Email ID to vote! 🔒');
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    const voterId = currentUser?.id || authService.getFirebaseUser()?.uid;
    if (!voterId) {
      setShowGoogleModal(true);
      return;
    }
    audioEngine.playSfx('pop');
    batchWallService.votePoll(messageId, optionId, voterId, currentUser?.name);
  };

  // Double tap to like Photo Post
  const handleDoubleTapPost = (post: InstagramPost) => {
    audioEngine.playSfx('fanfare');
    setHeartBurstId(post.id);
    batchWallService.likeInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput
    });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setHeartBurstId(null), 900);
  };

  const handleToggleLikePost = (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    batchWallService.likeInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl || profileAvatarInput
    });
  };

  const handleReactToPost = (postId: string, emoji: string) => {
    audioEngine.playSfx('pop');
    batchWallService.reactToInstagramPost(postId, emoji, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
      email: currentUser?.email
    });
    setActiveReactionPickerPostId(null);
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    audioEngine.playSfx('pop');
    const name = currentUser?.name || profileNameInput || studentName || 'Batch 41 Student';
    batchWallService.likeInstagramComment(postId, commentId, name);
  };

  const handleSharePost = async (post: InstagramPost) => {
    audioEngine.playSfx('pop');
    const updatedCount = await batchWallService.shareInstagramPost(post.id, {
      id: currentUser?.id,
      name: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student'
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }

    setShareToast(`Link copied! Shared ${updatedCount} time${updatedCount > 1 ? 's' : ''} 🚀✨`);
    setTimeout(() => setShareToast(null), 2500);
  };

  // Submit Photo Post (Supports multi-photo poster)
  const handleCreatePhotoPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesToPublish = newPostImages.length > 0 ? newPostImages : (newPostImage ? [newPostImage] : []);
    if (imagesToPublish.length === 0) {
      alert('Please upload or select at least one photo for your poster!');
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
      imageUrl: imagesToPublish[0],
      images: imagesToPublish,
      filter: newPostFilter,
      caption: newPostCaption.trim(),
      hashtags: selectedTags
    });

    setNewPostImages([]);
    setNewPostImage(null);
    setActiveCreatePreviewIndex(0);
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

  const currentUserId = currentUser?.id || authService.getFirebaseUser()?.uid;
  const currentUserEmail = currentUser?.email?.toLowerCase() || authService.getFirebaseUser()?.email?.toLowerCase();
  const currentUserNameClean = (currentUser?.name || profileNameInput || '').toLowerCase().replace(' 👑', '').trim();

  const myMessagesCount = chatMessages.filter(msg => {
    return Boolean(
      (currentUserId && msg.senderId && msg.senderId === currentUserId) ||
      (currentUserEmail && msg.senderEmail && msg.senderEmail.trim().toLowerCase() === currentUserEmail) ||
      (currentUserNameClean && msg.senderName && msg.senderName.toLowerCase().replace(' 👑', '').trim() === currentUserNameClean)
    );
  }).length;

  const displayedChatMessages = chatFilter === 'mine'
    ? chatMessages.filter(msg => {
        return Boolean(
          (currentUserId && msg.senderId && msg.senderId === currentUserId) ||
          (currentUserEmail && msg.senderEmail && msg.senderEmail.trim().toLowerCase() === currentUserEmail) ||
          (currentUserNameClean && msg.senderName && msg.senderName.toLowerCase().replace(' 👑', '').trim() === currentUserNameClean)
        );
      })
    : chatMessages;

  return (
    <div className={`bg-[#FAF8F5] text-stone-900 w-full ${
      activeMode === 'chat' 
        ? 'h-full flex-1 min-h-0 flex flex-col overflow-hidden p-1.5 sm:p-2.5 pb-1' 
        : 'min-h-screen p-2.5 sm:p-5 pb-20'
    }`}>
      <div className={`max-w-4xl lg:max-w-5xl mx-auto w-full ${
        activeMode === 'chat' 
          ? 'h-full flex-1 min-h-0 flex flex-col overflow-hidden' 
          : 'space-y-3 sm:space-y-4'
      }`}>

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

        {/* UNIFIED COHESIVE TAB SWITCHER */}
        <div className="grid grid-cols-3 gap-1 bg-stone-200/70 p-1 rounded-2xl border border-stone-300/80 mb-1.5 shrink-0">
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

        {/* ==================== 1. BATCH LOUNGE (Real-Time Group Chat) ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-0 animate-fade-in relative">
            {/* Clean Chat Top Bar matching user design: [ 🌸 avatar ] [ All (X) | My Messages (Y) ]  📹  📞  📊  ⋮ */}
            <div className="bg-white border-b border-stone-200/80 text-stone-900 px-3 sm:px-4 py-2 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* 🌸 Flower Avatar with Green Online Dot */}
                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  className="relative shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  title="View Profile / Group Info"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-50 border border-rose-200/90 overflow-hidden flex items-center justify-center text-lg shadow-2xs">
                    🌸
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </button>

                {/* Pill Switcher: All (X) | My Messages (Y) */}
                <div className="bg-stone-100/90 border border-stone-200/80 rounded-full p-1 flex items-center gap-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setChatFilter('all');
                    }}
                    className={`px-3 py-1 rounded-full text-xs sm:text-[13px] font-display font-bold transition-all cursor-pointer ${
                      chatFilter === 'all'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    All ({chatMessages.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setChatFilter('mine');
                    }}
                    className={`px-3 py-1 rounded-full text-xs sm:text-[13px] font-display font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      chatFilter === 'mine'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>My Messages</span>
                    {myMessagesCount > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        chatFilter === 'mine' ? 'bg-rose-100 text-rose-700' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {myMessagesCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 4 Clean Action Icons: Video, Phone, Poll/Chart, More */}
              <div className="flex items-center gap-2 sm:gap-3 text-stone-600 shrink-0">
                {/* Video Call Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    if (!isVoiceRoomConnected) {
                      handleJoinVoiceRoom();
                    } else {
                      setShowVoiceRoomModal(true);
                    }
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Voice & Video Room"
                >
                  <Video className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* Phone Call Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    if (!isVoiceRoomConnected) {
                      handleJoinVoiceRoom();
                    } else {
                      setShowVoiceRoomModal(true);
                    }
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Audio Call"
                >
                  <Phone className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* Poll / BarChart Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setShowCreatePollModal(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Create Group Poll"
                >
                  <BarChart2 className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>

                {/* More Options / Profile Info Icon */}
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    setShowProfileModal(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                  title="Group Info & Profile"
                >
                  <MoreVertical className="w-5 h-5 text-stone-600 hover:text-stone-900" />
                </button>
              </div>
            </div>

            {/* Discord-Style Persistent Active Voice Bar (Speak anytime while chatting) */}
            {isVoiceRoomConnected && (
              <div className="bg-[#2B2D31] text-white px-3 py-1.5 flex items-center justify-between text-xs shrink-0 shadow-xs border-b border-[#1E1F22] animate-fade-in">
                <div 
                  onClick={() => setShowVoiceRoomModal(true)}
                  className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <span className="font-display font-bold text-[11px] sm:text-xs text-emerald-400 block truncate">
                      🔊 Voice Connected • Batch 41 Voice Room
                    </span>
                    <span className="text-[10px] text-stone-300 block truncate">
                      {userIsSpeaking ? '🎙️ You are speaking...' : isVoiceMuted ? '🔇 You are muted' : '🎙️ Mic live (Speak anytime)'} • Tap for stage
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={toggleVoiceRoomMute}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVoiceMuted ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    }`}
                    title={isVoiceMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                  >
                    {isVoiceMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleVoiceRoomDeafen}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVoiceDeafened ? 'bg-rose-500/20 text-rose-400' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                    }`}
                    title={isVoiceDeafened ? 'Undeafen Audio' : 'Deafen Audio'}
                  >
                    {isVoiceDeafened ? <VolumeX className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleDisconnectVoiceRoom}
                    className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer ml-1"
                    title="Disconnect from Voice Room"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Error Banner with Retry Button */}
            {chatStatus.status === 'error' && (
              <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-800 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{chatStatus.errorMessage || 'Unable to connect to the group chat. Please check your internet connection.'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('click');
                    batchWallService.initChatListener();
                  }}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[10px] cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Clean Stream Area (Pure, Clean Minimal Surface) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3 space-y-3.5 scrollbar-thin overscroll-contain bg-[#FAFAFA]">
              

              

              {/* Empty / Loading State for Messages */}
              {displayedChatMessages.length === 0 && (
                <div className="p-12 text-center space-y-3 my-8">
                  {chatStatus.status === 'connecting' ? (
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <h4 className="font-display font-bold text-sm text-stone-700">Connecting to Batch 41...</h4>
                      <p className="text-xs text-stone-400">Loading real-time group messages</p>
                    </div>
                  ) : chatStatus.status === 'error' ? (
                    <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-2xl max-w-sm mx-auto space-y-2">
                      <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
                      <h4 className="font-display font-bold text-sm text-rose-900">Unable to connect to the group chat</h4>
                      <p className="text-xs text-rose-700">Please check your internet connection.</p>
                      <button
                        type="button"
                        onClick={() => batchWallService.initChatListener()}
                        className="mt-2 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Retry Connection
                      </button>
                    </div>
                  ) : chatFilter === 'mine' ? (
                    <div className="space-y-2.5">
                      <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-600 mx-auto flex items-center justify-center font-bold text-2xl border border-stone-200 shadow-2xs">
                        ✍️
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-stone-800">No messages from you yet</h4>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Type a message in the input below to share your thoughts with the group!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center font-bold text-2xl border border-rose-200 shadow-2xs">
                        👋
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-stone-800">No messages yet.</h4>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Be the first to say hello 👋
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Date Separators & Chat Stream */}
              {displayedChatMessages.map((msg, index) => {
                const isCurrentUser = Boolean(
                  (currentUser?.id && msg.senderId && currentUser.id === msg.senderId) ||
                  (currentUser?.email && msg.senderEmail && currentUser.email.trim().toLowerCase() === msg.senderEmail.trim().toLowerCase())
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

                      {/* Speech Bubble Card: Light Grey for Yours Chat, Clean White for Others */}
                      <div className="relative max-w-[85%] sm:max-w-[75%] space-y-1">
                        <div
                          className={`p-2.5 px-3 rounded-2xl shadow-2xs text-xs sm:text-sm leading-relaxed relative ${
                            isCurrentUser
                              ? 'bg-stone-200 text-stone-900 rounded-tr-xs border border-stone-300/80 shadow-2xs'
                              : 'bg-white text-stone-900 rounded-tl-xs border border-stone-200/80 shadow-2xs'
                          }`}
                        >

                          {/* 1. Distinct Bold Sender Name & Action Dropdown Trigger */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                              <span 
                                onClick={() => {
                                  setChatInput((prev: string) => `${prev ? prev + ' ' : ''}@${msg.senderName} `);
                                }}
                                className={`font-display font-black text-xs sm:text-[13px] tracking-tight ${isCurrentUser ? 'text-stone-900' : senderColor} hover:underline cursor-pointer truncate`}
                                title="Click to mention in chat"
                              >
                                {isCurrentUser ? 'You' : msg.senderName}
                              </span>
                              {msg.isKritika && (
                                <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0">
                                  👑 QUEEN
                                </span>
                              )}
                              {msg.senderIsNewUser && (
                                <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs shrink-0 flex items-center gap-0.5">
                                  <span>✨</span>
                                  <span>NEW USER</span>
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
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 animate-scale-up text-xs font-medium">
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
                          <div 
                            onClick={() => handleJumpToMessage(msg.replyTo!.id)}
                            className={`mb-1.5 p-1.5 px-2 rounded-lg border-l-4 text-[11px] cursor-pointer hover:opacity-85 transition-opacity ${
                            isCurrentUser
                              ? 'bg-white/80 border-[#008069] text-stone-800'
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
                              <span>{formatChatTimestamp(msg.createdAt)}</span>
                              
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
              <form onSubmit={handleSendChatMessage} className="p-2 sm:p-2.5 px-2 sm:px-3 flex items-center gap-1.5 sm:gap-2 shrink-0 bg-white border-t border-stone-200/80 w-full max-w-full box-border">
                {/* Left Rounded Pill Container */}
                <div className="flex-1 min-w-0 bg-stone-100/90 focus-within:bg-white focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 rounded-full flex items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 shadow-2xs border border-stone-200 transition-all">
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
                    className="flex-1 min-w-0 px-1.5 sm:px-2 py-1 text-xs sm:text-sm outline-none bg-transparent text-stone-900 placeholder:text-stone-400"
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

                {/* Right Circular Send Button (Always Send, Voice Recorder Removed) */}
                <button
                  type="submit"
                  disabled={(!chatInput.trim() && !chatImageAttachment) || isSendingChat}
                  className={`w-9 h-9 sm:w-10 sm:h-10 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center ${
                    (!chatInput.trim() && !chatImageAttachment) || isSendingChat ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                  title="Send message"
                >
                  <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-0.5" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ==================== 2. CONCISE POST FEED ==================== */}
        {activeMode === 'posts' && (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pb-8 scrollbar-thin animate-fade-in pr-0.5">
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
                  (currentUser?.id && (post.userId || post.authorId) && (currentUser.id === post.userId || currentUser.id === post.authorId)) ||
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

                    {/* 9:16 Aspect Ratio Photo Container with Multi-Photo Carousel */}
                    {(() => {
                      const allImages = (post.images && post.images.length > 0) ? post.images : [post.imageUrl];
                      const currentIdx = activePostImgIndex[post.id] || 0;
                      const activeImg = allImages[currentIdx] || post.imageUrl;

                      return (
                        <div 
                          className="relative w-full aspect-[9/16] max-h-[580px] bg-stone-950 overflow-hidden cursor-pointer select-none group flex items-center justify-center"
                          onDoubleClick={() => handleDoubleTapPost(post)}
                        >
                          <img
                            src={activeImg}
                            alt="Post visual"
                            style={{ filter: filterDef.style }}
                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                          />

                          {/* Multi-Photo Carousel Navigation */}
                          {allImages.length > 1 && (
                            <>
                              {/* 1 / N Badge */}
                              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10">
                                {currentIdx + 1}/{allImages.length}
                              </div>

                              {/* Previous Arrow */}
                              {currentIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    audioEngine.playSfx('click');
                                    setActivePostImgIndex(prev => ({
                                      ...prev,
                                      [post.id]: Math.max(0, currentIdx - 1)
                                    }));
                                  }}
                                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90 z-10"
                                  title="Previous photo"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                              )}

                              {/* Next Arrow */}
                              {currentIdx < allImages.length - 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    audioEngine.playSfx('click');
                                    setActivePostImgIndex(prev => ({
                                      ...prev,
                                      [post.id]: Math.min(allImages.length - 1, currentIdx + 1)
                                    }));
                                  }}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90 z-10"
                                  title="Next photo"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              )}

                              {/* Bottom Dot Indicators */}
                              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
                                {allImages.map((_, dotIdx) => (
                                  <span
                                    key={dotIdx}
                                    className={`transition-all rounded-full ${
                                      dotIdx === currentIdx
                                        ? 'w-2 h-2 bg-white ring-1 ring-black/50'
                                        : 'w-1.5 h-1.5 bg-white/50'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {heartBurstId === post.id && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-up z-20">
                              <Heart className="w-20 h-20 text-white fill-rose-500 drop-shadow-lg" />
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Post Action Bar: Likes, Comments, Reactions, Shares, Bookmark */}
                    <div className="px-3.5 pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* Heart / Like Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLikePost(post)}
                          className={`flex items-center gap-1 text-xs font-display font-black transition-transform active:scale-90 cursor-pointer ${
                            post.likedByCurrentUser ? 'text-rose-600' : 'text-stone-600 hover:text-rose-600'
                          }`}
                          title={post.likedByCurrentUser ? "Unlike post" : "Like post"}
                        >
                          <Heart className={`w-5 h-5 transition-colors ${post.likedByCurrentUser ? 'fill-rose-600 text-rose-600' : ''}`} />
                          <span className="font-mono text-xs">{post.likesCount}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="flex items-center gap-1 text-xs font-display font-bold text-stone-600 hover:text-purple-700 transition-transform active:scale-90 cursor-pointer"
                          title="View & add comments"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-mono text-xs">{post.comments?.length || 0}</span>
                        </button>

                        {/* Quick Reaction Picker Button */}
                        <button
                          type="button"
                          onClick={() => setActiveReactionPickerPostId(activeReactionPickerPostId === post.id ? null : post.id)}
                          className={`flex items-center gap-1 text-xs font-display font-bold p-1 rounded-lg transition-all cursor-pointer ${
                            activeReactionPickerPostId === post.id 
                              ? 'bg-amber-100 text-amber-800 scale-105 shadow-2xs' 
                              : 'text-stone-600 hover:text-amber-600'
                          }`}
                          title="Add an emoji reaction"
                        >
                          <Smile className="w-5 h-5" />
                        </button>

                        {/* Share Button with Live Share Count */}
                        <button
                          type="button"
                          onClick={() => handleSharePost(post)}
                          className="flex items-center gap-1 text-stone-600 hover:text-blue-600 transition-transform active:scale-90 cursor-pointer group/share"
                          title={`Share post (${post.sharesCount || 0} shares so far)`}
                        >
                          <Share2 className="w-5 h-5 group-hover/share:text-blue-600" />
                          <span className="font-mono text-xs font-bold text-stone-700 group-hover/share:text-blue-600">
                            {post.sharesCount || 0}
                          </span>
                        </button>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        type="button"
                        onClick={() => {
                          audioEngine.playSfx('pop');
                          batchWallService.toggleBookmarkInstagramPost(post.id);
                        }}
                        className={`transition-transform active:scale-90 cursor-pointer ${
                          post.saved ? 'text-amber-500' : 'text-stone-400 hover:text-stone-800'
                        }`}
                        title={post.saved ? "Remove bookmark" : "Save post"}
                      >
                        <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Floating Quick Reaction Emoji Bar */}
                    {activeReactionPickerPostId === post.id && (
                      <div className="mx-3.5 bg-white border border-stone-200/90 rounded-2xl p-1.5 px-2.5 shadow-md flex items-center gap-1.5 animate-scale-up z-20 overflow-x-auto scrollbar-none">
                        <span className="text-[10px] font-bold text-stone-400 mr-0.5">React:</span>
                        {['❤️', '🔥', '👏', '🌸', '😍', '😂', '🎉', '🧁'].map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => handleReactToPost(post.id, emoji)}
                            className="w-7 h-7 hover:scale-125 transition-transform flex items-center justify-center text-base cursor-pointer rounded-lg hover:bg-stone-50"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reactions Badges Row */}
                    {post.reactions && Object.keys(post.reactions).length > 0 && (
                      <div className="px-3.5 flex items-center gap-1.5 flex-wrap pt-0.5">
                        {Object.entries(post.reactions).map(([emoji, count]) => {
                          const users = post.reactedUsers?.[emoji] || [];
                          const myName = (currentUser?.name || profileNameInput || '').toLowerCase().trim();
                          const hasUserReacted = users.some(u => u.toLowerCase().trim() === myName);

                          return (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleReactToPost(post.id, emoji)}
                              className={`px-2 py-0.5 rounded-full text-xs font-bold border transition-all active:scale-95 flex items-center gap-1 cursor-pointer ${
                                hasUserReacted
                                  ? 'bg-rose-100 border-rose-300 text-rose-800 shadow-2xs font-black'
                                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                              }`}
                              title={`Reacted by: ${users.join(', ') || `${count} people`}`}
                            >
                              <span>{emoji}</span>
                              <span className="text-[11px] font-mono">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Unique Likers & Hearts Summary Line (Click to see who liked) */}
                    {(() => {
                      const uniqueMembers = post.likedByMembers || [];
                      const uniqueNames = (post.likedByUsers && post.likedByUsers.length > 0)
                        ? post.likedByUsers
                        : uniqueMembers.map(m => m.userName);
                      const totalUniques = Math.max(post.likesCount || 0, uniqueNames.length, uniqueMembers.length);

                      return (
                        <div className="px-3.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setShowLikedByModalPost(post)}
                            className="text-left text-xs font-display font-medium text-stone-700 hover:text-rose-600 cursor-pointer flex items-center gap-1.5 transition-colors group/likers"
                            title="Click to see all unique people who liked this post"
                          >
                            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover/likers:scale-110 transition-transform shrink-0" />
                            <span>
                              {totalUniques === 0 ? (
                                <span className="text-stone-400">Be the first to heart this</span>
                              ) : uniqueNames.length === 1 ? (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> <span className="text-stone-400 font-normal">({totalUniques} unique like)</span></span>
                              ) : uniqueNames.length === 2 ? (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> and <strong className="text-stone-900 font-bold">{uniqueNames[1]}</strong> <span className="text-stone-400 font-normal">({totalUniques} unique likes)</span></span>
                              ) : (
                                <span>Liked by <strong className="text-stone-900 font-bold">{uniqueNames[0]}</strong> and <strong className="text-stone-900 font-bold underline">{totalUniques - 1} other unique members</strong></span>
                              )}
                            </span>
                          </button>
                        </div>
                      );
                    })()}

                    {/* Caption & Hashtags */}
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

                    {/* Comments Section: Showing WHO commented with avatars, timestamps & like button */}
                    <div className="px-3.5 pb-3 space-y-2">
                      {post.comments && post.comments.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-[11px] font-display font-bold text-stone-500 hover:text-stone-800 cursor-pointer flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                          <span>{isExpanded ? 'Hide comments' : `View all ${post.comments.length} comment${post.comments.length > 1 ? 's' : ''}`}</span>
                        </button>
                      )}

                      {isExpanded && post.comments && (
                        <div className="space-y-2 pt-1 border-t border-stone-100">
                          {post.comments.map(c => {
                            const isQueen = c.isKritika || c.authorName.toLowerCase().includes('kritika');
                            const myName = currentUser?.name || profileNameInput || studentName || 'Student';
                            const hasLikedComment = c.likedByUsers?.includes(myName);

                            return (
                              <div key={c.id} className="flex items-start gap-2 bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                                {/* Commenter Avatar */}
                                <div
                                  onClick={() => {
                                    const cm = classmates.find(cl => cl.name.toLowerCase() === c.authorName.toLowerCase().replace(' 👑', ''));
                                    if (cm) setSelectedClassmateDetail(cm);
                                  }}
                                  className="w-7 h-7 rounded-full overflow-hidden border border-stone-200 shrink-0 cursor-pointer hover:scale-105 transition-transform mt-0.5"
                                  title={`View ${c.authorName}`}
                                >
                                  <img
                                    src={c.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                                    alt={c.authorName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Comment Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-display font-black text-xs text-stone-900">
                                        {c.authorName}
                                      </span>
                                      {isQueen && (
                                        <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs">
                                          👑 QUEEN
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-stone-400 shrink-0">
                                      {c.timestamp || (c.createdAt ? formatChatTimestamp(c.createdAt) : '')}
                                    </span>
                                  </div>

                                  <p className="text-xs text-stone-700 mt-0.5 leading-relaxed break-words font-sans">
                                    {c.text}
                                  </p>

                                  {/* Comment Actions: Heart Like */}
                                  <div className="flex items-center gap-2 mt-1">
                                    <button
                                      type="button"
                                      onClick={() => handleLikeComment(post.id, c.id)}
                                      className={`flex items-center gap-1 text-[10px] font-bold cursor-pointer transition-colors ${
                                        hasLikedComment ? 'text-rose-600' : 'text-stone-400 hover:text-rose-600'
                                      }`}
                                      title="Like this comment"
                                    >
                                      <Heart className={`w-3 h-3 ${hasLikedComment ? 'fill-rose-600' : ''}`} />
                                      <span>{(c.likesCount || 0) > 0 ? c.likesCount : 'Like'}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Comment Input with User Avatar */}
                      <div className="pt-1.5 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-300 shrink-0">
                          <img
                            src={currentUser?.avatarUrl || profileAvatarInput || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                            alt="You"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setPostCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder={`Add a comment as ${currentUser?.name || profileNameInput || 'Student'}...`}
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
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl text-xs font-display font-black uppercase cursor-pointer transition-all active:scale-95"
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
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pb-8 scrollbar-thin animate-fade-in pr-0.5">
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

                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                          <span>{post.moodEmoji}</span>
                          <span>{post.mood}</span>
                        </div>
                        {(() => {
                          const currentUserName = (currentUser?.name || profileNameInput || '').replace(' 👑', '').trim().toLowerCase();
                          const studentNameClean = (post.studentName || '').replace(' 👑', '').trim().toLowerCase();
                          const isBulletinAuthor = Boolean(
                            (currentUser?.id && post.userId && currentUser.id === post.userId) ||
                            (currentUser?.email && post.userEmail && currentUser.email.toLowerCase().trim() === post.userEmail.toLowerCase().trim()) ||
                            (currentUserName !== '' && currentUserName === studentNameClean)
                          );
                          const isKritika = currentUserName.includes('kritika') || (currentUser?.email || '').toLowerCase().includes('kritika');
                          const canDeleteBulletin = isBulletinAuthor || isKritika;

                          if (!canDeleteBulletin) return null;

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                setDeleteConfirmPost({
                                  id: post.id,
                                  type: 'bulletin',
                                  title: `Sticky note by ${post.studentName}`
                                });
                              }}
                              className="p-1 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Delete sticky note"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </button>
                          );
                        })()}
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-display font-black text-xs text-stone-700 uppercase">
                    1. Upload Photos (9:16 Ratio):
                  </label>
                  <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {newPostImages.length > 0 ? `${newPostImages.length} Photo${newPostImages.length > 1 ? 's' : ''} Selected` : '9:16 Portrait'}
                  </span>
                </div>

                <input
                  ref={photoFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoPostImageSelect}
                  className="hidden"
                />

                {newPostImages.length > 0 ? (
                  <div className="space-y-2.5">
                    {/* 9:16 Portrait Poster Preview Container */}
                    <div className="relative rounded-2xl overflow-hidden border border-stone-300 aspect-[9/16] max-h-72 sm:max-h-80 mx-auto bg-stone-950 shadow-sm flex items-center justify-center group">
                      <img
                        src={newPostImages[activeCreatePreviewIndex] || newPostImages[0]}
                        alt="Selected"
                        style={{ filter: FILTER_STYLES[newPostFilter]?.style }}
                        className="w-full h-full object-cover"
                      />

                      {/* 9:16 Ratio Badge */}
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        9:16 Ratio
                      </span>

                      {/* Multi-Photo Slide Counter */}
                      {newPostImages.length > 1 && (
                        <span className="absolute top-2 right-10 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {activeCreatePreviewIndex + 1}/{newPostImages.length}
                        </span>
                      )}

                      {/* Remove Current Photo Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setNewPostImages(prev => {
                            const next = prev.filter((_, idx) => idx !== activeCreatePreviewIndex);
                            if (activeCreatePreviewIndex >= next.length) {
                              setActiveCreatePreviewIndex(Math.max(0, next.length - 1));
                            }
                            if (next.length > 0) setNewPostImage(next[0]);
                            else setNewPostImage(null);
                            return next;
                          });
                        }}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-rose-600 text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                        title="Remove this photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Carousel Arrow Controls */}
                      {newPostImages.length > 1 && (
                        <>
                          {activeCreatePreviewIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => setActiveCreatePreviewIndex(i => Math.max(0, i - 1))}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer shadow-md"
                              title="Previous photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          )}
                          {activeCreatePreviewIndex < newPostImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => setActiveCreatePreviewIndex(i => Math.min(newPostImages.length - 1, i + 1))}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer shadow-md"
                              title="Next photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Thumbnail Strip with "+ Add More Photos" button */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                      {newPostImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveCreatePreviewIndex(idx)}
                          className={`relative w-12 h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-transform ${
                            idx === activeCreatePreviewIndex ? 'border-rose-600 scale-105 ring-2 ring-rose-200' : 'border-stone-300 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewPostImages(prev => {
                                const next = prev.filter((_, i) => i !== idx);
                                if (activeCreatePreviewIndex >= next.length) {
                                  setActiveCreatePreviewIndex(Math.max(0, next.length - 1));
                                }
                                if (next.length > 0) setNewPostImage(next[0]);
                                else setNewPostImage(null);
                                return next;
                              });
                            }}
                            className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-rose-600 text-white p-0.5 rounded-full"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}

                      {/* Add More Photos Button */}
                      <button
                        type="button"
                        onClick={() => photoFileInputRef.current?.click()}
                        className="w-12 h-16 rounded-lg border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 text-rose-600 flex flex-col items-center justify-center shrink-0 cursor-pointer transition-colors"
                        title="Add more photos to this poster"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[8px] font-bold mt-0.5">+Photo</span>
                      </button>
                    </div>
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
                        Tap to upload photos from device 📸
                      </p>
                      <p className="text-[10px] text-stone-500">
                        9:16 portrait ratio • Multiple photos supported in one poster!
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 block mb-1">Or pick comfort preset photos:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {PRESET_PHOTOS.slice(0, 3).map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setNewPostImages(prev => [...prev, preset.url]);
                              setNewPostImage(preset.url);
                              audioEngine.playSfx('pop');
                            }}
                            className="border border-stone-200 hover:border-rose-400 rounded-xl overflow-hidden cursor-pointer group relative aspect-[9/16] max-h-28"
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

              {newPostImages.length > 0 && (
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

        {/* MODAL: CONFIRM PERMANENT POST DELETION */}
        {deleteConfirmPost && (
          <BaseModal
            onClose={() => !isDeletingPost && setDeleteConfirmPost(null)}
            title="DELETE POST PERMANENTLY?"
            subtitle="This will completely remove the post for all batch members"
            icon={<Trash2 className="w-5 h-5 text-rose-600" />}
            maxWidth="max-w-sm"
          >
            <div className="space-y-4 text-left">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <span>⚠️ Permanent Deletion Notice:</span>
                </p>
                <p className="text-stone-600 leading-relaxed">
                  Once deleted, {deleteConfirmPost.title || 'this post'} will be completely removed from the feed and will <strong>no longer be visible to you or any other members</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isDeletingPost}
                  onClick={() => setDeleteConfirmPost(null)}
                  className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeletingPost}
                  onClick={handleConfirmDeletePost}
                  className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeletingPost ? 'Deleting...' : 'Delete for Everyone'}</span>
                </button>
              </div>
            </div>
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
                    const fbUser = authService.getFirebaseUser();
                    const senderId = fbUser?.uid || currentUser?.id;
                    if (!senderId) {
                      setShowGoogleModal(true);
                      return;
                    }
                    batchWallService.sendGroupChatMessage({
                      senderId,
                      senderName: currentUser?.name || fbUser?.displayName || profileNameInput || studentName || 'Batch 41 Student',
                      senderEmail: fbUser?.email || currentUser?.email || undefined,
                      avatarUrl: fbUser?.photoURL || currentUser?.avatarUrl || profileAvatarInput,
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
          const currentUserId = currentUser?.id || authService.getFirebaseUser()?.uid;
          const isAuthor = Boolean(
            currentUserId && deleteModalMsg.senderId && currentUserId === deleteModalMsg.senderId
          );

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
                  {/* Delete for Everyone: ONLY visible to message author by Firebase UID */}
                  {isAuthor && (
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

        {/* MODAL: POST LIKES & HEARTS (UNIQUE MEMBERS) */}
        {showLikedByModalPost && (
          <BaseModal
            onClose={() => setShowLikedByModalPost(null)}
            title="LIKES & HEARTS"
            subtitle="Unique batch members who liked this post"
            icon={<Heart className="w-5 h-5 fill-rose-500 text-rose-500" />}
            maxWidth="max-w-md"
          >
            {(() => {
              const post = showLikedByModalPost;
              // Collect unique members from post.likedByMembers and post.likedByUsers
              const membersMap = new Map<string, { id?: string; name: string; email?: string; avatarUrl?: string; likedAt?: number }>();

              (post.likedByMembers || []).forEach((m: LikedMember) => {
                const key = (m.userId || m.userName || '').toLowerCase().trim();
                if (key && !membersMap.has(key)) {
                  membersMap.set(key, {
                    id: m.userId,
                    name: m.userName,
                    email: m.userEmail,
                    avatarUrl: m.avatarUrl,
                    likedAt: m.likedAt
                  });
                }
              });

              (post.likedByUsers || []).forEach(name => {
                const key = name.toLowerCase().trim();
                if (key && !membersMap.has(key)) {
                  const match = classmates.find(cl => cl.name.toLowerCase().trim() === key || cl.name.toLowerCase().includes(key));
                  membersMap.set(key, {
                    name,
                    avatarUrl: match?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
                    likedAt: Date.now()
                  });
                }
              });

              const uniqueList = Array.from(membersMap.values());
              const totalUniques = Math.max(post.likesCount || 0, uniqueList.length);

              return (
                <div className="space-y-4 text-left">
                  {/* Total Unique Likes Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm shadow-xs">
                        ❤️
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs sm:text-sm text-stone-900">
                          {totalUniques} Unique {totalUniques === 1 ? 'Person' : 'People'} Liked
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          Each batch member counts once toward unique hearts
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-black bg-rose-500 text-white shadow-2xs">
                      {totalUniques} ❤️
                    </span>
                  </div>

                  {/* Likers List */}
                  <div className="space-y-2">
                    <h5 className="font-display font-black text-[11px] uppercase tracking-wider text-stone-500">
                      Who Liked ({uniqueList.length})
                    </h5>

                    {uniqueList.length === 0 ? (
                      <div className="p-6 text-center text-stone-400 text-xs italic bg-stone-50 rounded-2xl border border-stone-200">
                        No likes yet. Be the first to drop a heart!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                        {uniqueList.map((member, idx) => {
                          const isQueen = member.name.toLowerCase().includes('kritika');
                          const isMe = (currentUser?.name || profileNameInput || '').toLowerCase().trim() === member.name.toLowerCase().trim();

                          return (
                            <div
                              key={idx}
                              className="p-2.5 bg-white border border-stone-200/80 hover:border-rose-300 rounded-xl flex items-center justify-between transition-colors shadow-2xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-200 bg-stone-100 shrink-0">
                                  <img
                                    src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-display font-black text-xs text-stone-900 truncate">
                                      {member.name}
                                    </span>
                                    {isMe && (
                                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded-full">
                                        You
                                      </span>
                                    )}
                                    {isQueen && (
                                      <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-2xs">
                                        👑 QUEEN
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-stone-400 block truncate">
                                    {member.likedAt ? `Liked ${new Date(member.likedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}` : 'Liked post'}
                                  </span>
                                </div>
                              </div>

                              <span className="text-sm shrink-0">
                                ❤️
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowLikedByModalPost(null)}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer transition-colors"
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
    
        {/* ==================== DISCORD-STYLE VOICE ROOM STAGE MODAL ==================== */}
        {showVoiceRoomModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-[#1E1F22]/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
            onClick={() => setShowVoiceRoomModal(false)}
          >
            <div
              className="bg-[#313338] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92dvh] animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Discord Modal Header */}
              <div className="bg-[#2B2D31] p-3 px-4 sm:px-5 border-b border-[#1E1F22] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-sm sm:text-base text-white truncate">
                        🔊 Batch 41 Voice Room
                      </h3>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        LIVE STAGE
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      Discord-style voice channel • Speak anytime with classmates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowVoiceRoomModal(false)}
                    className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Minimize to Chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stage Visual Area: Only Joined Participants */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {voiceParticipants.length === 0 ? (
                  <div className="text-center py-10 px-4 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center text-3xl animate-pulse">
                      🔊
                    </div>
                    <h4 className="font-display font-black text-sm text-white">
                      No One in the Voice Room Yet
                    </h4>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                      Only classmates who explicitly join this room can hear and talk with each other. Tap <strong>Join Voice Room</strong> to jump in!
                    </p>
                    {!isVoiceRoomConnected && (
                      <button
                        type="button"
                        onClick={handleJoinVoiceRoom}
                        className="mt-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        Join Voice Room
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {voiceParticipants.map(participant => {
                      const isMe = currentUser?.id === participant.id || participant.id === authService.getFirebaseUser()?.uid;
                      const speaking = isMe ? userIsSpeaking : participant.isSpeaking;
                      const muted = isMe ? isVoiceMuted : participant.isMuted;

                      return (
                        <div
                          key={participant.id}
                          className={`bg-[#2B2D31] border rounded-2xl p-3 sm:p-4 text-center space-y-2 transition-all relative overflow-hidden ${
                            speaking
                              ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-gradient-to-b from-[#2B2D31] to-emerald-950/20'
                              : 'border-white/5'
                          }`}
                        >
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                            <img
                              src={participant.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                              alt={participant.name}
                              className={`w-full h-full rounded-full object-cover transition-all ${
                                speaking
                                  ? 'ring-4 ring-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.8)] scale-105'
                                  : 'border-2 border-white/10'
                              }`}
                            />
                            <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 border-[#2B2D31] ${
                              muted ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                            }`}>
                              {muted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                            </span>
                          </div>
                          <div>
                            <span className="font-display font-black text-xs sm:text-sm text-white block truncate">
                              {participant.name} {isMe ? '(You)' : ''}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                              speaking 
                                ? 'bg-emerald-500 text-white animate-pulse' 
                                : muted 
                                  ? 'bg-rose-500/20 text-rose-300' 
                                  : 'bg-white/10 text-stone-300'
                            }`}>
                              {speaking ? '🎙️ Speaking...' : muted ? 'Muted' : 'Mic Live'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Live Cheers Soundboard (Strictly heard ONLY by users who joined the room) */}
                <div className="bg-[#2B2D31] border border-white/5 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-[11px] uppercase tracking-wider text-stone-400 block text-left">
                      Live Soundboard Cheers:
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      🔊 Only heard by room members
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { emoji: '👏', label: 'Clap', sfx: 'fanfare' as const },
                      { emoji: '🎉', label: 'Cheer', sfx: 'fanfare' as const },
                      { emoji: '💖', label: 'Love', sfx: 'powerup' as const },
                      { emoji: '🔥', label: 'Fire', sfx: 'pop' as const }
                    ].map(snd => (
                      <button
                        key={snd.label}
                        type="button"
                        disabled={!isVoiceRoomConnected}
                        onClick={() => handleSendVoiceCheer(snd.emoji, snd.label, snd.sfx)}
                        className={`p-2 bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 rounded-xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                          !isVoiceRoomConnected ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                        title={!isVoiceRoomConnected ? 'Join room to cheer' : `Send ${snd.label}`}
                      >
                        <span className="text-lg">{snd.emoji}</span>
                        <span className="text-[10px] font-bold text-stone-300">{snd.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Discord Voice Controls */}
              <div className="bg-[#2B2D31] p-3 px-4 border-t border-[#1E1F22] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  {/* Mute Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRoomMute}
                    className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                      isVoiceMuted
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 shadow-sm'
                    }`}
                  >
                    {isVoiceMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isVoiceMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  {/* Deafen Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRoomDeafen}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                      isVoiceDeafened
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
                    }`}
                    title={isVoiceDeafened ? 'Undeafen' : 'Deafen'}
                  >
                    {isVoiceDeafened ? <VolumeX className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Minimize & Chat */}
                  <button
                    type="button"
                    onClick={() => setShowVoiceRoomModal(false)}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-display font-bold transition-all cursor-pointer"
                  >
                    Chat & Speak
                  </button>

                  {/* Disconnect Button */}
                  <button
                    type="button"
                    onClick={handleDisconnectVoiceRoom}
                    className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Disconnect from Voice Room"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
</div>
  );
};
