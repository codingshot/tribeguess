// Traditional African Religions Database
// Comprehensive data for major traditional belief systems

export interface TraditionalReligionData {
  id: string;
  name: string;
  alternateNames?: string[];
  region: string;
  estimatedFollowers: string;
  countryBreakdown: { country: string; flag: string; percentage: number }[];
  supremeDeity: {
    name: string;
    description: string;
    attributes: string[];
  };
  tenets: {
    belief: string;
    description: string;
    source?: string;
  }[];
  practices: {
    name: string;
    description: string;
    frequency?: string;
  }[];
  rituals: {
    name: string;
    description: string;
    occasion: string;
  }[];
  sacredTexts?: {
    name: string;
    description: string;
    status: 'oral' | 'written';
  }[];
  joining: {
    process: string;
    requirements: string[];
    notes?: string;
  };
  influence: {
    cultural: string;
    modern: string;
    diaspora?: string;
  };
  tribesFollowing: {
    tribeSlug: string;
    tribeName: string;
    percentage: number;
    notes?: string;
  }[];
  sources: { name: string; url: string }[];
}

export const traditionalReligions: TraditionalReligionData[] = [
  {
    id: "yoruba-orisha",
    name: "Yoruba Religion (Ifá/Orisha)",
    alternateNames: ["Ifá", "Orisha worship", "Isese"],
    region: "West Africa",
    estimatedFollowers: "~40 million (including diaspora)",
    countryBreakdown: [
      { country: "Nigeria", flag: "🇳🇬", percentage: 60 },
      { country: "Benin", flag: "🇧🇯", percentage: 15 },
      { country: "Togo", flag: "🇹🇬", percentage: 5 },
      { country: "Brazil (Candomblé)", flag: "🇧🇷", percentage: 10 },
      { country: "Cuba (Santería)", flag: "🇨🇺", percentage: 5 },
      { country: "Other diaspora", flag: "🌍", percentage: 5 }
    ],
    supremeDeity: {
      name: "Olodumare",
      description: "The supreme creator god, source of all àṣẹ (life force). Olodumare is all-knowing, omnipotent, and created the universe. Unlike the Orishas, Olodumare is worshipped indirectly through the Orishas.",
      attributes: ["Creator", "Omniscient", "Omnipotent", "Source of àṣẹ (life force)"]
    },
    tenets: [
      {
        belief: "Iwà Pèlé (Good Character)",
        description: "The foundation of Yoruba ethics. Good character is essential for spiritual progress and harmonious living. It encompasses honesty, respect, patience, and humility.",
        source: "Encyclopedia of African Religion (Asante & Mazama, 2009)"
      },
      {
        belief: "Àṣẹ (Divine Energy)",
        description: "The life force that flows through all things. Everything in the universe possesses àṣẹ, which can be cultivated and directed through ritual and prayer.",
        source: "Yoruba Religious Concepts (Idowu, 1962)"
      },
      {
        belief: "Orí (Personal Destiny)",
        description: "Each person chooses their destiny before birth. The inner head (orí inú) guides one's fate. Success comes from aligning actions with one's chosen destiny.",
        source: "Sixteen Cowries (Bascom, 1980)"
      },
      {
        belief: "Ancestor Veneration",
        description: "The dead continue to exist and influence the living. Proper burial rites and ongoing veneration ensure ancestors remain benevolent guardians.",
        source: "Yoruba Beliefs and Sacrificial Rites (Awolalu, 1979)"
      }
    ],
    practices: [
      { name: "Ifá Divination", description: "Complex divination system using palm nuts or chains. Babalawos (priests) interpret 256 odù (verses) to provide guidance.", frequency: "As needed" },
      { name: "Egungun Festival", description: "Masquerade ceremony honoring ancestors. Masked dancers represent returning spirits of the dead.", frequency: "Annual" },
      { name: "Orisha Worship", description: "Regular offerings and prayers to specific Orishas. Each person has patron Orishas determined at birth.", frequency: "Daily/Weekly" },
      { name: "Naming Ceremony (Isomoloruko)", description: "Performed on the 7th or 9th day after birth. Names carry spiritual significance and destiny.", frequency: "At birth" }
    ],
    rituals: [
      { name: "Initiation (Ìṣẹ́)", description: "Multi-day ceremony where initiates receive their Orisha. Involves shaving, bathing in sacred herbs, and receiving sacred objects.", occasion: "Once in lifetime" },
      { name: "Esentaye", description: "Foot-to-ground ceremony for newborns, introducing them to the earth and ancestors.", occasion: "Days after birth" },
      { name: "Itefa", description: "Initiation into Ifá priesthood. Years of training culminate in receiving the sacred palm nuts (ikin).", occasion: "Priestly calling" }
    ],
    sacredTexts: [
      { name: "Odù Ifá", description: "256 chapters of sacred verses containing mythology, ethics, medicine, and divination. Memorized by Babalawos over years of training.", status: "oral" },
      { name: "Oríkì (Praise Poetry)", description: "Oral poetry praising Orishas, lineages, and individuals. Contains historical and spiritual knowledge.", status: "oral" }
    ],
    joining: {
      process: "Joining involves finding a qualified Babalawo or Iyalorisha who determines your patron Orisha through divination. Initiation ceremonies vary by Orisha but typically involve purification, sacrifice, and receiving sacred objects.",
      requirements: [
        "Consultation with Babalawo for Orí reading",
        "Period of learning and preparation",
        "Initiation ceremony (can last 7-21 days)",
        "Ongoing relationship with spiritual elder"
      ],
      notes: "Some communities accept newcomers openly; others are more selective. Diaspora communities (Santería, Candomblé) may have different practices."
    },
    influence: {
      cultural: "Yoruba religion shaped art, music, philosophy, and governance across West Africa. The Oyo Empire's political system integrated religious authority.",
      modern: "Ifá was recognized by UNESCO as Intangible Cultural Heritage in 2005. Yoruba temples exist worldwide, and practitioners include academics, artists, and professionals.",
      diaspora: "Transformed into Santería (Cuba), Candomblé (Brazil), and Vodou (Haiti). These syncretic traditions have millions of practitioners in the Americas."
    },
    tribesFollowing: [
      { tribeSlug: "yoruba", tribeName: "Yoruba", percentage: 45, notes: "Origin point; many are syncretic with Christianity" },
      { tribeSlug: "fon", tribeName: "Fon", percentage: 65, notes: "Related Vodun tradition" },
      { tribeSlug: "ewe", tribeName: "Ewe", percentage: 40, notes: "Related Vodun tradition" }
    ],
    sources: [
      { name: "Encyclopedia of African Religion", url: "https://www.britannica.com/topic/Yoruba-religion" },
      { name: "UNESCO - Ifá Divination", url: "https://ich.unesco.org/en/RL/ifa-divination-system-00146" },
      { name: "Wikipedia - Yoruba religion", url: "https://en.wikipedia.org/wiki/Yoruba_religion" }
    ]
  },
  {
    id: "akan-religion",
    name: "Akan Religion",
    alternateNames: ["Akom", "Akan Traditional Religion"],
    region: "West Africa",
    estimatedFollowers: "~8 million",
    countryBreakdown: [
      { country: "Ghana", flag: "🇬🇭", percentage: 70 },
      { country: "Côte d'Ivoire", flag: "🇨🇮", percentage: 25 },
      { country: "Other", flag: "🌍", percentage: 5 }
    ],
    supremeDeity: {
      name: "Nyame (Onyame)",
      description: "The supreme sky god, creator of all things. Nyame is too great to be approached directly, so worship goes through lesser deities (Abosom) and ancestors.",
      attributes: ["Sky God", "Creator", "Omniscient", "Giver of rain and sunshine"]
    },
    tenets: [
      {
        belief: "Sunsum (Spirit/Soul)",
        description: "Every person has a sunsum (spirit), kra (soul from Nyame), and mogya (blood/clan identity). These determine character and destiny.",
        source: "Akan Worldview - Gyekye (1995)"
      },
      {
        belief: "Communal Responsibility",
        description: "Individuals exist within community. Personal actions affect the entire clan. Elders mediate between living and ancestors.",
        source: "Religion and Art in Ashanti - Rattray (1927)"
      },
      {
        belief: "Asase Yaa (Earth Goddess)",
        description: "The earth is a goddess who gives fertility. Thursday is her sacred day when the earth should not be farmed.",
        source: "Britannica - Asase Yaa"
      },
      {
        belief: "Golden Stool Sacredness",
        description: "The Ashanti Golden Stool contains the sunsum (soul) of the Ashanti nation. It never touches the ground and is central to Ashanti identity.",
        source: "History of the Ashanti - McCaskie (1995)"
      }
    ],
    practices: [
      { name: "Akomfo (Priestly Service)", description: "Priests and priestesses serve specific Abosom (deities), becoming possessed during ceremonies.", frequency: "Regular ceremonies" },
      { name: "Libation (Nsã)", description: "Pouring drinks to ancestors and gods while reciting prayers. Done at all important occasions.", frequency: "Daily/Ceremonial" },
      { name: "Adinkra Symbols", description: "Visual symbols encoding spiritual concepts. Used in fabric, architecture, and ceremony.", frequency: "Cultural constant" },
      { name: "Day Names", description: "Children named for the day of birth (e.g., Kofi for Friday). Each day has spiritual associations.", frequency: "At birth" }
    ],
    rituals: [
      { name: "Odwira Festival", description: "Annual purification festival of the Ashanti. Involves cleansing, ancestor veneration, and renewal of allegiance to the Golden Stool.", occasion: "September/October" },
      { name: "Akwasidae", description: "Every 40 days, a ceremony at the royal court to venerate royal ancestors and consult them.", occasion: "Every 40 days" },
      { name: "Puberty Rites (Bragoro)", description: "Girls' coming-of-age ceremony marking fertility and womanhood.", occasion: "Puberty" }
    ],
    sacredTexts: [
      { name: "Anansesem (Spider Stories)", description: "Oral tradition of wisdom stories featuring Anansi the spider. Encodes ethics and worldview.", status: "oral" },
      { name: "Adinkra Philosophy", description: "Visual writing system encoding proverbs and concepts. Each symbol has associated stories.", status: "written" }
    ],
    joining: {
      process: "One is typically born into Akan religion through matrilineal clan membership. Outsiders can be adopted into clans or serve specific Abosom through initiation with an Okomfo (priest).",
      requirements: [
        "Understanding of clan system and taboos",
        "Acceptance by an Okomfo or clan elder",
        "Initiation ceremony for Abosom service",
        "Learning of libation prayers and protocols"
      ],
      notes: "The religion is closely tied to Akan ethnicity. Full participation requires understanding matrilineal kinship."
    },
    influence: {
      cultural: "Akan religion shaped the powerful Ashanti Empire. Adinkra symbols are globally recognized. Akan concepts influence Ghanaian Christianity.",
      modern: "Many Ghanaians practice syncretically with Christianity. Traditional festivals like Odwira attract tourists and diaspora."
    },
    tribesFollowing: [
      { tribeSlug: "ashanti", tribeName: "Ashanti", percentage: 35, notes: "Many syncretic with Christianity" },
      { tribeSlug: "fante", tribeName: "Fante", percentage: 30 },
      { tribeSlug: "ewe", tribeName: "Ewe", percentage: 20 },
      { tribeSlug: "ga", tribeName: "Ga-Adangbe", percentage: 25, notes: "Similar but distinct tradition" }
    ],
    sources: [
      { name: "Britannica - Akan religion", url: "https://www.britannica.com/topic/Akan-religion" },
      { name: "Religion and Art in Ashanti", url: "https://en.wikipedia.org/wiki/Religion_and_Art_in_Ashanti" },
      { name: "Wikipedia - Akan people", url: "https://en.wikipedia.org/wiki/Akan_people" }
    ]
  },
  {
    id: "zulu-religion",
    name: "Zulu Traditional Religion",
    alternateNames: ["Zulu Ancestor Veneration", "Amadlozi worship"],
    region: "Southern Africa",
    estimatedFollowers: "~5 million",
    countryBreakdown: [
      { country: "South Africa", flag: "🇿🇦", percentage: 85 },
      { country: "Eswatini", flag: "🇸🇿", percentage: 8 },
      { country: "Mozambique", flag: "🇲🇿", percentage: 5 },
      { country: "Other", flag: "🌍", percentage: 2 }
    ],
    supremeDeity: {
      name: "Unkulunkulu",
      description: "The 'Great-Great-One' or 'Old-Old-One'. The first human and creator who emerged from a reed bed. Unlike other deities, Unkulunkulu is rarely worshipped directly.",
      attributes: ["First Ancestor", "Creator", "Origin of humanity"]
    },
    tenets: [
      {
        belief: "Amadlozi (Ancestor Spirits)",
        description: "The dead continue as spirits who guide, protect, and can punish the living. Proper veneration keeps ancestors benevolent. Dreams are messages from amadlozi.",
        source: "The Zulu People - Krige (1936)"
      },
      {
        belief: "Ubuntu",
        description: "'I am because we are.' Personhood exists through relationships with others. Community welfare supersedes individual gain.",
        source: "No Future Without Forgiveness - Tutu (1999)"
      },
      {
        belief: "Spiritual Balance",
        description: "Illness and misfortune result from spiritual imbalance - angry ancestors, witchcraft, or broken taboos. Sangomas diagnose and heal these imbalances.",
        source: "Zulu Medicine and Medicine-Men - Bryant (1966)"
      }
    ],
    practices: [
      { name: "Ukubuyisa (Bringing Back)", description: "Ceremony to bring the spirit of the deceased back home to join the amadlozi. Done one year after death.", frequency: "One year after death" },
      { name: "Umsebenzi (Ancestor Ceremony)", description: "Beer brewing and animal sacrifice to honor ancestors. Essential for major life events.", frequency: "Major occasions" },
      { name: "Sangoma Consultation", description: "Traditional healers diagnose spiritual causes of problems through communication with ancestors.", frequency: "As needed" }
    ],
    rituals: [
      { name: "Umemulo (Coming of Age)", description: "Girls' ceremony at age 21 marking the transition to womanhood. Involves singing, dancing, and gifts.", occasion: "Age 21" },
      { name: "Umkhosi Womhlanga (Reed Dance)", description: "Annual ceremony where young women present reeds to the king, celebrating virginity and cultural pride.", occasion: "September" },
      { name: "Ukweshwama (First Fruits)", description: "The king tastes the first harvest, blessing the agricultural year. Only performed when there is a reigning king.", occasion: "December" }
    ],
    sacredTexts: [
      { name: "Izibongo (Praise Poetry)", description: "Oral poetry praising kings, ancestors, and individuals. Preserves history and spiritual knowledge.", status: "oral" },
      { name: "Amanqulo (Traditional Hymns)", description: "Songs sung during ceremonies to invoke ancestors and express spiritual truths.", status: "oral" }
    ],
    joining: {
      process: "One is born into Zulu traditional religion through family lineage. The amadlozi (ancestors) of your bloodline are your spiritual connection. Outsiders may participate in ceremonies but full membership requires Zulu ancestry.",
      requirements: [
        "Zulu ancestry (or marriage into Zulu family)",
        "Knowledge of family lineage and amadlozi",
        "Participation in family umsebenzi ceremonies",
        "Consultation with family sangoma for spiritual calling"
      ],
      notes: "Those called to be sangomas undergo training (ukuthwasa) regardless of background, as this is a spiritual calling from ancestors."
    },
    influence: {
      cultural: "Zulu religion shaped the warrior kingdom of Shaka. Ubuntu philosophy influences South African politics and reconciliation. Zulu traditional healing recognized by South African government.",
      modern: "Many Zulu Christians maintain ancestor practices. The Reed Dance draws 20,000+ participants annually. Sangoma practice is legally recognized."
    },
    tribesFollowing: [
      { tribeSlug: "zulu", tribeName: "Zulu", percentage: 40, notes: "Many syncretic with Christianity" },
      { tribeSlug: "xhosa", tribeName: "Xhosa", percentage: 35, notes: "Similar tradition" },
      { tribeSlug: "swazi", tribeName: "Swazi", percentage: 45 },
      { tribeSlug: "ndebele", tribeName: "Ndebele", percentage: 30 }
    ],
    sources: [
      { name: "Britannica - Zulu religion", url: "https://www.britannica.com/topic/Zulu-religion" },
      { name: "Wikipedia - Zulu people", url: "https://en.wikipedia.org/wiki/Zulu_people" },
      { name: "South African History Online", url: "https://www.sahistory.org.za/article/zulu" }
    ]
  },
  {
    id: "kikuyu-religion",
    name: "Kikuyu Traditional Religion",
    alternateNames: ["Ngai worship", "Gikuyu Traditional Religion"],
    region: "East Africa",
    estimatedFollowers: "~2 million",
    countryBreakdown: [
      { country: "Kenya", flag: "🇰🇪", percentage: 98 },
      { country: "Diaspora", flag: "🌍", percentage: 2 }
    ],
    supremeDeity: {
      name: "Ngai (Mũgai/Mũrungu)",
      description: "The creator god who lives on Mount Kenya (Kĩrĩnyaga - 'Mountain of Brightness'). Ngai is the divider of the universe, giver of all things, and source of life.",
      attributes: ["Creator", "Mountain Dweller", "Provider of Rain", "Giver of Life"]
    },
    tenets: [
      {
        belief: "Mount Kenya as Sacred",
        description: "Kĩrĩnyaga (Mount Kenya) is the earthly dwelling place of Ngai. Kikuyu traditionally built homes with doors facing the mountain. Prayers are directed toward it.",
        source: "Facing Mount Kenya - Kenyatta (1938)"
      },
      {
        belief: "Mũgumo Tree Sacredness",
        description: "The wild fig tree (Mũgumo) is sacred for prayer and sacrifice. If a Mũgumo falls, it is a serious omen requiring community ritual.",
        source: "Facing Mount Kenya - Kenyatta (1938)"
      },
      {
        belief: "Nine Clans Origin",
        description: "The Kikuyu descend from Mumbi and Gĩkũyũ, whose nine daughters founded the nine Kikuyu clans. This matrilineal origin is central to identity.",
        source: "Oral tradition / Kenyatta (1938)"
      }
    ],
    practices: [
      { name: "Prayer Facing Mount Kenya", description: "Traditional prayers were made facing the mountain, often at dawn, with arms raised.", frequency: "Daily/Special occasions" },
      { name: "Sacrifice at Mũgumo", description: "Goats or sheep sacrificed under sacred fig trees for community needs like rain or healing.", frequency: "As needed" },
      { name: "Irũa (Circumcision)", description: "Initiation ceremony marking transition to adulthood. Historically for both genders (female circumcision now largely abandoned).", frequency: "Coming of age" },
      { name: "Mũratina Brewing", description: "Traditional honey beer brewed for ceremonies. Has spiritual significance in offerings.", frequency: "Ceremonial" }
    ],
    rituals: [
      { name: "Ituĩka", description: "Generational power transfer ceremony occurring every 30-35 years. Political and spiritual authority passes to a new generation.", occasion: "Every ~35 years" },
      { name: "Kũinua Mũgumo", description: "Community gathering when a sacred fig tree falls. Elders perform cleansing rituals.", occasion: "When mũgumo falls" },
      { name: "Gũtahĩra Ngai", description: "Thanksgiving ceremony to Ngai after successful harvest or answered prayers.", occasion: "After blessings" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Stories of Gĩkũyũ and Mumbi, clan histories, and ritual procedures passed through generations.", status: "oral" },
      { name: "Gĩkũyũ Proverbs", description: "Wisdom literature encoding ethics and worldview. Used in education and dispute resolution.", status: "oral" }
    ],
    joining: {
      process: "Kikuyu religion is tied to Kikuyu ethnicity and clan membership. One is born into it through maternal lineage (one of nine clans). Outsiders historically could be adopted into clans.",
      requirements: [
        "Kikuyu ancestry or formal adoption into a clan",
        "Circumcision/initiation (traditionally)",
        "Knowledge of clan taboos and rituals",
        "Recognition by clan elders"
      ],
      notes: "Today, most Kikuyu are Christian but many maintain traditional practices like facing Mount Kenya in prayer or honoring ancestors."
    },
    influence: {
      cultural: "Kikuyu religion shaped resistance to colonialism - Mau Mau oaths drew on traditional beliefs. Mount Kenya remains symbolically important.",
      modern: "Facing Mount Kenya (1938) by Jomo Kenyatta documented the religion. Many practices continue alongside Christianity."
    },
    tribesFollowing: [
      { tribeSlug: "kikuyu", tribeName: "Kikuyu", percentage: 15, notes: "Most are Christian with syncretic practices" },
      { tribeSlug: "embu", tribeName: "Embu", percentage: 20, notes: "Related tradition" },
      { tribeSlug: "meru", tribeName: "Meru", percentage: 18, notes: "Related tradition" }
    ],
    sources: [
      { name: "Facing Mount Kenya - Kenyatta", url: "https://en.wikipedia.org/wiki/Facing_Mount_Kenya" },
      { name: "Wikipedia - Kikuyu people", url: "https://en.wikipedia.org/wiki/Kikuyu_people" },
      { name: "Britannica - Gikuyu", url: "https://www.britannica.com/topic/Kikuyu" }
    ]
  },
  {
    id: "maasai-religion",
    name: "Maasai Traditional Religion",
    alternateNames: ["Enkai worship"],
    region: "East Africa",
    estimatedFollowers: "~1.5 million",
    countryBreakdown: [
      { country: "Kenya", flag: "🇰🇪", percentage: 60 },
      { country: "Tanzania", flag: "🇹🇿", percentage: 40 }
    ],
    supremeDeity: {
      name: "Enkai (Engai)",
      description: "Dual-natured god - Enkai Narok (Black God, benevolent, sends rain) and Enkai Na-nyokie (Red God, vengeful, causes drought). Lives in the sky and on mountains.",
      attributes: ["Sky God", "Dual Nature", "Controller of Rain", "Owner of Cattle"]
    },
    tenets: [
      {
        belief: "Cattle as Divine Gift",
        description: "Enkai gave all cattle to the Maasai. Cattle are sacred, providing food (milk, blood, meat), wealth, and spiritual connection. Raiding cattle from others was traditionally justified.",
        source: "Maasai Myth and Legend - Hollis (1905)"
      },
      {
        belief: "Laibon Authority",
        description: "Laibons are spiritual leaders with powers of prophecy and healing. The senior Laibon leads the entire Maasai nation spiritually.",
        source: "Being Maasai - Spear & Waller (1993)"
      },
      {
        belief: "Age-Set System",
        description: "Society organized by age-sets (ilmurran warriors, elders). Each stage has spiritual duties and restrictions.",
        source: "Maasai Cattle - Schneider (1957)"
      }
    ],
    practices: [
      { name: "Morning Prayer", description: "Daily prayers to Enkai at sunrise, often spitting toward the sun (spitting is blessing in Maasai culture).", frequency: "Daily" },
      { name: "Cattle Bleeding", description: "Ritualized drawing of blood from living cattle for consumption. Done without killing the animal.", frequency: "Regular" },
      { name: "Enkang Ceremony", description: "Blessing of the homestead (enkang) by elders, seeking Enkai's protection.", frequency: "At establishment" }
    ],
    rituals: [
      { name: "Eunoto", description: "Warriors' graduation ceremony marking transition from warrior (moran) to elderhood. Hair is shaved, and mother performs special rituals.", occasion: "End of warrior period" },
      { name: "Enkipaata", description: "Pre-circumcision ceremony where boys become junior warriors. Lasts months in the bush.", occasion: "Adolescence" },
      { name: "Olng'esherr", description: "Meat-eating ceremony for warriors. Takes place in the bush away from women.", occasion: "Warrior period" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Stories of Enkai's gift of cattle, age-set histories, and prophetic pronouncements of Laibons.", status: "oral" },
      { name: "Enkiama (Songs)", description: "Warrior songs encoding history, bravery tales, and spiritual teachings.", status: "oral" }
    ],
    joining: {
      process: "Maasai religion is inseparable from Maasai identity. One must be Maasai (by birth or rare adoption) and undergo proper initiation through age-sets.",
      requirements: [
        "Maasai birth or formal adoption",
        "Male: circumcision and warrior training",
        "Female: marriage into Maasai community",
        "Participation in age-set ceremonies"
      ],
      notes: "Christianity has spread among Maasai, but many maintain traditional practices, especially cattle-related beliefs."
    },
    influence: {
      cultural: "Maasai religion shaped their distinctive pastoral lifestyle and warrior culture. Resistance to modernization is often religiously motivated.",
      modern: "Maasai remain among Africa's most traditionally-oriented peoples. Tourism has brought global awareness of their culture."
    },
    tribesFollowing: [
      { tribeSlug: "maasai", tribeName: "Maasai", percentage: 60, notes: "Many syncretic with Christianity" },
      { tribeSlug: "samburu", tribeName: "Samburu", percentage: 55, notes: "Related tradition" },
      { tribeSlug: "turkana", tribeName: "Turkana", percentage: 40, notes: "Similar pastoral religion" }
    ],
    sources: [
      { name: "Britannica - Maasai", url: "https://www.britannica.com/topic/Maasai" },
      { name: "Wikipedia - Maasai people", url: "https://en.wikipedia.org/wiki/Maasai_people" },
      { name: "Being Maasai - Spear & Waller", url: "https://en.wikipedia.org/wiki/Maasai_mythology" }
    ]
  },
  {
    id: "kongo-religion",
    name: "Kongo Religion (Bukongo)",
    alternateNames: ["Bakongo religion", "Minkisi tradition"],
    region: "Central Africa",
    estimatedFollowers: "~3 million (including diaspora influence)",
    countryBreakdown: [
      { country: "DR Congo", flag: "🇨🇩", percentage: 45 },
      { country: "Congo-Brazzaville", flag: "🇨🇬", percentage: 30 },
      { country: "Angola", flag: "🇦🇴", percentage: 20 },
      { country: "Diaspora (Vodou/Palo)", flag: "🌍", percentage: 5 }
    ],
    supremeDeity: {
      name: "Nzambi Mpungu",
      description: "The unreachable supreme creator god. Nzambi Mpungu created the universe but is too distant for direct worship. Contact is through ancestors and minkisi.",
      attributes: ["Supreme Creator", "Unreachable", "All-Powerful", "Above all spirits"]
    },
    tenets: [
      {
        belief: "Kalunga (Cosmic Boundary)",
        description: "Kalunga is the water/boundary separating the living and dead worlds. It also refers to the ocean and death itself. The dead cross Kalunga to join ancestors.",
        source: "Flash of the Spirit - Thompson (1983)"
      },
      {
        belief: "Minkisi (Power Objects)",
        description: "Minkisi (singular: nkisi) are containers housing spiritual power. They can heal, protect, or harm. Created by Nganga (ritual specialists).",
        source: "Kongo Across the Waters - Young (2007)"
      },
      {
        belief: "Cosmogram (Yowa)",
        description: "The Kongo cross represents the cycle of life: birth, maturity, death, rebirth. The four points connect the living and spirit worlds.",
        source: "Flash of the Spirit - Thompson (1983)"
      }
    ],
    practices: [
      { name: "Nganga Consultation", description: "Ritual specialists create minkisi, diagnose spiritual problems, and communicate with ancestors.", frequency: "As needed" },
      { name: "Ancestor Offerings", description: "Regular offerings at family shrines to bakulu (ancestors). Palm wine and food are common offerings.", frequency: "Regular" },
      { name: "Simbi Veneration", description: "Honoring water spirits (simbi) at rivers, waterfalls, and pools.", frequency: "Ceremonial" }
    ],
    rituals: [
      { name: "Funeral Rites", description: "Elaborate ceremonies to guide the deceased across Kalunga. Improper burial can create wandering spirits.", occasion: "Death" },
      { name: "Nkisi Activation", description: "Ritual to awaken spiritual power in a nkisi object. Involves blood, special substances, and invocations.", occasion: "Creating minkisi" },
      { name: "Kimbanguist Ceremonies", description: "Kimbanguism (founded 1921) blends Kongo beliefs with Christianity. 17+ million followers.", occasion: "Regular worship" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Myths of Kongo origins, minkisi creation, and proper rituals passed through Nganga lineages.", status: "oral" },
      { name: "Kimbanguist Texts", description: "Writings of Simon Kimbangu and successors blending Kongo spirituality with Christianity.", status: "written" }
    ],
    joining: {
      process: "Traditional Kongo religion is family-based through ancestor connection. Outsiders can receive minkisi from Nganga or join Kimbanguist churches. Diaspora traditions (Palo Mayombe, Haitian Vodou) have initiation paths.",
      requirements: [
        "Connection to Kongo community or Nganga",
        "Understanding of Kalunga cosmology",
        "Initiation by qualified Nganga (for deeper practice)",
        "Respect for minkisi protocols"
      ],
      notes: "The Kingdom of Kongo adopted Christianity in 1491, creating unique syncretic traditions. Kimbanguism is a major African-initiated church."
    },
    influence: {
      cultural: "Kongo religion shaped the Kingdom of Kongo's diplomacy with Portugal and the Vatican. Minkisi art is world-renowned.",
      modern: "Kimbanguism has over 17 million members. Kongo beliefs influenced Haitian Vodou, Cuban Palo Mayombe, and Brazilian Umbanda.",
      diaspora: "Enslaved Kongo people brought their beliefs to the Americas, profoundly shaping Caribbean and Brazilian spirituality."
    },
    tribesFollowing: [
      { tribeSlug: "kongo", tribeName: "Kongo (Bakongo)", percentage: 35, notes: "Many are Kimbanguist or Catholic" },
      { tribeSlug: "luba", tribeName: "Luba", percentage: 20, notes: "Related Central African tradition" },
      { tribeSlug: "mongo", tribeName: "Mongo", percentage: 25, notes: "Rainforest variation" }
    ],
    sources: [
      { name: "Flash of the Spirit - Thompson", url: "https://en.wikipedia.org/wiki/Kongo_religion" },
      { name: "Wikipedia - Kongo people", url: "https://en.wikipedia.org/wiki/Kongo_people" },
      { name: "Britannica - Kingdom of Kongo", url: "https://www.britannica.com/place/Kongo-kingdom" }
    ]
  },
  {
    id: "dogon-religion",
    name: "Dogon Religion",
    alternateNames: ["Amma worship", "Dogon spirituality"],
    region: "West Africa",
    estimatedFollowers: "~600,000",
    countryBreakdown: [
      { country: "Mali", flag: "🇲🇱", percentage: 95 },
      { country: "Burkina Faso", flag: "🇧🇫", percentage: 5 }
    ],
    supremeDeity: {
      name: "Amma",
      description: "The supreme creator god who created the universe from a cosmic egg. Amma made the Nommo, primordial beings who brought order to the universe. Amma is believed to have created the stars, including knowledge of Sirius.",
      attributes: ["Creator", "Cosmic Egg Origin", "All-Knowing", "Distant yet Present"]
    },
    tenets: [
      {
        belief: "Nommo (Primordial Spirits)",
        description: "Eight Nommo ancestors emerged from Amma's creation to organize the world. They are amphibious beings associated with water, fertility, and order. The Nommo taught humanity essential skills.",
        source: "Conversations with Ogotemmêli - Griaule (1948)"
      },
      {
        belief: "Sirius Star Knowledge",
        description: "Dogon cosmology includes detailed knowledge of the Sirius star system, including Sirius B (Po Tolo). This astronomical knowledge has fascinated researchers and sparked debate about its origins.",
        source: "The Pale Fox - Griaule & Dieterlen (1965)"
      },
      {
        belief: "Bandiagara Cliffs as Sacred",
        description: "The Bandiagara Escarpment is the sacred homeland where the Dogon settled, building cliff dwellings. The landscape is integral to religious practice and ancestral connection.",
        source: "UNESCO World Heritage - Bandiagara"
      },
      {
        belief: "Cyclical Renewal (Sigui)",
        description: "Every 60 years, the Sigui ceremony renews the world and commemorates the first ancestor's death. It lasts 7 years and moves through villages.",
        source: "Dogon Religious Art - Richards (2005)"
      }
    ],
    practices: [
      { name: "Hogon (High Priest)", description: "The Hogon is the spiritual leader, living in seclusion and mediating with Amma. He is forbidden to shake hands or be touched.", frequency: "Permanent role" },
      { name: "Mask Dances (Dama)", description: "Elaborate masked ceremonies guide souls to the afterlife and honor ancestors. Masks represent animals, spirits, and mythological beings.", frequency: "Funeral & annual" },
      { name: "Lebe Worship", description: "Veneration of Lebe, the first mortal transformed by Nommo after death. Lebe represents agricultural fertility.", frequency: "Regular offerings" }
    ],
    rituals: [
      { name: "Sigui Festival", description: "Major ceremony every 60 years marking the renewal of generations. Initiates learn sacred language (Sigi so) and perform with Kanaga masks.", occasion: "Every 60 years (last 1967-1973)" },
      { name: "Dama (Funeral Ceremony)", description: "Complex funeral rites with masked dances to guide the deceased's nyama (life force) to the ancestor realm. Can last days.", occasion: "After death" },
      { name: "Bulu (Altar Rites)", description: "Offerings at family and village altars to maintain relationships with ancestors and Nommo spirits.", occasion: "Regular occasions" }
    ],
    sacredTexts: [
      { name: "Sigi so", description: "A secret ritual language used only during Sigui ceremonies. Knowledge passed down through generations of initiates.", status: "oral" },
      { name: "Oral Cosmogony", description: "Detailed creation narratives recorded by anthropologist Marcel Griaule through conversations with priest Ogotemmêli.", status: "oral" }
    ],
    joining: {
      process: "Dogon religion is deeply tied to Dogon ethnicity and village membership. One must be born into a Dogon family and initiated through age-grade ceremonies. Outsiders may observe but not fully participate.",
      requirements: [
        "Dogon birth or marriage",
        "Initiation through age ceremonies",
        "Knowledge of clan taboos (togu)",
        "Participation in village Dama and rituals"
      ],
      notes: "Islam has spread among some Dogon, but traditional practices remain strong, especially for funerals and the Sigui festival."
    },
    influence: {
      cultural: "Dogon art, particularly their carved doors and masks, is world-renowned. Their astronomical knowledge sparked global interest and debate.",
      modern: "Bandiagara is a UNESCO World Heritage Site. Dogon culture attracts researchers and tourists. The Sigui festival draws international attention."
    },
    tribesFollowing: [
      { tribeSlug: "dogon", tribeName: "Dogon", percentage: 65, notes: "Some converted to Islam" },
      { tribeSlug: "bambara", tribeName: "Bambara", percentage: 10, notes: "Some shared practices" }
    ],
    sources: [
      { name: "Conversations with Ogotemmêli - Griaule", url: "https://en.wikipedia.org/wiki/Conversations_with_Ogotemmêli" },
      { name: "Wikipedia - Dogon people", url: "https://en.wikipedia.org/wiki/Dogon_people" },
      { name: "UNESCO - Bandiagara", url: "https://whc.unesco.org/en/list/516" }
    ]
  },
  {
    id: "dinka-religion",
    name: "Dinka Religion",
    alternateNames: ["Nhialic worship", "Jieng spirituality"],
    region: "East Africa / Horn of Africa",
    estimatedFollowers: "~3 million",
    countryBreakdown: [
      { country: "South Sudan", flag: "🇸🇸", percentage: 95 },
      { country: "Sudan", flag: "🇸🇩", percentage: 3 },
      { country: "Diaspora", flag: "🌍", percentage: 2 }
    ],
    supremeDeity: {
      name: "Nhialic (Nhial)",
      description: "The supreme sky god, ruler of all spirits, source of sustenance through rain. Nhialic is the creator who lives in the sky but is reached through intermediary spirits called Yath. Nhialic is invoked for rain, fertility, and justice.",
      attributes: ["Sky God", "Rain Giver", "Creator", "Judge of Disputes"]
    },
    tenets: [
      {
        belief: "Cattle as Sacred",
        description: "Cattle are central to Dinka spirituality, serving as bridewealth, sacrifice, and the measure of wealth. Each man has a 'personality ox' reflecting his character. Cattle connect humans to Nhialic.",
        source: "Divinity and Experience - Lienhardt (1961)"
      },
      {
        belief: "Yath (Divinities/Spirits)",
        description: "Yath are spirits that possess people and clan groups. They include ancestor spirits, nature spirits, and spirits associated with specific places. Some Yath are benevolent, others dangerous.",
        source: "Divinity and Experience - Lienhardt"
      },
      {
        belief: "Beny Bith (Masters of the Fishing Spear)",
        description: "Hereditary priestly lineages called 'spear-masters' mediate between humans and Nhialic. They perform sacrifices, settle disputes, and can invoke divine power.",
        source: "The Dinka of the Sudan - Deng (1972)"
      },
      {
        belief: "Clan Divinities (Jok)",
        description: "Each clan has its own divinity (jok) inherited through the father. These clan divinities protect members and require specific rituals and taboos.",
        source: "Dinka Cosmology - Malual (2013)"
      }
    ],
    practices: [
      { name: "Cattle Sacrifice", description: "Oxen are sacrificed to Nhialic and Yath for rain, healing, fertility, and to mark important life events. The color and form of the ox matter.", frequency: "Major occasions" },
      { name: "Song and Dance", description: "Cattle songs (dit) praise animals and ancestors. Young men compose and perform songs at cattle camps, dances, and ceremonies.", frequency: "Daily at camps" },
      { name: "Spear-Master Mediation", description: "Disputes are settled by spear-masters who invoke Nhialic's justice. Their curse is greatly feared.", frequency: "As needed" }
    ],
    rituals: [
      { name: "Burial of the Spear-Master", description: "When a great spear-master dies, he is buried alive (traditionally) in a ceremony where he goes willingly into the grave, demonstrating power over death.", occasion: "Death of spear-master" },
      { name: "Initiation (Gaar)", description: "Boys undergo scarification on the forehead (six horizontal lines), marking transition to manhood and clan membership.", occasion: "Adolescence" },
      { name: "Rain-Making", description: "Spear-masters perform rituals to call rain from Nhialic during droughts, involving cattle sacrifice and invocations.", occasion: "Drought" }
    ],
    sacredTexts: [
      { name: "Cattle Songs (Dit)", description: "Oral poetry praising cattle, ancestors, and personal achievements. Each man composes his own songs.", status: "oral" },
      { name: "Myths of Origin", description: "Narratives of creation, the first Dinka, and the origin of cattle and spear-master lineages.", status: "oral" }
    ],
    joining: {
      process: "One is Dinka by birth. Religion is inseparable from ethnic identity, cattle culture, and clan membership. The initiation scarification marks permanent entry into the community.",
      requirements: [
        "Dinka birth",
        "Initiation scarification (gaar)",
        "Cattle ownership (for full participation)",
        "Knowledge of clan divinities and taboos"
      ],
      notes: "Christianity has spread among Dinka, especially in towns, but cattle sacrifice and traditional practices persist even among Christians."
    },
    influence: {
      cultural: "Dinka cattle culture shaped the largest ethnic group in South Sudan. Their height, pastoral lifestyle, and ceremonies are distinctive in Africa.",
      modern: "Many Dinka leaders in South Sudan government. The diaspora maintains cultural associations. Civil war has affected traditional practices."
    },
    tribesFollowing: [
      { tribeSlug: "dinka", tribeName: "Dinka", percentage: 55, notes: "Many syncretic with Christianity" },
      { tribeSlug: "nuer", tribeName: "Nuer", percentage: 45, notes: "Related Nilotic tradition" },
      { tribeSlug: "shilluk", tribeName: "Shilluk", percentage: 35, notes: "Divine kingship tradition" }
    ],
    sources: [
      { name: "Divinity and Experience - Lienhardt", url: "https://en.wikipedia.org/wiki/Godfrey_Lienhardt" },
      { name: "Wikipedia - Dinka people", url: "https://en.wikipedia.org/wiki/Dinka_people" },
      { name: "The Dinka of Sudan - Deng", url: "https://www.britannica.com/topic/Dinka" }
    ]
  },
  {
    id: "shona-mwari",
    name: "Shona Religion (Mwari Cult)",
    alternateNames: ["Mwari worship", "Matonjeni cult", "Shona Traditional Religion"],
    region: "Southern Africa",
    estimatedFollowers: "~4 million",
    countryBreakdown: [
      { country: "Zimbabwe", flag: "🇿🇼", percentage: 80 },
      { country: "Mozambique", flag: "🇲🇿", percentage: 10 },
      { country: "Botswana", flag: "🇧🇼", percentage: 5 },
      { country: "South Africa", flag: "🇿🇦", percentage: 5 }
    ],
    supremeDeity: {
      name: "Mwari (Musikavanhu)",
      description: "The supreme creator god, 'the one who creates.' Mwari is a transcendent deity who can be approached through oracular shrines at Matonjeni in the Matobo Hills. Mwari speaks through appointed oracles.",
      attributes: ["Creator", "Owner of All", "Oracular Voice", "Rainmaker"]
    },
    tenets: [
      {
        belief: "Mhondoro (Lion Spirits)",
        description: "Powerful ancestor spirits of founding clan leaders become mhondoro after death. They possess spirit mediums and guide nations. Nehanda and Chaminuka are famous mhondoro.",
        source: "The Spirits of the Shona - Bourdillon (1976)"
      },
      {
        belief: "Vadzimu (Ancestor Spirits)",
        description: "Family ancestors remain connected to the living, offering protection and guidance. Neglecting vadzimu causes misfortune. Regular offerings maintain the relationship.",
        source: "Shona Religion - Gelfand (1962)"
      },
      {
        belief: "N'anga (Traditional Healers)",
        description: "N'anga are diviners and healers who diagnose spiritual causes of illness and misfortune. They communicate with vadzimu through divination bones and spirit possession.",
        source: "Britannica - Shona religion"
      },
      {
        belief: "Matobo Oracles",
        description: "The Matobo Hills house shrines where the voice of Mwari speaks through human priests. Pilgrimages seek rain, healing, and guidance on national matters.",
        source: "UNESCO - Matobo Hills"
      }
    ],
    practices: [
      { name: "Bira (Ancestor Ceremony)", description: "Night-long ceremonies with music, dance, and brewing to invite ancestor spirits to possess mediums and communicate with family.", frequency: "Regular/crisis" },
      { name: "Mukwerera (Rain Ceremony)", description: "Ceremonies at Matobo shrines or local mountains asking Mwari for rain. Involves beer brewing and specific rituals.", frequency: "Drought/seasonal" },
      { name: "N'anga Consultation", description: "Visiting traditional healers for divination using hakata (bones/shells) to determine spiritual causes of problems.", frequency: "As needed" }
    ],
    rituals: [
      { name: "Kurova Guva", description: "Ceremony one year after death to bring the spirit home as a vadzimu ancestor. Essential for the deceased to become a protective ancestor.", occasion: "One year after death" },
      { name: "Kutamba Muzukuru", description: "Ceremony for children who died. Prevents the spirit from causing harm to subsequent children.", occasion: "After child death" },
      { name: "Nhimbe (Work Party)", description: "Communal labor with spiritual dimensions. Working together invokes ancestral blessings on the harvest.", occasion: "Planting/harvest" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Myths of creation, mhondoro histories, and proper ritual procedures passed through mediums and elders.", status: "oral" },
      { name: "Praise Poetry (Nhango)", description: "Recitations of clan histories, totems, and mhondoro achievements during ceremonies.", status: "oral" }
    ],
    joining: {
      process: "Shona religion is tied to Shona identity and clan membership. One inherits vadzimu through family. However, the Mwari cult has historically accepted pilgrims from multiple ethnic groups seeking rain.",
      requirements: [
        "Shona ancestry (for vadzimu connection)",
        "Knowledge of totem and clan prohibitions",
        "Participation in family bira ceremonies",
        "Acceptance by clan elders"
      ],
      notes: "Most Shona are Christian but maintain vadzimu practices. The Matobo shrines continue to receive pilgrims. Spirit mediums were crucial in Zimbabwe's liberation war."
    },
    influence: {
      cultural: "Shona religion shaped Great Zimbabwe civilization. Spirit mediums like Nehanda inspired resistance to colonialism. Mbira music has global influence.",
      modern: "Traditional practices continue alongside Christianity. Matobo Hills are a UNESCO World Heritage Site. Spirit mediums remain influential."
    },
    tribesFollowing: [
      { tribeSlug: "shona", tribeName: "Shona", percentage: 45, notes: "Most syncretic with Christianity" },
      { tribeSlug: "ndebele", tribeName: "Ndebele (Zimbabwe)", percentage: 25, notes: "Adopted aspects after settling" },
      { tribeSlug: "venda", tribeName: "Venda", percentage: 30, notes: "Related southern tradition" }
    ],
    sources: [
      { name: "The Spirits of the Shona - Bourdillon", url: "https://en.wikipedia.org/wiki/Shona_religion" },
      { name: "Wikipedia - Shona people", url: "https://en.wikipedia.org/wiki/Shona_people" },
      { name: "UNESCO - Matobo Hills", url: "https://whc.unesco.org/en/list/306" }
    ]
  },
  {
    id: "ethiopian-orthodox",
    name: "Ethiopian Orthodox Tewahedo Christianity",
    alternateNames: ["Ethiopian Orthodox Church", "Tewahedo", "Ethiopian Christianity"],
    region: "Horn of Africa",
    estimatedFollowers: "~45 million",
    countryBreakdown: [
      { country: "Ethiopia", flag: "🇪🇹", percentage: 92 },
      { country: "Eritrea", flag: "🇪🇷", percentage: 5 },
      { country: "Diaspora", flag: "🌍", percentage: 3 }
    ],
    supremeDeity: {
      name: "Egziabher (God)",
      description: "The triune God of Christianity. Ethiopian Orthodoxy emphasizes Christ's unified divine-human nature (Miaphysitism). God is approached through intercession of Mary (Maryam), saints, and angels.",
      attributes: ["Trinity", "Creator", "Redeemer", "One Nature of Christ"]
    },
    tenets: [
      {
        belief: "Tewahedo (One United Nature)",
        description: "Christ has one united divine-human nature after incarnation - not two natures as in Chalcedonian Christianity. This Miaphysite doctrine defines Ethiopian Orthodoxy.",
        source: "Ethiopian Orthodox Church Official"
      },
      {
        belief: "Ark of the Covenant",
        description: "Ethiopian tradition holds that the Ark of the Covenant is in Axum, brought by Menelik I, son of Solomon and Sheba. Every church has a replica (tabot) consecrating it.",
        source: "Kebra Nagast (Glory of Kings)"
      },
      {
        belief: "Judaic Practices",
        description: "Ethiopian Christianity retains Jewish customs: Saturday Sabbath, kosher-style food laws, circumcision on 8th day, and ritual purity. This reflects ancient pre-Islamic Christian traditions.",
        source: "Ethiopian Orthodoxy - Binns (2017)"
      },
      {
        belief: "Saint Veneration",
        description: "Saints, especially the Virgin Mary (Kidane Mehret), angels (especially Michael and Gabriel), and Ethiopian saints are venerated through feast days and icons.",
        source: "Encyclopedia of Ethiopian Orthodox Church"
      }
    ],
    practices: [
      { name: "Fasting (Tsom)", description: "Over 250 fasting days annually. Fasts are vegan (no animal products). Wednesday, Friday, and major fasts like Lent are strictly observed.", frequency: "Regular" },
      { name: "Daily Prayer", description: "Seven times daily prayer traditionally. Churches hold predawn services. Priests chant the Psalms of David.", frequency: "Daily" },
      { name: "Pilgrimage", description: "Pilgrimages to Lalibela (rock-hewn churches), Axum (Ark of the Covenant), and Lake Tana monasteries. Major feast days draw millions.", frequency: "Annual feasts" },
      { name: "Liturgical Dance (Debtera)", description: "Trained religious scholars perform sacred dances with sistrums and drums during major celebrations.", frequency: "Feast days" }
    ],
    rituals: [
      { name: "Timkat (Epiphany)", description: "The holiest festival, celebrating Christ's baptism. Tabots are processed to water, and mass baptismal renewal occurs. January 19.", occasion: "January 19" },
      { name: "Meskel (Finding of True Cross)", description: "Festival commemorating St. Helena finding the True Cross. Features massive bonfires (demera) and colorful processions. September 27.", occasion: "September 27" },
      { name: "Hidar Zion (St. Mary Day)", description: "Feast of St. Mary of Zion on November 30. Massive pilgrimage to Axum where the Ark is kept.", occasion: "November 30" }
    ],
    sacredTexts: [
      { name: "Ethiopian Bible (81 books)", description: "The Ethiopian Orthodox canon includes books not in other Bibles: Enoch, Jubilees, and others. The Ge'ez text is one of Christianity's oldest.", status: "written" },
      { name: "Kebra Nagast", description: "The 'Glory of Kings' narrates how the Ark came to Ethiopia and establishes the Solomonic dynasty's divine right.", status: "written" },
      { name: "Synaxarium", description: "Lives of saints read daily corresponding to the Ethiopian calendar's 13 months.", status: "written" }
    ],
    joining: {
      process: "One may convert to Ethiopian Orthodoxy through catechism, baptism, and confirmation by a priest. Born members are baptized at 40 days (boys) or 80 days (girls) and receive communion from infancy.",
      requirements: [
        "Period of instruction in the faith",
        "Baptism by triple immersion",
        "Confirmation with holy chrism",
        "Commitment to fasting and feast days"
      ],
      notes: "Ethiopian Orthodoxy is one of the oldest Christian churches, predating European Christianity. It has influenced Ethiopian culture for 1,700 years."
    },
    influence: {
      cultural: "Ethiopian Orthodoxy shaped the Ethiopian Empire, calendar, art, music, and literature. The Ge'ez script was preserved through the church. Lalibela's churches are UNESCO sites.",
      modern: "About 44% of Ethiopia is Orthodox. The church leads in education and social services. Diaspora communities maintain strong ties.",
      diaspora: "Ethiopian Orthodox churches exist worldwide. Rastafari movement drew inspiration from Ethiopian Christianity and Haile Selassie."
    },
    tribesFollowing: [
      { tribeSlug: "amhara", tribeName: "Amhara", percentage: 85, notes: "Historically the imperial church" },
      { tribeSlug: "tigray", tribeName: "Tigray", percentage: 90, notes: "Axum is in Tigray" },
      { tribeSlug: "oromo", tribeName: "Oromo", percentage: 35, notes: "Mixed with other faiths" },
      { tribeSlug: "gurage", tribeName: "Gurage", percentage: 50, notes: "Mixed Orthodox and other" }
    ],
    sources: [
      { name: "Ethiopian Orthodox Tewahedo Church", url: "https://en.wikipedia.org/wiki/Ethiopian_Orthodox_Tewahedo_Church" },
      { name: "Britannica - Ethiopian Orthodox", url: "https://www.britannica.com/topic/Ethiopian-Orthodox-Tewahedo-Church" },
      { name: "UNESCO - Lalibela", url: "https://whc.unesco.org/en/list/18" }
    ]
  },
  {
    id: "christianity-africa",
    name: "Christianity in Africa",
    alternateNames: ["African Christianity", "African Churches"],
    region: "Pan-African",
    estimatedFollowers: "~700 million",
    countryBreakdown: [
      { country: "Nigeria", flag: "🇳🇬", percentage: 20 },
      { country: "Ethiopia", flag: "🇪🇹", percentage: 8 },
      { country: "DR Congo", flag: "🇨🇩", percentage: 12 },
      { country: "South Africa", flag: "🇿🇦", percentage: 8 },
      { country: "Kenya", flag: "🇰🇪", percentage: 6 },
      { country: "Other", flag: "🌍", percentage: 46 }
    ],
    supremeDeity: {
      name: "God (Trinity)",
      description: "The triune God - Father, Son (Jesus Christ), and Holy Spirit. African Christianity emphasizes Jesus as liberator, healer, and ancestor. Many African expressions incorporate charismatic gifts and spiritual warfare.",
      attributes: ["Creator", "Savior", "Holy Spirit", "Healer", "Provider"]
    },
    tenets: [
      {
        belief: "Jesus Christ as Lord and Savior",
        description: "Salvation through faith in Jesus Christ who died and rose again. African Christianity often emphasizes Jesus's power over evil spirits and His role as the ultimate ancestor and mediator.",
        source: "World Christianity: An Introduction - Chow (2016)"
      },
      {
        belief: "The Bible as Scripture",
        description: "The Bible as the inspired word of God. African Christians often interpret scripture through cultural lenses, finding parallels with African worldviews on ancestors, spirits, and community.",
        source: "African Theology - Mbiti (1986)"
      },
      {
        belief: "Holy Spirit Power",
        description: "Pentecostal and Charismatic Christianity is dominant in Africa, emphasizing spiritual gifts, healing, prophecy, and deliverance from demonic forces.",
        source: "African Pentecostalism - Kalu (2008)"
      },
      {
        belief: "Community and Ubuntu",
        description: "African Christianity emphasizes communal faith expression, collective worship, and mutual responsibility - aligning with traditional African values of community.",
        source: "African Christian Theology - Bujo (1992)"
      }
    ],
    practices: [
      { name: "Sunday Worship", description: "Extended worship services featuring lively music, dancing, prayer, and preaching. Services often last 2-4 hours.", frequency: "Weekly" },
      { name: "Overnight Prayer Vigils", description: "All-night prayer meetings common in Pentecostal churches, seeking spiritual breakthrough and protection.", frequency: "Regular" },
      { name: "Tithing and Offerings", description: "Financial contributions to church, often seen as seed-sowing for blessings. Prosperity gospel is influential.", frequency: "Regular" },
      { name: "Deliverance Services", description: "Rituals to cast out demons and break curses. Addresses African concerns about witchcraft and spiritual attacks.", frequency: "As needed" }
    ],
    rituals: [
      { name: "Water Baptism", description: "Immersion baptism as public declaration of faith. River baptisms are popular, connecting to biblical imagery.", occasion: "After conversion" },
      { name: "Confirmation/First Communion", description: "In Catholic and mainline churches, marking full church membership after instruction.", occasion: "Adolescence" },
      { name: "Anointing with Oil", description: "Praying over the sick with anointing oil for healing and protection.", occasion: "Illness/need" }
    ],
    sacredTexts: [
      { name: "The Bible", description: "The 66-book Protestant canon or 73-book Catholic canon. Many African translations exist. Oral reading and memorization are important.", status: "written" },
      { name: "Hymn Books", description: "African Christian hymnody blending Western hymns with African musical traditions and indigenous compositions.", status: "written" }
    ],
    joining: {
      process: "Varies by denomination: Pentecostal churches emphasize a conversion experience ('born again'), Catholic/mainline churches have catechism periods. Public confession of faith and baptism are common.",
      requirements: [
        "Faith in Jesus Christ",
        "Repentance from sin",
        "Water baptism",
        "Church membership (varies by denomination)"
      ],
      notes: "Christianity arrived in North Africa in the 1st century and Ethiopia in the 4th. Missionary Christianity spread south from the 15th century. African-initiated churches emerged from the 19th century."
    },
    influence: {
      cultural: "Christianity has profoundly shaped African education, healthcare, literature, and music. African gospel music has global influence. Churches are major social institutions.",
      modern: "Africa has the fastest-growing Christian population globally. Nigerian and Ghanaian megachurches have worldwide reach. African missionaries are sent globally.",
      diaspora: "African Christian communities thrive in Europe and Americas. Redeemed Christian Church of God (Nigeria) has thousands of parishes worldwide."
    },
    tribesFollowing: [
      { tribeSlug: "kikuyu", tribeName: "Kikuyu", percentage: 80, notes: "Majority Christian" },
      { tribeSlug: "igbo", tribeName: "Igbo", percentage: 85, notes: "Strongly Christian region" },
      { tribeSlug: "yoruba", tribeName: "Yoruba", percentage: 40, notes: "Mixed with Islam and traditional" },
      { tribeSlug: "zulu", tribeName: "Zulu", percentage: 70, notes: "Many syncretic practices" },
      { tribeSlug: "akan", tribeName: "Akan/Ashanti", percentage: 75, notes: "Strong Christian presence" }
    ],
    sources: [
      { name: "Pew Research - Christianity in Africa", url: "https://www.pewresearch.org/religion/2011/12/19/global-christianity-regions/" },
      { name: "World Christianity - Johnson & Ross", url: "https://en.wikipedia.org/wiki/Christianity_in_Africa" },
      { name: "African Christian Theology", url: "https://www.britannica.com/topic/Christianity" }
    ]
  },
  {
    id: "islam-africa",
    name: "Islam in Africa",
    alternateNames: ["African Islam", "Sub-Saharan Islam"],
    region: "Pan-African",
    estimatedFollowers: "~500 million",
    countryBreakdown: [
      { country: "Egypt", flag: "🇪🇬", percentage: 18 },
      { country: "Nigeria", flag: "🇳🇬", percentage: 20 },
      { country: "Algeria", flag: "🇩🇿", percentage: 9 },
      { country: "Morocco", flag: "🇲🇦", percentage: 8 },
      { country: "Sudan", flag: "🇸🇩", percentage: 9 },
      { country: "Other", flag: "🌍", percentage: 36 }
    ],
    supremeDeity: {
      name: "Allah",
      description: "The one God (Allah) as revealed to Prophet Muhammad. African Islam emphasizes Allah's mercy, power, and guidance. Sufi traditions are prominent, emphasizing mystical union with the divine.",
      attributes: ["One God", "All-Merciful", "All-Knowing", "Creator", "Judge"]
    },
    tenets: [
      {
        belief: "Shahada (Declaration of Faith)",
        description: "'There is no god but Allah, and Muhammad is His messenger.' The central creed of Islam, recited in Arabic, marking entry into the faith.",
        source: "The Oxford Handbook of Islam"
      },
      {
        belief: "Five Pillars of Islam",
        description: "Faith (Shahada), Prayer (Salat), Charity (Zakat), Fasting (Sawm), Pilgrimage (Hajj). These form the core obligations of Muslim life.",
        source: "Encyclopedia of Islam"
      },
      {
        belief: "Quran as God's Word",
        description: "The Quran is the literal, unchanged word of Allah revealed to Muhammad. African Muslims often memorize it in Arabic even without speaking Arabic.",
        source: "Introduction to Islam - Denny"
      },
      {
        belief: "Sufi Spirituality",
        description: "Sufi brotherhoods (tariqas) like Tijaniyya, Qadiriyya, and Muridiyya are influential in African Islam, emphasizing spiritual masters, dhikr (remembrance), and saints.",
        source: "Sufism in Africa - Vikør"
      }
    ],
    practices: [
      { name: "Salat (Five Daily Prayers)", description: "Prayers performed at dawn, noon, afternoon, sunset, and night, facing Mecca. Friday noon prayer (Jumu'ah) is congregational.", frequency: "5 times daily" },
      { name: "Ramadan Fasting", description: "Month-long fast from dawn to sunset. Breaking fast (iftar) is a communal celebration. Eid al-Fitr marks the end.", frequency: "Annual" },
      { name: "Quran Schools (Madrasa)", description: "Islamic education where children memorize the Quran. Mali, Senegal, and Nigeria have famous centers of learning.", frequency: "Daily" },
      { name: "Mawlid (Prophet's Birthday)", description: "Celebration of Muhammad's birth with poetry, processions, and feasting. Especially elaborate in Sufi communities.", frequency: "Annual" }
    ],
    rituals: [
      { name: "Hajj Pilgrimage", description: "Pilgrimage to Mecca at least once in a lifetime if able. African Muslims travel in large groups. 'Alhaji/Alhaja' is an honorific for those who have completed it.", occasion: "Once in lifetime" },
      { name: "Eid al-Adha", description: "Festival of Sacrifice commemorating Ibrahim's willingness to sacrifice his son. Sheep, goats, or cattle are slaughtered and meat shared.", occasion: "Annual" },
      { name: "Tabaski", description: "West African name for Eid al-Adha. Major celebration with new clothes, feasting, and family gatherings.", occasion: "Annual" }
    ],
    sacredTexts: [
      { name: "Quran", description: "The holy book of Islam, 114 suras (chapters) revealed to Prophet Muhammad. Recitation in Arabic is spiritually valued.", status: "written" },
      { name: "Hadith", description: "Collections of Prophet Muhammad's sayings and actions. Used for guidance on daily life and religious practice.", status: "written" },
      { name: "Sufi Poetry", description: "Devotional poetry from Sufi masters. Timbuktu manuscripts and West African writings are renowned.", status: "written" }
    ],
    joining: {
      process: "Converting to Islam requires sincerely reciting the Shahada before witnesses. Male converts undergo circumcision if not already circumcised. Islamic education follows.",
      requirements: [
        "Sincere recitation of Shahada",
        "Intention to follow Islamic law",
        "Circumcision (for males)",
        "Basic learning of prayers and practice"
      ],
      notes: "Islam arrived in Africa in the 7th century, first in Egypt and North Africa, then spreading via trade routes across the Sahara and along the East African coast. It has been in Africa almost as long as in Arabia."
    },
    influence: {
      cultural: "Islam shaped African empires (Mali, Songhai, Sokoto), architecture (Great Mosque of Djenné), scholarship (Timbuktu manuscripts), and law. Arabic script was adapted for African languages.",
      modern: "Islam continues growing in Africa. Sufi brotherhoods remain influential in politics and society. Islamic finance and education are expanding.",
      diaspora: "African Muslim communities exist globally. The Mouride brotherhood (Senegal) has significant diaspora presence."
    },
    tribesFollowing: [
      { tribeSlug: "hausa", tribeName: "Hausa", percentage: 95, notes: "Predominantly Muslim since Sokoto Caliphate" },
      { tribeSlug: "fulani", tribeName: "Fulani", percentage: 90, notes: "Historically spread Islam in West Africa" },
      { tribeSlug: "somali", tribeName: "Somali", percentage: 99, notes: "Almost entirely Muslim" },
      { tribeSlug: "swahili", tribeName: "Swahili", percentage: 95, notes: "Islam central to Swahili culture" },
      { tribeSlug: "wolof", tribeName: "Wolof", percentage: 94, notes: "Muridiyya Sufi influence strong" },
      { tribeSlug: "mandinka", tribeName: "Mandinka", percentage: 90, notes: "Strong Islamic tradition" }
    ],
    sources: [
      { name: "Pew Research - Islam in Africa", url: "https://www.pewresearch.org/religion/2011/01/27/the-future-of-the-global-muslim-population/" },
      { name: "Encyclopedia of Islam", url: "https://en.wikipedia.org/wiki/Islam_in_Africa" },
      { name: "Sufism in West Africa", url: "https://www.britannica.com/topic/Islam" }
    ]
  }
];

// Helper functions
export const getReligionById = (id: string): TraditionalReligionData | undefined => {
  return traditionalReligions.find(r => r.id === id);
};

export const getAllReligions = (): TraditionalReligionData[] => {
  return traditionalReligions;
};

export const getReligionsByRegion = (region: string): TraditionalReligionData[] => {
  return traditionalReligions.filter(r => r.region === region);
};

// Find religion by name for linking from tribe pages
export const findReligionByName = (religionName: string): TraditionalReligionData | undefined => {
  const searchTerm = religionName.toLowerCase();
  return traditionalReligions.find(r => 
    r.name.toLowerCase().includes(searchTerm) ||
    r.id.toLowerCase().includes(searchTerm) ||
    r.alternateNames?.some(alt => alt.toLowerCase().includes(searchTerm)) ||
    r.supremeDeity.name.toLowerCase().includes(searchTerm)
  );
};
