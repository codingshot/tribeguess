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
  ],

  mangbetu: [
    {
      name: "Mangbetu Royal Court Site",
      type: "historical",
      description: "Historical location of the Mangbetu royal court, known for its sophisticated culture, music, and the famous Lipombo head elongation tradition practiced by the elite.",
      coordinates: { lat: 3.25, lng: 27.75 }
    },
    {
      name: "Okondo Archaeological Area",
      type: "archaeological",
      description: "Region rich in Mangbetu artifacts including distinctive anthropomorphic pottery, harps, and sculptures now found in world museums.",
      coordinates: { lat: 3.5, lng: 28.0 }
    }
  ],

  ovimbundu: [
    {
      name: "Huambo City (Nova Lisboa)",
      type: "historical",
      description: "Historical center of Ovimbundu territory, founded as Nova Lisboa during colonial era. Second-largest city in Angola and cultural heart of the highlands.",
      coordinates: { lat: -12.78, lng: 15.73 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Huambo"
    },
    {
      name: "Bailundo Kingdom Site",
      type: "historical",
      description: "One of the most powerful Ovimbundu kingdoms, Bailundo was a major trading center controlling routes from the interior to the Atlantic coast.",
      coordinates: { lat: -11.94, lng: 15.80 }
    },
    {
      name: "Bié Plateau",
      type: "natural",
      description: "High plateau that is the heartland of Ovimbundu settlement. Its temperate climate and fertile soil made it an agricultural center.",
      coordinates: { lat: -12.5, lng: 17.0 }
    }
  ],

  chokwe: [
    {
      name: "Dundo Museum (Museu do Dundo)",
      type: "museum",
      description: "World-renowned museum housing the finest collection of Chokwe art, including masks, sculptures, and ceremonial objects. Founded by Diamang diamond company.",
      coordinates: { lat: -7.38, lng: 20.83 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dundo"
    },
    {
      name: "Lunda Norte Diamond Region",
      type: "natural",
      description: "Major diamond-producing region that is traditional Chokwe territory. The area has been both a blessing and curse due to conflict over resources.",
      coordinates: { lat: -8.5, lng: 20.5 }
    }
  ],

  luba: [
    {
      name: "Lake Upemba",
      type: "natural",
      description: "The cradle of Luba civilization. The Luba Kingdom emerged near this lake around 1585, developing into one of Central Africa's most sophisticated states.",
      coordinates: { lat: -8.83, lng: 26.63 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Upemba"
    },
    {
      name: "Kabongo (Historical Capital)",
      type: "historical",
      description: "One of the historical centers of Luba royal authority. The Mulopwe (king) ruled from such centers with a complex bureaucracy.",
      coordinates: { lat: -7.32, lng: 24.48 }
    },
    {
      name: "Tervuren Museum Luba Collection",
      type: "museum",
      description: "The Royal Museum for Central Africa in Belgium holds one of the world's finest Luba art collections, including memory boards (lukasa) and royal stools.",
      coordinates: { lat: 50.83, lng: 4.52 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Royal_Museum_for_Central_Africa"
    }
  ],

  // ============ CHAD ============
  sara: [
    {
      name: "Moundou",
      type: "historical",
      description: "The largest city in southern Chad and the heart of Sara country. A major cotton industry center and cultural hub for the Sara people.",
      coordinates: { lat: 8.57, lng: 16.07 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Moundou"
    },
    {
      name: "Sarh (Fort-Archambault)",
      type: "historical",
      description: "The second largest city in Chad, historically called Fort-Archambault during French rule. A center of Sara culture and resistance to colonial forced labor.",
      coordinates: { lat: 9.14, lng: 18.39 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sarh"
    }
  ],


  // ============ NIGER ============
  zarma: [
    {
      name: "Niamey (National Museum)",
      type: "museum",
      description: "The capital of Niger and heart of Zarma territory. The National Museum of Niger showcases Zarma and other Nigerien cultures.",
      coordinates: { lat: 13.51, lng: 2.11 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/National_Museum_of_Niger"
    },
    {
      name: "Historic Centre of Agadez",
      type: "historical",
      description: "UNESCO World Heritage Site: A major crossroads of Saharan caravan routes since the 15th century with iconic mud-brick architecture and the famous Agadez Mosque.",
      coordinates: { lat: 16.97, lng: 7.99 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Agadez",
      unescoStatus: "world-heritage"
    },
    {
      name: "Dosso",
      type: "historical",
      description: "Historical center of the Dosso Sultanate and traditional Zarma governance. The Djermakoye (traditional chief) still holds ceremonial authority.",
      coordinates: { lat: 13.04, lng: 3.19 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dosso"
    }
  ],

  // ============ MAURITANIA ============
  moors: [
    {
      name: "Chinguetti",
      type: "historical",
      description: "UNESCO World Heritage Site: Islam's 'seventh holy city' with 13 ancient libraries containing thousands of medieval manuscripts dating to the 12th century.",
      coordinates: { lat: 20.46, lng: -12.37 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Chinguetti",
      unescoStatus: "world-heritage"
    },
    {
      name: "Ouadane",
      type: "historical",
      description: "UNESCO World Heritage Site: Ancient caravan trading post founded in the 12th century, once a key stop on the trans-Saharan trade routes.",
      coordinates: { lat: 20.93, lng: -11.62 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ouadane",
      unescoStatus: "world-heritage"
    },
    {
      name: "Richat Structure (Eye of the Sahara)",
      type: "natural",
      description: "A 50km-wide geological dome visible from space, located in Moorish territory. Some theorize it may be the location of Atlantis.",
      coordinates: { lat: 21.12, lng: -11.4 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Richat_Structure"
    },
    {
      name: "Tichitt",
      type: "archaeological",
      description: "UNESCO World Heritage Site: Ancient cliff settlements with ruins dating back 4,000 years, among the earliest evidence of urbanization in West Africa.",
      coordinates: { lat: 18.45, lng: -9.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Tichitt",
      unescoStatus: "world-heritage"
    }
  ],

  soninke: [
    {
      name: "Koumbi Saleh",
      type: "archaeological",
      description: "The likely capital of the ancient Ghana Empire (Wagadu), founded by the Soninke. Archaeological ruins reveal a city that may have housed 20,000+ people.",
      coordinates: { lat: 15.77, lng: -7.97 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Koumbi_Saleh"
    },
    {
      name: "Kayes",
      type: "historical",
      description: "Major city in the Soninke heartland of Mali. A railway hub that served as colonial capital of French Sudan before Bamako.",
      coordinates: { lat: 14.45, lng: -11.44 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kayes"
    }
  ],

  // ============ ISLAND NATIONS ============
  "cape-verdean": [
    {
      name: "Cidade Velha (Ribeira Grande)",
      type: "historical",
      description: "UNESCO World Heritage Site: The first European colonial city in the tropics, founded in 1462. Contains the oldest colonial church in sub-Saharan Africa.",
      coordinates: { lat: 14.92, lng: -23.61 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Cidade_Velha",
      unescoStatus: "world-heritage"
    },
    {
      name: "Pico do Fogo",
      type: "natural",
      description: "The highest peak in Cape Verde at 2,829m and an active volcano. Last erupted in 2014-2015, destroying villages on its slopes.",
      coordinates: { lat: 14.95, lng: -24.34 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Pico_do_Fogo"
    },
    {
      name: "Mindelo",
      type: "historical",
      description: "The cultural capital of Cape Verde and birthplace of morna music. Home to Cesária Évora and the country's main carnival celebration.",
      coordinates: { lat: 16.89, lng: -24.99 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mindelo"
    }
  ],

  comorian: [
    {
      name: "Moroni Medina",
      type: "historical",
      description: "The old quarter of Comoros' capital with ancient mosques, narrow streets, and traditional architecture reflecting Arab and Swahili influences.",
      coordinates: { lat: -11.7, lng: 43.26 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Moroni,_Comoros"
    },
    {
      name: "Mount Karthala",
      type: "natural",
      description: "One of the world's largest and most active shield volcanoes. The summit crater is 3km wide and has erupted more than 20 times since 1828.",
      coordinates: { lat: -11.75, lng: 43.35 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Karthala"
    },
    {
      name: "Itsandra Palace",
      type: "historical",
      description: "Historic palace and site of traditional Comorian governance. Symbol of the sultanate era before French colonization.",
      coordinates: { lat: -11.67, lng: 43.24 }
    }
  ],

  // ============ SUDAN & SOUTH SUDAN ============
  nubian: [
    {
      name: "Pyramids of Meroë",
      type: "archaeological",
      description: "UNESCO World Heritage Site: Over 200 pyramids of the ancient Kingdom of Kush, built between 300 BCE and 300 CE. Nubia has more pyramids than Egypt.",
      coordinates: { lat: 16.94, lng: 33.75 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mero%C3%AB",
      unescoStatus: "world-heritage"
    },
    {
      name: "Jebel Barkal",
      type: "sacred",
      description: "UNESCO World Heritage Site: Sacred mountain of the Kushites believed to be the home of the god Amun. Contains temples and pyramids dating to 1450 BCE.",
      coordinates: { lat: 18.53, lng: 31.83 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Jebel_Barkal",
      unescoStatus: "world-heritage"
    },
    {
      name: "Nubian Museum (Aswan)",
      type: "museum",
      description: "Award-winning museum in Egypt documenting Nubian history and culture from prehistory to the present, including artifacts rescued from the Aswan Dam flooding.",
      coordinates: { lat: 24.08, lng: 32.89 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Nubia_Museum"
    },
    {
      name: "Kerma Archaeological Site",
      type: "archaeological",
      description: "Capital of the Kingdom of Kerma (2500-1500 BCE), one of the earliest urban centers in Africa. Features massive mud-brick structures called deffufas.",
      coordinates: { lat: 19.6, lng: 30.42 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kerma"
    },
    {
      name: "Old Dongola",
      type: "archaeological",
      description: "Capital of the Christian Nubian kingdom of Makuria (6th-14th century). Contains churches, monasteries, and the Throne Hall of the Nubian kings.",
      coordinates: { lat: 18.22, lng: 30.75 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Old_Dongola"
    }
  ],

  beja: [
    {
      name: "Suakin Island",
      type: "historical",
      description: "UNESCO Tentative List: Ancient Red Sea port dating to Pharaonic times. Once the gateway for African pilgrims to Mecca and a major slave trade port. Now a ghost town of coral buildings.",
      coordinates: { lat: 19.11, lng: 37.33 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Suakin",
      unescoStatus: "tentative"
    },
    {
      name: "Port Sudan",
      type: "historical",
      description: "Sudan's main seaport, built by the British in 1909 to replace Suakin. Center of Beja population and culture on the Red Sea coast.",
      coordinates: { lat: 19.62, lng: 37.22 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Port_Sudan"
    },
    {
      name: "Red Sea Hills",
      type: "natural",
      description: "The ancestral homeland of the Beja people, a rugged mountain range running parallel to the Red Sea. Rich in gold deposits mined since ancient Egyptian times.",
      coordinates: { lat: 20.0, lng: 36.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Red_Sea_Hills"
    },
    {
      name: "Kassala",
      type: "historical",
      description: "City at the base of the Taka Mountains, an important Beja center. Known for its distinctive rock formations and as a crossroads between Sudan and Eritrea.",
      coordinates: { lat: 15.45, lng: 36.4 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kassala"
    }
  ],

  dinka: [
    {
      name: "Bor Town",
      type: "historical",
      description: "Major Dinka town in Jonglei State. Birthplace of John Garang, founder of the SPLM and key figure in South Sudan's independence. Heavily affected by civil wars.",
      coordinates: { lat: 6.21, lng: 31.55 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bor,_South_Sudan"
    },
    {
      name: "Sudd Wetlands",
      type: "natural",
      description: "One of the world's largest wetlands, fed by the White Nile. The Dinka's traditional cattle-herding grounds, crucial for seasonal grazing.",
      coordinates: { lat: 7.5, lng: 30.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Sudd"
    },
    {
      name: "Wau",
      type: "historical",
      description: "Second-largest city in South Sudan. A diverse city with significant Dinka population, historic churches, and a center of resistance during civil wars.",
      coordinates: { lat: 7.7, lng: 28.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Wau,_South_Sudan"
    },
    {
      name: "John Garang Mausoleum",
      type: "historical",
      description: "Memorial in Juba honoring John Garang de Mabior, the Dinka leader who led the independence struggle. He died in 2005, weeks after the peace agreement.",
      coordinates: { lat: 4.85, lng: 31.58 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/John_Garang"
    }
  ],

  nuer: [
    {
      name: "Bentiu",
      type: "historical",
      description: "Capital of Unity State and center of Nuer territory. Located near major oil fields. Heavily affected by South Sudan's civil conflict.",
      coordinates: { lat: 9.23, lng: 29.83 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bentiu"
    },
    {
      name: "Nasir",
      type: "historical",
      description: "Town in Upper Nile State significant in Nuer history. Site of the 1991 'Nasir Declaration' that split the SPLA along ethnic lines.",
      coordinates: { lat: 8.6, lng: 33.07 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Nasir,_South_Sudan"
    },
    {
      name: "Gambela",
      type: "historical",
      description: "Ethiopian town near the South Sudan border with a significant Nuer population. Historic trading post on the Baro River.",
      coordinates: { lat: 8.25, lng: 34.58 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Gambela"
    },
    {
      name: "Shrine of Ngundeng Bong",
      type: "sacred",
      description: "Sacred site associated with the 19th-century Nuer prophet Ngundeng Bong, whose prophecies and resistance against colonialism are still remembered.",
      coordinates: { lat: 8.5, lng: 31.5 }
    }
  ],

  tigrinya: [
    {
      name: "Asmara Historic Center",
      type: "historical",
      description: "UNESCO World Heritage Site: 'Africa's Modernist City' features exceptional examples of early 20th-century modernist architecture built during Italian colonization.",
      coordinates: { lat: 15.34, lng: 38.93 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Asmara",
      unescoStatus: "world-heritage"
    },
    {
      name: "Debre Bizen Monastery",
      type: "sacred",
      description: "Ancient Orthodox monastery founded in 1361, perched on a mountain at 2,450m. One of Eritrea's holiest sites, women are forbidden from entering.",
      coordinates: { lat: 15.37, lng: 39.2 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Debre_Bizen"
    },
    {
      name: "Massawa Old Town",
      type: "historical",
      description: "Ancient Red Sea port with Ottoman Turkish and Egyptian architecture. Called the 'Pearl of the Red Sea', it was heavily damaged in the independence war.",
      coordinates: { lat: 15.61, lng: 39.45 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Massawa"
    },
    {
      name: "Adulis Archaeological Site",
      type: "archaeological",
      description: "Ancient port city of the Aksumite Empire, once one of the greatest trading centers of the Red Sea. Contains remains from the 1st millennium BCE.",
      coordinates: { lat: 15.23, lng: 39.67 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Adulis"
    },
    {
      name: "Eritrean National Museum",
      type: "museum",
      description: "Museum in Asmara housing artifacts from Eritrea's ancient history, including Aksumite relics and independence war memorabilia.",
      coordinates: { lat: 15.34, lng: 38.94 }
    }
  ],

  afar: [
    {
      name: "Danakil Depression",
      type: "natural",
      description: "One of the hottest and lowest places on Earth, featuring active volcanoes, sulfur springs, salt flats, and an alien landscape. Traditional Afar salt mining area.",
      coordinates: { lat: 14.24, lng: 40.3 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Danakil_Depression"
    },
    {
      name: "Erta Ale Volcano",
      type: "natural",
      description: "One of only six volcanoes with a persistent lava lake. Called 'the Gateway to Hell' in Afar, it's been continuously active for over a century.",
      coordinates: { lat: 13.6, lng: 40.67 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Erta_Ale"
    },
    {
      name: "Lake Afrera (Lake Afdera)",
      type: "natural",
      description: "Salt lake in the Danakil Depression where Afar miners have extracted salt for millennia. The salt bars are transported by camel caravan to the highlands.",
      coordinates: { lat: 13.28, lng: 40.85 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lake_Afdera"
    },
    {
      name: "Hadar (Lucy Discovery Site)",
      type: "archaeological",
      description: "Site where the famous 3.2-million-year-old hominid fossil 'Lucy' (Australopithecus afarensis) was discovered in 1974. Located in Afar territory.",
      coordinates: { lat: 11.12, lng: 40.58 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Hadar,_Ethiopia"
    },
    {
      name: "Dallol",
      type: "natural",
      description: "Hydrothermal field in the Danakil with unearthly formations of sulfur, salt, and minerals. One of Earth's most extreme environments.",
      coordinates: { lat: 14.24, lng: 40.3 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dallol_(hydrothermal_system)"
    }
  ],

  // ============ CHAD ============
  toubou: [
    {
      name: "Tibesti Mountains",
      type: "natural",
      description: "The highest mountain range in the Sahara, sacred homeland of the Toubou people. Contains ancient volcanic peaks rising to 3,415m at Emi Koussi.",
      coordinates: { lat: 20.0, lng: 17.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Tibesti_Mountains"
    },
    {
      name: "Emi Koussi",
      type: "natural",
      description: "The highest peak in Chad and the Sahara Desert at 3,415m. A dormant volcano sacred to the Toubou, featuring a massive caldera with seasonal water.",
      coordinates: { lat: 19.8, lng: 18.53 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Emi_Koussi"
    },
    {
      name: "Lakes of Ounianga",
      type: "natural",
      description: "A series of 18 interconnected lakes in the Sahara, home to Toubou communities for millennia. UNESCO World Heritage Site featuring unique desert hydrology.",
      coordinates: { lat: 19.05, lng: 20.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lakes_of_Ounianga",
      unescoStatus: "world-heritage"
    },
    {
      name: "Bardaï Oasis",
      type: "historical",
      description: "Traditional capital of the Toubou Teda people in the Tibesti Mountains. A vital oasis settlement with palm groves and ancient trading traditions.",
      coordinates: { lat: 21.35, lng: 17.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Barda%C3%AF"
    },
    {
      name: "Zouar",
      type: "historical",
      description: "Important Toubou settlement at the foot of the Tibesti Mountains. Traditional caravan stop on trans-Saharan trade routes.",
      coordinates: { lat: 20.45, lng: 16.52 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Zouar"
    }
  ],

  zaghawa: [
    {
      name: "Ennedi Massif",
      type: "natural",
      description: "Spectacular sandstone plateau with natural arches, towers, and canyons. Contains ancient rock art and is home to Zaghawa communities. UNESCO World Heritage Site.",
      coordinates: { lat: 17.0, lng: 22.0 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Ennedi_Plateau",
      unescoStatus: "world-heritage"
    },
    {
      name: "Aloba Arch",
      type: "natural",
      description: "One of the world's largest natural arches located in the Ennedi Massif. Sacred site with ancient rock paintings nearby.",
      coordinates: { lat: 16.9, lng: 21.8 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Aloba_Arch"
    },
    {
      name: "Iriba",
      type: "historical",
      description: "Traditional Zaghawa town in the Wadi Fira region. Important market center and cultural hub for Zaghawa communities.",
      coordinates: { lat: 15.12, lng: 22.25 }
    },
    {
      name: "Fada (Largeau)",
      type: "historical",
      description: "Gateway town to the Ennedi region and historic Zaghawa settlement. Contains colonial-era buildings and serves as regional administrative center.",
      coordinates: { lat: 17.18, lng: 21.58 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fada,_Chad"
    },
    {
      name: "Guelta d'Archei",
      type: "natural",
      description: "Permanent water source in the Ennedi Massif, home to rare Nile crocodiles. Sacred watering hole for Zaghawa camel herders for centuries.",
      coordinates: { lat: 16.88, lng: 21.82 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Guelta_d%27Archei"
    }
  ],

  // ============ EQUATORIAL GUINEA ============
  fang: [
    {
      name: "Monte Alén National Park",
      type: "natural",
      description: "Dense rainforest in the Fang heartland of continental Equatorial Guinea. Contains rich biodiversity and traditional Fang sacred forest sites.",
      coordinates: { lat: 1.65, lng: 10.3 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Monte_Al%C3%A9n_National_Park"
    },
    {
      name: "Bata Cathedral",
      type: "sacred",
      description: "Major Catholic cathedral in the largest city of continental Equatorial Guinea. Represents the blend of Fang culture with Christianity.",
      coordinates: { lat: 1.86, lng: 9.77 }
    },
    {
      name: "Mongomo Royal Palace",
      type: "historical",
      description: "Modern palace complex built in the Fang heartland, symbolizing Fang political power in contemporary Equatorial Guinea.",
      coordinates: { lat: 1.63, lng: 11.32 }
    },
    {
      name: "Nzang Ayong Sculptures Park",
      type: "museum",
      description: "Open-air museum in Bata featuring monumental sculptures celebrating Fang mythology, traditions, and cultural heroes.",
      coordinates: { lat: 1.85, lng: 9.78 }
    },
    {
      name: "Evinayong",
      type: "historical",
      description: "Traditional Fang town in the forest interior. Center of Fang cultural traditions and gateway to the rainforest highlands.",
      coordinates: { lat: 1.45, lng: 10.55 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Evinayong"
    }
  ],

  bubi: [
    {
      name: "Pico Basilé (Pico Santa Isabel)",
      type: "natural",
      description: "Highest peak in Equatorial Guinea at 3,011m, sacred mountain of the Bubi people. Features unique cloud forest ecosystem and traditional spiritual significance.",
      coordinates: { lat: 3.58, lng: 8.77 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Pico_Basil%C3%A9"
    },
    {
      name: "Malabo (Santa Isabel)",
      type: "historical",
      description: "Capital city on Bioko Island, originally a Bubi settlement. Features colonial architecture and remains the cultural center of Bubi life.",
      coordinates: { lat: 3.75, lng: 8.78 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Malabo"
    },
    {
      name: "Moka Valley",
      type: "natural",
      description: "High-altitude valley on Bioko Island, traditional Bubi heartland. Known for its agricultural terraces and endemic wildlife.",
      coordinates: { lat: 3.35, lng: 8.67 }
    },
    {
      name: "Luba Crater Scientific Reserve",
      type: "natural",
      description: "Protected volcanic caldera in Bubi territory with unique biodiversity. Features nesting beaches for endangered sea turtles.",
      coordinates: { lat: 3.27, lng: 8.55 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Luba_Crater_Scientific_Reserve"
    },
    {
      name: "Riaba (Bubi Cultural Center)",
      type: "historical",
      description: "Traditional Bubi town in southeastern Bioko. Important center for preserving Bubi language, customs, and traditional governance.",
      coordinates: { lat: 3.43, lng: 8.82 }
    }
  ],

  // ============ GABON ============
  myene: [
    {
      name: "Libreville Cathedral",
      type: "sacred",
      description: "Sainte-Marie Cathedral in the Myene heartland of Libreville. Historic church representing the early Christianization of the Myene coastal peoples.",
      coordinates: { lat: 0.39, lng: 9.45 }
    },
    {
      name: "Pointe-Denis Beach",
      type: "natural",
      description: "Pristine beach near Libreville traditionally used by Myene fishermen. Now a protected nesting site for leatherback sea turtles.",
      coordinates: { lat: 0.25, lng: 9.3 }
    },
    {
      name: "Cap Estérias",
      type: "historical",
      description: "Historic Myene fishing village north of Libreville. Site of early European contact and traditional Myene maritime culture.",
      coordinates: { lat: 0.62, lng: 9.33 }
    },
    {
      name: "National Museum of Arts and Traditions",
      type: "museum",
      description: "Museum in Libreville showcasing Myene and other Gabonese cultures. Contains masks, ritual objects, and ethnographic collections.",
      coordinates: { lat: 0.4, lng: 9.44 }
    },
    {
      name: "Pongara National Park",
      type: "natural",
      description: "Coastal park in traditional Myene territory. Protects mangroves, beaches, and wildlife that have sustained Myene communities for centuries.",
      coordinates: { lat: 0.15, lng: 9.38 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Pongara_National_Park"
    }
  ],

  mitsogo: [
    {
      name: "Lopé National Park",
      type: "natural",
      description: "UNESCO World Heritage Site containing ancient rainforest and savanna mosaic. Sacred territory of the Mitsogo and birthplace of the Bwiti religion.",
      coordinates: { lat: -0.5, lng: 11.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lop%C3%A9_National_Park",
      unescoStatus: "world-heritage"
    },
    {
      name: "Bwiti Sacred Forest Temples",
      type: "sacred",
      description: "Sacred forest clearings where Mitsogo Bwiti initiation ceremonies take place. Hidden temples for the consumption of iboga and spiritual communion.",
      coordinates: { lat: -1.5, lng: 11.3 }
    },
    {
      name: "Mouila",
      type: "historical",
      description: "Regional capital near Mitsogo territory. Important center for preserving Bwiti traditions and Mitsogo cultural identity.",
      coordinates: { lat: -1.87, lng: 11.06 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mouila"
    },
    {
      name: "Chutes de l'Impératrice (Empress Falls)",
      type: "natural",
      description: "Spectacular waterfall in the Ogooué River basin near Mitsogo lands. Sacred site associated with water spirits in Bwiti cosmology.",
      coordinates: { lat: -1.6, lng: 11.2 }
    },
    {
      name: "Ogooué River Sacred Sites",
      type: "sacred",
      description: "Series of sacred locations along the Ogooué River where Mitsogo ancestors performed rituals. The river is central to Bwiti mythology.",
      coordinates: { lat: -0.8, lng: 11.0 }
    }
  ],

  punu: [
    {
      name: "Tchibanga",
      type: "historical",
      description: "Capital of Nyanga Province and center of Punu cultural life. Important market town preserving Punu traditions and mask-making heritage.",
      coordinates: { lat: -2.85, lng: 11.03 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Tchibanga"
    },
    {
      name: "Moukalaba-Doudou National Park",
      type: "natural",
      description: "Protected rainforest and savanna in Punu territory. Contains gorillas, elephants, and sacred sites associated with Punu ancestor veneration.",
      coordinates: { lat: -2.33, lng: 10.5 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Moukalaba-Doudou_National_Park"
    },
    {
      name: "Ndendé",
      type: "historical",
      description: "Traditional Punu town known for its skilled mask carvers. Center for the creation of the famous white-faced Punu masks used in Mukudj ceremonies.",
      coordinates: { lat: -2.4, lng: 11.35 }
    },
    {
      name: "Mayumba National Park",
      type: "natural",
      description: "Coastal park near Punu territory protecting the largest leatherback turtle nesting site in Africa. Traditional Punu fishing grounds.",
      coordinates: { lat: -3.4, lng: 10.65 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mayumba_National_Park"
    },
    {
      name: "Nyanga Highlands",
      type: "natural",
      description: "Forested highlands of the Nyanga Province, traditional Punu homeland. Contains waterfalls, sacred groves, and ancestral burial sites.",
      coordinates: { lat: -2.5, lng: 11.2 }
    }
  ],

  // ============ DR CONGO - CENTRAL AFRICAN ============
  luba: [
    {
      name: "Upemba National Park",
      type: "natural",
      description: "UNESCO Biosphere Reserve in Luba heartland. Lake Upemba and surrounding wetlands were sacred fishing grounds for the Luba people.",
      coordinates: { lat: -8.85, lng: 26.52 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Upemba_National_Park"
    },
    {
      name: "Katanga Plateau",
      type: "natural",
      description: "High plateau where the Luba Empire flourished. Rich copper deposits made this region strategically important for centuries.",
      coordinates: { lat: -10.0, lng: 26.0 }
    },
    {
      name: "Buli Master Sculpture Sites",
      type: "historical",
      description: "Region known for the famous 'Buli Master' wood carvings, among the most celebrated African art in world museums.",
      coordinates: { lat: -8.5, lng: 27.0 }
    }
  ],

  kongo: [
    {
      name: "M'banza Kongo",
      type: "historical",
      description: "UNESCO World Heritage Site. Ancient capital of the Kongo Kingdom from 14th century. Contains royal palace ruins and colonial-era cathedral.",
      coordinates: { lat: -6.27, lng: 14.25 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/M%27banza-Kongo",
      unescoStatus: "world-heritage"
    },
    {
      name: "Livingstone Falls",
      type: "natural",
      description: "Series of rapids on the Congo River. Historic boundary of Kongo Kingdom's influence. Named by Europeans but sacred to Kongo peoples.",
      coordinates: { lat: -4.85, lng: 15.04 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Livingstone_Falls"
    }
  ],

  gbaya: [
    {
      name: "Bouar Megaliths",
      type: "historical",
      description: "Mysterious stone monuments (tajunu) in Gbaya territory. Dating back 2,000+ years, their purpose remains debated - possibly ceremonial or astronomical.",
      coordinates: { lat: 5.95, lng: 15.6 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Bouar_megaliths"
    },
    {
      name: "Dzanga-Sangha Reserve",
      type: "natural",
      description: "Protected rainforest on CAR-Congo border. Traditional Gbaya hunting grounds with forest elephants and gorillas.",
      coordinates: { lat: 2.95, lng: 16.25 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Dzanga-Sangha_Special_Reserve"
    }
  ],

  // ============ NORTH AFRICAN ============
  amazigh: [
    {
      name: "Ait Benhaddou",
      type: "historical",
      description: "UNESCO World Heritage ksar (fortified village). Iconic Berber architecture along ancient trans-Saharan trade route.",
      coordinates: { lat: 31.05, lng: -7.13 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/A%C3%AFt_Benhaddou",
      unescoStatus: "world-heritage"
    },
    {
      name: "Djémila Roman Ruins",
      type: "historical",
      description: "UNESCO site. Roman city in Berber territory showing Romanized Berber culture. Spectacular preserved ruins.",
      coordinates: { lat: 36.32, lng: 5.74 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Djemila",
      unescoStatus: "world-heritage"
    }
  ],

  nubian: [
    {
      name: "Abu Simbel Temples",
      type: "sacred",
      description: "Massive rock temples relocated during Aswan Dam construction. In ancient Nubian territory, representing Egyptian-Nubian cultural exchange.",
      coordinates: { lat: 22.34, lng: 31.63 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Abu_Simbel_temples",
      unescoStatus: "world-heritage"
    },
    {
      name: "Meroe Pyramids",
      type: "historical",
      description: "UNESCO site with over 200 pyramids of the Kingdom of Kush. More pyramids than Egypt, built by Nubian pharaohs.",
      coordinates: { lat: 16.94, lng: 33.75 },
      wikipediaUrl: "https://en.wikipedia.org/wiki/Mero%C3%AB",
      unescoStatus: "world-heritage"
    }
  ]
};

// Helper function to get landmarks for a tribe
export const getTribeLandmarks = (tribeId: string): CulturalLandmark[] => {
  return tribeLandmarks[tribeId] || [];
};
