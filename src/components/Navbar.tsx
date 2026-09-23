import React, { useState } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Flame, Volume2, ArrowLeft, Menu, X, Globe, Download
} from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleMenuNavigate = (screen: ScreenState) => {
    audioEngine.playSfx('click');
    setIsMenuOpen(false);
    onNavigate(screen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b-2.5 border-ink px-3 sm:px-6 py-2.5 shadow-paper">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Back Button or Brand Title */}
          <div className="flex items-center gap-2">
            {currentScreen !== 'home' ? (
              <button 
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="sketch-btn py-1.5 px-2.5 sm:px-3 bg-white flex items-center gap-1.5 shadow-sketch text-xs sm:text-sm font-display font-black text-ink hover:bg-paper-100 transition-all"
                title="Return to Home Screen"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>HOME</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="flex items-center gap-2 group text-left"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-ink bg-coral-500 overflow-hidden shadow-sketch flex items-center justify-center">
                  <span className="font-handwritten text-white text-base sm:text-lg font-bold">M</span>
                </div>
                <div>
                  <h1 className="font-display font-black text-base sm:text-xl tracking-tight leading-none text-ink group-hover:text-plum-700 transition-colors">
                    MARISOL
                  </h1>
                  <p className="font-handwritten text-[10px] sm:text-xs text-ink-light font-bold -mt-0.5">
                    FACTORY OF FUN
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Center / Right: Core Stats & Menu Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Chef Title Badge (Desktop only) */}
            <div className="hidden lg:flex items-center gap-1 bg-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-sketch text-xs font-bold text-plum-700">
              <span className="truncate max-w-[140px]">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
            </div>

            {/* Cucumber Sandwiches Score */}
            <div 
              className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border-2 border-ink px-2 sm:px-2.5 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-black"
              title={`${player.cucumberSandwiches || 0} Cucumber Sandwiches`}
            >
              <span>🥪</span>
              <span>{player.cucumberSandwiches || 0}</span>
            </div>

            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1 bg-coral-500 text-white border-2 border-ink px-2 sm:px-2.5 py-1 rounded-xl shadow-sketch text-xs sm:text-sm font-bold"
              title={`${player.streak} Day Streak`}
            >
              <Flame className="w-3.5 h-3.5 fill-white animate-bounce-gentle" />
              <span>{player.streak}</span>
            </div>

            {/* Google Sign In / Profile Avatar (Desktop and Mobile) */}
            {onOpenGoogleSignIn && (
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenGoogleSignIn();
                }}
                className={`flex p-1.5 px-2 sm:px-2.5 rounded-xl border-2 border-ink shadow-sketch transition-all items-center gap-1.5 ${
                  isAuthenticated ? 'bg-white hover:bg-emerald-50' : 'bg-white hover:bg-purple-50'
                }`}
                title={isAuthenticated && currentUser ? `Signed in as ${currentUser.name}` : "Mobile Google Sign In"}
              >
                {isAuthenticated && currentUser ? (
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-ink/40 shrink-0">
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span className="font-display font-black text-xs hidden sm:inline">
                  {isAuthenticated && currentUser ? currentUser.name.split(' ')[0] : 'GOOGLE'}
                </span>
              </button>
            )}

            {/* Responsive Main Menu Button (☰ MENU) */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setIsMenuOpen(true);
              }}
              className="sketch-btn-gold py-1.5 px-2.5 sm:px-3 flex items-center gap-1.5 text-xs sm:text-sm font-display font-black shadow-sketch hover:scale-105 active:scale-95 transition-all"
              title="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-Out Drawer Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-sm bg-[#FAF7F0] border-l-3 border-ink h-full overflow-y-auto p-4 sm:p-6 shadow-sketch-xl flex flex-col justify-between animate-slide-left space-y-4"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-ink bg-coral-500 flex items-center justify-center text-white font-handwritten font-bold text-base shadow-sketch">
                    M
                  </div>
                  <div>
                    <h2 className="font-display font-black text-base text-ink">FACTORY OF FUN</h2>
                    <p className="font-handwritten text-xs text-ink-light font-bold">Navigation & Lounges</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-xl border-2 border-ink bg-white hover:bg-paper-100 shadow-sketch-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Student Identity Card in Menu */}
              <div className="mt-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl border border-ink overflow-hidden bg-white shadow-2xs shrink-0 flex items-center justify-center">
                    {isAuthenticated && currentUser ? (
                      <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">👩‍🎓</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-black text-xs text-ink truncate">
                      {isAuthenticated && currentUser ? currentUser.name : (player.nickname || 'Curious Student')}
                    </div>
                    <div className="text-[10px] font-handwritten text-purple-800 font-bold truncate">
                      {currentUser?.email ? currentUser.email : 'Tap below to sync email & name'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenGoogleSignIn?.();
                  }}
                  className="sketch-btn px-2 py-1 text-[11px] font-black uppercase bg-white border border-purple-300 shadow-2xs shrink-0 flex items-center gap-1"
                >
                  {isAuthenticated ? (
                    <span>PROFILE</span>
                  ) : (
                    <>
                      <Globe className="w-3 h-3 text-blue-500" />
                      <span>GOOGLE LOGIN</span>
                    </>
                  )}
                </button>
              </div>

              {/* Navigation Menu Links (3 Core Pillars) */}
              <div className="mt-4 space-y-2">
                {[
                  { screen: 'home' as ScreenState, label: 'Check Her Mood', emoji: '🌸', desc: 'Live mood, daily affirmations & comfort' },
                  { screen: 'quiz' as ScreenState, label: 'Quiz Game', emoji: '🎯', desc: 'Fun trivia questions, streaks & instant scores' },
                  { screen: 'batch_wall' as ScreenState, label: 'Bulletin Chat', emoji: '📌', desc: 'Post notes & reply at your own time' },
                ].map(item => {
                  const isActive = currentScreen === item.screen;
                  return (
                    <button
                      key={item.screen}
                      onClick={() => handleMenuNavigate(item.screen)}
                      className={`w-full p-2.5 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                        isActive
                          ? 'bg-purple-700 text-white border-ink shadow-sketch-xs font-bold'
                          : 'bg-white border-ink/15 hover:border-ink hover:bg-paper-50 text-ink shadow-2xs'
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-black text-xs sm:text-sm">{item.label}</div>
                        <div className={`text-[10px] font-handwritten truncate ${isActive ? 'text-purple-200' : 'text-ink-light'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Audio Settings Quick Controls inside Menu */}
              <div className="mt-4 p-3 bg-white border-2 border-ink rounded-2xl shadow-xs space-y-2">
                <div className="font-display font-black text-xs text-ink flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-purple-700" />
                    <span>SYNTH AUDIO SYSTEM</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={toggleMusic}
                    className={`py-1.5 px-2 rounded-xl border-1.5 border-ink text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 ${
                      audioState.musicOn ? 'bg-doodleTeal text-white' : 'bg-paper-100 text-ink-light'
                    }`}
                  >
                    <span>Music:</span>
                    <span>{audioState.musicOn ? 'ON 🎵' : 'OFF'}</span>
                  </button>
                  <button
                    onClick={toggleSfx}
                    className={`py-1.5 px-2 rounded-xl border-1.5 border-ink text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1 ${
                      audioState.sfxOn ? 'bg-doodleTeal text-white' : 'bg-paper-100 text-ink-light'
                    }`}
                  >
                    <span>SFX:</span>
                    <span>{audioState.sfxOn ? 'ON 🔔' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions: Install App */}
            <div className="pt-2 border-t-2 border-ink/20">
              {onOpenInstallApp && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenInstallApp();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-2xl border-2 border-ink font-display font-black text-xs flex items-center justify-center gap-2 shadow-sketch"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD / INSTALL APP</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
