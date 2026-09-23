export type QuestionType = 
  | 'multiple_choice'
  | 'true_false'
  | 'guess_movie'
  | 'guess_character'
  | 'guess_actor'
  | 'guess_year'
  | 'timeline'
  | 'odd_one_out'
  | 'fact_or_fiction'
  | 'movie_detective'
  | 'marisol_mystery';

export type Category = 
  | 'Food & Cooking'
  | 'Movies'
  | 'TV Shows'
  | 'Bollywood'
  | 'Hollywood'
  | 'Music'
  | 'Pop Culture'
  | 'Science'
  | 'Space'
  | 'Technology'
  | 'Geography'
  | 'History'
  | 'Weird Facts';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Question {
  id: string;
  category: Category;
  subcategory: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
  clues?: string[]; // For Movie Detective & Marisol's Mystery
  verifiedSource?: string;
  tags: string[];
  secretIngredient?: string; // Revealed when answered correctly in culinary trivia!
}

export interface Zone {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  iconName: string;
  description: string;
  totalLevels: number;
  requiredXp: number;
  marisolComment: string;
  bossName: string;
}

export interface PowerUp {
  id: 'hint' | 'clue' | 'time_freeze' | 'second_chance' | 'streak_shield';
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface CategoryMastery {
  category: Category;
  accuracy: number; // 0 to 100
  questionsAnswered: number;
  level: number;
  stampUnlocked: boolean;
}

export type ChefTitle = 
  | 'Apprentice Chopper 🥒'
  | 'Street Food Gourmet 🥪'
  | 'Bistro Sous Chef 🍳'
  | 'Flavor Alchemist 🍲'
  | 'Executive Head Chef 👩‍🍳'
  | 'Culinary Maestro 🌟'
  | '3-Star Master Chef 👑';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  cuisine: string;
  prepTime: string;
  difficulty: string;
  secretIngredients: string[];
  fullIngredients: string[];
  instructions: string[];
  moviePairing: {
    movie: string;
    quote: string;
    whyWatch: string;
  };
  hungerTrigger: string;
  emoji: string;
  accentColor: string;
  moodMatch: string;
}

export interface PlayerProfile {
  nickname: string;
  level: number;
  xp: number;
  cucumberSandwiches: number; // Primary culinary score & currency
  chefTitle: ChefTitle;
  unlockedRecipes: string[]; // List of unlocked recipe IDs
  collectedIngredients: string[]; // Current round secret ingredients
  streak: number;
  bestStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  factsDiscovered: number;
  favouriteCategory: Category;
  interests: Category[];
  unlockedZones: string[];
  completedBosses: string[];
  stamps: string[];
  powerUps: Record<string, number>;
  onboardingCompleted: boolean;
  createdAt: string;
  activeSticker?: string; // Companion mood sticker alias from the 11 stickers
}

export interface AdaptiveKnowledgeProfile {
  categoryStats: Record<Category, {
    total: number;
    correct: number;
    avgTimeMs: number;
    recentAccuracy: number[];
  }>;
  missedQuestionIds: string[];
  currentSkillRating: number; // 1 (Beginner) to 5 (Expert)
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requiredValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AudioSettings {
  musicOn: boolean;
  sfxOn: boolean;
  musicVolume: number; // 0 to 1
  sfxVolume: number; // 0 to 1
}

export interface TeacherProfile {
  teacherName: string;
  subject: string;
  favoriteMovies: string;
  favoriteShows: string;
  famousPhrases: string[];
  classroomMemories: string[];
  classmateNames: string[];
  customMessage: string;
}

export type MarisolExpression =
  | 'idle'
  | 'welcome'
  | 'excited'
  | 'thinking'
  | 'curious'
  | 'surprised'
  | 'shocked'
  | 'happy'
  | 'laughing'
  | 'proud'
  | 'celebrating'
  | 'encouraging'
  | 'confused'
  | 'oops'
  | 'disappointed'
  | 'motivational'
  | 'genius'
  | 'dramatic'
  | 'sleepy'
  | 'wink'
  | 'chai'
  | 'reading'
  | 'peace'
  | 'music';

export type ScreenState = 
  | 'cinematic'
  | 'onboarding'
  | 'home'
  | 'map'
  | 'quiz'
  | 'passport'
  | 'daily'
  | 'profile'
  | 'achievements'
  | 'classroom'
  | 'teacher_custom'
  | 'secret_classroom'
  | 'stickers'
  | 'recipes'
  | 'vault'
  | 'batch_wall'
  | 'music'
  | 'group_chat';



