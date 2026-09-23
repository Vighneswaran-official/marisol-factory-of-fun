export interface MacaroniDish {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  moodMatch: string;
  moodLabel: string;
  cookTime: string;
  comfortLevel: string;
  secretIngredients: string[];
  pairingMovie: string;
  pairingQuote: string;
  accentColor: string;
}

export const MOOD_MACARONIS: Record<string, MacaroniDish> = {
  happy: {
    id: 'truffle_gold',
    name: 'Golden Truffle 4-Cheese Macaroni',
    emoji: '🧀',
    tagline: 'Decadent, bubbly, and dripping with celebratory sunshine!',
    description: 'Elbow macaroni tossed in a velvety blend of sharp cheddar, gruyère, parmesan, and a kiss of white truffle butter topped with golden panko crust.',
    moodMatch: 'happy',
    moodLabel: 'Happy & Radiant 🌸',
    cookTime: '15 mins',
    comfortLevel: 'Pure Luxury 👑',
    secretIngredients: [
      'Artisanal Elbow Macaroni 🍜',
      'Sharp Aged White Cheddar 🧀',
      'White Truffle Infused Butter 🧈',
      'Crispy Herb Panko Crust 🌿',
      'Toasted Garlic Flakes 🧄'
    ],
    pairingMovie: 'Zindagi Na Milegi Dobara (2011)',
    pairingQuote: '"Seize the day my friend, pehle is saal ko jeena seekho!"',
    accentColor: '#EC4899'
  },
  cozy: {
    id: 'desi_masala',
    name: 'Desi Tapri Spiced Masala Macaroni',
    emoji: '🌶️',
    tagline: 'The nostalgic Indian school-lunchbox classic with buttery spices!',
    description: 'Tender macaroni sautéed with sizzling cumin, sweet red onions, juicy desi tomatoes, green peas, magical Pav Bhaji butter masala, and coriander rain.',
    moodMatch: 'cozy',
    moodLabel: 'Chai & Cozy Happiness ☕',
    cookTime: '18 mins',
    comfortLevel: 'Maximum Warmth 🤍',
    secretIngredients: [
      'Semolina Elbow Macaroni 🌾',
      'Amul Butter Spiced Masala 🧈',
      'Vine-Ripened Roma Tomatoes 🍅',
      'Sweet Green Peas & Capsicum 🫑',
      'Freshly Torn Mint & Coriander 🌿'
    ],
    pairingMovie: 'Jab We Met (2007)',
    pairingQuote: '"Main apni favourite hoon!"',
    accentColor: '#F59E0B'
  },
  tired: {
    id: 'midnight_melt',
    name: 'Midnight 3-Cheese Creamy Mac Melt',
    emoji: '🌙',
    tagline: 'Ultra-silky, soothing, and zero-effort comfort for tired queens.',
    description: 'Slow-simmered macaroni swimming in a rich, buttery garlic cream and melted mozzarella blanket that melts all the day\'s fatigue away.',
    moodMatch: 'tired',
    moodLabel: 'Tired & Needs 5 More Mins 💤',
    cookTime: '12 mins',
    comfortLevel: 'Sleep-Inducing Hug 🧸',
    secretIngredients: [
      'Quick-Boil Small Macaroni 🥣',
      'Heavy Cream & Garlic Butter 🥛',
      'Gooey Melty Mozzarella 🧀',
      'Cracked Black Pepper 🖤',
      'Smoked Sea Salt 🧂'
    ],
    pairingMovie: 'Wake Up Sid (2009)',
    pairingQuote: '"Kuch toh naya hai har din mein... sleep tight, queen."',
    accentColor: '#8B5CF6'
  },
  stressed: {
    id: 'garlic_butter_rescue',
    name: 'Garlic Butter Herb Macaroni Rescue',
    emoji: '🧄',
    tagline: 'Aromatic, buttery bliss that instantly un-clenches your shoulders.',
    description: 'Toasted golden garlic tossed with gentle parsley butter, soft macaroni spirals, creamy ricotta dollops, and lemon zest for instant headspace clarity.',
    moodMatch: 'stressed',
    moodLabel: 'Stressed / Mind Overloaded 🥺',
    cookTime: '15 mins',
    comfortLevel: 'Stress Buster 🌸',
    secretIngredients: [
      'Silky Macaroni Elbows 🍜',
      'Roasted Whole Garlic Cloves 🧄',
      'Fresh Italian Parsley 🌿',
      'Whipped Creamy Ricotta ☁️',
      'Sun-Dried Tomato Ribbons 🍅'
    ],
    pairingMovie: 'Dear Zindagi (2016)',
    pairingQuote: '"Don\'t let the past steal your present. Take a deep breath!"',
    accentColor: '#3B82F6'
  },
  foodie: {
    id: 'pizza_mac_supreme',
    name: 'Pizza-Baked Cheesy Macaroni Supreme',
    emoji: '🍕',
    tagline: 'Pizza meets pasta in the ultimate cheat-day extravaganza!',
    description: 'Macaroni baked under a bubbling blanket of pizza marinara, double mozzarella, spicy jalapeños, sweet basil, and golden crispy cheese edges.',
    moodMatch: 'foodie',
    moodLabel: 'Pizza Fixes (Almost) Everything 🍕',
    cookTime: '20 mins',
    comfortLevel: 'Pure Foodie Ecstasy 😋',
    secretIngredients: [
      'Rigati Ridged Macaroni 🍝',
      'San Marzano Pizza Sauce 🍅',
      'Double Stringy Mozzarella 🧀',
      'Pickled Jalapeño Rings 🌶️',
      'Oregano & Chilli Flakes 🌿'
    ],
    pairingMovie: 'Ratatouille (2007) & Queen (2014)',
    pairingQuote: '"Good food is like music you can taste, color you can smell!"',
    accentColor: '#EF4444'
  },
  corporate: {
    id: 'power_protein_mac',
    name: 'Power Truffle Macaroni with Crispy Corn',
    emoji: '💼',
    tagline: 'Fueling big corporate dreams with sleek, high-energy flavor!',
    description: 'Nutritious whole wheat macaroni with sweet corn crunch, smoked gouda, baby spinach ribbons, and toasted pumpkin seeds to conquer the boardroom.',
    moodMatch: 'corporate',
    moodLabel: 'Corporate Queen & Making Progress 💼',
    cookTime: '16 mins',
    comfortLevel: 'Boss Energy ⚡',
    secretIngredients: [
      'Whole Wheat Macaroni 🌾',
      'Smoked Dutch Gouda 🧀',
      'Sweet Buttered Corn Kernels 🌽',
      'Tender Baby Spinach 🍃',
      'Toasted Pumpkin Seeds 🌻'
    ],
    pairingMovie: 'The Devil Wears Prada & Dil Dhadakne Do',
    pairingQuote: '"Everybody wants to be us! Keep slaying your meetings!"',
    accentColor: '#0EA5E9'
  },
  silly: {
    id: 'rainbow_confetti_mac',
    name: 'Rainbow Cheesy Confetti Macaroni Fun',
    emoji: '🌈',
    tagline: 'Playful, vibrant, crunchy & totally un-serious goodness!',
    description: 'Gooey cheddar macaroni sprinkled with crushed cheesy nachos, colorful bell pepper confetti, and tangy sour cream drizzle. Silly is definitely a vibe!',
    moodMatch: 'silly',
    moodLabel: 'Silly Is A Vibe & Grateful Always 🌸',
    cookTime: '14 mins',
    comfortLevel: 'Laugh Out Loud Joy 🎉',
    secretIngredients: [
      'Tricolor Spiral Macaroni 🌀',
      'Tangy Cheddar Cheese Sauce 🧀',
      'Crushed Nacho Tortilla Dust 🌮',
      'Tri-Color Pepper Dice 🫑',
      'Dollop of Cooling Sour Cream 🍨'
    ],
    pairingMovie: 'Andaz Apna Apna (1994) & Welcome (2007)',
    pairingQuote: '"Do dost ek pyale mein chai piyenge... isse dosti badhti hai!"',
    accentColor: '#10B981'
  }
};
