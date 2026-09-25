import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { Download, Smartphone, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';

interface InstallAppModalProps {
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isAndroidDevice = /android/.test(userAgent);
      setIsIOS(isIosDevice);
      setIsAndroid(isAndroidDevice);

      // Check if already installed as standalone PWA
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }

      // Listen for Android / Chrome install prompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      audioEngine.playSfx('click');
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        confetti({ particleCount: 70, spread: 60 });
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      title="INSTALL MARISOL AS APP"
      subtitle="Add to your phone's Home Screen for the full screen, fast app experience"
      icon={<Smartphone className="w-5 h-5 text-rose-500" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        {/* App Preview Card */}
        <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-2xl border border-rose-200/80 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-rose-200 shrink-0 overflow-hidden">
            <img 
              src="/icon-192.png" 
              alt="Marisol Icon" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-sm text-stone-900 truncate">
                Marisol: Factory of Fun
              </h3>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                APP
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Offline-ready • Fullscreen • Instant launch
            </p>
          </div>
        </div>

        {/* Already Installed Notice */}
        {isInstalled && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Marisol is already running in app mode on this device! ✨</span>
          </div>
        )}

        {/* 1. IPHONE & IPAD (iOS) INSTRUCTIONS */}
        {isIOS && !isInstalled && (
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="font-display font-black text-xs text-rose-600 uppercase tracking-wide flex items-center gap-1.5">
                <span>🍎</span>
                <span>iPhone / iPad (Safari) Instructions</span>
              </span>
              <span className="text-[10px] bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full">
                3 Quick Steps
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p className="leading-snug">
                  Tap the <strong className="text-stone-900">Share</strong> button at the bottom of Safari (<span className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-900 font-mono text-[11px]">⎋ / ⬆</span>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p className="leading-snug">
                  Scroll down the menu and tap <strong className="text-stone-900">"Add to Home Screen"</strong> (<span className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-900 font-mono text-[11px]">⊞ / ⊕</span>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p className="leading-snug">
                  Tap <strong className="text-rose-600">"Add"</strong> in the top right corner. The Marisol app icon will immediately appear on your home screen!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. ANDROID INSTRUCTIONS & 1-TAP INSTALL */}
        {(!isIOS || isAndroid) && !isInstalled && (
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="font-display font-black text-xs text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                <span>🤖</span>
                <span>Android (Chrome) Instructions</span>
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Fast Install
              </span>
            </div>

            {deferredPrompt ? (
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-display font-black text-xs uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install Marisol on Android Now</span>
              </button>
            ) : (
              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p className="leading-snug">
                    Tap the <strong className="text-stone-900">three dots menu (⋮)</strong> at top right of Chrome.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p className="leading-snug">
                    Tap <strong className="text-stone-900">"Install app"</strong> or <strong className="text-stone-900">"Add to Home screen"</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p className="leading-snug">
                    Confirm <strong className="text-emerald-700">"Install"</strong>. The app icon will be pinned to your apps and home screen!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Benefits Checklist */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
          <p className="font-display font-black text-stone-800 text-[11px] uppercase tracking-wide">
            Why add as an App?
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>No browser URL bar</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Full screen view</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Instant 1-tap open</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Works smoothly offline</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-display font-black text-xs uppercase cursor-pointer transition-colors"
        >
          Got it
        </button>
      </div>
    </BaseModal>
  );
};
