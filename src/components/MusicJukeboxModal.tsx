import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { wellnessState } from '../services/wellnessState';
import type { HindiSong } from '../data/hindiSongs';
import { X, Sparkles, ExternalLink, SkipForward, SkipBack, Heart, Search, Pin, Plus, Copy, Check, Play } from 'lucide-react';

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

  // Live in-website YouTube search state
  interface LiveYtItem {
    videoId: string;
    title: string;
    channel: string;
    duration: string;
    thumbnail: string;
  }
  const [liveYtResults, setLiveYtResults] = useState<LiveYtItem[]>([]);
  const [isSearchingYt, setIsSearchingYt] = useState(false);
  const [ytSearchNotice, setYtSearchNotice] = useState<string | null>(null);

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

  // LIVE IN-WEBSITE YOUTUBE SEARCH
  const executeInWebsiteYouTubeSearch = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : searchQuery).trim();
    if (!q) return;

    if (queryText !== undefined) {
      setSearchQuery(queryText);
    }

    setIsSearchingYt(true);
    setYtSearchNotice(`Searching YouTube for "${q}"...`);
    audioEngine.playSfx('click');

    try {
      const res = await fetch(`/api/youtube-search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setLiveYtResults(data.results);
        setYtSearchNotice(`Found ${data.results.length} live YouTube videos!`);
        audioEngine.playSfx('fanfare');
      } else {
        setLiveYtResults([]);
        setYtSearchNotice(`No results found directly on YouTube. Try another search!`);
      }
    } catch {
      // Local fallback
      const localMatches = allSongs.filter(s =>
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.movie.toLowerCase().includes(q.toLowerCase()) ||
        s.singers.toLowerCase().includes(q.toLowerCase())
      );
      if (localMatches.length > 0) {
        setLiveYtResults(localMatches.map(s => ({
          videoId: s.youtubeId,
          title: `${s.title} (${s.movie})`,
          channel: s.singers,
          duration: 'HD',
          thumbnail: `https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`
        })));
        setYtSearchNotice(`Found ${localMatches.length} matching songs in library!`);
      } else {
        setLiveYtResults([]);
        setYtSearchNotice('Could not reach YouTube search. Try pasting link directly below!');
      }
    } finally {
      setIsSearchingYt(false);
    }
  };

  // Play a live YouTube item right inside the website
  const handlePlayLiveYtItem = (item: LiveYtItem) => {
    audioEngine.playSfx('click');
    audioEngine.stopMusic();

    const existing = allSongs.find(s => s.youtubeId === item.videoId);
    if (existing) {
      setSelectedSong(existing);
      setIsPlaying(true);
      return;
    }

    const cleanTitle = item.title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    const newSong: HindiSong = {
      id: `yt_${item.videoId}`,
      title: cleanTitle.length > 45 ? cleanTitle.slice(0, 45) + '...' : cleanTitle,
      movie: item.channel || 'YouTube Song',
      singers: item.channel || 'YouTube Stream',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: item.videoId,
      vibe: 'YouTube Search Hit',
      lyricsHighlight: cleanTitle,
      movieQuote: '"Streaming directly from YouTube search!"',
      tags: ['YouTube Search', 'Stream']
    };

    setSelectedSong(newSong);
    setIsPlaying(true);
  };

  // Pin a live YouTube item to Kritika's favorites
  const handlePinLiveYtItem = (e: React.MouseEvent, item: LiveYtItem) => {
    e.stopPropagation();
    audioEngine.playSfx('fanfare');

    const cleanTitle = item.title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    const created = wellnessState.addCustomSong({
      title: cleanTitle.length > 45 ? cleanTitle.slice(0, 45) + '...' : cleanTitle,
      movie: item.channel || 'YouTube Pick',
      singers: item.channel || 'YouTube Creator',
      year: new Date().getFullYear(),
      emoji: '🔴',
      accentColor: '#EF4444',
      youtubeId: item.videoId,
      vibe: 'Queen\'s YouTube Pick',
      lyricsHighlight: `Saved from YouTube search: "${cleanTitle}"`,
      movieQuote: '"Music on demand, saved by Queen Kritika!"',
      tags: ['YouTube Pick', 'Favorites']
    });

    wellnessState.togglePinSong(created.id);
    setSelectedSong(created);
    setIsPlaying(true);
  };

  // Instant Quick YouTube Link Paste & Play
  const handleQuickPlayYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickYtInput.trim()) return;

    const ytId = extractVideoId(quickYtInput);
    if (!ytId) return;

    audioEngine.playSfx('fanfare');
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
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with YouTube Connectivity Badge */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-gradient-to-tr from-red-600 via-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <YouTubeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  KRITIKA'S YOUTUBE LOUNGE
                </h2>
                <span className="bg-red-500 text-white font-display text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  YOUTUBE LIVE
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                Search & play any song on YouTube right on this website! 💖
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

        {/* Embedded YouTube Player */}
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
              <div className="flex items-center gap-2">
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

                <span>•</span>

                <button
                  onClick={() => executeInWebsiteYouTubeSearch(`${selectedSong.title} ${selectedSong.movie}`)}
                  className="hover:text-white flex items-center gap-1 text-white/80 transition-colors"
                >
                  <Search className="w-3 h-3 text-red-400" />
                  <span>Search similar on site</span>
                </button>
              </div>

              <span className="text-[10px] text-zinc-400 hidden sm:inline">
                ID: {selectedSong.youtubeId}
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

        {/* IN-WEBSITE YOUTUBE SEARCH BAR */}
        <div className="space-y-2">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              executeInWebsiteYouTubeSearch();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                placeholder="Search any song, artist, or movie on YouTube..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border-2 border-red-300 rounded-2xl font-display text-xs text-ink placeholder:text-ink-light focus:border-red-500 focus:outline-hidden shadow-2xs"
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

            {/* Direct In-Website YouTube Search Button */}
            <button
              type="submit"
              disabled={isSearchingYt}
              className="px-3.5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 text-white border-2 border-ink font-display font-black text-xs rounded-2xl flex items-center gap-1.5 shadow-sketch-xs shrink-0 transition-transform active:scale-95"
              title="Search directly on YouTube inside this website"
            >
              {isSearchingYt ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <YouTubeIcon className="w-4 h-4 text-white" />
                  <span>Search YouTube</span>
                </>
              )}
            </button>

            {/* Expand Detailed Add Modal */}
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2.5 bg-pink-100 hover:bg-pink-200 text-pink-800 border-2 border-pink-300 font-display font-black text-xs rounded-2xl flex items-center gap-1 shadow-2xs shrink-0 transition-transform active:scale-95"
              title="Add Custom Song Details"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Custom</span>
            </button>
          </form>

          {/* Search Status Toast / Notice */}
          {ytSearchNotice && (
            <div className="flex items-center justify-between bg-red-50/90 border border-red-200 rounded-xl px-3 py-1.5 text-xs font-handwritten text-red-900 font-bold animate-fade-in">
              <span>{ytSearchNotice}</span>
              {liveYtResults.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setLiveYtResults([]);
                    setYtSearchNotice(null);
                  }}
                  className="text-[11px] text-red-600 hover:text-red-900 underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Quick YouTube Search Chips (Click to Search on Website) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
            <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
              🔴 Quick Search:
            </span>
            {[
              'Kesariya',
              'Apna Bana Le',
              'Channa Mereya',
              'Heeriye',
              'Arijit Singh',
              'Tauba Tauba',
              'Lofi Hindi',
            ].map(ytQuery => (
              <button
                key={ytQuery}
                type="button"
                onClick={() => executeInWebsiteYouTubeSearch(ytQuery)}
                className="px-2.5 py-0.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-full shrink-0 flex items-center gap-1 transition-colors active:scale-95"
              >
                <YouTubeIcon className="w-2.5 h-2.5 text-red-600" />
                <span>{ytQuery}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LIVE IN-WEBSITE YOUTUBE SEARCH RESULTS SHELF */}
        {liveYtResults.length > 0 && (
          <div className="space-y-2 bg-gradient-to-br from-red-50/80 via-white to-pink-50/80 border-2.5 border-red-400 rounded-3xl p-3.5 shadow-sketch animate-fade-in">
            <div className="flex items-center justify-between border-b border-red-200 pb-2">
              <div className="flex items-center gap-1.5">
                <YouTubeIcon className="w-4 h-4 text-red-600" />
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-red-950">
                  LIVE YOUTUBE SEARCH RESULTS ({liveYtResults.length})
                </h4>
              </div>
              <button
                onClick={() => {
                  setLiveYtResults([]);
                  setYtSearchNotice(null);
                }}
                className="text-[11px] font-display font-bold text-red-600 hover:text-red-900"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {liveYtResults.map((item) => {
                const isCurrent = selectedSong.youtubeId === item.videoId;
                const isPinned = pinnedIds.includes(item.videoId) || pinnedIds.includes(`yt_${item.videoId}`);
                return (
                  <div
                    key={item.videoId}
                    onClick={() => handlePlayLiveYtItem(item)}
                    className={`
                      p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                      ${
                        isCurrent
                          ? 'border-red-500 bg-red-50/80 shadow-sketch ring-2 ring-red-400'
                          : 'border-red-200 bg-white hover:border-red-400 hover:shadow-sketch-xs'
                      }
                    `}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-18 h-13 rounded-xl overflow-hidden border border-red-300 bg-slate-900 shrink-0 shadow-xs">
                      <img 
                        src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                          <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                        </div>
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-0.5 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded-sm">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black text-xs text-ink line-clamp-2 leading-tight">
                        {item.title}
                      </div>
                      <div className="font-handwritten text-[11px] text-red-700 font-bold truncate mt-0.5">
                        {item.channel}
                      </div>
                    </div>

                    {/* Pin and external link */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handlePinLiveYtItem(e, item)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isPinned
                            ? 'bg-pink-500 text-white border-pink-400'
                            : 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100 hover:scale-110'
                        }`}
                        title={isPinned ? 'Pinned in Favorites!' : 'Pin to Favorites'}
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${item.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-red-500 hover:text-red-700 hover:scale-125 transition-transform"
                        title="Watch on YouTube.com"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK YOUTUBE LINK PASTE & PLAY BAR */}
        <form 
          onSubmit={handleQuickPlayYouTube}
          className="bg-red-50/90 border-2 border-red-200 rounded-2xl p-2.5 flex items-center gap-2 shadow-2xs"
        >
          <div className="w-7 h-7 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <YouTubeIcon className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            placeholder="Or paste any YouTube URL or Video ID to play & pin..."
            value={quickYtInput}
            onChange={(e) => setQuickYtInput(e.target.value)}
            className="flex-1 min-w-0 bg-white border border-red-200 rounded-xl px-2.5 py-1.5 font-display text-xs text-ink placeholder:text-ink-light focus:outline-hidden focus:border-red-500"
          />
          <button
            type="submit"
            disabled={!quickYtInput.trim()}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-display font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 transition-all active:scale-95"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Play</span>
          </button>
        </form>


        {/* Quick Mood Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-handwritten font-bold">
          <span className="text-[11px] text-ink-light uppercase tracking-wider font-display font-bold shrink-0">
            Mood Filter:
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

        {/* Detailed Add Song Form (Expandable) */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSong}
            className="bg-pink-50/90 border-2 border-pink-300 rounded-2xl p-3.5 space-y-2.5 animate-fade-in shadow-sketch-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs text-pink-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>ADD CUSTOM YOUTUBE TRACK WITH DETAILS</span>
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
                placeholder="Movie / Album (e.g. Jab We Met)"
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
                placeholder="YouTube Link or Video ID (e.g. https://youtu.be/...)"
                value={newYoutubeUrl}
                onChange={e => setNewYoutubeUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl font-display text-xs text-ink placeholder:text-ink-light"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white font-display font-black text-xs uppercase rounded-xl border border-ink shadow-xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <YouTubeIcon className="w-4 h-4 text-white" />
              <span>PIN & ADD TO MY PLAYLIST 💖</span>
            </button>
          </form>
        )}

        {/* PINNED FAVORITES SHELF WITH REAL YOUTUBE THUMBNAILS */}
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
                      p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                      ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                          : 'border-pink-200 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                      }
                    `}
                  >
                    {/* Real YouTube Video Thumbnail */}
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-pink-300 bg-slate-900 shrink-0 shadow-xs">
                      <img 
                        src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`} 
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          // Fallback if image fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                          <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black text-xs text-ink truncate flex items-center gap-1">
                        <span>{song.title}</span>
                      </div>
                      <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                        {song.movie}
                      </div>
                      <div className="text-[10px] font-handwritten text-pink-700 truncate">
                        {song.singers}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleTogglePin(e, song.id)}
                        className="p-1 text-pink-500 hover:scale-125 transition-transform"
                        title="Unpin"
                      >
                        <Pin className="w-4 h-4 fill-pink-500" />
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-red-500 hover:text-red-700 hover:scale-125 transition-transform"
                        title="Watch on YouTube.com"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ALL BOLLYWOOD SONGS WITH REAL YOUTUBE THUMBNAILS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>ALL BOLLYWOOD SONGS ({filteredSongs.length})</span>
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
                    p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 relative cursor-pointer group
                    ${
                      isCurrent
                        ? 'border-pink-500 bg-pink-50/70 shadow-sketch ring-2 ring-pink-400'
                        : 'border-pink-200/80 bg-white hover:border-pink-400 hover:shadow-sketch-xs'
                    }
                  `}
                >
                  {/* Real YouTube Video Thumbnail */}
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-pink-200 bg-slate-900 shrink-0 shadow-xs">
                    <img 
                      src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`} 
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xs">
                        <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {song.title}
                    </div>
                    <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {song.movie}
                    </div>
                    <div className="text-[10px] font-handwritten text-pink-700 truncate">
                      {song.singers}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleTogglePin(e, song.id)}
                      className="p-1 text-ink-light hover:text-pink-500 hover:scale-125 transition-transform"
                      title="Pin to Favorites"
                    >
                      <Pin className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-red-500/70 hover:text-red-700 hover:scale-125 transition-transform"
                      title="Watch on YouTube.com"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with YouTube & Personal Comfort Note */}
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 border-1.5 border-pink-200 rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src="/marisol/avatars/11_music_mood.png" 
              alt="Kritika with headphones" 
              className="w-10 h-10 rounded-full border-2 border-ink bg-white shrink-0"
            />
            <div className="font-handwritten text-xs text-pink-900 font-bold leading-relaxed truncate">
              "Every song here is connected to YouTube for seamless listening!" ♡
            </div>
          </div>
          <button
            onClick={() => executeInWebsiteYouTubeSearch()}
            className="text-[11px] font-display font-black text-red-600 hover:text-red-800 underline shrink-0 flex items-center gap-1"
          >
            <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />
            <span>Search YouTube</span>
          </button>
        </div>

      </div>
    </div>
  );
};

