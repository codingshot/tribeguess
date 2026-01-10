import tribesData from '@/data/tribes.json';

export interface Person {
  id: string;
  name: string;
  role: string;
  wikipedia?: string | null;
  image?: string;
  tribeId: string;
  tribeName: string;
  tribeSlug: string;
  countries: string[];
  category: string;
  birthYear?: number;
  deathYear?: number;
}

// Category detection from role
function detectCategory(role: string): string {
  const roleLower = role.toLowerCase();
  
  if (roleLower.includes('president') || roleLower.includes('prime minister') || 
      roleLower.includes('governor') || roleLower.includes('minister') || 
      roleLower.includes('politician') || roleLower.includes('vice president') ||
      roleLower.includes('speaker') || roleLower.includes('senator') ||
      roleLower.includes('mp') || roleLower.includes('secretary')) {
    return 'Politics';
  }
  if (roleLower.includes('actor') || roleLower.includes('actress') || 
      roleLower.includes('oscar') || roleLower.includes('film')) {
    return 'Film & TV';
  }
  if (roleLower.includes('musician') || roleLower.includes('singer') || 
      roleLower.includes('artist') || roleLower.includes('rapper') ||
      roleLower.includes('music') || roleLower.includes('dj')) {
    return 'Music';
  }
  if (roleLower.includes('football') || roleLower.includes('athlete') || 
      roleLower.includes('runner') || roleLower.includes('marathon') ||
      roleLower.includes('olympic') || roleLower.includes('sports') ||
      roleLower.includes('boxer') || roleLower.includes('rugby')) {
    return 'Sports';
  }
  if (roleLower.includes('writer') || roleLower.includes('author') || 
      roleLower.includes('novelist') || roleLower.includes('poet') ||
      roleLower.includes('journalist') || roleLower.includes('literary')) {
    return 'Literature';
  }
  if (roleLower.includes('activist') || roleLower.includes('rights') || 
      roleLower.includes('nobel') || roleLower.includes('humanitarian') ||
      roleLower.includes('peace') || roleLower.includes('environmentalist')) {
    return 'Activism';
  }
  if (roleLower.includes('business') || roleLower.includes('entrepreneur') || 
      roleLower.includes('billionaire') || roleLower.includes('ceo') ||
      roleLower.includes('founder') || roleLower.includes('tycoon')) {
    return 'Business';
  }
  if (roleLower.includes('king') || roleLower.includes('queen') || 
      roleLower.includes('emperor') || roleLower.includes('chief') ||
      roleLower.includes('sultan') || roleLower.includes('laibon') ||
      roleLower.includes('royal') || roleLower.includes('traditional leader')) {
    return 'Royalty';
  }
  if (roleLower.includes('general') || roleLower.includes('commander') || 
      roleLower.includes('military') || roleLower.includes('warrior') ||
      roleLower.includes('revolutionary') || roleLower.includes('soldier')) {
    return 'Military';
  }
  if (roleLower.includes('scientist') || roleLower.includes('professor') || 
      roleLower.includes('academic') || roleLower.includes('researcher') ||
      roleLower.includes('paleontologist') || roleLower.includes('doctor')) {
    return 'Science & Academia';
  }
  if (roleLower.includes('religious') || roleLower.includes('bishop') || 
      roleLower.includes('priest') || roleLower.includes('imam') ||
      roleLower.includes('pastor') || roleLower.includes('archbishop')) {
    return 'Religion';
  }
  if (roleLower.includes('hero') || roleLower.includes('independence') || 
      roleLower.includes('resistance') || roleLower.includes('liberation') ||
      roleLower.includes('anti-colonial')) {
    return 'Historical';
  }
  
  return 'Notable Figure';
}

// Generate URL-friendly slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Cache for people to avoid repeated processing
let cachedPeople: Person[] | null = null;

// Extract all people from tribes data with deduplication
export function getAllPeople(): Person[] {
  if (cachedPeople) return cachedPeople;
  
  const peopleMap = new Map<string, Person>();
  const tribes = tribesData.tribes || [];
  
  tribes.forEach((tribe: any) => {
    if (tribe.famousPeople && Array.isArray(tribe.famousPeople)) {
      tribe.famousPeople.forEach((person: any) => {
        const id = generateSlug(person.name);
        
        // Only add if not already present (prevents duplicates)
        if (!peopleMap.has(id)) {
          peopleMap.set(id, {
            id,
            name: person.name,
            role: person.role,
            wikipedia: person.wikipedia,
            image: person.image,
            tribeId: tribe.id,
            tribeName: tribe.name,
            tribeSlug: tribe.slug,
            countries: tribe.countries || [],
            category: detectCategory(person.role),
            birthYear: person.birth,
            deathYear: person.death,
          });
        }
      });
    }
  });
  
  cachedPeople = Array.from(peopleMap.values());
  return cachedPeople;
}

// Get person by slug
export function getPersonBySlug(slug: string): Person | undefined {
  const allPeople = getAllPeople();
  return allPeople.find(p => p.id === slug);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const people = getAllPeople();
  const categories = new Set(people.map(p => p.category));
  return Array.from(categories).sort();
}

// Get all unique tribes that have people
export function getAllTribesWithPeople(): { slug: string; name: string }[] {
  const people = getAllPeople();
  const tribesMap = new Map<string, string>();
  
  people.forEach(p => {
    if (!tribesMap.has(p.tribeSlug)) {
      tribesMap.set(p.tribeSlug, p.tribeName);
    }
  });
  
  return Array.from(tribesMap.entries())
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Get people by tribe
export function getPeopleByTribe(tribeSlug: string): Person[] {
  const allPeople = getAllPeople();
  return allPeople.filter(p => p.tribeSlug === tribeSlug);
}

// Get count by category
export function getPeopleCountByCategory(): Record<string, number> {
  const people = getAllPeople();
  const counts: Record<string, number> = {};
  
  people.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  
  return counts;
}

// Get count by tribe
export function getPeopleCountByTribe(): Record<string, number> {
  const people = getAllPeople();
  const counts: Record<string, number> = {};
  
  people.forEach(p => {
    counts[p.tribeSlug] = (counts[p.tribeSlug] || 0) + 1;
  });
  
  return counts;
}
