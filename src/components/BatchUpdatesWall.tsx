import React, { useState, useEffect, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService, type InstagramPost } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Plus, Sparkles, Send, X, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin, Camera, Paperclip, Smile,
  Bookmark, Share2, CheckCheck, Eye, Compass, Tag, Edit3, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';

interface BatchUpdatesWallProps {
  onNavigate: (screen: ScreenState) => void;
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

export const BatchUpdatesWall: React.FC<BatchUpdatesWallProps> = ({ onNavigate }) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Mode Switcher: 'chat' | 'posts' | 'bulletin'
  const [activeMode, setActiveMode] = useState<'chat' | 'posts' | 'bulletin'>('posts');

  // Modals & Popups
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showNewPhotoPostModal, setShowNewPhotoPostModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);

  // Profile Editor Form State
  const [profileNameInput, setProfileNameInput] = useState(currentUser?.name || player.nickname || 'Kritika Gupta 👑');
  const [profileAvatarInput, setProfileAvatarInput] = useState(currentUser?.avatarUrl || AVATAR_PRESETS[0].url);
  const [profileMoodInput, setProfileMoodInput] = useState(currentUser?.currentMood || 'Radiant Sunshine 🌸');
  const [profileMoodEmojiInput, setProfileMoodEmojiInput] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [profileStatusInput, setProfileStatusInput] = useState(currentUser?.statusNote || 'Savoring sweet memories ♡ ✨');
  const [profileBatchInput, setProfileBatchInput] = useState(currentUser?.batch || 'MLP41PT');
  const profileAvatarFileInputRef = useRef<HTMLInputElement | null>(null);

  // Group Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatImageAttachment, setChatImageAttachment] = useState<string | null>(null);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [showChatEmojiPicker, setShowChatEmojiPicker] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement | null>(null);

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
    }
  }, [activeMode]);

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

  const allBulletinPosts = batchWallService.getPosts();
  const chatMessages = batchWallService.getChatMessages();
  const photoPosts = batchWallService.getInstagramPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

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
    setShareToast('Profile updated & reflected in chat! ✨');
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

  // Send Chat Message
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
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

    await batchWallService.sendGroupChatMessage({
      senderId: currentUser?.id,
      senderName: name,
      senderEmail: email,
      avatarUrl: avatar,
      text: text || (chatImageAttachment ? '📷 Photo' : ''),
      imageUrl: chatImageAttachment || undefined
    });

    setChatInput('');
    setChatImageAttachment(null);
    setShowChatEmojiPicker(false);
    setIsSendingChat(false);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      <div className="max-w-xl mx-auto space-y-3.5">

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

        {/* 1. TOP HEADER WITH PROFILE BUTTON */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/70 pb-2.5">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="py-1.5 px-3 bg-white border border-stone-200 rounded-xl flex items-center gap-1.5 shadow-2xs text-xs font-display font-bold hover:bg-stone-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>HOME</span>
          </button>

          <div className="text-center min-w-0">
            <div className="flex items-center justify-center gap-1 text-[10px] font-display font-black uppercase text-rose-600 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>COMMUNITY LOUNGE • MLP41PT</span>
            </div>
            <h1 className="font-display text-base sm:text-lg font-black text-stone-900 truncate">
              Batch 41 Comfort Wall 🌸
            </h1>
          </div>

          {/* Profile & Setting Button */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowProfileModal(true);
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-rose-50/80 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-display font-black shadow-2xs transition-all cursor-pointer shrink-0 text-rose-800"
          >
            <div className="w-4.5 h-4.5 rounded-full overflow-hidden border border-rose-300 shrink-0">
              <img src={currentUser?.avatarUrl || profileAvatarInput} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="max-w-[70px] truncate hidden sm:inline">
              {(currentUser?.name || profileNameInput).split(' ')[0]}
            </span>
            <Edit3 className="w-3 h-3 text-rose-500" />
          </button>
        </div>

        {/* 2. UNIFIED COHESIVE TAB SWITCHER */}
        <div className="grid grid-cols-3 gap-1 bg-stone-200/70 p-1 rounded-2xl border border-stone-300/80">
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
              setActiveMode('chat');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-white text-rose-700 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessagesSquare className="w-3.5 h-3.5 text-purple-600" />
            <span className="truncate">Live Chat ({chatMessages.length})</span>
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

        {/* ==================== 1. CONCISE & POLISHED POST FEED ==================== */}
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
                {/* Create Story / Add Post Button */}
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

                {/* Classmate Stories */}
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

            {/* Photo Post Cards Stream */}
            <div className="space-y-3.5">
              {photoPosts.map(post => {
                const isExpanded = Boolean(expandedComments[post.id]);
                const commentText = postCommentText[post.id] || '';
                const filterDef = FILTER_STYLES[post.filter || 'none'] || FILTER_STYLES.none;

                return (
                  <div
                    key={post.id}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs space-y-2.5 transition-all hover:border-rose-300"
                  >
                    {/* Header */}
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

                      <span className="text-[10px] text-stone-400 font-medium">
                        {post.timestamp}
                      </span>
                    </div>

                    {/* Photo with double-tap heart */}
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

                      {/* Double Tap Heart Burst Animation */}
                      {heartBurstId === post.id && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-up">
                          <Heart className="w-20 h-20 text-white fill-rose-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
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

                    {/* Caption & Hashtag Badges */}
                    <div className="px-3.5 space-y-1">
                      <p className="text-xs text-stone-800 font-sans leading-relaxed">
                        <span className="font-display font-black mr-1.5 text-stone-900">
                          {post.authorName}
                        </span>
                        {post.caption}
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

                    {/* Comments Section */}
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

                      {/* Expanded Comments List */}
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

                      {/* Quick Comment Composer */}
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

        {/* ==================== 2. LIVE GROUP CHAT WITH PROFILE REFLECTION ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs flex flex-col h-[530px] animate-fade-in relative">
            
            {/* Person / Profile Active Status Bar Above Chat */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-b border-rose-200/70 p-2.5 px-3.5 flex items-center justify-between shrink-0 shadow-2xs">
              <div 
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowProfileModal(true);
                }}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-90 group"
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-400 bg-white shadow-2xs group-hover:scale-105 transition-transform">
                    <img src={currentUser?.avatarUrl || profileAvatarInput} alt="Your profile" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 text-xs bg-white rounded-full border border-stone-200 p-0.2 shadow-2xs">
                    {currentUser?.currentMoodEmoji || profileMoodEmojiInput}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-xs text-stone-900 truncate">
                      {currentUser?.name || profileNameInput}
                    </span>
                    <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-rose-200">
                      You
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 truncate font-handwritten font-bold">
                    "{currentUser?.statusNote || profileStatusInput}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowProfileModal(true);
                }}
                className="px-2.5 py-1 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-[11px] font-display font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin bg-stone-50/50">
              {chatMessages.map(msg => {
                const isCurrentUser = currentUser?.name 
                  ? msg.senderName.toLowerCase().includes(currentUser.name.toLowerCase())
                  : msg.senderName.toLowerCase().includes(profileNameInput.toLowerCase());
                const reactionsList = Object.entries(msg.reactions || {}).filter(([, count]) => count > 0);

                return (
                  <div
                    key={msg.id}
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                    className={`flex items-end gap-2 group ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isCurrentUser && (
                      <div className={`w-7 h-7 rounded-full overflow-hidden border shrink-0 mb-1 ${
                        msg.isKritika ? 'border-amber-400 ring-2 ring-pink-300' : 'border-stone-300'
                      }`}>
                        <img src={msg.avatarUrl} alt={msg.senderName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="relative max-w-[82%] sm:max-w-[72%] space-y-1">
                      <div
                        className={`p-2.5 sm:p-3 rounded-2xl shadow-2xs text-xs sm:text-sm leading-relaxed relative ${
                          isCurrentUser
                            ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-xs'
                            : msg.isKritika
                              ? 'bg-gradient-to-br from-pink-50 via-white to-amber-50 text-stone-900 rounded-bl-xs border border-pink-300 ring-1 ring-pink-200'
                              : 'bg-white text-stone-900 rounded-bl-xs border border-stone-200'
                        }`}
                      >
                        {!isCurrentUser && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-display font-black text-[11px] text-purple-900">
                              {msg.senderName}
                            </span>
                            {msg.isKritika && (
                              <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                                👑 QUEEN
                              </span>
                            )}
                          </div>
                        )}

                        {/* Image Attachment */}
                        {msg.imageUrl && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-black/5 relative group/img cursor-pointer">
                            <img
                              src={msg.imageUrl}
                              alt="Attached photo"
                              onClick={() => setLightboxImage({ url: msg.imageUrl!, caption: msg.text })}
                              className="w-full max-h-56 object-cover hover:scale-102 transition-transform duration-200"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}

                        {msg.text && (
                          <p className="whitespace-pre-wrap font-sans">
                            {msg.text}
                          </p>
                        )}

                        <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] font-medium ${isCurrentUser ? 'text-rose-100' : 'text-stone-400'}`}>
                          <span>{msg.timestamp}</span>
                          {isCurrentUser && (
                            <CheckCheck className="w-3.5 h-3.5 text-white/90" />
                          )}
                        </div>
                      </div>

                      {/* Emoji Reactions */}
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

                      {/* Hover Emoji Reaction Bar */}
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
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

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
                    className="w-7 h-7 rounded-xl hover:bg-rose-50 flex items-center justify-center text-sm transition-transform active:scale-90 cursor-pointer shrink-0"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChatMessage} className="bg-white p-2 px-3 border-t border-stone-200 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowChatEmojiPicker(!showChatEmojiPicker)}
                className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Smile className="w-5 h-5" />
              </button>

              <input
                ref={chatFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChatImageSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => chatFileInputRef.current?.click()}
                className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  (currentUser?.name || profileNameInput).toLowerCase().includes('kritika')
                    ? "Message Batch 41 as Kritika 👑..."
                    : "Type a live message..."
                }
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />

              <button
                type="submit"
                disabled={isSendingChat || (!chatInput.trim() && !chatImageAttachment)}
                className="p-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-2xs cursor-pointer shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ==================== 3. BULLETIN CORKBOARD ==================== */}
        {activeMode === 'bulletin' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Header / Pin Button */}
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

            {/* Sticky Notes */}
            <div className="space-y-3">
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

                    {/* Emoji Reaction Tray */}
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

                    {/* Threaded Replies */}
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

        {/* MODAL: PROFILE SETTINGS & AVATAR EDITOR */}
        {showProfileModal && (
          <BaseModal
            onClose={() => setShowProfileModal(false)}
            title="YOUR CHAT & SOCIAL PROFILE"
            subtitle="Customize how your name and avatar appear in chat and posts"
            icon={<UserCheck className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              {/* Profile Avatar Selection */}
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

                {/* Preset Avatars */}
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

              {/* Display Name */}
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  2. Display Name:
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

              {/* Status Note / Bio */}
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

              {/* Mood Emoji & Label */}
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

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile & Reflect in Chat</span>
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
              {/* Photo Upload or Preset Selection */}
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

                    {/* Quick Preset Photos */}
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

              {/* Photo Filter Selection */}
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

              {/* Location Tag */}
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

              {/* Caption */}
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

              {/* Tag Selector with Select / Unselect and Custom Tag Input */}
              <div className="space-y-1.5">
                <label className="font-display font-black text-xs text-stone-700 uppercase flex items-center justify-between">
                  <span>Hashtags / Tags:</span>
                  <span className="text-[10px] text-stone-400 font-normal">Tap tag to select/unselect</span>
                </label>

                {/* Selected Tags Display */}
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

                {/* Suggested Tags to Toggle */}
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

                {/* Custom Tag Input */}
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

              {/* Submit Post Button */}
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

              {/* Quick Emojis Toolbar for Bulletin */}
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

              <button
                onClick={() => {
                  audioEngine.playSfx('fanfare');
                  confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
                  batchWallService.sendGroupChatMessage({
                    senderId: currentUser?.id,
                    senderName: currentUser?.name || profileNameInput || studentName || 'Batch 41 Student',
                    senderEmail: currentUser?.email,
                    avatarUrl: currentUser?.avatarUrl || profileAvatarInput,
                    text: `Sending a big warm cheer to ${selectedClassmateDetail.name}! Keep glowing! ✨💖`
                  });
                  setSelectedClassmateDetail(null);
                  setActiveMode('chat');
                }}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Send Cheer in Live Chat 💬✨
              </button>
            </div>
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
