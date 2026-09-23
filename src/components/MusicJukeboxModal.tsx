import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState } from '../services/wellnessState';
import type { HindiSong } from '../data/hindiSongs';
import { BaseModal } from './BaseModal';
import { ExternalLink, SkipForward, SkipBack, Heart, Search, Pin, Plus, Copy, Check, Play } from 'lucide-react';

interface MusicJukeboxModalProps {
  onClose: () => void;
  initialSongId?: string;
}

// Crisp official YouTube SVG icon
const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const MusicJukeboxModal: React.FC<MusicJukeboxModalProps> = ({ onClose, initialSongId }) => {
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMoodTag, setActiveMoodTag] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickYtInput, setQuickYtInput] = useState('');

  // Detailed add form states
  const [newTitle, setNewTitle] = useState('');
  const [newMovie, setNewMovie] = useState('');
  const [newSingers, setNewSingers] = useState('');
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');

  const allSongs = wellnessState.getAllSongs();
  const pinnedIds = wellnessState.getPinnedSongIds();

  const [selectedSong, setSelectedSong] = useState<HindiSong>(() => {
    return allSongs.find(s => s.id === initialSongId) || allSongs[0];
  });
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioEngine.stopMusic();
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const handleSelectSong = (song: HindiSong) => {
    audioEngine.playSfx('click');
    audioEngine.stopMusic();
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleTogglePin = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    audioEngine.playSfx('click');
    wellnessState.togglePinSong(songId);
  };

  const handleNext = () => {
    audioEngine.playSfx('click');
    const idx = allSongs.findIndex(s => s.id === selectedSong.id);
    const nextSong = allSongs[(idx + 1) % allSongs.length];
    setSelectedSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    audioEngine.playSfx('click');
    const idx = allSongs.findIndex(s => s.id === selectedSong.id);
    const prevSong = allSongs[(idx - 1 + allSongs.length) % allSongs.length];
    setSelectedSong(prevSong);
    setIsPlaying(true);
  };

  // Helper to extract YouTube Video ID from full URL, shorts, or raw ID
  const extractVideoId = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.includes('shorts/')) {
      return trimmed.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('v=')) {
      return trimmed.split('v=')[1]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('youtu.be/')) {
      return trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('embed/')) {
      return trimmed.split('embed/')[1]?.split('?')[0]?.split('&')[0] || trimmed;
    }
    return trimmed;
  };

  const handleQuickPlayYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickYtInput.trim()) return;

    audioEngine.playSfx('fanfare');
    const ytId = extractVideoId(quickYtInput);

    const existing = allSongs.find(s => s.youtubeId === ytId);
    if (existing) {
      setSelectedSong(existing);
      setIsPlaying(true);
      setQuickYtInput('');
      return;
    }

    const created = wellnessState.addCustomSong({
      title: `YouTube Pick #${Math.floor(100 + Math.random() * 900)}`,
      movie: 'YouTube Stream',
      singers: 'Queen\'s Choice',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: ytId,
      vibe: 'Direct YouTube Stream ♡',
      lyricsHighlight: 'Playing directly from YouTube stream!',
      movieQuote: '"Music makes every moment magical!"',
      tags: ['YouTube Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
    setQuickYtInput('');
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newYoutubeUrl.trim()) return;

    audioEngine.playSfx('fanfare');
    const ytId = extractVideoId(newYoutubeUrl);

    const created = wellnessState.addCustomSong({
      title: newTitle.trim(),
      movie: newMovie.trim() || 'Kritika\'s Favorite',
      singers: newSingers.trim() || 'Curated Hit',
      year: new Date().getFullYear(),
      emoji: '💖',
      accentColor: '#F43F5E',
      youtubeId: ytId,
      vibe: 'Queen\'s Personal Hit',
      lyricsHighlight: `Special pick added by Queen Kritika ♡`,
      movieQuote: '"Music is the rhythm of life!"',
      tags: ['Queen Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
    setShowAddForm(false);
    setNewTitle('');
    setNewMovie('');
    setNewSingers('');
    setNewYoutubeUrl('');
  };

  const handleCopyLink = () => {
    const ytUrl = `https://www.youtube.com/watch?v=${selectedSong.youtubeId}`;
    navigator.clipboard.writeText(ytUrl).then(() => {
      audioEngine.playSfx('pop');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Filter songs based on search & mood tags
  const filteredSongs = allSongs.filter(song => {
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.singers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = 
      activeMoodTag === 'All' || 
      song.tags.includes(activeMoodTag);

    return matchesSearch && matchesTag;
  });

  const pinnedSongsList = filteredSongs.filter(s => pinnedIds.includes(s.id));
  const otherSongsList = filteredSongs.filter(s => !pinnedIds.includes(s.id));

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={<div className="w-full h-full bg-gradient-to-tr from-red-600 via-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white"><YouTubeIcon className="w-6 h-6 text-white" /></div>}
      title="KRITIKA'S YOUTUBE LOUNGE"
      subtitle="Hand-picked Bollywood comfort songs & self-love anthems 💖"
      badge={
        <span className="bg-red-500 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          CURATED PLAYLIST
        </span>
      }
    >
      <div className="space-y-4">

        {/* Embedded Official YouTube Player */}
        <div className="bg-black border-2.5 border-ink rounded-3xl overflow-hidden shadow-sketch relative">
          {isPlaying ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={selectedSong.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${selectedSong.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${selectedSong.title} - ${selectedSong.movie}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-950 via-slate-900 to-pink-950 text-white p-4 text-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-sketch group-hover:scale-110 transition-transform mb-2">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="font-display font-black text-lg">{selectedSong.title}</p>
              <p className="font-handwritten text-sm text-pink-200">Tap to play on YouTube player</p>
            </div>
          )}

          {/* Player Info & YouTube Action Bar */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 text-white border-t-2 border-ink space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-base">{selectedSong.emoji}</span>
                  <span className="font-display font-black text-sm sm:text-base text-white truncate">
                    {selectedSong.title}
                  </span>
                  <span className="bg-red-500/30 text-red-300 border border-red-500/40 font-handwritten text-[10px] px-2 py-0.5 rounded-full shrink-0">
                    {selectedSong.movie}
                  </span>
                  {pinnedIds.includes(selectedSong.id) && (
                    <span className="bg-pink-500 text-white font-handwritten text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      📌 PINNED
                    </span>
                  )}
                </div>
                <p className="font-handwritten text-xs text-rose-200 truncate mt-0.5">
                  🎤 {selectedSong.singers}
                </p>
              </div>

              {/* Transport & YouTube Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => handleTogglePin(e, selectedSong.id)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                    pinnedIds.includes(selectedSong.id)
                      ? 'bg-pink-500 text-white border-pink-400 shadow-xs'
                      : 'bg-white/10 text-white/70 border-white/20 hover:text-white'
                  }`}
                  title={pinnedIds.includes(selectedSong.id) ? 'Unpin from Favorites' : 'Pin to Favorites'}
                >
                  <Pin className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                  title="Previous Song"
                >
                  <SkipBack className="w-4 h-4 fill-white" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                  title="Next Song"
                >
                  <SkipForward className="w-4 h-4 fill-white" />
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${selectedSong.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 h-8 rounded-xl bg-red-600 hover:bg-red-700 border border-red-400/50 flex items-center gap-1.5 text-white text-xs font-display font-black transition-all hover:scale-102 active:scale-95 shadow-xs"
                  title="Open directly on YouTube"
                >
                  <YouTubeIcon className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick YouTube Utilities row */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-handwritten text-white/70">
              <button
                onClick={handleCopyLink}
                className="hover:text-white flex items-center gap-1 text-white/80 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">YouTube link copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy YouTube Link</span>
                  </>
                )}
              </button>

              <span className="text-[10px] text-zinc-400">
                Official YouTube Embed • {selectedSong.year}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="bg-pink-50/80 border-2 border-pink-200 rounded-2xl p-3 text-left space-y-0.5 shadow-2xs">
          <div className="flex items-center justify-between text-pink-900 font-display font-black text-xs">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>SONG HIGHLIGHT</span>
            </span>
            <span className="font-handwritten text-[11px] text-pink-700 font-bold">
              {selectedSong.vibe}
            </span>
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold italic">
            "{selectedSong.lyricsHighlight}"
          </p>
        </div>

        {/* CURATED PLAYLIST SEARCH BAR & CUSTOM SONG BUTTON */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                placeholder="Search curated songs, movies, artists, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border-2 border-pink-300 rounded-2xl font-display text-xs text-ink placeholder:text-ink-light focus:border-pink-500 focus:outline-hidden shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-light hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Expand Detailed Add Modal */}
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 border-2 border-pink-300 font-display font-black text-xs rounded-2xl flex items-center gap-1 shadow-2xs shrink-0 transition-transform active:scale-95"
              title="Add Custom YouTube Song"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Song</span>
            </button>
          </div>

          {/* Quick YouTube Link Paste Bar */}
          <form 
            onSubmit={handleQuickPlayYouTube}
            className="bg-red-50/90 border border-red-200 rounded-2xl p-2 flex items-center gap-2 shadow-2xs"
          >
            <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <YouTubeIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Paste any YouTube URL or Video ID to add to playlist..."
              value={quickYtInput}
              onChange={(e) => setQuickYtInput(e.target.value)}
              className="flex-1 min-w-0 bg-white border border-red-200 rounded-xl px-2.5 py-1 font-display text-xs text-ink placeholder:text-ink-light focus:outline-hidden focus:border-red-500"
            />
            <button
              type="submit"
              disabled={!quickYtInput.trim()}
              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 transition-all active:scale-95"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Play</span>
            </button>
          </form>

          {/* Mood Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
              Mood:
            </span>
            {['All', 'Feel Good', 'Self Love', 'Cozy Chai', 'Party', 'Travel'].map(tag => (
              <button
                key={tag}
                onClick={() => setActiveMoodTag(tag)}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 ${
                  activeMoodTag === tag
                    ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                    : 'bg-white text-ink-light border-pink-200 hover:border-pink-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Add Form Dropdown */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSong}
            className="p-3.5 bg-gradient-to-br from-pink-50 to-rose-50 border-2.5 border-pink-300 rounded-3xl space-y-2.5 shadow-sketch animate-fade-in text-left"
          >
            <div className="flex items-center justify-between border-b border-pink-200 pb-1.5">
              <span className="font-display font-black text-xs text-pink-900 uppercase">
                Add YouTube Song to Kritika's Playlist 🎵
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs font-bold text-pink-700 hover:text-pink-900"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Song Title (e.g. Kasoor)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="Movie / Album (e.g. Prateek Kuhad)"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Singers / Artists"
                value={newSingers}
                onChange={(e) => setNewSingers(e.target.value)}
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="YouTube Link or Video ID"
                value={newYoutubeUrl}
                onChange={(e) => setNewYoutubeUrl(e.target.value)}
                required
                className="p-2 bg-white border border-pink-300 rounded-xl text-xs font-display text-ink placeholder:text-ink-light focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs rounded-xl shadow-xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save & Play on Jukebox</span>
            </button>
          </form>
        )}

        {/* SONG LISTS: Pinned & All Curated */}
        <div className="space-y-3 pt-1">
          {/* Pinned Songs Section */}
          {pinnedSongsList.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-pink-900 uppercase">
                <Pin className="w-3 h-3 fill-pink-500 text-pink-500" />
                <span>KRITIKA'S PINNED FAVORITES ({pinnedSongsList.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pinnedSongsList.map((song) => {
                  const isCurrent = selectedSong.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleSelectSong(song)}
                      className={`
                        p-2.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer group
                        ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sketch ring-2 ring-pink-400'
                            : 'border-pink-200 bg-white hover:border-pink-300 hover:shadow-sketch-xs'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${song.accentColor}20`, border: `1.5px solid ${song.accentColor}50` }}
                        >
                          {song.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-black text-xs text-ink truncate">
                            {song.title}
                          </p>
                          <p className="font-handwritten text-[11px] text-pink-700 font-bold truncate">
                            {song.movie}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1.5 text-pink-500 hover:text-pink-700 transition-colors shrink-0"
                        title="Unpin"
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Curated Playlist Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-display font-black text-ink uppercase">
              <span>CURATED BOLLYWOOD PLAYLIST ({filteredSongs.length})</span>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Tap to play
              </span>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="p-6 bg-pink-50/50 border-2 border-dashed border-pink-200 rounded-3xl text-center space-y-1.5">
                <p className="text-2xl">🎶</p>
                <p className="font-display font-bold text-xs text-ink">No songs match your search</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveMoodTag('All');
                  }}
                  className="font-handwritten text-xs text-pink-600 font-bold underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {otherSongsList.map((song) => {
                  const isCurrent = selectedSong.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleSelectSong(song)}
                      className={`
                        p-2.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between cursor-pointer group
                        ${
                          isCurrent
                            ? 'border-pink-500 bg-pink-50 shadow-sketch ring-2 ring-pink-400'
                            : 'border-pink-100 bg-white hover:border-pink-300 hover:shadow-sketch-xs'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${song.accentColor}15`, border: `1.5px solid ${song.accentColor}40` }}
                        >
                          {song.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-black text-xs text-ink truncate">
                            {song.title}
                          </p>
                          <p className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                            {song.movie}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1.5 text-stone-300 hover:text-pink-500 transition-colors shrink-0"
                        title="Pin to Favorites"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-pink-200 flex items-center justify-between text-[11px] font-handwritten text-ink-light font-bold">
          <span>💖 Dedicated to Kritika's Joy & Comfort</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-paper-100 hover:bg-paper-200 text-ink border border-pink-200 rounded-xl font-display font-black transition-colors"
          >
            Close Lounge
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
