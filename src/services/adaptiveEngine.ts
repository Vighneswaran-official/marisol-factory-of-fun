import type { Question, Category, Difficulty } from '../types/game';
import { QUESTIONS_DATABASE } from '../data/questions';

export interface CategoryStats {
  answered: number;
  correct: number;
  accuracy: number;
  recentResults: boolean[]; // Last 5 results
}

class AdaptiveEngine {
  private categoryStats: Map<Category, CategoryStats> = new Map();
  private missedQuestionIds: Set<string> = new Set();
  private consecutiveWrong: number = 0;
  private currentDifficulty: Difficulty = 'easy';

  constructor() {
    this.initStats();
  }

  private initStats() {
    const categories: Category[] = [
      'Movies', 'TV Shows', 'Bollywood', 'Hollywood', 'Music', 
      'Pop Culture', 'Science', 'Space', 'Technology', 'Geography', 'History', 'Weird Facts'
    ];

    categories.forEach(cat => {
      this.categoryStats.set(cat, {
        answered: 0,
        correct: 0,
        accuracy: 100,
        recentResults: []
      });
    });
  }

  // Record question outcome
  public recordAnswer(question: Question, isCorrect: boolean, _responseTimeMs: number = 5000) {
    const stats = this.categoryStats.get(question.category) || {
      answered: 0,
      correct: 0,
      accuracy: 100,
      recentResults: []
    };

    stats.answered += 1;
    if (isCorrect) {
      stats.correct += 1;
      this.missedQuestionIds.delete(question.id);
      this.consecutiveWrong = 0;
    } else {
      this.missedQuestionIds.add(question.id);
      this.consecutiveWrong += 1;
    }

    stats.recentResults.push(isCorrect);
    if (stats.recentResults.length > 5) {
      stats.recentResults.shift();
    }

    stats.accuracy = Math.round((stats.correct / stats.answered) * 100);
    this.categoryStats.set(question.category, stats);

    // Adjust difficulty dynamically based on recent 5 answers
    this.adjustDifficulty(stats.recentResults);
  }

  private adjustDifficulty(recentResults: boolean[]) {
    if (recentResults.length < 3) return;

    const correctCount = recentResults.filter(Boolean).length;
    const ratio = correctCount / recentResults.length;

    if (ratio >= 0.8) {
      // 4/5 or 5/5 -> Increase difficulty
      if (this.currentDifficulty === 'easy') this.currentDifficulty = 'medium';
      else if (this.currentDifficulty === 'medium') this.currentDifficulty = 'hard';
      else if (this.currentDifficulty === 'hard') this.currentDifficulty = 'expert';
    } else if (ratio <= 0.4) {
      // 0-2/5 -> Ease difficulty
      if (this.currentDifficulty === 'expert') this.currentDifficulty = 'hard';
      else if (this.currentDifficulty === 'hard') this.currentDifficulty = 'medium';
      else if (this.currentDifficulty === 'medium') this.currentDifficulty = 'easy';
    }
  }

  // Check if player needs a Comeback intervention
  public isComebackNeeded(): boolean {
    return this.consecutiveWrong >= 2;
  }

  // Select next question adaptively
  public selectQuestions(category?: Category, count: number = 5, playedIds: string[] = []): Question[] {
    let available = QUESTIONS_DATABASE.filter(q => !playedIds.includes(q.id));

    // If category specific, filter by category
    if (category) {
      const categoryQuestions = available.filter(q => q.category === category);
      if (categoryQuestions.length >= count) {
        available = categoryQuestions;
      }
    }

    // Check if we have missed questions to reintroduce (Spaced Repetition)
    const missedAvailable = available.filter(q => this.missedQuestionIds.has(q.id));
    const selected: Question[] = [];

    if (missedAvailable.length > 0) {
      selected.push(missedAvailable[0]);
    }

    // Comeback mode: choose an easy question if struggling
    if (this.isComebackNeeded()) {
      const easyQuestions = available.filter(q => q.difficulty === 'easy' && !selected.includes(q));
      if (easyQuestions.length > 0) {
        selected.push(easyQuestions[0]);
      }
    }

    // Fill remaining with matching difficulty or random
    const remaining = available.filter(q => !selected.includes(q));
    const sortedByDiff = remaining.sort((a, b) => {
      const diffScore = (d: Difficulty) => (d === this.currentDifficulty ? 0 : 1);
      return diffScore(a.difficulty) - diffScore(b.difficulty);
    });

    while (selected.length < count && sortedByDiff.length > 0) {
      selected.push(sortedByDiff.shift()!);
    }

    // Fallback if database count is small
    if (selected.length < count) {
      const fallback = QUESTIONS_DATABASE.filter(q => !selected.includes(q));
      while (selected.length < count && fallback.length > 0) {
        selected.push(fallback.shift()!);
      }
    }

    return selected;
  }

  public getCategoryStats(category: Category): CategoryStats {
    return this.categoryStats.get(category) || {
      answered: 0,
      correct: 0,
      accuracy: 100,
      recentResults: []
    };
  }

  public getCurrentDifficulty(): Difficulty {
    return this.currentDifficulty;
  }
}

export const adaptiveEngine = new AdaptiveEngine();
