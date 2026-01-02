import tribesData from '@/data/tribes.json';

export interface TribeResult {
  tribe: typeof tribesData.tribes[0];
  confidence: number;
  matchReason: string;
  nameMeaning?: string;
}

export interface DetectionResult {
  predictions: TribeResult[];
  inputName: string;
  timeOfBirth?: string;
}

const nameDatabase: Record<string, { tribe: string; gender: 'male' | 'female'; meaning?: string }> = {
  // Kikuyu names
  'wanjiku': { tribe: 'kikuyu', gender: 'female', meaning: 'One of the nine daughters of Gikuyu and Mumbi' },
  'wangari': { tribe: 'kikuyu', gender: 'female', meaning: 'Leopard' },
  'njeri': { tribe: 'kikuyu', gender: 'female', meaning: 'One of the nine Kikuyu daughters' },
  'wambui': { tribe: 'kikuyu', gender: 'female', meaning: 'Singer of songs' },
  'muthoni': { tribe: 'kikuyu', gender: 'female', meaning: 'One who hides' },
  'nyambura': { tribe: 'kikuyu', gender: 'female', meaning: 'Born during the rains' },
  'wairimu': { tribe: 'kikuyu', gender: 'female', meaning: 'One of Gikuyu\'s daughters' },
  'wanjiru': { tribe: 'kikuyu', gender: 'female', meaning: 'Born at night' },
  'njoroge': { tribe: 'kikuyu', gender: 'male', meaning: 'One who herds' },
  'ngugi': { tribe: 'kikuyu', gender: 'male', meaning: 'Work/effort' },
  'kamau': { tribe: 'kikuyu', gender: 'male', meaning: 'Quiet warrior' },
  'mwangi': { tribe: 'kikuyu', gender: 'male', meaning: 'Rapid increase' },
  'kariuki': { tribe: 'kikuyu', gender: 'male', meaning: 'Reincarnated one' },
  'githinji': { tribe: 'kikuyu', gender: 'male', meaning: 'Slaughterer' },
  'waweru': { tribe: 'kikuyu', gender: 'male', meaning: 'Born of the plains' },
  'kimani': { tribe: 'kikuyu', gender: 'male', meaning: 'From the Mani clan' },
  
  // Luo names
  'achieng': { tribe: 'luo', gender: 'female', meaning: 'Born when sun is shining' },
  'adhiambo': { tribe: 'luo', gender: 'female', meaning: 'Born in the evening' },
  'awino': { tribe: 'luo', gender: 'female', meaning: 'Born during weeding season' },
  'auma': { tribe: 'luo', gender: 'female', meaning: 'Born face down' },
  'apiyo': { tribe: 'luo', gender: 'female', meaning: 'First-born of twins' },
  'atieno': { tribe: 'luo', gender: 'female', meaning: 'Born at night' },
  'anyango': { tribe: 'luo', gender: 'female', meaning: 'Born during famine' },
  'akoth': { tribe: 'luo', gender: 'female', meaning: 'Born during rainy season' },
  'odhiambo': { tribe: 'luo', gender: 'male', meaning: 'Born in the evening' },
  'otieno': { tribe: 'luo', gender: 'male', meaning: 'Born at night' },
  'ouma': { tribe: 'luo', gender: 'male', meaning: 'Born face down' },
  'onyango': { tribe: 'luo', gender: 'male', meaning: 'Born around midday' },
  'omondi': { tribe: 'luo', gender: 'male', meaning: 'Born early morning' },
  'okoth': { tribe: 'luo', gender: 'male', meaning: 'Born during rainy season' },
  'ogola': { tribe: 'luo', gender: 'male', meaning: 'Born during harvest' },
  'odongo': { tribe: 'luo', gender: 'male', meaning: 'Second-born of twins' },
  'ochieng': { tribe: 'luo', gender: 'male', meaning: 'Born when sun is shining' },
  
  // Luhya names
  'nafula': { tribe: 'luhya', gender: 'female', meaning: 'Born during rainy season' },
  'nekesa': { tribe: 'luhya', gender: 'female', meaning: 'Born during harvest' },
  'naliaka': { tribe: 'luhya', gender: 'female', meaning: 'Born during weeding' },
  'nasimiyu': { tribe: 'luhya', gender: 'female', meaning: 'Born during famine' },
  'nabwire': { tribe: 'luhya', gender: 'female', meaning: 'Born at night' },
  'wafula': { tribe: 'luhya', gender: 'male', meaning: 'Born during rainy season' },
  'wekesa': { tribe: 'luhya', gender: 'male', meaning: 'Born during harvest' },
  'barasa': { tribe: 'luhya', gender: 'male', meaning: 'Meeting place' },
  'simiyu': { tribe: 'luhya', gender: 'male', meaning: 'Born during dry season' },
  'shikuku': { tribe: 'luhya', gender: 'male', meaning: 'Born during hunger' },
  'waswa': { tribe: 'luhya', gender: 'male', meaning: 'First-born of twins' },
  'wanyonyi': { tribe: 'luhya', gender: 'male', meaning: 'Born with the cord around neck' },
  
  // Kamba names
  'mwikali': { tribe: 'kamba', gender: 'female', meaning: 'One who stays' },
  'nduku': { tribe: 'kamba', gender: 'female', meaning: 'Born at night' },
  'mueni': { tribe: 'kamba', gender: 'female', meaning: 'Visitor' },
  'mumbua': { tribe: 'kamba', gender: 'female', meaning: 'Born during the rains' },
  'syokau': { tribe: 'kamba', gender: 'female', meaning: 'Born during market day' },
  'kavata': { tribe: 'kamba', gender: 'female', meaning: 'Small one' },
  'mwende': { tribe: 'kamba', gender: 'female', meaning: 'Beloved one' },
  'mutua': { tribe: 'kamba', gender: 'male', meaning: 'One who helps' },
  'musyoka': { tribe: 'kamba', gender: 'male', meaning: 'Born during market day' },
  'kioko': { tribe: 'kamba', gender: 'male', meaning: 'Born in the morning' },
  'nzomo': { tribe: 'kamba', gender: 'male', meaning: 'Elephant' },
  'mutinda': { tribe: 'kamba', gender: 'male', meaning: 'Guardian' },
  'kyalo': { tribe: 'kamba', gender: 'male', meaning: 'From the village' },
  
  // Kalenjin names
  'chemutai': { tribe: 'kalenjin', gender: 'female', meaning: 'Born during honey harvesting' },
  'chepkoech': { tribe: 'kalenjin', gender: 'female', meaning: 'Born in the morning' },
  'chepkorir': { tribe: 'kalenjin', gender: 'female', meaning: 'Born near the river' },
  'jepkosgei': { tribe: 'kalenjin', gender: 'female', meaning: 'Born near the granary' },
  'jepchirchir': { tribe: 'kalenjin', gender: 'female', meaning: 'Born during a good season' },
  'chebet': { tribe: 'kalenjin', gender: 'female', meaning: 'Born in the afternoon' },
  'kipchoge': { tribe: 'kalenjin', gender: 'male', meaning: 'Born near the granary' },
  'kibet': { tribe: 'kalenjin', gender: 'male', meaning: 'Born in the afternoon' },
  'cheruiyot': { tribe: 'kalenjin', gender: 'male', meaning: 'One who clears the path' },
  'rotich': { tribe: 'kalenjin', gender: 'male', meaning: 'Born during planting' },
  'kiptoo': { tribe: 'kalenjin', gender: 'male', meaning: 'Born at night' },
  'kiplagat': { tribe: 'kalenjin', gender: 'male', meaning: 'Born at lunch time' },
  'kosgei': { tribe: 'kalenjin', gender: 'male', meaning: 'Near the granary' },
  
  // Kisii names
  'nyaboke': { tribe: 'kisii', gender: 'female', meaning: 'Born during harvest season' },
  'kemunto': { tribe: 'kisii', gender: 'female', meaning: 'Born during cultivation' },
  'kerubo': { tribe: 'kisii', gender: 'female', meaning: 'Born during planting' },
  'moraa': { tribe: 'kisii', gender: 'female', meaning: 'Born during the rains' },
  'kwamboka': { tribe: 'kisii', gender: 'female', meaning: 'Born during cattle movement' },
  'gesare': { tribe: 'kisii', gender: 'female', meaning: 'From Gesare area' },
  'ongeri': { tribe: 'kisii', gender: 'male', meaning: 'Warrior' },
  'momanyi': { tribe: 'kisii', gender: 'male', meaning: 'One who stays' },
  'bosire': { tribe: 'kisii', gender: 'male', meaning: 'From Bosire clan' },
  'nyachae': { tribe: 'kisii', gender: 'male', meaning: 'Born during dry season' },
  'makori': { tribe: 'kisii', gender: 'male', meaning: 'One who was awaited' },
  
  // Meru names
  'kagwiria': { tribe: 'meru', gender: 'female', meaning: 'Born in the afternoon' },
  'kawira': { tribe: 'meru', gender: 'female', meaning: 'Born at dawn' },
  'gacheri': { tribe: 'meru', gender: 'female', meaning: 'One who laughs' },
  'kanini': { tribe: 'meru', gender: 'female', meaning: 'Small one' },
  'gatwiri': { tribe: 'meru', gender: 'female', meaning: 'Born during dry season' },
  'kirimi': { tribe: 'meru', gender: 'male', meaning: 'Farmer' },
  'mukiri': { tribe: 'meru', gender: 'male', meaning: 'The listener' },
  'muthomi': { tribe: 'meru', gender: 'male', meaning: 'Reader' },
  'njeru': { tribe: 'meru', gender: 'male', meaning: 'Born at night' },
  'mugambi': { tribe: 'meru', gender: 'male', meaning: 'Brave one' },
  'murungi': { tribe: 'meru', gender: 'male', meaning: 'Good one' },
  
  // Coastal names
  'mwanaisha': { tribe: 'coastal', gender: 'female', meaning: 'Child of life' },
  'fatuma': { tribe: 'coastal', gender: 'female', meaning: 'Weaned child (Arabic origin)' },
  'zainab': { tribe: 'coastal', gender: 'female', meaning: 'Fragrant flower (Arabic origin)' },
  'khadija': { tribe: 'coastal', gender: 'female', meaning: 'Early baby (Arabic origin)' },
  'amina': { tribe: 'coastal', gender: 'female', meaning: 'Trustworthy (Arabic origin)' },
  'halima': { tribe: 'coastal', gender: 'female', meaning: 'Patient (Arabic origin)' },
  'hamisi': { tribe: 'coastal', gender: 'male', meaning: 'Born on Thursday' },
  'jumaa': { tribe: 'coastal', gender: 'male', meaning: 'Born on Friday' },
  'salim': { tribe: 'coastal', gender: 'male', meaning: 'Safe/peaceful (Arabic origin)' },
  'rashid': { tribe: 'coastal', gender: 'male', meaning: 'Rightly guided (Arabic origin)' },
  'kazungu': { tribe: 'coastal', gender: 'male', meaning: 'Born during European times' },
  'karisa': { tribe: 'coastal', gender: 'male', meaning: 'Born during famine' },
  'omar': { tribe: 'coastal', gender: 'male', meaning: 'Long-lived (Arabic origin)' },
};

const prefixPatterns: Record<string, { tribe: string; weight: number }[]> = {
  'wa': [{ tribe: 'kikuyu', weight: 0.7 }, { tribe: 'luhya', weight: 0.3 }],
  'nj': [{ tribe: 'kikuyu', weight: 0.8 }, { tribe: 'meru', weight: 0.2 }],
  'ng': [{ tribe: 'kikuyu', weight: 0.9 }],
  'o': [{ tribe: 'luo', weight: 0.85 }, { tribe: 'kisii', weight: 0.15 }],
  'a': [{ tribe: 'luo', weight: 0.7 }],
  'ot': [{ tribe: 'luo', weight: 0.95 }],
  'od': [{ tribe: 'luo', weight: 0.95 }],
  'na': [{ tribe: 'luhya', weight: 0.8 }],
  'ne': [{ tribe: 'luhya', weight: 0.85 }],
  'we': [{ tribe: 'luhya', weight: 0.9 }],
  'mu': [{ tribe: 'kamba', weight: 0.5 }, { tribe: 'kikuyu', weight: 0.3 }, { tribe: 'meru', weight: 0.2 }],
  'nz': [{ tribe: 'kamba', weight: 0.9 }],
  'ky': [{ tribe: 'kamba', weight: 0.85 }],
  'ki': [{ tribe: 'kalenjin', weight: 0.7 }, { tribe: 'kamba', weight: 0.2 }],
  'kip': [{ tribe: 'kalenjin', weight: 0.95 }],
  'che': [{ tribe: 'kalenjin', weight: 0.95 }],
  'jep': [{ tribe: 'kalenjin', weight: 0.95 }],
  'ro': [{ tribe: 'kalenjin', weight: 0.8 }],
  'nya': [{ tribe: 'kisii', weight: 0.7 }, { tribe: 'kikuyu', weight: 0.2 }],
  'ke': [{ tribe: 'kisii', weight: 0.75 }],
  'bo': [{ tribe: 'kisii', weight: 0.8 }],
  'ka': [{ tribe: 'meru', weight: 0.5 }, { tribe: 'kikuyu', weight: 0.3 }],
  'ga': [{ tribe: 'meru', weight: 0.7 }],
  'ha': [{ tribe: 'coastal', weight: 0.8 }],
  'ju': [{ tribe: 'coastal', weight: 0.9 }],
  'fa': [{ tribe: 'coastal', weight: 0.85 }],
  'za': [{ tribe: 'coastal', weight: 0.9 }],
  'ab': [{ tribe: 'coastal', weight: 0.8 }],
};

export function detectTribe(name: string, timeOfBirth?: string): DetectionResult {
  const normalizedName = name.toLowerCase().trim();
  const predictions: TribeResult[] = [];
  
  // Direct name match (highest confidence)
  const directMatch = nameDatabase[normalizedName];
  if (directMatch) {
    const tribe = tribesData.tribes.find(t => t.id === directMatch.tribe);
    if (tribe) {
      predictions.push({
        tribe,
        confidence: 95,
        matchReason: 'Exact name match in database',
        nameMeaning: directMatch.meaning,
      });
    }
  }
  
  // Prefix pattern matching
  const tribeScores: Record<string, number> = {};
  
  for (const [prefix, matches] of Object.entries(prefixPatterns)) {
    if (normalizedName.startsWith(prefix)) {
      for (const match of matches) {
        const currentScore = tribeScores[match.tribe] || 0;
        const prefixLength = prefix.length;
        const bonus = prefixLength * 10; // Longer prefix = higher confidence
        tribeScores[match.tribe] = Math.max(currentScore, match.weight * 100 + bonus);
      }
    }
  }
  
  // Time of birth matching
  if (timeOfBirth) {
    for (const tribe of tribesData.tribes) {
      const timeNames = tribe.timeBasedNames as Record<string, string[]>;
      for (const [time, names] of Object.entries(timeNames)) {
        if (time.includes(timeOfBirth.toLowerCase()) || timeOfBirth.toLowerCase().includes(time)) {
          const matchingName = names.find(n => normalizedName.includes(n.toLowerCase()));
          if (matchingName) {
            const currentScore = tribeScores[tribe.id] || 0;
            tribeScores[tribe.id] = currentScore + 15;
          }
        }
      }
    }
  }
  
  // Check common names in tribes
  for (const tribe of tribesData.tribes) {
    const allNames = [...tribe.commonNames.female, ...tribe.commonNames.male].map(n => n.toLowerCase());
    for (const tribeName of allNames) {
      if (normalizedName === tribeName || tribeName.includes(normalizedName) || normalizedName.includes(tribeName)) {
        const similarity = normalizedName === tribeName ? 85 : 65;
        const currentScore = tribeScores[tribe.id] || 0;
        tribeScores[tribe.id] = Math.max(currentScore, similarity);
      }
    }
  }
  
  // Convert scores to predictions
  for (const [tribeId, score] of Object.entries(tribeScores)) {
    if (!predictions.some(p => p.tribe.id === tribeId)) {
      const tribe = tribesData.tribes.find(t => t.id === tribeId);
      if (tribe && score > 30) {
        predictions.push({
          tribe,
          confidence: Math.min(score, 90),
          matchReason: 'Pattern matching based on name characteristics',
        });
      }
    }
  }
  
  // Sort by confidence
  predictions.sort((a, b) => b.confidence - a.confidence);
  
  // If no predictions, provide general options
  if (predictions.length === 0) {
    const topTribes = tribesData.tribes.slice(0, 3);
    for (const tribe of topTribes) {
      predictions.push({
        tribe,
        confidence: 20,
        matchReason: 'Unable to determine - showing most common tribes',
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
