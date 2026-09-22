import React, { useState, useEffect } from 'react';
import type { Question } from '../types/game';
import { Marisol } from './Marisol';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import confetti from 'canvas-confetti';
import { HelpCircle, Clock, Zap } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOption: string, timeTakenMs: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isFrozen, setIsFrozen] = useState(false);
  const [startTime] = useState(Date.now());

  const player = gameState.getPlayer();

  // Timer countdown
  useEffect(() => {
    if (isFrozen || selected !== null) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFrozen, selected]);

  const handleTimeOut = () => {
    if (selected === null) {
      setSelected('TIME_OUT');
      audioEngine.playSfx('wrong');
      onAnswer('', Date.now() - startTime);
    }
  };

  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [flyingParticles, setFlyingParticles] = useState<{ id: number; text: string; left: number; delay: number }[]>([]);

  const handleSelectOption = (option: string) => {
    if (selected !== null || disabledOptions.includes(option)) return;
    setSelected(option);
    const timeTaken = Date.now() - startTime;
    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      setAnswerStatus('correct');
      audioEngine.playSfx('correct');
      
      // Spawn flying cucumber sandwich particles
      const items = ['🥪', '🥒', '🥪', '✨', '🥪', '💖', '🥪', '🥒'];
      const particles = items.map((text, idx) => ({
        id: Date.now() + idx,
        text,
        left: 15 + Math.random() * 70,
        delay: idx * 0.08
      }));
      setFlyingParticles(particles);

      // Trigger confetti
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10B981', '#F43F5E', '#FBBF24', '#A855F7']
      });
    } else {
      setAnswerStatus('wrong');
      audioEngine.playSfx('wrong');
    }

    setTimeout(() => {
      onAnswer(option, timeTaken);
    }, 750);
  };

  // Power-up: 50/50 Hint (removes one incorrect option)
  const use5050Hint = () => {
    if (gameState.usePowerUp('hint')) {
      audioEngine.playSfx('powerup');
      const incorrect = question.options.filter(o => o !== question.correctAnswer);
      if (incorrect.length > 0) {
        setDisabledOptions([incorrect[0]]);
      }
    }
  };

  // Power-up: Clue
  const useClueHint = () => {
    if (gameState.usePowerUp('clue')) {
      audioEngine.playSfx('powerup');
      setShowHint(true);
    }
  };

  // Power-up: Time Freeze
  const useTimeFreeze = () => {
    if (gameState.usePowerUp('time_freeze')) {
      audioEngine.playSfx('powerup');
      setIsFrozen(true);
      setTimer(prev => prev + 15);
    }
  };

  return (
    <div className={`max-w-xl w-full mx-auto border-3 rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-5 relative overflow-hidden transition-all duration-300 ${
      answerStatus === 'wrong'
        ? 'bg-rose-100/95 border-rose-500 shadow-rose-200 animate-shake-wrong ring-4 ring-rose-400/40'
        : answerStatus === 'correct'
        ? 'bg-emerald-50/95 border-emerald-500 shadow-emerald-200 ring-4 ring-emerald-400/40'
        : 'bg-white border-ink'
    }`}>
      
      {/* Flying Cucumber Sandwiches & Sparkle Emojis on Correct Answer */}
      {flyingParticles.map(p => (
        <div
          key={p.id}
          className="absolute z-30 pointer-events-none text-2xl sm:text-3xl animate-flying-sandwich select-none"
          style={{
            left: `${p.left}%`,
            bottom: '25%',
            animationDelay: `${p.delay}s`
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Top Header: Progress & Timer */}
      <div className="flex items-center justify-between font-sans">
        <div className="bg-paper-100 border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          QUESTION {questionNumber} / {totalQuestions}
        </div>

        <div className="flex items-center gap-1.5 bg-doodleGold/20 border-2 border-ink px-3 py-1 rounded-xl text-xs font-bold text-ink">
          <Clock className={`w-4 h-4 ${timer < 10 ? 'text-coral-500 animate-pulse' : 'text-doodleGold'}`} />
          <span>{timer}s</span>
        </div>
      </div>

      {/* Secret Ingredient Prize Banner */}
      {question.secretIngredient && (
        <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-2.5 flex items-center justify-between text-xs font-bold text-ink shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 block font-handwritten">
                Target Secret Ingredient:
              </span>
              <span className="font-display font-black text-xs text-ink">
                {question.secretIngredient}
              </span>
            </div>
          </div>
          <div className="bg-white border-1.5 border-ink px-2.5 py-1 rounded-xl font-display font-black text-xs text-emerald-700 shadow-sketch-sm">
            +3 🥪 Cucumber Sandwiches
          </div>
        </div>
      )}

      {/* Marisol / Kritika Character Header */}
      <div className="flex justify-center">
        <Marisol
          pose={
            answerStatus === 'wrong'
              ? 'overthinking'
              : answerStatus === 'correct'
              ? 'happier_days'
              : showHint
              ? 'overthinking'
              : gameState.getActiveSticker()
          }
          expression={
            answerStatus === 'wrong'
              ? 'thinking'
              : answerStatus === 'correct'
              ? 'excited'
              : question.difficulty === 'hard'
              ? 'thinking'
              : 'curious'
          }
          size="medium"
          dialogue={
            answerStatus === 'wrong'
              ? "Oopsie, almost babe! You've got this 💖"
              : answerStatus === 'correct'
              ? "YAS QUEEN! +3 Cucumber Sandwiches! 🥪✨"
              : showHint
              ? `Hint: Think about ${question.tags[0] || 'the core clue'}!`
              : undefined
          }
          bubblePosition="top"
        />
      </div>

      {/* Category Tag */}
      <div className="text-center">
        <span className="font-handwritten text-sm font-bold text-coral-500 uppercase tracking-widest bg-coral-500/10 px-3 py-1 rounded-full border-1.5 border-coral-500/30">
          {question.category} • {question.difficulty}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="font-display font-bold text-xl sm:text-2xl text-ink text-center leading-snug">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((option, idx) => {
          const isDisabled = disabledOptions.includes(option);
          const isSelected = selected === option;

          return (
            <button
              key={idx}
              disabled={selected !== null || isDisabled}
              onClick={() => handleSelectOption(option)}
              className={`
                sketch-btn w-full p-4 text-left font-display font-bold text-base sm:text-lg flex items-center justify-between transition-all
                ${isDisabled ? 'opacity-30 cursor-not-allowed bg-paper-200' : ''}
                ${isSelected ? 'bg-doodleTeal text-white ring-4 ring-doodleTeal/30' : 'bg-white hover:bg-paper-100 text-ink'}
              `}
            >
              <span>{option}</span>
              <span className="font-handwritten text-xs text-ink-light font-normal">
                [{String.fromCharCode(65 + idx)}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Power-ups Bar */}
      <div className="pt-3 border-t-2 border-dashed border-ink/20">
        <div className="text-center font-handwritten text-xs text-ink-light font-bold mb-2">
          POWER-UPS
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={use5050Hint}
            disabled={player.powerUps.hint <= 0}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="50/50 Hint (Removes 1 wrong option)"
          >
            <Zap className="w-3.5 h-3.5 text-doodleGold" />
            <span>50/50 ({player.powerUps.hint})</span>
          </button>

          <button
            onClick={useClueHint}
            disabled={player.powerUps.clue <= 0 || showHint}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="Marisol Clue"
          >
            <HelpCircle className="w-3.5 h-3.5 text-doodleTeal" />
            <span>CLUE ({player.powerUps.clue})</span>
          </button>

          <button
            onClick={useTimeFreeze}
            disabled={player.powerUps.time_freeze <= 0 || isFrozen}
            className="sketch-btn px-3 py-1.5 text-xs font-bold flex items-center gap-1 bg-paper-50"
            title="Time Freeze (+15s)"
          >
            <Clock className="w-3.5 h-3.5 text-coral-500" />
            <span>FREEZE ({player.powerUps.time_freeze})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
