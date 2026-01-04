import tribesData from '@/data/tribes.json';

// Extract all tribe names and slugs for linking
interface TribeInfo {
  name: string;
  slug: string;
}

// Build a map of tribe names to their slugs
const tribeMap: Map<string, string> = new Map();

// Helper to get all tribes from the data
const getAllTribes = (): TribeInfo[] => {
  const tribes: TribeInfo[] = [];
  
  // Traverse the tribes.json structure
  if (tribesData.tribes) {
    for (const tribe of tribesData.tribes as any[]) {
      if (tribe.name && tribe.slug) {
        tribes.push({ name: tribe.name, slug: tribe.slug });
        tribeMap.set(tribe.name.toLowerCase(), tribe.slug);
        
        // Also add common variations
        if (tribe.slug !== tribe.name.toLowerCase()) {
          tribeMap.set(tribe.slug.toLowerCase(), tribe.slug);
        }
      }
    }
  }
  
  return tribes;
};

// Initialize the tribe map
getAllTribes();

// Common tribe names that might appear in text
const KNOWN_TRIBES = [
  'Luo', 'Luhya', 'Kikuyu', 'Kalenjin', 'Kamba', 'Maasai', 'Meru', 'Kisii',
  'Yoruba', 'Igbo', 'Hausa', 'Fulani', 'Tiv', 'Ijaw', 'Kanuri',
  'Ashanti', 'Ewe', 'Fante', 'Akan', 'Ga',
  'Zulu', 'Xhosa', 'Ndebele', 'Sotho', 'Tswana', 'Venda', 'Pedi',
  'Oromo', 'Amhara', 'Tigray', 'Somali', 'Afar',
  'Chagga', 'Sukuma', 'Haya', 'Makonde',
  'Baganda', 'Banyankole', 'Basoga', 'Bakiga',
  'Tutsi', 'Hutu', 'Twa',
  'Bemba', 'Tonga', 'Lozi', 'Ngoni',
  'Shona', 'Matabele',
  'Himba', 'Herero', 'San', 'Khoisan',
  'Wolof', 'Serer', 'Mandinka', 'Fula',
  'Berber', 'Tuareg', 'Amazigh',
  'Dinka', 'Nuer', 'Shilluk',
  'Fang', 'Bubi', 'Kongo',
];

// Build regex pattern for tribe detection
const tribePattern = new RegExp(
  `\\b(${KNOWN_TRIBES.join('|')})\\b(?![^<]*>)`,
  'gi'
);

export const processTextWithTribeLinks = (text: string): string => {
  // Don't process if already contains links
  if (text.includes('<a ') || text.includes('href=')) {
    return text;
  }

  const processedTribes = new Set<string>();
  
  return text.replace(tribePattern, (match) => {
    const tribeLower = match.toLowerCase();
    const slug = tribeMap.get(tribeLower) || tribeLower;
    
    // Only link each tribe name once per text block
    if (processedTribes.has(tribeLower)) {
      return match;
    }
    processedTribes.add(tribeLower);
    
    return `<a href="/learn/${slug}" class="text-primary hover:underline font-medium">${match}</a>`;
  });
};

export const getTribeSlug = (tribeName: string): string | null => {
  return tribeMap.get(tribeName.toLowerCase()) || null;
};
