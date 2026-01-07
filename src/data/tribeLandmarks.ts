// Cultural Landmarks Database
// Verified GPS coordinates and references for African tribal cultural sites

export interface CulturalLandmark {
  name: string;
  type: 'historical' | 'sacred' | 'museum' | 'natural' | 'archaeological';
  description: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  wikipediaUrl?: string;
  unescoStatus?: 'world-heritage' | 'tentative' | null;
}

export const tribeLandmarks: Record<string, CulturalLandmark[]> = {
  // ============ KENYA ============
  kikuyu: [
    {
      name: "Mukurwe wa Nyagathanga",
      type: "sacred",
      description: "The mythical 'Garden of Eden' of the Kikuyu people, considered the birthplace of the tribe where Gikuyu and Mumbi (the Kikuyu Adam and Eve) were created by Ngai. A sacred fig tree marks the spot.",
      coordinates: { lat: -0.7833, lng: 37.0833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mukurwe_wa_Nyagathanga"
    },
    {
      name: "Mount Kenya (Kirinyaga)",
      type: "sacred",
      description: "The sacred mountain where Ngai (God) is believed to dwell. Kikuyu traditionally face the mountain during prayers. Second highest peak in Africa at 5,199m.",
      coordinates: { lat: -0.1521, lng: 37.3084 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Kenya",
      unescoStatus: "world-heritage"
    },
    {
      name: "Dedan Kimathi Statue",
      type: "historical",
      description: "Monument in Nairobi honoring Dedan Kimathi, the Mau Mau leader who fought against British colonial rule. He was captured and executed in 1957.",
      coordinates: { lat: -1.2841, lng: 36.8173 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dedan_Kimathi"
    },
    {
      name: "Karura Forest",
      type: "natural",
      description: "A 1,063-hectare urban forest in Nairobi saved from development by Wangari Maathai's Green Belt Movement. Contains caves used during Mau Mau resistance.",
      coordinates: { lat: -1.2347, lng: 36.8327 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Karura_Forest"
    }
  ],
  
  luo: [
    {
      name: "Kit Mikayi",
      type: "sacred",
      description: "A sacred rock formation meaning 'The First Wife's Stone' in Dholuo. Used for prayers and sacrifices. Legend says a man spent so much time admiring the rock, people joked he had taken it as his first wife.",
      coordinates: { lat: -0.0667, lng: 34.5833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kit_Mikayi"
    },
    {
      name: "Kogelo (Obama Ancestral Home)",
      type: "historical",
      description: "Ancestral village of Barack Obama Sr., father of the 44th US President. The Obama family homestead has become a tourist attraction and cultural heritage site.",
      coordinates: { lat: 0.1967, lng: 34.3467 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kogelo"
    },
    {
      name: "Kisumu Museum",
      type: "museum",
      description: "Regional museum showcasing Luo culture, traditional homestead, aquarium with Lake Victoria fish, and exhibits on local wildlife and archaeology.",
      coordinates: { lat: -0.1000, lng: 34.7500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kisumu_Museum"
    },
    {
      name: "Thimlich Ohinga",
      type: "archaeological",
      description: "Ancient stone-walled settlement dating back to the 16th century. The name means 'frightening dense forest' in Dholuo. UNESCO World Heritage Site since 2018.",
      coordinates: { lat: -0.7839, lng: 34.4069 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Thimlich_Ohinga",
      unescoStatus: "world-heritage"
    }
  ],
  
  maasai: [
    {
      name: "Amboseli National Park",
      type: "natural",
      description: "Famous for its views of Mount Kilimanjaro and large elephant herds. The Maasai have inhabited this region for centuries and still live in surrounding areas.",
      coordinates: { lat: -2.6414, lng: 37.2481 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Amboseli_National_Park",
      unescoStatus: "tentative"
    },
    {
      name: "Maasai Mara National Reserve",
      type: "natural",
      description: "World-renowned wildlife reserve named after the Maasai people. Site of the annual wildebeest migration. Maasai communities live alongside the reserve.",
      coordinates: { lat: -1.4061, lng: 35.0028 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Maasai_Mara"
    },
    {
      name: "Olduvai Gorge",
      type: "archaeological",
      description: "One of the most important paleoanthropological sites in the world, located in Maasai territory. Contains earliest evidence of human ancestors dating back 2 million years.",
      coordinates: { lat: -2.9936, lng: 35.3512 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Olduvai_Gorge"
    },
    {
      name: "Oloololo Escarpment",
      type: "natural",
      description: "Dramatic western boundary of the Maasai Mara, offering panoramic views of the savanna. Sacred site for Maasai ceremonies and traditionally used for grazing.",
      coordinates: { lat: -1.3500, lng: 34.8500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Maasai_Mara"
    }
  ],
  
  luhya: [
    {
      name: "Crying Stone of Ilesi",
      type: "natural",
      description: "A 40-meter tall rock formation that appears to 'weep' due to water seeping from a crack. Sacred site believed to have spiritual powers and used for traditional ceremonies.",
      coordinates: { lat: 0.4833, lng: 34.7500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Crying_Stone_of_Ilesi"
    },
    {
      name: "Kakamega Forest",
      type: "natural",
      description: "The only tropical rainforest in Kenya, traditionally sacred to the Luhya people. Contains unique flora and fauna, including rare primates and over 400 bird species.",
      coordinates: { lat: 0.2333, lng: 34.8667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kakamega_Forest"
    },
    {
      name: "Nabongo's Palace (Mumias)",
      type: "historical",
      description: "Historical seat of the Wanga Kingdom, the only Luhya sub-tribe with a centralized monarchy. Nabongo Mumia was a powerful king who collaborated with British colonialists.",
      coordinates: { lat: 0.3367, lng: 34.4869 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Nabongo_of_the_Wanga"
    }
  ],
  
  kamba: [
    {
      name: "Nzambani Rock",
      type: "sacred",
      description: "A massive volcanic plug rising 180m, considered sacred by the Kamba people. According to legend, the rock can reject sinners who attempt to climb it.",
      coordinates: { lat: -1.4667, lng: 37.9333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Nzambani_Rock"
    },
    {
      name: "Mwingi National Reserve",
      type: "natural",
      description: "Located in traditional Kamba territory, this reserve protects the semi-arid landscape and wildlife that the Kamba have coexisted with for centuries.",
      coordinates: { lat: -0.9333, lng: 38.0667 }
    },
    {
      name: "Machakos Town (Masaku)",
      type: "historical",
      description: "Named after Masaku, a famous Kamba medicine man. One of Kenya's oldest towns, it was the first inland administrative center during British colonial rule.",
      coordinates: { lat: -1.5177, lng: 37.2634 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Machakos"
    }
  ],
  
  kalenjin: [
    {
      name: "Iten (Home of Champions)",
      type: "historical",
      description: "A town at 2,400m altitude known worldwide as the 'Home of Champions' due to the extraordinary number of Olympic and world champion runners it has produced.",
      coordinates: { lat: 0.6700, lng: 35.5081 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Iten"
    },
    {
      name: "Kerio Valley",
      type: "natural",
      description: "Dramatic Rift Valley landscape that has been home to the Kalenjin for centuries. Known for its hot springs and as a traditional training ground for runners.",
      coordinates: { lat: 0.7500, lng: 35.6667 }
    },
    {
      name: "Kapsabet Museum",
      type: "museum",
      description: "Cultural museum showcasing Nandi sub-tribe history, including resistance against British rule led by Orkoiyot Koitalel arap Samoei.",
      coordinates: { lat: 0.2000, lng: 35.1000 }
    },
    {
      name: "Koitalel arap Samoei Mausoleum",
      type: "historical",
      description: "Memorial site for the Nandi spiritual leader who led resistance against British colonization for 11 years before being killed in 1905 during peace negotiations.",
      coordinates: { lat: 0.1833, lng: 35.0833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Koitalel_arap_Samoei"
    }
  ],
  
  turkana: [
    {
      name: "Lake Turkana (Jade Sea)",
      type: "natural",
      description: "The world's largest permanent desert lake and the world's largest alkaline lake. Sacred to the Turkana people who have fished its waters for millennia.",
      coordinates: { lat: 3.5500, lng: 36.1167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Turkana",
      unescoStatus: "world-heritage"
    },
    {
      name: "Koobi Fora",
      type: "archaeological",
      description: "One of the world's richest sites for early human fossils, located on Lake Turkana's eastern shore. Contains evidence of human evolution spanning 4 million years.",
      coordinates: { lat: 3.9500, lng: 36.1833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Koobi_Fora"
    },
    {
      name: "Central Island National Park",
      type: "natural",
      description: "Volcanic island in Lake Turkana with three crater lakes, home to the world's largest Nile crocodile population. Sacred site in Turkana mythology.",
      coordinates: { lat: 3.5000, lng: 36.0333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Central_Island_National_Park"
    }
  ],
  
  mijikenda: [
    {
      name: "Kaya Forests",
      type: "sacred",
      description: "Sacred forest groves that served as fortified villages for the nine Mijikenda sub-tribes. Protected by traditional taboos and now UNESCO World Heritage Sites.",
      coordinates: { lat: -4.0500, lng: 39.6000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sacred_Mijikenda_Kaya_Forests",
      unescoStatus: "world-heritage"
    },
    {
      name: "Fort Jesus",
      type: "historical",
      description: "16th-century Portuguese fort in Mombasa that witnessed centuries of coastal trade and conflict. The Mijikenda traded with and sometimes fought the coastal powers.",
      coordinates: { lat: -4.0631, lng: 39.6781 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fort_Jesus",
      unescoStatus: "world-heritage"
    }
  ],
  
  swahili: [
    {
      name: "Lamu Old Town",
      type: "historical",
      description: "The oldest and best-preserved Swahili settlement in East Africa, dating back to the 12th century. UNESCO World Heritage Site showcasing Swahili architecture and culture.",
      coordinates: { lat: -2.2686, lng: 40.9025 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lamu",
      unescoStatus: "world-heritage"
    },
    {
      name: "Gede Ruins",
      type: "archaeological",
      description: "Mysterious abandoned Swahili town dating to the 13th century. Contains mosques, palace, and houses built of coral stone, showcasing advanced urban planning.",
      coordinates: { lat: -3.3167, lng: 40.0167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Gedi_Ruins"
    },
    {
      name: "Zanzibar Stone Town",
      type: "historical",
      description: "Historic center of Zanzibar City, a cultural melting pot reflecting Swahili, Arab, Persian, Indian, and European influences. UNESCO World Heritage Site.",
      coordinates: { lat: -6.1622, lng: 39.1875 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Stone_Town",
      unescoStatus: "world-heritage"
    }
  ],
  
  // ============ NIGERIA ============
  yoruba: [
    {
      name: "Osun-Osogbo Sacred Grove",
      type: "sacred",
      description: "Dense forest along the Osun River, last remaining sacred grove in Yorubaland. Dedicated to Osun, goddess of fertility. Contains shrines, sculptures, and annual festival site.",
      coordinates: { lat: 7.7567, lng: 4.5567 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Osun-Osogbo",
      unescoStatus: "world-heritage"
    },
    {
      name: "Ile-Ife (The Cradle of Yoruba)",
      type: "sacred",
      description: "Ancient holy city considered the birthplace of the Yoruba people and all of humanity in Yoruba mythology. Home to the Ooni (spiritual leader) and famous bronze sculptures.",
      coordinates: { lat: 7.4667, lng: 4.5667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ile-Ife"
    },
    {
      name: "Oyo Palace (Alaafin Palace)",
      type: "historical",
      description: "Seat of the Alaafin of Oyo, traditional ruler of the historic Oyo Empire which was the most politically important Yoruba state from the 17th-19th centuries.",
      coordinates: { lat: 7.8500, lng: 3.9333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Oyo_Empire"
    },
    {
      name: "Idanre Hills",
      type: "natural",
      description: "Ancient Yoruba settlement atop hills reached by 640 steps. Contains sacred groves, the burial site of the first Owa (king), and 500-year-old shrines.",
      coordinates: { lat: 7.1167, lng: 5.1333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Idanre_Hills",
      unescoStatus: "tentative"
    },
    {
      name: "Ife Museum of Antiquities",
      type: "museum",
      description: "Houses world-famous Ife bronze heads and terracotta sculptures dating from 12th-15th centuries, demonstrating advanced Yoruba artistic traditions.",
      coordinates: { lat: 7.4833, lng: 4.5500 }
    }
  ],
  
  igbo: [
    {
      name: "Arochukwu Long Juju Shrine",
      type: "sacred",
      description: "Site of the Ibini Ukpabi oracle, the most powerful deity in Igboland during the slave trade era. Located in cave complex used for spiritual judgments.",
      coordinates: { lat: 5.3833, lng: 7.9167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ibini_Ukpabi",
      unescoStatus: "tentative"
    },
    {
      name: "Ogbunike Caves",
      type: "sacred",
      description: "System of caves formed by erosion of limestone, considered sacred by the Igbo. Contains ancient shrines and is associated with spiritual cleansing rituals.",
      coordinates: { lat: 6.1667, lng: 6.8833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ogbunike_Caves"
    },
    {
      name: "National War Museum, Umuahia",
      type: "museum",
      description: "Museum documenting the Nigerian Civil War (1967-1970) and Igbo history. Contains weapons, vehicles, and artifacts from the Biafran conflict.",
      coordinates: { lat: 5.5167, lng: 7.4833 }
    },
    {
      name: "Nri Ancient Kingdom Site",
      type: "archaeological",
      description: "Archaeological site of the Nri Kingdom, considered the origin of Igbo culture and the Eze Nri priestly kingship tradition dating to 900 AD.",
      coordinates: { lat: 6.0833, lng: 6.9500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kingdom_of_Nri"
    }
  ],
  
  hausa: [
    {
      name: "Ancient Kano City Walls",
      type: "historical",
      description: "14km earthen walls surrounding the old city of Kano, construction began in the 11th century. Contains 15 gates and represents centuries of Hausa civilization.",
      coordinates: { lat: 11.9555, lng: 8.4975 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ancient_Kano_City_Walls",
      unescoStatus: "tentative"
    },
    {
      name: "Kano Central Mosque (Great Mosque)",
      type: "sacred",
      description: "Historic mosque in Kano, one of the largest in West Africa. The site has been a center of Islamic worship and scholarship since the 15th century.",
      coordinates: { lat: 11.9964, lng: 8.5167 }
    },
    {
      name: "Gidan Makama Museum",
      type: "museum",
      description: "Former palace of the Makama (one of the Kano Emirates' chiefs), now a museum showcasing Hausa culture, architecture, and history.",
      coordinates: { lat: 12.0000, lng: 8.5167 }
    },
    {
      name: "Kurmi Market",
      type: "historical",
      description: "One of Africa's oldest markets, dating back over 500 years. Center of trans-Saharan trade in gold, salt, and slaves. Still operational today.",
      coordinates: { lat: 11.9958, lng: 8.5211 }
    },
    {
      name: "Zaria Old City",
      type: "historical",
      description: "Historic walled city and center of Zazzau, one of the original Hausa city-states. Contains the Emir's Palace and traditional mud-brick architecture.",
      coordinates: { lat: 11.0667, lng: 7.7000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Zaria"
    }
  ],
  
  fulani: [
    {
      name: "Sokoto Caliphate Palace",
      type: "historical",
      description: "Seat of the Sultan of Sokoto, spiritual leader of Muslims in Nigeria. The Sokoto Caliphate was founded by Fulani jihad leader Usman dan Fodio in 1804.",
      coordinates: { lat: 13.0622, lng: 5.2339 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sokoto_Caliphate"
    },
    {
      name: "Shehu's Tomb (Usman dan Fodio)",
      type: "sacred",
      description: "Burial site of Usman dan Fodio, the Fulani Islamic scholar who founded the Sokoto Caliphate. A major pilgrimage site for Muslims in West Africa.",
      coordinates: { lat: 13.0500, lng: 5.2500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Usman_dan_Fodio"
    },
    {
      name: "Fouta Djallon Highlands",
      type: "natural",
      description: "Highland region in Guinea considered the Fulani heartland. Source of major West African rivers and traditional center of Fulani pastoral culture.",
      coordinates: { lat: 11.0000, lng: -12.0000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fouta_Djallon"
    }
  ],
  
  // ============ GHANA ============
  ashanti: [
    {
      name: "Manhyia Palace",
      type: "historical",
      description: "Official residence of the Asantehene (King of Ashanti). The current palace was built in 1925 by the British as a residence for the returning King Prempeh I.",
      coordinates: { lat: 6.7000, lng: -1.6167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Manhyia_Palace"
    },
    {
      name: "Kumasi Fort and Military Museum",
      type: "museum",
      description: "19th-century British fort now housing the Armed Forces Museum. Contains artifacts from the Anglo-Ashanti Wars and Ashanti military history.",
      coordinates: { lat: 6.6885, lng: -1.6244 }
    },
    {
      name: "Okomfo Anokye Sword Site",
      type: "sacred",
      description: "Site where the legendary priest Okomfo Anokye planted a sword that cannot be removed. According to legend, removing it would destroy the Ashanti nation.",
      coordinates: { lat: 6.6833, lng: -1.6167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Okomfo_Anokye"
    },
    {
      name: "Asante Traditional Buildings",
      type: "historical",
      description: "Remaining shrines and traditional buildings showcasing classic Ashanti architecture with carved decorations. UNESCO World Heritage Site.",
      coordinates: { lat: 6.7000, lng: -1.6000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Asante_traditional_buildings",
      unescoStatus: "world-heritage"
    },
    {
      name: "Kejetia Market",
      type: "historical",
      description: "One of the largest open-air markets in West Africa, center of Ashanti commerce for centuries. Recently rebuilt as a modern complex while preserving cultural significance.",
      coordinates: { lat: 6.6878, lng: -1.6217 }
    }
  ],
  
  ewe: [
    {
      name: "Keta Lagoon",
      type: "natural",
      description: "Largest lagoon in Ghana, traditionally important to Ewe fishing communities. Subject of legends about the origins of the Ewe people.",
      coordinates: { lat: 5.9167, lng: 0.9833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Keta_Lagoon"
    },
    {
      name: "Notsie (Nuatja)",
      type: "historical",
      description: "Ancient walled town in Togo from which the Ewe people escaped in the 17th century. According to legend, they walked backwards to confuse their pursuers.",
      coordinates: { lat: 6.9500, lng: 1.1667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Notsie"
    }
  ],
  
  // ============ SOUTH AFRICA ============
  zulu: [
    {
      name: "Ondini (Ulundi)",
      type: "historical",
      description: "Royal kraal of King Cetshwayo, last great military king of the Zulus. Site of the final battle of the Anglo-Zulu War in 1879. Now a museum and cultural center.",
      coordinates: { lat: -28.3006, lng: 31.4181 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ulundi"
    },
    {
      name: "iSandlwana Battlefield",
      type: "historical",
      description: "Site of the Zulu victory over British forces on January 22, 1879 - one of the worst defeats in British colonial military history.",
      coordinates: { lat: -28.3500, lng: 30.6500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Isandlwana"
    },
    {
      name: "Rorke's Drift",
      type: "historical",
      description: "Site of the famous 1879 battle where 150 British soldiers defended against 3,000-4,000 Zulu warriors. Eleven Victoria Crosses were awarded.",
      coordinates: { lat: -28.3489, lng: 30.5339 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Rorke%27s_Drift"
    },
    {
      name: "Shakaland",
      type: "museum",
      description: "Living museum and cultural village depicting traditional Zulu life. Originally built as a set for the TV series 'Shaka Zulu'.",
      coordinates: { lat: -28.5833, lng: 31.1333 }
    },
    {
      name: "Spirit of eMakhosini",
      type: "sacred",
      description: "Valley of the Kings - burial place of Zulu royalty including Shaka's father Senzangakhona. Sacred site in Zulu spiritual tradition.",
      coordinates: { lat: -28.4167, lng: 31.0000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Emakhosini"
    }
  ],
  
  xhosa: [
    {
      name: "Nelson Mandela Museum (Mvezo)",
      type: "museum",
      description: "Birthplace of Nelson Mandela in the village of Mvezo. The museum tells the story of Mandela's Xhosa heritage and the Thembu royal family.",
      coordinates: { lat: -31.7833, lng: 28.6167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mvezo"
    },
    {
      name: "Qunu (Mandela's Childhood Home)",
      type: "historical",
      description: "Village where Nelson Mandela spent his childhood and where he chose to be buried. Contains his grave and family homestead.",
      coordinates: { lat: -31.7500, lng: 28.6500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Qunu"
    },
    {
      name: "Khaya La Bantu Cultural Village",
      type: "museum",
      description: "Living cultural museum in the Eastern Cape showcasing traditional Xhosa customs, architecture, crafts, and ceremonial practices.",
      coordinates: { lat: -32.9833, lng: 27.9167 }
    },
    {
      name: "Hole in the Wall (esiKhaleni)",
      type: "natural",
      description: "Dramatic rock formation on the Wild Coast, considered sacred in Xhosa tradition. Legend says the sound of the sea through the hole is ancestral spirits.",
      coordinates: { lat: -31.8333, lng: 29.1333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Hole_in_the_Wall,_Eastern_Cape"
    }
  ],
  
  ndebele: [
    {
      name: "Ndebele Village (Loopspruit)",
      type: "museum",
      description: "Cultural village showcasing traditional Ndebele painted houses, beadwork, and customs. The geometric patterns are recognized worldwide.",
      coordinates: { lat: -25.4167, lng: 28.9500 }
    },
    {
      name: "Botshabelo Historical Village",
      type: "historical",
      description: "Open-air museum and former mission station with reconstructed Ndebele homesteads. Showcases the distinctive painted architecture.",
      coordinates: { lat: -25.3667, lng: 29.2667 }
    }
  ],
  
  sotho: [
    {
      name: "Thaba Bosiu",
      type: "historical",
      description: "Mountain fortress of King Moshoeshoe I, founder of the Basotho nation. Successfully defended against multiple invasions. Now a national monument.",
      coordinates: { lat: -29.4167, lng: 27.5833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Thaba_Bosiu"
    },
    {
      name: "Morija Museum & Archives",
      type: "museum",
      description: "Oldest museum in Lesotho, containing Basotho cultural artifacts, dinosaur footprints, and archives of the Paris Evangelical Missionary Society.",
      coordinates: { lat: -29.5333, lng: 27.5167 }
    }
  ],
  
  // ============ ZIMBABWE ============
  shona: [
    {
      name: "Great Zimbabwe",
      type: "archaeological",
      description: "Largest ancient stone structure in sub-Saharan Africa, capital of the Kingdom of Zimbabwe during the 11th-15th centuries. UNESCO World Heritage Site.",
      coordinates: { lat: -20.2678, lng: 30.9333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Great_Zimbabwe",
      unescoStatus: "world-heritage"
    },
    {
      name: "Khami Ruins",
      type: "archaeological",
      description: "Second largest stone-built ancient monument in Zimbabwe after Great Zimbabwe. Capital of the Torwa dynasty in the 15th-17th centuries.",
      coordinates: { lat: -20.1567, lng: 28.3833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Khami",
      unescoStatus: "world-heritage"
    },
    {
      name: "Matobo Hills",
      type: "sacred",
      description: "Granite hills with ancient San rock art and shrines to the Shona god Mwari. Contains Cecil Rhodes' grave. UNESCO World Heritage Site.",
      coordinates: { lat: -20.5000, lng: 28.5000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Matobo_National_Park",
      unescoStatus: "world-heritage"
    },
    {
      name: "Chinhoyi Caves",
      type: "natural",
      description: "Limestone caves with a deep blue pool called 'Sleeping Pool'. Sacred site where chiefs were buried and oracles consulted spirits.",
      coordinates: { lat: -17.1833, lng: 30.1333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Chinhoyi_Caves"
    }
  ],
  
  // ============ ETHIOPIA ============
  oromo: [
    {
      name: "Abba Jifar Palace",
      type: "historical",
      description: "Palace of the Oromo Kingdom of Jimma, one of the most powerful Oromo states in the 19th century. The two-story palace reflects Ethiopian and Oromo architecture.",
      coordinates: { lat: 7.6833, lng: 36.8333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kingdom_of_Jimma"
    },
    {
      name: "Irreecha Site (Lake Hora)",
      type: "sacred",
      description: "Traditional thanksgiving festival site where millions of Oromo gather annually to thank Waaq (God) for blessings. One of the largest cultural gatherings in Africa.",
      coordinates: { lat: 8.7833, lng: 38.9833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Irreecha"
    },
    {
      name: "Sof Omar Caves",
      type: "natural",
      description: "Africa's longest cave system at 15.1km, formed by the Web River. Sacred pilgrimage site combining traditional Oromo beliefs with Islam.",
      coordinates: { lat: 6.9167, lng: 40.8333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sof_Omar_Caves"
    }
  ],
  
  amhara: [
    {
      name: "Rock-Hewn Churches of Lalibela",
      type: "sacred",
      description: "11 medieval monolithic churches carved from rock in the 12th-13th centuries, often called the 'Eighth Wonder of the World'. UNESCO World Heritage Site.",
      coordinates: { lat: 12.0319, lng: 39.0472 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lalibela",
      unescoStatus: "world-heritage"
    },
    {
      name: "Gondar (Fasil Ghebbi)",
      type: "historical",
      description: "Royal enclosure containing castles and palaces of Ethiopian emperors from the 17th-18th centuries. Known as 'Africa's Camelot'. UNESCO World Heritage Site.",
      coordinates: { lat: 12.6000, lng: 37.4667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fasil_Ghebbi",
      unescoStatus: "world-heritage"
    },
    {
      name: "Simien Mountains",
      type: "natural",
      description: "Dramatic mountain landscape with endemic wildlife including the Gelada baboon. UNESCO World Heritage Site. Sacred in Ethiopian tradition.",
      coordinates: { lat: 13.2500, lng: 38.0667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Simien_Mountains_National_Park",
      unescoStatus: "world-heritage"
    },
    {
      name: "Lake Tana Monasteries",
      type: "sacred",
      description: "Island monasteries on Ethiopia's largest lake, some dating to the 14th century. Contain ancient religious manuscripts and royal tombs.",
      coordinates: { lat: 11.9000, lng: 37.3333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Tana"
    }
  ],
  
  tigray: [
    {
      name: "Axum (Aksum)",
      type: "archaeological",
      description: "Ancient capital of the Aksumite Empire, one of the great civilizations of the ancient world. Contains giant stelae and claims to house the Ark of the Covenant.",
      coordinates: { lat: 14.1300, lng: 38.7200 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Axum",
      unescoStatus: "world-heritage"
    },
    {
      name: "Yeha Temple",
      type: "archaeological",
      description: "Oldest standing structure in Ethiopia, dating to 700 BC. Pre-Christian temple showing connections to ancient South Arabia.",
      coordinates: { lat: 14.2833, lng: 39.0167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Yeha"
    },
    {
      name: "Debre Damo Monastery",
      type: "sacred",
      description: "6th-century monastery accessible only by climbing a 15m cliff using a leather rope. One of the oldest continuously functioning monasteries in Africa.",
      coordinates: { lat: 14.3667, lng: 39.2500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Debre_Damo"
    }
  ],
  
  // ============ NAMIBIA ============
  himba: [
    {
      name: "Epupa Falls",
      type: "natural",
      description: "Series of waterfalls on the Kunene River in Himba territory. The Himba have resisted dam construction that would flood their ancestral lands.",
      coordinates: { lat: -17.0000, lng: 13.2500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Epupa_Falls"
    },
    {
      name: "Kaokoland (Kunene Region)",
      type: "natural",
      description: "Remote semi-desert homeland of the Himba people. One of the last wilderness areas in Southern Africa where traditional nomadic life continues.",
      coordinates: { lat: -18.0000, lng: 13.5000 }
    },
    {
      name: "Opuwo Cultural Center",
      type: "museum",
      description: "Main town in Himba territory serving as a cultural hub where traditional Himba people interact with modern amenities while maintaining their customs.",
      coordinates: { lat: -18.0611, lng: 13.8406 }
    }
  ],
  
  herero: [
    {
      name: "Okahandja (Herero Day Gathering)",
      type: "historical",
      description: "Town where Herero gather annually on Herero Day to commemorate ancestors and those killed in the German genocide of 1904-1908.",
      coordinates: { lat: -21.9850, lng: 16.9150 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Okahandja"
    },
    {
      name: "Waterberg Plateau",
      type: "historical",
      description: "Site of the Battle of Waterberg (1904) where German forces defeated Herero forces, beginning the genocide. Now a national park and memorial site.",
      coordinates: { lat: -20.4167, lng: 17.2500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Waterberg"
    }
  ],
  
  san: [
    {
      name: "Twyfelfontein Rock Engravings",
      type: "archaeological",
      description: "One of the largest concentrations of rock petroglyphs in Africa, made by San hunter-gatherers over 6,000 years ago. UNESCO World Heritage Site.",
      coordinates: { lat: -20.5933, lng: 14.3722 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Twyfelfontein",
      unescoStatus: "world-heritage"
    },
    {
      name: "Tsodilo Hills",
      type: "sacred",
      description: "Four hills in Botswana's Kalahari containing over 4,500 rock paintings. Known as the 'Louvre of the Desert'. Sacred to San and Hambukushu peoples.",
      coordinates: { lat: -18.7500, lng: 21.7333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Tsodilo",
      unescoStatus: "world-heritage"
    },
    {
      name: "Kalahari Desert",
      type: "natural",
      description: "Traditional homeland of the San people, who have lived as hunter-gatherers here for at least 20,000 years. Contains some of the oldest continuous human cultures.",
      coordinates: { lat: -24.0000, lng: 21.0000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kalahari_Desert"
    }
  ],
  
  // ============ WEST AFRICA (Additional) ============
  wolof: [
    {
      name: "Gorée Island",
      type: "historical",
      description: "Island off Dakar that served as a major slave trading post. The House of Slaves is a powerful memorial. UNESCO World Heritage Site.",
      coordinates: { lat: 14.6667, lng: -17.4000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Gor%C3%A9e",
      unescoStatus: "world-heritage"
    },
    {
      name: "Saint-Louis (Ndar)",
      type: "historical",
      description: "Former capital of French West Africa, an island city at the mouth of the Senegal River. UNESCO World Heritage Site showcasing colonial and Wolof heritage.",
      coordinates: { lat: 16.0333, lng: -16.5000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Saint-Louis,_Senegal",
      unescoStatus: "world-heritage"
    }
  ],
  
  mandinka: [
    {
      name: "Juffureh (Kunta Kinteh Island)",
      type: "historical",
      description: "Village made famous by Alex Haley's 'Roots' as the birthplace of Kunta Kinte. James Island nearby was a slave trading post. UNESCO World Heritage Site.",
      coordinates: { lat: 13.4500, lng: -16.3667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kunta_Kinteh_Island",
      unescoStatus: "world-heritage"
    },
    {
      name: "Wassu Stone Circles",
      type: "archaeological",
      description: "Megalithic stone circles dating from 3rd century BC to 16th century AD. Associated with Mandinka ancestors. UNESCO World Heritage Site.",
      coordinates: { lat: 13.6889, lng: -14.8806 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Stone_Circles_of_Senegambia",
      unescoStatus: "world-heritage"
    }
  ],
  
  // ============ CENTRAL AFRICA ============
  kongo: [
    {
      name: "Mbanza Kongo",
      type: "historical",
      description: "Ancient capital of the Kingdom of Kongo, one of Africa's most powerful kingdoms from 14th-19th centuries. UNESCO World Heritage Site.",
      coordinates: { lat: -6.2667, lng: 14.2500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mbanza_Kongo",
      unescoStatus: "world-heritage"
    }
  ],
  
  bamileke: [
    {
      name: "Bafut Palace (Cameroon)",
      type: "historical",
      description: "Traditional palace of the Fon (king) of Bafut, showcasing Grassfields architectural traditions. Contains sacred royal compounds and museum.",
      coordinates: { lat: 6.0833, lng: 10.1000 }
    },
    {
      name: "Foumban Royal Palace",
      type: "historical",
      description: "Palace of the Bamoun Sultan, rebuilt in European style after WWI. Contains museum of Bamoun art and history. Center of Grassfields culture.",
      coordinates: { lat: 5.7333, lng: 10.9000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Foumban"
    }
  ],
  
  // ============ RWANDA/BURUNDI ============
  banyarwanda: [
    {
      name: "Kigali Genocide Memorial",
      type: "museum",
      description: "Memorial and burial site for over 250,000 victims of the 1994 Rwandan Genocide. Documents the history of genocide and promotes reconciliation.",
      coordinates: { lat: -1.9461, lng: 30.0619 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kigali_Genocide_Memorial"
    },
    {
      name: "King's Palace Museum (Nyanza)",
      type: "historical",
      description: "Reconstructed traditional royal residence showing the Rwandan monarchy's history. Contains royal drums and cattle with magnificent horns.",
      coordinates: { lat: -2.3500, lng: 29.7500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/King%27s_Palace_Museum_(Nyanza)"
    },
    {
      name: "Volcanoes National Park",
      type: "natural",
      description: "Home to the endangered mountain gorillas made famous by Dian Fossey. Sacred in Rwandan tradition as the home of spirits.",
      coordinates: { lat: -1.4833, lng: 29.5333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Volcanoes_National_Park"
    }
  ],
  
  baganda: [
    {
      name: "Kasubi Tombs",
      type: "sacred",
      description: "Burial place of the Kabakas (kings) of Buganda. Major spiritual and political site. UNESCO World Heritage Site (damaged by fire in 2010, under restoration).",
      coordinates: { lat: 0.3233, lng: 32.5517 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kasubi_Tombs",
      unescoStatus: "world-heritage"
    },
    {
      name: "Lubiri (Mengo Palace)",
      type: "historical",
      description: "Official residence of the Kabaka of Buganda. Contains the Idi Amin torture chambers, now a museum documenting Uganda's troubled history.",
      coordinates: { lat: 0.3017, lng: 32.5550 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lubiri"
    },
    {
      name: "Namugongo Martyrs Shrine",
      type: "sacred",
      description: "Site where 22 Catholic and 23 Anglican converts were martyred on orders of Kabaka Mwanga II in 1886. Major pilgrimage site.",
      coordinates: { lat: 0.3833, lng: 32.6333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Uganda_Martyrs"
    }
  ],
  
  sukuma: [
    {
      name: "Bujora Cultural Centre",
      type: "museum",
      description: "Museum and cultural center dedicated to Sukuma traditions, featuring the famous Sukuma snake dance and traditional medicine practices.",
      coordinates: { lat: -2.5667, lng: 33.0167 }
    }
  ],
  
  chagga: [
    {
      name: "Mount Kilimanjaro",
      type: "natural",
      description: "Africa's highest mountain (5,895m), traditionally home to the Chagga people who farm its fertile slopes. Sacred in Chagga cosmology.",
      coordinates: { lat: -3.0758, lng: 37.3533 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Kilimanjaro",
      unescoStatus: "world-heritage"
    },
    {
      name: "Chagga Live Museum (Moshi)",
      type: "museum",
      description: "Living museum showcasing traditional Chagga underground houses, blacksmithing, and coffee cultivation that made the Chagga prosperous.",
      coordinates: { lat: -3.3500, lng: 37.3333 }
    }
  ],
  
  // ============ ADDITIONAL KENYA TRIBES ============
  kisii: [
    {
      name: "Kisii Stone (Tabaka Soapstone)",
      type: "natural",
      description: "Source of the famous Kisii soapstone, carved by Gusii artisans for centuries. The pink and white stone is unique to this region.",
      coordinates: { lat: -0.8333, lng: 34.8833 }
    }
  ],
  
  meru: [
    {
      name: "Njuri Ncheke Sacred Site",
      type: "sacred",
      description: "Traditional meeting place of the Njuri Ncheke council of elders, the supreme traditional authority of the Meru people since ancient times.",
      coordinates: { lat: 0.0500, lng: 37.6500 }
    },
    {
      name: "Meru National Museum",
      type: "museum",
      description: "Museum showcasing Meru cultural artifacts, traditional instruments, and the history of the Ameru people's migration from the coast.",
      coordinates: { lat: 0.0500, lng: 37.6500 }
    }
  ],
  
  taita: [
    {
      name: "Taita Hills Sanctuary",
      type: "natural",
      description: "Forested hills sacred to the Taita people, containing ancestral shrines and burial caves. The Taita traditionally buried their dead in caves.",
      coordinates: { lat: -3.4167, lng: 38.3500 }
    }
  ],
  
  samburu: [
    {
      name: "Samburu National Reserve",
      type: "natural",
      description: "Traditional Samburu territory along the Ewaso Ng'iro River, home to the 'Samburu Special Five' wildlife unique to northern Kenya.",
      coordinates: { lat: 0.5667, lng: 37.5333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Samburu_National_Reserve"
    }
  ],
  
  pokot: [
    {
      name: "Cherangani Hills",
      type: "natural",
      description: "Sacred mountain range for the Pokot people, containing traditional ceremonial sites and the source of several rivers.",
      coordinates: { lat: 1.2500, lng: 35.4667 }
    }
  ],
  
  // ============ TANZANIA (Additional) ============
  hadzabe: [
    {
      name: "Lake Eyasi",
      type: "natural",
      description: "Seasonal salt lake in Tanzania where the Hadza (Hadzabe) hunter-gatherers have lived for thousands of years. One of the last hunter-gatherer societies.",
      coordinates: { lat: -3.5833, lng: 35.0833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Eyasi"
    }
  ],
  
  datoga: [
    {
      name: "Ngorongoro Crater",
      type: "natural",
      description: "World's largest inactive volcanic caldera, traditional territory shared between Maasai and Datoga peoples. UNESCO World Heritage Site.",
      coordinates: { lat: -3.1833, lng: 35.5833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ngorongoro_Conservation_Area",
      unescoStatus: "world-heritage"
    }
  ],
  
  // ============ ADDITIONAL WEST AFRICA ============
  akan: [
    {
      name: "Elmina Castle",
      type: "historical",
      description: "Oldest European building in sub-Saharan Africa, built by Portuguese in 1482. Major slave trading post. UNESCO World Heritage Site.",
      coordinates: { lat: 5.0833, lng: -1.3500 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Elmina_Castle",
      unescoStatus: "world-heritage"
    },
    {
      name: "Cape Coast Castle",
      type: "historical",
      description: "British slave trading fort, now a museum documenting the trans-Atlantic slave trade. Contains the 'Door of No Return'. UNESCO World Heritage Site.",
      coordinates: { lat: 5.1031, lng: -1.2414 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Cape_Coast_Castle",
      unescoStatus: "world-heritage"
    }
  ],
  
  tiv: [
    {
      name: "Benue Valley",
      type: "natural",
      description: "Traditional homeland of the Tiv people along the Benue River. Center of Tiv agricultural civilization and clan organization.",
      coordinates: { lat: 7.7333, lng: 8.5333 }
    }
  ],
  
  ijaw: [
    {
      name: "Niger Delta Wetlands",
      type: "natural",
      description: "Vast mangrove swamps and waterways home to the Ijaw people for millennia. Traditional fishing grounds and oil-rich region.",
      coordinates: { lat: 4.7500, lng: 6.0000 }
    }
  ],
  
  // ============ ADDITIONAL SOUTHERN AFRICA ============
  tswana: [
    {
      name: "Gaborone National Museum",
      type: "museum",
      description: "National museum of Botswana showcasing Tswana cultural heritage, traditional crafts, and the history of the Tswana kingdoms.",
      coordinates: { lat: -24.6544, lng: 25.9064 }
    }
  ],
  
  venda: [
    {
      name: "Lake Fundudzi",
      type: "sacred",
      description: "Sacred lake of the Venda people, believed to be guarded by a python god. One of the few true inland lakes in South Africa.",
      coordinates: { lat: -22.8333, lng: 30.3167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Fundudzi"
    },
    {
      name: "Thulamela Archaeological Site",
      type: "archaeological",
      description: "Stone-walled settlement in Kruger National Park, demonstrating Venda connections to Great Zimbabwe civilization (1450-1650 AD).",
      coordinates: { lat: -22.6333, lng: 31.3833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Thulamela"
    }
  ],
  
  pedi: [
    {
      name: "Makapansgat",
      type: "archaeological",
      description: "Cave system with 3-million-year-old hominid fossils and Iron Age artifacts. Part of the Cradle of Humankind in Pedi territory.",
      coordinates: { lat: -24.1667, lng: 29.1833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Makapansgat"
    }
  ],
  
  swazi: [
    {
      name: "Lobamba Royal Village",
      type: "historical",
      description: "Traditional and legislative capital of Eswatini (Swaziland), seat of the Queen Mother and location of the annual Umhlanga Reed Dance.",
      coordinates: { lat: -26.4500, lng: 31.2000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lobamba"
    }
  ],
  
  // ============ NORTH AFRICA ============
  berber: [
    {
      name: "Ait Benhaddou",
      type: "historical",
      description: "Ancient fortified city (ksar) along the caravan route between Sahara and Marrakech. UNESCO World Heritage Site showcasing Berber architecture.",
      coordinates: { lat: 31.0500, lng: -7.1333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/A%C3%AFt_Benhaddou",
      unescoStatus: "world-heritage"
    },
    {
      name: "Djemaa el-Fna",
      type: "historical",
      description: "Main square in Marrakech, center of Berber culture with storytellers, musicians, and traditional markets. UNESCO Intangible Heritage.",
      coordinates: { lat: 31.6258, lng: -7.9891 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Jemaa_el-Fnaa"
    }
  ],
  
  tuareg: [
    {
      name: "Timbuktu",
      type: "historical",
      description: "Legendary desert city and center of Islamic learning in the Sahara. Major Tuareg trading post. UNESCO World Heritage Site (endangered).",
      coordinates: { lat: 16.7735, lng: -3.0074 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Timbuktu",
      unescoStatus: "world-heritage"
    },
    {
      name: "Aïr Mountains",
      type: "natural",
      description: "Mountain range in Niger, traditional Tuareg homeland. Contains ancient rock art and caravan routes. UNESCO World Heritage Site.",
      coordinates: { lat: 18.5000, lng: 8.5000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/A%C3%AFr_Mountains",
      unescoStatus: "world-heritage"
    }
  ],
  
  // ============ HORN OF AFRICA (Additional) ============
  somali: [
    {
      name: "Laas Geel Rock Art",
      type: "archaeological",
      description: "Cave complex with some of the best-preserved Neolithic rock paintings in Africa, depicting decorated cattle and ancient Somali life.",
      coordinates: { lat: 9.7833, lng: 44.4667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Laas_Geel"
    },
    {
      name: "Ancient City of Zeila",
      type: "archaeological",
      description: "Ruined port city that was a center of Islamic civilization and trade with Arabia for over 1,000 years.",
      coordinates: { lat: 11.3500, lng: 43.4667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Zeila"
    }
  ],
  
  afar: [
    {
      name: "Danakil Depression",
      type: "natural",
      description: "One of Earth's hottest and lowest places, home to the Afar people. Contains salt flats, volcanoes, and unique geological formations.",
      coordinates: { lat: 14.2333, lng: 40.3000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Danakil_Depression"
    },
    {
      name: "Erta Ale Volcano",
      type: "natural",
      description: "Active shield volcano with a lava lake, one of only a few in the world. Sacred and feared in Afar tradition.",
      coordinates: { lat: 13.6000, lng: 40.6667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Erta_Ale"
    }
  ],
  
  dinka: [
    {
      name: "Sudd Wetlands",
      type: "natural",
      description: "One of the world's largest wetlands along the White Nile, traditional homeland of the Dinka cattle herders for millennia.",
      coordinates: { lat: 7.0000, lng: 30.5000 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sudd"
    }
  ],
  
  nuer: [
    {
      name: "Lou Nuer Territory",
      type: "natural",
      description: "Traditional cattle grazing lands of the Nuer people along the Sobat River in South Sudan and Ethiopia.",
      coordinates: { lat: 8.5000, lng: 33.0000 }
    }
  ],
  
  // ============ MALAGASY ============
  merina: [
    {
      name: "Rova of Antananarivo (Queen's Palace)",
      type: "historical",
      description: "Royal palace complex of the Merina monarchy, perched on the highest hill of Madagascar's capital. Built for Queen Ranavalona I and destroyed by fire in 1995, now being restored.",
      coordinates: { lat: -18.9167, lng: 47.5333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Rova_of_Antananarivo"
    },
    {
      name: "Ambohimanga (Royal Hill)",
      type: "sacred",
      description: "UNESCO World Heritage Site - the spiritual heart of the Merina monarchy. Contains royal tombs, sacred pools, and the original wooden palace of King Andrianampoinimerina.",
      coordinates: { lat: -18.76, lng: 47.56 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ambohimanga",
      unescoStatus: "world-heritage"
    },
    {
      name: "Lake Anosy",
      type: "historical",
      description: "Heart-shaped lake in central Antananarivo, created by the Merina king Radama I. Site of the war memorial and jacaranda trees planted during French colonial era.",
      coordinates: { lat: -18.91, lng: 47.53 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Anosy"
    },
    {
      name: "Antsahadinta Royal Hill",
      type: "historical",
      description: "One of the twelve sacred hills of Imerina (Merina kingdom). Site of a preserved traditional royal village showing pre-colonial highland architecture.",
      coordinates: { lat: -18.98, lng: 47.41 }
    }
  ],
  
  // ============ LESSER-KNOWN TRIBES ============
  dogon: [
    {
      name: "Bandiagara Escarpment",
      type: "natural",
      description: "Dramatic 150km sandstone cliff with over 700 Dogon villages built into the rock face. UNESCO World Heritage Site since 1989, containing sacred shrines and ancient Tellem dwellings.",
      coordinates: { lat: 14.3500, lng: -3.6167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bandiagara_Escarpment",
      unescoStatus: "world-heritage"
    },
    {
      name: "Sangha Village Complex",
      type: "sacred",
      description: "One of the largest Dogon villages with elaborate toguna (men's meeting houses), granaries, and the Hogon's (spiritual leader) sacred compound.",
      coordinates: { lat: 14.4667, lng: -3.3167 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sangha,_Mali"
    },
    {
      name: "Tellem Caves",
      type: "archaeological",
      description: "Ancient burial caves of the Tellem people who preceded the Dogon. Cliff burials date back to the 11th century and contain unique artifacts.",
      coordinates: { lat: 14.3000, lng: -3.4833 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Tellem"
    }
  ],
  
  senufo: [
    {
      name: "Korhogo Sacred Grove",
      type: "sacred",
      description: "Sacred forest near Korhogo containing Poro society initiation sites, ancestral shrines, and secret ritual grounds. Center of Senufo spiritual life.",
      coordinates: { lat: 9.4500, lng: -5.6333 }
    },
    {
      name: "Fakaha Village",
      type: "historical",
      description: "Famous Senufo artisan village known for producing traditional mud cloth (korhogo cloth) paintings. Artists draw with fermented mud on cotton fabric.",
      coordinates: { lat: 9.5667, lng: -5.8333 }
    },
    {
      name: "Sikasso Fortress",
      type: "historical",
      description: "Ruins of the Tata fortress in Sikasso, Mali, where Senufo and Bambara peoples resisted French colonization until 1898. The king chose death over surrender.",
      coordinates: { lat: 11.3167, lng: -5.6667 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sikasso"
    }
  ],
  
  hadza: [
    {
      name: "Lake Eyasi",
      type: "natural",
      description: "Seasonal salt lake in the Rift Valley and ancestral homeland of the Hadza hunter-gatherers for over 50,000 years. The lake basin provides their hunting and gathering territory.",
      coordinates: { lat: -3.55, lng: 35.10 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Eyasi"
    },
    {
      name: "Mangola Village Area",
      type: "historical",
      description: "Main contact point for visitors to meet Hadza communities. Traditional camps are located in the surrounding bush and baobab forests.",
      coordinates: { lat: -3.75, lng: 35.03 }
    }
  ],
  
  wodaabe: [
    {
      name: "Ingall (Cure Salée Festival)",
      type: "sacred",
      description: "Niger town hosting the annual Cure Salée festival where Wodaabe gather after rainy season. Site of famous Gerewol male beauty contests and tribal reunions.",
      coordinates: { lat: 16.7833, lng: 6.9333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Cur%C3%A9_sal%C3%A9e"
    }
  ],
  
  mursi: [
    {
      name: "Omo National Park",
      type: "natural",
      description: "Remote national park in the Omo Valley, traditional territory of the Mursi people. Contains their villages along the Omo River floodplains.",
      coordinates: { lat: 5.5, lng: 35.9 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Omo_National_Park"
    },
    {
      name: "Mago National Park",
      type: "natural",
      description: "Park bordering Mursi territory where many visitors encounter Mursi people. Named after the Mago River, a tributary of the Omo.",
      coordinates: { lat: 5.7, lng: 36.1 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mago_National_Park"
    }
  ],
  
  mbuti: [
    {
      name: "Ituri Rainforest",
      type: "natural",
      description: "One of Africa's oldest and most biodiverse rainforests, home to the Mbuti Pygmy peoples for millennia. Contains the Okapi Wildlife Reserve (UNESCO World Heritage).",
      coordinates: { lat: 1.5, lng: 28.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ituri_Rainforest"
    },
    {
      name: "Okapi Wildlife Reserve",
      type: "natural",
      description: "UNESCO World Heritage Site within Mbuti territory, home to the rare okapi and many Mbuti bands who serve as forest guides and conservation partners.",
      coordinates: { lat: 1.9, lng: 28.8 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Okapi_Wildlife_Reserve",
      unescoStatus: "world-heritage"
    }
  ],
  
  amazigh: [
    {
      name: "Ksar of Ait-Ben-Haddou",
      type: "historical",
      description: "Fortified Berber village (ksar) in Morocco, UNESCO World Heritage Site. Classic example of southern Moroccan Amazigh earthen architecture.",
      coordinates: { lat: 31.0472, lng: -7.1289 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/A%C3%AFt_Benhaddou",
      unescoStatus: "world-heritage"
    },
    {
      name: "Djémila (Cuicul)",
      type: "archaeological",
      description: "Roman ruins in Algeria's Kabyle region, UNESCO World Heritage Site. Demonstrates Berber-Roman cultural synthesis.",
      coordinates: { lat: 36.3167, lng: 5.7333 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dj%C3%A9mila",
      unescoStatus: "world-heritage"
    },
    {
      name: "Medina of Fez",
      type: "historical",
      description: "World's largest car-free urban area and UNESCO World Heritage Site. Ancient Amazigh city that became a center of Islamic learning.",
      coordinates: { lat: 34.0617, lng: -4.9775 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fes_el_Bali",
      unescoStatus: "world-heritage"
    },
    {
      name: "Siwa Oasis",
      type: "sacred",
      description: "Remote Egyptian oasis with Berber-speaking population. Contains the Oracle of Amun temple consulted by Alexander the Great.",
      coordinates: { lat: 29.2031, lng: 25.5194 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Siwa_Oasis"
    }
  ],
  
  hamar: [
    {
      name: "Turmi Village",
      type: "historical",
      description: "Main village and market center of the Hamar people. Famous for weekly markets where Hamar gather in traditional dress.",
      coordinates: { lat: 4.95, lng: 36.45 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Turmi"
    },
    {
      name: "Dimeka Village",
      type: "historical",
      description: "Second major Hamar settlement with important Saturday market. Site of many bull jumping ceremonies during the dry season.",
      coordinates: { lat: 5.1, lng: 36.5 }
    }
  ],
  
  karo: [
    {
      name: "Korcho Village",
      type: "historical",
      description: "Main Karo village perched above the Omo River. Center of Karo body painting traditions and primary contact point for visitors.",
      coordinates: { lat: 5.3, lng: 36.0 }
    },
    {
      name: "Omo River Banks",
      type: "natural",
      description: "The Omo River provides the Karo with fish, water, and fertile flood-retreat farmland essential to their survival.",
      coordinates: { lat: 5.2, lng: 35.95 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Omo_River"
    }
  ],
  
  // ============ SOUTH SUDAN ============
  shilluk: [
    {
      name: "Fashoda (Kodok)",
      type: "historical",
      description: "Traditional capital of the Shilluk Kingdom and seat of the Reth (divine king). Site of the famous 1898 Fashoda Incident between France and Britain.",
      coordinates: { lat: 9.88, lng: 32.12 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kodok"
    },
    {
      name: "Malakal",
      type: "historical",
      description: "Largest city in Upper Nile State with significant Shilluk population. Important trading center on the White Nile.",
      coordinates: { lat: 9.53, lng: 31.66 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Malakal"
    }
  ],

  // ============ CENTRAL AFRICA ============
  baka: [
    {
      name: "Dja Faunal Reserve",
      type: "natural",
      description: "UNESCO World Heritage rainforest site and traditional Baka hunting grounds. One of the largest and best-protected rainforests in Africa.",
      coordinates: { lat: 3.0, lng: 13.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dja_Faunal_Reserve",
      unescoStatus: "world-heritage"
    },
    {
      name: "Lobéké National Park",
      type: "natural",
      description: "Protected forest where Baka maintain traditional hunting and gathering rights. Famous for forest elephants and gorillas.",
      coordinates: { lat: 2.3, lng: 15.6 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lobéké_National_Park"
    }
  ],

  suri: [
    {
      name: "Kibish",
      type: "historical",
      description: "Main town and administrative center of the Suri. Remote location requires days of travel from major Ethiopian cities.",
      coordinates: { lat: 5.3, lng: 35.5 }
    },
    {
      name: "Omo National Park",
      type: "natural",
      description: "National park in Suri territory, though the tribe has limited access. Home to diverse wildlife and river ecosystems.",
      coordinates: { lat: 5.7, lng: 36.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Omo_National_Park"
    }
  ],

  // ============ WEST AFRICA ============
  malinke: [
    {
      name: "Niani (Ancient Capital)",
      type: "archaeological",
      description: "Believed site of Niani, capital of the Mali Empire under Mansa Musa. Archaeological excavations continue to reveal the city's former glory.",
      coordinates: { lat: 11.38, lng: -8.41 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Niani_(city)"
    },
    {
      name: "Kangaba",
      type: "sacred",
      description: "Sacred town where the Kamabolon sanctuary stands—a thatched structure rebuilt every seven years in a ceremony preserving Mandinka oral traditions.",
      coordinates: { lat: 11.93, lng: -8.42 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kangaba"
    },
    {
      name: "Timbuktu",
      type: "historical",
      description: "Legendary city of learning and trade, established by the Mali Empire. UNESCO World Heritage site with ancient mosques and libraries.",
      coordinates: { lat: 16.77, lng: -3.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Timbuktu",
      unescoStatus: "world-heritage"
    }
  ],

  // ============ KENYA - OGIEK ============
  ogiek: [
    {
      name: "Mau Forest Complex",
      type: "natural",
      description: "The largest montane forest in East Africa and ancestral home of the Ogiek people. The Ogiek won a landmark African Court case for their land rights here in 2017.",
      coordinates: { lat: -0.5, lng: 35.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mau_Forest"
    },
    {
      name: "Nessuit Village",
      type: "historical",
      description: "Historic Ogiek settlement in the Mau Forest. Center of traditional beekeeping and honey-gathering culture.",
      coordinates: { lat: -0.35, lng: 35.65 }
    }
  ],

  // ============ UGANDA - KARAMOJONG & IK ============
  karamojong: [
    {
      name: "Mount Moroto",
      type: "sacred",
      description: "Sacred mountain of the Karamojong, believed to be the source of their cattle. Traditional spiritual site for prayers and ceremonies.",
      coordinates: { lat: 2.54, lng: 34.8 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Moroto"
    },
    {
      name: "Karamoja Cultural Festival Grounds",
      type: "historical",
      description: "Annual gathering site where Karamojong and related groups celebrate traditional culture, dance, and cattle competitions.",
      coordinates: { lat: 2.3, lng: 34.63 }
    }
  ],

  ik: [
    {
      name: "Mount Morungole",
      type: "natural",
      description: "Mountain home of the Ik people on the Uganda-Kenya border. The Ik were displaced from hunting grounds below and now farm the mountain slopes.",
      coordinates: { lat: 3.8, lng: 33.8 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Morungole"
    }
  ],

  // ============ KENYA - RENDILLE ============
  rendille: [
    {
      name: "Kaisut Desert",
      type: "natural",
      description: "The semi-arid territory where Rendille camel herders have survived for centuries. Extreme conditions make camels essential for survival.",
      coordinates: { lat: 2.3, lng: 37.2 }
    },
    {
      name: "Korr",
      type: "historical",
      description: "Major Rendille settlement in Marsabit County. Administrative center and market town for the Rendille community.",
      coordinates: { lat: 2.5, lng: 37.12 }
    }
  ],

  // ============ MADAGASCAR - BETSILEO, SAKALAVA ============

  betsileo: [
    {
      name: "Ambositra (City of Woodcarvers)",
      type: "historical",
      description: "Capital of Betsileo woodcarving traditions. The town is famous for intricate Zafimaniry-style carvings and produces aloalo funerary posts.",
      coordinates: { lat: -20.52, lng: 47.24 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ambositra"
    },
    {
      name: "Betsileo Rice Terraces",
      type: "natural",
      description: "Spectacular irrigated rice terraces carved into hillsides around Fianarantsoa. Rival Southeast Asian terraces in sophistication and beauty.",
      coordinates: { lat: -21.0, lng: 47.0 }
    },
    {
      name: "Fianarantsoa Upper Town",
      type: "historical",
      description: "Historic highland town blending Merina and Betsileo architecture. Contains the oldest church in Madagascar and serves as cultural capital of Betsileo country.",
      coordinates: { lat: -21.44, lng: 47.09 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fianarantsoa"
    }
  ],

  sakalava: [
    {
      name: "Mahajanga (Majunga)",
      type: "historical",
      description: "Historic Sakalava port city on Madagascar's northwest coast. Former capital of the Boina Sakalava kingdom with Arab, Indian, and African trading heritage.",
      coordinates: { lat: -15.72, lng: 46.32 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mahajanga"
    },
    {
      name: "Menabe Antimena Protected Area",
      type: "natural",
      description: "Western Madagascar dry forest home to the Sakalava people. Contains baobab trees, unique lemurs, and traditional Sakalava sacred sites.",
      coordinates: { lat: -20.3, lng: 44.4 }
    },
    {
      name: "Avenue of the Baobabs",
      type: "natural",
      description: "Iconic row of Grandidier's baobab trees in Sakalava territory. Located on an ancient forest edge sacred to local communities.",
      coordinates: { lat: -20.25, lng: 44.42 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Avenue_of_the_Baobabs"
    }
  ],

  // ============ CENTRAL AFRICAN REPUBLIC - BANDA, GBAYA ============
  banda: [
    {
      name: "Bangui (Capital City)",
      type: "historical",
      description: "Capital of the Central African Republic, named from Banda word meaning 'the rapids.' Founded on Ubangi River, it serves as the political and cultural center.",
      coordinates: { lat: 4.36, lng: 18.56 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bangui"
    },
    {
      name: "Boganda Memorial",
      type: "historical",
      description: "Memorial to Barthélémy Boganda, Banda leader and 'Father of Central African Republic.' He led the independence movement but died in a 1959 plane crash.",
      coordinates: { lat: 4.37, lng: 18.58 }
    },
    {
      name: "Ubangi River",
      type: "natural",
      description: "Major river forming CAR's southern border with DR Congo. Central to Banda fishing, transport, and trade for centuries.",
      coordinates: { lat: 4.0, lng: 19.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ubangi_River"
    }
  ],

  gbaya: [
    {
      name: "Bouar Megaliths",
      type: "archaeological",
      description: "Mysterious megalithic stone circles in Gbaya territory dating to 5500-450 BCE. UNESCO Tentative List site showing ancient Central African civilizations.",
      coordinates: { lat: 5.93, lng: 15.6 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bouar_megaliths",
      unescoStatus: "tentative"
    },
    {
      name: "Nana-Mambéré Prefecture",
      type: "historical",
      description: "Heartland of Gbaya settlement in northwestern CAR. The region was center of the Kara War anti-colonial uprising (1928-1931).",
      coordinates: { lat: 6.0, lng: 15.0 }
    },
    {
      name: "Mbaïki Town",
      type: "historical",
      description: "Town in southwestern CAR with significant Gbaya population. Center of logging and coffee production, reflecting colonial economic legacies.",
      coordinates: { lat: 3.87, lng: 18.0 }
    }
  ]
};

// Helper function to get landmarks for a tribe
export const getTribeLandmarks = (tribeId: string): CulturalLandmark[] => {
  return tribeLandmarks[tribeId] || [];
};
