import type { Recipe } from '../types/game';

export const RECIPES: Recipe[] = [
  {
    id: 'cucumber_mint_sandwich',
    title: 'Royal Cucumber & Herbed Mascarpone Tea Sandwiches',
    subtitle: 'Crisp, velvety, and delicately spiced British-Indian afternoon tea classic',
    cuisine: 'Modern British-Indian Gourmet',
    prepTime: '15 mins',
    difficulty: 'Easy & Elegant',
    emoji: '🥪',
    accentColor: '#10B981',
    moodMatch: 'brighter_ideas',
    secretIngredients: [
      'English Cucumber Ribbons 🥒',
      'Whipped Herbed Mascarpone 🌿',
      'Spicy Mint & Coriander Chutney 🌱',
      'Zesty Lemon Pepper 🍋',
      'Soft Brioche Slices 🍞'
    ],
    fullIngredients: [
      '2 crisp English cucumbers, mandoline-sliced into paper-thin ribbons',
      '150g mascarpone or cream cheese, brought to room temperature',
      '8 slices ultra-soft artisanal brioche or milk bread',
      '2 tbsp homemade spicy mint-coriander chutney',
      '1 tbsp finely chopped fresh dill and chives',
      '1/2 tsp freshly cracked black pepper & pink Himalayan salt',
      '1 tsp zest from a fresh organic lemon',
      'Salted butter for spreading'
    ],
    instructions: [
      'Gently toss cucumber ribbons with a pinch of sea salt, let drain on paper towels for 5 minutes for that legendary crunch.',
      'In a bowl, whip the mascarpone with chopped fresh dill, chives, lemon zest, and cracked pepper until light and velvety.',
      'Spread a paper-thin layer of salted butter on all bread slices to keep the crumb pristine.',
      'Layer a vibrant swirl of mint chutney on one slice, and a generous cloud of herbed mascarpone on the other.',
      'Shingle the cucumber ribbons in 4 tight, overlapping folds across the bread.',
      'Trim the crusts with a sharp bread knife, slice diagonally into elegant tea triangles, and serve chilled!'
    ],
    moviePairing: {
      movie: 'The Grand Budapest Hotel (2014)',
      quote: '"Rudeness is merely the expression of fear. People want to be loved!"',
      whyWatch: 'Wes Anderson\'s candy-colored aesthetic pairs delightfully with these pastel perfection sandwiches.'
    },
    hungerTrigger: 'Cool, crisp cucumber ribbons meeting rich creamy mascarpone and sharp mint chutney. The ultimate high-tea brain fuel!'
  },
  {
    id: 'bollywood_masala_chai',
    title: 'Highway Tapri Smoked Masala Chai & Onion Bhajiyas',
    subtitle: 'The soulful ginger-cardamom brew with golden, crispy onion fritters',
    cuisine: 'Indian Street Comfort',
    prepTime: '20 mins',
    difficulty: 'Pure Comfort',
    emoji: '☕',
    accentColor: '#F97316',
    moodMatch: 'chai_happiness',
    secretIngredients: [
      'Crushed Green Cardamom Pods 💚',
      'Smoked Fresh Ginger 🫚',
      'Strong Assam CTC Tea 🍃',
      'Velvety Buffalo Milk 🥛',
      'Caramelized Jaggery 🍯'
    ],
    fullIngredients: [
      '2 cups water & 2 cups full-fat milk',
      '3 tsp strong Assam CTC black tea leaves',
      '2 inches fresh ginger, crushed roughly with skin on',
      '5 green cardamom pods, freshly bruised in a mortar',
      '2 cloves & 1 tiny stick Ceylon cinnamon',
      '2 tbsp jaggery or raw brown sugar',
      'For Bhajiyas: 2 large sliced red onions, besan, carom seeds (ajwain), and green chilies'
    ],
    instructions: [
      'Bring water, crushed ginger, cardamom, cloves, and cinnamon to a rolling boil until the water turns golden and aromatic.',
      'Tumble in the Assam tea leaves and simmer for 2 minutes to extract the deep maltiness.',
      'Pour in the milk and bring to 3 consecutive frothy rises ("3 Ubaals" like the iconic highway tapris!).',
      'Stir in the jaggery at the very end on low heat to avoid curdling, then strain through a fine mesh into piping hot clay kulhads.',
      'Serve alongside crispy, piping-hot onion fritters with sweet date-tamarind dip.'
    ],
    moviePairing: {
      movie: 'Jab We Met (2007) & Dil Se (1998)',
      quote: '"Chai aur baarish — zindagi mein isse behtar aur kya ho sakta hai?!"',
      whyWatch: 'The railway station vibe, the pouring monsoon rain, and the timeless romance of a hot cup of highway chai.'
    },
    hungerTrigger: 'That soothing aroma of bruised ginger and cardamom rising in steam while hot fried bhajiyas crunch between your fingers.'
  },
  {
    id: 'truffle_cubano_sandwich',
    title: 'Chef Carl Casper\'s Toasted Truffle Cubano Sandwich',
    subtitle: 'The legendary grilled cheese sandwich pressed in sizzling butter till golden',
    cuisine: 'Miami Food Truck Soul',
    prepTime: '18 mins',
    difficulty: 'Flavor Explosion',
    emoji: '🥪',
    accentColor: '#EC4899',
    moodMatch: 'wink_conquer',
    secretIngredients: [
      'Truffle Infused Garlic Butter 🧈',
      'Melted Gruyere & Sharp Cheddar 🧀',
      'Slow-Braised Glazed Pulled Pork/Portobello 🥩',
      'Dill Pickle Spears 🥒',
      'Yellow Mustard on Crusty Baguette 🥖'
    ],
    fullIngredients: [
      '1 loaf crusty artisanal Cuban bread or French baguette, split lengthwise',
      '6 slices smoked ham or caramelized portobello mushrooms',
      '1 cup pulled roasted pork in citrus mojo sauce',
      '6 thick slices Swiss Gruyère & yellow cheddar',
      '8 thinly sliced dill pickle coins',
      '2 tbsp yellow ballpark mustard',
      '4 tbsp unsalted butter infused with 1/2 tsp black truffle oil'
    ],
    instructions: [
      'Generously butter the outside crusts of the split loaf with truffle butter.',
      'Slather yellow mustard inside, then shingle the layers: cheese, ham, pulled citrus pork, pickles, and more cheese on top.',
      'Heat a heavy cast-iron skillet over medium heat and melt a knob of butter.',
      'Place the sandwich in the skillet and press it down firmly with a second heavy cast-iron pan (or foil-wrapped brick!).',
      'Grill for 4-5 minutes per side until the crust turns mahogany gold and the cheese oozes out the sides like a molten waterfall.',
      'Slice diagonally on a cutting board — hear that magnificent crunch!'
    ],
    moviePairing: {
      movie: 'Chef (2014) directed by Jon Favreau',
      quote: '"I may not do everything great in my life, but I\'m good at this. I manage to touch people through food."',
      whyWatch: 'The soundtrack, the passion for cooking, and the legendary grilled cheese scene that made millions rush to their kitchens.'
    },
    hungerTrigger: 'Golden browned bread crackling under your knife, stringy cheese pulling apart, and savory pork juices mingling with tangy pickles.'
  },
  {
    id: 'ratatouille_byaldi',
    title: 'Remy\'s Confit Byaldi (Artisanal Ratatouille)',
    subtitle: 'Delicate spiraled summer squash, heirloom tomatoes, and bell pepper coulis',
    cuisine: 'French Fine Dining',
    prepTime: '45 mins',
    difficulty: 'Masterpiece',
    emoji: '🍆',
    accentColor: '#3B82F6',
    moodMatch: 'big_dreams',
    secretIngredients: [
      'Mandoline Ribbon Zucchini 🥒',
      'Slow-Roasted Pepper Piperade 🫑',
      'Garden Thyme Infused Olive Oil 🌿',
      'Heirloom Sun-Ripened Tomatoes 🍅',
      'Crushed Flaky Maldon Salt 🧂'
    ],
    fullIngredients: [
      '2 slender Japanese eggplants, 2 yellow squashes, 2 zucchini',
      '4 firm Roma or heirloom tomatoes',
      'For the Piperade Base: 2 roasted red bell peppers, 1 onion, 3 garlic cloves, olive oil, sprigs of thyme',
      'Balsamic reduction glaze for plating',
      'Fresh chives & microgreens'
    ],
    instructions: [
      'Puree roasted red peppers, sautéed onions, garlic, and fresh herbs into a velvet piperade sauce. Spread across the bottom of a wide baking dish.',
      'Thinly slice all vegetables to uniform 1/16-inch coins using a mandoline.',
      'Fan the vegetables in tight, alternating colorful shingle spirals (eggplant, zucchini, tomato, yellow squash) until the pan is full.',
      'Drizzle with thyme-scented garlic olive oil, season with sea salt and cracked pepper.',
      'Cover with parchment paper cut to fit inside the rim and bake at 300°F (150°C) for 60 minutes until meltingly tender.',
      'Uncover, broil for 3 minutes for delicate roasted edges, and serve topped with a glossy ring of balsamic reduction.'
    ],
    moviePairing: {
      movie: 'Ratatouille (2007) by Pixar',
      quote: '"In many ways, the work of a critic is easy. We risk very little, yet enjoy a position over those who offer their work to our judgment."',
      whyWatch: 'Anton Ego dropping his pen in transport back to his childhood home with one bite of food is pure cinematic poetry.'
    },
    hungerTrigger: 'Sweet caramelized summer vegetables so tender they melt on your tongue with herbal olive oil sweetness.'
  },
  {
    id: 'mumbai_cheese_frankie',
    title: 'Midnight Mumbai Street Cheese Burst Frankie',
    subtitle: 'Warm flaky paratha roll packed with spiced aloo, raw onions, and an avalanche of Amul cheese',
    cuisine: 'Mumbai Street Food Legend',
    prepTime: '20 mins',
    difficulty: 'Street Food Star',
    emoji: '🌯',
    accentColor: '#6366F1',
    moodMatch: 'overthinking',
    secretIngredients: [
      'Tangy Mumbai Frankie Masala ✨',
      'Spiced Crisp Aloo Cutlet 🥔',
      'Grated Amul Cheese Avalanche 🧀',
      'Crunchy Vinegar Pickled Onions 🧅',
      'Flaky Tawa-Toasted Paratha 🫓'
    ],
    fullIngredients: [
      '4 flaky multi-layered parathas or soft wheat rotis',
      '3 large boiled potatoes mashed with turmeric, chili, garam masala, and amchur',
      '1 cup finely grated Amul processed cheese',
      '1 large onion, sliced into rings and steeped in white vinegar with green chilies',
      'Special Frankie Masala (chaat masala, dry mango powder, black salt, cumin, chili)',
      'Green spicy mint chutney and sweet tamarind sauce'
    ],
    instructions: [
      'Shape spiced potato mash into long cylindrical cutlets and shallow fry in butter till deep golden and crunchy.',
      'Toast the paratha on a smoking hot tawa with a generous brush of ghee.',
      'Drizzle spicy green chutney and tangy tamarind chutney down the center of the warm paratha.',
      'Place the hot crispy potato roll right in the middle.',
      'Blanket generously with vinegar pickled onions and a snowstorm of grated cheese.',
      'Dust with the signature spicy frankie masala, roll tightly in parchment paper, and devour while sizzling hot!'
    ],
    moviePairing: {
      movie: 'Wake Up Sid (2009) & Gully Boy (2019)',
      quote: '"Mumbai ki khushboo mein street food ka nasha hai!"',
      whyWatch: 'Nothing captures the spirit of late-night Mumbai like grabbing rolls with friends after a long day of chasing dreams.'
    },
    hungerTrigger: 'Biting into a warm, buttery paratha that yields to crisp spicy potato and a molten burst of sharp salty cheese.'
  },
  {
    id: 'silly_cheesy_loaded_nachos',
    title: 'Silly Vibe Triple-Cheese Overload Nachos',
    subtitle: 'Crispy stone-ground chips under a blanket of queso, smoky black beans, and lime crema',
    cuisine: 'Late Night Tex-Mex',
    prepTime: '15 mins',
    difficulty: 'Party Fuel',
    emoji: '🧀',
    accentColor: '#10B981',
    moodMatch: 'silly_vibe',
    secretIngredients: [
      'Stone-Ground Corn Triangles 🌽',
      'Molten Jalapeño Queso 🧀',
      'Pickled Lime Jalapeños 🫑',
      'Smoky Cumin Black Beans 🫘',
      'Cilantro Avocado Lime Crema 🥑'
    ],
    fullIngredients: [
      '1 large bag restaurant-style thick stone-ground corn tortilla chips',
      '2 cups shredded Monterey Jack & sharp orange cheddar',
      '1 cup warm queso dip made with green chilies',
      '1 can seasoned black beans, rinsed and warmed with cumin',
      'Fresh pico de gallo (diced tomatoes, white onion, jalapeño, lime juice, cilantro)',
      '1 Hass avocado mashed with lime, garlic, and sea salt'
    ],
    instructions: [
      'Spread chips in a wide single layer on a parchment-lined baking sheet (no naked chips allowed!).',
      'Scatter warm black beans, sliced jalapeños, and half the shredded cheeses.',
      'Add a second layer of chips, repeat the toppings, and pour molten queso over everything.',
      'Bake at 400°F (200°C) for 8 minutes until cheese is bubbly and edges are toasted.',
      'Top with cool pico de gallo, dollops of fresh guacamole, and zigzags of lime crema.',
      'Serve straight from the tray while everyone laughs and pulls cheese strings!'
    ],
    moviePairing: {
      movie: 'Deadpool & Wolverine (2024)',
      quote: '"Maximum effort... and maximum cheese!"',
      whyWatch: 'Irreverent, chaotic, hilarious fun that goes best with an enormous tray of finger food.'
    },
    hungerTrigger: 'That satisfying chip pull where a mountain of chips comes along connected by an 8-inch stretchy cheese bridge.'
  },
  {
    id: 'midnight_garlic_crunch_noodles',
    title: 'Midnight Chili Garlic Crunch Noodles',
    subtitle: 'Chewy hand-pulled wavy noodles drenched in sizzling scallion oil, garlic crisp, and dark soy',
    cuisine: 'Asian Street Soul',
    prepTime: '12 mins',
    difficulty: 'Instant Addiction',
    emoji: '🍜',
    accentColor: '#14B8A6',
    moodMatch: 'just_me',
    secretIngredients: [
      'Crispy Fried Garlic Flakes 🧄',
      'Szechuan Chili Crisp Oil 🌶️',
      'Mushroom Dark Soy Sauce 🥢',
      'Toasted White Sesame Seeds 🌰',
      'Spring Onions Sizzled in Hot Oil 🌿'
    ],
    fullIngredients: [
      '2 bundles wide knife-cut or ramen noodles',
      '6 cloves garlic, finely minced',
      '3 scallions, separated into white and green parts',
      '2 tbsp homemade or Lao Gan Ma chili crisp',
      '1.5 tbsp light soy sauce & 1 tsp dark soy sauce',
      '1 tsp Chinkiang black vinegar & 1/2 tsp sugar',
      '3 tbsp high-smoke peanut or sesame oil'
    ],
    instructions: [
      'Cook noodles in salted boiling water until al dente with that springy chew; drain and place in a heatproof bowl.',
      'Pile minced garlic, chili flakes, white scallions, and sesame seeds right on top of the warm noodles.',
      'Heat peanut oil in a small pan until shimmering and just smoking hot.',
      'Pour the smoking hot oil directly over the garlic mound — listen to that roaring sizzle release the garlic aromatics!',
      'Add soy sauces, black vinegar, and sugar, then toss vigorously until every noodle is glossy and red.',
      'Garnish with green scallions and crispy fried garlic chips, and slurp away unapologetically.'
    ],
    moviePairing: {
      movie: 'Spirited Away (2001) & Crazy Rich Asians (2018)',
      quote: '"Food tastes best when eaten under neon street lights with steam in your face."',
      whyWatch: 'Hayao Miyazaki\'s food animation is world-famous for making anyone drool within 10 seconds flat.'
    },
    hungerTrigger: 'Glossy noodles slicked with fiery red chili oil, crunchy bits of roasted garlic, and a savory vinegar kick.'
  },
  {
    id: 'naples_truffle_margherita',
    title: 'Eat-Pray-Love Naples Truffle Burrata Pizza',
    subtitle: 'Blistered leopard crust, San Marzano sweet sauce, and a whole creamy burrata ball in the center',
    cuisine: 'Neapolitan Perfection',
    prepTime: '25 mins',
    difficulty: 'Cheesy Romance',
    emoji: '🍕',
    accentColor: '#EF4444',
    moodMatch: 'bigger_adventures',
    secretIngredients: [
      'Whole Fresh Burrata Ball 🧀',
      'Sweet San Marzano Tomatoes 🍅',
      'Charred Leopard-Crust Dough 🌾',
      'Sweet Genovese Basil 🌿',
      'Aromatic Truffle Oil Drizzle ✨'
    ],
    fullIngredients: [
      '1 ball slow-fermented Neapolitan pizza dough',
      '1/2 cup crushed San Marzano D.O.P. canned tomatoes with sea salt',
      '1 ball fresh burrata cheese (drained gently)',
      '100g fresh fior di latte mozzarella',
      'A handful of fresh basil leaves',
      '2 tbsp extra virgin olive oil & 1 tsp black truffle oil'
    ],
    instructions: [
      'Preheat your pizza stone or cast-iron skillet to the absolute highest temperature your oven allows (550°F / 285°C).',
      'Stretch dough by hand from the center out, pushing air into the rim to create that puffy, airy crust.',
      'Ladle crushed tomatoes sparingly, scatter mozzarella pieces, and drizzle with olive oil.',
      'Bake for 6-8 minutes until the crust is puffed, blistered, and speckled with charred leopard spots.',
      'Take it out, tear the whole creamy burrata right into the hot center so its creamy stracciatella spills over the sauce.',
      'Scatter fresh basil and finish with a delicate swirl of truffle oil!'
    ],
    moviePairing: {
      movie: 'Eat Pray Love (2010)',
      quote: '"I am having a relationship with this pizza... almost an affair with it!"',
      whyWatch: 'Julia Roberts eating pizza at L\'Antica Pizzeria da Michele in Naples is one of the most iconic food scenes ever shot.'
    },
    hungerTrigger: 'Breaking open the creamy heart of the burrata over a hot, blistered crust smelling of woodsmoke and fresh basil.'
  },
  {
    id: 'croissant_caramel_pudding',
    title: 'Julie & Julia Salted Caramel Croissant Bread Pudding',
    subtitle: 'Flaky buttery croissants soaked in bourbon vanilla custard and baked until caramelized',
    cuisine: 'French Bistro Dessert',
    prepTime: '35 mins',
    difficulty: 'Sweet Euphoria',
    emoji: '🥐',
    accentColor: '#F472B6',
    moodMatch: 'happier_days',
    secretIngredients: [
      'Buttery All-Butter Croissants 🥐',
      'Madagascar Bourbon Vanilla 🍨',
      'Dark Salted Caramel Sauce 🍯',
      'Toasted Flaked Almonds 🌰',
      'Maldon Crunchy Sea Salt 🧂'
    ],
    fullIngredients: [
      '6 large stale or day-old all-butter bakery croissants, torn into chunks',
      '4 large free-range eggs & 2 egg yolks',
      '2 cups heavy cream & 1 cup whole milk',
      '3/4 cup brown sugar & 1 tbsp pure vanilla bean paste',
      '1/2 cup homemade salted caramel sauce',
      '1/4 cup toasted almond slivers',
      'Powdered sugar for dusting'
    ],
    instructions: [
      'Tear croissants into 2-inch chunks and scatter into a buttered baking dish, letting some pointy tips stick up for extra crunch.',
      'Whisk eggs, egg yolks, heavy cream, milk, brown sugar, and vanilla paste until velvety smooth.',
      'Pour custard all over the croissants, pressing gently with a spatula so every flaky fold drinks in the custard.',
      'Let sit for 15 minutes to absorb completely, then drizzle half the salted caramel across the top.',
      'Bake at 350°F (175°C) for 30 minutes until puffed, golden, and center is softly set like warm crème brûlée.',
      'Top with remaining warm caramel, toasted almonds, a touch of flaky salt, and serve with vanilla bean ice cream.'
    ],
    moviePairing: {
      movie: 'Julie & Julia (2009)',
      quote: '"You know what I love about cooking? Everything else is unpredictable, but here, if you add egg yolks to chocolate and sugar and milk, it gets thick!"',
      whyWatch: 'Meryl Streep and Amy Adams radiating pure kitchen bliss, butter obsession, and food joy.'
    },
    hungerTrigger: 'Crispy crunchy croissant edges on top, silky warm vanilla custard on the bottom, bathed in salty buttery caramel.'
  },
  {
    id: 'retro_80s_fudgy_sundae',
    title: 'Retro 80s Hot Fudge Espresso Brownie Sundae',
    subtitle: 'Dense fudgy cocoa brownie crowned with vanilla bean ice cream and hot espresso fudge',
    cuisine: 'American Retro Diner',
    prepTime: '20 mins',
    difficulty: 'Pure Nostalgia',
    emoji: '🍫',
    accentColor: '#8B5CF6',
    moodMatch: 'music_mood',
    secretIngredients: [
      'Dutch Dark Cocoa Brownie 🍫',
      'Hot Espresso Fudge Sauce ☕',
      'Tahitian Vanilla Ice Cream 🍦',
      'Torched Marshmallow Creme 🔥',
      'Salty Crushed Pretzels 🥨'
    ],
    fullIngredients: [
      '2 thick squares of warm homemade dark chocolate fudge brownies',
      '3 generous scoops of old-fashioned vanilla bean ice cream',
      '1/2 cup dark chocolate chips melted with 1 shot fresh espresso and 2 tbsp cream',
      '1/2 cup marshmallow fluff, lightly browned with a kitchen torch',
      'Crushed salted pretzels and Maraschino cherries with stems'
    ],
    instructions: [
      'Warm the fudgy brownie in the oven for 3 minutes until chocolate pockets turn molten.',
      'Place the warm brownie in a chilled glass sundae boat.',
      'Crown with tall, creamy scoops of vanilla bean ice cream.',
      'Drizzle the piping hot espresso fudge sauce down the scoops, watching it freeze slightly against the ice cream.',
      'Spoon torched marshmallow fluff on the side, shower with crushed pretzels for salty crunch, and crown with a glossy red cherry.'
    ],
    moviePairing: {
      movie: 'Back to the Future (1985) & Stranger Things',
      quote: '"Great Scott! This dessert has achieved maximum flavor density!"',
      whyWatch: 'Neon jukeboxes, synth grooves, roller skates, and the classic 80s soda fountain diner vibes.'
    },
    hungerTrigger: 'Hot bitter-sweet chocolate meeting freezing rich cream and salty crunch in a classic 80s diner glass.'
  },
  {
    id: 'grateful_dal_makhani',
    title: 'Slow-Simmered 24-Hour Velvet Dal Makhani',
    subtitle: 'Rich black lentils cooked with butter and cream over charcoal smoke',
    cuisine: 'Royal North Indian Classic',
    prepTime: '60 mins',
    difficulty: 'Culinary Meditation',
    emoji: '🍲',
    accentColor: '#8B5CF6',
    moodMatch: 'grateful_always',
    secretIngredients: [
      'Black Urad Lentils & Rajma 🫘',
      'White Cultured Makhan (Butter) 🧈',
      'Kashmiri Degi Mirch Oil 🌶️',
      'Crushed Sun-Dried Kasuri Methi 🍃',
      'Charcoal Dhungar Smoke 🪵'
    ],
    fullIngredients: [
      '1.5 cups whole black urad dal, soaked overnight and washed until clean water runs',
      '1/4 cup kidney beans (rajma)',
      '1 cup pure tomato puree',
      '6 tbsp white cultured butter (makhan)',
      '1/4 cup heavy cream',
      '1 tbsp ginger-garlic paste',
      '1.5 tsp Kashmiri chili powder, 1 tsp garam masala, kasuri methi rubbed between palms',
      '1 piece natural charcoal and 1 tsp ghee for smoking'
    ],
    instructions: [
      'Pressure cook black lentils and rajma with salt and water for 45 minutes until totally soft when mashed between fingers.',
      'In a thick-bottomed pot, cook tomato puree with ginger-garlic paste, butter, and Kashmiri chili until oil separates.',
      'Add the cooked dal with its liquid and gently simmer on the lowest heat for 45 minutes, stirring often so the lentils release their natural creaminess.',
      'Stir in the heavy cream and crushed kasuri methi, adjusting seasoning.',
      'Place a small steel bowl on top of the dal, drop a red-hot glowing piece of charcoal, pour a spoon of ghee over it, and instantly cover with a tight lid for 3 minutes for that royal tandoori smoke!',
      'Swirl with extra butter and cream, and serve with hot garlic butter naan.'
    ],
    moviePairing: {
      movie: 'The Lunchbox (2013) starring Irrfan Khan',
      quote: '"Sometimes even the wrong train can take you to the right station."',
      whyWatch: 'A heartfelt, gentle ode to the quiet magic of handwritten letters, tiffin boxes, and the intimacy of sharing food.'
    },
    hungerTrigger: 'That silky, velvety dark dal that coats your spoon, tasting of slow-simmered butter, roasted spices, and charcoal smoke.'
  }
];

export const RECIPES_BY_ID: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map(r => [r.id, r])
);

export const RECIPES_BY_MOOD: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map(r => [r.moodMatch, r])
);
