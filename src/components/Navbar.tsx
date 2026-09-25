import React, { useState, useEffect } from 'react';
import type { ScreenState, AudioSettings } from '../types/game';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ArrowLeft, Menu, X, Volume2, UserCheck, CheckCircle2, Smartphone
} from 'lucide-react';
import { authService } from '../services/authService';

interface NavbarProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenInstallApp?: () => void;
  onOpenGoogleSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenInstallApp, onOpenGoogleSignIn }) => {
  const [, setAuthTick] = useState(0);

  useEffect(() => {
    return authService.subscribe(() => {
      setAuthTick(t => t + 1);
    });
  }, []);

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
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 px-3 sm:px-6 py-2 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Profile Picture in Left Corner + Brand Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Profile Avatar Button on the Far Left Corner */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('pop');
                if (onOpenGoogleSignIn) {
                  onOpenGoogleSignIn();
                } else {
                  onNavigate('batch_wall');
                }
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[2px] bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-xs hover:scale-105 transition-transform cursor-pointer shrink-0"
              title={isAuthenticated && currentUser ? `Signed in as ${currentUser.name} (Click for Profile)` : "Your Profile (Click to Connect)"}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
                <img
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
                  alt={currentUser?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-2xs" />
            </button>

            {/* Logo / Brand Name */}
            <button 
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                onNavigate('home');
              }}
              className="flex items-center gap-1.5 text-left cursor-pointer min-w-0 group"
              title="Return to Home"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h1 className="font-display font-black text-sm sm:text-base tracking-tight leading-none text-stone-900 group-hover:text-rose-600 transition-colors">
                    MARISOL
                  </h1>
                  <span className="text-rose-500 font-black text-xs">✨</span>
                </div>
                <p className="font-display text-[8px] sm:text-[9px] text-rose-700 font-extrabold tracking-wider uppercase -mt-0.5 truncate">
                  FACTORY OF FUN
                </p>
              </div>
            </button>

            {/* Back button indicator when on sub-pages */}
            {currentScreen !== 'home' && (
              <button 
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate('home');
                }}
                className="ml-1 py-1 px-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg flex items-center gap-1 text-[10px] font-display font-bold text-stone-700 transition-colors cursor-pointer shrink-0"
                title="Return to Home"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
          </div>

          {/* Center: Desktop Navigation Links (Visible on md/lg screens) */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 border border-stone-200/80 p-1 rounded-full shadow-2xs">
            {[
              { id: 'home' as ScreenState, label: 'Home', emoji: '🏠' },
              { id: 'music' as ScreenState, label: 'Music', emoji: '🎵' },
              { id: 'quiz' as ScreenState, label: 'Mood Quiz', emoji: '🎯' },
              { id: 'batch_wall' as ScreenState, label: 'Lounge & Wall', emoji: '💬' },
            ].map(item => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    audioEngine.playSfx('click');
                    onNavigate(item.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-xs scale-102'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <span className="text-sm">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Clean, Uncluttered Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio SFX Toggle */}
            <button
              type="button"
              onClick={toggleSfx}
              className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-colors shadow-2xs ${
                audioState.sfxOn
                  ? 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  : 'bg-stone-100 border-stone-200 text-stone-400'
              }`}
              title={audioState.sfxOn ? "Sound Effects ON" : "Sound Effects OFF"}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Quick Install as App Button */}
            {onOpenInstallApp && (
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp();
                }}
                className="h-8 px-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-full flex items-center gap-1.5 text-xs font-display font-black transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs"
                title="Install Marisol as App on iPhone or Android"
              >
                <Smartphone className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Add App</span>
              </button>
            )}

            {/* Responsive Main Menu Button (☰ MENU) */}
            <button
              onClick={() => {
                audioEngine.playSfx('click');
                setIsMenuOpen(true);
              }}
              className="h-8 px-2.5 sm:px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full flex items-center gap-1 text-xs font-display font-black shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
              title="Open Navigation Menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden min-[380px]:inline">MENU</span>
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center font-display font-black text-white text-sm shadow-xs">
                    M
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

              {/* Account / Google Sign In in Drawer Menu */}
              {onOpenGoogleSignIn && (
                <div className="mt-3 p-3 bg-white border border-stone-200 rounded-2xl shadow-xs">
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setIsMenuOpen(false);
                      onOpenGoogleSignIn();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-pink-300 bg-stone-50 hover:bg-rose-50 text-stone-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {isAuthenticated && currentUser ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <div className="text-left">
                        <div className="font-display font-black text-xs">
                          {isAuthenticated && currentUser ? currentUser.name : "Google Account Sign In"}
                        </div>
                        <div className="text-[10px] text-stone-500 font-sans truncate">
                          {isAuthenticated && currentUser ? currentUser.email : "Connect Google Account"}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-display font-black text-rose-600 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                      {isAuthenticated ? "MANAGE" : "SIGN IN"}
                    </span>
                  </button>
                </div>
              )}

              {/* Install as App Option in Drawer Menu */}
              {onOpenInstallApp && (
                <div className="mt-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl shadow-xs">
                  <button
                    onClick={() => {
                      audioEngine.playSfx('click');
                      setIsMenuOpen(false);
                      onOpenInstallApp();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-300 text-stone-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-rose-600 shrink-0" />
                      <div className="text-left">
                        <div className="font-display font-black text-xs text-stone-900">
                          Add Marisol to Phone
                        </div>
                        <div className="text-[10px] text-stone-500 font-sans">
                          iPhone (Safari) & Android install guide
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-display font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      INSTALL 📱
                    </span>
                  </button>
                </div>
              )}
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
