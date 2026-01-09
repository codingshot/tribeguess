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
