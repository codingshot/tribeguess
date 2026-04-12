/**
 * Reusable SEO content templates for tribe pages.
 * Generates optimized titles, descriptions, intros, and structured data.
 */

import { SITE_DOMAIN, SITE_NAME, PUBLISHER_LD, canonical, breadcrumbLD } from './seoConstants';
import type { TribeData } from '@/types/tribe';

// ─── Title Templates ───────────────────────────────────────────────

export const tribeTitles = {
  main: (name: string) =>
    `${name} Tribe: Culture, Names, History & Traditions | ${SITE_NAME}`,
  people: (name: string) =>
    `Famous ${name} People: Leaders, Artists & Icons | ${SITE_NAME}`,
  religion: (name: string, religionName?: string) =>
    religionName
      ? `${religionName}: ${name} Beliefs & Spiritual Practices | ${SITE_NAME}`
      : `${name} Religion, Beliefs & Spiritual Traditions | ${SITE_NAME}`,
  food: (name: string) =>
    `${name} Traditional Food & Cuisine: Recipes & Eating Customs | ${SITE_NAME}`,
  names: (name: string) =>
    `${name} Names: Meanings, Origins & Naming Traditions | ${SITE_NAME}`,
};

// ─── Meta Description Templates ────────────────────────────────────

export const tribeMetaDescriptions = {
  main: (name: string, countries: string, population: string) =>
    `Learn about the ${name} people of ${countries}. Discover traditional names, cultural practices, population (${population}), history, and famous ${name} personalities.`.slice(0, 160),
  people: (name: string, exampleNames: string[]) => {
    const examples = exampleNames.slice(0, 3).join(', ');
    return `Discover notable people from the ${name} tribe including ${examples}. Learn about their achievements and cultural impact.`.slice(0, 160);
  },
  religion: (name: string, religionName: string) =>
    `Explore the spiritual traditions of the ${name} people. Learn about ${religionName}, rituals, beliefs, and how religion shapes ${name} naming and culture.`.slice(0, 160),
  food: (name: string, dishes: string[]) => {
    const examples = dishes.slice(0, 3).join(', ');
    return `Discover ${name} traditional cuisine including ${examples}. Learn about eating customs, ceremonial foods, and cultural significance.`.slice(0, 160);
  },
};

// ─── Featured Snippet Intro Generator ──────────────────────────────

export function generateTribeIntro(tribe: TribeData, countryNames: string): string {
  const lang = tribe.language;
  const pop = tribe.population || 'several million';
  const langName = lang?.name || 'their native language';
  const langFamily = lang?.family ? `, a ${lang.family} language` : '';
  const traits = (tribe.culturalTraits || []).slice(0, 2).join(' and ');
  const traitsSuffix = traits
    ? ` The ${tribe.name} are renowned for ${traits.toLowerCase()}.`
    : '';

  return `The ${tribe.name} are ${startsWithVowel(tribe.name) ? 'an' : 'a'} ethnic group primarily found in ${countryNames}. With a population of approximately ${pop}, they speak ${langName}${langFamily}.${traitsSuffix}`;
}

function startsWithVowel(s: string): boolean {
  return /^[aeiou]/i.test(s);
}

// ─── Structured Data Builders ──────────────────────────────────────

export function buildTribeArticleLD(tribe: TribeData, countryNames: string) {
  const desc = tribeMetaDescriptions.main(tribe.name, countryNames, tribe.population || 'N/A');
  return {
    "@type": "Article",
    "headline": tribeTitles.main(tribe.name).split(' |')[0],
    "description": desc,
    "author": { "@type": "Organization", "name": SITE_NAME, "url": SITE_DOMAIN },
    "publisher": PUBLISHER_LD,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical(`/learn/${tribe.slug}`) },
    "about": { "@type": "Thing", "name": `${tribe.name} people`, "description": tribe.description },
  };
}

export function buildTribeBreadcrumbLD(tribe: TribeData) {
  return breadcrumbLD([
    { name: 'Home', url: '/' },
    { name: 'All Tribes', url: '/tribes' },
    { name: tribe.name, url: `/learn/${tribe.slug}` },
  ]);
}

export function buildTribePeopleLD(tribe: TribeData) {
  const people = (tribe.famousPeople || []) as Array<{ name: string; role?: string }>;
  return {
    "@type": "ItemList",
    "name": `Famous ${tribe.name} People`,
    "numberOfItems": people.length,
    "itemListElement": people.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Person",
        "name": p.name,
        "description": p.role || `Notable ${tribe.name} person`,
      },
    })),
  };
}

// ─── Section Heading Templates ─────────────────────────────────────

export const sectionHeadings = {
  overview: (name: string) => `About the ${name} People`,
  location: (name: string, country?: string) =>
    country ? `${name} Location in ${country}` : `Where the ${name} Live`,
  language: (name: string) => `${name} Language & Greetings`,
  history: (name: string) => `${name} History & Origins`,
  culture: (name: string) => `${name} Culture & Traditions`,
  naming: (name: string) => `${name} Naming Conventions`,
  marriage: (name: string) => `${name} Marriage Customs`,
  religion: (name: string) => `${name} Religion & Beliefs`,
  food: (name: string) => `${name} Traditional Cuisine`,
  people: (name: string) => `Famous ${name} People`,
  related: (name: string) => `Tribes Related to the ${name}`,
  faq: () => `Frequently Asked Questions`,
};
