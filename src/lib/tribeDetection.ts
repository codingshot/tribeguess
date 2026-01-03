import tribesData from '@/data/tribes.json';

export interface TribeResult {
  tribe: typeof tribesData.tribes[0];
  confidence: number;
  matchReason: string;
  matchDetails?: string[];
  nameMeaning?: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

export interface DetectionResult {
  predictions: TribeResult[];
  inputName: string;
  timeOfBirth?: string;
}

// Comprehensive name database with verified meanings
const nameDatabase: Record<string, { tribe: string; gender: 'male' | 'female'; meaning: string }> = {
  // ============ RWANDA & BURUNDI (Banyarwanda) ============
  'uwimana': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'God knows - expressing faith' },
  'mukamana': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Wife of Imana (God) - blessed one' },
  'nyiramana': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Mother of God - blessed mother' },
  'ineza': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Goodness, kindness' },
  'divine': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Divine blessing - modern Christian name' },
  'vestine': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Vestine - Christian name, blessed' },
  'odette': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Wealth, fortune - French origin common in Rwanda/Burundi' },
  'claudette': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Little Claude - French Christian name' },
  'amahoro': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Peace - powerful post-genocide name' },
  'mukeshimana': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'God sustains - faith in providence' },
  'ingabire': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Gift - precious one' },
  'nirere': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'I am good/beautiful' },
  'uwera': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Beautiful one' },
  'nyirarukundo': { tribe: 'hutu_tutsi', gender: 'female', meaning: 'Mother of love' },
  'habimana': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'God exists - expression of faith' },
  'ntawukuliryayo': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'No one can eat from it - protected by God' },
  'ndayisaba': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I pray to God' },
  'mugabo': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Man, husband - strength' },
  'hirwa': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Lucky, blessed one' },
  'kalisa': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Guardian, protector' },
  'nshimiyimana': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I thank God' },
  'nkurunziza': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I announce good news - harbinger' },
  'kagame': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'From Ka-gama - little house/enclosure' },
  'rukundo': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Love - beloved one' },
  'bizimana': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'God knows' },
  'hakizimana': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'God saves - salvation' },
  'niyonzima': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I have a good name - well-named' },
  'uwizeye': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Trust, faith' },
  'ndikumana': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I belong to God' },
  'nsengiyumva': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I pray that God hears' },
  'niyomugabo': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I am a man' },
  'uwayezu': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Of Jesus - Christian name' },
  'niyongabo': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'I have value/worth' },
  'manzi': { tribe: 'hutu_tutsi', gender: 'male', meaning: 'Water - life giver' },

  // ============ UGANDA (Baganda) ============
  'nakamya': { tribe: 'baganda', gender: 'female', meaning: 'Born during drought/dry season' },
  'namubiru': { tribe: 'baganda', gender: 'female', meaning: 'Born during darkness/night' },
  'namutebi': { tribe: 'baganda', gender: 'female', meaning: 'From the Ntebi clan' },
  'nakyobe': { tribe: 'baganda', gender: 'female', meaning: 'Born during hard times' },
  'nakato': { tribe: 'baganda', gender: 'female', meaning: 'Second-born of twins (female)' },
  'babirye': { tribe: 'baganda', gender: 'female', meaning: 'First-born of twins (female)' },
  'nassali': { tribe: 'baganda', gender: 'female', meaning: 'Born on the road/during journey' },
  'nabukenya': { tribe: 'baganda', gender: 'female', meaning: 'Born during famine' },
  'nanteza': { tribe: 'baganda', gender: 'female', meaning: 'One who brings blessings' },
  'nalwanga': { tribe: 'baganda', gender: 'female', meaning: 'Warrior woman' },
  'ssempijja': { tribe: 'baganda', gender: 'male', meaning: 'Born during rainy season' },
  'kato': { tribe: 'baganda', gender: 'male', meaning: 'Second-born of twins (male)' },
  // Note: 'waswa' is shared between Baganda and Luhya - keeping in Luhya section
  'ssekabira': { tribe: 'baganda', gender: 'male', meaning: 'Father of twins' },
  'mukasa': { tribe: 'baganda', gender: 'male', meaning: 'God of Lake Victoria - prosperity' },
  'sserugo': { tribe: 'baganda', gender: 'male', meaning: 'One who brings peace' },
  'lwanga': { tribe: 'baganda', gender: 'male', meaning: 'Of the Ngabi (bushbuck) clan' },
  'musisi': { tribe: 'baganda', gender: 'male', meaning: 'Earthquake - born during tremor' },
  'ssemakula': { tribe: 'baganda', gender: 'male', meaning: 'Born during difficult times' },
  'ssekandi': { tribe: 'baganda', gender: 'male', meaning: 'Father\'s favorite' },
  'kyagulanyi': { tribe: 'baganda', gender: 'male', meaning: 'Of the Kyagwe region' },
  'museveni': { tribe: 'baganda', gender: 'male', meaning: 'Of the seventh (Bairu/Banyankole origin)' },

  // Kikuyu names
  'wanjiku': { tribe: 'kikuyu', gender: 'female', meaning: 'One of the nine daughters of Gikuyu and Mumbi, the Kikuyu ancestors' },
  'wangari': { tribe: 'kikuyu', gender: 'female', meaning: 'Leopard - symbolizing strength and grace' },
  'njeri': { tribe: 'kikuyu', gender: 'female', meaning: 'One of the nine Kikuyu daughters, meaning "traveling one"' },
  'wambui': { tribe: 'kikuyu', gender: 'female', meaning: 'Singer of songs, one of Mumbi\'s daughters' },
  'muthoni': { tribe: 'kikuyu', gender: 'female', meaning: 'In-law or the hidden one' },
  'nyambura': { tribe: 'kikuyu', gender: 'female', meaning: 'Born during the rainy season' },
  'wairimu': { tribe: 'kikuyu', gender: 'female', meaning: 'One of Gikuyu\'s daughters, the ogress in folklore' },
  'wanjiru': { tribe: 'kikuyu', gender: 'female', meaning: 'Born at night' },
  'njoki': { tribe: 'kikuyu', gender: 'female', meaning: 'One who returns, a resurrected one' },
  'mumbi': { tribe: 'kikuyu', gender: 'female', meaning: 'Creator/molder - the mother of Kikuyu nation' },
  'wangui': { tribe: 'kikuyu', gender: 'female', meaning: 'One of the nine Kikuyu daughters' },
  'nyokabi': { tribe: 'kikuyu', gender: 'female', meaning: 'Of the Athi people' },
  'wacera': { tribe: 'kikuyu', gender: 'female', meaning: 'One of Mumbi\'s daughters' },
  'wanja': { tribe: 'kikuyu', gender: 'female', meaning: 'Born during travel/journey' },
  'njoroge': { tribe: 'kikuyu', gender: 'male', meaning: 'One who herds livestock' },
  'ngugi': { tribe: 'kikuyu', gender: 'male', meaning: 'Work/effort - a diligent person' },
  'kamau': { tribe: 'kikuyu', gender: 'male', meaning: 'Quiet warrior' },
  'mwangi': { tribe: 'kikuyu', gender: 'male', meaning: 'Rapid increase/multiplication' },
  'kariuki': { tribe: 'kikuyu', gender: 'male', meaning: 'Reincarnated one - born after death of another' },
  'githinji': { tribe: 'kikuyu', gender: 'male', meaning: 'Slaughterer' },
  'waweru': { tribe: 'kikuyu', gender: 'male', meaning: 'Born of the plains' },
  'kimani': { tribe: 'kikuyu', gender: 'male', meaning: 'From the Mani clan' },
  'kinyanjui': { tribe: 'kikuyu', gender: 'male', meaning: 'Of the Anjiru clan' },
  'mburu': { tribe: 'kikuyu', gender: 'male', meaning: 'Dust/one born during dry season' },
  'muriuki': { tribe: 'kikuyu', gender: 'male', meaning: 'One who resurrects' },
  'njenga': { tribe: 'kikuyu', gender: 'male', meaning: 'Craftsman/builder' },
  'karanja': { tribe: 'kikuyu', gender: 'male', meaning: 'One who guides' },
  'macharia': { tribe: 'kikuyu', gender: 'male', meaning: 'Born during circumcision season' },
  
  // Luo names
  'achieng': { tribe: 'luo', gender: 'female', meaning: 'Born when the sun is shining brightly' },
  'adhiambo': { tribe: 'luo', gender: 'female', meaning: 'Born in the evening' },
  'awino': { tribe: 'luo', gender: 'female', meaning: 'Born during weeding season' },
  'auma': { tribe: 'luo', gender: 'female', meaning: 'Born face down' },
  'apiyo': { tribe: 'luo', gender: 'female', meaning: 'First-born of twins' },
  'atieno': { tribe: 'luo', gender: 'female', meaning: 'Born at night' },
  'anyango': { tribe: 'luo', gender: 'female', meaning: 'Born at mid-morning (around 10am)' },
  'akoth': { tribe: 'luo', gender: 'female', meaning: 'Born during the rainy season' },
  'aoko': { tribe: 'luo', gender: 'female', meaning: 'Born outside/outdoors' },
  'aluoch': { tribe: 'luo', gender: 'female', meaning: 'Born during locust invasion' },
  'akinyi': { tribe: 'luo', gender: 'female', meaning: 'Born during mid-morning' },
  'awuor': { tribe: 'luo', gender: 'female', meaning: 'Born during dry/sunny season' },
  'apondi': { tribe: 'luo', gender: 'female', meaning: 'Second-born of twins' },
  'odhiambo': { tribe: 'luo', gender: 'male', meaning: 'Born in the evening (5-7pm)' },
  'otieno': { tribe: 'luo', gender: 'male', meaning: 'Born at night' },
  'ouma': { tribe: 'luo', gender: 'male', meaning: 'Born face down' },
  'onyango': { tribe: 'luo', gender: 'male', meaning: 'Born around midday/noon' },
  'omondi': { tribe: 'luo', gender: 'male', meaning: 'Born early morning (at dawn)' },
  'okoth': { tribe: 'luo', gender: 'male', meaning: 'Born during the rainy season' },
  'ogola': { tribe: 'luo', gender: 'male', meaning: 'Born during harvest' },
  'odongo': { tribe: 'luo', gender: 'male', meaning: 'Second-born of twins (younger twin)' },
  'ochieng': { tribe: 'luo', gender: 'male', meaning: 'Born when the sun is shining' },
  'owino': { tribe: 'luo', gender: 'male', meaning: 'Born during weeding season' },
  'oluoch': { tribe: 'luo', gender: 'male', meaning: 'Born during locust invasion' },
  'owuor': { tribe: 'luo', gender: 'male', meaning: 'Born during dry/sunny season' },
  'ojwang': { tribe: 'luo', gender: 'male', meaning: 'Born during hunger/famine' },
  'opondo': { tribe: 'luo', gender: 'male', meaning: 'Second-born of twins' },
  
  // Luhya names
  'nafula': { tribe: 'luhya', gender: 'female', meaning: 'Born during the rainy season' },
  'nekesa': { tribe: 'luhya', gender: 'female', meaning: 'Born during harvest season' },
  'naliaka': { tribe: 'luhya', gender: 'female', meaning: 'Born during weeding time' },
  'nasimiyu': { tribe: 'luhya', gender: 'female', meaning: 'Born during famine/hunger period' },
  'nabwire': { tribe: 'luhya', gender: 'female', meaning: 'Born at night' },
  'nanjala': { tribe: 'luhya', gender: 'female', meaning: 'Born during hunger/famine' },
  'nangila': { tribe: 'luhya', gender: 'female', meaning: 'Born during the journey' },
  'namalwa': { tribe: 'luhya', gender: 'female', meaning: 'Born during brewing season' },
  'nelima': { tribe: 'luhya', gender: 'female', meaning: 'Born during cultivation' },
  'nasambu': { tribe: 'luhya', gender: 'female', meaning: 'Born during Isukha ceremonies' },
  'wafula': { tribe: 'luhya', gender: 'male', meaning: 'Born during the rainy season' },
  'wekesa': { tribe: 'luhya', gender: 'male', meaning: 'Born during harvest season' },
  'barasa': { tribe: 'luhya', gender: 'male', meaning: 'Meeting place/gathering' },
  'simiyu': { tribe: 'luhya', gender: 'male', meaning: 'Born during dry/famine season' },
  'shikuku': { tribe: 'luhya', gender: 'male', meaning: 'Born during hunger' },
  'mukhwana': { tribe: 'luhya', gender: 'male', meaning: 'One who crosses/travels' },
  'waswa': { tribe: 'luhya', gender: 'male', meaning: 'First-born of twins (elder twin)' },
  'wanyonyi': { tribe: 'luhya', gender: 'male', meaning: 'Born with umbilical cord around neck' },
  'wanjala': { tribe: 'luhya', gender: 'male', meaning: 'Born during famine/hunger' },
  'wamalwa': { tribe: 'luhya', gender: 'male', meaning: 'Born during brewing season' },
  'wanyama': { tribe: 'luhya', gender: 'male', meaning: 'Of the animals (clan name)' },
  'masinde': { tribe: 'luhya', gender: 'male', meaning: 'One who stands firm' },
  
  // Kamba names
  'mwikali': { tribe: 'kamba', gender: 'female', meaning: 'One who stays/remains' },
  'nduku': { tribe: 'kamba', gender: 'female', meaning: 'Born at night' },
  'mueni': { tribe: 'kamba', gender: 'female', meaning: 'Visitor/guest' },
  'mumbua': { tribe: 'kamba', gender: 'female', meaning: 'Born during the rainy season' },
  'syokau': { tribe: 'kamba', gender: 'female', meaning: 'Born during market day' },
  'kavata': { tribe: 'kamba', gender: 'female', meaning: 'Small one/petite' },
  'mwende': { tribe: 'kamba', gender: 'female', meaning: 'Beloved one' },
  'kaluki': { tribe: 'kamba', gender: 'female', meaning: 'One who is from far' },
  'nthenya': { tribe: 'kamba', gender: 'female', meaning: 'Born during daytime' },
  'wayua': { tribe: 'kamba', gender: 'female', meaning: 'Born during dry season' },
  'mbithe': { tribe: 'kamba', gender: 'female', meaning: 'Beautiful one' },
  'mutua': { tribe: 'kamba', gender: 'male', meaning: 'One who helps others' },
  'musyoka': { tribe: 'kamba', gender: 'male', meaning: 'Born during market day' },
  'kioko': { tribe: 'kamba', gender: 'male', meaning: 'Born in the morning' },
  'nzomo': { tribe: 'kamba', gender: 'male', meaning: 'Elephant - symbol of strength' },
  'mutinda': { tribe: 'kamba', gender: 'male', meaning: 'Guardian/protector' },
  'kyalo': { tribe: 'kamba', gender: 'male', meaning: 'From the village' },
  'maingi': { tribe: 'kamba', gender: 'male', meaning: 'One who works hard' },
  'mulwa': { tribe: 'kamba', gender: 'male', meaning: 'Born during dry season' },
  'wambua': { tribe: 'kamba', gender: 'male', meaning: 'Born during the rainy season' },
  'mutunga': { tribe: 'kamba', gender: 'male', meaning: 'One who builds/constructs' },
  'kilonzo': { tribe: 'kamba', gender: 'male', meaning: 'Big/large one' },
  
  // Kalenjin names
  'chemutai': { tribe: 'kalenjin', gender: 'female', meaning: 'Born during honey harvesting season' },
  'chepkoech': { tribe: 'kalenjin', gender: 'female', meaning: 'Born in the morning' },
  'chepkorir': { tribe: 'kalenjin', gender: 'female', meaning: 'Born near the river' },
  'jepkosgei': { tribe: 'kalenjin', gender: 'female', meaning: 'Born near the granary' },
  'jepchirchir': { tribe: 'kalenjin', gender: 'female', meaning: 'Born during a good/prosperous season' },
  'chebet': { tribe: 'kalenjin', gender: 'female', meaning: 'Born in the afternoon' },
  'chepngetich': { tribe: 'kalenjin', gender: 'female', meaning: 'Born near the cattle' },
  'jebet': { tribe: 'kalenjin', gender: 'female', meaning: 'Born in the afternoon' },
  'jeruto': { tribe: 'kalenjin', gender: 'female', meaning: 'One who comes slowly/gently' },
  'cheptoo': { tribe: 'kalenjin', gender: 'female', meaning: 'Born at night' },
  'jelagat': { tribe: 'kalenjin', gender: 'female', meaning: 'Born at lunch time' },
  'kipchoge': { tribe: 'kalenjin', gender: 'male', meaning: 'Born near the granary' },
  'kibet': { tribe: 'kalenjin', gender: 'male', meaning: 'Born in the afternoon' },
  'cheruiyot': { tribe: 'kalenjin', gender: 'male', meaning: 'One who clears the path/pioneer' },
  'rotich': { tribe: 'kalenjin', gender: 'male', meaning: 'Born during planting season' },
  'kiptoo': { tribe: 'kalenjin', gender: 'male', meaning: 'Born at night' },
  'kiplagat': { tribe: 'kalenjin', gender: 'male', meaning: 'Born at lunch time' },
  'kosgei': { tribe: 'kalenjin', gender: 'male', meaning: 'Near the granary' },
  'sang': { tribe: 'kalenjin', gender: 'male', meaning: 'From the bush/forest' },
  'biwott': { tribe: 'kalenjin', gender: 'male', meaning: 'Born during honey harvesting' },
  'lagat': { tribe: 'kalenjin', gender: 'male', meaning: 'Born at lunch time' },
  'kiprono': { tribe: 'kalenjin', gender: 'male', meaning: 'Born when cattle are out' },
  'kiprop': { tribe: 'kalenjin', gender: 'male', meaning: 'Born during harvest' },
  'kipsang': { tribe: 'kalenjin', gender: 'male', meaning: 'Born in the bush/forest' },
  
  // Kisii names
  'nyaboke': { tribe: 'kisii', gender: 'female', meaning: 'Born during harvest season' },
  'kemunto': { tribe: 'kisii', gender: 'female', meaning: 'Born during cultivation/planting' },
  'kerubo': { tribe: 'kisii', gender: 'female', meaning: 'Born during planting season' },
  'moraa': { tribe: 'kisii', gender: 'female', meaning: 'Born during the rainy season' },
  'nyanchama': { tribe: 'kisii', gender: 'female', meaning: 'Born during grazing time' },
  'kwamboka': { tribe: 'kisii', gender: 'female', meaning: 'Born during cattle movement/migration' },
  'gesare': { tribe: 'kisii', gender: 'female', meaning: 'From Gesare area' },
  'bochaberi': { tribe: 'kisii', gender: 'female', meaning: 'Of the Chaberi clan' },
  'bosibori': { tribe: 'kisii', gender: 'female', meaning: 'Born during millet harvesting' },
  'kemuma': { tribe: 'kisii', gender: 'female', meaning: 'Born during cultivation' },
  'mongina': { tribe: 'kisii', gender: 'female', meaning: 'Born during evening' },
  'ongeri': { tribe: 'kisii', gender: 'male', meaning: 'Warrior/brave one' },
  'momanyi': { tribe: 'kisii', gender: 'male', meaning: 'One who stays/remains' },
  'bosire': { tribe: 'kisii', gender: 'male', meaning: 'Of the Bosire/millet clan' },
  'nyachae': { tribe: 'kisii', gender: 'male', meaning: 'Born during dry season' },
  'makori': { tribe: 'kisii', gender: 'male', meaning: 'One who was awaited/expected' },
  'okioma': { tribe: 'kisii', gender: 'male', meaning: 'Good one' },
  'mogaka': { tribe: 'kisii', gender: 'male', meaning: 'Elder/respected one' },
  'nyakundi': { tribe: 'kisii', gender: 'male', meaning: 'Born during weeding' },
  'ombati': { tribe: 'kisii', gender: 'male', meaning: 'Born during hard times' },
  
  // Meru names
  'kagwiria': { tribe: 'meru', gender: 'female', meaning: 'Born in the afternoon' },
  'kawira': { tribe: 'meru', gender: 'female', meaning: 'Born at dawn/early morning' },
  'gacheri': { tribe: 'meru', gender: 'female', meaning: 'One who laughs/joyful one' },
  'kanini': { tribe: 'meru', gender: 'female', meaning: 'Small one/petite' },
  'gatwiri': { tribe: 'meru', gender: 'female', meaning: 'Born during dry season' },
  'makena': { tribe: 'meru', gender: 'female', meaning: 'Happy one/one who brings joy' },
  'kendi': { tribe: 'meru', gender: 'female', meaning: 'Loved one' },
  'nkatha': { tribe: 'meru', gender: 'female', meaning: 'Healer/medicine person' },
  'kaari': { tribe: 'meru', gender: 'female', meaning: 'One born during work' },
  'nkirote': { tribe: 'meru', gender: 'female', meaning: 'Born during ceremonies' },
  'kirimi': { tribe: 'meru', gender: 'male', meaning: 'Farmer/cultivator' },
  'mukiri': { tribe: 'meru', gender: 'male', meaning: 'The listener/obedient one' },
  'muthomi': { tribe: 'meru', gender: 'male', meaning: 'Reader/educated one' },
  'njeru': { tribe: 'meru', gender: 'male', meaning: 'Born at night (similar to Njiru)' },
  'mugambi': { tribe: 'meru', gender: 'male', meaning: 'Brave one/warrior' },
  'murungi': { tribe: 'meru', gender: 'male', meaning: 'Good one/righteous' },
  'kobia': { tribe: 'meru', gender: 'male', meaning: 'One who advises' },
  'mwiti': { tribe: 'meru', gender: 'male', meaning: 'Of the forest' },
  'muthuri': { tribe: 'meru', gender: 'male', meaning: 'Elder/respected man' },
  'mwenda': { tribe: 'meru', gender: 'male', meaning: 'Traveler/one who goes' },
  
  // Coastal names
  'mwanaisha': { tribe: 'coastal', gender: 'female', meaning: 'Child of life/living child' },
  'fatuma': { tribe: 'coastal', gender: 'female', meaning: 'Weaned child (Arabic origin, after Prophet\'s daughter)' },
  'zainab': { tribe: 'coastal', gender: 'female', meaning: 'Fragrant flower (Arabic origin)' },
  'mwanajuma': { tribe: 'coastal', gender: 'female', meaning: 'Child born on Friday' },
  'khadija': { tribe: 'coastal', gender: 'female', meaning: 'Early baby/premature (Prophet\'s first wife)' },
  'amina': { tribe: 'coastal', gender: 'female', meaning: 'Trustworthy/faithful (Prophet\'s mother)' },
  'halima': { tribe: 'coastal', gender: 'female', meaning: 'Patient/gentle one' },
  'rehema': { tribe: 'coastal', gender: 'female', meaning: 'Mercy/compassion' },
  'salma': { tribe: 'coastal', gender: 'female', meaning: 'Safe/peaceful one' },
  'bahati': { tribe: 'coastal', gender: 'female', meaning: 'Lucky/fortunate one' },
  'riziki': { tribe: 'coastal', gender: 'female', meaning: 'Providence/sustenance' },
  'zawadi': { tribe: 'coastal', gender: 'female', meaning: 'Gift/present' },
  'hamisi': { tribe: 'coastal', gender: 'male', meaning: 'Born on Thursday' },
  'jumaa': { tribe: 'coastal', gender: 'male', meaning: 'Born on Friday' },
  'salim': { tribe: 'coastal', gender: 'male', meaning: 'Safe/peaceful (Arabic origin)' },
  'rashid': { tribe: 'coastal', gender: 'male', meaning: 'Rightly guided (Arabic origin)' },
  'kazungu': { tribe: 'coastal', gender: 'male', meaning: 'Born during European/colonial times (Mijikenda)' },
  'karisa': { tribe: 'coastal', gender: 'male', meaning: 'Born during famine (Mijikenda)' },
  'omar': { tribe: 'coastal', gender: 'male', meaning: 'Long-lived/flourishing (Arabic origin)' },
  'hassan': { tribe: 'coastal', gender: 'male', meaning: 'Handsome/good (Arabic origin)' },
  'bakari': { tribe: 'coastal', gender: 'male', meaning: 'One who will succeed/promising' },
  'tsuma': { tribe: 'coastal', gender: 'male', meaning: 'Born during hard times (Mijikenda)' },

  // ============ TANZANIA (Sukuma, Chagga, Haya) ============
  // Sukuma names
  'masanja': { tribe: 'sukuma', gender: 'male', meaning: 'Born during farming season' },
  'shija': { tribe: 'sukuma', gender: 'male', meaning: 'One who is coming' },
  'bugalama': { tribe: 'sukuma', gender: 'male', meaning: 'From Bugalama area' },
  'nkuba': { tribe: 'sukuma', gender: 'male', meaning: 'Rain - life giver' },
  'mayala': { tribe: 'sukuma', gender: 'male', meaning: 'Born during drought' },
  'lyimo': { tribe: 'sukuma', gender: 'male', meaning: 'Family/clan name' },
  'maganga': { tribe: 'sukuma', gender: 'male', meaning: 'Born during troubles' },
  'malisa': { tribe: 'sukuma', gender: 'female', meaning: 'Sweet one' },
  'nyangi': { tribe: 'sukuma', gender: 'female', meaning: 'Beautiful' },
  'ndaki': { tribe: 'sukuma', gender: 'female', meaning: 'Born during hardship' },
  
  // Chagga names (Mt. Kilimanjaro)
  'moshi': { tribe: 'chagga', gender: 'male', meaning: 'Smoke - from volcanic area' },
  'lyatuu': { tribe: 'chagga', gender: 'male', meaning: 'Of the Lyatuu clan' },
  'msando': { tribe: 'chagga', gender: 'male', meaning: 'Strong one' },
  'ndesanjo': { tribe: 'chagga', gender: 'male', meaning: 'Victorious one' },
  'minja': { tribe: 'chagga', gender: 'male', meaning: 'Born during brewing' },
  'mringi': { tribe: 'chagga', gender: 'female', meaning: 'Beautiful woman' },
  'nasari': { tribe: 'chagga', gender: 'female', meaning: 'Born during victory' },
  'njau': { tribe: 'chagga', gender: 'male', meaning: 'Young bull - strength' },

  // ============ SOMALIA (Somali) ============
  'abdirahman': { tribe: 'somali', gender: 'male', meaning: 'Servant of the Merciful (Allah)' },
  'abdullahi': { tribe: 'somali', gender: 'male', meaning: 'Servant of Allah' },
  'abdinasir': { tribe: 'somali', gender: 'male', meaning: 'Servant of the Helper' },
  'abdikadir': { tribe: 'somali', gender: 'male', meaning: 'Servant of the Capable' },
  'cabdi': { tribe: 'somali', gender: 'male', meaning: 'Servant (Somali spelling of Abdi)' },
  'maxamed': { tribe: 'somali', gender: 'male', meaning: 'Praised one (Somali spelling of Mohamed)' },
  'cali': { tribe: 'somali', gender: 'male', meaning: 'High/Noble (Somali spelling of Ali)' },
  'faarax': { tribe: 'somali', gender: 'male', meaning: 'Happiness (Somali spelling of Farah)' },
  'guled': { tribe: 'somali', gender: 'male', meaning: 'Winner/Victor' },
  'jaamac': { tribe: 'somali', gender: 'male', meaning: 'Gathering (Somali spelling of Jama)' },
  'hodan': { tribe: 'somali', gender: 'female', meaning: 'Wealth/Abundance' },
  'hamdi': { tribe: 'somali', gender: 'female', meaning: 'Praise' },
  'hibo': { tribe: 'somali', gender: 'female', meaning: 'Gift' },
  'sahra': { tribe: 'somali', gender: 'female', meaning: 'Desert flower' },
  'hawo': { tribe: 'somali', gender: 'female', meaning: 'Eve (Somali form)' },
  'nimco': { tribe: 'somali', gender: 'female', meaning: 'Blessing/Grace' },
  'fardowsa': { tribe: 'somali', gender: 'female', meaning: 'Paradise' },
  'ubah': { tribe: 'somali', gender: 'female', meaning: 'Flower' },

  // ============ ETHIOPIA (Oromo, Amhara, Tigray) ============
  // Amhara names
  'abebe': { tribe: 'amhara', gender: 'male', meaning: 'He has flourished/grown' },
  'kebede': { tribe: 'amhara', gender: 'male', meaning: 'Heavy/Important one' },
  'tesfaye': { tribe: 'amhara', gender: 'male', meaning: 'My hope' },
  'getachew': { tribe: 'amhara', gender: 'male', meaning: 'Their master' },
  'tadesse': { tribe: 'amhara', gender: 'male', meaning: 'Renewal/Refreshment' },
  'haile': { tribe: 'amhara', gender: 'male', meaning: 'Power/Force' },
  'selassie': { tribe: 'amhara', gender: 'male', meaning: 'Trinity' },
  'almaz': { tribe: 'amhara', gender: 'female', meaning: 'Diamond' },
  'tigist': { tribe: 'amhara', gender: 'female', meaning: 'Patience' },
  'mahlet': { tribe: 'amhara', gender: 'female', meaning: 'Song/Hymn' },
  'meseret': { tribe: 'amhara', gender: 'female', meaning: 'Foundation' },
  'yekatit': { tribe: 'amhara', gender: 'female', meaning: 'Born in February' },
  
  // Oromo names
  'gammachuu': { tribe: 'oromo', gender: 'male', meaning: 'Happiness/Joy' },
  'tolossa': { tribe: 'oromo', gender: 'male', meaning: 'First born/Pioneer' },
  'leencoo': { tribe: 'oromo', gender: 'male', meaning: 'Lion' },
  'caalaa': { tribe: 'oromo', gender: 'male', meaning: 'Great one' },
  'hundee': { tribe: 'oromo', gender: 'male', meaning: 'Root/Origin' },
  'bontu': { tribe: 'oromo', gender: 'female', meaning: 'Beautiful/Pride' },
  'lalisaa': { tribe: 'oromo', gender: 'male', meaning: 'Winner' },
  'obsi': { tribe: 'oromo', gender: 'male', meaning: 'Sunrise/Dawn' },
  'caaltuu': { tribe: 'oromo', gender: 'female', meaning: 'Great woman' },
  'halkano': { tribe: 'oromo', gender: 'female', meaning: 'Path/Direction' },

  // ============ NIGERIA - YORUBA ============
  'adeola': { tribe: 'yoruba', gender: 'female', meaning: 'Crown of honor' },
  'adenike': { tribe: 'yoruba', gender: 'female', meaning: 'The crown is cherished' },
  'adesewa': { tribe: 'yoruba', gender: 'female', meaning: 'Crown has done beauty' },
  'adunni': { tribe: 'yoruba', gender: 'female', meaning: 'Sweet to have' },
  'afolake': { tribe: 'yoruba', gender: 'female', meaning: 'One who uses wealth for honor' },
  'ayomide': { tribe: 'yoruba', gender: 'female', meaning: 'My joy has arrived' },
  'folashade': { tribe: 'yoruba', gender: 'female', meaning: 'Honor has made a crown' },
  'foluke': { tribe: 'yoruba', gender: 'female', meaning: 'Placed in God\'s care' },
  'funke': { tribe: 'yoruba', gender: 'female', meaning: 'Give me to care for' },
  'oluwaseun': { tribe: 'yoruba', gender: 'female', meaning: 'Thanks be to God' },
  'omolara': { tribe: 'yoruba', gender: 'female', meaning: 'Child is my companion' },
  'temilolu': { tribe: 'yoruba', gender: 'female', meaning: 'Belong to God' },
  'titilayo': { tribe: 'yoruba', gender: 'female', meaning: 'Happiness is eternal' },
  'yetunde': { tribe: 'yoruba', gender: 'female', meaning: 'Mother has come back (reincarnation)' },
  'adebayo': { tribe: 'yoruba', gender: 'male', meaning: 'He came in a joyful time (crown meets joy)' },
  'adeyemi': { tribe: 'yoruba', gender: 'male', meaning: 'The crown suits me' },
  'ayodeji': { tribe: 'yoruba', gender: 'male', meaning: 'My joy has doubled' },
  'babatunde': { tribe: 'yoruba', gender: 'male', meaning: 'Father has returned (reincarnation)' },
  'damilola': { tribe: 'yoruba', gender: 'male', meaning: 'Bless me with wealth' },
  'femi': { tribe: 'yoruba', gender: 'male', meaning: 'Love me (short for Olufemi)' },
  'kayode': { tribe: 'yoruba', gender: 'male', meaning: 'He brought joy' },
  'kunle': { tribe: 'yoruba', gender: 'male', meaning: 'Fill the house (short for Adekunle)' },
  'olusegun': { tribe: 'yoruba', gender: 'male', meaning: 'God has conquered' },
  'oluwole': { tribe: 'yoruba', gender: 'male', meaning: 'God has entered' },
  'segun': { tribe: 'yoruba', gender: 'male', meaning: 'Conqueror' },
  'tunde': { tribe: 'yoruba', gender: 'male', meaning: 'Returns again (reincarnation)' },
  'wale': { tribe: 'yoruba', gender: 'male', meaning: 'Come home (short for Adewale)' },
  'yinka': { tribe: 'yoruba', gender: 'male', meaning: 'Surrounded by wealth' },

  // ============ NIGERIA - IGBO ============
  'adaeze': { tribe: 'igbo', gender: 'female', meaning: 'King\'s daughter / Princess' },
  'adanna': { tribe: 'igbo', gender: 'female', meaning: 'Father\'s daughter' },
  'amaka': { tribe: 'igbo', gender: 'female', meaning: 'Beautiful (short for Chiamaka)' },
  'chiamaka': { tribe: 'igbo', gender: 'female', meaning: 'God is beautiful' },
  'chidinma': { tribe: 'igbo', gender: 'female', meaning: 'God is good' },
  'chioma': { tribe: 'igbo', gender: 'female', meaning: 'Good God / Good luck' },
  'chinyere': { tribe: 'igbo', gender: 'female', meaning: 'God gave' },
  'ebere': { tribe: 'igbo', gender: 'female', meaning: 'Mercy' },
  'ifeoma': { tribe: 'igbo', gender: 'female', meaning: 'Good thing / Beautiful' },
  'nneka': { tribe: 'igbo', gender: 'female', meaning: 'Mother is supreme' },
  'ngozi': { tribe: 'igbo', gender: 'female', meaning: 'Blessing' },
  'obiageli': { tribe: 'igbo', gender: 'female', meaning: 'One who has come to enjoy' },
  'ugochi': { tribe: 'igbo', gender: 'female', meaning: 'Eagle of God' },
  'uchenna': { tribe: 'igbo', gender: 'female', meaning: 'God\'s will' },
  'azuka': { tribe: 'igbo', gender: 'male', meaning: 'The past is your support' },
  'chidi': { tribe: 'igbo', gender: 'male', meaning: 'God exists' },
  'chike': { tribe: 'igbo', gender: 'male', meaning: 'God\'s power' },
  'chukwuemeka': { tribe: 'igbo', gender: 'male', meaning: 'God has done great things' },
  'emeka': { tribe: 'igbo', gender: 'male', meaning: 'Great deed (short for Chukwuemeka)' },
  'ikenna': { tribe: 'igbo', gender: 'male', meaning: 'Father\'s power' },
  'kelechi': { tribe: 'igbo', gender: 'male', meaning: 'Praise God' },
  'nnamdi': { tribe: 'igbo', gender: 'male', meaning: 'My father is alive' },
  'obinna': { tribe: 'igbo', gender: 'male', meaning: 'Father\'s heart' },
  'obi': { tribe: 'igbo', gender: 'male', meaning: 'Heart' },
  'okechukwu': { tribe: 'igbo', gender: 'male', meaning: 'God\'s portion' },
  'onyeka': { tribe: 'igbo', gender: 'male', meaning: 'Who is greater?' },
  'uche': { tribe: 'igbo', gender: 'male', meaning: 'Thought / Wisdom' },

  // ============ NIGERIA - HAUSA ============
  // Note: aisha, amina, fatima, halima, zainab, abdullahi already exist for coastal - these are pan-Islamic names
  'hadiza': { tribe: 'hausa', gender: 'female', meaning: 'First wife of the Prophet (Khadija)' },
  'hauwa': { tribe: 'hausa', gender: 'female', meaning: 'Eve (Arabic Hawwa)' },
  'maryam': { tribe: 'hausa', gender: 'female', meaning: 'Mary (mother of Jesus)' },
  'sadiya': { tribe: 'hausa', gender: 'female', meaning: 'Fortunate / Lucky' },
  'zainab_ng': { tribe: 'hausa', gender: 'female', meaning: 'Fragrant flower (Nigerian variant)' },
  'abubakar': { tribe: 'hausa', gender: 'male', meaning: 'Father of the camel (First Caliph)' },
  'aliyu': { tribe: 'hausa', gender: 'male', meaning: 'High / Noble (Hausa form of Ali)' },
  'bello': { tribe: 'hausa', gender: 'male', meaning: 'Helper' },
  'danjuma': { tribe: 'hausa', gender: 'male', meaning: 'Born on Friday' },
  'garba': { tribe: 'hausa', gender: 'male', meaning: 'Protection / Shield' },
  'ibrahim': { tribe: 'hausa', gender: 'male', meaning: 'Abraham (Prophet)' },
  'musa': { tribe: 'hausa', gender: 'male', meaning: 'Moses (Prophet)' },
  'nasiru': { tribe: 'hausa', gender: 'male', meaning: 'Helper / Supporter' },
  'sani': { tribe: 'hausa', gender: 'male', meaning: 'Second (born)' },
  'sanusi': { tribe: 'hausa', gender: 'male', meaning: 'Radiant / Bright' },
  'usman': { tribe: 'hausa', gender: 'male', meaning: 'Third Caliph (Uthman)' },
  'yakubu': { tribe: 'hausa', gender: 'male', meaning: 'Jacob (Prophet)' },
  'yusuf': { tribe: 'hausa', gender: 'male', meaning: 'Joseph (Prophet)' },

  // ============ GHANA - AKAN/ASHANTI ============
  'akosua': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Sunday' },
  'adwoa': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Monday' },
  'abenaa': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Tuesday' },
  'akua': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Wednesday' },
  'yaa': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Thursday' },
  'afua': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Friday' },
  'ama': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Saturday' },
  'abena': { tribe: 'ashanti', gender: 'female', meaning: 'Born on Tuesday (alternate)' },
  'kwasi': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Sunday' },
  'kwadwo': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Monday' },
  'kwabena': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Tuesday' },
  'kwaku': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Wednesday' },
  'yaw': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Thursday' },
  'kofi': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Friday' },
  'kwame': { tribe: 'ashanti', gender: 'male', meaning: 'Born on Saturday' },
  'osei': { tribe: 'ashanti', gender: 'male', meaning: 'Noble one' },
  'nana': { tribe: 'ashanti', gender: 'male', meaning: 'King / Grandfather' },

  // ============ SOUTH AFRICA - ZULU ============
  'nomzamo': { tribe: 'zulu', gender: 'female', meaning: 'She who strives / tries' },
  'nokwanda': { tribe: 'zulu', gender: 'female', meaning: 'She who multiplies' },
  'thandi': { tribe: 'zulu', gender: 'female', meaning: 'Beloved / Love (short for Thandiwe)' },
  'thandiwe': { tribe: 'zulu', gender: 'female', meaning: 'Beloved one' },
  'nozipho': { tribe: 'zulu', gender: 'female', meaning: 'She who brings gifts' },
  'nonhle': { tribe: 'zulu', gender: 'female', meaning: 'She who is beautiful' },
  'busisiwe': { tribe: 'zulu', gender: 'female', meaning: 'Blessed one' },
  'sibusiso': { tribe: 'zulu', gender: 'male', meaning: 'Blessing' },
  'sipho': { tribe: 'zulu', gender: 'male', meaning: 'Gift' },
  'thabo': { tribe: 'zulu', gender: 'male', meaning: 'Happiness / Joy' },
  'bongani': { tribe: 'zulu', gender: 'male', meaning: 'Be thankful' },
  'nkosana': { tribe: 'zulu', gender: 'male', meaning: 'Prince' },
  'simphiwe': { tribe: 'zulu', gender: 'male', meaning: 'We have been given' },
  'siyabonga': { tribe: 'zulu', gender: 'male', meaning: 'We are thankful' },
  'themba': { tribe: 'zulu', gender: 'male', meaning: 'Trust / Hope' },

  // ============ ZIMBABWE - SHONA ============
  'rutendo': { tribe: 'shona', gender: 'female', meaning: 'Faith' },
  'rudo': { tribe: 'shona', gender: 'female', meaning: 'Love' },
  'tendai': { tribe: 'shona', gender: 'female', meaning: 'Be thankful' },
  'tsitsi': { tribe: 'shona', gender: 'female', meaning: 'Mercy' },
  'nyasha': { tribe: 'shona', gender: 'female', meaning: 'Grace' },
  'chiedza': { tribe: 'shona', gender: 'female', meaning: 'Light' },
  'fadzai': { tribe: 'shona', gender: 'female', meaning: 'Make it happen' },
  'tapiwa': { tribe: 'shona', gender: 'male', meaning: 'We have been given' },
  'tatenda': { tribe: 'shona', gender: 'male', meaning: 'We are grateful' },
  'tinashe': { tribe: 'shona', gender: 'male', meaning: 'God is with us' },
  'tafadzwa': { tribe: 'shona', gender: 'male', meaning: 'We are pleased' },
  'kudakwashe': { tribe: 'shona', gender: 'male', meaning: 'God\'s will' },
  'farai': { tribe: 'shona', gender: 'male', meaning: 'Rejoice' },

  // ============ SENEGAL - WOLOF ============
  'fatou': { tribe: 'wolof', gender: 'female', meaning: 'Weaned child (Senegalese form of Fatima)' },
  'awa': { tribe: 'wolof', gender: 'female', meaning: 'Eve (mother of humanity)' },
  'aminata': { tribe: 'wolof', gender: 'female', meaning: 'Trustworthy (Senegalese form of Amina)' },
  'ndeye': { tribe: 'wolof', gender: 'female', meaning: 'Lady / Madam' },
  'khady': { tribe: 'wolof', gender: 'female', meaning: 'Born prematurely (from Khadija)' },
  'mame': { tribe: 'wolof', gender: 'female', meaning: 'Mother / Grandmother' },
  'ousmane': { tribe: 'wolof', gender: 'male', meaning: 'Trustworthy (Senegalese form of Uthman)' },
  'mamadou': { tribe: 'wolof', gender: 'male', meaning: 'Praised (Senegalese form of Muhammad)' },
  'ibrahima': { tribe: 'wolof', gender: 'male', meaning: 'Abraham (Prophet)' },
  'modou': { tribe: 'wolof', gender: 'male', meaning: 'Muhammad (informal form)' },
  'cheikh': { tribe: 'wolof', gender: 'male', meaning: 'Religious leader / Elder' },
  'pape': { tribe: 'wolof', gender: 'male', meaning: 'Father / Pope (honorific)' },
  'seydou': { tribe: 'wolof', gender: 'male', meaning: 'Lord / Master' },
};

// More specific prefix patterns with weights
const prefixPatterns: Record<string, { tribe: string; weight: number }[]> = {
  // Kikuyu prefixes
  'wa': [{ tribe: 'kikuyu', weight: 0.65 }, { tribe: 'luhya', weight: 0.35 }],
  'wan': [{ tribe: 'kikuyu', weight: 0.9 }],
  'wam': [{ tribe: 'kikuyu', weight: 0.85 }, { tribe: 'kamba', weight: 0.15 }],
  'wai': [{ tribe: 'kikuyu', weight: 0.95 }],
  'nj': [{ tribe: 'kikuyu', weight: 0.7 }, { tribe: 'meru', weight: 0.3 }],
  'njo': [{ tribe: 'kikuyu', weight: 0.9 }],
  'nje': [{ tribe: 'kikuyu', weight: 0.85 }],
  'ng': [{ tribe: 'kikuyu', weight: 0.85 }],
  'ngu': [{ tribe: 'kikuyu', weight: 0.9 }],
  'git': [{ tribe: 'kikuyu', weight: 0.95 }],
  'kar': [{ tribe: 'kikuyu', weight: 0.8 }],
  'kim': [{ tribe: 'kikuyu', weight: 0.85 }],
  'mbu': [{ tribe: 'kikuyu', weight: 0.7 }],
  
// Luo prefixes - more specific to avoid false positives with short prefixes
  'ot': [{ tribe: 'luo', weight: 0.95 }],
  'oti': [{ tribe: 'luo', weight: 0.98 }],
  'od': [{ tribe: 'luo', weight: 0.95 }],
  'odh': [{ tribe: 'luo', weight: 0.98 }],
  'ok': [{ tribe: 'luo', weight: 0.9 }],
  'oko': [{ tribe: 'luo', weight: 0.95 }],
  'og': [{ tribe: 'luo', weight: 0.85 }],
  'ogo': [{ tribe: 'luo', weight: 0.92 }],
  'om': [{ tribe: 'luo', weight: 0.9 }],
  'omo': [{ tribe: 'luo', weight: 0.95 }],
  'ow': [{ tribe: 'luo', weight: 0.9 }],
  'owi': [{ tribe: 'luo', weight: 0.95 }],
  'ach': [{ tribe: 'luo', weight: 0.95 }],
  'achi': [{ tribe: 'luo', weight: 0.98 }],
  'adh': [{ tribe: 'luo', weight: 0.95 }],
  'ati': [{ tribe: 'luo', weight: 0.95 }],
  'api': [{ tribe: 'luo', weight: 0.95 }],
  'any': [{ tribe: 'luo', weight: 0.9 }],
  'anya': [{ tribe: 'luo', weight: 0.95 }],
  'awo': [{ tribe: 'luo', weight: 0.9 }],
  'awu': [{ tribe: 'luo', weight: 0.9 }],
  'alu': [{ tribe: 'luo', weight: 0.9 }],
  'ojo': [{ tribe: 'luo', weight: 0.85 }],
  'opo': [{ tribe: 'luo', weight: 0.9 }],
  
  // Luhya prefixes
  'na': [{ tribe: 'luhya', weight: 0.85 }],
  'naf': [{ tribe: 'luhya', weight: 0.95 }],
  'nak': [{ tribe: 'luhya', weight: 0.5 }, { tribe: 'baganda', weight: 0.5 }],
  'nal': [{ tribe: 'luhya', weight: 0.9 }],
  'nas': [{ tribe: 'luhya', weight: 0.9 }],
  'ne': [{ tribe: 'luhya', weight: 0.9 }],
  'nek': [{ tribe: 'luhya', weight: 0.95 }],
  'nel': [{ tribe: 'luhya', weight: 0.9 }],
  'we': [{ tribe: 'luhya', weight: 0.9 }],
  'waf': [{ tribe: 'luhya', weight: 0.95 }],
  'wek': [{ tribe: 'luhya', weight: 0.95 }],
  'was': [{ tribe: 'luhya', weight: 0.6 }, { tribe: 'baganda', weight: 0.4 }],
  'bar': [{ tribe: 'luhya', weight: 0.85 }],
  'sim': [{ tribe: 'luhya', weight: 0.9 }],
  'shi': [{ tribe: 'luhya', weight: 0.6 }, { tribe: 'sukuma', weight: 0.4 }],
  'mak': [{ tribe: 'luhya', weight: 0.7 }, { tribe: 'kisii', weight: 0.3 }],
  
  // Kamba prefixes
  'mu': [{ tribe: 'kamba', weight: 0.4 }, { tribe: 'kikuyu', weight: 0.35 }, { tribe: 'meru', weight: 0.25 }],
  'mut': [{ tribe: 'kamba', weight: 0.7 }, { tribe: 'kikuyu', weight: 0.2 }],
  'mwi': [{ tribe: 'kamba', weight: 0.9 }],
  'mwe': [{ tribe: 'kamba', weight: 0.85 }],
  'nz': [{ tribe: 'kamba', weight: 0.95 }],
  'nzo': [{ tribe: 'kamba', weight: 0.95 }],
  'ky': [{ tribe: 'kamba', weight: 0.9 }],
  'kya': [{ tribe: 'kamba', weight: 0.95 }],
  'nd': [{ tribe: 'kamba', weight: 0.8 }],
  'ndu': [{ tribe: 'kamba', weight: 0.9 }],
  'syo': [{ tribe: 'kamba', weight: 0.95 }],
  'mai': [{ tribe: 'kamba', weight: 0.85 }],
  'kio': [{ tribe: 'kamba', weight: 0.9 }],
  'kil': [{ tribe: 'kamba', weight: 0.85 }],
  
  // Kalenjin prefixes
  'ki': [{ tribe: 'kalenjin', weight: 0.6 }, { tribe: 'kamba', weight: 0.3 }],
  'kip': [{ tribe: 'kalenjin', weight: 0.98 }],
  'kib': [{ tribe: 'kalenjin', weight: 0.6 }, { tribe: 'baganda', weight: 0.4 }],
  'che': [{ tribe: 'kalenjin', weight: 0.95 }],
  'cher': [{ tribe: 'kalenjin', weight: 0.98 }],
  'chep': [{ tribe: 'kalenjin', weight: 0.98 }],
  'cheb': [{ tribe: 'kalenjin', weight: 0.95 }],
  'jep': [{ tribe: 'kalenjin', weight: 0.98 }],
  'jer': [{ tribe: 'kalenjin', weight: 0.95 }],
  'jeb': [{ tribe: 'kalenjin', weight: 0.95 }],
  'ro': [{ tribe: 'kalenjin', weight: 0.85 }],
  'rot': [{ tribe: 'kalenjin', weight: 0.95 }],
  'kos': [{ tribe: 'kalenjin', weight: 0.9 }],
  'lag': [{ tribe: 'kalenjin', weight: 0.9 }],
  'san': [{ tribe: 'kalenjin', weight: 0.8 }],
  
  // Kisii prefixes
  'nya': [{ tribe: 'kisii', weight: 0.7 }, { tribe: 'kikuyu', weight: 0.2 }],
  'nyab': [{ tribe: 'kisii', weight: 0.95 }],
  'nyac': [{ tribe: 'kisii', weight: 0.9 }],
  'ke': [{ tribe: 'kisii', weight: 0.8 }],
  'kem': [{ tribe: 'kisii', weight: 0.9 }],
  'ker': [{ tribe: 'kisii', weight: 0.9 }],
  'bo': [{ tribe: 'kisii', weight: 0.85 }],
  'bos': [{ tribe: 'kisii', weight: 0.95 }],
  'boc': [{ tribe: 'kisii', weight: 0.95 }],
  'mo': [{ tribe: 'kisii', weight: 0.7 }],
  'mom': [{ tribe: 'kisii', weight: 0.9 }],
  'mor': [{ tribe: 'kisii', weight: 0.85 }],
  'mog': [{ tribe: 'kisii', weight: 0.9 }],
  'ong': [{ tribe: 'kisii', weight: 0.75 }, { tribe: 'luo', weight: 0.25 }],
  'ges': [{ tribe: 'kisii', weight: 0.95 }],
  'kwa': [{ tribe: 'kisii', weight: 0.9 }],
  
  // Meru prefixes
  'ka': [{ tribe: 'meru', weight: 0.5 }, { tribe: 'kikuyu', weight: 0.35 }, { tribe: 'kamba', weight: 0.15 }],
  'kaw': [{ tribe: 'meru', weight: 0.9 }],
  'ga': [{ tribe: 'meru', weight: 0.8 }],
  'gac': [{ tribe: 'meru', weight: 0.95 }],
  'gat': [{ tribe: 'meru', weight: 0.95 }],
  'muk': [{ tribe: 'meru', weight: 0.7 }, { tribe: 'kikuyu', weight: 0.3 }],
  'mur': [{ tribe: 'meru', weight: 0.75 }, { tribe: 'kikuyu', weight: 0.25 }],
  'kir': [{ tribe: 'meru', weight: 0.8 }],
  'kob': [{ tribe: 'meru', weight: 0.9 }],
  'nki': [{ tribe: 'meru', weight: 0.9 }],
  'nka': [{ tribe: 'meru', weight: 0.9 }],
  
  // Coastal prefixes
  'ham': [{ tribe: 'coastal', weight: 0.95 }],
  'has': [{ tribe: 'coastal', weight: 0.9 }],
  'hal': [{ tribe: 'coastal', weight: 0.6 }, { tribe: 'oromo', weight: 0.4 }],
  'ju': [{ tribe: 'coastal', weight: 0.95 }],
  'jum': [{ tribe: 'coastal', weight: 0.98 }],
  'fa': [{ tribe: 'coastal', weight: 0.9 }],
  'fat': [{ tribe: 'coastal', weight: 0.95 }],
  'za': [{ tribe: 'coastal', weight: 0.9 }],
  'zai': [{ tribe: 'coastal', weight: 0.95 }],
  'ab': [{ tribe: 'coastal', weight: 0.85 }],
  'abd': [{ tribe: 'coastal', weight: 0.5 }, { tribe: 'somali', weight: 0.5 }],
  'sal': [{ tribe: 'coastal', weight: 0.9 }],
  'ras': [{ tribe: 'coastal', weight: 0.9 }],
  'oma': [{ tribe: 'coastal', weight: 0.9 }],
  'kaz': [{ tribe: 'coastal', weight: 0.95 }],
  'kat': [{ tribe: 'coastal', weight: 0.85 }],
  'mwa': [{ tribe: 'coastal', weight: 0.7 }],
  'bak': [{ tribe: 'coastal', weight: 0.9 }],
  'tsu': [{ tribe: 'coastal', weight: 0.95 }],
  'riz': [{ tribe: 'coastal', weight: 0.9 }],
  'reh': [{ tribe: 'coastal', weight: 0.9 }],

  // ============ Rwanda/Burundi (Banyarwanda) prefixes ============
  'uwi': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'uwa': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'uwe': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'nta': [{ tribe: 'hutu_tutsi', weight: 0.92 }],
  'nda': [{ tribe: 'hutu_tutsi', weight: 0.88 }],
  'ndi': [{ tribe: 'hutu_tutsi', weight: 0.88 }],
  'nse': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'nsh': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'nku': [{ tribe: 'hutu_tutsi', weight: 0.7 }, { tribe: 'sukuma', weight: 0.3 }],
  'nyir': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'ha': [{ tribe: 'hutu_tutsi', weight: 0.6 }, { tribe: 'coastal', weight: 0.4 }],
  'hab': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'hak': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'habi': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'mug': [{ tribe: 'hutu_tutsi', weight: 0.5 }, { tribe: 'meru', weight: 0.5 }],
  'muka': [{ tribe: 'hutu_tutsi', weight: 0.85 }],
  'inga': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'biz': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'ruk': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'kag': [{ tribe: 'hutu_tutsi', weight: 0.5 }, { tribe: 'meru', weight: 0.5 }],
  'kal': [{ tribe: 'hutu_tutsi', weight: 0.75 }],
  'hir': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'manz': [{ tribe: 'hutu_tutsi', weight: 0.95 }],

  // ============ Uganda (Baganda) prefixes ============
  'sser': [{ tribe: 'baganda', weight: 0.95 }],
  'sse': [{ tribe: 'baganda', weight: 0.9 }],
  'nna': [{ tribe: 'baganda', weight: 0.9 }],
  'nnak': [{ tribe: 'baganda', weight: 0.95 }],
  'nnam': [{ tribe: 'baganda', weight: 0.95 }],
  'lub': [{ tribe: 'baganda', weight: 0.9 }],
  'luw': [{ tribe: 'baganda', weight: 0.95 }],
  'mus': [{ tribe: 'baganda', weight: 0.85 }],
  'muse': [{ tribe: 'baganda', weight: 0.95 }],
  'naka': [{ tribe: 'baganda', weight: 0.9 }],
  'bab': [{ tribe: 'baganda', weight: 0.9 }],
  'kam': [{ tribe: 'baganda', weight: 0.75 }],

  // ============ Tanzania (Sukuma, Chagga) prefixes ============
  'mas': [{ tribe: 'sukuma', weight: 0.7 }],
  'masa': [{ tribe: 'sukuma', weight: 0.85 }],
  'shij': [{ tribe: 'sukuma', weight: 0.9 }],
  'bug': [{ tribe: 'sukuma', weight: 0.85 }],
  'lyi': [{ tribe: 'chagga', weight: 0.95 }],
  'msa': [{ tribe: 'chagga', weight: 0.9 }],
  'nde': [{ tribe: 'chagga', weight: 0.85 }],
  'nja': [{ tribe: 'chagga', weight: 0.8 }],
  'mri': [{ tribe: 'chagga', weight: 0.9 }],

  // ============ Somalia (Somali) prefixes ============
  'abdi': [{ tribe: 'somali', weight: 0.95 }],
  'cab': [{ tribe: 'somali', weight: 0.95 }],
  'max': [{ tribe: 'somali', weight: 0.9 }],
  'faa': [{ tribe: 'somali', weight: 0.9 }],
  'gul': [{ tribe: 'somali', weight: 0.85 }],
  'jaa': [{ tribe: 'somali', weight: 0.9 }],
  'hod': [{ tribe: 'somali', weight: 0.95 }],
  'hib': [{ tribe: 'somali', weight: 0.95 }],
  'nim': [{ tribe: 'somali', weight: 0.9 }],
  'far': [{ tribe: 'somali', weight: 0.85 }],
  'uba': [{ tribe: 'somali', weight: 0.9 }],
  'sah': [{ tribe: 'somali', weight: 0.85 }],
  'haw': [{ tribe: 'somali', weight: 0.9 }],

  // ============ Ethiopia (Amhara, Oromo) prefixes ============
  'abe': [{ tribe: 'amhara', weight: 0.9 }],
  'keb': [{ tribe: 'amhara', weight: 0.95 }],
  'tes': [{ tribe: 'amhara', weight: 0.9 }],
  'get': [{ tribe: 'amhara', weight: 0.85 }],
  'tad': [{ tribe: 'amhara', weight: 0.9 }],
  'hai': [{ tribe: 'amhara', weight: 0.85 }],
  'sel': [{ tribe: 'amhara', weight: 0.8 }],
  'alm': [{ tribe: 'amhara', weight: 0.9 }],
  'tig': [{ tribe: 'amhara', weight: 0.85 }],
  'maho': [{ tribe: 'amhara', weight: 0.85 }],
  'mes': [{ tribe: 'amhara', weight: 0.85 }],
  'gam': [{ tribe: 'oromo', weight: 0.9 }],
  'tol': [{ tribe: 'oromo', weight: 0.85 }],
  'lee': [{ tribe: 'oromo', weight: 0.8 }],
  'caa': [{ tribe: 'oromo', weight: 0.95 }],
  'hun': [{ tribe: 'oromo', weight: 0.85 }],
  'bon': [{ tribe: 'oromo', weight: 0.85 }],
  'lal': [{ tribe: 'oromo', weight: 0.9 }],
  'obs': [{ tribe: 'oromo', weight: 0.95 }],

  // ============ Nigeria - Yoruba prefixes ============
  'ade': [{ tribe: 'yoruba', weight: 0.95 }],
  'adu': [{ tribe: 'yoruba', weight: 0.9 }],
  'ayo': [{ tribe: 'yoruba', weight: 0.9 }],
  'dam': [{ tribe: 'yoruba', weight: 0.85 }],
  'fol': [{ tribe: 'yoruba', weight: 0.95 }],
  'fun': [{ tribe: 'yoruba', weight: 0.9 }],
  'kay': [{ tribe: 'yoruba', weight: 0.9 }],
  'kun': [{ tribe: 'yoruba', weight: 0.85 }],
  'olu': [{ tribe: 'yoruba', weight: 0.95 }],
  'ose': [{ tribe: 'yoruba', weight: 0.85 }],
  'seg': [{ tribe: 'yoruba', weight: 0.9 }],
  'tem': [{ tribe: 'yoruba', weight: 0.85 }],
  'tit': [{ tribe: 'yoruba', weight: 0.95 }],
  'wal': [{ tribe: 'yoruba', weight: 0.85 }],
  'yin': [{ tribe: 'yoruba', weight: 0.9 }],
  'yet': [{ tribe: 'yoruba', weight: 0.9 }],

  // ============ Nigeria - Igbo prefixes ============
  'ada': [{ tribe: 'igbo', weight: 0.9 }],
  'ama': [{ tribe: 'igbo', weight: 0.7 }, { tribe: 'ashanti', weight: 0.3 }],
  'chiu': [{ tribe: 'igbo', weight: 0.95 }],
  'chid': [{ tribe: 'igbo', weight: 0.95 }],
  'chio': [{ tribe: 'igbo', weight: 0.95 }],
  'chiny': [{ tribe: 'igbo', weight: 0.95 }],
  'chuk': [{ tribe: 'igbo', weight: 0.98 }],
  'ebe': [{ tribe: 'igbo', weight: 0.9 }],
  'eme': [{ tribe: 'igbo', weight: 0.9 }],
  'ife': [{ tribe: 'igbo', weight: 0.85 }],
  'ike': [{ tribe: 'igbo', weight: 0.9 }],
  'kel': [{ tribe: 'igbo', weight: 0.85 }],
  'obi': [{ tribe: 'igbo', weight: 0.95 }],
  'okec': [{ tribe: 'igbo', weight: 0.95 }],
  'ony': [{ tribe: 'igbo', weight: 0.9 }],
  'uch': [{ tribe: 'igbo', weight: 0.95 }],
  'ugo': [{ tribe: 'igbo', weight: 0.9 }],
  'nnama': [{ tribe: 'igbo', weight: 0.95 }],

  // ============ Nigeria - Hausa prefixes ============
  'abu': [{ tribe: 'hausa', weight: 0.95 }],
  'ali': [{ tribe: 'hausa', weight: 0.75 }],
  'bel': [{ tribe: 'hausa', weight: 0.85 }],
  'danj': [{ tribe: 'hausa', weight: 0.98 }],
  'gar': [{ tribe: 'hausa', weight: 0.85 }],
  'ibr': [{ tribe: 'hausa', weight: 0.9 }],
  'usm': [{ tribe: 'hausa', weight: 0.95 }],
  'yaku': [{ tribe: 'hausa', weight: 0.9 }],
  'yusu': [{ tribe: 'hausa', weight: 0.85 }],

  // ============ Ghana - Ashanti/Akan prefixes ============
  'akos': [{ tribe: 'ashanti', weight: 0.98 }],
  'akua': [{ tribe: 'ashanti', weight: 0.95 }],
  'adwo': [{ tribe: 'ashanti', weight: 0.98 }],
  'afua': [{ tribe: 'ashanti', weight: 0.95 }],
  'kof': [{ tribe: 'ashanti', weight: 0.98 }],
  'kwas': [{ tribe: 'ashanti', weight: 0.98 }],
  'kwad': [{ tribe: 'ashanti', weight: 0.98 }],
  'kwab': [{ tribe: 'ashanti', weight: 0.98 }],
  'kwak': [{ tribe: 'ashanti', weight: 0.98 }],
  'kwam': [{ tribe: 'ashanti', weight: 0.98 }],
  'osei': [{ tribe: 'ashanti', weight: 0.95 }],
  'yaw': [{ tribe: 'ashanti', weight: 0.95 }],

  // ============ South Africa - Zulu prefixes ============
  'nomz': [{ tribe: 'zulu', weight: 0.98 }],
  'nokw': [{ tribe: 'zulu', weight: 0.98 }],
  'nozi': [{ tribe: 'zulu', weight: 0.98 }],
  'nonh': [{ tribe: 'zulu', weight: 0.98 }],
  'busi': [{ tribe: 'zulu', weight: 0.95 }],
  'sibu': [{ tribe: 'zulu', weight: 0.95 }],
  'siph': [{ tribe: 'zulu', weight: 0.95 }],
  'simp': [{ tribe: 'zulu', weight: 0.95 }],
  'siya': [{ tribe: 'zulu', weight: 0.95 }],
  'than': [{ tribe: 'zulu', weight: 0.9 }],
  'them': [{ tribe: 'zulu', weight: 0.9 }],
  'bong': [{ tribe: 'zulu', weight: 0.9 }],
  'nkos': [{ tribe: 'zulu', weight: 0.98 }],

  // ============ Zimbabwe - Shona prefixes ============
  'rute': [{ tribe: 'shona', weight: 0.98 }],
  'rudo': [{ tribe: 'shona', weight: 0.98 }],
  'tend': [{ tribe: 'shona', weight: 0.95 }],
  'tina': [{ tribe: 'shona', weight: 0.95 }],
  'tsit': [{ tribe: 'shona', weight: 0.98 }],
  'nyas': [{ tribe: 'shona', weight: 0.9 }],
  'chie': [{ tribe: 'shona', weight: 0.9 }],
  'fadz': [{ tribe: 'shona', weight: 0.98 }],
  'fara': [{ tribe: 'shona', weight: 0.9 }],
  'kuda': [{ tribe: 'shona', weight: 0.98 }],
  'tapi': [{ tribe: 'shona', weight: 0.95 }],
  'tafa': [{ tribe: 'shona', weight: 0.98 }],
  'tate': [{ tribe: 'shona', weight: 0.95 }],

  // ============ Senegal - Wolof prefixes ============
  'fato': [{ tribe: 'wolof', weight: 0.95 }],
  'amin': [{ tribe: 'wolof', weight: 0.85 }],
  'ndey': [{ tribe: 'wolof', weight: 0.98 }],
  'khad': [{ tribe: 'wolof', weight: 0.95 }],
  'mame': [{ tribe: 'wolof', weight: 0.95 }],
  'ousm': [{ tribe: 'wolof', weight: 0.98 }],
  'mama': [{ tribe: 'wolof', weight: 0.9 }],
  'ibra': [{ tribe: 'wolof', weight: 0.85 }],
  'pape': [{ tribe: 'wolof', weight: 0.98 }],
  'seyd': [{ tribe: 'wolof', weight: 0.95 }],
  'modo': [{ tribe: 'wolof', weight: 0.9 }],
};

// Suffix patterns for additional matching
const suffixPatterns: Record<string, { tribe: string; weight: number }[]> = {
  'ambo': [{ tribe: 'luo', weight: 0.9 }],
  'ieno': [{ tribe: 'luo', weight: 0.9 }],
  'ieng': [{ tribe: 'luo', weight: 0.9 }],
  'ango': [{ tribe: 'luo', weight: 0.85 }],
  'ondi': [{ tribe: 'luo', weight: 0.9 }],
  'ongo': [{ tribe: 'luo', weight: 0.85 }],
  'ula': [{ tribe: 'luhya', weight: 0.9 }],
  'esa': [{ tribe: 'luhya', weight: 0.9 }],
  'iyu': [{ tribe: 'luhya', weight: 0.85 }],
  'ala': [{ tribe: 'luhya', weight: 0.7 }],
  'iku': [{ tribe: 'kikuyu', weight: 0.9 }],
  'ari': [{ tribe: 'kikuyu', weight: 0.7 }],
  'uki': [{ tribe: 'kikuyu', weight: 0.85 }],
  'ani': [{ tribe: 'kikuyu', weight: 0.75 }],
  'oge': [{ tribe: 'kalenjin', weight: 0.95 }],
  'yot': [{ tribe: 'kalenjin', weight: 0.95 }],
  'ich': [{ tribe: 'kalenjin', weight: 0.9 }],
  'gat': [{ tribe: 'kalenjin', weight: 0.85 }],
  'oech': [{ tribe: 'kalenjin', weight: 0.95 }],
  'tai': [{ tribe: 'kalenjin', weight: 0.85 }],
  'uto': [{ tribe: 'kalenjin', weight: 0.9 }],
  'oke': [{ tribe: 'kisii', weight: 0.9 }],
  'nto': [{ tribe: 'kisii', weight: 0.85 }],
  'boka': [{ tribe: 'kisii', weight: 0.95 }],
  'raa': [{ tribe: 'kisii', weight: 0.9 }],
  'eri': [{ tribe: 'kisii', weight: 0.7 }],
  'oria': [{ tribe: 'meru', weight: 0.9 }],
  'wira': [{ tribe: 'meru', weight: 0.9 }],
  'ena': [{ tribe: 'meru', weight: 0.7 }],
  'ambi': [{ tribe: 'meru', weight: 0.8 }],
  'isi': [{ tribe: 'coastal', weight: 0.85 }],
  'uma': [{ tribe: 'coastal', weight: 0.8 }],
  'ima': [{ tribe: 'coastal', weight: 0.75 }],
  
  // ============ Rwanda/Burundi (Banyarwanda) suffixes ============
  'mana': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'imana': [{ tribe: 'hutu_tutsi', weight: 0.98 }],
  'zima': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'iza': [{ tribe: 'hutu_tutsi', weight: 0.85 }],
  'abo': [{ tribe: 'hutu_tutsi', weight: 0.85 }],
  'gabo': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'undo': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'kundo': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'yezu': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'horo': [{ tribe: 'hutu_tutsi', weight: 0.9 }],
  'abire': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  'ere': [{ tribe: 'hutu_tutsi', weight: 0.7 }],
  'nziza': [{ tribe: 'hutu_tutsi', weight: 0.95 }],
  
  // ============ Uganda (Baganda) suffixes ============
  'anga': [{ tribe: 'baganda', weight: 0.8 }],
  'enda': [{ tribe: 'baganda', weight: 0.75 }],
  'wanga': [{ tribe: 'baganda', weight: 0.9 }],

  // ============ Nigeria - Yoruba suffixes ============
  'deji': [{ tribe: 'yoruba', weight: 0.95 }],
  'lola': [{ tribe: 'yoruba', weight: 0.95 }],
  'nike': [{ tribe: 'yoruba', weight: 0.9 }],
  'seun': [{ tribe: 'yoruba', weight: 0.95 }],
  'tayo': [{ tribe: 'yoruba', weight: 0.95 }],
  'tola': [{ tribe: 'yoruba', weight: 0.9 }],
  'tunde': [{ tribe: 'yoruba', weight: 0.98 }],
  'wale': [{ tribe: 'yoruba', weight: 0.95 }],
  'yemi': [{ tribe: 'yoruba', weight: 0.95 }],
  'mide': [{ tribe: 'yoruba', weight: 0.9 }],

  // ============ Nigeria - Igbo suffixes ============
  'dinma': [{ tribe: 'igbo', weight: 0.98 }],
  'maka': [{ tribe: 'igbo', weight: 0.95 }],
  'emeka': [{ tribe: 'igbo', weight: 0.98 }],
  'nneka': [{ tribe: 'igbo', weight: 0.98 }],
  'enna': [{ tribe: 'igbo', weight: 0.95 }],
  'ukwu': [{ tribe: 'igbo', weight: 0.95 }],
  'lechi': [{ tribe: 'igbo', weight: 0.95 }],
  'gozi': [{ tribe: 'igbo', weight: 0.95 }],
  'oinna': [{ tribe: 'igbo', weight: 0.95 }],

  // ============ Ghana - Ashanti suffixes ============
  'ame': [{ tribe: 'ashanti', weight: 0.9 }],
  'ofi': [{ tribe: 'ashanti', weight: 0.95 }],
  'benaa': [{ tribe: 'ashanti', weight: 0.98 }],
  'kosua': [{ tribe: 'ashanti', weight: 0.98 }],

  // ============ South Africa - Zulu suffixes ============
  'iwe': [{ tribe: 'zulu', weight: 0.9 }],
  'ipho': [{ tribe: 'zulu', weight: 0.95 }],
  'emba': [{ tribe: 'zulu', weight: 0.9 }],
  'gani': [{ tribe: 'zulu', weight: 0.9 }],
  'onga': [{ tribe: 'zulu', weight: 0.85 }],

  // ============ Zimbabwe - Shona suffixes ============
  'endo': [{ tribe: 'shona', weight: 0.95 }],
  'ashe': [{ tribe: 'shona', weight: 0.9 }],
  'dza': [{ tribe: 'shona', weight: 0.95 }],
  'asha': [{ tribe: 'shona', weight: 0.85 }],
  'arai': [{ tribe: 'shona', weight: 0.9 }],

  // ============ Senegal - Wolof suffixes ============
  'mane': [{ tribe: 'wolof', weight: 0.85 }],
  'atou': [{ tribe: 'wolof', weight: 0.9 }],
  'ndey': [{ tribe: 'wolof', weight: 0.95 }],
  'odou': [{ tribe: 'wolof', weight: 0.9 }],
};

// Time mapping for better matching
const timeMapping: Record<string, string[]> = {
  'morning': ['morning', 'dawn', 'early'],
  'day': ['day', 'daytime', 'noon', 'midday', 'afternoon'],
  'evening': ['evening', 'dusk'],
  'night': ['night', 'midnight', 'late'],
  'friday': ['friday'],
  'thursday': ['thursday'],
  'harvest': ['harvest'],
  'rainy': ['rainy', 'rain', 'wet'],
  'market': ['market'],
  'lunch': ['lunch', 'noon', 'midday'],
  'newyear': ['newyear', 'new year'],
};

// Region to tribe mapping with weights
const regionTribeMapping: Record<string, { tribe: string; weight: number }[]> = {
  'central': [
    { tribe: 'kikuyu', weight: 0.85 },
    { tribe: 'meru', weight: 0.1 },
  ],
  'western': [
    { tribe: 'luhya', weight: 0.7 },
    { tribe: 'luo', weight: 0.25 },
  ],
  'rift-valley': [
    { tribe: 'kalenjin', weight: 0.75 },
    { tribe: 'kikuyu', weight: 0.15 },
  ],
  'eastern': [
    { tribe: 'kamba', weight: 0.7 },
    { tribe: 'meru', weight: 0.25 },
  ],
  'coast': [
    { tribe: 'coastal', weight: 0.9 },
  ],
  'nyanza': [
    { tribe: 'luo', weight: 0.5 },
    { tribe: 'kisii', weight: 0.45 },
  ],
};

// Build stereotypes (based on common perceptions - for entertainment only)
const buildTribeMapping: Record<string, { tribe: string; weight: number }[]> = {
  'tall-slender': [
    { tribe: 'luo', weight: 0.3 },
    { tribe: 'kalenjin', weight: 0.35 },
    { tribe: 'coastal', weight: 0.2 },
  ],
  'athletic': [
    { tribe: 'kalenjin', weight: 0.45 },
    { tribe: 'kikuyu', weight: 0.2 },
  ],
  'petite': [
    { tribe: 'kikuyu', weight: 0.25 },
    { tribe: 'kisii', weight: 0.2 },
  ],
  'curvy': [
    { tribe: 'luhya', weight: 0.3 },
    { tribe: 'kisii', weight: 0.25 },
    { tribe: 'kamba', weight: 0.2 },
  ],
  'average': [],
};

// Personality stereotypes (for entertainment only)
const personalityTribeMapping: Record<string, { tribe: string; weight: number }[]> = {
  'business-minded': [
    { tribe: 'kikuyu', weight: 0.4 },
    { tribe: 'coastal', weight: 0.15 },
  ],
  'outgoing': [
    { tribe: 'luo', weight: 0.35 },
    { tribe: 'luhya', weight: 0.25 },
  ],
  'reserved': [
    { tribe: 'kamba', weight: 0.25 },
    { tribe: 'meru', weight: 0.2 },
  ],
  'artistic': [
    { tribe: 'luo', weight: 0.3 },
    { tribe: 'coastal', weight: 0.25 },
  ],
  'nurturing': [
    { tribe: 'luhya', weight: 0.3 },
    { tribe: 'kisii', weight: 0.25 },
  ],
};

// Religious name patterns - fact-checked
const religiousNamePatterns: Record<string, { religion: string; weight: number; origin?: string }[]> = {
  // Islamic names (Arabic origin - common in Coastal, Somali, Hausa, Swahili communities)
  'fatima': [{ religion: 'muslim', weight: 0.95, origin: "Daughter of Prophet Muhammad" }],
  'fatuma': [{ religion: 'muslim', weight: 0.95, origin: "Swahili form of Fatima" }],
  'aisha': [{ religion: 'muslim', weight: 0.95, origin: "Wife of Prophet Muhammad" }],
  'khadija': [{ religion: 'muslim', weight: 0.95, origin: "First wife of Prophet Muhammad" }],
  'amina': [{ religion: 'muslim', weight: 0.90, origin: "Mother of Prophet Muhammad" }],
  'halima': [{ religion: 'muslim', weight: 0.90, origin: "Wet nurse of Prophet Muhammad" }],
  'zainab': [{ religion: 'muslim', weight: 0.95, origin: "Daughter of Prophet Muhammad" }],
  'mariam': [{ religion: 'muslim', weight: 0.85, origin: "Arabic form of Mary" }],
  'mohammed': [{ religion: 'muslim', weight: 0.98, origin: "Prophet of Islam" }],
  'muhammad': [{ religion: 'muslim', weight: 0.98, origin: "Prophet of Islam" }],
  'ahmed': [{ religion: 'muslim', weight: 0.95, origin: "Praised one" }],
  'omar': [{ religion: 'muslim', weight: 0.90, origin: "Second Caliph of Islam" }],
  'ali': [{ religion: 'muslim', weight: 0.88, origin: "Fourth Caliph, Prophet's son-in-law" }],
  'hassan': [{ religion: 'muslim', weight: 0.92, origin: "Grandson of Prophet Muhammad" }],
  'hussein': [{ religion: 'muslim', weight: 0.92, origin: "Grandson of Prophet Muhammad" }],
  'ibrahim': [{ religion: 'muslim', weight: 0.90, origin: "Arabic form of Abraham" }],
  'yusuf': [{ religion: 'muslim', weight: 0.90, origin: "Arabic form of Joseph" }],
  'rashid': [{ religion: 'muslim', weight: 0.85, origin: "Rightly guided" }],
  'salim': [{ religion: 'muslim', weight: 0.85, origin: "Safe, peaceful" }],
  'hamisi': [{ religion: 'muslim', weight: 0.80, origin: "Born on Thursday" }],
  'jumaa': [{ religion: 'muslim', weight: 0.80, origin: "Born on Friday" }],
  'bakari': [{ religion: 'muslim', weight: 0.75, origin: "Promising one" }],
  'abdul': [{ religion: 'muslim', weight: 0.95, origin: "Servant of God" }],
  'abdallah': [{ religion: 'muslim', weight: 0.95, origin: "Servant of Allah" }],
  
  // Christian names (Biblical origin - widespread across Africa)
  'mary': [{ religion: 'christian', weight: 0.90, origin: "Mother of Jesus" }],
  'maria': [{ religion: 'christian', weight: 0.88, origin: "Latin form of Mary" }],
  'grace': [{ religion: 'christian', weight: 0.85, origin: "Divine grace" }],
  'faith': [{ religion: 'christian', weight: 0.90, origin: "Christian virtue" }],
  'hope': [{ religion: 'christian', weight: 0.90, origin: "Christian virtue" }],
  'charity': [{ religion: 'christian', weight: 0.90, origin: "Christian virtue" }],
  'blessing': [{ religion: 'christian', weight: 0.85, origin: "Divine blessing" }],
  'mercy': [{ religion: 'christian', weight: 0.85, origin: "Divine mercy" }],
  'patience': [{ religion: 'christian', weight: 0.85, origin: "Christian virtue" }],
  'john': [{ religion: 'christian', weight: 0.80, origin: "John the Baptist/Apostle" }],
  'peter': [{ religion: 'christian', weight: 0.85, origin: "Apostle Peter" }],
  'paul': [{ religion: 'christian', weight: 0.85, origin: "Apostle Paul" }],
  'david': [{ religion: 'christian', weight: 0.80, origin: "King David" }],
  'daniel': [{ religion: 'christian', weight: 0.80, origin: "Prophet Daniel" }],
  'samuel': [{ religion: 'christian', weight: 0.85, origin: "Prophet Samuel" }],
  'joseph': [{ religion: 'christian', weight: 0.80, origin: "Joseph of the Bible" }],
  'james': [{ religion: 'christian', weight: 0.75, origin: "Apostle James" }],
  'michael': [{ religion: 'christian', weight: 0.75, origin: "Archangel Michael" }],
  'gabriel': [{ religion: 'christian', weight: 0.80, origin: "Archangel Gabriel" }],
  'ruth': [{ religion: 'christian', weight: 0.85, origin: "Ruth of Moab" }],
  'esther': [{ religion: 'christian', weight: 0.85, origin: "Queen Esther" }],
  'naomi': [{ religion: 'christian', weight: 0.85, origin: "Mother-in-law of Ruth" }],
  'sarah': [{ religion: 'christian', weight: 0.80, origin: "Wife of Abraham" }],
  'rebecca': [{ religion: 'christian', weight: 0.85, origin: "Wife of Isaac" }],
  'rachel': [{ religion: 'christian', weight: 0.85, origin: "Wife of Jacob" }],
  'martha': [{ religion: 'christian', weight: 0.85, origin: "Friend of Jesus" }],
  'elizabeth': [{ religion: 'christian', weight: 0.80, origin: "Mother of John the Baptist" }],
  'hannah': [{ religion: 'christian', weight: 0.85, origin: "Mother of Samuel" }],
  'deborah': [{ religion: 'christian', weight: 0.85, origin: "Judge of Israel" }],
  'abigail': [{ religion: 'christian', weight: 0.85, origin: "Wife of David" }],
  
  // Igbo Christian names
  'chukwuemeka': [{ religion: 'christian', weight: 0.90, origin: "God has done great things (Igbo)" }],
  'chidinma': [{ religion: 'christian', weight: 0.85, origin: "God is good (Igbo)" }],
  'chinyere': [{ religion: 'christian', weight: 0.85, origin: "God gave (Igbo)" }],
  'chiamaka': [{ religion: 'christian', weight: 0.85, origin: "God is beautiful (Igbo)" }],
  'chisom': [{ religion: 'christian', weight: 0.85, origin: "God follows me (Igbo)" }],
  'uchenna': [{ religion: 'christian', weight: 0.80, origin: "God's will (Igbo)" }],
  'chidi': [{ religion: 'christian', weight: 0.85, origin: "God exists (Igbo)" }],
  
  // Ethiopian Christian names (Orthodox tradition)
  'yohannes': [{ religion: 'christian', weight: 0.90, origin: "Amharic form of John" }],
  'dawit': [{ religion: 'christian', weight: 0.90, origin: "Amharic form of David" }],
  'meron': [{ religion: 'christian', weight: 0.75, origin: "Holy oil (Orthodox)" }],
  'bethlehem': [{ religion: 'christian', weight: 0.95, origin: "Birthplace of Jesus" }],
  'kidist': [{ religion: 'christian', weight: 0.85, origin: "Saint/Holy one" }],
  'selam': [{ religion: 'christian', weight: 0.70, origin: "Peace" }],
  'selamawit': [{ religion: 'christian', weight: 0.80, origin: "Peaceful one" }],
  
  // Hebrew/Jewish names (less common but present in some African communities)
  'miriam': [{ religion: 'jewish', weight: 0.70, origin: "Hebrew form of Mary" }],
  'moshe': [{ religion: 'jewish', weight: 0.85, origin: "Hebrew form of Moses" }],
  'avraham': [{ religion: 'jewish', weight: 0.90, origin: "Hebrew form of Abraham" }],
  'yitzchak': [{ religion: 'jewish', weight: 0.90, origin: "Hebrew form of Isaac" }],
  'yaakov': [{ religion: 'jewish', weight: 0.90, origin: "Hebrew form of Jacob" }],
};

// Islamic name prefixes/patterns
const islamicPrefixes: string[] = ['abd', 'abdul', 'abu', 'umm', 'ibn'];
const islamicSuffixes: string[] = ['allah', 'din', 'uddin', 'ullah'];

// Religious influence mapping to tribes - fact-checked historical data
const tribeReligiousInfluence: Record<string, { primary: string; secondary?: string; percentage?: number; notes: string }> = {
  // Kenya
  'kikuyu': { primary: 'christian', percentage: 90, notes: 'Protestant majority (Presbyterian, Anglican), some Catholic. Traditional Ngai worship declining.' },
  'luo': { primary: 'christian', percentage: 85, notes: 'Mix of Catholic, Anglican, and African Independent Churches. Strong Legio Maria presence.' },
  'luhya': { primary: 'christian', percentage: 88, notes: 'Quaker (Friends Church) stronghold, also Catholic and Protestant.' },
  'kamba': { primary: 'christian', percentage: 85, notes: 'Strong Catholic and African Inland Church presence.' },
  'kalenjin': { primary: 'christian', percentage: 90, notes: 'Africa Inland Church dominant, Presbyterian also present.' },
  'kisii': { primary: 'christian', percentage: 92, notes: 'Seventh-day Adventist stronghold, also Catholic.' },
  'meru': { primary: 'christian', percentage: 88, notes: 'Methodist and Presbyterian majority.' },
  'coastal': { primary: 'muslim', percentage: 70, secondary: 'christian', notes: 'Islam dominant since 8th century trade. Mijikenda have more Christian/traditional mix.' },
  'somali': { primary: 'muslim', percentage: 99, notes: 'Sunni Islam nearly universal. Part of broader Somali nation.' },
  'maasai': { primary: 'traditional', secondary: 'christian', percentage: 60, notes: 'Traditional Enkai worship still strong. Christianity growing among settled communities.' },
  'turkana': { primary: 'traditional', secondary: 'christian', percentage: 50, notes: 'Traditional Akuj worship. Christian missions active since 1960s.' },
  'samburu': { primary: 'traditional', secondary: 'christian', percentage: 55, notes: 'Similar to Maasai - Nkai worship. Christianity increasing.' },
  'pokot': { primary: 'traditional', secondary: 'christian', percentage: 45, notes: 'Traditional beliefs strong. Christian presence growing.' },
  
  // Nigeria
  'yoruba': { primary: 'mixed', secondary: 'christian', notes: 'Roughly 50% Muslim (north), 40% Christian (south), 10% traditional Ifa.' },
  'igbo': { primary: 'christian', percentage: 98, notes: 'Predominantly Catholic and Anglican. Igbo Jewish movement (Igbo Bnei Israel) exists.' },
  'hausa': { primary: 'muslim', percentage: 99, notes: 'Sunni Islam dominant since 11th century. Sokoto Caliphate legacy.' },
  'fulani': { primary: 'muslim', percentage: 95, notes: 'Sunni Islam. Led Fulani jihads in 19th century West Africa.' },
  
  // Ghana
  'ashanti': { primary: 'christian', secondary: 'traditional', percentage: 75, notes: 'Traditional Akan religion still practiced alongside Christianity.' },
  'akan': { primary: 'christian', secondary: 'traditional', percentage: 70, notes: 'Christianity widespread. Traditional beliefs persist.' },
  'ewe': { primary: 'christian', percentage: 80, secondary: 'traditional', notes: 'Evangelical/Presbyterian majority. Vodun traditions present.' },
  'ga': { primary: 'christian', percentage: 85, notes: 'Protestant majority. Homowo festival has traditional elements.' },
  'dagomba': { primary: 'muslim', percentage: 90, notes: 'Islam arrived via trans-Saharan trade. Traditional chieftaincy still important.' },
  
  // Ethiopia
  'oromo': { primary: 'mixed', notes: 'Split: ~50% Muslim, ~40% Ethiopian Orthodox, ~8% Protestant, some Waaqeffanna.' },
  'amhara': { primary: 'christian', percentage: 90, notes: 'Ethiopian Orthodox Christian stronghold since 4th century.' },
  'tigray': { primary: 'christian', percentage: 95, notes: 'Ethiopian Orthodox Christianity. Oldest Christian tradition in Africa.' },
  'somali_eth': { primary: 'muslim', percentage: 99, notes: 'Sunni Islam universal among Ethiopian Somalis.' },
  'afar': { primary: 'muslim', percentage: 99, notes: 'Sunni Islam. Traditional pastoral lifestyle.' },
  
  // South Africa
  'zulu': { primary: 'christian', secondary: 'traditional', percentage: 80, notes: 'Christian majority. Shembe/Nazareth Baptist Church popular. Ancestors still revered.' },
  'xhosa': { primary: 'christian', percentage: 85, notes: 'Methodist and traditional beliefs blend. Ubuntu philosophy central.' },
  'sotho': { primary: 'christian', percentage: 90, notes: 'Roman Catholic and Lesotho Evangelical Church dominant.' },
  'tswana': { primary: 'christian', percentage: 85, notes: 'Protestant majority. Traditional Badimo ancestor reverence continues.' },
  
  // Tanzania
  'sukuma': { primary: 'christian', secondary: 'traditional', percentage: 70, notes: 'Catholic majority. Traditional healers still respected.' },
  'chagga': { primary: 'christian', percentage: 90, notes: 'Lutheran and Catholic. Among first Tanzanians to convert.' },
  'haya': { primary: 'christian', percentage: 85, notes: 'Catholic majority, White Fathers mission influence.' },
  
  // Senegal
  'wolof': { primary: 'muslim', percentage: 95, notes: 'Sufi Islam (Mouride, Tijani brotherhoods). Strong Sufi sheikh tradition.' },
  'serer': { primary: 'mixed', notes: 'Traditional Serer religion still practiced. 30% Muslim, 30% Christian, 40% traditional.' },
  'fulani_sn': { primary: 'muslim', percentage: 98, notes: 'Sunni Islam. Historical role in spreading Islam in West Africa.' },
  
  // Rwanda & Burundi
  'hutu_tutsi': { primary: 'christian', percentage: 85, secondary: 'traditional', notes: 'Catholic majority (65%), Protestant (25%), some traditional beliefs. Post-genocide focus on national unity.' },
  
  // Uganda
  'baganda': { primary: 'christian', percentage: 80, secondary: 'muslim', notes: 'Catholic and Anglican majority. Muslim minority (15%). Traditional Balubaale beliefs persist.' },

  // Zimbabwe (new entries)
  'shona': { primary: 'christian', secondary: 'traditional', percentage: 80, notes: 'Christian majority with syncretic practices. Ancestor veneration remains important.' },
  'ndebele': { primary: 'christian', percentage: 75, secondary: 'traditional', notes: 'Mix of Christian and traditional beliefs. Strong cultural practices.' },
};

interface DetectionOptions {
  timeOfBirth?: string;
  region?: string;
  build?: string;
  personality?: string;
  country?: string;
}

export function detectTribe(name: string, options?: DetectionOptions | string): DetectionResult {
  // Handle legacy single argument
  const opts: DetectionOptions = typeof options === 'string' 
    ? { timeOfBirth: options } 
    : options || {};
  
  const { timeOfBirth, region, build, personality, country } = opts;
  
  // Normalize name: lowercase, trim, remove extra spaces and special characters
  const normalizedName = name.toLowerCase().trim().replace(/\s+/g, '').replace(/['-]/g, '');
  
  // Also check common spelling variations
  const nameVariations = [
    normalizedName,
    normalizedName.replace(/ch/g, 'c'),  // Achieng -> Acieng
    normalizedName.replace(/c([^h])/g, 'ch$1'), // Acieng -> Achieng
    normalizedName.replace(/w/g, 'u'),   // Wanjiku -> Uanjiku (less common)
    normalizedName.replace(/j/g, 'g'),   // Juma -> Guma
    normalizedName.replace(/g/g, 'j'),   // Githinji -> Jithinji
  ];
  const predictions: TribeResult[] = [];
  
  // Filter tribes by country if specified
  let countryTribes = country && country !== 'ALL' 
    ? tribesData.tribes.filter(t => (t.countries as string[] | undefined)?.includes(country))
    : tribesData.tribes;
  
  // Fallback to all tribes if no tribes found for the country
  if (countryTribes.length === 0) {
    countryTribes = tribesData.tribes;
  }
  
  // 0. Religious name detection
  let religiousInfluence: { religion: string; weight: number; origin?: string } | null = null;
  
  // Check exact religious name match
  if (religiousNamePatterns[normalizedName]) {
    religiousInfluence = religiousNamePatterns[normalizedName][0];
  }
  
  // Check Islamic prefixes
  if (!religiousInfluence) {
    for (const prefix of islamicPrefixes) {
      if (normalizedName.startsWith(prefix)) {
        religiousInfluence = { religion: 'muslim', weight: 0.85, origin: `Name starts with "${prefix}" - Islamic naming convention` };
        break;
      }
    }
  }
  
  // Check Islamic suffixes
  if (!religiousInfluence) {
    for (const suffix of islamicSuffixes) {
      if (normalizedName.endsWith(suffix)) {
        religiousInfluence = { religion: 'muslim', weight: 0.90, origin: `Name ends with "${suffix}" - Islamic naming convention` };
        break;
      }
    }
  }
  
  // 1. Direct name match (highest confidence) - check all variations
  let directMatch = nameDatabase[normalizedName];
  let matchedVariation = normalizedName;
  
  // Try spelling variations if no exact match
  if (!directMatch) {
    for (const variation of nameVariations) {
      if (nameDatabase[variation]) {
        directMatch = nameDatabase[variation];
        matchedVariation = variation;
        break;
      }
    }
  }
  
  if (directMatch) {
    const tribe = countryTribes.find(t => t.id === directMatch.tribe) || tribesData.tribes.find(t => t.id === directMatch.tribe);
    if (tribe) {
      const matchDetails = [
        `"${name}" is a verified ${tribe.name} name`,
        `This name is commonly used among the ${tribe.name} people`,
        directMatch.meaning ? `The name carries cultural significance in ${tribe.name} tradition` : '',
      ].filter(Boolean);
      
      // Add religious context if detected
      if (religiousInfluence) {
        matchDetails.push(`🕊️ Religious influence: ${religiousInfluence.religion.charAt(0).toUpperCase() + religiousInfluence.religion.slice(1)} origin${religiousInfluence.origin ? ` - ${religiousInfluence.origin}` : ''}`);
      }
      
      // Slightly lower confidence if matched via variation
      const confidence = matchedVariation === normalizedName ? 95 : 90;
      
      predictions.push({
        tribe,
        confidence,
        matchReason: matchedVariation === normalizedName ? 'Exact name match in database' : 'Name match (spelling variation)',
        matchDetails,
        nameMeaning: directMatch.meaning,
      });
    }
  }
  
  // Calculate scores for all tribes
  const tribeScores: Record<string, { score: number; reasons: string[] }> = {};
  
  // 2. Prefix pattern matching (sorted by length for longest match first)
  const sortedPrefixes = Object.keys(prefixPatterns).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (normalizedName.startsWith(prefix)) {
      const matches = prefixPatterns[prefix];
      for (const match of matches) {
        if (!tribeScores[match.tribe]) {
          tribeScores[match.tribe] = { score: 0, reasons: [] };
        }
        const currentScore = tribeScores[match.tribe].score;
        const prefixBonus = prefix.length * 8;
        const newScore = match.weight * 100 + prefixBonus;
        if (newScore > currentScore) {
          tribeScores[match.tribe].score = newScore;
          const tribeName = tribesData.tribes.find(t => t.id === match.tribe)?.name || match.tribe;
          tribeScores[match.tribe].reasons = [
            `Name starts with "${prefix.toUpperCase()}" - a characteristic ${tribeName} prefix`,
            `${Math.round(match.weight * 100)}% of names with this prefix are ${tribeName}`,
          ];
        }
      }
      break; // Only use longest matching prefix
    }
  }
  
  // 3. Suffix pattern matching
  const sortedSuffixes = Object.keys(suffixPatterns).sort((a, b) => b.length - a.length);
  for (const suffix of sortedSuffixes) {
    if (normalizedName.endsWith(suffix)) {
      const matches = suffixPatterns[suffix];
      for (const match of matches) {
        if (!tribeScores[match.tribe]) {
          tribeScores[match.tribe] = { score: 0, reasons: [] };
        }
        const suffixBonus = suffix.length * 5;
        tribeScores[match.tribe].score += match.weight * 30 + suffixBonus;
        const tribeName = tribesData.tribes.find(t => t.id === match.tribe)?.name || match.tribe;
        tribeScores[match.tribe].reasons.push(
          `Name ending "-${suffix}" is common in ${tribeName} names`
        );
      }
      break;
    }
  }
  
  // 4. Region matching (new!)
  if (region && regionTribeMapping[region]) {
    for (const match of regionTribeMapping[region]) {
      if (!tribeScores[match.tribe]) {
        tribeScores[match.tribe] = { score: 0, reasons: [] };
      }
      const regionBonus = match.weight * 35;
      tribeScores[match.tribe].score += regionBonus;
      const tribeName = tribesData.tribes.find(t => t.id === match.tribe)?.name || match.tribe;
      tribeScores[match.tribe].reasons.push(
        `From ${region.replace('-', ' ')} region - predominantly ${tribeName} area`
      );
    }
  }
  
  // 5. Build matching (new!)
  if (build && buildTribeMapping[build]) {
    for (const match of buildTribeMapping[build]) {
      if (!tribeScores[match.tribe]) {
        tribeScores[match.tribe] = { score: 0, reasons: [] };
      }
      const buildBonus = match.weight * 15;
      tribeScores[match.tribe].score += buildBonus;
      const tribeName = tribesData.tribes.find(t => t.id === match.tribe)?.name || match.tribe;
      tribeScores[match.tribe].reasons.push(
        `${build.replace('-', ' ')} build - common stereotype for ${tribeName}`
      );
    }
  }
  
  // 6. Personality matching (new!)
  if (personality && personalityTribeMapping[personality]) {
    for (const match of personalityTribeMapping[personality]) {
      if (!tribeScores[match.tribe]) {
        tribeScores[match.tribe] = { score: 0, reasons: [] };
      }
      const personalityBonus = match.weight * 12;
      tribeScores[match.tribe].score += personalityBonus;
      const tribeName = tribesData.tribes.find(t => t.id === match.tribe)?.name || match.tribe;
      tribeScores[match.tribe].reasons.push(
        `"${personality.replace('-', ' ')}" personality - associated with ${tribeName} stereotypes`
      );
    }
  }
  
  // 7. Time of birth matching - improved with better time normalization
  if (timeOfBirth) {
    const normalizedTime = timeOfBirth.toLowerCase().trim();
    for (const tribe of countryTribes) {
      const timeNames = tribe.timeBasedNames as Record<string, string[]>;
      if (!timeNames) continue;
      
      for (const [timeKey, names] of Object.entries(timeNames)) {
        if (!Array.isArray(names)) continue;
        
        const timeVariants = timeMapping[timeKey] || [timeKey];
        const matchesTime = timeVariants.some(t => 
          normalizedTime.includes(t) || t.includes(normalizedTime)
        );
        
        if (matchesTime) {
          // Check if name matches any time-based names
          const matchingName = names.find(n => {
            const lowerN = n.toLowerCase();
            // Exact match or significant prefix overlap (at least 4 chars)
            return normalizedName === lowerN || 
              (lowerN.length >= 4 && normalizedName.startsWith(lowerN.slice(0, 4))) ||
              (normalizedName.length >= 4 && lowerN.startsWith(normalizedName.slice(0, 4)));
          });
          
          if (matchingName) {
            if (!tribeScores[tribe.id]) {
              tribeScores[tribe.id] = { score: 0, reasons: [] };
            }
            // Boost score more significantly for time match
            tribeScores[tribe.id].score += 35;
            tribeScores[tribe.id].reasons.push(
              `Born in the ${timeOfBirth} - matches ${tribe.name} naming tradition for ${timeKey}-born children (e.g., "${matchingName}")`
            );
          }
        }
      }
    }
  }
  
  // 8. Check common names in tribes (use country-filtered tribes)
  for (const tribe of countryTribes) {
    const allNames = [...tribe.commonNames.female, ...tribe.commonNames.male].map(n => n.toLowerCase());
    for (const tribeName of allNames) {
      if (normalizedName === tribeName) {
        if (!tribeScores[tribe.id]) {
          tribeScores[tribe.id] = { score: 0, reasons: [] };
        }
        tribeScores[tribe.id].score = Math.max(tribeScores[tribe.id].score, 88);
        tribeScores[tribe.id].reasons = [
          `"${name}" is a well-known ${tribe.name} name`,
          `Found in our database of common ${tribe.name} names`,
        ];
      } else if (tribeName.startsWith(normalizedName) || normalizedName.startsWith(tribeName)) {
        if (!tribeScores[tribe.id]) {
          tribeScores[tribe.id] = { score: 0, reasons: [] };
        }
        const similarity = Math.min(normalizedName.length, tribeName.length) / Math.max(normalizedName.length, tribeName.length);
        const partialScore = 50 * similarity;
        if (partialScore > tribeScores[tribe.id].score * 0.5) {
          tribeScores[tribe.id].score += partialScore;
          tribeScores[tribe.id].reasons.push(
            `Similar to ${tribe.name} name "${tribeName}"`
          );
        }
      }
    }
  }
  
  // 9. Religious influence bonus - boost tribes with matching religious background
  if (religiousInfluence) {
    for (const [tribeId, religionData] of Object.entries(tribeReligiousInfluence)) {
      const matchesReligion = religionData.primary === religiousInfluence.religion ||
        religionData.secondary === religiousInfluence.religion;
      
      if (matchesReligion) {
        // Only add if tribe is in country filter
        const tribe = countryTribes.find(t => t.id === tribeId);
        if (tribe) {
          if (!tribeScores[tribeId]) {
            tribeScores[tribeId] = { score: 0, reasons: [] };
          }
          const religionBonus = religionData.primary === religiousInfluence.religion ? 20 : 10;
          tribeScores[tribeId].score += religionBonus;
          const percentage = religionData.percentage ? `(~${religionData.percentage}% ${religiousInfluence.religion})` : '';
          tribeScores[tribeId].reasons.push(
            `🕊️ Religious alignment: ${tribe.name} is predominantly ${religionData.primary} ${percentage}`
          );
        }
      }
    }
  }
  
  // Convert scores to predictions (only include country-filtered tribes)
  for (const [tribeId, data] of Object.entries(tribeScores)) {
    if (!predictions.some(p => p.tribe.id === tribeId) && data.score > 25) {
      const tribe = countryTribes.find(t => t.id === tribeId);
      if (tribe) {
        // Add religious influence to match details if detected
        const matchDetails = [...data.reasons.slice(0, 4)];
        if (religiousInfluence && !matchDetails.some(d => d.includes('Religious'))) {
          matchDetails.push(`🕊️ Name suggests ${religiousInfluence.religion} influence${religiousInfluence.origin ? ` - ${religiousInfluence.origin}` : ''}`);
        }
        
        predictions.push({
          tribe,
          confidence: Math.min(Math.round(data.score * 0.9), 92), // Scale down slightly for pattern matches
          matchReason: data.reasons[0] || 'Pattern matching based on name characteristics',
          matchDetails: matchDetails.slice(0, 5),
        });
      }
    }
  }
  
  // Sort by confidence
  predictions.sort((a, b) => b.confidence - a.confidence);
  
  // If no predictions, provide options from country-filtered tribes
  if (predictions.length === 0) {
    const topTribes = countryTribes.slice(0, 3);
    const countryName = country ? (tribesData as any).countries?.find((c: any) => c.code === country)?.name || 'Africa' : 'Africa';
    for (const tribe of topTribes) {
      const matchDetails = [
        'This name doesn\'t match known patterns in our database',
        `Showing ${tribe.name} as a major tribe${country ? ` in ${countryName}` : ''}`,
        'Try adding more clues (region, build, personality) for better accuracy',
      ];
      
      // Add religious note if detected
      if (religiousInfluence) {
        matchDetails.push(`🕊️ Name suggests ${religiousInfluence.religion} origin - may indicate religious heritage`);
      }
      
      predictions.push({
        tribe,
        confidence: 15,
        matchReason: 'Unable to determine tribe from name',
        matchDetails,
      });
    }
  }
  
  return {
    predictions: predictions.slice(0, 5),
    inputName: name,
    timeOfBirth,
  };
}

export function getAllTribes() {
  const tribes = (tribesData as any).tribes || [];

  const mergeArrays = <T,>(a: T[] = [], b: T[] = []) => {
    return Array.from(new Set([...a, ...b].filter(Boolean as any)));
  };

  const mergeByKey = <T extends Record<string, any>>(a: T[] = [], b: T[] = [], key: keyof T) => {
    const map = new Map<string, T>();
    for (const item of [...a, ...b]) {
      const k = String(item?.[key] ?? '');
      if (!k) continue;
      map.set(k, item);
    }
    return Array.from(map.values());
  };

  const mergeTribes = (a: any, b: any) => {
    const merged: any = { ...b, ...a };

    merged.countries = mergeArrays(a?.countries, b?.countries);
    merged.counties = mergeArrays(a?.counties, b?.counties);
    merged.namePrefixes = mergeArrays(a?.namePrefixes, b?.namePrefixes);
    merged.stereotypes = mergeArrays(a?.stereotypes, b?.stereotypes);
    merged.culturalTraits = mergeArrays(a?.culturalTraits, b?.culturalTraits);
    merged.funFacts = mergeArrays(a?.funFacts, b?.funFacts);

    merged.commonNames = {
      female: mergeArrays(a?.commonNames?.female, b?.commonNames?.female),
      male: mergeArrays(a?.commonNames?.male, b?.commonNames?.male),
    };

    merged.timeBasedNames = { ...(b?.timeBasedNames || {}) };
    for (const k of Object.keys(a?.timeBasedNames || {})) {
      merged.timeBasedNames[k] = mergeArrays(a.timeBasedNames?.[k], b.timeBasedNames?.[k]);
    }

    merged.greetings = mergeArrays(a?.greetings, b?.greetings);
    merged.famousPeople = mergeByKey(a?.famousPeople, b?.famousPeople, 'name');
    merged.gallery = mergeByKey(a?.gallery, b?.gallery, 'src');

    return merged;
  };

  const byKey = new Map<string, any>();
  for (const tribe of tribes) {
    const keyRaw = tribe?.id || tribe?.slug || tribe?.name;
    const key = String(keyRaw || '').toLowerCase().trim();
    if (!key) continue;

    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, tribe);
      continue;
    }

    byKey.set(key, mergeTribes(existing, tribe));
  }

  return Array.from(byKey.values());
}

export function getTribesByCountry(countryCode: string) {
  const tribes = getAllTribes();
  if (!countryCode || countryCode === 'ALL') return tribes;
  return tribes.filter(t => (t.countries as string[] | undefined)?.includes(countryCode));
}

export function getTribeById(id: string) {
  return getAllTribes().find(t => t.id === id);
}

export function getTribeBySlug(slug: string) {
  return getAllTribes().find(t => t.slug === slug || t.id === slug);
}

export function getCountries(): Country[] {
  return (tribesData as any).countries || [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' }
  ];
}

export function getCountryFacts(countryCode: string): string[] {
  const facts = (tribesData as any).countryFacts || {};
  return facts[countryCode] || facts['ALL'] || [];
}

export function getNameDatabase(): Record<string, { meaning: string; gender: 'male' | 'female' }> {
  return nameDatabase;
}

export function getTribeReligiousInfo(tribeId: string) {
  return tribeReligiousInfluence[tribeId] || null;
}

export function getReligiousNameInfo(name: string) {
  const normalized = name.toLowerCase().trim();
  return religiousNamePatterns[normalized] || null;
}