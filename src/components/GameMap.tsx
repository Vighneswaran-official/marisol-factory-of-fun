import React from 'react';
import { GAME_ZONES } from '../data/zones';
import type { Zone } from '../types/game';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { Marisol } from './Marisol';
import { Lock, Play, Film, Tv, Sparkles, Clapperboard, HelpCircle, Rocket, Globe, Cpu, Music, ShieldAlert } from 'lucide-react';

interface GameMapProps {
  onSelectZone: (zone: Zone, isBoss: boolean) => void;
}

const ICON_MAP: Record<string, any> = {
  Film,
  Tv,
  Sparkles,
  Clapperboard,
  HelpCircle,
  Rocket,
  Globe,
  Cpu,
  Music,
  Lock
};

const ZONE_STICKER_MAP: Record<string, string> = {
  zone_1: 'wink_conquer',
  zone_2: 'just_me',
  zone_3: 'silly_vibe',
  zone_4: 'happier_days',
  zone_5: 'overthinking',
  zone_6: 'big_dreams',
  zone_7: 'bigger_adventures',
  zone_8: 'grateful_always',
  zone_9: 'music_mood',
  zone_10: 'brighter_ideas',
};

export const GameMap: React.FC<GameMapProps> = ({ onSelectZone }) => {
  const player = gameState.getPlayer();

  return (
    <div className="min-h-screen bg-paper-50 p-4 sm:p-6 pb-24 text-ink">
      
      {/* Map Title Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-block bg-white border-2.5 border-ink px-4 py-1.5 rounded-full shadow-sketch font-handwritten text-lg font-bold text-coral-500">
          🗺️ ADVENTURE MAP
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-plum-700 tracking-tight">
          THE FACTORY OF FUN
        </h1>
        <p className="font-handwritten text-xl text-ink-light max-w-lg mx-auto">
          Explore 10 illustrated zones, unlock facts, and challenge the Master Vault!
        </p>
      </div>

      {/* Marisol Map Greeting */}
      <div className="max-w-2xl mx-auto mb-8 bg-white border-2.5 border-ink rounded-2xl p-4 shadow-sketch-lg flex items-center gap-4">
        <Marisol pose="bigger_adventures" size="small" showSpeechBubble={false} />
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Same Kritika Bigger Adventures ♡</h3>
          <p className="font-handwritten text-base text-ink-light leading-snug">
            "Pick any unlocked zone to start a 5-question brain challenge, or enter a Boss Battle when you're ready!"
          </p>
        </div>
      </div>

      {/* Hand-Drawn Winding Path & Zones Grid */}
      <div className="max-w-4xl mx-auto relative space-y-6">
        
        {GAME_ZONES.map((zone, idx) => {
          const Icon = ICON_MAP[zone.iconName] || Film;
          const isUnlocked = player.xp >= zone.requiredXp || player.unlockedZones.includes(zone.id);
          const isCompleted = player.completedBosses.includes(zone.id);

          return (
            <div 
              key={zone.id}
              className={`
                relative bg-white border-3 border-ink rounded-3xl p-5 shadow-sketch-lg transition-all duration-300
                ${isUnlocked ? 'hover:-translate-y-1 hover:shadow-sketch-xl cursor-pointer' : 'opacity-70 bg-paper-100'}
              `}
            >
              {/* Zone Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Zone Icon & Info */}
                <div className="flex items-center gap-4">
                  <div 
                    className={`
                      w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2.5 border-ink flex items-center justify-center shadow-sketch
                      ${isUnlocked ? (idx % 2 === 0 ? 'bg-coral-500 text-white' : 'bg-doodleTeal text-white') : 'bg-paper-200 text-ink-light'}
                    `}
                  >
                    {isUnlocked ? <Icon className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-handwritten text-xs font-bold text-coral-500 uppercase tracking-wider">
                        ZONE {idx + 1}
                      </span>
                      {isCompleted && (
                        <span className="bg-doodleGold text-ink font-bold text-xs px-2 py-0.5 rounded-full border-1.5 border-ink">
                          PASSED ★
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-ink">
                      {zone.name}
                    </h2>
                    <p className="font-handwritten text-sm text-ink-light font-bold">
                      {zone.subtitle}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isUnlocked ? (
                    <>
                      {/* Standard Quiz Round */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('click');
                          onSelectZone(zone, false);
                        }}
                        className="sketch-btn-primary flex-1 sm:flex-initial px-4 py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-sketch"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>PLAY ROUND</span>
                      </button>

                      {/* Boss Challenge */}
                      <button
                        onClick={() => {
                          audioEngine.playSfx('click');
                          onSelectZone(zone, true);
                        }}
                        className="sketch-btn-gold px-3 py-2.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black shadow-sketch"
                        title="Boss Battle: The Final Cut"
                      >
                        <ShieldAlert className="w-4 h-4 text-ink" />
                        <span>BOSS</span>
                      </button>
                    </>
                  ) : (
                    <div className="bg-paper-200 border-2 border-ink px-4 py-2 rounded-xl text-xs font-bold text-ink-light shadow-sketch">
                      Requires {zone.requiredXp} XP to unlock
                    </div>
                  )}
                </div>
              </div>

              {/* Marisol Commentary Footer with Zone Sticker */}
              <div className="mt-3 pt-3 border-t-1.5 border-dashed border-ink/20 font-handwritten text-sm text-plum-700 font-semibold flex items-center gap-2.5">
                <img
                  src={`/marisol/avatars/${ZONE_STICKER_MAP[zone.id] || 'happier_days'}.png`}
                  alt="Zone Mood"
                  className="w-7 h-7 rounded-full border-1.5 border-ink object-cover bg-[#FAF7F0] shadow-sm shrink-0"
                />
                <span>"{zone.marisolComment}"</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
