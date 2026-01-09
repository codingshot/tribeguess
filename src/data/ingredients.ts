// Traditional African Ingredients Database
// Detailed information about staple foods, grains, and basic ingredients

export interface IngredientVariety {
  name: string;
  description: string;
  regions?: string[];
  characteristics?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  localNames: { tribe: string; name: string; tribeSlug: string }[];
  category: 'grain' | 'root' | 'legume' | 'vegetable' | 'spice' | 'beverage-base' | 'protein' | 'oil';
  description: string;
  culturalSignificance: string;
  nutritionalInfo: string;
  varieties: IngredientVariety[];
  preparation: string[];
  storage: string;
  seasonality?: string;
  healthBenefits: string[];
  culinaryUses: string[];
  tribesUsing: { tribeSlug: string; tribeName: string; usage: string }[];
  imageUrl?: string;
  sources: { name: string; url: string }[];
}

export const ingredients: Ingredient[] = [
  // ============ GRAINS ============
  {
    id: "rice",
    name: "Rice",
    localNames: [
      { tribe: "Swahili", name: "Wali / Mchele", tribeSlug: "swahili" },
      { tribe: "Yoruba", name: "Iresi", tribeSlug: "yoruba" },
      { tribe: "Hausa", name: "Shinkafa", tribeSlug: "hausa" },
      { tribe: "Wolof", name: "Céeb", tribeSlug: "wolof" },
      { tribe: "Amhara", name: "Ruz", tribeSlug: "amhara" }
    ],
    category: "grain",
    description: "Rice has been cultivated in Africa for over 3,000 years. African rice (Oryza glaberrima) originated in the Niger River delta, while Asian rice (Oryza sativa) was introduced through Arab and Portuguese trade routes.",
    culturalSignificance: "In West Africa, rice is the centerpiece of hospitality - no guest leaves without being offered rice. In Senegal, Thieboudienne (rice with fish) is the national dish. Along the Swahili coast, coconut rice (Wali wa Nazi) marks celebrations.",
    nutritionalInfo: "Rice provides 130 calories per 100g cooked, is a good source of carbohydrates and B vitamins. Brown rice retains fiber and nutrients removed from white rice.",
    varieties: [
      { 
        name: "Oryza glaberrima (African Rice)", 
        description: "Indigenous African rice, hardier and more drought-resistant than Asian varieties. Has a nuttier flavor and firmer texture.",
        regions: ["Senegal", "Mali", "Guinea", "Sierra Leone"],
        characteristics: "Red-brown color, shorter grain, distinct nutty taste"
      },
      { 
        name: "Long Grain White Rice", 
        description: "The most common variety across Africa today. Fluffy when cooked, grains remain separate.",
        regions: ["Throughout Africa"],
        characteristics: "Light, fluffy, neutral taste"
      },
      { 
        name: "Basmati Rice", 
        description: "Aromatic long-grain rice popular along the Swahili coast, introduced through Indian Ocean trade.",
        regions: ["Kenya", "Tanzania", "Uganda", "Ethiopia"],
        characteristics: "Aromatic, elongates when cooked, light texture"
      },
      { 
        name: "Jollof Rice Varieties", 
        description: "Parboiled rice preferred for Jollof - absorbs flavors better and maintains texture.",
        regions: ["Nigeria", "Ghana", "Senegal", "Cameroon"],
        characteristics: "Absorbs color and flavor, slightly sticky"
      },
      { 
        name: "Ofada Rice", 
        description: "Nigerian indigenous short-grain rice with distinctive aroma and brownish color. Considered a delicacy.",
        regions: ["Nigeria (Southwest)"],
        characteristics: "Aromatic, brownish, unpolished, strong flavor"
      }
    ],
    preparation: [
      "Wash rice thoroughly (2-3 times) until water runs clear",
      "Soak for 30 minutes for fluffier results",
      "Ratio: 1 part rice to 1.5-2 parts water depending on variety",
      "For Jollof: parboil first, then cook in tomato sauce",
      "For pilau: toast with spices before adding liquid"
    ],
    storage: "Store in airtight containers in cool, dry place. Lasts 6+ months. Check for weevils in humid climates.",
    healthBenefits: [
      "Quick energy source from complex carbohydrates",
      "Gluten-free, suitable for celiac patients",
      "Brown rice provides fiber and magnesium",
      "Easy to digest, good for recovery from illness"
    ],
    culinaryUses: [
      "Jollof Rice (West Africa)",
      "Wali wa Nazi - Coconut Rice (East Africa)",
      "Pilau/Pilaf with spices",
      "Porridge for infants",
      "Rice flour for baking"
    ],
    tribesUsing: [
      { tribeSlug: "swahili", tribeName: "Swahili", usage: "Wali wa Nazi (coconut rice), Biriani, Pilau for celebrations" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Jollof rice, Ofada rice with sauce" },
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Shinkafa with miyan kuka (baobab soup)" },
      { tribeSlug: "wolof", tribeName: "Wolof", usage: "Thieboudienne (fish and rice), Ceebu Jen" },
      { tribeSlug: "mandinka", tribeName: "Mandinka", usage: "Benachin (one-pot rice dish)" }
    ],
    sources: [
      { name: "African Rice - Wikipedia", url: "https://en.wikipedia.org/wiki/Oryza_glaberrima" },
      { name: "FAO - Rice in Africa", url: "https://www.fao.org/3/y4751e/y4751e08.htm" }
    ]
  },
  {
    id: "millet",
    name: "Millet",
    localNames: [
      { tribe: "Kikuyu", name: "Mwere", tribeSlug: "kikuyu" },
      { tribe: "Hausa", name: "Gero", tribeSlug: "hausa" },
      { tribe: "Yoruba", name: "Oka-baba", tribeSlug: "yoruba" },
      { tribe: "Maasai", name: "Ol-mang'a", tribeSlug: "maasai" },
      { tribe: "Tswana", name: "Mabele", tribeSlug: "tswana" },
      { tribe: "Amhara", name: "Teff (related)", tribeSlug: "amhara" }
    ],
    category: "grain",
    description: "One of the oldest cultivated grains in Africa, domesticated in the Sahel region over 5,000 years ago. Millet is drought-resistant and thrives in poor soils where other crops fail, making it crucial for food security.",
    culturalSignificance: "Millet is sacred in many African cultures. Among the Dogon of Mali, millet cultivation is tied to religious ceremonies. In East Africa, millet porridge is the traditional weaning food. Millet beer (like pombe) plays central roles in ceremonies.",
    nutritionalInfo: "Per 100g: 378 calories, 11g protein, 8.5g fiber. Rich in B vitamins, iron, magnesium, and antioxidants. Higher nutritional value than rice or corn.",
    varieties: [
      { 
        name: "Pearl Millet (Pennisetum glaucum)", 
        description: "The most widely grown millet in Africa. Tall plants with large grain heads. Primary grain in Sahel and East Africa.",
        regions: ["Sahel", "Nigeria", "Niger", "Mali", "Sudan", "East Africa"],
        characteristics: "Large round grains, mild flavor, versatile"
      },
      { 
        name: "Finger Millet (Eleusine coracana)", 
        description: "Red-brown millet especially important in East Africa. High calcium content. Called 'ragi' in India.",
        regions: ["Uganda", "Ethiopia", "Kenya", "Tanzania", "Malawi"],
        characteristics: "Small red-brown grains, high calcium, slightly bitter"
      },
      { 
        name: "Teff (Eragrostis tef)", 
        description: "Tiny grain unique to Ethiopia, used for injera. Highest protein content of any millet.",
        regions: ["Ethiopia", "Eritrea"],
        characteristics: "Extremely small grains, brown or white, nutty flavor"
      },
      { 
        name: "Fonio (Digitaria exilis)", 
        description: "Ancient 'hungry rice' of West Africa. Quick-growing, drought-resistant, and highly nutritious.",
        regions: ["Guinea", "Mali", "Burkina Faso", "Nigeria"],
        characteristics: "Tiny grains, cooks quickly, mild couscous-like texture"
      },
      { 
        name: "Sorghum (related grain)", 
        description: "Though technically separate, sorghum is often grouped with millets. Major grain in Sudan and southern Africa.",
        regions: ["Sudan", "Ethiopia", "Nigeria", "South Africa"],
        characteristics: "Larger grains, varies white to red, versatile"
      }
    ],
    preparation: [
      "Toast lightly in dry pan to enhance nutty flavor",
      "Grind for porridge (uji, ogi, or akamu)",
      "Ferment for traditional beers and beverages",
      "Cook whole like rice (2:1 water ratio)",
      "Make flour for flatbreads and injera"
    ],
    storage: "Store in cool, dry place in airtight containers. Whole millet lasts 2+ years. Ground millet/flour should be used within months.",
    seasonality: "Planted at start of rains, harvested after 90-120 days. In Sahel, harvested September-November.",
    healthBenefits: [
      "Gluten-free (except fonio - naturally low gluten)",
      "Low glycemic index - good for diabetics",
      "High iron content prevents anemia",
      "Fiber supports digestive health",
      "Magnesium supports heart health"
    ],
    culinaryUses: [
      "Uji/Porridge (East Africa)",
      "Injera flatbread (Ethiopia - teff)",
      "Tuwo (thick porridge, Nigeria)",
      "Traditional beers (pombe, bili-bili, tchapalo)",
      "Millet couscous (Senegal, Mali)"
    ],
    tribesUsing: [
      { tribeSlug: "kikuyu", tribeName: "Kikuyu", usage: "Mwere - traditional porridge before maize replaced it" },
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Fura da nono (millet balls with fermented milk), Tuwo" },
      { tribeSlug: "maasai", tribeName: "Maasai", usage: "Traded for millet to make porridge and beer" },
      { tribeSlug: "amhara", tribeName: "Amhara", usage: "Teff for injera - daily staple bread" },
      { tribeSlug: "dogon", tribeName: "Dogon", usage: "Sacred grain central to religion and diet" }
    ],
    sources: [
      { name: "Millet - Wikipedia", url: "https://en.wikipedia.org/wiki/Millet" },
      { name: "ICRISAT - Pearl Millet", url: "https://www.icrisat.org/pearl-millet/" }
    ]
  },
  {
    id: "sorghum",
    name: "Sorghum",
    localNames: [
      { tribe: "Hausa", name: "Dawa", tribeSlug: "hausa" },
      { tribe: "Zulu", name: "Amabele", tribeSlug: "zulu" },
      { tribe: "Amhara", name: "Zengada", tribeSlug: "amhara" },
      { tribe: "Dinka", name: "Rap", tribeSlug: "dinka" },
      { tribe: "Luo", name: "Bel", tribeSlug: "luo" }
    ],
    category: "grain",
    description: "The fifth most important cereal globally, sorghum was domesticated in Sudan/Ethiopia around 5,000 years ago. It's the dietary staple for 500+ million people in Africa and Asia.",
    culturalSignificance: "In Sudan, sorghum is life itself - kisra (sorghum flatbread) accompanies every meal. Sorghum beer is sacred in southern Africa, used in ancestor ceremonies. The grain's ability to survive drought makes it a symbol of resilience.",
    nutritionalInfo: "Per 100g: 329 calories, 10.6g protein, 6.7g fiber. Rich in B vitamins, iron, and antioxidants. Contains tannins that may reduce nutrient absorption but also provide health benefits.",
    varieties: [
      { 
        name: "White Sorghum", 
        description: "Mild-flavored variety preferred for porridges and bread. Lower tannin content.",
        regions: ["Sudan", "Ethiopia", "Nigeria"],
        characteristics: "Light color, mild taste, good for bread"
      },
      { 
        name: "Red/Brown Sorghum", 
        description: "Higher in tannins and antioxidants. Preferred for traditional beers.",
        regions: ["South Africa", "Botswana", "Zimbabwe"],
        characteristics: "Darker color, more robust flavor, higher antioxidants"
      },
      { 
        name: "Sweet Sorghum", 
        description: "Stalks contain sweet juice used for syrup and fresh consumption.",
        regions: ["West Africa", "East Africa"],
        characteristics: "Sweet stalks, used like sugar cane"
      }
    ],
    preparation: [
      "Grind into flour for porridge, bread, and fermented foods",
      "Soak and germinate for malting (beer production)",
      "Cook whole grains like rice",
      "Ferment for traditional beers",
      "Pop like popcorn for snacks"
    ],
    storage: "Whole grain stores 2+ years in dry conditions. Flour should be used within months.",
    healthBenefits: [
      "Gluten-free cereal",
      "Rich in antioxidants (especially red varieties)",
      "Supports digestive health",
      "Low glycemic index",
      "May reduce cholesterol"
    ],
    culinaryUses: [
      "Kisra (Sudanese flatbread)",
      "Thick porridges (ugali-style)",
      "Traditional beers (umqombothi, pombe)",
      "Couscous substitutes",
      "Popped sorghum snacks"
    ],
    tribesUsing: [
      { tribeSlug: "dinka", tribeName: "Dinka", usage: "Primary grain for porridge and beer" },
      { tribeSlug: "zulu", tribeName: "Zulu", usage: "Umqombothi (traditional beer) for ceremonies" },
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Tuwo dawa (sorghum fufu), Kunu drink" }
    ],
    sources: [
      { name: "Sorghum - Wikipedia", url: "https://en.wikipedia.org/wiki/Sorghum" },
      { name: "ICRISAT - Sorghum", url: "https://www.icrisat.org/sorghum/" }
    ]
  },
  {
    id: "ginger",
    name: "Ginger",
    localNames: [
      { tribe: "Yoruba", name: "Ata-ile", tribeSlug: "yoruba" },
      { tribe: "Hausa", name: "Citta", tribeSlug: "hausa" },
      { tribe: "Swahili", name: "Tangawizi", tribeSlug: "swahili" },
      { tribe: "Amhara", name: "Zinjibil", tribeSlug: "amhara" }
    ],
    category: "spice",
    description: "While not native to Africa, ginger has been traded across the continent for over 2,000 years via Arab trade routes. It's now widely cultivated in Nigeria (world's 3rd largest producer), Ethiopia, and other regions.",
    culturalSignificance: "Ginger is valued both as medicine and flavoring. In Nigeria, ginger juice (known as 'zobo booster') is sold everywhere. In East Africa, ginger tea is a hospitality tradition. Traditional healers use it for digestive and respiratory ailments.",
    nutritionalInfo: "Per 100g fresh: 80 calories, 1.8g protein. Contains gingerol (active compound), vitamin C, potassium, and manganese.",
    varieties: [
      { 
        name: "Nigerian Yellow Ginger", 
        description: "Bright yellow flesh, very pungent. Nigeria's premium export variety.",
        regions: ["Nigeria (Kaduna State)"],
        characteristics: "Intense heat, bright color, high oil content"
      },
      { 
        name: "Common/White Ginger", 
        description: "Milder variety widely cultivated across Africa.",
        regions: ["Throughout Africa"],
        characteristics: "Milder heat, versatile culinary use"
      }
    ],
    preparation: [
      "Fresh: peel and grate, mince, or slice",
      "Juice: blend with water and strain",
      "Dry: slice thin and sun-dry, or grind to powder",
      "Preserve: pickle in vinegar or honey"
    ],
    storage: "Fresh ginger: 3 weeks refrigerated. Dried ginger: 2-3 years in airtight container.",
    healthBenefits: [
      "Reduces nausea and morning sickness",
      "Anti-inflammatory properties",
      "Aids digestion",
      "May reduce muscle pain",
      "Supports immune function"
    ],
    culinaryUses: [
      "Ginger juice/drink (Nigeria)",
      "Tangawizi tea (East Africa)",
      "Seasoning for stews and soups",
      "Ginger beer brewing",
      "Medicinal teas"
    ],
    tribesUsing: [
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Zobo drink enhancement, medicinal teas" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Ginger juice, stew seasoning" },
      { tribeSlug: "swahili", tribeName: "Swahili", usage: "Chai ya tangawizi (ginger tea), pilau seasoning" }
    ],
    sources: [
      { name: "Ginger - Wikipedia", url: "https://en.wikipedia.org/wiki/Ginger" },
      { name: "Nigeria Ginger Industry", url: "https://www.fao.org/nigeria/resources" }
    ]
  },
  {
    id: "cassava",
    name: "Cassava (Manioc)",
    localNames: [
      { tribe: "Yoruba", name: "Ege", tribeSlug: "yoruba" },
      { tribe: "Hausa", name: "Rogo", tribeSlug: "hausa" },
      { tribe: "Kikuyu", name: "Mwanga", tribeSlug: "kikuyu" },
      { tribe: "Swahili", name: "Muhogo", tribeSlug: "swahili" },
      { tribe: "Kongo", name: "Manioka", tribeSlug: "kongo" }
    ],
    category: "root",
    description: "Introduced from South America by Portuguese traders in the 16th century, cassava became one of Africa's most important food crops. It's drought-tolerant, high-yielding, and provides calories for 800+ million Africans.",
    culturalSignificance: "Cassava is the 'famine crop' - it survives when other crops fail. In Nigeria, it's processed into dozens of products. In Central Africa, fufu made from cassava is the centerpiece of meals. The plant's resilience symbolizes African survival.",
    nutritionalInfo: "Per 100g: 160 calories, 1.4g protein, 38g carbohydrates. Low in nutrients but high in energy. Must be processed properly to remove cyanogenic compounds.",
    varieties: [
      { 
        name: "Sweet Cassava", 
        description: "Lower cyanide content, can be eaten after simple cooking.",
        regions: ["Throughout Africa"],
        characteristics: "Lower toxicity, used fresh"
      },
      { 
        name: "Bitter Cassava", 
        description: "Higher yield but requires extensive processing to remove toxins.",
        regions: ["West and Central Africa"],
        characteristics: "Higher yield, requires fermentation/drying"
      }
    ],
    preparation: [
      "Peel thoroughly (skin contains toxins)",
      "Soak and ferment for gari, fufu",
      "Boil or fry fresh cassava",
      "Dry and grind into flour",
      "Grate and dry for tapioca"
    ],
    storage: "Fresh: only 2-3 days. Dried products (gari, flour): 6+ months in dry conditions.",
    healthBenefits: [
      "Excellent energy source",
      "Gluten-free flour alternative",
      "Supports digestive health (resistant starch)",
      "Leaves are nutritious vegetable"
    ],
    culinaryUses: [
      "Gari (fermented granules, Nigeria)",
      "Fufu/Ugali (pounded/cooked paste)",
      "Fried cassava chips",
      "Cassava flour for baking",
      "Tapioca pearls"
    ],
    tribesUsing: [
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Gari, Eba (gari fufu), Lafun" },
      { tribeSlug: "kongo", tribeName: "Kongo", usage: "Chikwangue (fermented bread), Fufu" },
      { tribeSlug: "kikuyu", tribeName: "Kikuyu", usage: "Boiled cassava, occasional flour" }
    ],
    sources: [
      { name: "Cassava - Wikipedia", url: "https://en.wikipedia.org/wiki/Cassava" },
      { name: "IITA - Cassava", url: "https://www.iita.org/cropsnew/cassava/" }
    ]
  },
  {
    id: "palm-oil",
    name: "Palm Oil (Red Palm Oil)",
    localNames: [
      { tribe: "Yoruba", name: "Epo pupa", tribeSlug: "yoruba" },
      { tribe: "Igbo", name: "Mmanu nkwu", tribeSlug: "igbo" },
      { tribe: "Kongo", name: "Mafuta ya mbila", tribeSlug: "kongo" }
    ],
    category: "oil",
    description: "Extracted from the fruit of the African oil palm (Elaeis guineensis), palm oil has been used in Africa for 5,000+ years. West Africa is its origin point, and the oil is fundamental to cuisines across the continent.",
    culturalSignificance: "Red palm oil is sacred in West African culture - used in rituals, offerings to Orishas, and as medicine. Its distinctive red-orange color defines Nigerian, Ghanaian, and Congolese cuisines. Palm wine from the tree is ceremonially important.",
    nutritionalInfo: "Per 100g: 884 calories. World's richest source of vitamin A (carotenoids), vitamin E. High in saturated fats (50%) but unrefined versions retain nutrients.",
    varieties: [
      { 
        name: "Unrefined Red Palm Oil", 
        description: "Traditional extracted oil with full color and nutrients.",
        regions: ["West and Central Africa"],
        characteristics: "Red-orange color, distinct flavor, high nutrients"
      },
      { 
        name: "Palm Kernel Oil", 
        description: "Extracted from the seed, lighter colored and different composition.",
        regions: ["Throughout palm regions"],
        characteristics: "Lighter color, different fatty acid profile"
      }
    ],
    preparation: [
      "Traditional: boil palm fruit, pound, extract oil",
      "Use unrefined for authentic African dishes",
      "Don't overheat - loses nutrients and color",
      "Store away from light to preserve vitamins"
    ],
    storage: "Unrefined: 6-12 months in cool, dark place. Refrigeration extends life.",
    healthBenefits: [
      "Richest source of beta-carotene",
      "High in vitamin E (tocotrienols)",
      "Traditionally used for wound healing",
      "Supports eye health"
    ],
    culinaryUses: [
      "Jollof rice base",
      "Egusi soup (Nigeria)",
      "Palm nut soup (Ghana)",
      "Red stews throughout West Africa",
      "Frying medium"
    ],
    tribesUsing: [
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Essential for all traditional soups and stews" },
      { tribeSlug: "igbo", tribeName: "Igbo", usage: "Ofe akwu (palm nut soup), frying" },
      { tribeSlug: "kongo", tribeName: "Kongo", usage: "Moambe sauce base" }
    ],
    sources: [
      { name: "Palm Oil - Wikipedia", url: "https://en.wikipedia.org/wiki/Palm_oil" },
      { name: "African Oil Palm", url: "https://en.wikipedia.org/wiki/Elaeis_guineensis" }
    ]
  },
  {
    id: "plantain",
    name: "Plantain",
    localNames: [
      { tribe: "Yoruba", name: "Ọ̀gẹ̀dẹ̀ agbagba", tribeSlug: "yoruba" },
      { tribe: "Igbo", name: "Ogede", tribeSlug: "igbo" },
      { tribe: "Swahili", name: "Ndizi ya kupika", tribeSlug: "swahili" },
      { tribe: "Akan", name: "Borɔde", tribeSlug: "ashanti" },
      { tribe: "Kongo", name: "Makemba", tribeSlug: "kongo" }
    ],
    category: "root",
    description: "A starchy cooking banana that must be cooked before eating. Plantains came to Africa from Southeast Asia over 2,500 years ago and became a dietary staple across Central and West Africa.",
    culturalSignificance: "Plantains are called 'the lazy man's crop' because they produce year-round with minimal care. In Uganda, matooke (cooking banana) is so central that 'eating' literally means 'eating matooke.' Dodo (fried plantain) is a beloved Nigerian comfort food.",
    nutritionalInfo: "Per 100g: 122 calories, 1.3g protein, 32g carbohydrates. Rich in potassium, vitamin A (especially when ripe), vitamin C, and fiber.",
    varieties: [
      { 
        name: "Green Plantain (Unripe)", 
        description: "Starchy and firm, used for savory dishes. Similar to potatoes in cooking.",
        regions: ["Throughout Africa"],
        characteristics: "Firm, starchy, savory flavor"
      },
      { 
        name: "Yellow Plantain (Ripe)", 
        description: "Sweeter and softer. Perfect for frying as dodo or kelewele.",
        regions: ["Throughout Africa"],
        characteristics: "Sweet, soft, caramelizes when fried"
      },
      { 
        name: "Black Plantain (Overripe)", 
        description: "Very sweet, almost like dessert. Used in some sweet dishes.",
        regions: ["Throughout Africa"],
        characteristics: "Very sweet, soft, dessert uses"
      },
      { 
        name: "Matooke/East African Highland Banana", 
        description: "Smaller cooking bananas specific to Uganda and Rwanda. Cooked green and mashed.",
        regions: ["Uganda", "Rwanda", "Burundi", "Tanzania"],
        characteristics: "Smaller, always cooked green, staple starch"
      }
    ],
    preparation: [
      "Green: boil, fry, or roast like potatoes",
      "Yellow/ripe: slice and fry for dodo/kelewele",
      "Matooke: steam in banana leaves, mash",
      "Chips: slice thin and deep fry",
      "Flour: dry and grind for baking"
    ],
    storage: "Store at room temperature. Green last 1-2 weeks. Once ripe, use within days or refrigerate (skin darkens but flesh stays good).",
    healthBenefits: [
      "High potassium for heart health",
      "Good source of resistant starch (when green)",
      "Vitamin A increases as ripeness increases",
      "Fiber supports digestive health"
    ],
    culinaryUses: [
      "Dodo (Nigerian fried plantain)",
      "Kelewele (Ghanaian spiced fried plantain)",
      "Matooke (Ugandan mashed plantain)",
      "Plantain chips",
      "Boiled plantain with stews"
    ],
    tribesUsing: [
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Dodo (fried), with beans and rice" },
      { tribeSlug: "baganda", tribeName: "Baganda", usage: "Matooke is the national staple food" },
      { tribeSlug: "ashanti", tribeName: "Ashanti", usage: "Kelewele (spiced fried plantain)" },
      { tribeSlug: "kongo", tribeName: "Kongo", usage: "Makemba with moambe sauce" }
    ],
    sources: [
      { name: "Plantain - Wikipedia", url: "https://en.wikipedia.org/wiki/Cooking_plantain" },
      { name: "Matooke - Uganda", url: "https://en.wikipedia.org/wiki/Matoke" }
    ]
  },
  {
    id: "yam",
    name: "Yam",
    localNames: [
      { tribe: "Yoruba", name: "Isu", tribeSlug: "yoruba" },
      { tribe: "Igbo", name: "Ji", tribeSlug: "igbo" },
      { tribe: "Hausa", name: "Doya", tribeSlug: "hausa" },
      { tribe: "Akan", name: "Bayerɛ", tribeSlug: "ashanti" },
      { tribe: "Ewe", name: "Ete", tribeSlug: "ewe" }
    ],
    category: "root",
    description: "True yams (Dioscorea species) are native to Africa and Asia. Nigeria produces 70% of the world's yams. Not to be confused with American 'yams' which are actually sweet potatoes.",
    culturalSignificance: "Yam is sacred in Igbo culture - the New Yam Festival (Iri Ji) celebrates the harvest. Among the Ashanti, yams symbolize masculinity and wealth. Yam tubers can weigh over 60kg and are status symbols at festivals.",
    nutritionalInfo: "Per 100g: 118 calories, 1.5g protein, 28g carbohydrates. Good source of potassium, vitamin C, B vitamins, and manganese.",
    varieties: [
      { 
        name: "White Yam (Dioscorea rotundata)", 
        description: "Most popular in West Africa. White flesh, starchy, versatile.",
        regions: ["Nigeria", "Ghana", "Côte d'Ivoire", "Benin"],
        characteristics: "White flesh, firm, starchy"
      },
      { 
        name: "Water Yam (Dioscorea alata)", 
        description: "Purple skin with white to purple flesh. Smooth texture when cooked.",
        regions: ["Throughout Africa"],
        characteristics: "Purple skin, smooth texture"
      },
      { 
        name: "Yellow Yam (Dioscorea cayenensis)", 
        description: "Yellow flesh with firmer texture. Sweeter taste.",
        regions: ["West Africa"],
        characteristics: "Yellow flesh, sweeter, firmer"
      },
      { 
        name: "Bitter Yam (Dioscorea dumetorum)", 
        description: "Requires extensive processing to remove toxins. Used medicinally.",
        regions: ["West and Central Africa"],
        characteristics: "Bitter, requires processing, medicinal"
      },
      { 
        name: "Pona/Labreko (Premium varieties)", 
        description: "High-quality varieties in Ghana prized for pounded yam.",
        regions: ["Ghana"],
        characteristics: "Premium, excellent for fufu"
      }
    ],
    preparation: [
      "Peel (thick rough skin) and cut into chunks",
      "Boil until tender (20-30 minutes)",
      "Pound for fufu (traditional mortar and pestle)",
      "Fry as chips or fritters (ojojo)",
      "Roast directly over fire (boli)"
    ],
    storage: "Store in cool, dry, dark place. Lasts 2-4 months. Don't refrigerate - damages texture.",
    seasonality: "Harvested July-October. New Yam Festivals held August-September.",
    healthBenefits: [
      "Complex carbohydrates for sustained energy",
      "Diosgenin compound used in medicine",
      "Potassium supports blood pressure",
      "Antioxidants in purple varieties"
    ],
    culinaryUses: [
      "Pounded Yam (Iyan) - the king of Nigerian fufu",
      "Amala (yam flour fufu)",
      "Yam pottage/porridge",
      "Fried yam with egg sauce",
      "Yam chips and fritters"
    ],
    tribesUsing: [
      { tribeSlug: "igbo", tribeName: "Igbo", usage: "Ji (yam) is sacred - New Yam Festival" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Iyan (pounded yam), Asaro (yam pottage)" },
      { tribeSlug: "ashanti", tribeName: "Ashanti", usage: "Fufu, Oto (mashed yam with eggs)" },
      { tribeSlug: "ewe", tribeName: "Ewe", usage: "Dzenkple (yam balls), Akple accompaniment" }
    ],
    sources: [
      { name: "Yam (vegetable) - Wikipedia", url: "https://en.wikipedia.org/wiki/Yam_(vegetable)" },
      { name: "IITA - Yam", url: "https://www.iita.org/cropsnew/yam/" }
    ]
  },
  {
    id: "groundnuts",
    name: "Groundnuts (Peanuts)",
    localNames: [
      { tribe: "Hausa", name: "Gyada", tribeSlug: "hausa" },
      { tribe: "Yoruba", name: "Epa", tribeSlug: "yoruba" },
      { tribe: "Swahili", name: "Karanga", tribeSlug: "swahili" },
      { tribe: "Wolof", name: "Gerte", tribeSlug: "wolof" },
      { tribe: "Mandinka", name: "Tio", tribeSlug: "mandinka" }
    ],
    category: "legume",
    description: "Though originating in South America, groundnuts arrived in Africa with the Portuguese in the 16th century and became integral to African cuisines. Senegal and Nigeria are major producers.",
    culturalSignificance: "In Senegal, groundnut is everything - Mafé (groundnut stew) is the national dish, and groundnut oil is the primary cooking fat. Kuli-kuli (groundnut snacks) are beloved across West Africa. The crop transformed Sahelian agriculture and trade.",
    nutritionalInfo: "Per 100g: 567 calories, 26g protein, 16g carbohydrates, 49g fat. Excellent source of protein, healthy fats, vitamin E, B vitamins, and minerals.",
    varieties: [
      { 
        name: "Virginia (Large)", 
        description: "Large kernels, often roasted and eaten as snacks.",
        regions: ["Nigeria", "Senegal"],
        characteristics: "Large, crunchy, good for roasting"
      },
      { 
        name: "Spanish (Small)", 
        description: "Small kernels with red skins. High oil content for pressing.",
        regions: ["Throughout Africa"],
        characteristics: "Small, high oil, red skin"
      },
      { 
        name: "Valencia", 
        description: "Three or more kernels per pod. Sweet flavor.",
        regions: ["Sudan", "Malawi"],
        characteristics: "Multiple kernels, sweet"
      }
    ],
    preparation: [
      "Roast in shell or shelled for snacking",
      "Grind into paste/butter",
      "Press for groundnut oil",
      "Boil for soups and stews",
      "Make kuli-kuli (spiced fried groundnut cake)"
    ],
    storage: "In shell: 6+ months in cool, dry place. Shelled/paste: refrigerate 3-6 months. Watch for aflatoxin in humid conditions.",
    healthBenefits: [
      "Complete plant protein source",
      "Heart-healthy monounsaturated fats",
      "High in antioxidant resveratrol",
      "Supports blood sugar control",
      "Rich in folate for pregnancy"
    ],
    culinaryUses: [
      "Mafé/Maafe (groundnut stew)",
      "Groundnut soup (West Africa)",
      "Kuli-kuli (fried groundnut snack)",
      "Groundnut oil for cooking",
      "Roasted groundnuts (street snack)"
    ],
    tribesUsing: [
      { tribeSlug: "wolof", tribeName: "Wolof", usage: "Mafé is the national dish of Senegal" },
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Kuli-kuli, groundnut oil, Miyan gyada (soup)" },
      { tribeSlug: "mandinka", tribeName: "Mandinka", usage: "Domoda (groundnut stew), snacks" },
      { tribeSlug: "ashanti", tribeName: "Ashanti", usage: "Nkate nkwan (groundnut soup)" }
    ],
    sources: [
      { name: "Peanut - Wikipedia", url: "https://en.wikipedia.org/wiki/Peanut" },
      { name: "ICRISAT - Groundnut", url: "https://www.icrisat.org/groundnut/" }
    ]
  },
  {
    id: "hibiscus",
    name: "Hibiscus (Zobo/Bissap)",
    localNames: [
      { tribe: "Hausa", name: "Zobo", tribeSlug: "hausa" },
      { tribe: "Yoruba", name: "Isapa", tribeSlug: "yoruba" },
      { tribe: "Wolof", name: "Bissap", tribeSlug: "wolof" },
      { tribe: "Swahili", name: "Chai ya Hibiscus", tribeSlug: "swahili" },
      { tribe: "Amhara", name: "Karkade", tribeSlug: "amhara" }
    ],
    category: "beverage-base",
    description: "Hibiscus sabdariffa (Roselle) produces the deep red calyces used for Africa's most popular herbal beverage. Native to West Africa, it spread to Egypt, Sudan, and globally.",
    culturalSignificance: "Zobo/Bissap is the quintessential African refreshment - served at celebrations, sold on streets, and made in every home. In Senegal, bissap (with its purple-red color) is the national drink. In Sudan, karkade is traditional hospitality.",
    nutritionalInfo: "Per 100g dried calyces: 49 calories. Very high in vitamin C, antioxidants (anthocyanins), and organic acids. Naturally caffeine-free.",
    varieties: [
      { 
        name: "Dark Red Variety", 
        description: "Deepest color and flavor. Preferred for beverages.",
        regions: ["Nigeria", "Senegal", "Sudan"],
        characteristics: "Deep burgundy, tangy, intense"
      },
      { 
        name: "Light Red/Pink Variety", 
        description: "Milder flavor, lighter color.",
        regions: ["Throughout Africa"],
        characteristics: "Lighter, milder taste"
      }
    ],
    preparation: [
      "Boil dried calyces in water (10-15 minutes)",
      "Strain and sweeten with sugar or honey",
      "Add ginger, pineapple, or citrus for flavor",
      "Serve cold (most popular) or hot",
      "Ferment slightly for tangier flavor"
    ],
    storage: "Dried calyces: 1-2 years in airtight container. Made drink: refrigerate 3-5 days.",
    healthBenefits: [
      "Lowers blood pressure (clinically proven)",
      "Very high in antioxidants",
      "Supports liver health",
      "May aid weight management",
      "Naturally caffeine-free"
    ],
    culinaryUses: [
      "Zobo drink (Nigeria)",
      "Bissap (Senegal)",
      "Karkade (Sudan, Egypt)",
      "Hibiscus jam and jellies",
      "Leaves used as vegetable (ewedu-style)"
    ],
    tribesUsing: [
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Zobo drink with ginger and spices" },
      { tribeSlug: "wolof", tribeName: "Wolof", usage: "Bissap rouge - national drink" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Zobo with pineapple and ginger" },
      { tribeSlug: "amhara", tribeName: "Amhara", usage: "Karkade tea, often served at ceremonies" }
    ],
    sources: [
      { name: "Hibiscus sabdariffa - Wikipedia", url: "https://en.wikipedia.org/wiki/Hibiscus_sabdariffa" },
      { name: "Zobo drink", url: "https://en.wikipedia.org/wiki/Hibiscus_tea" }
    ]
  },
  {
    id: "baobab",
    name: "Baobab",
    localNames: [
      { tribe: "Wolof", name: "Buy", tribeSlug: "wolof" },
      { tribe: "Hausa", name: "Kuka", tribeSlug: "hausa" },
      { tribe: "Swahili", name: "Mbuyu", tribeSlug: "swahili" },
      { tribe: "Shona", name: "Muuyu", tribeSlug: "shona" },
      { tribe: "Maasai", name: "Osupetai", tribeSlug: "maasai" }
    ],
    category: "vegetable",
    description: "The 'Tree of Life' produces nutritious fruit, leaves, and seeds. Baobabs can live 2,000+ years and are central to African landscapes and cultures. Every part of the tree is used.",
    culturalSignificance: "Baobabs are sacred across Africa - believed to house spirits, used for burial of griots, and central to oral traditions. The Dogon believe the first baobab was planted upside down by God. The fruit is called 'monkey bread' or 'cream of tartar tree.'",
    nutritionalInfo: "Per 100g powder: 280 calories. 6x more vitamin C than oranges, 2x more calcium than milk. Rich in fiber, potassium, magnesium, and antioxidants.",
    varieties: [
      { 
        name: "Adansonia digitata (African Baobab)", 
        description: "The species across mainland Africa. Produces the edible fruit powder.",
        regions: ["Sahel to Southern Africa"],
        characteristics: "Large fruit, powdery pulp, edible leaves"
      },
      { 
        name: "Fruit Pulp/Powder", 
        description: "The dry, tangy powder inside the fruit. Main commercial product.",
        regions: ["Throughout Africa"],
        characteristics: "Tangy, powdery, nutritious"
      },
      { 
        name: "Baobab Leaves", 
        description: "Young leaves are cooked as vegetable or dried as powder for soups.",
        regions: ["West Africa especially"],
        characteristics: "Nutritious, slightly mucilaginous"
      }
    ],
    preparation: [
      "Dissolve powder in water for drink",
      "Add powder to porridge and smoothies",
      "Cook leaves as vegetable",
      "Press seeds for oil",
      "Use in baking as nutritional boost"
    ],
    storage: "Dried powder: 2+ years in cool, dry place. Fresh leaves: use within days.",
    healthBenefits: [
      "Exceptionally high in vitamin C",
      "Prebiotic fiber for gut health",
      "Helps regulate blood sugar",
      "High antioxidant content",
      "Natural electrolyte source"
    ],
    culinaryUses: [
      "Miyan kuka (baobab leaf soup, Nigeria)",
      "Bouye (baobab drink, Senegal)",
      "Mabuyu (candy-coated seeds, East Africa)",
      "Smoothie and porridge additive",
      "Traditional medicines"
    ],
    tribesUsing: [
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Miyan kuka (soup), medicinal uses" },
      { tribeSlug: "wolof", tribeName: "Wolof", usage: "Bouye drink (baobab juice)" },
      { tribeSlug: "swahili", tribeName: "Swahili", usage: "Ubuyu (candy-coated seeds snack)" },
      { tribeSlug: "maasai", tribeName: "Maasai", usage: "Medicinal uses, bark for rope" }
    ],
    sources: [
      { name: "Adansonia - Wikipedia", url: "https://en.wikipedia.org/wiki/Adansonia" },
      { name: "Baobab superfruit", url: "https://en.wikipedia.org/wiki/Adansonia_digitata" }
    ]
  },
  {
    id: "shea-butter",
    name: "Shea Butter (Karité)",
    localNames: [
      { tribe: "Hausa", name: "Man shanu / Kadanya", tribeSlug: "hausa" },
      { tribe: "Yoruba", name: "Ori", tribeSlug: "yoruba" },
      { tribe: "Bambara", name: "Sii / Shi", tribeSlug: "bambara" },
      { tribe: "Mossi", name: "Kaako", tribeSlug: "mossi" }
    ],
    category: "oil",
    description: "Extracted from the nuts of the shea tree (Vitellaria paradoxa), native to the African Savanna. Women have processed shea butter for thousands of years. It's called 'women's gold' for its economic importance.",
    culturalSignificance: "Shea processing is traditionally women's work and a major income source. The shea belt across West Africa involves millions of women. Beyond food, shea is sacred - used in baby care, protection rituals, and wood preservation.",
    nutritionalInfo: "Per 100g: 884 calories, 100g fat (mainly stearic and oleic acids). Contains vitamins A, E, and F. High in unsaponifiables which give unique skin benefits.",
    varieties: [
      { 
        name: "Unrefined (Yellow) Shea", 
        description: "Traditional hand-processed with smoky aroma. Retains all nutrients.",
        regions: ["Ghana", "Burkina Faso", "Mali", "Nigeria"],
        characteristics: "Yellow/beige, nutty smell, grainy texture"
      },
      { 
        name: "Refined Shea", 
        description: "Commercially processed, white, odorless. Loses some nutrients.",
        regions: ["Commercial processing centers"],
        characteristics: "White, smooth, no smell"
      },
      { 
        name: "Nilotica Shea (East African)", 
        description: "From Eastern Africa, softer and creamier than West African variety.",
        regions: ["Uganda", "South Sudan", "Ethiopia"],
        characteristics: "Softer, creamier, higher olein content"
      }
    ],
    preparation: [
      "Traditional: crack nuts, roast, grind, knead with water",
      "Use as cooking fat (high smoke point)",
      "Apply directly to skin and hair",
      "Mix into food for nutritional boost",
      "Melt for chocolate making (cocoa butter substitute)"
    ],
    storage: "Lasts 2+ years at room temperature. Keep away from moisture. Refrigerate in hot climates.",
    healthBenefits: [
      "Excellent moisturizer (topical)",
      "Anti-inflammatory properties",
      "High smoke point for cooking",
      "Contains beneficial fatty acids",
      "Traditional use for healing"
    ],
    culinaryUses: [
      "Cooking oil (especially for frying)",
      "Chocolate making (cocoa butter alternative)",
      "Traditional food preparation",
      "Baby food additive",
      "Ceremonial foods"
    ],
    tribesUsing: [
      { tribeSlug: "hausa", tribeName: "Hausa", usage: "Cooking oil, skin care, baby care" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", usage: "Ori - for cooking and traditional medicine" },
      { tribeSlug: "mossi", tribeName: "Mossi", usage: "Central to women's economy and cooking" },
      { tribeSlug: "bambara", tribeName: "Bambara", usage: "Primary cooking fat, trade item" }
    ],
    sources: [
      { name: "Shea butter - Wikipedia", url: "https://en.wikipedia.org/wiki/Shea_butter" },
      { name: "Global Shea Alliance", url: "https://globalshea.com/" }
    ]
  }
];

// Helper functions
export const getIngredientById = (id: string): Ingredient | undefined => {
  return ingredients.find(i => i.id === id);
};

export const getAllIngredients = (): Ingredient[] => {
  return ingredients;
};

export const getIngredientsByCategory = (category: Ingredient['category']): Ingredient[] => {
  return ingredients.filter(i => i.category === category);
};

export const findIngredientByName = (name: string): Ingredient | undefined => {
  const searchTerm = name.toLowerCase();
  return ingredients.find(i => 
    i.name.toLowerCase().includes(searchTerm) ||
    i.localNames.some(ln => ln.name.toLowerCase().includes(searchTerm))
  );
};
