import React, { useState, useEffect, useRef } from 'react';
import { 
  AI_ANIME_SCENES, 
  SURPRISE_ME_SCENES, 
  CURATED_ANIME_CLIPS, 
  type AnimeScene 
} from '../data/animeScenes';
import { wellnessState, type KritikaMoodId } from '../services/wellnessState';
import { animeAudio } from '../services/animeAudio';

interface AnimeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMood?: KritikaMoodId;
}

export const AnimeStudioModal: React.FC<AnimeStudioModalProps> = ({ isOpen, onClose, initialMood }) => {
  const [activeTab, setActiveTab] = useState<'ai_studio' | 'pick_me_up'>('ai_studio');
  const [selectedMood, setSelectedMood] = useState<KritikaMoodId>(initialMood || wellnessState.getQueenMood());
  const [currentScene, setCurrentScene] = useState<AnimeScene>(() => {
    const list = AI_ANIME_SCENES[initialMood || wellnessState.getQueenMood()] || AI_ANIME_SCENES['Happy'];
    return list[0];
  });
  const [typedText, setTypedText] = useState<string>('');
  const [showEndcard, setShowEndcard] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [curatedFilter, setCuratedFilter] = useState<string>('All');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync with prop or global mood
  useEffect(() => {
    const mood = initialMood || wellnessState.getQueenMood();
    setSelectedMood(mood);
    const scenes = AI_ANIME_SCENES[mood] || AI_ANIME_SCENES['Happy'];
    setCurrentScene(scenes[0]);
  }, [initialMood, isOpen]);

  // When scene changes, start typewriter & audio
  useEffect(() => {
    if (!isOpen || activeTab !== 'ai_studio') {
      animeAudio.stopAmbientSound();
      return;
    }

    setTypedText('');
    setShowEndcard(false);
    animeAudio.playAmbientSound(currentScene.ambientSoundType);

    let charIndex = 0;
    const textToType = currentScene.dialogueText;
    const interval = setInterval(() => {
      if (charIndex <= textToType.length) {
        setTypedText(textToType.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowEndcard(true);
        }, 800);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      animeAudio.stopAmbientSound();
    };
  }, [currentScene, isOpen, activeTab]);

  // Canvas visual rendering animation
  useEffect(() => {
    if (!isOpen || activeTab !== 'ai_studio') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 340);

    // Particle setup based on particleType
    const particles: Array<{ x: number; y: number; speed: number; size: number; alpha: number; angle: number }> = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 2.5,
        size: 3 + Math.random() * 6,
        alpha: 0.3 + Math.random() * 0.7,
        angle: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, currentScene.bgGradient[0]);
      grad.addColorStop(1, currentScene.bgGradient[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Scene specific artwork elements
      if (currentScene.sceneType === 'rainy_window') {
        // Window frame
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 4;
        ctx.strokeRect(30, 20, width - 60, height - 40);
        ctx.beginPath();
        ctx.moveTo(width / 2, 20);
        ctx.lineTo(width / 2, height - 20);
        ctx.stroke();

        // Warm cozy light inside
        const warmGlow = ctx.createRadialGradient(width * 0.3, height * 0.7, 10, width * 0.3, height * 0.7, 180);
        warmGlow.addColorStop(0, 'rgba(253, 224, 71, 0.4)');
        warmGlow.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = warmGlow;
        ctx.fillRect(0, 0, width, height);

        // Rain particles
        ctx.strokeStyle = 'rgba(191, 219, 254, 0.6)';
        ctx.lineWidth = 2;
        particles.forEach(p => {
          p.y += p.speed * 2.5;
          p.x -= 0.5;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.size * 2);
          ctx.stroke();
        });

        // Steam from hot tea
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        const steamY = (height * 0.7) - ((frame * 1.5) % 40);
        ctx.arc(width * 0.3, steamY, 12, 0, Math.PI * 2);
        ctx.fill();

      } else if (currentScene.sceneType === 'sleepy_bedroom' || currentScene.sceneType === 'cloud_nap') {
        // Crescent moon
        ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
        ctx.beginPath();
        ctx.arc(width - 80, 70, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = currentScene.bgGradient[0];
        ctx.beginPath();
        ctx.arc(width - 70, 65, 28, 0, Math.PI * 2);
        ctx.fill();

        // Twinkling stars
        particles.forEach((p, idx) => {
          const twinkle = Math.sin(frame * 0.05 + idx) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(254, 240, 138, ${twinkle * p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (currentScene.sceneType === 'blooming_city') {
        // Sakura blossom petals fluttering down
        particles.forEach(p => {
          p.y += p.speed * 0.8;
          p.x += Math.sin(frame * 0.03 + p.y * 0.02) * 1.5;
          if (p.y > height) p.y = -10;
          ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.angle + frame * 0.02, 0, Math.PI * 2);
          ctx.fill();
        });

      } else {
        // Joyful sparkles / Floating hearts
        particles.forEach(p => {
          p.y -= p.speed * 0.6;
          p.x += Math.sin(frame * 0.02 + p.y * 0.01) * 0.8;
          if (p.y < 0) p.y = height + 10;
          ctx.fillStyle = `rgba(255, 182, 193, ${p.alpha})`;
          ctx.font = `${p.size * 2}px sans-serif`;
          ctx.fillText(currentScene.particleType === 'hearts' ? '💖' : '✨', p.x, p.y);
        });
      }

      // Cozy character silhouette in foreground
      ctx.fillStyle = 'rgba(25, 18, 36, 0.45)';
      ctx.beginPath();
      ctx.arc(width * 0.3, height - 35, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(width * 0.3, height, 60, 45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Anime Kitty ears silhouette
      ctx.beginPath();
      ctx.moveTo(width * 0.3 - 25, height - 70);
      ctx.lineTo(width * 0.3 - 38, height - 95);
      ctx.lineTo(width * 0.3 - 10, height - 75);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width * 0.3 + 25, height - 70);
      ctx.lineTo(width * 0.3 + 38, height - 95);
      ctx.lineTo(width * 0.3 + 10, height - 75);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentScene, isOpen, activeTab]);

  const handleSelectMood = (mood: KritikaMoodId) => {
    setSelectedMood(mood);
    const scenes = AI_ANIME_SCENES[mood] || AI_ANIME_SCENES['Happy'];
    setCurrentScene(scenes[0]);
  };

  const handleSurpriseMe = () => {
    const randomScene = SURPRISE_ME_SCENES[Math.floor(Math.random() * SURPRISE_ME_SCENES.length)];
    setCurrentScene(randomScene);
  };

  const handleNextScene = () => {
    const list = AI_ANIME_SCENES[selectedMood] || AI_ANIME_SCENES['Happy'];
    const curIdx = list.findIndex(s => s.id === currentScene.id);
    const nextIdx = (curIdx + 1) % list.length;
    setCurrentScene(list[nextIdx]);
  };

  const toggleSound = () => {
    const muted = animeAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  if (!isOpen) return null;

  const filteredClips = curatedFilter === 'All' 
    ? CURATED_ANIME_CLIPS 
    : CURATED_ANIME_CLIPS.filter(c => c.mood === curatedFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FFFDF9] border-2 border-pink-200/80 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
        
        {/* Header with Washi Tape styling */}
        <div className="relative bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 p-4 border-b border-pink-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">🎀</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-pink-900 tracking-tight flex items-center gap-2">
                Kritika's AI Anime Studio
                <span className="text-xs bg-pink-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Magical Comfort
                </span>
              </h2>
              <p className="text-xs text-pink-700/80">Tailored anime scenes & emotional pick-me-ups for your soul</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-pink-700 shadow-sm transition border border-pink-200 text-sm"
              title={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
            >
              {isAudioMuted ? "🔇" : "🔊"}
            </button>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-pink-100 text-pink-800 font-bold flex items-center justify-center shadow-sm transition border border-pink-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Toggle: AI Studio vs Curated Pick-Me-Up */}
        <div className="flex border-b border-pink-100 bg-pink-50/50 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('ai_studio')}
            className={`px-4 py-2 text-sm font-bold rounded-t-2xl transition flex items-center gap-2 ${
              activeTab === 'ai_studio' 
                ? 'bg-[#FFFDF9] text-pink-700 border-t-2 border-x-2 border-pink-300 shadow-sm' 
                : 'text-stone-500 hover:text-pink-600'
            }`}
          >
            <span>✨ AI Anime Studio</span>
            <span className="text-xs bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full font-semibold">Dynamic</span>
          </button>
          <button
            onClick={() => setActiveTab('pick_me_up')}
            className={`px-4 py-2 text-sm font-bold rounded-t-2xl transition flex items-center gap-2 ${
              activeTab === 'pick_me_up' 
                ? 'bg-[#FFFDF9] text-pink-700 border-t-2 border-x-2 border-pink-300 shadow-sm' 
                : 'text-stone-500 hover:text-pink-600'
            }`}
          >
            <span>🌸 Anime Pick-Me-Up</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-semibold">Library</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {activeTab === 'ai_studio' ? (
            <>
              {/* Mood selector pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-pink-50/60 p-3 rounded-2xl border border-pink-200/60">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-black text-pink-800 uppercase tracking-wider mr-1">Choose Vibe:</span>
                  {(['Happy', 'Tired', 'Stressed', 'Cozy', 'Excited', 'Low', 'Romantic'] as KritikaMoodId[]).map(m => (
                    <button
                      key={m}
                      onClick={() => handleSelectMood(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm ${
                        selectedMood === m && currentScene.mood === m
                          ? 'bg-pink-600 text-white shadow-pink-200 scale-105'
                          : 'bg-white text-pink-800 hover:bg-pink-100 border border-pink-200'
                      }`}
                    >
                      {m === 'Happy' && '🌸 Happy'}
                      {m === 'Tired' && '💤 Tired'}
                      {m === 'Stressed' && '🥺 Stressed'}
                      {m === 'Cozy' && '🤍 Cozy'}
                      {m === 'Excited' && '✨ Excited'}
                      {m === 'Low' && '💕 Low'}
                      {m === 'Romantic' && '🎀 Romantic'}
                    </button>
                  ))}
                </div>

                {/* Surprise Me Button */}
                <button
                  onClick={handleSurpriseMe}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-md hover:brightness-105 transition flex items-center gap-1.5 animate-pulse"
                >
                  <span>🪄 Surprise Me ✨</span>
                </button>
              </div>

              {/* The Cinematic Canvas Player Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-pink-300 shadow-xl bg-slate-900 group">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-[320px] block object-cover"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    {currentScene.title}
                  </span>
                  <span className="text-[10px] text-pink-200 bg-pink-500/30 px-2 py-0.5 rounded-full border border-pink-400/40">
                    {currentScene.theme}
                  </span>
                </div>

                {/* Action controls on top right */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={handleNextScene}
                    className="px-3 py-1 bg-white/90 hover:bg-white text-stone-800 text-xs font-bold rounded-full shadow backdrop-blur-sm transition flex items-center gap-1"
                  >
                    <span>Next Scene 🪄</span>
                  </button>
                </div>

                {/* Bottom Subtitle / Dialogue Box */}
                <div className="absolute bottom-3 inset-x-3 bg-slate-950/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white flex flex-col justify-between min-h-[90px]">
                  <p className="text-sm font-medium text-pink-100 leading-relaxed font-serif">
                    “{typedText}”
                    <span className="animate-pulse inline-block w-1.5 h-3.5 bg-pink-400 ml-1 translate-y-0.5" />
                  </p>

                  {/* Personalized Endcard Reveal */}
                  {showEndcard && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between animate-fade-in">
                      <div className="flex items-center gap-2">
                        <span className="text-lg animate-bounce">💌</span>
                        <span className="text-xs font-black text-amber-300 tracking-wide bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/40">
                          {currentScene.personalizedEndcard}
                        </span>
                      </div>
                      <span className="text-[10px] text-pink-300/80 italic">For Kritika With Love ♡</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Scene Details Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200/60 flex items-start gap-3">
                  <span className="text-2xl">🐱</span>
                  <div>
                    <h4 className="font-bold text-rose-900">Scene Character Action</h4>
                    <p className="text-rose-700/80 mt-0.5">{currentScene.characterAction}</p>
                  </div>
                </div>

                <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200/60 flex items-start gap-3">
                  <span className="text-2xl">🌸</span>
                  <div>
                    <h4 className="font-bold text-purple-900">Environment & Atmosphere</h4>
                    <p className="text-purple-700/80 mt-0.5">{currentScene.environmentDescription}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Curated Anime Pick-Me-Up Gallery */
            <div className="space-y-4">
              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-purple-800 uppercase tracking-wider mr-1">Filter:</span>
                {['All', 'Happy', 'Tired', 'Stressed', 'Cozy', 'Excited', 'Low', 'Romantic'].map(f => (
                  <button
                    key={f}
                    onClick={() => setCuratedFilter(f)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      curatedFilter === f
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white text-purple-800 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClips.map(clip => (
                  <div 
                    key={clip.id}
                    className="bg-white rounded-2xl border-2 border-pink-200/70 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
                  >
                    <div className="relative h-44 overflow-hidden bg-pink-100">
                      <img 
                        src={clip.mediaUrl} 
                        alt={clip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                        {clip.vibeTag}
                      </span>
                      <span className="absolute bottom-2 right-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        {clip.animeSource}
                      </span>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm">{clip.title}</h4>
                        <p className="text-xs text-pink-700/90 mt-1 italic font-serif">
                          “{clip.caption}”
                        </p>
                      </div>

                      <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1 text-pink-600 font-bold">
                          <span>🎀</span> Kritika's Comfort Pick
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedMood(clip.mood);
                            setActiveTab('ai_studio');
                          }}
                          className="text-pink-600 hover:text-pink-800 font-bold hover:underline"
                        >
                          Generate AI Scene →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-pink-50/70 p-3 px-6 border-t border-pink-200/60 flex items-center justify-between text-xs text-pink-700 font-medium">
          <div className="flex items-center gap-2">
            <span>🤍</span>
            <span>Created specifically for Kritika's daily comfort and happiness.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-pink-300 hover:bg-pink-100 text-pink-800 rounded-xl font-bold transition shadow-sm"
          >
            Back to Haven 🌸
          </button>
        </div>

      </div>
    </div>
  );
};
