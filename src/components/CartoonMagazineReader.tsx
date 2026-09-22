import React, { useState } from 'react';
import { CARTOON_MAGAZINE_PAGES, type MagazinePage } from '../data/cartoonMagazine';
import { cartoonSpeech } from '../services/cartoonSpeechEngine';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  BookOpen
} from 'lucide-react';

interface CartoonMagazineReaderProps {
  onSwitchToVideo: () => void;
}

export const CartoonMagazineReader: React.FC<CartoonMagazineReaderProps> = ({ onSwitchToVideo }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [speakingPanelIndex, setSpeakingPanelIndex] = useState<number | null>(null);

  const page: MagazinePage = CARTOON_MAGAZINE_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < CARTOON_MAGAZINE_PAGES.length - 1) {
      audioEngine.playSfx('click');
      cartoonSpeech.stopSpeech();
      setSpeakingPanelIndex(null);
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      audioEngine.playSfx('click');
      cartoonSpeech.stopSpeech();
      setSpeakingPanelIndex(null);
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleSpeakDialogue = (dialogue: string, panelIndex: number) => {
    setSpeakingPanelIndex(panelIndex);
    audioEngine.playSfx('powerup');
    cartoonSpeech.speakDialogue(
      dialogue,
      () => {},
      () => setSpeakingPanelIndex(null)
    );
  };

  const handleReadFullPage = () => {
    const fullText = `${page.headline}. ${page.panels.map(p => `${p.title}: ${p.dialogue}`).join('. ')}. ${page.editorialQuote}`;
    audioEngine.playSfx('fanfare');
    cartoonSpeech.speakDialogue(
      fullText,
      () => {},
      () => setSpeakingPanelIndex(null)
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      
      {/* Magazine Nav & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-pink-100/60 p-3 rounded-2xl border border-pink-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-pink-500 text-white">
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-display font-black text-xs sm:text-sm text-pink-950 uppercase tracking-tight">
              KRITIKA CHIC: CARTOON MAGAZINE & COMICS 📖
            </h3>
            <p className="text-[10px] sm:text-xs text-pink-800 font-bold font-handwritten">
              Interactive comic issues with speaking speech bubbles ♡
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadFullPage}
            className="px-3 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-105 text-white font-display font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            title="Read entire magazine issue aloud"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Read Issue Aloud</span>
          </button>

          <button
            onClick={onSwitchToVideo}
            className="px-3 py-1.5 bg-white hover:bg-pink-50 text-pink-900 border border-pink-300 font-display font-black text-xs rounded-xl shadow-2xs transition flex items-center gap-1"
          >
            <span>🎬 Switch to Video</span>
          </button>
        </div>
      </div>

      {/* Glossy Magazine Page Layout */}
      <div 
        className="rounded-3xl border-3 border-stone-800 shadow-2xl p-4 sm:p-7 relative overflow-hidden transition-all duration-500"
        style={{ background: `linear-gradient(135deg, ${page.bgGradient[0]} 0%, ${page.bgGradient[1]} 100%)` }}
      >
        {/* Magazine Masthead Header */}
        <div className="border-b-2 border-stone-800/20 pb-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-stone-900 text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {page.categoryTag}
              </span>
              <span className="text-xs font-black text-stone-600 uppercase tracking-widest font-mono">
                {page.issueTitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight">
              {page.headline}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black bg-white/80 border border-stone-300 text-stone-700 px-2 py-1 rounded-lg shadow-2xs">
              Page {page.pageNumber} of {CARTOON_MAGAZINE_PAGES.length}
            </span>
            <span className="text-xs font-black bg-amber-400 text-stone-900 px-2.5 py-1 rounded-lg shadow-2xs">
              {page.bonusSticker}
            </span>
          </div>
        </div>

        {/* Main Spread: Cartoon Hero & Comic Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Magazine Cover Photo / Character Pose */}
          <div className="md:col-span-4 bg-white/80 backdrop-blur-xs rounded-2xl border-2 border-stone-800/30 p-4 text-center shadow-md relative overflow-hidden group">
            <div className="relative mx-auto w-44 h-56 rounded-xl overflow-hidden bg-gradient-to-b from-pink-100 to-rose-200 border border-pink-300 shadow-inner flex items-center justify-center">
              <img 
                src={page.avatarPose} 
                alt="Kritika Magazine Model"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 text-xl animate-pulse">✨</span>
            </div>

            <div className="mt-3 space-y-1">
              <span className="font-display font-black text-sm text-stone-900 block">
                QUEEN KRITIKA 👑
              </span>
              <p className="text-[11px] font-handwritten font-bold text-stone-600">
                Official Cover Star & Chief Executive of Joy
              </p>
            </div>

            {/* Glossy Barcode Stamp */}
            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>VOL. 2026 // ISSUE #{page.pageNumber}</span>
              <span>||| | |||| || |</span>
            </div>
          </div>

          {/* Right Column: 3 Comic Strip Panels with Interactive Speech Bubbles */}
          <div className="md:col-span-8 space-y-3">
            {page.panels.map((panel, idx) => {
              const isSpeaking = speakingPanelIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`bg-white rounded-2xl border-2 transition-all p-3.5 sm:p-4 shadow-sm relative ${
                    isSpeaking 
                      ? 'border-pink-500 shadow-pink-200 scale-102 ring-2 ring-pink-300' 
                      : 'border-stone-800/30 hover:border-pink-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">{panel.emoji}</span>
                      <h4 className="font-display font-black text-xs sm:text-sm text-stone-900">
                        {panel.title}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs">
                      {panel.soundEffect}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 italic mb-2">
                    {panel.caption}
                  </p>

                  {/* Comic Speech Bubble */}
                  <div 
                    onClick={() => handleSpeakDialogue(panel.dialogue, idx)}
                    className="relative bg-pink-50/90 hover:bg-pink-100 border-2 border-pink-300 rounded-2xl p-2.5 sm:p-3 cursor-pointer transition group shadow-2xs"
                    title="Click speech bubble to hear cartoon speak aloud!"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base text-pink-600 shrink-0">💬</span>
                      <p className="text-xs sm:text-sm font-bold text-pink-950 font-serif leading-snug">
                        "{panel.dialogue}"
                      </p>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] font-handwritten font-bold text-pink-700">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-pink-500" />
                        <span>Tap to listen aloud</span>
                      </span>
                      {isSpeaking && (
                        <span className="text-rose-600 font-black animate-pulse">
                          Speaking now... 🗣️
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Editorial Quote Box at Bottom of Spread */}
        <div className="mt-5 bg-white/90 border-2 border-stone-800/20 rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
          <span className="text-2xl shrink-0">💌</span>
          <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed">
            {page.editorialQuote}
          </p>
        </div>

        {/* Flip Controls: Previous and Next Page */}
        <div className="mt-5 pt-3 border-t-2 border-stone-800/20 flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 bg-white text-stone-800 font-display font-black text-xs rounded-xl border border-stone-300 shadow-2xs hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Issue</span>
          </button>

          {/* Quick Page Jump Dots */}
          <div className="flex items-center gap-1.5">
            {CARTOON_MAGAZINE_PAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioEngine.playSfx('click');
                  cartoonSpeech.stopSpeech();
                  setCurrentPageIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPageIndex === idx 
                    ? 'bg-stone-900 scale-125' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Jump to Page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === CARTOON_MAGAZINE_PAGES.length - 1}
            className="px-4 py-2 bg-stone-900 text-white font-display font-black text-xs rounded-xl shadow-xs hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <span>Next Issue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
