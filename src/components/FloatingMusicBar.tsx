import React, { useState, useEffect } from 'react';
import { musicStreamingService, type PlayerState } from '../services/musicStreamingService';
import { Play, Pause, Disc3, SkipForward } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

interface FloatingMusicBarProps {
  onOpenMusicScreen: () => void;
}

export const FloatingMusicBar: React.FC<FloatingMusicBarProps> = ({ onOpenMusicScreen }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(musicStreamingService.getState());

  useEffect(() => {
    const unsub = musicStreamingService.subscribe(s => setPlayerState(s));
    return () => {
      unsub();
    };
  }, []);


  if (!playerState.currentTrack) return null;

  const track = playerState.currentTrack;

  return (
    <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-sm z-30 animate-slide-up">
      <div 
        onClick={onOpenMusicScreen}
        className="bg-stone-900/95 backdrop-blur-md text-white border border-stone-700/80 rounded-2xl p-2.5 px-3.5 shadow-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-900 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
            <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
            {playerState.isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Disc3 className="w-4 h-4 text-rose-400 animate-spin-slow" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h5 className="font-display font-black text-xs text-white truncate">
              {track.title}
            </h5>
            <p className="font-sans text-[11px] text-stone-400 truncate">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              audioEngine.playSfx('pop');
              musicStreamingService.togglePlayPause();
            }}
            className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            {playerState.isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => {
              audioEngine.playSfx('click');
              musicStreamingService.playNext();
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
