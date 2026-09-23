import React, { useState } from 'react';
import { gameState } from '../services/gameState';
import { wellnessState } from '../services/wellnessState';
import { RECIPES } from '../data/recipes';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Camera, Download, Check } from 'lucide-react';

interface GlowUpWeekModalProps {
  onClose: () => void;
}

export const GlowUpWeekModal: React.FC<GlowUpWeekModalProps> = ({ onClose }) => {
  const player = gameState.getPlayer();
  const pinnedIds = wellnessState.getPinnedSongIds();
  const allSongs = wellnessState.getAllSongs();
  const topSong = allSongs.find(s => pinnedIds.includes(s.id)) || allSongs[0];
  const unlockedRecipes = RECIPES.filter(r => (player.unlockedRecipes || []).includes(r.id));
  const featuredRecipe = unlockedRecipes[0] || RECIPES[0];

  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate & export polaroid scrapbook as a high-res image
  const handleExportScrapbookImage = async () => {
    try {
      setIsExporting(true);
      audioEngine.playSfx('fanfare');

      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1450;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Paper & Texture
      ctx.fillStyle = '#FFFDF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cute sketch dashed frame
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 12]);
      ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);
      ctx.setLineDash([]);

      // 2. Header Banner
      ctx.fillStyle = '#FB7185';
      ctx.fillRect(150, 65, canvas.width - 300, 75);
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 65, canvas.width - 300, 75);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 36px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("KRITIKA'S GLOW-UP WEEK 📸", canvas.width / 2, 116);

      ctx.fillStyle = '#4B5563';
      ctx.font = 'bold 22px Caveat, cursive, sans-serif';
      ctx.fillText("A polaroid memory reel of triumphs, songs & delicious flavors! ♡", canvas.width / 2, 175);

      // Helper to draw a Polaroid
      const drawPolaroid = (
        x: number,
        y: number,
        w: number,
        h: number,
        angleDeg: number,
        washiColor: string,
        bgColor: string,
        emoji: string,
        title: string,
        subtitle: string,
        caption: string
      ) => {
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate((angleDeg * Math.PI) / 180);

        // White card body
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.strokeStyle = '#241F21';
        ctx.lineWidth = 4;
        ctx.strokeRect(-w / 2, -h / 2, w, h);

        // Washi tape on top
        ctx.fillStyle = washiColor;
        ctx.fillRect(-60, -h / 2 - 12, 120, 24);
        ctx.strokeStyle = '#241F21';
        ctx.lineWidth = 2;
        ctx.strokeRect(-60, -h / 2 - 12, 120, 24);

        // Inner photo box
        ctx.fillStyle = bgColor;
        ctx.fillRect(-w / 2 + 20, -h / 2 + 25, w - 40, h - 130);
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 2;
        ctx.strokeRect(-w / 2 + 20, -h / 2 + 25, w - 40, h - 130);

        // Emoji & Title inside photo box
        ctx.font = '64px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(emoji, 0, -h / 2 + 120);

        ctx.fillStyle = '#111827';
        ctx.font = 'bold 26px Outfit, sans-serif';
        ctx.fillText(title, 0, -h / 2 + 180);

        ctx.fillStyle = '#6B7280';
        ctx.font = '20px sans-serif';
        ctx.fillText(subtitle, 0, -h / 2 + 215);

        // Bottom Handwritten Caption
        ctx.fillStyle = '#831843';
        ctx.font = 'bold 26px Caveat, cursive, sans-serif';
        ctx.fillText(caption, 0, h / 2 - 40);

        ctx.restore();
      };

      // Polaroid 1: Chef Rank & Cucumber Sandwiches
      drawPolaroid(
        100, 240, 460, 480, -2,
        'rgba(244, 114, 182, 0.7)',
        '#ECFDF5',
        '🥪',
        `${player.cucumberSandwiches || 0} Sandwiches`,
        player.chefTitle || 'Apprentice Chopper 🥒',
        '"Brain fuel earned with flying colors!" ♡'
      );

      // Polaroid 2: Pinned Song Jam
      drawPolaroid(
        640, 240, 460, 480, 2.5,
        'rgba(192, 132, 252, 0.7)',
        '#FAF5FF',
        topSong.emoji || '🎵',
        topSong.title,
        topSong.movie,
        '"Your weekly soundtrack anthem!" 🎶'
      );

      // Polaroid 3: Unlocked Recipe Milestone
      drawPolaroid(
        100, 770, 460, 480, 1.5,
        'rgba(251, 146, 60, 0.7)',
        '#FFF1F2',
        featuredRecipe.emoji || '🍳',
        featuredRecipe.title.split('&')[0],
        `Paired with ${featuredRecipe.moviePairing.movie.split('(')[0]}`,
        '"Signature dish of the week!" 🍲'
      );

      // Polaroid 4: Queen Companion Art
      drawPolaroid(
        640, 770, 460, 480, -1.8,
        'rgba(250, 204, 21, 0.7)',
        '#FEF3C7',
        '👑',
        'Wink & Conquer',
        'Mood: Unstoppable Sparkle',
        '"Radiating royal boss energy always!" ✨'
      );

      // 4. Queen's Verdict Footer Banner
      ctx.fillStyle = '#FDF2F8';
      ctx.fillRect(80, 1300, canvas.width - 160, 95);
      ctx.strokeStyle = '#241F21';
      ctx.lineWidth = 3;
      ctx.strokeRect(80, 1300, canvas.width - 160, 95);

      ctx.fillStyle = '#BE185D';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💖 QUEEN\'S OFFICIAL VERDICT 💖', canvas.width / 2, 1335);

      ctx.fillStyle = '#374151';
      ctx.font = 'bold 24px Caveat, cursive, sans-serif';
      ctx.fillText('"You brought warmth, wisdom, and unmatched style to every single day this week. So proud of you, Kritika!" ♡', canvas.width / 2, 1372);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Kritika_GlowUp_Scrapbook_${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#A855F7', '#F59E0B']
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // export fallback
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={<div className="w-full h-full bg-gradient-to-tr from-pink-400 to-purple-400 rounded-xl flex items-center justify-center text-white"><Camera className="w-5 h-5 text-white" /></div>}
      title="YOUR GLOW-UP WEEK 📸"
      subtitle="A polaroid memory reel of your triumphs, songs, and flavors!"
      badge={<span className="bg-pink-100 text-pink-700 font-handwritten text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-300">SCRAPBOOK</span>}
    >
      <div className="space-y-4">
        {/* Export Action Bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 p-2.5 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <div className="text-left">
              <span className="font-display font-black text-xs text-ink block">
                Save or Share Scrapbook
              </span>
              <span className="font-handwritten text-[11px] text-pink-700 font-bold">
                Download high-res memory polaroid image
              </span>
            </div>
          </div>

          <button
            onClick={handleExportScrapbookImage}
            disabled={isExporting}
            className="sketch-btn-primary px-3.5 py-1.5 text-xs font-black uppercase flex items-center gap-1.5 shadow-sketch-xs hover:scale-105 active:scale-95 transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>SAVED! ✨</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'EXPORTING...' : 'EXPORT IMAGE'}</span>
              </>
            )}
          </button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Polaroid 1: Chef Rank & Cucumber Sandwiches */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-emerald-50 rounded-xl border border-emerald-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">🥪</span>
              <span className="font-display font-black text-xl text-emerald-800">
                {player.cucumberSandwiches || 0} Sandwiches
              </span>
              <span className="font-handwritten text-[11px] text-emerald-700 font-bold">
                {player.chefTitle || 'Apprentice Chopper 🥒'}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Brain fuel earned with flying colors!" ♡
            </p>
          </div>

          {/* Polaroid 2: Pinned Song Jam */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-purple-50 rounded-xl border border-purple-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{topSong.emoji}</span>
              <span className="font-display font-black text-sm text-purple-900 truncate max-w-full">
                {topSong.title}
              </span>
              <span className="font-handwritten text-[11px] text-purple-700 font-bold truncate">
                {topSong.movie}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Your weekly soundtrack vibe!" 🎵
            </p>
          </div>

          {/* Polaroid 3: Unlocked Recipe Milestone */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[1deg] text-center space-y-2 relative">
            <div className="washi-tape w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-rose-50 rounded-xl border border-rose-300 flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl mb-1">{featuredRecipe.emoji}</span>
              <span className="font-display font-black text-xs text-rose-900 truncate max-w-full">
                {featuredRecipe.title.split('&')[0]}
              </span>
              <span className="font-handwritten text-[10px] text-rose-700 font-bold">
                Paired with {featuredRecipe.moviePairing.movie.split('(')[0]}
              </span>
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Signature dish of the week!" 🍳
            </p>
          </div>

          {/* Polaroid 4: Queen's Companion Sticker */}
          <div className="bg-white border-2 border-ink p-3 rounded-2xl shadow-sketch-sm rotate-[-1.5deg] text-center space-y-2 relative">
            <div className="washi-tape-lavender w-20 h-4 mx-auto -mt-5 rounded-xs" />
            
            <div className="h-28 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-center p-2 shadow-inner overflow-hidden">
              <img 
                src="/marisol/avatars/03_wink_conquer.png" 
                alt="Kritika wink" 
                className="h-full object-contain"
              />
            </div>

            <p className="font-handwritten text-xs text-ink font-bold pt-1">
              "Wink & conquer every challenge!" 😉
            </p>
          </div>
        </div>

        {/* Weekly Sisterly Summary Banner */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-amber-100 border-2 border-pink-300 rounded-2xl p-3.5 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-display font-black text-xs text-pink-900">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>QUEEN'S VERDICT</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-handwritten text-xs sm:text-sm text-ink font-bold">
            "You brought warmth, wisdom, and unmatched style to every single day this week. So proud of you, Kritika!" ♡
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
