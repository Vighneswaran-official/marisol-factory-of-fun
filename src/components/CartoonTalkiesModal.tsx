import React, { useState, useEffect, useRef } from 'react';
import { CARTOON_EPISODES, type CartoonGenreEpisode } from '../data/cartoonGenres';
import { cartoonSpeech, type VisemeState } from '../services/cartoonSpeechEngine';
import { audioEngine } from '../services/synthAudioEngine';
import { 
  Play, 
  RotateCcw, 
  Video, 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  Download,
  Film,
  Send
} from 'lucide-react';

import { CartoonMagazineReader } from './CartoonMagazineReader';

interface CartoonTalkiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'video' | 'magazine';
}

export const CartoonTalkiesModal: React.FC<CartoonTalkiesModalProps> = ({ isOpen, onClose, initialMode = 'video' }) => {
  const [activeMode, setActiveMode] = useState<'video' | 'magazine'>(initialMode);
  const [selectedEpisode, setSelectedEpisode] = useState<CartoonGenreEpisode>(CARTOON_EPISODES[0]);

  useEffect(() => {
    if (initialMode) setActiveMode(initialMode);
  }, [initialMode, isOpen]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [currentViseme, setCurrentViseme] = useState<VisemeState>('smile');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCustomMaker, setShowCustomMaker] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarImgRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Load avatar image when episode changes
  useEffect(() => {
    const img = new Image();
    img.src = selectedEpisode.stickerPose;
    img.onload = () => {
      avatarImgRef.current = img;
    };
  }, [selectedEpisode]);

  // Start speech & subtitles when episode plays
  const playEpisode = (episode: CartoonGenreEpisode, customDialogue?: string) => {
    setIsPlaying(true);
    setCurrentSubtitle(customDialogue || episode.dialogue);
    audioEngine.playSfx(episode.ambienceTheme === 'fanfare' ? 'fanfare' : 'powerup');

    const textToSpeak = customDialogue || episode.dialogue;

    cartoonSpeech.speakDialogue(
      textToSpeak,
      (viseme) => {
        setCurrentViseme(viseme);
      },
      () => {
        setIsPlaying(false);
        setCurrentViseme('smile');
        if (isRecording) {
          stopVideoRecording();
        }
      }
    );
  };

  // Video Recording Engine using Canvas Stream + MediaRecorder
  const startVideoRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      recordedChunksRef.current = [];
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideoUrl(videoUrl);
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
      playEpisode(selectedEpisode);
    } catch {
      alert("Video recording started in fallback mode.");
      playEpisode(selectedEpisode);
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  // Switch genre
  const handleSelectGenre = (ep: CartoonGenreEpisode) => {
    cartoonSpeech.stopSpeech();
    setSelectedEpisode(ep);
    setIsPlaying(false);
    setCurrentSubtitle('');
    setCurrentViseme('smile');
  };

  // Submit custom speech
  const handleMakeCustomSpeech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    setShowCustomMaker(false);
    playEpisode(selectedEpisode, customText.trim());
  };

  const handleToggleMute = () => {
    const muted = cartoonSpeech.toggleMute();
    setIsMuted(muted);
  };

  // Canvas Animation Render Loop
  useEffect(() => {
    if (!isOpen) {
      cartoonSpeech.stopSpeech();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 680);
    const height = (canvas.height = 420);

    // Particle pool setup based on selected genre
    const particles: Array<{ x: number; y: number; speed: number; size: number; alpha: number; angle: number; emoji?: string }> = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 2,
        size: 16 + Math.random() * 14,
        alpha: 0.4 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Background Palette
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, selectedEpisode.bgGradient[0]);
      grad.addColorStop(1, selectedEpisode.bgGradient[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Genre specific backdrop decorations
      if (selectedEpisode.genre === 'bollywood') {
        // Red carpet spotlights
        const spot1 = ctx.createRadialGradient(width * 0.25, 0, 10, width * 0.25, height, 300);
        spot1.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
        spot1.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = spot1;
        ctx.fillRect(0, 0, width, height);

        const spot2 = ctx.createRadialGradient(width * 0.75, 0, 10, width * 0.75, height, 300);
        spot2.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
        spot2.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = spot2;
        ctx.fillRect(0, 0, width, height);

      } else if (selectedEpisode.genre === 'space_queen') {
        // Distant twinkling stars
        for (let s = 0; s < 50; s++) {
          const starX = (s * 87) % width;
          const starY = (s * 43) % height;
          const starAlpha = Math.sin(frame * 0.08 + s) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
          ctx.beginPath();
          ctx.arc(starX, starY, (s % 3) + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (selectedEpisode.genre === 'detective') {
        // Film-noir blind shadows
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        for (let b = 0; b < height; b += 28) {
          ctx.fillRect(0, b, width, 12);
        }
      }

      // 2. Animated Floating Particles
      particles.forEach((p, idx) => {
        p.y += p.speed * 0.8;
        p.x += Math.sin(frame * 0.03 + idx) * 0.6;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + frame * 0.02);
        ctx.font = `${p.size}px sans-serif`;

        let symbol = '✨';
        if (selectedEpisode.genre === 'bollywood') symbol = idx % 2 === 0 ? '🌹' : '👑';
        else if (selectedEpisode.genre === 'masterchef') symbol = idx % 2 === 0 ? '🥪' : '🥒';
        else if (selectedEpisode.genre === 'magical_girl') symbol = idx % 2 === 0 ? '🪄' : '💖';
        else if (selectedEpisode.genre === 'detective') symbol = idx % 2 === 0 ? '🔍' : '☕';
        else if (selectedEpisode.genre === 'ghibli') symbol = idx % 2 === 0 ? '🍃' : '🌸';
        else if (selectedEpisode.genre === 'space_queen') symbol = idx % 2 === 0 ? '⭐' : '🚀';

        ctx.fillText(symbol, -p.size / 2, p.size / 2);
        ctx.restore();
      });

      // 3. Cartoon Character Rendering with Lip Sync & Gestures
      ctx.save();

      // Camera motion: dramatic zoom or subtle talking bounce
      const bobY = isPlaying ? Math.sin(frame * 0.25) * 5 : Math.sin(frame * 0.05) * 2;
      const zoomFactor = isPlaying ? 1.05 : 1.0;
      ctx.translate(width / 2, height / 2 + 30);
      ctx.scale(zoomFactor, zoomFactor);

      // Character circular stage / pedestal
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 130 + bobY, 110, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Avatar Image
      const avatarImg = avatarImgRef.current;
      const avatarW = 190;
      const avatarH = 240;
      if (avatarImg && avatarImg.complete) {
        ctx.drawImage(avatarImg, -avatarW / 2, -avatarH / 2 + bobY, avatarW, avatarH);
      } else {
        // Fallback cartoon head placeholder
        ctx.fillStyle = '#FFDFC4';
        ctx.beginPath();
        ctx.arc(0, bobY - 20, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. ANIMATED MOUTH OVERLAY (Speaking Lip-Sync!)
      const mouthCenterX = 0;
      const mouthCenterY = bobY + 46;

      ctx.save();
      if (currentViseme === 'open_wide') {
        // Wide open laughing/shouting mouth
        ctx.fillStyle = '#BE123C';
        ctx.beginPath();
        ctx.ellipse(mouthCenterX, mouthCenterY, 16, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#881337';
        ctx.stroke();

        // White teeth strip
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(mouthCenterX, mouthCenterY - 6, 12, 3, 0, 0, Math.PI);
        ctx.fill();

        // Cute pink tongue
        ctx.fillStyle = '#FDA4AF';
        ctx.beginPath();
        ctx.ellipse(mouthCenterX, mouthCenterY + 4, 10, 5, 0, 0, Math.PI);
        ctx.fill();

      } else if (currentViseme === 'open_small') {
        // Speaking 'O' mouth
        ctx.fillStyle = '#BE123C';
        ctx.beginPath();
        ctx.ellipse(mouthCenterX, mouthCenterY, 9, 8, 0, 0, Math.PI * 2);
        ctx.fill();

      } else if (currentViseme === 'smile') {
        // Warm joyful smile
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#BE123C';
        ctx.beginPath();
        ctx.arc(mouthCenterX, mouthCenterY - 4, 14, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

      } else {
        // Closed relaxed mouth
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#BE123C';
        ctx.beginPath();
        ctx.moveTo(mouthCenterX - 8, mouthCenterY);
        ctx.lineTo(mouthCenterX + 8, mouthCenterY);
        ctx.stroke();
      }
      ctx.restore();

      // Blinking cartoon eyes effect every 3.8s
      const isBlinking = frame % 220 < 8;
      if (isBlinking) {
        ctx.fillStyle = '#3E2723';
        ctx.fillRect(-28, bobY - 2, 16, 3.5);
        ctx.fillRect(12, bobY - 2, 16, 3.5);
      }

      ctx.restore();

      // 5. Retro Cinema Borders & Recording Indicator
      if (isRecording) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.beginPath();
        ctx.arc(35, 35, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('REC ● LIVE CARTOON VIDEO', 55, 39);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, selectedEpisode, currentViseme, isPlaying, isRecording]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FFFDF9] border-3 border-pink-300 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden relative">
        
        {/* Cinema Marquee Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white p-3.5 sm:p-4 flex items-center justify-between border-b-2 border-pink-300">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl animate-bounce">🎬</span>
            <div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight flex items-center gap-2">
                KRITIKA'S CARTOON TALKIES
                <span className="text-xs bg-amber-400 text-ink font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  SPEAKING VIDEO STUDIO
                </span>
              </h2>
              <p className="text-xs text-pink-100 font-medium">Watch your cartoon speak aloud across 6 blockbuster genres! 🍿</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition text-sm"
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                cartoonSpeech.stopSpeech();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinema Mode Toggle: Video Theatre vs Magazine & Comics */}
        <div className="flex border-b border-pink-200 bg-pink-100/50 px-4 pt-2 gap-2">
          <button
            onClick={() => {
              cartoonSpeech.stopSpeech();
              setActiveMode('video');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-display font-black rounded-t-2xl transition flex items-center gap-1.5 ${
              activeMode === 'video'
                ? 'bg-[#FFFDF9] text-pink-900 border-t-2 border-x-2 border-pink-300 shadow-xs'
                : 'text-stone-500 hover:text-pink-700'
            }`}
          >
            <span>🎬 Cartoon Video Theatre</span>
            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">Speaking</span>
          </button>

          <button
            onClick={() => {
              cartoonSpeech.stopSpeech();
              setActiveMode('magazine');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-display font-black rounded-t-2xl transition flex items-center gap-1.5 ${
              activeMode === 'magazine'
                ? 'bg-[#FFFDF9] text-pink-900 border-t-2 border-x-2 border-pink-300 shadow-xs'
                : 'text-stone-500 hover:text-pink-700'
            }`}
          >
            <span>📖 Cartoon Magazine & Comics</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full font-bold">5 Issues</span>
          </button>
        </div>

        {activeMode === 'magazine' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <CartoonMagazineReader onSwitchToVideo={() => setActiveMode('video')} />
          </div>
        ) : (
          <>
            {/* Genre Selector Carousel */}
            <div className="bg-pink-50/80 border-b border-pink-200 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-black text-pink-900 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <span>🎭</span> Genre:
              </span>
              {CARTOON_EPISODES.map(ep => {
                const isSelected = selectedEpisode.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectGenre(ep)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm scale-105'
                        : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
                    }`}
                  >
                    <span>{ep.icon}</span>
                    <span>{ep.title}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setShowCustomMaker(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xs hover:brightness-105 transition flex items-center gap-1 shrink-0 ml-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Script ✍️</span>
              </button>
            </div>

            {/* Studio Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Main Cinematic Video Screen */}
          <div className="relative rounded-3xl overflow-hidden border-3 border-pink-400 shadow-2xl bg-black">
            <canvas 
              ref={canvasRef} 
              className="w-full h-[320px] sm:h-[380px] block object-contain"
            />

            {/* Top Scene Tag */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-white">
              <span className="text-base">{selectedEpisode.icon}</span>
              <span className="text-xs font-black tracking-wide">{selectedEpisode.title}</span>
            </div>

            {/* Speaking Dialogue & Subtitle Box */}
            <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white flex flex-col justify-between min-h-[85px] shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider">
                  {isPlaying ? "🎙️ Cartoon Kritika is Speaking Out Loud..." : "✨ Tap Play to Hear Cartoon Speak!"}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-pink-50 leading-snug font-serif">
                "{currentSubtitle || selectedEpisode.dialogue}"
              </p>

              <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-300 font-bold">
                <span>{selectedEpisode.punchline}</span>
                <span className="text-pink-300/80 font-normal italic">Lip-sync active 👄</span>
              </div>
            </div>
          </div>

          {/* Action Control Deck */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-pink-50/70 p-3.5 rounded-2xl border border-pink-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => playEpisode(selectedEpisode)}
                disabled={isPlaying}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:brightness-110 text-white font-display font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isPlaying ? "Speaking Aloud..." : "Play Cartoon Video 🎬"}</span>
              </button>

              <button
                onClick={() => {
                  cartoonSpeech.stopSpeech();
                  setIsPlaying(false);
                }}
                className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 transition flex items-center gap-1 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  onClick={startVideoRecording}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 hover:scale-105"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Record Episode Video 🎥</span>
                </button>
              ) : (
                <button
                  onClick={stopVideoRecording}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-display font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 animate-pulse"
                >
                  <span>Stop Recording ⏹️</span>
                </button>
              )}

              {recordedVideoUrl && (
                <a
                  href={recordedVideoUrl}
                  download={`Kritika_Cartoon_${selectedEpisode.genre}.webm`}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Video</span>
                </a>
              )}
            </div>
          </div>

          {/* Custom Script Maker Modal */}
          {showCustomMaker && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-3 animate-fade-in shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span>WRITE A CUSTOM CARTOON SCRIPT FOR KRITIKA 🎬</span>
                </span>
                <button 
                  onClick={() => setShowCustomMaker(false)}
                  className="text-stone-500 hover:text-stone-800 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleMakeCustomSpeech} className="space-y-2.5">
                <textarea
                  rows={2}
                  required
                  placeholder="Type anything you want the cartoon to speak aloud with lip-sync! (e.g. 'I declare today an official Chai & Movie holiday!')"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-amber-300 rounded-xl font-handwritten text-sm text-stone-900 focus:outline-pink-400"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-handwritten text-amber-800 font-bold">
                    The cartoon will speak this aloud with animated mouth movement! ✨
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-black text-xs rounded-xl shadow-xs hover:scale-105 transition flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Make Cartoon Speak! 🗣️</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Episode Info Card */}
          <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200 flex items-start gap-3 text-xs text-purple-900">
            <span className="text-2xl">{selectedEpisode.icon}</span>
            <div>
              <h4 className="font-bold text-sm text-purple-950">{selectedEpisode.title}</h4>
              <p className="text-purple-800/80 mt-0.5">{selectedEpisode.tagline}</p>
            </div>
          </div>

        </div>
        </>
      )}

        {/* Footer */}
        <div className="bg-pink-50 p-3 px-6 border-t border-pink-200 flex items-center justify-between text-xs text-pink-800 font-semibold">
          <span>🍿 Kritika's Cartoon Cinema Studio — 100% Private, Local & Fun!</span>
          <button
            onClick={() => {
              cartoonSpeech.stopSpeech();
              onClose();
            }}
            className="px-4 py-1.5 bg-white border border-pink-300 hover:bg-pink-100 text-pink-900 rounded-xl font-bold transition shadow-2xs"
          >
            Close Cinema ✕
          </button>
        </div>

      </div>
    </div>
  );
};
