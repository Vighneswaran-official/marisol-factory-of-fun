import React, { useState, useEffect } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Flame, ArrowLeft, Menu, X, Sparkles, Volume2, UserCheck, CheckCircle2
} from 'lucide-react';
import { authService } from '../services/authService';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
  onOpenGoogleSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenGoogleSignIn }) => {
  const [, setAuthTick] = useState(0);

  useEffect(() => {
    return authService.subscribe(() => {
      setAuthTick(t => t + 1);
    });
  }, []);

  const player = gameState.getPlayer();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();
  const [audioState, setAudioState] = useState<AudioSettings>(audioEngine.getSettings());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 px-2 sm:px-6 py-2 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
          
          {/* Left: Custom Logo or Back Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {currentScreen !== 'home' ? (
              <button 
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="py-1 px-2.5 sm:py-1.5 sm:px-3 bg-white border border-stone-200 rounded-xl flex items-center gap-1 shadow-xs text-xs sm:text-sm font-display font-black text-stone-800 hover:bg-stone-50 transition-all cursor-pointer shrink-0"
                title="Return to Home Screen"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>HOME</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="flex items-center gap-1.5 sm:gap-2.5 group text-left cursor-pointer min-w-0"
              >
                {/* Custom Brand Crown Logo Badge */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-white rounded-[13px] sm:rounded-[14px] flex items-center justify-center relative overflow-hidden">
                    <span className="text-sm sm:text-lg">👑</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full flex items-center justify-center shadow-2xs">
                    <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white fill-white" />
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <h1 className="font-display font-black text-sm sm:text-base tracking-tight leading-none text-stone-900 group-hover:text-rose-600 transition-colors">
                      MARISOL
                    </h1>
                    <span className="text-rose-500 font-black text-[10px] sm:text-xs">✨</span>
                  </div>
                  <p className="font-display text-[8px] sm:text-[9px] text-rose-700 font-extrabold tracking-wider uppercase -mt-0.5 truncate hidden min-[360px]:block">
                    FACTORY OF FUN
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Right: Core Stats & Menu Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Macaronis Score */}
            <div 
              className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 rounded-xl shadow-2xs text-xs font-black shrink-0"
              title={`${player.cucumberSandwiches || 0} Macaronis`}
            >
              <span>🧀</span>
              <span>{player.cucumberSandwiches || 0}</span>
            </div>

            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2 py-1 rounded-xl shadow-xs text-xs font-bold shrink-0"
              title={`${player.streak} Day Streak`}
            >
              <Flame className="w-3 h-3 fill-white animate-bounce-gentle" />
              <span>{player.streak}</span>
            </div>

            {/* Account Profile / Login Button */}
            {onOpenGoogleSignIn && (
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenGoogleSignIn();
                }}
                className="flex p-1.5 px-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 shadow-xs transition-all items-center gap-1 cursor-pointer shrink-0"
                title={isAuthenticated && currentUser ? `Signed in as ${currentUser.name}` : "Account Sign In"}
              >
                {isAuthenticated && currentUser ? (
                  <span className="text-emerald-700 flex items-center gap-1 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="max-w-[60px] truncate hidden md:inline">{currentUser.name.split(' ')[0]}</span>
                  </span>
                ) : (
                  <span className="text-blue-700 flex items-center gap-1 text-xs font-bold">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">LOGIN</span>
                  </span>
                )}
              </button>
            )}

            {/* Responsive Main Menu Button (☰ MENU) */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setIsMenuOpen(true);
              }}
              className="py-1.5 px-2 sm:px-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl flex items-center gap-1 text-xs font-display font-black shadow-xs transition-all cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden min-[400px]:inline">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Drawer Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-sm bg-[#FAF8F5] border-l border-stone-300 h-full overflow-y-auto p-4 sm:p-6 shadow-xl flex flex-col justify-between animate-slide-left space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-sm shadow-xs">
                    👑
                  </div>
                  <div>
                    <h2 className="font-display font-black text-sm text-stone-900">MARISOL FACTORY</h2>
                    <p className="font-handwritten text-xs text-rose-700 font-bold">Comfort & Fun Hub</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 shadow-2xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Menu Links */}
              <div className="mt-4 space-y-2">
                {[
                  { screen: 'home' as ScreenState, label: 'Home & Video', emoji: '🏠', desc: 'Hero video, live mood check-in & comfort' },
                  { screen: 'music' as ScreenState, label: 'Music Streamer', emoji: '🎵', desc: 'Search and play songs across the internet' },
                  { screen: 'quiz' as ScreenState, label: 'Food & Movie Quiz', emoji: '🎯', desc: 'Play trivia & earn Macaroni dishes' },
                  { screen: 'batch_wall' as ScreenState, label: 'Batch Chat & Wall', emoji: '💬', desc: 'Live group chat & bulletin corkboard' },
                ].map(item => {
                  const isActive = currentScreen === item.screen;
                  return (
                    <button
                      key={item.screen}
                      onClick={() => handleMenuNavigate(item.screen)}
                      className={`w-full p-3 rounded-2xl border transition-all flex items-center gap-3 text-left cursor-pointer ${
                        isActive
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm font-bold'
                          : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800 shadow-2xs'
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-black text-xs sm:text-sm">{item.label}</div>
                        <div className={`text-[10px] font-handwritten truncate ${isActive ? 'text-rose-200' : 'text-stone-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tactile Audio Settings Controls inside Menu */}
              <div className="mt-4 p-3 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                <div className="font-display font-black text-xs text-stone-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>AUDIO SYSTEM</span>
                  </span>
                </div>
                <div>
                  <button
                    onClick={toggleSfx}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      audioState.sfxOn ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <span>Keyboard / Tap Clicks:</span>
                    <span className="font-black">{audioState.sfxOn ? 'ON 🔔' : 'MUTED'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-3 border-t border-stone-200 text-center">
              <span className="text-[11px] font-handwritten font-bold text-stone-500">
                Kritika's Comfort Space • Batch MLP41PT 👑
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
