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
  
  // Luo prefixes
  'o': [{ tribe: 'luo', weight: 0.7 }, { tribe: 'kisii', weight: 0.3 }],
  'a': [{ tribe: 'luo', weight: 0.65 }],
  'ot': [{ tribe: 'luo', weight: 0.95 }],
  'od': [{ tribe: 'luo', weight: 0.95 }],
  'ok': [{ tribe: 'luo', weight: 0.9 }],
  'og': [{ tribe: 'luo', weight: 0.85 }],
  'om': [{ tribe: 'luo', weight: 0.9 }],
  'ow': [{ tribe: 'luo', weight: 0.9 }],
  'ach': [{ tribe: 'luo', weight: 0.95 }],
  'adh': [{ tribe: 'luo', weight: 0.95 }],
  'ati': [{ tribe: 'luo', weight: 0.95 }],
  'api': [{ tribe: 'luo', weight: 0.95 }],
  'any': [{ tribe: 'luo', weight: 0.9 }],
  
  // Luhya prefixes
  'na': [{ tribe: 'luhya', weight: 0.85 }],
  'naf': [{ tribe: 'luhya', weight: 0.95 }],
  'nak': [{ tribe: 'luhya', weight: 0.9 }],
  'nal': [{ tribe: 'luhya', weight: 0.9 }],
  'nas': [{ tribe: 'luhya', weight: 0.9 }],
  'ne': [{ tribe: 'luhya', weight: 0.9 }],
  'nek': [{ tribe: 'luhya', weight: 0.95 }],
  'nel': [{ tribe: 'luhya', weight: 0.9 }],
  'we': [{ tribe: 'luhya', weight: 0.9 }],
  'waf': [{ tribe: 'luhya', weight: 0.95 }],
  'wek': [{ tribe: 'luhya', weight: 0.95 }],
  'was': [{ tribe: 'luhya', weight: 0.9 }],
  'bar': [{ tribe: 'luhya', weight: 0.85 }],
  'sim': [{ tribe: 'luhya', weight: 0.9 }],
  'shi': [{ tribe: 'luhya', weight: 0.85 }],
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
  'kib': [{ tribe: 'kalenjin', weight: 0.95 }],
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
  'kag': [{ tribe: 'meru', weight: 0.9 }],
  'kaw': [{ tribe: 'meru', weight: 0.9 }],
  'ga': [{ tribe: 'meru', weight: 0.8 }],
  'gac': [{ tribe: 'meru', weight: 0.95 }],
  'gat': [{ tribe: 'meru', weight: 0.95 }],
  'muk': [{ tribe: 'meru', weight: 0.7 }, { tribe: 'kikuyu', weight: 0.3 }],
  'mug': [{ tribe: 'meru', weight: 0.8 }],
  'mur': [{ tribe: 'meru', weight: 0.75 }, { tribe: 'kikuyu', weight: 0.25 }],
  'kir': [{ tribe: 'meru', weight: 0.8 }],
  'kob': [{ tribe: 'meru', weight: 0.9 }],
  'nki': [{ tribe: 'meru', weight: 0.9 }],
  'nka': [{ tribe: 'meru', weight: 0.9 }],
  
  // Coastal prefixes
  'ha': [{ tribe: 'coastal', weight: 0.85 }],
  'ham': [{ tribe: 'coastal', weight: 0.95 }],
  'has': [{ tribe: 'coastal', weight: 0.9 }],
  'hal': [{ tribe: 'coastal', weight: 0.9 }],
  'ju': [{ tribe: 'coastal', weight: 0.95 }],
  'jum': [{ tribe: 'coastal', weight: 0.98 }],
  'fa': [{ tribe: 'coastal', weight: 0.9 }],
  'fat': [{ tribe: 'coastal', weight: 0.95 }],
  'za': [{ tribe: 'coastal', weight: 0.9 }],
  'zai': [{ tribe: 'coastal', weight: 0.95 }],
  'ab': [{ tribe: 'coastal', weight: 0.85 }],
  'abd': [{ tribe: 'coastal', weight: 0.95 }],
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

interface DetectionOptions {
  timeOfBirth?: string;
  region?: string;
  build?: string;
  personality?: string;
}

export function detectTribe(name: string, options?: DetectionOptions | string): DetectionResult {
  // Handle legacy single argument
  const opts: DetectionOptions = typeof options === 'string' 
    ? { timeOfBirth: options } 
    : options || {};
  
  const { timeOfBirth, region, build, personality } = opts;
  
  const normalizedName = name.toLowerCase().trim().replace(/\s+/g, '');
  const predictions: TribeResult[] = [];
  
  // 1. Direct name match (highest confidence)
  const directMatch = nameDatabase[normalizedName];
  if (directMatch) {
    const tribe = tribesData.tribes.find(t => t.id === directMatch.tribe);
    if (tribe) {
      predictions.push({
        tribe,
        confidence: 95,
        matchReason: 'Exact name match in database',
        matchDetails: [
          `"${name}" is a verified ${tribe.name} name`,
          `This name is commonly used among the ${tribe.name} people`,
          directMatch.meaning ? `The name carries cultural significance in ${tribe.name} tradition` : '',
        ].filter(Boolean),
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
  
  // 7. Time of birth matching
  if (timeOfBirth) {
    const normalizedTime = timeOfBirth.toLowerCase().trim();
    for (const tribe of tribesData.tribes) {
      const timeNames = tribe.timeBasedNames as Record<string, string[]>;
      for (const [timeKey, names] of Object.entries(timeNames)) {
        const timeVariants = timeMapping[timeKey] || [timeKey];
        const matchesTime = timeVariants.some(t => 
          normalizedTime.includes(t) || t.includes(normalizedTime)
        );
        
        if (matchesTime) {
          const matchingName = names.find(n => 
            normalizedName === n.toLowerCase() || 
            normalizedName.includes(n.toLowerCase().slice(0, 3))
          );
          if (matchingName) {
            if (!tribeScores[tribe.id]) {
              tribeScores[tribe.id] = { score: 0, reasons: [] };
            }
            tribeScores[tribe.id].score += 25;
            tribeScores[tribe.id].reasons.push(
              `Born in the ${timeOfBirth} - matches ${tribe.name} naming tradition for ${timeKey}-born children`
            );
          }
        }
      }
    }
  }
  
  // 8. Check common names in tribes
  for (const tribe of tribesData.tribes) {
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
  
  // Convert scores to predictions
  for (const [tribeId, data] of Object.entries(tribeScores)) {
    if (!predictions.some(p => p.tribe.id === tribeId) && data.score > 25) {
      const tribe = tribesData.tribes.find(t => t.id === tribeId);
      if (tribe) {
        predictions.push({
          tribe,
          confidence: Math.min(Math.round(data.score), 92),
          matchReason: data.reasons[0] || 'Pattern matching based on name characteristics',
          matchDetails: data.reasons.slice(0, 4),
        });
      }
    }
  }
  
  // Sort by confidence
  predictions.sort((a, b) => b.confidence - a.confidence);
  
  // If no predictions, provide general options with low confidence
  if (predictions.length === 0) {
    const topTribes = tribesData.tribes.slice(0, 3);
    for (const tribe of topTribes) {
      predictions.push({
        tribe,
        confidence: 15,
        matchReason: 'Unable to determine tribe from name',
        matchDetails: [
          'This name doesn\'t match known patterns in our database',
          `Showing ${tribe.name} as one of Kenya's largest tribes`,
          'Try adding more clues (region, build, personality) for better accuracy',
        ],
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
  return tribesData.tribes;
}

export function getTribeById(id: string) {
  return tribesData.tribes.find(t => t.id === id);
}

export function getTribeBySlug(slug: string) {
  return tribesData.tribes.find(t => t.slug === slug || t.id === slug);
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