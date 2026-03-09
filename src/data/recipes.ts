// Traditional African Recipes - Fact-checked from culinary sources

// Region definitions for filtering
export type RecipeRegion = 'east' | 'west' | 'southern' | 'central' | 'north' | 'horn';

export const recipeRegions: { id: RecipeRegion; name: string; emoji: string }[] = [
  { id: 'east', name: 'East Africa', emoji: '🇰🇪' },
  { id: 'west', name: 'West Africa', emoji: '🇳🇬' },
  { id: 'southern', name: 'Southern Africa', emoji: '🇿🇦' },
  { id: 'central', name: 'Central Africa', emoji: '🇨🇩' },
  { id: 'north', name: 'North Africa', emoji: '🇲🇦' },
  { id: 'horn', name: 'Horn of Africa', emoji: '🇪🇹' }
];

export interface NutritionalInfo {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  localName?: string; // Name in local language
  tribeSlug: string;
  tribeName: string;
  category: 'staple' | 'beverage' | 'special' | 'snack';
  region?: RecipeRegion; // Region for filtering
  country?: string; // ISO country code
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
    substitution?: string; // Alternative ingredient
  }[];
  instructions: string[];
  tips?: string[];
  variations?: string[];
  servingSuggestions?: string[]; // What to serve with
  nutritionalInfo?: NutritionalInfo; // Per serving estimates
  dietaryInfo?: string[]; // e.g., "Gluten-free", "Vegan", "High-protein"
  imageUrl?: string;
  youtubeVideoId?: string; // YouTube video ID for cooking tutorial
}

export const recipes: Recipe[] = [
  // ============ KIKUYU RECIPES ============
  {
    id: "mukimo",
    name: "Mũkimo",
    localName: "Mũkimo wa Ithiĩ",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "staple",
    description: "A traditional Kikuyu mashed dish combining potatoes, green peas, maize, and pumpkin leaves. The national dish of the Kikuyu people.",
    culturalSignificance: "Mũkimo is the signature dish of the Kikuyu people, served at celebrations, family gatherings, and important ceremonies. The green color from pumpkin leaves represents fertility and prosperity. No Kikuyu wedding is complete without mũkimo.",
    historicalContext: "Mũkimo has been central to Kikuyu agriculture for centuries, developed when the tribe settled in the fertile Central Highlands of Kenya around the 16th century. The dish evolved from indigenous crops grown on the slopes of Mount Kenya. During colonial times, it became a symbol of cultural identity and resistance, as the Kikuyu maintained their food traditions despite European influence. The Mau Mau fighters sustained themselves on mũkimo during the independence struggle.",
    youtubeVideoId: "5cuGbmPtLGE",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Potatoes", amount: "1 kg", notes: "Peeled and cubed", substitution: "Sweet potatoes for a sweeter version" },
      { item: "Green peas", amount: "2 cups", notes: "Fresh or dried (soak overnight if dried)", substitution: "Black-eyed peas" },
      { item: "Maize kernels", amount: "1 cup", notes: "Fresh or canned", substitution: "Hominy corn" },
      { item: "Pumpkin leaves (or spinach)", amount: "2 cups", notes: "Chopped", substitution: "Kale or collard greens" },
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
      "Add reserved potato water if too dry. Season with salt.",
      "Shape into a mound on a serving plate — the traditional presentation."
    ],
    tips: [
      "The key to good mũkimo is thorough mashing - no lumps should remain",
      "Traditional mũkimo uses a special wooden pestle called 'mũthi'",
      "Serve with nyama choma (roasted meat) or stew",
      "Leftover mũkimo can be fried the next day for a crispy version"
    ],
    variations: [
      "Some regions add beans instead of peas",
      "Butternut squash can substitute for pumpkin leaves",
      "Coastal version uses cassava instead of potatoes",
      "Modern versions add onions and garlic for extra flavor"
    ],
    servingSuggestions: [
      "Nyama choma (grilled meat) with kachumbari salad",
      "Beef or chicken stew",
      "Roasted goat ribs",
      "Steamed vegetables and avocado"
    ],
    nutritionalInfo: {
      calories: "~320 kcal",
      protein: "10g",
      carbs: "55g",
      fat: "8g",
      fiber: "7g",
      notes: "High in complex carbohydrates and plant protein from peas"
    },
    dietaryInfo: ["Vegetarian", "Gluten-free", "High-fiber", "Dairy-free (if using oil)"]
  },
  {
    id: "githeri",
    name: "Githeri",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "staple",
    description: "A hearty one-pot meal of boiled maize and beans, a protein-rich staple that has been a cornerstone of Kikuyu diet for centuries.",
    culturalSignificance: "Githeri was the everyday food of Kikuyu farmers, providing sustained energy for agricultural work. It remains a beloved comfort food across Kenya.",
    youtubeVideoId: "asMXjd5ePys",
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
    ],
    variations: [
      "Add diced carrots and cabbage for extra vegetables",
      "Stir in curry powder for a spiced version popular in Nairobi",
      "Use canned beans and corn for a quick weeknight version"
    ],
    servingSuggestions: [
      "Sliced avocado and kachumbari salad",
      "Chapati or ugali on the side",
      "Grilled sausages or nyama choma"
    ],
    nutritionalInfo: {
      calories: "~280 kcal",
      protein: "12g",
      carbs: "48g",
      fat: "6g",
      fiber: "9g",
      notes: "Excellent source of complementary plant proteins (maize + beans = complete amino acids)"
    },
    dietaryInfo: ["Vegan", "Gluten-free", "High-fiber", "High-protein"]
  },
  {
    id: "mutura",
    name: "Mũtura (Kikuyu Blood Sausage)",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "special",
    description: "Traditional Kikuyu sausage made from goat intestines stuffed with meat, blood, and spices. Kenya's version of blood sausage.",
    culturalSignificance: "Mũtura is traditionally prepared during ceremonies and celebrations. It represents the Kikuyu respect for using every part of a slaughtered animal.",
    youtubeVideoId: "xXwgFDXy4LQ",
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
    ],
    nutritionalInfo: {
      calories: "~220 kcal",
      protein: "18g",
      carbs: "3g",
      fat: "15g",
      fiber: "0g",
      notes: "Rich in iron from blood, high in protein. Organ meats provide B12 and zinc."
    },
    dietaryInfo: ["Gluten-free", "High-protein", "Keto-friendly"]
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
    youtubeVideoId: "2mJVG-uRKGg",
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
    youtubeVideoId: "lie8xwHRG44",
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
    historicalContext: "The Maasai have practiced sustainable blood harvesting for centuries. A small incision is made in the cow's jugular vein, blood is collected, and the wound heals. This provides protein and iron without slaughtering the animal, reflecting the Maasai philosophy that cattle are too valuable to kill casually.",
    youtubeVideoId: "cP4UMYBEyzY",
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
    localName: "Jollof / Ọrẹ",
    tribeSlug: "yoruba",
    tribeName: "Yoruba",
    category: "special",
    region: "west",
    country: "NG",
    description: "Nigeria's most famous rice dish - a one-pot meal of rice cooked in a rich tomato sauce with spices. The Yoruba claim the best version.",
    culturalSignificance: "Jollof is the centerpiece of Nigerian celebrations - from weddings to naming ceremonies. The 'Jollof Wars' between Nigeria and Ghana continue to this day. No party is complete without 'party jollof' — the smoky, slightly burnt version cooked over firewood for hundreds of guests.",
    historicalContext: "Jollof rice originated from the Wolof people of Senegal and Gambia in the 14th century, spreading across West Africa through trade routes. The dish evolved differently in each region - Nigerian Jollof uses tomatoes and peppers, while Senegalese thieboudienne uses more vegetables. The trans-Atlantic slave trade carried Jollof to the Americas, influencing dishes like Louisiana jambalaya and Charleston red rice.",
    youtubeVideoId: "jDbUg4f9EFw",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Long-grain rice", amount: "3 cups", notes: "Washed and drained", substitution: "Basmati or jasmine rice" },
      { item: "Tomatoes", amount: "6 large", notes: "Blended" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Red bell peppers", amount: "2", notes: "Blended" },
      { item: "Scotch bonnet peppers", amount: "2", notes: "Blended", substitution: "Habanero peppers" },
      { item: "Onions", amount: "2 large", notes: "1 blended, 1 sliced" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Chicken stock", amount: "4 cups", substitution: "Vegetable stock for vegan version" },
      { item: "Thyme", amount: "1 teaspoon" },
      { item: "Curry powder", amount: "1 teaspoon" },
      { item: "Bay leaves", amount: "3" },
      { item: "Salt and seasoning cubes", amount: "To taste" }
    ],
    instructions: [
      "Blend tomatoes, bell peppers, scotch bonnet, and one onion until smooth.",
      "Heat oil in a large pot and fry sliced onions until golden.",
      "Add tomato paste and fry for 2 minutes until darkened.",
      "Pour in the blended tomato mixture (ata rodo).",
      "Cook on high heat, stirring constantly until oil floats on top (about 20 minutes). This step is crucial — undercooked tomato base ruins the dish.",
      "Add chicken stock, thyme, curry, bay leaves, salt, and seasoning.",
      "Bring to a boil, then add washed rice.",
      "Stir once, reduce heat to very low, cover tightly with foil then lid.",
      "Cook for 30-40 minutes without opening until rice is done.",
      "Fluff with a fork. The bottom should have some crispy 'party jollof' (burnt bits).",
      "Let rest 5 minutes before serving to allow flavors to meld."
    ],
    tips: [
      "'Party Jollof' (slightly burnt bottom) is highly prized — don't discard it!",
      "Cook on very low heat after adding rice for best results",
      "Some add a bay leaf to absorb the tomato 'raw' taste",
      "For smoky jollof, place tin foil with hot coals inside the pot briefly before serving"
    ],
    variations: [
      "Add fried plantains on the side for a classic combination",
      "Mix in cooked chicken or beef for a heartier version",
      "Smoky jollof is made on firewood — the gold standard at Nigerian parties",
      "Ghanaian version uses more tomato paste and less blended tomatoes",
      "Senegalese original (thieboudienne) is a fish-based version"
    ],
    servingSuggestions: [
      "Fried plantain (dodo) and coleslaw",
      "Grilled chicken or fried turkey (peppered turkey)",
      "Moi moi (steamed bean pudding) on the side",
      "Chilled zobo (hibiscus) drink"
    ],
    nutritionalInfo: {
      calories: "~420 kcal",
      protein: "8g",
      carbs: "62g",
      fat: "16g",
      fiber: "3g",
      notes: "Rich in lycopene from tomatoes; add protein by serving with meat"
    },
    dietaryInfo: ["Gluten-free", "Dairy-free", "Can be made vegan"]
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
    youtubeVideoId: "BKUgOBK_ii8",
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
    youtubeVideoId: "fE0DuXu53Pk",
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
    historicalContext: "Maize was introduced to Africa by Portuguese traders in the 16th century. South African communities adopted it wholeheartedly, and pap became the symbol of unity across racial lines during and after apartheid. Today it remains essential at every South African gathering.",
    youtubeVideoId: "FtONP1xN8BM",
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
    youtubeVideoId: "yOr7sx6Usfg",
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
    youtubeVideoId: "Gt2D2Mj0VNw",
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
    youtubeVideoId: "R6eFH-RJsoM",
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
    historicalContext: "Romazava means 'clear broth' in Malagasy. The dish reflects Madagascar's unique position between Africa and Asia, combining zebu beef from African cattle traditions with Southeast Asian-influenced cooking techniques brought by the island's original settlers.",
    youtubeVideoId: "kKqQaQFw6OI",
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
    historicalContext: "Cassava was introduced to Madagascar by Portuguese traders. The Malagasy developed the technique of pounding the leaves to make them edible, creating ravitoto. The dish combines African cassava with Southeast Asian pork traditions.",
    youtubeVideoId: "VqZuQfz2Plk",
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
    historicalContext: "Koba evolved from rice-based sweets that likely came with early Southeast Asian settlers. The banana leaf wrapping technique is found across both African and Asian cuisines, showing Madagascar's unique cultural crossroads.",
    youtubeVideoId: "hxH9H2wqvmA",
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
    youtubeVideoId: "uyTdLT9QRZE",
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
    youtubeVideoId: "oNDwxXWM5To",
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
    historicalContext: "The Tuareg developed cheese-making as essential survival technology for trans-Saharan journeys. Dried cheese could sustain caravans for months, becoming both food and trade goods along the ancient salt roads.",
    youtubeVideoId: "qW-bfMqPM6c",
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
    historicalContext: "The Himba have maintained their pastoral lifestyle in Namibia's Kunene region for centuries. Butter-making near the sacred fire connects daily food production to spiritual practice, a tradition that has survived despite modernization.",
    youtubeVideoId: "7nS1JYQQ-BU",
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
    historicalContext: "Pearl millet (mahangu) has been cultivated in Southern Africa for over 4,000 years. The Himba and Herero peoples developed oshifima as their staple, adapting ancient grains to the semi-arid Namibian environment.",
    youtubeVideoId: "jcjKAF_G56g",
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
    historicalContext: "Fermented milk traditions in Southern Africa predate recorded history. The Himba calabash, passed through generations, contains beneficial bacteria that have evolved specifically with their herds, creating unique flavor profiles.",
    youtubeVideoId: "oNDwxXWM5To",
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
    youtubeVideoId: "z0VpR7jNz8M",
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
    youtubeVideoId: "SxsQzq7kRTg",
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
    youtubeVideoId: "1D6VzHHjaHU",
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
    id: "luwombo",
    name: "Luwombo (Steamed Banana Leaf Parcels)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "special",
    description: "Traditional Ugandan dish of meat or chicken steamed in banana leaves with groundnut sauce. A royal delicacy from the Buganda Kingdom.",
    culturalSignificance: "Luwombo was invented in 1887 by the personal chef of Kabaka Mwanga II. It's served at weddings, cultural ceremonies, and remains the ultimate Baganda feast dish.",
    historicalContext: "The dish was created for the Kabaka (King) of Buganda and quickly became associated with royal hospitality. The banana leaf steaming technique preserves flavors and nutrients while imparting a unique aroma.",
    youtubeVideoId: "-2kdqAm8M4A",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Chicken or beef", amount: "1 kg", notes: "Cut into pieces" },
      { item: "Banana leaves", amount: "8-10 large", notes: "Smoked over flame until pliable" },
      { item: "Groundnut paste", amount: "1 cup" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Onion", amount: "2 large", notes: "Chopped" },
      { item: "Green pepper", amount: "1", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "1 cup" }
    ],
    instructions: [
      "Smoke banana leaves over open flame until soft and pliable.",
      "Mix groundnut paste with water until smooth.",
      "Combine meat with tomatoes, onions, green pepper, and groundnut sauce.",
      "Season with salt.",
      "Place portions of the mixture onto banana leaves.",
      "Wrap tightly into parcels, securing with banana fiber or string.",
      "Arrange parcels in a large pot with a little water at the bottom.",
      "Cover and steam for 1.5-2 hours until meat is tender.",
      "Serve parcels unopened - guests unwrap at the table."
    ],
    tips: [
      "Smoking the leaves is essential for the authentic aroma",
      "Don't let water touch the parcels during steaming",
      "Can be made with chicken, beef, goat, or fish"
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
    youtubeVideoId: "KTwnEdUr_so",
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
  {
    id: "waakye",
    name: "Waakye (Rice and Beans)",
    tribeSlug: "akan",
    tribeName: "Akan/Hausa-Ghanaian",
    category: "staple",
    description: "Ghanaian rice and beans dish cooked with dried millet leaves (waakye leaves) that give it a distinctive reddish-brown color. Ghana's most popular street food.",
    culturalSignificance: "Waakye is Ghana's beloved national breakfast and lunch dish, sold by vendors on every street corner. It brings together Akan and Hausa culinary traditions.",
    historicalContext: "Waakye originated from Northern Ghana's Hausa traders who brought rice and bean dishes south. The name comes from the Hausa word for beans. The dish became a unifying Ghanaian food, transcending ethnic boundaries.",
    youtubeVideoId: "cpQ7f8z44io",
    prepTime: "8 hours (soaking)",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Black-eyed peas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Waakye leaves (dried millet stalks)", amount: "1 handful", notes: "Or use baking soda for color" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Water", amount: "8 cups" }
    ],
    instructions: [
      "Soak beans overnight. Drain and rinse.",
      "Wash waakye leaves and tie in a bundle.",
      "Boil beans with waakye leaves for 30 minutes until half-cooked.",
      "Add washed rice to the pot.",
      "Add more water if needed - rice should be covered.",
      "Cook until rice and beans are tender and water is absorbed.",
      "Remove waakye leaves before serving.",
      "Serve with shito (pepper sauce), spaghetti, gari, fried fish, and boiled eggs."
    ],
    tips: [
      "Waakye leaves give the authentic red-brown color",
      "If no waakye leaves, add 1/2 tsp baking soda for color",
      "The complete waakye plate includes many accompaniments"
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
    youtubeVideoId: "eFt-j42yaRY",
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
    youtubeVideoId: "vRNZ8tY9cPo",
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
    youtubeVideoId: "a52Hmi_w57g",
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
  },

  // ============ AMHARA (ETHIOPIA) RECIPES ============
  {
    id: "doro-wot",
    name: "Doro Wot (Ethiopian Chicken Stew)",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "special",
    description: "Ethiopia's national dish - spicy chicken stew slow-cooked in berbere spice and served with injera. The pride of Ethiopian cuisine.",
    culturalSignificance: "Doro Wot is the celebratory dish for Ethiopian holidays, especially Christmas (Genna) and Easter (Fasika). It represents the pinnacle of Ethiopian cooking.",
    historicalContext: "This dish has been prepared in the Ethiopian highlands for centuries. The complex berbere spice blend can contain up to 16 spices, and family recipes are closely guarded secrets.",
    youtubeVideoId: "Bz1x3khJvI8",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Chicken", amount: "1 whole", notes: "Cut into pieces" },
      { item: "Red onions", amount: "6 large", notes: "Finely chopped (no oil used initially!)" },
      { item: "Berbere spice", amount: "1/2 cup" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Eggs", amount: "6", notes: "Hard-boiled and scored" },
      { item: "Garlic", amount: "8 cloves", notes: "Minced" },
      { item: "Ginger", amount: "2 tablespoons", notes: "Fresh, minced" },
      { item: "Chicken stock", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Marinate chicken in lemon juice and salt for 30 minutes.",
      "Dry-sauté onions in pot for 30+ minutes until deeply caramelized.",
      "Add niter kibbeh and let onions absorb.",
      "Add berbere, garlic, and ginger. Cook 5 minutes.",
      "Add chicken stock and stir well.",
      "Add chicken pieces, cover and simmer 45 minutes.",
      "Score hard-boiled eggs and add to stew.",
      "Simmer another 15 minutes.",
      "Serve over injera with boiled egg per person."
    ],
    tips: [
      "The onions must cook WITHOUT oil first - this is key",
      "Authentic berbere makes all the difference",
      "The eggs should absorb the red color"
    ]
  },
  {
    id: "injera",
    name: "Injera (Ethiopian Sourdough Flatbread)",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "staple",
    description: "Spongy, sour flatbread made from teff flour. The foundation of every Ethiopian meal - both plate and utensil.",
    culturalSignificance: "Injera is sacred in Ethiopian culture. Meals are served on it, and pieces are torn to scoop up stews. Eating from shared injera builds community.",
    historicalContext: "Teff has been cultivated in Ethiopia for over 3,000 years. Injera's unique fermentation process was developed in the highlands and is found nowhere else in Africa.",
    youtubeVideoId: "4qEJbGc9Id8",
    prepTime: "3 days (fermentation)",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Teff flour", amount: "3 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix teff flour and water in large bowl.",
      "Cover loosely and ferment 2-3 days at room temperature.",
      "Batter should be bubbly and sour-smelling.",
      "Stir well before cooking.",
      "Heat large non-stick pan (mitad traditionally).",
      "Pour batter in spiral from outside to center.",
      "Cover and cook until bubbles form and top sets.",
      "Do not flip - remove when edges lift.",
      "Stack on plate and keep covered."
    ],
    tips: [
      "100% teff is traditional; some use teff-wheat mix",
      "Fermentation time affects sourness",
      "The surface should have 'eyes' (small holes)"
    ]
  },
  {
    id: "shiro-wot",
    name: "Shiro Wot (Chickpea Stew)",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "staple",
    description: "Silky, spiced chickpea stew that's the everyday comfort food of Ethiopia. Essential during fasting periods.",
    culturalSignificance: "Shiro is eaten during the 200+ fasting days when Ethiopian Orthodox Christians abstain from meat. It's nutritious, affordable, and universally loved.",
    historicalContext: "Ethiopian Orthodox fasting traditions created a rich vegan cuisine. Shiro represents this culinary creativity - simple ingredients transformed into something sublime.",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Shiro powder (roasted chickpea flour)", amount: "1 cup" },
      { item: "Red onion", amount: "1 large", notes: "Finely chopped" },
      { item: "Vegetable oil", amount: "1/4 cup" },
      { item: "Berbere spice", amount: "2 tablespoons" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Water", amount: "3 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Sauté onion in oil until soft.",
      "Add berbere and garlic, cook 2 minutes.",
      "Slowly add water and bring to simmer.",
      "Whisk in shiro powder gradually to prevent lumps.",
      "Simmer 20 minutes, stirring often.",
      "Add more water for desired consistency.",
      "Season with salt.",
      "Serve over injera."
    ],
    tips: [
      "Pre-mixed shiro powder includes spices",
      "Should be smooth like thick soup",
      "Can add tomato for tegabino variation"
    ]
  },

  // ============ OROMO (ETHIOPIA) RECIPES ============
  {
    id: "chechebsa",
    name: "Chechebsa (Kita Fir-Fir)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "staple",
    description: "Traditional Oromo breakfast - shredded flatbread tossed with spiced butter and berbere. Pure comfort food.",
    culturalSignificance: "Chechebsa is the traditional Oromo breakfast, often prepared for guests and special mornings. It's a symbol of Oromo hospitality.",
    historicalContext: "This dish reflects the pastoral and agricultural heritage of the Oromo. Simple ingredients - bread, butter, spice - become extraordinary through preparation.",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Flour", amount: "2 cups" },
      { item: "Water", amount: "1 cup" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Berbere", amount: "2 tablespoons" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Honey", amount: "Optional, for serving" }
    ],
    instructions: [
      "Mix flour, water, and salt into soft dough.",
      "Roll thin and cook on dry pan (like thick pancake).",
      "Tear cooked bread into bite-sized pieces.",
      "Melt niter kibbeh in pan.",
      "Add berbere to butter, mix well.",
      "Add torn bread pieces.",
      "Toss until bread absorbs spiced butter.",
      "Serve hot, optionally with honey."
    ],
    tips: [
      "The bread should be slightly crispy in places",
      "Niter kibbeh adds essential flavor",
      "Some serve with yogurt on the side"
    ]
  },
  {
    id: "buna-coffee-ceremony",
    name: "Buna (Oromo Coffee Ceremony)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "beverage",
    description: "The original coffee ceremony from the birthplace of coffee. Three rounds of freshly roasted and brewed coffee.",
    culturalSignificance: "Coffee originated in Oromia, and the Oromo have been drinking it for over 1,000 years. The ceremony is a spiritual and social ritual.",
    historicalContext: "Legend says an Oromo goatherd named Kaldi discovered coffee when his goats became energetic after eating coffee berries. The Oromo developed coffee culture before it spread globally.",
    prepTime: "15 minutes",
    cookTime: "45 minutes (for full ceremony)",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green coffee beans", amount: "1/2 cup" },
      { item: "Water", amount: "4 cups" },
      { item: "Sugar", amount: "To taste" },
      { item: "Incense", amount: "Traditional frankincense" },
      { item: "Popcorn or bread", amount: "Optional accompaniment" }
    ],
    instructions: [
      "Wash green coffee beans.",
      "Roast beans in pan over coals, shaking constantly.",
      "When dark and aromatic, walk around to share the smell.",
      "Grind roasted beans with mortar and pestle.",
      "Add ground coffee to jebena (clay pot) with water.",
      "Boil on coals until foam rises.",
      "Pour first round (abol) into small cups.",
      "Add water and repeat for second (tona) and third (baraka) rounds."
    ],
    tips: [
      "The roasting smell is part of the ceremony",
      "Each round gets progressively weaker",
      "Incense burning is traditional",
      "Accept at least one cup - it's rude to refuse"
    ]
  },

  // ============ SWAHILI (COASTAL EAST AFRICA) RECIPES ============
  {
    id: "pilau",
    name: "Pilau (Swahili Spiced Rice)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Fragrant spiced rice that's the crown jewel of Swahili cuisine. A blend of African, Arab, and Indian influences.",
    culturalSignificance: "Pilau is served at weddings, Eid celebrations, and important gatherings across the Swahili coast. Each family has their own spice blend.",
    historicalContext: "Pilau reflects centuries of Indian Ocean trade. Arab and Persian traders brought rice and spices; the Swahili created something uniquely African from these influences.",
    youtubeVideoId: "UHdPJ3dqxjA",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Basmati rice", amount: "2 cups" },
      { item: "Beef or chicken", amount: "500g", notes: "Cubed" },
      { item: "Pilau masala", amount: "2 tablespoons" },
      { item: "Onions", amount: "2 large", notes: "Sliced thin" },
      { item: "Garlic", amount: "6 cloves" },
      { item: "Tomatoes", amount: "2 medium" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Stock", amount: "4 cups" },
      { item: "Whole spices", amount: "Cumin, cardamom, cinnamon, cloves" }
    ],
    instructions: [
      "Fry onions in oil until deeply browned.",
      "Add whole spices and fry 1 minute.",
      "Add meat and brown on all sides.",
      "Add tomatoes, garlic, and pilau masala.",
      "Add stock and simmer until meat is tender.",
      "Add washed rice.",
      "Cover tightly and cook on low heat.",
      "When water is absorbed, fluff with fork.",
      "Let rest 10 minutes before serving."
    ],
    tips: [
      "Browning onions properly is crucial",
      "Don't stir rice once added",
      "Pilau masala can be bought or made fresh"
    ]
  },
  {
    id: "biryani-swahili",
    name: "Swahili Biryani",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Layered rice and meat dish with East African coastal flair. More colorful and aromatic than subcontinental versions.",
    culturalSignificance: "Biryani came to the Swahili coast via Indian Ocean trade and became a Swahili specialty. It's the ultimate celebration dish.",
    historicalContext: "Mombasa and Lamu were major Indian Ocean ports. Biryani traveled from Persia through India to East Africa, evolving along the way.",
    youtubeVideoId: "b6kqhpzxw-0",
    prepTime: "1 hour",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Basmati rice", amount: "3 cups" },
      { item: "Chicken or goat", amount: "1 kg" },
      { item: "Yogurt", amount: "1 cup" },
      { item: "Onions", amount: "4 large" },
      { item: "Tomatoes", amount: "3 medium" },
      { item: "Biryani spice mix", amount: "3 tablespoons" },
      { item: "Ghee", amount: "1/2 cup" },
      { item: "Saffron or food color", amount: "For coloring rice" },
      { item: "Fried onions", amount: "For topping" }
    ],
    instructions: [
      "Marinate meat in yogurt and spices for 1 hour.",
      "Fry onions until crispy, reserve for topping.",
      "Cook meat with tomatoes until tender.",
      "Par-boil rice until 70% done.",
      "Layer meat and rice in pot.",
      "Add saffron-soaked milk on top.",
      "Seal pot with foil and lid.",
      "Cook on very low heat (dum) for 30 minutes.",
      "Mix gently and top with fried onions."
    ],
    tips: [
      "Dum cooking (low heat, sealed pot) is essential",
      "Potato slices at bottom prevent burning",
      "Serve with kachumbari salad"
    ]
  },
  {
    id: "mahamri",
    name: "Mahamri (Swahili Donuts)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "snack",
    description: "Cardamom-scented fried dough triangles. The beloved breakfast and tea-time treat of the Swahili coast.",
    culturalSignificance: "Mahamri are sold on every Swahili street corner, especially during Ramadan. They're the perfect accompaniment to spiced chai.",
    historicalContext: "This treat shows Indian and Arab influences on Swahili cuisine. Cardamom arrived via Indian Ocean trade and became essential to coastal cooking.",
    youtubeVideoId: "bD_5xWW1LlI",
    prepTime: "2 hours (rising)",
    cookTime: "20 minutes",
    servings: 12,
    difficulty: "medium",
    ingredients: [
      { item: "All-purpose flour", amount: "3 cups" },
      { item: "Coconut milk", amount: "1 cup" },
      { item: "Sugar", amount: "1/2 cup" },
      { item: "Yeast", amount: "1 tablespoon" },
      { item: "Cardamom powder", amount: "1 teaspoon" },
      { item: "Egg", amount: "1" },
      { item: "Oil for frying", amount: "As needed" }
    ],
    instructions: [
      "Warm coconut milk and dissolve sugar.",
      "Add yeast and let foam for 5 minutes.",
      "Mix flour and cardamom.",
      "Add yeast mixture and egg, knead to soft dough.",
      "Cover and let rise 1-2 hours until doubled.",
      "Roll out and cut into triangles.",
      "Deep fry until golden brown.",
      "Drain and serve warm."
    ],
    tips: [
      "Coconut milk makes them extra fragrant",
      "Don't overcrowd the frying pan",
      "Best eaten fresh and warm"
    ]
  },
  {
    id: "wali-wa-nazi",
    name: "Wali wa Nazi (Coconut Rice)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "staple",
    description: "Creamy coconut-infused rice that's a staple of the Swahili coast. Simple yet incredibly flavorful.",
    culturalSignificance: "Wali wa nazi accompanies almost every coastal meal. The coconut palms that line the coast provide the essential ingredient.",
    historicalContext: "Coconut has been central to Swahili cuisine for centuries. Before refrigeration, coconut milk was freshly pressed daily.",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Coconut milk", amount: "2 cups" },
      { item: "Water", amount: "1 cup" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Wash rice until water runs clear.",
      "Combine coconut milk and water in pot.",
      "Add salt and bring to boil.",
      "Add rice and stir once.",
      "Cover and reduce to very low heat.",
      "Cook 20 minutes until all liquid absorbed.",
      "Fluff with fork and serve."
    ],
    tips: [
      "Fresh coconut milk is best",
      "Don't lift lid while cooking",
      "Pairs perfectly with fish curry"
    ]
  },

  // ============ LUBA RECIPES (Central Africa) ============
  {
    id: "fufu-luba",
    name: "Fufu ya Luba",
    tribeSlug: "luba",
    tribeName: "Luba",
    category: "staple",
    description: "Traditional Luba-style cassava fufu, pounded until smooth and elastic. The foundation of every Luba meal.",
    culturalSignificance: "Fufu is the centerpiece of Luba hospitality. It's served with every important meal and demonstrates a cook's skill through its smooth texture.",
    historicalContext: "Cassava was introduced to Central Africa from the Americas in the 16th century and became the primary staple. The Luba Kingdom refined preparation techniques, making fufu an art form passed down through generations.",
    youtubeVideoId: "I8E5xGMb-Ok",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava flour", amount: "4 cups" },
      { item: "Water", amount: "6 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring water to a boil in a large pot.",
      "Gradually add cassava flour while stirring constantly with a wooden spoon.",
      "Keep stirring to prevent lumps forming.",
      "As mixture thickens, switch to a long wooden paddle (lukombe).",
      "Pound and fold the mixture vigorously for 15-20 minutes.",
      "The fufu is ready when smooth, elastic, and pulls away from pot sides.",
      "Shape into mounds using wet hands.",
      "Serve with moambe, saka-saka, or meat stews."
    ],
    tips: [
      "Good fufu should be smooth without any lumps",
      "The pounding action requires significant arm strength",
      "Wet your hands when shaping to prevent sticking"
    ]
  },
  {
    id: "moambe-luba",
    name: "Moambe (Palm Nut Chicken)",
    tribeSlug: "luba",
    tribeName: "Luba",
    category: "special",
    description: "Rich chicken stew cooked in palm nut sauce, the most celebrated dish of Central Africa. Also called poulet moambe.",
    culturalSignificance: "Moambe is the national dish of both Congos. In Luba culture, it's served at celebrations, weddings, and to honor important guests.",
    historicalContext: "Palm oil has been central to Congo Basin cuisines for millennia. This dish evolved in the Luba Kingdom courts where chefs refined the technique of extracting and cooking with palm cream.",
    youtubeVideoId: "vYkNcPJHXK4",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Palm nut cream (sauce graine)", amount: "2 cans or 500g fresh" },
      { item: "Onions", amount: "2 large" },
      { item: "Garlic", amount: "6 cloves" },
      { item: "Tomatoes", amount: "3 medium" },
      { item: "Scotch bonnet pepper", amount: "2", notes: "Optional" },
      { item: "Salt and seasoning", amount: "To taste" },
      { item: "Palm oil", amount: "3 tablespoons" }
    ],
    instructions: [
      "Season chicken with salt and garlic, let marinate 30 minutes.",
      "Brown chicken pieces in palm oil, set aside.",
      "Sauté onions and tomatoes until soft.",
      "Add palm nut cream and bring to simmer.",
      "Return chicken to pot.",
      "Add whole scotch bonnet (don't burst it for mild heat).",
      "Simmer for 45 minutes until chicken is tender and sauce thick.",
      "Serve with fufu or rice."
    ],
    tips: [
      "The sauce should be thick and coat the chicken",
      "Use palm nut cream, not palm oil",
      "The red oil that rises to top is prized"
    ]
  },
  {
    id: "saka-saka-luba",
    name: "Saka-Saka (Cassava Leaves)",
    tribeSlug: "luba",
    tribeName: "Luba",
    category: "staple",
    description: "Slow-cooked cassava leaves pounded smooth and simmered with palm oil and fish. The essential vegetable dish of the Congo.",
    culturalSignificance: "Saka-saka (called pondu in Kinshasa) is eaten daily across the Congo. Every family has their secret recipe passed down through generations.",
    historicalContext: "Cassava leaves have been a staple green vegetable in Central Africa since cassava's introduction. The extended cooking removes natural toxins and creates a rich, creamy texture.",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava leaves", amount: "1 kg", notes: "Pounded or frozen" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Dried fish or stockfish", amount: "200g" },
      { item: "Onions", amount: "2 large" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot pepper", amount: "Optional" }
    ],
    instructions: [
      "If using fresh leaves, pound in mortar until very fine.",
      "Soak dried fish in warm water for 30 minutes, clean and debone.",
      "In large pot, sauté onions in palm oil until soft.",
      "Add pounded cassava leaves.",
      "Add fish and garlic.",
      "Add enough water to cover.",
      "Simmer on low heat for 2+ hours, stirring occasionally.",
      "Leaves should become dark green and creamy.",
      "Season with salt and serve with fufu."
    ],
    tips: [
      "The longer you cook, the better the flavor",
      "Frozen cassava leaves work well if fresh unavailable",
      "The dish should be smooth without fibrous texture"
    ]
  },

  // ============ KONGO RECIPES (Central Africa) ============
  {
    id: "makayabu",
    name: "Makayabu (Salted Fish Stew)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "special",
    description: "Traditional Kongo salted fish cooked with tomatoes, onions, and palm oil. A beloved coastal delicacy from the former Kingdom of Kongo.",
    culturalSignificance: "Makayabu reflects the Kongo people's coastal trading heritage. Salt fish was a preserved protein that traveled well and became integral to Kongo cuisine.",
    historicalContext: "The Kingdom of Kongo controlled the mouth of the Congo River and engaged in extensive maritime trade. Salted fish preservation techniques developed for trade caravans moving inland became a culinary tradition.",
    youtubeVideoId: "3TthfvLT8ns",
    prepTime: "12 hours (soaking)",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Salted dried fish (makayabu)", amount: "500g" },
      { item: "Tomatoes", amount: "4 large" },
      { item: "Onions", amount: "3 large" },
      { item: "Palm oil", amount: "1/4 cup" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Hot pepper", amount: "To taste" },
      { item: "Green onions", amount: "For garnish" }
    ],
    instructions: [
      "Soak salted fish overnight, changing water 3-4 times to remove excess salt.",
      "Cut fish into serving pieces.",
      "Sauté onions in palm oil until golden.",
      "Add chopped tomatoes and cook until sauce forms.",
      "Add garlic and pepper.",
      "Add fish pieces and simmer for 30 minutes.",
      "Don't add extra salt - fish retains some.",
      "Garnish with green onions and serve with fufu or rice."
    ],
    tips: [
      "Thorough soaking is essential to remove excess salt",
      "The fish should flake easily when done",
      "Pairs perfectly with cassava fufu"
    ]
  },
  {
    id: "madesu-kongo",
    name: "Madesu ya Kongo (Kongo-Style Beans)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "staple",
    description: "Rich red beans simmered with palm oil, onions, and smoked fish. A protein-rich staple from the Kongo heartland.",
    culturalSignificance: "Beans are the everyday protein for most Kongo families. This dish represents home cooking and maternal care in Kongo culture.",
    historicalContext: "Beans have been cultivated in the Congo Basin for centuries. The combination with palm oil and smoked fish created a complete protein source that sustained communities.",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Red beans", amount: "500g" },
      { item: "Palm oil", amount: "1/4 cup" },
      { item: "Smoked fish", amount: "100g" },
      { item: "Onions", amount: "2 large" },
      { item: "Tomatoes", amount: "2 medium" },
      { item: "Garlic", amount: "3 cloves" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak beans overnight, drain and rinse.",
      "Boil beans in fresh water until nearly tender (1.5 hours).",
      "In separate pan, sauté onions in palm oil.",
      "Add tomatoes and cook until soft.",
      "Add garlic and smoked fish.",
      "Combine with beans and simmer for 30 minutes.",
      "Season with salt and serve with fufu or bread."
    ],
    tips: [
      "Soaking overnight reduces cooking time significantly",
      "The palm oil gives the dish its characteristic color",
      "Smoked fish adds depth of flavor"
    ]
  },
  {
    id: "nsamba-palm-wine",
    name: "Nsamba (Palm Wine)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "beverage",
    description: "Traditional fermented palm sap, the beloved drink of the Kongo people. Sweet when fresh, increasingly alcoholic as it ferments.",
    culturalSignificance: "Palm wine is central to Kongo ceremonies, negotiations, and hospitality. It's offered to guests and ancestors during rituals.",
    historicalContext: "Palm wine tapping has been practiced in the Kongo region for millennia. The technique of extracting sap from palm trees was refined over generations, and nsamba was traded along the river routes.",
    prepTime: "Traditional tapping",
    cookTime: "Fermentation varies",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh palm sap", amount: "5 liters", notes: "From tapped palm tree" },
      { item: "Natural yeast", amount: "Present in sap" }
    ],
    instructions: [
      "Palm wine is traditionally collected by tappers who climb raffia palms.",
      "An incision is made in the flower stem.",
      "A gourd or container collects the dripping sap.",
      "Fresh sap (sweet, low alcohol) is called nsamba ya mvimbi.",
      "After 24 hours fermentation, alcohol increases.",
      "After 48+ hours, becomes very strong (mayaka).",
      "Best consumed fresh for sweet, mild taste."
    ],
    tips: [
      "Fresh palm wine is sweetest and mildest",
      "Fermentation cannot be stopped easily",
      "Refrigeration slows fermentation",
      "Traditional tappers are highly skilled craftsmen"
    ]
  },

  // ============ MONGO RECIPES (Central Africa) ============
  {
    id: "liboke-mongo",
    name: "Liboke ya Ngolo (Fish in Banana Leaves)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "special",
    description: "Fresh river fish wrapped in banana leaves with herbs and spices, steamed to perfection. The signature dish of the Congo River peoples.",
    culturalSignificance: "Liboke represents the Mongo mastery of river resources. The banana leaf wrapping keeps the fish moist and infuses it with subtle flavors.",
    historicalContext: "The Mongo people developed sophisticated fishing techniques along the Congo River. Liboke evolved as a way to cook fish immediately after catching, using readily available banana leaves as natural cooking vessels.",
    youtubeVideoId: "cqt3dPt3BWY",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh river fish", amount: "1 kg", notes: "Tilapia, catfish, or captain" },
      { item: "Banana leaves", amount: "4 large pieces" },
      { item: "Onions", amount: "2 medium" },
      { item: "Tomatoes", amount: "2 medium" },
      { item: "Hot pepper", amount: "2 small" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Salt and seasoning", amount: "To taste" },
      { item: "Palm oil or peanut oil", amount: "3 tablespoons" }
    ],
    instructions: [
      "Clean and score the fish on both sides.",
      "Season with salt, garlic, and pepper.",
      "Soften banana leaves over flame (don't burn).",
      "Lay fish on banana leaf.",
      "Top with sliced onions, tomatoes, and drizzle with oil.",
      "Wrap tightly, securing with string or leaf strips.",
      "Steam over boiling water for 45 minutes.",
      "Alternatively, grill over charcoal.",
      "Serve in the leaf for presentation."
    ],
    tips: [
      "Fresh fish makes all the difference",
      "The leaf should be pliable but not burnt",
      "The juices collect in the packet"
    ]
  },
  {
    id: "mbinzo",
    name: "Mbinzo (Edible Caterpillars)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "special",
    description: "Edible caterpillars harvested from the rainforest, dried and fried crispy. A prized delicacy and protein source.",
    culturalSignificance: "Caterpillar season is eagerly anticipated in Mongo territory. Mbinzo are a sustainable forest protein and an important seasonal income source.",
    historicalContext: "The Mongo have harvested edible caterpillars for centuries, developing sophisticated knowledge of which species are safe and delicious. This forest wisdom is passed down through generations.",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Dried caterpillars (mbinzo)", amount: "500g" },
      { item: "Onions", amount: "2 medium" },
      { item: "Tomatoes", amount: "2 medium" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Garlic", amount: "3 cloves" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot pepper", amount: "Optional" }
    ],
    instructions: [
      "If dried, briefly soak caterpillars in warm water to soften.",
      "Drain thoroughly and pat dry.",
      "Heat palm oil in a pan.",
      "Fry caterpillars until crispy, about 10 minutes.",
      "Add onions and cook until soft.",
      "Add tomatoes, garlic, and pepper.",
      "Simmer for 5 minutes.",
      "Season with salt.",
      "Serve as a snack or with fufu."
    ],
    tips: [
      "Dried caterpillars should be properly prepared before cooking",
      "They should be crispy on the outside",
      "High in protein and sustainable"
    ]
  },
  {
    id: "lituma-mongo",
    name: "Lituma (Plantain Balls)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "staple",
    description: "Pounded plantains formed into balls, a starchy staple of the Mongo people. Similar to fufu but made with plantains.",
    culturalSignificance: "Lituma is everyday comfort food in Mongo households. The pounding process is traditionally done by women using large wooden mortars.",
    historicalContext: "Plantains thrive in the humid Congo Basin climate. The Mongo developed lituma as a way to prepare this abundant crop into a filling staple food.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Green plantains", amount: "6 large" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Water", amount: "For boiling" }
    ],
    instructions: [
      "Peel plantains and cut into chunks.",
      "Boil until very soft, about 25 minutes.",
      "Drain and transfer to mortar.",
      "Pound vigorously until smooth and elastic.",
      "Add salt while pounding.",
      "Wet hands and form into balls.",
      "Serve immediately with any stew or sauce."
    ],
    tips: [
      "Use green (unripe) plantains for best texture",
      "Pound while still hot for smooth results",
      "Serve immediately - they harden when cold"
    ]
  },

  // ============ SHONA RECIPES (Zimbabwe) ============
  {
    id: "sadza",
    name: "Sadza",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Zimbabwe's national dish - a thick maize porridge that is the foundation of every meal. Served with relishes of meat, vegetables, or beans.",
    culturalSignificance: "Sadza is not just food - it's identity. A meal without sadza isn't considered a proper meal. The ability to make smooth sadza is a mark of a good cook.",
    historicalContext: "When maize arrived in Africa via Portuguese traders in the 16th century, it transformed diets across the continent. The Shona adapted it into sadza, which replaced earlier millet and sorghum porridges.",
    youtubeVideoId: "hFxNxr2H5qE",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "White maize meal (mealie meal)", amount: "500g" },
      { item: "Water", amount: "1.5 liters" },
      { item: "Salt", amount: "Pinch (optional)" }
    ],
    instructions: [
      "Bring water to a rolling boil in a heavy-bottomed pot.",
      "Add a handful of maize meal and stir to make thin porridge (bota).",
      "Let this simmer for 5 minutes.",
      "Gradually add remaining maize meal, stirring continuously with wooden paddle (mugoti).",
      "Keep stirring vigorously - lumps are unacceptable.",
      "The sadza is ready when it pulls away from the pot sides cleanly.",
      "It should be thick enough to mold but not dry.",
      "Serve immediately with any relish (nyama, muriwo, beans)."
    ],
    tips: [
      "Vigorous stirring is essential for smooth texture",
      "Traditionally stirred with a wooden paddle in one direction",
      "Should hold its shape when scooped"
    ]
  },
  {
    id: "madora",
    name: "Madora (Mopane Worms)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "special",
    description: "Dried mopane caterpillars, a protein-rich delicacy fried crispy and served as a relish or snack. A sustainable, traditional protein source.",
    culturalSignificance: "Madora season is eagerly anticipated. These caterpillars are harvested from mopane trees and are an important income source for rural women. They're packed with protein.",
    historicalContext: "Mopane worms have been eaten for centuries in Southern Africa. They were a crucial survival food and remain an important part of food security. Export markets now exist for dried madora.",
    youtubeVideoId: "LkpxU3cFHAk",
    prepTime: "30 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Dried madora (mopane worms)", amount: "500g" },
      { item: "Onion", amount: "1 large" },
      { item: "Tomatoes", amount: "3 medium" },
      { item: "Cooking oil", amount: "4 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Garlic", amount: "2 cloves" },
      { item: "Green pepper", amount: "1" }
    ],
    instructions: [
      "Soak dried madora in warm water for 20-30 minutes to soften.",
      "Drain and squeeze out excess water.",
      "Some remove the intestinal matter; others cook as-is for stronger flavor.",
      "Heat oil and fry madora until starting to crisp, about 10 minutes.",
      "Add chopped onions and garlic, cook until soft.",
      "Add tomatoes and green pepper.",
      "Season with salt and simmer for 10 minutes.",
      "Serve with sadza as a protein-rich relish."
    ],
    tips: [
      "Fresh madora from the bush are more tender",
      "The crispy version (dry-fried) is popular as a snack",
      "High in protein, zinc, and iron"
    ]
  },
  {
    id: "dovi",
    name: "Dovi (Peanut Butter Stew)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "A rich, creamy stew made with peanut butter, greens, and often chicken. The beloved comfort food of Zimbabwe.",
    culturalSignificance: "Dovi appears at every celebration. The rich peanut sauce makes simple vegetables luxurious. It's often the dish guests request when visiting Zimbabwean homes.",
    historicalContext: "Groundnuts (peanuts) came to Africa from South America via Portuguese traders. Africans quickly adopted them, creating dishes like dovi that are now considered traditionally African.",
    youtubeVideoId: "Gq5nLFxLPxE",
    prepTime: "15 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Peanut butter (natural)", amount: "1 cup", notes: "Unsweetened" },
      { item: "Chicken pieces", amount: "1 kg", notes: "Or beef/goat" },
      { item: "Onion", amount: "2 medium" },
      { item: "Tomatoes", amount: "3 large" },
      { item: "Leafy greens (collard/kale)", amount: "1 bunch" },
      { item: "Water or stock", amount: "2 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Cooking oil", amount: "3 tablespoons" }
    ],
    instructions: [
      "Season and brown chicken pieces in oil. Set aside.",
      "Sauté onions until golden.",
      "Add chopped tomatoes and cook until soft.",
      "Mix peanut butter with water until smooth.",
      "Add peanut mixture to pot.",
      "Return chicken, stir well.",
      "Simmer for 30 minutes until chicken is cooked.",
      "Add greens in last 5 minutes.",
      "Serve over sadza."
    ],
    tips: [
      "Natural peanut butter works best - no added sugar",
      "The oil should separate when fully cooked",
      "Can substitute beef, goat, or make vegetarian"
    ]
  },

  // ============ WOLOF RECIPES (Senegal) ============
  {
    id: "thieboudienne",
    name: "Thiéboudiène (Senegalese Fish & Rice)",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "special",
    description: "Senegal's national dish - a flavorful one-pot meal of fish, rice, and vegetables in rich tomato sauce. The original 'Jollof' dish.",
    culturalSignificance: "Thiéboudiène is served at every celebration. It's considered the mother of all Jollof-type dishes, predating Nigerian and Ghanaian versions.",
    historicalContext: "Created in Saint-Louis, Senegal in the 19th century by Penda Mbaye. The dish spread across West Africa, evolving into various Jollof rice traditions. Senegalese insist theirs is the original and best.",
    youtubeVideoId: "u0BGGKQN9x8",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Whole fish (grouper/red snapper)", amount: "1.5 kg" },
      { item: "Broken rice (riz brisé)", amount: "500g" },
      { item: "Tomato paste", amount: "200g" },
      { item: "Onions", amount: "3 large" },
      { item: "Cabbage", amount: "1/4 head" },
      { item: "Carrots", amount: "3" },
      { item: "Eggplant", amount: "1" },
      { item: "Cassava", amount: "200g" },
      { item: "Hot pepper (piment)", amount: "2" },
      { item: "Vegetable oil", amount: "1 cup" },
      { item: "Dried fish (guedj)", amount: "100g" },
      { item: "Tamarind", amount: "2 tablespoons" }
    ],
    instructions: [
      "Stuff fish with rof (parsley, garlic, pepper paste). Set aside.",
      "Fry onions until dark brown (this is crucial for color).",
      "Add tomato paste and fry until oil separates.",
      "Add water, dried fish, and vegetables (hardest first: cassava, carrots).",
      "Simmer until vegetables are half-cooked.",
      "Remove vegetables, add fish, cook until done.",
      "Remove fish, add rice to the pot.",
      "Cook rice in the fish broth until done.",
      "Arrange rice on platter, top with fish and vegetables.",
      "The crispy rice at bottom (xoone) is prized."
    ],
    tips: [
      "The darkened onions give the dish its red color",
      "Broken rice absorbs more flavor than whole grain",
      "Each vegetable should retain its shape"
    ]
  },
  {
    id: "yassa-poulet",
    name: "Yassa Poulet (Onion Chicken)",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "special",
    description: "Grilled chicken smothered in tangy caramelized onion and lemon sauce. One of Senegal's most beloved dishes.",
    culturalSignificance: "Yassa originated in the Casamance region but is now beloved nationwide. The dish is a celebration centerpiece and represents Senegalese hospitality.",
    historicalContext: "Yassa comes from the Jola people of Casamance in southern Senegal. It gained national popularity and is now considered a Senegalese classic rather than regional.",
    youtubeVideoId: "1EzHQ-6kfN0",
    prepTime: "4 hours (marinating)",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken pieces", amount: "1.5 kg" },
      { item: "Onions", amount: "1 kg", notes: "Sliced thin" },
      { item: "Lemon juice", amount: "1 cup" },
      { item: "Mustard (Dijon)", amount: "3 tablespoons" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Hot pepper", amount: "2 small" },
      { item: "Garlic", amount: "6 cloves" },
      { item: "Olives (green)", amount: "1/2 cup", notes: "Optional" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Marinate chicken in lemon juice, half the onions, garlic, and mustard for 4+ hours.",
      "Remove chicken, reserve marinade and onions.",
      "Grill or pan-fry chicken until golden and cooked through.",
      "In large pot, sauté remaining fresh onions until soft.",
      "Add marinated onions and cook until caramelized.",
      "Add reserved marinade and simmer.",
      "Add grilled chicken to the onion sauce.",
      "Add olives if using, simmer 15 minutes.",
      "Serve with white rice."
    ],
    tips: [
      "The longer the marinade, the better the flavor",
      "Caramelized onions should be deeply golden",
      "Fish version (yassa poisson) is equally popular"
    ]
  },

  // ============ AMHARA RECIPES (Ethiopia) ============
  {
    id: "shiro-wet",
    name: "Shiro Wet",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "staple",
    description: "Creamy chickpea flour stew spiced with berbere. The everyday comfort food of Ethiopian fasting and beyond.",
    culturalSignificance: "Shiro is eaten on fasting days (no meat/dairy) but loved every day. It's affordable, nutritious, and universally beloved across Ethiopia.",
    historicalContext: "During the many fasting periods of Ethiopian Orthodox Christianity (over 200 days a year), shiro became essential. It provides protein from legumes during meat-free periods.",
    youtubeVideoId: "L4Rw0ZkwMOA",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Shiro flour (chickpea/fava blend)", amount: "1 cup" },
      { item: "Water", amount: "3 cups" },
      { item: "Oil (olive or vegetable)", amount: "1/4 cup" },
      { item: "Onion", amount: "1 large", notes: "Very finely chopped" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Tomato", amount: "1 large" },
      { item: "Berbere spice", amount: "1-2 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Sauté onions in oil until deeply caramelized (no shortcuts here).",
      "Add garlic and cook 1 minute.",
      "Add chopped tomato and cook until broken down.",
      "Add berbere and stir well.",
      "Mix shiro flour with water until smooth.",
      "Gradually add shiro mixture to pot, stirring constantly.",
      "Simmer on low, stirring often, until thickened (15-20 minutes).",
      "Adjust consistency with water if needed.",
      "Serve on injera."
    ],
    tips: [
      "Constant stirring prevents lumps",
      "Should be thick but pourable",
      "Drizzle with oil before serving for traditional finish"
    ]
  },

  // ============ SOMALI RECIPES (Horn of Africa) ============
  {
    id: "somali-bariis",
    name: "Bariis Iskukaris (Somali Rice)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "special",
    description: "Fragrant Somali spiced rice with meat, featuring xawaash (Somali spice blend). The centerpiece of Somali celebrations and family gatherings.",
    culturalSignificance: "Bariis is served at every Somali celebration - weddings, Eid, and family gatherings. The xawaash spice blend is passed down through generations, and each family has their own secret recipe.",
    historicalContext: "Somali cuisine reflects centuries of trade across the Indian Ocean. Spices from India, Arabia, and East Africa blend into xawaash. Basmati rice became central to Somali food through these ancient trade connections with South Asia.",
    youtubeVideoId: "gOKGCiGqmlI",
    prepTime: "1 hour (soaking)",
    cookTime: "45 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Basmati rice", amount: "3 cups", notes: "Washed and soaked for 1 hour" },
      { item: "Beef or goat", amount: "500g", notes: "Cubed" },
      { item: "Onion", amount: "2 large", notes: "Sliced" },
      { item: "Xawaash spice", amount: "2-3 tablespoons", notes: "Somali spice blend" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 tablespoon", notes: "Minced" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Cardamom pods", amount: "4-5" },
      { item: "Cinnamon stick", amount: "1" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak rice in water for at least 1 hour, then drain.",
      "In a large pot, brown meat with onions in oil until golden.",
      "Add garlic, ginger, and cook until fragrant.",
      "Add xawaash, cumin, cardamom, cinnamon, and tomato paste. Stir well.",
      "Add water to cover meat and simmer until tender (30-40 minutes).",
      "Parboil rice separately until half-cooked. Drain.",
      "Layer rice over the meat mixture.",
      "Add more water if needed (should come just below rice level).",
      "Cover tightly and cook on low heat until rice is done (15-20 minutes).",
      "Fluff gently and serve with banana and salad."
    ],
    tips: [
      "The bottom layer (xabag) should be slightly crispy - this is the prized part",
      "Xawaash can be made at home with cumin, coriander, turmeric, cardamom, cinnamon, and cloves",
      "Traditionally served with banana slices on the side"
    ],
    variations: [
      "Bariis iyo Digaag (with chicken)",
      "Bariis iyo Hilib Ari (with goat meat)"
    ]
  },
  {
    id: "somali-suqaar",
    name: "Suqaar (Somali Sautéed Meat)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "special",
    description: "Tender cubed beef or chicken sautéed with vegetables and Somali spices. A quick, flavorful dish served with rice or flatbread.",
    culturalSignificance: "Suqaar is everyday Somali comfort food - quick to prepare but packed with flavor. It's served at breakfast with canjeero or at dinner with rice.",
    historicalContext: "Suqaar showcases the Somali mastery of meat preparation. As pastoral nomads, Somalis developed numerous techniques for cooking beef, goat, and camel, each highlighting the quality of their livestock.",
    youtubeVideoId: "psABYXyNlTQ",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Beef or chicken", amount: "500g", notes: "Cubed small" },
      { item: "Onion", amount: "1 large", notes: "Diced" },
      { item: "Bell pepper", amount: "1", notes: "Diced" },
      { item: "Tomatoes", amount: "2 medium", notes: "Chopped" },
      { item: "Garlic", amount: "3 cloves", notes: "Minced" },
      { item: "Xawaash spice", amount: "1 tablespoon" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Coriander powder", amount: "1 teaspoon" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Fresh cilantro", amount: "For garnish" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season meat with xawaash, cumin, coriander, salt, and pepper.",
      "Heat oil in a large pan over high heat.",
      "Add meat and sear until browned on all sides.",
      "Add onion and garlic, cook until softened.",
      "Add bell pepper and tomatoes.",
      "Reduce heat and cook until vegetables are tender and sauce thickens.",
      "Garnish with fresh cilantro.",
      "Serve with rice, canjeero, or chapati."
    ],
    tips: [
      "Cut meat into small, uniform pieces for even cooking",
      "High heat is key for good sear",
      "Can add potatoes or carrots for a heartier dish"
    ]
  },
  {
    id: "somali-canjeero",
    name: "Canjeero (Somali Flatbread)",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "staple",
    description: "Spongy, fermented flatbread similar to Ethiopian injera but sweeter. The foundation of Somali breakfast.",
    culturalSignificance: "Canjeero is eaten every morning in Somali households, typically with tea, honey, and butter (subag). It's a symbol of Somali hospitality.",
    historicalContext: "While similar to Ethiopian injera, Somali canjeero has a distinct sweeter taste and is made with different flour blends. It reflects the shared culinary heritage of the Horn of Africa while maintaining Somali identity.",
    youtubeVideoId: "upwo318A830",
    prepTime: "12 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "All-purpose flour", amount: "2 cups" },
      { item: "Cornmeal", amount: "1/2 cup" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Sugar", amount: "2 tablespoons" },
      { item: "Warm water", amount: "3 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix flour, cornmeal, yeast, and sugar in a large bowl.",
      "Gradually add warm water, whisking until smooth batter forms.",
      "Cover and let ferment overnight (8-12 hours) at room temperature.",
      "The next day, add salt and mix. Batter should be bubbly.",
      "Heat a non-stick pan over medium heat.",
      "Pour batter in a thin layer, starting from the center.",
      "Cover and cook until the top is set and bubbly (don't flip).",
      "Remove and stack on a plate. Serve with honey and butter."
    ],
    tips: [
      "The longer fermentation gives more tangy flavor",
      "Batter should be thinner than pancake batter",
      "Cook only on one side - the bubbles create the signature texture"
    ]
  },

  // ============ OROMO RECIPES (Ethiopia) ============
  {
    id: "oromo-kitfo",
    name: "Kitfo (Ethiopian Raw Beef)",
    tribeSlug: "oromo",
    tribeName: "Oromo",
    category: "special",
    description: "Minced raw beef seasoned with mitmita (chili spice) and niter kibbeh (spiced butter). Ethiopia's beloved delicacy, especially treasured by the Gurage but enjoyed nationwide.",
    culturalSignificance: "Kitfo is associated with celebrations and special occasions. Eating it raw (leb leb) is traditional, though it can be lightly cooked (kitfo betam leb leb). It's considered a dish of honor served to important guests.",
    historicalContext: "Kitfo has been part of Ethiopian cuisine for centuries, particularly among the Gurage people. The dish represents Ethiopian cattle-herding traditions and the cultural significance of beef. The berbere and niter kibbeh that season it reflect Ethiopia's ancient spice trade.",
    youtubeVideoId: "xyDaVnScJe4",
    prepTime: "20 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh lean beef", amount: "500g", notes: "Very freshly minced" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup", notes: "Melted" },
      { item: "Mitmita", amount: "2 tablespoons", notes: "Ethiopian chili spice" },
      { item: "Korerima (Ethiopian cardamom)", amount: "1 teaspoon", notes: "Ground" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Ensure beef is extremely fresh - buy from a trusted butcher.",
      "Mince the beef very finely or have the butcher do it.",
      "Warm the niter kibbeh until just melted - not hot.",
      "In a warm bowl, combine the minced beef with warm butter.",
      "Add mitmita, korerima, and salt.",
      "Mix gently but thoroughly.",
      "For raw (leb leb): Serve immediately in a clay pot.",
      "For light cooked: Warm briefly in a pan, keeping it rare.",
      "Serve with ayib (Ethiopian cottage cheese), gomen, and injera."
    ],
    tips: [
      "Freshness is critical - the beef should be ground the same day",
      "The butter should be warm, not hot, to avoid cooking the meat",
      "Traditional serving is in a clay pot (gan) to keep it warm"
    ]
  },

  // ============ TIGRINYA/ERITREAN RECIPES ============
  {
    id: "eritrean-zigni",
    name: "Tsebhi Zigni (Eritrean Spicy Beef Stew)",
    tribeSlug: "tigrinya",
    tribeName: "Tigrinya",
    category: "special",
    description: "Rich, spicy beef stew made with berbere spice and tomatoes. Eritrea's most beloved dish, similar to Ethiopian doro wet but made with beef.",
    culturalSignificance: "Zigni is the heart of Eritrean cuisine, served at holidays, weddings, and Sunday family meals. Making good zigni is a mark of culinary skill.",
    historicalContext: "While sharing roots with Ethiopian cuisine, Eritrean zigni developed its own character during Italian colonial influence and Eritrea's unique history. The dish reflects centuries of highland cattle-herding traditions.",
    youtubeVideoId: "uPvmhQkCLFQ",
    prepTime: "20 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef", amount: "1 kg", notes: "Cubed" },
      { item: "Red onions", amount: "4 large", notes: "Finely diced" },
      { item: "Berbere spice", amount: "4 tablespoons" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Niter kibbeh (spiced butter)", amount: "1/2 cup" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 tablespoon", notes: "Grated" },
      { item: "Beef stock", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Dry-cook onions in a heavy pot over medium heat, stirring constantly for 15-20 minutes until deeply browned (no oil needed).",
      "Add niter kibbeh and continue cooking for 5 minutes.",
      "Add berbere and tomato paste, cook for 5 minutes.",
      "Add garlic and ginger, cook for 2 minutes.",
      "Add beef pieces and brown on all sides.",
      "Add stock, cover, and simmer for 1.5-2 hours until beef is tender.",
      "Adjust seasoning and serve with injera."
    ],
    tips: [
      "The key is dry-cooking onions until deeply caramelized",
      "Berbere spice is essential - no substitutes",
      "The stew should be thick and rich, not watery"
    ]
  },

  // ============ DJIBOUTI/AFAR RECIPES ============
  {
    id: "djibouti-fah-fah",
    name: "Fah-Fah (Djibouti Lamb Soup)",
    tribeSlug: "afar",
    tribeName: "Afar",
    category: "special",
    description: "Hearty lamb or goat soup with vegetables and spices. Djibouti's national comfort food, often served with flatbread.",
    culturalSignificance: "Fah-fah is everyday food in Djibouti and the Afar region, nourishing families in the harsh desert climate. It's served at breakfast, for lunch, and as a restorative meal.",
    historicalContext: "The Afar people have thrived in one of Earth's hottest regions for millennia. Fah-fah reflects their pastoral traditions and the importance of lamb and goat in their diet. The soup provides essential hydration and nutrition in the desert.",
    youtubeVideoId: "rSBRekdNG0g",
    prepTime: "15 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Lamb or goat", amount: "500g", notes: "On the bone" },
      { item: "Onion", amount: "2 medium", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Potatoes", amount: "2 large", notes: "Cubed" },
      { item: "Carrots", amount: "2 medium", notes: "Sliced" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Coriander", amount: "1 teaspoon" },
      { item: "Fresh cilantro", amount: "For garnish" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "8 cups" }
    ],
    instructions: [
      "In a large pot, combine lamb with water and bring to boil.",
      "Skim any foam that rises to the surface.",
      "Add onion, garlic, cumin, and coriander.",
      "Simmer for 45 minutes until meat starts to become tender.",
      "Add tomatoes, potatoes, and carrots.",
      "Continue cooking for 30-45 minutes until vegetables are soft.",
      "Season with salt.",
      "Garnish with fresh cilantro.",
      "Serve hot with lahoh (flatbread) or rice."
    ],
    tips: [
      "Bone-in meat gives the best flavor",
      "The soup should be brothier than a stew",
      "Some add green chili for extra heat"
    ]
  }
];

// Helper function to get recipes by tribe
export const getRecipesByTribe = (tribeSlug: string): Recipe[] => {
  return recipes.filter(recipe => recipe.tribeSlug === tribeSlug);
};

// Deduplicate recipes by id, keeping the most detailed version
function deduplicateRecipes(recipeList: Recipe[]): Recipe[] {
  const seen = new Map<string, Recipe>();
  for (const recipe of recipeList) {
    const existing = seen.get(recipe.id);
    if (!existing) {
      seen.set(recipe.id, recipe);
    } else {
      const existingScore = (existing.nutritionalInfo ? 10 : 0) + (existing.historicalContext ? 5 : 0) + (existing.variations?.length || 0) + (existing.description?.length || 0);
      const newScore = (recipe.nutritionalInfo ? 10 : 0) + (recipe.historicalContext ? 5 : 0) + (recipe.variations?.length || 0) + (recipe.description?.length || 0);
      if (newScore > existingScore) {
        seen.set(recipe.id, recipe);
      }
    }
  }
  return Array.from(seen.values());
}

// Helper function to get recipe by ID (returns most detailed version)
export const getRecipeById = (id: string): Recipe | undefined => {
  return deduplicateRecipes(recipes).find(recipe => recipe.id === id);
};

// Get all recipes (deduplicated)
export const getAllRecipes = (): Recipe[] => {
  return deduplicateRecipes(recipes);
};

// Helper function to find recipe by food name (for linking from food list)
export const findRecipeByName = (name: string, tribeSlug: string): Recipe | undefined => {
  const normalizedName = name.toLowerCase();
  return deduplicateRecipes(recipes).find(recipe => 
    recipe.tribeSlug === tribeSlug && 
    (recipe.name.toLowerCase().includes(normalizedName) || 
     normalizedName.includes(recipe.name.toLowerCase().split(' ')[0]))
  );
};

// Get all unique tribe names from recipes
export const getRecipeTribeNames = (): { slug: string; name: string }[] => {
  const tribes = new Map<string, string>();
  recipes.forEach(recipe => {
    tribes.set(recipe.tribeSlug, recipe.tribeName);
  });
  return Array.from(tribes.entries()).map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
};

// Get recipes filtered by region
export const getRecipesByRegion = (region: RecipeRegion): Recipe[] => {
  return recipes.filter(recipe => recipe.region === region);
};

// Get all unique countries from recipes
export const getRecipeCountries = (): string[] => {
  const countries = new Set<string>();
  recipes.forEach(recipe => {
    if (recipe.country) countries.add(recipe.country);
  });
  return Array.from(countries).sort();
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

// ============ BEVERAGE RECIPES ============
export const beverageRecipes: Recipe[] = [
  {
    id: "ginger-juice",
    name: "Ginger Juice (Omi Ata-ile)",
    tribeSlug: "yoruba",
    tribeName: "Yoruba",
    category: "beverage",
    description: "A potent, spicy-sweet beverage made from fresh ginger root. Sold by street vendors across Nigeria and believed to have numerous health benefits.",
    culturalSignificance: "Ginger juice is Nigeria's favorite health drink - taken for colds, digestion, and energy. Street vendors ('zobo sellers') often add it to zobo as a 'booster.' Men especially prize it for believed vitality benefits.",
    historicalContext: "While ginger came to Africa via Arab trade routes, Nigerians developed unique concentrated ginger drinks. The Kaduna region is Nigeria's ginger heartland, producing export-quality ginger.",
    youtubeVideoId: "nFCzFp8k9tE",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh ginger root", amount: "200g", notes: "Peeled and chopped" },
      { item: "Water", amount: "500ml", notes: "Cold or room temperature" },
      { item: "Honey or sugar", amount: "2-4 tablespoons", notes: "To taste" },
      { item: "Lemon or lime juice", amount: "2 tablespoons", notes: "Optional" },
      { item: "Pineapple chunks", amount: "1 cup", notes: "Optional, for sweetness" }
    ],
    instructions: [
      "Peel the ginger root thoroughly using a spoon edge or peeler.",
      "Cut ginger into small chunks for easier blending.",
      "Add ginger and half the water to a blender.",
      "Blend on high until completely smooth (2-3 minutes).",
      "Strain through a fine mesh sieve or cheesecloth, pressing to extract all juice.",
      "Add remaining water, sweetener, and citrus juice if using.",
      "Stir well and taste. Adjust sweetness - it should be spicy but balanced.",
      "Serve over ice or chilled. Keeps refrigerated for 5-7 days."
    ],
    tips: [
      "Use young ginger for milder flavor, mature for more heat",
      "Add pineapple during blending for natural sweetness",
      "The pulp can be used in cooking or dried for tea",
      "Dilute further if too spicy for your taste"
    ],
    variations: [
      "Add turmeric for 'golden ginger' drink",
      "Mix with zobo (hibiscus) for 'zobo with ginger'",
      "Blend with cucumber for cooling version"
    ]
  },
  {
    id: "zobo-drink",
    name: "Zobo (Hibiscus Drink)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "beverage",
    description: "Nigeria's beloved deep-red hibiscus drink, tangy, refreshing, and packed with vitamins. A staple at parties, celebrations, and sold everywhere on the streets.",
    culturalSignificance: "Zobo transcends ethnic boundaries in Nigeria - loved by all. Every family has their secret recipe. At parties, zobo is as essential as jollof rice. The drink symbolizes hospitality and celebration.",
    historicalContext: "Hibiscus tea has been consumed across Africa and the Middle East for centuries. In Nigeria, 'zobo' became the name, likely derived from local languages. The commercialization of zobo as a packaged drink began in the 1990s.",
    youtubeVideoId: "HxoGHpkCW7A",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 10,
    difficulty: "easy",
    ingredients: [
      { item: "Dried hibiscus flowers (zobo leaves)", amount: "3 cups", notes: "About 200g" },
      { item: "Water", amount: "4 liters" },
      { item: "Fresh ginger", amount: "100g", notes: "Sliced" },
      { item: "Pineapple", amount: "1 medium", notes: "Peeled, chopped (or use juice)" },
      { item: "Sugar or honey", amount: "1-2 cups", notes: "To taste" },
      { item: "Cloves", amount: "1 tablespoon", notes: "Optional" },
      { item: "Orange/lemon", amount: "2", notes: "Juiced, optional" }
    ],
    instructions: [
      "Rinse hibiscus flowers thoroughly to remove any sand or debris.",
      "Add hibiscus, ginger, and cloves to a large pot with water.",
      "Bring to a boil, then reduce heat and simmer for 20-30 minutes until deeply red.",
      "Remove from heat and let steep for additional 30 minutes (deeper flavor).",
      "Blend pineapple separately and strain to get juice.",
      "Strain the hibiscus liquid through fine mesh into a large container.",
      "Add pineapple juice, citrus juice, and sweetener while still warm.",
      "Stir well, taste, and adjust sweetness and tartness.",
      "Refrigerate until very cold. Serve over ice."
    ],
    tips: [
      "More ginger = spicier drink",
      "Fresh pineapple gives better flavor than canned",
      "Don't oversweeten - the tartness is part of the appeal",
      "Garlic is sometimes added for health benefits (use sparingly)"
    ],
    variations: [
      "Add cucumber for lighter, refreshing version",
      "Include dates for natural sweetness",
      "Ferment slightly for probiotic benefits"
    ]
  },
  {
    id: "bissap",
    name: "Bissap (Senegalese Hibiscus)",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "beverage",
    description: "Senegal's national drink - a fragrant hibiscus beverage often flavored with mint and orange blossom water. Served at every occasion.",
    culturalSignificance: "Bissap is to Senegal what tea is to England. Served to guests, at celebrations, and sold in every neighborhood. 'Bissap rouge' (red) is most popular, while 'bissap blanc' uses white sorrel.",
    youtubeVideoId: "q6JXq9P4FcY",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried hibiscus flowers", amount: "2 cups" },
      { item: "Water", amount: "2 liters" },
      { item: "Sugar", amount: "1 cup", notes: "Adjust to taste" },
      { item: "Fresh mint leaves", amount: "1/2 cup" },
      { item: "Orange blossom water", amount: "2 tablespoons", notes: "Optional, traditional" },
      { item: "Vanilla extract", amount: "1 teaspoon", notes: "Optional" }
    ],
    instructions: [
      "Rinse hibiscus flowers well.",
      "Boil water and pour over hibiscus in a large heatproof container.",
      "Add mint leaves and let steep for 2-3 hours or overnight for strongest flavor.",
      "Strain through fine mesh, pressing flowers to extract all liquid.",
      "Add sugar while slightly warm and stir to dissolve.",
      "Add orange blossom water and vanilla if using.",
      "Refrigerate until ice cold.",
      "Serve over ice, optionally with fresh mint garnish."
    ],
    tips: [
      "Orange blossom water is the secret to authentic Senegalese flavor",
      "Can be served room temperature in cooler weather",
      "Some add pineapple juice as in Nigerian zobo"
    ]
  },
  {
    id: "kunu-drink",
    name: "Kunu (Millet Drink)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "beverage",
    description: "A nutritious, slightly fermented millet beverage. Thick, filling, and often drunk as a light meal. The Hausa breakfast staple.",
    culturalSignificance: "Kunu is the Hausa morning drink - filling enough to sustain until lunch. Sold by women vendors who wake before dawn to prepare it. Considered essential for nursing mothers.",
    youtubeVideoId: "V8HXM4e7kHw",
    prepTime: "8 hours (soaking)",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet", amount: "2 cups" },
      { item: "Fresh ginger", amount: "50g" },
      { item: "Cloves", amount: "1 teaspoon" },
      { item: "Sweet potato", amount: "1 small", notes: "For sweetness and body" },
      { item: "Water", amount: "3 liters" },
      { item: "Sugar or honey", amount: "To taste" }
    ],
    instructions: [
      "Soak millet in water overnight (8+ hours).",
      "Drain and blend millet with ginger, cloves, and sweet potato.",
      "Add enough water to blend into smooth paste.",
      "Strain mixture through fine mesh, collecting the starchy liquid.",
      "Divide liquid: set half aside, boil the other half until thick.",
      "Gradually add the reserved raw liquid to the cooked portion, stirring.",
      "Continue cooking for 5 minutes until well combined.",
      "Cool, add sweetener, and refrigerate.",
      "Stir before serving as it separates. Serve chilled."
    ],
    tips: [
      "Kunu should be thick but drinkable - adjust water",
      "Sweet potato adds body and natural sweetness",
      "Fresh is best - drink within 2 days"
    ]
  },
  {
    id: "tangawizi-tea",
    name: "Tangawizi (Ginger Tea)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "beverage",
    description: "A warming Swahili tea made with fresh ginger, spices, and milk. The signature hospitality drink of the East African coast.",
    culturalSignificance: "Chai ya tangawizi is the Swahili welcome drink. Offered to every guest, drunk at breakfast and afternoon. The spice trade made ginger accessible on the coast for centuries.",
    youtubeVideoId: "JFKHoLnWQig",
    prepTime: "5 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh ginger", amount: "50g", notes: "Grated or smashed" },
      { item: "Black tea leaves", amount: "2 tablespoons" },
      { item: "Water", amount: "2 cups" },
      { item: "Milk", amount: "1 cup" },
      { item: "Sugar", amount: "3-4 tablespoons", notes: "Swahili chai is sweet" },
      { item: "Cardamom pods", amount: "3", notes: "Crushed, optional" }
    ],
    instructions: [
      "Smash ginger with the flat of a knife to release oils.",
      "Add water, ginger, and cardamom to a pot and bring to boil.",
      "Reduce heat and simmer for 5 minutes to extract ginger flavor.",
      "Add tea leaves and boil for 2-3 minutes.",
      "Add milk and sugar, return to boil.",
      "Reduce heat and simmer 2-3 minutes until chai-colored.",
      "Strain into cups and serve immediately while hot."
    ],
    tips: [
      "Swahili chai is boiled with milk, not added after",
      "Strong ginger is the signature - don't skimp",
      "Serve with mandazi (fried bread) for traditional pairing"
    ]
  },
  {
    id: "palm-wine",
    name: "Palm Wine (Mmanya Ngwo)",
    tribeSlug: "igbo",
    tribeName: "Igbo",
    category: "beverage",
    description: "Fresh sap tapped from palm trees, mildly alcoholic and refreshing. The traditional celebratory drink of much of Africa.",
    culturalSignificance: "Palm wine is sacred in Igbo culture - essential at traditional weddings, title-taking, and ancestor offerings. The palm wine tapper is a respected profession. Fresh 'sweet' wine is shared, older fermented wine is stronger.",
    historicalContext: "Palm wine has been drunk in Africa for millennia. It plays central roles in ceremonies from Nigeria to Cameroon to Congo. The tree itself represents life and prosperity.",
    youtubeVideoId: "Lj_6o7EV_Zk",
    prepTime: "N/A",
    cookTime: "N/A (tapped fresh)",
    servings: 1,
    difficulty: "hard",
    ingredients: [
      { item: "Oil palm or raffia palm tree", amount: "1", notes: "With sap" },
      { item: "Tapping gourd/container", amount: "1" },
      { item: "Calabash for serving", amount: "1" }
    ],
    instructions: [
      "Identify a mature palm tree (oil palm or raffia palm).",
      "Climb tree and make incision near the crown (skilled work).",
      "Attach container to collect the flowing sap.",
      "Leave overnight to collect sap.",
      "Retrieve in morning for sweetest wine (mmanya ọhụrụ - fresh wine).",
      "Serve fresh within hours for sweet taste.",
      "Allow to ferment 1-3 days for stronger wine.",
      "Distill fermented wine for ọgọgọrọ (local gin)."
    ],
    tips: [
      "Fresh palm wine is sweet; it ferments quickly in warm weather",
      "Best drunk the same day it's tapped",
      "The color should be milky white"
    ]
  }
];

// ============ CENTRAL AFRICAN RECIPES ============
const centralAfricanRecipes: Recipe[] = [
  {
    id: "poulet-moambe",
    name: "Poulet Moambé (Congolese Chicken in Palm Butter)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "special",
    description: "The national dish of DR Congo and Congo-Brazzaville - chicken slow-cooked in rich palm nut sauce. A creamy, earthy stew that defines Central African cuisine.",
    culturalSignificance: "Poulet Moambé is served at every important celebration - weddings, funerals, political gatherings. It represents hospitality and prosperity. The palm nut sauce (moambé) is the heart of Congolese cooking.",
    historicalContext: "Palm oil has been central to Central African cuisine for millennia. The Kongo Kingdom, which flourished from the 14th-19th century, developed elaborate court cuisine featuring moambé. Portuguese contact in the 15th century spread the dish's fame. During colonial times, Congolese cooks adapted the recipe for European tastes while maintaining its essence.",
    youtubeVideoId: "D7BqpKT4M6c",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1 whole", notes: "Cut into pieces, about 1.5kg" },
      { item: "Palm nut cream (moambé)", amount: "400g", notes: "Canned or fresh-pressed" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Scotch bonnet pepper", amount: "1", notes: "Whole, for heat" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Chicken stock", amount: "2 cups" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Bay leaves", amount: "2" }
    ],
    instructions: [
      "Season chicken pieces with salt, pepper, and half the garlic.",
      "Heat palm oil in a large pot. Brown chicken on all sides, then remove.",
      "Sauté onions until golden. Add remaining garlic and cook 1 minute.",
      "Add tomatoes and cook until soft and saucy, about 10 minutes.",
      "Return chicken to pot. Add palm nut cream and chicken stock.",
      "Add bay leaves and whole scotch bonnet (don't burst it unless you want extreme heat).",
      "Bring to simmer, then cover and cook on low for 1 hour.",
      "Stir occasionally. The sauce should become thick and coat the chicken.",
      "Remove pepper and bay leaves. Adjust seasoning.",
      "Serve with fufu (cassava or plantain), rice, or chikwangue."
    ],
    tips: [
      "Authentic moambé sauce is made by boiling and pressing palm nuts - canned is acceptable",
      "The sauce should be thick and slightly grainy from the palm nut fiber",
      "Don't burst the pepper unless you want very spicy stew"
    ],
    variations: [
      "Use fish instead of chicken for Mwambe ya Mbisi",
      "Add bitter leaves (ndunda) for additional flavor",
      "Some add peanut butter for extra richness"
    ]
  },
  {
    id: "ndole",
    name: "Ndolé (Cameroonian Bitter Leaves with Peanuts)",
    tribeSlug: "douala",
    tribeName: "Douala",
    category: "special",
    description: "Cameroon's national dish - bitter leaves cooked with peanuts and meat. A complex, deeply flavored stew that defines Cameroonian cuisine.",
    culturalSignificance: "Ndolé is the pride of Cameroon and essential at all celebrations. The laborious preparation (washing bitter leaves repeatedly) shows love for guests. No Cameroonian wedding or funeral is complete without it.",
    historicalContext: "The bitter leaf (Vernonia) grows wild in Central Africa and has been used for millennia. The Douala people of the coast developed ndolé, but it spread to become Cameroon's national dish. The combination of bitter leaves and groundnuts reflects the genius of Central African flavor balancing.",
    youtubeVideoId: "UBQBphm8wQM",
    prepTime: "1 hour (mostly washing leaves)",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Bitter leaves (ndolé)", amount: "500g", notes: "Fresh or frozen, must be washed repeatedly" },
      { item: "Groundnut paste (peanut butter)", amount: "200g", notes: "Unsweetened" },
      { item: "Beef or goat meat", amount: "500g", notes: "Cut into chunks" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned" },
      { item: "Fresh shrimp", amount: "200g", notes: "Cleaned" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Onions", amount: "2 large", notes: "Blended" },
      { item: "Garlic", amount: "5 cloves" },
      { item: "Fresh ginger", amount: "2 inches" },
      { item: "Crayfish", amount: "2 tablespoons", notes: "Ground" },
      { item: "Maggi cubes", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash bitter leaves in multiple changes of water (5-7 times) to remove bitterness.",
      "Squeeze out water and chop finely.",
      "Boil meat with onion, salt, and seasoning until tender. Reserve stock.",
      "Blend garlic and ginger together.",
      "Heat palm oil in a large pot. Fry meat until browned. Remove.",
      "In same oil, fry blended onions until fragrant.",
      "Add groundnut paste and stir until oil separates, about 10 minutes.",
      "Add garlic-ginger paste and crayfish. Fry 2 minutes.",
      "Add meat stock gradually, stirring to create smooth sauce.",
      "Add washed bitter leaves. Stir well and simmer 15 minutes.",
      "Add smoked fish, shrimp, and meat. Cook 15 more minutes.",
      "Adjust seasoning. Serve with plantains, rice, or miondo."
    ],
    tips: [
      "Proper washing of bitter leaves is essential - taste as you go",
      "The groundnut paste must fry until oil separates for proper flavor",
      "Fresh bitter leaves are best but frozen works if unavailable"
    ],
    variations: [
      "Vegetarian version uses only smoked fish and shrimp",
      "Some add egusi (melon seeds) for extra body"
    ]
  },
  {
    id: "nyembwe",
    name: "Nyembwe (Gabonese Palm Nut Chicken)",
    tribeSlug: "fang",
    tribeName: "Fang",
    category: "special",
    description: "Gabon's national dish - chicken in a rich, aromatic palm nut sauce. Similar to Congolese moambé but with distinctive Gabonese seasonings.",
    culturalSignificance: "Nyembwe is the soul of Gabonese cooking. Served at all important occasions, it represents abundance and hospitality. The dish showcases Gabon's rainforest ingredients.",
    historicalContext: "The Fang people, who migrated into Gabon in the 18th-19th centuries, brought sophisticated forest cooking techniques. Nyembwe combines ancient palm nut traditions with forest herbs unique to Gabon's equatorial rainforest.",
    youtubeVideoId: "9HSG8XZPRWA",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Palm nut cream", amount: "500g", notes: "Concentrated sauce" },
      { item: "Onions", amount: "2 medium", notes: "Sliced" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 inch", notes: "Grated" },
      { item: "Fresh okra", amount: "200g", notes: "Sliced" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Fish stock or water", amount: "1 cup" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Fresh basil", amount: "1/4 cup", notes: "Gabonese variety preferred" }
    ],
    instructions: [
      "Season chicken with salt, pepper, garlic, and ginger.",
      "Heat palm oil and brown chicken on all sides. Remove.",
      "Sauté onions until soft. Add okra and cook 5 minutes.",
      "Add palm nut cream and stock. Stir to combine.",
      "Return chicken to pot. Cover and simmer 1 hour.",
      "Add fresh basil in last 10 minutes.",
      "Sauce should be thick and rich. Adjust seasoning.",
      "Serve with rice, plantains, or cassava."
    ],
    tips: [
      "Gabonese nyembwe is often thicker than Congolese moambé",
      "Fresh palm nut cream is superior to canned if available",
      "The dish is better the next day after flavors meld"
    ]
  },
  {
    id: "saka-saka",
    name: "Saka Saka (Cassava Leaves Stew)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "staple",
    description: "Pounded cassava leaves slow-cooked with palm oil and groundnuts. A staple across Central Africa that accompanies most meals.",
    culturalSignificance: "Saka saka is everyday food across DR Congo, Congo-Brazzaville, and beyond. The laborious pounding of leaves shows the value placed on good cooking. It's the perfect accompaniment to fufu.",
    historicalContext: "Cassava was introduced to Africa from Brazil in the 16th century via Portuguese traders. Central Africans quickly integrated every part of the plant into their cuisine - roots for fufu, leaves for saka saka. The dish represents the African genius for adopting and transforming ingredients.",
    youtubeVideoId: "eS6yP8WMQEU",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava leaves", amount: "1 kg", notes: "Fresh, or frozen pounded" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Groundnut paste", amount: "100g", notes: "Unsweetened peanut butter" },
      { item: "Smoked fish", amount: "200g", notes: "Or dried fish" },
      { item: "Palm nut cream", amount: "200g", notes: "Optional, for richness" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot pepper", amount: "To taste" }
    ],
    instructions: [
      "If using fresh leaves, remove stems and pound thoroughly in mortar (or blend).",
      "Wash pounded leaves several times to reduce bitterness.",
      "Boil leaves in water for 30 minutes. Drain.",
      "Heat palm oil. Sauté onion and garlic until soft.",
      "Add groundnut paste and stir until oil separates.",
      "Add cassava leaves and mix well.",
      "Add smoked fish and optional palm nut cream.",
      "Add water if too thick. Cover and simmer 1-1.5 hours, stirring occasionally.",
      "The leaves should become very soft and the dish thick.",
      "Serve with fufu, chikwangue, or rice."
    ],
    tips: [
      "Frozen pre-pounded cassava leaves save hours of work",
      "The dish must cook long and slow to develop flavor",
      "It's even better reheated the next day"
    ]
  },
  {
    id: "chikwangue",
    name: "Chikwangue (Cassava Bread)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "staple",
    description: "Fermented cassava wrapped in leaves and steamed. A dense, slightly sour bread that's the staple starch of the Congo Basin.",
    culturalSignificance: "Chikwangue is the daily bread of millions in Central Africa. Wrapped in banana leaves, it's portable and keeps for days. Every household knows how to make it.",
    historicalContext: "Cassava became Central Africa's main staple after its introduction in the 16th century. The fermentation technique was developed to make it digestible and preserve it. Chikwangue wrapping in leaves represents sustainable, zero-waste cooking.",
    youtubeVideoId: "YwMnC5gqwG0",
    prepTime: "3 days (fermentation)",
    cookTime: "2 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava roots", amount: "2 kg", notes: "Fresh, peeled" },
      { item: "Banana leaves", amount: "10 large", notes: "For wrapping" },
      { item: "Water", amount: "For soaking" },
      { item: "Salt", amount: "1 tablespoon", notes: "Optional" }
    ],
    instructions: [
      "Peel cassava and soak in water for 3-4 days until soft and fermented.",
      "Remove fibers from the center of each root.",
      "Pound or blend fermented cassava into smooth paste.",
      "Knead paste until stretchy and uniform.",
      "Soften banana leaves over flame to make them pliable.",
      "Place portion of cassava paste on leaf. Roll into log shape.",
      "Wrap tightly, folding ends. Tie with leaf strips.",
      "Steam wrapped chikwangue for 2 hours.",
      "Cool slightly before unwrapping. Slice to serve.",
      "Serve with saka saka, moambé, or any stew."
    ],
    tips: [
      "Proper fermentation gives chikwangue its characteristic slight sourness",
      "Banana leaves can be substituted with aluminum foil (less traditional)",
      "Chikwangue keeps for several days at room temperature"
    ]
  },
  {
    id: "eru",
    name: "Eru (Cameroonian Wild Spinach)",
    tribeSlug: "bamileke",
    tribeName: "Bamileke",
    category: "special",
    description: "Wild forest vegetable cooked with waterleaf and proteins. A luxurious, slightly slimy stew that's a Cameroonian delicacy.",
    culturalSignificance: "Eru is a prized dish from the southwestern and western regions of Cameroon. The eru leaves are foraged from the rainforest, and the dish is reserved for special occasions due to ingredient cost.",
    historicalContext: "Eru (Gnetum africanum) grows wild in the forests of Cameroon and Nigeria. Its harvesting has been an important forest livelihood for centuries. Overharvesting has made the plant scarce, increasing its value as a delicacy.",
    youtubeVideoId: "tYHjR5GDw1k",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Shredded eru leaves", amount: "500g", notes: "Fresh or frozen" },
      { item: "Waterleaf (or spinach)", amount: "300g", notes: "Chopped" },
      { item: "Palm oil", amount: "1 cup" },
      { item: "Beef", amount: "300g", notes: "Cubed" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned" },
      { item: "Dry fish (stockfish)", amount: "100g", notes: "Soaked, deboned" },
      { item: "Crayfish", amount: "3 tablespoons", notes: "Ground" },
      { item: "Onion", amount: "1 medium", notes: "Sliced" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Boil beef until tender. Reserve stock.",
      "Heat palm oil in large pot. Don't bleach it - you want the red color.",
      "Add sliced onions and fry until fragrant.",
      "Add crayfish and fry 2 minutes.",
      "Add waterleaf and cook until wilted and water released.",
      "Add eru leaves and mix well with palm oil.",
      "Add beef, smoked fish, dry fish, and a little beef stock.",
      "Cover and cook on low heat for 20 minutes.",
      "Stir occasionally. The dish should be moist but not watery.",
      "Serve with garri, fufu, or water fufu."
    ],
    tips: [
      "Waterleaf adds moisture - don't overcook or it becomes slimy",
      "Eru should maintain some texture, not be mushy",
      "The red palm oil color should coat everything"
    ]
  },
  {
    id: "koki-beans",
    name: "Koki (Steamed Bean Pudding)",
    tribeSlug: "bamileke",
    tribeName: "Bamileke",
    category: "special",
    description: "Spiced black-eyed pea pudding steamed in banana leaves. A Cameroonian delicacy with rich, earthy flavor.",
    culturalSignificance: "Koki is a labor of love, prepared for important celebrations in western Cameroon. The wrapping in banana leaves connects the dish to the land and tradition.",
    historicalContext: "The Bamileke people of Cameroon's western highlands developed sophisticated cuisine despite their mountainous terrain. Koki represents this culinary ingenuity - transforming simple beans into a festive dish.",
    youtubeVideoId: "1pR9hvJpH3k",
    prepTime: "12 hours (soaking)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Black-eyed peas", amount: "500g", notes: "Soaked overnight" },
      { item: "Red palm oil", amount: "3/4 cup" },
      { item: "Crayfish", amount: "3 tablespoons", notes: "Ground" },
      { item: "Onion", amount: "1 medium" },
      { item: "Hot pepper", amount: "To taste" },
      { item: "Salt", amount: "To taste" },
      { item: "Banana leaves", amount: "Several large" },
      { item: "Smoked fish", amount: "Optional garnish" }
    ],
    instructions: [
      "Soak black-eyed peas overnight. Remove skins by rubbing.",
      "Blend peeled beans with onion and pepper to smooth paste.",
      "Add palm oil and blend/beat until well combined.",
      "Add crayfish and salt. Mix thoroughly.",
      "Soften banana leaves over flame.",
      "Spoon mixture onto leaves. Wrap into parcels.",
      "Tie securely with leaf strips.",
      "Steam for 2 hours. Check water level periodically.",
      "Unwrap carefully. The koki should be firm and set.",
      "Serve with ripe plantains and pepper sauce."
    ],
    tips: [
      "Removing bean skins is tedious but essential for smooth texture",
      "Beat mixture well to incorporate air for lighter texture",
      "Koki can be grilled after steaming for smoky flavor"
    ]
  },
  {
    id: "liboke-fish",
    name: "Liboke (Fish in Banana Leaves)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "special",
    description: "Fresh river fish steamed in banana leaf parcels with spices. A classic Congo Basin cooking method that locks in flavor.",
    culturalSignificance: "Liboke represents the harmony between Congolese people and their rivers. The banana leaf wrapping is both practical and symbolic - connecting the meal to the land.",
    historicalContext: "The Mongo people live in the heart of the Congo Basin, the world's second-largest rainforest. Their cooking methods evolved to use forest products sustainably. Liboke requires no pots - just leaves, fish, and fire.",
    youtubeVideoId: "igiBDfuL5KU",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Whole tilapia or catfish", amount: "1 large", notes: "Cleaned, scaled" },
      { item: "Tomatoes", amount: "2", notes: "Sliced" },
      { item: "Onions", amount: "1 large", notes: "Sliced" },
      { item: "Green pepper", amount: "1", notes: "Sliced" },
      { item: "Garlic", amount: "4 cloves", notes: "Sliced" },
      { item: "Fresh ginger", amount: "1 inch", notes: "Sliced" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Fresh basil", amount: "1/4 cup" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Banana leaves", amount: "2-3 large" }
    ],
    instructions: [
      "Score fish on both sides. Season inside and out with salt, pepper, garlic.",
      "Soften banana leaves over flame until pliable.",
      "Lay leaves overlapping. Place layer of tomatoes and onions.",
      "Place fish on vegetables. Top with remaining vegetables and ginger.",
      "Drizzle palm oil over everything. Add basil.",
      "Wrap leaves tightly around fish, creating sealed parcel.",
      "Tie with banana leaf strips or string.",
      "Steam over boiling water for 45 minutes (or grill over coals).",
      "Unwrap at table - the aroma is part of the experience.",
      "Serve with fufu, plantains, or rice."
    ],
    tips: [
      "Traditional method grills liboke over wood coals for smoky flavor",
      "Multiple small fish can substitute for one large fish",
      "The banana leaf imparts subtle flavor - don't substitute foil"
    ]
  },
  // ============ MORE CENTRAL AFRICAN RECIPES ============
  {
    id: "chikwanga",
    name: "Chikwanga (Fermented Cassava Bread)",
    tribeSlug: "luba",
    tribeName: "Luba",
    category: "staple",
    description: "Fermented cassava wrapped and steamed in banana leaves. A dense, tangy staple bread unique to Central Africa.",
    culturalSignificance: "Chikwanga is the bread of the Congo Basin, eaten with every meal. The fermentation process is centuries old, and each family has their technique.",
    historicalContext: "After cassava arrived from South America, Central Africans developed sophisticated processing to remove toxins and create chikwanga. The fermentation also preserves the starch for days without refrigeration.",
    youtubeVideoId: "CJSs3Op2iu0",
    prepTime: "3 days (fermentation)",
    cookTime: "2 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava roots", amount: "5 kg", notes: "Peeled" },
      { item: "Water", amount: "For soaking" },
      { item: "Banana leaves", amount: "Several large" }
    ],
    instructions: [
      "Peel cassava and soak in water for 3-4 days until soft.",
      "The fermentation creates the characteristic sour flavor.",
      "Remove cassava, discard soaking water.",
      "Pound or process into smooth, stretchy paste.",
      "Knead thoroughly - this develops the texture.",
      "Divide into portions. Shape into cylinders.",
      "Wrap each tightly in softened banana leaves.",
      "Steam for 2 hours until firm.",
      "Cool before unwrapping. Slice to serve with stews."
    ],
    tips: [
      "Proper fermentation is essential - taste for sourness",
      "The dough should be very smooth and stretchy",
      "Chikwanga keeps several days wrapped in leaves"
    ]
  },
  {
    id: "ngombo",
    name: "Ngombo (Congolese Okra Stew)",
    tribeSlug: "mongo",
    tribeName: "Mongo",
    category: "staple",
    description: "Fresh okra stew with palm oil and fish - a silky, nutritious dish from the Congo Basin.",
    culturalSignificance: "Ngombo (okra) is a everyday vegetable across Central Africa. This simple preparation showcases the ingredient at its best, paired with smoked fish for depth.",
    historicalContext: "Okra originated in Africa and has been cultivated for thousands of years. The Mongo people of the Congo rainforest developed many variations, using forest ingredients and river fish.",
    youtubeVideoId: "1LF1R-23g9g",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh okra", amount: "500g", notes: "Sliced" },
      { item: "Smoked fish", amount: "200g", notes: "Deboned, flaked" },
      { item: "Palm oil", amount: "1/4 cup" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "2", notes: "Chopped" },
      { item: "Garlic", amount: "3 cloves" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot pepper", amount: "To taste" }
    ],
    instructions: [
      "Heat palm oil in a pot over medium heat.",
      "Sauté onion until golden. Add garlic.",
      "Add tomatoes and cook until soft.",
      "Add sliced okra and stir to coat with oil.",
      "Add smoked fish and hot pepper.",
      "Add 1/2 cup water. Cover and simmer 20 minutes.",
      "Stir occasionally. The okra will become silky.",
      "Season with salt. Serve with fufu or rice."
    ],
    tips: [
      "Fresh okra gives better texture than frozen",
      "Don't overcook - okra should be tender, not slimy",
      "Smoked fish is traditional but dried fish works"
    ]
  },
  {
    id: "maboke-vegetables",
    name: "Maboke ya Ndunda (Bitter Leaves in Banana Leaf)",
    tribeSlug: "kongo",
    tribeName: "Kongo",
    category: "staple",
    description: "Bitter leaves steamed in banana leaf parcels with palm oil and spices. A healthy Congolese classic.",
    culturalSignificance: "Maboke cooking - steaming in banana leaves - is quintessentially Congolese. It works for fish, meat, and vegetables. The leaves impart subtle flavor while keeping moisture in.",
    historicalContext: "The banana leaf wrapping technique predates metal pots in Central Africa. It's efficient, flavorful, and zero-waste - the leaves biodegrade after use.",
    youtubeVideoId: "eS6yP8WMQEU",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Bitter leaves (ndunda)", amount: "500g", notes: "Washed multiple times" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Onion", amount: "1", notes: "Sliced" },
      { item: "Smoked fish", amount: "100g", notes: "Optional" },
      { item: "Garlic", amount: "2 cloves" },
      { item: "Hot pepper", amount: "1" },
      { item: "Salt", amount: "To taste" },
      { item: "Banana leaves", amount: "2 large" }
    ],
    instructions: [
      "Wash bitter leaves 5-6 times to reduce bitterness.",
      "Squeeze out excess water.",
      "Mix leaves with palm oil, onion, garlic, pepper, and smoked fish.",
      "Season with salt.",
      "Soften banana leaves over flame.",
      "Divide mixture between leaves. Wrap into parcels.",
      "Tie securely with leaf strips.",
      "Steam over boiling water for 45 minutes.",
      "Serve in the parcels with fufu."
    ],
    tips: [
      "Thorough washing is essential for palatability",
      "Can substitute spinach if bitter leaves unavailable",
      "The steam-in-leaf method intensifies flavors"
    ]
  },
  {
    id: "baton-manioc",
    name: "Bâton de Manioc (Cassava Stick)",
    tribeSlug: "fang",
    tribeName: "Fang",
    category: "staple",
    description: "Fermented cassava paste wrapped in leaves and shaped into sticks. A portable staple food of Central Africa.",
    culturalSignificance: "Bâton de manioc is the to-go food of Central Africa - wrapped, portable, and sustaining. Workers carry it to fields; travelers take it on journeys.",
    historicalContext: "This is essentially chikwanga in stick form, developed for portability. The Fang people refined the shaping technique, creating uniform sticks that cook evenly.",
    youtubeVideoId: "CJSs3Op2iu0",
    prepTime: "3 days (fermentation)",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava", amount: "3 kg", notes: "Peeled" },
      { item: "Water", amount: "For soaking" },
      { item: "Marantaceae leaves or banana leaves", amount: "Several" }
    ],
    instructions: [
      "Peel cassava and soak in water 3-4 days.",
      "When soft and sour, drain and pound to smooth paste.",
      "Knead until elastic and stretchy.",
      "Divide into portions. Roll each into a stick shape.",
      "Wrap tightly in leaves, twisting ends.",
      "Steam for 1.5 hours until firm.",
      "Cool before serving. Unwrap and slice.",
      "Eat with sauces, stews, or grilled fish."
    ],
    tips: [
      "The paste must be very smooth - no cassava lumps",
      "Tight wrapping ensures even cooking",
      "Can be resteamed if it dries out"
    ]
  },
  {
    id: "sanga-pork",
    name: "Sanga (Gabonese Spiced Pork)",
    tribeSlug: "fang",
    tribeName: "Fang",
    category: "special",
    description: "Pork stewed with wild spinach and forest spices. A hearty Gabonese dish from the rainforest interior.",
    culturalSignificance: "Sanga showcases Gabon's forest ingredients. Wild game was traditional, but pork is now common. It's celebration food, served at gatherings and holidays.",
    historicalContext: "The Fang people are skilled hunters and forest cultivators. Their cuisine blends bush meat traditions with domesticated animals, always featuring local leaves and spices.",
    youtubeVideoId: "9HSG8XZPRWA",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Pork shoulder", amount: "1 kg", notes: "Cubed" },
      { item: "Leafy greens (spinach, kale)", amount: "500g" },
      { item: "Palm oil", amount: "1/4 cup" },
      { item: "Onion", amount: "2 medium", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Ginger", amount: "1 inch" },
      { item: "Hot pepper", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Season pork with salt, garlic, and ginger.",
      "Heat palm oil in a large pot. Brown pork on all sides.",
      "Add onions and cook until soft.",
      "Add water to cover. Simmer 1 hour until pork is tender.",
      "Add chopped greens and hot peppers.",
      "Cook 15-20 minutes until greens are tender.",
      "Adjust seasoning. The stew should be rich and thick.",
      "Serve with manioc or rice."
    ],
    tips: [
      "Wild boar is traditional if available",
      "Cassava leaves can replace spinach for authenticity",
      "The fat should render into the stew"
    ]
  }
];

// ============ EAST AFRICAN RECIPES ============
const eastAfricanRecipes: Recipe[] = [
  {
    id: "luwombo",
    name: "Luwombo (Ugandan Steamed Stew)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "special",
    description: "Uganda's royal dish - meat or chicken steamed in banana leaves with groundnut sauce. The signature dish of Buganda Kingdom cuisine.",
    culturalSignificance: "Luwombo was created for the Kabaka (king) of Buganda in the late 19th century. It remains the prestige dish served at important occasions, from weddings to state functions.",
    historicalContext: "Legend says Luwombo was invented by a royal chef to please Kabaka Mwanga II. The cooking method locks in flavors and was practical for feeding many guests at royal functions. Today it's a symbol of Ugandan hospitality.",
    youtubeVideoId: "0f7TJGFn5k8",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken pieces", amount: "1.5 kg", notes: "Or beef/goat" },
      { item: "Groundnut paste (peanut butter)", amount: "1 cup", notes: "Unsweetened" },
      { item: "Banana leaves", amount: "Several large", notes: "For wrapping" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3 medium", notes: "Chopped" },
      { item: "Mushrooms", amount: "200g", notes: "Optional, traditional" },
      { item: "Green pepper", amount: "1" },
      { item: "Salt", amount: "To taste" },
      { item: "Chicken stock", amount: "1 cup" }
    ],
    instructions: [
      "Season chicken with salt and set aside.",
      "Mix groundnut paste with stock until smooth.",
      "Combine chicken, groundnut sauce, onions, tomatoes, and peppers.",
      "Soften banana leaves over flame until pliable.",
      "Divide mixture among several banana leaf portions.",
      "Wrap each portion securely, tying with banana fiber or string.",
      "Place packets in a large pot with a little water at bottom.",
      "Steam for 1.5-2 hours until chicken is tender.",
      "Serve packets unopened - each guest unwraps their own.",
      "Serve with matooke (steamed green bananas) or rice."
    ],
    tips: [
      "The banana leaf imparts subtle flavor - don't substitute foil",
      "Make sure packets are sealed to trap steam",
      "Luwombo can be made with beef, goat, or fish"
    ],
    variations: [
      "Luwombo lwa Nkoko (chicken)",
      "Luwombo lwa Nte (beef)",
      "Luwombo lwa Binyebwa (groundnut-only vegetarian)"
    ]
  },
  {
    id: "isombe",
    name: "Isombe (Rwandan Cassava Leaves)",
    tribeSlug: "banyarwanda",
    tribeName: "Banyarwanda",
    category: "staple",
    description: "Creamy cassava leaves cooked with eggplant and peanuts. Rwanda's beloved comfort food.",
    culturalSignificance: "Isombe is everyday food in Rwanda, served at home and at celebrations. The dish represents Rwandan ingenuity in creating delicious meals from simple ingredients.",
    historicalContext: "Cassava leaves became a staple after the plant's introduction from South America. Rwandans transformed them into a creamy, nutritious dish that's now a national symbol.",
    youtubeVideoId: "UzMBXQTJLZ4",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava leaves", amount: "1 kg", notes: "Fresh, pounded, or frozen" },
      { item: "Eggplant", amount: "2 medium", notes: "Peeled, cubed" },
      { item: "Groundnut paste", amount: "1/2 cup" },
      { item: "Palm oil or vegetable oil", amount: "1/4 cup" },
      { item: "Onion", amount: "1 large" },
      { item: "Leeks", amount: "2", notes: "Traditional addition" },
      { item: "Salt", amount: "To taste" },
      { item: "Spinach", amount: "1 cup", notes: "Optional, for color" }
    ],
    instructions: [
      "If using fresh cassava leaves, pound thoroughly and wash multiple times.",
      "Boil cassava leaves in salted water for 30 minutes to reduce bitterness.",
      "Drain and set aside.",
      "Cook eggplant cubes until very soft, mash completely.",
      "Sauté onions and leeks in oil until soft.",
      "Add mashed eggplant and stir well.",
      "Add cassava leaves and mix thoroughly.",
      "Stir in groundnut paste.",
      "Cook on low heat for 1 hour, stirring occasionally.",
      "The dish should become creamy and unified.",
      "Serve with rice, ugali, or boiled sweet potatoes."
    ],
    tips: [
      "Frozen pre-pounded cassava leaves save hours of preparation",
      "The eggplant creates the creamy texture - don't skip it",
      "Long, slow cooking is essential for the right consistency"
    ]
  },
  {
    id: "kitfo",
    name: "Kitfo (Ethiopian Spiced Beef Tartare)",
    tribeSlug: "gurage",
    tribeName: "Gurage",
    category: "special",
    description: "Finely minced raw beef seasoned with mitmita spice and niter kibbeh (spiced butter). Ethiopia's most celebrated raw meat dish.",
    culturalSignificance: "Kitfo is the signature dish of the Gurage people and is considered one of Ethiopia's finest foods. It's served at special occasions and in dedicated 'kitfo houses' across the country.",
    historicalContext: "The Gurage people of southwestern Ethiopia developed kitfo as their signature contribution to Ethiopian cuisine. Raw meat dishes have ancient roots in Ethiopian culture, possibly dating to times when cooking fires would reveal location to enemies.",
    youtubeVideoId: "CHBPmFtVqJw",
    prepTime: "30 minutes",
    cookTime: "10 minutes (for butter)",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Very fresh lean beef", amount: "500g", notes: "Tenderloin preferred" },
      { item: "Niter kibbeh (spiced butter)", amount: "4 tablespoons", notes: "Melted, warm" },
      { item: "Mitmita spice", amount: "1-2 tablespoons", notes: "Spicy Ethiopian blend" },
      { item: "Korerima (Ethiopian cardamom)", amount: "1/2 teaspoon" },
      { item: "Salt", amount: "To taste" },
      { item: "Ayib (Ethiopian cheese)", amount: "For serving" },
      { item: "Gomen (collard greens)", amount: "For serving" }
    ],
    instructions: [
      "Start with extremely fresh, high-quality beef from a trusted source.",
      "Using a very sharp knife, mince the beef as finely as possible.",
      "Warm the niter kibbeh until just melted.",
      "Mix the minced beef with warm butter immediately.",
      "Add mitmita, korerima, and salt to taste.",
      "Mix thoroughly - the warm butter should coat all the meat.",
      "Serve immediately with ayib (fresh cheese) and gomen (greens).",
      "Traditionally served on injera."
    ],
    tips: [
      "Freshness is paramount - only use same-day beef from trusted sources",
      "Kitfo can be served leb leb (slightly warmed) or fully cooked for those who prefer",
      "Niter kibbeh is essential - regular butter won't give authentic flavor"
    ],
    variations: [
      "Leb leb - slightly warmed but still rare",
      "Betam leb leb - cooked through (for those who don't eat raw)",
      "Special kitfo - with extra butter and spices"
    ]
  },
  {
    id: "matoke",
    name: "Matoke (Ugandan Steamed Plantains)",
    tribeSlug: "baganda",
    tribeName: "Baganda",
    category: "staple",
    description: "Green bananas steamed until tender, then mashed into a soft, starchy staple. The foundation of Ugandan cuisine.",
    culturalSignificance: "Matoke is to Uganda what rice is to Asia. No meal is complete without it in central Uganda. The word 'matoke' also means 'food' in Luganda, showing its cultural centrality.",
    historicalContext: "Bananas were introduced to East Africa over 1,000 years ago from Southeast Asia. Uganda became the banana capital of Africa, developing unique cooking varieties and preparation methods.",
    youtubeVideoId: "8TFFu-lWqNI",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Green cooking bananas (matoke)", amount: "2 kg", notes: "About 10-12 bananas" },
      { item: "Banana leaves", amount: "Several", notes: "For wrapping" },
      { item: "Water", amount: "2 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Peel green bananas (the sap stains - oil hands first).",
      "Wash bananas and place in a pot lined with banana leaves.",
      "Add salt and water.",
      "Cover with more banana leaves, then the lid.",
      "Steam for 45-60 minutes until completely tender.",
      "Mash the bananas inside the leaves using a wooden spoon.",
      "Continue steaming for 10 more minutes.",
      "Shape into a mound and serve with stews or luwombo."
    ],
    tips: [
      "Oil your hands before peeling to prevent sap staining",
      "The bananas should be completely soft before mashing",
      "Banana leaves add subtle flavor - foil works but isn't traditional"
    ]
  },
  {
    id: "tibs",
    name: "Tibs (Ethiopian Sautéed Meat)",
    tribeSlug: "amhara",
    tribeName: "Amhara",
    category: "special",
    description: "Sautéed cubes of meat with onions, peppers, and Ethiopian spices. Ethiopia's most popular hot meat dish.",
    culturalSignificance: "Tibs is celebration food - served at weddings, holidays, and whenever there's cause for joy. Different regions have signature variations.",
    historicalContext: "Tibs evolved as Ethiopia's answer to quick-cooked meat dishes. Unlike stews that cook for hours, tibs is fast and festive, often prepared at the table on a clay brazier.",
    youtubeVideoId: "QhPxChMKz8k",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Beef or lamb", amount: "500g", notes: "Cubed" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Green peppers", amount: "2" },
      { item: "Tomatoes", amount: "2", notes: "Wedged" },
      { item: "Niter kibbeh", amount: "3 tablespoons" },
      { item: "Berbere spice", amount: "1 tablespoon", notes: "For derek tibs" },
      { item: "Rosemary", amount: "1 sprig", notes: "Fresh" },
      { item: "Garlic", amount: "3 cloves" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Heat niter kibbeh in a pan until very hot.",
      "Add meat cubes and sear on all sides.",
      "Add onions and cook until softened.",
      "Add garlic, peppers, and rosemary.",
      "For derek (dry) tibs, add berbere and cook until spices coat meat.",
      "For alicha (mild) tibs, skip berbere.",
      "Add tomatoes at the end, cook briefly.",
      "Serve sizzling on a heated clay dish with injera."
    ],
    tips: [
      "High heat is essential for proper searing",
      "Serve immediately while sizzling",
      "Can be made with beef, lamb, goat, or organ meats"
    ]
  },
  {
    id: "pilau-swahili",
    name: "Pilau (Swahili Spiced Rice)",
    tribeSlug: "swahili",
    tribeName: "Swahili",
    category: "special",
    description: "Fragrant rice cooked with meat and a blend of spices including cumin, cardamom, and cinnamon. The Swahili coast's signature rice dish.",
    culturalSignificance: "Pilau is the celebration rice of the Swahili coast. No wedding, Eid, or major event is complete without it. The skill of making perfect pilau is a mark of culinary mastery.",
    historicalContext: "Pilau came to East Africa via Indian Ocean trade routes, blending Persian, Indian, and Arab influences with African ingredients. It represents centuries of cultural exchange on the Swahili coast.",
    youtubeVideoId: "pm4TgsV7PfQ",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Basmati rice", amount: "3 cups" },
      { item: "Beef or chicken", amount: "500g" },
      { item: "Onions", amount: "3 large", notes: "Sliced thin" },
      { item: "Pilau masala", amount: "2 tablespoons" },
      { item: "Whole spices", amount: "1 tablespoon", notes: "Cumin, cardamom, cinnamon sticks, cloves" },
      { item: "Garlic paste", amount: "2 tablespoons" },
      { item: "Ginger paste", amount: "1 tablespoon" },
      { item: "Tomatoes", amount: "2", notes: "Blended" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash rice and soak for 30 minutes. Drain.",
      "Boil meat with salt until tender. Reserve stock.",
      "Fry sliced onions in oil until deep brown (this is crucial).",
      "Add whole spices and fry until fragrant.",
      "Add garlic and ginger paste, fry 2 minutes.",
      "Add blended tomatoes and cook until oil separates.",
      "Add pilau masala and cooked meat. Stir well.",
      "Add drained rice and mix gently.",
      "Add hot meat stock (ratio 1:1.5 rice to liquid).",
      "Bring to boil, then reduce to very low heat.",
      "Cover tightly and cook 20-25 minutes until rice is fluffy.",
      "Fluff gently with fork. Serve with kachumbari."
    ],
    tips: [
      "The darkened onions are the secret to authentic color and flavor",
      "Don't stir once rice is added and covered",
      "Let rest 5 minutes before serving"
    ]
  },
  {
    id: "nyama-choma-kenyan",
    name: "Nyama Choma (Kenyan Roasted Meat)",
    tribeSlug: "kikuyu",
    tribeName: "Kikuyu",
    category: "special",
    description: "Kenya's national dish - goat or beef roasted over charcoal until crispy outside and juicy inside. Simple seasoning lets the meat shine.",
    culturalSignificance: "Nyama choma is Kenya's social food. Friends gather at 'nyama choma joints' to share meat, conversation, and cold drinks. It transcends all ethnic and class boundaries.",
    historicalContext: "Roasting meat over fire is ancient, but nyama choma as a social institution developed in urban Kenya. It became the great equalizer - a space where all Kenyans gather regardless of background.",
    youtubeVideoId: "P5eGWFCjReA",
    prepTime: "10 minutes",
    cookTime: "1-2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Goat ribs or leg", amount: "2 kg", notes: "Or beef" },
      { item: "Coarse salt", amount: "To taste" },
      { item: "Lemon juice", amount: "Optional" },
      { item: "Charcoal", amount: "For grilling" }
    ],
    instructions: [
      "Light charcoal and let burn until white-hot coals form.",
      "Place meat on grill rack above coals (not in flames).",
      "Roast slowly, turning regularly.",
      "Sprinkle salt as it cooks.",
      "Cook for 1-2 hours until charred outside, juicy inside.",
      "Cut into bite-sized pieces with a sharp knife.",
      "Serve with ugali, kachumbari, and sukuma wiki."
    ],
    tips: [
      "Low and slow is the key - high flames burn the outside",
      "Goat is traditional; beef is also popular",
      "Serve immediately off the grill"
    ]
  },
  // ============ ERITREAN RECIPES ============
  {
    id: "eritrean-ful",
    name: "Ful Medames (Eritrean Fava Beans)",
    tribeSlug: "tigrinya",
    tribeName: "Tigrinya",
    category: "staple",
    description: "Slow-cooked fava beans mashed with olive oil, lemon, and spices. Eritrea's beloved breakfast dish with ancient roots.",
    culturalSignificance: "Ful is the quintessential Eritrean breakfast, eaten daily across the country. It's a social food, often shared from a communal plate. During fasting periods, it's the go-to protein source.",
    historicalContext: "Fava beans have been cultivated in the Horn of Africa for millennia, making ful one of the world's oldest prepared dishes. Eritrea's version is distinct, featuring berbere and local olive oil from the highlands.",
    youtubeVideoId: "7qHl84U8Rfs",
    prepTime: "8 hours (soaking)",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Dried fava beans", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Olive oil", amount: "1/4 cup" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Berbere spice", amount: "1/2 teaspoon", notes: "Optional" },
      { item: "Tomatoes", amount: "2", notes: "Diced" },
      { item: "Fresh parsley", amount: "For garnish" },
      { item: "Boiled eggs", amount: "For serving" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak fava beans overnight in plenty of water.",
      "Drain and rinse beans. Place in large pot with fresh water.",
      "Bring to boil, then reduce heat and simmer 1.5-2 hours until very soft.",
      "Drain most water, leaving beans moist.",
      "Mash beans roughly with fork or potato masher.",
      "Stir in olive oil, lemon juice, garlic, and cumin.",
      "Season with salt and berbere if desired.",
      "Top with diced tomatoes and fresh parsley.",
      "Serve warm with boiled eggs and fresh bread."
    ],
    tips: [
      "Eritrean ful is more olive oil-forward than Egyptian versions",
      "Traditionally served with freshly baked himbasha bread",
      "Can be topped with yogurt or fresh cheese"
    ]
  },
  {
    id: "lahoh",
    name: "Lahoh (Eritrean Spongy Pancakes)",
    tribeSlug: "tigre",
    tribeName: "Tigre",
    category: "staple",
    description: "Fermented spongy pancakes with a thousand tiny holes. The Eritrean answer to Ethiopian injera, lighter and tangier.",
    culturalSignificance: "Lahoh is breakfast, snack, and accompaniment all in one. It's essential during Ramadan when Eritrean Muslims break their fast. The holes represent abundance.",
    historicalContext: "Lahoh shares ancestry with Yemeni lahoh and Ethiopian injera, reflecting Eritrea's position at the crossroads of African and Arabian culinary traditions. The fermentation technique dates back centuries.",
    youtubeVideoId: "N7y8_t1q4aM",
    prepTime: "12 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "All-purpose flour", amount: "2 cups" },
      { item: "Semolina flour", amount: "1 cup" },
      { item: "Active dry yeast", amount: "1 teaspoon" },
      { item: "Sugar", amount: "1 teaspoon" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Warm water", amount: "3 cups" }
    ],
    instructions: [
      "Mix both flours in a large bowl.",
      "Dissolve yeast and sugar in 1/2 cup warm water. Let foam 5 minutes.",
      "Add yeast mixture to flour with remaining water.",
      "Whisk until smooth batter forms (should be like thin pancake batter).",
      "Cover and let ferment at room temperature 8-12 hours.",
      "Stir batter gently - it should be bubbly and slightly sour.",
      "Heat a non-stick pan over medium-high heat.",
      "Pour thin layer of batter, tilting to spread.",
      "Cook until bubbles form and top sets (don't flip).",
      "Serve with honey, ful, or stews."
    ],
    tips: [
      "The batter should be thinner than pancake batter",
      "More fermentation means more sour flavor",
      "Only cook one side - the top should be spongy"
    ],
    variations: [
      "Sweet lahoh with honey and sesame",
      "Savory with eggs and spices",
      "Rolled with cream cheese"
    ]
  },
  {
    id: "shahan-ful",
    name: "Shahan Ful (Eritrean Scrambled Ful)",
    tribeSlug: "tigrinya",
    tribeName: "Tigrinya",
    category: "staple",
    description: "Ful beans scrambled with eggs, tomatoes, and spices. The heartiest Eritrean breakfast combining two morning staples.",
    culturalSignificance: "Shahan ful is the 'complete breakfast' in Eritrea, combining protein from beans and eggs. Popular in Asmara's cafes, it represents the Italian influence on Eritrean urban cuisine.",
    historicalContext: "During Italian colonization, Eritrean cooks adapted local ful with European egg preparations. The result is uniquely Eritrean - a fusion that predates modern fusion cuisine by a century.",
    youtubeVideoId: "k8ZnJntmaM8",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Cooked fava beans (ful)", amount: "2 cups", notes: "Mashed" },
      { item: "Eggs", amount: "4" },
      { item: "Tomatoes", amount: "2", notes: "Diced" },
      { item: "Onion", amount: "1 medium", notes: "Diced" },
      { item: "Green chilies", amount: "2", notes: "Chopped" },
      { item: "Olive oil", amount: "3 tablespoons" },
      { item: "Cumin", amount: "1/2 teaspoon" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Heat olive oil in a pan over medium heat.",
      "Sauté onions until translucent.",
      "Add tomatoes and chilies, cook until soft.",
      "Add mashed ful and stir to combine.",
      "Make wells in the mixture and crack eggs into them.",
      "Scramble everything together until eggs are cooked.",
      "Season with cumin, salt, and pepper.",
      "Serve hot with lahoh or crusty bread."
    ],
    tips: [
      "Don't overcook the eggs - they should be just set",
      "Adjust chili heat to preference",
      "Drizzle with extra olive oil before serving"
    ]
  },
  // ============ DJIBOUTI RECIPES ============
  {
    id: "skoudehkaris",
    name: "Skoudehkaris (Djibouti Lamb Rice)",
    tribeSlug: "afar",
    tribeName: "Afar",
    category: "special",
    description: "Djibouti's national dish - lamb and rice cooked with cardamom, cinnamon, and tomatoes. A celebration of Arab-African fusion cuisine.",
    culturalSignificance: "Skoudehkaris is THE dish of Djibouti, served at weddings, Eid, and whenever there's cause for celebration. It represents the unique blend of Somali, Arab, and French influences.",
    historicalContext: "The dish reflects Djibouti's position on ancient trade routes. Arab spices merged with African cooking techniques, while French colonial influence refined presentation. The name may derive from Arabic roots meaning 'meat and rice.'",
    youtubeVideoId: "sH-8-X-1bDo",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Lamb", amount: "1 kg", notes: "Cut into large pieces, bone-in" },
      { item: "Basmati rice", amount: "3 cups" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Tomatoes", amount: "4", notes: "Blended" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Cardamom pods", amount: "6" },
      { item: "Cinnamon sticks", amount: "2" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Black pepper", amount: "1 teaspoon" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Season lamb with salt, pepper, and cumin.",
      "Heat oil in a large pot. Brown lamb pieces on all sides. Remove.",
      "Sauté sliced onions until golden brown.",
      "Add garlic, cardamom, and cinnamon. Fry 1 minute.",
      "Add tomato paste and blended tomatoes. Cook until oil separates.",
      "Return lamb to pot. Add water to cover.",
      "Simmer for 45 minutes until lamb is tender.",
      "Remove lamb and measure broth. You need 4.5 cups for rice.",
      "Wash rice and add to the broth.",
      "Bring to boil, then reduce heat to very low.",
      "Cover tightly and cook 20-25 minutes until rice is done.",
      "Arrange rice on platter with lamb pieces on top.",
      "Garnish with fried onions and serve with salad."
    ],
    tips: [
      "The caramelized onions are essential for authentic flavor",
      "Rice should absorb all the spiced lamb broth",
      "Serve with banana and hot sauce on the side"
    ]
  },
  {
    id: "laxoox-djibouti",
    name: "Laxoox (Djibouti Sourdough Crepes)",
    tribeSlug: "issa",
    tribeName: "Issa",
    category: "staple",
    description: "Thin, spongy sourdough crepes with a thousand bubbles. Djibouti's daily bread, similar to Somali canjeero but with local variations.",
    culturalSignificance: "Laxoox is eaten at every meal in Djibouti. Breakfast sees it with honey and butter; dinner with stews and meat. Making perfect laxoox is a skill passed from mother to daughter.",
    historicalContext: "This fermented flatbread connects Djibouti to greater Somali and East African bread traditions. The natural fermentation technique preserves the batter in the hot climate and adds distinctive tang.",
    youtubeVideoId: "upwo318A830",
    prepTime: "24 hours (fermentation)",
    cookTime: "30 minutes",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "All-purpose flour", amount: "2 cups" },
      { item: "Self-rising flour", amount: "1 cup" },
      { item: "Cornmeal", amount: "1/4 cup" },
      { item: "Sugar", amount: "1 tablespoon" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Warm water", amount: "3 cups" },
      { item: "Vegetable oil", amount: "For cooking" }
    ],
    instructions: [
      "Combine all dry ingredients in a large bowl.",
      "Add warm water gradually, whisking to form smooth batter.",
      "Cover loosely and let ferment at room temperature 18-24 hours.",
      "Batter should be bubbly and slightly sour-smelling.",
      "Stir well and add water if too thick (should pour easily).",
      "Heat a non-stick pan over medium-high heat.",
      "Pour thin layer of batter, swirling to cover pan.",
      "Cook until bubbles form, edges lift, and bottom is golden.",
      "Do not flip - top should be spongy with many holes.",
      "Fold and serve with honey, ghee, or stews."
    ],
    tips: [
      "Longer fermentation means more sour and complex flavor",
      "The pan must be hot enough or bubbles won't form properly",
      "Perfect laxoox has uniform holes across the entire surface"
    ]
  },
  {
    id: "maraq-digaag",
    name: "Maraq Digaag (Djibouti Chicken Soup)",
    tribeSlug: "afar",
    tribeName: "Afar",
    category: "staple",
    description: "Aromatic chicken soup spiced with cumin, coriander, and turmeric. A comforting Djiboutian staple perfect for the hot climate.",
    culturalSignificance: "Maraq is the everyday soup of Djibouti, served to nourish the sick, welcome guests, and accompany rice dishes. Its warming spices are believed to aid digestion in the intense heat.",
    historicalContext: "This soup reflects Djibouti's position on spice trade routes. Indian, Arab, and African flavors combine in a uniquely Djiboutian way. French colonial influence added the refinement of serving courses.",
    youtubeVideoId: "rSBRekdNG0g",
    prepTime: "15 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Whole chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Onions", amount: "2 large", notes: "Quartered" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Potatoes", amount: "3", notes: "Cubed" },
      { item: "Carrots", amount: "2", notes: "Sliced" },
      { item: "Garlic", amount: "5 cloves" },
      { item: "Cumin", amount: "1 tablespoon" },
      { item: "Turmeric", amount: "1 teaspoon" },
      { item: "Coriander", amount: "1 teaspoon" },
      { item: "Green chilies", amount: "2", notes: "Whole" },
      { item: "Fresh cilantro", amount: "For garnish" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Place chicken pieces in large pot with onions and garlic.",
      "Cover with water (about 8 cups) and bring to boil.",
      "Skim foam and reduce to simmer.",
      "Add cumin, turmeric, coriander, and whole chilies.",
      "Simmer 30 minutes until chicken is nearly done.",
      "Add potatoes, carrots, and tomatoes.",
      "Continue simmering 20 minutes until vegetables are tender.",
      "Adjust seasoning with salt.",
      "Garnish with fresh cilantro.",
      "Serve hot with rice or laxoox."
    ],
    tips: [
      "The broth should be golden from turmeric",
      "Don't pierce the chilies unless you want it very spicy",
      "This soup is even better the next day"
    ]
  },
  // ============ MORE KENYAN & HORN TRIBES ============
  {
    id: "meru-mukimo",
    name: "Meru Mukimo (Mashed Peas and Potatoes)",
    tribeSlug: "meru",
    tribeName: "Meru",
    category: "staple",
    description: "The Meru version of the famous highland mashed dish, combining peas, potatoes, and maize with local greens.",
    culturalSignificance: "Mukimo is central to Meru celebrations and everyday meals. The green color symbolizes fertility and the abundance of Mount Kenya's slopes.",
    historicalContext: "The Meru people settled on Mount Kenya's eastern slopes, developing agricultural traditions similar to their Kikuyu neighbors but with distinctive variations.",
    youtubeVideoId: "5cuGbmPtLGE",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Potatoes", amount: "1 kg", notes: "Peeled and cubed" },
      { item: "Green peas", amount: "2 cups" },
      { item: "Maize kernels", amount: "1 cup" },
      { item: "Pumpkin leaves or spinach", amount: "2 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Butter", amount: "2 tablespoons" }
    ],
    instructions: [
      "Boil peas until soft (about 1 hour if dried).",
      "Boil potatoes in salted water until tender.",
      "Boil maize kernels until soft.",
      "Steam pumpkin leaves until wilted.",
      "Combine all ingredients and mash together.",
      "Add butter and continue mashing until smooth.",
      "Season with salt and serve hot."
    ],
    tips: [
      "The dish should be thoroughly mashed with no lumps",
      "Traditional preparation uses a wooden pestle",
      "Serve with nyama choma or stew"
    ]
  },
  {
    id: "embu-irio",
    name: "Embu Irio (Mashed Vegetables)",
    tribeSlug: "embu",
    tribeName: "Embu",
    category: "staple",
    description: "The Embu version of the Central Kenya mashed dish, featuring local varieties of peas and beans.",
    culturalSignificance: "Irio is everyday food for the Embu, eaten with most meals. It's a hearty dish that sustained farmers working the fertile slopes of Mount Kenya.",
    historicalContext: "The Embu people are closely related to the Kikuyu and Meru, sharing agricultural traditions on Mount Kenya's southeastern slopes.",
    youtubeVideoId: "5cuGbmPtLGE",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Potatoes", amount: "1 kg" },
      { item: "Green peas or njahi (lablab beans)", amount: "2 cups" },
      { item: "Maize", amount: "1 cup" },
      { item: "Pumpkin leaves", amount: "2 cups" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak and boil beans until tender.",
      "Boil potatoes separately until soft.",
      "Cook maize until tender.",
      "Steam pumpkin leaves briefly.",
      "Combine all and mash together thoroughly.",
      "Season with salt and serve."
    ],
    tips: [
      "Njahi beans give a distinctive purple tinge",
      "Can be served with soured milk",
      "Leftovers can be fried for breakfast"
    ]
  },
  {
    id: "taita-mboga",
    name: "Taita Mboga (Traditional Greens)",
    tribeSlug: "taita",
    tribeName: "Taita",
    category: "staple",
    description: "Traditional Taita leafy greens cooked with coconut milk and spices, reflecting the tribe's coastal highland position.",
    culturalSignificance: "The Taita Hills provided abundant wild greens that became central to their cuisine. The addition of coconut shows coastal trade influence.",
    historicalContext: "The Taita settled in the hills bearing their name, developing a cuisine that bridges coastal and highland traditions.",
    youtubeVideoId: "O2VkjZH3d4k",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Mixed greens (spinach, kale)", amount: "500g" },
      { item: "Coconut milk", amount: "1 cup" },
      { item: "Onion", amount: "1 medium" },
      { item: "Tomatoes", amount: "2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash and chop greens finely.",
      "Sauté onion until soft.",
      "Add tomatoes and cook until soft.",
      "Add greens and stir.",
      "Pour in coconut milk.",
      "Simmer until greens are tender.",
      "Season and serve with ugali."
    ],
    tips: [
      "Don't overcook - greens should stay vibrant",
      "Fresh coconut milk is best",
      "Can add groundnuts for protein"
    ]
  },
  {
    id: "teso-atap",
    name: "Atap (Teso Millet Bread)",
    tribeSlug: "teso",
    tribeName: "Teso",
    category: "staple",
    description: "Traditional Teso millet bread, a dense flatbread that was the staple food before maize became common.",
    culturalSignificance: "Atap was the original staple of the Teso people before colonial introduction of maize. It represents their agricultural heritage.",
    historicalContext: "The Teso are Nilotic people who spread from Uganda into western Kenya. Millet cultivation was central to their traditional economy.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "30 minutes",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet flour", amount: "3 cups" },
      { item: "Water", amount: "1.5 cups" },
      { item: "Salt", amount: "1/2 teaspoon" }
    ],
    instructions: [
      "Mix millet flour with salt.",
      "Gradually add water, kneading to form stiff dough.",
      "Divide into balls and flatten into thick discs.",
      "Cook on dry griddle until browned on both sides.",
      "Serve with meat stew or vegetables."
    ],
    tips: [
      "The bread should be dense but not dry",
      "Traditional version uses stone-ground millet",
      "Can be stored for several days"
    ]
  },
  {
    id: "mijikenda-wali",
    name: "Wali wa Nazi (Mijikenda Coconut Rice)",
    tribeSlug: "mijikenda",
    tribeName: "Mijikenda",
    category: "staple",
    description: "Fragrant rice cooked in coconut milk, the signature dish of Kenya's nine coastal tribes known collectively as Mijikenda.",
    culturalSignificance: "Coconut rice is everyday food along the Kenyan coast. The Mijikenda's access to coconut palms made this a staple.",
    historicalContext: "The Mijikenda ('Nine Tribes') have lived on Kenya's coast for centuries, developing a cuisine rich in coconut and seafood.",
    youtubeVideoId: "TBW9Z2O8_EI",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Coconut milk", amount: "2 cups" },
      { item: "Water", amount: "1 cup" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Cardamom pods", amount: "3" }
    ],
    instructions: [
      "Wash rice thoroughly.",
      "Combine coconut milk and water in pot.",
      "Add cardamom and salt, bring to boil.",
      "Add rice, stir once.",
      "Reduce heat to low, cover tightly.",
      "Cook 20 minutes until rice is fluffy.",
      "Fluff with fork and serve."
    ],
    tips: [
      "Use thick first-press coconut milk for richest flavor",
      "Don't stir after adding rice",
      "Serve with fish curry or meat stew"
    ]
  },
  {
    id: "nuer-wal",
    name: "Wal (Nuer Sorghum Porridge)",
    tribeSlug: "nuer",
    tribeName: "Nuer",
    category: "staple",
    description: "Traditional sorghum porridge of the Nuer people of South Sudan, eaten with soured milk or meat.",
    culturalSignificance: "Wal is the daily staple of the Nuer, a cattle-herding people who supplement their milk diet with sorghum during harvest.",
    historicalContext: "The Nuer, like their Dinka neighbors, are Nilotic pastoralists. Sorghum cultivation provides the grain base for their otherwise cattle-centered diet.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Sorghum flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Soured milk", amount: "For serving" }
    ],
    instructions: [
      "Bring water to boil.",
      "Gradually add sorghum flour, stirring constantly.",
      "Reduce heat and continue stirring.",
      "Cook until thick and pulls away from sides.",
      "Shape into mound.",
      "Serve with soured milk or meat stew."
    ],
    tips: [
      "Consistency should be very thick",
      "Traditionally eaten with fingers",
      "Fermented milk is the traditional accompaniment"
    ]
  },
  
  // ============ NUER (SOUTH SUDAN) ADDITIONAL RECIPES ============
  {
    id: "nuer-fish-stew",
    name: "Nuer Fish Stew",
    tribeSlug: "nuer",
    tribeName: "Nuer",
    category: "special",
    description: "Traditional Nuer freshwater fish stew made with Nile perch and okra, a protein-rich dish from the Sudd wetlands.",
    culturalSignificance: "Fish from the White Nile and Sudd wetlands supplement the Nuer cattle-based diet, especially during dry seasons when the herds are moved.",
    historicalContext: "The Nuer live in the Sudd, one of the world's largest wetlands. They developed sophisticated fishing techniques alongside cattle herding, using the seasonal floods.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "15 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh Nile perch or tilapia", amount: "1 kg", notes: "Cut into portions" },
      { item: "Okra", amount: "200g", notes: "Sliced" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Groundnut paste", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "2 cups" }
    ],
    instructions: [
      "Clean and season fish with salt, set aside.",
      "In a pot, sauté onion until translucent.",
      "Add tomatoes and cook until softened.",
      "Add groundnut paste and water, stir well.",
      "Bring to a simmer and add okra.",
      "Carefully place fish portions in the stew.",
      "Cover and simmer 25-30 minutes until fish is cooked through.",
      "Serve with wal (sorghum porridge)."
    ],
    tips: [
      "Fresh fish from the Nile is traditional",
      "Okra thickens the stew naturally",
      "Don't stir after adding fish to keep pieces intact"
    ]
  },
  {
    id: "nuer-milk-stew",
    name: "Ret (Nuer Soured Milk Stew)",
    tribeSlug: "nuer",
    tribeName: "Nuer",
    category: "staple",
    description: "Traditional Nuer stew made with soured cattle milk and vegetables, a staple that celebrates their pastoral lifestyle.",
    culturalSignificance: "The Nuer are among the most cattle-devoted peoples in Africa. This dish honors their most precious resource - cattle milk.",
    historicalContext: "The Nuer traditionally did not eat cattle meat frequently, preferring to use milk products. Soured milk preserves without refrigeration in South Sudan's heat.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Soured milk (or buttermilk)", amount: "2 cups" },
      { item: "Leafy greens", amount: "2 cups", notes: "Chopped" },
      { item: "Sorghum flour", amount: "2 tablespoons", notes: "For thickening" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Cook greens in a small amount of water until wilted.",
      "In a separate pot, gently warm soured milk (don't boil).",
      "Mix sorghum flour with a little cold water to make a paste.",
      "Stir flour paste into the milk to thicken.",
      "Add cooked greens and salt.",
      "Simmer gently for 10 minutes.",
      "Serve warm with sorghum porridge."
    ],
    tips: [
      "Don't boil the milk or it will curdle",
      "Traditional preparation uses gourd containers",
      "Can add dried fish for extra protein"
    ]
  },

  // ============ SHILLUK (SOUTH SUDAN) RECIPES ============
  {
    id: "shilluk-fish",
    name: "Shilluk Smoked Fish",
    tribeSlug: "shilluk",
    tribeName: "Shilluk",
    category: "special",
    description: "Traditional Shilluk smoked fish from the White Nile, preserved over slow-burning fires and served with millet porridge.",
    culturalSignificance: "The Shilluk kingdom along the White Nile developed sophisticated fishing and smoking techniques. Fish was tribute paid to the Reth (king).",
    historicalContext: "The Shilluk established one of Sudan's oldest kingdoms, with their capital at Fashoda. Fishing the Nile was central to their economy.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "30 minutes",
    cookTime: "3 hours (smoking)",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh Nile fish", amount: "2 kg", notes: "Whole, cleaned" },
      { item: "Salt", amount: "3 tablespoons" },
      { item: "Wood chips", amount: "For smoking" }
    ],
    instructions: [
      "Clean and gut fish, leaving heads on.",
      "Make deep diagonal cuts along the body.",
      "Rub salt thoroughly into cuts and cavity.",
      "Let sit for 2 hours to draw out moisture.",
      "Build a smoking fire with hardwood.",
      "Place fish on a rack above the smoke (not flames).",
      "Smoke for 3-4 hours, turning occasionally.",
      "Fish is done when firm and golden-brown.",
      "Serve with millet or sorghum porridge."
    ],
    tips: [
      "Slow smoking is key - no direct flame",
      "Smoked fish keeps for weeks without refrigeration",
      "Traditional smoking uses Nile riverbank wood"
    ]
  },
  {
    id: "shilluk-millet-porridge",
    name: "Shilluk Millet Porridge",
    tribeSlug: "shilluk",
    tribeName: "Shilluk",
    category: "staple",
    description: "The daily staple of the Shilluk people - thick millet porridge served with fish or vegetable stews.",
    culturalSignificance: "Millet grows well in the Shilluk homeland along the Nile. This porridge sustains the community through all seasons.",
    historicalContext: "The Shilluk were more sedentary than their Dinka and Nuer neighbors, developing agriculture along the Nile's fertile banks.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Millet flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring salted water to a rolling boil.",
      "Reduce heat to medium.",
      "Gradually add millet flour, stirring constantly.",
      "Continue stirring vigorously to prevent lumps.",
      "Cook for 20-25 minutes until very thick.",
      "The porridge should pull cleanly from the pot sides.",
      "Shape into a mound and serve with stew or fish."
    ],
    tips: [
      "Constant stirring prevents lumps",
      "Millet has a slightly sweeter taste than sorghum",
      "Can be made thinner as a breakfast drink"
    ]
  },
  {
    id: "shilluk-okra-stew",
    name: "Shilluk Okra Stew",
    tribeSlug: "shilluk",
    tribeName: "Shilluk",
    category: "staple",
    description: "Thick okra stew with dried fish and groundnuts, the everyday accompaniment to Shilluk millet porridge.",
    culturalSignificance: "Okra thrives in the Shilluk homeland and its mucilaginous texture is prized for scooping up porridge.",
    historicalContext: "Okra is indigenous to Africa and has been cultivated in the Nile Valley for millennia. The Shilluk developed this simple but nourishing preparation.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh okra", amount: "500g", notes: "Sliced" },
      { item: "Dried fish", amount: "150g", notes: "Soaked and shredded" },
      { item: "Groundnuts", amount: "1/2 cup", notes: "Ground to paste" },
      { item: "Onion", amount: "1", notes: "Chopped" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "2 cups" }
    ],
    instructions: [
      "Soak dried fish in warm water for 15 minutes, then shred.",
      "Sauté onion until soft.",
      "Add sliced okra and stir-fry for 5 minutes.",
      "Add water and bring to simmer.",
      "Stir in groundnut paste until dissolved.",
      "Add shredded dried fish.",
      "Simmer 20 minutes until thick and slimy.",
      "Season with salt and serve over millet porridge."
    ],
    tips: [
      "The slimy texture is intentional and prized",
      "Fresh okra gives best results",
      "Groundnuts add protein and richness"
    ]
  },

  // ============ DINKA (SOUTH SUDAN) ADDITIONAL RECIPES ============
  {
    id: "dinka-fish-stew",
    name: "Dinka Fish Stew",
    tribeSlug: "dinka",
    tribeName: "Dinka",
    category: "special",
    description: "Hearty freshwater fish stew from the Sudd wetlands, made with Nile fish and local vegetables.",
    culturalSignificance: "While the Dinka are primarily pastoralists, fishing supplements their diet during the dry season when they camp near the Nile.",
    historicalContext: "The Dinka have inhabited the Sudd region for over 1,000 years. During the dry season, cattle camps move to the river, where fishing becomes important.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "20 minutes",
    cookTime: "35 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh tilapia or Nile perch", amount: "1 kg" },
      { item: "Groundnut paste", amount: "4 tablespoons" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Onion", amount: "1 large" },
      { item: "Green leafy vegetables", amount: "2 cups" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "3 cups" }
    ],
    instructions: [
      "Clean fish and cut into portions, season with salt.",
      "Sauté onion until translucent.",
      "Add tomatoes and cook until soft.",
      "Stir in groundnut paste and water.",
      "Bring to a simmer.",
      "Add fish portions carefully.",
      "Cover and cook for 20 minutes.",
      "Add leafy greens in final 5 minutes.",
      "Serve with walwal (sorghum porridge)."
    ],
    tips: [
      "Fresh Nile fish is traditional",
      "Don't over-stir once fish is added",
      "Groundnuts provide richness and protein"
    ]
  },
  {
    id: "dinka-blood-milk",
    name: "Dinka Blood and Milk",
    tribeSlug: "dinka",
    tribeName: "Dinka",
    category: "beverage",
    description: "Traditional Dinka ceremonial drink mixing fresh cattle blood with milk - similar to the Maasai tradition.",
    culturalSignificance: "Like the Maasai, the Dinka have a sacred relationship with their cattle. Blood is drawn from live animals without killing them.",
    historicalContext: "The Dinka are among the world's tallest people, which some attribute to their high-protein, cattle-based diet including blood and milk.",
    youtubeVideoId: "cRvcIyVXWIw",
    prepTime: "10 minutes",
    cookTime: "None",
    servings: 2,
    difficulty: "hard",
    ingredients: [
      { item: "Fresh cattle blood", amount: "1 cup", notes: "From live animal" },
      { item: "Fresh milk", amount: "2 cups" },
      { item: "Calabash gourd", amount: "1", notes: "For serving" }
    ],
    instructions: [
      "Blood is drawn by making a small incision in the cow's neck vein.",
      "Collect blood in a clean calabash.",
      "The wound is sealed with mud - the cow recovers fully.",
      "Mix fresh blood with warm milk.",
      "Shake or stir to combine.",
      "Drink immediately while fresh."
    ],
    tips: [
      "Reserved for warriors and special occasions",
      "Blood provides iron and protein",
      "Modern Dinka often substitute with plain milk"
    ]
  },

  {
    id: "mursi-sorghum",
    name: "Mursi Sorghum Balls",
    tribeSlug: "mursi",
    tribeName: "Mursi",
    category: "staple",
    description: "Simple sorghum dough balls made by the Mursi people of Ethiopia's Omo Valley, eaten with stews or blood.",
    culturalSignificance: "The Mursi are agro-pastoralists, growing sorghum along the Omo River. This simple preparation is their daily bread.",
    historicalContext: "The Mursi, famous for women's lip plates, maintain traditional food ways in one of Africa's most remote regions.",
    youtubeVideoId: "K8h1QGwTJQc",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Sorghum flour", amount: "2 cups" },
      { item: "Boiling water", amount: "1.5 cups" },
      { item: "Salt", amount: "Pinch" }
    ],
    instructions: [
      "Boil water with salt.",
      "Remove from heat and add sorghum flour.",
      "Stir vigorously until dough forms.",
      "Knead briefly when cool enough to handle.",
      "Form into small balls.",
      "Serve with stew, vegetables, or cattle blood."
    ],
    tips: [
      "Work quickly while dough is hot",
      "Balls should be dense and firm",
      "Traditional preparation uses grinding stones"
    ]
  },
  {
    id: "hamar-honey",
    name: "Hamar Honey Wine",
    tribeSlug: "hamar",
    tribeName: "Hamar",
    category: "beverage",
    description: "Traditional honey mead made by the Hamar people, served at ceremonies including the famous bull jumping ritual.",
    culturalSignificance: "Honey wine is central to Hamar celebrations. It's served during the Ukuli (bull jumping) ceremony that marks a boy's transition to manhood.",
    historicalContext: "The Hamar of the Omo Valley are cattle herders who also keep bees. Honey is highly prized for ceremonial drinks.",
    youtubeVideoId: "CSizduflu2o",
    prepTime: "30 minutes",
    cookTime: "Fermentation: 5-7 days",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Wild honey", amount: "1 kg" },
      { item: "Water", amount: "4 liters" },
      { item: "Gesho (buckthorn bark)", amount: "100g", notes: "Traditional fermenting agent" }
    ],
    instructions: [
      "Dissolve honey in warm water.",
      "Add gesho bark or leaves.",
      "Pour into fermenting gourd or container.",
      "Cover loosely and store in warm place.",
      "Ferment for 5-7 days, tasting daily.",
      "Strain and serve when desired sweetness/strength reached."
    ],
    tips: [
      "Wild forest honey gives best flavor",
      "Longer fermentation = stronger drink",
      "Traditionally served in calabash gourds"
    ]
  },
  {
    id: "karo-fish",
    name: "Karo Grilled Omo Fish",
    tribeSlug: "karo",
    tribeName: "Karo",
    category: "special",
    description: "Fresh fish from the Omo River grilled simply over coals. The Karo practice flood-retreat farming and fishing.",
    culturalSignificance: "The Karo, famous for their body painting, live along the Omo River and rely on its fish for protein.",
    historicalContext: "With only about 1,500 members, the Karo are one of Africa's smallest tribes. They combine fishing with flood-retreat agriculture.",
    youtubeVideoId: "kUPsklj3o3s",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Whole river fish", amount: "2 large" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot peppers", amount: "Optional" }
    ],
    instructions: [
      "Clean and gut fish, leaving whole.",
      "Score sides with diagonal cuts.",
      "Rub with salt inside and out.",
      "Build hot coal fire.",
      "Grill fish over coals, turning once.",
      "Fish is done when flesh flakes easily.",
      "Serve immediately with sorghum porridge."
    ],
    tips: [
      "Fresh fish is essential - same-day catch",
      "Hot coals, not flames, for even cooking",
      "Simple seasoning lets fish flavor shine"
    ]
  },
  {
    id: "ogiek-honey",
    name: "Ogiek Forest Honey",
    tribeSlug: "ogiek",
    tribeName: "Ogiek",
    category: "special",
    description: "Wild forest honey harvested by the Ogiek, Kenya's indigenous forest-dwelling people and master beekeepers.",
    culturalSignificance: "Honey is the heart of Ogiek culture and economy. They are expert beekeepers who have harvested Mau Forest honey for centuries.",
    historicalContext: "The Ogiek won a landmark human rights case in 2017 for their ancestral forest lands. Honey gathering remains central to their identity.",
    youtubeVideoId: "lBZnL1fSz54",
    prepTime: "Varies (harvest)",
    cookTime: "None",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Wild beehives", amount: "In forest trees" },
      { item: "Traditional climbing vines", amount: "For tree climbing" },
      { item: "Smoking materials", amount: "To calm bees" }
    ],
    instructions: [
      "Locate wild bee colonies in tall forest trees.",
      "Climb using traditional vine techniques.",
      "Use smoke to calm bees.",
      "Carefully extract honeycomb.",
      "Descend with honey in bark containers.",
      "Process: strain honey from comb.",
      "Store in calabash gourds."
    ],
    tips: [
      "Ogiek traditional knowledge is passed through generations",
      "Best honey harvested during specific seasons",
      "Sustainable practices ensure bee colony survival"
    ]
  }
];

// ============ SOUTHERN AFRICAN RECIPES ============
const southernAfricanRecipes: Recipe[] = [
  {
    id: "braai",
    name: "Braai (South African BBQ)",
    tribeSlug: "afrikaner",
    tribeName: "South African",
    category: "special",
    description: "More than just a barbecue - braai is South Africa's national pastime. Meat grilled over wood coals, bringing people together across all cultures.",
    culturalSignificance: "Braai transcends race and class in South Africa. Heritage Day (September 24) is informally called 'National Braai Day.' The braai is where South Africans bond.",
    historicalContext: "While grilling meat is ancient, South African braai culture developed from Dutch, British, and African traditions merging. The word 'braai' is Afrikaans. Every group has their style, but the social ritual is shared.",
    youtubeVideoId: "q-lO5TDjQco",
    prepTime: "30 minutes",
    cookTime: "1-2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Boerewors (farmer's sausage)", amount: "1 kg", notes: "Traditional beef sausage" },
      { item: "Lamb chops", amount: "1 kg" },
      { item: "Beef steaks", amount: "1 kg" },
      { item: "Chicken pieces", amount: "1 kg", notes: "Marinated" },
      { item: "Sosaties (kebabs)", amount: "8 skewers", notes: "Cape Malay style" },
      { item: "Coarse salt", amount: "To taste" },
      { item: "Wood or charcoal", amount: "As needed", notes: "Wood preferred" }
    ],
    instructions: [
      "Build a wood fire and let it burn down to hot coals (1 hour).",
      "Spread coals evenly under the grill.",
      "Start with boerewors - cook slowly, turning once.",
      "Add lamb chops - medium-high heat for pink inside.",
      "Grill steaks to preference - don't press them!",
      "Add sosaties and chicken - ensure chicken is cooked through.",
      "Season with salt only - let the meat shine.",
      "Serve with pap, chakalaka, and braaibroodjies."
    ],
    tips: [
      "Wood (especially sekelbos or rooikrans) is preferred over charcoal",
      "Never flip meat more than once",
      "The braaimaster controls the fire - don't interfere!"
    ],
    variations: [
      "Shisa nyama - township braai style with mielie pap",
      "Potjiekos - stew cooked over braai coals"
    ]
  },
  {
    id: "bobotie",
    name: "Bobotie",
    tribeSlug: "cape-malay",
    tribeName: "Cape Malay",
    category: "special",
    description: "South Africa's national dish - spiced minced meat with an egg custard topping. A Cape Malay masterpiece combining Indonesian, Dutch, and African influences.",
    culturalSignificance: "Bobotie represents South Africa's multicultural heritage. It's comfort food served at family gatherings and has become a symbol of the 'rainbow nation' cuisine.",
    historicalContext: "Brought to the Cape by Indonesian slaves and political exiles in the 17th century, bobotie evolved by combining Malay spices with Dutch techniques. The name may come from 'botok' (Indonesian steamed meat dish).",
    youtubeVideoId: "nEMLgtRnwsg",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or lamb mince", amount: "1 kg" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Bread", amount: "2 slices", notes: "Soaked in milk" },
      { item: "Eggs", amount: "3", notes: "2 for topping, 1 mixed in" },
      { item: "Milk", amount: "1 cup" },
      { item: "Curry powder", amount: "2 tablespoons" },
      { item: "Turmeric", amount: "1 teaspoon" },
      { item: "Apricot jam", amount: "2 tablespoons" },
      { item: "Raisins", amount: "1/4 cup" },
      { item: "Bay leaves", amount: "3-4" },
      { item: "Almonds", amount: "2 tablespoons", notes: "Slivered" }
    ],
    instructions: [
      "Sauté onions until golden.",
      "Add mince and brown well.",
      "Add curry powder, turmeric, and cook 2 minutes.",
      "Squeeze milk from bread, add bread to meat.",
      "Stir in jam, raisins, and one beaten egg.",
      "Season with salt and pepper.",
      "Transfer to baking dish, press bay leaves on top.",
      "Beat remaining eggs with milk, pour over meat.",
      "Sprinkle with almonds.",
      "Bake at 180°C for 35-40 minutes until topping is set and golden.",
      "Serve with yellow rice and chutney."
    ],
    tips: [
      "The sweet-savory balance is key - don't skip the jam and raisins",
      "Soaked bread gives the characteristic soft texture",
      "The custard should be just set, not overcooked"
    ]
  },
  {
    id: "pap-en-sheba",
    name: "Pap en Sous (Pap and Tomato Sauce)",
    tribeSlug: "zulu",
    tribeName: "Zulu/South African",
    category: "staple",
    description: "South Africa's most common staple - stiff maize porridge served with tomato and onion sauce. The everyday food of millions.",
    culturalSignificance: "Pap (also called mielie pap) is the staple starch for all South African black communities. 'Pap en vleis' (pap and meat) is the classic braai side.",
    historicalContext: "Maize came to Africa from the Americas in the 16th century. It quickly became the dominant crop, displacing indigenous grains. Pap preparation methods vary by region and community.",
    youtubeVideoId: "Y0FvV8yHHVE",
    prepTime: "5 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Maize meal (mealie meal)", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Butter", amount: "2 tablespoons", notes: "Optional" }
    ],
    instructions: [
      "Bring water and salt to boil in a heavy pot.",
      "Reduce heat to medium. Slowly pour in maize meal, stirring constantly.",
      "Stir vigorously to prevent lumps.",
      "Reduce heat to low, cover, and cook 20-25 minutes.",
      "Stir every 5 minutes to prevent sticking.",
      "Pap should be stiff enough to shape. Add more water if too thick.",
      "Stir in butter if using.",
      "Serve with chakalaka, tomato gravy, or meat."
    ],
    tips: [
      "Krummelpap (crumbly) is drier; stywe pap (stiff) is firmer",
      "Slap pap (soft) is porridge consistency for breakfast",
      "The pot will stick - soak immediately after cooking"
    ],
    variations: [
      "Krummelpap - crumbly, for braai",
      "Stywe pap - stiff, for shaping",
      "Slap pap - soft, for breakfast"
    ]
  },
  {
    id: "chakalaka",
    name: "Chakalaka",
    tribeSlug: "zulu",
    tribeName: "South African",
    category: "staple",
    description: "Spicy vegetable relish originating from township cooking. Essential braai and pap accompaniment.",
    culturalSignificance: "Chakalaka emerged from gold mine hostels and townships. It's now beloved nationwide as the perfect spicy side for pap and braai.",
    historicalContext: "Created by mine workers who combined available vegetables with spices. Each family and region has its own recipe. The name possibly comes from a Zulu or Tsonga word.",
    youtubeVideoId: "U4driexsnt4",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Green peppers", amount: "2", notes: "Diced" },
      { item: "Carrots", amount: "3", notes: "Grated" },
      { item: "Baked beans", amount: "1 can (410g)" },
      { item: "Tomatoes", amount: "4", notes: "Chopped" },
      { item: "Curry powder", amount: "2 tablespoons" },
      { item: "Fresh chilies", amount: "2-3", notes: "Chopped" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Heat oil and sauté onions until soft.",
      "Add peppers and cook 5 minutes.",
      "Add curry powder and chilies, fry 2 minutes.",
      "Add grated carrots and cook 5 minutes.",
      "Add tomatoes and simmer until soft.",
      "Stir in baked beans.",
      "Simmer 10 minutes until thick and well combined.",
      "Season with salt and pepper.",
      "Serve hot or at room temperature with pap and braai."
    ],
    tips: [
      "Can be made a day ahead - flavors improve",
      "Adjust chilies to taste - it should have kick",
      "Some add cabbage for extra bulk"
    ]
  },
  {
    id: "bunny-chow",
    name: "Bunny Chow",
    tribeSlug: "indian-sa",
    tribeName: "South African Indian",
    category: "special",
    description: "A hollowed-out bread loaf filled with curry. Durban's famous street food with Indian origins.",
    culturalSignificance: "Invented by Durban's Indian community, bunny chow is now loved by all South Africans. It's portable, filling, and perfectly combines Indian curry with bread.",
    historicalContext: "Created in Durban in the 1940s, possibly to serve curry to workers who couldn't use plates. 'Bunny' may come from 'bania' (Indian merchant caste). It became iconic street food.",
    youtubeVideoId: "WoDj2_kEnaI",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Bread loaves", amount: "4 small", notes: "Unsliced white bread" },
      { item: "Lamb or chicken", amount: "750g", notes: "Cubed" },
      { item: "Onions", amount: "2 large" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Curry powder", amount: "3 tablespoons" },
      { item: "Masala", amount: "1 tablespoon" },
      { item: "Ginger-garlic paste", amount: "2 tablespoons" },
      { item: "Potatoes", amount: "2", notes: "Cubed" },
      { item: "Fresh coriander", amount: "For garnish" },
      { item: "Oil", amount: "4 tablespoons" }
    ],
    instructions: [
      "Make curry: Fry onions until golden.",
      "Add ginger-garlic paste, fry 2 minutes.",
      "Add curry powder and masala, fry until fragrant.",
      "Add meat and brown on all sides.",
      "Add tomatoes and enough water to cover.",
      "Simmer 45 minutes until meat is tender.",
      "Add potatoes, cook until soft.",
      "Cut top off bread loaves, hollow out the center.",
      "Fill with hot curry.",
      "Top with the bread 'lid' and serve immediately."
    ],
    tips: [
      "The curry should be thick enough not to make bread soggy",
      "Eat by tearing bread and scooping curry",
      "Quarter bunny is most popular size"
    ]
  },
  {
    id: "malva-pudding",
    name: "Malva Pudding",
    tribeSlug: "afrikaner",
    tribeName: "Afrikaner/South African",
    category: "special",
    description: "A sweet, spongy baked dessert soaked in cream sauce. South Africa's most beloved dessert.",
    culturalSignificance: "Malva pudding is the quintessential South African dessert. Served at every special occasion, from Sunday lunch to weddings. It represents Afrikaner home cooking at its best.",
    historicalContext: "Of Cape Dutch origin, the name may come from the Afrikaans word 'malvalekker' (mallow plant) or from the Malmsey wine sometimes used. Every South African grandmother has her own recipe.",
    youtubeVideoId: "lBZnL1fSz54",
    prepTime: "15 minutes",
    cookTime: "45 minutes",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Sugar", amount: "1 cup" },
      { item: "Eggs", amount: "2" },
      { item: "Apricot jam", amount: "2 tablespoons" },
      { item: "Flour", amount: "1.5 cups" },
      { item: "Baking soda", amount: "1 teaspoon" },
      { item: "Salt", amount: "Pinch" },
      { item: "Butter", amount: "1 tablespoon", notes: "Melted" },
      { item: "Milk", amount: "1 cup" },
      { item: "Vinegar", amount: "1 teaspoon" }
    ],
    instructions: [
      "Beat sugar and eggs until fluffy.",
      "Add jam and mix well.",
      "Sift flour, baking soda, and salt together.",
      "Add melted butter to milk, then add vinegar.",
      "Alternately add dry ingredients and milk mixture to egg mixture.",
      "Pour into greased baking dish.",
      "Bake at 180°C for 45 minutes until golden.",
      "Make sauce: Heat 1 cup cream, 100g butter, 1 cup sugar until dissolved.",
      "Pour hot sauce over hot pudding immediately after baking.",
      "Let soak 10 minutes. Serve with custard or cream."
    ],
    tips: [
      "The sauce must be poured while both pudding and sauce are hot",
      "It should be spongy and soaked through",
      "Serve with vanilla custard for authentic experience"
    ]
  },
  {
    id: "biltong",
    name: "Biltong",
    tribeSlug: "afrikaner",
    tribeName: "South African",
    category: "snack",
    description: "Air-dried, cured meat - South Africa's answer to jerky, but softer and more flavorful. A national obsession.",
    culturalSignificance: "Biltong is South Africa's favorite snack. Found everywhere from supermarkets to sports stadiums. Making biltong at home is a cherished tradition.",
    historicalContext: "Dutch settlers (Voortrekkers) needed to preserve meat for their Great Trek inland. They adapted indigenous curing techniques with vinegar and spices. The tradition continues.",
    youtubeVideoId: "_JBA8p4QG7k",
    prepTime: "30 minutes",
    cookTime: "5-7 days (drying)",
    servings: 20,
    difficulty: "medium",
    ingredients: [
      { item: "Beef (silverside or topside)", amount: "2 kg", notes: "Cut into 2-3cm thick strips" },
      { item: "Brown vinegar", amount: "1 cup" },
      { item: "Coarse salt", amount: "1/4 cup" },
      { item: "Coriander seeds", amount: "3 tablespoons", notes: "Roasted and crushed" },
      { item: "Black pepper", amount: "2 tablespoons", notes: "Coarsely ground" },
      { item: "Brown sugar", amount: "2 tablespoons" },
      { item: "Bicarbonate of soda", amount: "1 teaspoon", notes: "Optional, for tenderness" }
    ],
    instructions: [
      "Cut beef into long strips following the grain.",
      "Mix salt, pepper, coriander, sugar, and bicarb.",
      "Splash vinegar over meat in a glass dish.",
      "Sprinkle spice mixture generously over all surfaces.",
      "Cover and refrigerate 12-24 hours, turning once.",
      "Remove meat, pat dry with paper towels.",
      "Hang strips in a cool, dry, ventilated place.",
      "Use a fan for air circulation if needed.",
      "Dry for 5-7 days depending on desired texture.",
      "Slice thinly across the grain to serve."
    ],
    tips: [
      "Fat adds flavor but can go rancid - trim excess",
      "Good airflow is essential to prevent mold",
      "Wet biltong (3-4 days) is softer; dry biltong (7+ days) is firmer"
    ]
  },
  {
    id: "koeksisters",
    name: "Koeksisters",
    tribeSlug: "afrikaner",
    tribeName: "Afrikaner",
    category: "snack",
    description: "Braided dough deep-fried and soaked in cold syrup. Sticky, sweet, and addictively crispy.",
    culturalSignificance: "Koeksisters are the Afrikaner contribution to South African sweets. Sunday markets and church fundraisers are incomplete without them.",
    historicalContext: "Adapted from the Dutch 'koeksister.' The Cape Malay version (koesister) is different - spiced and coated in coconut. The Afrikaner version is braided and syrup-soaked.",
    youtubeVideoId: "twkCJDzubM8",
    prepTime: "2 hours (including resting)",
    cookTime: "30 minutes",
    servings: 24,
    difficulty: "hard",
    ingredients: [
      { item: "Flour", amount: "4 cups" },
      { item: "Baking powder", amount: "4 teaspoons" },
      { item: "Salt", amount: "1/2 teaspoon" },
      { item: "Butter", amount: "50g", notes: "Cold, cubed" },
      { item: "Eggs", amount: "2" },
      { item: "Milk", amount: "1 cup" },
      { item: "Sugar", amount: "4 cups", notes: "For syrup" },
      { item: "Water", amount: "2 cups", notes: "For syrup" },
      { item: "Cream of tartar", amount: "1/2 teaspoon" },
      { item: "Ginger", amount: "1 teaspoon", notes: "Ground" },
      { item: "Oil for frying", amount: "As needed" }
    ],
    instructions: [
      "Make syrup: Boil sugar, water, cream of tartar, and ginger. Chill thoroughly.",
      "Mix flour, baking powder, and salt. Rub in butter.",
      "Beat eggs with milk, add to flour mixture.",
      "Knead into smooth dough. Rest 2 hours in fridge.",
      "Roll dough 5mm thick. Cut into rectangles.",
      "Cut each rectangle into 3 strips, leaving one end joined.",
      "Braid tightly, pinching ends.",
      "Heat oil to 180°C. Fry koeksisters until deep golden.",
      "Immediately dip hot koeksisters into ice-cold syrup for 1 minute.",
      "Drain on rack. Eat fresh - they're best same day."
    ],
    tips: [
      "The syrup MUST be ice-cold and the koeksisters piping hot",
      "This temperature difference creates the crispy, sticky texture",
      "Work in batches to keep syrup cold"
    ]
  },
  // ============ MORE SOUTHERN AFRICAN RECIPES ============
  {
    id: "seswaa",
    name: "Seswaa (Botswana Pounded Beef)",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "special",
    description: "Botswana's national dish - beef slow-cooked until tender, then pounded and shredded. Simple yet deeply satisfying.",
    culturalSignificance: "Seswaa is essential at all Botswana celebrations - weddings, funerals, and national holidays. It represents community and tradition, cooked in large pots over open fires.",
    historicalContext: "The Tswana people developed seswaa as a way to make tough beef tender. Cattle are central to Tswana culture and wealth. The dish honors this relationship with beef at its most basic and delicious.",
    youtubeVideoId: "EsYsag_zJvw",
    prepTime: "15 minutes",
    cookTime: "4 hours",
    servings: 10,
    difficulty: "easy",
    ingredients: [
      { item: "Beef (bone-in, like ribs or shin)", amount: "2 kg" },
      { item: "Water", amount: "To cover" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Place beef in a large pot. Add water to cover.",
      "Bring to boil, then reduce to gentle simmer.",
      "Cook for 3-4 hours until meat falls off bone.",
      "Remove bones, leaving meat in pot.",
      "Using two forks or a pestle, pound and shred the meat.",
      "Let meat cook in its own juices a bit longer.",
      "Season generously with salt.",
      "Serve with pap (bogobe) and morogo (greens)."
    ],
    tips: [
      "The longer it cooks, the easier it shreds",
      "Bone-in cuts give the best flavor",
      "Traditional pounding uses a wooden mortar called 'mokoto'"
    ]
  },
  {
    id: "kapana",
    name: "Kapana (Namibian Street BBQ)",
    tribeSlug: "ovambo",
    tribeName: "Ovambo/Namibian",
    category: "snack",
    description: "Namibia's famous street food - beef grilled on open drums and chopped into bite-size pieces. Served with spicy relish.",
    culturalSignificance: "Kapana is Namibia's great equalizer - everyone from workers to executives crowds around kapana grills in townships. It's the heartbeat of Namibian street culture.",
    historicalContext: "Kapana emerged in Namibia's informal settlements as an affordable, social way to eat meat. The tradition spread nationwide and is now a beloved national institution with dedicated kapana markets.",
    youtubeVideoId: "jWkDJk50Nh8",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Beef (cheap cuts, like brisket)", amount: "1 kg", notes: "Cut into chunks" },
      { item: "Salt", amount: "To taste" },
      { item: "Chili powder", amount: "Optional" },
      { item: "Tomatoes", amount: "2", notes: "For relish" },
      { item: "Onions", amount: "1 large", notes: "For relish" },
      { item: "Chilies", amount: "3-4", notes: "For relish" },
      { item: "Vinegar", amount: "2 tablespoons" }
    ],
    instructions: [
      "Make relish: Dice tomatoes, onions, and chilies. Mix with vinegar and salt.",
      "Heat a drum or large grill until very hot.",
      "Grill beef chunks, turning frequently.",
      "Season with salt as it cooks.",
      "Chop grilled meat into smaller pieces on the grill.",
      "Continue cooking until well-done with crispy edges.",
      "Serve hot with relish and braai salt.",
      "Eat with hands, picking pieces directly."
    ],
    tips: [
      "Kapana should be well-done with crispy fat",
      "The social experience is part of the meal",
      "Best enjoyed standing around the grill"
    ]
  },
  {
    id: "matemba",
    name: "Matemba (Dried Kapenta Fish)",
    tribeSlug: "tonga",
    tribeName: "Tonga/Zimbabwean",
    category: "staple",
    description: "Tiny dried fish from Lake Kariba, cooked with tomatoes and groundnuts. A protein staple of southern Africa.",
    culturalSignificance: "Matemba (kapenta) from Lake Kariba feeds millions across Zimbabwe and Zambia. It's affordable protein that's sustained communities through hard times.",
    historicalContext: "Kapenta were introduced to Lake Kariba in the 1960s from Lake Tanganyika. The small sardine-like fish thrived and created a new fishing industry. Today it's a dietary cornerstone.",
    youtubeVideoId: "bVzODxhs3Hc",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Dried kapenta/matemba", amount: "2 cups" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Onion", amount: "1 large", notes: "Sliced" },
      { item: "Groundnut powder", amount: "2 tablespoons", notes: "Optional" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" },
      { item: "Fresh greens", amount: "For serving" }
    ],
    instructions: [
      "Rinse dried kapenta briefly to remove excess salt.",
      "Heat oil in a pan over medium heat.",
      "Sauté onions until translucent.",
      "Add tomatoes and cook until soft.",
      "Add kapenta and stir to combine.",
      "Add a splash of water and groundnut powder if using.",
      "Cover and simmer 10 minutes.",
      "Season with salt. Serve with sadza and greens."
    ],
    tips: [
      "Don't oversoak the fish or it loses flavor",
      "Groundnut powder adds richness but is optional",
      "Fresh kapenta (if available) needs less cooking"
    ]
  },
  {
    id: "nshima-zambia",
    name: "Nshima (Zambian Maize Porridge)",
    tribeSlug: "bemba",
    tribeName: "Bemba/Zambian",
    category: "staple",
    description: "Zambia's national dish - stiff maize porridge eaten with every meal. The foundation of Zambian cuisine.",
    culturalSignificance: "Nshima is so central to Zambian life that a meal without it isn't considered a meal. It's shaped by hand into balls and used to scoop relish (ndiwo).",
    historicalContext: "Maize became dominant in Zambia during the colonial era. The technique of cooking it into stiff porridge spread from southern Africa. Today, nshima defines Zambian food culture.",
    youtubeVideoId: "XinrsmLFkp0",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "White mealie meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "To taste", notes: "Optional" }
    ],
    instructions: [
      "Bring water to boil in a heavy pot.",
      "Mix 1/2 cup mealie meal with cold water to make slurry.",
      "Pour slurry into boiling water, stirring constantly.",
      "Reduce heat and simmer 5 minutes, stirring.",
      "Gradually add remaining mealie meal, stirring vigorously.",
      "Use wooden spoon to work out all lumps.",
      "Cook on low heat 10-15 minutes, stirring and turning.",
      "Nshima should be stiff enough to shape but not dry.",
      "Wet hands and shape into balls. Serve with ndiwo (relish)."
    ],
    tips: [
      "The slurry method prevents lumps",
      "Keep stirring - nshima requires attention",
      "Perfect nshima doesn't stick to your hands when shaping"
    ]
  },
  {
    id: "muriwo-unedovi",
    name: "Muriwo Unedovi (Zimbabwean Greens with Peanut Butter)",
    tribeSlug: "shona",
    tribeName: "Shona",
    category: "staple",
    description: "Leafy greens cooked with peanut butter - Zimbabwe's favorite vegetable dish. Rich, creamy, and deeply satisfying.",
    culturalSignificance: "Muriwo (greens) with dovi (peanut butter) is everyday food across Zimbabwe. The combination provides complete nutrition - greens for vitamins, groundnuts for protein.",
    historicalContext: "Groundnuts arrived in Africa from South America centuries ago. Zimbabweans embraced them completely, grinding them into butter for cooking. This dish is a perfect example of that integration.",
    youtubeVideoId: "f4mODRjE1vc",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Collard greens or kale", amount: "1 large bunch", notes: "Chopped" },
      { item: "Peanut butter", amount: "3 tablespoons", notes: "Unsweetened" },
      { item: "Tomato", amount: "1", notes: "Chopped" },
      { item: "Onion", amount: "1 medium", notes: "Chopped" },
      { item: "Water", amount: "1/2 cup" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash and chop greens into small pieces.",
      "Sauté onion until soft. Add tomato and cook 3 minutes.",
      "Add chopped greens and stir.",
      "Mix peanut butter with water until smooth.",
      "Pour peanut butter mixture over greens.",
      "Stir to combine. Cover and simmer 15 minutes.",
      "Stir occasionally, adding water if too dry.",
      "Season with salt. Serve with sadza."
    ],
    tips: [
      "Traditional uses freshly ground peanut paste",
      "Any leafy green works - spinach, rape, kale",
      "The peanut butter should coat the greens, not be soupy"
    ]
  },
  {
    id: "vetkoek",
    name: "Vetkoek (Fat Cakes)",
    tribeSlug: "afrikaner",
    tribeName: "South African",
    category: "snack",
    description: "Deep-fried bread dough - crispy outside, fluffy inside. Filled with mince or spread with jam.",
    culturalSignificance: "Vetkoek is beloved street food and home comfort. Every South African knows the joy of a hot vetkoek. Markets and food stalls across the country serve them.",
    historicalContext: "Dutch settlers brought fried bread traditions. The Afrikaans name means 'fat cake.' Similar to American doughnuts but typically savory. Now embraced by all South Africans.",
    youtubeVideoId: "VzKPc4xcV2Q",
    prepTime: "2 hours (including rising)",
    cookTime: "20 minutes",
    servings: 12,
    difficulty: "medium",
    ingredients: [
      { item: "Bread flour", amount: "4 cups" },
      { item: "Instant yeast", amount: "10g" },
      { item: "Sugar", amount: "2 tablespoons" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Warm water", amount: "1.5 cups" },
      { item: "Oil", amount: "For deep frying" }
    ],
    instructions: [
      "Mix flour, yeast, sugar, and salt.",
      "Add warm water and knead to soft dough (10 minutes).",
      "Cover and let rise until doubled (1-2 hours).",
      "Punch down and divide into 12 balls.",
      "Let rest 10 minutes.",
      "Heat oil to 170°C (not too hot).",
      "Flatten balls slightly and fry until golden (3-4 minutes per side).",
      "Drain on paper towels.",
      "Split open and fill with curry mince, syrup, or jam."
    ],
    tips: [
      "Oil must be right temperature - too hot burns outside before inside cooks",
      "Don't crowd the pot - fry 2-3 at a time",
      "Best eaten fresh and warm"
    ]
  },
  // ============ BASOTHO & SWAZI RECIPES ============
  {
    id: "papa-le-moroho",
    name: "Papa le Moroho (Basotho Pap with Greens)",
    tribeSlug: "basotho",
    tribeName: "Basotho",
    category: "staple",
    description: "The national dish of Lesotho - stiff maize porridge served with wild spinach. Simple, nutritious, and deeply traditional.",
    culturalSignificance: "Papa (pap) is the foundation of Basotho cuisine. Eaten at every meal, it represents sustenance and community in the mountain kingdom.",
    historicalContext: "The Basotho settled in the Maloti Mountains under King Moshoeshoe I. Their cuisine adapted to the harsh highland environment with hearty, warming dishes.",
    youtubeVideoId: "Y0FvV8yHHVE",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Wild spinach (moroho)", amount: "500g" },
      { item: "Onion", amount: "1" },
      { item: "Tomato", amount: "1" }
    ],
    instructions: [
      "Boil water with salt.",
      "Gradually add maize meal, stirring constantly.",
      "Cook on low heat 25 minutes, stirring often.",
      "For moroho: Sauté onion, add tomato.",
      "Add washed greens and cook until wilted.",
      "Season with salt.",
      "Serve papa with moroho on the side."
    ],
    tips: [
      "Papa should be stiff enough to shape",
      "Traditional moroho uses wild mountain greens",
      "Can add peanut butter to greens for richness"
    ]
  },
  {
    id: "likhobe",
    name: "Likhobe (Basotho Samp and Beans)",
    tribeSlug: "basotho",
    tribeName: "Basotho",
    category: "staple",
    description: "Hearty Basotho dish of samp (crushed maize) cooked with beans. A warming, protein-rich staple for cold mountain winters.",
    culturalSignificance: "Likhobe is comfort food in Lesotho, providing sustenance during the cold winter months in the highlands.",
    historicalContext: "Samp (likhobe) was introduced to Southern Africa centuries ago. The Basotho adopted it enthusiastically, adding beans for protein.",
    youtubeVideoId: "fE0DuXu53Pk",
    prepTime: "8 hours (soaking)",
    cookTime: "3 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Samp (crushed maize)", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Sugar beans", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Salt", amount: "To taste" },
      { item: "Butter", amount: "2 tablespoons", notes: "Optional" }
    ],
    instructions: [
      "Soak samp and beans separately overnight.",
      "Drain and rinse both.",
      "Combine in large pot, cover with fresh water.",
      "Bring to boil, then reduce to simmer.",
      "Cook 2-3 hours until both are tender.",
      "Add salt and butter if using.",
      "Serve hot as main dish or side."
    ],
    tips: [
      "Long soaking reduces cooking time",
      "Add more water as needed during cooking",
      "Traditionally eaten with meat or gravy"
    ]
  },
  {
    id: "sishwala",
    name: "Sishwala (Swazi Thick Porridge)",
    tribeSlug: "swazi",
    tribeName: "Swazi",
    category: "staple",
    description: "Traditional Swazi thick maize porridge, the foundation of every Swazi meal. Similar to pap but with distinctive preparation.",
    culturalSignificance: "Sishwala is central to Swazi food culture. No ceremony or celebration is complete without it. It's the food that binds Swazi families together.",
    historicalContext: "The Swazi Kingdom is one of Africa's last absolute monarchies. Traditional food ways, including sishwala, remain central to national identity.",
    youtubeVideoId: "Y0FvV8yHHVE",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring water to rolling boil.",
      "Add salt.",
      "Slowly pour in maize meal while stirring vigorously.",
      "Reduce heat and continue stirring.",
      "Cook 20-25 minutes until thick and smooth.",
      "Shape into mound on serving plate.",
      "Serve with meat, vegetables, or sour milk."
    ],
    tips: [
      "Constant stirring prevents lumps",
      "Should be thicker than breakfast porridge",
      "Traditional Swazi serve with emasi (soured milk)"
    ]
  },
  {
    id: "emasi-emabele",
    name: "Emasi Emabele (Swazi Soured Milk with Sorghum)",
    tribeSlug: "swazi",
    tribeName: "Swazi",
    category: "beverage",
    description: "Traditional Swazi fermented milk mixed with sorghum meal. A nutritious drink-food that's been sustaining Swazis for generations.",
    culturalSignificance: "Emasi is deeply valued in Swazi culture. Cattle are central to Swazi wealth, and their milk products are treasured.",
    historicalContext: "Like many African cattle cultures, the Swazi developed sophisticated milk fermentation. Emasi keeps without refrigeration and is highly nutritious.",
    youtubeVideoId: "oNDwxXWM5To",
    prepTime: "2-3 days (fermentation)",
    cookTime: "None",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh whole milk", amount: "2 liters" },
      { item: "Sorghum flour", amount: "2 tablespoons", notes: "Optional" },
      { item: "Calabash gourd", amount: "For fermenting", notes: "Traditional container" }
    ],
    instructions: [
      "Pour fresh milk into clean calabash or container.",
      "Cover loosely and leave at room temperature.",
      "Let ferment 2-3 days until thick and sour.",
      "Shake or stir well before serving.",
      "Can mix in sorghum flour for thickness.",
      "Serve cold as drink or with sishwala."
    ],
    tips: [
      "Traditional calabash imparts unique flavor",
      "Consistency should be like thick buttermilk",
      "Fermentation time varies with temperature"
    ]
  },

  // ============ OVIMBUNDU (ANGOLA) RECIPES ============
  {
    id: "funge-ovimbundu",
    name: "Funge (Angolan Cassava Porridge)",
    tribeSlug: "ovimbundu",
    tribeName: "Ovimbundu",
    category: "staple",
    description: "Angola's national staple - thick cassava flour porridge served with rich stews. The centerpiece of every Ovimbundu meal.",
    culturalSignificance: "Funge is to Angolans what ugali is to East Africans. The Ovimbundu of the central highlands perfected it, serving it at every family gathering.",
    historicalContext: "Cassava arrived in Angola from Brazil via Portuguese traders in the 16th century. The Ovimbundu adapted it to their highland agriculture, making funge the foundation of Angolan cuisine.",
    youtubeVideoId: "CJSs3Op2iu0",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Cassava flour (fuba de bombó)", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring salted water to a rolling boil in a heavy pot.",
      "Gradually add cassava flour while stirring vigorously with a wooden spoon.",
      "Reduce heat and continue stirring to prevent lumps.",
      "Cook 15-20 minutes, stirring constantly until very thick and smooth.",
      "The funge should pull away from the sides of the pot.",
      "Wet a bowl and shape funge into a mound.",
      "Serve immediately with calulu, muamba, or fish stews."
    ],
    tips: [
      "Constant stirring is key to smooth funge",
      "Should be thicker than mashed potatoes",
      "Eat by pinching pieces to scoop up stew"
    ]
  },
  {
    id: "calulu-ovimbundu",
    name: "Calulu (Angolan Fish and Vegetable Stew)",
    tribeSlug: "ovimbundu",
    tribeName: "Ovimbundu",
    category: "special",
    description: "Angola's beloved dried fish stew with okra, sweet potato leaves, and palm oil. A celebration dish with complex flavors.",
    culturalSignificance: "Calulu is served at weddings, funerals, and family celebrations. It represents the essence of Angolan comfort food and hospitality.",
    historicalContext: "Calulu combines indigenous vegetables with dried fish traditions. The Ovimbundu adapted coastal recipes for their inland highlands, creating this iconic dish.",
    youtubeVideoId: "Djonn-S4OiU",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Dried fish (bacalhau or similar)", amount: "500g", notes: "Soaked overnight" },
      { item: "Fresh fish", amount: "500g", notes: "Cut into pieces" },
      { item: "Okra", amount: "300g", notes: "Sliced" },
      { item: "Sweet potato leaves (or spinach)", amount: "400g" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Chili peppers", amount: "2-3" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak dried fish overnight, then drain and shred.",
      "In a large pot, heat palm oil and sauté onions until golden.",
      "Add garlic and tomatoes, cook until soft.",
      "Add dried fish and fresh fish pieces.",
      "Add enough water to cover, bring to simmer.",
      "Add okra and cook 15 minutes until tender.",
      "Add sweet potato leaves and chili peppers.",
      "Simmer 20 more minutes until everything is tender.",
      "Season with salt. Serve with funge."
    ],
    tips: [
      "Good calulu should be thick, not soupy",
      "Palm oil gives authentic color and flavor",
      "Some add jimboa (wild spinach) for extra flavor"
    ]
  },
  {
    id: "muamba-ovimbundu",
    name: "Muamba de Galinha (Angolan Palm Chicken)",
    tribeSlug: "ovimbundu",
    tribeName: "Ovimbundu",
    category: "special",
    description: "Angola's national chicken dish - tender chicken cooked in palm nut sauce with okra and spices. Rich, creamy, and unforgettable.",
    culturalSignificance: "Muamba is Angola's national dish, served at every celebration. The Ovimbundu version from the highlands is particularly prized.",
    historicalContext: "Palm oil and palm nut sauce are ancient African ingredients. Portuguese colonizers spread the dish's fame globally, but Angolans perfected the recipe.",
    youtubeVideoId: "J2H8G-MGQJ4",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Palm nut cream (muamba)", amount: "400g", notes: "Or palm oil concentrate" },
      { item: "Okra", amount: "200g", notes: "Whole small ones" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Tomatoes", amount: "3", notes: "Chopped" },
      { item: "Hot chili", amount: "1-2", notes: "Whole" },
      { item: "Salt", amount: "To taste" },
      { item: "Lemon juice", amount: "2 tablespoons" }
    ],
    instructions: [
      "Marinate chicken with lemon juice, garlic, and salt for 30 minutes.",
      "Brown chicken pieces in a little oil, set aside.",
      "Sauté onions until golden, add tomatoes.",
      "Add palm nut cream and stir well.",
      "Return chicken to pot, add water to cover halfway.",
      "Add whole chilies and simmer 30 minutes.",
      "Add okra and cook 15 more minutes.",
      "Sauce should thicken and coat the chicken.",
      "Serve with funge, rice, or fufu."
    ],
    tips: [
      "Don't cut the okra - leave whole to avoid sliminess",
      "Palm nut cream can be found in African stores",
      "Adjust chili to preference - traditional is quite spicy"
    ]
  },

  // ============ CHOKWE (ANGOLA/DRC/ZAMBIA) RECIPES ============
  {
    id: "chikuanga-chokwe",
    name: "Chikuanga (Chokwe Cassava Bread)",
    tribeSlug: "chokwe",
    tribeName: "Chokwe",
    category: "staple",
    description: "Traditional cassava bread wrapped and steamed in banana leaves. A portable staple for Chokwe hunters and travelers.",
    culturalSignificance: "Chikuanga sustained Chokwe hunters during long expeditions. It keeps well without refrigeration, making it perfect for their semi-nomadic lifestyle.",
    historicalContext: "The Chokwe were renowned hunters and traders. Chikuanga was the ideal travel food, providing energy for long journeys across the Angola-DRC-Zambia region.",
    youtubeVideoId: "CJSs3Op2iu0",
    prepTime: "3 days (fermentation)",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava roots", amount: "3 kg", notes: "Peeled" },
      { item: "Water", amount: "For soaking" },
      { item: "Banana leaves", amount: "8-10 large", notes: "For wrapping" }
    ],
    instructions: [
      "Peel cassava and soak in water for 3-4 days until soft and fermented.",
      "Drain and remove the fibrous core from each piece.",
      "Pound the softened cassava into a smooth, sticky paste.",
      "Prepare banana leaves by briefly passing over flame to soften.",
      "Place portions of cassava paste on each leaf.",
      "Wrap tightly into cylindrical packages, tying with leaf strips.",
      "Steam in a large pot for 2 hours until firm.",
      "Let cool slightly before unwrapping and slicing."
    ],
    tips: [
      "Fermentation gives the distinctive tangy flavor",
      "Properly wrapped chikuanga lasts for days",
      "Slice and serve with any stew or sauce"
    ]
  },
  {
    id: "mukua-chokwe",
    name: "Mukua (Chokwe Game Stew)",
    tribeSlug: "chokwe",
    tribeName: "Chokwe",
    category: "special",
    description: "Traditional Chokwe hunter's stew made with wild game, cassava leaves, and forest ingredients. Reflects their hunting heritage.",
    culturalSignificance: "Hunting is central to Chokwe identity. This stew represents the bounty of successful hunts and is shared communally.",
    historicalContext: "The Chokwe were master hunters who tracked elephants for ivory trade. Their cuisine reflects deep knowledge of forest ingredients and game preparation.",
    youtubeVideoId: "igiBDfuL5KU",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Game meat (or beef)", amount: "1 kg", notes: "Cubed" },
      { item: "Cassava leaves (saka saka)", amount: "500g", notes: "Finely shredded" },
      { item: "Palm oil", amount: "4 tablespoons" },
      { item: "Onion", amount: "1 large" },
      { item: "Tomatoes", amount: "2" },
      { item: "Peanut butter", amount: "3 tablespoons" },
      { item: "Chili pepper", amount: "1-2" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Boil meat until tender, about 1-1.5 hours. Reserve broth.",
      "In a separate pot, cook cassava leaves in salted water for 30 minutes.",
      "Heat palm oil and sauté onions and tomatoes.",
      "Add cooked meat and some broth.",
      "Stir in peanut butter until dissolved.",
      "Add drained cassava leaves.",
      "Simmer together for 20 minutes until flavors blend.",
      "Season and serve with chikuanga or funge."
    ],
    tips: [
      "Traditional uses various bush meats",
      "Cassava leaves need long cooking to remove toxins",
      "Peanut butter adds richness to the sauce"
    ]
  },

  // ============ LUNDA (ANGOLA/DRC/ZAMBIA) RECIPES ============
  {
    id: "nshima-lunda",
    name: "Nshima ya Lunda (Lunda Maize Porridge)",
    tribeSlug: "lunda",
    tribeName: "Lunda",
    category: "staple",
    description: "The Lunda version of thick maize porridge, served with relishes. A unifying food across the three-country Lunda territory.",
    culturalSignificance: "Nshima brings Lunda families together. The act of sharing from one pot reinforces community bonds.",
    historicalContext: "The Lunda Empire was one of Central Africa's greatest, spanning modern Angola, DRC, and Zambia. Their cuisine reflects this vast territory.",
    youtubeVideoId: "j3XN0gosaq8",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring 4 cups water to boil with salt.",
      "Mix remaining cup water with 1 cup maize meal to make slurry.",
      "Pour slurry into boiling water, stirring constantly.",
      "Cook 5 minutes until thickened.",
      "Gradually add remaining maize meal, stirring vigorously.",
      "Reduce heat and cook 15-20 minutes, stirring often.",
      "Nshima is ready when it pulls cleanly from the pot.",
      "Shape into smooth mound and serve."
    ],
    tips: [
      "No lumps should remain in good nshima",
      "Should be stiff enough to shape",
      "Eat with fingers, pinching to scoop relish"
    ]
  },
  {
    id: "mfumbwa-lunda",
    name: "Mfumbwa (Wild Spinach Stew)",
    tribeSlug: "lunda",
    tribeName: "Lunda",
    category: "staple",
    description: "Lunda wild spinach cooked with palm oil and dried fish. A nutritious everyday dish from the forest.",
    culturalSignificance: "Wild greens are essential to Lunda diet, foraged from the forests that cover their homeland.",
    youtubeVideoId: "5FWQPgHiRms",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Wild spinach (or regular spinach)", amount: "500g" },
      { item: "Dried fish", amount: "100g", notes: "Shredded" },
      { item: "Palm oil", amount: "3 tablespoons" },
      { item: "Onion", amount: "1 medium" },
      { item: "Tomato", amount: "1" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash and chop spinach finely.",
      "Soak dried fish briefly, then shred.",
      "Heat palm oil and sauté onion until soft.",
      "Add tomato and cook 3 minutes.",
      "Add dried fish and stir.",
      "Add spinach, cover, and cook 20 minutes.",
      "Stir occasionally, adding water if needed.",
      "Season and serve with nshima."
    ],
    tips: [
      "Traditional uses mfumbwa leaves from the forest",
      "Palm oil gives distinctive orange color",
      "Dried fish adds protein and umami"
    ]
  },

  // ============ MBUNDU (ANGOLA) RECIPES ============
  {
    id: "kizaca-mbundu",
    name: "Kizaca (Mbundu Bean Stew)",
    tribeSlug: "mbundu",
    tribeName: "Mbundu",
    category: "staple",
    description: "Traditional Mbundu stew of beans cooked with dried fish and palm oil. A protein-rich staple from coastal Angola.",
    culturalSignificance: "The Mbundu are the second largest group in Angola. Kizaca represents their agricultural heritage around Luanda.",
    historicalContext: "The Mbundu kingdom of Ndongo resisted Portuguese colonization under Queen Nzinga. Their cuisine blends indigenous and coastal influences.",
    youtubeVideoId: "fE0DuXu53Pk",
    prepTime: "8 hours (soaking)",
    cookTime: "1.5 hours",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Dried beans", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Dried fish", amount: "200g" },
      { item: "Palm oil", amount: "4 tablespoons" },
      { item: "Onion", amount: "1 large" },
      { item: "Tomatoes", amount: "2" },
      { item: "Garlic", amount: "3 cloves" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Soak beans overnight, drain and rinse.",
      "Boil beans until tender, about 1 hour.",
      "Soak dried fish briefly, then shred.",
      "In a separate pan, heat palm oil.",
      "Sauté onion, garlic, and tomatoes.",
      "Add shredded dried fish and cook 5 minutes.",
      "Add cooked beans and some cooking liquid.",
      "Simmer together 20 minutes until thick.",
      "Serve with funge or rice."
    ],
    tips: [
      "Traditional uses feijão manteiga (butter beans)",
      "Dried fish adds essential flavor",
      "Should be thick, not soupy"
    ]
  },

  // ============ KIMBUNDU (ANGOLA) RECIPES ============
  {
    id: "kimbundu-funge",
    name: "Funge de Bombo (Kimbundu Cassava Funge)",
    tribeSlug: "kimbundu",
    tribeName: "Kimbundu",
    category: "staple",
    description: "The Kimbundu version of Angola's national cassava porridge, made with fermented cassava flour for a distinctive tangy flavor.",
    culturalSignificance: "The Kimbundu around Luanda developed their own style of funge using bombo (fermented cassava), reflecting their coastal-influenced cuisine.",
    historicalContext: "The Kimbundu's Ndongo kingdom was the first to receive cassava from Portuguese traders in the 16th century. They developed fermentation techniques that enhanced both flavor and nutrition.",
    youtubeVideoId: "CJSs3Op2iu0",
    prepTime: "3 days (fermentation)",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Cassava roots", amount: "1 kg", notes: "Peeled" },
      { item: "Water", amount: "For soaking and cooking" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Peel and grate cassava roots.",
      "Soak in water for 3-4 days until fermented and sour-smelling.",
      "Drain and squeeze out excess water.",
      "Dry the fermented cassava and pound into flour.",
      "Bring salted water to a boil.",
      "Gradually add fermented cassava flour, stirring vigorously.",
      "Continue stirring until thick and smooth.",
      "Cook for 15 minutes until glossy.",
      "Serve with calulu or muamba de galinha."
    ],
    tips: [
      "Fermentation gives distinctive sour flavor",
      "Must be stirred constantly to prevent lumps",
      "Bombo flour can be made in batches and stored"
    ]
  },
  {
    id: "kimbundu-calulu",
    name: "Calulu de Peixe (Kimbundu Fish Calulu)",
    tribeSlug: "kimbundu",
    tribeName: "Kimbundu",
    category: "special",
    description: "Kimbundu-style fish and vegetable stew with dried and fresh fish, palm oil, and gimboa leaves - a Luanda specialty.",
    culturalSignificance: "The coastal Kimbundu have access to fresh Atlantic fish, making their calulu distinct from inland versions. It's served at weddings and celebrations.",
    historicalContext: "Luanda was founded in Kimbundu territory in 1575. Their calulu blends Portuguese and indigenous influences, representing centuries of cultural fusion.",
    youtubeVideoId: "wWDv2t4bU8U",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Fresh fish (sea bass or similar)", amount: "500g" },
      { item: "Dried fish", amount: "200g" },
      { item: "Sweet potato leaves or spinach", amount: "500g" },
      { item: "Okra", amount: "200g", notes: "Sliced" },
      { item: "Palm oil", amount: "1/2 cup" },
      { item: "Onion", amount: "2 large" },
      { item: "Tomatoes", amount: "4" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Soak dried fish for 30 minutes, then shred.",
      "Cut fresh fish into portions and season.",
      "Blanch leafy greens briefly and chop.",
      "Heat palm oil and sauté onions and garlic.",
      "Add tomatoes and cook until soft.",
      "Add dried fish and cook 10 minutes.",
      "Add okra and a cup of water.",
      "Layer fresh fish on top, cover and simmer 20 minutes.",
      "Add greens in final 5 minutes.",
      "Serve with funge."
    ],
    tips: [
      "Layer ingredients - don't stir once fish is added",
      "Palm oil gives authentic orange color",
      "Fresh Atlantic fish makes Kimbundu version distinctive"
    ]
  },
  {
    id: "kimbundu-moamba",
    name: "Moamba de Ginguba (Kimbundu Groundnut Chicken)",
    tribeSlug: "kimbundu",
    tribeName: "Kimbundu",
    category: "special",
    description: "Kimbundu-style chicken stewed in groundnut (peanut) sauce - a variation of the classic moamba using peanuts instead of palm nuts.",
    culturalSignificance: "The Kimbundu were major groundnut cultivators. This variation of moamba showcases their agricultural heritage.",
    historicalContext: "Groundnuts arrived in Angola from Brazil via Portuguese traders. The Kimbundu quickly adopted them, creating this fusion of indigenous and New World ingredients.",
    youtubeVideoId: "fLK6YYQn7Zs",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Groundnut paste (peanut butter)", amount: "1 cup", notes: "Natural, unsweetened" },
      { item: "Onion", amount: "2 large" },
      { item: "Tomatoes", amount: "4", notes: "Blended" },
      { item: "Garlic", amount: "4 cloves" },
      { item: "Palm oil", amount: "4 tablespoons" },
      { item: "Chicken stock", amount: "2 cups" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Brown chicken pieces in palm oil, set aside.",
      "Sauté onion and garlic until soft.",
      "Add blended tomatoes and cook 10 minutes.",
      "Stir in groundnut paste until smooth.",
      "Add chicken stock gradually, stirring.",
      "Return chicken to pot.",
      "Cover and simmer 45 minutes until chicken is tender.",
      "Sauce should be thick and creamy.",
      "Serve with funge or rice."
    ],
    tips: [
      "Natural peanut butter works best",
      "Stir frequently to prevent sticking",
      "Can substitute palm oil with vegetable oil"
    ]
  },

  // ============ MAKONDE (TANZANIA/MOZAMBIQUE) RECIPES ============
  {
    id: "wali-na-maharage-makonde",
    name: "Wali na Maharage (Makonde Rice and Beans)",
    tribeSlug: "makonde",
    tribeName: "Makonde",
    category: "staple",
    description: "Coconut rice cooked with spiced beans - the everyday food of the Makonde people of southeastern Tanzania.",
    culturalSignificance: "This dish reflects the Makonde's coastal influences while maintaining their plateau traditions.",
    historicalContext: "The Makonde are renowned for their wood carving traditions. Living on the Makonde Plateau, they developed cuisine that blends coastal and inland ingredients.",
    youtubeVideoId: "TBW9Z2O8_EI",
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Kidney beans", amount: "1 cup", notes: "Cooked" },
      { item: "Coconut milk", amount: "1 can (400ml)" },
      { item: "Onion", amount: "1" },
      { item: "Garlic", amount: "2 cloves" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Cook beans until tender if not already cooked.",
      "Sauté onion and garlic until fragrant.",
      "Add cumin and stir.",
      "Add rice and stir to coat.",
      "Add coconut milk and water to cover rice by 1 inch.",
      "Add cooked beans and salt.",
      "Cover and cook on low until rice is done, about 20 minutes.",
      "Fluff and serve."
    ],
    tips: [
      "Coconut milk gives rich, creamy texture",
      "Can use pigeon peas instead of kidney beans",
      "Serve with grilled fish or meat"
    ]
  },
  {
    id: "ugali-makonde",
    name: "Ugali wa Makonde (Cassava Ugali)",
    tribeSlug: "makonde",
    tribeName: "Makonde",
    category: "staple",
    description: "Makonde-style stiff porridge made from cassava flour rather than maize. Reflects the cassava-rich Makonde Plateau.",
    culturalSignificance: "Cassava is central to Makonde agriculture and cuisine, adapted to the plateau's conditions.",
    youtubeVideoId: "c4T0MU0gjcA",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Cassava flour", amount: "2 cups" },
      { item: "Water", amount: "4 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring salted water to boil.",
      "Gradually add cassava flour, stirring constantly.",
      "Reduce heat and keep stirring vigorously.",
      "Cook 15-20 minutes until very thick.",
      "Should pull cleanly from pot sides.",
      "Shape into mound and serve with relishes."
    ],
    tips: [
      "Cassava ugali is slightly stickier than maize",
      "Pairs well with dried fish and greens",
      "Traditional to Makonde and other coastal groups"
    ]
  },

  // ============ YAO (MALAWI/MOZAMBIQUE/TANZANIA) RECIPES ============
  {
    id: "nsima-yao",
    name: "Nsima ya Yao (Yao-Style Porridge)",
    tribeSlug: "yao",
    tribeName: "Yao",
    category: "staple",
    description: "The Yao people's version of thick maize porridge, often served with freshwater fish from Lake Malawi.",
    culturalSignificance: "The Yao are predominantly Muslim, having converted through trade contacts. Their cuisine reflects both African and Islamic influences.",
    historicalContext: "The Yao were major traders between the coast and interior, bringing Islamic culture to Malawi. Their food traditions blend local ingredients with coastal influences.",
    youtubeVideoId: "j3XN0gosaq8",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize flour", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Boil 4 cups water with salt.",
      "Mix remaining water with 1 cup flour.",
      "Add slurry to boiling water, stirring.",
      "Cook 5 minutes until it thickens.",
      "Add remaining flour gradually.",
      "Stir vigorously for 15 minutes.",
      "Shape and serve with fish or meat."
    ],
    tips: [
      "Yao often serve with dried usipa fish",
      "Halal meat is preferred by Muslim Yao",
      "Shared from a communal bowl"
    ]
  },
  {
    id: "usipa-yao",
    name: "Usipa (Yao Dried Lake Fish)",
    tribeSlug: "yao",
    tribeName: "Yao",
    category: "staple",
    description: "Tiny dried sardine-like fish from Lake Malawi, cooked with tomatoes and onions. A protein staple for the Yao.",
    culturalSignificance: "Lake Malawi provides abundant fish. The Yao preserve it by sun-drying, creating a year-round protein source.",
    youtubeVideoId: "lie8xwHRG44",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Dried usipa fish", amount: "2 cups" },
      { item: "Tomatoes", amount: "2", notes: "Chopped" },
      { item: "Onion", amount: "1", notes: "Sliced" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Rinse dried fish briefly to remove excess salt.",
      "Heat oil and sauté onions until golden.",
      "Add tomatoes and cook until soft.",
      "Add dried fish and stir to coat.",
      "Add a little water if needed.",
      "Cover and simmer 10 minutes.",
      "Serve with nsima."
    ],
    tips: [
      "Don't overcook or fish becomes mushy",
      "Can add groundnut powder for richness",
      "Similar to Kenyan omena but larger fish"
    ]
  },

  // ============ LOZI (ZAMBIA) RECIPES ============
  {
    id: "nshima-lozi",
    name: "Buhobe (Lozi Thick Porridge)",
    tribeSlug: "lozi",
    tribeName: "Lozi",
    category: "staple",
    description: "The Lozi staple porridge, served with fish from the Zambezi floodplains. The foundation of every Lozi meal.",
    culturalSignificance: "The Lozi Kingdom (Barotseland) is one of Africa's oldest monarchies. Buhobe with fish represents the abundance of the Zambezi.",
    historicalContext: "The Lozi control the Zambezi floodplains and are famous for the annual Kuomboka ceremony when the king moves from low to high ground as floods rise.",
    youtubeVideoId: "j3XN0gosaq8",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring 4 cups salted water to boil.",
      "Mix remaining water with 1 cup maize meal.",
      "Add slurry to boiling water, stirring constantly.",
      "Cook until thickened.",
      "Add remaining maize meal gradually.",
      "Stir vigorously for 15-20 minutes.",
      "Shape into mound and serve with fish."
    ],
    tips: [
      "Lozi serve with abundant Zambezi fish",
      "Must be stiff and shapeable",
      "Eaten with fingers in the traditional way"
    ]
  },
  {
    id: "inswi-lozi",
    name: "Inswi (Lozi Zambezi Bream)",
    tribeSlug: "lozi",
    tribeName: "Lozi",
    category: "special",
    description: "Fresh Zambezi tigerfish or bream, grilled or fried in the Lozi tradition. The pride of Barotseland's waters.",
    culturalSignificance: "Fishing is central to Lozi identity. The Zambezi provides abundant bream, tigerfish, and other species.",
    historicalContext: "The Lozi developed sophisticated fishing techniques in the Zambezi floodplains, including fish traps and nets that are still used today.",
    youtubeVideoId: "2mJVG-uRKGg",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Whole bream or tilapia", amount: "2 large", notes: "Cleaned and scaled" },
      { item: "Salt", amount: "1 tablespoon" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Garlic", amount: "4 cloves", notes: "Crushed" },
      { item: "Cooking oil", amount: "For frying" }
    ],
    instructions: [
      "Make diagonal cuts on both sides of fish.",
      "Mix salt, lemon juice, and garlic.",
      "Rub mixture inside and out. Marinate 30 minutes.",
      "Heat oil in a deep pan.",
      "Fry fish until golden on each side, about 8 minutes per side.",
      "Drain on paper towels.",
      "Serve with buhobe and vegetables."
    ],
    tips: [
      "Fresh Zambezi fish is incomparable",
      "Tigerfish is prized but boney",
      "Grilling over wood fire is traditional"
    ]
  },

  // ============ NGONI (MALAWI/ZAMBIA/TANZANIA) RECIPES ============
  {
    id: "nsima-ngoni",
    name: "Nsima ya Ngoni (Ngoni Warrior's Porridge)",
    tribeSlug: "ngoni",
    tribeName: "Ngoni",
    category: "staple",
    description: "The thick maize porridge of the Ngoni warriors who migrated from Zululand. Hearty and sustaining.",
    culturalSignificance: "The Ngoni fled Shaka's Zulu wars and settled across southern Africa. Their cuisine blends Zulu and Central African traditions.",
    historicalContext: "The Ngoni migration (mfecane) spread Zulu military and cultural traditions across modern Malawi, Zambia, and Tanzania.",
    youtubeVideoId: "j3XN0gosaq8",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize meal", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Bring salted water to rolling boil.",
      "Add maize meal gradually, stirring constantly.",
      "Reduce heat and continue stirring.",
      "Cook 20 minutes until very thick.",
      "Shape and serve with meat relish."
    ],
    tips: [
      "Ngoni prefer stiff nsima for hard work",
      "Traditionally served with beef - cattle are precious",
      "Eating is done with the right hand only"
    ]
  },
  {
    id: "nyama-ngoni",
    name: "Nyama ya Ngoni (Ngoni Grilled Beef)",
    tribeSlug: "ngoni",
    tribeName: "Ngoni",
    category: "special",
    description: "Traditional Ngoni grilled beef, reflecting their Zulu cattle-keeping heritage. Simple, fire-roasted perfection.",
    culturalSignificance: "Cattle are central to Ngoni wealth and identity, inherited from their Zulu ancestors. Beef is for celebrations.",
    historicalContext: "When the Ngoni fled Zululand during the mfecane, they brought their cattle culture. Beef remains ceremonial food.",
    youtubeVideoId: "siv6d9f4kx4",
    prepTime: "15 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Beef (ribs or steaks)", amount: "2 kg" },
      { item: "Coarse salt", amount: "2 tablespoons" },
      { item: "Wood fire", amount: "For grilling" }
    ],
    instructions: [
      "Build a fire and let it burn to hot coals.",
      "Season beef generously with coarse salt.",
      "Position meat over hot coals.",
      "Grill slowly, turning occasionally.",
      "Cook 1 hour or until done to preference.",
      "Slice and serve with nsima."
    ],
    tips: [
      "Slow grilling over wood is essential",
      "Fat dripping on coals adds flavor",
      "Ngoni tradition favors well-done meat"
    ]
  },

  // ============ TUMBUKA (MALAWI) RECIPES ============
  {
    id: "nsima-tumbuka",
    name: "Nsima ya Tumbuka",
    tribeSlug: "tumbuka",
    tribeName: "Tumbuka",
    category: "staple",
    description: "The Tumbuka people's version of thick maize porridge, from northern Malawi's highlands.",
    culturalSignificance: "The Tumbuka are the second largest group in Malawi. Nsima is the daily staple.",
    historicalContext: "The Tumbuka kingdom was subjugated by Ngoni invaders but maintained their distinct language and food traditions.",
    youtubeVideoId: "j3XN0gosaq8",
    prepTime: "5 minutes",
    cookTime: "25 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "White maize flour", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Boil salted water in a heavy pot.",
      "Gradually add maize flour while stirring.",
      "Stir vigorously to prevent lumps.",
      "Cook on low heat for 20 minutes.",
      "Shape into smooth mound.",
      "Serve with ndiwo (relish)."
    ],
    tips: [
      "Tumbuka use a wooden paddle for stirring",
      "Served with various vegetable and meat relishes",
      "Essential at every meal"
    ]
  },
  {
    id: "masamba-tumbuka",
    name: "Ndiwo wa Masamba (Tumbuka Pumpkin Leaf Relish)",
    tribeSlug: "tumbuka",
    tribeName: "Tumbuka",
    category: "staple",
    description: "Traditional Tumbuka vegetable relish made from pumpkin leaves and groundnuts.",
    culturalSignificance: "Pumpkin leaves are a treasured vegetable across Malawi. The Tumbuka version with groundnuts is particularly rich.",
    youtubeVideoId: "5FWQPgHiRms",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Pumpkin leaves", amount: "500g", notes: "Chopped" },
      { item: "Groundnut flour", amount: "3 tablespoons" },
      { item: "Tomato", amount: "1", notes: "Chopped" },
      { item: "Onion", amount: "1", notes: "Chopped" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Wash and chop pumpkin leaves finely.",
      "Sauté onion and tomato until soft.",
      "Add pumpkin leaves with a little water.",
      "Cover and cook 15 minutes.",
      "Mix groundnut flour with water to make paste.",
      "Stir groundnut paste into vegetables.",
      "Simmer 10 minutes until creamy.",
      "Serve with nsima."
    ],
    tips: [
      "Groundnut flour adds protein and richness",
      "Can substitute with peanut butter",
      "Other greens can be used too"
    ]
  },

  // ============ SARA (CHAD) RECIPES ============
  {
    id: "boule-sara",
    name: "Boule (Sara Millet Porridge)",
    tribeSlug: "sara",
    tribeName: "Sara",
    category: "staple",
    description: "The Sara people's thick millet porridge, the foundation of southern Chadian cuisine.",
    culturalSignificance: "The Sara are Chad's largest ethnic group. Millet is their staple grain, adapted to the savanna climate.",
    historicalContext: "The Sara were major cotton farmers under French colonialism. They maintained their millet-based diet despite colonial pressures.",
    youtubeVideoId: "jcjKAF_G56g",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Millet flour", amount: "2 cups" },
      { item: "Water", amount: "5 cups" },
      { item: "Salt", amount: "1 teaspoon" }
    ],
    instructions: [
      "Toast millet flour lightly in a dry pan for enhanced flavor.",
      "Bring salted water to boil.",
      "Gradually add millet flour, stirring constantly.",
      "Reduce heat and continue cooking.",
      "Stir for 25-30 minutes until very thick.",
      "Shape into mound and serve with sauce."
    ],
    tips: [
      "Millet has a nuttier flavor than maize",
      "Toasting enhances the flavor",
      "Essential to Sara daily diet"
    ]
  },
  {
    id: "daraba-sara",
    name: "Daraba (Sara Okra-Peanut Sauce)",
    tribeSlug: "sara",
    tribeName: "Sara",
    category: "special",
    description: "Traditional Sara sauce of okra and peanuts, served over boule. Rich, nutritious, and beloved.",
    culturalSignificance: "Daraba is comfort food for the Sara people. The combination of okra's texture and peanut richness is perfect.",
    youtubeVideoId: "1LF1R-23g9g",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Fresh okra", amount: "500g", notes: "Sliced" },
      { item: "Peanut butter", amount: "4 tablespoons" },
      { item: "Tomatoes", amount: "2", notes: "Chopped" },
      { item: "Onion", amount: "1" },
      { item: "Meat (optional)", amount: "300g" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "If using meat, brown it first and set aside.",
      "Sauté onion until soft. Add tomatoes.",
      "Add sliced okra and stir.",
      "Add water to cover and simmer 15 minutes.",
      "Stir peanut butter into the pot.",
      "Return meat and simmer until sauce thickens.",
      "Serve over boule."
    ],
    tips: [
      "Okra gives the sauce its characteristic texture",
      "Peanut butter should be unsweetened",
      "Can be made vegetarian"
    ]
  },
  {
    id: "bili-bili-sara",
    name: "Bili-Bili (Sara Millet Beer)",
    tribeSlug: "sara",
    tribeName: "Sara",
    category: "beverage",
    description: "Traditional Sara fermented millet beer. The social drink of southern Chad.",
    culturalSignificance: "Bili-bili is central to Sara social life. Shared at festivals, weddings, and community gatherings.",
    historicalContext: "The Sara are predominantly Christian, unlike Muslim northern Chad, allowing them to maintain brewing traditions.",
    youtubeVideoId: "oNDwxXWM5To",
    prepTime: "5-7 days (fermentation)",
    cookTime: "3 hours",
    servings: 20,
    difficulty: "hard",
    ingredients: [
      { item: "Red millet", amount: "2 kg" },
      { item: "Water", amount: "10 liters" },
      { item: "Yeast (wild or commercial)", amount: "As needed" }
    ],
    instructions: [
      "Soak millet in water for 2 days until sprouted.",
      "Dry the sprouted millet in the sun.",
      "Grind the malted millet into flour.",
      "Mix with water to make a thick mash.",
      "Boil the mash for 2-3 hours, stirring often.",
      "Cool and transfer to fermentation vessel.",
      "Add yeast (or let wild yeast colonize).",
      "Ferment 3-5 days until sour and alcoholic.",
      "Strain and serve in calabash gourds."
    ],
    tips: [
      "Fermentation time affects alcohol content",
      "Traditionally shared from a communal gourd",
      "Best drunk fresh within a few days"
    ]
  },

  // ============ TOUBOU (CHAD/LIBYA/NIGER) RECIPES ============
  {
    id: "tibesti-porridge",
    name: "Tibesti Millet Porridge",
    tribeSlug: "toubou",
    tribeName: "Toubou",
    category: "staple",
    description: "Simple millet porridge of the Toubou desert nomads. Sustaining food for Sahara survival.",
    culturalSignificance: "The Toubou are legendary desert survivors. Their simple cuisine reflects the scarcity of the Tibesti Mountains.",
    historicalContext: "The Toubou have lived in the central Sahara for millennia. Their food traditions are adapted to extreme aridity.",
    youtubeVideoId: "jcjKAF_G56g",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Millet flour", amount: "1 cup" },
      { item: "Water or camel milk", amount: "3 cups" },
      { item: "Salt", amount: "Pinch" },
      { item: "Dates", amount: "For serving" }
    ],
    instructions: [
      "Bring liquid to boil in a pot.",
      "Gradually add millet flour, stirring.",
      "Cook until thick, about 15 minutes.",
      "Season with salt.",
      "Serve with dates on the side."
    ],
    tips: [
      "Camel milk adds richness",
      "Toubou eat sparingly by necessity",
      "Dates provide essential sugars"
    ]
  },
  {
    id: "toubou-dried-meat",
    name: "Toubou Desert Jerky",
    tribeSlug: "toubou",
    tribeName: "Toubou",
    category: "staple",
    description: "Traditional Toubou sun-dried meat that keeps for months in the desert heat. Essential survival food.",
    culturalSignificance: "Meat preservation is essential for Toubou nomads. Dried meat provides protein during long desert crossings.",
    historicalContext: "The Toubou controlled trans-Saharan trade routes. Preserved meats sustained them across vast distances.",
    youtubeVideoId: "siv6d9f4kx4",
    prepTime: "30 minutes",
    cookTime: "3-5 days (drying)",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Goat or camel meat", amount: "2 kg", notes: "Lean cuts" },
      { item: "Salt", amount: "4 tablespoons" },
      { item: "Chili powder (optional)", amount: "1 tablespoon" }
    ],
    instructions: [
      "Cut meat into thin strips (1/4 inch thick).",
      "Remove all visible fat (fat spoils).",
      "Mix salt and chili powder.",
      "Rub salt mixture into meat strips.",
      "Hang strips on lines in direct desert sun.",
      "Dry for 3-5 days until completely hard.",
      "Store in dry cloth bags.",
      "Rehydrate by soaking before cooking."
    ],
    tips: [
      "Complete drying is essential for preservation",
      "Keeps for months without refrigeration",
      "Pound before cooking to tenderize"
    ]
  }
];

// ============ WEST AFRICAN RECIPES (Expanded) ============
const westAfricanRecipes: Recipe[] = [
  {
    id: "pounded-yam",
    name: "Pounded Yam (Iyan)",
    tribeSlug: "yoruba",
    tribeName: "Yoruba",
    category: "staple",
    description: "Smooth, stretchy dough made from boiled yams pounded to perfection. The most prestigious Nigerian staple, served with rich soups.",
    culturalSignificance: "Pounded yam is considered the 'king' of Nigerian swallows. Serving it signals celebration and respect for guests. No proper Yoruba ceremony is complete without it.",
    historicalContext: "Yams have been cultivated in West Africa for over 10,000 years. Pounding yams was traditionally women's work - the rhythmic sound of pestles was the heartbeat of village life. The yam is so important that festivals (New Yam Festival) celebrate its harvest.",
    youtubeVideoId: "GNvb7jLbEME",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "White yam (puna yam)", amount: "2 kg", notes: "Peeled and cubed" },
      { item: "Water", amount: "For boiling" }
    ],
    instructions: [
      "Peel yams and cut into medium chunks.",
      "Boil in water until very soft (30-40 minutes). Test with fork - should slide in easily.",
      "Drain most water, leaving just a little.",
      "Transfer hot yams to a mortar (or use yam pounder machine).",
      "Pound with pestle, adding tiny amounts of warm water as needed.",
      "Continue pounding until completely smooth with no lumps (10-15 minutes).",
      "The perfect pounded yam should stretch when pulled and be silky smooth.",
      "Shape into mounds and serve immediately with egusi, efo riro, or ogbono soup."
    ],
    tips: [
      "Yams must be pounded while hot for best results",
      "Modern Nigerians often use yam flour (poundo yam) for convenience",
      "The traditional mortar and pestle gives the best texture"
    ]
  },
  {
    id: "suya",
    name: "Suya (Spiced Grilled Meat)",
    tribeSlug: "hausa",
    tribeName: "Hausa",
    category: "snack",
    description: "Thinly sliced beef or chicken coated in spicy peanut spice (yaji) and grilled over charcoal. Nigeria's beloved street food.",
    culturalSignificance: "Suya is Nigeria's national street food, originally from the Hausa people. Suya spots come alive at night across Nigeria. It transcends ethnic boundaries.",
    historicalContext: "Suya originated with Hausa cattle herders in Northern Nigeria. The spice blend (yaji) was developed to preserve and flavor meat. Today it's found across West Africa and beyond.",
    youtubeVideoId: "6xRZqFDs2N8",
    prepTime: "30 minutes (plus marinating)",
    cookTime: "15 minutes",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Beef (sirloin or flank)", amount: "1 kg", notes: "Sliced very thin" },
      { item: "Yaji spice mix (or make below)", amount: "1 cup" },
      { item: "Vegetable oil", amount: "4 tablespoons" },
      { item: "Onion", amount: "1 large", notes: "Sliced into rings" },
      { item: "Tomatoes", amount: "2", notes: "Sliced" },
      { item: "Cabbage", amount: "1/4 head", notes: "Shredded (for serving)" }
    ],
    instructions: [
      "For yaji spice: Mix 1 cup roasted groundnut powder, 2 tbsp cayenne, 1 tbsp ginger, 1 tbsp garlic powder, 1 tbsp onion powder, 1 tsp bouillon powder, salt to taste.",
      "Slice beef very thin (across the grain) into 2-inch wide strips.",
      "Thread meat onto skewers (soaked wooden or metal).",
      "Coat generously with yaji spice, pressing to adhere.",
      "Drizzle with oil and let marinate 2-24 hours.",
      "Grill over hot charcoal, turning frequently (5-7 minutes total).",
      "Brush with more oil and sprinkle more yaji while grilling.",
      "Serve hot with sliced onions, tomatoes, and cabbage. Wrap in newspaper (traditional)."
    ],
    tips: [
      "Very thin slicing is key - some use freezing to help slice",
      "Authentic suya uses beef, but chicken, ram, and kidney are popular",
      "Night-time suya tastes different - it's a social experience"
    ]
  },
  {
    id: "fufu-ghanaian",
    name: "Fufu (Ghanaian)",
    tribeSlug: "akan",
    tribeName: "Akan",
    category: "staple",
    description: "Smooth, stretchy dough made from pounded cassava and plantain. Ghana's beloved staple, served with light soup or palm nut soup.",
    culturalSignificance: "Fufu is the soul of Ghanaian cuisine. Eating fufu is an art - you pinch, dip in soup, and swallow without chewing. Sunday fufu is a family tradition.",
    historicalContext: "Fufu likely developed when cassava arrived from the Americas in the 16th century. Ghanaians perfected the cassava-plantain combination. The pounding creates the distinctive stretch.",
    youtubeVideoId: "xYjUo2qqAMs",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "hard",
    ingredients: [
      { item: "Cassava", amount: "1 kg", notes: "Peeled and cubed" },
      { item: "Ripe plantains", amount: "2 large", notes: "Peeled and cubed" },
      { item: "Water", amount: "For boiling" }
    ],
    instructions: [
      "Peel cassava, remove central fiber, and cut into chunks.",
      "Peel plantains and cut into chunks.",
      "Boil cassava first (it takes longer) for 15 minutes.",
      "Add plantains and continue boiling until both are very soft (20-25 more minutes).",
      "Drain and transfer to a large mortar.",
      "Pound together, wetting the pestle occasionally, until completely smooth and elastic.",
      "Two people traditionally work together - one pounds, one turns the dough.",
      "Shape into smooth balls and serve in soup bowls with light soup or palm nut soup."
    ],
    tips: [
      "Modern cooks use fufu flour (instant) for convenience",
      "The dough should stretch without breaking when pulled",
      "Fufu is swallowed, not chewed - this is etiquette"
    ]
  },
  {
    id: "kelewele",
    name: "Kelewele (Spiced Fried Plantains)",
    tribeSlug: "akan",
    tribeName: "Akan/Ghanaian",
    category: "snack",
    description: "Ripe plantain cubes marinated in ginger and spices, then deep-fried until caramelized and crispy. Ghana's favorite street snack.",
    culturalSignificance: "Kelewele is Ghana's beloved street food, found at every corner. It's the perfect accompaniment to roasted peanuts and served at parties and celebrations.",
    historicalContext: "Plantains came to Africa from Southeast Asia centuries ago. Ghanaians developed kelewele as a way to add excitement to the fruit. The ginger-spice blend is distinctively Ghanaian.",
    youtubeVideoId: "KiswFHPyMrg",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Ripe plantains", amount: "4", notes: "Skin should be mostly yellow with black spots" },
      { item: "Fresh ginger", amount: "2 inches", notes: "Grated or blended" },
      { item: "Cayenne pepper", amount: "1/2 teaspoon" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Onion", amount: "1/4", notes: "Grated (optional)" },
      { item: "Vegetable oil", amount: "For deep frying" }
    ],
    instructions: [
      "Peel plantains and cut into 1-inch cubes.",
      "Blend or grate ginger and mix with cayenne, salt, and grated onion.",
      "Toss plantain cubes in the spice mixture.",
      "Let marinate for 15-30 minutes.",
      "Heat oil to 180°C/350°F.",
      "Fry plantains in batches until golden brown and caramelized (3-4 minutes per batch).",
      "Drain on paper towels.",
      "Serve hot with roasted groundnuts (peanuts)."
    ],
    tips: [
      "Plantains should be ripe but still firm - not mushy",
      "Don't overcrowd the oil - fry in batches",
      "Some add garlic, anise, or nutmeg to the spice blend"
    ]
  },
  {
    id: "mafe",
    name: "Mafé (Peanut Stew)",
    tribeSlug: "wolof",
    tribeName: "Wolof/Senegalese",
    category: "special",
    description: "Rich, creamy stew with meat simmered in peanut sauce with vegetables. Senegal's comfort food, eaten across West Africa.",
    culturalSignificance: "Mafé embodies Senegalese teranga (hospitality). It's a communal dish, served on a large platter for the family to share. Every grandmother has her secret recipe.",
    historicalContext: "Mafé developed from the peanut (groundnut) cultivation brought to West Africa. Senegal became a major groundnut producer under French colonialism. The stew combines African and imported ingredients.",
    youtubeVideoId: "LU7McMoh7pU",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef or lamb", amount: "1 kg", notes: "Cut into chunks" },
      { item: "Natural peanut butter", amount: "1 cup", notes: "Or ground peanuts" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Tomatoes", amount: "3", notes: "Blended" },
      { item: "Vegetable oil", amount: "4 tablespoons" },
      { item: "Sweet potato", amount: "2", notes: "Cubed" },
      { item: "Carrots", amount: "2", notes: "Cubed" },
      { item: "Cabbage", amount: "1/4 head", notes: "Quartered (optional)" },
      { item: "Scotch bonnet pepper", amount: "1", notes: "Whole (for flavor)" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season meat with salt and brown in oil in a large pot.",
      "Remove meat and sauté onions until golden.",
      "Add tomato paste and cook for 2 minutes.",
      "Add blended tomatoes and cook until oil separates (10 minutes).",
      "Dissolve peanut butter in 2 cups warm water and add to pot.",
      "Return meat to pot and add enough water to cover.",
      "Simmer for 30 minutes until meat is almost tender.",
      "Add sweet potato, carrots, and whole pepper.",
      "Cook 20 more minutes until vegetables are tender and sauce is thick.",
      "Serve over rice with the vegetables arranged on top."
    ],
    tips: [
      "Natural peanut butter (no sugar) is essential for authentic flavor",
      "The sauce should be thick and creamy, not watery",
      "Fish or chicken can substitute for beef"
    ]
  },
  {
    id: "thieboudienne",
    name: "Thieboudienne (Senegalese Fish Rice)",
    tribeSlug: "wolof",
    tribeName: "Wolof/Senegalese",
    category: "special",
    description: "Senegal's national dish - fish stuffed with herbs, cooked with vegetables, and served on tomato-stained rice. A one-pot masterpiece.",
    culturalSignificance: "Thieboudienne is Senegal's national dish, inscribed on UNESCO's Intangible Cultural Heritage list. It represents Senegalese teranga (hospitality) and communal eating.",
    historicalContext: "Thieboudienne originated in Saint-Louis, Senegal in the 19th century. It combines local fishing traditions with rice introduced through trade. The dish is served on a large platter for family sharing.",
    youtubeVideoId: "r7Zdp2TpmAA",
    prepTime: "30 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Whole fish (thiof, grouper, or white fish)", amount: "1.5 kg", notes: "Scaled and cleaned" },
      { item: "Rice (broken)", amount: "3 cups" },
      { item: "Tomato paste", amount: "4 tablespoons" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Onion", amount: "2 large", notes: "Sliced" },
      { item: "Cabbage", amount: "1/4 head" },
      { item: "Cassava", amount: "200g", notes: "Cubed" },
      { item: "Sweet potato", amount: "1 large", notes: "Cubed" },
      { item: "Carrots", amount: "2" },
      { item: "Eggplant", amount: "1 small" },
      { item: "Tamarind paste", amount: "2 tablespoons" },
      { item: "Rof (stuffing): parsley, garlic, pepper, fish bouillon", amount: "Mixed into paste" }
    ],
    instructions: [
      "Make rof: blend parsley, garlic, pepper, and bouillon into paste.",
      "Make incisions in fish and stuff with rof.",
      "Heat oil and fry fish briefly on both sides. Set aside.",
      "In same oil, fry onions until golden, add tomato paste, cook 5 minutes.",
      "Add water (8 cups), tamarind, and bring to boil.",
      "Add vegetables in order of cooking time (cassava first, then others).",
      "When vegetables are tender, remove them and fish to platter.",
      "Add rice to the cooking liquid. It should absorb all liquid.",
      "Cover and cook rice until done (20-25 minutes).",
      "Serve rice in center of platter, arrange fish and vegetables around it."
    ],
    tips: [
      "The tomato-stained rice is essential - it should be red-orange",
      "Different regions have variations - white thieboudienne uses no tomato",
      "Traditionally served in a large communal bowl"
    ]
  }
];

// ============ NORTH AFRICAN RECIPES ============
const northAfricanRecipes: Recipe[] = [
  {
    id: "moroccan-tagine",
    name: "Moroccan Lamb Tagine",
    tribeSlug: "moroccan-arab",
    tribeName: "Moroccan Arab",
    category: "special",
    region: "north",
    country: "MA",
    description: "Slow-cooked lamb stew with dried fruits, nuts, and aromatic spices, cooked in the iconic cone-shaped tagine pot.",
    culturalSignificance: "Tagine is central to Moroccan hospitality. The clay pot's design allows steam to condense and return to the dish, creating incredibly tender meat. Served at celebrations and family gatherings.",
    historicalContext: "The tagine cooking method dates back to the 8th century when the Berbers of Morocco developed the distinctive cone-shaped pot. The dish evolved with Arab, Andalusian, and Ottoman influences, incorporating spices from the trans-Saharan trade routes.",
    youtubeVideoId: "JgFBLytKTDs",
    prepTime: "30 minutes",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Lamb shoulder", amount: "1 kg", notes: "Cut into chunks" },
      { item: "Onions", amount: "2 large", notes: "Sliced" },
      { item: "Dried apricots", amount: "1 cup" },
      { item: "Dried prunes", amount: "1/2 cup" },
      { item: "Almonds", amount: "1/2 cup", notes: "Blanched" },
      { item: "Honey", amount: "2 tablespoons" },
      { item: "Ras el hanout", amount: "2 tablespoons" },
      { item: "Cinnamon stick", amount: "1" },
      { item: "Saffron threads", amount: "1/4 teaspoon" },
      { item: "Fresh coriander", amount: "1/2 cup", notes: "Chopped" },
      { item: "Olive oil", amount: "4 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "Season lamb with salt, pepper, and ras el hanout.",
      "Heat olive oil in tagine base or heavy pot. Brown lamb on all sides.",
      "Remove lamb and sauté onions until golden.",
      "Return lamb, add saffron bloomed in warm water, cinnamon stick.",
      "Add water to cover halfway, bring to boil, then reduce to simmer.",
      "Cover and cook for 1.5 hours until lamb is very tender.",
      "Add dried fruits and honey, cook 20 more minutes.",
      "Toast almonds in dry pan until golden.",
      "Garnish with almonds and fresh coriander. Serve with couscous."
    ],
    tips: [
      "If using clay tagine, start with low heat to prevent cracking",
      "The slow cooking develops deep flavors - don't rush",
      "Preserved lemons can be added for authentic flavor"
    ],
    variations: [
      "Chicken tagine with olives and preserved lemons",
      "Vegetable tagine with chickpeas",
      "Fish tagine with chermoula"
    ]
  },
  {
    id: "koshari",
    name: "Koshari (Egyptian Rice and Lentils)",
    tribeSlug: "egyptian-arab",
    tribeName: "Egyptian Arab",
    category: "staple",
    region: "north",
    country: "EG",
    description: "Egypt's national dish - layers of rice, lentils, macaroni, and chickpeas topped with spicy tomato sauce and crispy fried onions.",
    culturalSignificance: "Koshari is Egypt's beloved street food, found in dedicated koshari shops throughout Cairo. It's affordable, filling, and represents Egyptian ingenuity in creating a complete protein from humble ingredients.",
    historicalContext: "Koshari emerged in 19th century Cairo, combining Indian rice dishes brought by British soldiers (khichdi), Italian pasta from Mediterranean trade, and local Egyptian ingredients. It became the poor man's feast and national comfort food.",
    youtubeVideoId: "y0d2ZMZBW4Y",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Brown lentils", amount: "1 cup" },
      { item: "Elbow macaroni", amount: "2 cups" },
      { item: "Chickpeas", amount: "1 can", notes: "Drained" },
      { item: "Onions", amount: "3 large", notes: "Thinly sliced" },
      { item: "Tomato sauce", amount: "2 cups" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Cumin", amount: "1 tablespoon" },
      { item: "Coriander", amount: "1 teaspoon" },
      { item: "Chili flakes", amount: "1 teaspoon" },
      { item: "White vinegar", amount: "3 tablespoons" },
      { item: "Vegetable oil", amount: "1 cup", notes: "For frying onions" }
    ],
    instructions: [
      "Cook lentils in water until tender (20-25 minutes). Drain.",
      "Cook rice separately until fluffy.",
      "Cook macaroni according to package, drain.",
      "Fry sliced onions in oil until deeply golden and crispy. Set aside.",
      "For sauce: sauté garlic in oil, add tomato sauce, cumin, coriander, chili, vinegar. Simmer 15 minutes.",
      "Mix rice and lentils together gently.",
      "To serve: layer rice-lentil mix, then macaroni, then chickpeas.",
      "Top generously with tomato sauce and crispy onions.",
      "Serve with extra vinegar-garlic sauce (dakka) on side."
    ],
    tips: [
      "The crispy onions are essential - fry until deeply caramelized",
      "Serve immediately so layers stay distinct",
      "Dakka sauce (vinegar-garlic-chili) is served alongside"
    ]
  },
  {
    id: "tunisian-brik",
    name: "Brik à l'Oeuf (Tunisian Egg Pastry)",
    tribeSlug: "tunisian-arab",
    tribeName: "Tunisian Arab",
    category: "snack",
    region: "north",
    country: "TN",
    description: "Crispy fried pastry triangles filled with a runny egg, tuna, capers, and parsley. Tunisia's iconic street food.",
    culturalSignificance: "Brik is Tunisia's most famous appetizer, eaten with hands while carefully avoiding the runny yolk spilling. Traditionally served during Ramadan and at special occasions.",
    historicalContext: "Brik comes from the Turkish börek, introduced during Ottoman rule. Tunisians made it their own by adding the signature runny egg. The malsouka pastry sheets are uniquely North African, related to Moroccan warka.",
    youtubeVideoId: "OV9EgaE80O8",
    prepTime: "20 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Malsouka or brick pastry sheets", amount: "4", notes: "Or phyllo doubled" },
      { item: "Eggs", amount: "4", notes: "Small or medium" },
      { item: "Canned tuna", amount: "1 can", notes: "Drained and flaked" },
      { item: "Onion", amount: "1 small", notes: "Finely chopped" },
      { item: "Capers", amount: "2 tablespoons" },
      { item: "Fresh parsley", amount: "1/4 cup", notes: "Chopped" },
      { item: "Harissa paste", amount: "1 teaspoon", notes: "Optional" },
      { item: "Lemon juice", amount: "1 tablespoon" },
      { item: "Vegetable oil", amount: "For deep frying" }
    ],
    instructions: [
      "Mix tuna with onion, capers, parsley, harissa, and lemon juice.",
      "Place pastry sheet on work surface.",
      "Put 2 tablespoons tuna mixture in center.",
      "Make a well and carefully crack an egg into it.",
      "Fold pastry into a triangle, sealing edges with water.",
      "Heat oil to 180°C/350°F.",
      "Carefully slide brik into oil, yolk side up first.",
      "Fry 1-2 minutes per side until golden and crispy.",
      "Drain and serve immediately with lemon wedges."
    ],
    tips: [
      "The yolk should remain runny - don't overcook",
      "Work quickly once egg is added so pastry doesn't get soggy",
      "Eat with hands, tilting to drink the runny yolk first"
    ]
  },
  {
    id: "chakhchoukha",
    name: "Chakhchoukha (Algerian Torn Bread Stew)",
    tribeSlug: "chaoui",
    tribeName: "Chaoui/Algerian Berber",
    category: "special",
    region: "north",
    country: "DZ",
    description: "Traditional Algerian dish of hand-torn flatbread soaked in spiced tomato and lamb stew. A Berber culinary masterpiece from the Aurès Mountains.",
    culturalSignificance: "Chakhchoukha is the pride of the Chaoui Berbers of eastern Algeria. It's served at weddings, Eid celebrations, and to honor guests. Making the rougag (flatbread) is an art passed from mother to daughter.",
    historicalContext: "This dish originated with the Chaoui Berbers of the Aurès Mountains, predating Arab arrival in North Africa. The combination of torn bread with meat stew reflects nomadic cooking traditions where bread was the universal staple.",
    youtubeVideoId: "3-QkqCbAMlU",
    prepTime: "1 hour",
    cookTime: "2 hours",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Lamb", amount: "1 kg", notes: "Cut into pieces" },
      { item: "Chickpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Onions", amount: "2 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "4", notes: "Blended" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Ras el hanout", amount: "1 tablespoon" },
      { item: "Dried red chilies", amount: "2" },
      { item: "Olive oil", amount: "4 tablespoons" },
      { item: "For rougag: semolina flour", amount: "3 cups" },
      { item: "For rougag: water, salt, oil", amount: "As needed" }
    ],
    instructions: [
      "Make rougag: mix semolina with water and salt to form dough. Roll very thin and cook on griddle.",
      "Brown lamb in olive oil in large pot.",
      "Add onions and cook until softened.",
      "Add tomatoes, tomato paste, spices, and soaked chickpeas.",
      "Add water to cover and simmer 1.5-2 hours until lamb is falling-off-bone tender.",
      "Tear cooled rougag into small pieces by hand.",
      "Steam the torn bread briefly to soften.",
      "Place bread in large serving dish, ladle stew over generously.",
      "The bread should absorb the sauce. Serve family-style."
    ],
    tips: [
      "The rougag should be paper-thin - this takes practice",
      "The bread must absorb the sauce but not become mushy",
      "Traditionally eaten with hands from a communal dish"
    ]
  },
  {
    id: "berber-couscous",
    name: "Couscous Royal (Berber Seven-Vegetable Couscous)",
    tribeSlug: "amazigh",
    tribeName: "Amazigh/Berber",
    category: "special",
    region: "north",
    country: "MA",
    description: "The Berber masterpiece - steamed semolina grains served with seven vegetables and lamb, representing abundance and blessing.",
    culturalSignificance: "Couscous is sacred to Berber culture. The seven vegetables represent completeness and blessing. Friday couscous is a family tradition across North Africa, and the dish was inscribed on UNESCO's Intangible Cultural Heritage list.",
    historicalContext: "Couscous originated with the Berbers of North Africa over 1,000 years ago. The hand-rolling technique and steaming process are uniquely Berber inventions. The dish spread across the Maghreb and to Europe through trade and migration.",
    youtubeVideoId: "DPTp8WkPu3M",
    prepTime: "45 minutes",
    cookTime: "2.5 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Couscous (medium grain)", amount: "500g" },
      { item: "Lamb shoulder", amount: "1 kg", notes: "Cut into large pieces" },
      { item: "Onions", amount: "2 large" },
      { item: "Carrots", amount: "4" },
      { item: "Turnips", amount: "3" },
      { item: "Zucchini", amount: "3" },
      { item: "Pumpkin", amount: "500g", notes: "Cubed" },
      { item: "Cabbage", amount: "1/4 head" },
      { item: "Chickpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Ras el hanout", amount: "1 tablespoon" },
      { item: "Butter", amount: "100g" },
      { item: "Olive oil", amount: "4 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" }
    ],
    instructions: [
      "In couscoussier bottom, brown lamb in oil with onions.",
      "Add tomato paste, spices, chickpeas, and water to cover.",
      "Bring to boil, then simmer for 1 hour.",
      "Meanwhile, prepare couscous: moisten with salted water, rake with fingers.",
      "Place couscous in steamer top, steam uncovered for 20 minutes.",
      "Transfer to bowl, add butter, rake again to separate grains.",
      "Add harder vegetables (turnips, carrots) to stew.",
      "Steam couscous second time for 15 minutes.",
      "Add remaining vegetables to stew.",
      "Steam couscous third time, then butter generously.",
      "Mound couscous on platter, arrange meat and vegetables on top.",
      "Serve broth in separate bowl for moistening."
    ],
    tips: [
      "Traditional couscous is steamed 3 times for perfect texture",
      "Never let vegetables overcook - they should hold shape",
      "The broth is served separately so each person can add as desired"
    ]
  },
  // NEW NORTH AFRICAN RECIPES
  {
    id: "shakshuka",
    name: "Shakshuka (North African Eggs in Tomato)",
    tribeSlug: "tunisian-arab",
    tribeName: "Tunisian Arab",
    category: "special",
    region: "north",
    country: "TN",
    description: "Eggs poached in a spiced tomato and pepper sauce with cumin, paprika, and cayenne. A beloved breakfast across North Africa and the Middle East.",
    culturalSignificance: "Shakshuka originated in Tunisia and spread throughout the Maghreb and Levant. It's a communal dish, served in the pan with bread for dipping. Every family has their own recipe.",
    historicalContext: "The name comes from the Berber word for 'mixture.' Ottoman influence spread the dish across the Mediterranean. Jewish immigrants brought it to Israel where it became a national dish.",
    youtubeVideoId: "mnWY6ONR_Cg",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Eggs", amount: "6" },
      { item: "Tomatoes", amount: "6 large", notes: "Crushed or canned" },
      { item: "Red bell pepper", amount: "1", notes: "Diced" },
      { item: "Onion", amount: "1 large", notes: "Diced" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Paprika", amount: "1 teaspoon" },
      { item: "Cayenne pepper", amount: "1/2 teaspoon" },
      { item: "Olive oil", amount: "3 tablespoons" },
      { item: "Fresh parsley", amount: "For garnish" },
      { item: "Feta cheese", amount: "Optional, crumbled" }
    ],
    instructions: [
      "Heat olive oil in large skillet over medium heat.",
      "Sauté onion and bell pepper until soft, about 5 minutes.",
      "Add garlic and cook 1 minute until fragrant.",
      "Add cumin, paprika, and cayenne, stir to coat.",
      "Pour in crushed tomatoes, season with salt and pepper.",
      "Simmer 10-15 minutes until sauce thickens.",
      "Make 6 wells in the sauce and crack an egg into each.",
      "Cover and cook 5-8 minutes until whites are set but yolks runny.",
      "Garnish with parsley and feta if using. Serve with crusty bread."
    ],
    tips: [
      "Don't stir after adding eggs - they should stay intact",
      "Cover with lid for faster egg cooking",
      "Serve directly in the pan for authenticity"
    ]
  },
  {
    id: "moroccan-harira",
    name: "Harira (Moroccan Ramadan Soup)",
    tribeSlug: "moroccan-arab",
    tribeName: "Moroccan Arab",
    category: "special",
    region: "north",
    country: "MA",
    description: "Rich, hearty soup with lentils, chickpeas, tomatoes, and lamb, traditionally served to break the fast during Ramadan.",
    culturalSignificance: "Harira is Morocco's most important soup, essential during Ramadan. It's served at sunset with dates and chebakia pastries. The soup represents hospitality and blessing.",
    historicalContext: "Harira dates back centuries in Morocco. The recipe was refined over generations, with each region adding local touches. It's believed to have Andalusian influences from Moorish Spain.",
    youtubeVideoId: "5B_u_kFPVxk",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Lamb", amount: "300g", notes: "Cubed" },
      { item: "Chickpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Lentils", amount: "1/2 cup" },
      { item: "Tomatoes", amount: "4 large", notes: "Blended" },
      { item: "Onion", amount: "1 large", notes: "Grated" },
      { item: "Celery", amount: "3 stalks", notes: "Chopped with leaves" },
      { item: "Fresh coriander", amount: "1 bunch", notes: "Chopped" },
      { item: "Fresh parsley", amount: "1 bunch", notes: "Chopped" },
      { item: "Flour", amount: "3 tablespoons", notes: "For thickening" },
      { item: "Ginger", amount: "1 teaspoon" },
      { item: "Turmeric", amount: "1 teaspoon" },
      { item: "Cinnamon", amount: "1/2 teaspoon" },
      { item: "Vermicelli", amount: "1/2 cup" },
      { item: "Lemon juice", amount: "2 tablespoons" }
    ],
    instructions: [
      "In large pot, combine lamb, onion, ginger, turmeric, cinnamon with 2L water.",
      "Bring to boil, skim foam, then add chickpeas. Simmer 45 minutes.",
      "Add lentils, celery, half the herbs. Cook 20 more minutes.",
      "Add blended tomatoes and cook 15 minutes.",
      "Mix flour with 1 cup water to make slurry, stir into soup to thicken.",
      "Add vermicelli and remaining herbs.",
      "Simmer 10 minutes until vermicelli is cooked.",
      "Season with salt, pepper, and lemon juice before serving."
    ],
    tips: [
      "The soup should be thick and hearty, not watery",
      "Fresh herbs are essential - don't substitute dried",
      "Serve with dates and honey-dipped chebakia"
    ]
  },
  {
    id: "algerian-chorba",
    name: "Chorba Frik (Algerian Wheat Soup)",
    tribeSlug: "algerian-arab",
    tribeName: "Algerian Arab",
    category: "special",
    region: "north",
    country: "DZ",
    description: "Hearty lamb soup with freekeh (green wheat), chickpeas, and aromatic spices. Algeria's beloved Ramadan soup.",
    culturalSignificance: "Chorba is central to Algerian Ramadan traditions. The freekeh (smoked green wheat) gives it a distinctive smoky flavor. Every region has its variation.",
    historicalContext: "Chorba has Ottoman origins but was transformed with local Algerian ingredients. Freekeh has been used in North Africa for millennia, prized for its nutritional value.",
    youtubeVideoId: "qr3zVHc6YNM",
    prepTime: "15 minutes",
    cookTime: "1.5 hours",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Lamb", amount: "500g", notes: "On the bone" },
      { item: "Freekeh (green wheat)", amount: "1/2 cup" },
      { item: "Chickpeas", amount: "1/2 cup", notes: "Soaked overnight" },
      { item: "Onion", amount: "1 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "3", notes: "Grated" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Fresh coriander", amount: "1/2 bunch" },
      { item: "Fresh mint", amount: "1/4 bunch" },
      { item: "Cinnamon stick", amount: "1" },
      { item: "Ras el hanout", amount: "1 teaspoon" },
      { item: "Olive oil", amount: "3 tablespoons" },
      { item: "Lemon wedges", amount: "For serving" }
    ],
    instructions: [
      "Brown lamb in olive oil in large pot.",
      "Add onion and cook until softened.",
      "Add tomatoes, tomato paste, spices, and 2L water.",
      "Add soaked chickpeas and bring to boil.",
      "Simmer 45 minutes until chickpeas are tender.",
      "Add freekeh and cook 30 more minutes.",
      "Add fresh herbs in last 5 minutes.",
      "Season with salt and serve with lemon wedges."
    ],
    tips: [
      "Rinse freekeh well before adding",
      "The soup thickens as it sits - add water when reheating",
      "Serve with crusty bread (khobz)"
    ]
  },
  {
    id: "tunisian-lablabi",
    name: "Lablabi (Tunisian Chickpea Soup)",
    tribeSlug: "tunisian-arab",
    tribeName: "Tunisian Arab",
    category: "staple",
    region: "north",
    country: "TN",
    description: "Humble but beloved chickpea soup with stale bread, olive oil, harissa, and a poached egg. Tunisia's ultimate comfort food and hangover cure.",
    culturalSignificance: "Lablabi is Tunisia's working-class breakfast, sold in dedicated shops from dawn. It's cheap, filling, and customizable. The bread-soaking tradition reflects anti-waste culture.",
    historicalContext: "Lablabi emerged as a poor man's dish but became beloved across all social classes. The combination of chickpeas and bread has sustained Tunisians for centuries.",
    youtubeVideoId: "laBE5q6_5_w",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Chickpeas", amount: "2 cans", notes: "Or 2 cups cooked" },
      { item: "Stale bread", amount: "4 slices", notes: "Torn into pieces" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Harissa paste", amount: "2 tablespoons", notes: "Adjust to taste" },
      { item: "Cumin", amount: "1 teaspoon" },
      { item: "Eggs", amount: "4", notes: "Poached or soft-boiled" },
      { item: "Olive oil", amount: "4 tablespoons" },
      { item: "Lemon juice", amount: "2 tablespoons" },
      { item: "Capers", amount: "2 tablespoons", notes: "Optional" },
      { item: "Tuna", amount: "1 can", notes: "Optional" }
    ],
    instructions: [
      "Heat chickpeas in their liquid with cumin and half the garlic.",
      "Bring to simmer and cook 10 minutes.",
      "Place torn bread in serving bowls.",
      "Ladle hot chickpeas and broth over bread.",
      "Top with poached egg, harissa, remaining garlic.",
      "Drizzle generously with olive oil and lemon juice.",
      "Add capers and tuna if using."
    ],
    tips: [
      "The bread should be stale - fresh bread gets too mushy",
      "Mix harissa into broth for even distribution",
      "Customize with your preferred toppings"
    ]
  },
  {
    id: "moroccan-bastilla",
    name: "Bastilla (Moroccan Pigeon Pie)",
    tribeSlug: "moroccan-arab",
    tribeName: "Moroccan Arab",
    category: "special",
    region: "north",
    country: "MA",
    description: "Elaborate layered pastry with spiced pigeon (or chicken), almonds, eggs, and cinnamon, wrapped in paper-thin warqa and dusted with sugar. Morocco's most prestigious dish.",
    culturalSignificance: "Bastilla is the crown jewel of Moroccan cuisine, served only at the most important celebrations - weddings, births, and royal feasts. Making it is an art passed through generations.",
    historicalContext: "Bastilla originated in Moorish Andalusia and came to Morocco with the expulsion of Muslims from Spain in 1492. The sweet-savory combination reflects the sophisticated Andalusian court cuisine.",
    youtubeVideoId: "P6sE8r8jfDA",
    prepTime: "1.5 hours",
    cookTime: "1 hour",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "Chicken or pigeon", amount: "1.5 kg", notes: "Bone-in pieces" },
      { item: "Onions", amount: "3 large", notes: "Grated" },
      { item: "Eggs", amount: "8" },
      { item: "Almonds", amount: "300g", notes: "Blanched" },
      { item: "Warqa or phyllo", amount: "20 sheets" },
      { item: "Fresh parsley", amount: "1 bunch" },
      { item: "Fresh coriander", amount: "1 bunch" },
      { item: "Saffron", amount: "1/2 teaspoon" },
      { item: "Cinnamon", amount: "2 tablespoons" },
      { item: "Powdered sugar", amount: "1/2 cup" },
      { item: "Butter", amount: "150g", notes: "Melted" },
      { item: "Ginger", amount: "1 teaspoon" }
    ],
    instructions: [
      "Poach chicken with onions, saffron, ginger, and herbs until very tender.",
      "Shred meat and reduce cooking liquid until thick.",
      "Scramble eggs in the reduced liquid until creamy.",
      "Toast and chop almonds, mix with cinnamon and powdered sugar.",
      "Layer phyllo in buttered pan, brushing each sheet with butter.",
      "Add shredded chicken, then egg mixture, then almond mixture.",
      "Top with more phyllo layers, brushing with butter.",
      "Fold edges and bake at 180°C/350°F for 30-40 minutes until golden.",
      "Dust with powdered sugar and cinnamon lattice pattern."
    ],
    tips: [
      "Keep phyllo covered with damp towel while working",
      "The filling should be well-seasoned - it needs to balance the sweet topping",
      "Traditionally made with pigeon but chicken is common today"
    ]
  },
  {
    id: "algerian-rechta",
    name: "Rechta (Algerian Wedding Noodles)",
    tribeSlug: "algerian-arab",
    tribeName: "Algerian Arab",
    category: "special",
    region: "north",
    country: "DZ",
    description: "Hand-made thin noodles served with chicken in a fragrant cinnamon and saffron sauce. Algeria's traditional wedding dish.",
    culturalSignificance: "Rechta is Algeria's most prestigious dish, essential at weddings and major celebrations. Making the thin noodles by hand is an art that takes years to master.",
    historicalContext: "Rechta has Ottoman origins but became uniquely Algerian. The dish represents prosperity and celebration. Traditional families still make the noodles by hand for important occasions.",
    youtubeVideoId: "G8fgGdLXv9E",
    prepTime: "2 hours",
    cookTime: "1.5 hours",
    servings: 10,
    difficulty: "hard",
    ingredients: [
      { item: "For noodles: semolina flour", amount: "500g" },
      { item: "For noodles: water, salt, oil", amount: "As needed" },
      { item: "Chicken", amount: "1.5 kg", notes: "Cut into pieces" },
      { item: "Chickpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Turnips", amount: "3", notes: "Quartered" },
      { item: "Onion", amount: "2 large", notes: "Grated" },
      { item: "Cinnamon sticks", amount: "2" },
      { item: "Saffron", amount: "1/2 teaspoon" },
      { item: "Butter", amount: "100g" },
      { item: "Pepper", amount: "1 tablespoon", notes: "White or black" }
    ],
    instructions: [
      "Make noodles: mix semolina with water and salt, knead, roll thin, cut into strips.",
      "Dry noodles on cloth or steam briefly.",
      "Brown chicken pieces in butter with onion.",
      "Add water, chickpeas, cinnamon, saffron, pepper.",
      "Simmer 1 hour, add turnips in last 20 minutes.",
      "Steam noodles over the stew or cook in salted water.",
      "Arrange noodles on platter, top with chicken and vegetables.",
      "Ladle sauce generously over everything."
    ],
    tips: [
      "Hand-made noodles have superior texture to store-bought",
      "The sauce should be cinnamon-forward and golden from saffron",
      "Serve with extra sauce on the side"
    ]
  },
  {
    id: "tunisian-makroudh",
    name: "Makroudh (Tunisian Date Cookies)",
    tribeSlug: "tunisian-arab",
    tribeName: "Tunisian Arab",
    category: "snack",
    region: "north",
    country: "TN",
    description: "Diamond-shaped semolina cookies filled with date paste, fried, and dipped in honey syrup. Tunisia's beloved Eid sweet.",
    culturalSignificance: "Makroudh is essential during Eid celebrations and weddings. Kairouan, Tunisia's holy city, is famous for making the best makroudh in the country.",
    historicalContext: "Makroudh predates Arab arrival in North Africa - it's believed to be of Berber origin. The combination of semolina, dates, and honey reflects ancient Mediterranean traditions.",
    youtubeVideoId: "GNpFqSN3GV8",
    prepTime: "1 hour",
    cookTime: "30 minutes",
    servings: 30,
    difficulty: "medium",
    ingredients: [
      { item: "Semolina", amount: "500g", notes: "Fine grain" },
      { item: "Butter", amount: "150g", notes: "Melted" },
      { item: "Orange blossom water", amount: "2 tablespoons" },
      { item: "Dates", amount: "400g", notes: "Pitted" },
      { item: "Cinnamon", amount: "1 teaspoon" },
      { item: "Honey", amount: "1 cup" },
      { item: "Vegetable oil", amount: "For frying" },
      { item: "Sesame seeds", amount: "Optional, for garnish" }
    ],
    instructions: [
      "Mix semolina with melted butter and orange blossom water. Rest 30 minutes.",
      "Process dates with cinnamon until smooth paste.",
      "Roll semolina dough into logs, flatten, fill with date paste, roll and seal.",
      "Cut into diamond shapes at an angle.",
      "Make decorative fork marks on top.",
      "Fry in oil at 170°C/340°F until golden brown.",
      "Drain and immediately dip in warm honey.",
      "Cool on rack. Store in airtight container."
    ],
    tips: [
      "The dough should be well-rested before rolling",
      "Fry at medium heat - too hot and outside burns before inside cooks",
      "Dip in honey while still warm so it absorbs"
    ]
  },
  {
    id: "moroccan-msemen",
    name: "Msemen (Moroccan Square Pancakes)",
    tribeSlug: "moroccan-arab",
    tribeName: "Moroccan Arab",
    category: "snack",
    region: "north",
    country: "MA",
    description: "Flaky, buttery square pancakes with crispy layers. Morocco's beloved breakfast bread, served with honey and butter.",
    culturalSignificance: "Msemen is eaten at breakfast throughout Morocco. The folding technique creates dozens of flaky layers. Street vendors sell them hot from the griddle.",
    historicalContext: "Msemen is related to Indian paratha and reflects ancient connections along trade routes. The technique of folding to create layers spread across the Arab world from South Asia.",
    youtubeVideoId: "aRk3wYgkdBg",
    prepTime: "1 hour",
    cookTime: "30 minutes",
    servings: 10,
    difficulty: "medium",
    ingredients: [
      { item: "Semolina", amount: "1 cup" },
      { item: "All-purpose flour", amount: "1 cup" },
      { item: "Salt", amount: "1 teaspoon" },
      { item: "Sugar", amount: "1 tablespoon" },
      { item: "Yeast", amount: "1 teaspoon" },
      { item: "Warm water", amount: "1 cup" },
      { item: "Butter", amount: "100g", notes: "Softened" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Honey", amount: "For serving" }
    ],
    instructions: [
      "Mix semolina, flour, salt, sugar, and yeast. Add water to form soft dough.",
      "Knead 10 minutes until smooth and elastic.",
      "Divide into 10 balls, oil them, cover and rest 30 minutes.",
      "Oil work surface. Stretch each ball into thin square.",
      "Spread with butter, fold into thirds horizontally, then thirds vertically.",
      "Flatten gently into square shape.",
      "Cook on oiled griddle over medium heat until golden on both sides.",
      "Serve hot with butter and honey."
    ],
    tips: [
      "Keep dough well-oiled to prevent sticking",
      "Stretch dough as thin as possible for maximum layers",
      "Cook on medium heat to allow layers to cook through"
    ]
  },
  {
    id: "algerian-maktouba",
    name: "Maktouba (Algerian Upside-Down Rice)",
    tribeSlug: "algerian-arab",
    tribeName: "Algerian Arab",
    category: "special",
    region: "north",
    country: "DZ",
    description: "Layered rice dish with fried eggplant, lamb, and tomato sauce, flipped upside-down for presentation. Algeria's festive one-pot meal.",
    culturalSignificance: "Maktouba (meaning 'upside-down') is a celebratory dish for holidays and family gatherings. The dramatic flip reveals beautiful layers.",
    historicalContext: "Maktouba has Levantine origins (maqluba) but became popular in Algeria during Ottoman times. Each North African country adapted it to local tastes.",
    youtubeVideoId: "t6h_lGk7JAg",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Lamb", amount: "500g", notes: "Cubed" },
      { item: "Eggplant", amount: "2 large", notes: "Sliced and fried" },
      { item: "Tomatoes", amount: "4", notes: "Sliced" },
      { item: "Onion", amount: "2", notes: "Sliced" },
      { item: "Tomato paste", amount: "2 tablespoons" },
      { item: "Ras el hanout", amount: "1 tablespoon" },
      { item: "Vegetable oil", amount: "1/2 cup" },
      { item: "Chicken broth", amount: "4 cups" }
    ],
    instructions: [
      "Fry eggplant slices until golden. Set aside on paper towels.",
      "Brown lamb in same pot. Add onions and cook until soft.",
      "Add tomato paste and spices, cook 2 minutes.",
      "Layer in large pot: tomato slices, fried eggplant, lamb mixture.",
      "Top with washed rice.",
      "Pour hot broth over, it should cover rice by 1 inch.",
      "Cover tightly and cook on low 30-40 minutes until rice is done.",
      "Let rest 5 minutes, then flip onto serving platter."
    ],
    tips: [
      "Don't stir after layering - let it cook undisturbed",
      "The bottom layer becomes the top - arrange nicely",
      "Serve immediately after flipping"
    ]
  },

  // ============ SOMALI - BARIIS ISKUKARIS ============
  {
    id: "bariis-iskukaris",
    name: "Bariis Iskukaris (Somali Spiced Rice)",
    localName: "Bariis Iskukaris",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "staple",
    region: "horn",
    country: "SO",
    description: "Fragrant one-pot rice dish cooked with meat, xawaash spice blend, and caramelized sugar giving it a golden color. The centerpiece of Somali celebrations.",
    culturalSignificance: "Bariis iskukaris is the crown jewel of Somali cuisine, served at weddings, Eid celebrations, and family gatherings. The quality of a family's bariis reflects their hospitality and cooking skill.",
    historicalContext: "Somali cuisine was shaped by centuries of trade along the Indian Ocean coast. Spices like cardamom, cinnamon, and cumin came through ancient trade routes. Bariis iskukaris blends these imported spices with indigenous Somali cooking techniques, creating a dish that tells the story of Somali maritime trade history.",
    youtubeVideoId: "bSarNgoid3s",
    prepTime: "30 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Basmati rice", amount: "3 cups", notes: "Washed and soaked 20 minutes", substitution: "Long grain rice" },
      { item: "Goat or lamb", amount: "500g", notes: "Cut into chunks", substitution: "Chicken thighs" },
      { item: "Onion", amount: "2 large", notes: "Diced" },
      { item: "Tomatoes", amount: "3 medium", notes: "Pureed" },
      { item: "Xawaash spice mix", amount: "2 tablespoons", notes: "Cumin, coriander, cardamom, cinnamon, turmeric, black pepper, cloves", substitution: "Ras el hanout" },
      { item: "Sugar", amount: "2 tablespoons", notes: "For caramelizing" },
      { item: "Vegetable oil", amount: "1/4 cup" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cilantro", amount: "1/2 cup", notes: "For garnish" },
      { item: "Raisins", amount: "1/4 cup", notes: "Optional" },
      { item: "Salt", amount: "To taste" },
      { item: "Hot water", amount: "4 cups" }
    ],
    instructions: [
      "Heat oil in a large pot. Add sugar and let it caramelize to golden brown.",
      "Add onions and cook until deeply golden, about 8 minutes.",
      "Add garlic and xawaash spice mix, stir for 1 minute until fragrant.",
      "Add meat pieces and brown on all sides, about 5 minutes.",
      "Pour in tomato puree and cook until oil separates, about 10 minutes.",
      "Add hot water, salt, and bring to a boil. Simmer until meat is tender, about 30 minutes.",
      "Remove meat and set aside. Measure remaining broth (should be about 4 cups, add water if needed).",
      "Drain soaked rice and add to the pot with broth.",
      "Bring to boil, then reduce heat to lowest. Cover tightly with foil then lid.",
      "Cook for 20 minutes without lifting lid.",
      "Place meat on top of rice, cover again, and steam for 5 more minutes.",
      "Fluff with fork, scatter raisins and cilantro. Serve with banana on the side."
    ],
    tips: [
      "Don't stir the rice once covered - let steam do the work",
      "The caramelized sugar gives the authentic golden color and subtle sweetness",
      "Make your own xawaash: equal parts cumin, coriander, cardamom, and turmeric, half parts cinnamon and cloves",
      "Serve with a banana and a glass of camel milk for the traditional Somali experience"
    ],
    variations: [
      "Chicken bariis - use chicken pieces instead of goat, reduces cook time",
      "Vegetarian version with chickpeas and mixed vegetables",
      "Add saffron strands for an extra luxurious version",
      "Some families add a layer of sliced potatoes at the bottom for crispy hashwa"
    ],
    servingSuggestions: [
      "Banana (essential Somali side)",
      "Salad with lime dressing",
      "Muufo (Somali flatbread)",
      "Camel milk or spiced tea"
    ],
    nutritionalInfo: {
      calories: "~450 kcal",
      protein: "22g",
      carbs: "58g",
      fat: "14g",
      fiber: "3g",
      notes: "Complete meal with protein from meat and carbs from rice. Xawaash spices contain anti-inflammatory compounds."
    },
    dietaryInfo: ["Gluten-free", "Dairy-free", "High-protein"]
  },

  // ============ CHAGGA (TANZANIA) RECIPES ============
  {
    id: "ndizi-nyama",
    name: "Ndizi na Nyama (Banana Stew)",
    localName: "Ndizi na Nyama",
    tribeSlug: "chagga",
    tribeName: "Chagga",
    category: "staple",
    region: "east",
    country: "TZ",
    description: "A hearty stew of green bananas cooked with beef in a rich tomato sauce. The signature dish of the Chagga people from the slopes of Mount Kilimanjaro.",
    culturalSignificance: "Bananas are central to Chagga identity - they cultivate over 20 varieties on the volcanic slopes of Kilimanjaro. This stew represents everyday Chagga life, connecting agriculture to the dinner table.",
    historicalContext: "The Chagga developed intensive banana farming systems on Kilimanjaro's fertile volcanic slopes over 500 years ago. Their banana groves (vihamba) are recognized as a traditional agroforestry system. Ndizi na nyama evolved as bananas became the dominant crop.",
    youtubeVideoId: "j3aZxrx9qx8",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Green bananas (plantains)", amount: "6 large", notes: "Peeled and halved", substitution: "Green plantains" },
      { item: "Beef", amount: "500g", notes: "Cut into chunks" },
      { item: "Onion", amount: "2 large", notes: "Chopped" },
      { item: "Tomatoes", amount: "4 medium", notes: "Chopped" },
      { item: "Coconut milk", amount: "1 cup", notes: "Optional for coastal variation" },
      { item: "Garlic", amount: "3 cloves", notes: "Minced" },
      { item: "Cooking oil", amount: "3 tablespoons" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Fresh cilantro", amount: "For garnish" }
    ],
    instructions: [
      "Heat oil and brown beef pieces on all sides. Remove and set aside.",
      "In the same pot, sauté onions until golden.",
      "Add garlic and cook 1 minute.",
      "Add tomatoes and cook until they break down into a sauce.",
      "Return beef to pot, add 2 cups water, and simmer 20 minutes.",
      "Add green bananas and more water to cover.",
      "Simmer until bananas are tender and stew thickens, about 20 minutes.",
      "Add coconut milk if using, season with salt and pepper.",
      "Garnish with cilantro and serve hot."
    ],
    tips: [
      "Green bananas stain hands - rub oil on hands before peeling",
      "Don't overcook bananas - they should hold their shape",
      "Kilimanjaro bananas have a distinctive flavor; green plantains are the closest substitute"
    ],
    nutritionalInfo: {
      calories: "~380 kcal",
      protein: "20g",
      carbs: "45g",
      fat: "12g",
      fiber: "5g",
      notes: "Green bananas are rich in resistant starch - a prebiotic that feeds gut bacteria"
    },
    dietaryInfo: ["Gluten-free", "Dairy-free"]
  },

  // ============ TSWANA (BOTSWANA) - ADDITIONAL ============
  {
    id: "dikgobe",
    name: "Dikgobe (Bean and Samp Stew)",
    localName: "Dikgobe",
    tribeSlug: "tswana",
    tribeName: "Tswana",
    category: "staple",
    region: "southern",
    country: "BW",
    description: "A nutritious pot of beans, samp (dried corn kernels), and sometimes peanuts - Botswana's most beloved traditional dish.",
    culturalSignificance: "Dikgobe is the ultimate comfort food of the Tswana people. It's slow-cooked in large pots and shared communally. The dish represents the agrarian roots of Tswana society.",
    historicalContext: "Before colonization, the Tswana were skilled farmers in the semi-arid Kalahari region. Dikgobe evolved as a way to combine drought-resistant crops into a complete protein meal. It sustained communities through dry seasons.",
    prepTime: "12 hours (soaking)",
    cookTime: "3 hours",
    servings: 8,
    difficulty: "easy",
    ingredients: [
      { item: "Dried samp (hominy)", amount: "2 cups", notes: "Soaked overnight" },
      { item: "Sugar beans or cowpeas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Peanuts", amount: "1/2 cup", notes: "Raw, shelled" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "8 cups" }
    ],
    instructions: [
      "Drain soaked samp and beans. Place in a large pot.",
      "Add fresh water to cover by 3 inches.",
      "Bring to a boil, then reduce heat to a gentle simmer.",
      "Cook for 2 hours, stirring occasionally and adding water as needed.",
      "Add peanuts and continue cooking for another hour.",
      "The dish is ready when samp and beans are soft and creamy.",
      "Season with salt. The consistency should be thick like porridge.",
      "Serve hot in communal bowls."
    ],
    tips: [
      "Patience is key - low and slow cooking creates the best texture",
      "Leftovers taste even better the next day",
      "Some add a spoonful of peanut butter for extra richness"
    ],
    nutritionalInfo: {
      calories: "~310 kcal",
      protein: "14g",
      carbs: "50g",
      fat: "6g",
      fiber: "10g",
      notes: "Complete plant protein from beans + corn combination. Peanuts add healthy fats."
    },
    dietaryInfo: ["Vegan", "Gluten-free", "High-fiber", "High-protein"]
  },

  // ============ BAMBARA (MALI) RECIPES ============
  {
    id: "tigadegena",
    name: "Tigadèguèna (Peanut Butter Stew)",
    localName: "Tigadèguèna",
    tribeSlug: "bambara",
    tribeName: "Bambara",
    category: "staple",
    region: "west",
    country: "ML",
    description: "A rich, creamy peanut butter stew with meat and vegetables - the beloved national dish of Mali and cornerstone of Bambara cuisine.",
    culturalSignificance: "Tigadèguèna means 'peanut butter sauce' in Bambara. It's the dish that every Malian mother teaches her daughter to cook. Sharing this stew from a communal bowl is an act of social bonding.",
    historicalContext: "Peanuts were introduced to West Africa from South America in the 16th century via Portuguese traders. The Bambara people ingeniously incorporated them into their existing cuisine, creating what became Mali's most iconic dish.",
    youtubeVideoId: "UOorPVtWPQ8",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    servings: 6,
    difficulty: "easy",
    ingredients: [
      { item: "Chicken or lamb", amount: "500g", notes: "Cut into pieces" },
      { item: "Natural peanut butter", amount: "1 cup", notes: "Smooth, unsweetened", substitution: "Groundnut paste" },
      { item: "Tomato paste", amount: "3 tablespoons" },
      { item: "Onion", amount: "2 large", notes: "Chopped" },
      { item: "Okra", amount: "6 pieces", notes: "Optional" },
      { item: "Eggplant", amount: "1 medium", notes: "Cubed" },
      { item: "Sweet potato", amount: "1 large", notes: "Cubed" },
      { item: "Scotch bonnet pepper", amount: "1", notes: "Whole, for flavor" },
      { item: "Vegetable oil", amount: "3 tablespoons" },
      { item: "Salt", amount: "To taste" }
    ],
    instructions: [
      "Brown meat pieces in oil. Remove and set aside.",
      "Sauté onions until golden in the same pot.",
      "Add tomato paste and cook 2 minutes.",
      "Return meat, add 4 cups water, and bring to a boil.",
      "Simmer until meat is half-cooked, about 20 minutes.",
      "Dissolve peanut butter in 1 cup warm water. Add to pot.",
      "Add sweet potato, eggplant, and whole pepper.",
      "Simmer on low heat for 30 minutes, stirring occasionally to prevent sticking.",
      "The sauce should be thick and creamy. Adjust salt.",
      "Serve over white rice or with tô (millet/sorghum porridge)."
    ],
    tips: [
      "Stir frequently once peanut butter is added - it burns easily",
      "Use natural peanut butter without sugar for authentic taste",
      "The whole scotch bonnet adds flavor without too much heat - don't pierce it"
    ],
    nutritionalInfo: {
      calories: "~480 kcal",
      protein: "28g",
      carbs: "30g",
      fat: "28g",
      fiber: "6g",
      notes: "Peanuts provide protein, healthy fats, and niacin. Sweet potato adds vitamin A."
    },
    dietaryInfo: ["Gluten-free", "Dairy-free", "High-protein"]
  }
];

// Horn of Africa recipes
const hornAfricanRecipes: Recipe[] = [
  {
    id: "suqaar",
    name: "Suqaar",
    localName: "سقار",
    tribeSlug: "somali",
    tribeName: "Somali",
    category: "staple",
    region: "horn",
    country: "SO",
    description: "A quick Somali stir-fry of cubed meat with vegetables and spices, often served for breakfast or lunch with canjeero (flatbread).",
    culturalSignificance: "Suqaar is everyday home cooking in Somalia — quick, nutritious, and endlessly adaptable. It's the dish that Somali mothers teach daughters first, and the comfort food of the Somali diaspora worldwide.",
    historicalContext: "The dish reflects Somalia's position on ancient trade routes — cumin from Arabia, coriander from India, and turmeric from Southeast Asia all feature. The name comes from the Arabic 'saqar' meaning small pieces.",
    youtubeVideoId: "SPEO76vgQp8",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { item: "Beef or goat meat", amount: "500g", notes: "Cut into small cubes", substitution: "Chicken breast" },
      { item: "Onion", amount: "1 large", notes: "Diced" },
      { item: "Green pepper", amount: "1", notes: "Diced" },
      { item: "Tomato", amount: "2 medium", notes: "Diced" },
      { item: "Garlic", amount: "4 cloves", notes: "Minced" },
      { item: "Cumin", amount: "1 tsp" },
      { item: "Coriander powder", amount: "1 tsp" },
      { item: "Turmeric", amount: "½ tsp" },
      { item: "Vegetable oil", amount: "3 tbsp" },
      { item: "Salt and pepper", amount: "To taste" },
      { item: "Fresh cilantro", amount: "Handful", notes: "Chopped for garnish" }
    ],
    instructions: [
      "Heat oil in a large pan over medium-high heat.",
      "Season meat cubes with salt, pepper, cumin, coriander, and turmeric.",
      "Add meat to hot oil and sear until browned on all sides, about 5 minutes.",
      "Add diced onion and garlic, cook until softened.",
      "Add green pepper and tomatoes, stir well.",
      "Cover and cook on medium heat for 10-12 minutes until meat is tender.",
      "Remove lid and cook until excess liquid evaporates.",
      "Garnish with fresh cilantro and serve with canjeero or rice."
    ],
    tips: [
      "Don't overcrowd the pan when searing — work in batches for better browning",
      "For breakfast suqaar, scramble eggs into the meat at the end",
      "Adjust spice levels to taste — some families add xawaash (Somali spice blend)"
    ],
    variations: [
      "Batar Suqaar: Made with liver instead of regular meat",
      "Vegetable Suqaar: Potatoes and carrots replace meat for a vegetarian version",
      "Egg Suqaar: Scrambled eggs mixed in, popular for breakfast"
    ],
    servingSuggestions: ["Canjeero (Somali flatbread)", "Basmati rice", "Banana on the side", "Hot Somali tea"],
    nutritionalInfo: {
      calories: "~350 kcal",
      protein: "32g",
      carbs: "12g",
      fat: "18g",
      fiber: "3g",
      notes: "High protein, moderate fat. Spices add anti-inflammatory benefits."
    },
    dietaryInfo: ["Gluten-free", "Dairy-free", "High-protein", "Halal"]
  },
  {
    id: "kitfo",
    name: "Kitfo",
    localName: "ክትፎ",
    tribeSlug: "gurage",
    tribeName: "Gurage",
    category: "special",
    region: "horn",
    country: "ET",
    description: "Ethiopian steak tartare — finely minced raw beef seasoned with mitmita spice and niter kibbeh (spiced clarified butter). A beloved delicacy of the Gurage people.",
    culturalSignificance: "Kitfo is the crown jewel of Gurage cuisine and a point of immense pride. It's served at weddings, holidays, and celebrations. Refusing kitfo at a Gurage gathering is considered an insult.",
    historicalContext: "The Gurage have prepared kitfo for centuries, originally as a warrior's meal — raw meat provided quick energy without the need for fire. The dish spread to become one of Ethiopia's most celebrated foods.",
    youtubeVideoId: "ymKH4cNs0I4",
    prepTime: "20 minutes",
    cookTime: "5 minutes",
    servings: 4,
    difficulty: "medium",
    ingredients: [
      { item: "Lean beef", amount: "500g", notes: "Freshest possible, hand-minced", substitution: "None — quality fresh beef is essential" },
      { item: "Niter kibbeh (spiced butter)", amount: "4 tbsp", notes: "Melted", substitution: "Regular clarified butter + cardamom" },
      { item: "Mitmita spice", amount: "2 tbsp", notes: "Ethiopian chili blend", substitution: "Cayenne + cardamom + clove blend" },
      { item: "Korerima (Ethiopian cardamom)", amount: "½ tsp" },
      { item: "Salt", amount: "To taste" },
      { item: "Ayib (Ethiopian cottage cheese)", amount: "1 cup", notes: "For serving", substitution: "Ricotta cheese" },
      { item: "Gomen (collard greens)", amount: "2 cups", notes: "Cooked, for serving" }
    ],
    instructions: [
      "Using a very sharp knife, mince the beef extremely finely (or ask your butcher).",
      "Warm the niter kibbeh until just melted — do not overheat.",
      "Mix the minced beef with melted niter kibbeh.",
      "Add mitmita, korerima, and salt. Mix gently but thoroughly.",
      "For leb leb (lightly warmed): briefly warm in a pan for 1-2 minutes.",
      "Serve immediately on a plate with ayib and gomen on the side.",
      "Traditionally served on injera (fermented flatbread)."
    ],
    tips: [
      "Meat must be extremely fresh — buy from a trusted butcher on the day of preparation",
      "Traditional kitfo is served raw (tire) but leb leb (lightly cooked) is also popular",
      "The quality of niter kibbeh makes or breaks the dish"
    ],
    variations: [
      "Tire: Completely raw — the most traditional way",
      "Leb Leb: Lightly warmed but still pink",
      "Yebesele: Fully cooked — for those who prefer cooked meat"
    ],
    servingSuggestions: ["Injera", "Ayib (cottage cheese)", "Gomen (collard greens)", "Tej (honey wine)"],
    nutritionalInfo: {
      calories: "~420 kcal",
      protein: "35g",
      carbs: "2g",
      fat: "30g",
      fiber: "0g",
      notes: "Extremely high in protein and B12. Spiced butter provides healthy fats and fat-soluble vitamins."
    },
    dietaryInfo: ["Gluten-free", "Low-carb", "Keto-friendly", "High-protein"]
  },
  {
    id: "zigni",
    name: "Zigni",
    localName: "ዝግኒ",
    tribeSlug: "tigrinya",
    tribeName: "Tigrinya",
    category: "staple",
    region: "horn",
    country: "ER",
    description: "Eritrean spicy beef stew made with berbere spice, tomatoes, and onions. The national comfort food of Eritrea.",
    culturalSignificance: "Zigni is to Eritrea what injera is to Ethiopia — inseparable from daily life. Every Eritrean family has their own recipe passed down through generations. It's the centerpiece of every celebration.",
    historicalContext: "Eritrean cuisine developed distinctly from Ethiopian during Italian colonial influence (1890-1941), incorporating tomato paste and different spice ratios. Zigni reflects this unique culinary identity.",
    youtubeVideoId: "XwbQZCLroSA",
    prepTime: "20 minutes",
    cookTime: "90 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Beef", amount: "700g", notes: "Cut into chunks", substitution: "Lamb or chicken" },
      { item: "Onions", amount: "4 large", notes: "Finely diced — the base of the stew" },
      { item: "Tomato paste", amount: "3 tbsp" },
      { item: "Berbere spice", amount: "3 tbsp", substitution: "Paprika + cayenne + fenugreek + cardamom" },
      { item: "Garlic", amount: "6 cloves", notes: "Minced" },
      { item: "Ginger", amount: "1 inch", notes: "Grated" },
      { item: "Niter kibbeh", amount: "3 tbsp", substitution: "Ghee + spices" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "2 cups" }
    ],
    instructions: [
      "Dry-fry diced onions in a large pot over medium heat until deeply caramelized (20-30 min). Do NOT add oil.",
      "Add tomato paste and berbere spice, stir for 5 minutes.",
      "Add garlic and ginger, cook 2 minutes.",
      "Add niter kibbeh and stir well.",
      "Add beef chunks and brown on all sides.",
      "Add water, bring to a boil, then reduce to a simmer.",
      "Cover and cook for 60-90 minutes until meat is very tender.",
      "The sauce should be thick and rich. Adjust seasoning.",
      "Serve on injera."
    ],
    tips: [
      "The key is caramelizing onions without oil — this creates the deep red-brown base",
      "Don't rush the onion step — it's the foundation of all Eritrean stews",
      "Berbere intensity varies by brand — start with less and add more"
    ],
    nutritionalInfo: {
      calories: "~380 kcal",
      protein: "30g",
      carbs: "15g",
      fat: "22g",
      fiber: "4g",
      notes: "Berbere spice contains anti-inflammatory compounds. Slow-cooked onions are rich in prebiotic fiber."
    },
    dietaryInfo: ["Gluten-free", "Dairy-free option", "High-protein"]
  }
];

// Additional West African recipes
const additionalWestAfricanRecipes: Recipe[] = [
  {
    id: "thieboudienne",
    name: "Thiéboudienne",
    localName: "Ceebu Jën",
    tribeSlug: "wolof",
    tribeName: "Wolof",
    category: "staple",
    region: "west",
    country: "SN",
    description: "Senegal's national dish — a magnificent one-pot rice and fish dish with stuffed fish, vegetables, and tamarind-tomato sauce. UNESCO Intangible Cultural Heritage since 2021.",
    culturalSignificance: "Thiéboudienne is the soul of Senegalese cuisine. Invented in the 19th century by Penda Mbaye of Saint-Louis, it's eaten for lunch across the country. Families gather around a single large platter, eating with their right hand.",
    historicalContext: "When French colonizers introduced broken rice to Senegal, the Wolof people transformed it into an art form. The dish reflects Senegal's fishing heritage and agricultural traditions. Its UNESCO recognition in 2021 cemented its status as a world culinary treasure.",
    youtubeVideoId: "r7Zdp2TpmAA",
    prepTime: "45 minutes",
    cookTime: "90 minutes",
    servings: 8,
    difficulty: "hard",
    ingredients: [
      { item: "Whole fish (thiof/grouper)", amount: "1 large", notes: "Scored and stuffed", substitution: "Red snapper or sea bass" },
      { item: "Broken rice", amount: "500g", notes: "Washed", substitution: "Long-grain rice" },
      { item: "Tomato paste", amount: "4 tbsp" },
      { item: "Onions", amount: "3 large", notes: "Sliced" },
      { item: "Cassava", amount: "200g", notes: "Peeled and chunked" },
      { item: "Eggplant", amount: "1 medium" },
      { item: "Cabbage", amount: "¼ head" },
      { item: "Carrots", amount: "2 large" },
      { item: "Sweet potato", amount: "1 medium" },
      { item: "Tamarind paste", amount: "2 tbsp", substitution: "Lime juice" },
      { item: "Dried fish (guedj)", amount: "50g", notes: "Fermented dried fish" },
      { item: "Scotch bonnet", amount: "2", notes: "Whole" },
      { item: "Parsley & garlic stuffing (rof)", amount: "4 tbsp" },
      { item: "Vegetable oil", amount: "½ cup" }
    ],
    instructions: [
      "Make the rof stuffing: blend parsley, garlic, scotch bonnet, and salt. Stuff into fish scores.",
      "Fry the stuffed fish in oil until golden. Set aside.",
      "In the same oil, fry onions until golden. Add tomato paste and cook 5 min.",
      "Add water (about 8 cups), tamarind, dried fish, and bring to a boil.",
      "Add hard vegetables first (cassava, carrots, sweet potato). Cook 15 min.",
      "Add softer vegetables (eggplant, cabbage). Cook 10 more minutes.",
      "Remove all vegetables and fish. Keep warm.",
      "Add washed rice to the broth. Cook covered on low heat for 25-30 minutes.",
      "The rice should absorb all the liquid and form a crust (xoon) on the bottom.",
      "Mound rice on a large platter. Arrange vegetables and fish on top.",
      "Serve family-style with the xoon (crispy bottom) broken and distributed."
    ],
    tips: [
      "The xoon (crispy rice bottom) is the most prized part — don't skip it",
      "Use the freshest fish possible — it makes all the difference",
      "Cook rice on very low heat to get even cooking and good crust"
    ],
    variations: [
      "Thiéboudienne rouge: Made with tomato paste (most common)",
      "Thiéboudienne blanc: White version without tomato paste",
      "Thiéboudienne au poulet: Chicken version for non-fish eaters"
    ],
    servingSuggestions: ["Lime wedges", "Extra scotch bonnet sauce (kaani)", "Bissap juice (hibiscus)"],
    nutritionalInfo: {
      calories: "~550 kcal",
      protein: "28g",
      carbs: "65g",
      fat: "18g",
      fiber: "6g",
      notes: "Complete meal with protein from fish, complex carbs from rice, vitamins from diverse vegetables."
    },
    dietaryInfo: ["Gluten-free", "Dairy-free", "UNESCO Heritage"]
  },
  {
    id: "waakye",
    name: "Waakye",
    localName: "Waakye",
    tribeSlug: "akan",
    tribeName: "Akan / Ga",
    category: "staple",
    region: "west",
    country: "GH",
    description: "Ghana's beloved street food — rice and beans cooked with millet leaf stalks that give a distinctive burgundy color, served with an array of accompaniments.",
    culturalSignificance: "Waakye is Ghana's great equalizer — eaten by everyone from market women to business executives. Street vendors serve it in banana leaves, and every neighborhood has a favorite waakye seller.",
    historicalContext: "Originally a Hausa dish that spread across Ghana, waakye represents the cultural fusion of northern and southern Ghana. The use of sorghum leaves for coloring is a uniquely Ghanaian innovation.",
    youtubeVideoId: "5RlLRtf8YLo",
    prepTime: "30 minutes",
    cookTime: "60 minutes",
    servings: 6,
    difficulty: "medium",
    ingredients: [
      { item: "Rice", amount: "2 cups" },
      { item: "Black-eyed peas", amount: "1 cup", notes: "Soaked overnight" },
      { item: "Dried millet stalks (waakye leaves)", amount: "2-3 stalks", substitution: "Baking soda (¼ tsp) for color" },
      { item: "Salt", amount: "To taste" },
      { item: "Water", amount: "6 cups" }
    ],
    instructions: [
      "Boil soaked beans in water with millet stalks for 30 minutes until half-cooked.",
      "Add washed rice to the pot.",
      "Add more water if needed — liquid should cover rice by 1 inch.",
      "Cook covered on low heat until rice and beans are tender, about 25-30 minutes.",
      "The millet stalks will turn the rice a beautiful burgundy-brown.",
      "Remove millet stalks before serving.",
      "Serve with shito (pepper sauce), gari (cassava flakes), spaghetti, and protein."
    ],
    tips: [
      "Soak beans overnight for even cooking",
      "Don't stir too much — let the rice steam",
      "Traditional accompaniments include fried plantain, boiled eggs, and wele (cow skin)"
    ],
    servingSuggestions: ["Shito (hot pepper sauce)", "Gari (cassava flakes)", "Fried plantain", "Boiled eggs", "Spaghetti"],
    nutritionalInfo: {
      calories: "~320 kcal",
      protein: "12g",
      carbs: "58g",
      fat: "3g",
      fiber: "8g",
      notes: "Complete protein when rice and beans are combined. High in fiber and iron."
    },
    dietaryInfo: ["Vegan", "Gluten-free", "High-fiber"]
  }
];


// Combine all recipes
recipes.push(...beverageRecipes);
recipes.push(...centralAfricanRecipes);
recipes.push(...eastAfricanRecipes);
recipes.push(...southernAfricanRecipes);
recipes.push(...westAfricanRecipes);
recipes.push(...northAfricanRecipes);
recipes.push(...hornAfricanRecipes);
recipes.push(...additionalWestAfricanRecipes);

// New tribe recipes
const newTribesRecipes: Recipe[] = [
  {
    id: 'nsima-chewa',
    name: 'Nsima with Ndiwo',
    localName: 'Nsima ndi Ndiwo',
    tribeSlug: 'chewa',
    tribeName: 'Chewa',
    category: 'staple',
    region: 'southern',
    country: 'MW',
    description: 'Nsima is a thick maize porridge that is the heart of every Chewa meal, served with ndiwo (relish) made from vegetables, beans, or dried fish.',
    culturalSignificance: 'Nsima is not just food — it is identity. For the Chewa, sharing nsima from the same plate symbolizes family unity. A meal without nsima is not considered a meal.',
    historicalContext: 'Maize was introduced to Africa by Portuguese traders in the 16th century and gradually replaced millet and sorghum as the dominant staple across southern Africa.',
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      { item: 'White maize flour (ufa)', amount: '2 cups', notes: 'Fine-ground' },
      { item: 'Water', amount: '4 cups' },
      { item: 'Pumpkin leaves (nkhwani)', amount: '2 cups', substitution: 'Spinach or collard greens' },
      { item: 'Tomatoes', amount: '2 medium, chopped' },
      { item: 'Onion', amount: '1, diced' },
      { item: 'Groundnut flour', amount: '2 tbsp', notes: 'For thickening the relish' },
      { item: 'Salt', amount: 'To taste' }
    ],
    instructions: [
      'Boil 4 cups of water in a heavy pot.',
      'Add 1 cup of maize flour while stirring to make a thin porridge. Cook for 5 minutes.',
      'Gradually add the remaining flour, stirring vigorously with a wooden spoon (mthiko) until very thick and pulls away from the pot.',
      'Cover and cook on low heat for 5 minutes. Shape into a mound on a plate.',
      'For ndiwo: sauté onion, add tomatoes, then pumpkin leaves. Stir in groundnut flour dissolved in water. Simmer 10 minutes.',
      'Serve nsima with ndiwo on the side. Eat with your hands — pinch off a piece, roll it, and dip into the relish.'
    ],
    tips: ['Use a strong wooden spoon — stirring nsima is a workout!', 'The consistency should be firm enough to hold its shape'],
    servingSuggestions: ['Dried fish (usipa)', 'Beans in groundnut sauce', 'Chicken stew'],
    nutritionalInfo: { calories: '~290 kcal', protein: '8g', carbs: '55g', fat: '5g', fiber: '4g', notes: 'Good source of carbohydrates and B vitamins when paired with groundnut relish' },
    dietaryInfo: ['Vegan', 'Gluten-free']
  },
  {
    id: 'boule-sara',
    name: 'Boule with Gombo Sauce',
    localName: 'Boule na sauce gombo',
    tribeSlug: 'sara',
    tribeName: 'Sara',
    category: 'staple',
    region: 'central',
    country: 'TD',
    description: 'Boule is a thick millet or sorghum porridge — the Sara staple — served with a rich okra (gombo) sauce made with dried fish and dawadawa seasoning.',
    culturalSignificance: 'Boule is the center of Sara communal life. Men and women eat from separate bowls, but the act of sharing boule cements family and village bonds.',
    historicalContext: 'Millet has been cultivated in the Sahel for over 4,000 years. The Sara perfected millet-based cuisine as their primary caloric source in the semi-arid south of Chad.',
    prepTime: '15 minutes',
    cookTime: '30 minutes',
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { item: 'Millet flour', amount: '2 cups', substitution: 'Sorghum flour' },
      { item: 'Water', amount: '5 cups' },
      { item: 'Fresh okra', amount: '300g, sliced' },
      { item: 'Dried fish', amount: '100g', notes: 'Soaked and deboned' },
      { item: 'Dawadawa (locust bean seasoning)', amount: '1 tbsp', substitution: 'Bouillon cube' },
      { item: 'Palm oil', amount: '2 tbsp' },
      { item: 'Onion', amount: '1, diced' },
      { item: 'Salt and chili pepper', amount: 'To taste' }
    ],
    instructions: [
      'Boil 5 cups of water. Gradually whisk in millet flour, stirring constantly to prevent lumps.',
      'Cook on medium heat, stirring vigorously for 15-20 minutes until very thick and smooth.',
      'In a separate pot, heat palm oil and sauté onion until golden.',
      'Add sliced okra and cook for 5 minutes until softened.',
      'Add dried fish, dawadawa, chili, and 1 cup of water. Simmer for 10 minutes.',
      'Serve boule in a mound with gombo sauce poured over or alongside.'
    ],
    tips: ['Stir boule in one direction for best texture', 'The sauce should be thick and mucilaginous from the okra'],
    nutritionalInfo: { calories: '~310 kcal', protein: '14g', carbs: '48g', fat: '8g', fiber: '6g', notes: 'High in protein from dried fish. Okra provides excellent fiber and vitamins.' },
    dietaryInfo: ['Gluten-free', 'High-protein']
  },
  {
    id: 'ifisashi',
    name: 'Ifisashi',
    localName: 'Ifisashi',
    tribeSlug: 'bemba',
    tribeName: 'Bemba',
    category: 'staple',
    description: 'A hearty Zambian groundnut stew with leafy greens, served over nshima. This is one of the most beloved Bemba dishes, combining the richness of peanuts with nutritious vegetables.',
    culturalSignificance: 'Ifisashi is the quintessential Bemba comfort food, eaten at daily meals and celebrations alike. The groundnut base provides essential protein in a cuisine where meat was historically scarce.',
    servings: 6,
    prepTime: '15 minutes',
    cookTime: '30 minutes',
    difficulty: 'easy',
    ingredients: [
      { item: 'Pounded groundnuts (peanut butter)', amount: '2 cups', substitution: 'Smooth peanut butter' },
      { item: 'Pumpkin leaves or spinach', amount: '1 large bunch', notes: 'Chopped', substitution: 'Kale or collard greens' },
      { item: 'Tomatoes', amount: '2 medium', notes: 'Chopped' },
      { item: 'Onion', amount: '1 medium', notes: 'Diced' },
      { item: 'Vegetable oil', amount: '2 tablespoons' },
      { item: 'Salt', amount: '1 teaspoon' },
      { item: 'Chili flakes', amount: '1/2 teaspoon', notes: 'Optional' },
      { item: 'Water', amount: '2 cups' }
    ],
    instructions: [
      'Heat oil in a pot and sauté onion until translucent.',
      'Add tomatoes and cook until softened, about 5 minutes.',
      'Mix groundnut paste with 2 cups of water until smooth.',
      'Pour groundnut mixture into the pot and stir well.',
      'Bring to a gentle boil, then add chopped greens.',
      'Simmer for 15-20 minutes until greens are tender and sauce is thick.',
      'Season with salt and chili. Serve hot over nshima.'
    ],
    tips: ['Fresh pumpkin leaves give the most authentic flavor', 'The sauce should be thick enough to coat a spoon'],
    nutritionalInfo: { calories: '~380 kcal', protein: '16g', carbs: '22g', fat: '28g', fiber: '5g', notes: 'Excellent source of plant protein from groundnuts. Rich in iron from leafy greens.' },
    dietaryInfo: ['Vegan', 'Gluten-free', 'High-protein']
  },
  {
    id: 'oshifima-with-spinach',
    name: 'Oshifima with Dried Spinach',
    localName: 'Oshifima nomboga',
    tribeSlug: 'ovambo',
    tribeName: 'Ovambo',
    category: 'staple',
    description: 'The quintessential Ovambo meal: pearl millet porridge (oshifima) served with a savory dried spinach relish. Mahangu (pearl millet) is the traditional grain of northern Namibia.',
    culturalSignificance: 'Oshifima is the daily bread of the Ovambo people. Every homestead grows mahangu, and preparing oshifima is a fundamental skill. It represents sustenance, tradition, and the agricultural identity of northern Namibia.',
    servings: 4,
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    difficulty: 'easy',
    ingredients: [
      { item: 'Mahangu (pearl millet) flour', amount: '3 cups', substitution: 'Maize meal' },
      { item: 'Water', amount: '4 cups' },
      { item: 'Salt', amount: '1/2 teaspoon' },
      { item: 'Dried spinach (ombidi) or fresh spinach', amount: '200g', notes: 'For the relish' },
      { item: 'Onion', amount: '1 medium', notes: 'Chopped' },
      { item: 'Tomatoes', amount: '2 medium', notes: 'Chopped' },
      { item: 'Vegetable oil', amount: '2 tablespoons' },
      { item: 'Chili', amount: '1/4 teaspoon', notes: 'Optional' }
    ],
    instructions: [
      'Bring 4 cups of water to a boil in a heavy pot.',
      'Gradually add mahangu flour while stirring constantly with a wooden spoon.',
      'Keep stirring vigorously to prevent lumps - the mixture will become very thick.',
      'Reduce heat, cover, and cook for 10-15 minutes, stirring occasionally.',
      'For the relish: heat oil and sauté onion until golden.',
      'Add tomatoes and cook until softened.',
      'Add dried spinach (soaked and drained) or fresh spinach.',
      'Cook for 10 minutes until tender. Season with salt and chili.',
      'Serve oshifima in a mound with spinach relish alongside.'
    ],
    tips: ['Traditional mahangu gives a nutty, earthy flavor - maize meal can substitute', 'The porridge should be firm enough to hold its shape'],
    nutritionalInfo: { calories: '~340 kcal', protein: '10g', carbs: '62g', fat: '7g', fiber: '8g', notes: 'Pearl millet is highly nutritious with more iron and zinc than maize. Drought-resistant crop.' },
    dietaryInfo: ['Vegan', 'Gluten-free', 'High-fiber']
  },
  {
    id: 'akple-with-fetri-detsi',
    name: 'Akple with Fetri Detsi',
    localName: 'Akple kple Fetri Detsi',
    tribeSlug: 'ewe',
    tribeName: 'Ewe',
    category: 'staple',
    description: 'The iconic Ewe dish: smooth corn dough balls (akple) served with a rich okra soup (fetri detsi). This is the most representative meal of the Ewe people of Ghana and Togo.',
    culturalSignificance: 'Akple is the staple food of the Ewe people, eaten daily across the Volta Region and Togo. Making akple well — with the right texture and consistency — is a mark of culinary skill and cultural pride.',
    servings: 4,
    prepTime: '20 minutes',
    cookTime: '40 minutes',
    difficulty: 'medium',
    ingredients: [
      { item: 'Corn dough (fermented)', amount: '2 cups' },
      { item: 'Cassava dough', amount: '1 cup' },
      { item: 'Water', amount: '3 cups' },
      { item: 'Fresh okra', amount: '300g', notes: 'Sliced' },
      { item: 'Smoked fish', amount: '200g', notes: 'Deboned' },
      { item: 'Dried shrimp', amount: '100g' },
      { item: 'Tomatoes', amount: '3 medium', notes: 'Blended' },
      { item: 'Onion', amount: '1 large', notes: 'Chopped' },
      { item: 'Palm oil', amount: '3 tablespoons' },
      { item: 'Fresh chili peppers', amount: '2' },
      { item: 'Salt', amount: '1 teaspoon' },
      { item: 'Dawadawa (locust bean paste)', amount: '1 tablespoon', substitution: 'Fermented soybean paste' }
    ],
    instructions: [
      'Mix corn dough and cassava dough with 1 cup water to make a smooth batter.',
      'Boil remaining 2 cups of water in a heavy pot.',
      'Pour half the batter into boiling water, stirring constantly.',
      'Cook while stirring until it begins to thicken.',
      'Add remaining batter gradually, stirring vigorously with a wooden spatula.',
      'Continue stirring until very thick and pulls away from pot sides. Cover and steam 5 minutes.',
      'For the soup: heat palm oil and fry onions until golden.',
      'Add blended tomatoes and cook for 10 minutes.',
      'Add smoked fish, dried shrimp, dawadawa, and chili.',
      'Add sliced okra and 1 cup water. Simmer for 15 minutes.',
      'Serve akple in balls with fetri detsi poured alongside.'
    ],
    tips: ['The akple must be stirred with great force - traditionally a sign of a good cook', 'Fermented corn dough gives the authentic sour tang'],
    nutritionalInfo: { calories: '~420 kcal', protein: '22g', carbs: '52g', fat: '14g', fiber: '6g', notes: 'High protein from smoked fish and shrimp. Okra provides fiber and vitamins.' },
    dietaryInfo: ['Gluten-free', 'High-protein']
  }
];

recipes.push(...newTribesRecipes);

// ==================== Wave 3: Tswana, Lozi, Ndebele, Mandinka, Kongo recipes ====================
const wave3Recipes: Recipe[] = [
  {
    id: 'seswaa',
    name: 'Seswaa',
    localName: 'Seswaa / Chotlho',
    tribeSlug: 'tswana',
    tribeName: 'Tswana',
    category: 'staple',
    description: 'Botswana\'s national dish — slow-cooked, pounded beef that falls apart into tender shreds. Traditionally prepared for celebrations, weddings, and funerals.',
    servings: 6,
    prepTime: '20 min',
    cookTime: '3-4 hours',
    difficulty: 'medium',
    youtubeVideoId: '',
    ingredients: [
      { item: 'Beef (bone-in cuts like leg or ribs)', amount: '1.5 kg' },
      { item: 'Water', amount: 'To cover' },
      { item: 'Salt', amount: 'To taste' },
      { item: 'Onion (optional, modern)', amount: '1 large' }
    ],
    instructions: [
      'Place bone-in beef in a large pot with just enough water to cover.',
      'Bring to a boil, then reduce to a slow simmer.',
      'Cook for 3-4 hours until the meat is extremely tender and falls off the bone.',
      'Remove bones from the pot.',
      'Using two forks or a wooden pestle, pound and shred the meat in the pot.',
      'Continue cooking until excess liquid evaporates and meat is dry-ish but tender.',
      'Season with salt. Traditionally NO other spices are added.',
      'Serve with bogobe (sorghum or maize porridge) and morogo (wild spinach).'
    ],
    tips: ['The key is patience — low and slow cooking is essential', 'Traditional seswaa uses only salt, no other seasonings', 'Goat can be substituted for beef'],
    culturalSignificance: 'Seswaa is the centerpiece of every major Tswana celebration. Its preparation is a communal activity, often done by men at weddings and funerals.',
    nutritionalInfo: { calories: '~380 kcal', protein: '42g', carbs: '0g', fat: '22g', fiber: '0g', notes: 'High protein, zero carb. Traditionally paired with starchy bogobe for balance.' },
    dietaryInfo: ['Gluten-free', 'Low-carb', 'High-protein']
  },
  {
    id: 'nshima-zambia',
    name: 'Nshima with Dried Fish',
    localName: 'Nshima ne Inswi',
    tribeSlug: 'lozi',
    tribeName: 'Lozi',
    category: 'staple',
    description: 'The Lozi staple — thick maize porridge served with dried bream fish from the Zambezi floodplains, a cornerstone of Barotseland cuisine.',
    servings: 4,
    prepTime: '15 min',
    cookTime: '40 min',
    difficulty: 'easy',
    youtubeVideoId: '',
    ingredients: [
      { item: 'White maize meal (mealie meal)', amount: '3 cups' },
      { item: 'Water', amount: '5 cups' },
      { item: 'Dried bream fish', amount: '300g' },
      { item: 'Tomatoes', amount: '3 medium' },
      { item: 'Onion', amount: '1 large' },
      { item: 'Cooking oil', amount: '2 tbsp' },
      { item: 'Salt', amount: 'To taste' }
    ],
    instructions: [
      'Soak dried fish in warm water for 20 minutes, then debone and flake.',
      'Boil 5 cups water in a heavy pot.',
      'Mix 1 cup mealie meal with cold water to make a thin paste. Add to boiling water, stirring.',
      'Cook on medium heat for 10 minutes, stirring occasionally.',
      'Gradually add remaining mealie meal, stirring vigorously with a wooden stick (umuko).',
      'Cook until thick and pulls away from pot sides. Cover and steam 5 minutes.',
      'For relish: fry onions in oil, add chopped tomatoes, cook until soft.',
      'Add flaked fish and simmer for 10 minutes. Season with salt.',
      'Serve nshima in balls with fish relish.'
    ],
    tips: ['The nshima must be very thick — it should hold its shape when scooped', 'Zambezi bream is traditional but any dried fish works'],
    culturalSignificance: 'Fish from the Zambezi floodplains is central to Lozi identity. The annual Kuomboka ceremony celebrates the relationship between the Lozi and their floodplain ecosystem.',
    nutritionalInfo: { calories: '~390 kcal', protein: '28g', carbs: '48g', fat: '10g', fiber: '3g', notes: 'Excellent protein from dried fish. Maize provides energy.' },
    dietaryInfo: ['Gluten-free', 'High-protein']
  },
  {
    id: 'isitshwala-ndebele',
    name: 'Isitshwala with Umfino',
    localName: 'Isitshwala ne-Umfino',
    tribeSlug: 'ndebele',
    tribeName: 'Ndebele',
    category: 'staple',
    description: 'The Ndebele staple — stiff maize porridge paired with umfino, a nutritious dish of wild greens cooked with peanuts, passed down through generations of Ndebele women.',
    servings: 4,
    prepTime: '15 min',
    cookTime: '35 min',
    difficulty: 'easy',
    youtubeVideoId: '',
    ingredients: [
      { item: 'White maize meal', amount: '3 cups' },
      { item: 'Water', amount: '5 cups' },
      { item: 'Wild spinach or amaranth leaves', amount: '500g' },
      { item: 'Raw peanuts', amount: '1 cup' },
      { item: 'Salt', amount: 'To taste' }
    ],
    instructions: [
      'Boil water in a heavy pot.',
      'Mix 1 cup maize meal with cold water to make a paste. Stir into boiling water.',
      'Cook for 10 minutes on medium heat.',
      'Gradually add remaining maize meal, stirring vigorously until very thick.',
      'Cover and steam on low heat for 5 minutes.',
      'For umfino: wash and chop wild greens.',
      'Pound peanuts into a coarse paste.',
      'Boil greens in salted water for 10 minutes. Drain excess water.',
      'Stir in peanut paste and cook for another 5 minutes.',
      'Serve isitshwala with umfino alongside.'
    ],
    tips: ['Wild amaranth or imifino gives the most authentic flavor', 'Peanuts add protein and a creamy richness to the greens'],
    culturalSignificance: 'Ndebele women traditionally prepared umfino from wild-harvested greens, a practice connected to their deep knowledge of local plants and seasons.',
    nutritionalInfo: { calories: '~350 kcal', protein: '14g', carbs: '50g', fat: '12g', fiber: '8g', notes: 'Wild greens are rich in iron, calcium, and vitamins A and C. Peanuts add healthy fats.' },
    dietaryInfo: ['Vegan', 'Gluten-free', 'High-fiber']
  },
  {
    id: 'domoda',
    name: 'Domoda',
    localName: 'Domoda / Tigadegena',
    tribeSlug: 'mandinka',
    tribeName: 'Mandinka',
    category: 'staple',
    description: 'The Mandinka groundnut stew — creamy, rich peanut sauce with meat and vegetables served over rice. One of the most beloved dishes across The Gambia and West Africa.',
    servings: 6,
    prepTime: '20 min',
    cookTime: '1 hour',
    difficulty: 'medium',
    youtubeVideoId: '',
    ingredients: [
      { item: 'Beef or chicken', amount: '500g' },
      { item: 'Smooth peanut butter', amount: '1 cup' },
      { item: 'Tomato paste', amount: '3 tbsp' },
      { item: 'Onion', amount: '2 large' },
      { item: 'Pumpkin or sweet potato', amount: '2 cups cubed' },
      { item: 'Habanero pepper', amount: '1 whole' },
      { item: 'Vegetable oil', amount: '3 tbsp' },
      { item: 'White rice', amount: '2 cups' },
      { item: 'Water', amount: '3 cups' },
      { item: 'Salt', amount: 'To taste' }
    ],
    instructions: [
      'Season meat with salt and brown in oil until golden. Set aside.',
      'Fry onions in the same pot until translucent.',
      'Add tomato paste and cook for 3 minutes.',
      'Dissolve peanut butter in 2 cups warm water. Add to pot.',
      'Return meat to pot. Add remaining water.',
      'Bring to a boil, then reduce to simmer for 30 minutes.',
      'Add pumpkin/sweet potato cubes and whole habanero (don\'t pierce it).',
      'Simmer for 20 more minutes until vegetables are tender.',
      'Cook rice separately. Remove habanero before serving.',
      'Serve domoda over white rice.'
    ],
    tips: ['Keep the habanero whole for flavor without too much heat', 'Use natural peanut butter for the most authentic taste', 'The stew should be thick and creamy, not watery'],
    culturalSignificance: 'Domoda is the most popular dish in The Gambia and a source of national pride. It represents Mandinka hospitality — always made in generous quantities to share.',
    nutritionalInfo: { calories: '~520 kcal', protein: '32g', carbs: '42g', fat: '26g', fiber: '5g', notes: 'Peanut butter provides healthy fats and protein. Sweet potato adds vitamins A and C.' },
    dietaryInfo: ['Gluten-free', 'High-protein']
  },
  {
    id: 'saka-saka',
    name: 'Saka-Saka',
    localName: 'Saka-Saka / Pondu',
    tribeSlug: 'bakongo',
    tribeName: 'Kongo',
    category: 'staple',
    description: 'The quintessential Kongo dish — cassava leaves pounded and slow-cooked with palm oil, dried fish, and peanuts. A staple across both Congos and Angola.',
    servings: 6,
    prepTime: '30 min',
    cookTime: '2 hours',
    difficulty: 'hard',
    youtubeVideoId: '',
    ingredients: [
      { item: 'Cassava leaves (fresh or frozen)', amount: '1 kg' },
      { item: 'Palm oil (red)', amount: '1/2 cup' },
      { item: 'Smoked fish or dried fish', amount: '200g' },
      { item: 'Raw peanut paste', amount: '1/2 cup' },
      { item: 'Onion', amount: '1 large' },
      { item: 'Garlic', amount: '3 cloves' },
      { item: 'Eggplant (small, African variety)', amount: '2' },
      { item: 'Salt', amount: 'To taste' },
      { item: 'Water', amount: '2 cups' }
    ],
    instructions: [
      'If using fresh cassava leaves, pound them in a mortar until very fine (or blend in food processor).',
      'Boil pounded cassava leaves in water for 30 minutes. Drain and squeeze out water.',
      'In a large pot, heat palm oil. Fry onions and garlic until fragrant.',
      'Add tomatoes and cook until soft.',
      'Add cassava leaves, smoked fish, and 2 cups water.',
      'Stir in peanut paste and diced eggplant.',
      'Simmer on low heat for 1.5 hours, stirring occasionally.',
      'Add salt to taste. The dish should be thick and rich.',
      'Serve with fufu (cassava dough) or rice.'
    ],
    tips: ['Frozen cassava leaves are a good substitute — available in African stores', 'The long cooking time is essential to remove bitterness from cassava leaves', 'Red palm oil gives the dish its characteristic color and flavor'],
    culturalSignificance: 'Saka-saka is the soul food of the Kongo people, eaten daily across both Congos and northern Angola. It represents connection to the land and ancestral foodways.',
    nutritionalInfo: { calories: '~380 kcal', protein: '22g', carbs: '18g', fat: '28g', fiber: '10g', notes: 'Cassava leaves are exceptionally rich in protein for a leaf vegetable. Palm oil provides vitamin A.' },
    dietaryInfo: ['Gluten-free', 'High-fiber', 'Dairy-free']
  }
];

recipes.push(...wave3Recipes);

// ============ TONGA (ZAMBIA) RECIPES ============
recipes.push({
  id: "kapenta-with-nshima",
  name: "Kapenta with Nshima",
  localName: "Kapenta a Nshima",
  tribeSlug: "tonga-zambia",
  tribeName: "Tonga",
  category: "staple",
  region: "southern",
  country: "ZM",
  description: "Tiny dried sardine-like fish fried with tomatoes and onions, served with thick maize porridge. The everyday meal of the Zambezi Valley.",
  culturalSignificance: "Kapenta fishing on Lake Kariba became the Tonga's new livelihood after their ancestral farmland was flooded by the dam. This dish represents resilience and adaptation.",
  historicalContext: "Kapenta (Limnothrissa miodon) was introduced to Lake Kariba from Lake Tanganyika in the 1960s and became a protein revolution for displaced Tonga communities.",
  prepTime: "10 minutes",
  cookTime: "30 minutes",
  servings: 4,
  difficulty: "easy",
  ingredients: [
    { item: "Dried kapenta fish", amount: "300g", notes: "Small dried sardines", substitution: "Dried anchovies or whitebait" },
    { item: "Mealie meal (maize flour)", amount: "4 cups", notes: "For nshima" },
    { item: "Tomatoes", amount: "3 medium", notes: "Diced" },
    { item: "Onion", amount: "1 large", notes: "Sliced" },
    { item: "Cooking oil", amount: "3 tbsp" },
    { item: "Salt", amount: "To taste" },
    { item: "Water", amount: "6 cups", notes: "For nshima" }
  ],
  instructions: [
    "Rinse kapenta in cold water to remove excess salt and sand. Drain well.",
    "Heat oil in a pan. Fry onions until golden.",
    "Add tomatoes and cook until soft and saucy (5 minutes).",
    "Add kapenta and stir gently. Cook for 10 minutes until crispy-tender.",
    "Season with salt. Set aside.",
    "For nshima: Boil 4 cups water. Mix 1 cup mealie meal with 2 cups cold water, pour into boiling water.",
    "Stir continuously. Gradually add remaining mealie meal, stirring vigorously until thick and smooth.",
    "Cover and cook on low heat for 5 minutes. Serve nshima with kapenta relish."
  ],
  tips: ["Don't over-wash the kapenta — some natural salt adds flavor", "Nshima should be firm enough to roll into balls", "Add green vegetables (rape or pumpkin leaves) as a side relish"],
  servingSuggestions: ["Chibwantu (fermented maize drink)", "Pumpkin leaf relish", "Fresh lemon wedges"],
  nutritionalInfo: { calories: "~450 kcal", protein: "28g", carbs: "55g", fat: "14g", fiber: "4g", notes: "Kapenta is an excellent source of calcium (eaten whole with bones) and omega-3 fatty acids." },
  dietaryInfo: ["Gluten-free", "High-protein", "Dairy-free", "High-calcium"]
});
// Auto-assign regions to recipes based on tribe patterns
const tribeToRegion: Record<string, { region: RecipeRegion; country: string }> = {
  // East Africa
  'kikuyu': { region: 'east', country: 'KE' },
  'luo': { region: 'east', country: 'KE' },
  'kamba': { region: 'east', country: 'KE' },
  'kalenjin': { region: 'east', country: 'KE' },
  'meru': { region: 'east', country: 'KE' },
  'embu': { region: 'east', country: 'KE' },
  'taita': { region: 'east', country: 'KE' },
  'teso': { region: 'east', country: 'KE' },
  'mijikenda': { region: 'east', country: 'KE' },
  'maasai': { region: 'east', country: 'KE' },
  'baganda': { region: 'east', country: 'UG' },
  'banyankole': { region: 'east', country: 'UG' },
  'acholi': { region: 'east', country: 'UG' },
  'chagga': { region: 'east', country: 'TZ' },
  'sukuma': { region: 'east', country: 'TZ' },
  'haya': { region: 'east', country: 'TZ' },
  'swahili': { region: 'east', country: 'TZ' },
  'banyarwanda': { region: 'east', country: 'RW' },
  // Horn of Africa
  'oromo': { region: 'horn', country: 'ET' },
  'amhara': { region: 'horn', country: 'ET' },
  'tigrinya': { region: 'horn', country: 'ER' },
  'afar': { region: 'horn', country: 'ET' },
  'somali': { region: 'horn', country: 'SO' },
  'mursi': { region: 'horn', country: 'ET' },
  'hamar': { region: 'horn', country: 'ET' },
  'karo': { region: 'horn', country: 'ET' },
  'nuer': { region: 'horn', country: 'SS' },
  'dinka': { region: 'horn', country: 'SS' },
  'shilluk': { region: 'horn', country: 'SS' },
  'kimbundu': { region: 'central', country: 'AO' },
  // West Africa
  'yoruba': { region: 'west', country: 'NG' },
  'igbo': { region: 'west', country: 'NG' },
  'hausa': { region: 'west', country: 'NG' },
  'fulani': { region: 'west', country: 'NG' },
  'akan': { region: 'west', country: 'GH' },
  'ashanti': { region: 'west', country: 'GH' },
  'ewe': { region: 'west', country: 'GH' },
  'wolof': { region: 'west', country: 'SN' },
  'mandinka': { region: 'west', country: 'SN' },
  'bambara': { region: 'west', country: 'ML' },
  'dogon': { region: 'west', country: 'ML' },
  'tuareg': { region: 'west', country: 'ML' },
  'songhai': { region: 'west', country: 'NE' },
  // Central Africa
  'luba': { region: 'central', country: 'CD' },
  'mongo': { region: 'central', country: 'CD' },
  'kongo': { region: 'central', country: 'CD' },
  'bakongo': { region: 'central', country: 'CD' },
  'fang': { region: 'central', country: 'GA' },
  'bamileke': { region: 'central', country: 'CM' },
  'gbaya': { region: 'central', country: 'CF' },
  'banda': { region: 'central', country: 'CF' },
  'sara': { region: 'central', country: 'TD' },
  'ovimbundu': { region: 'central', country: 'AO' },
  'chokwe': { region: 'central', country: 'AO' },
  'mbundu': { region: 'central', country: 'AO' },
  'lunda': { region: 'central', country: 'AO' },
  // Southern Africa
  'zulu': { region: 'southern', country: 'ZA' },
  'xhosa': { region: 'southern', country: 'ZA' },
  'sotho': { region: 'southern', country: 'ZA' },
  'tswana': { region: 'southern', country: 'BW' },
  'ndebele': { region: 'southern', country: 'ZA' },
  'shona': { region: 'southern', country: 'ZW' },
  'san': { region: 'southern', country: 'BW' },
  'himba': { region: 'southern', country: 'NA' },
  'herero': { region: 'southern', country: 'NA' },
  'basotho': { region: 'southern', country: 'LS' },
  'swazi': { region: 'southern', country: 'SZ' },
  'chewa': { region: 'southern', country: 'MW' },
  'makonde': { region: 'southern', country: 'MZ' },
  'yao': { region: 'southern', country: 'MW' },
  'lozi': { region: 'southern', country: 'ZM' },
  'ngoni': { region: 'southern', country: 'MW' },
  'tumbuka': { region: 'southern', country: 'MW' },
  // North Africa
  'amazigh': { region: 'north', country: 'MA' },
  'moroccan-arab': { region: 'north', country: 'MA' },
  'algerian-arab': { region: 'north', country: 'DZ' },
  'tunisian-arab': { region: 'north', country: 'TN' },
  'egyptian-arab': { region: 'north', country: 'EG' },
  'kabyle': { region: 'north', country: 'DZ' },
  'chaoui': { region: 'north', country: 'DZ' },
  'nubian': { region: 'north', country: 'SD' },
  'toubou': { region: 'north', country: 'TD' },
  // New tribes
  'senufo': { region: 'west', country: 'CI' },
  'bassa': { region: 'west', country: 'LR' },
  'bemba': { region: 'southern', country: 'ZM' },
  'ovambo': { region: 'southern', country: 'NA' },
  'ndebele-sa': { region: 'southern', country: 'ZA' },
  'tonga-zambia': { region: 'southern', country: 'ZM' }
};

// Apply region mappings to recipes that don't have them
recipes.forEach(recipe => {
  if (!recipe.region && tribeToRegion[recipe.tribeSlug]) {
    recipe.region = tribeToRegion[recipe.tribeSlug].region;
    recipe.country = tribeToRegion[recipe.tribeSlug].country;
  }
});

// Get similar recipes from other tribes (same category)
export const getSimilarRecipes = (recipeId: string, limit: number = 4): Recipe[] => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  return recipes
    .filter(r => r.id !== recipeId && r.tribeSlug !== recipe.tribeSlug && r.category === recipe.category)
    .slice(0, limit);
};
