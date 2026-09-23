import React, { useState, useEffect } from 'react';
import { 
  musicStreamingService, 
  type Track, 
  type PlayerState, 
  CURATED_NEW_RELEASES 
} from '../services/musicStreamingService';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Search, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Sparkles, Music2, Disc3,
  Radio, ArrowLeft, RefreshCw, Youtube, ExternalLink
} from 'lucide-react';
import type { ScreenState } from '../types/game';

interface MusicPlayerScreenProps {
  onNavigate: (screen: ScreenState) => void;
}

export const MusicPlayerScreen: React.FC<MusicPlayerScreenProps> = ({ onNavigate }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(musicStreamingService.getState());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>(CURATED_NEW_RELEASES);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'trending' | 'bollywood' | 'pop' | 'acoustic'>('trending');
  const [playMode, setPlayMode] = useState<'youtube' | 'audio'>('youtube');

  useEffect(() => {
    const unsub = musicStreamingService.subscribe((s) => setPlayerState(s));
    return () => {
      unsub();
    };
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(CURATED_NEW_RELEASES);
      return;
    }

    setIsSearching(true);
    const results = await musicStreamingService.searchTracks(query);
    
    // Add full-length search capability
    const enhanced = results.map(t => ({
      ...t,
      youtubeId: t.youtubeId || undefined
    }));

    setSearchResults(enhanced);
    setIsSearching(false);
  };

  const handleSelectCategory = (cat: 'trending' | 'bollywood' | 'pop' | 'acoustic') => {
    setActiveCategory(cat);
    audioEngine.playSfx('click');

    let term = '';
    if (cat === 'trending') term = 'Latest Hits 2024';
    else if (cat === 'bollywood') term = 'Arijit Singh Romance';
    else if (cat === 'pop') term = 'Top Pop Songs';
    else if (cat === 'acoustic') term = 'Acoustic Chill Coffee';

    handleSearch(term);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeTrack = playerState.currentTrack || searchResults[0] || CURATED_NEW_RELEASES[0];

  // Derived YouTube embed URL for full 100% song length (no 30s limit!)
  const youtubeEmbedUrl = activeTrack.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${activeTrack.youtubeId}?autoplay=1&enablejsapi=1&playsinline=1`
    : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(activeTrack.title + ' ' + activeTrack.artist + ' full song')}&autoplay=1&playsinline=1`;

  const youtubeDirectLink = activeTrack.youtubeId
    ? `https://www.youtube.com/watch?v=${activeTrack.youtubeId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(activeTrack.title + ' ' + activeTrack.artist + ' full song')}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-32 text-stone-900">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">

        {/* 1. TOP HEADER & BACK NAVIGATION */}
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

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
              <span>100% FULL-LENGTH SONGS</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-stone-900">
              Music Lounge 🎵✨
            </h1>
          </div>

          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Mode Selector Pill (Full Song Video / Audio Only) */}
        <div className="flex p-1 bg-stone-200/70 rounded-2xl gap-1">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setPlayMode('youtube');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              playMode === 'youtube'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>Full Song Video (No 30s Limit)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setPlayMode('audio');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              playMode === 'audio'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Disc3 className="w-4 h-4" />
            <span>Acoustic Lofi Stream</span>
          </button>
        </div>

        {/* 2. SEARCH BAR (Search Any Full-Length Song) */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search any full song, artist (Arijit, Diljit, Kesariya, Taylor Swift...)"
            className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm font-medium shadow-xs outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Genre Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'trending', label: '🔥 Bollywood Hits (Full)' },
            { id: 'bollywood', label: '🌸 Arijit Singh Romance' },
            { id: 'acoustic', label: '☕ Chai & Acoustic' },
            { id: 'pop', label: '✨ Pop Anthems' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-display font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. HERO FULL-LENGTH MUSIC PLAYER */}
        <div className="bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-white border border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
          
          {playMode === 'youtube' ? (
            /* FULL-LENGTH YOUTUBE STREAM (Complete 3 to 5+ minute song!) */
            <div className="space-y-3">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-stone-950 border border-stone-800">
                <iframe
                  src={youtubeEmbedUrl}
                  title={activeTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-emerald-600 text-white text-[9px] font-display font-black px-2 py-0.5 rounded-full">
                      100% FULL SONG
                    </span>
                    <span className="text-[11px] font-bold text-stone-500">
                      {Math.floor(activeTrack.durationMs / 60000)}:{Math.floor((activeTrack.durationMs % 60000) / 1000).toString().padStart(2, '0')} mins
                    </span>
                  </div>
                  <h2 className="font-display font-black text-base sm:text-lg text-stone-900 truncate mt-0.5">
                    {activeTrack.title}
                  </h2>
                  <p className="text-xs text-stone-600 font-semibold truncate">
                    {activeTrack.artist} • {activeTrack.album}
                  </p>
                </div>

                <a
                  href={youtubeDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-rose-50 border border-stone-300 rounded-xl text-stone-700 hover:text-rose-600 text-xs font-bold flex items-center gap-1 shadow-xs transition-colors shrink-0"
                  title="Open full track in YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>
          ) : (
            /* ACOUSTIC AUDIO STREAM CONTROLS */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0">
                  <img src={activeTrack.artworkUrl} alt={activeTrack.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <span className="text-[10px] font-display font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    {activeTrack.genre}
                  </span>
                  <h2 className="font-display font-black text-base sm:text-lg text-stone-900 truncate mt-1">
                    {activeTrack.title}
                  </h2>
                  <p className="text-xs text-stone-600 font-semibold truncate">
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={playerState.duration || 240}
                  value={playerState.currentTime}
                  onChange={(e) => musicStreamingService.seek(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono font-bold">
                  <span>{formatTime(playerState.currentTime)}</span>
                  <span>{formatTime(playerState.duration || 240)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => musicStreamingService.playPrev()}
                  className="p-2 text-stone-700 hover:text-stone-900 rounded-full cursor-pointer"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => musicStreamingService.togglePlayPause()}
                  className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  {playerState.isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>
                <button
                  onClick={() => musicStreamingService.playNext()}
                  className="p-2 text-stone-700 hover:text-stone-900 rounded-full cursor-pointer"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* 4. TRACKS FEED / FULL-LENGTH SONGS PLAYLIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xs uppercase text-stone-700 tracking-wider">
              {searchQuery ? `Search Results (${searchResults.length})` : 'Full-Length Comfort Songs (3–5 mins):'}
            </h3>
            {isSearching && (
              <span className="text-[11px] text-rose-600 font-bold animate-pulse flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Searching...</span>
              </span>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-8 text-center space-y-2">
              <Music2 className="w-8 h-8 mx-auto text-stone-400" />
              <p className="font-display font-bold text-xs text-stone-700">No songs found for "{searchQuery}"</p>
              <p className="font-handwritten text-xs text-stone-500">Try searching for "Arijit Singh", "Diljit", or "Kesariya"</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {searchResults.map((track) => {
                const isCurrent = activeTrack.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      audioEngine.playSfx('click');
                      musicStreamingService.playTrack(track, searchResults);
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-rose-50/90 border-rose-300 shadow-xs ring-1 ring-rose-200'
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className={`font-display font-black text-xs truncate ${isCurrent ? 'text-rose-900' : 'text-stone-900'}`}>
                            {track.title}
                          </h4>
                          <span className="bg-stone-100 text-stone-600 text-[9px] font-bold px-1.5 py-0.2 rounded-md shrink-0">
                            {Math.floor(track.durationMs / 60000)}:{Math.floor((track.durationMs % 60000) / 1000).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-stone-500 truncate">
                          {track.artist}
                        </p>
                        <span className="text-[9px] font-handwritten text-rose-600 font-bold truncate">
                          100% Full Song 🎧
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          musicStreamingService.playTrack(track, searchResults);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-display font-black uppercase flex items-center gap-1 transition-all shadow-2xs ${
                          isCurrent
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-100 hover:bg-rose-100 text-stone-800'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Play Full</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

