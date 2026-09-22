import React from 'react';
import type { MarisolExpression } from '../types/game';
import { STICKERS_BY_ALIAS, STICKERS } from '../data/stickers';

interface MarisolProps {
  expression?: MarisolExpression;
  pose?: string; // Direct pose alias from the 11 stickers
  variant?: 'avatar' | 'sticker' | 'card';
  dialogue?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  showSpeechBubble?: boolean;
  bubblePosition?: 'top' | 'right' | 'left' | 'bottom';
  className?: string;
  onClick?: () => void;
}

// Map the 24 game expressions to one of the 11 canonical sticker poses
const EXPRESSION_TO_POSE: Record<string, string> = {
  // 1. Same Girl Brighter Ideas
  idle: 'brighter_ideas',
  encouraging: 'brighter_ideas',
  
  // 2. Good Ideas Happier Days
  welcome: 'happier_days',
  happy: 'happier_days',
  proud: 'happier_days',
  celebrating: 'happier_days',

  // 3. Wink & Conquer
  wink: 'wink_conquer',
  motivational: 'wink_conquer',

  // 4. Overthinking But Making Progress
  thinking: 'overthinking',
  confused: 'overthinking',

  // 5. Chai = Happiness
  chai: 'chai_happiness',
  oops: 'chai_happiness',
  sleepy: 'chai_happiness',

  // 6. Silly Is A Vibe
  laughing: 'silly_vibe',
  surprised: 'silly_vibe',
  shocked: 'silly_vibe',

  // 7. Big Dreams
  curious: 'big_dreams',
  genius: 'big_dreams',

  // 8. Grateful Always
  reading: 'grateful_always',
  disappointed: 'grateful_always',

  // 9. Just Me
  peace: 'just_me',
  dramatic: 'just_me',

  // 10. Same Kritika Bigger Adventures
  excited: 'bigger_adventures',
  adventures: 'bigger_adventures',

  // 11. Good Music Brighter Mood
  music: 'music_mood',
};

export const Marisol: React.FC<MarisolProps> = ({
  expression = 'welcome',
  pose,
  variant = 'avatar',
  dialogue,
  size = 'medium',
  showSpeechBubble = true,
  bubblePosition = 'top',
  className = '',
  onClick,
}) => {
  // Resolve which of the 11 stickers to use
  const targetAlias = pose || EXPRESSION_TO_POSE[expression] || 'happier_days';
  const stickerData = STICKERS_BY_ALIAS[targetAlias] || STICKERS[0];

  // Size dimensions
  const avatarSizeClasses = {
    small: 'w-16 h-16 sm:w-20 sm:h-20',
    medium: 'w-28 h-28 sm:w-36 sm:h-36',
    large: 'w-40 h-40 sm:w-48 sm:h-48',
    full: 'w-56 h-56 sm:w-64 sm:h-64',
  }[size];

  const stickerSizeClasses = {
    small: 'w-24 sm:w-28',
    medium: 'w-40 sm:w-48',
    large: 'w-56 sm:w-64',
    full: 'w-72 sm:w-80',
  }[size];

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Hand-drawn Speech Bubble */}
      {showSpeechBubble && dialogue && (
        <div 
          className={`
            relative z-20 mb-3 px-4 py-2.5 max-w-xs sm:max-w-sm text-center
            bg-white text-ink font-handwritten text-lg sm:text-xl font-bold
            border-2.5 border-ink shadow-sketch rounded-2xl animate-float
            ${bubblePosition === 'left' ? 'self-start' : bubblePosition === 'right' ? 'self-end' : 'self-center'}
          `}
        >
          {dialogue}
          {/* Bubble Pointer Tail */}
          <div 
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2.5 border-b-2.5 border-ink rotate-45"
          />
        </div>
      )}

      {/* Render Variant 1: Avatar (Circle portrait with face focused) */}
      {variant === 'avatar' && (
        <div className="relative group">
          {/* Floating Doodle Accents */}
          <div className="absolute -top-2 -right-2 text-coral-500 font-handwritten text-xl font-bold animate-bounce-gentle select-none pointer-events-none z-10">
            {stickerData.badgeEmoji}
          </div>
          <div className="absolute -bottom-1 -left-2 text-doodleGold font-handwritten text-lg font-bold select-none pointer-events-none z-10">
            ❤️
          </div>

          {/* Hand-drawn Sketch Frame */}
          <div 
            className={`
              ${avatarSizeClasses}
              relative overflow-hidden rounded-full
              border-3 border-ink shadow-sketch-lg bg-[#FAF7F0]
              transition-transform duration-300 group-hover:scale-105
            `}
          >
            <img
              src={stickerData.avatarUrl}
              alt={stickerData.title}
              className="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Caption Label */}
          <div className="mt-1 text-center font-handwritten text-xs sm:text-sm text-ink-light font-bold select-none truncate max-w-[140px]">
            {stickerData.quote.replace(' ♡', '')}
          </div>
        </div>
      )}

      {/* Render Variant 2: Full Sticker (Raw sticker with artwork, quotes & doodles) */}
      {variant === 'sticker' && (
        <div className="relative group transition-transform duration-300 hover:scale-105">
          <div 
            className={`
              ${stickerSizeClasses}
              rounded-2xl overflow-hidden border-2.5 border-ink shadow-sketch-lg bg-[#FAF7F0]
              p-1.5
            `}
          >
            <img
              src={stickerData.stickerUrl}
              alt={stickerData.title}
              className="w-full h-auto object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Render Variant 3: Collectible Polaroid Card */}
      {variant === 'card' && (
        <div className="relative group transition-transform duration-300 hover:scale-105">
          {/* Tape on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-doodleGold/40 border border-ink/40 -rotate-2 z-10 shadow-sm" />
          
          <div 
            className={`
              ${stickerSizeClasses}
              bg-white border-2.5 border-ink rounded-2xl p-2.5 pt-3.5 shadow-sketch-xl
              flex flex-col items-center
            `}
          >
            <div className="w-full rounded-xl overflow-hidden border-1.5 border-ink bg-[#FAF7F0]">
              <img
                src={stickerData.stickerUrl}
                alt={stickerData.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="mt-2 text-center">
              <span className="font-handwritten text-xs sm:text-sm font-bold text-ink block">
                {stickerData.quote}
              </span>
              <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-light/70 bg-paper-100 px-2 py-0.5 rounded-full border border-ink/20">
                {stickerData.vibe}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
