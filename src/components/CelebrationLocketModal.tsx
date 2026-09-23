import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/synthAudioEngine';
import { BaseModal } from './BaseModal';
import { Heart, Sparkles, Award } from 'lucide-react';

interface CelebrationLocketModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const CELEBRATION_IMAGES = [
  '/marisol/avatars/03_wink_conquer.png',
  '/marisol/avatars/05_chai_happiness.png',
  '/marisol/avatars/02_happier_days.png',
  '/marisol/avatars/11_music_mood.png',
  '/marisol/avatars/06_silly_vibe.png'
];

export const CelebrationLocketModal: React.FC<CelebrationLocketModalProps> = ({
  onClose,
  title = "You did amazing, babe! 💖🎀",
  subtitle = "Another culinary milestone conquered in style!"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    audioEngine.playSfx('fanfare');

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#EC4899', '#FBBF24', '#A855F7', '#10B981']
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentImageIndex = 0;
    let progress = 0;

    const loadedImages: HTMLImageElement[] = [];
    let imagesReady = false;

    let loadedCount = 0;
    CELEBRATION_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === CELEBRATION_IMAGES.length) {
          imagesReady = true;
        }
      };
      loadedImages.push(img);
    });

    const particles: { x: number; y: number; speed: number; size: number; char: string }[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * 320,
        y: Math.random() * 320,
        speed: 0.5 + Math.random() * 1.2,
        size: 14 + Math.random() * 12,
        char: ['💖', '✨', '🎀', '🌸'][Math.floor(Math.random() * 4)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imagesReady && loadedImages.length > 0) {
        progress += 0.008;
        if (progress >= 1) {
          progress = 0;
          currentImageIndex = (currentImageIndex + 1) % loadedImages.length;
        }

        const currentImg = loadedImages[currentImageIndex];
        const nextImg = loadedImages[(currentImageIndex + 1) % loadedImages.length];

        const gradient = ctx.createRadialGradient(160, 160, 20, 160, 160, 160);
        gradient.addColorStop(0, '#FFF1F2');
        gradient.addColorStop(1, '#FCE7F3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = 1.0 + Math.sin(progress * Math.PI) * 0.08;
        const w = 240 * scale;
        const h = 240 * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.globalAlpha = Math.max(0, 1 - progress * 1.5);
        if (currentImg.complete) {
          ctx.drawImage(currentImg, x, y, w, h);
        }

        ctx.globalAlpha = Math.min(1, progress * 1.5);
        if (nextImg.complete) {
          ctx.drawImage(nextImg, x, y, w, h);
        }
        ctx.globalAlpha = 1.0;
      }

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -20) p.y = canvas.height + 10;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText(p.char, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <BaseModal onClose={onClose} maxWidth="max-w-md" hideHeader className="text-center">
      <div className="space-y-4">
        {/* Celebration Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-display font-black text-xs px-3.5 py-1 rounded-full border border-ink shadow-xs">
          <Award className="w-4 h-4" />
          <span>MILESTONE CONQUERED!</span>
        </div>

        {/* Heart Locket Ornate Frame */}
        <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 p-3 bg-gradient-to-tr from-amber-300 via-rose-300 to-pink-400 rounded-full border-4 border-ink shadow-sketch-xl flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden border-3 border-white shadow-inner bg-pink-50 relative">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          <Heart className="w-8 h-8 fill-pink-500 text-white absolute -top-2 -left-2 drop-shadow-md animate-bounce-gentle" />
          <Sparkles className="w-8 h-8 text-amber-300 absolute -bottom-2 -right-2 drop-shadow-md animate-spin" />
        </div>

        {/* Cute Speech Bubble Message */}
        <div className="relative bg-white border-2.5 border-ink rounded-3xl p-4 shadow-sketch text-center space-y-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-t-2.5 border-l-2.5 border-ink rotate-45" />

          <h3 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
            "{title}"
          </h3>
          <p className="font-handwritten text-xs sm:text-sm text-pink-700 font-bold">
            {subtitle}
          </p>
        </div>

        {/* Claim & Continue Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-display font-black text-sm uppercase rounded-2xl border-2 border-ink shadow-sketch hover:scale-102 active:scale-98 transition-all"
        >
          THANK YOU, CELEBRATION UNLOCKED! 💖✨
        </button>

        <p className="font-handwritten text-[11px] text-ink-light font-bold">
          🔒 Private local animation — no external photo uploads
        </p>
      </div>
    </BaseModal>
  );
};

