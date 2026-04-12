/**
 * Centralized SEO constants and helpers for TribeGuess.
 * Every page should import from here to keep domain, titles, and meta consistent.
 */

export const SITE_DOMAIN = 'https://africantribenames.com';
export const SITE_NAME = 'African Tribe Names';
export const SITE_SHORT = 'TribeGuess';

/** Canonical URL builder */
export function canonical(path: string): string {
  return `${SITE_DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Publisher structured data (reuse across all pages) */
export const PUBLISHER_LD = {
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE_DOMAIN,
  "logo": { "@type": "ImageObject", "url": `${SITE_DOMAIN}/favicon.png` }
};

// ─── Title Templates ───────────────────────────────────────────────

export const titleTemplates = {
  tribe: (name: string) =>
    `${name} Tribe: Culture, Names, History & Traditions | ${SITE_NAME}`,
  tribeShort: (name: string) =>
    `${name} People — Culture & Heritage | ${SITE_NAME}`,
  country: (country: string) =>
    `Tribes in ${country}: Complete Guide to ${country}'s Ethnic Groups | ${SITE_NAME}`,
  region: (region: string) =>
    `${region} Tribes: Ethnic Groups & Cultural Heritage | ${SITE_NAME}`,
  languageFamily: (family: string) =>
    `${family} Language Family: Tribes & Speakers | ${SITE_NAME}`,
  recipe: (dish: string, tribe: string) =>
    `${dish} (${tribe} Recipe): Ingredients, History & How to Make It | ${SITE_NAME}`,
  person: (name: string, tribe: string) =>
    `${name} — Famous ${tribe} Person | ${SITE_NAME}`,
  people: (tribe?: string) =>
    tribe
      ? `Famous People from the ${tribe} Tribe | ${SITE_NAME}`
      : `Famous African People: Leaders, Artists & Icons | ${SITE_NAME}`,
  religion: (name: string) =>
    `${name}: Beliefs, Practices & Spiritual Traditions | ${SITE_NAME}`,
  blog: (title: string) =>
    `${title} | ${SITE_NAME} Blog`,
  index: () =>
    `${SITE_NAME} — Discover 350+ African Tribes, Names & Traditions`,
  tribes: () =>
    `All African Tribes A–Z: Complete Directory of 350+ Ethnic Groups | ${SITE_NAME}`,
};

// ─── Meta Description Templates ────────────────────────────────────

export const metaTemplates = {
  tribe: (name: string, countries: string, pop: string) =>
    `Learn about the ${name} people of ${countries}. Discover traditional names, culture, population (${pop}), history, and famous ${name} personalities.`.slice(0, 160),
  country: (country: string, count: number) =>
    `Explore all ${count} tribes and ethnic groups in ${country}. Discover their culture, languages, names, traditions, and history.`.slice(0, 160),
  region: (region: string, count: number) =>
    `Discover ${count} tribes across ${region}. Explore cultural heritage, languages, naming traditions, and history of each ethnic group.`.slice(0, 160),
  languageFamily: (family: string, count: number) =>
    `Explore ${count} African tribes speaking ${family} languages. Learn about their shared linguistic heritage, cultures, and traditions.`.slice(0, 160),
};

// ─── Country Slug Utilities ────────────────────────────────────────

const COUNTRY_SLUGS: Record<string, string> = {
  KE: 'kenya', NG: 'nigeria', GH: 'ghana', ZA: 'south-africa', ET: 'ethiopia',
  TZ: 'tanzania', UG: 'uganda', CD: 'dr-congo', SN: 'senegal', CM: 'cameroon',
  RW: 'rwanda', BI: 'burundi', SO: 'somalia', ER: 'eritrea', SD: 'sudan',
  SS: 'south-sudan', MW: 'malawi', ZM: 'zambia', ZW: 'zimbabwe', BW: 'botswana',
  NA: 'namibia', AO: 'angola', MZ: 'mozambique', LS: 'lesotho', SZ: 'eswatini',
  MG: 'madagascar', CF: 'central-african-republic', CG: 'congo', GA: 'gabon',
  TD: 'chad', ML: 'mali', NE: 'niger', BF: 'burkina-faso', CI: 'ivory-coast',
  BJ: 'benin', TG: 'togo', LY: 'libya', MR: 'mauritania', DZ: 'algeria',
  MA: 'morocco', TN: 'tunisia', EG: 'egypt', GN: 'guinea', SL: 'sierra-leone',
  LR: 'liberia', GM: 'gambia', GW: 'guinea-bissau', CV: 'cape-verde',
  GQ: 'equatorial-guinea', DJ: 'djibouti', KM: 'comoros', YT: 'mayotte',
  EH: 'western-sahara', YE: 'yemen',
};

const SLUG_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_SLUGS).map(([code, slug]) => [slug, code])
);

export function countryCodeToSlug(code: string): string {
  return COUNTRY_SLUGS[code] || code.toLowerCase();
}

export function slugToCountryCode(slug: string): string | undefined {
  return SLUG_TO_CODE[slug];
}

// ─── Region Slug Utilities ─────────────────────────────────────────

export function regionToSlug(region: string): string {
  return region
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export function slugToRegionName(slug: string, regions: string[]): string | undefined {
  return regions.find(r => regionToSlug(r) === slug);
}

// ─── Breadcrumb Helpers ────────────────────────────────────────────

export function breadcrumbLD(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": canonical(item.url),
    })),
  };
}

// ─── Country intro copy generators ─────────────────────────────────

const COUNTRY_INTROS: Record<string, string> = {
  KE: 'Kenya is home to over 40 distinct ethnic groups, from the Kikuyu of the Central Highlands to the Maasai of the Great Rift Valley and the Luo of Lake Victoria.',
  NG: 'Nigeria, Africa\'s most populous nation, hosts over 250 ethnic groups. The Yoruba, Igbo, and Hausa-Fulani are the largest, each with rich cultural traditions spanning millennia.',
  GH: 'Ghana\'s diverse ethnic landscape includes the Ashanti, Ewe, Ga-Adangbe, and Fante peoples, each contributing to the nation\'s vibrant cultural tapestry.',
  ZA: 'South Africa\'s Rainbow Nation encompasses the Zulu, Xhosa, Sotho, Tswana, and many more groups, united in diversity after centuries of complex history.',
  ET: 'Ethiopia, one of the oldest nations on Earth, is home to over 80 ethnic groups including the Oromo, Amhara, Tigray, and Somali peoples.',
  TZ: 'Tanzania hosts over 120 ethnic groups, with the Sukuma, Chagga, Haya, and Maasai among the most prominent.',
  UG: 'Uganda\'s cultural diversity spans from the Baganda kingdom in the south to the Karamojong pastoralists in the northeast.',
  CD: 'The Democratic Republic of Congo, Africa\'s second-largest country, has over 200 ethnic groups including the Mongo, Luba, Kongo, and Mangbetu-Azande.',
};

export function getCountryIntro(code: string, name: string, tribeCount: number): string {
  return COUNTRY_INTROS[code] ||
    `${name} is home to ${tribeCount} distinct ethnic groups, each with unique cultural traditions, languages, and naming practices. Explore the rich tribal heritage of ${name}.`;
}
