import { HINDI_SONGS, type HindiSong } from '../data/hindiSongs';

export interface SecretNote {
  id: string;
  text: string;
  date: string;
  emoji: string;
  color: string;
}

export interface LoveNote {
  id: number;
  quote: string;
  subtext: string;
  from: string;
  washiColor: 'pink' | 'lavender' | 'gold';
}

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    quote: "You have that rare magic where your presence alone makes the whole room feel warmer. Never dim that light, queen! 💖",
    subtext: "Drink some water, fix your crown, and remember who you are.",
    from: "With endless love, Your Inner Circle 🌸",
    washiColor: 'pink'
  },
  {
    id: 2,
    quote: "90% of female fury is just low blood sugar demanding garlic butter carbs. You're doing amazing, babe! 🥪✨",
    subtext: "Take a deep breath and treat yourself to your favorite snack.",
    from: "Your Comfort Hotline 🎀",
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

export const QUEEN_MOODS = [
  { id: 'radiant', label: 'Radiant & Unstoppable', emoji: '💖', color: '#F43F5E', tagline: 'Ready to conquer the world and sparkle!' },
  { id: 'cozy_chai', label: 'Cozy Chai & Blanket', emoji: '☕', color: '#F97316', tagline: 'Soft vibes, warm ginger chai & mellow tunes.' },
  { id: 'need_tlc', label: 'Need TLC & Soft Hugs', emoji: '🥺', color: '#A855F7', tagline: 'Gentle affirmations, comfort carbs & sweet care.' },
  { id: 'sassy_bold', label: 'Sassy & Bold', emoji: '💅', color: '#EC4899', tagline: 'Full Geet energy! Main apni favourite hoon!' },
  { id: 'hangry', label: 'Hangry & Overwhelmed', emoji: '😤', color: '#EF4444', tagline: 'Emergency cucumber sandwiches & stress popper needed!' }
];

class WellnessState {
  private listeners: Set<() => void> = new Set();
  private pinnedSongIds: string[] = ['love_you_zindagi', 'ilahi'];
  private customSongs: HindiSong[] = [];
  private secretNotes: SecretNote[] = [
    {
      id: 'note-1',
      text: 'Remember: You didn\'t come this far to only come this far. You are capable of breathtaking things! 💖',
      date: 'Saved Note',
      emoji: '🔐',
      color: '#FFF1F2'
    },
    {
      id: 'note-2',
      text: 'Chai + a good movie = the ultimate soul medicine. Never skip quiet moments for yourself. ☕✨',
      date: 'Saved Note',
      emoji: '🌸',
      color: '#FAF5FF'
    }
  ];
  private queenMood: string = 'radiant';
  private loveNoteIndex: number = 0;
  private streakDays: number = 3;

  constructor() {
    this.load();
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

  private load() {
    try {
      const savedPinned = localStorage.getItem('kritika_pinned_songs');
      if (savedPinned) this.pinnedSongIds = JSON.parse(savedPinned);

      const savedCustom = localStorage.getItem('kritika_custom_songs');
      if (savedCustom) this.customSongs = JSON.parse(savedCustom);

      const savedNotes = localStorage.getItem('kritika_secret_notes');
      if (savedNotes) this.secretNotes = JSON.parse(savedNotes);

      const savedMood = localStorage.getItem('kritika_queen_mood');
      if (savedMood) this.queenMood = savedMood;

      const savedStreak = localStorage.getItem('kritika_sparkle_streak');
      if (savedStreak) this.streakDays = parseInt(savedStreak, 10) || 3;
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
    // Sort pinned songs to the top
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

  public addSecretNote(text: string, emoji: string = '💖'): SecretNote {
    const note: SecretNote = {
      id: `note_${Date.now()}`,
      text,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      emoji,
      color: ['#FFF1F2', '#FAF5FF', '#FEFCE8'][Math.floor(Math.random() * 3)]
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
  public getQueenMood(): string {
    return this.queenMood;
  }

  public setQueenMood(moodId: string): void {
    this.queenMood = moodId;
    this.save();
    this.notify();
  }

  // Love Notes
  public getCurrentLoveNote(): LoveNote {
    return LOVE_NOTES[this.loveNoteIndex % LOVE_NOTES.length];
  }

  public drawNextLoveNote(): LoveNote {
    this.loveNoteIndex = (this.loveNoteIndex + 1) % LOVE_NOTES.length;
    this.notify();
    return this.getCurrentLoveNote();
  }

  // Sparkle Streak
  public getSparkleStreak(): { streak: number, trail: boolean[] } {
    // 7-day visual trail
    const trail = [true, true, true, false, false, false, false].map((_, idx) => idx < this.streakDays);
    return { streak: this.streakDays, trail };
  }

  public addSparkleStreak(): void {
    this.streakDays += 1;
    this.save();
    this.notify();
  }
}

export const wellnessState = new WellnessState();
