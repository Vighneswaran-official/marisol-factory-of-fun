import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { Marisol } from './Marisol';
import { STICKERS } from '../data/stickers';
import { audioEngine } from '../services/synthAudioEngine';
import type { ScreenState } from '../types/game';
import { 
  Flame, Award, Zap, HelpCircle, BookOpen, User, Sparkles, Check, 
  GraduationCap, MessageSquareHeart, HeartHandshake, Camera, Music, Download 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlayerProfileCardProps {
  onNavigate?: (screen: ScreenState) => void;
  onOpenSecretLocket?: () => void;
  onOpenGlowUpWeek?: () => void;
  onOpenMusicJukebox?: () => void;
  onOpenInstallApp?: () => void;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  onNavigate,
  onOpenSecretLocket,
  onOpenGlowUpWeek,
  onOpenMusicJukebox,
  onOpenInstallApp,
}) => {
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
    <div className="min-h-screen bg-paper-50 p-3 sm:p-6 pb-28 text-ink">
      
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Main Illustrated Player Card */}
        <div className="bg-white border-3 border-ink rounded-3xl p-5 sm:p-6 shadow-sketch-xl space-y-6 relative overflow-hidden">
          
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
                <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
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

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {STICKERS.map((sticker) => {
                const isSelected = sticker.alias === activeSticker;
                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleSelectSticker(sticker.alias)}
                    title={sticker.title}
                    className={`
                      relative p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center
                      ${isSelected 
                        ? 'border-ink bg-doodleGold shadow-sketch scale-105' 
                        : 'border-ink/30 bg-paper-100 hover:border-ink hover:bg-paper-200'}
                    `}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-ink/20 flex items-center justify-center">
                      <img 
                        src={sticker.avatarUrl} 
                        alt={sticker.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-handwritten font-bold truncate max-w-full text-ink mt-0.5">
                      {sticker.badgeEmoji}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ink text-white rounded-full flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
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

          {/* MORE EXPERIENCES & SPECIAL SECTIONS */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4">
              <h3 className="font-display font-black text-base text-ink flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>MORE FACTORY EXPERIENCES</span>
              </h3>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Special corners & batch hubs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Batch 41 Classroom */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate?.('classroom');
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-amber-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-amber-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">BATCH 41 CLASSROOM</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Tribute arena & student quizzes</div>
                </div>
              </button>

              {/* Shared Batch Wall */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onNavigate?.('batch_wall');
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-purple-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-purple-100 flex items-center justify-center shrink-0">
                  <MessageSquareHeart className="w-5 h-5 text-purple-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">SHARED BATCH WALL</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Live classmate notes & stickers</div>
                </div>
              </button>

              {/* Secret Locket */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenSecretLocket?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-rose-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-rose-100 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-rose-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">SECRET LOCKET</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Sisterly letters & memories</div>
                </div>
              </button>

              {/* Glow-Up Week */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenGlowUpWeek?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-teal-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-teal-100 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-teal-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">GLOW-UP SCRAPBOOK</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Polaroids & downloadable card</div>
                </div>
              </button>

              {/* Music Jukebox Lounge */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenMusicJukebox?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-pink-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-pink-100 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 text-pink-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">MUSIC JUKEBOX</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Curated Hindi comfort playlist</div>
                </div>
              </button>

              {/* Install App */}
              <button
                onClick={() => {
                  audioEngine.playSfx('click');
                  onOpenInstallApp?.();
                }}
                className="p-3 bg-white border-2 border-ink rounded-2xl shadow-sketch-sm hover:shadow-sketch hover:bg-emerald-50 transition-all flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl border-1.5 border-ink bg-emerald-100 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <div className="font-display font-black text-xs text-ink">INSTALL ON MOBILE</div>
                  <div className="font-handwritten text-[11px] text-ink-light font-bold">Add to iOS or Android Home Screen</div>
                </div>
              </button>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4">
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
