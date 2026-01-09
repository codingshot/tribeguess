// Traditional African Recipes - Fact-checked from culinary sources
export interface Recipe {
  id: string;
  name: string;
  tribeSlug: string;
  tribeName: string;
  category: 'staple' | 'beverage' | 'special' | 'snack';
  description: string;
  culturalSignificance: string;
  historicalContext?: string; // Additional historical information
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
  youtubeVideoId?: string; // YouTube video ID for cooking tutorial
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
    historicalContext: "Mũkimo has been central to Kikuyu agriculture for centuries, developed when the tribe settled in the fertile Central Highlands of Kenya around the 16th century. The dish evolved from indigenous crops grown on the slopes of Mount Kenya. During colonial times, it became a symbol of cultural identity and resistance, as the Kikuyu maintained their food traditions despite European influence.",
    youtubeVideoId: "5cuGbmPtLGE",
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
    historicalContext: "The Maasai have been pastoral nomads in East Africa for over 500 years, developing a unique relationship with their cattle. Nyama choma reflects their warrior tradition - the simple preparation honors the animal. During colonial times, British administrators tried unsuccessfully to change Maasai dietary practices, but the tradition persisted.",
    youtubeVideoId: "siv6d9f4kx4",
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
    historicalContext: "Jollof rice originated from the Wolof people of Senegal and Gambia in the 14th century, spreading across West Africa through trade routes. The dish evolved differently in each region - Nigerian Jollof uses tomatoes and peppers, while Senegalese thieboudienne uses more vegetables. The trans-Atlantic slave trade carried Jollof to the Americas, influencing dishes like Louisiana jambalaya.",
    youtubeVideoId: "jDbUg4f9EFw",
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
    historicalContext: "Egusi (melon seeds) have been cultivated in West Africa for over 4,000 years. The soup reflects Nigeria's agricultural heritage and the Yoruba mastery of combining indigenous ingredients. During the trans-Atlantic slave trade, West African cooking techniques spread to the Caribbean and Americas.",
    youtubeVideoId: "UHe8K6uM-Z0",
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
    historicalContext: "Suya emerged from the Hausa people's nomadic pastoralist heritage. As cattle herders who followed trans-Saharan trade routes, the Hausa developed techniques for preserving and grilling meat. The yaji spice blend reflects centuries of trade with North Africa and the Middle East, incorporating groundnuts (from South America via Portuguese traders).",
    youtubeVideoId: "r0jspooZ4Kg",
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
    historicalContext: "This dish predates European contact, originally made with indigenous African grains before maize arrived. Mandela ate it throughout his 27 years of imprisonment on Robben Island, and it was served at his presidential inauguration in 1994. The dish represents the resilience of African food traditions through colonization and apartheid.",
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
    historicalContext: "Injera dates back over 2,000 years to the ancient Aksumite Empire. Teff, a grain native to the Ethiopian Highlands, has been cultivated since 4000 BCE. The fermentation technique was developed to make the tiny teff grains digestible. During Emperor Haile Selassie's reign, injera became a symbol of Ethiopian identity and independence.",
    youtubeVideoId: "2oRDGbJtNJA",
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
    historicalContext: "Doro wat evolved from ancient Ethiopian stewing traditions, with berbere spice blends developed over centuries. The dish gained significance during Christian fasting periods when chicken was reserved for breaking fasts. The number of eggs (traditionally 12) represents the apostles, connecting food to Ethiopian Orthodox Christianity.",
    youtubeVideoId: "S7W065xcDvc",
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
    historicalContext: "Pilau arrived on the Swahili coast through centuries of Indian Ocean trade with Persia, India, and Arabia. Mombasa and Lamu became crossroads of flavors - cardamom from India, cumin from the Middle East, and local African spices blended into the signature pilau masala. The dish symbolizes Swahili cosmopolitan identity.",
    youtubeVideoId: "btEkKgrowPY",
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
    historicalContext: "Maize arrived in Africa via Portuguese traders from the Americas in the 16th century. The Shona adopted it and developed sadza, which became central to their identity. During Zimbabwe's liberation war, sadza sustained freedom fighters in the bush. Today it remains a symbol of Zimbabwean national identity.",
    youtubeVideoId: "3I0nki8r41U",
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
  },

  // ============ IGBO RECIPES ============
  {
    id: "ofe-nsala",
    name: "Ofe Nsala (White Soup)",
    tribeSlug: "igbo",
    tribeName: "Igbo",
    category: "special",
    description: "A creamy, peppery catfish soup thickened with pounded yam. Known as 'white soup' because it contains no palm oil.",
    culturalSignificance: "Ofe Nsala is a delicacy from Anambra State, traditionally served to new mothers to aid recovery. It's the signature soup for welcoming special guests.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh catfish", amount: "1 kg", notes: "Cleaned and cut into pieces" },
      { item: "Yam", amount: "1/2 tuber", notes: "For thickening" },
      { item: "Utazi leaves", amount: "1 cup", notes: "Shredded" },
      { item: "Uziza seeds", amount: "2 tablespoons", notes: "Ground" },
      { item: "Crayfish", amount: "2 tablespoons", notes: "Ground" },
      { item: "Ogiri (locust bean paste)", amount: "1 tablespoon" },
      { item: "Yellow pepper (ata rodo)", amount: "4", notes: "Blended" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Stock cubes", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Boil yam chunks until very soft, then pound or mash completely.",
      "Clean catfish thoroughly with salt and hot water to remove sliminess.",
      "Boil fish with onion, salt, and stock cubes for 10 minutes.",
      "Dissolve pounded yam in the fish stock to create a smooth, creamy base.",
      "Add ground pepper, uziza seeds, crayfish, and ogiri.",
      "Simmer for 15 minutes, stirring gently.",
      "Add utazi leaves in the last 2 minutes.",
      "Serve hot with pounded yam or fufu."
    ],
    tips: [
      "The soup should be creamy white - never add palm oil",
      "Use a wooden spoon to avoid breaking the fish",
      "Utazi gives the characteristic bitter-fresh taste"
    ]
  },
  {
    id: "abacha",
    name: "Abacha (African Salad)",
    tribeSlug: "igbo",
    tribeName: "Igbo",
    category: "staple",
    description: "Shredded dried cassava mixed with palm oil, ugba (fermented oil bean), and spices. A beloved Igbo snack and meal.",
    culturalSignificance: "Abacha is the quintessential Igbo food, served at ceremonies, meetings, and family gatherings. It symbolizes hospitality and community bonding.",
    prepTime: "30 minutes",
    cookTime: "0 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried abacha (cassava flakes)", amount: "3 cups", notes: "Soaked in warm water" },
      { item: "Ugba (oil bean)", amount: "1 cup", notes: "Fermented and shredded" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Potash (akanwu)", amount: "1 teaspoon", notes: "Dissolved in water" },
      { item: "Ground crayfish", amount: "3 tablespoons" },
      { item: "Pepper", amount: "To taste" },
      { item: "Onion", amount: "1 medium", notes: "Sliced" },
      { item: "Garden egg leaves", amount: "1 cup", notes: "Shredded" },
      { item: "Stockfish", amount: "100g", notes: "Cooked and shredded" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak dried abacha in warm water for 10 minutes until soft. Drain well.",
      "Mix palm oil with dissolved potash until it turns yellow and thick.",
      "Add crayfish, pepper, salt, and stock cube to the palm oil mixture.",
      "Combine softened abacha with the palm oil mixture.",
      "Add ugba, onions, stockfish, and garden egg leaves.",
      "Toss gently to coat everything evenly.",
      "Let sit for 10 minutes before serving.",
      "Serve at room temperature or slightly chilled."
    ],
    tips: [
      "Don't over-soak the abacha or it becomes mushy",
      "Potash makes the palm oil creamy - essential for authentic taste",
      "Add kpomo (cow skin) for extra protein"
    ]
  },
  {
    id: "okpa",
    name: "Okpa (Bambara Nut Pudding)",
    tribeSlug: "igbo",
    tribeName: "Igbo",
    category: "snack",
    description: "A protein-rich steamed pudding made from Bambara groundnut flour. A popular breakfast and snack in Eastern Nigeria.",
    culturalSignificance: "Okpa is the go-to street food in Enugu and surrounding Igbo areas. It's wrapped in banana leaves, giving it a distinctive aroma.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Bambara nut flour (okpa flour)", amount: "3 cups" },
      { item: "Palm oil", amount: "1 cup" },
      { item: "Water", amount: "4 cups", notes: "Warm" },
      { item: "Crayfish", amount: "2 tablespoons", notes: "Ground (optional)" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Pepper", amount: "To taste" },
      { item: "Banana leaves or nylon bags", amount: "For wrapping" }
    ],
    instructions: [
      "Mix okpa flour with warm water until smooth, no lumps.",
      "Add palm oil and mix thoroughly until evenly orange.",
      "Season with salt, pepper, and crayfish.",
      "Pour mixture into banana leaves or small nylon bags, tie securely.",
      "Place in a large pot with water (water should not enter bags).",
      "Steam for 1 hour until set.",
      "Unwrap and serve warm with pap or on its own."
    ],
    tips: [
      "The mixture should be thin enough to pour easily",
      "Don't fill bags too full - it expands during cooking",
      "Best eaten fresh and warm"
    ]
  },

  // ============ XHOSA RECIPES ============
  {
    id: "umqa",
    name: "Umqa (Xhosa Maize Bread)",
    tribeSlug: "xhosa",
    tribeName: "Xhosa",
    category: "staple",
    description: "Traditional steamed bread made from maize meal, wrapped in mealie leaves. A Xhosa staple that pairs with every meal.",
    culturalSignificance: "Umqa is central to Xhosa cuisine and culture. The aroma of steaming umqa signals a well-kept home and is prepared for all important occasions.",
    prepTime: "15 minutes",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Maize meal", amount: "4 cups" },
      { item: "Boiling water", amount: "3 cups" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Sugar", amount: "2 tablespoons", notes: "Optional" },
      { item: "Butter or margarine", amount: "2 tablespoons" },
      { item: "Mealie leaves or muslin cloth", amount: "For wrapping" }
    ],
    instructions: [
      "Mix maize meal with salt and sugar in a large bowl.",
      "Add boiling water gradually, mixing to form a thick dough.",
      "Add butter and knead until smooth.",
      "Shape into a large loaf or smaller individual portions.",
      "Wrap tightly in mealie leaves or muslin cloth.",
      "Place in a pot with a little water (on a rack to keep above water).",
      "Steam for 2 hours, checking water level periodically.",
      "Unwrap and slice while still warm.",
      "Serve with meat stew, sour milk, or chakalaka."
    ],
    tips: [
      "The leaves impart a distinctive flavor",
      "Keep the pot sealed to trap steam",
      "Can also be baked in a covered pot for 1.5 hours"
    ]
  },
  {
    id: "umleqwa",
    name: "Umleqwa (Xhosa Free-Range Chicken)",
    tribeSlug: "xhosa",
    tribeName: "Xhosa",
    category: "special",
    description: "Traditional slow-cooked free-range chicken, prepared for ceremonies and family gatherings. The authentic village-style chicken dish.",
    culturalSignificance: "Umleqwa is reserved for important visitors and ceremonies. Free-range chickens from the village are considered far superior to store-bought.",
    prepTime: "20 minutes",
    cookTime: "3 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Free-range chicken", amount: "1 whole", notes: "Cut into pieces" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Potatoes", amount: "4 medium", notes: "Quartered" },
      { item: "Carrots", amount: "2", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Black pepper", amount: "1 teaspoon" },
      { item: "Bay leaves", amount: "2" },
      { item: "Water", amount: "3 cups" }
    ],
    instructions: [
      "Rinse chicken pieces and pat dry.",
      "Season chicken generously with salt and pepper.",
      "Place chicken in a large pot with onions and bay leaves.",
      "Add water and bring to boil.",
      "Reduce heat and simmer for 2 hours (village chicken is tougher).",
      "Add potatoes and carrots in the last 45 minutes.",
      "Cook until chicken is falling-off-the-bone tender.",
      "Adjust seasoning and serve with umqa or pap."
    ],
    tips: [
      "Free-range chicken needs longer cooking time",
      "The broth is as valued as the meat",
      "Don't add vegetables too early or they'll be mushy"
    ]
  },
  {
    id: "umqombothi",
    name: "Umqombothi (Xhosa Traditional Beer)",
    tribeSlug: "xhosa",
    tribeName: "Xhosa",
    category: "beverage",
    description: "Traditional Xhosa sorghum beer with a sour, yeasty taste. Brewed for ceremonies, ancestors, and social gatherings.",
    culturalSignificance: "Umqombothi is sacred in Xhosa culture, used in ancestral rituals and ceremonies. It's always shared from a communal pot, symbolizing unity.",
    prepTime: "30 minutes",
    cookTime: "3 days (fermentation)",
    servings: 20,
    difficulty: "hard",
    ingredients: [
      { item: "Maize meal", amount: "4 cups" },
      { item: "Sorghum malt", amount: "2 cups" },
      { item: "Water", amount: "10 liters" },
      { item: "Wheat flour", amount: "1/2 cup", notes: "Optional, for faster fermentation" }
    ],
    instructions: [
      "Day 1: Boil water and mix with maize meal to form thin porridge.",
      "Let cool to lukewarm, then add sorghum malt. Stir well.",
      "Cover with cloth and leave in warm place overnight.",
      "Day 2: The mixture should be bubbling (fermenting).",
      "Strain through a sieve into a clean container.",
      "Return to warm place and let ferment another day.",
      "Day 3: Strain again. The beer should be slightly fizzy.",
      "Serve at room temperature from a traditional clay pot."
    ],
    tips: [
      "Fermentation depends on temperature - warmer = faster",
      "Should taste sour, not sweet",
      "Best consumed fresh within 3 days"
    ]
  },

  // ============ OROMO RECIPES ============
  {
    id: "marqa",
    name: "Marqa (Oromo Meat Stew)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "special",
    description: "A rich, spiced meat stew with butter and Ethiopian spices. The traditional Oromo feast dish served with injera.",
    culturalSignificance: "Marqa is prepared for the Irreecha festival and other Oromo celebrations. It represents abundance and communal sharing.",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or lamb", amount: "1 kg", notes: "Cubed" },
      { item: "Onions", amount: "4 large", notes: "Finely chopped" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Berbere spice", amount: "3 tablespoons" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Ginger", amount: "2 inches", notes: "Grated" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Beef stock", amount: "2 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Black pepper", amount: "1 teaspoon" }
    ],
    instructions: [
      "Dry-sauté onions in a pot until deeply caramelized (no oil yet), about 15 min.",
      "Add niter kibbeh and let it melt into the onions.",
      "Add garlic and ginger, cook for 2 minutes.",
      "Add berbere spice and cook, stirring, for 3 minutes.",
      "Add tomatoes and cook until they break down.",
      "Add meat and brown on all sides.",
      "Pour in beef stock, bring to boil, then reduce heat.",
      "Cover and simmer for 1-1.5 hours until meat is very tender.",
      "Adjust salt and serve with injera."
    ],
    tips: [
      "Caramelizing onions properly is the key to flavor",
      "Niter kibbeh can be made by infusing butter with Ethiopian spices",
      "The stew should be thick, not watery"
    ]
  },
  {
    id: "buna-qela",
    name: "Buna Qela (Roasted Coffee)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "beverage",
    description: "Traditional Oromo coffee ceremony - coffee beans roasted, ground, and brewed fresh. The birthplace of coffee culture.",
    culturalSignificance: "The Oromo discovered coffee in the Kaffa region. The buna ceremony is a spiritual and social ritual, performed up to three times daily, each round with symbolic meaning.",
    prepTime: "30 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green coffee beans", amount: "1/2 cup" },
      { item: "Water", amount: "4 cups" },
      { item: "Sugar", amount: "To taste", notes: "Or salt in some regions" },
      { item: "Incense (frankincense)", amount: "For aroma" },
      { item: "Popcorn or snacks", amount: "For serving" }
    ],
    instructions: [
      "Light incense to create the ceremonial atmosphere.",
      "Wash green coffee beans and pat dry.",
      "Roast beans in a pan over medium heat, stirring constantly.",
      "Roast until dark brown and fragrant, about 10-15 minutes.",
      "Let guests smell the roasted beans (traditional custom).",
      "Grind beans with mortar and pestle while still warm.",
      "Add ground coffee to jebena (clay coffee pot) with water.",
      "Bring to boil, let settle, repeat 3 times.",
      "Pour into small cups from height to aerate.",
      "Serve with sugar and popcorn."
    ],
    tips: [
      "The ceremony has three rounds: Abol, Tona, and Baraka",
      "Never leave before the third cup - it's the blessing",
      "Fresh roasting is essential for authentic taste"
    ]
  },
  {
    id: "anchote",
    name: "Anchote (Oromo Root Vegetable)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "staple",
    description: "A traditional Oromo root vegetable, boiled and served with butter. Highly nutritious and unique to Ethiopia.",
    culturalSignificance: "Anchote is known as 'the Oromo root' and is given to nursing mothers and the sick for its healing properties. It's a symbol of Oromo agricultural heritage.",
    prepTime: "10 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Anchote tubers", amount: "500g", notes: "Peeled and cubed" },
      { item: "Butter or niter kibbeh", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Black pepper", amount: "1/2 teaspoon" },
      { item: "Onion", amount: "1 small", notes: "Chopped (optional)" }
    ],
    instructions: [
      "Peel anchote tubers and cut into chunks.",
      "Boil in salted water until very tender, about 40 minutes.",
      "Drain and mash slightly or leave in chunks.",
      "Melt butter in a pan, sauté onions if using.",
      "Add anchote and toss with butter.",
      "Season with salt and pepper.",
      "Serve warm as a side dish."
    ],
    tips: [
      "Anchote turns yellowish when cooked - this is normal",
      "Similar in texture to potato but more nutritious",
      "Often served to postpartum mothers"
    ]
  },

  // ============ SOMALI RECIPES ============
  {
    id: "canjeero",
    name: "Canjeero (Somali Pancakes)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "staple",
    description: "Spongy, fermented pancakes similar to Ethiopian injera but thinner. The foundation of Somali breakfast.",
    culturalSignificance: "Canjeero is eaten daily in Somali households, typically for breakfast with tea and honey. It represents the warmth of Somali hospitality.",
    historicalContext: "Canjeero reflects the Somali nomadic heritage and the Horn of Africa's shared culinary traditions with Ethiopia. The fermentation technique was adapted to the Somali climate and available grains. During Somalia's golden age (1960s), canjeero was served to visiting diplomats as a symbol of national identity.",
    youtubeVideoId: "2YAdBjWxAao",
    prepTime: "12 hours (fermentation)",
    cookTime: "20 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Self-rising flour", amount: "2 cups" },
      { item: "Corn flour", amount: "1/2 cup" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Sugar", amount: "1 tablespoon" },
      { item: "Warm water", amount: "3 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix flours, yeast, sugar, and salt in a large bowl.",
      "Gradually add warm water, whisking to avoid lumps.",
      "Batter should be thin and pourable.",
      "Cover and let ferment overnight (8-12 hours) in a warm place.",
      "Stir the bubbly batter gently.",
      "Heat a non-stick pan over medium heat (no oil needed).",
      "Pour thin layer of batter, tilting to spread.",
      "Cook until top is set and has many small holes.",
      "Fold into quarters and serve with butter, honey, or stew."
    ],
    tips: [
      "The batter should be bubbly after fermentation",
      "Cook on one side only - it should be spongy",
      "Serve immediately while soft"
    ]
  },
  {
    id: "suqaar",
    name: "Suqaar (Somali Sautéed Meat)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "special",
    description: "Cubed meat sautéed with vegetables and Somali spices. Quick, flavorful, and a staple of Somali home cooking.",
    culturalSignificance: "Suqaar is everyday comfort food in Somalia. Each family has their version, making it a personal and nostalgic dish for Somalis abroad.",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Beef or lamb", amount: "500g", notes: "Cubed small" },
      { item: "Onion", amount: "1 large", notes: "Diced" },
      { item: "Green bell pepper", amount: "1", notes: "Diced" },
      { item: "Tomato", amount: "1 large", notes: "Diced" },
      { item: "Jalapeño", amount: "1", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Xawaash spice", amount: "1 tablespoon" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Fresh cilantro", amount: "For garnish" }
    ],
    instructions: [
      "Season meat cubes with salt, cumin, and xawaash.",
      "Heat oil in a large pan over high heat.",
      "Add meat and sear until browned, about 5 minutes.",
      "Add onions and garlic, cook until softened.",
      "Add bell pepper and jalapeño, cook 3 minutes.",
      "Add tomatoes and cook until soft.",
      "Reduce heat and simmer until meat is cooked through.",
      "Garnish with fresh cilantro.",
      "Serve with canjeero, rice, or Somali pasta."
    ],
    tips: [
      "Cut meat into small, uniform cubes for quick cooking",
      "High heat is key for proper browning",
      "Xawaash can be made at home with cumin, coriander, turmeric, and cardamom"
    ]
  },
  {
    id: "shaah-cadays",
    name: "Shaah Cadays (Somali Spiced Tea)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "beverage",
    description: "Sweet, spiced milk tea that is the lifeblood of Somali social life. No gathering is complete without shaah.",
    culturalSignificance: "Somalis consume shaah multiple times daily. It's the first thing offered to guests and is central to Somali hospitality and social bonding.",
    prepTime: "5 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Water", amount: "2 cups" },
      { item: "Milk", amount: "2 cups" },
      { item: "Black tea leaves", amount: "2 tablespoons" },
      { item: "Sugar", amount: "4 tablespoons", notes: "Adjust to taste" },
      { item: "Cardamom pods", amount: "4", notes: "Crushed" },
      { item: "Cinnamon stick", amount: "1 small" },
      { item: "Cloves", amount: "2" },
      { item: "Ginger", amount: "1/2 inch", notes: "Optional" }
    ],
    instructions: [
      "Add water, cardamom, cinnamon, and cloves to a pot.",
      "Bring to a boil.",
      "Add tea leaves and boil for 3 minutes.",
      "Add milk and sugar.",
      "Bring back to boil, stirring occasionally.",
      "Reduce heat and simmer for 5 minutes.",
      "Strain into cups and serve hot."
    ],
    tips: [
      "Boil the tea vigorously - Somalis like strong tea",
      "Adjust sweetness to taste (traditionally very sweet)",
      "Some add a pinch of black pepper for extra warmth"
    ]
  },

  // ============ FULANI/FULA RECIPES ============
  {
    id: "fura-da-nono",
    name: "Fura da Nono",
    tribeSlug: "fulani",
    tribeName: "Fulani",
    category: "beverage",
    description: "Millet balls served in fermented milk. The iconic Fulani drink and snack, sold by Fulani women across West Africa.",
    culturalSignificance: "Fura da Nono represents the Fulani pastoral lifestyle. Fulani women are renowned for carrying calabashes of this refreshing drink on their heads.",
    prepTime: "30 minutes",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet flour", amount: "2 cups" },
      { item: "Fresh or fermented milk (nono)", amount: "1 liter" },
      { item: "Ginger", amount: "2 inches", notes: "Grated" },
      { item: "Cloves", amount: "1/2 teaspoon", notes: "Ground" },
      { item: "Sugar", amount: "To taste" },
      { item: "Water", amount: "For mixing" }
    ],
    instructions: [
      "Mix millet flour with enough water to form stiff dough.",
      "Add grated ginger and ground cloves to the dough.",
      "Knead well until smooth.",
      "Form into small balls (about 2 inches diameter).",
      "Boil in water for 15-20 minutes until cooked through.",
      "Remove and let cool.",
      "To serve: mash fura balls into the nono (fermented milk).",
      "Stir until combined into a thick drink.",
      "Add sugar if desired and serve chilled."
    ],
    tips: [
      "The fura should be dense and slightly chewy",
      "Nono is like buttermilk or kefir - tangy and thick",
      "Traditionally served in a calabash"
    ]
  },
  {
    id: "kosai",
    name: "Kosai (Bean Cakes)",
    tribeSlug: "fulani",
    tribeName: "Fulani",
    category: "snack",
    description: "Fried bean cakes made from black-eyed peas. A popular street food across the Sahel region.",
    culturalSignificance: "Kosai is a beloved Fulani breakfast food, often sold alongside fura da nono. It showcases the Fulani integration of settled and nomadic food cultures.",
    prepTime: "8 hours (soaking)",
    cookTime: "20 minutes",
    servings: 20,
    difficulty: "medium",
    ingredients: [
      { item: "Black-eyed peas", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Onion", amount: "1 medium" },
      { item: "Scotch bonnet pepper", amount: "1" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Vegetable oil", amount: "For deep frying" }
    ],
    instructions: [
      "Soak beans overnight. Rub between palms to remove skins.",
      "Rinse thoroughly until water runs clear.",
      "Blend beans with onion, pepper, and salt until smooth.",
      "Add a little water if needed - batter should be thick and fluffy.",
      "Beat the batter vigorously to incorporate air.",
      "Heat oil to 180°C (350°F).",
      "Drop spoonfuls of batter into hot oil.",
      "Fry until golden brown, about 3-4 minutes per side.",
      "Drain on paper towels and serve hot."
    ],
    tips: [
      "Removing bean skins gives lighter, fluffier kosai",
      "Beating the batter is crucial for texture",
      "Serve with pap or on its own as a snack"
    ]
  },

  // ============ BERBER/AMAZIGH RECIPES ============
  {
    id: "tagine-lamb",
    name: "Tagine (Lamb with Apricots)",
    tribeSlug: "berber",
    tribeName: "Berber",
    category: "special",
    description: "Slow-cooked lamb with dried apricots, almonds, and warming spices. The iconic dish of Berber cuisine.",
    culturalSignificance: "Tagine is named after the conical clay pot it's cooked in. It represents Berber culinary sophistication and the sweet-savory flavor profile of North African cooking.",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Lamb shoulder", amount: "1 kg", notes: "Cubed" },
      { item: "Dried apricots", amount: "1 cup" },
      { item: "Almonds", amount: "1/2 cup", notes: "Blanched" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Honey", amount: "3 tablespoons" },
      { item: "Cinnamon", amount: "1 teaspoon" },
      { item: "Ginger", amount: "1 teaspoon" },
      { item: "Saffron", amount: "Pinch" },
      { item: "Olive oil", amount: "3 tablespoons" },
      { item: "Butter", amount: "2 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Fresh cilantro", amount: "For garnish" }
    ],
    instructions: [
      "Season lamb with salt, pepper, cinnamon, and ginger.",
      "Heat olive oil and butter in tagine or heavy pot.",
      "Brown lamb on all sides, remove and set aside.",
      "Sauté onions until caramelized, about 15 minutes.",
      "Return lamb, add saffron soaked in warm water.",
      "Add water to cover, bring to simmer.",
      "Cover and cook on low for 1.5 hours.",
      "Add apricots and honey, cook another 30 minutes.",
      "Toast almonds in a dry pan.",
      "Serve tagine topped with almonds and cilantro.",
      "Accompany with couscous."
    ],
    tips: [
      "A tagine pot creates the signature steaming effect",
      "Low and slow is essential for tender meat",
      "The sauce should be thick and glossy"
    ]
  },
  {
    id: "couscous-berber",
    name: "Couscous Royal",
    tribeSlug: "berber",
    tribeName: "Berber",
    category: "staple",
    description: "Steamed semolina served with a rich vegetable stew and multiple meats. The national dish of the Maghreb.",
    culturalSignificance: "Friday couscous is a sacred family tradition across North Africa. The Berbers invented couscous over a thousand years ago.",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Couscous", amount: "500g" },
      { item: "Lamb", amount: "500g", notes: "Bone-in pieces" },
      { item: "Chicken", amount: "4 pieces" },
      { item: "Merguez sausages", amount: "4" },
      { item: "Chickpeas", amount: "1 can", notes: "Drained" },
      { item: "Carrots", amount: "4" },
      { item: "Turnips", amount: "2" },
      { item: "Zucchini", amount: "2" },
      { item: "Tomatoes", amount: "3" },
      { item: "Onion", amount: "1 large" },
      { item: "Ras el hanout", amount: "2 tablespoons" },
      { item: "Olive oil", amount: "4 tablespoons" },
      { item: "Butter", amount: "4 tablespoons" },
      { item: "Harissa", amount: "For serving" }
    ],
    instructions: [
      "In a couscoussier or large pot, brown lamb and chicken in oil.",
      "Add onion, tomatoes, ras el hanout, salt. Cover with water.",
      "Bring to boil, then simmer for 1 hour.",
      "Meanwhile, moisten couscous with salted water.",
      "Steam couscous for 20 min, fluff, rest, repeat 3 times total.",
      "Add carrots and turnips to stew after 1 hour.",
      "Add zucchini and chickpeas in last 20 minutes.",
      "Grill merguez separately.",
      "Toss steamed couscous with butter.",
      "Mound couscous on platter, arrange meats and vegetables on top.",
      "Serve with broth on side and harissa for heat."
    ],
    tips: [
      "Traditional couscous is steamed 3 times for fluffy texture",
      "The broth can be served separately for dipping",
      "This is a communal dish - everyone eats from one platter"
    ]
  },

  // ============ NUBIAN RECIPES ============
  {
    id: "ful-sudani",
    name: "Ful Medames (Sudanese Style)",
    tribeSlug: "nubian",
    tribeName: "Nubian",
    category: "staple",
    description: "Slow-cooked fava beans with olive oil, cumin, and lemon. The essential Nubian breakfast.",
    culturalSignificance: "Ful has been eaten along the Nile for thousands of years. Nubians consider it the perfect start to the day, representing continuity with ancient traditions.",
    prepTime: "12 hours (soaking)",
    cookTime: "4 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Dried fava beans", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Olive oil", amount: "1/4 cup" },
      { item: "Lemon juice", amount: "3 tablespoons" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cumin", amount: "2 teaspoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Fresh parsley", amount: "For garnish" },
      { item: "Hard-boiled eggs", amount: "For serving" },
      { item: "Pita bread", amount: "For serving" }
    ],
    instructions: [
      "Drain soaked beans and place in large pot with fresh water.",
      "Bring to boil, then reduce to simmer.",
      "Cook for 4-5 hours until beans are very soft (or use pressure cooker for 1 hour).",
      "Mash some beans to make it creamy, leaving some whole.",
      "Mix garlic with olive oil, lemon, cumin, and salt.",
      "Pour dressing over beans and stir.",
      "Serve in bowls with extra olive oil drizzled on top.",
      "Garnish with parsley, serve with eggs and warm pita."
    ],
    tips: [
      "Slow cooking develops the best flavor",
      "Add more lemon for tang, more oil for richness",
      "Some add tahini or yogurt on top"
    ]
  },

  // ============ DINKA RECIPES ============
  {
    id: "walwal",
    name: "Walwal (Dinka Sorghum Porridge)",
    tribeSlug: "dinka",
    tribeName: "Dinka",
    category: "staple",
    description: "Fermented sorghum porridge, the daily staple of the Dinka people. Nutritious and sustaining.",
    culturalSignificance: "Walwal is central to Dinka daily life. The fermentation process was developed over generations to improve nutrition and preserve food in South Sudan's climate.",
    prepTime: "24 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Sorghum flour", amount: "3 cups" },
      { item: "Water", amount: "6 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Mix sorghum flour with 3 cups water in a large bowl.",
      "Cover and let ferment in warm place for 24-48 hours.",
      "The mixture should smell slightly sour.",
      "Bring remaining 3 cups water to boil.",
      "Gradually add fermented mixture, stirring constantly.",
      "Cook on low heat for 20-30 minutes, stirring frequently.",
      "The porridge should be thick enough to eat with hands.",
      "Serve with milk, meat stew, or vegetables."
    ],
    tips: [
      "Longer fermentation = tangier taste",
      "Stir constantly to prevent lumps",
      "Can be thinned with water for drinking"
    ]
  },

  // ============ TIGRINYA RECIPES ============
  {
    id: "tsebhi-derho",
    name: "Tsebhi Derho (Eritrean Chicken Stew)",
    tribeSlug: "tigrinya",
    tribeName: "Tigrinya",
    category: "special",
    description: "Spiced chicken stew cooked in berbere and niter kibbeh. The celebratory dish of Eritrea.",
    culturalSignificance: "Tsebhi Derho is reserved for holidays, weddings, and special guests. Its preparation is an art passed from mother to daughter.",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Whole chicken", amount: "1", notes: "Cut into 8 pieces" },
      { item: "Onions", amount: "4 large", notes: "Finely chopped" },
      { item: "Berbere spice", amount: "3 tablespoons" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Ginger", amount: "2 inches", notes: "Grated" },
      { item: "Hard-boiled eggs", amount: "6" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Rub chicken with lemon juice and salt, let sit 15 minutes.",
      "In a dry pot, cook onions over medium heat, stirring, until very soft (no oil yet).",
      "Add niter kibbeh and continue cooking until onions are deeply caramelized.",
      "Add berbere, garlic, ginger. Cook 3 minutes, stirring.",
      "Add tomato paste and a little water. Simmer 5 minutes.",
      "Add chicken pieces, turning to coat in sauce.",
      "Add water to half-cover chicken. Bring to boil.",
      "Reduce heat, cover, simmer 45 minutes until chicken is cooked.",
      "Score hard-boiled eggs and add in last 10 minutes.",
      "Serve on injera with eggs."
    ],
    tips: [
      "Dry-cooking onions is essential for the right flavor",
      "Scoring eggs helps them absorb the sauce",
      "Sauce should be thick and coating the chicken"
    ]
  },

  // ============ AFAR RECIPES ============
  {
    id: "lahoh",
    name: "Lahoh (Afar Spongy Bread)",
    tribeSlug: "afar",
    tribeName: "Afar",
    category: "staple",
    description: "Yeast-risen spongy flatbread with many tiny holes. The daily bread of the Afar people.",
    culturalSignificance: "Lahoh is shared at every Afar meal. Its preparation before dawn is a tradition maintained by Afar women across generations.",
    prepTime: "2 hours (rising)",
    cookTime: "20 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "All-purpose flour", amount: "2 cups" },
      { item: "Semolina or corn flour", amount: "1/2 cup" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Sugar", amount: "1 teaspoon" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Warm water", amount: "2.5 cups" }
    ],
    instructions: [
      "Mix flours, yeast, sugar, and salt in a bowl.",
      "Gradually add warm water, whisking to smooth batter.",
      "Cover and let rise in warm place for 2 hours.",
      "Batter should be bubbly and slightly sour-smelling.",
      "Heat a non-stick pan over medium heat.",
      "Pour thin layer of batter, tilting to spread.",
      "Cook until top is covered with holes and set.",
      "Do not flip - cook one side only.",
      "Stack on a plate, serve with honey, stew, or soup."
    ],
    tips: [
      "Lahoh should have many small holes on top",
      "Only cook on one side for proper texture",
      "Serve warm for best taste"
    ]
  },

  // ============ MALAGASY (MADAGASCAR) RECIPES ============
  {
    id: "romazava",
    name: "Romazava",
    tribeSlug: "merina",
    tribeName: "Merina",
    category: "special",
    description: "Madagascar's national dish - a hearty beef and leafy green stew with aromatic brèdes (greens) including paracress.",
    culturalSignificance: "Romazava is served at nearly every important Malagasy occasion, from family gatherings to state functions. The dish represents unity as different greens come together.",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef chunks", amount: "500g", notes: "Zebu meat preferred" },
      { item: "Brèdes mafana (paracress)", amount: "2 cups", notes: "Creates tingling sensation" },
      { item: "Spinach or mustard greens", amount: "3 cups", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 inch", notes: "Grated" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Heat oil in a large pot and brown beef pieces on all sides.",
      "Add onion, garlic, and ginger - cook until fragrant.",
      "Add tomatoes and cook until soft.",
      "Add water to cover meat, bring to boil, then simmer 1 hour until tender.",
      "Add paracress and other greens in stages.",
      "Simmer 15-20 minutes until greens are wilted.",
      "Season with salt and serve over white rice."
    ],
    tips: [
      "Brèdes mafana gives a unique tingling sensation on the tongue",
      "Zebu (Malagasy cattle) meat has distinct flavor but beef works well",
      "Always serve with plenty of rice - Malagasy eat rice at every meal"
    ]
  },
  {
    id: "ravitoto",
    name: "Ravitoto",
    tribeSlug: "merina",
    tribeName: "Merina",
    category: "staple",
    description: "Pounded cassava leaves cooked with pork and coconut, a beloved everyday dish in Madagascar.",
    culturalSignificance: "Ravitoto is comfort food that connects modern Malagasy to their agricultural roots. The labor-intensive pounding of leaves was traditionally communal work.",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava leaves", amount: "1 kg", notes: "Pounded or use frozen" },
      { item: "Pork belly", amount: "500g", notes: "Cubed" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "If using fresh leaves, pound in mortar until fine (or use food processor).",
      "Brown pork pieces in a pot until fat renders.",
      "Add onion and garlic, cook until soft.",
      "Add pounded cassava leaves and stir well.",
      "Pour in coconut milk and add water to cover.",
      "Simmer for 2 hours, stirring occasionally, until leaves are tender.",
      "Season with salt and serve with rice."
    ],
    tips: [
      "Cassava leaves must cook long to remove natural toxins",
      "Pork can be replaced with smoked fish",
      "Frozen pounded cassava leaves save preparation time"
    ]
  },
  {
    id: "koba",
    name: "Koba",
    tribeSlug: "merina",
    tribeName: "Merina",
    category: "snack",
    description: "Traditional Malagasy rice and peanut cake wrapped in banana leaves, a sweet treat sold by street vendors.",
    culturalSignificance: "Koba is associated with celebrations and ceremonies. It's a must-have during the Famadihana (turning of the bones) ancestor ceremony.",
    prepTime: "30 minutes",
    cookTime: "4 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Rice flour", amount: "2 cups" },
      { item: "Ground peanuts", amount: "2 cups" },
      { item: "Brown sugar", amount: "1.5 cups" },
      { item: "Honey", amount: "1/2 cup" },
      { item: "Banana leaves", amount: "Large pieces", notes: "For wrapping" },
      { item: "Water", amount: "As needed" }
    ],
    instructions: [
      "Mix rice flour, ground peanuts, and sugar in a bowl.",
      "Add honey and enough water to make thick paste.",
      "Soften banana leaves over flame.",
      "Spread mixture onto banana leaves, roll into log shape.",
      "Tie securely with string.",
      "Steam for 3-4 hours until firm.",
      "Cool, unwrap, slice, and serve."
    ],
    tips: [
      "Koba gets better after resting overnight",
      "Foil can substitute for banana leaves",
      "The longer it steams, the denser and sweeter it becomes"
    ]
  },

  // ============ TUAREG (SAHARA) RECIPES ============
  {
    id: "tagella",
    name: "Tagella (Tuareg Sand Bread)",
    tribeSlug: "tuareg",
    tribeName: "Tuareg",
    category: "staple",
    description: "Traditional Tuareg bread baked in hot sand and embers in the Sahara Desert.",
    culturalSignificance: "Tagella represents Tuareg ingenuity - baking without ovens in the desert. It's prepared by men, unusual in many cultures where women handle cooking.",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Wheat flour", amount: "3 cups" },
      { item: "Water", amount: "1 cup", notes: "Lukewarm" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Clean sand and embers", amount: "For baking" }
    ],
    instructions: [
      "Mix flour, salt, and water to form stiff dough.",
      "Knead for 10 minutes until smooth.",
      "Form into a flat disc about 2 inches thick.",
      "Rake hot coals aside and dig hole in hot sand.",
      "Place bread in hole, cover with sand and hot embers.",
      "Bake for 30-45 minutes.",
      "Remove, shake off sand, and brush clean.",
      "Break apart and serve with stew or milk."
    ],
    tips: [
      "For home cooking, use a heavy covered pot on stovetop",
      "The bread should sound hollow when tapped",
      "Tuareg traditionally serve this with goat stew or camel milk"
    ]
  },
  {
    id: "tuareg-tea",
    name: "Atay (Tuareg Tea Ceremony)",
    tribeSlug: "tuareg",
    tribeName: "Tuareg",
    category: "beverage",
    description: "The famous three-glass Tuareg tea ceremony - each glass has distinct meaning and flavor.",
    culturalSignificance: "The three glasses represent: 'first glass bitter like life, second glass sweet like love, third glass gentle like death.' Refusing tea is a serious social offense.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Chinese gunpowder green tea", amount: "2 tablespoons" },
      { item: "Fresh mint", amount: "Large bunch" },
      { item: "Sugar", amount: "1/4 to 1/2 cup" },
      { item: "Water", amount: "4 cups" }
    ],
    instructions: [
      "Rinse tea leaves with hot water, discard water.",
      "Add fresh water and tea to teapot.",
      "Boil for 3-5 minutes.",
      "Add sugar and mint.",
      "Pour tea from height into small glasses to create foam.",
      "Pour back into pot and repeat 2-3 times to mix.",
      "Serve first glass (bitter).",
      "Reboil same tea with more sugar for second glass (sweet).",
      "Third brewing with even more sugar and mint (gentle)."
    ],
    tips: [
      "Pouring from height aerates tea and creates prized foam",
      "All three glasses must be drunk - refusing is rude",
      "The ceremony can last 2+ hours - it's about socializing"
    ]
  },
  {
    id: "eghajira",
    name: "Eghajira (Tuareg Cheese)",
    tribeSlug: "tuareg",
    tribeName: "Tuareg",
    category: "staple",
    description: "Traditional dried cheese made from goat or camel milk, essential for Tuareg desert survival.",
    culturalSignificance: "Eghajira can last months without refrigeration - vital for nomadic life. It's often the only protein available during long desert crossings.",
    prepTime: "30 minutes",
    cookTime: "Several days (drying)",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh goat milk", amount: "4 liters" },
      { item: "Rennet or lemon juice", amount: "2 tablespoons" },
      { item: "Salt", amount: "1 tablespoon" }
    ],
    instructions: [
      "Warm milk to body temperature.",
      "Add rennet or lemon juice to curdle.",
      "Let sit until curds form (30 minutes to 2 hours).",
      "Strain through cloth, pressing out whey.",
      "Salt the curds thoroughly.",
      "Form into small rounds or flatten into discs.",
      "Dry in sun for several days, turning regularly.",
      "Store in cloth bags - lasts for months."
    ],
    tips: [
      "The drier the cheese, the longer it lasts",
      "Rehydrate in water or milk before eating",
      "Crumble into porridge or stews for protein"
    ]
  },

  // ============ HIMBA (NAMIBIA) RECIPES ============
  {
    id: "otjize-butter",
    name: "Otjize Butter",
    tribeSlug: "himba",
    tribeName: "Himba",
    category: "special",
    description: "Traditional Himba clarified butter used both as food and mixed with ochre for the famous red skin paste.",
    culturalSignificance: "Butter is sacred to the Himba, processed near the holy fire. Otjize (the red paste) protects skin from harsh sun and insects while symbolizing the earth's red blood.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh cow's milk", amount: "4 liters" },
      { item: "Calabash gourd", amount: "1 large", notes: "For churning" }
    ],
    instructions: [
      "Pour milk into calabash gourd.",
      "Let sit in warm place to sour (24-48 hours).",
      "Shake calabash rhythmically for 20-30 minutes.",
      "Butter will separate and float to top.",
      "Remove butter, wash with cool water.",
      "Heat butter gently to clarify - remove milk solids.",
      "Store clarified butter in cool place.",
      "Mix with red ochre powder to make otjize paste."
    ],
    tips: [
      "Churning is traditionally done by women while singing",
      "Clarified butter keeps longer without refrigeration",
      "The remaining buttermilk is also consumed"
    ]
  },
  {
    id: "oshifima",
    name: "Oshifima (Himba/Herero Porridge)",
    tribeSlug: "himba",
    tribeName: "Himba",
    category: "staple",
    description: "Dense millet or maize porridge that forms the staple food of Himba and Herero peoples.",
    culturalSignificance: "Oshifima is eaten daily, usually with sour milk or meat. It provides essential carbohydrates for the demanding pastoralist lifestyle.",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Mahangu (pearl millet) flour", amount: "2 cups", notes: "Or maize meal" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Bring water to boil in a large pot.",
      "Gradually add flour while stirring constantly to prevent lumps.",
      "Reduce heat and continue stirring.",
      "Add more flour until mixture is very thick and pulls away from pot.",
      "Cover and let steam for 10 minutes.",
      "Turn out onto plate, shape into mound.",
      "Serve with sour milk, meat stew, or vegetables."
    ],
    tips: [
      "The porridge should be stiff enough to eat with hands",
      "Mahangu is more nutritious than maize and drought-resistant",
      "Leftovers can be fried the next day"
    ]
  },
  {
    id: "omakere",
    name: "Omakere (Soured Milk)",
    tribeSlug: "himba",
    tribeName: "Himba",
    category: "beverage",
    description: "Traditional fermented milk that is the primary protein source for Himba pastoralists.",
    culturalSignificance: "Cattle are central to Himba life. Milk and its products define wealth and sustenance. The souring process was a natural preservation method.",
    prepTime: "5 minutes",
    cookTime: "2-3 days (fermentation)",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh cow's milk", amount: "2 liters" },
      { item: "Calabash gourd", amount: "1", notes: "Adds bacteria for fermentation" }
    ],
    instructions: [
      "Pour fresh milk into a cleaned calabash gourd.",
      "Cover and leave in warm place.",
      "Natural bacteria will sour the milk over 2-3 days.",
      "Shake occasionally to mix.",
      "When thick and tangy, it's ready to drink.",
      "Serve cold with oshifima or drink alone."
    ],
    tips: [
      "The calabash imparts unique flavor from previous fermentations",
      "Similar to buttermilk or kefir in taste",
      "Rich in probiotics and easier to digest than fresh milk"
    ]
  },

  // ============ HERERO (NAMIBIA) RECIPES ============
  {
    id: "herero-dried-meat",
    name: "Onyama Yomombambi (Herero Dried Meat)",
    tribeSlug: "herero",
    tribeName: "Herero",
    category: "special",
    description: "Traditional sun-dried beef strips, similar to biltong, a protein source that lasts for months.",
    culturalSignificance: "Dried meat allowed Herero herders to preserve beef without refrigeration. It was essential during seasonal cattle drives and trading journeys.",
    prepTime: "30 minutes",
    cookTime: "3-5 days (drying)",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Beef", amount: "2 kg", notes: "Lean cuts" },
      { item: "Coarse salt", amount: "1/2 cup" },
      { item: "Black pepper", amount: "2 tablespoons" },
      { item: "Coriander seeds", amount: "2 tablespoons", notes: "Crushed" }
    ],
    instructions: [
      "Cut beef along the grain into strips 1-2 inches thick.",
      "Mix salt, pepper, and coriander.",
      "Rub spice mixture thoroughly into meat.",
      "Hang meat strips in dry, shaded area with good airflow.",
      "Let dry for 3-5 days depending on humidity.",
      "Meat should be dry on outside but still slightly soft inside.",
      "Store in cloth bags in cool, dry place."
    ],
    tips: [
      "Fat should be trimmed as it can go rancid",
      "Vinegar can be added to spice rub for extra preservation",
      "Slice thin and eat as snack, or rehydrate in stews"
    ]
  },

  // ============ WOLOF (SENEGAL) RECIPES ============
  {
    id: "thieboudienne",
    name: "Thieboudienne",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "special",
    description: "Senegal's national dish - seasoned fish and rice cooked in tomato sauce with vegetables, invented in Saint-Louis.",
    culturalSignificance: "Thieboudienne was inscribed on UNESCO's intangible heritage list in 2021. It represents Senegalese teranga (hospitality) and is served at every celebration.",
    prepTime: "45 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "White fish (thiof preferred)", amount: "1 kg", notes: "Cleaned, cut in pieces" },
      { item: "Broken rice", amount: "3 cups" },
      { item: "Tomato paste", amount: "1/2 cup" },
      { item: "Onions", amount: "3 large", notes: "Sliced" },
      { item: "Garlic", amount: "1 head", notes: "Made into paste" },
      { item: "Parsley and scallions", amount: "1 bunch each", notes: "For stuffing" },
      { item: "Scotch bonnet", amount: "2", notes: "Whole" },
      { item: "Carrots", amount: "3" },
      { item: "Cabbage", amount: "1/2 head" },
      { item: "Eggplant", amount: "1" },
      { item: "Cassava", amount: "1 piece" },
      { item: "Tamarind", amount: "2 tablespoons" },
      { item: "Fish stock cubes", amount: "2" },
      { item: "Vegetable oil", amount: "1 cup" }
    ],
    instructions: [
      "Make rof (stuffing) by blending parsley, scallions, garlic, pepper.",
      "Cut pockets in fish pieces and stuff with rof.",
      "Fry fish until golden, set aside.",
      "In same oil, fry onions until very dark (this gives color).",
      "Add tomato paste, remaining rof, and fry 10 minutes.",
      "Add water, tamarind, stock cubes, bring to boil.",
      "Add vegetables in order of cooking time (carrots first, cabbage last).",
      "Remove vegetables when cooked, set aside.",
      "Add rice to the sauce, add fish on top.",
      "Cover and steam until rice is cooked, about 25 minutes.",
      "Arrange on large platter: rice base, vegetables around, fish on top."
    ],
    tips: [
      "The burnt rice at the bottom (xoon) is considered the best part",
      "Serve with lime wedges and extra scotch bonnet sauce",
      "Traditionally eaten communally from one large platter"
    ]
  },
  {
    id: "bissap",
    name: "Bissap (Hibiscus Drink)",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "beverage",
    description: "Refreshing deep-red drink made from hibiscus flowers, served at celebrations throughout Senegal.",
    culturalSignificance: "Bissap is the welcome drink of Senegal, offered to guests as a sign of teranga (hospitality). It's believed to have health benefits including lowering blood pressure.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried hibiscus flowers", amount: "2 cups" },
      { item: "Water", amount: "8 cups" },
      { item: "Sugar", amount: "1 cup", notes: "Adjust to taste" },
      { item: "Orange blossom water", amount: "1 tablespoon" },
      { item: "Fresh mint", amount: "1 bunch" },
      { item: "Vanilla extract", amount: "1 teaspoon" }
    ],
    instructions: [
      "Rinse hibiscus flowers to remove dust.",
      "Bring water to boil, add flowers, reduce heat.",
      "Simmer 20-30 minutes until water is deep red.",
      "Strain through fine mesh, pressing flowers to extract color.",
      "Add sugar while hot, stir to dissolve.",
      "Add orange blossom water, vanilla, and mint.",
      "Refrigerate until very cold.",
      "Serve over ice, garnished with fresh mint."
    ],
    tips: [
      "The longer it steeps, the more tart it becomes",
      "Freeze into popsicles for a treat",
      "Add pineapple juice for bissap cocktail"
    ]
  },

  // ============ MANDINKA (GAMBIA/SENEGAL) RECIPES ============
  {
    id: "domoda",
    name: "Domoda (Groundnut Stew)",
    tribeSlug: "mandinka",
    tribeName: "Mandinka",
    category: "special",
    description: "Rich peanut butter stew with meat and vegetables, the signature dish of the Mandinka people.",
    culturalSignificance: "Domoda is the everyday comfort food of Gambia and parts of Senegal. Groundnuts (peanuts) are a major crop, and this dish celebrates that abundance.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or chicken", amount: "500g", notes: "Cubed" },
      { item: "Natural peanut butter", amount: "1 cup" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Scotch bonnet", amount: "1", notes: "Whole" },
      { item: "Sweet potato", amount: "2 medium", notes: "Cubed" },
      { item: "Pumpkin or butternut", amount: "2 cups", notes: "Cubed" },
      { item: "Okra", amount: "1 cup", notes: "Optional" },
      { item: "Oil", amount: "1/4 cup" },
      { item: "Stock cubes", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Brown meat in oil, remove and set aside.",
      "Sauté onion until soft in same pot.",
      "Add tomato paste and fry 5 minutes.",
      "Return meat, add water to cover, simmer until almost tender.",
      "Dissolve peanut butter in some of the broth.",
      "Add peanut butter mixture to pot, stir well.",
      "Add vegetables and whole scotch bonnet.",
      "Simmer until vegetables are tender and sauce is thick.",
      "Remove pepper, serve over white rice."
    ],
    tips: [
      "Use natural peanut butter without added sugar",
      "Don't break the scotch bonnet - it adds flavor without too much heat",
      "The stew should be rich and coating consistency"
    ]
  },

  // ============ BEJA (SUDAN/ERITREA) RECIPES ============
  {
    id: "beja-kisra",
    name: "Kisra",
    tribeSlug: "beja",
    tribeName: "Beja",
    category: "staple",
    description: "Thin sorghum flatbread, a staple across Sudan and the Horn of Africa, similar to Ethiopian injera but thinner.",
    culturalSignificance: "Kisra accompanies every Sudanese meal. The skill of making perfectly thin kisra is passed from mothers to daughters.",
    prepTime: "12 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Sorghum flour", amount: "3 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Starter from previous batch", amount: "1/4 cup", notes: "Or yogurt" }
    ],
    instructions: [
      "Mix flour with water and starter in large bowl.",
      "Cover and let ferment overnight (12-24 hours).",
      "Batter should be thin and bubbly.",
      "Heat a large flat griddle (saj) over medium heat.",
      "Pour thin layer of batter, spreading quickly.",
      "Cook until set and edges lift - do not flip.",
      "Stack cooked kisra on a plate.",
      "Serve with stews, vegetables, or milk."
    ],
    tips: [
      "Save some batter as starter for next batch",
      "The thinner the better - should be almost translucent",
      "Non-stick pan works well if no saj available"
    ]
  },

  // ============ TSWANA (BOTSWANA) RECIPES ============
  {
    id: "seswaa",
    name: "Seswaa",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "special",
    description: "Botswana's national dish - pounded beef cooked until tender enough to shred, served at celebrations.",
    culturalSignificance: "Seswaa is prepared for all important Tswana occasions: weddings, funerals, and national holidays. It's traditionally men's work to pound the meat.",
    prepTime: "15 minutes",
    cookTime: "3-4 hours",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Beef with bones", amount: "2 kg", notes: "Shin or brisket" },
      { item: "Salt", amount: "2 tablespoons" },
      { item: "Water", amount: "To cover" }
    ],
    instructions: [
      "Place beef and bones in large pot, cover with water.",
      "Add salt and bring to boil.",
      "Reduce heat, simmer for 3-4 hours until very tender.",
      "Remove meat from pot, reserve broth.",
      "Remove bones and any excess fat.",
      "Using two forks or wooden spoons, shred and pound meat.",
      "Traditional method uses a wooden pestle in the pot.",
      "Add some reserved broth to keep moist.",
      "Serve with pap (maize porridge) and gravy."
    ],
    tips: [
      "The longer it cooks, the easier to shred",
      "Bones add flavor - cook them with the meat",
      "Should be very soft, almost like pulled pork texture"
    ]
  },

  // ============ SAN (BUSHMEN) RECIPES ============
  {
    id: "mongongo-nuts",
    name: "Mongongo Nut Preparation",
    tribeSlug: "san",
    tribeName: "San",
    category: "staple",
    description: "Traditional method of processing mongongo nuts, the primary plant food of the San people of the Kalahari.",
    culturalSignificance: "Mongongo nuts provide 50% of calories in traditional San diet. The gathering of these nuts was central to San social life and seasonal movement.",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Mongongo nuts", amount: "2 cups", notes: "In shells" },
      { item: "Hot coals", amount: "For roasting" }
    ],
    instructions: [
      "Gather fallen mongongo nuts (ripen March-April).",
      "Crack outer fruit to reveal inner nut.",
      "Roast nuts in hot coals for 30-45 minutes.",
      "Let cool, then crack inner shell with stone.",
      "Remove white kernel inside.",
      "Eat kernels raw, roasted, or pound into flour.",
      "Oil pressed from nuts used for cooking and skin care."
    ],
    tips: [
      "Shells are very hard - requires specific cracking technique",
      "Nuts are highly nutritious - 57% fat, 24% protein",
      "Can substitute with macadamia or cashews for similar taste"
    ]
  },

  // ============ EWE (GHANA/TOGO) RECIPES ============
  {
    id: "akple-fetri",
    name: "Akple with Fetri Detsi",
    tribeSlug: "ewe",
    tribeName: "Ewe",
    category: "staple",
    description: "Soft corn and cassava dough served with mushroom palm nut soup, a signature Ewe dish.",
    culturalSignificance: "Akple is the staple food of the Ewe people. The technique of making smooth, lump-free akple is a mark of a skilled cook.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Corn dough (fermented)", amount: "2 cups" },
      { item: "Cassava dough", amount: "1 cup" },
      { item: "Water", amount: "4 cups" },
      { item: "Palm nut cream", amount: "2 cups" },
      { item: "Fresh mushrooms", amount: "2 cups" },
      { item: "Smoked fish", amount: "200g" },
      { item: "Onion", amount: "1 large" },
      { item: "Tomatoes", amount: "3" },
      { item: "Hot pepper", amount: "To taste" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "For soup: Cook palm nut cream with water for 30 minutes.",
      "Add smoked fish, mushrooms, onion, tomatoes, pepper.",
      "Simmer until thick and oil floats on top.",
      "For akple: Boil water in pot.",
      "Mix corn and cassava doughs together.",
      "Add dough mixture gradually to boiling water, stirring constantly.",
      "Stir vigorously until smooth and pulls from sides.",
      "Wet hands, form balls of akple.",
      "Serve akple balls with fetri detsi soup."
    ],
    tips: [
      "Stir vigorously to prevent lumps",
      "Akple should be soft and slightly stretchy",
      "Palm fruit cream can be found in African grocery stores"
    ]
  },

  // ============ FANG (GABON/CAMEROON) RECIPES ============
  {
    id: "nyembwe-chicken",
    name: "Poulet Nyembwe (Palm Butter Chicken)",
    tribeSlug: "fang",
    tribeName: "Fang",
    category: "special",
    description: "Gabon's national dish - chicken cooked in rich palm fruit sauce, beloved across Central Africa.",
    culturalSignificance: "Nyembwe is served at every important Gabonese celebration. The palm fruit sauce (nyembwe) represents the rainforest abundance of the Fang homeland.",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Whole chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Palm fruit cream/sauce", amount: "400g", notes: "Canned or fresh" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Scotch bonnet", amount: "2", notes: "Whole" },
      { item: "Maggi cubes", amount: "2" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "2 cups" }
    ],
    instructions: [
      "Season chicken with salt, garlic, and Maggi.",
      "Let marinate for 1 hour.",
      "Brown chicken pieces in a large pot.",
      "Add onions and cook until soft.",
      "Add palm fruit cream and water.",
      "Add whole scotch bonnets for flavor.",
      "Cover and simmer for 1 hour until chicken is tender.",
      "Sauce should be thick and orange-red.",
      "Serve with rice, plantains, or cassava."
    ],
    tips: [
      "Don't break the peppers unless you want very spicy",
      "Palm cream separates - stir well before using",
      "The oil should float on top when done"
    ]
  },

  // ============ ASHANTI (GHANA) RECIPES ============
  {
    id: "fufu-ashanti",
    name: "Fufu with Light Soup",
    tribeSlug: "ashanti",
    tribeName: "Ashanti (Asante)",
    category: "staple",
    description: "Pounded cassava and plantain dough served with light tomato-pepper soup - the quintessential Ashanti meal.",
    culturalSignificance: "Fufu is central to Ashanti identity. The rhythmic pounding in wooden mortars is a communal activity that brings families together. It's served at every major celebration.",
    historicalContext: "Fufu has been prepared in the Ashanti Kingdom since the 17th century, when the powerful empire controlled the gold trade. The dish spread across West Africa through Ashanti traders and warriors. The pounding technique is passed down through generations - the rhythm of the pestle is said to connect the living with ancestors.",
    youtubeVideoId: "i_nMyOSvMf8",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava", amount: "1 kg", notes: "Peeled and cubed" },
      { item: "Ripe plantains", amount: "4 large", notes: "Peeled and sliced" },
      { item: "Chicken", amount: "1 whole", notes: "Cut into pieces" },
      { item: "Tomatoes", amount: "6 medium", notes: "Blended" },
      { item: "Onions", amount: "2 large", notes: "Blended" },
      { item: "Scotch bonnet peppers", amount: "3", notes: "Blended" },
      { item: "Ginger", amount: "2 inches", notes: "Blended" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Prekese (Aidan fruit)", amount: "2 pods", notes: "Traditional spice" },
      { item: "Salt and seasoning", amount: "To taste" }
    ],
    instructions: [
      "Boil cassava and plantain until very soft, about 30-40 minutes.",
      "Drain and pound in a mortar until smooth and stretchy.",
      "Alternatively, blend and cook in pot, stirring constantly.",
      "For soup: Season chicken with salt, ginger, onion. Boil until tender.",
      "In separate pot, heat palm oil and add blended tomatoes, peppers, onions.",
      "Add prekese and cook for 15 minutes.",
      "Add cooked chicken and stock. Simmer for 20 minutes.",
      "Mold fufu into balls and serve in bowl with soup poured over."
    ],
    tips: [
      "Fufu should be smooth with no lumps - pounding is key",
      "Swallow fufu without chewing - this is the traditional way",
      "Light soup should be thin enough to drink but flavorful"
    ],
    variations: [
      "Cocoyam fufu is another popular variation",
      "Groundnut soup and palm nut soup are common alternatives"
    ]
  },
  {
    id: "kelewele",
    name: "Kelewele (Spiced Fried Plantains)",
    tribeSlug: "ashanti",
    tribeName: "Ashanti (Asante)",
    category: "snack",
    description: "Ripe plantains seasoned with ginger, cayenne, and spices, then deep-fried until crispy. Ghana's favorite street food.",
    culturalSignificance: "Kelewele is sold by vendors throughout Ghana, especially in the evening. It's often paired with roasted peanuts and serves as both snack and side dish.",
    historicalContext: "Plantains arrived in West Africa from Southeast Asia via Arab and Portuguese traders in the 15th century. The Ashanti adapted them into kelewele, adding indigenous ginger and peppers. The dish became a symbol of Ghanaian street food culture and is now enjoyed internationally.",
    youtubeVideoId: "wy2p3o0ckIM",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Ripe plantains", amount: "4 large", notes: "Should be yellow with black spots" },
      { item: "Fresh ginger", amount: "2 inches", notes: "Grated" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cayenne pepper", amount: "1 teaspoon" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Onion powder", amount: "1/2 teaspoon" },
      { item: "Nutmeg", amount: "1/4 teaspoon" },
      { item: "Vegetable oil", amount: "For frying" }
    ],
    instructions: [
      "Peel plantains and cut into 1-inch cubes.",
      "Mix ginger, garlic, cayenne, salt, onion powder, and nutmeg.",
      "Toss plantain cubes with spice mixture.",
      "Let marinate for 15-30 minutes.",
      "Heat oil to 350°F (175°C).",
      "Fry plantains in batches until golden brown, about 3-4 minutes per side.",
      "Drain on paper towels.",
      "Serve hot with roasted peanuts."
    ],
    tips: [
      "Plantains should be ripe but not too soft",
      "Don't overcrowd the pan - fry in batches",
      "Adjust cayenne to taste"
    ]
  },
  {
    id: "kontomire",
    name: "Kontomire (Cocoyam Leaf Stew)",
    tribeSlug: "ashanti",
    tribeName: "Ashanti (Asante)",
    category: "staple",
    description: "Nutritious stew made from cocoyam leaves, palm oil, and smoked fish. A beloved Ashanti vegetable dish.",
    culturalSignificance: "Kontomire represents the Ashanti connection to the land. The leaves are rich in iron and traditionally given to pregnant women and new mothers.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cocoyam leaves (taro)", amount: "1 kg", notes: "Or substitute with spinach" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned and flaked" },
      { item: "Onions", amount: "2 medium", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Blended" },
      { item: "Scotch bonnet", amount: "2", notes: "Blended" },
      { item: "Egusi (melon seeds)", amount: "1/2 cup", notes: "Ground" },
      { item: "Salt", amount: "To taste" },
      { item: "Dawadawa (locust beans)", amount: "1 tablespoon", notes: "Optional" }
    ],
    instructions: [
      "Wash and chop cocoyam leaves finely.",
      "Boil leaves in salted water for 10 minutes to remove bitterness. Drain.",
      "Heat palm oil and sauté onions until golden.",
      "Add blended tomatoes and peppers. Cook for 10 minutes.",
      "Add cooked leaves and stir well.",
      "Add smoked fish and dawadawa.",
      "Sprinkle in ground egusi and stir.",
      "Simmer for 15 minutes. Adjust seasoning.",
      "Serve with boiled yam, plantain, or rice."
    ],
    tips: [
      "Always boil the leaves first to reduce oxalic acid",
      "Smoked fish adds authentic Ghanaian flavor",
      "Agushi thickens and enriches the stew"
    ]
  },
  {
    id: "nkatie-cake",
    name: "Nkatie Cake (Peanut Brittle)",
    tribeSlug: "ashanti",
    tribeName: "Ashanti (Asante)",
    category: "snack",
    description: "Crunchy peanut and sugar bars, a popular Ghanaian treat sold by market women across Ashanti region.",
    culturalSignificance: "Nkatie cake is a cherished snack passed down through generations. It showcases the Ashanti love for groundnuts, a major crop in Ghana.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 12,
    difficulty: "medium",
    ingredients: [
      { item: "Roasted peanuts", amount: "2 cups", notes: "Skin removed" },
      { item: "Sugar", amount: "1 cup" },
      { item: "Water", amount: "1/4 cup" },
      { item: "Butter", amount: "1 tablespoon" },
      { item: "Salt", amount: "1/4 teaspoon" }
    ],
    instructions: [
      "Spread peanuts on a greased baking sheet.",
      "Combine sugar and water in a heavy pot.",
      "Heat on medium, stirring until sugar dissolves.",
      "Stop stirring and let caramelize to golden brown.",
      "Remove from heat immediately when golden.",
      "Quickly stir in butter and salt.",
      "Pour over peanuts and spread quickly.",
      "Let cool and harden completely.",
      "Break into pieces to serve."
    ],
    tips: [
      "Work fast - caramel hardens quickly",
      "Don't stir once sugar starts caramelizing",
      "Store in airtight container"
    ]
  },

  // ============ MOSSI (BURKINA FASO) RECIPES ============
  {
    id: "to-mossi",
    name: "Tô (Millet Porridge)",
    tribeSlug: "mossi",
    tribeName: "Mossi (Moose)",
    category: "staple",
    description: "Thick millet or sorghum porridge - the foundation of every Mossi meal in Burkina Faso.",
    culturalSignificance: "Tô is sacred to the Mossi people. It represents community and is always shared from a communal bowl. Refusing tô is considered a great insult.",
    prepTime: "5 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet flour", amount: "2 cups", notes: "Or sorghum flour" },
      { item: "Water", amount: "6 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Bring 4 cups water to boil in a heavy pot.",
      "Mix millet flour with remaining 2 cups cold water to form slurry.",
      "Slowly pour slurry into boiling water, stirring constantly.",
      "Reduce heat and cook for 10 minutes, stirring.",
      "Add more flour gradually until very thick.",
      "The tô should be stiff enough to hold its shape.",
      "Cook covered on very low heat for 20 minutes.",
      "Stir vigorously and mold into a smooth dome.",
      "Serve with sauce (baobab leaf, okra, or meat sauce)."
    ],
    tips: [
      "Stirring prevents lumps - use a wooden spatula",
      "Final consistency should be stiffer than polenta",
      "Traditionally eaten by pinching off pieces with fingers"
    ]
  },
  {
    id: "riz-gras-mossi",
    name: "Riz Gras (Fatty Rice)",
    tribeSlug: "mossi",
    tribeName: "Mossi (Moose)",
    category: "special",
    description: "Celebratory one-pot rice with vegetables and meat, cooked in rich tomato sauce. Burkina Faso's festive dish.",
    culturalSignificance: "Riz Gras is reserved for special occasions - weddings, naming ceremonies, and holidays. It represents prosperity and abundance in Mossi culture.",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Long-grain rice", amount: "3 cups" },
      { item: "Beef or lamb", amount: "500g", notes: "Cubed" },
      { item: "Tomato paste", amount: "4 tablespoons" },
      { item: "Tomatoes", amount: "4 medium", notes: "Chopped" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Carrots", amount: "2", notes: "Diced" },
      { item: "Cabbage", amount: "1/4 head", notes: "Shredded" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Bay leaves", amount: "2" },
      { item: "Maggi cubes", amount: "2" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season meat with salt, pepper, and 1 Maggi cube.",
      "Brown meat in oil and set aside.",
      "In same pot, sauté onions until golden.",
      "Add garlic, tomato paste, and fresh tomatoes.",
      "Cook until tomatoes break down, about 10 minutes.",
      "Return meat to pot with 4 cups water.",
      "Add bay leaves and simmer until meat is tender.",
      "Add washed rice, carrots, and cabbage.",
      "Add more water if needed (liquid should cover rice by 1 inch).",
      "Cover tightly and cook on low until rice is done.",
      "Fluff and serve with extra vegetables on top."
    ],
    tips: [
      "The dish should be oily - 'gras' means fatty",
      "Don't open lid while rice cooks",
      "Leftovers taste even better the next day"
    ]
  },
  {
    id: "zoom-koom",
    name: "Zoom-Koom (Millet Drink)",
    tribeSlug: "mossi",
    tribeName: "Mossi (Moose)",
    category: "beverage",
    description: "Refreshing millet flour drink sweetened with sugar and flavored with ginger. Essential hydration during Burkina Faso's hot season.",
    culturalSignificance: "Zoom-koom is offered to guests as a welcome drink and sold widely on streets. It provides quick energy and is believed to have cooling properties.",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Millet flour", amount: "1/2 cup" },
      { item: "Water", amount: "4 cups", notes: "Cold" },
      { item: "Sugar", amount: "1/4 cup" },
      { item: "Fresh ginger", amount: "2 inches", notes: "Grated" },
      { item: "Vanilla extract", amount: "1 teaspoon", notes: "Optional" },
      { item: "Ice cubes", amount: "As needed" }
    ],
    instructions: [
      "Mix millet flour with 1 cup water to form paste.",
      "Add remaining water and stir well.",
      "Strain through fine sieve to remove lumps.",
      "Add grated ginger and its juice.",
      "Stir in sugar until dissolved.",
      "Add vanilla if using.",
      "Chill thoroughly or serve over ice.",
      "Stir before serving as flour settles."
    ],
    tips: [
      "Adjust sugar to taste - some prefer very sweet",
      "Ginger quantity can be increased for more kick",
      "Best consumed same day"
    ]
  },

  // ============ ADDITIONAL SHONA (ZIMBABWE) RECIPES ============
  {
    id: "dovi",
    name: "Dovi (Peanut Butter Stew)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "special",
    description: "Rich peanut butter stew with chicken or vegetables - Zimbabwe's most beloved comfort food.",
    culturalSignificance: "Dovi represents the creativity of Shona cuisine, transforming humble peanuts into a luxurious dish. It's served at family gatherings and celebrations.",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Chicken", amount: "1 kg", notes: "Cut into pieces" },
      { item: "Peanut butter", amount: "1 cup", notes: "Natural, unsweetened" },
      { item: "Tomatoes", amount: "4 medium", notes: "Chopped" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Greens (rape/collards)", amount: "2 cups", notes: "Chopped" },
      { item: "Water", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Season chicken with salt and brown in oil.",
      "Add onions and cook until soft.",
      "Add tomatoes and cook until broken down.",
      "Mix peanut butter with water until smooth.",
      "Pour peanut mixture into pot.",
      "Stir well and bring to simmer.",
      "Cover and cook for 30 minutes until chicken is tender.",
      "Add greens in last 5 minutes.",
      "Serve hot with sadza."
    ],
    tips: [
      "Use natural peanut butter for best flavor",
      "Stir occasionally to prevent sticking",
      "Vegetarian version with beans is equally delicious"
    ]
  },
  {
    id: "mutakura",
    name: "Mutakura (Mixed Legume Stew)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Hearty stew of mixed beans, maize, and groundnuts - traditional Shona farm food packed with protein.",
    culturalSignificance: "Mutakura was everyday fare for Shona farmers, providing energy for hard agricultural work. It represents self-sufficiency and the bounty of the land.",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried maize", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Cowpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Bambara nuts", amount: "1/2 cup", notes: "Soaked overnight" },
      { item: "Peanuts (raw)", amount: "1/2 cup" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak maize, cowpeas, and bambara nuts overnight.",
      "Drain and place in large pot with fresh water.",
      "Bring to boil, then reduce heat.",
      "Simmer for 1.5-2 hours until all legumes are soft.",
      "Add peanuts in last 30 minutes.",
      "Season with salt.",
      "Serve as main dish or side.",
      "Leftovers can be mashed."
    ],
    tips: [
      "Adding baking soda softens legumes faster",
      "Cook until very soft - no crunch should remain",
      "Traditionally cooked in clay pots over fire"
    ]
  },
  {
    id: "maheu",
    name: "Maheu (Fermented Maize Drink)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "beverage",
    description: "Thick fermented maize beverage with slightly sour, refreshing taste. Zimbabwe's traditional energy drink.",
    culturalSignificance: "Maheu has been a Shona drink for centuries, providing energy to workers and travelers. It's considered both food and drink.",
    prepTime: "20 minutes",
    cookTime: "30 minutes + 1 day fermentation",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Maize meal", amount: "1 cup" },
      { item: "Malt (maputi)", amount: "2 tablespoons" },
      { item: "Water", amount: "8 cups" },
      { item: "Sugar", amount: "1/2 cup", notes: "To taste" }
    ],
    instructions: [
      "Boil 6 cups water in a pot.",
      "Mix maize meal with 2 cups cold water.",
      "Gradually add to boiling water, stirring constantly.",
      "Cook until thick like porridge, about 15 minutes.",
      "Remove from heat and let cool to lukewarm.",
      "Stir in malt - this starts fermentation.",
      "Cover and leave at room temperature for 24-48 hours.",
      "Stir in sugar when ready to serve.",
      "Strain if desired. Serve cold or at room temperature."
    ],
    tips: [
      "Fermentation time affects sourness - longer is more sour",
      "Keep covered but not airtight during fermentation",
      "Refrigerate after fermentation to stop the process"
    ]
  },

  // ============ ADDITIONAL SWAHILI SEAFOOD RECIPES ============
  {
    id: "samaki-wa-kupaka",
    name: "Samaki wa Kupaka (Coconut Fish)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Grilled fish basted with rich coconut-turmeric sauce - a signature Swahili coastal dish from Mombasa and Lamu.",
    culturalSignificance: "This dish showcases the Swahili mastery of blending African, Arab, and Indian flavors. It's a must-have at coastal celebrations.",
    prepTime: "30 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Whole red snapper or tilapia", amount: "2 medium", notes: "Cleaned and scored" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Tamarind paste", amount: "2 tablespoons" },
      { item: "Turmeric powder", amount: "1 teaspoon" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Fresh ginger", amount: "1 inch", notes: "Grated" },
      { item: "Green chilies", amount: "2", notes: "Sliced" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Score both sides of fish with deep diagonal cuts.",
      "Rub with salt, turmeric, and lemon juice. Marinate 30 minutes.",
      "Grill or broil fish until half-cooked, about 10 minutes.",
      "Meanwhile, simmer coconut milk with garlic, ginger, and tamarind.",
      "Cook sauce until slightly thickened, about 10 minutes.",
      "Brush fish generously with coconut sauce.",
      "Continue grilling, basting frequently, until fish is cooked through.",
      "Serve with remaining sauce poured over.",
      "Garnish with fresh chilies."
    ],
    tips: [
      "Don't overcook the fish - it should be moist",
      "Charcoal grilling adds authentic smoky flavor",
      "Serve with coconut rice (wali wa nazi)"
    ]
  },
  {
    id: "pweza-wa-nazi",
    name: "Pweza wa Nazi (Octopus in Coconut)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Tender octopus slow-cooked in spiced coconut sauce - a Zanzibar specialty prized by coastal Swahili communities.",
    culturalSignificance: "Octopus is a delicacy in Swahili cuisine, especially in Zanzibar where women dive for it. This dish reflects the bounty of the Indian Ocean.",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 4,
    difficulty: "hard",
    ingredients: [
      { item: "Octopus", amount: "1 kg", notes: "Cleaned and tenderized" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Onions", amount: "2 medium", notes: "Sliced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Cumin powder", amount: "1 teaspoon" },
      { item: "Coriander powder", amount: "1 teaspoon" },
      { item: "Turmeric", amount: "1/2 teaspoon" },
      { item: "Cardamom pods", amount: "4" },
      { item: "Fresh coriander", amount: "For garnish" }
    ],
    instructions: [
      "Tenderize octopus by beating with mallet or freezing overnight.",
      "Boil octopus in salted water for 45 minutes until tender.",
      "Cut into bite-sized pieces.",
      "Sauté onions until golden in a separate pot.",
      "Add garlic, tomatoes, and all spices.",
      "Cook until tomatoes break down.",
      "Add coconut milk and bring to simmer.",
      "Add octopus pieces and cook for 20 minutes.",
      "Garnish with fresh coriander.",
      "Serve with ugali or chapati."
    ],
    tips: [
      "Octopus must be tenderized or it will be rubbery",
      "Test tenderness with fork before cutting",
      "The sauce should be creamy and rich"
    ]
  },
  {
    id: "kamba-wa-nazi",
    name: "Kamba wa Nazi (Prawns in Coconut)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Jumbo prawns in creamy coconut curry with coastal spices - a luxurious Swahili seafood dish from Malindi.",
    culturalSignificance: "Prawns represent the wealth of Swahili coastal trade. This dish is served at important celebrations and to honor special guests.",
    prepTime: "20 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Jumbo prawns", amount: "500g", notes: "Cleaned, deveined, shells on" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 inch", notes: "Grated" },
      { item: "Curry powder", amount: "1 tablespoon" },
      { item: "Turmeric", amount: "1/2 teaspoon" },
      { item: "Fresh lime juice", amount: "2 tablespoons" },
      { item: "Fresh coriander", amount: "For garnish" }
    ],
    instructions: [
      "Season prawns with salt, turmeric, and lime juice.",
      "Sauté onion until soft in coconut oil.",
      "Add garlic and ginger, cook for 1 minute.",
      "Add tomatoes and curry powder.",
      "Cook until tomatoes break down, about 5 minutes.",
      "Pour in coconut milk and bring to simmer.",
      "Add prawns and cook for 5-7 minutes until pink.",
      "Don't overcook - prawns should be just done.",
      "Garnish with coriander.",
      "Serve immediately with wali (coconut rice)."
    ],
    tips: [
      "Shells add flavor but can be removed if preferred",
      "Fresh prawns are essential - frozen work but aren't as sweet",
      "Add a squeeze of lime before serving"
    ]
  },
  {
    id: "wali-wa-nazi",
    name: "Wali wa Nazi (Coconut Rice)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "staple",
    description: "Fragrant rice cooked in rich coconut milk - the perfect accompaniment to Swahili seafood and curries.",
    culturalSignificance: "Wali wa nazi is the foundation of Swahili coastal cuisine, reflecting the abundance of coconut palms along the East African coast.",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Basmati rice", amount: "2 cups" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Water", amount: "1 cup" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Cardamom pods", amount: "3", notes: "Optional" }
    ],
    instructions: [
      "Wash rice until water runs clear.",
      "Combine coconut milk and water in pot.",
      "Add salt and cardamom if using.",
      "Bring to boil, then add rice.",
      "Stir once and reduce to lowest heat.",
      "Cover tightly and cook for 18-20 minutes.",
      "Don't open lid during cooking.",
      "Remove from heat and let stand 5 minutes.",
      "Fluff with fork and remove cardamom pods."
    ],
    tips: [
      "Use full-fat coconut milk for best results",
      "A tight-fitting lid is essential",
      "Rice should be fluffy, not mushy"
    ]
  },

  // ============ CHEWA (MALAWI) RECIPES ============
  {
    id: "nsima",
    name: "Nsima",
    tribeSlug: "chewa",
    tribeName: "Chewa",
    category: "staple",
    description: "Malawi's national dish - thick maize porridge eaten with every meal. The heart of Chewa cuisine.",
    culturalSignificance: "Nsima is sacred to the Chewa people. The saying 'Nsima ndi moyo' (Nsima is life) reflects its central role. It's eaten with the right hand only, as a sign of respect.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "White maize flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Bring water to boil in a heavy pot.",
      "Make paste with 1/2 cup flour and cold water.",
      "Add paste to boiling water, stirring constantly.",
      "Reduce heat and cook for 5 minutes.",
      "Gradually add remaining flour, stirring vigorously with wooden spoon.",
      "Keep stirring until very thick and pulls away from sides.",
      "Cover and steam for 10 minutes on low heat.",
      "Wet hands and mold into smooth ball.",
      "Serve with ndiwo (relish)."
    ],
    tips: [
      "Stirring is hard work but essential",
      "Final nsima should be stiff enough to hold shape",
      "Eat by pinching off pieces and dipping in relish"
    ]
  },
  {
    id: "chambo",
    name: "Chambo (Lake Malawi Cichlid)",
    tribeSlug: "chewa",
    tribeName: "Chewa",
    category: "special",
    description: "Grilled or fried chambo fish from Lake Malawi - the most prized fish dish in Malawi.",
    culturalSignificance: "Chambo is Malawi's national fish and a source of great pride. It's served at important occasions and represents the blessing of Lake Malawi.",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Whole chambo (or tilapia)", amount: "2 medium", notes: "Cleaned" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Black pepper", amount: "1 teaspoon" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Garlic powder", amount: "1 teaspoon" },
      { item: "Vegetable oil", amount: "For frying or grilling" }
    ],
    instructions: [
      "Score fish with diagonal cuts on both sides.",
      "Mix salt, pepper, garlic, and lemon juice.",
      "Rub seasoning inside and outside fish.",
      "Let marinate for 15 minutes.",
      "For frying: Heat oil and fry until golden, 7-8 minutes per side.",
      "For grilling: Oil grill and cook over medium coals, 8-10 minutes per side.",
      "Fish is done when flesh flakes easily.",
      "Serve with nsima and vegetable relish."
    ],
    tips: [
      "Fresh chambo from the lake is incomparable",
      "Don't over-handle fish on grill - let it char slightly",
      "Serve immediately for best texture"
    ]
  },
  {
    id: "nthochi",
    name: "Nthochi (Plantain Porridge)",
    tribeSlug: "chewa",
    tribeName: "Chewa",
    category: "staple",
    description: "Sweet plantain porridge, a traditional Chewa breakfast that provides energy for the day's work.",
    culturalSignificance: "Nthochi is comfort food for the Chewa, often given to children and the elderly. It represents the nurturing aspect of Chewa culture.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Ripe plantains", amount: "4 large", notes: "Very ripe, almost black" },
      { item: "Water", amount: "3 cups" },
      { item: "Sugar", amount: "2 tablespoons", notes: "Optional" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Peel plantains and cut into chunks.",
      "Boil in water until very soft, about 15 minutes.",
      "Mash thoroughly with wooden spoon.",
      "Add more water if needed for porridge consistency.",
      "Add salt and sugar to taste.",
      "Simmer for 5 more minutes, stirring.",
      "Serve warm as breakfast or snack."
    ],
    tips: [
      "Riper plantains are sweeter - may not need sugar",
      "Can add groundnut flour for extra protein",
      "Consistency should be like thick porridge"
    ]
  },
  {
    id: "masamba",
    name: "Masamba (Pumpkin Leaves)",
    tribeSlug: "chewa",
    tribeName: "Chewa",
    category: "staple",
    description: "Sautéed pumpkin leaves with tomatoes and groundnuts - a nutritious Chewa vegetable dish.",
    culturalSignificance: "Masamba represents the Chewa farming tradition of using every part of the pumpkin plant. It's rich in nutrients and widely consumed.",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Pumpkin leaves", amount: "1 kg", notes: "Washed and chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Groundnut flour", amount: "3 tablespoons" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Boil pumpkin leaves in salted water for 5 minutes. Drain.",
      "Heat oil in pan and sauté onion until soft.",
      "Add tomatoes and cook until broken down.",
      "Add cooked pumpkin leaves.",
      "Mix groundnut flour with a little water.",
      "Stir groundnut mixture into vegetables.",
      "Cook for 10 minutes until thick.",
      "Season with salt.",
      "Serve with nsima."
    ],
    tips: [
      "Young tender leaves are best",
      "Groundnut flour makes the dish creamy",
      "Can substitute with spinach if needed"
    ]
  },

  // ============ LUHYA (KENYA) RECIPES ============
  {
    id: "ingokho",
    name: "Ingokho (Luhya Chicken)",
    tribeSlug: "luhya",
    tribeName: "Luhya",
    category: "special",
    description: "Traditional Luhya free-range chicken, boiled and served with ugali. The ultimate celebration dish of Western Kenya.",
    culturalSignificance: "Ingokho is central to Luhya hospitality - no important guest leaves without being served chicken. It's mandatory at weddings, funerals, and family gatherings.",
    historicalContext: "The Luhya have raised indigenous chickens for centuries. During colonial times, Luhya chicken became famous across Kenya as Luhya migrant workers brought their cooking traditions to urban areas. The dish symbolizes Luhya generosity.",
    prepTime: "20 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Free-range chicken", amount: "1 whole", notes: "Cut into pieces" },
      { item: "Onions", amount: "3 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "4 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "For boiling" }
    ],
    instructions: [
      "Clean chicken thoroughly with salt and lemon.",
      "Place chicken pieces in a large pot with water to cover.",
      "Add sliced onions and salt.",
      "Bring to boil, then reduce heat and simmer for 1.5-2 hours.",
      "The chicken should be very tender and falling off the bone.",
      "In the last 20 minutes, add tomatoes if desired.",
      "Serve hot with ugali and traditional vegetables (tsimboka)."
    ],
    tips: [
      "Free-range (kienyeji) chicken is essential - it has more flavor",
      "Don't rush - slow cooking is the secret",
      "The broth is prized and served separately or with ugali"
    ]
  },
  {
    id: "tsimboka",
    name: "Tsimboka (Luhya Leafy Greens)",
    tribeSlug: "luhya",
    tribeName: "Luhya",
    category: "staple",
    description: "Traditional Luhya preparation of leafy greens like mrenda (jute mallow), kunde, or managu cooked with onions.",
    culturalSignificance: "Tsimboka is everyday Luhya food, representing the agricultural abundance of Western Kenya. Different greens have different seasonal availability.",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Mrenda or spinach", amount: "500g", notes: "Washed and chopped" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Cooking oil", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Heat oil in a pan and sauté onions until soft.",
      "Add tomatoes and cook until broken down.",
      "Add the leafy greens and stir.",
      "Cover and cook for 10-15 minutes until tender.",
      "Season with salt.",
      "Serve with ugali."
    ],
    tips: [
      "Don't overcook - greens should retain some color",
      "Some add milk for creaminess",
      "Mrenda becomes slimy when cooked - this is normal"
    ]
  },

  // ============ KAMBA (KENYA) RECIPES ============
  {
    id: "muthokoi",
    name: "Muthokoi (Kamba Dehulled Maize)",
    tribeSlug: "kamba",
    tribeName: "Kamba",
    category: "staple",
    description: "Traditional Kamba dish of dehulled maize cooked with beans or cowpeas. Similar to githeri but with processed maize.",
    culturalSignificance: "Muthokoi represents Kamba agricultural heritage. The dehulling process was traditionally done by women using wooden mortars, a skill passed through generations.",
    historicalContext: "The Kamba were famous long-distance traders, and muthokoi was ideal travel food - nutritious and long-lasting. It sustained traders on journeys from the coast to the interior.",
    prepTime: "8 hours (soaking)",
    cookTime: "3 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dehulled maize (muthokoi)", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Beans or cowpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Drain soaked muthokoi and beans.",
      "Place in pot with fresh water (cover by 3 inches).",
      "Boil for 2-3 hours until very soft.",
      "In separate pan, sauté onions and tomatoes.",
      "Add to cooked muthokoi and mix well.",
      "Season with salt and simmer for 10 more minutes."
    ],
    tips: [
      "Muthokoi takes longer to cook than regular maize",
      "Can add potatoes or pumpkin for variation",
      "Leftovers can be mashed for a different texture"
    ]
  },
  {
    id: "kilangua",
    name: "Kilangua (Kamba Dried Meat)",
    tribeSlug: "kamba",
    tribeName: "Kamba",
    category: "special",
    description: "Traditional Kamba dried meat, similar to biltong, preserved with salt and sun-dried.",
    culturalSignificance: "Kilangua was essential for Kamba traders on long journeys. It's now a delicacy served at celebrations and represents the Kamba entrepreneurial spirit.",
    prepTime: "30 minutes + 3 days drying",
    cookTime: "20 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Beef", amount: "1 kg", notes: "Lean cuts, sliced thin" },
      { item: "Coarse salt", amount: "3 tablespoons" },
      { item: "Black pepper", amount: "1 teaspoon" },
      { item: "Coriander", amount: "1 teaspoon", notes: "Ground" }
    ],
    instructions: [
      "Cut beef into thin strips along the grain.",
      "Mix salt, pepper, and coriander.",
      "Rub spice mixture into all meat strips.",
      "Hang strips in a dry, ventilated area for 3-5 days.",
      "Meat should be dark and dry but slightly flexible.",
      "To serve, fry briefly in oil or rehydrate in stew."
    ],
    tips: [
      "Protect from flies during drying",
      "In humid weather, use an oven on lowest setting",
      "Stores for months in airtight container"
    ]
  },

  // ============ KALENJIN (KENYA) RECIPES ============
  {
    id: "mursik",
    name: "Mursik (Kalenjin Fermented Milk)",
    tribeSlug: "kalenjin",
    tribeName: "Kalenjin",
    category: "beverage",
    description: "Traditional fermented milk stored in a specially treated gourd, giving it a distinctive smoky flavor.",
    culturalSignificance: "Mursik is sacred to the Kalenjin. It's used in blessings, given to warriors and athletes, and served at all important occasions. Marathon champions attribute their success to mursik.",
    historicalContext: "The Kalenjin have been pastoralists for millennia. The mursik gourd (sotet) is treated with charcoal from specific trees (sosiot), giving the milk its unique flavor. This tradition dates back centuries.",
    prepTime: "5 minutes + 3-5 days fermentation",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh whole milk", amount: "1 liter" },
      { item: "Gourd (sotet)", amount: "1", notes: "Traditionally prepared" },
      { item: "Charcoal (sosiot wood)", amount: "Small piece", notes: "For coating gourd" }
    ],
    instructions: [
      "Traditionally, prepare the gourd by coating inside with hot charcoal ash.",
      "Pour fresh milk into the prepared gourd.",
      "Cover and leave in a warm place for 3-5 days.",
      "Shake occasionally to distribute the culture.",
      "Mursik is ready when thick with a smoky, tangy flavor.",
      "Serve cold or at room temperature."
    ],
    tips: [
      "Modern method: add a pinch of activated charcoal to yogurt culture",
      "The smoky flavor is distinctive and can be acquired",
      "Mursik is high in probiotics and protein"
    ]
  },
  {
    id: "kimyet",
    name: "Kimyet (Kalenjin Meat Stew)",
    tribeSlug: "kalenjin",
    tribeName: "Kalenjin",
    category: "special",
    description: "Traditional Kalenjin meat stew slow-cooked with local vegetables and served with ugali.",
    culturalSignificance: "Kimyet is prepared for warriors and athletes for strength. The Kalenjin believe meat and milk are essential for producing world-class runners.",
    prepTime: "20 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Goat or beef", amount: "1 kg", notes: "With bone" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Potatoes", amount: "4 medium", notes: "Cubed" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "4 cups" }
    ],
    instructions: [
      "Brown meat pieces in a little oil.",
      "Add onions and cook until soft.",
      "Add tomatoes and cook until broken down.",
      "Add water and bring to boil.",
      "Reduce heat and simmer for 1.5 hours until meat is tender.",
      "Add potatoes and cook for another 20 minutes.",
      "Season with salt and serve with ugali."
    ],
    tips: [
      "Bone-in meat adds more flavor to the stew",
      "Some add indigenous vegetables like terere",
      "Slow cooking is essential for tender meat"
    ]
  },

  // ============ KISII (KENYA) RECIPES ============
  {
    id: "chinsaga",
    name: "Chinsaga (Kisii Leafy Greens)",
    tribeSlug: "kisii",
    tribeName: "Kisii (Gusii)",
    category: "staple",
    description: "Traditional Kisii vegetable dish featuring local greens cooked with onions and tomatoes, often with sour milk.",
    culturalSignificance: "Chinsaga is everyday Kisii food, representing the fertile Kisii highlands. The addition of sour milk (mabere) is distinctly Kisii.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Traditional greens (spider plant, amaranth)", amount: "500g", notes: "Washed" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Sour milk (mabere)", amount: "1/2 cup", notes: "Optional" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Sauté onions in oil until soft.",
      "Add tomatoes and cook until broken down.",
      "Add leafy greens and stir well.",
      "Cover and cook for 15 minutes.",
      "Add sour milk if using and stir.",
      "Season with salt and serve with ugali."
    ],
    tips: [
      "Spider plant (saget) is the most traditional choice",
      "The sour milk adds a creamy, tangy flavor",
      "Don't overcook - greens should be tender but not mushy"
    ]
  },
  {
    id: "obokima",
    name: "Obokima (Kisii Finger Millet Ugali)",
    tribeSlug: "kisii",
    tribeName: "Kisii (Gusii)",
    category: "staple",
    description: "Dark brown ugali made from finger millet flour, a nutritious traditional Kisii staple.",
    culturalSignificance: "Obokima is considered more nutritious than white ugali. It was the original staple before maize became dominant and is still preferred by many Kisii elders.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Finger millet flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Bring water to boil.",
      "Make a paste with 1/2 cup flour and cold water.",
      "Stir paste into boiling water.",
      "Cook for 5 minutes, stirring constantly.",
      "Gradually add remaining flour, stirring vigorously.",
      "Cook until very thick and pulls from sides.",
      "Cover and steam for 15 minutes."
    ],
    tips: [
      "Finger millet ugali is darker and denser than maize ugali",
      "It has a slightly earthy, nutty flavor",
      "Excellent paired with sour milk"
    ]
  },

  // ============ BAGANDA (UGANDA) RECIPES ============
  {
    id: "matooke",
    name: "Matooke (Steamed Green Bananas)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "staple",
    description: "Steamed and mashed green bananas, the staple food of the Baganda people and Uganda's national dish.",
    culturalSignificance: "Matooke is central to Baganda identity. A meal without matooke is not considered complete. It's wrapped in banana leaves for cooking and serving.",
    historicalContext: "Bananas arrived in East Africa from Southeast Asia over 2,000 years ago. The Baganda developed over 80 varieties and built their civilization around banana cultivation. The Buganda Kingdom's prosperity was tied to banana harvests.",
    youtubeVideoId: "tG8G3zZfDKo",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green cooking bananas (matooke)", amount: "10-12", notes: "Unripe" },
      { item: "Banana leaves", amount: "Several", notes: "For wrapping" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Peel green bananas carefully (sap stains).",
      "Wrap peeled bananas in banana leaves.",
      "Place a layer of banana leaves in a large pot.",
      "Add wrapped bananas and more leaves on top.",
      "Add water to the pot (not touching bananas).",
      "Cover tightly and steam for 45-60 minutes.",
      "Mash through the leaves until smooth.",
      "Serve with groundnut sauce or meat stew."
    ],
    tips: [
      "Use gloves when peeling - the sap is sticky",
      "The banana leaves add flavor and moisture",
      "Should be smooth with no lumps when mashed"
    ]
  },
  {
    id: "groundnut-sauce",
    name: "Ebinyebwa (Groundnut Sauce)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "special",
    description: "Rich peanut sauce that accompanies matooke. The most beloved sauce in Ugandan cuisine.",
    culturalSignificance: "No matooke is complete without groundnut sauce. It's served at every important occasion and is considered essential for proper Baganda hospitality.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Groundnut paste", amount: "1 cup", notes: "Or natural peanut butter" },
      { item: "Tomatoes", amount: "3 medium", notes: "Blended" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Water", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Sauté onion until golden.",
      "Add blended tomatoes and cook for 10 minutes.",
      "Mix groundnut paste with water until smooth.",
      "Add to the pot and stir well.",
      "Simmer for 20 minutes, stirring often.",
      "Sauce should be thick and creamy.",
      "Season with salt and serve over matooke."
    ],
    tips: [
      "Natural peanut butter works if groundnut paste unavailable",
      "Stir constantly to prevent burning",
      "Can add vegetables or meat"
    ]
  },

  // ============ NDEBELE (ZIMBABWE) RECIPES ============
  {
    id: "isitshwala",
    name: "Isitshwala (Ndebele Thick Porridge)",
    tribeSlug: "ndebele",
    tribeName: "Ndebele",
    category: "staple",
    description: "The Ndebele version of thick maize porridge, essential to every meal. Similar to Shona sadza but with distinct preparation.",
    culturalSignificance: "Isitshwala is the foundation of Ndebele cuisine. It's said that a true Ndebele can prepare perfect isitshwala - smooth, thick, and without lumps.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Boil water in a heavy pot.",
      "Mix some flour with cold water to make paste.",
      "Add paste to boiling water, stirring constantly.",
      "Cook for 5 minutes until bubbling.",
      "Gradually add more flour, stirring vigorously.",
      "Cook until very stiff and pulling from pot.",
      "Cover and steam for 10 minutes."
    ],
    tips: [
      "A wooden spoon (uphini) is traditional",
      "No lumps should remain",
      "Serve with umhluzi (gravy) or vegetables"
    ]
  },
  {
    id: "umhluzi",
    name: "Umhluzi (Ndebele Meat Gravy)",
    tribeSlug: "ndebele",
    tribeName: "Ndebele",
    category: "special",
    description: "Rich meat-based gravy that accompanies isitshwala. The essential protein addition to every Ndebele meal.",
    culturalSignificance: "Umhluzi represents the cattle-keeping heritage of the Ndebele. Meat is valued and prepared with care for maximum flavor.",
    prepTime: "15 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or goat", amount: "500g", notes: "Cubed" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "3 cups" }
    ],
    instructions: [
      "Brown meat in a little oil.",
      "Add onions and cook until soft.",
      "Add tomatoes and cook down.",
      "Add water and bring to boil.",
      "Reduce heat and simmer for 1-1.5 hours.",
      "The gravy should be rich and flavorful.",
      "Season with salt and serve over isitshwala."
    ],
    tips: [
      "The longer you cook, the richer the flavor",
      "Some add potatoes or pumpkin",
      "Save the bones for extra flavor"
    ]
  },

  // ============ BEMBA (ZAMBIA) RECIPES ============
  {
    id: "nshima",
    name: "Nshima (Bemba Thick Porridge)",
    tribeSlug: "bemba",
    tribeName: "Bemba",
    category: "staple",
    description: "Zambia's staple food - thick maize porridge eaten with every meal. The Bemba consider it the only 'real' food.",
    culturalSignificance: "The Bemba say 'We haven't eaten' if a meal doesn't include nshima. It's the center of Zambian food culture and identity.",
    historicalContext: "Before maize, the Bemba ate finger millet porridge (ubwali). When maize arrived, nshima became dominant. The Bemba maintain that their nshima preparation is the finest in Zambia.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "White maize meal (mealie meal)", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Bring water to boil in a heavy pot.",
      "Make a thin paste with 1/2 cup flour and cold water.",
      "Stir paste into boiling water.",
      "Cook for 5 minutes, stirring constantly.",
      "Gradually add remaining flour while stirring.",
      "Cook until very thick and smooth.",
      "Cover and steam for 10 minutes.",
      "Mold into serving portions."
    ],
    tips: [
      "Continuous stirring prevents lumps",
      "Should be thick enough to mold",
      "Eat with right hand, pinching off pieces"
    ]
  },
  {
    id: "ifisashi",
    name: "Ifisashi (Bemba Greens in Peanut Sauce)",
    tribeSlug: "bemba",
    tribeName: "Bemba",
    category: "staple",
    description: "Leafy greens cooked in a rich groundnut sauce - the most popular vegetable dish in Zambia.",
    culturalSignificance: "Ifisashi is daily food for most Zambians. The combination of greens and groundnuts provides complete protein, essential for Bemba farmers.",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Leafy greens (rape, pumpkin leaves)", amount: "500g", notes: "Chopped" },
      { item: "Groundnut powder", amount: "1/2 cup" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Boil greens in salted water for 5 minutes. Drain.",
      "Sauté onion and tomatoes until soft.",
      "Add cooked greens.",
      "Mix groundnut powder with a little water.",
      "Stir groundnut mixture into vegetables.",
      "Simmer for 15 minutes until thick.",
      "Season with salt and serve with nshima."
    ],
    tips: [
      "Groundnut paste can substitute for powder",
      "Don't add too much water - should be thick",
      "Great vegetarian protein source"
    ]
  },

  // ============ AKAN (GHANA) RECIPES ============
  {
    id: "banku",
    name: "Banku (Fermented Corn Dough)",
    tribeSlug: "akan",
    tribeName: "Akan",
    category: "staple",
    description: "Fermented corn and cassava dough ball, smooth and slightly sour. The everyday staple of the Akan people.",
    culturalSignificance: "Banku is to the Akan what fufu is to the Ashanti. It's simpler to prepare and eaten daily with soups and stews.",
    historicalContext: "Banku developed from fermentation techniques that preserve grain in humid climates. The slight sourness aids digestion and adds unique flavor.",
    prepTime: "24 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Fermented corn dough", amount: "2 cups" },
      { item: "Cassava dough", amount: "1 cup" },
      { item: "Water", amount: "3 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix corn and cassava doughs with water.",
      "Strain to remove lumps.",
      "Pour into pot and cook on medium heat.",
      "Stir continuously with wooden paddle.",
      "Cook until thick and pulls from pot.",
      "Continue stirring until smooth and elastic.",
      "Shape into balls and serve with soup."
    ],
    tips: [
      "Must stir constantly or it burns",
      "Texture should be smooth, not grainy",
      "Traditional banku paddle (banku ta) helps achieve right texture"
    ]
  },
  {
    id: "tilapia-grilled-akan",
    name: "Tilapia Grilled Akan Style",
    tribeSlug: "akan",
    tribeName: "Akan",
    category: "special",
    description: "Grilled tilapia rubbed with pepper, onions, and spices - the most popular fish dish on the Ghanaian coast.",
    culturalSignificance: "Tilapia is abundant in Ghana's rivers and farms. Grilling it Akan-style with pepper and onions is a beloved tradition enjoyed across all social classes.",
    prepTime: "20 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Whole tilapia", amount: "2 large", notes: "Cleaned and scaled" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Fresh ginger", amount: "2 inches", notes: "Grated" },
      { item: "Scotch bonnet pepper", amount: "2", notes: "Blended" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Vegetable oil", amount: "3 tablespoons" }
    ],
    instructions: [
      "Score fish with deep diagonal cuts on both sides.",
      "Mix ginger, pepper, salt, and oil.",
      "Rub mixture inside and outside fish.",
      "Stuff cavity with some onion slices.",
      "Grill over charcoal, basting with oil.",
      "Turn once, cooking about 10 minutes per side.",
      "Serve with remaining onions and fresh pepper sauce."
    ],
    tips: [
      "Charcoal grilling adds authentic smoky flavor",
      "Fish is done when flesh flakes easily",
      "Serve immediately for best taste"
    ]
  },

  // ============ TIGRAY (ETHIOPIA) RECIPES ============
  {
    id: "kitfo",
    name: "Kitfo (Ethiopian Beef Tartare)",
    tribeSlug: "tigray",
    tribeName: "Tigray",
    category: "special",
    description: "Finely minced raw beef seasoned with mitmita spice and niter kibbeh. A delicacy shared by Tigray and Amhara.",
    culturalSignificance: "Kitfo is reserved for special occasions and celebrations. It's considered a test of a cook's skill - the beef must be of highest quality and prepared perfectly.",
    historicalContext: "Raw beef dishes date back to the Ethiopian highlands' ancient cattle culture. Warriors reportedly ate raw meat for strength. Today kitfo is a beloved luxury dish.",
    prepTime: "20 minutes",
    cookTime: "0 minutes (raw) or 5 minutes (leb leb)",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Premium beef (tenderloin)", amount: "500g", notes: "Very fresh" },
      { item: "Niter kibbeh (spiced butter)", amount: "3 tablespoons", notes: "Melted" },
      { item: "Mitmita spice", amount: "2 tablespoons" },
      { item: "Cardamom", amount: "1/4 teaspoon" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Mince beef very finely by hand or grinder.",
      "Warm niter kibbeh until liquid.",
      "Toss beef with melted butter.",
      "Add mitmita and cardamom, mix well.",
      "For 'leb leb' (slightly cooked), warm briefly in pan.",
      "Serve immediately with injera and ayib (cheese)."
    ],
    tips: [
      "Beef quality is paramount - use only the freshest",
      "Traditional preparation is completely raw",
      "Leb leb is the warmed version for those who prefer"
    ]
  },

  // ============ TUTSI/HUTU (RWANDA) RECIPES ============
  {
    id: "isombe",
    name: "Isombe (Cassava Leaves with Eggplant)",
    tribeSlug: "hutu-tutsi",
    tribeName: "Hutu/Tutsi",
    category: "staple",
    description: "Mashed cassava leaves cooked with eggplant, peanuts, and palm oil. Rwanda's national dish.",
    culturalSignificance: "Isombe is eaten by all Rwandans regardless of background. It represents national unity and the rich agricultural heritage of the Land of a Thousand Hills.",
    historicalContext: "Cassava was introduced to Rwanda in the 18th century and became essential for food security. Isombe combines it with native peanuts, creating a uniquely Rwandan dish.",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava leaves", amount: "500g", notes: "Fresh or frozen, pounded" },
      { item: "Eggplant", amount: "2 medium", notes: "Cubed" },
      { item: "Groundnut paste", amount: "1/2 cup" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "If using fresh leaves, pound until smooth.",
      "Boil cassava leaves in salted water for 30 minutes.",
      "In separate pot, boil eggplant until soft.",
      "Mash eggplant and add to cassava leaves.",
      "Add palm oil and groundnut paste.",
      "Simmer together for 20 minutes.",
      "Season with salt and serve with rice or plantains."
    ],
    tips: [
      "Frozen cassava leaves are easier to find abroad",
      "The dish should be thick and hearty",
      "Palm oil gives authentic color and flavor"
    ]
  },

  // ============ BAKONGO (DRC/CONGO) RECIPES ============
  {
    id: "saka-saka",
    name: "Saka Saka (Pondu)",
    tribeSlug: "bakongo",
    tribeName: "Bakongo",
    category: "staple",
    description: "Pounded cassava leaves stewed with palm oil and fish - the quintessential dish of the Congo Basin.",
    culturalSignificance: "Saka saka is daily food across DRC and Congo. It represents the Bakongo connection to the rainforest and their agricultural traditions.",
    historicalContext: "The Bakongo were among the first African peoples contacted by Portuguese explorers. Despite colonization, their food traditions remained intact. Saka saka is now a symbol of Congolese identity.",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava leaves", amount: "500g", notes: "Frozen or fresh, pounded" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "If using frozen leaves, thaw and chop finely.",
      "Boil cassava leaves in salted water for 1 hour.",
      "Drain and set aside.",
      "Heat palm oil and sauté onion and garlic.",
      "Add cassava leaves and stir well.",
      "Add smoked fish and mix.",
      "Simmer for 45 minutes, adding water if needed.",
      "Serve with fufu or rice."
    ],
    tips: [
      "Long cooking makes leaves tender and develops flavor",
      "Palm oil is essential for authentic taste",
      "Can add peanut butter for extra richness"
    ]
  },

  // ============ SUKUMA (TANZANIA) RECIPES ============
  {
    id: "ugali-sukuma",
    name: "Ugali na Dagaa",
    tribeSlug: "sukuma",
    tribeName: "Sukuma",
    category: "staple",
    description: "Thick maize porridge served with dried sardines (dagaa) - the everyday meal of Tanzania's largest tribe.",
    culturalSignificance: "Ugali is sacred to the Sukuma. No meal is complete without it, and offering ugali to guests is the highest form of hospitality.",
    historicalContext: "The Sukuma are Tanzania's largest ethnic group, traditionally agro-pastoralists around Lake Victoria. Dagaa (small fish) from the lake became an affordable protein source that paired perfectly with ugali.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Maize flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Dried dagaa (sardines)", amount: "200g" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Bring water to boil for ugali.",
      "Gradually add maize flour, stirring constantly.",
      "Cook until very thick and pulls from sides.",
      "For dagaa: Rinse briefly to remove excess salt.",
      "Sauté onions until soft, add tomatoes.",
      "Add dagaa and cook for 10 minutes.",
      "Serve ugali with dagaa on the side."
    ],
    tips: [
      "Dagaa should be slightly crispy",
      "Ugali should be stiff enough to mold",
      "Some add coconut milk to dagaa for richness"
    ]
  },
  {
    id: "makande",
    name: "Makande (Beans and Maize)",
    tribeSlug: "sukuma",
    tribeName: "Sukuma",
    category: "staple",
    description: "Hearty stew of beans and maize kernels - a protein-rich Sukuma farmer's meal.",
    culturalSignificance: "Makande is traditional farm food that sustained Sukuma farmers through long days of work. It represents the agricultural abundance of Sukumaland.",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried maize", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Red kidney beans", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Coconut milk", amount: "1 cup", notes: "Optional" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Drain soaked maize and beans.",
      "Boil together in fresh water for 1.5-2 hours.",
      "Add more water as needed.",
      "When soft, add onion and coconut milk.",
      "Simmer for another 20 minutes.",
      "Season with salt and serve."
    ],
    tips: [
      "Adding baking soda speeds up cooking",
      "Should be thick and hearty",
      "Leftovers can be mashed"
    ]
  },

  // ============ CHAGGA (TANZANIA) RECIPES ============
  {
    id: "ndizi-nyama",
    name: "Ndizi na Nyama (Bananas with Meat)",
    tribeSlug: "chagga",
    tribeName: "Chagga (Wachagga)",
    category: "special",
    description: "Green bananas cooked with beef or goat in a rich stew - the signature dish of the Chagga people of Kilimanjaro.",
    culturalSignificance: "The Chagga built their civilization on banana cultivation on Mount Kilimanjaro's slopes. This dish combines their banana staple with meat for celebrations.",
    historicalContext: "The Chagga developed sophisticated irrigation systems on Kilimanjaro over 500 years ago. Bananas became central to their diet, economy, and culture. German colonizers were amazed at Chagga agricultural innovation.",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green bananas (ndizi)", amount: "8-10", notes: "Peeled" },
      { item: "Beef or goat", amount: "500g", notes: "Cubed" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Coconut milk", amount: "1 cup" },
      { item: "Curry powder", amount: "1 tablespoon" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Brown meat in oil and set aside.",
      "Sauté onions until golden.",
      "Add tomatoes and curry powder.",
      "Return meat with water to cover.",
      "Simmer for 45 minutes until meat is tender.",
      "Add peeled green bananas.",
      "Add coconut milk and cook 30 more minutes.",
      "Bananas should be soft but not mushy."
    ],
    tips: [
      "Use gloves when peeling bananas - sap stains",
      "Green cooking bananas are essential, not plantains",
      "The stew should be thick and rich"
    ]
  },
  {
    id: "mbege",
    name: "Mbege (Chagga Banana Beer)",
    tribeSlug: "chagga",
    tribeName: "Chagga (Wachagga)",
    category: "beverage",
    description: "Traditional Chagga banana beer, fermented from ripe bananas and millet. The social drink of Kilimanjaro.",
    culturalSignificance: "Mbege is central to Chagga social life - shared at every gathering, ceremony, and negotiation. Refusing mbege is a serious insult.",
    historicalContext: "Mbege brewing has been practiced for centuries on Kilimanjaro. The Chagga have over 30 banana varieties, some specifically for brewing. German colonizers tried to ban it, but the tradition persisted.",
    prepTime: "1 hour + 5 days fermentation",
    cookTime: "2 hours",
    servings: 20,
    difficulty: "hard",
    ingredients: [
      { item: "Ripe bananas", amount: "20", notes: "Very ripe, almost black" },
      { item: "Finger millet flour", amount: "500g" },
      { item: "Water", amount: "10 liters" },
      { item: "Banana leaves", amount: "Several", notes: "For covering" }
    ],
    instructions: [
      "Peel and mash ripe bananas thoroughly.",
      "Add water and strain to extract juice.",
      "Boil millet flour in water to make thin porridge.",
      "Cool the millet porridge.",
      "Combine banana juice with cooled porridge.",
      "Cover with banana leaves and ferment 3-5 days.",
      "Strain and serve when fizzy and slightly sour."
    ],
    tips: [
      "Fermentation time affects alcohol content",
      "Should be drunk fresh within 2-3 days",
      "Traditionally served in a communal gourd"
    ]
  },

  // ============ SERER (SENEGAL) RECIPES ============
  {
    id: "ceebu-jen",
    name: "Ceebu Jën (Senegalese Fish Rice)",
    tribeSlug: "serer",
    tribeName: "Serer",
    category: "special",
    description: "Senegal's national dish - rice cooked in rich tomato sauce with fish and vegetables. Originally a Serer/Wolof creation.",
    culturalSignificance: "Ceebu jën is served for lunch across Senegal. It represents Senegalese hospitality and the country's fishing heritage.",
    historicalContext: "This dish originated in Saint-Louis, Senegal, where Serer and Wolof fishing communities developed it. UNESCO recognized it as Intangible Cultural Heritage in 2021.",
    youtubeVideoId: "lG8z_x9I0xI",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Broken rice", amount: "500g" },
      { item: "Fresh fish (thiof/grouper)", amount: "1 kg", notes: "Cleaned, whole or steaks" },
      { item: "Tomato paste", amount: "4 tablespoons" },
      { item: "Tamarind paste", amount: "2 tablespoons" },
      { item: "Vegetables", amount: "Assorted", notes: "Cabbage, carrots, cassava, eggplant" },
      { item: "Stuffing (rof)", amount: "1/2 cup", notes: "Parsley, garlic, scotch bonnet" },
      { item: "Vegetable oil", amount: "1 cup" },
      { item: "Fish stock cubes", amount: "3" },
      { item: "Dried fish (guedj)", amount: "50g", notes: "For flavor" }
    ],
    instructions: [
      "Make rof: blend parsley, garlic, pepper, salt.",
      "Stuff fish with rof mixture.",
      "Fry stuffed fish until golden, set aside.",
      "In same oil, fry tomato paste until darkened.",
      "Add water, tamarind, dried fish, and stock.",
      "Add vegetables in order of cooking time.",
      "Remove vegetables when done, keep warm.",
      "Add rice to the pot, cook in the sauce.",
      "Layer fish and vegetables on top of rice to serve."
    ],
    tips: [
      "The crispy rice at the bottom (xoon) is prized",
      "Each vegetable should be perfectly cooked",
      "Traditionally served on a large communal platter"
    ]
  },

  // ============ HAUSA-FULANI (NIGERIA) RECIPES ============
  {
    id: "miyan-kuka",
    name: "Miyan Kuka (Baobab Soup)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "special",
    description: "Soup made from dried baobab leaves, giving it a distinctive mucilaginous texture. A Northern Nigerian specialty.",
    culturalSignificance: "Miyan kuka is beloved in Northern Nigeria for its nutritional value and unique flavor. The baobab tree is sacred across the Sahel.",
    historicalContext: "Baobab has been used in African cooking for millennia. The tree lives for over 1,000 years and every part is used. Hausa traders spread baobab recipes across their trade networks.",
    prepTime: "15 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Dried baobab leaves (kuka)", amount: "1 cup", notes: "Powdered" },
      { item: "Meat or fish", amount: "500g" },
      { item: "Palm oil", amount: "1/4 cup" },
      { item: "Onions", amount: "2 medium", notes: "Chopped" },
      { item: "Locust beans (dawadawa)", amount: "2 tablespoons" },
      { item: "Ground crayfish", amount: "2 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Cook meat until tender with onions and salt.",
      "Add palm oil and cook for 5 minutes.",
      "Add locust beans and crayfish.",
      "Dissolve kuka powder in water.",
      "Add to pot and stir well.",
      "Simmer for 15 minutes until thick.",
      "Serve with tuwo shinkafa or tuwo masara."
    ],
    tips: [
      "Stir constantly to prevent lumps",
      "The soup should be slightly slimy - this is normal",
      "Kuka powder is available in African stores"
    ]
  },
  {
    id: "masa",
    name: "Masa (Hausa Rice Cakes)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "snack",
    description: "Fermented rice cakes cooked in a special pan, crispy on edges and soft inside. Popular breakfast in Northern Nigeria.",
    culturalSignificance: "Masa is street food culture in Hausa cities. Vendors set up early morning, and the smell of masa draws crowds.",
    historicalContext: "Masa cooking requires a special pan with small round molds (called masa pan). The technique was developed centuries ago and passed through generations of Hausa women.",
    prepTime: "8 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 20,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "3 cups", notes: "Soaked and ground" },
      { item: "Cooked rice", amount: "1 cup", notes: "For binding" },
      { item: "Sugar", amount: "2 tablespoons" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Vegetable oil", amount: "For frying" }
    ],
    instructions: [
      "Soak rice overnight, then grind with water.",
      "Add cooked rice and blend until smooth.",
      "Add yeast, sugar, and salt.",
      "Cover and ferment for 6-8 hours.",
      "Heat masa pan and add oil to each mold.",
      "Pour batter into molds, cover briefly.",
      "Flip when edges are set and cook until golden."
    ],
    tips: [
      "Batter should be pourable but not thin",
      "Masa pan is essential for authentic shape",
      "Serve with sugar, honey, or spicy sauce"
    ]
  },

  // ============ TSWANA (BOTSWANA) ADDITIONAL RECIPES ============
  {
    id: "vetkoek",
    name: "Magwinya (Fat Cakes)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "snack",
    description: "Deep-fried dough balls, crispy outside and fluffy inside. The most popular street food in Botswana and South Africa.",
    culturalSignificance: "Magwinya vendors are found on every street corner. They're eaten as breakfast, snack, or with mince for a meal.",
    prepTime: "2 hours (rising)",
    cookTime: "20 minutes",
    servings: 12,
    difficulty: "easy",
    ingredients: [
      { item: "Bread flour", amount: "4 cups" },
      { item: "Instant yeast", amount: "2 teaspoons" },
      { item: "Sugar", amount: "2 tablespoons" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Warm water", amount: "1.5 cups" },
      { item: "Vegetable oil", amount: "For frying" }
    ],
    instructions: [
      "Mix flour, yeast, sugar, and salt.",
      "Add warm water and knead into soft dough.",
      "Cover and let rise for 1-2 hours.",
      "Divide into balls and let rest 15 minutes.",
      "Heat oil to 350°F (180°C).",
      "Flatten each ball slightly and fry.",
      "Turn until golden brown all over.",
      "Drain on paper towels."
    ],
    tips: [
      "Oil temperature is key - too hot and they burn",
      "Should puff up when fried",
      "Fill with mince, jam, or cheese"
    ]
  },

  // ============ KONGO (ANGOLA) RECIPES ============
  {
    id: "muamba-de-galinha",
    name: "Muamba de Galinha (Chicken Palm Oil Stew)",
    tribeSlug: "bakongo",
    tribeName: "Bakongo",
    category: "special",
    description: "Angola's national dish - chicken stewed in palm oil with okra and squash. Rich, aromatic, and deeply flavorful.",
    culturalSignificance: "Muamba is served at every important Angolan occasion. It represents the culinary heritage of the Kongo people that spans Angola, DRC, and Congo.",
    historicalContext: "This dish originated in the ancient Kongo Kingdom that flourished from the 14th-19th centuries. Palm oil and okra are indigenous to Central Africa and have been cultivated for millennia.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1 whole", notes: "Cut into pieces" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Okra", amount: "200g", notes: "Sliced" },
      { item: "Butternut squash", amount: "300g", notes: "Cubed" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Chili pepper", amount: "2", notes: "Whole" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Season chicken with salt and garlic.",
      "Brown chicken in palm oil and set aside.",
      "Sauté onions until soft.",
      "Add tomatoes and cook until broken down.",
      "Return chicken with water to cover.",
      "Add whole chilies and simmer 30 minutes.",
      "Add squash and cook 15 minutes.",
      "Add okra and cook 10 more minutes.",
      "Serve with funge (cassava porridge) or rice."
    ],
    tips: [
      "Don't break the chilies unless you want very spicy",
      "Palm oil should be fresh for best flavor",
      "Okra adds characteristic thickness"
    ]
  },

  // ============ GANDA (UGANDA) ADDITIONAL RECIPES ============
  {
    id: "luwombo",
    name: "Luwombo (Banana Leaf Stew)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "special",
    description: "Meat or chicken steamed in banana leaves with groundnut sauce. The most prestigious Baganda ceremonial dish.",
    culturalSignificance: "Luwombo is the dish of kings - it was prepared for the Kabaka (king) of Buganda. Today it's served at weddings and important ceremonies.",
    historicalContext: "Invented by a royal cook in the Buganda palace in the 19th century, luwombo became a symbol of Baganda culinary sophistication. The banana leaf cooking method preserves moisture and adds subtle flavor.",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Chicken or beef", amount: "1 kg", notes: "Cut into pieces" },
      { item: "Banana leaves", amount: "Several", notes: "Softened over flame" },
      { item: "Groundnut paste", amount: "1 cup" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Mushrooms", amount: "100g", notes: "Optional" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Mix groundnut paste with a little water.",
      "Combine meat, groundnut sauce, onion, tomatoes.",
      "Season with salt.",
      "Pass banana leaves over flame to soften.",
      "Place meat mixture on banana leaves.",
      "Wrap securely into parcels.",
      "Steam in pot with water for 2 hours.",
      "Serve in the banana leaf with matooke."
    ],
    tips: [
      "Don't let water touch the parcels directly",
      "Leaves should be soft but not torn",
      "The steam cooking makes meat incredibly tender"
    ]
  },

  // ============ TURKANA (KENYA) RECIPES ============
  {
    id: "turkana-nyirriny",
    name: "Nyirriny (Turkana Blood Soup)",
    tribeSlug: "turkana",
    tribeName: "Turkana",
    category: "special",
    description: "Nutritious soup combining animal blood with milk - traditional Turkana pastoral food.",
    culturalSignificance: "Blood foods are essential for Turkana survival in the harsh arid lands. They provide iron and nutrients from cattle without killing the animal.",
    historicalContext: "The Turkana have survived in northwest Kenya's desert for centuries through careful management of their livestock. Blood-letting techniques allow them to use cattle as 'living larders.'",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh cattle blood", amount: "2 cups", notes: "Collected from live animal" },
      { item: "Fresh milk", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Blood is traditionally drawn from a live cow's jugular vein.",
      "The wound is sealed and the cow recovers.",
      "Mix fresh blood with fresh milk.",
      "Heat gently while stirring (do not boil).",
      "The mixture will thicken slightly.",
      "Season with salt if desired.",
      "Serve warm."
    ],
    tips: [
      "This is ceremonial food, not everyday fare",
      "Blood provides essential iron in the pastoral diet",
      "Modern Turkana often substitute with meat soups"
    ]
  },

  // ============ DINKA (SOUTH SUDAN) ADDITIONAL RECIPES ============
  {
    id: "kisra-dinka",
    name: "Kisra (Sorghum Flatbread)",
    tribeSlug: "dinka",
    tribeName: "Dinka",
    category: "staple",
    description: "Thin, spongy flatbread made from fermented sorghum. The staple bread of South Sudan and Sudan.",
    culturalSignificance: "Kisra accompanies every Dinka meal. The fermentation process is passed from mother to daughter, and each family has its own starter culture.",
    historicalContext: "Sorghum has been cultivated in the Nile Valley for 4,000 years. Kisra developed as the primary way to consume this drought-resistant grain that thrives in South Sudan's climate.",
    prepTime: "24 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Sorghum flour", amount: "2 cups" },
      { item: "Water", amount: "3 cups" },
      { item: "Starter culture", amount: "2 tablespoons", notes: "From previous batch" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix sorghum flour with water to make thin batter.",
      "Add starter culture and mix well.",
      "Cover and ferment at room temperature 24-48 hours.",
      "Batter should be bubbly and slightly sour.",
      "Heat a flat griddle (saj) or non-stick pan.",
      "Pour thin layer of batter and spread quickly.",
      "Cook until set and edges lift (don't flip).",
      "Roll or fold for serving."
    ],
    tips: [
      "Save some batter to start next batch",
      "Thinner kisra is more traditional",
      "Serve with stews, vegetables, or meat"
    ]
  },

  // ============ SAMBURU (KENYA) RECIPES ============
  {
    id: "samburu-nyama",
    name: "Samburu Nyama (Roasted Meat)",
    tribeSlug: "samburu",
    tribeName: "Samburu",
    category: "special",
    description: "Simply prepared roasted meat, the centerpiece of Samburu warrior culture. Minimal seasoning lets the meat quality shine.",
    culturalSignificance: "Meat is reserved for ceremonies and warriors. The Samburu, like their Maasai relatives, believe that mixing meat with other foods weakens the body.",
    historicalContext: "The Samburu are the 'Butterfly People' - close relatives of the Maasai. Their warriors (morans) traditionally eat meat separately from other foods during their warrior years.",
    prepTime: "10 minutes",
    cookTime: "1-2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Goat or sheep", amount: "2 kg", notes: "On the bone" },
      { item: "Coarse salt", amount: "To taste" },
      { item: "Firewood", amount: "For open fire" }
    ],
    instructions: [
      "Build an open fire and let it burn to coals.",
      "Season meat generously with coarse salt.",
      "Thread meat on green sticks or metal skewers.",
      "Position over hot coals, not direct flame.",
      "Rotate slowly for even cooking.",
      "Cook for 1-2 hours until done throughout.",
      "Slice and serve directly."
    ],
    tips: [
      "Fat dripping on coals adds smoky flavor",
      "Samburu prefer meat well-done",
      "Traditionally eaten with hands, no utensils"
    ]
  },

  // ============ RENDILLE (KENYA) RECIPES ============
  {
    id: "camel-milk-rendille",
    name: "Rendille Camel Milk",
    tribeSlug: "rendille",
    tribeName: "Rendille",
    category: "beverage",
    description: "Fresh camel milk, the lifeblood of the Rendille people. Rich in nutrients and perfectly suited to desert survival.",
    culturalSignificance: "Camels are central to Rendille identity. A family's wealth is measured in camels, and their milk sustains the community through harsh desert conditions.",
    historicalContext: "The Rendille have herded camels in northern Kenya's deserts for centuries. Camel milk can sustain a person for weeks and is naturally lower in fat than cow's milk.",
    prepTime: "0 minutes",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh camel milk", amount: "1 liter" }
    ],
    instructions: [
      "Camels are milked in the early morning.",
      "Milk is collected in gourds or containers.",
      "Consumed fresh and warm from milking.",
      "Can be stored in traditional gourds for slight fermentation.",
      "Serve at room temperature or slightly chilled."
    ],
    tips: [
      "Camel milk has three times the vitamin C of cow's milk",
      "It's more digestible for lactose-intolerant people",
      "The slight saltiness is natural"
    ]
  },

  // ============ BORANA (KENYA/ETHIOPIA) RECIPES ============
  {
    id: "borana-buna",
    name: "Borana Buna (Coffee Ceremony)",
    tribeSlug: "borana",
    tribeName: "Borana",
    category: "beverage",
    description: "Traditional coffee ceremony shared with the Oromo. Coffee is roasted, ground, and brewed in a ritual that can last hours.",
    culturalSignificance: "Coffee originated in Borana/Oromo territory. The ceremony represents hospitality, and refusing coffee is a serious offense.",
    historicalContext: "The Borana are a branch of the Oromo people. Coffee (buna qela) was discovered in their ancestral lands and spread to the world from there. The word 'coffee' derives from 'Kaffa,' an Ethiopian region.",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green coffee beans", amount: "1/2 cup" },
      { item: "Water", amount: "4 cups" },
      { item: "Sugar", amount: "To taste" },
      { item: "Incense", amount: "For atmosphere" }
    ],
    instructions: [
      "Wash green coffee beans.",
      "Roast beans in a pan over fire until dark and aromatic.",
      "Let guests smell the roasted beans.",
      "Grind beans using traditional mortar and pestle.",
      "Boil water in jebena (clay coffee pot).",
      "Add ground coffee and simmer.",
      "Serve in small cups, starting with eldest.",
      "Three rounds are traditional."
    ],
    tips: [
      "The ceremony is as important as the coffee",
      "Roasting should be done just before brewing",
      "Grass and flowers often decorate the area"
    ]
  },

  // ============ VENDA (SOUTH AFRICA) RECIPES ============
  {
    id: "tshidzimba",
    name: "Tshidzimba (Bean and Maize Stew)",
    tribeSlug: "venda",
    tribeName: "Venda",
    category: "staple",
    description: "Hearty Venda stew combining beans, maize, and peanuts. A protein-rich dish that sustains families in the Limpopo valley.",
    culturalSignificance: "Tshidzimba is everyday comfort food in Venda households. It represents the agricultural heritage of the Venda people and their skill in combining simple ingredients into nutritious meals.",
    historicalContext: "The Venda migrated to South Africa from Great Zimbabwe around the 15th century, bringing Shona agricultural traditions. Tshidzimba evolved from these traditions using crops that thrived in the subtropical Limpopo region.",
    youtubeVideoId: "LqkHxRFsMHw",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Dried beans", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Maize kernels", amount: "1 cup", notes: "Dried, soaked overnight" },
      { item: "Peanuts", amount: "1/2 cup", notes: "Roasted, crushed" },
      { item: "Pumpkin leaves or spinach", amount: "2 cups", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "As needed" }
    ],
    instructions: [
      "Drain soaked beans and maize.",
      "Boil together in large pot until soft (1.5-2 hours).",
      "Add crushed peanuts and stir well.",
      "Add pumpkin leaves and cook 10 more minutes.",
      "Season with salt.",
      "Mash lightly to thicken.",
      "Serve hot with vhuswa (maize porridge)."
    ],
    tips: [
      "The peanuts add creaminess and protein",
      "Don't over-mash - some texture is traditional",
      "Leftovers taste even better the next day"
    ]
  },
  {
    id: "vhuswa",
    name: "Vhuswa (Venda Maize Porridge)",
    tribeSlug: "venda",
    tribeName: "Venda",
    category: "staple",
    description: "The Venda version of maize porridge, typically served with relishes and stews. The foundation of every Venda meal.",
    culturalSignificance: "No Venda meal is complete without vhuswa. It's the staple that accompanies all dishes and is essential at ceremonies and daily meals alike.",
    historicalContext: "Maize arrived in southern Africa via Portuguese traders in the 16th century and quickly became the dominant staple, replacing indigenous millets and sorghum in many communities.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Bring water to boil in large pot.",
      "Add salt.",
      "Slowly add maize meal while stirring.",
      "Reduce heat and cover.",
      "Cook 20 minutes, stirring occasionally.",
      "Stir vigorously to remove lumps.",
      "Porridge should be thick and pull away from pot sides."
    ],
    tips: [
      "Constant stirring prevents lumps",
      "Serve immediately while hot",
      "Traditionally eaten with hands, scooping up relishes"
    ]
  },
  {
    id: "mahafhe",
    name: "Mahafhe (Venda Traditional Beer)",
    tribeSlug: "venda",
    tribeName: "Venda",
    category: "beverage",
    description: "Traditional Venda beer brewed from sorghum. Essential at ceremonies and celebrations.",
    culturalSignificance: "Mahafhe is brewed for all important occasions - weddings, funerals, and ancestral ceremonies. The brewing is traditionally done by women, and the knowledge is passed through generations.",
    historicalContext: "Sorghum beer has been brewed in southern Africa for thousands of years. The Venda brought their brewing traditions from Great Zimbabwe, and mahafhe remains central to cultural practices.",
    prepTime: "5 days (fermentation)",
    cookTime: "2 hours",
    servings: 20,
    difficulty: "hard",
    ingredients: [
      { item: "Sorghum malt", amount: "2 kg" },
      { item: "Sorghum flour", amount: "1 kg" },
      { item: "Water", amount: "10 liters" },
      { item: "Sugar", amount: "Optional, 1 cup" }
    ],
    instructions: [
      "Mix sorghum malt with water to make thin porridge.",
      "Cook until thickened, then cool to lukewarm.",
      "Add sorghum flour and mix well.",
      "Transfer to large clay pot or container.",
      "Cover loosely and ferment 3-5 days.",
      "Stir daily.",
      "Strain through traditional basket strainer.",
      "Serve fresh - it will continue fermenting."
    ],
    tips: [
      "Fermentation time affects strength",
      "Traditional clay pots add flavor",
      "Best consumed within 2-3 days"
    ]
  },

  // ============ TSWANA (BOTSWANA/SOUTH AFRICA) RECIPES ============
  {
    id: "seswaa",
    name: "Seswaa (Pounded Beef)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "special",
    description: "Botswana's national dish - beef slow-cooked until falling apart, then pounded. The ultimate celebration food.",
    culturalSignificance: "Seswaa is prepared for weddings, funerals, and national holidays. It represents Tswana hospitality and is always served to honored guests.",
    historicalContext: "The Tswana have been cattle herders for centuries, and beef is central to their culture and economy. Seswaa developed as a way to make tough cuts of meat tender and delicious through long, slow cooking.",
    youtubeVideoId: "wQ8r9Jz7vQU",
    prepTime: "15 minutes",
    cookTime: "4 hours",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Beef (brisket or shoulder)", amount: "2 kg", notes: "With bone" },
      { item: "Water", amount: "To cover" },
      { item: "Salt", amount: "2 tablespoons" },
      { item: "Onion", amount: "1 large", notes: "Optional" }
    ],
    instructions: [
      "Place beef in large pot with bones.",
      "Cover with water and add salt.",
      "Bring to boil, then reduce to simmer.",
      "Cook 3-4 hours until meat falls off bone.",
      "Remove bones.",
      "Shred meat using traditional wooden spoon or fork.",
      "Pound in pot or mortar to create fibrous texture.",
      "Season and serve with pap and morogo (wild greens)."
    ],
    tips: [
      "The key is very slow, long cooking",
      "Some fat should remain for flavor",
      "Traditional pounding creates the signature texture"
    ]
  },
  {
    id: "morogo",
    name: "Morogo (Wild Spinach)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "staple",
    description: "Wild indigenous greens cooked with onion and tomato. A nutritious side dish that accompanies every meal.",
    culturalSignificance: "Morogo represents the Tswana knowledge of wild plants. These greens have sustained communities for generations and are considered more nutritious than cultivated spinach.",
    historicalContext: "Indigenous African greens like morogo were staples long before colonization. They're drought-resistant and grow wild, providing nutrition even in harsh conditions.",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Morogo leaves (or spinach)", amount: "4 cups", notes: "Washed, chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Tomato", amount: "1 large", notes: "Chopped" },
      { item: "Cooking oil", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Heat oil in pot.",
      "Sauté onion until soft.",
      "Add tomato and cook until broken down.",
      "Add morogo leaves.",
      "Stir, cover, and cook 10-15 minutes.",
      "Season with salt.",
      "Serve with pap and meat."
    ],
    tips: [
      "Wild morogo varieties have more nutrients",
      "Don't overcook - should retain some color",
      "Some add peanut butter for richness"
    ]
  },

  // ============ PEDI (SOUTH AFRICA) RECIPES ============
  {
    id: "morogo-wa-dinawa",
    name: "Morogo wa Dinawa (Greens with Beans)",
    tribeSlug: "pedi",
    tribeName: "Pedi",
    category: "staple",
    description: "Traditional Pedi dish combining wild greens with beans. A protein-rich vegetarian staple.",
    culturalSignificance: "This dish represents Pedi agricultural wisdom - combining legumes with greens for complete nutrition. It's everyday food that has sustained the community for generations.",
    historicalContext: "The Pedi (Northern Sotho) developed sophisticated farming practices in the Limpopo region. Their cuisine maximizes nutrition from locally available ingredients.",
    prepTime: "8 hours (soaking)",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Dried beans", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Morogo or spinach", amount: "3 cups", notes: "Chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Cooking oil", amount: "2 tablespoons" }
    ],
    instructions: [
      "Drain and boil beans until soft (about 1 hour).",
      "In separate pot, sauté onion in oil.",
      "Add morogo and cook until wilted.",
      "Add cooked beans to greens.",
      "Mash slightly to combine.",
      "Season with salt.",
      "Serve with pap or sorghum porridge."
    ],
    tips: [
      "Don't drain bean cooking water - it adds flavor",
      "Traditional varieties of morogo are more bitter",
      "Some add groundnuts for extra protein"
    ]
  },

  // ============ TSONGA (SOUTH AFRICA/MOZAMBIQUE) RECIPES ============
  {
    id: "xigugu",
    name: "Xigugu (Tsonga Peanut Sauce)",
    tribeSlug: "tsonga",
    tribeName: "Tsonga",
    category: "special",
    description: "Rich peanut-based sauce served with meat or vegetables. A signature Tsonga flavor.",
    culturalSignificance: "Xigugu shows the Tsonga mastery of groundnut (peanut) cooking, which arrived in Africa via Portuguese traders and was quickly adopted into local cuisines.",
    historicalContext: "The Tsonga (Shangaan) lived across the Gaza Empire, spanning modern South Africa, Mozambique, and Zimbabwe. Their cuisine reflects this cross-border heritage with Portuguese and Bantu influences.",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Peanut butter (natural)", amount: "1 cup" },
      { item: "Chicken or beef", amount: "500g", notes: "Cubed" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Water or stock", amount: "2 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Chili", amount: "Optional" }
    ],
    instructions: [
      "Brown meat in pot and set aside.",
      "Sauté onion until soft.",
      "Add tomatoes and cook down.",
      "Stir in peanut butter.",
      "Add water/stock and mix until smooth.",
      "Return meat to pot.",
      "Simmer 20 minutes until thick.",
      "Serve with xima (maize porridge)."
    ],
    tips: [
      "Use natural peanut butter without sugar",
      "Sauce should be thick, not runny",
      "Adjust water for desired consistency"
    ]
  },
  {
    id: "tihove",
    name: "Tihove (Tsonga Maize and Bean Dish)",
    tribeSlug: "tsonga",
    tribeName: "Tsonga",
    category: "staple",
    description: "Tsonga version of the maize-bean combination, similar to githeri but with distinct Tsonga seasonings.",
    culturalSignificance: "Tihove is the everyday staple that keeps Tsonga families fed. It's economical, nutritious, and satisfying.",
    historicalContext: "This dish represents the agricultural traditions shared across southern African Bantu peoples, adapted with Tsonga flavor preferences.",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried maize", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Dried beans", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Groundnuts", amount: "1/2 cup", notes: "Crushed" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Drain maize and beans.",
      "Boil together until soft (1.5-2 hours).",
      "Add crushed groundnuts.",
      "Season with salt.",
      "Mash slightly if desired.",
      "Serve hot."
    ],
    tips: [
      "Adding groundnuts is distinctly Tsonga",
      "Cook until beans are very soft",
      "This is comfort food - simple but satisfying"
    ]
  },

  // ============ EWE (GHANA/TOGO) RECIPES ============
  {
    id: "akple",
    name: "Akple (Ewe Fermented Corn Dough)",
    tribeSlug: "ewe",
    tribeName: "Ewe",
    category: "staple",
    description: "Fermented corn dough, smoother than Ghanaian banku. The signature staple of the Ewe people.",
    culturalSignificance: "Akple is central to Ewe identity - it's what distinguishes Ewe cuisine from neighboring groups. Preparation techniques are passed from mother to daughter.",
    historicalContext: "The Ewe migrated to their current homeland in Ghana and Togo around the 17th century. Akple developed as their signature staple, reflecting their agricultural practices along the Volta River.",
    youtubeVideoId: "7WP3Xh-kf_E",
    prepTime: "24 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Fermented corn dough", amount: "3 cups" },
      { item: "Cassava dough", amount: "1 cup" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Prepare fermented corn dough 24-48 hours ahead.",
      "Mix corn and cassava doughs.",
      "Bring water to boil.",
      "Add half the dough mixture and stir vigorously.",
      "Cook until thickened.",
      "Add remaining dough gradually.",
      "Stir continuously with wooden paddle.",
      "Cook until smooth and pulls from pot.",
      "Mold into balls with wet hands."
    ],
    tips: [
      "Fermentation gives akple its distinct sour taste",
      "Must stir constantly to prevent lumps",
      "Serve with fetri detsi (okra soup) or groundnut soup"
    ]
  },
  {
    id: "fetri-detsi",
    name: "Fetri Detsi (Ewe Okra Soup)",
    tribeSlug: "ewe",
    tribeName: "Ewe",
    category: "special",
    description: "Ewe-style okra soup, typically made with palm oil and seafood. The perfect accompaniment to akple.",
    culturalSignificance: "This soup showcases Ewe coastal cuisine - they're known for their seafood preparations, and fetri detsi brings together ocean and land flavors.",
    historicalContext: "The Ewe settled along the coast of modern Ghana and Togo, developing expertise in both fishing and farming. Their cuisine reflects this dual heritage.",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh okra", amount: "500g", notes: "Sliced" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned" },
      { item: "Fresh crabs or shrimp", amount: "200g", notes: "Optional" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Tomatoes", amount: "2 medium", notes: "Blended" },
      { item: "Chili pepper", amount: "To taste" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Blend or pound okra to slimy consistency.",
      "Heat palm oil in pot.",
      "Sauté onion until soft.",
      "Add tomatoes and cook 10 minutes.",
      "Add smoked fish and seafood.",
      "Add water and simmer 15 minutes.",
      "Add okra paste and stir well.",
      "Simmer 10 more minutes until thick.",
      "Season and serve with akple."
    ],
    tips: [
      "The slimier the okra, the more authentic",
      "Smoked fish adds essential umami",
      "Don't overcook after adding okra"
    ]
  },

  // ============ WOLOF (SENEGAL/GAMBIA) RECIPES ============
  {
    id: "thieboudienne",
    name: "Thieboudienne (Senegalese Fish and Rice)",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "special",
    description: "Senegal's national dish - rice cooked with fish, vegetables, and tomato in one pot. The original jollof.",
    culturalSignificance: "Thieboudienne is the mother of all West African rice dishes. It's served at every important occasion and is a source of deep national pride.",
    historicalContext: "This dish originated with the Wolof people of Senegal, likely in Saint-Louis in the 19th century. It's the ancestor of jollof rice and has influenced rice dishes across West Africa. The name means 'rice with fish' in Wolof.",
    youtubeVideoId: "nwQPxvnkEAg",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Whole fish (thiof or grouper)", amount: "1 kg", notes: "Cleaned, stuffed" },
      { item: "Rice (broken)", amount: "4 cups" },
      { item: "Tomato paste", amount: "1/2 cup" },
      { item: "Vegetables", amount: "Mixed", notes: "Cassava, carrot, cabbage, eggplant" },
      { item: "Dried fish", amount: "100g" },
      { item: "Tamarind", amount: "2 tablespoons" },
      { item: "Vegetable oil", amount: "1 cup" },
      { item: "Onion", amount: "2 large", notes: "Sliced" },
      { item: "Garlic and parsley paste (rof)", amount: "4 tablespoons" },
      { item: "Scotch bonnet", amount: "2", notes: "Whole" }
    ],
    instructions: [
      "Stuff fish with garlic-parsley paste (rof).",
      "Fry fish in oil until golden, set aside.",
      "In same oil, sauté onions until caramelized.",
      "Add tomato paste and cook 10 minutes.",
      "Add water, tamarind, and dried fish.",
      "Add vegetables in order of cooking time.",
      "Return fish to pot.",
      "Remove fish and vegetables when done.",
      "Add rice to cooking liquid.",
      "Cook covered until rice absorbs liquid.",
      "Serve rice with fish and vegetables arranged on top."
    ],
    tips: [
      "The bottom rice (xoon) should be slightly burnt",
      "Each vegetable should be cooked perfectly",
      "Traditional broken rice absorbs more flavor"
    ]
  },

  // ============ MANDINKA (GAMBIA/SENEGAL/GUINEA) RECIPES ============
  {
    id: "domoda",
    name: "Domoda (Groundnut Stew)",
    tribeSlug: "mandinka",
    tribeName: "Mandinka",
    category: "special",
    description: "Gambia's national dish - rich peanut stew with meat and vegetables. Creamy, savory perfection.",
    culturalSignificance: "Domoda is the pride of Mandinka cuisine, served at celebrations and family gatherings. It represents the importance of groundnuts in the regional economy and diet.",
    historicalContext: "Groundnuts (peanuts) arrived in West Africa via Portuguese traders from Brazil in the 16th century and quickly became a staple crop. Domoda developed as the signature Mandinka way to prepare them.",
    youtubeVideoId: "Kq_2A8k6GpY",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or chicken", amount: "500g", notes: "Cubed" },
      { item: "Peanut butter (natural)", amount: "1 cup" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Vegetables", amount: "Mixed", notes: "Pumpkin, sweet potato, okra" },
      { item: "Chili pepper", amount: "1-2" },
      { item: "Stock or water", amount: "4 cups" },
      { item: "Oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Brown meat in oil and set aside.",
      "Sauté onion until golden.",
      "Add tomato paste and cook 5 minutes.",
      "Stir in peanut butter.",
      "Add stock gradually, stirring to smooth.",
      "Return meat to pot.",
      "Add vegetables and chili.",
      "Simmer 30-40 minutes until meat is tender.",
      "Serve over rice."
    ],
    tips: [
      "Use natural peanut butter without sugar",
      "The sauce should be thick and orange-brown",
      "Stir occasionally to prevent sticking"
    ]
  },

  // ============ IJAW (NIGERIA) RECIPES ============
  {
    id: "banga-soup",
    name: "Banga Soup (Palm Fruit Soup)",
    tribeSlug: "ijaw",
    tribeName: "Ijaw",
    category: "special",
    description: "Rich soup made from palm fruit extract. The signature dish of the Niger Delta peoples.",
    culturalSignificance: "Banga soup represents Ijaw mastery of the palm tree - they use every part. It's served at important ceremonies and is a source of cultural pride.",
    historicalContext: "The Ijaw have lived in the Niger Delta for thousands of years, developing a unique riverine culture. Banga soup showcases their indigenous use of palm fruit, distinct from palm oil processing.",
    youtubeVideoId: "Vu7y0aD8lqw",
    prepTime: "1 hour",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Palm fruits", amount: "2 kg", notes: "Or palm fruit concentrate" },
      { item: "Assorted meat and fish", amount: "1 kg" },
      { item: "Stockfish", amount: "200g", notes: "Soaked" },
      { item: "Dried fish", amount: "200g" },
      { item: "Periwinkles", amount: "200g", notes: "Cleaned" },
      { item: "Beletete (scent) leaves", amount: "1 cup" },
      { item: "Atama leaves", amount: "Optional" },
      { item: "Oburunbebe stick", amount: "3 pieces" },
      { item: "Salt and crayfish", amount: "To taste" }
    ],
    instructions: [
      "Boil palm fruits until soft.",
      "Pound and extract cream, straining out fiber.",
      "Boil palm cream with oburunbebe sticks.",
      "Cook until oil floats on top.",
      "Add pre-cooked meat and fish.",
      "Add stockfish, dried fish, periwinkles.",
      "Season with salt and crayfish.",
      "Simmer 20 minutes.",
      "Add scent leaves at end.",
      "Serve with starch or pounded yam."
    ],
    tips: [
      "Palm fruit concentrate can substitute fresh fruits",
      "The beletete leaves are essential for authentic flavor",
      "Soup should be thick and orange-red"
    ]
  },
  {
    id: "native-soup-ijaw",
    name: "Ijaw Native Soup",
    tribeSlug: "ijaw",
    tribeName: "Ijaw",
    category: "special",
    description: "Light pepper soup with fresh fish and local herbs. A Niger Delta specialty.",
    culturalSignificance: "This soup showcases the Ijaw's close relationship with the rivers. Fresh fish is the star, prepared simply to highlight its quality.",
    historicalContext: "The Ijaw are fishermen by tradition, living on the waterways of the Niger Delta. Their cuisine reflects direct access to fresh seafood.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh catfish", amount: "1 kg", notes: "Cleaned, cut" },
      { item: "Pepper", amount: "To taste", notes: "Ground" },
      { item: "Uziza leaves", amount: "1/2 cup" },
      { item: "Scent leaves", amount: "1/2 cup" },
      { item: "Crayfish", amount: "2 tablespoons", notes: "Ground" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "3 cups" }
    ],
    instructions: [
      "Season fish with salt and pepper.",
      "Bring water to boil.",
      "Add fish carefully.",
      "Cook 15 minutes until fish is done.",
      "Add ground crayfish.",
      "Add fresh leaves and turn off heat.",
      "Serve immediately."
    ],
    tips: [
      "Don't overcook the fish",
      "Fresh leaves should be added at the end",
      "Serve as appetizer or with starch"
    ]
  },

  // ============ HIMBA (NAMIBIA) RECIPES ============
  {
    id: "otjize-meat",
    name: "Himba Roasted Meat",
    tribeSlug: "himba",
    tribeName: "Himba",
    category: "special",
    description: "Simply prepared roasted meat from cattle or goats. The Himba pastoral tradition on a plate.",
    culturalSignificance: "Cattle are central to Himba life - they're wealth, status, and sustenance. Meat is only eaten on special occasions, showing respect for the animals.",
    historicalContext: "The Himba have maintained their pastoral lifestyle in Namibia's Kunene region for centuries. Their cattle-based economy and diet have survived colonization and modernization.",
    prepTime: "10 minutes",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Goat or beef", amount: "2 kg", notes: "On the bone" },
      { item: "Salt", amount: "To taste" },
      { item: "Wood for fire", amount: "As needed" }
    ],
    instructions: [
      "Build a fire and let it burn to coals.",
      "Season meat with salt.",
      "Thread onto sticks or place on rack.",
      "Position over hot coals.",
      "Turn regularly for even cooking.",
      "Cook 1.5-2 hours until done.",
      "Slice and serve."
    ],
    tips: [
      "The Himba cook meat simply without marinades",
      "Fat dripping on coals adds smoky flavor",
      "Nothing is wasted - all parts are used"
    ]
  },
  {
    id: "omaere",
    name: "Omaere (Himba Sour Milk)",
    tribeSlug: "himba",
    tribeName: "Himba",
    category: "beverage",
    description: "Fermented milk stored in traditional gourds. A staple of Himba diet.",
    culturalSignificance: "Omaere is consumed daily by the Himba and is an important source of nutrition. The fermentation makes the milk last longer in the hot climate.",
    historicalContext: "Dairy has been central to Himba survival in the harsh Namibian environment. Traditional gourd containers are passed down through generations.",
    prepTime: "0 minutes",
    cookTime: "2-3 days (fermentation)",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh cow's milk", amount: "1 liter" },
      { item: "Traditional gourd", amount: "1" }
    ],
    instructions: [
      "Milk the cow into a clean gourd.",
      "Cover and store in shade.",
      "Let ferment 2-3 days.",
      "Shake before drinking.",
      "Consume as beverage or with porridge."
    ],
    tips: [
      "Traditional gourds contain beneficial bacteria",
      "Fermentation time affects sourness",
      "Can be mixed with porridge for meals"
    ]
  },

  // ============ NDEBELE (SOUTH AFRICA/ZIMBABWE) RECIPES ============
  {
    id: "isitshwala",
    name: "Isitshwala (Ndebele Thick Porridge)",
    tribeSlug: "ndebele",
    tribeName: "Ndebele",
    category: "staple",
    description: "Thick maize meal porridge, the foundation of every Ndebele meal. Stiffer than pap, perfect for scooping relishes.",
    culturalSignificance: "Isitshwala is the heart of Ndebele cuisine. No meal is complete without it, and the ability to prepare it perfectly is a mark of a good cook.",
    historicalContext: "The Ndebele broke away from the Zulu nation in the 1820s under Mzilikazi, eventually settling in Zimbabwe. They brought their culinary traditions, adapting them to new ingredients.",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Bring water to boil.",
      "Add salt.",
      "Slowly pour in maize meal while stirring.",
      "Reduce heat and cover.",
      "Cook 15 minutes, stirring occasionally.",
      "Add more maize meal if needed for stiff consistency.",
      "Stir vigorously until smooth and thick.",
      "Serve with umhwabha (relish) or meat."
    ],
    tips: [
      "Should be stiff enough to hold shape",
      "No lumps allowed",
      "Traditionally cooked in three-legged pot over fire"
    ]
  },
  {
    id: "umhluzi",
    name: "Umhluzi (Ndebele Gravy/Sauce)",
    tribeSlug: "ndebele",
    tribeName: "Ndebele",
    category: "staple",
    description: "Simple tomato-based sauce that accompanies isitshwala. Can be made with or without meat.",
    culturalSignificance: "Umhluzi turns plain porridge into a complete meal. Even in difficult times, a tomato-onion umhluzi makes food satisfying.",
    historicalContext: "Tomatoes arrived in southern Africa with European traders but were quickly adopted. Umhluzi shows how the Ndebele incorporated new ingredients into traditional meals.",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Cooking oil", amount: "2 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Beef or chicken", amount: "Optional, 300g" }
    ],
    instructions: [
      "If using meat, brown first and set aside.",
      "Sauté onion in oil until soft.",
      "Add tomatoes and cook until broken down.",
      "Add water for desired consistency.",
      "Return meat if using.",
      "Season with salt.",
      "Simmer until thick.",
      "Serve over isitshwala."
    ],
    tips: [
      "Can add curry powder for variation",
      "Some add green pepper",
      "Sauce should coat the back of a spoon"
    ]
  },

  // ============ AFAR (ETHIOPIA/DJIBOUTI/ERITREA) RECIPES ============
  {
    id: "lahoh-afar",
    name: "Lahoh (Afar Spongy Bread)",
    tribeSlug: "afar",
    tribeName: "Afar",
    category: "staple",
    description: "Spongy, fermented flatbread similar to injera but unique to the Afar tradition. Served with every meal.",
    culturalSignificance: "Lahoh is the daily bread of the Afar people, prepared fresh each morning. It represents the Afar adaptation to harsh desert life.",
    historicalContext: "The Afar have survived in one of Earth's hottest regions for millennia. Their cuisine reflects available ingredients and the need for foods that travel well.",
    prepTime: "24 hours (fermentation)",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "All-purpose flour", amount: "2 cups" },
      { item: "Whole wheat flour", amount: "1 cup" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Water", amount: "3 cups" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Sugar", amount: "1 teaspoon" }
    ],
    instructions: [
      "Mix flours, yeast, sugar, and salt.",
      "Add water and whisk to smooth batter.",
      "Cover and ferment overnight.",
      "Heat non-stick pan.",
      "Pour batter to form thin circle.",
      "Cover and cook until bubbly and set.",
      "Don't flip - one side only.",
      "Stack and serve with stews."
    ],
    tips: [
      "Batter should be thinner than pancake batter",
      "The bottom should be slightly browned",
      "Serve fresh and warm"
    ]
  },

  // ============ TSWANA (BOTSWANA) RECIPES ============
  {
    id: "seswaa",
    name: "Seswaa (Pounded Beef)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "special",
    description: "Botswana's national dish - slow-cooked beef pounded to shredded perfection. The ultimate comfort food.",
    culturalSignificance: "Seswaa is served at weddings, funerals, and national celebrations. It represents Tswana hospitality and communal eating traditions.",
    historicalContext: "The Tswana have raised cattle for centuries across the Kalahari region. Seswaa developed as a way to make tough cuts tender and flavorful, originally cooked in three-legged pots over open fires.",
    youtubeVideoId: "7cPjWMPG4Xk",
    prepTime: "15 minutes",
    cookTime: "4 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Beef (bone-in cuts)", amount: "2 kg", notes: "Chuck, brisket, or shank" },
      { item: "Salt", amount: "2 tablespoons" },
      { item: "Water", amount: "To cover meat" }
    ],
    instructions: [
      "Place beef in a large pot with bones.",
      "Add water to cover and salt.",
      "Bring to boil, then reduce to simmer.",
      "Cook 3-4 hours until meat falls off bone.",
      "Remove bones from pot.",
      "Using two forks or wooden pestle, pound meat in pot.",
      "Shred until fibers separate.",
      "Continue cooking to reduce liquid.",
      "Season with salt and serve with pap or sorghum."
    ],
    tips: [
      "The bones add rich flavor",
      "Traditional preparation uses three-legged pot over fire",
      "Should be stringy, not mushy"
    ]
  },
  {
    id: "bogobe",
    name: "Bogobe (Sorghum Porridge)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "staple",
    description: "Traditional sorghum porridge that's been a Tswana staple for centuries. The perfect base for seswaa.",
    culturalSignificance: "Bogobe is the foundation of Tswana meals. Sorghum was the original grain before maize arrived, connecting modern Tswana to their ancestors.",
    historicalContext: "Sorghum originated in Africa and has been cultivated in Botswana for over 3,000 years. It's drought-resistant, perfect for the Kalahari climate.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Sorghum meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Sour milk (optional)", amount: "1 cup" }
    ],
    instructions: [
      "Bring water to boil in pot.",
      "Add salt.",
      "Slowly stir in sorghum meal.",
      "Reduce heat and cover.",
      "Cook 25-30 minutes, stirring occasionally.",
      "Add more water if needed.",
      "Serve with sour milk or meat stew."
    ],
    tips: [
      "Sorghum takes longer to cook than maize",
      "Fermented sorghum (ting) is also popular",
      "Can add butter for richness"
    ]
  },

  // ============ SAN (BUSHMEN) RECIPES ============
  {
    id: "mongongo-nuts",
    name: "Mongongo Nut Preparation",
    tribeSlug: "san",
    tribeName: "San (Bushmen)",
    category: "staple",
    description: "The staple food of the Kalahari San - nutrient-rich mongongo nuts gathered from the wild.",
    culturalSignificance: "Mongongo nuts are so important that San measure distance by 'mongongo days.' They provide protein, fat, and vitamins from the harsh Kalahari.",
    historicalContext: "The San have gathered mongongo nuts for at least 7,000 years. Archaeological sites show ancient nut-cracking stones. One anthropologist famously asked 'Why farm when there are so many mongongo nuts?' to illustrate San prosperity.",
    prepTime: "30 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Mongongo nuts", amount: "2 cups", notes: "In shells" },
      { item: "Water", amount: "For boiling" }
    ],
    instructions: [
      "Gather ripe mongongo nuts from beneath trees.",
      "Remove outer fruit flesh (can be eaten fresh).",
      "Crack hard inner shell with stones or tools.",
      "Extract the nutritious inner kernel.",
      "Roast kernels over low fire for enhanced flavor.",
      "Eat as is or pound into paste."
    ],
    tips: [
      "Outer fruit is also edible and nutritious",
      "Shells are very hard - traditional stone anvils used",
      "Nuts store well for months"
    ]
  },

  // ============ SHONA (ZIMBABWE) RECIPES ============
  {
    id: "sadza",
    name: "Sadza (Shona Thick Porridge)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Zimbabwe's national dish - thick white maize porridge that's the foundation of every meal.",
    culturalSignificance: "Sadza is so central to Shona life that a meal without it isn't considered complete. The saying goes 'No sadza, no meal.'",
    historicalContext: "While maize arrived with Portuguese traders in the 16th century, the Shona quickly made it central to their cuisine, replacing millet and sorghum in many areas.",
    youtubeVideoId: "bYyqyHCGzV4",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Bring 3 cups water to boil.",
      "Mix remaining water with 1/2 cup maize meal to make slurry.",
      "Stir slurry into boiling water.",
      "Cook 5 minutes until thickening.",
      "Gradually add remaining maize meal.",
      "Stir vigorously with wooden spoon.",
      "Cover and cook 15 minutes on low.",
      "Stir again until smooth and stiff.",
      "Serve with nyama (meat) or vegetables."
    ],
    tips: [
      "Should be stiff enough to mold with hands",
      "A wooden cooking stick (mugoti) is traditional",
      "Left overnight becomes 'sadza rezuro'"
    ]
  },
  {
    id: "muriwo-unedovi",
    name: "Muriwo Unedovi (Greens with Peanut Butter)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Collard greens or pumpkin leaves cooked with peanut butter. The classic sadza accompaniment.",
    culturalSignificance: "This dish showcases Shona ingenuity - combining indigenous greens with groundnuts for a protein-rich, flavorful side dish.",
    historicalContext: "Groundnuts have been cultivated in Zimbabwe for centuries. Combining them with foraged greens created a nutritious, sustainable dish.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Collard greens or pumpkin leaves", amount: "500g", notes: "Chopped" },
      { item: "Peanut butter", amount: "3 tablespoons" },
      { item: "Tomato", amount: "1 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 small", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "1/2 cup" }
    ],
    instructions: [
      "Sauté onion until soft.",
      "Add tomato and cook 3 minutes.",
      "Add greens and water.",
      "Cover and cook 10 minutes until wilted.",
      "Stir in peanut butter.",
      "Mix well and simmer 5 minutes.",
      "Season with salt.",
      "Serve with sadza."
    ],
    tips: [
      "Natural peanut butter works best",
      "Don't overcook the greens",
      "Can add a bit of cooking oil"
    ]
  },

  // ============ BEMBA (ZAMBIA) RECIPES ============
  {
    id: "ifisashi",
    name: "Ifisashi (Greens in Peanut Sauce)",
    tribeSlug: "bemba",
    tribeName: "Bemba",
    category: "staple",
    description: "Zambia's beloved vegetable dish - leafy greens cooked in rich groundnut sauce. Comfort food perfection.",
    culturalSignificance: "Ifisashi represents Bemba agricultural traditions. Every family has their version, passed down through generations.",
    historicalContext: "The Bemba have practiced slash-and-burn agriculture (chitemene) for centuries. Groundnuts and greens from cleared forest land created this classic combination.",
    youtubeVideoId: "cA9K8MHv1tA",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Leafy greens (rape, pumpkin leaves)", amount: "500g" },
      { item: "Groundnut powder", amount: "1 cup" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "1 cup" }
    ],
    instructions: [
      "Cook greens in water until wilted.",
      "In separate pan, sauté onion and tomatoes.",
      "Mix groundnut powder with water to make paste.",
      "Add groundnut paste to tomato mixture.",
      "Stir and cook 5 minutes.",
      "Add cooked greens to sauce.",
      "Simmer together 10 minutes.",
      "Season and serve with nshima."
    ],
    tips: [
      "Fresh groundnut powder has the best flavor",
      "Add a bit of bicarbonate to keep greens green",
      "Should be thick and creamy"
    ]
  },
  {
    id: "nshima",
    name: "Nshima (Zambian Thick Porridge)",
    tribeSlug: "bemba",
    tribeName: "Bemba",
    category: "staple",
    description: "Zambia's staple food - thick maize porridge that forms the base of nearly every meal.",
    culturalSignificance: "Nshima is sacred to Zambians. It's said that a Zambian hasn't eaten until they've had nshima. It's always eaten with hands.",
    historicalContext: "While maize arrived from the Americas, it replaced earlier grains like millet and sorghum. The Bemba perfected nshima preparation over centuries.",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "White mealie meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" }
    ],
    instructions: [
      "Boil 3 cups water.",
      "Mix 1 cup water with 1/2 cup mealie meal.",
      "Pour slurry into boiling water.",
      "Stir and cook 5 minutes.",
      "Add remaining mealie meal gradually.",
      "Stir vigorously with wooden paddle.",
      "Cook until very thick and pulls from pot.",
      "Shape into smooth mound and serve."
    ],
    tips: [
      "No salt needed - flavor comes from relish",
      "Should be smooth with no lumps",
      "Always eaten with hands"
    ]
  },

  // ============ DINKA (SOUTH SUDAN) RECIPES ============
  {
    id: "walwal",
    name: "Walwal (Dinka Sorghum Porridge)",
    tribeSlug: "dinka",
    tribeName: "Dinka",
    category: "staple",
    description: "Traditional Dinka sorghum porridge served with milk or stews. The staple that fuels the world's tallest people.",
    culturalSignificance: "Walwal sustains the Dinka through dry and wet seasons. Sorghum is grown during the rains and stored for year-round use.",
    historicalContext: "The Dinka have cultivated sorghum in the Sudd region for millennia, adapting agriculture to the Nile's seasonal flooding patterns.",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Sorghum flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Sour milk", amount: "1 cup", notes: "Optional" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Bring water to boil.",
      "Slowly add sorghum flour while stirring.",
      "Reduce heat to low.",
      "Cook 25-30 minutes, stirring often.",
      "Add salt to taste.",
      "Serve with sour milk or meat stew."
    ],
    tips: [
      "Stir constantly to prevent lumps",
      "Can be thin (like porridge) or thick (like ugali)",
      "Sour milk is traditional accompaniment"
    ]
  },

  // ============ MOSSI (BURKINA FASO) RECIPES ============
  {
    id: "to-sauce",
    name: "Tô with Baobab Leaf Sauce",
    tribeSlug: "mossi",
    tribeName: "Mossi",
    category: "staple",
    description: "Burkina Faso's national dish - millet or sorghum Tô served with slimy baobab leaf sauce.",
    culturalSignificance: "Tô is the heart of Mossi cuisine. The Mogho Naba (Mossi King) serves Tô at royal ceremonies, symbolizing unity.",
    historicalContext: "The Mossi kingdoms resisted invasion for 800 years, maintaining their culinary traditions. Tô has been the royal food since the founding of Ouagadougou.",
    youtubeVideoId: "J8P5rTqFzAY",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet or sorghum flour", amount: "3 cups" },
      { item: "Dried baobab leaves", amount: "1 cup" },
      { item: "Water", amount: "6 cups" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Dawadawa (locust bean)", amount: "1 tablespoon" }
    ],
    instructions: [
      "For Tô: Boil water and slowly add flour while stirring.",
      "Cook 20 minutes, adding water as needed.",
      "Stir until smooth and elastic.",
      "For sauce: Soak baobab leaves in hot water.",
      "Sauté onion in palm oil.",
      "Add soaked leaves and dawadawa.",
      "Simmer 15 minutes until slimy.",
      "Serve sauce over molded Tô."
    ],
    tips: [
      "Tô should be smooth without lumps",
      "Baobab sauce should be slimy (that's correct!)",
      "Dawadawa adds umami flavor"
    ]
  },

  // ============ KANURI (NIGERIA/CHAD) RECIPES ============
  {
    id: "kilishi",
    name: "Kilishi (Dried Spiced Meat)",
    tribeSlug: "kanuri",
    tribeName: "Kanuri",
    category: "snack",
    description: "Northern Nigeria's famous dried meat - thinly sliced beef coated in spiced groundnut paste and sun-dried. Africa's beef jerky.",
    culturalSignificance: "Kilishi represents Kanuri ingenuity in preserving meat without refrigeration. It's a premium snack served to honored guests.",
    historicalContext: "The Kanem-Bornu Empire developed kilishi for traders on trans-Saharan journeys. It could last months without spoiling.",
    youtubeVideoId: "wZfF6bQCjgQ",
    prepTime: "3 hours",
    cookTime: "2 days (drying)",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Beef", amount: "1 kg", notes: "Lean cuts" },
      { item: "Groundnut paste", amount: "2 cups" },
      { item: "Dried chili", amount: "4 tablespoons" },
      { item: "Ginger", amount: "2 tablespoons", notes: "Ground" },
      { item: "Garlic", amount: "1 tablespoon", notes: "Ground" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Seasoning cubes", amount: "2" }
    ],
    instructions: [
      "Slice beef very thin (2mm) against the grain.",
      "Dry meat in sun or oven until stiff (1 day).",
      "Mix groundnut paste with all spices.",
      "Add water to make spreadable paste.",
      "Coat each meat piece with paste.",
      "Return to sun/low oven to dry again.",
      "Once dry, briefly roast over fire.",
      "Store in airtight container."
    ],
    tips: [
      "Slicing thin is crucial",
      "The groundnut coating should be thick",
      "Brief roasting adds smoky flavor"
    ]
  },

  // ============ KONGO (DRC/CONGO) RECIPES ============
  {
    id: "pondu",
    name: "Pondu (Cassava Leaves)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "staple",
    description: "Congolese cassava leaf stew - the green heart of Kongo cuisine, cooked for hours until silky smooth.",
    culturalSignificance: "Pondu is so important that Congolese in the diaspora grow cassava just for the leaves. It connects people to home.",
    historicalContext: "Cassava arrived from Brazil via Portuguese traders in the 16th century. The Kongo people developed pondu, making full use of both the root and leaves.",
    youtubeVideoId: "sQYpL8YK_wM",
    prepTime: "30 minutes",
    cookTime: "3 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava leaves", amount: "1 kg", notes: "Pounded or finely chopped" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Smoked fish", amount: "200g" },
      { item: "Onion", amount: "1 large" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "2 cups" }
    ],
    instructions: [
      "Pound cassava leaves to paste (or blend).",
      "Boil leaves in water for 1 hour to remove bitterness.",
      "Drain and rinse.",
      "Sauté onion and garlic in palm oil.",
      "Add leaves and more water.",
      "Add smoked fish.",
      "Simmer 2 hours until very soft.",
      "Season and serve with fufu or rice."
    ],
    tips: [
      "Long cooking removes bitterness",
      "Frozen pounded leaves available in African stores",
      "Should be smooth and silky"
    ]
  },
  {
    id: "moambe-chicken",
    name: "Moambe Chicken (Palm Nut Chicken)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "special",
    description: "DRC's national dish - chicken braised in rich palm nut cream. Silky, orange, and unforgettable.",
    culturalSignificance: "Moambe is the pride of Congolese cuisine, served at weddings, Christmas, and any celebration worth its name.",
    historicalContext: "Palm trees are native to the Congo Basin. The Kongo developed moambe sauce long before European contact, making it one of Central Africa's most authentic dishes.",
    youtubeVideoId: "eN-pKRr6jDA",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Palm cream (moambe)", amount: "2 cups" },
      { item: "Onion", amount: "2 medium" },
      { item: "Garlic", amount: "6 cloves" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Scotch bonnet pepper", amount: "1" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season and brown chicken pieces.",
      "Remove chicken and sauté onions.",
      "Add garlic and tomato paste.",
      "Return chicken to pot.",
      "Add palm cream and pepper.",
      "Add water to cover.",
      "Simmer 1 hour until chicken is tender.",
      "Oil should float on top when ready.",
      "Serve with rice or fufu."
    ],
    tips: [
      "Palm cream in cans available at African stores",
      "The orange oil layer is a sign it's done",
      "Can substitute with palm oil + peanut butter"
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

// Get all recipes
export const getAllRecipes = (): Recipe[] => {
  return recipes;
};

// Get all unique tribe names from recipes
export const getRecipeTribeNames = (): { slug: string; name: string }[] => {
  const tribes = new Map<string, string>();
  recipes.forEach(recipe => {
    tribes.set(recipe.tribeSlug, recipe.tribeName);
  });
  return Array.from(tribes.entries()).map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
};

// Search recipes by query
export const searchRecipes = (query: string): Recipe[] => {
  const normalizedQuery = query.toLowerCase();
  return recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(normalizedQuery) ||
    recipe.tribeName.toLowerCase().includes(normalizedQuery) ||
    recipe.description.toLowerCase().includes(normalizedQuery) ||
    recipe.category.toLowerCase().includes(normalizedQuery)
  );
};

// Get similar recipes from other tribes (same category)
export const getSimilarRecipes = (recipeId: string, limit: number = 4): Recipe[] => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  return recipes
    .filter(r => r.id !== recipeId && r.tribeSlug !== recipe.tribeSlug && r.category === recipe.category)
    .slice(0, limit);
};
