import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { HINDI_SONGS, type HindiSong } from '../data/hindiSongs';
import { X, Sparkles, ExternalLink, SkipForward, SkipBack, Music2, Heart } from 'lucide-react';

interface MusicJukeboxModalProps {
  onClose: () => void;
  initialSongId?: string;
}

export const MusicJukeboxModal: React.FC<MusicJukeboxModalProps> = ({ onClose, initialSongId }) => {
  const [selectedSong, setSelectedSong] = useState<HindiSong>(() => {
    return HINDI_SONGS.find(s => s.id === initialSongId) || HINDI_SONGS[0];
  });
  const [isPlaying, setIsPlaying] = useState(true);

  // When opening a Hindi song, ensure any background synth audio is stopped
  React.useEffect(() => {
    audioEngine.stopMusic();
  }, []);

  const handleSelectSong = (song: HindiSong) => {
    audioEngine.playSfx('click');
    audioEngine.stopMusic();
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    audioEngine.playSfx('click');
    const idx = HINDI_SONGS.findIndex(s => s.id === selectedSong.id);
    const nextSong = HINDI_SONGS[(idx + 1) % HINDI_SONGS.length];
    setSelectedSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    audioEngine.playSfx('click');
    const idx = HINDI_SONGS.findIndex(s => s.id === selectedSong.id);
    const prevSong = HINDI_SONGS[(idx - 1 + HINDI_SONGS.length) % HINDI_SONGS.length];
    setSelectedSong(prevSong);
    setIsPlaying(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <Music2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  KRITIKA'S HINDI JUKEBOX 🎵
                </h2>
                <span className="bg-purple-100 text-purple-800 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-purple-400">
                  BOLLYWOOD
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                Feel-good Hindi songs for energy, chai moments & boss-girl vibes!
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

        {/* Embedded YouTube Music / Video Player */}
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
            <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 to-slate-900 text-white p-4 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/40 overflow-hidden bg-white mb-2">
                <img 
                  src="/marisol/avatars/11_music_mood.png" 
                  alt="Kritika headphones" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="font-display font-black text-lg">{selectedSong.title}</p>
              <p className="font-handwritten text-sm text-purple-200">Tap below to play</p>
            </div>
          )}

          {/* Player Banner Bar */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border-t-2 border-ink flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{selectedSong.emoji}</span>
                <span className="font-display font-black text-sm sm:text-base text-white truncate">
                  {selectedSong.title}
                </span>
                <span className="bg-white/20 text-white font-handwritten text-[10px] px-2 py-0.5 rounded-full shrink-0">
                  {selectedSong.movie}
                </span>
              </div>
              <p className="font-handwritten text-xs text-purple-200 truncate mt-0.5">
                🎤 {selectedSong.singers}
              </p>
            </div>

            {/* Transport & External Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                title="Previous Hindi Song"
              >
                <SkipBack className="w-4 h-4 fill-white" />
              </button>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                title="Next Hindi Song"
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

        {/* Song Lyrics & Movie Quote Ribbon */}
        <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-3.5 space-y-1 text-left shadow-sketch-xs">
          <div className="flex items-center justify-between text-purple-900 font-display font-black text-xs">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>LYRICS HIGHLIGHT</span>
            </span>
            <span className="font-handwritten text-[11px] text-purple-700 font-bold">
              {selectedSong.vibe}
            </span>
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold italic">
            "{selectedSong.lyricsHighlight}"
          </p>
          <p className="font-sans text-[11px] text-purple-700 font-semibold pt-0.5">
            🎬 {selectedSong.movieQuote}
          </p>
        </div>

        {/* Playlist of 6 Hindi Songs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>SELECT A HINDI SONG</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            </h4>
            <span className="font-handwritten text-xs font-bold text-ink-light">
              6 Curated Bollywood Hits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HINDI_SONGS.map((song) => {
              const isCurrent = song.id === selectedSong.id;
              return (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`
                    p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 relative
                    ${
                      isCurrent
                        ? 'border-ink bg-white shadow-sketch ring-2 ring-purple-500'
                        : 'border-ink/20 bg-white hover:border-ink/60 hover:bg-paper-100 hover:shadow-sketch-xs'
                    }
                  `}
                >
                  {/* Song Icon / Emoji */}
                  <div 
                    className="w-10 h-10 rounded-xl border-1.5 border-ink flex items-center justify-center text-lg shadow-inner shrink-0"
                    style={{ backgroundColor: `${song.accentColor}25` }}
                  >
                    <span>{song.emoji}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {song.title}
                    </div>
                    <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {song.movie} ({song.year})
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="shrink-0 flex items-center gap-1 bg-purple-600 text-white font-handwritten text-[9px] font-bold px-2 py-0.5 rounded-full border border-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>PLAYING</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="bg-gradient-to-r from-amber-50 to-pink-50 border-1.5 border-ink/30 rounded-2xl p-3 flex items-center gap-3">
          <img 
            src="/marisol/avatars/11_music_mood.png" 
            alt="Kritika with headphones" 
            className="w-10 h-10 rounded-full border-2 border-ink bg-white shrink-0"
          />
          <div className="font-handwritten text-xs text-ink font-bold leading-relaxed">
            "Bollywood music + delicious food = pure happiness! Sing along, queen!" ♡
          </div>
        </div>

      </div>
    </div>
  );
};
