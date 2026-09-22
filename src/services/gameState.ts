import type { PlayerProfile, Achievement, TeacherProfile, ChefTitle, Recipe } from '../types/game';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { RECIPES, RECIPES_BY_MOOD } from '../data/recipes';
import { QUESTIONS_DATABASE } from '../data/questions';

const PLAYER_STORAGE_KEY = 'marisol_factory_player_profile';
const ACHIEVEMENTS_STORAGE_KEY = 'marisol_factory_achievements';
const TEACHER_STORAGE_KEY = 'marisol_factory_teacher_profile';

const DEFAULT_PLAYER: PlayerProfile = {
  nickname: 'Kritika (Chef)',
  level: 1,
  xp: 0,
  cucumberSandwiches: 0, // Primary culinary score & currency
  chefTitle: 'Apprentice Chopper 🥒',
  unlockedRecipes: ['cucumber_mint_sandwich'],
  collectedIngredients: [],
  streak: 0,
  bestStreak: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  factsDiscovered: 0,
  favouriteCategory: 'Food & Cooking',
  interests: ['Food & Cooking', 'Movies', 'Bollywood'],
  unlockedZones: ['zone_1'],
  completedBosses: [],
  stamps: ['Cinema', 'Foodie'],
  powerUps: {
    hint: 3,
    clue: 3,
    time_freeze: 2,
    second_chance: 2,
    streak_shield: 1,
  },
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  activeSticker: 'brighter_ideas',
};


const DEFAULT_TEACHER: TeacherProfile = {
  teacherName: 'Prof. Sharma',
  subject: 'Cinema & Media Arts',
  favoriteMovies: '3 Idiots, Inception, Dil Se, Interstellar',
  favoriteShows: 'Friends, Breaking Bad',
  famousPhrases: [
    '"Curiosity is the engine of learning!"',
    '"There are no wrong questions, only sneaky ones!"',
    '"Always check your sources, movie buffs!"'
  ],
  classroomMemories: [
    'When the whole class sang Chaiyya Chaiyya during recess',
    'The legendary 3-hour movie debate on Inception\'s spinning top',
    'Friday popcorn trivia afternoons'
  ],
  classmateNames: ['Aarav', 'Riya', 'Ananya', 'Karan', 'Dev', 'Sneha', 'Vikram'],
  customMessage: 'Thank you for inspiring our curiosity every single day! You made learning feel like an unforgettable adventure.'
};

class GameStateManager {
  private profile: PlayerProfile;
  private achievements: Achievement[];
  private teacherProfile: TeacherProfile;

  constructor() {
    this.profile = this.loadPlayer();
    this.achievements = this.loadAchievements();
    this.teacherProfile = this.loadTeacherProfile();
  }

  public calculateChefTitle(sandwiches: number): ChefTitle {
    if (sandwiches >= 200) return '3-Star Master Chef 👑';
    if (sandwiches >= 140) return 'Culinary Maestro 🌟';
    if (sandwiches >= 95) return 'Executive Head Chef 👩‍🍳';
    if (sandwiches >= 60) return 'Flavor Alchemist 🍲';
    if (sandwiches >= 35) return 'Bistro Sous Chef 🍳';
    if (sandwiches >= 15) return 'Street Food Gourmet 🥪';
    return 'Apprentice Chopper 🥒';
  }

  private loadPlayer(): PlayerProfile {
    try {
      const saved = localStorage.getItem(PLAYER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const cucumberSandwiches = parsed.cucumberSandwiches ?? (parsed.xp ? Math.floor(parsed.xp / 100) : 0);
        return {
          ...DEFAULT_PLAYER,
          ...parsed,
          cucumberSandwiches,
          chefTitle: parsed.chefTitle || this.calculateChefTitle(cucumberSandwiches),
          unlockedRecipes: parsed.unlockedRecipes || ['cucumber_mint_sandwich'],
          collectedIngredients: parsed.collectedIngredients || [],
        };
      }
    } catch (e) {
      console.warn('Failed to load player profile from localStorage', e);
    }
    return { ...DEFAULT_PLAYER };
  }

  public savePlayer(profile?: PlayerProfile) {
    if (profile) this.profile = profile;
    try {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.warn('Failed to save player profile to localStorage', e);
    }
  }

  public getPlayer(): PlayerProfile {
    return { ...this.profile };
  }

  public updateInterests(interests: any[]) {
    this.profile.interests = interests;
    this.profile.onboardingCompleted = true;
    this.savePlayer();
  }

  public addCucumberSandwiches(count: number): {
    total: number;
    titleUpgraded: boolean;
    newTitle: ChefTitle;
    prevTitle: ChefTitle;
  } {
    const prevTitle = this.profile.chefTitle || this.calculateChefTitle(this.profile.cucumberSandwiches || 0);
    this.profile.cucumberSandwiches = (this.profile.cucumberSandwiches || 0) + count;
    
    // Also award XP in parallel so standard levels progress too
    this.profile.xp += count * 50;
    this.profile.level = this.calculateLevel(this.profile.xp);

    const newTitle = this.calculateChefTitle(this.profile.cucumberSandwiches);
    const titleUpgraded = newTitle !== prevTitle;
    this.profile.chefTitle = newTitle;

    this.checkAchievements();
    this.savePlayer();
    return { total: this.profile.cucumberSandwiches, titleUpgraded, newTitle, prevTitle };
  }

  public addCollectedIngredient(ingredient: string) {
    if (!this.profile.collectedIngredients) this.profile.collectedIngredients = [];
    if (!this.profile.collectedIngredients.includes(ingredient)) {
      this.profile.collectedIngredients.push(ingredient);
      this.savePlayer();
    }
  }

  public clearCollectedIngredients() {
    this.profile.collectedIngredients = [];
    this.savePlayer();
  }

  public getCollectedIngredients(): string[] {
    return this.profile.collectedIngredients || [];
  }

  public unlockRecipe(recipeId: string): boolean {
    if (!this.profile.unlockedRecipes) this.profile.unlockedRecipes = [];
    if (!this.profile.unlockedRecipes.includes(recipeId)) {
      this.profile.unlockedRecipes.push(recipeId);
      this.savePlayer();
      return true; // Newly unlocked
    }
    return false;
  }

  public getUnlockedRecipes(): string[] {
    return this.profile.unlockedRecipes || ['cucumber_mint_sandwich'];
  }

  public getEndlessCourse(moodAlias?: string, roundIndex: number = 0): {
    questions: any[];
    targetRecipe: Recipe;
  } {
    let targetRecipe = moodAlias ? RECIPES_BY_MOOD[moodAlias] : undefined;
    if (!targetRecipe) {
      targetRecipe = RECIPES[roundIndex % RECIPES.length];
    }

    const foodQuestions = QUESTIONS_DATABASE.filter(q => q.category === 'Food & Cooking');
    const movieQuestions = QUESTIONS_DATABASE.filter(q => q.category === 'Movies' || q.category === 'Bollywood');
    const allCandidate = [...foodQuestions, ...movieQuestions];

    const shuffled = [...allCandidate].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const ingredients = targetRecipe.secretIngredients;
    const finalQuestions = selected.map((q, idx) => ({
      ...q,
      secretIngredient: ingredients[idx % ingredients.length] || q.secretIngredient || 'Chef Secret Spice ✨'
    }));

    return { questions: finalQuestions, targetRecipe };
  }

  public addXp(amount: number): { newLevel: boolean; newLevelNum: number } {

    const prevLevel = this.calculateLevel(this.profile.xp);
    this.profile.xp += amount;
    const newLevelNum = this.calculateLevel(this.profile.xp);
    
    let newLevel = false;
    if (newLevelNum > prevLevel) {
      this.profile.level = newLevelNum;
      newLevel = true;
    }
    
    this.checkAchievements();
    this.savePlayer();
    return { newLevel, newLevelNum };
  }

  public calculateLevel(xp: number): number {
    // Level formula: Level = Math.floor(xp / 300) + 1
    return Math.floor(xp / 300) + 1;
  }

  public incrementStreak(): number {
    this.profile.streak += 1;
    if (this.profile.streak > this.profile.bestStreak) {
      this.profile.bestStreak = this.profile.streak;
    }
    this.checkAchievements();
    this.savePlayer();
    return this.profile.streak;
  }

  public resetStreak() {
    this.profile.streak = 0;
    this.savePlayer();
  }

  public recordQuestionAnswered(isCorrect: boolean, factDiscovered: boolean = true) {
    this.profile.questionsAnswered += 1;
    if (isCorrect) {
      this.profile.correctAnswers += 1;
    }
    if (factDiscovered) {
      this.profile.factsDiscovered += 1;
    }
    this.checkAchievements();
    this.savePlayer();
  }

  public unlockZone(zoneId: string) {
    if (!this.profile.unlockedZones.includes(zoneId)) {
      this.profile.unlockedZones.push(zoneId);
      this.savePlayer();
    }
  }

  public usePowerUp(powerUpId: 'hint' | 'clue' | 'time_freeze' | 'second_chance' | 'streak_shield'): boolean {
    if (this.profile.powerUps[powerUpId] > 0) {
      this.profile.powerUps[powerUpId] -= 1;
      this.savePlayer();
      return true;
    }
    return false;
  }

  public addPowerUp(powerUpId: string, count: number = 1) {
    this.profile.powerUps[powerUpId] = (this.profile.powerUps[powerUpId] || 0) + count;
    this.savePlayer();
  }

  // Achievements
  private loadAchievements(): Achievement[] {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (saved) {
        const parsed: Achievement[] = JSON.parse(saved);
        // Merge with initial list in case new achievements were added
        return INITIAL_ACHIEVEMENTS.map(initial => {
          const found = parsed.find(p => p.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
      }
    } catch (e) {
      console.warn('Failed to load achievements', e);
    }
    return [...INITIAL_ACHIEVEMENTS];
  }

  public saveAchievements() {
    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(this.achievements));
    } catch (e) {
      console.warn('Failed to save achievements', e);
    }
  }

  public getAchievements(): Achievement[] {
    return [...this.achievements];
  }

  public checkAchievements(): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    this.achievements.forEach(ach => {
      if (ach.unlocked) return;

      let isUnlocked = false;

      switch (ach.id) {
        case 'ach_1': // Marisol's Favorite
          if (this.profile.questionsAnswered >= 5) isUnlocked = true;
          break;
        case 'ach_2': // Cinema Nerd
          if (this.profile.correctAnswers >= 10) isUnlocked = true;
          break;
        case 'ach_5': // On Fire
          if (this.profile.streak >= 5) isUnlocked = true;
          break;
        case 'ach_6': // Fact Machine
          if (this.profile.xp >= 1000) isUnlocked = true;
          break;
        case 'ach_7': // Wait What
          if (this.profile.factsDiscovered >= 10) isUnlocked = true;
          break;
        case 'ach_8': // World Explorer
          if (this.profile.unlockedZones.length >= 3) isUnlocked = true;
          break;
      }

      if (isUnlocked) {
        ach.unlocked = true;
        ach.unlockedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveAchievements();
    }

    return newlyUnlocked;
  }

  // Teacher Profile
  private loadTeacherProfile(): TeacherProfile {
    try {
      const saved = localStorage.getItem(TEACHER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load teacher profile', e);
    }
    return { ...DEFAULT_TEACHER };
  }

  public getTeacherProfile(): TeacherProfile {
    return { ...this.teacherProfile };
  }

  public saveTeacherProfile(newProfile: TeacherProfile) {
    this.teacherProfile = { ...newProfile };
    try {
      localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(this.teacherProfile));
    } catch (e) {
      console.warn('Failed to save teacher profile', e);
    }
  }

  public setActiveSticker(stickerAlias: string) {
    this.profile.activeSticker = stickerAlias;
    this.savePlayer();
  }

  public getActiveSticker(): string {
    return this.profile.activeSticker || 'brighter_ideas';
  }
}

export const gameState = new GameStateManager();
