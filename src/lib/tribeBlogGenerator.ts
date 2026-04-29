// Auto-generates blog posts from tribe data for tribes that don't have a dedicated blog post
import tribesData from '@/data/tribes.json';
import type { BlogPost, ContentSection } from '@/data/blogPosts';

const regionGradients: Record<string, string> = {
  east: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  west: 'bg-gradient-to-br from-amber-500 to-orange-600',
  southern: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  central: 'bg-gradient-to-br from-green-600 to-emerald-700',
  north: 'bg-gradient-to-br from-yellow-500 to-amber-600',
  horn: 'bg-gradient-to-br from-red-500 to-rose-600',
};

const regionEmojis: Record<string, string> = {
  east: '🌍', west: '🌏', southern: '🌎', central: '🌿', north: '🏜️', horn: '🐪',
};

function getRegionName(tribe: any): string {
  const countries = tribe.countries as string[] | undefined;
  if (!countries?.length) return tribe.region || 'Africa';
  const country = tribesData.countries.find(c => c.code === countries[0]);
  return country?.name || tribe.region || 'Africa';
}

function getRegionKey(tribe: any): string {
  const countries = tribe.countries as string[] | undefined;
  if (!countries?.length) return 'east';
  const country = tribesData.countries.find(c => c.code === countries[0]);
  return country?.region || 'east';
}

function generateTribeBlogContent(tribe: any): ContentSection[] {
  const sections: ContentSection[] = [];
  const countryNames = (tribe.countries as string[])?.map(
    code => tribesData.countries.find(c => c.code === code)?.name
  ).filter(Boolean).join(', ') || 'Africa';

  // Intro
  sections.push({
    paragraphs: [
      tribe.description || `The ${tribe.name} are a fascinating people with rich cultural traditions.`,
      `Found primarily in ${countryNames}, the ${tribe.name} have a population of ${tribe.population || 'several million'} and continue to maintain vibrant cultural practices that stretch back centuries.`
    ]
  });

  // History
  const history = tribe.history;
  if (history) {
    const paras: string[] = [];
    if (history.origin) paras.push(history.origin);
    if (history.colonialEra) paras.push(history.colonialEra);
    if (history.independence) paras.push(history.independence);
    if (paras.length > 0) {
      sections.push({
        heading: `History of the ${tribe.name}`,
        icon: '📜',
        paragraphs: paras,
        list: history.keyEvents?.slice(0, 5),
      });
    }
  }

  // Language
  const language = tribe.language;
  if (language) {
    sections.push({
      heading: `The ${language.name || tribe.name} Language`,
      icon: '🗣️',
      paragraphs: [
        `The ${tribe.name} speak ${language.name || 'their own language'}, part of the ${language.family || 'African language'} family with approximately ${language.speakers || 'many'} speakers.`,
        language.greeting ? `A common greeting is "${language.greeting}" which means "${language.greetingMeaning || 'hello'}".` : '',
      ].filter(Boolean),
      list: language.commonPhrases?.slice(0, 4).map((p: any) => `"${p.phrase}" — ${p.meaning}`) || [],
      highlight: language.greeting ? `Try greeting a ${tribe.name} person with "${language.greeting}" — it will be warmly appreciated!` : undefined,
    });
  }

  // Cultural Traits
  if (tribe.culturalTraits?.length) {
    sections.push({
      heading: 'Cultural Traditions & Practices',
      icon: '🎭',
      paragraphs: [`The ${tribe.name} people are known for diverse cultural practices that define their identity.`],
      list: tribe.culturalTraits.slice(0, 6),
    });
  }

  // Food
  const food = tribe.traditionalFood;
  if (food) {
    sections.push({
      heading: 'Traditional Cuisine',
      icon: '🍲',
      paragraphs: [
        food.description || `${tribe.name} cuisine reflects their environment and agricultural practices.`,
      ],
      list: [
        ...(food.staples?.slice(0, 3) || []),
        ...(food.specialDishes?.slice(0, 2) || []),
      ],
      highlight: food.beverages?.[0] ? `Traditional beverages include ${food.beverages.slice(0, 2).join(' and ')}.` : undefined,
    });
  }

  // Fun Facts
  if (tribe.funFacts?.length) {
    sections.push({
      heading: 'Fascinating Facts',
      icon: '💡',
      paragraphs: [`Here are some fascinating facts about the ${tribe.name} people that showcase their unique place in African culture.`],
      list: tribe.funFacts.slice(0, 5),
    });
  }

  // Famous People
  if (tribe.famousPeople?.length) {
    sections.push({
      heading: `Notable ${tribe.name} People`,
      icon: '⭐',
      paragraphs: [`The ${tribe.name} have produced many influential figures across politics, arts, science, and sports.`],
      list: tribe.famousPeople.slice(0, 5).map((p: any) =>
        `${p.name} — ${p.role}${p.birth ? ` (b. ${p.birth})` : ''}`
      ),
    });
  }

  // Traditional Religion
  const religion = tribe.traditionalReligion;
  if (religion) {
    sections.push({
      heading: 'Spiritual Beliefs & Religion',
      icon: '🙏',
      paragraphs: [
        religion.beliefs || `The ${tribe.name} have a rich spiritual tradition centered on ${religion.supremeDeity || 'a supreme deity'}.`,
        tribe.religion ? `Today, ${tribe.religion}.` : '',
      ].filter(Boolean),
      list: religion.practices?.slice(0, 4),
    });
  }

  return sections;
}

export function generateTribeBlogs(existingSlugs: Set<string>): BlogPost[] {
  const tribes = tribesData.tribes as any[];
  const generated: BlogPost[] = [];
  const seenGeneratedSlugs = new Set<string>();

  for (const tribe of tribes) {
    // Skip tribes that already have a dedicated blog or are referenced in existing blogs
    const blogSlug = `tribe-${tribe.slug}`;
    if (existingSlugs.has(blogSlug)) continue;
    if (seenGeneratedSlugs.has(blogSlug)) continue;

    const regionName = getRegionName(tribe);
    const regionKey = getRegionKey(tribe);
    const countryNames = (tribe.countries as string[])?.map(
      code => tribesData.countries.find(c => c.code === code)?.name
    ).filter(Boolean).join(', ') || 'Africa';

    const content = generateTribeBlogContent(tribe);
    if (content.length < 2) continue; // Skip tribes with too little data

    const readMins = Math.max(3, Math.min(8, Math.ceil(
      content.reduce((acc, s) => acc + s.paragraphs.join(' ').length + (s.list?.join(' ').length || 0), 0) / 1000
    )));

    seenGeneratedSlugs.add(blogSlug);
    generated.push({
      slug: blogSlug,
      title: `The ${tribe.name} People: Culture, History & Traditions`,
      seoTitle: `${tribe.name} Tribe: Culture, Names, History & Traditions | TribeGuess`,
      seoDescription: `Discover the ${tribe.name} people of ${countryNames}. Learn about their culture, traditional names, language${tribe.language?.name ? ` (${tribe.language.name})` : ''}, history, cuisine, and famous personalities.`,
      excerpt: tribe.description || `Explore the rich cultural heritage of the ${tribe.name} people — their traditions, language, history, and way of life.`,
      emoji: regionEmojis[regionKey] || '🌍',
      gradient: regionGradients[regionKey] || 'bg-gradient-to-br from-emerald-500 to-teal-600',
      region: regionName,
      readTime: `${readMins} min read`,
      publishDate: '2026-03-01',
      tags: [tribe.name, regionName, 'African culture', 'tribe profile', 'traditions'].filter(Boolean),
      relatedTribes: [
        { name: tribe.name, slug: tribe.slug },
        ...(tribe.relatedTribes?.slice(0, 2).map((id: string) => {
          const related = tribes.find(t => t.id === id);
          return related ? { name: related.name, slug: related.slug } : null;
        }).filter(Boolean) || [])
      ],
      content,
    });
  }

  return generated;
}
