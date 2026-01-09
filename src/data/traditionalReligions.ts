// Traditional African Religions Database
// Comprehensive data for major traditional belief systems

export interface TraditionalReligionData {
  id: string;
  name: string;
  alternateNames?: string[];
  region: string;
  estimatedFollowers: string;
  youtubeVideoId?: string; // For documentary/educational videos
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
    youtubeVideoId: "3Gt0GqK4pjU",
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
    youtubeVideoId: "gE1v9HHp5kQ",
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
    youtubeVideoId: "Y5tH-GyLuSA",
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
    youtubeVideoId: "XpLFKLo-CvM",
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
  },
  {
    id: "vodun-religion",
    name: "Vodun (West African Vodou)",
    alternateNames: ["Voodoo", "Vodou", "Vodu", "Vudu"],
    region: "West Africa",
    estimatedFollowers: "~60 million (including diaspora syncretism)",
    youtubeVideoId: "RBUlZT1XoQU",
    countryBreakdown: [
      { country: "Benin", flag: "🇧🇯", percentage: 35 },
      { country: "Togo", flag: "🇹🇬", percentage: 20 },
      { country: "Ghana", flag: "🇬🇭", percentage: 10 },
      { country: "Nigeria", flag: "🇳🇬", percentage: 15 },
      { country: "Haiti (diaspora)", flag: "🇭🇹", percentage: 10 },
      { country: "Other diaspora", flag: "🌍", percentage: 10 }
    ],
    supremeDeity: {
      name: "Mawu-Lisa",
      description: "The supreme creator deity, often described as a dual god - Mawu (female, moon, night, fertility) and Lisa (male, sun, day, strength). Together they created the universe and the vodun spirits. In some traditions, Nana Buluku is above Mawu-Lisa as the primordial creator.",
      attributes: ["Creator Dual-Deity", "Moon and Sun", "Source of Vodun", "Cosmic Balance"]
    },
    tenets: [
      {
        belief: "Vodun Spirits",
        description: "Vodun are divine spirits that govern nature, human affairs, and the cosmos. Each vodun has specific domains (sea, thunder, iron, smallpox). Humans interact with vodun through offerings, dance, and possession.",
        source: "Mama Lola: A Vodou Priestess - Brown (1991)"
      },
      {
        belief: "Ancestor Communion",
        description: "The dead remain connected to the living. Ancestors (tovodu) are venerated through regular offerings. Neglecting ancestors causes misfortune. The dead can be consulted through divination.",
        source: "Sacred Arts of Haitian Vodou - Cosentino (1995)"
      },
      {
        belief: "Fa/Ifa Divination",
        description: "Complex divination system using palm nuts or cowrie shells. Bokonon (diviners) interpret 256 signs to reveal the will of Fa and provide guidance. Related to Yoruba Ifá.",
        source: "Encyclopedia of African Religion - Asante"
      },
      {
        belief: "Sacred Possession",
        description: "Vodun spirits mount (possess) devotees during ceremonies. The possessed person becomes the vodun's 'horse,' speaking and acting as the deity. This is the highest form of communion.",
        source: "Divine Horsemen - Deren (1953)"
      }
    ],
    practices: [
      { name: "Vodun Ceremonies", description: "Rituals with drumming, dancing, singing, and offerings to invite vodun presence. Each vodun has specific rhythms and colors.", frequency: "Regular/feast days" },
      { name: "Fa Consultation", description: "Divination sessions with Bokonon priests to determine the will of spirits and receive life guidance.", frequency: "As needed" },
      { name: "Offerings and Sacrifice", description: "Food, drink, and animal offerings to vodun and ancestors. The blood of sacrifice carries ashé (spiritual power).", frequency: "Regular" },
      { name: "Zangbeto (Night Watchmen)", description: "Masked guardians that patrol villages at night, believed to house powerful spirits that protect the community.", frequency: "Ongoing" }
    ],
    rituals: [
      { name: "Vodun National Day", description: "January 10 is official Vodun Day in Benin. Massive celebrations at Ouidah with devotees worldwide. Government-recognized holiday since 1996.", occasion: "January 10" },
      { name: "Initiation (Vodunsi)", description: "Becoming a vodun initiate involves seclusion in a convent (vodunkpamè), learning sacred knowledge, receiving the vodun, and emerging reborn.", occasion: "Calling by spirits" },
      { name: "Funeral Rites", description: "Elaborate ceremonies to ensure the deceased joins the ancestors properly. Improper burial creates wandering spirits.", occasion: "Death" }
    ],
    sacredTexts: [
      { name: "Fa Corpus", description: "256 odus (signs) with associated myths, proverbs, and prescriptions. Memorized by Bokonon priests over years of training.", status: "oral" },
      { name: "Vodun Songs and Chants", description: "Sacred songs for each vodun, encoding mythology and invoking their presence.", status: "oral" }
    ],
    joining: {
      process: "One may be called by a vodun through dreams, illness, or divination. Initiation involves a period of seclusion (weeks to months), learning sacred knowledge, and receiving the vodun through ceremonies.",
      requirements: [
        "Called by a vodun (through signs/divination)",
        "Acceptance by a vodun priest/priestess",
        "Period of seclusion and training",
        "Initiation ceremony",
        "Ongoing service to the vodun"
      ],
      notes: "Vodun is the official religion of Benin. It influenced Haitian Vodou, Cuban Santería (via Yoruba), and Louisiana Voodoo. The Hollywood portrayal as 'black magic' is a harmful stereotype."
    },
    influence: {
      cultural: "Vodun shaped the Kingdom of Dahomey's political and military systems. The Amazons of Dahomey were devoted to war vodun. Art and music are deeply connected to vodun practice.",
      modern: "Benin recognized Vodun as an official religion in 1996. Vodun festivals attract global tourists. Vodun temples and practices are UNESCO-documented.",
      diaspora: "Enslaved people brought Vodun to the Americas, creating Haitian Vodou, Cuban Regla de Ocha, Brazilian Candomblé, and New Orleans Voodoo."
    },
    tribesFollowing: [
      { tribeSlug: "fon", tribeName: "Fon", percentage: 65, notes: "Vodun's historical center in Dahomey" },
      { tribeSlug: "ewe", tribeName: "Ewe", percentage: 55, notes: "Strong vodun tradition" },
      { tribeSlug: "mina", tribeName: "Mina", percentage: 50, notes: "Coastal vodun practitioners" },
      { tribeSlug: "adja", tribeName: "Adja", percentage: 45, notes: "Related tradition" }
    ],
    sources: [
      { name: "Wikipedia - West African Vodun", url: "https://en.wikipedia.org/wiki/West_African_Vodun" },
      { name: "Britannica - Vodou", url: "https://www.britannica.com/topic/Vodou" },
      { name: "UNESCO - Vodun Culture", url: "https://ich.unesco.org/en/RL/oral-heritage-of-gelede-00002" }
    ]
  },
  {
    id: "serer-religion",
    name: "Serer Religion (A ƭat Roog)",
    alternateNames: ["Roog worship", "A ƭat Roog", "Serer Traditional Religion"],
    region: "West Africa",
    estimatedFollowers: "~1.5 million",
    youtubeVideoId: "pa-HNLxRzWc",
    countryBreakdown: [
      { country: "Senegal", flag: "🇸🇳", percentage: 85 },
      { country: "Gambia", flag: "🇬🇲", percentage: 10 },
      { country: "Mauritania", flag: "🇲🇷", percentage: 5 }
    ],
    supremeDeity: {
      name: "Roog (Roog Sene/Koox)",
      description: "The supreme creator god, invisible and omnipotent. Roog created the universe, humanity, and all living things. Unlike intermediary spirits, Roog is approached directly through prayer. Roog is neither male nor female but the source of all.",
      attributes: ["Supreme Creator", "Omnipotent", "Invisible", "Source of Justice"]
    },
    tenets: [
      {
        belief: "Pangool (Ancestral Spirits)",
        description: "Pangool are ancestral spirits and saints who intercede between Roog and humans. They are venerated at shrines and sacred groves. Some pangool were historical figures who achieved sainthood.",
        source: "Serer Religion - Wikipedia/Academic sources"
      },
      {
        belief: "Jom (Honor/Dignity)",
        description: "Central ethical concept meaning honor, dignity, and moral integrity. A person with Jom keeps promises, respects elders, and acts with courage. Loss of Jom brings shame.",
        source: "The Serer People - Gravrand"
      },
      {
        belief: "Sacredness of Nature",
        description: "Trees, springs, and certain animals are sacred. The baobab tree is especially holy. Sacred forests (bosquets sacrés) are protected sanctuaries for pangool.",
        source: "Serer Cosmogony - Gravrand"
      },
      {
        belief: "Reincarnation (Ciiɗ)",
        description: "The soul (fit) reincarnates within the family lineage. Naming ceremonies identify which ancestor has returned. The cycle continues until final union with Roog.",
        source: "The Civilizations of Senegambia - Gravrand"
      }
    ],
    practices: [
      { name: "Xooy (Divination Ceremony)", description: "Annual gathering of Serer seers (Saltigué) who make prophecies for the coming year. Held in Fatick region. A major cultural event.", frequency: "Annual" },
      { name: "Libation to Pangool", description: "Pouring millet beer or water at pangool shrines while reciting prayers. Done for blessings, healing, or thanks.", frequency: "Regular" },
      { name: "Ndut (Initiation)", description: "Coming-of-age initiation for boys in sacred forests. Involves circumcision, teaching of sacred knowledge, and emergence as men.", frequency: "Adolescence" },
      { name: "Sacred Wrestling", description: "Serer wrestling (Njom) has religious dimensions. Wrestlers are blessed by Saltigué and call on pangool for strength.", frequency: "Seasonal" }
    ],
    rituals: [
      { name: "Funeral Rites", description: "Elaborate ceremonies lasting days. The deceased is prepared, mourned, and guided to join the pangool. Professional mourners and wrestlers participate.", occasion: "Death" },
      { name: "Naming Ceremony (Ngénte)", description: "Seven days after birth, the child is named. A Saltigué divines which ancestor has reincarnated. Sacrifices and feasting follow.", occasion: "Birth + 7 days" },
      { name: "Harvest Thanksgiving", description: "After harvest, first fruits are offered to Roog and pangool. Community feasting celebrates the earth's blessing.", occasion: "Post-harvest" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Creation myths, pangool histories, and ethical teachings passed through griots and Saltigué priests.", status: "oral" },
      { name: "Proverbs and Songs", description: "Wisdom literature encoding Serer ethics and worldview. Sung at ceremonies and taught to youth.", status: "oral" }
    ],
    joining: {
      process: "Serer religion is closely tied to Serer ethnicity and lineage. One is born into it through family. Initiation (Ndut) marks full membership. Some Saltigué are called through visions.",
      requirements: [
        "Serer birth or adoption into family",
        "Completion of initiation (Ndut for males)",
        "Knowledge of family pangool and taboos",
        "Acceptance by elders and Saltigué"
      ],
      notes: "Many Serer are nominally Muslim or Christian but maintain traditional practices, especially for funerals, naming, and the Xooy ceremony. Serer presidents of Senegal (Senghor, Sall) have participated in traditional ceremonies."
    },
    influence: {
      cultural: "Serer religion shaped the Serer kingdoms of Sine and Saloum. Serer wrestling is Senegal's national sport. Serer cosmology influenced Senegalese philosophy.",
      modern: "The Xooy ceremony attracts national media attention. Serer sacred forests are conservation sites. Some educated Serer are reviving traditional practices."
    },
    tribesFollowing: [
      { tribeSlug: "serer", tribeName: "Serer", percentage: 30, notes: "Many syncretic with Islam/Christianity" },
      { tribeSlug: "niominka", tribeName: "Niominka (Serer)", percentage: 40, notes: "Island Serer with strong tradition" },
      { tribeSlug: "ndut", tribeName: "Ndut", percentage: 35, notes: "Related group" }
    ],
    sources: [
      { name: "Wikipedia - Serer religion", url: "https://en.wikipedia.org/wiki/Serer_religion" },
      { name: "Henry Gravrand - Serer Studies", url: "https://en.wikipedia.org/wiki/Henry_Gravrand" },
      { name: "Britannica - Serer people", url: "https://www.britannica.com/topic/Serer" }
    ]
  },
  {
    id: "bwiti-religion",
    name: "Bwiti",
    alternateNames: ["Bouiti", "Bwete", "Iboga tradition"],
    region: "Central Africa",
    estimatedFollowers: "~2 million",
    youtubeVideoId: "W7RTY5o_2MM",
    countryBreakdown: [
      { country: "Gabon", flag: "🇬🇦", percentage: 70 },
      { country: "Cameroon", flag: "🇨🇲", percentage: 15 },
      { country: "Republic of Congo", flag: "🇨🇬", percentage: 10 },
      { country: "Equatorial Guinea", flag: "🇬🇶", percentage: 5 }
    ],
    supremeDeity: {
      name: "Nzame (Nzambe)",
      description: "The supreme creator god who made the universe and humanity. Nzame is the ultimate source but is accessed through iboga visions, ancestors, and the Bwiti spirits. In some branches, Bwiti itself is the personified divine force.",
      attributes: ["Creator", "Source of Visions", "Cosmic Father", "Ultimate Truth"]
    },
    tenets: [
      {
        belief: "Iboga as Sacrament",
        description: "The iboga plant (Tabernanthe iboga) is the central sacrament. Consuming iboga root bark induces visionary states allowing communication with ancestors and direct experience of spiritual truth. Iboga is considered the 'Tree of Knowledge.'",
        source: "Bwiti: An Ethnography - Fernandez (1982)"
      },
      {
        belief: "Ancestral Wisdom",
        description: "Ancestors (bwiti) are the repository of wisdom. Through iboga visions, initiates meet ancestors who reveal life's purpose, heal traumas, and provide guidance. The dead are not gone but transformed.",
        source: "The Iboga Experience - Goutarel"
      },
      {
        belief: "Unity of All Life",
        description: "Bwiti teaches the interconnection of all living things. The forest is sacred. Humans, animals, plants, and spirits form one community. Harming nature harms oneself.",
        source: "Forest of Symbols - Turner"
      },
      {
        belief: "Rebirth Through Initiation",
        description: "Initiation is a symbolic death and rebirth. The initiate 'dies' under iboga's influence, meets the ancestors, and is 'reborn' with new knowledge and purpose.",
        source: "Bwiti Initiation - Samorini"
      }
    ],
    practices: [
      { name: "Ngozé (Night Ceremonies)", description: "All-night ceremonies with iboga, dancing, singing, and torch-lit processions. The community supports those journeying on iboga.", frequency: "Regular/initiations" },
      { name: "Sacred Music (Ngombi)", description: "The mouth bow (ngombi) produces hypnotic music central to Bwiti. Rhythms guide the visionary journey and invoke spirits.", frequency: "All ceremonies" },
      { name: "Confession and Healing", description: "Initiates confess their lives under iboga, releasing traumas. The community witnesses and supports transformation.", frequency: "Initiations" },
      { name: "Forest Medicines", description: "Bwiti includes extensive plant medicine knowledge beyond iboga. Healers (nganga) use dozens of plants for physical and spiritual ailments.", frequency: "Ongoing" }
    ],
    rituals: [
      { name: "Initiation (Ndem)", description: "Multi-day ceremony where the initiate consumes large amounts of iboga, experiences visions, meets ancestors, and is reborn as a Bwiti member.", occasion: "Calling/readiness" },
      { name: "Funeral Rites", description: "Bwiti funerals guide the deceased to the ancestors. Living family members may take iboga to communicate with the departing soul.", occasion: "Death" },
      { name: "Annual Celebrations", description: "Communities gather annually for major ceremonies celebrating Bwiti, the forest, and communal bonds.", occasion: "Annual" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Creation myths, initiatic teachings, and sacred songs passed down through Bwiti lineages. Much is secret, revealed only to initiates.", status: "oral" },
      { name: "Ngombi Songs", description: "Sacred songs accompanying ceremonies, encoding spiritual teachings and guiding the iboga journey.", status: "oral" }
    ],
    joining: {
      process: "Initiation requires finding a Bwiti community willing to accept you. After preparation, the initiate undergoes an intense multi-day ceremony involving large doses of iboga, during which they experience visions and symbolic death/rebirth.",
      requirements: [
        "Sincere desire to learn and transform",
        "Acceptance by a Bwiti community/nganga",
        "Physical and psychological readiness",
        "Completion of initiation ceremony",
        "Ongoing participation in community"
      ],
      notes: "Bwiti was originally practiced by the Pygmy peoples (Babongo/Mitsogo) of Gabon. The Fang adopted it in the 19th century. Today there are many branches including syncretic Christian forms. Iboga is legal in Gabon but controlled elsewhere."
    },
    influence: {
      cultural: "Bwiti is central to Gabonese national identity. President Omar Bongo was initiated. It preserved forest spirituality against colonialism.",
      modern: "Ibogaine (from iboga) is studied globally for addiction treatment. Gabon declared iboga a national treasure. Eco-tourism connects to Bwiti.",
      diaspora: "Bwiti practices are emerging in Europe and Americas, though controversial due to ibogaine's power and legal status."
    },
    tribesFollowing: [
      { tribeSlug: "fang", tribeName: "Fang", percentage: 45, notes: "Major adopters in 19th century" },
      { tribeSlug: "mitsogo", tribeName: "Mitsogo", percentage: 70, notes: "Original practitioners" },
      { tribeSlug: "babongo", tribeName: "Babongo (Pygmies)", percentage: 65, notes: "Original forest tradition" },
      { tribeSlug: "punu", tribeName: "Punu", percentage: 35, notes: "Some Bwiti lineages" }
    ],
    sources: [
      { name: "Wikipedia - Bwiti", url: "https://en.wikipedia.org/wiki/Bwiti" },
      { name: "Bwiti: An Ethnography - Fernandez", url: "https://www.jstor.org/stable/j.ctt32bnh4" },
      { name: "Britannica - Iboga", url: "https://www.britannica.com/plant/iboga" }
    ]
  },
  {
    id: "igbo-odinani",
    name: "Igbo Odinani",
    alternateNames: ["Odinala", "Omenala", "Igbo Traditional Religion"],
    region: "West Africa",
    estimatedFollowers: "~3 million (with syncretic practitioners)",
    youtubeVideoId: "v8XZ3QOWXFU",
    countryBreakdown: [
      { country: "Nigeria", flag: "🇳🇬", percentage: 95 },
      { country: "Cameroon", flag: "🇨🇲", percentage: 3 },
      { country: "Diaspora", flag: "🌍", percentage: 2 }
    ],
    supremeDeity: {
      name: "Chukwu (Chi-Ukwu)",
      description: "The supreme creator god whose name means 'Great Chi' or 'Great Spirit'. Chukwu is the source of all existence, too great to approach directly. Worship flows through intermediary spirits (Alusi) and ancestors.",
      attributes: ["Supreme Creator", "Source of Chi (Life Force)", "Omnipotent", "Distant but All-Knowing"]
    },
    tenets: [
      {
        belief: "Chi (Personal Spirit)",
        description: "Every person has a Chi - a personal god or divine spark given by Chukwu before birth. Your Chi determines your destiny and fortune. 'Onye kwe, Chi ya ekwe' - when a person agrees, their Chi agrees.",
        source: "Things Fall Apart - Chinua Achebe (1958)"
      },
      {
        belief: "Ofo na Ogu (Truth and Justice)",
        description: "The sacred symbols of moral authority. Ofo represents truth and righteousness. One who holds Ofo must be morally upright, as wrongdoing brings spiritual consequences.",
        source: "Igbo Traditional Religion - Uchendu (1965)"
      },
      {
        belief: "Ala (Earth Goddess)",
        description: "Ala is the earth goddess, guardian of morality, fertility, and the dead. Crimes against the earth (aru ala) like murder or adultery require purification rituals.",
        source: "Britannica - Igbo Religion"
      },
      {
        belief: "Reincarnation (Ilo Uwa)",
        description: "Ancestors return through reincarnation, often within the same family. Diviners identify which ancestor has returned in a newborn. Names often reflect this belief.",
        source: "Igbo Worldview - Onwuejeogwu (1981)"
      }
    ],
    practices: [
      { name: "Divination (Afa)", description: "Dibia (priests) consult oracle systems to determine causes of problems and prescribe solutions. Multiple divination methods exist.", frequency: "As needed" },
      { name: "Alusi Worship", description: "Spirits governing various aspects of life receive offerings at shrines. Each village has patron Alusi with dedicated priests.", frequency: "Regular" },
      { name: "Kolanut Ceremony", description: "Breaking and sharing kolanut begins all significant gatherings. Prayers are said while presenting kolanut to ancestors and spirits.", frequency: "Daily/Ceremonial" },
      { name: "Masquerade Tradition", description: "Masked spirits (Mmanwu) represent ancestors and spirits. They appear at festivals, funerals, and to enforce social order.", frequency: "Ceremonial" }
    ],
    rituals: [
      { name: "Igu Aro (New Yam Festival)", description: "Annual celebration of first harvest. Yams are offered to Ala and ancestors before consumption. A major community gathering.", occasion: "August/September" },
      { name: "Iwa Akwa (Coming of Age)", description: "Young men's initiation into adulthood, marking independence and responsibility. Involves community celebration and gift-giving.", occasion: "Adulthood" },
      { name: "Second Burial", description: "Elaborate funeral rites for the deceased to ensure proper passage to ancestorhood. May occur months after initial burial.", occasion: "Death of elders" }
    ],
    sacredTexts: [
      { name: "Oral Traditions", description: "Creation myths, proverbs (ilu), and stories encoding Odinani philosophy. Passed through dibia, elders, and griots.", status: "oral" },
      { name: "Odu Chukwu", description: "Sacred verses and divination poetry similar to Yoruba Odu Ifa, containing spiritual and ethical teachings.", status: "oral" }
    ],
    joining: {
      process: "One is typically born into Odinani through Igbo lineage. Each person receives their Chi at birth. Deeper participation involves consulting dibia and receiving initiation into specific Alusi cults.",
      requirements: [
        "Igbo heritage or adoption into Igbo family",
        "Consultation with Dibia for Chi alignment",
        "Learning of rituals and taboos",
        "Initiation into Alusi worship if called"
      ],
      notes: "Christianity heavily impacted Odinani. Many Igbo practice syncretically. Revival movements (Odinala Ndi Igbo) are growing among diaspora and educated Igbo."
    },
    influence: {
      cultural: "Odinani shaped Igbo republicanism, democratic village assemblies, and the saying 'Igbo enwe eze' (Igbo have no king). Art, music, and festivals remain influenced.",
      modern: "Chinua Achebe's novels brought global attention. Academic study is growing. Some Igbo-Americans are reviving practices.",
      diaspora: "Interest in African spirituality has sparked Odinani revival among African-Americans tracing Igbo ancestry."
    },
    tribesFollowing: [
      { tribeSlug: "igbo", tribeName: "Igbo", percentage: 25, notes: "Majority syncretic with Christianity" },
      { tribeSlug: "ibibio", tribeName: "Ibibio", percentage: 15, notes: "Related traditions" },
      { tribeSlug: "ijaw", tribeName: "Ijaw", percentage: 10, notes: "Some shared practices" }
    ],
    sources: [
      { name: "Wikipedia - Odinani", url: "https://en.wikipedia.org/wiki/Odinani" },
      { name: "Britannica - Igbo Religion", url: "https://www.britannica.com/topic/Igbo-religion" },
      { name: "Igbo Traditional Religion - Uchendu", url: "https://www.jstor.org/stable/1156679" }
    ]
  },
  {
    id: "san-bushmen",
    name: "San/Bushmen Religion",
    alternateNames: ["Khoisan Spirituality", "First People's Religion", "|Xam beliefs"],
    region: "Southern Africa",
    estimatedFollowers: "~100,000",
    youtubeVideoId: "Y3-3zPxH_ns",
    countryBreakdown: [
      { country: "Botswana", flag: "🇧🇼", percentage: 40 },
      { country: "Namibia", flag: "🇳🇦", percentage: 35 },
      { country: "South Africa", flag: "🇿🇦", percentage: 15 },
      { country: "Angola/Zimbabwe", flag: "🌍", percentage: 10 }
    ],
    supremeDeity: {
      name: "|Kaggen (Cagn/Kaang)",
      description: "The trickster-creator god, often appearing as a praying mantis. |Kaggen created the world, gave animals their colors, and taught humans to hunt. He is mischievous, wise, and deeply connected to the eland antelope.",
      attributes: ["Creator-Trickster", "Shape-shifter", "Connected to Eland", "Source of n|om (spiritual power)"]
    },
    tenets: [
      {
        belief: "N|om (Spiritual Potency)",
        description: "A supernatural potency that healers activate during trance dances. N|om is 'heated' through intense dancing until it 'boils', enabling healers to enter the spirit world.",
        source: "Kalahari Hunter-Gatherers - Lee & DeVore (1976)"
      },
      {
        belief: "Eland Spirit",
        description: "The eland antelope is the most spiritually powerful animal. It features centrally in rock art, healing rituals, and coming-of-age ceremonies. Killing an eland requires special rituals.",
        source: "Rock Art of Southern Africa - Lewis-Williams (1990)"
      },
      {
        belief: "Spirit World Connection",
        description: "The world has layers: this world, the spirit world above, and the underworld. Shamans travel between these during trance. Rock paintings depict these journeys.",
        source: "The Mind in the Cave - Lewis-Williams (2002)"
      },
      {
        belief: "Egalitarian Ethos",
        description: "No person is above another. Sharing is mandatory. Boasting is shamed through 'insulting the meat'. The group's wellbeing supersedes individual glory.",
        source: "The !Kung San - Lee (1979)"
      }
    ],
    practices: [
      { name: "Trance Dance (Healing Dance)", description: "All-night dance where healers enter trance through rhythmic movement and hyperventilation. They heal the sick and protect the community from malevolent spirits.", frequency: "Weekly/Monthly" },
      { name: "Rock Art", description: "Painting on rock shelters depicting spiritual experiences, the eland, therianthropes (human-animal forms), and trance visions. Some sites are over 20,000 years old.", frequency: "Ceremonial/Vision-induced" },
      { name: "Storytelling", description: "Elders share creation myths and |Kaggen tales around evening fires. Stories encode survival knowledge and spiritual teachings.", frequency: "Nightly" },
      { name: "Eland Rituals", description: "When an eland is hunted, specific rituals honor its spirit. Girls' coming-of-age ceremonies involve eland symbolism.", frequency: "Ceremonial" }
    ],
    rituals: [
      { name: "First Kill (Boys)", description: "A boy's first hunt kill is marked with ritual scarification. The animal's fat is rubbed into cuts to transfer its qualities.", occasion: "First successful hunt" },
      { name: "Eland Dance (Girls)", description: "Menstruation ceremony where girls are secluded, then emerge to dance. The community celebrates with an eland-mimicking dance.", occasion: "First menstruation" },
      { name: "Rain-Making", description: "In drought, shamans travel in trance to capture a 'rain animal' and lead it across the land. Rock art depicts rain animals.", occasion: "Drought" }
    ],
    sacredTexts: [
      { name: "|Xam Narratives (Bleek & Lloyd Collection)", description: "19th-century transcription of |Xam San stories by Wilhelm Bleek and Lucy Lloyd. A crucial record of nearly-lost mythology.", status: "oral" },
      { name: "Living Oral Tradition", description: "Stories, songs, and healing knowledge passed among remaining San communities, particularly the Ju|'hoansi and !Kung.", status: "oral" }
    ],
    joining: {
      process: "San spirituality is integrated into daily life for San communities. Outsiders can respectfully learn about practices but full participation is tied to San identity. Some communities share with researchers and visitors.",
      requirements: [
        "San community membership or acceptance",
        "Learning from elder healers",
        "Participation in community life",
        "Years of observation and practice"
      ],
      notes: "San spirituality is not proselytizing. It's inseparable from their hunter-gatherer lifestyle and worldview. Colonial and modern pressures have disrupted traditions."
    },
    influence: {
      cultural: "San rock art is a world heritage treasure. Their egalitarian society influenced debates on human nature. Language contributes to understanding human origins.",
      modern: "Tourism and research bring income but also challenges. Some communities revive practices for younger generations. Films like 'The Gods Must Be Crazy' brought visibility (with controversy).",
      diaspora: "No significant diaspora; the religion is tied to the land. Some Khoi-descendant South Africans explore ancestral spirituality."
    },
    tribesFollowing: [
      { tribeSlug: "san", tribeName: "San/Bushmen", percentage: 70, notes: "Core practitioners" },
      { tribeSlug: "khoi", tribeName: "Khoikhoi", percentage: 35, notes: "Related Khoisan traditions" },
      { tribeSlug: "nama", tribeName: "Nama", percentage: 25, notes: "Shared heritage" }
    ],
    sources: [
      { name: "Wikipedia - San Religion", url: "https://en.wikipedia.org/wiki/San_religion" },
      { name: "Rock Art Research Institute", url: "https://www.wits.ac.za/rari/" },
      { name: "Britannica - San People", url: "https://www.britannica.com/topic/San" }
    ]
  },
  {
    id: "berber-religion",
    name: "Berber/Amazigh Traditional Religion",
    alternateNames: ["Amazigh Paganism", "Libyan Religion", "North African Indigenous Religion"],
    region: "North Africa",
    estimatedFollowers: "~50,000 (with syncretic elements among millions)",
    youtubeVideoId: "nCQzJTPjpQM",
    countryBreakdown: [
      { country: "Morocco", flag: "🇲🇦", percentage: 40 },
      { country: "Algeria", flag: "🇩🇿", percentage: 30 },
      { country: "Libya", flag: "🇱🇾", percentage: 15 },
      { country: "Tunisia/Mali/Niger", flag: "🌍", percentage: 15 }
    ],
    supremeDeity: {
      name: "Yakuc/Akuc (Sky God)",
      description: "The supreme sky deity worshipped across Amazigh communities under various names (Yakuc, Akuc, Yakush). Associated with weather, rain, and celestial order. Worship was largely supplanted by Islam but elements persist.",
      attributes: ["Sky God", "Rain Bringer", "Supreme Deity", "Celestial Order"]
    },
    tenets: [
      {
        belief: "Animism and Nature Spirits",
        description: "Mountains, springs, caves, and trees house spirits. The Atlas Mountains are particularly sacred. Natural phenomena reflect spiritual activity.",
        source: "Berber Culture and Language - Chaker (1989)"
      },
      {
        belief: "Ancestor Reverence",
        description: "Ancestors (Idurar) protect the living and are honored at shrines and during festivals. Family tombs receive regular offerings. The dead influence the living.",
        source: "Encyclopaedia of Islam - Berbers"
      },
      {
        belief: "Sacred Springs and Caves",
        description: "Water sources and caves are meeting points between worlds. Pilgrimages to sacred springs continue even among Muslim Berbers. Caves feature in creation myths.",
        source: "Berber Mythology - Basset (1910)"
      },
      {
        belief: "Solar and Lunar Worship",
        description: "The sun and moon held divine significance. The Amazigh calendar (Yennayer) marks solar cycles. Some festivals align with solstices.",
        source: "Ancient Libyan Religion - Brett & Fentress (1996)"
      }
    ],
    practices: [
      { name: "Yennayer (New Year)", description: "Amazigh New Year (January 12) celebrating harvest and renewal. Traditional foods, rituals, and community gatherings mark the day. Still widely practiced.", frequency: "Annual" },
      { name: "Shrine Pilgrimages", description: "Visits to saints' tombs (marabouts) and sacred natural sites. Offerings are made for blessings, healing, and fertility. Syncretic with Sufi Islam.", frequency: "Ongoing" },
      { name: "Tattoo Traditions", description: "Women's facial tattoos (now declining) carried spiritual protection and tribal identity. Designs encoded beliefs about fertility and warding evil.", frequency: "Cultural practice" },
      { name: "Music and Dance", description: "Ahwash and Ahidous gatherings combine music, dance, and poetry with spiritual and community significance.", frequency: "Festivals/Ceremonies" }
    ],
    rituals: [
      { name: "Yennayer Celebrations", description: "Families prepare special meals, especially couscous with seven vegetables. Doors are marked, new clothes worn, and ancestors remembered.", occasion: "January 12" },
      { name: "Rain Rituals (Anzar)", description: "During drought, ceremonies appeal to Anzar, the rain deity. A bride-doll is paraded and water symbolism invoked.", occasion: "Drought" },
      { name: "Marriage Rituals", description: "Traditional weddings include henna, symbolic rituals for fertility, protection against evil eye, and community feasting over multiple days.", occasion: "Marriage" }
    ],
    sacredTexts: [
      { name: "Oral Mythology", description: "Creation myths, hero stories, and moral tales passed through generations. The Tuareg Imuhagh maintain some of the richest traditions.", status: "oral" },
      { name: "Tifinagh Script", description: "Ancient Berber writing system (2000+ years old). Used for inscriptions and now revived for modern use. Carries cultural-spiritual significance.", status: "written" }
    ],
    joining: {
      process: "Traditional Amazigh religion is ethnic and cultural rather than conversion-based. Most Amazigh today practice Islam with indigenous elements. Cultural participation is open to those integrated into communities.",
      requirements: [
        "Amazigh heritage or community adoption",
        "Participation in cultural festivals",
        "Learning of Tamazight language",
        "Respect for ancestral traditions"
      ],
      notes: "Pre-Islamic Berber religion largely merged with Islam. However, distinct cultural practices survive. Amazigh identity movements are reviving interest in pre-Islamic heritage."
    },
    influence: {
      cultural: "Amazigh symbols (Aza/Yaz), calendar, and festivals endure. Berber queens like Kahina resisted Arab conquest. The Tifinagh script is UNESCO-recognized.",
      modern: "Amazigh cultural movements in Morocco and Algeria have won official recognition. Yennayer became a national holiday in Algeria (2018) and Morocco (2023).",
      diaspora: "European Amazigh diaspora maintains cultural practices. Music and art scenes keep traditions alive. Some explore pre-Islamic spirituality."
    },
    tribesFollowing: [
      { tribeSlug: "berber", tribeName: "Berber/Amazigh", percentage: 15, notes: "Cultural elements within Islam" },
      { tribeSlug: "tuareg", tribeName: "Tuareg", percentage: 20, notes: "Strong cultural retention" },
      { tribeSlug: "kabyle", tribeName: "Kabyle", percentage: 10, notes: "Some syncretic practices" },
      { tribeSlug: "riffian", tribeName: "Riffian", percentage: 10, notes: "Cultural identity focus" }
    ],
    sources: [
      { name: "Wikipedia - Traditional Berber Religion", url: "https://en.wikipedia.org/wiki/Traditional_Berber_religion" },
      { name: "Britannica - Berber", url: "https://www.britannica.com/topic/Berber" },
      { name: "Encyclopaedia of Islam", url: "https://referenceworks.brillonline.com/entries/encyclopaedia-of-islam-2/berbers" }
    ]
  },
  {
    id: "malagasy-religion",
    name: "Malagasy Traditional Religion",
    alternateNames: ["Fomba Malagasy", "Malagasy Ancestor Worship", "Razana"],
    region: "East Africa",
    estimatedFollowers: "~5 million",
    youtubeVideoId: "K7n0gFo-cVs",
    countryBreakdown: [
      { country: "Madagascar", flag: "🇲🇬", percentage: 100 }
    ],
    supremeDeity: {
      name: "Zanahary (Andriamanitra)",
      description: "The creator god who made heaven and earth. Zanahary is considered distant but omnipresent, working through ancestors (razana) who act as intermediaries between the living and divine.",
      attributes: ["Creator", "Omnipresent", "Source of Life", "Heavenly Father"]
    },
    tenets: [
      {
        belief: "Razana (Ancestor Veneration)",
        description: "The deceased ancestors continue to influence the living. Proper veneration through ritual and offerings ensures their blessing and protection. Razana can bring fortune or misfortune.",
        source: "Bloch, Maurice - Placing the Dead (1971)"
      },
      {
        belief: "Fady (Taboos)",
        description: "Sacred prohibitions that govern behavior. Fady can be personal, familial, or regional. Violating fady brings misfortune and requires purification rituals.",
        source: "Encyclopedia of Madagascar"
      },
      {
        belief: "Hasina (Sacred Life Force)",
        description: "A spiritual power inherent in all things, strongest in ancestors, rulers, and sacred objects. Hasina can be transferred, accumulated, and manipulated through ritual.",
        source: "Astuti, Rita - People of the Sea (1995)"
      },
      {
        belief: "Vintana (Destiny)",
        description: "Each person has a destiny influenced by their birth time. Astrologers (mpanandro) read vintana to determine auspicious times for important activities.",
        source: "Ruud, Jørgen - Taboo: Sacred Life Force in Madagascar (1960)"
      }
    ],
    practices: [
      { name: "Famadihana (Turning of the Bones)", description: "Every 5-7 years, families exhume ancestors' remains, rewrap them in fresh silk shrouds, and dance with them. Celebrates the bond between living and dead.", frequency: "Every 5-7 years" },
      { name: "Joro (Invocation)", description: "Prayers and offerings to ancestors, often involving rum, honey, and cattle sacrifice. Performed at family tombs or sacred stones.", frequency: "Major occasions" },
      { name: "Mpanandro Consultation", description: "Consulting traditional astrologers for auspicious dates for weddings, funerals, business ventures, and farming activities.", frequency: "As needed" },
      { name: "Tromba Spirit Possession", description: "Mediums become possessed by royal or ancestral spirits who speak through them, offering guidance and healing.", frequency: "Ceremonial" }
    ],
    rituals: [
      { name: "Famadihana", description: "The famous 'turning of the bones' ceremony. Families gather for feasting, music, and dancing while honoring ancestors. Expensive but spiritually essential.", occasion: "Every 5-7 years" },
      { name: "Famorana (Circumcision)", description: "Coming-of-age ritual for boys, often performed in groups. Includes celebration, blessings, and consumption of the foreskin mixed with banana by male relatives.", occasion: "Childhood (7-8 years)" },
      { name: "Marriage Negotiations", description: "Complex process involving families, elders, and vodiondry (bride price). Astrologers determine auspicious dates. Multiple ceremonies over days.", occasion: "Marriage" }
    ],
    sacredTexts: [
      { name: "Tantara ny Andriana (Royal History)", description: "Written compilation of oral traditions about Merina royalty, customs, and beliefs. Collected by Father Callet in 19th century.", status: "written" },
      { name: "Oral Traditions (Ohabolana)", description: "Proverbs, myths, and genealogies passed through generations. Contain ethical teachings and cosmological knowledge.", status: "oral" }
    ],
    joining: {
      process: "Malagasy religion is tied to family and community. One participates through birth and family affiliation. Outsiders may participate in ceremonies through marriage or community integration.",
      requirements: [
        "Family connection or community adoption",
        "Respect for fady (taboos)",
        "Participation in famadihana and family ceremonies",
        "Learning family genealogy and razana (ancestors)"
      ],
      notes: "Many Malagasy practice both traditional religion and Christianity, seeing no contradiction. Famadihana and ancestor veneration continue among Christians."
    },
    influence: {
      cultural: "Malagasy identity is deeply tied to ancestor veneration. Architecture, art, and social organization reflect religious beliefs. The tomb is often grander than the home.",
      modern: "Despite Christianity's spread, famadihana remains widely practiced. Government recognizes traditional practices. Tourism has brought international attention.",
      diaspora: "Malagasy diaspora in France maintains cultural connections. Remains are sometimes repatriated for burial in Madagascar."
    },
    tribesFollowing: [
      { tribeSlug: "merina", tribeName: "Merina", percentage: 55, notes: "Highland practices, elaborate famadihana" },
      { tribeSlug: "betsileo", tribeName: "Betsileo", percentage: 50, notes: "Similar highland traditions" },
      { tribeSlug: "sakalava", tribeName: "Sakalava", percentage: 60, notes: "Strong tromba tradition" },
      { tribeSlug: "antandroy", tribeName: "Antandroy", percentage: 70, notes: "Strong traditional adherence" }
    ],
    sources: [
      { name: "Wikipedia - Religion in Madagascar", url: "https://en.wikipedia.org/wiki/Religion_in_Madagascar" },
      { name: "Britannica - Madagascar Religion", url: "https://www.britannica.com/place/Madagascar/Religion" },
      { name: "Bloch - Placing the Dead", url: "https://www.jstor.org/stable/10.1086/657823" }
    ]
  },
  {
    id: "oromo-waaqeffanna",
    name: "Oromo Waaqeffanna",
    alternateNames: ["Waaqeffannaa", "Waaqa Worship", "Oromo Indigenous Religion"],
    region: "Horn of Africa",
    estimatedFollowers: "~3 million",
    youtubeVideoId: "vQ5pRz_AhZM",
    countryBreakdown: [
      { country: "Ethiopia", flag: "🇪🇹", percentage: 85 },
      { country: "Kenya", flag: "🇰🇪", percentage: 12 },
      { country: "Somalia", flag: "🇸🇴", percentage: 3 }
    ],
    supremeDeity: {
      name: "Waaqa (Waaqayyo)",
      description: "The supreme sky god, creator of everything. Waaqa is omnipresent, omniscient, and the source of all life. Unlike in some traditions, Waaqa can be approached directly without intermediaries.",
      attributes: ["Sky God", "Creator", "Omniscient", "Source of Law and Order"]
    },
    tenets: [
      {
        belief: "Safuu (Cosmic Moral Order)",
        description: "The ethical and moral code governing relationships between humans, nature, and Waaqa. Violating safuu disrupts cosmic harmony and brings misfortune.",
        source: "Bartels, Lambert - Oromo Religion (1983)"
      },
      {
        belief: "Ayyaana (Spiritual Beings)",
        description: "Spirits that mediate between Waaqa and humans. Each person has an ayyaana. There are also ayyaana of places, times, and natural phenomena.",
        source: "Hassen, Mohammed - The Oromo of Ethiopia (1990)"
      },
      {
        belief: "Qaallu System",
        description: "Spiritual leadership through qaallu priests who communicate with Waaqa and maintain safuu. The qaallu institution predates Gadaa governance.",
        source: "Knutsson, Karl Eric - Authority and Change (1967)"
      },
      {
        belief: "Nagaa (Peace/Harmony)",
        description: "The ideal state of existence where safuu is maintained. Nagaa encompasses personal peace, social harmony, and ecological balance.",
        source: "Oromo Studies Association"
      }
    ],
    practices: [
      { name: "Irreecha Festival", description: "The most important thanksgiving ceremony held at Lake Hora Arsedi after the rainy season. Millions gather to thank Waaqa for life, water, and harvest.", frequency: "Annual (September/October)" },
      { name: "Prayer at Sacred Sites", description: "Regular prayers at mountains, rivers, and large trees considered sacred. Water sources are particularly venerated.", frequency: "Weekly/Seasonal" },
      { name: "Qaallu Consultation", description: "Seeking guidance from qaallu priests for important decisions, healing, and resolving disputes.", frequency: "As needed" },
      { name: "Muuda Pilgrimage", description: "Traditional pilgrimage to qaallu centers, bringing offerings and seeking blessings.", frequency: "Annual/Occasional" }
    ],
    rituals: [
      { name: "Irreecha Birraa", description: "Spring thanksgiving at water bodies. Participants wear traditional dress, carry green grass and flowers, and offer thanks for rain and new growth.", occasion: "September/October" },
      { name: "Irreecha Arfaasaa", description: "Autumn thanksgiving marking the end of harvest. Offerings of crops and prayers for continued blessings.", occasion: "April/May" },
      { name: "Ateetee", description: "Women's fertility and protection ritual. Women gather to pray, sing, and appeal to the mother deity aspect for childbearing and family protection.", occasion: "Fertility issues/Annually" }
    ],
    sacredTexts: [
      { name: "Oral Law (Seera)", description: "Extensive oral tradition containing laws, history, and religious teachings. Preserved by qaallu and elders.", status: "oral" },
      { name: "Geerarsa (Poetry)", description: "Sacred poetry and songs praising Waaqa, recounting history, and encoding moral teachings.", status: "oral" }
    ],
    joining: {
      process: "Waaqeffanna is traditionally ethnic, tied to Oromo identity. However, the recent revival has welcomed those interested in learning and practicing the tradition.",
      requirements: [
        "Genuine interest in Oromo spiritual traditions",
        "Learning of safuu principles",
        "Participation in Irreecha and community ceremonies",
        "Acceptance by qaallu or community elders"
      ],
      notes: "Waaqeffanna has experienced revival since the 1990s. Irreecha now draws millions and has become a symbol of Oromo cultural identity."
    },
    influence: {
      cultural: "Waaqeffanna shaped the democratic Gadaa system of governance. Environmental ethics influence land use. Calendar and naming conventions derive from the religion.",
      modern: "Irreecha festival recognized by Ethiopian government. Waaqeffanna councils advocate for religious rights. Revival among educated urban Oromo.",
      diaspora: "Oromo diaspora communities in US, Europe, and Middle East maintain Irreecha celebrations. Online communities share teachings."
    },
    tribesFollowing: [
      { tribeSlug: "oromo", tribeName: "Oromo", percentage: 15, notes: "Revival ongoing; many Christian/Muslim" },
      { tribeSlug: "borana", tribeName: "Borana", percentage: 25, notes: "Stronger traditional retention" },
      { tribeSlug: "guji", tribeName: "Guji", percentage: 20, notes: "Active qaallu institutions" }
    ],
    sources: [
      { name: "Wikipedia - Waaqeffanna", url: "https://en.wikipedia.org/wiki/Waaqeffanna" },
      { name: "Britannica - Oromo", url: "https://www.britannica.com/topic/Oromo" },
      { name: "Bartels - Oromo Religion", url: "https://www.africabib.org/rec.php?RID=084927667" }
    ]
  },
  {
    id: "himba-religion",
    name: "Himba Traditional Religion",
    alternateNames: ["Himba Ancestor Worship", "OvaHimba Beliefs"],
    region: "Southern Africa",
    estimatedFollowers: "~50,000",
    youtubeVideoId: "ZmDhRvvs5Xw",
    countryBreakdown: [
      { country: "Namibia", flag: "🇳🇦", percentage: 90 },
      { country: "Angola", flag: "🇦🇴", percentage: 10 }
    ],
    supremeDeity: {
      name: "Mukuru",
      description: "The supreme being and first ancestor of the Himba people. Mukuru is approached through the sacred ancestral fire (okuruwo) and through the lineage ancestors. He is the source of blessing and protection.",
      attributes: ["Supreme Ancestor", "Creator", "Source of Blessings", "Guardian of Traditions"]
    },
    tenets: [
      {
        belief: "Okuruwo (Ancestral Fire)",
        description: "The sacred fire that must never go out, representing the connection between living and dead. The fire belongs to the lineage and is tended by the headman or senior wife.",
        source: "Crandall, David - The Place of Stunted Ironwood Trees (2000)"
      },
      {
        belief: "Bilateral Descent",
        description: "Himba trace descent through both father (patriclan/oruzo) and mother (matriclan/eanda). The patriclan determines ritual responsibilities; the matriclan determines inheritance.",
        source: "Malan, J.S. - Peoples of Namibia (1995)"
      },
      {
        belief: "Ancestor Communication",
        description: "Ancestors actively influence daily life. They are consulted through the sacred fire for important decisions and can cause illness or misfortune if neglected or offended.",
        source: "Jacobsohn, Margaret - Himba (1990)"
      },
      {
        belief: "Cattle as Sacred",
        description: "Cattle are central to spiritual and social life. They are sacrificed to ancestors, used in bride price, and their movements are believed to be guided by ancestors.",
        source: "Bollig, Michael - Risk Management in a Hazardous Environment (2006)"
      }
    ],
    practices: [
      { name: "Tending Okuruwo", description: "The sacred fire is maintained continuously. The headman communicates with ancestors at the fire, making offerings and seeking guidance.", frequency: "Daily" },
      { name: "Otjize Application", description: "Women apply red ochre and butterfat mixture (otjize) to skin and hair. This has both aesthetic and spiritual significance, connecting to the earth and ancestors.", frequency: "Daily" },
      { name: "Cattle Rituals", description: "Important events require cattle sacrifice at the sacred fire. The meat is shared communally, and ancestors receive their portion through the fire.", frequency: "Major occasions" },
      { name: "Divination", description: "Consulting with elders or diviners to interpret signs, dreams, and ancestor messages for guidance in important matters.", frequency: "As needed" }
    ],
    rituals: [
      { name: "Okujepisa Omukazendhu", description: "Coming-of-age ceremony for girls at first menstruation. The girl is secluded, taught women's knowledge, and presented with a new hairstyle indicating marriageable status.", occasion: "Puberty" },
      { name: "Cattle Sacrifice", description: "When seeking ancestor blessing or dealing with illness/misfortune. An animal is sacrificed at the okuruwo, and the blood is offered to ancestors.", occasion: "Various" },
      { name: "Marriage (Okujepisa)", description: "Complex multi-day ceremony involving both clans. Cattle exchange, blessing at the sacred fire, and the bride's transition to her husband's homestead.", occasion: "Marriage" },
      { name: "Funeral (Okutumba)", description: "The deceased is buried with possessions. Cattle are sacrificed. The okuruwo ceremonies help the spirit join the ancestors.", occasion: "Death" }
    ],
    sacredTexts: [
      { name: "Oral Histories", description: "Genealogies, clan histories, and origin stories passed through generations. Elders are the primary keepers of this knowledge.", status: "oral" },
      { name: "Songs and Praise Poetry", description: "Cattle praise songs (omirongere) and historical recitations that encode spiritual and cultural knowledge.", status: "oral" }
    ],
    joining: {
      process: "Himba religion is tied to lineage and ethnicity. One is born into the tradition through family membership. Marriage into a Himba family involves learning and participating in customs.",
      requirements: [
        "Birth into or marriage to Himba family",
        "Acceptance by clan elders",
        "Participation in okuruwo rituals",
        "Learning clan genealogies and taboos"
      ],
      notes: "The Himba have resisted many outside influences. Their traditions remain strong, though modernization pressures exist."
    },
    influence: {
      cultural: "Himba religion shapes every aspect of daily life - from hairstyles indicating life stage to cattle management reflecting spiritual relationships. Their distinctive appearance reflects religious aesthetics.",
      modern: "Tourism has brought attention and income but also pressures. Himba advocates work to maintain traditions while accessing education and healthcare.",
      diaspora: "Some Himba have migrated to Namibian towns but often maintain village connections and participate in ceremonies."
    },
    tribesFollowing: [
      { tribeSlug: "himba", tribeName: "Himba", percentage: 85, notes: "Strong traditional retention" },
      { tribeSlug: "herero", tribeName: "Herero", percentage: 20, notes: "Related traditions, more Christian influence" }
    ],
    sources: [
      { name: "Wikipedia - Himba People", url: "https://en.wikipedia.org/wiki/Himba_people" },
      { name: "Britannica - Himba", url: "https://www.britannica.com/topic/Himba" },
      { name: "Crandall - Himba Studies", url: "https://www.jstor.org/stable/3773411" }
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
