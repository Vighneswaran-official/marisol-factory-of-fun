import React, { useState, useEffect, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService, type InstagramPost } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Plus, Sparkles, Send, X, CheckCircle2, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin, Camera, Paperclip, Smile,
  Bookmark, Share2, CheckCheck, Eye, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';

interface BatchUpdatesWallProps {
  onNavigate: (screen: ScreenState) => void;
}

// Compress image on client side using HTML5 Canvas to keep Firestore & Storage ultra-fast
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
  none: { label: 'Normal', style: '', icon: '✨' },
  warm: { label: 'Warm Glow', style: 'sepia(25%) saturate(140%) brightness(105%)', icon: '🌅' },
  golden: { label: 'Golden Hour', style: 'contrast(110%) brightness(110%) sepia(35%) saturate(150%)', icon: '✨' },
  pink: { label: 'Pastel Rose', style: 'hue-rotate(330deg) saturate(130%) brightness(108%)', icon: '🌸' },
  vintage: { label: 'Vintage Retro', style: 'sepia(50%) contrast(90%) brightness(95%)', icon: '🎞️' },
  bw: { label: 'Noir B&W', style: 'grayscale(100%) contrast(120%)', icon: '🖤' },
};

const COMMON_EMOJIS = ['💖', '🌸', '👑', '✨', '🍕', '☕', '🔥', '👏', '🎉', '🥳', '🌈', '🌻', '💌', '🥰', '🤗', '⭐'];

export const BatchUpdatesWall: React.FC<BatchUpdatesWallProps> = ({ onNavigate }) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Mode Switcher: 'chat' (WhatsApp Chat) vs 'instagram' (Insta Feed) vs 'bulletin' (Corkboard)
  const [activeMode, setActiveMode] = useState<'chat' | 'instagram' | 'bulletin'>('chat');

  // Modals & Popups
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showNewInstaModal, setShowNewInstaModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);

  // Group Chat State (WhatsApp Style)
  const [chatInput, setChatInput] = useState('');
  const [chatImageAttachment, setChatImageAttachment] = useState<string | null>(null);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [showChatEmojiPicker, setShowChatEmojiPicker] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement | null>(null);

  // Instagram Feed State
  const [instaCommentText, setInstaCommentText] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [heartBurstId, setHeartBurstId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // New Instagram Post Form State
  const [instaImage, setInstaImage] = useState<string | null>(null);
  const [instaCaption, setInstaCaption] = useState('');
  const [instaLocation, setInstaLocation] = useState('Factory of Fun • Comfort Lounge 🌸');
  const [instaFilter, setInstaFilter] = useState('none');
  const [instaHashtags, setInstaHashtags] = useState<string[]>(['#Batch41', '#FactoryOfFun']);
  const [isPublishingInsta, setIsPublishingInsta] = useState(false);
  const instaFileInputRef = useRef<HTMLInputElement | null>(null);

  // Bulletin Corkboard State
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [isSendingReply, setIsSendingReply] = useState<Record<string, boolean>>({});

  // Bulletin New Note Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Student');
  const [selectedPose] = useState(player.activeSticker || 'brighter_ideas');
  const [selectedMood, setSelectedMood] = useState(currentUser?.currentMood || 'Radiant Sunshine');
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [postText, setPostText] = useState('');

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
      if (currentUser.currentMood) {
        setSelectedMood(currentUser.currentMood);
        setSelectedMoodEmoji(currentUser.currentMoodEmoji || '🌸');
      }
    }
  }, [currentUser]);

  const allPosts = batchWallService.getPosts();
  const chatMessages = batchWallService.getChatMessages();
  const instagramPosts = batchWallService.getInstagramPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // Handle WhatsApp Chat File Upload
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

  // Handle Instagram Post File Upload
  const handleInstaImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 1080, 0.8);
      setInstaImage(compressed);
      audioEngine.playSfx('pop');
    } catch (err) {
      console.warn('Image processing failed:', err);
    }
    if (instaFileInputRef.current) instaFileInputRef.current.value = '';
  };

  // Send WhatsApp Chat Message
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text && !chatImageAttachment) return;

    setIsSendingChat(true);
    audioEngine.playSfx('fanfare');

    const name = currentUser?.name || studentName || 'Batch 41 Student';
    const email = currentUser?.email;
    const isKritika = name.toLowerCase().includes('kritika') || 
                      (email && email.toLowerCase().includes('kritika')) ||
                      name.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.7 } });
    }

    await batchWallService.sendGroupChatMessage({
      senderId: currentUser?.id,
      senderName: name,
      senderEmail: email,
      avatarUrl: currentUser?.avatarUrl,
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

  // Double tap to like Instagram post
  const handleDoubleTapInsta = (post: InstagramPost) => {
    audioEngine.playSfx('fanfare');
    setHeartBurstId(post.id);
    batchWallService.likeInstagramPost(post.id, currentUser?.name);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setHeartBurstId(null), 1000);
  };

  // Submit Instagram Post
  const handleCreateInstaPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instaImage) {
      alert('Please select or upload a photo for your post!');
      return;
    }
    setIsPublishingInsta(true);
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });

    await batchWallService.addInstagramPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      authorName: currentUser?.name || studentName || 'Batch 41 Student',
      authorAvatarUrl: currentUser?.avatarUrl,
      location: instaLocation,
      imageUrl: instaImage,
      filter: instaFilter,
      caption: instaCaption.trim(),
      hashtags: instaHashtags
    });

    setInstaImage(null);
    setInstaCaption('');
    setInstaFilter('none');
    setIsPublishingInsta(false);
    setShowNewInstaModal(false);
  };

  // Submit Instagram Comment
  const handleSendInstaComment = async (postId: string) => {
    const text = (instaCommentText[postId] || '').trim();
    if (!text) return;

    audioEngine.playSfx('pop');
    await batchWallService.addInstagramComment(postId, {
      authorId: currentUser?.id,
      authorName: currentUser?.name || studentName || 'Batch 41 Classmate',
      authorEmail: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl,
      text
    });

    setInstaCommentText(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Submit Bulletin Corkboard Post
  const handleCreateBulletinPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    batchWallService.addPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      studentName: studentName.trim() || currentUser?.name || 'Student',
      avatarPose: selectedPose,
      mood: selectedMood,
      moodEmoji: selectedMoodEmoji,
      text: postText.trim(),
    });

    if (isAuthenticated) {
      authService.updateDailyMood(selectedMood, selectedMoodEmoji, postText.trim().slice(0, 80));
    }

    setPostText('');
    setShowNewPostModal(false);
  };

  // Submit Bulletin Reply
  const handleSendReply = async (postId: string) => {
    const text = (replyInputMap[postId] || '').trim();
    if (!text) return;

    setIsSendingReply(prev => ({ ...prev, [postId]: true }));
    audioEngine.playSfx('fanfare');

    const authorName = currentUser?.name || studentName || 'Batch Classmate';
    const authorEmail = currentUser?.email;
    const isKritika = authorName.toLowerCase().includes('kritika') || 
                      (authorEmail && authorEmail.toLowerCase().includes('kritika')) ||
                      authorName.toLowerCase().includes('marisol');

    if (isKritika) {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.65 } });
    }

    await batchWallService.addReply(postId, {
      authorId: currentUser?.id,
      authorName,
      authorEmail,
      avatarUrl: currentUser?.avatarUrl,
      text,
      isKritika
    });

    setIsSendingReply(prev => ({ ...prev, [postId]: false }));
    setReplyInputMap(prev => ({ ...prev, [postId]: '' }));
    setExpandedReplies(prev => ({ ...prev, [postId]: true }));
  };

  const handleAddReaction = (postId: string, stickerAlias: string) => {
    audioEngine.playSfx('pop');
    batchWallService.reactToPost(postId, stickerAlias);
  };

  const handleShareClick = (title: string) => {
    audioEngine.playSfx('pop');
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(`Link for "${title}" copied to clipboard! ✨`);
    setTimeout(() => setShareToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] p-2.5 sm:p-6 pb-28 text-stone-900">
      <div className="max-w-2xl mx-auto space-y-3.5">

        {/* Sync Toast Notification */}
        {network.syncToast && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-2.5 px-4 rounded-2xl shadow-sm flex items-center justify-between text-xs font-display font-black animate-scale-up">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
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
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* 1. TOP HEADER */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
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
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-display font-black uppercase text-emerald-700 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>COMMUNITY LOUNGE • MLP41PT</span>
            </div>
            <h1 className="font-display text-base sm:text-xl font-black text-stone-900 truncate">
              Batch 41 Hub & Lounge 💬
            </h1>
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowGoogleModal(true);
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 px-3 py-1.5 rounded-xl text-xs font-display font-black shadow-2xs transition-all cursor-pointer shrink-0"
          >
            {isAuthenticated && currentUser ? (
              <span className="text-emerald-700 flex items-center gap-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[70px] truncate hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
              </span>
            ) : (
              <span className="text-blue-700 flex items-center gap-1 text-xs">
                <UserCheck className="w-4 h-4" />
                <span>LOGIN</span>
              </span>
            )}
          </button>
        </div>

        {/* 2. THREE-WAY MODE SWITCHER (WhatsApp Chat | Insta Feed | Bulletin Board) */}
        <div className="grid grid-cols-3 gap-1.5 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300 shadow-2xs">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('chat');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-emerald-600 text-white shadow-xs scale-101'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <MessagesSquare className="w-3.5 h-3.5" />
            <span className="truncate">WhatsApp Chat ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('instagram');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'instagram'
                ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-xs scale-101'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="truncate">Insta Posts ({instagramPosts.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('bulletin');
            }}
            className={`py-2 px-2 rounded-xl font-display font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'bulletin'
                ? 'bg-rose-600 text-white shadow-xs scale-101'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span className="truncate">Bulletin ({allPosts.length})</span>
          </button>
        </div>

        {/* ==================== VIEW 1: WHATSAPP-STYLE LIVE CHAT ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-[#EFEAE2] border border-[#D1D7DB] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[540px] animate-fade-in relative">
            
            {/* WhatsApp Header Bar */}
            <div className="bg-[#005C4B] text-white p-3 px-4 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-300/40 overflow-hidden flex items-center justify-center text-lg font-bold">
                    💬
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#005C4B] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-black text-sm text-white">
                      Batch 41 Family Lounge
                    </h3>
                    <span className="bg-emerald-700/80 text-[10px] font-bold px-1.5 py-0.2 rounded-full text-emerald-100">
                      MLP41PT
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100/90 font-medium">
                    Kritika 👑, Priyanshu, Ananya, and {classmates.length} others online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGoogleModal(true)}
                  className="p-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-full text-white text-xs font-display font-bold transition-all cursor-pointer"
                  title="Switch / View Profile"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* WhatsApp Chat Wallpaper Stream Area */}
            <div 
              className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin"
              style={{
                backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                backgroundSize: '18px 18px'
              }}
            >
              {chatMessages.map(msg => {
                const isCurrentUser = currentUser?.name && msg.senderName.toLowerCase().includes(currentUser.name.toLowerCase());
                const reactionsList = Object.entries(msg.reactions || {}).filter(([, count]) => count > 0);

                return (
                  <div
                    key={msg.id}
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                    className={`flex items-end gap-2 group ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Left avatar if not current user */}
                    {!isCurrentUser && (
                      <div className={`w-7 h-7 rounded-full overflow-hidden border shrink-0 mb-1 ${
                        msg.isKritika ? 'border-amber-400 ring-2 ring-pink-300' : 'border-stone-300'
                      }`}>
                        <img src={msg.avatarUrl} alt={msg.senderName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* WhatsApp Speech Bubble */}
                    <div className="relative max-w-[82%] sm:max-w-[72%] space-y-1">
                      <div
                        className={`p-2.5 sm:p-3 rounded-2xl shadow-2xs text-xs sm:text-sm leading-relaxed relative ${
                          isCurrentUser
                            ? 'bg-[#D9FDD3] text-stone-900 rounded-br-xs border border-[#C1EBC0]'
                            : msg.isKritika
                              ? 'bg-gradient-to-br from-pink-50 via-white to-amber-50 text-stone-900 rounded-bl-xs border border-pink-300 ring-1 ring-pink-200'
                              : 'bg-white text-stone-900 rounded-bl-xs border border-stone-200'
                        }`}
                      >
                        {/* Sender Label for Incoming messages */}
                        {!isCurrentUser && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-display font-black text-[11px] text-emerald-800">
                              {msg.senderName}
                            </span>
                            {msg.isKritika && (
                              <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                                👑 QUEEN
                              </span>
                            )}
                          </div>
                        )}

                        {/* Image Attachment (if any) */}
                        {msg.imageUrl && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-black/5 relative group/img cursor-pointer">
                            <img
                              src={msg.imageUrl}
                              alt="Attached photo"
                              onClick={() => setLightboxImage({ url: msg.imageUrl!, caption: msg.text })}
                              className="w-full max-h-60 object-cover hover:scale-102 transition-transform duration-200"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}

                        {/* Text message */}
                        {msg.text && (
                          <p className="whitespace-pre-wrap font-sans text-stone-800">
                            {msg.text}
                          </p>
                        )}

                        {/* Bubble Timestamp and Double Checkmarks */}
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-stone-400 font-medium">
                          <span>{msg.timestamp}</span>
                          {isCurrentUser && (
                            <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                          )}
                        </div>
                      </div>

                      {/* Emoji Reaction Badges at bottom of Bubble */}
                      {reactionsList.length > 0 && (
                        <div className={`flex items-center gap-1 flex-wrap ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {reactionsList.map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                audioEngine.playSfx('pop');
                                batchWallService.reactToChatMessage(msg.id, emoji);
                              }}
                              className="bg-white/95 border border-stone-200 rounded-full px-1.5 py-0.2 text-[10px] font-bold shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            >
                              <span>{emoji}</span> <span>{count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Hover Action Bar for Quick WhatsApp Emoji Reactions */}
                      {hoveredMessageId === msg.id && (
                        <div className={`absolute -top-7 ${isCurrentUser ? 'right-0' : 'left-0'} bg-white/95 backdrop-blur-xs border border-stone-200 rounded-full px-2 py-0.5 shadow-md flex items-center gap-1 z-10 animate-fade-in`}>
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

            {/* Image Attachment Preview Bar before sending */}
            {chatImageAttachment && (
              <div className="bg-stone-100 p-2 px-3 border-t border-stone-300 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-300 shadow-2xs">
                    <img src={chatImageAttachment} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-display font-black text-xs text-stone-800 block">Photo ready to send 📸</span>
                    <span className="text-[10px] text-stone-500">Click send or add a caption below</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatImageAttachment(null)}
                  className="p-1.5 hover:bg-stone-200 rounded-full text-stone-600 cursor-pointer"
                  title="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick WhatsApp Emoji Tray Drawer */}
            {showChatEmojiPicker && (
              <div className="bg-white border-t border-stone-200 p-2.5 px-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-inner animate-fade-in">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">Emojis:</span>
                {COMMON_EMOJIS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setChatInput(prev => prev + emoji);
                      audioEngine.playSfx('pop');
                    }}
                    className="w-8 h-8 rounded-xl hover:bg-stone-100 flex items-center justify-center text-base transition-transform active:scale-90 cursor-pointer shrink-0"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp Chat Input Bar */}
            <form onSubmit={handleSendChatMessage} className="bg-[#F0F2F5] p-2.5 px-3 border-t border-[#D1D7DB] flex items-center gap-2 shrink-0">
              {/* Emoji Drawer Toggle */}
              <button
                type="button"
                onClick={() => setShowChatEmojiPicker(!showChatEmojiPicker)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-full transition-colors cursor-pointer shrink-0"
                title="Choose Emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Hidden File Input for Image Attachments */}
              <input
                ref={chatFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChatImageSelect}
                className="hidden"
              />

              {/* Paperclip / Image Attachment Button */}
              <button
                type="button"
                onClick={() => chatFileInputRef.current?.click()}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-full transition-colors cursor-pointer shrink-0"
                title="Attach Photo"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  currentUser?.name?.toLowerCase().includes('kritika')
                    ? "Message Batch 41 as Kritika 👑..."
                    : "Type a WhatsApp message..."
                }
                className="flex-1 px-4 py-2 bg-white border border-stone-300 rounded-2xl text-xs sm:text-sm outline-none focus:border-emerald-600 transition-colors shadow-2xs"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSendingChat || (!chatInput.trim() && !chatImageAttachment)}
                className="p-2.5 bg-[#00A884] hover:bg-[#008F6F] disabled:opacity-50 text-white rounded-full transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ==================== VIEW 2: INSTAGRAM-STYLE VISUAL FEED ==================== */}
        {activeMode === 'instagram' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top Story Mood Rings Bar */}
            <div className="bg-white border border-stone-200 rounded-3xl p-3.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-display font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>📸</span>
                  <span>Batch Stories & Mood Rings</span>
                </span>
                <span className="font-handwritten text-xs text-rose-600 font-bold hidden sm:inline">
                  Tap friend to view & cheer ♡
                </span>
              </div>

              <div className="flex items-center gap-3.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {/* Create Story / Add Post */}
                <div
                  onClick={() => setShowNewInstaModal(true)}
                  className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                >
                  <div className="relative w-13 h-13 rounded-full border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform shadow-xs">
                    <Plus className="w-5 h-5" />
                    <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      📸
                    </span>
                  </div>
                  <span className="font-display font-bold text-[10px] text-rose-900 truncate max-w-[56px] text-center">
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
                    <div className="relative w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-xs">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                        <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                        {cm.currentMoodEmoji || '✨'}
                      </span>
                    </div>
                    <span className="font-display font-bold text-[10px] text-stone-800 truncate max-w-[60px] text-center">
                      {cm.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick "Create New Post" Action Card */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-3xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-display font-black uppercase tracking-wider">
                  <Camera className="w-4 h-4" />
                  <span>Share a Visual Memory</span>
                </div>
                <p className="font-sans text-xs text-rose-100 font-medium">
                  Post food photos, celebration clicks, or comfort moments for Batch 41!
                </p>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewInstaModal(true);
                }}
                className="px-4 py-2 bg-white text-rose-600 hover:bg-rose-50 rounded-2xl text-xs font-display font-black uppercase flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>NEW POST</span>
              </button>
            </div>

            {/* Instagram Feed List */}
            <div className="space-y-4">
              {instagramPosts.map(post => {
                const isExpanded = Boolean(expandedComments[post.id]);
                const commentText = instaCommentText[post.id] || '';
                const filterDef = FILTER_STYLES[post.filter || 'none'] || FILTER_STYLES.none;

                return (
                  <div
                    key={post.id}
                    className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs space-y-2.5 transition-all hover:border-pink-300"
                  >
                    {/* Post Card Header */}
                    <div className="p-3.5 px-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-amber-400">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 leading-none">
                              {post.authorName}
                            </h3>
                            {post.isKritika && (
                              <span className="bg-rose-500 text-white font-display text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full">
                                👑 QUEEN
                              </span>
                            )}
                          </div>
                          {post.location && (
                            <span className="text-[10px] text-stone-500 font-medium block">
                              {post.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] text-stone-400 font-medium">
                        {post.timestamp}
                      </span>
                    </div>

                    {/* Post Image with Double-Tap Heart Animation */}
                    <div 
                      className="relative w-full aspect-square sm:aspect-4/3 bg-stone-950 overflow-hidden cursor-pointer select-none group"
                      onDoubleClick={() => handleDoubleTapInsta(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt="Post media"
                        style={{ filter: filterDef.style }}
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />

                      {/* Double Tap Heart Burst Animation */}
                      {heartBurstId === post.id && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-up">
                          <Heart className="w-24 h-24 text-white fill-rose-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    {/* Post Action Buttons Bar */}
                    <div className="px-4 pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                          onClick={() => {
                            audioEngine.playSfx('pop');
                            batchWallService.likeInstagramPost(post.id, currentUser?.name);
                          }}
                          className={`flex items-center gap-1 text-xs font-display font-black transition-transform active:scale-90 cursor-pointer ${
                            post.likedByCurrentUser ? 'text-rose-600' : 'text-stone-700 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.likedByCurrentUser ? 'fill-rose-600' : ''}`} />
                        </button>

                        {/* Comment Button */}
                        <button
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-stone-700 hover:text-purple-700 transition-transform active:scale-90 cursor-pointer"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>

                        {/* Share Button */}
                        <button
                          onClick={() => handleShareClick(post.caption.slice(0, 30))}
                          className="text-stone-700 hover:text-blue-600 transition-transform active:scale-90 cursor-pointer"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('pop');
                          batchWallService.toggleBookmarkInstagramPost(post.id);
                        }}
                        className={`transition-transform active:scale-90 cursor-pointer ${
                          post.saved ? 'text-amber-500' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Likes Count */}
                    <div className="px-4">
                      <span className="font-display font-black text-xs text-stone-900">
                        {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
                      </span>
                    </div>

                    {/* Caption & Hashtags */}
                    <div className="px-4 space-y-1">
                      <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">
                        <span className="font-display font-black mr-1.5 text-stone-900">
                          {post.authorName}
                        </span>
                        {post.caption}
                      </p>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          {post.hashtags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Comments Toggle & List */}
                    <div className="px-4 pb-3.5 space-y-2">
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

                      {/* Expanded Comments Drawer */}
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

                      {/* Comment Input with Quick Emoji Helpers */}
                      <div className="pt-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setInstaCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Add a comment..."
                          className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-rose-500 focus:bg-white transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendInstaComment(post.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          disabled={!commentText.trim()}
                          onClick={() => handleSendInstaComment(post.id)}
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

        {/* ==================== VIEW 3: BULLETIN CORKBOARD WITH RICH EMOJIS ==================== */}
        {activeMode === 'bulletin' && (
          <div className="space-y-4 animate-fade-in">
            {/* Action Bar: Pin a note */}
            <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 border border-amber-200 rounded-3xl p-3.5 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs shrink-0 flex items-center justify-center text-lg">
                  📌
                </div>
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm text-stone-900">
                    Corkboard Sticky Notes
                  </h3>
                  <p className="font-handwritten text-xs text-stone-600 font-bold truncate">
                    Leave appreciation notes, emojis & cheers!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPostModal(true);
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>PIN NOTE</span>
              </button>
            </div>

            {/* Bulletin Sticky Notes Grid */}
            {allPosts.length === 0 ? (
              <div className="bg-white border border-dashed border-stone-300 rounded-3xl p-8 text-center space-y-3 shadow-xs">
                <div className="text-3xl">📌✨</div>
                <h3 className="font-display font-black text-base text-stone-800">
                  No bulletin notes yet
                </h3>
                <p className="font-handwritten text-xs text-stone-500">
                  Be the first to pin a comfort note or photo for Kritika and Batch 41!
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {allPosts.map(post => {
                  const sticker = STICKERS.find(s => s.alias === post.avatarPose) || STICKERS[0];
                  const reactionEntries = Object.entries(post.reactions || {}).filter(([, count]) => count > 0);
                  const replies = post.replies || [];
                  const repliesCount = replies.length;
                  const hasKritikaReply = replies.some(r => r.isKritika);
                  const isExpanded = Boolean(expandedReplies[post.id]);
                  const replyText = replyInputMap[post.id] || '';
                  const sending = Boolean(isSendingReply[post.id]);

                  return (
                    <div
                      key={post.id}
                      className={`bg-white border rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition-all relative ${
                        hasKritikaReply
                          ? 'border-pink-300 bg-gradient-to-b from-pink-50/30 via-white to-white'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      {/* Decorative Pin */}
                      <div className="absolute -top-2.5 right-6 text-base select-none pointer-events-none">
                        📌
                      </div>

                      {/* Highlight Banner if Kritika replied */}
                      {hasKritikaReply && (
                        <div className="bg-gradient-to-r from-pink-100/90 via-rose-50 to-amber-50 border border-pink-300 rounded-2xl p-2 px-3 flex items-center justify-between text-xs animate-scale-up shadow-2xs">
                          <span className="font-display font-black text-rose-900 flex items-center gap-1.5 text-[11px] tracking-wide">
                            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
                            <span>KRITIKA REPLIED TO THIS NOTE 💌</span>
                          </span>
                          <button
                            onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                            className="text-[10px] font-handwritten font-bold text-rose-700 underline cursor-pointer"
                          >
                            {isExpanded ? 'Hide' : 'Read Reply ↓'}
                          </button>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-2xl border border-stone-200 overflow-hidden bg-purple-50 shadow-xs shrink-0">
                            <img src={sticker.avatarUrl} alt={post.studentName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 leading-none">
                                {post.studentName}
                              </h3>
                              <span className="bg-purple-100 text-purple-800 font-handwritten text-[10px] font-black px-1.5 py-0.2 rounded-full border border-purple-200">
                                {post.batch}
                              </span>
                            </div>
                            <span className="font-handwritten text-[10px] text-stone-400 font-bold">
                              {post.timestamp}
                            </span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                          <span>{post.moodEmoji}</span>
                          <span className="hidden sm:inline">{post.mood}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                        {post.text}
                      </p>

                      {/* Rich Emoji Reaction Bar */}
                      <div className="pt-2 border-t border-stone-100 space-y-2">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          <span className="text-[10px] font-bold text-stone-400 shrink-0">React:</span>
                          {['💖', '🌸', '👑', '✨', '🍕', '☕', '🎉', '🔥', '🥰'].map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(post.id, emoji)}
                              className="w-7 h-7 rounded-xl bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-xs transition-transform active:scale-90 cursor-pointer shrink-0"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>

                        {/* Reaction Counters & Reply Action */}
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
                            className="text-xs font-display font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{repliesCount > 0 ? `${repliesCount} Replies` : 'Reply'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Threaded Replies Drawer */}
                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-stone-100 space-y-2 bg-stone-50/90 p-3 rounded-2xl">
                          {replies.map(r => (
                            <div key={r.id} className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs space-y-0.5">
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
                              className="px-3.5 py-1.5 bg-purple-700 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
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
            )}
          </div>
        )}

        {/* Modal: New Instagram Post Composer */}
        {showNewInstaModal && (
          <BaseModal
            onClose={() => setShowNewInstaModal(false)}
            title="CREATE INSTA POST"
            subtitle="Share memories, photos & aesthetic vibes with Batch 41"
            icon={<Camera className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreateInstaPost} className="space-y-3.5 text-left">
              {/* Photo Picker */}
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Upload Photo / Visual:
                </label>
                <input
                  ref={instaFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInstaImageSelect}
                  className="hidden"
                />

                {instaImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-stone-300 aspect-4/3 bg-black">
                    <img
                      src={instaImage}
                      alt="Selected"
                      style={{ filter: FILTER_STYLES[instaFilter]?.style }}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setInstaImage(null)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => instaFileInputRef.current?.click()}
                    className="border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-2xl p-6 text-center bg-rose-50/50 hover:bg-rose-50 transition-colors cursor-pointer space-y-2"
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                      <Camera className="w-5 h-5" />
                    </div>
                    <p className="font-display font-bold text-xs text-rose-900">
                      Tap to upload photo from your device 📸
                    </p>
                    <p className="text-[10px] text-stone-500">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>

              {/* Photo Filter Selection */}
              {instaImage && (
                <div>
                  <label className="font-display font-black text-[11px] text-stone-700 uppercase block mb-1">
                    Choose Filter:
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {Object.entries(FILTER_STYLES).map(([key, def]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInstaFilter(key)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-display font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                          instaFilter === key
                            ? 'bg-rose-600 text-white shadow-xs'
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
                  Location Tag:
                </label>
                <input
                  type="text"
                  value={instaLocation}
                  onChange={(e) => setInstaLocation(e.target.value)}
                  placeholder="e.g. Factory of Fun • Comfort Lounge 🌸"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Caption:
                </label>
                <textarea
                  rows={2}
                  value={instaCaption}
                  onChange={(e) => setInstaCaption(e.target.value)}
                  placeholder="Write a sweet caption or memories with Batch 41..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none resize-none"
                  required
                />
              </div>

              {/* Quick Emojis to Caption */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-bold text-stone-400 shrink-0">Insert:</span>
                {COMMON_EMOJIS.slice(0, 8).map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setInstaCaption(prev => prev + ' ' + emoji)}
                    className="p-1 hover:bg-stone-100 rounded-lg text-sm cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quick Hashtags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {['#Batch41', '#KritikaQueen', '#ComfortVibes', '#MacaroniMagic', '#Memories'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!instaHashtags.includes(tag)) {
                        setInstaHashtags([...instaHashtags, tag]);
                      }
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer ${
                      instaHashtags.includes(tag)
                        ? 'bg-rose-100 text-rose-700 border border-rose-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isPublishingInsta || !instaImage}
                className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-95 disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Publish Instagram Post 📸✨
              </button>
            </form>
          </BaseModal>
        )}

        {/* Modal: New Bulletin Note Composer */}
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
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-display font-black text-xs text-stone-700 uppercase block mb-1">
                  Message / Note:
                </label>
                <textarea
                  rows={3}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Leave a heartfelt note, inside joke, or cheer for Kritika..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none resize-none"
                  required
                />
              </div>

              {/* Quick Emojis Toolbar for Bulletin */}
              <div>
                <span className="font-display font-black text-[10px] text-stone-500 uppercase block mb-1">
                  Add Emojis to Note:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COMMON_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setPostText(prev => prev + ' ' + emoji)}
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

        {/* Lightbox Modal for Zooming Images */}
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
                    senderName: currentUser?.name || studentName || 'Batch 41 Student',
                    senderEmail: currentUser?.email,
                    avatarUrl: currentUser?.avatarUrl,
                    text: `Sending a big warm cheer to ${selectedClassmateDetail.name}! Keep glowing! ✨💖`
                  });
                  setSelectedClassmateDetail(null);
                  setActiveMode('chat');
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Send Cheer in WhatsApp Chat 💬✨
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
