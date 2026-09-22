import type { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'MARISOL\'S FAVORITE',
    description: 'Complete the introductory Factory of Fun adventure!',
    icon: 'Heart',
    category: 'Adventure',
    requiredValue: 1,
    unlocked: false
  },
  {
    id: 'ach_2',
    title: 'CINEMA NERD',
    description: 'Answer 10 movie questions correctly',
    icon: 'Film',
    category: 'Movies',
    requiredValue: 10,
    unlocked: false
  },
  {
    id: 'ach_3',
    title: 'FILMY SOUL',
    description: 'Reach Level 3 in the Bollywood category',
    icon: 'Sparkles',
    category: 'Bollywood',
    requiredValue: 3,
    unlocked: false
  },
  {
    id: 'ach_4',
    title: 'BINGE BOSS',
    description: 'Master 15 TV show trivia questions',
    icon: 'Tv',
    category: 'TV Shows',
    requiredValue: 15,
    unlocked: false
  },
  {
    id: 'ach_5',
    title: 'ON FIRE',
    description: 'Achieve a 5-question correct answer streak',
    icon: 'Flame',
    category: 'Streak',
    requiredValue: 5,
    unlocked: false
  },
  {
    id: 'ach_6',
    title: 'FACT MACHINE',
    description: 'Earn 1,000 total XP in the game',
    icon: 'Zap',
    category: 'XP',
    requiredValue: 1000,
    unlocked: false
  },
  {
    id: 'ach_7',
    title: 'WAIT... WHAT?!',
    description: 'Discover 10 mind-blowing weird facts',
    icon: 'HelpCircle',
    category: 'Weird Facts',
    requiredValue: 10,
    unlocked: false
  },
  {
    id: 'ach_8',
    title: 'WORLD EXPLORER',
    description: 'Play challenges across 5 different map zones',
    icon: 'Compass',
    category: 'Exploration',
    requiredValue: 5,
    unlocked: false
  }
];
