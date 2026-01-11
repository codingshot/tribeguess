import tribesData from '@/data/tribes.json';
import globalTribeNames from '@/data/globalTribeNames.json';
import { detectGlobalOrigin } from './globalOrigins';

export interface NameBreakdown {
  fullName: string;
  prefix?: { text: string; tribes: { name: string; percentage: number }[] };
  suffix?: { text: string; tribes: { name: string; percentage: number }[] };
  root?: { text: string; meaning?: string };
  religiousIndicator?: { type: string; note: string };
}

export interface SimilarName {
  name: string;
  tribe: string;
  tribeSlug: string;
  similarity: number;
}

export interface GlobalMatch {
  origin: string;
  region: string;
  confidence: number;
}

// Build prefix patterns from JSON data
function buildPrefixPatterns(): Record<string, { tribe: string; tribeName: string; weight: number }[]> {
  const patterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {};
  
  const regionData = globalTribeNames.prefixPatterns;
  for (const region of Object.values(regionData)) {
    for (const [tribeKey, data] of Object.entries(region)) {
      const tribeData = data as { prefixes: string[]; weight: number; notes?: string };
      const tribeName = tribeKey.charAt(0).toUpperCase() + tribeKey.slice(1).replace(/_/g, ' ');
      
      for (const prefix of tribeData.prefixes) {
        if (!patterns[prefix]) {
          patterns[prefix] = [];
        }
        patterns[prefix].push({ tribe: tribeKey, tribeName, weight: tribeData.weight });
      }
    }
  }
  
  // Additional manual entries for cross-tribe patterns
  const additionalPatterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {
    // East African patterns
    'achi': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.92 }],
    'odhi': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.95 }],
    'oti': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.92 }],
    'ony': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.90 }],
    'omu': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.88 }],
    'owi': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.88 }],
    'ayo': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.85 }, { tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.80 }],
    'aja': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.85 }],
    'ope': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.85 }],
    
    // Kikuyu patterns
    'wan': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.90 }],
    'njo': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.92 }],
    'kam': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'mum': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.87 }],
    'nge': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.85 }],
    'wai': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'nga': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.85 }],
    'kar': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.86 }],
    'mur': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.84 }],
    'git': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'kib': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.82 }, { tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.90 }],
    
    // Luhya patterns
    'naf': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.95 }],
    'waf': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.95 }],
    'nek': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.92 }],
    'was': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.90 }, { tribe: 'baganda', tribeName: 'Baganda', weight: 0.86 }],
    'wen': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.88 }],
    'buk': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.92 }],
    'mal': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.85 }],
    'sim': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.84 }],
    'kha': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.88 }],
    
    // Kalenjin patterns  
    'kip': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.96 }],
    'chep': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.96 }],
    'jer': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.92 }],
    // 'kib' moved to Kikuyu patterns with Kalenjin included
    'kos': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.88 }],
    'rot': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.90 }],
    'ber': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.85 }],
    'kir': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.88 }],
    'tan': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.85 }],
    'che': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.88 }],
    
    // Maasai patterns
    'ole': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.95 }],
    'eng': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.88 }],
    'nai': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.90 }],
    'par': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.85 }],
    'sen': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.88 }],
    'lei': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.86 }],
    'loi': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.88 }],
    'sai': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.84 }],
    'nto': [{ tribe: 'maasai', tribeName: 'Maasai', weight: 0.86 }],
    
    // Yoruba patterns
    'ade': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.93 }],
    'ola': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.92 }],
    'olu': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.94 }],
    'omo': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.90 }],
    'ife': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.88 }],
    'bab': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.90 }],
    'oba': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.88 }],
    'tit': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.85 }],
    'kem': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.82 }],
    
    // Igbo patterns
    'chi': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.90 }],
    'nne': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.92 }],
    'obi': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.90 }],
    'nwa': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.92 }],
    'udo': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.88 }],
    'eze': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.90 }],
    'ada': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.88 }],
    'uch': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.90 }],
    'nna': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.86 }],
    'nneka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.96 }],
    
    // Hausa patterns
    'abd': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.88 }, { tribe: 'somali', tribeName: 'Somali', weight: 0.85 }],
    'muh': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.86 }],
    'ali': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.82 }],
    'dan': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.90 }],
    'mai': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.88 }],
    'gar': [{ tribe: 'hausa', tribeName: 'Hausa', weight: 0.86 }],
    
    // Zulu patterns
    'sbu': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.92 }],
    'tho': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.90 }],
    'sip': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.92 }, { tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    'siz': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.90 }],
    'nko': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.88 }],
    'mdu': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.90 }],
    'lin': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.86 }, { tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.84 }],
    'muz': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.85 }],
    'zan': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.88 }],
    'nhl': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.92 }],
    
    // Xhosa patterns
    'tha': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.90 }],
    'nom': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.92 }],
    'lun': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    'vuy': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.90 }],
    'nol': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.92 }],
    'and': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.85 }],
    'sih': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    
    // Shona patterns
    'tai': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.90 }],
    'muk': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.88 }],
    'ten': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.92 }],
    'run': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.88 }],
    'tat': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.90 }],
    'tak': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.86 }],
    'tin': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.88 }, { tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.90 }],
    'zvi': [{ tribe: 'shona', tribeName: 'Shona', weight: 0.90 }],
    
    // Dinka patterns
    'den': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.95 }],
    'mab': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.93 }],
    'bol': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.90 }],
    'gat': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.88 }, { tribe: 'nuer', tribeName: 'Nuer', weight: 0.95 }],
    'ath': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.88 }],
    'may': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.86 }],
    'rin': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.84 }],
    'aku': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.90 }],
    'ach': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.85 }, { tribe: 'luo', tribeName: 'Luo', weight: 0.88 }],
    'agu': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.85 }],
    
    // Nuer patterns
    'rie': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.94 }],
    'kua': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.92 }],
    'dho': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.90 }],
    'rue': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.90 }],
    'tut': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.92 }],
    'lam': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.86 }],
    'wic': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.88 }],
    
    // Shilluk patterns
    'nyi': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.92 }, { tribe: 'nuer', tribeName: 'Nuer', weight: 0.85 }],
    'ret': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.96 }],
    'adi': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.88 }],
    'oko': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.90 }],
    'ago': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.86 }],
    'odo': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.88 }],
    'ale': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.84 }],
    
    // Kimbundu/Angolan patterns
    'nzi': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.92 }, { tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.90 }],
    'ngo': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.92 }],
    'mba': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.88 }, { tribe: 'kongo', tribeName: 'Kongo', weight: 0.86 }],
    'joa': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.85 }],
    'luk': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.86 }],
    'mfu': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.88 }],
    'ngi': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.86 }],
    'nda': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.84 }],
    'kim': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.88 }],
    'lut': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.86 }],
    'nku': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.88 }],
    'nta': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.84 }],
    
    // Ovimbundu patterns
    'sav': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.96 }],
    'tch': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.92 }],
    'umb': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.94 }],
    'lon': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.88 }],
    'kat': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.86 }],
    
    // Somali patterns
    'fat': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    'moh': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.85 }],
    'has': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.86 }],
    'mar': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.82 }],
    'fay': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    'ama': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.80 }],
    'caa': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.92 }],
    'abdi': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.95 }],
    'war': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    
    // Oromo patterns
    'gal': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.92 }],
    'tol': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.90 }],
    'cha': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.86 }],
    'bad': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.88 }],
    'gob': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.90 }],
    'mul': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.84 }],
    'bor': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.88 }],
    'gur': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.86 }],
    'wat': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.84 }],
    
    // Amhara patterns
    'hab': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.90 }],
    'get': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.92 }],
    'tes': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.90 }],
    'kif': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.88 }],
    'yoh': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.86 }],
    'sol': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.84 }],
    'geb': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.90 }],
    'mes': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.86 }],
    
    // Akan patterns
    'kof': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.94 }],
    'kwa': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.92 }],
    'aba': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.90 }],
    'yaa': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.92 }],
    'kwo': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.90 }],
    'afi': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.88 }],
    'adj': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.90 }],
    'kob': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.88 }],
    'nana': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.92 }],
    
    // Tuareg patterns
    // 'tin' moved to Shona patterns with Tuareg included
    'mou': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.86 }],
    'agh': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.92 }],
    'elm': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.88 }],
    'akh': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.86 }],
    'inl': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.84 }],
    'tam': [{ tribe: 'tuareg', tribeName: 'Tuareg', weight: 0.88 }],
    
    // Bambara patterns
    'sek': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.88 }],
    'mod': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.84 }],
    'mam': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.86 }],
    'sou': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.85 }],
    'bak': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.84 }],
    'fod': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.88 }],
    'sidi': [{ tribe: 'bambara', tribeName: 'Bambara', weight: 0.86 }],
    
    // Fang patterns
    'ess': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.90 }],
    'nze': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.92 }],
    'eko': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.88 }],
    'ond': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.86 }],
    'eye': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.88 }],
    'ebe': [{ tribe: 'fang', tribeName: 'Fang', weight: 0.86 }],
    
    // Luba patterns
    'kas': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.90 }],
    'cib': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.88 }],
    'kab': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.86 }],
    'tsh': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.88 }],
    'mwe': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.86 }],
    'sha': [{ tribe: 'luba', tribeName: 'Luba', weight: 0.84 }],
    
    // Baganda patterns
    'nak': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.94 }],
    'sse': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.92 }],
    'mus': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.88 }],
    // 'was' moved to Luhya patterns with Baganda included
    'nam': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.88 }],
    'nab': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.90 }],
    'lwe': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.86 }],
    
    // Swahili/Coastal patterns
    'mwa': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.90 }],
    'ham': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.86 }],
    'sal': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.84 }],
    'ras': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.82 }],
    'jum': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.88 }],
    'abdul': [{ tribe: 'swahili', tribeName: 'Swahili', weight: 0.88 }],
  };
  
  // Merge additional patterns
  for (const [prefix, tribes] of Object.entries(additionalPatterns)) {
    if (!patterns[prefix]) {
      patterns[prefix] = tribes;
    } else {
      // Merge without duplicates
      for (const tribe of tribes) {
        const existing = patterns[prefix].find(t => t.tribe === tribe.tribe);
        if (!existing) {
          patterns[prefix].push(tribe);
        }
      }
    }
  }
  
  return patterns;
}

// Build suffix patterns from JSON data
function buildSuffixPatterns(): Record<string, { tribe: string; tribeName: string; weight: number }[]> {
  const patterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {};
  
  const regionData = globalTribeNames.suffixPatterns;
  for (const region of Object.values(regionData)) {
    for (const [tribeKey, data] of Object.entries(region)) {
      const tribeData = data as { suffixes: string[]; weight: number };
      const tribeName = tribeKey.charAt(0).toUpperCase() + tribeKey.slice(1).replace(/_/g, ' ');
      
      for (const suffix of tribeData.suffixes) {
        if (!patterns[suffix]) {
          patterns[suffix] = [];
        }
        patterns[suffix].push({ tribe: tribeKey, tribeName, weight: tribeData.weight });
      }
    }
  }
  
  // Additional manual suffix entries
  const additionalPatterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {
    // Luo suffixes
    'ambo': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.92 }],
    'ieno': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.92 }],
    'iambo': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.94 }],
    'tieno': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.94 }],
    'chieng': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.95 }],
    'uongo': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.90 }],
    'rieko': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.88 }],
    'yore': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.86 }],
    'tore': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.86 }],
    
    // Kikuyu suffixes
    'iku': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.92 }],
    'eri': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'iri': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.86 }],
    'angi': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'ingi': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.86 }],
    'ongi': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.85 }],
    'uchi': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.88 }],
    'uthi': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.90 }],
    'itho': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.86 }],
    'umba': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.84 }],
    
    // Kalenjin suffixes
    'oge': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.96 }],
    'yot': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.96 }],
    'ich': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.92 }],
    'otich': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.95 }],
    'soi': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.90 }],
    'bett': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.94 }],
    'sang': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.90 }],
    'rono': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.92 }],
    'korir': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.94 }],
    'tanui': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.94 }],
    
    // Yoruba suffixes
    'tunde': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.96 }],
    'wale': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.94 }],
    'kemi': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.92 }],
    'funmi': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.94 }],
    'wole': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.92 }],
    'dele': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.90 }],
    'kola': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.90 }],
    'yemi': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.92 }],
    'bola': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.92 }],
    'sola': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.90 }],
    
    // Igbo suffixes
    'emeka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.98 }],
    'nneka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.98 }],
    'amaka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.96 }],
    'chukwu': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.96 }],
    'nweze': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.92 }],
    'okwu': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.90 }],
    'nkem': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.92 }],
    'ugochi': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.94 }],
    'chidi': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.92 }],
    
    // Zulu/Xhosa suffixes
    'swe': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.90 }],
    'lele': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.88 }],
    'mbali': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.92 }],
    'nkosi': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.94 }],
    'dwa': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.88 }],
    'iswe': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.90 }],
    'ngane': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.88 }],
    'thando': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.92 }, { tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.90 }],
    'banzi': [{ tribe: 'zulu', tribeName: 'Zulu', weight: 0.86 }],
    'isa': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.90 }],
    'ndwe': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.92 }],
    'vusa': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    'leli': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.86 }],
    'onga': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    'lumko': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.90 }],
    'lizo': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.88 }],
    'vuyo': [{ tribe: 'xhosa', tribeName: 'Xhosa', weight: 0.92 }],
    
    // Dinka/Nuer/Shilluk suffixes
    'bior': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.96 }],
    'uol': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.92 }],
    'dit': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.90 }],
    'iel': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.88 }],
    'iak': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.88 }],
    'lek': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.86 }],
    'awan': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.90 }],
    'kuei': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.88 }],
    'uoth': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.98 }],
    'luak': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.96 }],
    'iech': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.94 }],
    'uong': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.92 }],
    'ieny': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.90 }],
    'kang': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.92 }],
    'ilo': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.88 }],
    'ara': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.86 }],
    
    // Angolan suffixes
    'inga': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.92 }, { tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.90 }],
    'anda': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.92 }],
    'emba': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.88 }],
    'engo': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.86 }],
    'ongo': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.88 }],
    'ela': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.84 }],
    'ila': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.82 }],
    'ulu': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.84 }],
    'anga': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.86 }],
    'undu': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.98 }],
    'imbi': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.96 }],
    
    // Somali/Ethiopian suffixes
    'ddin': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.92 }],
    'llah': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.90 }, { tribe: 'swahili', tribeName: 'Swahili', weight: 0.85 }],
    'xad': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    'aan': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.86 }],
    'iyo': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    'aad': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.86 }],
    'oow': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.88 }],
    'iin': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.84 }],
    'aal': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.82 }],
    'ssa': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.90 }],
    'taa': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.88 }],
    'oma': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.86 }],
    'uma': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.84 }],
    'afa': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.86 }],
    'efa': [{ tribe: 'oromo', tribeName: 'Oromo', weight: 0.84 }],
    'ish': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.88 }],
    'work': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.92 }],
    'maryam': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.94 }],
    'selassie': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.96 }],
    'nega': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.88 }],
    'kidan': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.90 }],
    'hiwot': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.92 }],
    'genet': [{ tribe: 'amhara', tribeName: 'Amhara', weight: 0.90 }],
    
    // Great Lakes suffixes
    'imana': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.98 }],
    'ugaba': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.94 }],
    'neza': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.92 }],
    'ombe': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.88 }],
    'ungu': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.86 }],
    'amba': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.84 }],
    'enzi': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.86 }],
    'anzi': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.84 }],
    'mwe': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.90 }],
    'enyi': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.88 }],
    'onya': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.86 }],
    'yiga': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.88 }],
    'ajja': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.90 }],
    'unda': [{ tribe: 'baganda', tribeName: 'Baganda', weight: 0.86 }],
    
    // Akan suffixes
    'mensah': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.94 }],
    'quame': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.92 }],
    'atta': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.90 }],
    'ansu': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.88 }],
    'twum': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.90 }],
    'boateng': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.94 }],
    'asante': [{ tribe: 'akan', tribeName: 'Akan', weight: 0.96 }],
  };
  
  // Merge additional patterns
  for (const [suffix, tribes] of Object.entries(additionalPatterns)) {
    if (!patterns[suffix]) {
      patterns[suffix] = tribes;
    } else {
      for (const tribe of tribes) {
        const existing = patterns[suffix].find(t => t.tribe === tribe.tribe);
        if (!existing) {
          patterns[suffix].push(tribe);
        }
      }
    }
  }
  
  return patterns;
}

// Build patterns on module load
const prefixPatterns = buildPrefixPatterns();
const suffixPatterns = buildSuffixPatterns();

// Religious indicators from JSON
const islamicPrefixes = globalTribeNames.religiousPatterns.islamic.prefixes;
const islamicSuffixes = globalTribeNames.religiousPatterns.islamic.suffixes;
const christianIndicators = globalTribeNames.religiousPatterns.christian.prefixes;

/**
 * Get all names from the global tribe names index for reference
 */
export function getAllTribeNamesIndex(): Record<string, { male: string[]; female: string[] }> {
  return globalTribeNames.commonNames;
}

/**
 * Search the global tribe names index
 */
export function searchGlobalTribeNames(query: string): { name: string; tribe: string; gender: 'male' | 'female' }[] {
  const results: { name: string; tribe: string; gender: 'male' | 'female' }[] = [];
  const normalizedQuery = query.toLowerCase();
  
  for (const [tribe, names] of Object.entries(globalTribeNames.commonNames)) {
    const tribeNames = names as { male: string[]; female: string[] };
    
    for (const name of tribeNames.male) {
      if (name.toLowerCase().includes(normalizedQuery)) {
        results.push({ name, tribe, gender: 'male' });
      }
    }
    
    for (const name of tribeNames.female) {
      if (name.toLowerCase().includes(normalizedQuery)) {
        results.push({ name, tribe, gender: 'female' });
      }
    }
  }
  
  return results;
}

/**
 * Analyze a name and break it down into components
 */
export function analyzeNameBreakdown(name: string): NameBreakdown {
  const normalized = name.toLowerCase().trim().replace(/['-]/g, '');
  const breakdown: NameBreakdown = { fullName: name };
  
  // Find matching prefix
  const sortedPrefixes = Object.keys(prefixPatterns).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (normalized.startsWith(prefix)) {
      const matches = prefixPatterns[prefix];
      breakdown.prefix = {
        text: name.slice(0, prefix.length).toUpperCase(),
        tribes: matches.map(m => ({ name: m.tribeName, percentage: Math.round(m.weight * 100) }))
      };
      break;
    }
  }
  
  // Find matching suffix
  const sortedSuffixes = Object.keys(suffixPatterns).sort((a, b) => b.length - a.length);
  for (const suffix of sortedSuffixes) {
    if (normalized.endsWith(suffix)) {
      const matches = suffixPatterns[suffix];
      breakdown.suffix = {
        text: name.slice(-suffix.length).toUpperCase(),
        tribes: matches.map(m => ({ name: m.tribeName, percentage: Math.round(m.weight * 100) }))
      };
      break;
    }
  }
  
  // Extract root (middle part)
  if (breakdown.prefix || breakdown.suffix) {
    const prefixLen = breakdown.prefix?.text.length || 0;
    const suffixLen = breakdown.suffix?.text.length || 0;
    const rootText = name.slice(prefixLen, name.length - suffixLen);
    if (rootText.length > 0) {
      breakdown.root = { text: rootText.toLowerCase() };
    }
  } else {
    // No prefix/suffix found, the whole name is the root
    breakdown.root = { text: normalized };
  }
  
  // Check for religious indicators
  for (const prefix of islamicPrefixes) {
    if (normalized.startsWith(prefix)) {
      breakdown.religiousIndicator = { 
        type: 'Islamic origin', 
        note: `"${prefix}" prefix indicates Arabic/Islamic naming tradition` 
      };
      break;
    }
  }
  
  if (!breakdown.religiousIndicator) {
    for (const suffix of islamicSuffixes) {
      if (normalized.endsWith(suffix)) {
        breakdown.religiousIndicator = { 
          type: 'Islamic origin', 
          note: `"${suffix}" suffix means "of Allah/God"` 
        };
        break;
      }
    }
  }
  
  if (!breakdown.religiousIndicator) {
    for (const word of christianIndicators) {
      if (normalized.includes(word)) {
        breakdown.religiousIndicator = { 
          type: 'Christian origin', 
          note: 'This name reflects Christian virtue/Biblical influence' 
        };
        break;
      }
    }
  }
  
  return breakdown;
}

/**
 * Find similar names in the database
 */
export function findSimilarNames(inputName: string, limit: number = 6): SimilarName[] {
  const normalized = inputName.toLowerCase().trim();
  const similarNames: SimilarName[] = [];
  
  // Collect all names from all tribes
  for (const tribe of tribesData.tribes) {
    const allNames = [
      ...(tribe.commonNames?.female || []),
      ...(tribe.commonNames?.male || [])
    ];
    
    for (const name of allNames) {
      const nameLower = name.toLowerCase();
      const similarity = calculateSimilarity(normalized, nameLower);
      
      if (similarity > 0.4 && nameLower !== normalized) {
        similarNames.push({
          name,
          tribe: tribe.name,
          tribeSlug: tribe.slug || tribe.id,
          similarity
        });
      }
    }
  }
  
  // Sort by similarity and return top matches
  return similarNames
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Get global origin matches for a name
 */
export function getGlobalMatches(inputName: string): GlobalMatch[] {
  const result = detectGlobalOrigin(inputName);
  
  if (!result.origins || result.origins.length === 0) {
    return [];
  }
  
  return result.origins.slice(0, 3).map(origin => ({
    origin: origin.name,
    region: origin.region,
    confidence: Math.round(result.confidence)
  }));
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0 || len2 === 0) return 0;
  
  // Check for common prefix
  let commonPrefix = 0;
  const minLen = Math.min(len1, len2);
  for (let i = 0; i < minLen; i++) {
    if (str1[i] === str2[i]) {
      commonPrefix++;
    } else {
      break;
    }
  }
  
  // Check for common suffix
  let commonSuffix = 0;
  for (let i = 0; i < minLen - commonPrefix; i++) {
    if (str1[len1 - 1 - i] === str2[len2 - 1 - i]) {
      commonSuffix++;
    } else {
      break;
    }
  }
  
  // Calculate similarity based on common characters
  const commonChars = commonPrefix + commonSuffix;
  const maxLen = Math.max(len1, len2);
  
  // Levenshtein distance for more accuracy
  const distance = levenshteinDistance(str1, str2);
  const levenshteinSimilarity = 1 - (distance / maxLen);
  
  // Combine both metrics
  return (commonChars / maxLen) * 0.4 + levenshteinSimilarity * 0.6;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  if (m === 0) return n;
  if (n === 0) return m;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return dp[m][n];
}