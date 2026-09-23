import React, { useState, useEffect, useRef } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Plus, Sparkles, Send, X, CheckCircle2, UserCheck, Heart, 
  MessageCircle, MessagesSquare, Pin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BaseModal } from './BaseModal';
import { GoogleSignInModal } from './GoogleSignInModal';

interface BatchUpdatesWallProps {
  onNavigate: (screen: ScreenState) => void;
}

export const BatchUpdatesWall: React.FC<BatchUpdatesWallProps> = ({ onNavigate }) => {
  const [, setTick] = useState(0);
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  // Mode Switcher: 'chat' (Live Group Chat) vs 'bulletin' (Async Corkboard)
  const [activeMode, setActiveMode] = useState<'chat' | 'bulletin'>('chat');

  // Modals
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);

  // Group Chat State
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Bulletin Corkboard Filters
  const [feedScope] = useState<'all' | 'kritika' | 'mine' | 'search'>('all');
  const [searchQuery] = useState('');
  const [selectedMoodFilter] = useState('All');

  // Bulletin Threaded Replies State
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [isSendingReply, setIsSendingReply] = useState<Record<string, boolean>>({});

  // New Post Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Student');
  const [selectedPose] = useState(player.activeSticker || 'brighter_ideas');
  const [selectedMood, setSelectedMood] = useState(currentUser?.currentMood || 'Radiant Sunshine');
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState(currentUser?.currentMoodEmoji || '🌸');
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setReactingPostId] = useState<string | null>(null);


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
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

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
      text
    });

    setChatInput('');
    setIsSendingChat(false);
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCreatePost = (e: React.FormEvent) => {
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
      imageUrl: imagePreview || undefined,
    });

    if (isAuthenticated) {
      authService.updateDailyMood(selectedMood, selectedMoodEmoji, postText.trim().slice(0, 80));
    }

    setPostText('');
    setImagePreview(null);
    setShowNewPostModal(false);
  };

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
    setReactingPostId(null);
  };

  // Filtered Bulletin Posts
  const filteredPosts = allPosts.filter(post => {
    if (feedScope === 'mine') {
      if (currentUser?.id) {
        if (post.userId && post.userId !== currentUser.id) return false;
        if (!post.userId && post.studentName.toLowerCase() !== currentUser.name.toLowerCase()) return false;
      }
    } else if (feedScope === 'kritika') {
      const isFromKritika = post.studentName.toLowerCase().includes('kritika') || post.studentName.toLowerCase().includes('marisol');
      const hasKritikaReply = post.replies?.some(r => r.isKritika);
      if (!isFromKritika && !hasKritikaReply) return false;
    }

    if (selectedMoodFilter !== 'All' && post.mood !== selectedMoodFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.studentName.toLowerCase().includes(q) ||
      post.text.toLowerCase().includes(q) ||
      post.mood.toLowerCase().includes(q) ||
      post.replies?.some(r => r.text.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-28 text-stone-900">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Sync Toast Notification */}
        {network.syncToast && (
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-2xl shadow-sm flex items-center justify-between text-xs font-display font-black animate-scale-up">
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

        {/* 1. TOP HEADER */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="py-1.5 px-3 bg-white border border-stone-200 rounded-xl flex items-center gap-1.5 shadow-xs text-xs font-display font-bold hover:bg-stone-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>HOME</span>
          </button>

          <div className="text-center min-w-0">
            <div className="flex items-center justify-center gap-1 text-[11px] font-display font-black uppercase text-purple-700 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>COMMUNITY LOUNGE</span>
            </div>
            <h1 className="font-display text-lg sm:text-2xl font-black text-stone-900 truncate">
              Batch 41 Hub & Chat 💬
            </h1>
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowGoogleModal(true);
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 px-3 py-1.5 rounded-2xl text-xs font-display font-black shadow-xs transition-all cursor-pointer shrink-0"
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

        {/* 2. PRIMARY MODE SWITCHER: LIVE GROUP CHAT vs ASYNC BULLETIN BOARD */}
        <div className="grid grid-cols-2 gap-2 bg-stone-200/70 p-1 rounded-2xl border border-stone-300">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('chat');
            }}
            className={`py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-white text-stone-900 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessagesSquare className="w-4 h-4 text-purple-600" />
            <span>Live Group Chat ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setActiveMode('bulletin');
            }}
            className={`py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'bulletin'
                ? 'bg-white text-stone-900 shadow-xs scale-101'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Pin className="w-4 h-4 text-rose-500" />
            <span>Bulletin Corkboard ({allPosts.length})</span>
          </button>
        </div>

        {/* ==================== VIEW A: LIVE GROUP CHAT ROOM ==================== */}
        {activeMode === 'chat' && (
          <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4 animate-fade-in flex flex-col h-[520px]">
            {/* Group Chat Room Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                  💬
                </div>
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm text-stone-900">
                    Batch 41 & Comfort Room
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time Chat Active</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 font-handwritten font-bold">
                <span>👑 Kritika & Batch Mates</span>
              </div>
            </div>

            {/* Chat Stream Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
              {chatMessages.map(msg => {
                const isCurrentUser = currentUser?.name && msg.senderName.toLowerCase().includes(currentUser.name.toLowerCase());
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full overflow-hidden border shrink-0 ${
                      msg.isKritika ? 'border-pink-500 ring-2 ring-pink-200' : 'border-stone-300'
                    }`}>
                      <img src={msg.avatarUrl} alt={msg.senderName} className="w-full h-full object-cover" />
                    </div>

                    <div className={`max-w-[78%] space-y-1 ${isCurrentUser ? 'items-end text-right' : ''}`}>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-display font-black text-[11px] text-stone-800">
                          {msg.senderName}
                        </span>
                        {msg.isKritika && (
                          <span className="bg-rose-500 text-white font-display text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full">
                            👑 QUEEN
                          </span>
                        )}
                        <span className="text-[9px] text-stone-400 font-medium">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isCurrentUser
                          ? 'bg-rose-600 text-white rounded-tr-xs'
                          : msg.isKritika
                            ? 'bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200 text-stone-900 rounded-tl-xs shadow-xs font-medium'
                            : 'bg-stone-100 text-stone-900 border border-stone-200/80 rounded-tl-xs'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Emoji Reaction Pill Tray */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-stone-100">
              <span className="text-[10px] font-bold text-stone-400 shrink-0">Tap to send:</span>
              {['💖', '🌸', '👑', '🍕', '☕', '🔥', '👏', '✨'].map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('pop');
                    batchWallService.sendGroupChatMessage({
                      senderId: currentUser?.id,
                      senderName: currentUser?.name || studentName || 'Batch 41 Student',
                      senderEmail: currentUser?.email,
                      avatarUrl: currentUser?.avatarUrl,
                      text: emoji
                    });
                  }}
                  className="w-7 h-7 rounded-xl bg-stone-50 hover:bg-pink-100 border border-stone-200 flex items-center justify-center text-sm transition-transform active:scale-90 cursor-pointer shrink-0"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Group Chat Composer Form */}
            <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  currentUser?.name?.toLowerCase().includes('kritika')
                    ? "Message Batch 41 as Kritika 👑..."
                    : "Type a live message to Batch 41..."
                }
                className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm outline-none focus:border-purple-500 focus:bg-white transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSendingChat || !chatInput.trim()}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* ==================== VIEW B: ASYNC BULLETIN BOARD ==================== */}
        {activeMode === 'bulletin' && (
          <div className="space-y-4 animate-fade-in">
            {/* Classmate Story Mood Rings */}
            <div className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>🌟</span>
                  <span>Classmate Moods ({classmates.length} Active)</span>
                </span>
                <span className="font-handwritten text-xs text-purple-700 font-bold hidden sm:inline">
                  Tap friend to send warm cheer ♡
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
                <div
                  onClick={() => setShowGoogleModal(true)}
                  className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                >
                  <div className="relative w-11 h-11 rounded-full border-2 border-dashed border-purple-500 bg-purple-50 flex items-center justify-center text-purple-700 group-hover:scale-105 transition-transform shadow-xs">
                    <Plus className="w-4 h-4" />
                    <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                      {currentUser?.currentMoodEmoji || '🌸'}
                    </span>
                  </div>
                  <span className="font-display font-bold text-[10px] text-purple-900 truncate max-w-[56px] text-center">
                    Your Mood
                  </span>
                </div>

                {classmates.map(cm => (
                  <div
                    key={cm.id}
                    onClick={() => setSelectedClassmateDetail(cm)}
                    className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                  >
                    <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 group-hover:scale-105 transition-transform shadow-xs">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                        <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-stone-200 p-0.5 shadow-2xs">
                        {cm.currentMoodEmoji || '✨'}
                      </span>
                    </div>
                    <span className="font-display font-bold text-[10px] text-stone-800 truncate max-w-[56px] text-center">
                      {cm.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Post Action Dock */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 rounded-2xl p-3 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl border border-stone-300 overflow-hidden bg-white shadow-2xs shrink-0 flex items-center justify-center">
                  <Pin className="w-4 h-4 text-rose-500" />
                </div>
                <p className="font-handwritten text-xs sm:text-sm text-purple-950 font-bold truncate">
                  {currentUser?.name ? `Pin a bulletin note as ${currentUser.name}...` : 'Pin a note on the corkboard...'}
                </p>
              </div>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  setShowNewPostModal(true);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>PIN NOTE</span>
              </button>
            </div>

            {/* Bulletin Posts List */}
            {filteredPosts.length === 0 ? (
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
                {filteredPosts.map(post => {
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
                          ? 'border-pink-300 bg-gradient-to-b from-pink-50/20 via-white to-white'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      {/* Decorative Pin */}
                      <div className="absolute -top-2.5 right-6 text-sm select-none pointer-events-none">
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

                        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                          <span>{post.moodEmoji}</span>
                          <span className="hidden sm:inline">{post.mood}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                        {post.text}
                      </p>

                      {/* Action Bar */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          {reactionEntries.map(([alias, count]) => {
                            const st = STICKERS.find(s => s.alias === alias) || STICKERS[0];
                            return (
                              <button
                                key={alias}
                                onClick={() => handleAddReaction(post.id, alias)}
                                className="inline-flex items-center gap-1 bg-stone-100 hover:bg-pink-100 border border-stone-200 px-2 py-0.5 rounded-full text-xs font-bold text-stone-700 transition-transform active:scale-90 cursor-pointer"
                              >
                                <span>{st.badgeEmoji}</span>
                                <span>{count}</span>
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-xs font-display font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{repliesCount > 0 ? `${repliesCount} Replies` : 'Reply'}</span>
                        </button>
                      </div>

                      {/* Threaded Replies Drawer */}
                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-stone-100 space-y-2 bg-stone-50/80 p-3 rounded-2xl">
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
                              placeholder="Reply at your own time..."
                              className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs outline-none"
                              required
                            />
                            <button
                              type="submit"
                              disabled={sending || !replyText.trim()}
                              className="px-3 py-1.5 bg-purple-700 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
                            >
                              Send
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

        {/* Modal: New Post Composer */}
        {showNewPostModal && (
          <BaseModal
            onClose={() => setShowNewPostModal(false)}
            title="PIN A NOTE TO BULLETIN"
            subtitle="Share memories, appreciation & comfort with Batch 41"
            icon={<Pin className="w-5 h-5 text-rose-500" />}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePost} className="space-y-3.5 text-left">
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

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Pin to Bulletin Board ✨
              </button>
            </form>
          </BaseModal>
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
                }}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-display font-black uppercase shadow-xs transition-colors cursor-pointer"
              >
                Send Cheer in Group Chat 💬✨
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

