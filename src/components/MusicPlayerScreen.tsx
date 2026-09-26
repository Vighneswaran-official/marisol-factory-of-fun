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
  Radio, RefreshCw, Headphones
} from 'lucide-react';
import type { ScreenState } from '../types/game';

interface MusicPlayerScreenProps {
  onNavigate?: (screen: ScreenState) => void;
}

export const MusicPlayerScreen: React.FC<MusicPlayerScreenProps> = ({ onNavigate: _onNavigate }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(musicStreamingService.getState());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>(CURATED_NEW_RELEASES);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'trending' | 'bollywood' | 'pop' | 'acoustic'>('trending');

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
    setSearchResults(results);
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-3 sm:p-6 pb-32 text-stone-900">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">

        {/* 1. TOP HEADER */}
        <div className="border-b border-stone-200/80 pb-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-display font-black text-rose-600 uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 animate-pulse text-rose-500" />
            <span>PURE AUDIO STREAMER</span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-black text-stone-900">
            Comfort Audio Lounge 🎵✨
          </h1>
        </div>

        {/* 2. SEARCH BAR (Connects to Internet Music Search) */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search any song, artist (Arijit, Diljit, Kesariya, Taylor Swift...)"
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
            { id: 'trending', label: '🔥 Bollywood Hits' },
            { id: 'bollywood', label: '🌸 Arijit Singh Romance' },
            { id: 'acoustic', label: '☕ Chai & Acoustic' },
            { id: 'pop', label: '✨ Pop Hits' },
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

        {/* 3. HERO NOW-PLAYING PURE AUDIO CARD (Equalizer, Rotating Vinyl, Scrubber, Controls) */}
        <div className="bg-gradient-to-b from-rose-50/80 via-pink-50/50 to-white border border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            
            {/* Album Artwork with Vinyl Rotation */}
            <div className="relative group shrink-0">
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white transition-all ${
                playerState.isPlaying ? 'ring-4 ring-rose-200' : ''
              }`}>
                <img
                  src={activeTrack.artworkUrl}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vinyl Badge */}
              <div className={`absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center border-2 border-white shadow-xs ${
                playerState.isPlaying ? 'animate-spin-slow' : ''
              }`}>
                <Disc3 className="w-5 h-5 text-rose-400" />
              </div>
            </div>

            {/* Track Info & Equalizer */}
            <div className="text-center sm:text-left flex-1 min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-display font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{activeTrack.genre} • {activeTrack.releaseYear}</span>
              </div>

              <h2 className="font-display font-black text-lg sm:text-xl text-stone-900 truncate">
                {activeTrack.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 font-semibold truncate">
                {activeTrack.artist}
              </p>
              <p className="text-[11px] text-stone-400 truncate">
                {activeTrack.album}
              </p>

              {/* Animated Audio Equalizer Bars when playing */}
              {playerState.isPlaying && (
                <div className="flex items-end justify-center sm:justify-start gap-1 h-4 pt-1">
                  <span className="w-1 bg-rose-500 rounded-full animate-pulse h-3" />
                  <span className="w-1 bg-pink-500 rounded-full animate-pulse h-4" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-purple-500 rounded-full animate-pulse h-2" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 bg-rose-400 rounded-full animate-pulse h-4" style={{ animationDelay: '450ms' }} />
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar Scrubber */}
          <div className="space-y-1 pt-1">
            <input
              type="range"
              min="0"
              max={playerState.duration || 260}
              value={playerState.currentTime}
              onChange={(e) => musicStreamingService.seek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono font-bold">
              <span>{formatTime(playerState.currentTime)}</span>
              <span>{formatTime(playerState.duration || (activeTrack.durationMs ? activeTrack.durationMs / 1000 : 260))}</span>
            </div>
          </div>

          {/* Playback Controls (Prev, Play/Pause, Next, Volume) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => musicStreamingService.setVolume(playerState.volume === 0 ? 0.85 : 0)}
                className="p-2 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                {playerState.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={playerState.volume}
                onChange={(e) => musicStreamingService.setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-700 hidden sm:inline"
              />
            </div>

            {/* Main Center Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  musicStreamingService.playPrev();
                }}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-white/80 transition-transform active:scale-95 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('pop');
                  musicStreamingService.togglePlayPause();
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
                title={playerState.isPlaying ? 'Pause' : 'Play'}
              >
                {playerState.isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  musicStreamingService.playNext();
                }}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-white/80 transition-transform active:scale-95 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs text-rose-600 font-handwritten font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
              <span>Pure Audio Stream</span>
            </span>
          </div>
        </div>

        {/* 4. TRACKS FEED / CURATED COMFORT PLAYLIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xs uppercase text-stone-700 tracking-wider">
              {searchQuery ? `Search Results (${searchResults.length})` : 'Curated Comfort Playlist:'}
            </h3>
            {isSearching && (
              <span className="text-[11px] text-rose-600 font-bold animate-pulse flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Searching audio...</span>
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
                const isCurrent = playerState.currentTrack?.id === track.id;
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
                        {isCurrent && playerState.isPlaying && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className={`font-display font-black text-xs truncate ${isCurrent ? 'text-rose-900' : 'text-stone-900'}`}>
                          {track.title}
                        </h4>
                        <p className="font-sans text-[11px] text-stone-500 truncate">
                          {track.artist}
                        </p>
                        <span className="text-[9px] font-handwritten text-stone-400 truncate">
                          {track.album}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCurrent) {
                            musicStreamingService.togglePlayPause();
                          } else {
                            musicStreamingService.playTrack(track, searchResults);
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                          isCurrent && playerState.isPlaying
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-rose-100 text-stone-800'
                        }`}
                      >
                        {isCurrent && playerState.isPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-stone-800 ml-0.5" />
                        )}
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


