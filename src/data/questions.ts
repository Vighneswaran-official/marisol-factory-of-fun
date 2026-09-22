import type { Question } from '../types/game';

export const QUESTIONS_DATABASE: Question[] = [
  // ================= MOVIES & TV SHOWS (HOLLYWOOD / GENERAL) =================
  {
    id: 'mov_01',
    category: 'Movies',
    subcategory: 'Sci-Fi Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Nolan\'s "Inception" (2010), what object does Cobb spin to check if he is still dreaming?',
    options: ['A brass spinning top', 'A silver coin', 'A wooden die', 'A vintage watch'],
    correctAnswer: 'A brass spinning top',
    explanation: 'Cobb uses his late wife Mal\'s totem—a brass spinning top—which spins indefinitely inside a dream.',
    funFact: 'Christopher Nolan wrote the script for Inception over a period of almost 10 years!',
    verifiedSource: 'Warner Bros. Official Archive',
    tags: ['Christopher Nolan', 'Inception', 'Sci-Fi']
  },
  {
    id: 'mov_02',
    category: 'Movies',
    subcategory: 'Animation',
    difficulty: 'easy',
    type: 'guess_movie',
    question: 'Which Pixar film features a tiny rat named Remy who dreams of becoming a master Paris chef?',
    options: ['Ratatouille', 'Wall-E', 'Up', 'Finding Nemo'],
    correctAnswer: 'Ratatouille',
    explanation: 'Remy pairs up with Auguste Gusteau\'s kitchen worker Linguini to create culinary masterpieces.',
    funFact: 'Pixar animators created over 270 pieces of detailed virtual food models for the film!',
    tags: ['Pixar', 'Ratatouille', 'Animation']
  },
  {
    id: 'mov_03',
    category: 'Movies',
    subcategory: 'Superhero',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What is the fictional African nation ruled by King T\'Challa in Marvel\'s "Black Panther"?',
    options: ['Wakanda', 'Zamunda', 'El Dorado', 'Sokovia'],
    correctAnswer: 'Wakanda',
    explanation: 'Wakanda is an advanced African nation hidden behind a cloak of technology powered by Vibranium.',
    funFact: 'The Wakandan alphabet was based on ancient African scripts including Nsibidi.',
    tags: ['Marvel', 'Black Panther', 'MCU']
  },
  {
    id: 'mov_04',
    category: 'Movies',
    subcategory: 'Classics',
    difficulty: 'hard',
    type: 'movie_detective',
    question: 'Solve the Movie Detective Mystery!',
    clues: [
      'Clue 1: Released in 1994 and based on a Stephen King novella.',
      'Clue 2: Stars Tim Robbins and Morgan Freeman.',
      'Clue 3: Features a legendary break out of prison involving a Rita Hayworth poster.'
    ],
    options: ['The Shawshank Redemption', 'The Green Mile', 'Pulp Fiction', 'Forrest Gump'],
    correctAnswer: 'The Shawshank Redemption',
    explanation: 'Andy Dufresne escapes Shawshank Prison by tunneling through the wall over two decades.',
    funFact: 'Morgan Freeman\'s character Red was named after being red-headed in the original book!',
    tags: ['Shawshank', 'Stephen King', 'Detective']
  },
  {
    id: 'mov_05',
    category: 'TV Shows',
    subcategory: 'Drama',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In "Breaking Bad", what alias does chemistry teacher Walter White adopt in the criminal underworld?',
    options: ['Heisenberg', 'Schrödinger', 'Oppenheimer', 'Einstein'],
    correctAnswer: 'Heisenberg',
    explanation: 'Walter White named his alter ego after Werner Heisenberg, the famous theoretical physicist.',
    funFact: 'Bryan Cranston actually learned how to synthesize real chemicals for authenticity in key scene props!',
    tags: ['Breaking Bad', 'TV', 'Drama']
  },
  {
    id: 'mov_06',
    category: 'TV Shows',
    subcategory: 'Sitcoms',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'On "Friends", what is the name of the iconic coffee shop where the six main characters gather?',
    options: ['Central Perk', 'Monk\'s Diner', 'Luke\'s Diner', 'MacLaren\'s Pub'],
    correctAnswer: 'Central Perk',
    explanation: 'Central Perk was managed by Gunther and was the main social hub throughout all 10 seasons.',
    funFact: 'The orange couch in Central Perk was actually found in the basement of the Warner Bros. studio!',
    tags: ['Friends', 'Sitcom', 'TV']
  },

  // ================= BOLLYWOOD & INDIAN CINEMA =================
  {
    id: 'bol_01',
    category: 'Bollywood',
    subcategory: 'Iconic Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which legendary 1995 Bollywood blockbuster featured the romantic lead duo Raj (SRK) and Simran (Kajol)?',
    options: ['Dilwale Dulhania Le Jayenge', 'Kuch Kuch Hota Hai', 'Kabhi Khushi Kabhie Gham', 'Dil To Pagal Hai'],
    correctAnswer: 'Dilwale Dulhania Le Jayenge',
    explanation: 'DDLJ is the longest-running film in Indian cinema history, playing continuously at Mumbai\'s Maratha Mandir theater.',
    funFact: 'DDLJ has played at Maratha Mandir theater for over 25 consecutive years (1,200+ weeks)!',
    tags: ['SRK', 'Kajol', 'DDLJ', 'Bollywood']
  },
  {
    id: 'bol_02',
    category: 'Bollywood',
    subcategory: 'Oscar Nominees',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which 2001 Aamir Khan starrer was nominated for the Academy Award for Best Foreign Language Film?',
    options: ['Lagaan', 'Taare Zameen Par', '3 Idiots', 'Dangal'],
    correctAnswer: 'Lagaan',
    explanation: 'Lagaan told the story of villagers in Victorian India who challenged British officers to a cricket match to avoid taxes.',
    funFact: 'Lagaan was the third Indian film nominated for the Best Foreign Language Film Oscar, after Mother India (1957) and Salaam Bombay! (1988).',
    tags: ['Aamir Khan', 'Lagaan', 'Oscars']
  },
  {
    id: 'bol_03',
    category: 'Bollywood',
    subcategory: 'Music & Dance',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The timeless song "Chaiyya Chaiyya" featuring Shah Rukh Khan was filmed on top of what moving vehicle?',
    options: ['A passenger train', 'A double-decker bus', 'A steam boat', 'A festival chariot'],
    correctAnswer: 'A passenger train',
    explanation: 'Composed by A.R. Rahman, "Chaiyya Chaiyya" from Dil Se (1998) was filmed on top of the Ooty steam train without any safety nets!',
    funFact: 'Chaiyya Chaiyya was filmed over 4 days on top of the Nilgiri Mountain Railway train!',
    tags: ['AR Rahman', 'SRK', 'Dil Se', 'Chaiyya Chaiyya']
  },
  {
    id: 'bol_04',
    category: 'Bollywood',
    subcategory: 'Global Phenomena',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which song composed by M.M. Keeravani won the Oscar for Best Original Song in 2023 for the movie RRR?',
    options: ['Naatu Naatu', 'Jai Ho', 'Chogada', 'Malhari'],
    correctAnswer: 'Naatu Naatu',
    explanation: 'Naatu Naatu became the first song from an Indian film to win an Academy Award for Best Original Song.',
    funFact: 'The high-speed dance sequence for Naatu Naatu was filmed outside Mariinsky Palace in Kyiv, Ukraine!',
    tags: ['RRR', 'Naatu Naatu', 'Oscars', 'Indian Cinema']
  },
  {
    id: 'bol_05',
    category: 'Bollywood',
    subcategory: 'Comedy Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In the hilarious classic "Hera Pheri", what is the name of Paresh Rawal\'s legendary landlord character?',
    options: ['Baburao Ganpatrao Apte', 'Crime Master Gogo', 'Majnu Bhai', 'Kachra Seth'],
    correctAnswer: 'Baburao Ganpatrao Apte',
    explanation: 'Babu Bhaiya (Baburao Ganpatrao Apte) remains one of the most beloved comedic characters in Indian pop culture.',
    funFact: 'Paresh Rawal won multiple comedy awards for his performance as Babu Bhaiya!',
    tags: ['Hera Pheri', 'Babu Bhaiya', 'Comedy']
  },

  // ================= POP CULTURE & MUSIC =================
  {
    id: 'pop_01',
    category: 'Pop Culture',
    subcategory: 'Superstars',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which global pop superstar named her concert tour "The Eras Tour", becoming the highest-grossing tour in history?',
    options: ['Taylor Swift', 'Beyoncé', 'Lady Gaga', 'Ariana Grande'],
    correctAnswer: 'Taylor Swift',
    explanation: 'The Eras Tour celebrated all 10 of Taylor Swift\'s studio albums, performing across 5 continents.',
    funFact: 'The Eras Tour generated seismic activity in Seattle equivalent to a 2.3 magnitude earthquake!',
    tags: ['Taylor Swift', 'Pop Culture', 'Music']
  },
  {
    id: 'pop_02',
    category: 'Music',
    subcategory: '80s Synth Legends',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which 1982 album by Michael Jackson holds the record as the best-selling album of all time worldwide?',
    options: ['Thriller', 'Bad', 'Off the Wall', 'Dangerous'],
    correctAnswer: 'Thriller',
    explanation: 'Produced by Quincy Jones, "Thriller" won a record 8 Grammy Awards in a single night in 1984.',
    funFact: 'The famous spoken-word monologue in Thriller was recorded by legendary horror actor Vincent Price in just two takes!',
    tags: ['Michael Jackson', '80s Music', 'Thriller']
  },

  // ================= SCIENCE & WEIRD FACTS =================
  {
    id: 'sci_01',
    category: 'Science',
    subcategory: 'Biology',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What organ in the human body consumes nearly 20% of the body\'s total energy despite being 2% of total weight?',
    options: ['The Brain', 'The Heart', 'The Liver', 'The Lungs'],
    correctAnswer: 'The Brain',
    explanation: 'The human brain requires continuous glucose and oxygen to power billions of neuronal electrical signals.',
    funFact: 'Your brain generates about 20 watts of electrical power—enough to power a small LED light bulb!',
    tags: ['Brain', 'Biology', 'Science']
  },
  {
    id: 'sci_02',
    category: 'Space',
    subcategory: 'Solar System',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which planet in our solar system has the most extensive and famous ring system visible from Earth?',
    options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'],
    correctAnswer: 'Saturn',
    explanation: 'Saturn\'s ring system is made up of billions of chunks of ice, rock, and dust ranging from tiny grains to house-sized boulders.',
    funFact: 'Saturn\'s rings are extremely thin—mostly only about 30 feet (10 meters) thick!',
    tags: ['Space', 'Saturn', 'Astronomy']
  },
  {
    id: 'wrd_01',
    category: 'Weird Facts',
    subcategory: 'Nature Curiosities',
    difficulty: 'medium',
    type: 'fact_or_fiction',
    question: 'Fact or Fiction: Bananas are technically classified as berries, but strawberries are not!',
    options: ['Fact', 'Fiction'],
    correctAnswer: 'Fact',
    explanation: 'Botanically speaking, a berry must have seeds inside the fleshy fruit. Bananas fit this definition, while strawberries have seeds on the outside!',
    funFact: 'Avocados, watermelons, and tomatoes are also botanically classified as berries!',
    tags: ['Weird Facts', 'Botany', 'Nature']
  },
  {
    id: 'wrd_02',
    category: 'Weird Facts',
    subcategory: 'Animal Facts',
    difficulty: 'hard',
    type: 'marisol_mystery',
    question: 'Marisol\'s Mystery Animal!',
    clues: [
      'Clue 1: It has blue blood, 3 hearts, and 8 arms.',
      'Clue 2: It can camouflage its skin color and texture in less than 200 milliseconds.',
      'Clue 3: It has no bones and can squeeze through any opening larger than its beak.'
    ],
    options: ['Octopus', 'Squid', 'Jellyfish', 'Chameleon'],
    correctAnswer: 'Octopus',
    explanation: 'Octopuses are incredibly intelligent sea creatures with copper-based copper-rich blue blood (hemocyanin) and 3 hearts!',
    funFact: 'Two-thirds of an octopus\'s neurons are located in its arms, meaning its arms can literally think for themselves!',
    tags: ['Octopus', 'Marine Biology', 'Mystery']
  },

  // Additional Movie / Bollywood / Science / Geography Questions
  {
    id: 'mov_07',
    category: 'Movies',
    subcategory: 'Directors',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which director helmed the groundbreaking sci-fi masterpiece "Interstellar" (2014)?',
    options: ['Christopher Nolan', 'Steven Spielberg', 'Denis Villeneuve', 'James Cameron'],
    correctAnswer: 'Christopher Nolan',
    explanation: 'Nolan collaborated with Nobel laureate physicist Kip Thorne to accurately portray black holes and relativity.',
    funFact: 'The black hole visual effects code written for Interstellar led to new scientific discoveries about gravitational lensing!',
    tags: ['Nolan', 'Interstellar', 'Sci-Fi']
  },
  {
    id: 'bol_06',
    category: 'Bollywood',
    subcategory: 'Blockbusters',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In Rajkumar Hirani\'s "3 Idiots", what is Rancho\'s real name revealed at the end of the movie?',
    options: ['Phunsukh Wangdu', 'Ranchhoddas Shamaldas Chanchad', 'Farhan Qureshi', 'Raju Rastogi'],
    correctAnswer: 'Phunsukh Wangdu',
    explanation: 'Rancho was actually Phunsukh Wangdu, a genius inventor holding 400 patents in Ladakh.',
    funFact: '3 Idiots inspired real-life educational reform in India and became a massive cultural hit in China and Japan!',
    tags: ['3 Idiots', 'Aamir Khan', 'Bollywood']
  },
  {
    id: 'geo_01',
    category: 'Geography',
    subcategory: 'Wonders',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In which Indian city is the majestic white marble mausoleum Taj Mahal located?',
    options: ['Agra', 'Jaipur', 'Delhi', 'Varanasi'],
    correctAnswer: 'Agra',
    explanation: 'Built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, it is one of the New 7 Wonders of the World.',
    funFact: 'The Taj Mahal\'s color appears to change depending on the time of day—pinkish in the morning, milky white in evening!',
    tags: ['Taj Mahal', 'Agra', 'Geography', 'India']
  },

  // ================= CULINARY CINEMA & FOOD TRIVIA =================
  {
    id: 'food_01',
    category: 'Food & Cooking',
    subcategory: 'Cinema Delicacies',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Jon Favreau\'s film "Chef" (2014), what signature sandwich does Carl Casper grill to golden perfection in his food truck?',
    options: ['A Cuban Sandwich (Cubano)', 'A Philly Cheesesteak', 'A French Dip Baguette', 'A New York Reuben'],
    correctAnswer: 'A Cuban Sandwich (Cubano)',
    explanation: 'Carl Casper serves pressed Cubanos loaded with slow-roasted pork, ham, Swiss cheese, pickles, and mustard sizzling in butter.',
    funFact: 'Jon Favreau trained under master food truck pioneer Chef Roy Choi for months to learn authentic kitchen knife skills!',
    tags: ['Chef', 'Cubano', 'Sandwich', 'Movie Food'],
    secretIngredient: 'Truffle Infused Garlic Butter 🧈'
  },
  {
    id: 'food_02',
    category: 'Food & Cooking',
    subcategory: 'Classic High Tea',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What is the secret to keeping traditional British-Indian cucumber tea sandwiches crisp instead of soggy?',
    options: [
      'Salting sliced cucumbers and patting them dry before layering with butter',
      'Freezing the bread slices before assembly',
      'Using hot toasted bread straight from the toaster',
      'Drenching the cucumber in olive oil'
    ],
    correctAnswer: 'Salting sliced cucumbers and patting them dry before layering with butter',
    explanation: 'Salting draws out excess water from cucumber ribbons, and a light butter barrier stops moisture from softening the soft brioche.',
    funFact: 'Cucumber sandwiches were created during the Victorian era as a light luxury afternoon snack for British royalty!',
    tags: ['Cucumber Sandwich', 'High Tea', 'Technique'],
    secretIngredient: 'English Cucumber Ribbons 🥒'
  },
  {
    id: 'food_03',
    category: 'Food & Cooking',
    subcategory: 'Bollywood Street Flavors',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In the movie "Jab We Met", Geet and Aditya sip hot railway tea in the pouring rain. What spice duo gives highway tapri chai its soul?',
    options: ['Fresh Crushed Ginger & Green Cardamom', 'Vanilla & Cinnamon', 'Clove & Star Anise', 'Nutmeg & Black Pepper'],
    correctAnswer: 'Fresh Crushed Ginger & Green Cardamom',
    explanation: 'Crushed "adrak" (ginger) and "elaichi" (green cardamom) boiled with strong Assam tea creates the classic highway tapri flavor.',
    funFact: 'Over 837,000 tonnes of tea are consumed in India every single year—making chai an emotion rather than just a beverage!',
    tags: ['Chai', 'Bollywood', 'Comfort Food'],
    secretIngredient: 'Crushed Green Cardamom Pods 💚'
  },
  {
    id: 'food_04',
    category: 'Food & Cooking',
    subcategory: 'Animation Feasts',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In Pixar\'s "Ratatouille", what dish does Remy serve that transports harsh food critic Anton Ego back to his childhood home?',
    options: ['Confit Byaldi (Artisanal Ratatouille)', 'Coq au Vin', 'Beef Bourguignon', 'Lobster Thermidor'],
    correctAnswer: 'Confit Byaldi (Artisanal Ratatouille)',
    explanation: 'Remy layers paper-thin zucchini, yellow squash, and eggplant over a savory pepper piperade, creating Thomas Keller\'s Confit Byaldi.',
    funFact: 'World-renowned Chef Thomas Keller designed the exact recipe seen on screen for the Pixar animators!',
    tags: ['Ratatouille', 'Pixar', 'French Cuisine'],
    secretIngredient: 'Mandoline Ribbon Zucchini 🥒'
  },
  {
    id: 'food_05',
    category: 'Food & Cooking',
    subcategory: 'Midnight Craving',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What gives authentic Mumbai Street Cheese Frankies their distinct tangy punch that keeps dreamers awake at midnight?',
    options: [
      'A dusting of tangy Frankie Masala & vinegar pickled onions',
      'Sweet strawberry ketchup',
      'Heavy mayonnaise & wasabi',
      'Plain sea salt and black pepper'
    ],
    correctAnswer: 'A dusting of tangy Frankie Masala & vinegar pickled onions',
    explanation: 'Frankie masala combines chaat masala, amchur (dry mango), black salt, and chili, paired with onions steeped in white vinegar.',
    funFact: 'The Frankie was invented in Mumbai in 1969 by Amarjit Singh Tibb, inspired by Lebanese pita wraps in Beirut!',
    tags: ['Frankie', 'Street Food', 'Mumbai'],
    secretIngredient: 'Tangy Mumbai Frankie Masala ✨'
  },
  {
    id: 'food_06',
    category: 'Food & Cooking',
    subcategory: 'Kitchen Secrets',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Why do French master chefs finish a pan sauce by swirling in cold cubes of butter right at the end ("monter au beurre")?',
    options: [
      'To emulsify the sauce into a glossy, velvety consistency without breaking it',
      'To make the sauce turn completely solid like frosting',
      'To cool down the pan so it stops cooking',
      'To remove all salt from the sauce'
    ],
    correctAnswer: 'To emulsify the sauce into a glossy, velvety consistency without breaking it',
    explanation: 'Cold butter incorporates slowly into hot liquid, creating a silky glossy emulsion that coats the back of a spoon.',
    funFact: 'Julia Child famously kept over 50 pounds of butter in her home kitchen at any given time!',
    tags: ['French Technique', 'Sauces', 'Chef Skills'],
    secretIngredient: 'Whipped Herbed Mascarpone 🌿'
  },
  {
    id: 'food_07',
    category: 'Food & Cooking',
    subcategory: 'Cinema Cult Classics',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In Quentin Tarantino\'s "Pulp Fiction", Jules Winnfield famously takes a bite of Brett\'s burger and praises which Hawaiian fast-food joint?',
    options: ['Big Kahuna Burger', 'In-N-Out', 'Five Guys', 'Aloha King'],
    correctAnswer: 'Big Kahuna Burger',
    explanation: '"Mmm-mm! That IS a tasty burger!" Big Kahuna Burger is Tarantino\'s famous recurring fictional Hawaiian fast-food chain.',
    funFact: 'Big Kahuna Burger also appears in Reservoir Dogs, From Dusk Till Dawn, and Four Rooms!',
    tags: ['Pulp Fiction', 'Tarantino', 'Burger'],
    secretIngredient: 'Melted Gruyere & Sharp Cheddar 🧀'
  },
  {
    id: 'food_08',
    category: 'Food & Cooking',
    subcategory: 'Pasta & Pizza Craft',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'In "Eat Pray Love", Julia Roberts falls in love with pizza in Naples. What gives authentic Neapolitan pizza its blistered charred spots ("leopard spotting")?',
    options: [
      'A 900°F (485°C) wood-fired stone oven baking the dough in 60-90 seconds',
      'Brushing the crust with black food coloring',
      'Toasting the crust with a propane blowtorch',
      'Deep frying the dough in peanut oil before baking'
    ],
    correctAnswer: 'A 900°F (485°C) wood-fired stone oven baking the dough in 60-90 seconds',
    explanation: 'The extreme heat causes moisture bubbles in the dough to expand and blister against the oven ceiling within 90 seconds.',
    funFact: 'The art of Neapolitan pizza making ("Pizzaiuolo") is recognized by UNESCO as Intangible World Cultural Heritage!',
    tags: ['Pizza', 'Naples', 'Eat Pray Love'],
    secretIngredient: 'Whole Fresh Burrata Ball 🧀'
  },
  {
    id: 'food_09',
    category: 'Food & Cooking',
    subcategory: 'Spice Alchemy',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'In "The Hundred-Foot Journey", young chef Hassan impresses a Michelin-starred kitchen by adding what secret Indian twist to a classic French omelette?',
    options: [
      'Finely minced green chilies, fresh coriander, and toasted cumin',
      'Saffron syrup and crushed almonds',
      'Sweet mango chutney and curd',
      'Ground cinnamon and brown sugar'
    ],
    correctAnswer: 'Finely minced green chilies, fresh coriander, and toasted cumin',
    explanation: 'Hassan folds fresh aromatic green chilies and coriander into the silky French butter omelette, blowing away Chef Madame Mallory.',
    funFact: 'The movie was produced by Steven Spielberg and Oprah Winfrey, both self-proclaimed hardcore food lovers!',
    tags: ['The Hundred-Foot Journey', 'Omelette', 'Fusion'],
    secretIngredient: 'Spicy Mint & Coriander Chutney 🌱'
  },
  {
    id: 'food_10',
    category: 'Food & Cooking',
    subcategory: 'Noodle Nirvana',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What iconic technique creates the irresistible aromatic sizzle in Chinese "You Po Mian" (Hot Oil Splash Noodles)?',
    options: [
      'Pouring smoking hot peanut oil directly over raw minced garlic and chili flakes atop the noodles',
      'Boiling noodles in chili water for 3 hours',
      'Baking the bowl of noodles in an oven',
      'Stir-frying noodles without any sauce'
    ],
    correctAnswer: 'Pouring smoking hot peanut oil directly over raw minced garlic and chili flakes atop the noodles',
    explanation: 'The superheated oil instantly flashes and toasts the raw garlic and chili, releasing deeply fragrant aromatics without burning.',
    funFact: 'Lao Gan Ma chili crisp was invented by a grandmother in Guizhou who originally gave it away free to truck drivers!',
    tags: ['Chili Oil', 'Noodles', 'Asian Cuisine'],
    secretIngredient: 'Crispy Fried Garlic Flakes 🧄'
  },
  {
    id: 'food_11',
    category: 'Food & Cooking',
    subcategory: 'Soulful Simmers',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'In the critically acclaimed film "The Lunchbox" (2013), what traditional smoky technique gives royal Dal Makhani its dhabba-style aroma?',
    options: [
      'The "Dhungar" method: dropping red-hot charcoal with ghee into the pot and sealing the lid',
      'Adding bottled liquid smoke drops',
      'Burning the bottom layer of the lentils',
      'Roasting the whole pot over an open campfire'
    ],
    correctAnswer: 'The "Dhungar" method: dropping red-hot charcoal with ghee into the pot and sealing the lid',
    explanation: 'A glowing piece of charcoal placed in a small steel bowl is topped with ghee and covered, perfuming the buttery dal with royal smoke.',
    funFact: 'The dabbawalas of Mumbai deliver over 200,000 lunchboxes every day with an astounding Six Sigma accuracy rating of 99.9999%!',
    tags: ['The Lunchbox', 'Dal Makhani', 'Indian Cooking'],
    secretIngredient: 'Black Urad Lentils & Rajma 🫘'
  },
  {
    id: 'food_12',
    category: 'Food & Cooking',
    subcategory: 'Dessert Magic',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'In "Julie & Julia", what famous dessert rule does Julia Child proclaim with joyful gusto?',
    options: [
      '"You can never have too much butter!"',
      '"Dessert should always be eaten before dinner!"',
      '"Never put chocolate in a dessert!"',
      '"Sugar is completely overrated!"'
    ],
    correctAnswer: '"You can never have too much butter!"',
    explanation: 'Julia Child celebrated rich, authentic French baking, demonstrating that real butter and honest technique create pure bliss.',
    funFact: 'Julia Child didn\'t learn how to cook until she was in her late 30s when she moved to Paris with her husband Paul!',
    tags: ['Julie & Julia', 'Butter', 'French Baking'],
    secretIngredient: 'Buttery All-Butter Croissants 🥐'
  }
];

