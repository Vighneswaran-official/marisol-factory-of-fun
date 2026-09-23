import { MOOD_MACARONIS, type MacaroniDish } from '../data/macaroniRecipes';
import { nonRepeatingQuizEngine } from '../data/foodMovieQuestions1000';
import type { Question, Category } from '../types/game';

export interface MoodProfileSetting {
  id: string;
  scaleNumber: number; // 1 to 9
  label: string;
  emoji: string;
  stickerQuote: string;
  vibe: string;
  dialogue: string;
  themeColor: string;
  targetCategories: Category[];
  preferredTheme: 'Food' | 'Movies';
}

export const KRITIKA_STICKER_MOODS: MoodProfileSetting[] = [
  {
    id: 'happy',
    scaleNumber: 1,
    label: 'Radiant Sunshine',
    emoji: '🌸',
    stickerQuote: 'Same Girl Brighter Ideas <3',
    vibe: 'Joyful, optimistic',
    dialogue: 'Your smile brings the brightest sunshine to Batch 41! Keep shining, queen! ✨💖',
    themeColor: '#EC4899',
    targetCategories: ['Bollywood', 'Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'cozy',
    scaleNumber: 2,
    label: 'Chai Enthusiast',
    emoji: '☕',
    stickerQuote: 'Chai = Happiness <3',
    vibe: 'Cozy, rainy afternoon',
    dialogue: 'Hot cup of ginger chai & zero stress on our agenda today, queen! ☕☁️',
    themeColor: '#F59E0B',
    targetCategories: ['Food & Cooking', 'Pop Culture', 'Bollywood'],
    preferredTheme: 'Food'
  },
  {
    id: 'tired',
    scaleNumber: 3,
    label: 'Sleepy Panda',
    emoji: '💤',
    stickerQuote: '5 more minutes please...',
    vibe: 'Low battery, blanket cocoon',
    dialogue: 'You worked so hard today, Kritika. Let’s wrap in a warm blanket and recharge. 🌙💤',
    themeColor: '#8B5CF6',
    targetCategories: ['Movies', 'Food & Cooking'],
    preferredTheme: 'Movies'
  },
  {
    id: 'stressed',
    scaleNumber: 4,
    label: 'Brain Overload',
    emoji: '🥺',
    stickerQuote: 'Oh God, My Mind!',
    vibe: 'Overthinking, deadline panic',
    dialogue: 'Deep breath, darling. Drop your shoulders, sip some chai. You are doing amazing! 🌸💆‍♀️',
    themeColor: '#3B82F6',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'foodie',
    scaleNumber: 5,
    label: 'Foodie Monster',
    emoji: '🍕',
    stickerQuote: 'Pizza Fixes (Almost) Everything',
    vibe: 'Cravings, cheat day',
    dialogue: 'Good food is the ultimate remedy! Let\'s cook up some bubbling cheesy goodness! 🍕🧀',
    themeColor: '#EF4444',
    targetCategories: ['Food & Cooking'],
    preferredTheme: 'Food'
  },
  {
    id: 'corporate',
    scaleNumber: 6,
    label: 'Corporate Queen',
    emoji: '💼',
    stickerQuote: 'Fueling Big Dreams',
    vibe: 'Ambitious, productive',
    dialogue: 'Look at you conquering the corporate world! Slay those meetings, queen! ⚡👑',
    themeColor: '#0EA5E9',
    targetCategories: ['Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'silly',
    scaleNumber: 7,
    label: 'Silly Chaos',
    emoji: '🤪',
    stickerQuote: 'Silly Is A Vibe',
    vibe: 'Quirky, playful',
    dialogue: 'Main apni favourite hoon! Keep laughing and being your iconic quirky self! 🎀🌈',
    themeColor: '#10B981',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Movies'
  },
  {
    id: 'soft',
    scaleNumber: 8,
    label: 'Wholesome Soft',
    emoji: '🐶',
    stickerQuote: 'Doggo Therapy <3',
    vibe: 'Needing hugs, gentle warmth',
    dialogue: 'Sending you gentle puppy cuddles and the warmest fuzzy sisterly hug! 🐶🧸',
    themeColor: '#FBBF24',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'queen',
    scaleNumber: 9,
    label: 'Main Character',
    emoji: '👑',
    stickerQuote: 'Main apni favourite hoon!',
    vibe: 'Unstoppable confidence',
    dialogue: 'Step into your royal power! The world is your catwalk and you are the queen! 👑✨',
    themeColor: '#D946EF',
    targetCategories: ['Bollywood', 'Movies'],
    preferredTheme: 'Movies'
  }
];

export const getMoodMacaroni = (moodId: string): MacaroniDish => {
  return MOOD_MACARONIS[moodId] || MOOD_MACARONIS['happy'];
};

/**
 * Draw 100% unrepeated questions from the 1000+ Food & Movie database
 */
export const getQuestionsForMood = (moodId: string, count: number = 5, _playedIds: string[] = []): Question[] => {
  const setting = KRITIKA_STICKER_MOODS.find(m => m.id === moodId) || KRITIKA_STICKER_MOODS[0];
  return nonRepeatingQuizEngine.getUnplayedQuestions(count, setting.preferredTheme);
};
