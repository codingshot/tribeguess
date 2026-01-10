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

// Extract birth year from role if mentioned
function extractBirthYear(role: string): number | undefined {
  // Look for patterns like "(born 1990)" or "born 1990" or "(1990-" or "(1990 -"
  const bornMatch = role.match(/born\s*(\d{4})/i);
  if (bornMatch) return parseInt(bornMatch[1]);
  
  const yearRangeMatch = role.match(/\((\d{4})\s*[-–]/);
  if (yearRangeMatch) return parseInt(yearRangeMatch[1]);
  
  return undefined;
}

// Generate URL-friendly slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract all people from tribes data
export function getAllPeople(): Person[] {
  const people: Person[] = [];
  const tribes = tribesData.tribes || [];
  
  tribes.forEach((tribe: any) => {
    if (tribe.famousPeople && Array.isArray(tribe.famousPeople)) {
      tribe.famousPeople.forEach((person: any) => {
        const id = generateSlug(person.name);
        people.push({
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
          birthYear: extractBirthYear(person.role),
        });
      });
    }
  });
  
  return people;
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

// Get people by tribe
export function getPeopleByTribe(tribeSlug: string): Person[] {
  const allPeople = getAllPeople();
  return allPeople.filter(p => p.tribeSlug === tribeSlug);
}

// Search people
export function searchPeople(query: string, category?: string, country?: string): Person[] {
  let results = getAllPeople();
  
  if (query && query.length >= 2) {
    const searchLower = query.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.role.toLowerCase().includes(searchLower) ||
      p.tribeName.toLowerCase().includes(searchLower)
    );
  }
  
  if (category && category !== 'all') {
    results = results.filter(p => p.category === category);
  }
  
  if (country && country !== 'ALL') {
    results = results.filter(p => p.countries.includes(country));
  }
  
  return results;
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
