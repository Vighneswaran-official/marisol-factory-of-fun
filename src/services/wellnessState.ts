import { HINDI_SONGS, type HindiSong } from '../data/hindiSongs';

export type KritikaMoodId = 'Happy' | 'Tired' | 'Stressed' | 'Cozy' | 'Excited' | 'Low' | 'Romantic';

export interface SecretNote {
  id: string;
  text: string;
  date: string;
  emoji: string;
  color: string;
  audioUrl?: string; // Optional voice memo data URL
  duration?: string;
}

export interface LoveNote {
  id: number;
  quote: string;
  subtext: string;
  from: string;
  washiColor: 'pink' | 'lavender' | 'gold';
}

export interface MoodProfile {
  id: KritikaMoodId;
  label: string;
  emoji: string;
  color: string;
  bgAtmosphere: string;
  reassurance: string;
  recommendedSongId: string;
  recommendedMovie: string;
}

export const KRITIKA_MOODS: MoodProfile[] = [
  {
    id: 'Happy',
    label: 'Happy 🌸',
    emoji: '🌸',
    color: '#EC4899',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 50%, #FFFBEB 100%)',
    reassurance: 'Your joyful sparkle is magnetic, Kritika! Soak in every drop of this sunshine! ✨💖',
    recommendedSongId: 'sooraj_ki_baahon',
    recommendedMovie: 'Zindagi Na Milegi Dobara'
  },
  {
    id: 'Tired',
    label: 'Tired 💤',
    emoji: '💤',
    color: '#8B5CF6',
    bgAtmosphere: 'linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 50%, #E0E7FF 100%)',
    reassurance: 'Blanket mode activated. You’ve worked so hard today, Kritika. Let yourself sink in and rest. 🌙🤍',
    recommendedSongId: 'iktara',
    recommendedMovie: 'Wake Up Sid'
  },
  {
    id: 'Stressed',
    label: 'Stressed 🥺',
    emoji: '🥺',
    color: '#3B82F6',
    bgAtmosphere: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #FDF2F8 100%)',
    reassurance: 'Deep breath, darling. Drop your shoulders, unclench your jaw. The chaos can wait—you are doing great! 🌸💆‍♀️',
    recommendedSongId: 'love_you_zindagi',
    recommendedMovie: 'Dear Zindagi'
  },
  {
    id: 'Cozy',
    label: 'Cozy 🤍',
    emoji: '🤍',
    color: '#F59E0B',
    bgAtmosphere: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FFF7ED 100%)',
    reassurance: 'Steaming ginger chai, soft socks, and zero noise. You deserve this peaceful sanctuary, Kritika. ☕☁️',
    recommendedSongId: 'iktara',
    recommendedMovie: 'The Lunchbox'
  },
  {
    id: 'Excited',
    label: 'Excited ✨',
    emoji: '✨',
    color: '#F43F5E',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FEF08A 100%)',
    reassurance: 'Full queen celebration energy! Tell me everything—what fabulous milestone are we toasting to?! 👑🎉',
    recommendedSongId: 'london_thumakda',
    recommendedMovie: 'Queen'
  },
  {
    id: 'Low',
    label: 'Low 💕',
    emoji: '💕',
    color: '#FB7185',
    bgAtmosphere: 'linear-gradient(135deg, #FFF0F5 0%, #FCE7F3 50%, #EDE9FE 100%)',
    reassurance: 'Big sisterly hug incoming. You bring so much light to everyone else, please let yourself receive some love today. 💖🧸',
    recommendedSongId: 'love_you_zindagi',
    recommendedMovie: 'Dear Zindagi'
  },
  {
    id: 'Romantic',
    label: 'Romantic 🎀',
    emoji: '🎀',
    color: '#BE185D',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1F2 0%, #FDF2F8 50%, #FCE7F3 100%)',
    reassurance: 'Love is in the air, darling! Main apni favourite hoon—savor every romantic daydream today! 🌷✨',
    recommendedSongId: 'yeh_ishq_hai',
    recommendedMovie: 'Jab We Met'
  }
];

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    quote: "You have that rare magic where your presence alone makes the whole room feel warmer. Never dim that light, Kritika! 💖",
    subtext: "Drink some water, fix your crown, and remember who you are.",
    from: "With endless love, Your Comfort Hotline 🌸",
    washiColor: 'pink'
  },
  {
    id: 2,
    quote: "90% of female fury is just low blood sugar demanding garlic butter carbs. You're doing amazing, babe! 🥪✨",
    subtext: "Take a deep breath and treat yourself to your favorite cucumber sandwich.",
    from: "Your Snack Cheerleader 🎀",
    washiColor: 'gold'
  },
  {
    id: 3,
    quote: "Your eyeliner is way too sharp to waste on someone with blunt opinions. Keep glowing, gorgeous! 💅👑",
    subtext: "Main apni favourite hoon! — Always and forever.",
    from: "The Boss Girl Manifesto 💖",
    washiColor: 'lavender'
  },
  {
    id: 4,
    quote: "A cup of hot ginger cardamom chai and 10 minutes of complete peace can heal what 10 meetings couldn't. ☕☁️",
    subtext: "Give yourself permission to pause and breathe.",
    from: "Tapri Chai Whisperer 🍃",
    washiColor: 'pink'
  },
  {
    id: 5,
    quote: "You are the main character in this blockbuster; everything else is just poorly scripted background noise! 🌟🎬",
    subtext: "Stand tall, walk with grace, and own every single room.",
    from: "Bollywood Royalty Desk 👑",
    washiColor: 'gold'
  },
  {
    id: 6,
    quote: "Even the strongest queens need a soft blanket, zero notifications, and a warm hug. Be gentle with your heart today. 🤍",
    subtext: "It is okay to rest. Tomorrow will be bright.",
    from: "Cozy Mode Guardian ☁️",
    washiColor: 'lavender'
  }
];

class WellnessState {
  private listeners: Set<() => void> = new Set();
  private pinnedSongIds: string[] = ['love_you_zindagi', 'ilahi'];
  private customSongs: HindiSong[] = [];
  private secretNotes: SecretNote[] = [
    {
      id: 'note-1',
      text: 'Remember: You didn\'t come this far to only come this far. You are capable of breathtaking things, Kritika! 💖',
      date: 'Saved Note',
      emoji: '🔐',
      color: '#FFF1F2'
    },
    {
      id: 'note-2',
      text: 'Hot chai + a cozy movie = the ultimate soul medicine. Never skip quiet moments for yourself. ☕✨',
      date: 'Saved Note',
      emoji: '🌸',
      color: '#FAF5FF'
    }
  ];
  private queenMood: KritikaMoodId = 'Happy';
  private loveNoteIndex: number = 0;
  private streakDays: number = 1;
  private lastActiveDate: string = '';
  private activeDates: string[] = [];

  constructor() {
    this.load();
    this.checkInDaily();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getTodayStr(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public checkInDaily(): boolean {
    const today = this.getTodayStr();
    if (!this.activeDates.includes(today)) {
      this.activeDates.push(today);
      if (this.activeDates.length > 60) {
        this.activeDates = this.activeDates.slice(-60);
      }
    }

    if (this.lastActiveDate === today) {
      this.save();
      return false; // Already checked in today
    }

    if (!this.lastActiveDate) {
      this.streakDays = 1;
      this.lastActiveDate = today;
    } else {
      const lastDate = new Date(this.lastActiveDate + 'T00:00:00');
      const currDate = new Date(today + 'T00:00:00');
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.streakDays += 1;
      } else if (diffDays > 1) {
        this.streakDays = 1;
      }
      this.lastActiveDate = today;
    }

    this.save();
    this.notify();
    return true;
  }

  private load() {
    try {
      const savedPinned = localStorage.getItem('kritika_pinned_songs');
      if (savedPinned) this.pinnedSongIds = JSON.parse(savedPinned);

      const savedCustom = localStorage.getItem('kritika_custom_songs');
      if (savedCustom) this.customSongs = JSON.parse(savedCustom);

      const savedNotes = localStorage.getItem('kritika_secret_notes');
      if (savedNotes) this.secretNotes = JSON.parse(savedNotes);

      const savedMood = localStorage.getItem('kritika_queen_mood') as KritikaMoodId;
      if (savedMood && KRITIKA_MOODS.some(m => m.id === savedMood)) {
        this.queenMood = savedMood;
      }

      const savedStreak = localStorage.getItem('kritika_sparkle_streak');
      if (savedStreak) this.streakDays = parseInt(savedStreak, 10) || 1;

      const savedLastDate = localStorage.getItem('kritika_last_active_date');
      if (savedLastDate) this.lastActiveDate = savedLastDate;

      const savedDates = localStorage.getItem('kritika_active_dates');
      if (savedDates) this.activeDates = JSON.parse(savedDates);
    } catch {
      // ignore
    }
  }

  private save() {
    try {
      localStorage.setItem('kritika_pinned_songs', JSON.stringify(this.pinnedSongIds));
      localStorage.setItem('kritika_custom_songs', JSON.stringify(this.customSongs));
      localStorage.setItem('kritika_secret_notes', JSON.stringify(this.secretNotes));
      localStorage.setItem('kritika_queen_mood', this.queenMood);
      localStorage.setItem('kritika_sparkle_streak', this.streakDays.toString());
      localStorage.setItem('kritika_last_active_date', this.lastActiveDate);
      localStorage.setItem('kritika_active_dates', JSON.stringify(this.activeDates));
    } catch {
      // ignore
    }
  }

  // Song Pinning & Management
  public getPinnedSongIds(): string[] {
    return [...this.pinnedSongIds];
  }

  public isSongPinned(songId: string): boolean {
    return this.pinnedSongIds.includes(songId);
  }

  public togglePinSong(songId: string): boolean {
    if (this.pinnedSongIds.includes(songId)) {
      this.pinnedSongIds = this.pinnedSongIds.filter(id => id !== songId);
    } else {
      this.pinnedSongIds = [songId, ...this.pinnedSongIds];
    }
    this.save();
    this.notify();
    return this.pinnedSongIds.includes(songId);
  }

  public addCustomSong(song: Omit<HindiSong, 'id'>): HindiSong {
    const newSong: HindiSong = {
      ...song,
      id: `custom_${Date.now()}`
    };
    this.customSongs = [newSong, ...this.customSongs];
    this.save();
    this.notify();
    return newSong;
  }

  public getAllSongs(): HindiSong[] {
    const all = [...this.customSongs, ...HINDI_SONGS];
    return all.sort((a, b) => {
      const aPinned = this.pinnedSongIds.includes(a.id) ? 1 : 0;
      const bPinned = this.pinnedSongIds.includes(b.id) ? 1 : 0;
      return bPinned - aPinned;
    });
  }

  // Secret Locket Notes
  public getSecretNotes(): SecretNote[] {
    return [...this.secretNotes];
  }

  public addSecretNote(text: string, emoji: string = '💖', audioUrl?: string, duration?: string): SecretNote {
    const note: SecretNote = {
      id: `note_${Date.now()}`,
      text,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      emoji,
      color: ['#FFF1F2', '#FAF5FF', '#FEFCE8'][Math.floor(Math.random() * 3)],
      audioUrl,
      duration
    };
    this.secretNotes = [note, ...this.secretNotes];
    this.save();
    this.notify();
    return note;
  }

  public deleteSecretNote(id: string): void {
    this.secretNotes = this.secretNotes.filter(n => n.id !== id);
    this.save();
    this.notify();
  }

  // Queen's Mood
  public getQueenMood(): KritikaMoodId {
    return this.queenMood;
  }

  public getMoodProfile(): MoodProfile {
    return KRITIKA_MOODS.find(m => m.id === this.queenMood) || KRITIKA_MOODS[0];
  }

  public setQueenMood(moodId: KritikaMoodId): void {
    this.queenMood = moodId;
    this.checkInDaily();
    this.save();
    this.notify();
  }

  // Love Notes & Daily Affirmation
  public getCurrentLoveNote(): LoveNote {
    return LOVE_NOTES[this.loveNoteIndex % LOVE_NOTES.length];
  }

  public drawNextLoveNote(): LoveNote {
    this.loveNoteIndex = (this.loveNoteIndex + 1) % LOVE_NOTES.length;
    this.notify();
    return this.getCurrentLoveNote();
  }

  public getDailyAffirmation(): LoveNote {
    const today = this.getTodayStr();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % LOVE_NOTES.length;
    return LOVE_NOTES[idx];
  }

  // Sparkle Streak & Heatmap
  public getSparkleStreak(): { streak: number, trail: boolean[] } {
    const trail = [true, true, true, false, false, false, false].map((_, idx) => idx < this.streakDays);
    return { streak: this.streakDays, trail };
  }

  public getStreakHeatmap(): Array<{ date: string; dayLabel: string; active: boolean; isToday: boolean }> {
    const days: Array<{ date: string; dayLabel: string; active: boolean; isToday: boolean }> = [];
    const today = this.getTodayStr();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const dayLabel = dayNames[d.getDay()];

      days.push({
        date: dateStr,
        dayLabel,
        active: this.activeDates.includes(dateStr),
        isToday: dateStr === today
      });
    }
    return days;
  }

  public addSparkleStreak(): void {
    this.checkInDaily();
    this.streakDays += 1;
    this.save();
    this.notify();
  }
}

export const wellnessState = new WellnessState();
