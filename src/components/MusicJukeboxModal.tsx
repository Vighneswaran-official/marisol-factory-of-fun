import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState } from '../services/wellnessState';
import type { HindiSong } from '../data/hindiSongs';
import { X, Sparkles, ExternalLink, SkipForward, SkipBack, Music2, Heart, Search, Pin, Plus } from 'lucide-react';

interface MusicJukeboxModalProps {
  onClose: () => void;
  initialSongId?: string;
}

export const MusicJukeboxModal: React.FC<MusicJukeboxModalProps> = ({ onClose, initialSongId }) => {
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMoodTag, setActiveMoodTag] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New song form states
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

  // Helper to extract YouTube Video ID from full URL or raw ID
  const extractVideoId = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.includes('v=')) {
      return trimmed.split('v=')[1]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('youtu.be/')) {
      return trimmed.split('youtu.be/')[1]?.split('?')[0] || trimmed;
    }
    return trimmed;
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

    // Automatically pin the new song and select it!
    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
    setShowAddForm(false);
    setNewTitle('');
    setNewMovie('');
    setNewSingers('');
    setNewYoutubeUrl('');
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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <Music2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  KRITIKA'S HINDI LOUNGE 🎵
                </h2>
                <span className="bg-pink-100 text-pink-700 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-pink-300">
                  QUEEN HITS
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                Search, listen & pin your favorite songs to your personal playlist! 💖
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Video/Audio Player */}
        <div className="bg-black border-2.5 border-ink rounded-3xl overflow-hidden shadow-sketch relative">
          {isPlaying ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedSong.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedSong.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-950 to-slate-900 text-white p-4 text-center">
              <p className="font-display font-black text-lg">{selectedSong.title}</p>
              <p className="font-handwritten text-sm text-pink-200">Tap below to play</p>
            </div>
          )}

          {/* Player Info Bar */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white border-t-2 border-ink flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{selectedSong.emoji}</span>
                <span className="font-display font-black text-sm sm:text-base text-white truncate">
                  {selectedSong.title}
                </span>
                <span className="bg-white/20 text-white font-handwritten text-[10px] px-2 py-0.5 rounded-full shrink-0">
                  {selectedSong.movie}
                </span>
                {pinnedIds.includes(selectedSong.id) && (
                  <span className="bg-pink-500 text-white font-handwritten text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    📌 PINNED
                  </span>
                )}
              </div>
              <p className="font-handwritten text-xs text-pink-200 truncate mt-0.5">
                🎤 {selectedSong.singers}
              </p>
            </div>

            {/* Transport & Pin Controls */}
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
                className="w-8 h-8 rounded-xl bg-red-600 hover:bg-red-700 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                title="Open in YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Lyrics Highlight & Quote */}
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

        {/* Search & Add Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                placeholder="Search songs, movies, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border-2 border-pink-200 rounded-2xl font-display text-xs text-ink placeholder:text-ink-light focus:border-pink-500 focus:outline-hidden shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-light hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 border-2 border-pink-300 font-display font-black text-xs rounded-2xl flex items-center gap-1.5 shadow-2xs shrink-0 transition-transform active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Song</span>
            </button>
          </div>

          {/* Quick Mood Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
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

        {/* Add Custom Song Form (Expandable) */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSong}
            className="bg-pink-50/90 border-2 border-pink-300 rounded-2xl p-3.5 space-y-2.5 animate-fade-in shadow-sketch-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs text-pink-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>ADD QUEEN KRITIKA'S FAVORITE SONG</span>
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-xs font-bold text-pink-600 hover:text-pink-900"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Song Title (e.g. Tum Se Hi)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
              <input
                type="text"
                placeholder="Movie / Artist (e.g. Jab We Met)"
                value={newMovie}
                onChange={e => setNewMovie(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Singers (e.g. Mohit Chauhan)"
                value={newSingers}
                onChange={e => setNewSingers(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
              <input
                type="text"
                required
                placeholder="YouTube Link or ID (e.g. https://youtu.be/...)"
                value={newYoutubeUrl}
                onChange={e => setNewYoutubeUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs uppercase rounded-xl border border-ink shadow-xs hover:scale-101 active:scale-98 transition-all"
            >
              PIN & ADD TO MY PLAYLIST 💖
            </button>
          </form>
        )}

        {/* PINNED FAVORITES SHELF */}
        {pinnedSongsList.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-pink-900 flex items-center gap-1.5">
                <span>👑 QUEEN'S PINNED FAVORITES</span>
                <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">
                  {pinnedSongsList.length} Pinned
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pinnedSongsList.map((song) => {
                const isCurrent = song.id === selectedSong.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => handleSelectSong(song)}
                    className={`
                      p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 relative cursor-pointer
                      ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                          : 'border-pink-200 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                      }
                    `}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border border-pink-300 flex items-center justify-center text-lg shadow-inner shrink-0"
                      style={{ backgroundColor: `${song.accentColor}25` }}
                    >
                      <span>{song.emoji}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black text-xs text-ink truncate flex items-center gap-1">
                        <span>{song.title}</span>
                      </div>
                      <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                        {song.movie}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleTogglePin(e, song.id)}
                      className="p-1 text-pink-500 hover:scale-125 transition-transform shrink-0"
                      title="Unpin"
                    >
                      <Pin className="w-4 h-4 fill-pink-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ALL OTHER SONGS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>ALL BOLLYWOOD SONGS</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </h4>
            <span className="font-handwritten text-xs font-bold text-ink-light">
              Tap pin to save to favorites
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {otherSongsList.map((song) => {
              const isCurrent = song.id === selectedSong.id;
              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`
                    p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 relative cursor-pointer
                    ${
                      isCurrent
                        ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                        : 'border-pink-200/80 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                    }
                  `}
                >
                  <div 
                    className="w-10 h-10 rounded-xl border border-pink-200 flex items-center justify-center text-lg shadow-inner shrink-0"
                    style={{ backgroundColor: `${song.accentColor}25` }}
                  >
                    <span>{song.emoji}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {song.title}
                    </div>
                    <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {song.movie}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleTogglePin(e, song.id)}
                    className="p-1 text-ink-light hover:text-pink-500 hover:scale-125 transition-transform shrink-0"
                    title="Pin to Favorites"
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-1.5 border-pink-200 rounded-2xl p-3 flex items-center gap-3">
          <img 
            src="/marisol/avatars/11_music_mood.png" 
            alt="Kritika with headphones" 
            className="w-10 h-10 rounded-full border-2 border-ink bg-white shrink-0"
          />
          <div className="font-handwritten text-xs text-pink-900 font-bold leading-relaxed">
            "Your playlist should be as iconic, comforting, and magical as you are!" ♡
          </div>
        </div>

      </div>
    </div>
  );
};
