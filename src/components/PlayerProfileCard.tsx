import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import { STICKERS } from '../data/stickers';
import { audioEngine } from '../services/synthAudioEngine';
import { Flame, Award, Zap, HelpCircle, BookOpen, User, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlayerProfileCard: React.FC = () => {
  const [player, setPlayer] = useState(gameState.getPlayer());
  const [activeSticker, setActiveSticker] = useState<string>(gameState.getActiveSticker());
  const achievements = gameState.getAchievements();
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const handleSelectSticker = (alias: string) => {
    gameState.setActiveSticker(alias);
    setActiveSticker(alias);
    setPlayer(gameState.getPlayer());
    audioEngine.playSfx('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const currentStickerObj = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Main Illustrated Player Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-6 shadow-sketch-xl space-y-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2.5 border-ink pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl border-2.5 border-ink bg-coral-500 text-white flex items-center justify-center font-display font-black text-xl shadow-sketch">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl text-ink">
                  {player.nickname}
                </h1>
                <p className="font-handwritten text-sm text-ink-light font-bold">
                  Curious Mind • Member since 2026
                </p>
              </div>
            </div>

            <div className="bg-doodleGold text-ink border-2 border-ink px-3 py-1 rounded-xl shadow-sketch font-display font-bold text-sm">
              LEVEL {player.level}
            </div>
          </div>

          {/* Marisol Active Companion Greeting */}
          <div className="flex items-center gap-4 bg-paper-50 p-4 rounded-2xl border-2 border-ink">
            <Marisol pose={activeSticker} size="medium" showSpeechBubble={false} />
            <div className="space-y-1">
              <div className="font-handwritten text-base text-ink font-bold">
                "{currentStickerObj.quote}"
              </div>
              <div className="text-xs font-sans text-ink-light flex items-center gap-1.5 font-semibold">
                <span className="bg-paper-200 border border-ink/20 px-2 py-0.5 rounded-full">
                  {currentStickerObj.badgeEmoji} {currentStickerObj.vibe}
                </span>
                <span className="text-coral-500 font-bold">• Active Companion</span>
              </div>
            </div>
          </div>

          {/* 11 Mood Stickers Quick Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                <span>CHOOSE YOUR COMPANION MOOD (11 AVAILABLE)</span>
              </span>
              <span className="font-handwritten text-xs text-coral-500 font-bold">
                Tap to switch
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-[#FAF7F0] p-2.5 rounded-2xl border-2 border-ink">
              {STICKERS.map(s => {
                const isSelected = s.alias === activeSticker;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSticker(s.alias)}
                    title={s.quote}
                    className={`
                      relative rounded-xl border-2 transition-all p-1 flex flex-col items-center
                      ${isSelected 
                        ? 'border-ink bg-doodleGold shadow-sketch scale-105 z-10' 
                        : 'border-ink/30 bg-white hover:border-ink hover:scale-102'
                      }
                    `}
                  >
                    <img
                      src={s.avatarUrl}
                      alt={s.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-[10px] font-handwritten font-bold truncate max-w-[50px] mt-0.5">
                      {s.badgeEmoji}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 bg-ink text-white rounded-full p-0.5 border border-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 font-sans">
            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-plum-700" /> TOTAL XP
              </div>
              <div className="font-display font-black text-2xl text-plum-700">{player.xp}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-coral-500" /> BEST STREAK
              </div>
              <div className="font-display font-black text-2xl text-coral-500">{player.bestStreak}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-doodleTeal" /> FACTS DISCOVERED
              </div>
              <div className="font-display font-black text-2xl text-doodleTeal">{player.factsDiscovered}</div>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-2xl border-2 border-ink text-center space-y-1">
              <div className="text-xs text-ink-light font-medium flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-doodleGold" /> QUESTIONS ANSWERED
              </div>
              <div className="font-display font-black text-2xl text-doodleGold">{player.questionsAnswered}</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <Award className="w-5 h-5 text-doodleGold" />
                <span>ACHIEVEMENTS</span>
              </h3>
              <span className="font-handwritten text-sm text-ink-light font-bold">
                {unlockedAchievements.length} / {achievements.length} UNLOCKED
              </span>
            </div>

            <div className="space-y-2">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`
                    flex items-center justify-between p-3 rounded-2xl border-2 border-ink transition-all
                    ${ach.unlocked ? 'bg-white shadow-sketch' : 'bg-paper-100 opacity-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border-1.5 border-ink ${ach.unlocked ? 'bg-doodleGold text-ink' : 'bg-paper-200'}`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-ink">{ach.title}</div>
                      <div className="font-handwritten text-xs text-ink-light">{ach.description}</div>
                    </div>
                  </div>

                  {ach.unlocked && (
                    <span className="font-bold text-xs bg-doodleTeal text-white px-2 py-0.5 rounded-full border-1 border-ink">
                      UNLOCKED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
