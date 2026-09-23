import React, { useState, useEffect } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Plus, Sparkles, Image as ImageIcon, 
  Send, X, Search, CheckCircle2, UserCheck, Heart, Trash2, 
  MessageCircle
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

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [selectedClassmateDetail, setSelectedClassmateDetail] = useState<StudentProfile | null>(null);

  // Tabs & Filters
  const [feedScope, setFeedScope] = useState<'all' | 'kritika' | 'mine' | 'search'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('All');

  // Bulletin Threaded Replies State
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [isSendingReply, setIsSendingReply] = useState<Record<string, boolean>>({});

  // New Post Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Student');
  const [selectedPose, setSelectedPose] = useState(player.activeSticker || 'brighter_ideas');
  const [selectedMood, setSelectedMood] = useState(currentUser?.currentMood || 'Radiant & Grateful');
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState(currentUser?.currentMoodEmoji || '💡');
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reaction picker target post ID
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);

  useEffect(() => {
    const unsubWall = batchWallService.subscribe(() => setTick(t => t + 1));
    const unsubAuth = authService.subscribe(() => setTick(t => t + 1));
    return () => { 
      unsubWall(); 
      unsubAuth();
    };
  }, []);

  // Sync default name when user profile changes
  useEffect(() => {
    if (currentUser?.name) {
      setStudentName(currentUser.name);
      if (currentUser.currentMood) {
        setSelectedMood(currentUser.currentMood);
        setSelectedMoodEmoji(currentUser.currentMoodEmoji || '💡');
      }
    }
  }, [currentUser]);

  const allPosts = batchWallService.getPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // Filtered posts based on active tab & filters
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

  const uniqueMoods = ['All', ...Array.from(new Set(allPosts.map(p => p.mood)))];
  const kritikaPostsCount = allPosts.filter(p => 
    p.studentName.toLowerCase().includes('kritika') || 
    p.studentName.toLowerCase().includes('marisol') ||
    p.replies?.some(r => r.isKritika)
  ).length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  const handleToggleReplies = (postId: string) => {
    audioEngine.playSfx('click');
    setExpandedReplies(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
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

  const handleSendCheerToClassmate = (classmate: StudentProfile) => {
    audioEngine.playSfx('pop');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    batchWallService.addPost({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      studentName: currentUser?.name || player.nickname || 'Batch Student',
      avatarPose: player.activeSticker || 'brighter_ideas',
      mood: 'Radiant & Grateful',
      moodEmoji: '💖',
      text: `Sending a big warm cheer to ${classmate.name}! Keep glowing! ✨`,
    });
    setSelectedClassmateDetail(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Sync Toast Notification */}
        {network.syncToast && (
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-2xl shadow-sketch flex items-center justify-between text-xs font-display font-black animate-scale-up">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-doodleGold animate-spin" />
              <span>{network.syncToast}</span>
            </span>
            <button
              onClick={() => batchWallService.clearSyncToast()}
              className="p-1 hover:bg-white/20 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. TOP HEADER & BACK NAVIGATION (Decluttered & Clean) */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-ink/10 pb-3">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn py-2 px-3 bg-white flex items-center gap-1.5 shadow-sketch hover:bg-paper-100 transition-all text-xs sm:text-sm font-display font-bold"
            title="Return to Home Screen"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          <div className="text-center min-w-0">
            <div className="flex items-center justify-center gap-1 text-[11px] font-display font-black uppercase text-purple-700 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>📌 ASYNC BULLETIN BOARD</span>
            </div>
            <h1 className="font-display text-lg sm:text-2xl font-black tracking-tight text-ink truncate">
              BATCH 41 BULLETIN BOARD 📌
            </h1>
          </div>

          {/* User Profile / Sign In Pill */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowGoogleModal(true);
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-purple-50 border-2 border-ink px-2.5 py-1.5 rounded-2xl text-xs font-display font-black shadow-sketch transition-all shrink-0 cursor-pointer"
            title="Account & Realtime Sync"
          >
            {isAuthenticated && currentUser ? (
              <span className="text-emerald-700 flex items-center gap-1.5 text-xs">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-ink/30 shrink-0">
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
                <span className="max-w-[75px] truncate hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
              </span>
            ) : (
              <span className="text-blue-700 flex items-center gap-1 text-xs">
                <UserCheck className="w-4 h-4" />
                <span>GOOGLE CONNECT</span>
              </span>
            )}
          </button>
        </div>

        {/* Cozy Bulletin Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-200 rounded-2xl p-2.5 sm:p-3 shadow-2xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl shrink-0">📌</span>
            <p className="font-handwritten text-xs sm:text-sm font-bold text-amber-950 leading-snug">
              Leave notes, questions & appreciation at your own pace — Kritika & classmates reply at their own time! 💌
            </p>
          </div>
          <span className="bg-amber-200/70 text-amber-900 font-display text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 hidden sm:inline">
            ASYNC REPLIES
          </span>
        </div>

        {/* 2. DECLUTTERED LIVE MOOD RADAR: INSTAGRAM/SLACK-STYLE STATUS STORY RINGS */}
        <div className="bg-white border-2 border-ink/20 rounded-2xl p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-display font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
              <span>🌟</span>
              <span>Classmate Moods ({classmates.length} Active)</span>
            </span>
            <span className="font-handwritten text-xs text-purple-700 font-bold hidden sm:inline">
              Tap any friend to send a warm cheer ♡
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {/* Current user quick mood changer */}
            <div
              onClick={() => setShowGoogleModal(true)}
              className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
              title="Update your daily mood and status note"
            >
              <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-purple-500 bg-purple-50 flex items-center justify-center text-purple-700 group-hover:scale-105 transition-transform shadow-xs">
                <Plus className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-ink/20 p-0.5 shadow-2xs">
                  {currentUser?.currentMoodEmoji || '💡'}
                </span>
              </div>
              <span className="font-display font-bold text-[10px] text-purple-900 truncate max-w-[56px] text-center">
                Your Mood
              </span>
            </div>

            {/* Real Classmate Status Story Rings */}
            {classmates.map(cm => (
              <div
                key={cm.id}
                onClick={() => setSelectedClassmateDetail(cm)}
                className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                title={`${cm.name}: "${cm.statusNote}" - Tap to cheer!`}
              >
                <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 group-hover:scale-105 transition-transform shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                    <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full border border-ink/20 p-0.5 shadow-2xs">
                    {cm.currentMoodEmoji || '✨'}
                  </span>
                </div>
                <span className="font-display font-bold text-[10px] text-ink truncate max-w-[56px] text-center">
                  {cm.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SEGMENTED TABS & SEARCH BAR (Bulletin Board Navigation) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 bg-paper-100 p-1 rounded-2xl border-2 border-ink shadow-inner overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setFeedScope('all');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-display font-black text-xs transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                feedScope === 'all'
                  ? 'bg-purple-700 text-white shadow-sketch-xs scale-102'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <span>📌 All Notes ({allPosts.length})</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setFeedScope('kritika');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-display font-black text-xs transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                feedScope === 'kritika'
                  ? 'bg-pink-600 text-white shadow-sketch-xs scale-102'
                  : 'text-ink-light hover:text-pink-600'
              }`}
            >
              <span>💌 Kritika ({kritikaPostsCount})</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setFeedScope('mine');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-display font-black text-xs transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                feedScope === 'mine'
                  ? 'bg-purple-700 text-white shadow-sketch-xs scale-102'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              <span>👑 My Notes</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setFeedScope(feedScope === 'search' ? 'all' : 'search');
              }}
              className={`py-1.5 px-2.5 rounded-xl font-display font-black text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                feedScope === 'search' || searchQuery
                  ? 'bg-ink text-white shadow-sketch-xs'
                  : 'text-ink-light hover:text-ink'
              }`}
              title="Search and filter notes"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Collapsible / Active Search & Mood Filter Bar */}
          {(feedScope === 'search' || searchQuery) && (
            <div className="bg-white border-2 border-ink rounded-2xl p-3 shadow-sketch space-y-2.5 animate-scale-up">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-ink-light pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student name, mood, or memory..."
                  className="w-full pl-9 pr-8 py-2 bg-paper-50 border border-ink/40 rounded-xl text-xs font-bold outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-ink-light hover:text-ink rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {uniqueMoods.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {uniqueMoods.map(mood => (
                    <button
                      key={mood}
                      onClick={() => {
                        audioEngine.playSfx('click');
                        setSelectedMoodFilter(mood);
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold whitespace-nowrap transition-all ${
                        selectedMoodFilter === mood
                          ? 'bg-purple-700 text-white shadow-sketch-xs'
                          : 'bg-paper-100 text-ink-light hover:bg-paper-200'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. QUICK POST COMPOSER DOCK (Clean, modern social feed style) */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-3 shadow-sketch-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl border border-ink overflow-hidden bg-white shadow-2xs shrink-0 flex items-center justify-center">
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-base">✍️</span>
              )}
            </div>
            <p className="font-handwritten text-xs sm:text-sm text-purple-950 font-bold truncate">
              {currentUser?.name ? `Share an update as ${currentUser.name}...` : 'Share a note with Batch 41...'}
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowNewPostModal(true);
            }}
            className="sketch-btn-primary px-3 py-1.5 text-xs font-black uppercase flex items-center gap-1 shadow-sketch-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>POST NOTE</span>
          </button>
        </div>

        {/* 5. POSTS FEED */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-8 text-center space-y-3 shadow-sketch">
            <div className="text-4xl animate-bounce-gentle">💌✨</div>
            <h3 className="font-display font-black text-lg text-ink">
              {feedScope === 'mine' ? 'No personal posts yet' : 'No posts found'}
            </h3>
            <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
              {feedScope === 'mine'
                ? "Tap '+ Post Note' above to publish your first daily update or photo!"
                : "Try a different search keyword or share a new note with Batch 41!"}
            </p>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="sketch-btn-primary px-4 py-2 text-xs font-black uppercase shadow-sketch"
            >
              Post Note Now
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredPosts.map(post => {
              const sticker = STICKERS.find(s => s.alias === post.avatarPose) || STICKERS[0];
              const reactionEntries = Object.entries(post.reactions || {}).filter(([, count]) => count > 0);
              const isAuthor = Boolean(
                (currentUser?.id && post.userId === currentUser.id) ||
                (currentUser?.name && post.studentName.toLowerCase() === currentUser.name.toLowerCase())
              );

              const replies = post.replies || [];
              const repliesCount = replies.length;
              const hasKritikaReply = replies.some(r => r.isKritika);
              const isExpanded = Boolean(expandedReplies[post.id]);
              const replyText = replyInputMap[post.id] || '';
              const sending = Boolean(isSendingReply[post.id]);

              return (
                <div
                  key={post.id}
                  className={`bg-white border-2.5 rounded-3xl p-4 sm:p-5 shadow-sketch space-y-3 transition-all relative ${
                    hasKritikaReply
                      ? 'border-pink-400 bg-gradient-to-b from-pink-50/20 via-white to-white'
                      : 'border-ink hover:border-purple-400'
                  }`}
                >
                  {/* Decorative Pin for Bulletin Board aesthetic */}
                  <div className="absolute -top-2.5 right-6 text-sm select-none pointer-events-none drop-shadow-xs">
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
                        onClick={() => handleToggleReplies(post.id)}
                        className="text-[10px] font-handwritten font-bold text-rose-700 underline cursor-pointer hover:text-rose-900"
                      >
                        {isExpanded ? 'Hide' : 'Read Reply ↓'}
                      </button>
                    </div>
                  )}

                  {/* Post Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl border-2 border-ink overflow-hidden bg-purple-50 shadow-xs shrink-0">
                        <img
                          src={sticker.avatarUrl}
                          alt={post.studentName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-display font-black text-sm text-ink leading-none">
                            {post.studentName}
                          </h3>
                          <span className="bg-purple-100 text-purple-800 font-handwritten text-[10px] font-black px-1.5 py-0.2 rounded-full border border-purple-300">
                            {post.batch}
                          </span>
                        </div>
                        <span className="font-handwritten text-[11px] text-ink-light font-bold">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Mood Chip */}
                      <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900">
                        <span>{post.moodEmoji}</span>
                        <span className="hidden sm:inline">{post.mood}</span>
                      </div>

                      {/* Author Delete Action */}
                      {isAuthor && (
                        <button
                          onClick={() => {
                            audioEngine.playSfx('click');
                            if (window.confirm('Delete this post from the wall?')) {
                              batchWallService.deletePost(post.id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete your post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="font-sans text-xs sm:text-sm text-ink leading-relaxed whitespace-pre-wrap">
                    {post.text}
                  </p>

                  {/* Optional Photo */}
                  {post.imageUrl && (
                    <div className="rounded-2xl border-2 border-ink overflow-hidden max-h-72 bg-paper-50">
                      <img
                        src={post.imageUrl}
                        alt="Batch memory upload"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Actions Bar: Reactions & Reply Button */}
                  <div className="pt-2 border-t-1.5 border-dashed border-ink/20 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {reactionEntries.map(([alias, count]) => {
                        const st = STICKERS.find(s => s.alias === alias) || STICKERS[0];
                        return (
                          <button
                            key={alias}
                            onClick={() => handleAddReaction(post.id, alias)}
                            className="inline-flex items-center gap-1 bg-paper-100 hover:bg-pink-100 border border-ink/30 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-ink transition-transform active:scale-90 cursor-pointer"
                          >
                            <span>{st.badgeEmoji}</span>
                            <span className="font-display font-black text-[11px]">{count}</span>
                          </button>
                        );
                      })}

                      {/* Add Reaction Button */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('click');
                          setReactingPostId(reactingPostId === post.id ? null : post.id);
                        }}
                        className="inline-flex items-center gap-1 bg-white hover:bg-paper-200 border-1.5 border-dashed border-ink/40 px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold text-ink-light transition-colors cursor-pointer"
                      >
                        <span>+ React</span>
                      </button>
                    </div>

                    {/* Async Threaded Reply Toggle Button */}
                    <button
                      onClick={() => handleToggleReplies(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-black transition-all cursor-pointer ${
                        isExpanded
                          ? 'bg-purple-700 text-white shadow-sketch-xs'
                          : repliesCount > 0
                            ? (hasKritikaReply ? 'bg-pink-100 text-pink-900 border border-pink-300 hover:bg-pink-200' : 'bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200')
                            : 'bg-white hover:bg-paper-100 border border-ink/30 text-ink-light'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>
                        {repliesCount > 0 
                          ? `${repliesCount} ${repliesCount === 1 ? 'Reply' : 'Replies'}${hasKritikaReply ? ' 👑' : ''}`
                          : 'Reply'}
                      </span>
                    </button>
                  </div>

                  {/* Reaction Picker Tray for this post */}
                  {reactingPostId === post.id && (
                    <div className="bg-purple-50/90 border-2 border-purple-300 rounded-2xl p-2.5 shadow-inner flex flex-wrap gap-1.5 animate-scale-up">
                      <span className="text-[10px] font-display font-bold text-purple-900 w-full mb-1">
                        TAP A STICKER TO REACT:
                      </span>
                      {STICKERS.map(s => (
                        <button
                          key={s.alias}
                          onClick={() => handleAddReaction(post.id, s.alias)}
                          className="w-8 h-8 rounded-xl bg-white border border-ink/30 flex items-center justify-center text-base hover:scale-110 active:scale-95 transition-transform shadow-xs cursor-pointer"
                          title={s.title}
                        >
                          {s.badgeEmoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 6. BULLETIN THREADED REPLIES DRAWER */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/15 space-y-3 bg-paper-50/70 p-3 sm:p-4 rounded-2xl animate-scale-up">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-display font-black text-ink uppercase tracking-wide flex items-center gap-1.5">
                          <span>💌</span>
                          <span>Threaded Replies ({repliesCount})</span>
                        </span>
                        <span className="font-handwritten text-xs text-purple-700 font-bold">
                          Reply at your own time ✨
                        </span>
                      </div>

                      {/* Replies List */}
                      {repliesCount === 0 ? (
                        <p className="font-handwritten text-xs text-ink-light italic py-1">
                          No replies yet. Be the first to leave a warm note or question!
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {replies.map(reply => (
                            <div
                              key={reply.id}
                              className={`p-3 rounded-2xl transition-all ${
                                reply.isKritika
                                  ? 'bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border-2 border-pink-300 shadow-xs'
                                  : 'bg-white border border-ink/20 shadow-2xs'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <div className={`w-7 h-7 rounded-full overflow-hidden border ${
                                    reply.isKritika ? 'border-pink-500 ring-2 ring-pink-200' : 'border-ink/20'
                                  }`}>
                                    <img
                                      src={reply.avatarUrl || '/marisol/avatars/01_brighter_ideas.png'}
                                      alt={reply.authorName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-display font-black text-xs text-ink">
                                      {reply.authorName}
                                    </span>
                                    {reply.isKritika && (
                                      <span className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-display text-[9px] font-black uppercase px-2 py-0.2 rounded-full shadow-2xs flex items-center gap-1">
                                        <span>👑 KRITIKA 💌</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span className="font-handwritten text-[10px] text-ink-light font-bold">
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p className={`font-sans text-xs leading-relaxed pl-9 ${
                                reply.isKritika ? 'text-rose-950 font-medium' : 'text-ink'
                              }`}>
                                {reply.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Composer Form */}
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
                          onChange={(e) => {
                            const val = e.target.value;
                            setReplyInputMap(prev => ({ ...prev, [post.id]: val }));
                          }}
                          placeholder={
                            currentUser?.name?.toLowerCase().includes('kritika')
                              ? "Reply as Kritika at your own time... 💌"
                              : `Reply to ${post.studentName} at your own time...`
                          }
                          className="flex-1 px-3 py-2 bg-white border border-ink/30 rounded-xl text-xs font-medium outline-none focus:border-purple-600 transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          disabled={sending || !replyText.trim()}
                          className="sketch-btn-primary px-3 py-2 text-xs font-black uppercase flex items-center gap-1 shadow-sketch-xs shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{sending ? '...' : 'Reply'}</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Classmate Live Status Card & Cheer Popover */}
        {selectedClassmateDetail && (
          <BaseModal
            onClose={() => setSelectedClassmateDetail(null)}
            title={selectedClassmateDetail.name}
            subtitle={`Batch ${selectedClassmateDetail.batch} Member`}
            icon={<div className="w-8 h-8 rounded-full overflow-hidden border border-ink"><img src={selectedClassmateDetail.avatarUrl} alt="" className="w-full h-full object-cover" /></div>}
            maxWidth="max-w-sm"
          >
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full text-xs font-handwritten font-bold text-amber-900">
                <span>{selectedClassmateDetail.currentMoodEmoji}</span>
                <span>{selectedClassmateDetail.currentMood}</span>
              </div>

              <div className="bg-paper-50 p-3.5 rounded-2xl border border-ink/20">
                <p className="font-handwritten text-sm text-ink italic">
                  "{selectedClassmateDetail.statusNote || 'Excited for batch trivia! ♡'}"
                </p>
                <div className="text-[10px] font-sans text-ink-light font-bold mt-2">
                  Active {selectedClassmateDetail.lastUpdated}
                </div>
              </div>

              <button
                onClick={() => handleSendCheerToClassmate(selectedClassmateDetail)}
                className="sketch-btn-primary w-full py-2.5 text-xs font-black uppercase flex items-center justify-center gap-1.5 shadow-sketch"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Send Warm Cheer to {selectedClassmateDetail.name.split(' ')[0]}</span>
              </button>
            </div>
          </BaseModal>
        )}

        {/* Modal: New Batch Update Note */}
        {showNewPostModal && (
          <BaseModal
            onClose={() => setShowNewPostModal(false)}
            title="NEW BATCH 41 NOTE"
            subtitle="Share a memory, shoutout, or status note ♡"
            icon={<span>💌</span>}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePost} className="space-y-4 text-left">
              {/* Student Name */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                  <span>Student Name:</span>
                  {isAuthenticated && (
                    <span className="text-emerald-700 font-handwritten text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Synced from Email
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-bold outline-none"
                  placeholder="e.g. Kritika"
                  required
                />
              </div>

              {/* Avatar / Companion Pose */}
              <div className="space-y-1.5">
                <label className="font-display font-black text-xs uppercase text-ink">
                  Select Your Companion Pose:
                </label>
                <div className="grid grid-cols-6 gap-1.5 max-h-28 overflow-y-auto p-1 bg-paper-50 rounded-xl border border-ink/20">
                  {STICKERS.map(s => {
                    const isSelected = s.alias === selectedPose;
                    return (
                      <button
                        type="button"
                        key={s.alias}
                        onClick={() => setSelectedPose(s.alias)}
                        className={`p-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-purple-100 border-2 border-purple-700 shadow-xs scale-105'
                            : 'bg-white border-ink/20 hover:bg-paper-100'
                        }`}
                        title={s.title}
                      >
                        <span className="text-lg">{s.badgeEmoji}</span>
                        <span className="text-[8px] font-bold truncate max-w-[40px]">{s.badgeEmoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mood Selection */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink">
                  How Are You Feeling Right Now?
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-paper-50 rounded-xl border border-ink/20">
                  {[
                    { label: 'Radiant & Grateful', emoji: '💡' },
                    { label: 'Caffeinated & Victorious', emoji: '☕' },
                    { label: 'Cozy & Chill', emoji: '☁️' },
                    { label: 'Deep Thinking', emoji: '💻' },
                    { label: 'Bold & Excited', emoji: '😉' },
                    { label: 'Peaceful & Content', emoji: '🍃' },
                    { label: 'Cheeky & Fun', emoji: '🌸' },
                  ].map(m => (
                    <button
                      type="button"
                      key={m.label}
                      onClick={() => {
                        setSelectedMood(m.label);
                        setSelectedMoodEmoji(m.emoji);
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-handwritten font-bold border transition-all ${
                        selectedMood === m.label
                          ? 'bg-ink text-white border-ink shadow-xs'
                          : 'bg-white border-ink/20 text-ink'
                      }`}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink">
                  Your Note / Memory:
                </label>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Share a story, cheer for a batchmate, or ask a question..."
                  rows={3}
                  className="w-full px-3 py-2 bg-paper-50 border-2 border-ink rounded-xl text-xs font-medium outline-none resize-none"
                  required
                />
              </div>

              {/* Optional Photo Attachment */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
                    <span>Attach Photo (Optional):</span>
                  </span>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-rose-600 font-handwritten text-xs font-bold"
                    >
                      Remove
                    </button>
                  )}
                </label>

                {imagePreview ? (
                  <div className="relative rounded-xl border-2 border-ink overflow-hidden max-h-36">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-2 file:border-ink file:bg-white file:font-display file:font-black file:text-xs hover:file:bg-paper-100"
                  />
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="sketch-btn-primary w-full py-3 text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch"
                >
                  <Send className="w-4 h-4" />
                  <span>Post to Batch 41 Wall</span>
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* Modal: Google / Email Profile */}
        {showGoogleModal && (
          <GoogleSignInModal 
            onClose={() => setShowGoogleModal(false)} 
            onSuccess={(u) => {
              setStudentName(u.name);
            }}
          />
        )}

      </div>
    </div>
  );
};
