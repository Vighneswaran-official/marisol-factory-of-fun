// Mood Rotation & History Engine for Marisol: Factory of Fun (Spec v2)

export interface MoodHistoryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  scaleNumber: number; // 1 to 9
  moodId: string;
  moodLabel: string;
  emoji: string;
  privateNote?: string;
  macaroniId: string;
}

export interface ComfortBookmark {
  id: string;
  type: 'macaroni' | 'quote' | 'movie';
  title: string;
  subtitle: string;
  emoji: string;
  savedAt: string;
  data?: any;
}

const MOOD_HISTORY_KEY = 'marisol_mood_history_v2';
const COMFORT_SHELF_KEY = 'marisol_comfort_shelf_v2';

export class MoodRotationTracker {
  private history: string[] = [];
  private readonly maxHistoryLength = 5;

  public getNextRecommendation<T extends { id: string }>(items: T[]): T {
    const freshCandidates = items.filter(item => !this.history.includes(item.id));
    const pool = freshCandidates.length > 0
      ? freshCandidates
      : items.filter(item => item.id !== this.history[this.history.length - 1]);

    const selected = pool[Math.floor(Math.random() * pool.length)];

    this.history.push(selected.id);
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }
    return selected;
  }

  public clearHistory() {
    this.history = [];
  }
}

class MoodHistoryManager {
  private entries: MoodHistoryEntry[] = [];
  private bookmarks: ComfortBookmark[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const historyStr = localStorage.getItem(MOOD_HISTORY_KEY);
      if (historyStr) {
        this.entries = JSON.parse(historyStr);
      }
      const shelfStr = localStorage.getItem(COMFORT_SHELF_KEY);
      if (shelfStr) {
        this.bookmarks = JSON.parse(shelfStr);
      }
    } catch (err) {
      console.warn('Failed to load mood history / shelf from storage', err);
    }
  }

  private saveData() {
    try {
      localStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(this.entries));
      localStorage.setItem(COMFORT_SHELF_KEY, JSON.stringify(this.bookmarks));
    } catch {}
    this.notify();
  }

  // Add or update daily mood check-in
  public recordMoodCheckIn(scaleNumber: number, moodId: string, moodLabel: string, emoji: string, macaroniId: string, privateNote?: string): MoodHistoryEntry {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodHistoryEntry = {
      id: `entry_${Date.now()}`,
      date: today,
      timestamp: Date.now(),
      scaleNumber,
      moodId,
      moodLabel,
      emoji,
      privateNote: privateNote?.trim() || undefined,
      macaroniId
    };

    // Filter out previous check-in for the same day if updating
    this.entries = [newEntry, ...this.entries.filter(e => e.date !== today)];
    this.saveData();
    return newEntry;
  }

  public getMoodHistory(): MoodHistoryEntry[] {
    return this.entries;
  }

  public getTodayCheckIn(): MoodHistoryEntry | undefined {
    const today = new Date().toISOString().split('T')[0];
    return this.entries.find(e => e.date === today);
  }

  // Comfort Shelf Bookmarks
  public toggleBookmark(bookmark: ComfortBookmark): boolean {
    const existsIndex = this.bookmarks.findIndex(b => b.id === bookmark.id);
    if (existsIndex >= 0) {
      this.bookmarks.splice(existsIndex, 1);
      this.saveData();
      return false; // Removed
    } else {
      this.bookmarks.unshift(bookmark);
      this.saveData();
      return true; // Added
    }
  }

  public isBookmarked(id: string): boolean {
    return this.bookmarks.some(b => b.id === id);
  }

  public getBookmarks(): ComfortBookmark[] {
    return this.bookmarks;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const questionRotationTracker = new MoodRotationTracker();
export const quoteRotationTracker = new MoodRotationTracker();
export const moodHistoryManager = new MoodHistoryManager();
