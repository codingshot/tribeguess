// Traditional African Recipes - Fact-checked from culinary sources
export interface Recipe {
  id: string;
  name: string;
  tribeSlug: string;
  tribeName: string;
  category: 'staple' | 'beverage' | 'special' | 'snack';
  description: string;
  culturalSignificance: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: {
    item: string;
    amount: string;
    notes?: string;
  }[];
  instructions: string[];
  tips?: string[];
  variations?: string[];
  imageUrl?: string;
}

export const recipes: Recipe[] = [
  // ============ KIKUYU RECIPES ============
  {
    id: "mukimo",
    name: "Mũkimo",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "staple",
    description: "A traditional Kikuyu mashed dish combining potatoes, green peas, maize, and pumpkin leaves. The national dish of the Kikuyu people.",
    culturalSignificance: "Mũkimo is the signature dish of the Kikuyu people, served at celebrations, family gatherings, and important ceremonies. The green color from pumpkin leaves represents fertility and prosperity.",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Potatoes", amount: "1 kg", notes: "Peeled and cubed" },
      { item: "Green peas", amount: "2 cups", notes: "Fresh or dried (soak overnight if dried)" },
      { item: "Maize kernels", amount: "1 cup", notes: "Fresh or canned" },
      { item: "Pumpkin leaves (or spinach)", amount: "2 cups", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Butter or cooking oil", amount: "2 tablespoons" }
    ],
    instructions: [
      "If using dried peas, soak them overnight and boil until soft (about 1 hour).",
      "Boil the potatoes in salted water until tender, about 20 minutes.",
      "In a separate pot, boil the maize kernels until soft, about 15 minutes.",
      "Steam or boil the pumpkin leaves until wilted, about 5 minutes.",
      "Drain all vegetables, reserving some potato water.",
      "Combine all ingredients in a large pot and mash together using a wooden spoon or potato masher.",
      "Add butter and continue mashing until you get a smooth, green-speckled mixture.",
      "Add reserved potato water if too dry. Season with salt."
    ],
    tips: [
      "The key to good mũkimo is thorough mashing - no lumps should remain",
      "Traditional mũkimo uses a special wooden pestle called 'mũthi'",
      "Serve with nyama choma (roasted meat) or stew"
    ],
    variations: [
      "Some regions add beans instead of peas",
      "Butternut squash can substitute for pumpkin leaves"
    ]
  },
  {
    id: "githeri",
    name: "Githeri",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "staple",
    description: "A hearty one-pot meal of boiled maize and beans, a protein-rich staple that has been a cornerstone of Kikuyu diet for centuries.",
    culturalSignificance: "Githeri was the everyday food of Kikuyu farmers, providing sustained energy for agricultural work. It remains a beloved comfort food across Kenya.",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried maize", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Dried beans (kidney or red)", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Onion", amount: "1 large", notes: "Diced" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Potatoes (optional)", amount: "2 medium", notes: "Cubed" }
    ],
    instructions: [
      "Soak maize and beans separately overnight (at least 8 hours).",
      "Drain and rinse the maize and beans.",
      "Place in a large pot with fresh water (water should cover by 3 inches).",
      "Bring to boil, then reduce heat and simmer for 1.5-2 hours until tender.",
      "In a separate pan, sauté onions in oil until golden.",
      "Add tomatoes and cook until soft.",
      "Add the cooked maize and beans to the onion-tomato mixture.",
      "Stir well, add potatoes if using, and cook for another 20 minutes.",
      "Season with salt and serve hot."
    ],
    tips: [
      "Adding a pinch of baking soda helps soften the maize faster",
      "This dish improves with reheating - make a large batch",
      "Serve with avocado for a complete protein meal"
    ]
  },
  {
    id: "mutura",
    name: "Mũtura (Kikuyu Blood Sausage)",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "special",
    description: "Traditional Kikuyu sausage made from goat intestines stuffed with meat, blood, and spices. Kenya's version of blood sausage.",
    culturalSignificance: "Mũtura is traditionally prepared during ceremonies and celebrations. It represents the Kikuyu respect for using every part of a slaughtered animal.",
    prepTime: "1 hour",
    cookTime: "1.5 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Goat intestines", amount: "1 meter", notes: "Cleaned thoroughly" },
      { item: "Goat meat", amount: "500g", notes: "Minced" },
      { item: "Fresh goat blood", amount: "1 cup", notes: "Strained" },
      { item: "Onion", amount: "1 large", notes: "Finely chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Fresh coriander", amount: "1/2 cup", notes: "Chopped" },
      { item: "Green chilies", amount: "2", notes: "Optional, chopped" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Black pepper", amount: "1 teaspoon" }
    ],
    instructions: [
      "Clean intestines thoroughly with salt and lemon, rinse multiple times.",
      "Mix minced meat with blood, onions, garlic, coriander, chilies, salt, and pepper.",
      "Tie one end of the intestine securely.",
      "Carefully stuff the mixture into the intestine, leaving some room for expansion.",
      "Tie the other end and coil into a circular shape.",
      "Place in a pot of boiling water and simmer for 1-1.5 hours.",
      "Remove and let cool slightly.",
      "Grill over charcoal until the outside is crispy, turning frequently.",
      "Slice and serve with kachumbari (tomato-onion salad)."
    ],
    tips: [
      "Don't overstuff - the sausage will burst during cooking",
      "Grilling over charcoal adds authentic smoky flavor",
      "Always ensure thorough cooking for food safety"
    ]
  },

  // ============ LUO RECIPES ============
  {
    id: "tilapia-luo",
    name: "Luo-Style Fried Tilapia (Ngege)",
    tribeSlug: "luo",
    tribeName: "Luo",
    category: "special",
    description: "Whole tilapia fish fried crispy and served with ugali. The signature dish of the Luo people from Lake Victoria.",
    culturalSignificance: "Fish is central to Luo identity. Tilapia from Lake Victoria is prepared fresh daily in Luo households and represents the community's deep connection to the lake.",
    prepTime: "20 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Whole tilapia", amount: "2 large", notes: "Cleaned and scaled" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Black pepper", amount: "1 teaspoon" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Garlic", amount: "4 cloves", notes: "Crushed" },
      { item: "Cooking oil", amount: "For deep frying" },
      { item: "Onion rings", amount: "For garnish" },
      { item: "Tomato slices", amount: "For garnish" }
    ],
    instructions: [
      "Make diagonal cuts on both sides of the fish (helps seasoning penetrate).",
      "Mix salt, pepper, lemon juice, and crushed garlic.",
      "Rub the mixture inside and outside the fish.",
      "Let marinate for 15-30 minutes.",
      "Heat oil in a deep pan until very hot (180°C/350°F).",
      "Carefully lower fish into hot oil.",
      "Fry for 8-10 minutes per side until golden brown and crispy.",
      "Remove and drain on paper towels.",
      "Serve immediately with ugali, sukuma wiki, and kachumbari."
    ],
    tips: [
      "Pat fish completely dry before frying for crispier skin",
      "Oil must be hot enough or fish will absorb too much oil",
      "Fresh Lake Victoria tilapia has the best flavor"
    ]
  },
  {
    id: "omena",
    name: "Omena (Silver Cyprinid)",
    tribeSlug: "luo",
    tribeName: "Luo",
    category: "staple",
    description: "Tiny silver fish from Lake Victoria, dried and cooked with tomatoes and onions. An affordable protein source beloved by the Luo.",
    culturalSignificance: "Omena is the 'poor man's fish' but cherished across all social classes. It's a major industry around Lake Victoria and a symbol of Luo resilience.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Dried omena", amount: "2 cups" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Fresh coriander", amount: "For garnish" }
    ],
    instructions: [
      "Rinse dried omena briefly in cold water to remove excess salt.",
      "Heat oil in a pan over medium heat.",
      "Sauté onions until translucent.",
      "Add tomatoes and cook until soft and saucy, about 5 minutes.",
      "Add the omena and stir well to coat with the sauce.",
      "Add a splash of water if too dry.",
      "Cover and simmer for 10 minutes.",
      "Garnish with fresh coriander and serve with ugali."
    ],
    tips: [
      "Don't overcook - omena should retain some texture",
      "Some add groundnut paste for extra richness",
      "Fresh omena can also be fried directly without drying"
    ]
  },

  // ============ MAASAI RECIPES ============
  {
    id: "maasai-blood-milk",
    name: "Osaroi (Blood and Milk)",
    tribeSlug: "maasai",
    tribeName: "Maasai",
    category: "beverage",
    description: "A traditional Maasai drink combining fresh cow's blood with milk. Reserved for warriors and special occasions.",
    culturalSignificance: "This drink is sacred to the Maasai and traditionally consumed by warriors (morans) for strength. Blood is drawn from live cattle without killing them, showing the Maasai's sustainable relationship with their herds.",
    prepTime: "10 minutes",
    cookTime: "5 minutes",
    servings: 2,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh cow's blood", amount: "1 cup", notes: "Collected from live animal" },
      { item: "Fresh raw milk", amount: "2 cups" },
      { item: "Gourd container", amount: "1", notes: "Traditional calabash" }
    ],
    instructions: [
      "Blood is traditionally drawn by shooting a blunted arrow into the cow's jugular vein.",
      "Collect blood in a clean calabash (gourd).",
      "The wound is sealed with mud and dung - the cow recovers fully.",
      "Mix fresh blood with warm milk in the calabash.",
      "Shake or stir to combine.",
      "Drink immediately while fresh."
    ],
    tips: [
      "This is a ceremonial drink, not everyday food",
      "Blood provides iron and protein to the Maasai diet",
      "Modern Maasai often substitute with fermented milk alone"
    ]
  },
  {
    id: "maasai-roast-meat",
    name: "Maasai Roast Meat (Nyama Choma)",
    tribeSlug: "maasai",
    tribeName: "Maasai",
    category: "special",
    description: "Simple fire-roasted meat prepared the traditional Maasai way - just meat, fire, and salt.",
    culturalSignificance: "Meat is central to Maasai celebrations. Cattle are only slaughtered for ceremonies, showing the deep respect Maasai have for their livestock.",
    prepTime: "15 minutes",
    cookTime: "1-2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Goat or beef ribs", amount: "2 kg", notes: "On the bone" },
      { item: "Coarse salt", amount: "To taste" },
      { item: "Firewood", amount: "For open fire" }
    ],
    instructions: [
      "Build an open fire and let it burn down to hot coals.",
      "Create a rack from green sticks or use metal skewers.",
      "Season meat generously with coarse salt.",
      "Position meat over hot coals, not directly in flames.",
      "Rotate slowly, cooking evenly for 1-2 hours.",
      "Meat should be charred outside but juicy inside.",
      "Slice and serve directly - Maasai eat with hands, no utensils."
    ],
    tips: [
      "Low and slow is key - don't rush with high flames",
      "Fat dripping on coals adds smoky flavor",
      "Maasai traditionally don't marinate - just salt"
    ]
  },

  // ============ YORUBA RECIPES ============
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    tribeSlug: "yoruba",
    tribeName: "Yoruba",
    category: "special",
    description: "Nigeria's most famous rice dish - a one-pot meal of rice cooked in a rich tomato sauce with spices. The Yoruba claim the best version.",
    culturalSignificance: "Jollof is the centerpiece of Nigerian celebrations - from weddings to naming ceremonies. The 'Jollof Wars' between Nigeria and Ghana continue to this day.",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Long-grain rice", amount: "3 cups", notes: "Washed and drained" },
      { item: "Tomatoes", amount: "6 large", notes: "Blended" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Red bell peppers", amount: "2", notes: "Blended" },
      { item: "Scotch bonnet peppers", amount: "2", notes: "Blended" },
      { item: "Onions", amount: "2 large", notes: "1 blended, 1 sliced" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Chicken stock", amount: "4 cups" },
      { item: "Thyme", amount: "1 teaspoon" },
      { item: "Curry powder", amount: "1 teaspoon" },
      { item: "Bay leaves", amount: "3" },
      { item: "Salt and seasoning cubes", amount: "To taste" }
    ],
    instructions: [
      "Blend tomatoes, bell peppers, scotch bonnet, and one onion until smooth.",
      "Heat oil in a large pot and fry sliced onions until golden.",
      "Add tomato paste and fry for 2 minutes.",
      "Pour in the blended tomato mixture (ata rodo).",
      "Cook on high heat, stirring constantly until oil floats on top (about 20 minutes).",
      "Add chicken stock, thyme, curry, bay leaves, salt, and seasoning.",
      "Bring to a boil, then add washed rice.",
      "Stir once, reduce heat to very low, cover tightly with foil then lid.",
      "Cook for 30-40 minutes without opening until rice is done.",
      "Fluff with a fork. The bottom should have some crispy 'party jollof' (burnt bits)."
    ],
    tips: [
      "'Party Jollof' (slightly burnt bottom) is highly prized",
      "Cook on very low heat after adding rice for best results",
      "Some add a bay leaf to absorb the tomato 'raw' taste"
    ],
    variations: [
      "Add fried plantains on the side",
      "Mix in cooked chicken or beef",
      "Smoky jollof is made on firewood"
    ]
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    tribeSlug: "yoruba",
    tribeName: "Yoruba",
    category: "special",
    description: "A rich, thick soup made from ground melon seeds, leafy vegetables, and assorted meats. Served with pounded yam or fufu.",
    culturalSignificance: "Egusi soup is a staple across Yorubaland and Nigeria. It's often served at celebrations and represents the abundance of Nigerian cuisine.",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Ground egusi (melon seeds)", amount: "2 cups" },
      { item: "Palm oil", amount: "1 cup" },
      { item: "Assorted meat", amount: "500g", notes: "Beef, tripe, cow foot" },
      { item: "Stockfish", amount: "100g", notes: "Soaked" },
      { item: "Dried fish", amount: "100g" },
      { item: "Spinach or bitter leaf", amount: "3 cups", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Locust beans (iru)", amount: "2 tablespoons" },
      { item: "Crayfish", amount: "2 tablespoons", notes: "Ground" },
      { item: "Scotch bonnet pepper", amount: "To taste" },
      { item: "Seasoning cubes", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Cook assorted meat with onions, salt, and seasoning until tender. Reserve stock.",
      "Heat palm oil in a pot until clear (not bleached).",
      "Mix ground egusi with a little water to form a paste.",
      "Add egusi paste to hot oil and fry, stirring for 5 minutes.",
      "Add meat stock gradually, stirring to prevent lumps.",
      "Add locust beans, crayfish, pepper, and seasoning.",
      "Simmer for 15 minutes until egusi is cooked.",
      "Add cooked meats, stockfish, and dried fish.",
      "Finally, add chopped spinach and cook for 5 more minutes.",
      "Serve hot with pounded yam, fufu, or eba."
    ],
    tips: [
      "Frying the egusi first prevents a 'raw' taste",
      "Don't over-stir after adding leaves - they should stay intact",
      "Palm oil gives authentic color and flavor"
    ]
  },

  // ============ HAUSA RECIPES ============
  {
    id: "suya",
    name: "Suya (Hausa Grilled Meat)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "special",
    description: "Spiced grilled meat skewers coated in yaji (suya spice), a beloved Nigerian street food originating from the Hausa people.",
    culturalSignificance: "Suya is the quintessential Northern Nigerian street food. Hausa traders spread it across West Africa, making it one of Africa's most recognized dishes.",
    prepTime: "4 hours (marinating)",
    cookTime: "15 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef sirloin", amount: "1 kg", notes: "Thinly sliced" },
      { item: "Yaji spice mix", amount: "1/2 cup", notes: "See below" },
      { item: "Vegetable oil", amount: "1/4 cup" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Wooden skewers", amount: "20", notes: "Soaked in water" }
    ],
    instructions: [
      "FOR YAJI SPICE: Mix 1/2 cup ground peanuts, 2 tbsp cayenne, 1 tsp garlic powder, 1 tsp ginger, 1 tsp onion powder, 1 tsp paprika, salt to taste.",
      "Slice beef very thinly against the grain (freeze slightly for easier slicing).",
      "Mix oil with half the yaji spice.",
      "Coat meat slices in this mixture and marinate for 4+ hours (overnight is best).",
      "Thread meat onto skewers in a zigzag pattern.",
      "Grill over hot charcoal, turning frequently, for 10-15 minutes.",
      "Sprinkle remaining yaji spice generously on both sides while grilling.",
      "Serve immediately with sliced onions, tomatoes, and extra yaji."
    ],
    tips: [
      "Authentic suya requires charcoal grilling for smoky flavor",
      "The thinner the meat, the better it absorbs the spice",
      "Yaji spice (tankora) is the secret - make it fresh"
    ]
  },
  {
    id: "tuwo-shinkafa",
    name: "Tuwo Shinkafa",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "staple",
    description: "Soft rice pudding formed into balls, the staple accompaniment to Hausa soups like miyan kuka and miyan taushe.",
    culturalSignificance: "Tuwo is the Hausa equivalent of ugali or fufu - the starchy base that accompanies every meal. Rice is the preferred grain in Northern Nigeria.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Short-grain rice", amount: "2 cups" },
      { item: "Water", amount: "6 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Wash rice thoroughly until water runs clear.",
      "Add rice and water to a pot, bring to boil.",
      "Reduce heat and simmer until rice is very soft and water is absorbed.",
      "Mash the rice vigorously with a wooden spoon or potato masher.",
      "Continue mashing until completely smooth with no grains visible.",
      "Wet your hands and form into round balls.",
      "Serve warm with miyan kuka (baobab leaf soup) or other Hausa soups."
    ],
    tips: [
      "The key is cooking until rice is extremely soft",
      "Mash while hot for smoothest texture",
      "Some add a little rice flour to help binding"
    ]
  },

  // ============ ZULU RECIPES ============
  {
    id: "umngqusho",
    name: "Umngqusho (Samp and Beans)",
    tribeSlug: "zulu",
    tribeName: "Zulu",
    category: "staple",
    description: "A hearty dish of dried corn kernels (samp) cooked with sugar beans. Nelson Mandela's favorite food.",
    culturalSignificance: "Umngqusho was Nelson Mandela's favorite dish, highlighting its importance in South African culture. It's a symbol of Nguni heritage.",
    prepTime: "8 hours (soaking)",
    cookTime: "3 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Samp (dried corn)", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Sugar beans", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Butter", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Black pepper", amount: "1 teaspoon" }
    ],
    instructions: [
      "Soak samp and beans separately overnight (at least 8 hours).",
      "Drain and place in a large pot with fresh water.",
      "Bring to boil, then reduce heat and simmer for 2-3 hours until tender.",
      "Check water levels regularly, adding more if needed.",
      "When soft, drain excess water.",
      "In the same pot, sauté onion in butter until golden.",
      "Add back the samp and beans, season with salt and pepper.",
      "Mix well and serve warm."
    ],
    tips: [
      "Patience is key - this dish cannot be rushed",
      "Some add a ham hock for extra flavor",
      "Serve with chakalaka or tomato gravy"
    ]
  },
  {
    id: "pap-en-vleis",
    name: "Pap en Vleis (Pap and Meat)",
    tribeSlug: "zulu",
    tribeName: "Zulu",
    category: "staple",
    description: "South Africa's iconic combination of maize porridge (pap) served with grilled meat and tomato-onion relish.",
    culturalSignificance: "Pap (called uphuthu by Zulus) is the South African staff of life. Every braai (BBQ) includes pap - it's inseparable from South African identity.",
    prepTime: "10 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Maize meal (mealie meal)", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Butter", amount: "2 tablespoons" }
    ],
    instructions: [
      "Bring water and salt to boil in a heavy pot.",
      "Reduce heat to medium and slowly pour in maize meal, stirring constantly.",
      "Stir vigorously to prevent lumps.",
      "Reduce heat to low, cover, and steam for 30 minutes.",
      "Stir occasionally to prevent sticking.",
      "Add butter and stir until fluffy.",
      "Serve with grilled meat and chakalaka or sous (tomato-onion gravy)."
    ],
    tips: [
      "Stiff pap is firm enough to hold; soft pap is porridge consistency",
      "Cooking low and slow prevents burning",
      "Leftover pap can be sliced and fried the next day"
    ]
  },

  // ============ AMHARA RECIPES ============
  {
    id: "injera",
    name: "Injera",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "staple",
    description: "Spongy, sour flatbread made from teff flour. The foundation of Ethiopian cuisine, used as both plate and utensil.",
    culturalSignificance: "Injera is sacred in Ethiopian culture. Eating from the same plate (mesob) symbolizes friendship and community. It's present at every meal.",
    prepTime: "3 days (fermentation)",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Teff flour", amount: "4 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix teff flour with water in a large bowl until smooth.",
      "Cover loosely and let ferment at room temperature for 2-3 days.",
      "Batter should be bubbly and slightly sour smelling.",
      "Add salt and thin with water to a pourable consistency (like crepe batter).",
      "Heat a large non-stick pan or clay mitad over medium heat.",
      "Pour batter in a spiral from outside to center, filling the pan.",
      "Cover and cook until bubbles form and top is dry (don't flip).",
      "Remove carefully and let cool on a cloth.",
      "Stack injera on a plate, separated by cloth."
    ],
    tips: [
      "True teff injera requires 3 days fermentation - don't rush",
      "The pan must be very hot for proper 'eyes' (holes) to form",
      "Store covered at room temperature for up to 3 days"
    ]
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "special",
    description: "Ethiopia's national dish - a spicy chicken stew simmered in berbere spice and niter kibbeh (spiced butter).",
    culturalSignificance: "Doro wat is reserved for special occasions like weddings, holidays, and honored guests. Making it properly is a rite of passage for Ethiopian women.",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Whole chicken", amount: "1", notes: "Cut into pieces" },
      { item: "Red onions", amount: "6 large", notes: "Finely diced" },
      { item: "Berbere spice", amount: "4 tablespoons" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Hard-boiled eggs", amount: "6" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Ginger", amount: "2 tablespoons", notes: "Minced" },
      { item: "Chicken stock", amount: "2 cups" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Score hard-boiled eggs with a knife and set aside.",
      "Dry-cook onions in a heavy pot over medium heat, stirring constantly for 20 minutes until deeply browned (no oil needed).",
      "Add niter kibbeh and continue cooking onions for 5 more minutes.",
      "Add berbere spice and tomato paste, cook for 5 minutes.",
      "Add garlic and ginger, cook for 2 minutes.",
      "Rub chicken pieces with lemon juice and salt.",
      "Add chicken to the pot, coating well with the sauce.",
      "Add stock, cover, and simmer for 45 minutes.",
      "Add scored eggs and cook for 15 more minutes.",
      "Serve on injera with eggs nestled in the stew."
    ],
    tips: [
      "The onion-cooking step is crucial - don't add oil, let them caramelize dry",
      "Berbere spice is essential - no substitutes",
      "Each chicken piece should have an egg alongside"
    ]
  },

  // ============ SWAHILI RECIPES ============
  {
    id: "pilau",
    name: "Swahili Pilau",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Fragrant spiced rice dish with meat, cooked in pilau masala and caramelized onions. The pride of Swahili coast cuisine.",
    culturalSignificance: "Pilau reflects the Swahili's Arab, Indian, and African heritage. It's the centerpiece of weddings, Eid celebrations, and Friday prayers.",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Basmati rice", amount: "3 cups", notes: "Soaked for 30 minutes" },
      { item: "Beef or goat", amount: "500g", notes: "Cubed" },
      { item: "Onions", amount: "4 large", notes: "Sliced thin" },
      { item: "Pilau masala", amount: "3 tablespoons" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Ginger", amount: "2 tablespoons", notes: "Minced" },
      { item: "Tomatoes", amount: "2", notes: "Chopped" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Beef stock", amount: "4 cups" },
      { item: "Whole spices", amount: "Various", notes: "Cardamom, cinnamon, cloves, cumin" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Heat oil and fry onions until deeply caramelized (dark brown), about 20 minutes.",
      "Remove half the onions for garnish.",
      "Add meat to remaining onions and brown on all sides.",
      "Add garlic, ginger, and whole spices. Cook for 2 minutes.",
      "Add tomatoes and pilau masala. Cook until tomatoes break down.",
      "Add beef stock and simmer until meat is tender (30-40 minutes).",
      "Drain soaked rice and add to the pot.",
      "Add more water if needed (liquid should be 1 inch above rice).",
      "Bring to boil, then cover tightly and reduce to lowest heat.",
      "Cook for 20 minutes without opening lid.",
      "Fluff with fork and garnish with reserved caramelized onions."
    ],
    tips: [
      "Don't stir rice once added - let steam do the work",
      "Caramelized onions are key to authentic color and flavor",
      "Traditional pilau gets a smoky finish from coal on the lid"
    ]
  },

  // ============ SHONA RECIPES ============
  {
    id: "sadza",
    name: "Sadza",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Zimbabwe's staple food - thick maize porridge that accompanies every meal. The heart of Shona cuisine.",
    culturalSignificance: "A meal isn't complete without sadza in Zimbabwe. The saying 'Sadza makadii?' (How's the sadza?) is a common greeting asking about wellbeing.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Bring water to boil in a heavy pot.",
      "Make a paste with 1/2 cup maize meal and cold water.",
      "Stir paste into boiling water to prevent lumps.",
      "Cook for 5 minutes, stirring constantly.",
      "Gradually add remaining maize meal, stirring vigorously.",
      "The mixture should become thick enough to pull away from pot sides.",
      "Reduce heat, cover, and steam for 15 minutes.",
      "Stir again and shape into a mound.",
      "Serve with nyama (meat) and vegetables."
    ],
    tips: [
      "Constant stirring prevents lumps",
      "The final consistency should be like stiff mashed potatoes",
      "Eat by pinching off a piece and dipping into relish"
    ]
  }
];

// Helper function to get recipes by tribe
export const getRecipesByTribe = (tribeSlug: string): Recipe[] => {
  return recipes.filter(recipe => recipe.tribeSlug === tribeSlug);
};

// Helper function to get recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

// Helper function to find recipe by food name (for linking from food list)
export const findRecipeByName = (name: string, tribeSlug: string): Recipe | undefined => {
  const normalizedName = name.toLowerCase();
  return recipes.find(recipe => 
    recipe.tribeSlug === tribeSlug && 
    (recipe.name.toLowerCase().includes(normalizedName) || 
     normalizedName.includes(recipe.name.toLowerCase().split(' ')[0]))
  );
};
