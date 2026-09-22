import React, { useEffect, useState } from 'react';
import { audioEngine, MUSIC_TRACKS, type MusicTrack } from '../services/synthAudioEngine';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Sparkles, Music2, Disc } from 'lucide-react';

interface MusicJukeboxModalProps {
  onClose: () => void;
}

export const MusicJukeboxModal: React.FC<MusicJukeboxModalProps> = ({ onClose }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Subscribe to audioEngine updates
    const unsubscribe = audioEngine.subscribe(() => {
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  const isPlaying = audioEngine.getIsPlaying();
  const currentTrack = audioEngine.getCurrentTrack();
  const settings = audioEngine.getSettings();

  const handleTrackSelect = (track: MusicTrack) => {
    audioEngine.playSfx('click');
    audioEngine.playTrack(track.id);
  };

  const togglePlay = () => {
    audioEngine.playSfx('click');
    audioEngine.togglePlayPause();
  };

  const handleNext = () => {
    audioEngine.playSfx('click');
    audioEngine.nextTrack();
  };

  const handlePrev = () => {
    audioEngine.playSfx('click');
    audioEngine.prevTrack();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-5 relative"
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
                  KRITIKA'S MOOD JUKEBOX 🎧
                </h2>
                <span className="bg-purple-100 text-purple-800 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-purple-400">
                  LOUNGE
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                "Good Music Brighter Mood ♡" — Hand-crafted synthesized vibes
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

        {/* Vinyl Player Showcase */}
        <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white border-2.5 border-ink rounded-3xl p-5 shadow-sketch relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div 
            className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: currentTrack.color }}
          />

          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
            
            {/* Spinning Vinyl Record */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div 
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-700 bg-black flex items-center justify-center shadow-2xl relative ${isPlaying ? 'animate-spin' : ''}`}
                style={{ animationDuration: '6s' }}
              >
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-slate-800" />
                <div className="absolute inset-4 rounded-full border border-slate-800/80" />
                <div className="absolute inset-6 rounded-full border border-slate-800/60" />

                {/* Center Label featuring Kritika Sticker 11 */}
                <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-purple-200 shadow-inner">
                  <img 
                    src="/marisol/avatars/11_music_mood.png" 
                    alt="Kritika Music Vibe"
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* Tonearm / Needle Indicator */}
              <Disc className="absolute -bottom-1 -right-1 w-6 h-6 text-purple-300 drop-shadow" />
            </div>

            {/* Currently Playing Info & Visualizer */}
            <div className="flex-1 text-center sm:text-left space-y-2 min-w-0 w-full">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-handwritten font-bold tracking-wider uppercase">
                <span>{currentTrack.emoji}</span>
                <span>{currentTrack.genre}</span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl truncate text-white">
                {currentTrack.title}
              </h3>

              <p className="font-handwritten text-xs text-purple-200 line-clamp-2">
                "{currentTrack.tagline}"
              </p>

              {/* Dancing Equalizer Bars */}
              <div className="flex items-end gap-1.5 h-6 justify-center sm:justify-start pt-1">
                {[40, 85, 60, 100, 75, 90, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: currentTrack.color,
                      height: isPlaying ? `${Math.max(15, (h * (0.4 + (i % 3) * 0.3)))}%` : '20%',
                      animation: isPlaying ? `bounce 0.${5 + (i % 4)}s infinite alternate ease-in-out` : 'none'
                    }}
                  />
                ))}
                <span className="font-handwritten text-[10px] text-purple-300 ml-2 font-bold">
                  {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
                </span>
              </div>
            </div>
          </div>

          {/* Master Transport Controls */}
          <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
            
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 fill-white" />
              </button>

              <button
                onClick={togglePlay}
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-display font-black text-sm flex items-center gap-2 border-2 border-white/40 shadow-lg active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>PLAY</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-transform active:scale-95"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 fill-white" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioEngine.updateSettings({ musicOn: !settings.musicOn });
                }}
                className="text-white/80 hover:text-white"
              >
                {settings.musicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicOn ? settings.musicVolume : 0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  audioEngine.updateSettings({ musicVolume: val, musicOn: val > 0 });
                }}
                className="w-16 sm:w-20 accent-pink-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 6 Curated Mood Tracks Playlist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>SELECT MOOD TRACK</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            </h4>
            <span className="font-handwritten text-xs font-bold text-ink-light">
              6 Hand-Tuned Melodies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MUSIC_TRACKS.map((track) => {
              const isCurrent = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`
                    p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-3 relative
                    ${
                      isCurrent
                        ? 'border-ink bg-white shadow-sketch ring-2 ring-purple-500'
                        : 'border-ink/20 bg-white hover:border-ink/60 hover:bg-paper-100 hover:shadow-sketch-xs'
                    }
                  `}
                >
                  {/* Track Icon / Emoji */}
                  <div 
                    className="w-10 h-10 rounded-xl border-1.5 border-ink flex items-center justify-center text-lg shadow-inner shrink-0"
                    style={{ backgroundColor: `${track.color}25` }}
                  >
                    <span>{track.emoji}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {track.title}
                    </div>
                    <div className="font-handwritten text-[11px] text-ink-light font-bold truncate">
                      {track.vibe}
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="shrink-0 flex items-center gap-1 bg-purple-600 text-white font-handwritten text-[9px] font-bold px-2 py-0.5 rounded-full border border-ink">
                      {isPlaying ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>PLAYING</span>
                        </>
                      ) : (
                        <span>SELECTED</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kritika Sticker Quote Footer */}
        <div className="bg-purple-50/80 border-1.5 border-purple-300 rounded-2xl p-3 flex items-center gap-3">
          <img 
            src="/marisol/avatars/11_music_mood.png" 
            alt="Kritika with headphones" 
            className="w-10 h-10 rounded-full border-2 border-ink bg-white shrink-0"
          />
          <div className="font-handwritten text-xs text-purple-900 font-bold leading-relaxed">
            "When words fail, music speaks. When trivia gets intense, turn up the beats!" ♡
          </div>
        </div>
      </div>
    </div>
  );
};
