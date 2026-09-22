import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { X, Download, Smartphone, Share2, PlusSquare, Sparkles, Check, Apple } from 'lucide-react';

interface InstallAppModalProps {
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Detect if already installed / running standalone
    const standaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standaloneMode);

    // Detect device platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);

    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for Android / Chromium PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallAndroid = async () => {
    audioEngine.playSfx('click');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        audioEngine.playSfx('fanfare');
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction if browser already triggered or in different browser
      alert("To install on Android:\n1. Tap the three dots (⋮) in your browser menu.\n2. Tap 'Install app' or 'Add to Home screen'.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-sketch-2xl space-y-4 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-12 h-12 rounded-2xl border-2 border-ink overflow-hidden bg-rose-200 shadow-sketch shrink-0">
              <img 
                src="/icon-192.png" 
                alt="Marisol App Icon" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-ink leading-tight flex items-center gap-1.5">
                <span>DOWNLOAD MARISOL</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </h3>
              <p className="font-handwritten text-xs text-pink-700 font-bold">
                Install on your Android or iPhone Home Screen! 📲
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold bg-white hover:bg-paper-200 transition-colors shadow-xs shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Already Installed Badge */}
        {isStandalone || installedSuccess ? (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 text-center space-y-1.5 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="font-display font-black text-sm text-emerald-950">
              App Installed Successfully! 🎉
            </p>
            <p className="font-handwritten text-xs text-emerald-800 font-bold">
              Marisol is now added to your home screen!
            </p>
          </div>
        ) : (
          <>
            {/* Feature Perks */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-2">
                <span className="text-base">⚡</span>
                <p className="font-display font-bold text-[10px] text-pink-900 mt-0.5">INSTANT LAUNCH</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-2">
                <span className="text-base">📱</span>
                <p className="font-display font-bold text-[10px] text-purple-900 mt-0.5">FULLSCREEN</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2">
                <span className="text-base">📶</span>
                <p className="font-display font-bold text-[10px] text-amber-900 mt-0.5">OFFLINE READY</p>
              </div>
            </div>

            {/* iOS Instructions */}
            {isIOS ? (
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-pink-300 rounded-2xl p-4 text-left space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-pink-950 font-display font-black text-xs uppercase tracking-wider">
                  <Apple className="w-4 h-4 text-ink" />
                  <span>HOW TO INSTALL ON IPHONE / IPAD:</span>
                </div>

                <div className="space-y-2 text-xs font-handwritten font-bold text-ink">
                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                    <div className="flex-1">
                      Tap the <strong className="text-pink-900 flex-inline items-center gap-1">Share button <Share2 className="w-3.5 h-3.5 inline text-blue-600" /></strong> at the bottom of Safari.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                    <div className="flex-1">
                      Scroll down and tap <strong className="text-pink-900 flex-inline items-center gap-1">"Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 inline text-pink-600" /></strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-pink-200">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
                    <div className="flex-1">
                      Tap <strong className="text-pink-900">Add</strong> in the top right corner. You're done! 💖
                    </div>
                  </div>
                </div>
              </div>
            ) : isAndroid || deferredPrompt ? (
              /* Android One-Click Install */
              <div className="space-y-3">
                <button
                  onClick={handleInstallAndroid}
                  className="sketch-btn-primary w-full py-3.5 text-base font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
                >
                  <Download className="w-5 h-5" />
                  <span>INSTALL ON ANDROID NOW</span>
                </button>

                <p className="font-handwritten text-xs text-ink-light font-bold">
                  Installs directly to your home screen with zero storage overhead!
                </p>
              </div>
            ) : (
              /* Universal Mobile / Desktop Instructions */
              <div className="space-y-3">
                <button
                  onClick={handleInstallAndroid}
                  className="sketch-btn-primary w-full py-3 text-sm font-black uppercase flex items-center justify-center gap-2 shadow-sketch hover:scale-102 active:scale-98 transition-all border-3 border-ink"
                >
                  <Download className="w-4 h-4" />
                  <span>ADD TO HOME SCREEN / INSTALL</span>
                </button>

                <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-3 text-left space-y-1.5 text-xs font-handwritten font-bold text-ink-light">
                  <div className="flex items-center gap-1.5 text-ink font-display font-bold text-[11px]">
                    <Smartphone className="w-3.5 h-3.5 text-pink-600" />
                    <span>Quick Steps:</span>
                  </div>
                  <p>• <strong>iPhone (Safari):</strong> Tap Share ⎋ ➔ 'Add to Home Screen'</p>
                  <p>• <strong>Android (Chrome):</strong> Tap Menu ⋮ ➔ 'Install App' or 'Add to Home Screen'</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Note */}
        <div className="bg-pink-100/50 border border-pink-200 rounded-xl p-2.5 font-handwritten text-xs text-pink-900 font-bold">
          "Now Kritika can carry her comfort zone everywhere in her pocket!" 💖
        </div>

      </div>
    </div>
  );
};
