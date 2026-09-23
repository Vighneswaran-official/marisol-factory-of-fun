import React, { useState } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Flame, Volume2, VolumeX, BookOpen, Lock, MessageSquareHeart } from 'lucide-react';
import { authService } from '../services/authService';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
  onOpenGoogleSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenInstallApp, onOpenGoogleSignIn }) => {
  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();
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
                onNavigate('batch_wall');
              }}
              title="Batch MLP41PT Daily Life & Wall"
              className={`p-2 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1 ${
                currentScreen === 'batch_wall' ? 'bg-purple-700 text-white' : 'bg-white text-ink hover:bg-paper-100'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4 text-purple-700" />
              <span className="font-handwritten text-xs font-black hidden md:inline">WALL</span>
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

            {/* Google Sign In / Profile Avatar */}
            {onOpenGoogleSignIn && (
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenGoogleSignIn();
                }}
                className={`p-1.5 rounded-xl border-2 border-ink shadow-sketch transition-all flex items-center gap-1.5 ${
                  isAuthenticated ? 'bg-white hover:bg-emerald-50' : 'bg-white hover:bg-purple-50'
                }`}
                title={isAuthenticated && currentUser ? `Signed in with Google as ${currentUser.name}` : "Sign in with Google"}
              >
                {isAuthenticated && currentUser ? (
                  <div className="w-5 h-5 rounded-md overflow-hidden border border-ink/40">
                    <img src={currentUser.avatarUrl} alt="Google User" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                )}
                <span className="font-display font-black text-xs hidden lg:inline">
                  {isAuthenticated && currentUser ? currentUser.name.split(' ')[0] : 'SIGN IN'}
                </span>
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
