import React, { useState } from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { audioEngine } from '../services/synthAudioEngine';
import { Search, Eye } from 'lucide-react';

interface MovieDetectiveCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions?: number;
  onAnswer: (selectedOption: string, timeTakenMs: number) => void;
}

export const MovieDetectiveCard: React.FC<MovieDetectiveCardProps> = ({
  question,
  questionNumber,
  onAnswer
}) => {
  const [unlockedCluesCount, setUnlockedCluesCount] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const clues = question.clues || [
    'Released in the 2010s.',
    'Directed by a master of cinema.',
    'Won multiple international awards.'
  ];

  const handleRevealNextClue = () => {
    if (unlockedCluesCount < clues.length) {
      audioEngine.playSfx('click');
      setUnlockedCluesCount(prev => prev + 1);
    }
  };

  const handleSelectOption = (option: string) => {
    if (selected !== null) return;
    setSelected(option);

    const timeTaken = Date.now() - startTime;
    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      audioEngine.playSfx('correct');
    } else {
      audioEngine.playSfx('wrong');
    }

    setTimeout(() => {
      onAnswer(option, timeTaken);
    }, 400);
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-[#E8DFD1] border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-5 relative">
      
      {/* Push Pin Decorator */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-coral-500 border-2 border-ink shadow-sketch z-20" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-white border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          🕵️ MOVIE DETECTIVE • CASE #{questionNumber}
        </div>
        <div className="font-handwritten text-xs font-bold text-plum-700 bg-white px-2.5 py-1 rounded-lg border-1.5 border-ink">
          CLUES UNLOCKED: {unlockedCluesCount}/{clues.length}
        </div>
      </div>

      {/* Marisol Character Header */}
      <div className="flex justify-center">
        <Marisol
          expression="curious"
          size="medium"
          dialogue="Inspect the clues carefully detective! Who is behind this movie mystery?"
          bubblePosition="top"
        />
      </div>

      {/* Detective Evidence Board Clues */}
      <div className="space-y-3">
        {clues.slice(0, unlockedCluesCount).map((clueText, idx) => (
          <div 
            key={idx}
            className="bg-white p-4 rounded-2xl border-2.5 border-ink shadow-sketch animate-fade-in space-y-1"
          >
            <div className="flex items-center gap-2 font-display font-bold text-xs text-coral-500 uppercase">
              <Search className="w-3.5 h-3.5" />
              <span>EVIDENCE #{idx + 1}</span>
            </div>
            <p className="font-handwritten text-lg sm:text-xl text-ink font-semibold">
              "{clueText}"
            </p>
          </div>
        ))}
      </div>

      {/* Unlock Next Clue CTA */}
      {unlockedCluesCount < clues.length && (
        <button
          onClick={handleRevealNextClue}
          className="sketch-btn-gold w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sketch"
        >
          <Eye className="w-4 h-4" />
          <span>REVEAL NEXT CLUE (-50 XP BONUS)</span>
        </button>
      )}

      {/* Movie Selection Options */}
      <div className="space-y-3 pt-2">
        <div className="font-display font-bold text-xs text-ink-light text-center uppercase tracking-wider">
          CHOOSE YOUR VERDICT:
        </div>
        {question.options.map((option, idx) => {
          const isSelected = selected === option;
          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => handleSelectOption(option)}
              className={`
                sketch-btn w-full p-3.5 text-left font-display font-bold text-base sm:text-lg transition-all
                ${isSelected ? 'bg-doodleTeal text-white ring-4 ring-doodleTeal/30' : 'bg-white hover:bg-paper-100 text-ink'}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
