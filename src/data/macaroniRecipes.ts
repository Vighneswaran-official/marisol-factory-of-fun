export interface MacaroniDish {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  scaleNumber: number;
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
  // Scale 1: Happy 🌸
  happy: {
    id: 'truffle_gold',
    name: 'Golden Truffle 4-Cheese Macaroni',
    emoji: '🧀',
    scaleNumber: 1,
    tagline: 'Decadent, bubbly, and dripping with celebratory sunshine!',
    description: 'Elbow macaroni tossed in a velvety blend of sharp cheddar, gruyère, parmesan, and a kiss of white truffle butter topped with golden herb panko crust.',
    moodMatch: 'happy',
    moodLabel: 'Happy 🌸',
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

  // Scale 2: Excited ⚡
  excited: {
    id: 'desi_masala',
    name: 'Desi Spiced Butter Masala Macaroni',
    emoji: '⚡',
    scaleNumber: 2,
    tagline: 'Electric spices and rich butter for high-energy celebrations!',
    description: 'Tender macaroni sautéed with sizzling cumin, sweet red onions, juicy desi tomatoes, sweet green peas, magical Pav Bhaji butter masala, and coriander rain.',
    moodMatch: 'excited',
    moodLabel: 'Excited ⚡',
    cookTime: '18 mins',
    comfortLevel: 'High Voltage 🎉',
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
  cozy: {
    id: 'desi_masala',
    name: 'Desi Spiced Butter Masala Macaroni',
    emoji: '⚡',
    scaleNumber: 2,
    tagline: 'Electric spices and rich butter for high-energy celebrations!',
    description: 'Tender macaroni sautéed with sizzling cumin, sweet red onions, juicy desi tomatoes, sweet green peas, magical Pav Bhaji butter masala, and coriander rain.',
    moodMatch: 'excited',
    moodLabel: 'Excited ⚡',
    cookTime: '18 mins',
    comfortLevel: 'High Voltage 🎉',
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

  // Scale 3: Calm ☕
  calm: {
    id: 'creamy_garlic_herb',
    name: 'Soothing Creamy Herb Macaroni',
    emoji: '☕',
    scaleNumber: 3,
    tagline: 'Gentle, aromatic, and peaceful comfort for relaxed moments.',
    description: 'Tender macaroni tossed in gentle herbs, light cream, parmesan shavings, and aromatic garlic butter for a soothing, tranquil vibe.',
    moodMatch: 'calm',
    moodLabel: 'Calm ☕',
    cookTime: '14 mins',
    comfortLevel: 'Peaceful Bliss ☁️',
    secretIngredients: [
      'Artisanal Shell Pasta 🐚',
      'Fresh Rosemary & Thyme 🌿',
      'Whipped Ricotta Cloud ☁️',
      'Garlic Infused Butter 🧈',
      'Parmigiano Reggiano 🧀'
    ],
    pairingMovie: 'Wake Up Sid (2009)',
    pairingQuote: '"Kuch toh naya hai har din mein... enjoy the peace."',
    accentColor: '#10B981'
  },

  // Scale 4: Stressed 🥺
  stressed: {
    id: 'garlic_butter_rescue',
    name: 'Garlic Butter Herb Macaroni Rescue',
    emoji: '🧄',
    scaleNumber: 4,
    tagline: 'Aromatic, buttery bliss that instantly un-clenches your shoulders.',
    description: 'Toasted golden garlic tossed with gentle parsley butter, soft macaroni spirals, creamy ricotta dollops, and lemon zest for instant headspace clarity.',
    moodMatch: 'stressed',
    moodLabel: 'Stressed 🥺',
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

  // Scale 5: Tired 💤
  tired: {
    id: 'midnight_melt',
    name: 'Midnight 3-Cheese Creamy Mac Melt',
    emoji: '🌙',
    scaleNumber: 5,
    tagline: 'Ultra-silky, soothing, and zero-effort comfort for tired souls.',
    description: 'Slow-simmered macaroni swimming in a rich, buttery garlic cream and melted mozzarella blanket that melts all the day\'s fatigue away.',
    moodMatch: 'tired',
    moodLabel: 'Tired 💤',
    cookTime: '12 mins',
    comfortLevel: 'Sleep-Inducing Hug 🧸',
    secretIngredients: [
      'Quick-Boil Small Macaroni 🥣',
      'Heavy Cream & Garlic Butter 🥛',
      'Gooey Melty Mozzarella 🧀',
      'Cracked Black Pepper 🖤',
      'Smoked Sea Salt 🧂'
    ],
    pairingMovie: 'Queen (2014)',
    pairingQuote: '"Take a good rest, tomorrow is your stage!"',
    accentColor: '#8B5CF6'
  },
  foodie: {
    id: 'midnight_melt',
    name: 'Midnight 3-Cheese Creamy Mac Melt',
    emoji: '🌙',
    scaleNumber: 5,
    tagline: 'Ultra-silky, soothing, and zero-effort comfort.',
    description: 'Slow-simmered macaroni swimming in a rich, buttery garlic cream and melted mozzarella.',
    moodMatch: 'tired',
    moodLabel: 'Tired 💤',
    cookTime: '12 mins',
    comfortLevel: 'Sleep-Inducing Hug 🧸',
    secretIngredients: ['Quick-Boil Small Macaroni 🥣', 'Gooey Melty Mozzarella 🧀'],
    pairingMovie: 'Queen (2014)',
    pairingQuote: '"Take a good rest!"',
    accentColor: '#8B5CF6'
  },

  // Scale 6: Motivated 💼
  motivated: {
    id: 'power_protein_mac',
    name: 'Power Truffle Macaroni w/ Crispy Corn',
    emoji: '💼',
    scaleNumber: 6,
    tagline: 'Fueling big ambitions with sleek, high-energy flavor!',
    description: 'Nutritious whole wheat macaroni with sweet buttered corn crunch, smoked gouda, baby spinach ribbons, and toasted pumpkin seeds.',
    moodMatch: 'motivated',
    moodLabel: 'Motivated 💼',
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
    pairingQuote: '"Everybody wants to be us! Keep slaying your goals!"',
    accentColor: '#0EA5E9'
  },
  corporate: {
    id: 'power_protein_mac',
    name: 'Power Truffle Macaroni w/ Crispy Corn',
    emoji: '💼',
    scaleNumber: 6,
    tagline: 'Fueling big ambitions with sleek, high-energy flavor!',
    description: 'Nutritious whole wheat macaroni with sweet buttered corn crunch, smoked gouda, baby spinach ribbons, and toasted pumpkin seeds.',
    moodMatch: 'motivated',
    moodLabel: 'Motivated 💼',
    cookTime: '16 mins',
    comfortLevel: 'Boss Energy ⚡',
    secretIngredients: ['Whole Wheat Macaroni 🌾', 'Smoked Dutch Gouda 🧀'],
    pairingMovie: 'The Devil Wears Prada',
    pairingQuote: '"Keep slaying!"',
    accentColor: '#0EA5E9'
  },

  // Scale 7: Playful 🤪
  playful: {
    id: 'rainbow_confetti_mac',
    name: 'Rainbow Cheesy Confetti Macaroni',
    emoji: '🌈',
    scaleNumber: 7,
    tagline: 'Playful, vibrant, crunchy & totally un-serious goodness!',
    description: 'Gooey cheddar macaroni sprinkled with crushed cheesy nachos, colorful bell pepper confetti, and tangy sour cream drizzle.',
    moodMatch: 'playful',
    moodLabel: 'Playful 🤪',
    cookTime: '14 mins',
    comfortLevel: 'Laugh Out Loud Joy 🎉',
    secretIngredients: [
      'Tricolor Spiral Macaroni 🌀',
      'Tangy Cheddar Cheese Sauce 🧀',
      'Crushed Nacho Tortilla Dust 🌮',
      'Tri-Color Pepper Dice 🫑',
      'Cooling Sour Cream Dollop 🍨'
    ],
    pairingMovie: 'Andaz Apna Apna (1994) & Welcome (2007)',
    pairingQuote: '"Do dost ek pyale mein chai piyenge... isse dosti badhti hai!"',
    accentColor: '#EC4899'
  },
  silly: {
    id: 'rainbow_confetti_mac',
    name: 'Rainbow Cheesy Confetti Macaroni',
    emoji: '🌈',
    scaleNumber: 7,
    tagline: 'Playful, vibrant, crunchy & totally un-serious goodness!',
    description: 'Gooey cheddar macaroni sprinkled with crushed cheesy nachos, colorful bell pepper confetti, and tangy sour cream drizzle.',
    moodMatch: 'playful',
    moodLabel: 'Playful 🤪',
    cookTime: '14 mins',
    comfortLevel: 'Laugh Out Loud Joy 🎉',
    secretIngredients: ['Tricolor Spiral Macaroni 🌀', 'Tangy Cheddar Cheese Sauce 🧀'],
    pairingMovie: 'Andaz Apna Apna (1994)',
    pairingQuote: '"Do dost ek pyale mein chai piyenge!"',
    accentColor: '#EC4899'
  },

  // Scale 8: Grateful 🐶
  grateful: {
    id: 'sweet_corn_cheddar',
    name: 'Velvety White Cheddar & Sweet Corn Mac',
    emoji: '🌽',
    scaleNumber: 8,
    tagline: 'Warm, fluffy & tender comfort just like cuddling a golden pup.',
    description: 'Tender curved macaroni enveloped in a velvety mild white cheddar sauce with sweet bursting corn and a gentle nutmeg aroma.',
    moodMatch: 'grateful',
    moodLabel: 'Grateful 🐶',
    cookTime: '15 mins',
    comfortLevel: 'Gentle Warm Hug 🧸',
    secretIngredients: [
      'Small Shell Macaroni 🐚',
      'Mild Vermont White Cheddar 🧀',
      'Charred Sweet Corn 🌽',
      'Warm Nutmeg & Butter Cloud 🧈',
      'Fresh Garden Chives 🌱'
    ],
    pairingMovie: 'Chillar Party & Paddington (2014)',
    pairingQuote: '"If we are kind and polite, the world will be right."',
    accentColor: '#FBBF24'
  },
  soft: {
    id: 'sweet_corn_cheddar',
    name: 'Velvety White Cheddar & Sweet Corn Mac',
    emoji: '🌽',
    scaleNumber: 8,
    tagline: 'Warm, fluffy & tender comfort.',
    description: 'Tender curved macaroni enveloped in a velvety mild white cheddar sauce.',
    moodMatch: 'grateful',
    moodLabel: 'Grateful 🐶',
    cookTime: '15 mins',
    comfortLevel: 'Gentle Warm Hug 🧸',
    secretIngredients: ['Small Shell Macaroni 🐚', 'Mild Vermont White Cheddar 🧀'],
    pairingMovie: 'Paddington (2014)',
    pairingQuote: '"If we are kind and polite, the world will be right."',
    accentColor: '#FBBF24'
  },

  // Scale 9: Confident 👑
  confident: {
    id: 'royal_saffron_gouda',
    name: 'Royal Saffron Smoked Gouda Macaroni',
    emoji: '👑',
    scaleNumber: 9,
    tagline: 'Fit for royalty — lavish saffron cream with caramelized shallots.',
    description: 'Artisanal macaroni bathed in a luxurious saffron-infused smoked gouda and cream reduction, topped with caramelized shallots and golden herbs.',
    moodMatch: 'confident',
    moodLabel: 'Confident 👑',
    cookTime: '18 mins',
    comfortLevel: 'Absolute Royalty 👑',
    secretIngredients: [
      'Bronze-Cut Maccheroni 🍝',
      'Kashmiri Saffron Strands 🌸',
      'Smoked Aged Gouda 🧀',
      'Slow-Caramelized Golden Shallots 🧅',
      'Toasted Pine Nuts & Herbs 🌿'
    ],
    pairingMovie: 'Bajirao Mastani & Yeh Jawaani Hai Deewani',
    pairingQuote: '"Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon... bas rukna nahi chahta!"',
    accentColor: '#D946EF'
  },
  queen: {
    id: 'royal_saffron_gouda',
    name: 'Royal Saffron Smoked Gouda Macaroni',
    emoji: '👑',
    scaleNumber: 9,
    tagline: 'Fit for royalty — lavish saffron cream with caramelized shallots.',
    description: 'Artisanal macaroni bathed in a luxurious saffron-infused smoked gouda and cream reduction, topped with caramelized shallots.',
    moodMatch: 'confident',
    moodLabel: 'Confident 👑',
    cookTime: '18 mins',
    comfortLevel: 'Absolute Royalty 👑',
    secretIngredients: ['Bronze-Cut Maccheroni 🍝', 'Kashmiri Saffron Strands 🌸'],
    pairingMovie: 'Yeh Jawaani Hai Deewani',
    pairingQuote: '"Main apni favourite hoon!"',
    accentColor: '#D946EF'
  }
};
