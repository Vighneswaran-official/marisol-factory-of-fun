import React, { useState } from 'react';
import { audioEngine } from '../services/synthAudioEngine';
import { gameState } from '../services/gameState';
import { Heart, Sparkles, X, Utensils, Music, ShieldAlert, Award, Smile } from 'lucide-react';

interface ComfortCornerModalProps {
  onClose: () => void;
  onOpenMusic: () => void;
  onOpenHindiSong?: (songId: string) => void;
}

const STRESS_BUBBLES = [
  { id: 'meeting', text: 'Pointless meeting that could have been an email' },
  { id: 'mansplain', text: 'Someone explaining something I literally invented' },
  { id: 'cant_decide', text: 'Starving but having to answer "what do you want to eat?"' },
  { id: 'unsolicited', text: 'Unsolicited advice nobody asked for' },
  { id: 'slow_wifi', text: 'Wi-Fi dropping during a crucial movie scene' },
  { id: 'overthinking', text: 'Overthinking an interaction from 3 weeks ago' },
  { id: 'cold_chai', text: 'Making a hot cup of chai and forgetting it until it gets cold' },
  { id: 'dead_battery', text: 'Phone battery hitting 2% when I need GPS' }
];

const COMFORT_CRAVINGS = [
  {
    title: 'Midnight Chili Garlic Cheese Maggi',
    emoji: '🍜',
    why: 'Extra butter, double seasoning, gooey melted cheese pull. Scientifically proven to heal broken vibes.',
    tag: 'Carb Therapy'
  },
  {
    title: 'Warm Molten Chocolate Lava Cake',
    emoji: '🍫',
    why: 'Hot chocolate erupting from the center with a cold scoop of vanilla bean ice cream. Zero regrets.',
    tag: 'Sweet Serotonin'
  },
  {
    title: 'Highway Tapri Kadak Ginger Chai',
    emoji: '☕',
    why: 'Piping hot, heavily bruised ginger & cardamom with 2 biscuits dipped for precisely 1.5 seconds.',
    tag: 'Soul Reset'
  },
  {
    title: 'Crispy Truffle Fries with Jalapeño Dip',
    emoji: '🍟',
    why: 'Golden crunch that snaps satisfyingly between your teeth. Potatoes are nature\'s hug.',
    tag: 'Crunch Medicine'
  },
  {
    title: 'Cooling Royal Cucumber Tea Sandwiches',
    emoji: '🥪',
    why: 'Crisp English cucumber ribbons & mint cream cheese. Literally engineered to cool hot tempers!',
    tag: 'Chef Favorite'
  }
];

const GIRL_AFFIRMATIONS = [
  "Your eyeliner is far too sharp to care about blunt opinions.",
  "You are the main character in this blockbuster; they are merely poorly written background extras.",
  "Drink your chai, slip on your coziest hoodie, and conquer them with effortless excellence.",
  "You didn't come this far to only come this far. Take a breath, queen.",
  "90% of female fury is just low blood sugar demanding garlic butter carbs. Eat something delicious!"
];

export const ComfortCornerModal: React.FC<ComfortCornerModalProps> = ({ onClose, onOpenMusic, onOpenHindiSong }) => {
  const [poppedBubbles, setPoppedBubbles] = useState<Record<string, boolean>>({});
  const [claimedSandwiches, setClaimedSandwiches] = useState(false);
  const [activeTab, setActiveTab] = useState<'rage' | 'cravings' | 'vent' | 'affirmations'>('rage');
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  const handlePop = (id: string) => {
    if (!poppedBubbles[id]) {
      audioEngine.playSfx('pop');
      setPoppedBubbles(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleClaimComfortSandwiches = () => {
    if (claimedSandwiches) return;
    audioEngine.playSfx('fanfare');
    gameState.addCucumberSandwiches(5);
    setClaimedSandwiches(true);
  };

  const totalPopped = Object.values(poppedBubbles).filter(Boolean).length;

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F0] border-3 border-ink rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-coral-500 text-white flex items-center justify-center font-bold text-xl shadow-sketch">
              <Heart className="w-6 h-6 fill-white animate-bounce-gentle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
                  GIRL'S COMFORT CORNER ♡
                </h2>
                <span className="bg-coral-100 text-coral-800 font-handwritten text-[11px] font-black px-2 py-0.5 rounded-full border border-coral-400">
                  TLC & VENT
                </span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold">
                From one girl to another: validation, comfort carbs & instant de-stressing!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Sisterly Validation Banner */}
        <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border-2.5 border-ink rounded-3xl p-4 shadow-sketch relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-full border-2 border-ink bg-white overflow-hidden shrink-0 shadow-sm">
              <img 
                src="/marisol/avatars/03_wink_conquer.png" 
                alt="Kritika wink" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="font-display font-black text-sm sm:text-base text-ink flex items-center gap-1">
                <span>YOU HAVE EVERY RIGHT TO BE ANGRY!</span>
                <span>🔥</span>
              </div>
              <p className="font-handwritten text-xs sm:text-sm text-ink font-bold leading-relaxed">
                Rule #1: Nobody is going to tell you to "calm down"—that's illegal here! Whoever ruined your vibe has questionable life choices. Let's reclaim your peace and treat yourself.
              </p>
            </div>
          </div>

          {/* Emergency Cucumber Sandwiches Grant */}
          <div className="mt-3 pt-3 border-t border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="text-center sm:text-left">
              <span className="font-display font-black text-xs text-coral-700 block">
                EMERGENCY CARE PACKAGE 🎁
              </span>
              <span className="font-handwritten text-xs text-ink-light font-bold">
                Free +5 Cucumber Sandwiches for emotional support!
              </span>
            </div>

            <button
              onClick={handleClaimComfortSandwiches}
              disabled={claimedSandwiches}
              className={`
                px-4 py-2 rounded-2xl font-display font-black text-xs uppercase flex items-center gap-1.5 border-2 transition-all shrink-0
                ${
                  claimedSandwiches
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-ink shadow-sketch hover:scale-105 active:scale-95'
                }
              `}
            >
              {claimedSandwiches ? (
                <>
                  <Award className="w-4 h-4" />
                  <span>CLAIMED +5 🥪 CUCUMBER SANDWICHES!</span>
                </>
              ) : (
                <>
                  <span>🥪</span>
                  <span>CLAIM +5 🥪 CUCUMBER SANDWICHES</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1.5 bg-paper-200 border-2 border-ink rounded-2xl p-1 font-display font-black text-[11px] sm:text-xs text-center">
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('rage'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'rage' ? 'bg-white shadow-sketch border border-ink text-coral-600' : 'text-ink-light hover:text-ink'}`}
          >
            🔥 VENT & POP
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('cravings'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'cravings' ? 'bg-white shadow-sketch border border-ink text-amber-700' : 'text-ink-light hover:text-ink'}`}
          >
            🍜 CRAVINGS
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('affirmations'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'affirmations' ? 'bg-white shadow-sketch border border-ink text-purple-700' : 'text-ink-light hover:text-ink'}`}
          >
            ✨ AFFIRMATIONS
          </button>
          <button
            onClick={() => { audioEngine.playSfx('click'); setActiveTab('vent'); }}
            className={`py-1.5 px-1 rounded-xl transition-all ${activeTab === 'vent' ? 'bg-white shadow-sketch border border-ink text-emerald-700' : 'text-ink-light hover:text-ink'}`}
          >
            🎧 MOOD BEAT
          </button>
        </div>

        {/* Tab 1: Interactive Stress Popper */}
        {activeTab === 'rage' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-coral-500" />
                <span>TAP TO POP & SMASH ANNOYANCES</span>
              </span>
              <span className="font-handwritten text-xs font-bold text-coral-600 bg-coral-50 border border-coral-300 px-2 py-0.5 rounded-full">
                Popped: {totalPopped} / {STRESS_BUBBLES.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STRESS_BUBBLES.map((bubble) => {
                const isPopped = poppedBubbles[bubble.id];
                return (
                  <button
                    key={bubble.id}
                    onClick={() => handlePop(bubble.id)}
                    disabled={isPopped}
                    className={`
                      p-3 rounded-2xl border-2 text-left transition-all relative font-handwritten text-xs font-bold
                      ${
                        isPopped
                          ? 'border-emerald-300 bg-emerald-50/70 text-emerald-800 line-through opacity-75'
                          : 'border-ink/30 bg-white hover:border-coral-500 hover:bg-rose-50/50 shadow-sketch-xs hover:scale-102 active:scale-95'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{bubble.text}</span>
                      <span className="shrink-0 text-base">
                        {isPopped ? '💥' : '🎈'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {totalPopped === STRESS_BUBBLES.length && (
              <div className="bg-emerald-100 border-2 border-emerald-500 rounded-2xl p-3 text-center font-display font-black text-xs text-emerald-800 animate-bounce-gentle">
                🎉 ALL ANNOYANCES DEMOLISHED! Take a big breath, you are totally in control!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Comfort Food Cravings */}
        {activeTab === 'cravings' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>HANGRY EMERGENCY PRESCRIPTION</span>
              </span>
              <span className="font-handwritten text-xs font-bold text-ink-light">
                Order or cook ASAP
              </span>
            </div>

            <div className="space-y-2">
              {COMFORT_CRAVINGS.map((craving, idx) => (
                <div 
                  key={idx}
                  className="bg-white border-2 border-ink/30 rounded-2xl p-3 flex items-start gap-3 shadow-sketch-xs hover:border-ink transition-all"
                >
                  <div className="w-11 h-11 rounded-xl border border-ink/20 bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                    {craving.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display font-black text-xs sm:text-sm text-ink truncate">
                        {craving.title}
                      </h4>
                      <span className="bg-amber-100 text-amber-800 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 shrink-0">
                        {craving.tag}
                      </span>
                    </div>
                    <p className="font-handwritten text-xs text-ink-light font-bold mt-0.5">
                      {craving.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Affirmations */}
        {activeTab === 'affirmations' && (
          <div className="space-y-4 text-center py-3">
            <div className="w-16 h-16 mx-auto rounded-full border-2.5 border-ink bg-purple-100 flex items-center justify-center text-2xl shadow-sketch">
              👑
            </div>

            <div className="bg-white border-2.5 border-ink rounded-3xl p-6 shadow-sketch space-y-3 max-w-md mx-auto">
              <Sparkles className="w-6 h-6 text-purple-600 mx-auto animate-spin" />
              <p className="font-display font-black text-base sm:text-lg text-ink leading-snug">
                "{GIRL_AFFIRMATIONS[affirmationIdx]}"
              </p>
              <div className="font-handwritten text-xs text-purple-700 font-bold">
                — Kritika's Fact of Life #{affirmationIdx + 1} ♡
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playSfx('powerup');
                setAffirmationIdx((affirmationIdx + 1) % GIRL_AFFIRMATIONS.length);
              }}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-display font-black text-xs uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-105 active:scale-95 transition-all"
            >
              GIVE ME ANOTHER DOSE OF CONFIDENCE ✨
            </button>
          </div>
        )}

        {/* Tab 4: Mood Beat Switches */}
        {activeTab === 'vent' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs uppercase tracking-wider text-ink flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-purple-600" />
                <span>INSTANT AUDIO THERAPY</span>
              </span>
              <button 
                onClick={onOpenMusic}
                className="font-handwritten text-xs font-bold text-purple-700 underline"
              >
                Open Full Hindi Jukebox →
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('love_you_zindagi');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-pink-50 hover:bg-pink-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌸</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      LOVE YOU ZINDAGI (Dear Zindagi)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      "Jo dil se lage use keh do Hi!" — Ultimate self-love reset
                    </div>
                  </div>
                </div>
                <span className="bg-pink-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('yeh_ishq_hai');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-red-50 hover:bg-red-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏔️</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      YEH ISHQ HAI (Jab We Met)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      "Main apni favourite hoon!" — Dance away all drama & stress
                    </div>
                  </div>
                </div>
                <span className="bg-red-500 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('london_thumakda');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-purple-50 hover:bg-purple-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      LONDON THUMAKDA (Queen)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      Celebrate queen energy with maximum swagger & rhythm
                    </div>
                  </div>
                </div>
                <span className="bg-purple-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>

              <button
                onClick={() => {
                  if (onOpenHindiSong) onOpenHindiSong('iktara');
                  else onOpenMusic();
                }}
                className="w-full p-3 bg-amber-50 hover:bg-amber-100 border-2 border-ink rounded-2xl text-left flex items-center justify-between shadow-sketch-xs transition-all hover:scale-101"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <div className="font-display font-black text-xs text-ink">
                      IKTARA (Wake Up Sid)
                    </div>
                    <div className="font-handwritten text-xs text-ink-light font-bold">
                      Soulful rainy chai acoustic warmth to calm your soul
                    </div>
                  </div>
                </div>
                <span className="bg-amber-600 text-white font-display font-black text-[10px] px-2.5 py-1 rounded-xl border border-ink">
                  PLAY
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Comfort Quote */}
        <div className="bg-rose-50 border-1.5 border-rose-300 rounded-2xl p-3 flex items-center gap-3">
          <Smile className="w-5 h-5 text-coral-500 shrink-0" />
          <p className="font-handwritten text-xs text-rose-900 font-bold">
            "Bad moods are temporary, but good food, great music, and you being iconic is forever." ♡
          </p>
        </div>
      </div>
    </div>
  );
};
