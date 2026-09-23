import React, { useState, useEffect } from 'react';
import type { ScreenState } from '../types/game';
import { batchWallService } from '../services/batchWallState';
import { authService, type StudentProfile } from '../services/authService';
import { STICKERS } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Plus, MessageSquareHeart, Sparkles, Image as ImageIcon, 
  Send, X, Search, CheckCircle2, UserCheck, Heart 
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('All');

  // New Post Form State
  const [studentName, setStudentName] = useState(currentUser?.name || player.nickname || 'Kritika');
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

  // Sync default name when Google user changes
  useEffect(() => {
    if (currentUser?.name) {
      setStudentName(currentUser.name);
    }
  }, [currentUser]);

  const posts = batchWallService.getPosts();
  const network = batchWallService.getNetworkStatus();
  const classmates = authService.getClassmates();

  // Filtered posts
  const filteredPosts = posts.filter(post => {
    if (selectedMoodFilter !== 'All' && post.mood !== selectedMoodFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.studentName.toLowerCase().includes(q) ||
      post.text.toLowerCase().includes(q) ||
      post.mood.toLowerCase().includes(q)
    );
  });

  // Extract all unique moods for filter
  const uniqueMoods = ['All', ...Array.from(new Set(posts.map(p => p.mood)))];

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
      studentName: studentName.trim() || currentUser?.name || 'Kritika',
      avatarPose: selectedPose,
      mood: selectedMood,
      moodEmoji: selectedMoodEmoji,
      text: postText.trim(),
      imageUrl: imagePreview || undefined,
    });

    // Also update Google user's daily status note
    if (isAuthenticated) {
      authService.updateDailyMood(selectedMood, selectedMoodEmoji, postText.trim().slice(0, 80));
    }

    setPostText('');
    setImagePreview(null);
    setShowNewPostModal(false);
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
      studentName: currentUser?.name || 'Kritika',
      avatarPose: player.activeSticker || '01_brighter_ideas',
      mood: 'Radiant & Grateful',
      moodEmoji: '💖',
      text: `Sending a big warm hug & cheer to ${classmate.name}! Keep shining queen! ✨`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-3 sm:p-6 pb-28 text-ink">
      <div className="max-w-2xl mx-auto space-y-5">

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

        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-2.5 sm:p-3 bg-white flex items-center gap-1.5 shadow-sketch"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-display font-bold text-xs sm:text-sm hidden sm:inline">HOME</span>
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-1 font-handwritten text-purple-700 font-bold text-xs sm:text-sm">
              <MessageSquareHeart className="w-4 h-4" /> BATCH MLP41PT COMMUNITY
            </div>
            <h1 className="font-display text-xl sm:text-3xl font-black tracking-tight">
              SHARED BATCH WALL 🎓
            </h1>
          </div>

          {/* Google Sign In status pill */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setShowGoogleModal(true);
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-purple-50 border-2 border-ink px-2.5 py-1 rounded-full text-xs font-handwritten font-bold shadow-sketch transition-all"
            title="Google Account & Batch Sync"
          >
            {isAuthenticated && currentUser ? (
              <span className="text-emerald-700 flex items-center gap-1 font-display font-black text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[70px] truncate">{currentUser.name.split(' ')[0]}</span>
              </span>
            ) : (
              <span className="text-purple-700 flex items-center gap-1 font-display font-black text-[11px]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>SIGN IN</span>
              </span>
            )}
          </button>
        </div>

        {/* 1. GOOGLE SIGN IN / ACTIVE STUDENT PRESENCE BANNER */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-2.5 border-purple-300 rounded-3xl p-4 shadow-sketch flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl border-2 border-ink overflow-hidden bg-white shadow-xs shrink-0 flex items-center justify-center">
              {isAuthenticated && currentUser ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-display font-black text-xs sm:text-sm text-purple-950">
                  {isAuthenticated && currentUser ? `Signed in as ${currentUser.name}` : "Sign in with Google"}
                </span>
                <span className="bg-purple-600 text-white font-display text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  {isAuthenticated ? "GOOGLE VERIFIED" : "BATCH 41"}
                </span>
              </div>
              <p className="font-handwritten text-xs text-purple-800 font-bold truncate">
                {isAuthenticated && currentUser 
                  ? `Your daily mood: ${currentUser.currentMoodEmoji} ${currentUser.currentMood}`
                  : "See real-time classmate daily life updates & moods!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setShowGoogleModal(true);
              }}
              className="sketch-btn px-3 py-1.5 text-xs font-black uppercase bg-white border border-purple-300 shadow-sketch-xs hover:bg-purple-100"
            >
              {isAuthenticated ? "EDIT MOOD" : "GOOGLE SIGN IN"}
            </button>
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setShowNewPostModal(true);
              }}
              className="sketch-btn-primary px-3 py-1.5 text-xs font-black uppercase flex items-center gap-1 shadow-sketch-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>POST NOTE</span>
            </button>
          </div>
        </div>

        {/* 2. CLASSMATE DAILY MOOD & LIFE UPDATES RADAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
              <span>🌟</span>
              <span>CLASSMATE DAILY MOOD RADAR ({classmates.length} ACTIVE)</span>
            </h3>
            <span className="font-handwritten text-xs text-purple-700 font-bold">
              Tap to send quick cheer ♡
            </span>
          </div>

          {/* Horizontal Scrollable Classmate Cards */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {classmates.map(cm => (
              <div
                key={cm.id}
                onClick={() => handleSendCheerToClassmate(cm)}
                className="bg-white border-2 border-purple-200 hover:border-purple-500 rounded-2xl p-3 min-w-[200px] max-w-[220px] shrink-0 shadow-sketch-sm hover:shadow-sketch transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-9 h-9 rounded-xl border border-ink/30 overflow-hidden bg-purple-50 shrink-0 group-hover:scale-105 transition-transform">
                    <img src={cm.avatarUrl} alt={cm.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate leading-tight">
                      {cm.name}
                    </div>
                    <span className="font-handwritten text-[10px] text-ink-light font-bold">
                      {cm.lastUpdated}
                    </span>
                  </div>
                </div>

                {/* Mood Tag */}
                <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-handwritten font-bold text-amber-900 mb-1.5">
                  <span>{cm.currentMoodEmoji}</span>
                  <span className="truncate">{cm.currentMood}</span>
                </div>

                {/* Status Note */}
                <p className="font-sans text-[11px] text-ink-light line-clamp-2 leading-tight">
                  "{cm.statusNote}"
                </p>

                <div className="pt-2 mt-1 border-t border-dashed border-ink/10 flex items-center justify-between text-[10px] font-handwritten text-pink-600 font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> Cheer
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Search & Mood Filter Bar */}
        <div className="bg-white border-2 border-ink rounded-2xl p-3 shadow-sketch space-y-2.5">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-ink-light pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by classmate name or keyword..."
              className="w-full pl-9 pr-8 py-2 bg-paper-50 border border-ink/40 rounded-xl text-xs font-medium outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-0.5 text-ink-light hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

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
        </div>

        {/* 4. Posts Feed */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white border-3 border-dashed border-ink/30 rounded-3xl p-8 text-center space-y-3 shadow-sketch">
            <div className="text-4xl animate-bounce-gentle">💌✨</div>
            <h3 className="font-display font-black text-lg text-ink">No updates found</h3>
            <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
              Be the first to share a warm memory or update from Batch MLP41PT!
            </p>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="sketch-btn px-4 py-2 text-xs font-black uppercase bg-purple-50 border-2 border-ink shadow-sketch"
            >
              Post First Memory
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map(post => {
              const sticker = STICKERS.find(s => s.alias === post.avatarPose) || STICKERS[0];
              const reactionEntries = Object.entries(post.reactions || {}).filter(([_, count]) => count > 0);

              return (
                <div
                  key={post.id}
                  className="bg-white border-2.5 border-ink rounded-3xl p-4 sm:p-5 shadow-sketch space-y-3 transition-all hover:border-purple-400"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl border-2 border-ink overflow-hidden bg-purple-50 shadow-xs shrink-0">
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

                    {/* Mood Chip */}
                    <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold text-amber-900 shrink-0">
                      <span>{post.moodEmoji}</span>
                      <span className="hidden sm:inline">{post.mood}</span>
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

                  {/* Reactions Section */}
                  <div className="pt-2 border-t-1.5 border-dashed border-ink/20 flex flex-wrap items-center gap-1.5">
                    {reactionEntries.map(([alias, count]) => {
                      const st = STICKERS.find(s => s.alias === alias) || STICKERS[0];
                      return (
                        <button
                          key={alias}
                          onClick={() => handleAddReaction(post.id, alias)}
                          className="inline-flex items-center gap-1 bg-paper-100 hover:bg-pink-100 border border-ink/30 px-2 py-0.5 rounded-full text-xs font-handwritten font-bold text-ink transition-transform active:scale-90"
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
                      className="inline-flex items-center gap-1 bg-white hover:bg-paper-200 border-1.5 border-dashed border-ink/40 px-2.5 py-0.5 rounded-full text-xs font-handwritten font-bold text-ink-light transition-colors"
                    >
                      <span>+ React</span>
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
                          className="w-8 h-8 rounded-xl bg-white border border-ink/30 flex items-center justify-center text-base hover:scale-110 active:scale-95 transition-transform shadow-xs"
                          title={s.title}
                        >
                          {s.badgeEmoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: New Batch Update */}
        {showNewPostModal && (
          <BaseModal
            onClose={() => setShowNewPostModal(false)}
            title="NEW BATCH 41 UPDATE"
            subtitle="Share a memory, shoutout, or status note ♡"
            icon={<span>💌</span>}
            maxWidth="max-w-md"
          >
            <form onSubmit={handleCreatePost} className="space-y-4 text-left">
              {/* Name */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                  <span>Your Name:</span>
                  {isAuthenticated && (
                    <span className="text-emerald-700 font-handwritten text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Signed in with Google
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
                  Select Your Avatar Pose:
                </label>
                <div className="grid grid-cols-6 gap-1.5 max-h-28 overflow-y-auto p-1 bg-paper-50 rounded-xl border border-ink/20">
                  {STICKERS.map(s => {
                    const isSelected = s.alias === selectedPose;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedPose(s.alias)}
                        className={`p-1 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected ? 'bg-doodleGold border-2 border-ink shadow-xs scale-105' : 'bg-white border-ink/20 hover:border-ink'
                        }`}
                      >
                        <span className="text-base">{s.badgeEmoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mood */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink">
                  How are you feeling right now?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Radiant & Grateful', emoji: '💡' },
                    { label: 'Caffeinated & Victorious', emoji: '☕' },
                    { label: 'Deep Thinking', emoji: '💻' },
                    { label: 'Cozy & Chill', emoji: '☁️' },
                    { label: 'Silly & Happy', emoji: '😜' },
                    { label: 'Big Dreams', emoji: '✈️' },
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
                          : 'bg-paper-100 border-ink/20 text-ink'
                      }`}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Note */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink">
                  Memory or Short Message:
                </label>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Drop a note, joke, or unforgettable memory with Batch 41..."
                  rows={3}
                  className="w-full p-3 bg-paper-50 border-2 border-ink rounded-2xl text-xs font-medium outline-none resize-none"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-1">
                <label className="font-display font-black text-xs uppercase text-ink flex items-center justify-between">
                  <span>Attach Photo (Optional):</span>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-coral-500 font-handwritten font-bold hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </label>
                {imagePreview ? (
                  <div className="h-28 rounded-2xl border-2 border-ink overflow-hidden bg-paper-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-ink/40 rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-paper-100 transition-colors">
                    <ImageIcon className="w-4 h-4 text-ink-light" />
                    <span className="font-handwritten text-xs font-bold text-ink-light">
                      Upload polaroid or snapshot
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="sketch-btn-primary w-full py-3 text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch"
                >
                  <Send className="w-4 h-4" />
                  <span>{network.isOnline ? 'PUBLISH TO BATCH WALL' : 'QUEUE OFFLINE (WILL SYNC)'}</span>
                </button>
              </div>
            </form>
          </BaseModal>
        )}

        {/* Modal: Google Sign In */}
        {showGoogleModal && (
          <GoogleSignInModal
            onClose={() => setShowGoogleModal(false)}
            onSuccess={() => setShowGoogleModal(false)}
          />
        )}

      </div>
    </div>
  );
};
