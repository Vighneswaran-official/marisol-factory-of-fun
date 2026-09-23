import { MOOD_MACARONIS, type MacaroniDish } from '../data/macaroniRecipes';
import { nonRepeatingQuizEngine } from '../data/foodMovieQuestions1000';
import type { Question, Category } from '../types/game';

import moodHappyImg from '../assets/moods/mood_happy.jpg';
import moodExcitedImg from '../assets/moods/mood_excited.jpg';
import moodCalmImg from '../assets/moods/mood_calm.jpg';
import moodStressedImg from '../assets/moods/mood_stressed.jpg';
import moodTiredImg from '../assets/moods/mood_tired.jpg';
import moodMotivatedImg from '../assets/moods/mood_motivated.jpg';
import moodPlayfulImg from '../assets/moods/mood_playful.jpg';
import moodGratefulImg from '../assets/moods/mood_grateful.jpg';
import moodConfidentImg from '../assets/moods/mood_confident.jpg';

export interface MoodProfileSetting {
  id: string;
  scaleNumber: number; // 1 to 9
  label: string;
  emoji: string;
  imageSrc: string;
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
    label: 'Happy',
    emoji: '🌸',
    imageSrc: moodHappyImg,
    stickerQuote: 'Radiant Sunshine <3',
    vibe: 'Joyful & bright',
    dialogue: 'Your smile brings the brightest sunshine to our world! Keep shining, queen! ✨💖',
    themeColor: '#EC4899',
    targetCategories: ['Bollywood', 'Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'excited',
    scaleNumber: 2,
    label: 'Excited',
    emoji: '⚡',
    imageSrc: moodExcitedImg,
    stickerQuote: 'Super Hyped & Ready!',
    vibe: 'High energy & thrilled',
    dialogue: 'That electric energy is contagious! Let’s celebrate big wins and have endless fun! ⚡🎉',
    themeColor: '#F59E0B',
    targetCategories: ['Bollywood', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'calm',
    scaleNumber: 3,
    label: 'Calm',
    emoji: '☕',
    imageSrc: moodCalmImg,
    stickerQuote: 'Peace & Warm Chai <3',
    vibe: 'Peaceful & grounded',
    dialogue: 'Hot cup of ginger chai & soothing comfort on our agenda today. Breathe easy. ☕☁️',
    themeColor: '#10B981',
    targetCategories: ['Food & Cooking', 'Pop Culture'],
    preferredTheme: 'Food'
  },
  {
    id: 'stressed',
    scaleNumber: 4,
    label: 'Stressed',
    emoji: '🥺',
    imageSrc: moodStressedImg,
    stickerQuote: 'Need a Gentle Hug',
    vibe: 'Overwhelmed & anxious',
    dialogue: 'Deep breath, darling. Drop your shoulders, sip some water. You are doing amazing! 🌸💆‍♀️',
    themeColor: '#3B82F6',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'tired',
    scaleNumber: 5,
    label: 'Tired',
    emoji: '💤',
    imageSrc: moodTiredImg,
    stickerQuote: 'Recharging Battery...',
    vibe: 'Low energy & sleepy',
    dialogue: 'You worked so hard today. Let’s wrap in a warm blanket and cozy up. 🌙💤',
    themeColor: '#8B5CF6',
    targetCategories: ['Movies', 'Food & Cooking'],
    preferredTheme: 'Movies'
  },
  {
    id: 'motivated',
    scaleNumber: 6,
    label: 'Motivated',
    emoji: '💼',
    imageSrc: moodMotivatedImg,
    stickerQuote: 'Focused & Slaying',
    vibe: 'Ambitious & driven',
    dialogue: 'Look at you conquering your goals! Slay those tasks and reach new heights! ⚡👑',
    themeColor: '#0EA5E9',
    targetCategories: ['Movies', 'Pop Culture'],
    preferredTheme: 'Movies'
  },
  {
    id: 'playful',
    scaleNumber: 7,
    label: 'Playful',
    emoji: '🤪',
    imageSrc: moodPlayfulImg,
    stickerQuote: 'Silly Is A Vibe',
    vibe: 'Quirky & cheerful',
    dialogue: 'Main apni favourite hoon! Keep laughing and being your iconic joyful self! 🎀🌈',
    themeColor: '#EC4899',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Movies'
  },
  {
    id: 'grateful',
    scaleNumber: 8,
    label: 'Grateful',
    emoji: '🐶',
    imageSrc: moodGratefulImg,
    stickerQuote: 'Wholesome & Loved',
    vibe: 'Warm & thankful',
    dialogue: 'Sending you gentle puppy cuddles and the warmest fuzzy sisterly love! 🐶🧸',
    themeColor: '#FBBF24',
    targetCategories: ['Food & Cooking', 'Movies'],
    preferredTheme: 'Food'
  },
  {
    id: 'confident',
    scaleNumber: 9,
    label: 'Confident',
    emoji: '👑',
    imageSrc: moodConfidentImg,
    stickerQuote: 'Main apni favourite hoon!',
    vibe: 'Unstoppable royal confidence',
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
