import React, { useState } from 'react';
import type { ScreenState } from '../types/game';
import { STICKERS, type StickerData } from '../data/stickers';
import { gameState } from '../services/gameState';
import { audioEngine } from '../services/synthAudioEngine';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StickerCollectionProps {
  onNavigate: (screen: ScreenState) => void;
  onSelectMood?: (stickerAlias: string) => void;
}

// Where each sticker is featured in the game
const STICKER_GAME_ROLES: Record<string, { role: string; zone: string; desc: string }> = {
  brighter_ideas: {
    role: 'Hero Mentor & Welcome',
    zone: 'Factory Entrance',
    desc: 'Welcomes every player to the Factory of Fun with bright ideas and curiosity.'
  },
  happier_days: {
    role: 'Classroom Radiance',
    zone: 'Secret Classroom',
    desc: 'Spreads warm optimism and classroom cheer during study milestones and tributes.'
  },
  wink_conquer: {
    role: 'Movie Star Confidence',
    zone: 'Cinema Street & Bollywood',
    desc: 'Unleashes confidence and quick wits during Movie Detective rounds and hot streaks.'
  },
  overthinking: {
    role: 'Deep Thinker & Tech Mind',
    zone: 'The Brain Lab',
    desc: 'Powers through tricky puzzles, code logic, and complex trivia challenges.'
  },
  chai_happiness: {
    role: 'Daily Snack & Tea Break',
    zone: 'Daily Challenge',
    desc: 'The essential daily recharge companion. Chai makes every puzzle taste better!'
  },
  silly_vibe: {
    role: 'Laughter & Weird Facts',
    zone: 'Weird Fact Lab',
    desc: 'Reminds us that mistakes are just silly learning moments. Silly is definitely a vibe!'
  },
  big_dreams: {
    role: 'Galaxy Explorer',
    zone: 'Space Odyssey',
    desc: 'Reaches for the stars with airplane daydreams and boundless ambitions.'
  },
  grateful_always: {
    role: 'Book Lover & Scholar',
    zone: 'Knowledge Passport',
    desc: 'Hugs the stack of wisdom: Ideas, Grow, Travel, Be Happy, and Repeat.'
  },
  just_me: {
    role: 'Authentic Explorer',
    zone: 'Player Profile',
    desc: 'Celebrates your true self with peace signs, cool glasses, and authentic energy.'
  },
  bigger_adventures: {
    role: 'World Wanderer',
    zone: 'Global Wonders',
    desc: 'Charts epic expeditions around the globe, ready for bigger adventures.'
  },
  music_mood: {
    role: 'Synth & Groove Maestro',
    zone: 'Sound & Screen',
    desc: 'Powers the upbeat 80s synth soundtrack with good music and brighter moods.'
  }
};

export const StickerCollection: React.FC<StickerCollectionProps> = ({ onNavigate, onSelectMood }) => {
  const [activeSticker, setActiveSticker] = useState<string>(gameState.getActiveSticker());
  const [selectedModalSticker, setSelectedModalSticker] = useState<StickerData | null>(null);
  const [filter, setFilter] = useState<'all' | 'study' | 'fun' | 'adventure'>('all');
  const [viewMode, setViewMode] = useState<'stickers' | 'cards' | 'avatars'>('stickers');

  const handleEquip = (sticker: StickerData, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    gameState.setActiveSticker(sticker.alias);
    setActiveSticker(sticker.alias);
    if (onSelectMood) onSelectMood(sticker.alias);

    audioEngine.playSfx('fanfare');
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleInspect = (sticker: StickerData) => {
    setSelectedModalSticker(sticker);
    audioEngine.playSfx('powerup');
  };

  // Filter stickers
  const filteredStickers = STICKERS.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'study') return ['brighter_ideas', 'overthinking', 'grateful_always', 'big_dreams'].includes(s.alias);
    if (filter === 'fun') return ['silly_vibe', 'chai_happiness', 'happier_days', 'music_mood'].includes(s.alias);
    if (filter === 'adventure') return ['bigger_adventures', 'wink_conquer', 'just_me'].includes(s.alias);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-4 sm:p-6 pb-28 text-ink">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.playSfx('click');
              onNavigate('home');
            }}
            className="sketch-btn p-3 bg-white flex items-center gap-2 shadow-sketch"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-display font-bold text-sm hidden sm:inline">BACK HOME</span>
          </button>

          <div className="text-center">
            <div className="font-handwritten text-coral-500 font-bold text-sm sm:text-base flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> 11 HAND-DRAWN MOOD STICKERS
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
              KRITIKA'S STICKER VAULT ♡
            </h1>
          </div>

          <div className="bg-white border-2 border-ink px-3 py-1.5 rounded-full font-handwritten text-sm font-bold shadow-sketch">
            <span className="text-coral-500">11</span> / 11 COLLECTED
          </div>
        </div>

        {/* Active Companion Banner */}
        {(() => {
          const active = STICKERS.find(s => s.alias === activeSticker) || STICKERS[0];
          const role = STICKER_GAME_ROLES[active.alias];
          return (
            <div className="bg-white border-3 border-ink rounded-3xl p-4 sm:p-6 shadow-sketch-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-5">
              {/* Tape Accent */}
              <div className="absolute -top-3 left-10 w-24 h-6 bg-doodleGold/40 border border-ink/40 -rotate-3 z-10" />

              {/* Active Sticker Visual */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2.5 border-ink bg-[#FAF7F0] overflow-hidden shadow-sketch p-1 flex items-center justify-center">
                  <img
                    src={active.stickerUrl}
                    alt={active.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-doodleGold text-ink border-2 border-ink font-handwritten text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                  ACTIVE
                </div>
              </div>

              {/* Active Details */}
              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-paper-100 border border-ink/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-ink-light">
                  <span>{active.badgeEmoji}</span>
                  <span>Active Companion Mood</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-ink">
                  {active.quote}
                </h2>
                <p className="font-body text-xs sm:text-sm text-ink-light leading-relaxed">
                  {role?.desc || active.vibe}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-handwritten text-xs font-bold text-coral-600">
                  <span>📍 Featured in: {role?.zone}</span>
                  <span>•</span>
                  <span>🎭 Vibe: {active.vibe}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Filter and View Mode Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border-2.5 border-ink rounded-2xl p-3 shadow-sketch">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: 'all', label: 'All 11 Stickers' },
              { key: 'study', label: '💡 Study & Focus' },
              { key: 'fun', label: '☕ Fun & Vibe' },
              { key: 'adventure', label: '✈️ Adventures' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  audioEngine.playSfx('click');
                  setFilter(tab.key as any);
                }}
                className={`px-3 py-1.5 rounded-xl font-handwritten text-xs sm:text-sm font-bold transition-all ${
                  filter === tab.key
                    ? 'bg-ink text-white shadow-sketch-sm'
                    : 'bg-paper-100 hover:bg-paper-200 text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-paper-100 p-1 rounded-xl border border-ink/20 text-xs font-bold font-display">
            <button
              onClick={() => setViewMode('stickers')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'stickers' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              STICKERS
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              POLAROIDS
            </button>
            <button
              onClick={() => setViewMode('avatars')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'avatars' ? 'bg-white border border-ink shadow-sm text-ink' : 'text-ink-light'
              }`}
            >
              AVATARS
            </button>
          </div>
        </div>

        {/* The 11 Stickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStickers.map((sticker) => {
            const isEquipped = sticker.alias === activeSticker;
            const role = STICKER_GAME_ROLES[sticker.alias];

            return (
              <div
                key={sticker.id}
                onClick={() => handleInspect(sticker)}
                className={`
                  bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch-lg
                  hover:shadow-sketch-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer
                  flex flex-col justify-between relative group
                  ${isEquipped ? 'ring-3 ring-doodleGold ring-offset-2' : ''}
                `}
              >
                {/* Sticker Index Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-handwritten font-bold text-xs bg-paper-100 border border-ink/20 px-2 py-0.5 rounded-full text-ink-light">
                    STICKER #{sticker.index}
                  </span>
                  <span className="text-lg">{sticker.badgeEmoji}</span>
                </div>

                {/* Main Visual Display based on View Mode */}
                <div className="my-2 flex items-center justify-center min-h-[220px]">
                  {viewMode === 'stickers' && (
                    <div className="w-full max-w-[240px] rounded-2xl border-2 border-ink/40 bg-[#FAF7F0] p-2 shadow-inner group-hover:scale-102 transition-transform">
                      <img
                        src={sticker.stickerUrl}
                        alt={sticker.title}
                        className="w-full h-auto object-contain rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {viewMode === 'cards' && (
                    <div className="w-full max-w-[220px] bg-white border-2 border-ink rounded-2xl p-2 shadow-sketch text-center group-hover:rotate-1 transition-transform">
                      <div className="w-full rounded-xl overflow-hidden border border-ink bg-[#FAF7F0] mb-2">
                        <img
                          src={sticker.stickerUrl}
                          alt={sticker.title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-handwritten text-xs font-bold text-ink block truncate">
                        {sticker.quote}
                      </span>
                    </div>
                  )}

                  {viewMode === 'avatars' && (
                    <div className="w-36 h-36 rounded-full border-3 border-ink overflow-hidden shadow-sketch-lg bg-[#FAF7F0] group-hover:scale-105 transition-transform">
                      <img
                        src={sticker.avatarUrl}
                        alt={sticker.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Sticker Details & Quote */}
                <div className="space-y-3 pt-2">
                  <div className="text-center">
                    <h3 className="font-display font-black text-base text-ink leading-snug">
                      {sticker.quote}
                    </h3>
                    <div className="font-handwritten text-xs text-coral-600 font-bold mt-1">
                      {role?.zone}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => handleEquip(sticker, e)}
                      className={`
                        w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs uppercase
                        border-2 border-ink flex items-center justify-center gap-1.5 transition-all
                        ${
                          isEquipped
                            ? 'bg-doodleGold text-ink shadow-inner font-black'
                            : 'bg-paper-100 hover:bg-ink hover:text-white shadow-sketch-sm'
                        }
                      `}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>EQUIPPED</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>EQUIP MOOD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full Sticker Inspection */}
        {selectedModalSticker && (
          <div 
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedModalSticker(null)}
          >
            <div 
              className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-md w-full p-6 shadow-sketch-2xl space-y-4 relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedModalSticker.badgeEmoji}</span>
                  <div>
                    <h3 className="font-display font-black text-lg">
                      STICKER #{selectedModalSticker.index}
                    </h3>
                    <span className="font-handwritten text-xs text-ink-light">
                      {selectedModalSticker.vibe}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModalSticker(null)}
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200"
                >
                  ✕
                </button>
              </div>

              {/* Large Sticker View */}
              <div className="bg-white rounded-2xl border-2.5 border-ink p-3 shadow-sketch flex items-center justify-center">
                <img
                  src={selectedModalSticker.stickerUrl}
                  alt={selectedModalSticker.title}
                  className="max-h-72 w-auto object-contain rounded-xl"
                />
              </div>

              {/* Quote & In-Game Role Info */}
              <div className="bg-paper-100 rounded-2xl border-1.5 border-ink/30 p-3.5 space-y-1.5 text-center">
                <div className="font-display font-black text-xl text-ink">
                  "{selectedModalSticker.quote}"
                </div>
                <p className="font-body text-xs text-ink-light">
                  {STICKER_GAME_ROLES[selectedModalSticker.alias]?.desc}
                </p>
                <div className="font-handwritten text-sm text-coral-600 font-bold pt-1">
                  📍 Unlocked In: {STICKER_GAME_ROLES[selectedModalSticker.alias]?.zone}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEquip(selectedModalSticker)}
                  className="sketch-btn-primary flex-1 py-3 text-sm font-black uppercase flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>EQUIP AS COMPANION</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
