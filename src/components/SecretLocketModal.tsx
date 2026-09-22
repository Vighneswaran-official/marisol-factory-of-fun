import React, { useState, useEffect, useRef } from 'react';
import { wellnessState, type SecretNote } from '../services/wellnessState';
import { audioEngine } from '../services/synthAudioEngine';
import { Lock, Unlock, Heart, Plus, Trash2, X, Sparkles, Mic, Square, Play, Pause } from 'lucide-react';

interface SecretLocketModalProps {
  onClose: () => void;
}

export const SecretLocketModal: React.FC<SecretLocketModalProps> = ({ onClose }) => {
  const [, setTick] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');

  // Voice memo recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const unsub = wellnessState.subscribe(() => setTick(t => t + 1));
    return () => {
      unsub();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
    };
  }, []);

  const secretNotes = wellnessState.getSecretNotes();

  const handleUnlock = () => {
    audioEngine.playSfx('fanfare');
    setIsUnlocked(true);
  };

  const startVoiceRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Audio recording isn't supported in this browser, but you can save text notes!");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setRecordedAudioUrl(reader.result as string);
        };
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } catch {
      // Fallback for permission denial: create a simulated cute voice note
      setRecordingSeconds(15);
      setRecordedAudioUrl("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
      setNewText(prev => prev || "Queen's Whisper Memo: Remember to pause, take a sip of chai, and smile today! 🎙️✨");
      alert("Microphone access unavailable. Added a voice memo template for you to save in your locket!");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() && !recordedAudioUrl) return;

    audioEngine.playSfx('powerup');
    const durationStr = recordingSeconds > 0 ? `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}` : undefined;
    wellnessState.addSecretNote(
      newText.trim() || "Voice Memo for Kritika 🎙️",
      selectedEmoji,
      recordedAudioUrl || undefined,
      durationStr
    );
    setNewText('');
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setShowAddForm(false);
  };

  const playVoiceMemo = (id: string, audioUrl?: string) => {
    if (!audioUrl) return;

    if (playingAudioId === id) {
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
      setPlayingAudioId(null);
      return;
    }

    if (currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    currentAudioElementRef.current = audio;
    setPlayingAudioId(id);

    audio.play().catch(() => {
      // audio error fallback
      audioEngine.playSfx('fanfare');
      setTimeout(() => setPlayingAudioId(null), 1500);
    });

    audio.onended = () => {
      setPlayingAudioId(null);
    };
  };

  const handleDelete = (id: string) => {
    audioEngine.playSfx('click');
    wellnessState.deleteSecretNote(id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF7] border-3 border-ink rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-sketch-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-pink-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight flex items-center gap-1.5">
                <span>SECRET HEART LOCKET</span>
                <span>🔐</span>
              </h2>
              <p className="font-handwritten text-xs text-ink-light font-bold">
                Private notes, affirmations & voice memos for Kritika ♡
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 transition-colors shrink-0 shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Locked State */}
        {!isUnlocked ? (
          <div className="text-center py-8 space-y-4">
            <div className="relative inline-block group">
              <button
                onClick={handleUnlock}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 border-3 border-ink flex flex-col items-center justify-center text-white shadow-sketch-xl hover:scale-105 active:scale-95 transition-all group-hover:rotate-6 cursor-pointer"
              >
                <Lock className="w-10 h-10 mb-1 animate-pulse" />
                <span className="font-handwritten text-xs font-black">TAP TO UNLOCK</span>
              </button>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-spin" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-base text-ink">
                Kritika's Private Keepsake Locket
              </h3>
              <p className="font-handwritten text-xs text-ink-light font-bold max-w-xs mx-auto">
                Only you have the key. Tap the heart to reveal your private notes, wishes, and audio voice memos.
              </p>
            </div>
          </div>
        ) : (
          /* Unlocked State */
          <div className="space-y-3.5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-display font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full">
                <Unlock className="w-3.5 h-3.5" />
                <span>Locket Unlocked</span>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-800 border-1.5 border-pink-300 font-display font-black text-xs rounded-xl shadow-2xs hover:scale-105 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Note / Voice Memo</span>
              </button>
            </div>

            {/* Write / Record Form */}
            {showAddForm && (
              <form 
                onSubmit={handleAddNote}
                className="bg-pink-50 border-2 border-pink-300 rounded-2xl p-3.5 space-y-3 shadow-2xs animate-fade-in"
              >
                <span className="font-display font-black text-xs text-pink-900 block">
                  LEAVE A NOTE OR VOICE MEMO FOR YOURSELF 💌
                </span>

                <textarea
                  rows={2}
                  placeholder="A secret wish, proud moment, or soothing reminder for Kritika..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-pink-200 rounded-xl font-handwritten text-sm text-ink placeholder:text-ink-light focus:outline-pink-400"
                />

                {/* Voice memo recording action */}
                <div className="flex items-center justify-between bg-white/80 p-2.5 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-2">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startVoiceRecording}
                        className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Record Voice Memo</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopVoiceRecording}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse shadow-sm transition"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>Stop Recording ({recordingSeconds}s)</span>
                      </button>
                    )}

                    {recordedAudioUrl && !isRecording && (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <span>✓</span> Voice Memo Ready!
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {['💖', '🌸', '☕', '👑', '✨'].map(em => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setSelectedEmoji(em)}
                        className={`text-base p-1 rounded-lg transition-transform ${selectedEmoji === em ? 'scale-125 bg-pink-100 border border-pink-300' : 'opacity-60'}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setRecordedAudioUrl(null);
                    }}
                    className="px-2.5 py-1 text-xs font-bold text-ink-light hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-display font-black text-xs rounded-xl shadow-xs"
                  >
                    Lock in Locket 🔐
                  </button>
                </div>
              </form>
            )}

            {/* Notes List */}
            <div className="space-y-2.5">
              {secretNotes.map((note: SecretNote) => (
                <div 
                  key={note.id}
                  className="p-3.5 rounded-2xl border-2 border-pink-200 shadow-2xs text-left relative group transition-all hover:border-pink-400"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{note.emoji}</span>
                      <span className="font-handwritten text-xs text-ink-light font-bold">
                        {note.date}
                      </span>
                      {note.audioUrl && (
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                          🎙️ Voice Memo
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="opacity-40 group-hover:opacity-100 text-rose-500 hover:text-rose-700 p-1 transition-opacity"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-handwritten text-sm sm:text-base text-ink font-bold mt-1 leading-snug">
                    "{note.text}"
                  </p>

                  {/* Play Voice Memo button if available */}
                  {note.audioUrl && (
                    <div className="mt-2 pt-2 border-t border-pink-200/60 flex items-center gap-2">
                      <button
                        onClick={() => playVoiceMemo(note.id, note.audioUrl)}
                        className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
                      >
                        {playingAudioId === note.id ? (
                          <>
                            <Pause className="w-3 h-3 fill-purple-800" />
                            <span>Pause Memo</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-purple-800" />
                            <span>Play Voice Memo {note.duration ? `(${note.duration})` : ''}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-xs font-handwritten font-bold text-pink-700 hover:underline"
              >
                🔒 Lock Locket Again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
