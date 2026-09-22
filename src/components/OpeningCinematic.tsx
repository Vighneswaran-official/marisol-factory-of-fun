import React, { useState } from 'react';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import type { Category } from '../types/game';
import { Sparkles, Check, Film, Tv, Music, Rocket, HelpCircle, Globe, Cpu } from 'lucide-react';

interface OpeningCinematicProps {
  onComplete: () => void;
}

const INTEREST_OPTIONS: { category: Category; label: string; icon: any; color: string }[] = [
  { category: 'Movies', label: 'Movies & Cinema', icon: Film, color: 'bg-coral-500 text-white' },
  { category: 'Bollywood', label: 'Bollywood Magic', icon: Sparkles, color: 'bg-doodleGold text-ink' },
  { category: 'TV Shows', label: 'Binge TV Shows', icon: Tv, color: 'bg-plum-500 text-white' },
  { category: 'Pop Culture', label: 'Pop Culture & Hits', icon: Music, color: 'bg-doodleTeal text-white' },
  { category: 'Science', label: 'Brain Lab & Inventions', icon: Cpu, color: 'bg-doodlePink text-white' },
  { category: 'Space', label: 'Cosmic & Space', icon: Rocket, color: 'bg-indigo-600 text-white' },
  { category: 'Weird Facts', label: 'Mind-Blowing Curiosities', icon: HelpCircle, color: 'bg-emerald-500 text-white' },
  { category: 'Geography', label: 'World & Wonders', icon: Globe, color: 'bg-amber-600 text-white' },
];

export const OpeningCinematic: React.FC<OpeningCinematicProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'interests'>('intro');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>(['Movies', 'Bollywood', 'TV Shows']);

  const toggleInterest = (category: Category) => {
    audioEngine.playSfx('click');
    if (selectedInterests.includes(category)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(c => c !== category));
      }
    } else {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const handleFinishOnboarding = () => {
    audioEngine.playSfx('fanfare');
    gameState.updateInterests(selectedInterests);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col items-center justify-center p-4 sm:p-6 text-ink relative overflow-hidden">
      
      {/* Background Animated Pencil Doodle Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 10 Q 50 200 200 10 T 400 300" stroke="#2C2825" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <circle cx="80%" cy="20%" r="40" stroke="#FF6B6B" strokeWidth="3" fill="none" />
          <circle cx="15%" cy="75%" r="60" stroke="#14B8A6" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {step === 'intro' ? (
        <div className="max-w-lg w-full text-center flex flex-col items-center z-10 animate-fade-in space-y-6">
          
          {/* Animated Pencil Drawn Title */}
          <div className="relative mb-2">
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-plum-700 uppercase">
              MARISOL
            </h1>
            <div className="font-handwritten text-2xl sm:text-3xl text-coral-500 font-bold -mt-2">
              FACTORY OF FUN
            </div>
            <p className="font-handwritten text-lg text-ink-light font-semibold mt-1">
              "Where curiosity becomes a superpower."
            </p>
          </div>

          {/* Marisol Canonical Character Introduction */}
          <Marisol
            pose="brighter_ideas"
            variant="card"
            size="large"
            dialogue="Hey! Welcome to the Factory of Fun! I've got a tiny problem... our facts are scattered! And I need your curious mind to help me get them back."
            bubblePosition="top"
          />

          {/* Start CTA Button */}
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              setStep('interests');
            }}
            className="sketch-btn-primary w-full py-4 text-xl sm:text-2xl font-black tracking-wide uppercase shadow-sketch-lg hover:scale-105 active:scale-95 transition-all mt-4"
          >
            LET'S GO! 🚀
          </button>
        </div>
      ) : (
        <div className="max-w-xl w-full z-10 space-y-6 animate-fade-in">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-ink">
              What are you into?
            </h2>
            <p className="font-handwritten text-xl text-ink-light">
              Pick your favorite topics so Marisol can personalize your adventure!
            </p>
          </div>

          {/* Marisol Small Avatar Header */}
          <div className="flex items-center justify-center gap-3 bg-white p-3 rounded-2xl border-2 border-ink shadow-sketch">
            <Marisol expression="chai" size="small" showSpeechBubble={false} />
            <p className="font-handwritten text-lg font-bold text-ink">
              "Select as many as you like! I'll tailor the trivia to your brain."
            </p>
          </div>

          {/* Interest Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {INTEREST_OPTIONS.map(opt => {
              const Icon = opt.icon;
              const isSelected = selectedInterests.includes(opt.category);
              return (
                <button
                  key={opt.category}
                  onClick={() => toggleInterest(opt.category)}
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl border-2.5 border-ink text-left transition-all
                    ${isSelected ? 'bg-white shadow-sketch-lg ring-4 ring-coral-400/30 font-bold' : 'bg-paper-100 opacity-70 hover:opacity-100 shadow-sketch'}
                  `}
                >
                  <div className={`p-2.5 rounded-xl border-2 border-ink ${opt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm sm:text-base text-ink truncate">
                      {opt.label}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-doodleTeal text-white flex items-center justify-center border-1.5 border-ink">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Complete Button */}
          <button
            onClick={handleFinishOnboarding}
            className="sketch-btn-gold w-full py-4 text-xl font-black uppercase tracking-wide shadow-sketch-lg hover:scale-105 active:scale-95 transition-all mt-4"
          >
            START MY ADVENTURE! 🎬
          </button>
        </div>
      )}
    </div>
  );
};
