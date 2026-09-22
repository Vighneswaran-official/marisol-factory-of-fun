export interface HindiSong {
  id: string;
  title: string;
  movie: string;
  singers: string;
  year: number;
  emoji: string;
  accentColor: string;
  youtubeId: string;
  vibe: string;
  lyricsHighlight: string;
  movieQuote: string;
  tags: string[];
}

export const HINDI_SONGS: HindiSong[] = [
  {
    id: 'love_you_zindagi',
    title: 'Love You Zindagi',
    movie: 'Dear Zindagi',
    singers: 'Jasleen Royal & Amit Trivedi',
    year: 2016,
    emoji: '🌸',
    accentColor: '#EC4899',
    youtubeId: 'bw7bVpI5VcM',
    vibe: 'Pure Self-Love & Radiance',
    lyricsHighlight: 'Jo dil se lage, use keh do Hi, Hi, Hi! Love you zindagi ♡',
    movieQuote: '"Don\'t let the past steal your present." — Dr. Jehangir Khan',
    tags: ['Feel Good', 'Self Love', 'Joy']
  },
  {
    id: 'ilahi',
    title: 'Ilahi',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Arijit Singh',
    year: 2013,
    emoji: '✈️',
    accentColor: '#3B82F6',
    youtubeId: 'j568uIAinuk',
    vibe: 'Wanderlust, Freedom & Big Dreams',
    lyricsHighlight: 'Shaamein malang si, raatein surmayi... Ilahi mera jee aaye aaye!',
    movieQuote: '"Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon... bas rukna nahi chahta!" — Bunny',
    tags: ['Adventures', 'Travel', 'High Energy']
  },
  {
    id: 'yeh_ishq_hai',
    title: 'Yeh Ishq Hai',
    movie: 'Jab We Met',
    singers: 'Shreya Ghoshal',
    year: 2007,
    emoji: '🏔️',
    accentColor: '#EF4444',
    youtubeId: 'b_sCZbYyuO4',
    vibe: 'Iconic Geet Energy & Wild Joy',
    lyricsHighlight: 'Haan hai koi toh wajah jo jeena aa gaya! Yeh ishq hai baithe bithaye jannat dikhaye...',
    movieQuote: '"Main apni favourite hoon!" — Geet',
    tags: ['Sassy', 'Bollywood Classic', 'Dancing']
  },
  {
    id: 'iktara',
    title: 'Iktara',
    movie: 'Wake Up Sid',
    singers: 'Kavita Seth & Amit Trivedi',
    year: 2009,
    emoji: '☕',
    accentColor: '#F97316',
    youtubeId: 'KTvTgrt0p5s',
    vibe: 'Soulful Monsoon Chai & Gentle Warmth',
    lyricsHighlight: 'Goonja sa hai koi iktara iktara, dheeme bole koi iktara...',
    movieQuote: '"Chai aur baarish se behtar kuch nahi hota." — Aisha',
    tags: ['Cozy Chai', 'Acoustic', 'Soulful']
  },
  {
    id: 'london_thumakda',
    title: 'London Thumakda',
    movie: 'Queen',
    singers: 'Labh Janjua, Sonu Kakkar, Neha Kakkar',
    year: 2014,
    emoji: '👑',
    accentColor: '#8B5CF6',
    youtubeId: 'udra3Mfw2oo',
    vibe: 'Ultimate Girl Power & Sassy Celebration',
    lyricsHighlight: 'Latthe di chaadar utte saleti rang maahiya... London thumakda!',
    movieQuote: '"Mera haal na Gupta uncle jaisa ho gaya hai... par main enjoy kar rahi hoon!" — Rani',
    tags: ['Girl Power', 'Party', 'Stress Buster']
  },
  {
    id: 'sooraj_ki_baahon_mein',
    title: 'Sooraj Ki Baahon Mein',
    movie: 'Zindagi Na Milegi Dobara',
    singers: 'Clinton Cerejo, Dominique Cerejo, Loy Mendonsa',
    year: 2011,
    emoji: '☀️',
    accentColor: '#EAB308',
    youtubeId: 'b3vVX3Q6hG4',
    vibe: 'Road Trips, Friendship & Euphoric Sunshine',
    lyricsHighlight: 'Aayi aayi aayi zindagani, dhoop mein jaise chhaon suhani!',
    movieQuote: '"Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho." — Laila',
    tags: ['Road Trip', 'Uplifting', 'Euphoria']
  }
];
