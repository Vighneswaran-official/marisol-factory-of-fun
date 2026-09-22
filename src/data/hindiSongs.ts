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
    youtubeId: '6wNFJuDcxV4',
    vibe: 'Wanderlust, Freedom & Big Dreams',
    lyricsHighlight: 'Shaamein malang si, raatein surmayi... Ilahi mera jee aaye aaye!',
    movieQuote: '"Main udna chahta hoon, daudna chahta hoon... bas rukna nahi chahta!" — Bunny',
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
    youtubeId: '8w9ezkQFUYo',
    vibe: 'Iconic Geet Energy & Wild Joy',
    lyricsHighlight: 'Haan hai koi toh wajah jo jeena aa gaya! Yeh ishq hai baithe bithaye jannat dikhaye...',
    movieQuote: '"Main apni favourite hoon!" — Geet',
    tags: ['Sassy', 'Bollywood Classic', 'Party']
  },
  {
    id: 'iktara',
    title: 'Iktara',
    movie: 'Wake Up Sid',
    singers: 'Kavita Seth & Amit Trivedi',
    year: 2009,
    emoji: '☕',
    accentColor: '#F97316',
    youtubeId: 'fSS_R91Nimw',
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
    tags: ['Party', 'Feel Good', 'Stress Buster']
  },
  {
    id: 'sooraj_ki_baahon_mein',
    title: 'Sooraj Ki Baahon Mein',
    movie: 'Zindagi Na Milegi Dobara',
    singers: 'Clinton Cerejo, Dominique Cerejo, Loy Mendonsa',
    year: 2011,
    emoji: '☀️',
    accentColor: '#EAB308',
    youtubeId: 'L_XJ_s5IsQc',
    vibe: 'Road Trips, Friendship & Euphoric Sunshine',
    lyricsHighlight: 'Aayi aayi aayi zindagani, dhoop mein jaise chhaon suhani!',
    movieQuote: '"Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho." — Laila',
    tags: ['Travel', 'Feel Good', 'Uplifting']
  },
  {
    id: 'tum_se_hi',
    title: 'Tum Se Hi',
    movie: 'Jab We Met',
    singers: 'Mohit Chauhan',
    year: 2007,
    emoji: '🌧️',
    accentColor: '#06B6D4',
    youtubeId: 'mt9xg0mmt28',
    vibe: 'Gentle Raindrops & Romantic Nostalgia',
    lyricsHighlight: 'Aadha sa waada kabhi, aadhe se zyada kabhi... jee mein hai kya kaho!',
    movieQuote: '"Jab koi pyaar mein hota hai, toh koi sahi galat nahi hota." — Geet',
    tags: ['Romantic', 'Cozy Chai', 'Soulful']
  },
  {
    id: 'kabira',
    title: 'Kabira',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Tochi Raina & Rekha Bhardwaj',
    year: 2013,
    emoji: '🪕',
    accentColor: '#D97706',
    youtubeId: 'jHNNMj5bNQw',
    vibe: 'Melodic Reflection & Deep Comfort',
    lyricsHighlight: 'Banno re banno meri chali sasural ko... Tu dhoondhe katora!',
    movieQuote: '"Kahin pahuchne ke liye kahin se nikalna zaroori hota hai." — Bunny',
    tags: ['Acoustic', 'Soulful', 'Feel Good']
  },
  {
    id: 'subhanallah',
    title: 'Subhanallah',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Sreeram Chandra & Shilpa Rao',
    year: 2013,
    emoji: '❄️',
    accentColor: '#6366F1',
    youtubeId: '2mWaqank5mo',
    vibe: 'Snowy Manali Morning & Tender Sweetness',
    lyricsHighlight: 'Subhanallah... jo ho raha hai pehli dafa hai!',
    movieQuote: '"Main pehle jaisi nahi rahi." — Naina',
    tags: ['Romantic', 'Travel', 'Self Love']
  },
  {
    id: 'khaabon_ke_parindey',
    title: 'Khaabon Ke Parindey',
    movie: 'Zindagi Na Milegi Dobara',
    singers: 'Mohit Chauhan & Alyssa Mendonsa',
    year: 2011,
    emoji: '🕊️',
    accentColor: '#10B981',
    youtubeId: 'R0XjxTH3rLo',
    vibe: 'Open Spanish Highways & Flying Dreams',
    lyricsHighlight: 'Ude, khule aasman mein khwaabon ke parindey...',
    movieQuote: '"Seize the day my friend, pehle is din ko poori tarah jiyo!" — Laila',
    tags: ['Travel', 'Acoustic', 'Joy']
  },
  {
    id: 'gallan_goodiyaan',
    title: 'Gallan Goodiyaan',
    movie: 'Dil Dhadakne Do',
    singers: 'Yashita Sharma, Manish Kumar Tipu, Shankar Mahadevan',
    year: 2015,
    emoji: '💃',
    accentColor: '#EC4899',
    youtubeId: 'jCEdTq3j-0U',
    vibe: 'High-Spirited Celebration Dance',
    lyricsHighlight: 'Dil dhadakne do... Yeh baatein hain badi purani!',
    movieQuote: '"Life mein sabse zaroori kya hai? Khushi!"',
    tags: ['Party', 'High Energy', 'Feel Good']
  },
  {
    id: 'badtameez_dil',
    title: 'Badtameez Dil',
    movie: 'Yeh Jawaani Hai Deewani',
    singers: 'Benny Dayal & Shefali Alvares',
    year: 2013,
    emoji: '🕺',
    accentColor: '#F43F5E',
    youtubeId: 'II2EO3Nw4t0',
    vibe: 'Wild Unapologetic Joy & Bubbly Fun',
    lyricsHighlight: 'Badtameez dil maane na maane na!',
    movieQuote: '"Celebration ka koi reason nahi hota!"',
    tags: ['Party', 'Sassy', 'High Energy']
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    movie: 'Brahmāstra',
    singers: 'Arijit Singh & Pritam',
    year: 2022,
    emoji: '🧡',
    accentColor: '#F97316',
    youtubeId: 'BddP6PYo2gs',
    vibe: 'Golden Sunset Romance & Euphoria',
    lyricsHighlight: 'Kesariya tera ishq hai piya, rang jaaun jo main haath lagaun!',
    movieQuote: '"Pyaar mein junoon hota hai."',
    tags: ['Romantic', 'Feel Good', 'Self Love']
  },
  {
    id: 'apna_bana_le',
    title: 'Apna Bana Le',
    movie: 'Bhediya',
    singers: 'Arijit Singh & Sachin-Jigar',
    year: 2022,
    emoji: '✨',
    accentColor: '#8B5CF6',
    youtubeId: 'ElZfdU54Cp8',
    vibe: 'Heartfelt Devotion & Soft Magic',
    lyricsHighlight: 'Tu mera koi na hoke bhi kuch laage... Apna bana le piya!',
    movieQuote: '"Duniya se alag ek rishta."',
    tags: ['Romantic', 'Soulful', 'Cozy Chai']
  },
  {
    id: 'channa_mereya',
    title: 'Channa Mereya',
    movie: 'Ae Dil Hai Mushkil',
    singers: 'Arijit Singh & Pritam',
    year: 2016,
    emoji: '🌙',
    accentColor: '#3B82F6',
    youtubeId: '284Ov7ysmfA',
    vibe: 'Deep Heartfelt Soul & Emotion',
    lyricsHighlight: 'Achha chalta hoon, duaon mein yaad rakhna... Channa mereya mereya!',
    movieQuote: '"Ek tarfa pyaar ki taqat hi kuch aur hoti hai."',
    tags: ['Soulful', 'Romantic', 'Cozy Chai']
  },
  {
    id: 'heeriye',
    title: 'Heeriye',
    movie: 'Non-Film Hit',
    singers: 'Jasleen Royal & Arijit Singh',
    year: 2023,
    emoji: '💍',
    accentColor: '#EC4899',
    youtubeId: 'RLzC55ai0eo',
    vibe: 'Modern Fairytale Wedding Glow',
    lyricsHighlight: 'Heeriye heeriye aa... teri hoke mar jaaniye!',
    movieQuote: '"Love is the sweetest adventure."',
    tags: ['Romantic', 'Feel Good', 'Acoustic']
  },
  {
    id: 'raataan_lambiyan',
    title: 'Raataan Lambiyan',
    movie: 'Shershaah',
    singers: 'Jubin Nautiyal & Asees Kaur',
    year: 2021,
    emoji: '🌌',
    accentColor: '#06B6D4',
    youtubeId: 'gvyUuxdRdR4',
    vibe: 'Soft Night Breezes & Sweet Nostalgia',
    lyricsHighlight: 'Kaatan kaise raataan o saaware... Jiya nahi jaata sun bawre!',
    movieQuote: '"Har lamha tere saath rehna hai."',
    tags: ['Romantic', 'Cozy Chai', 'Soulful']
  }
];

