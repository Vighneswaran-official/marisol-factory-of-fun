import React, { useState } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Flame, Volume2, VolumeX, BookOpen, Lock } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenInstallApp }) => {
  const player = gameState.getPlayer();
  const [audioState, setAudioState] = useState<AudioSettings>(audioEngine.getSettings());
  const [showAudioModal, setShowAudioModal] = useState(false);

  const toggleMusic = () => {
    const next = !audioState.musicOn;
    audioEngine.updateSettings({ musicOn: next });
    setAudioState(audioEngine.getSettings());
    if (next) {
      audioEngine.startMusic('menu');
    }
  };

  const toggleSfx = () => {
    const next = !audioState.sfxOn;
    audioEngine.updateSettings({ sfxOn: next });
    setAudioState(audioEngine.getSettings());
    if (next) {
      audioEngine.playSfx('click');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b-2.5 border-ink px-4 py-2.5 shadow-paper">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Title */}
        <button 
          onClick={() => {
            audioEngine.playSfx('click');
            onNavigate('home');
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-9 h-9 rounded-full border-2 border-ink bg-coral-500 overflow-hidden shadow-sketch flex items-center justify-center">
            <span className="font-handwritten text-white text-lg font-bold">M</span>
          </div>
          <div>
            <h1 className="font-display font-black text-lg sm:text-xl tracking-tight leading-none text-ink group-hover:text-plum-700 transition-colors">
              MARISOL
            </h1>
            <p className="font-handwritten text-xs text-ink-light font-bold -mt-0.5">
              FACTORY OF FUN
            </p>
          </div>
        </button>

        {/* Stats Pill (Chef Title, Sandwiches, Streak) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Chef Title Badge */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-sketch text-xs font-bold text-plum-700">
            <span className="truncate max-w-[130px] sm:max-w-none">
              {player.chefTitle || 'Apprentice Chopper 🥒'}
            </span>
          </div>

          {/* Cucumber Sandwiches Currency / Score */}
          <div 
            className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border-2 border-ink px-2.5 sm:px-3 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-black"
            title={`${player.cucumberSandwiches || 0} Cucumber Sandwiches`}
          >
            <span>🥪</span>
            <span>{player.cucumberSandwiches || 0}</span>
            <span className="hidden sm:inline font-handwritten text-xs font-bold text-emerald-700">Sandwiches</span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 bg-coral-500 text-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-bold">
            <Flame className="w-4 h-4 fill-white animate-bounce-gentle" />
            <span>{player.streak}</span>
          </div>

          {/* Navigation Dropdown / Buttons */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('recipes');
              }}
              title="Kritika's Recipe Vault"
              className={`p-2 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1 ${
                currentScreen === 'recipes' ? 'bg-emerald-600 text-white' : 'bg-white text-ink hover:bg-paper-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span className="font-handwritten text-xs font-black hidden lg:inline">RECIPES</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('stickers');
              }}
              title="Kritika's 11 Mood Stickers"
              className={`p-2 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1 ${
                currentScreen === 'stickers' ? 'bg-coral-500 text-white' : 'bg-white text-ink hover:bg-paper-100'
              }`}
            >
              <span className="text-xs">✨</span>
              <span className="font-handwritten text-xs font-black hidden md:inline">11 MOODS</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('secret_classroom');
              }}
              title="Secret Classroom (Teacher Tribute)"
              className="p-2 rounded-xl border-2 border-ink bg-purple-600 text-white shadow-sketch hover:bg-purple-700 transition-all"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setShowAudioModal(!showAudioModal);
              }}
              className="p-2 rounded-xl border-2 border-ink bg-white text-ink shadow-sketch hover:bg-paper-100 transition-all"
              title="Audio Settings"
            >
              {audioState.musicOn || audioState.sfxOn ? (
                <Volume2 className="w-4 h-4 text-plum-700" />
              ) : (
                <VolumeX className="w-4 h-4 text-coral-500" />
              )}
            </button>

            {/* Install / Download App Button */}
            {onOpenInstallApp && (
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp();
                }}
                className="px-2.5 py-1.5 rounded-xl border-2 border-ink bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-sketch hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-display font-black"
                title="Download Marisol App on Android & iOS"
              >
                <span>📲</span>
                <span className="hidden sm:inline">INSTALL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Audio Settings Dropdown Modal */}
      {showAudioModal && (
        <div className="absolute right-4 top-16 z-50 w-64 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg animate-wiggle">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display font-bold text-ink">80s Synth Sound System</h3>
            <button 
              onClick={() => setShowAudioModal(false)}
              className="font-handwritten text-lg font-bold text-ink-light hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 font-sans text-sm">
            <div className="flex items-center justify-between bg-paper-50 p-2.5 rounded-xl border-1.5 border-ink">
              <span className="font-semibold text-ink">80s Synth Music</span>
              <button 
                onClick={toggleMusic}
                className={`px-3 py-1 rounded-lg border-2 border-ink font-bold text-xs shadow-sketch ${
                  audioState.musicOn ? 'bg-doodleTeal text-white' : 'bg-paper-200 text-ink-light'
                }`}
              >
                {audioState.musicOn ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between bg-paper-50 p-2.5 rounded-xl border-1.5 border-ink">
              <span className="font-semibold text-ink">Sound Effects</span>
              <button 
                onClick={toggleSfx}
                className={`px-3 py-1 rounded-lg border-2 border-ink font-bold text-xs shadow-sketch ${
                  audioState.sfxOn ? 'bg-doodleTeal text-white' : 'bg-paper-200 text-ink-light'
                }`}
              >
                {audioState.sfxOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
