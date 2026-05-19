export type RouteSection =
  | 'recipes'
  | 'dances'
  | 'blog'
  | 'learn'
  | 'religions'
  | 'quiz'
  | 'names'
  | 'video'
  | 'people'
  | 'languages'
  | 'compare'
  | 'general';

export type RecoveryVariant = 'not-found' | 'error';

export interface RecoveryCta {
  label: string;
  href: string;
  /** Primary button uses filled style; others are outline */
  emphasis?: 'primary' | 'secondary';
}

export interface RouteRecoveryContent {
  section: RouteSection;
  headline: string;
  subtext: string;
  primaryCta: RecoveryCta;
  secondaryCtas: RecoveryCta[];
}

const SECTION_CONFIG: Record<
  RouteSection,
  {
    notFoundHeadline: string;
    notFoundSubtext: string;
    errorSubtext: string;
    primary: RecoveryCta;
    secondary: RecoveryCta[];
  }
> = {
  recipes: {
    notFoundHeadline: 'Recipe not found',
    notFoundSubtext:
      'This dish is not in our cookbook yet. Browse traditional recipes from tribes across Africa.',
    errorSubtext:
      'The recipes page hit an unexpected error. Try reloading, or browse other recipes and tribes.',
    primary: { label: 'Browse all recipes', href: '/recipes', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  dances: {
    notFoundHeadline: 'Dance not found',
    notFoundSubtext:
      'We could not find this performance. Explore traditional dances and music from across Africa.',
    errorSubtext:
      'Something went wrong on the dances page. Reload or try another section of the site.',
    primary: { label: 'Dance gallery', href: '/dances', emphasis: 'primary' },
    secondary: [
      { label: 'African dances hub', href: '/african-dances' },
      { label: 'Video gallery', href: '/video-gallery' },
      { label: 'Home', href: '/' },
    ],
  },
  blog: {
    notFoundHeadline: 'Article not found',
    notFoundSubtext:
      'This story may have moved or does not exist. Read other articles on African cultures and naming.',
    errorSubtext: 'The blog could not load properly. Try again or pick another article.',
    primary: { label: 'Read the blog', href: '/blog', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  learn: {
    notFoundHeadline: 'Lost in the savanna',
    notFoundSubtext:
      'The path you seek does not exist. Over 3,000 African tribes are waiting to be discovered.',
    errorSubtext:
      'This page hit an unexpected error. Go back, explore tribes, or reload to try again.',
    primary: { label: 'Explore tribes', href: '/learn', emphasis: 'primary' },
    secondary: [
      { label: 'View map', href: '/learn?view=map' },
      { label: 'Random tribe', href: '/random' },
      { label: 'Home', href: '/' },
    ],
  },
  religions: {
    notFoundHeadline: 'Religion page not found',
    notFoundSubtext: 'This faith tradition page is missing. Browse religions across Africa instead.',
    errorSubtext: 'The religions section failed to load. Reload or return to the religions index.',
    primary: { label: 'Explore religions', href: '/religions', emphasis: 'primary' },
    secondary: [
      { label: 'Religion timeline', href: '/religion-timeline' },
      { label: 'Home', href: '/' },
    ],
  },
  quiz: {
    notFoundHeadline: 'Quiz not found',
    notFoundSubtext: 'This quiz path does not exist. Test your knowledge of African tribes instead.',
    errorSubtext: 'The quiz could not load. Reload or head back to the main quiz.',
    primary: { label: 'Take the quiz', href: '/quiz', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  names: {
    notFoundHeadline: 'Names page not found',
    notFoundSubtext: 'This names gallery path does not exist. Browse African names and meanings.',
    errorSubtext: 'The names gallery failed to load. Try reloading or exploring tribes.',
    primary: { label: 'Name gallery', href: '/names', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  video: {
    notFoundHeadline: 'Video not found',
    notFoundSubtext: 'This video page does not exist. Watch documentaries and clips from the gallery.',
    errorSubtext: 'The video gallery hit an error. Reload or browse other videos.',
    primary: { label: 'Video gallery', href: '/video-gallery', emphasis: 'primary' },
    secondary: [
      { label: 'Dance gallery', href: '/dances' },
      { label: 'Home', href: '/' },
    ],
  },
  people: {
    notFoundHeadline: 'Person not found',
    notFoundSubtext: 'We do not have a profile at this path. Browse notable African figures.',
    errorSubtext: 'The people section failed to load. Try again or explore tribes.',
    primary: { label: 'Notable people', href: '/people', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  languages: {
    notFoundHeadline: 'Language page not found',
    notFoundSubtext: 'This language family page does not exist. Browse African languages and families.',
    errorSubtext: 'The languages section failed to load. Reload or open the languages index.',
    primary: { label: 'African languages', href: '/languages', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  compare: {
    notFoundHeadline: 'Compare page not found',
    notFoundSubtext: 'This compare URL is invalid. Pick two tribes to compare side by side.',
    errorSubtext: 'Tribe compare failed to load. Reload or start a new comparison.',
    primary: { label: 'Compare tribes', href: '/compare', emphasis: 'primary' },
    secondary: [
      { label: 'Explore tribes', href: '/learn' },
      { label: 'Home', href: '/' },
    ],
  },
  general: {
    notFoundHeadline: 'Lost in the savanna',
    notFoundSubtext:
      'The page you requested does not exist. Discover tribes, recipes, dances, and more.',
    errorSubtext:
      'This page hit an unexpected error. You can go back, browse tribes, or try reloading.',
    primary: { label: 'Explore tribes', href: '/learn', emphasis: 'primary' },
    secondary: [
      { label: 'Recipes', href: '/recipes' },
      { label: 'Dances', href: '/dances' },
      { label: 'Home', href: '/' },
    ],
  },
};

/** Infer site section from URL path for contextual recovery UI. */
export function detectRouteSection(pathname: string): RouteSection {
  const path = pathname.toLowerCase();

  if (path.startsWith('/recipe') || path.startsWith('/ingredient/')) return 'recipes';
  if (path.startsWith('/dance') || path.startsWith('/african-dances')) return 'dances';
  if (path.startsWith('/blog')) return 'blog';
  if (
    path.startsWith('/learn') ||
    path.startsWith('/tribes') ||
    path.startsWith('/countries') ||
    path.startsWith('/country/') ||
    path.startsWith('/region/')
  ) {
    return 'learn';
  }
  if (path.startsWith('/religion')) return 'religions';
  if (path.startsWith('/quiz')) return 'quiz';
  if (path.startsWith('/names')) return 'names';
  if (path.startsWith('/video-gallery')) return 'video';
  if (path.startsWith('/people') || path.startsWith('/person/')) return 'people';
  if (path.startsWith('/languages')) return 'languages';
  if (path.startsWith('/compare')) return 'compare';

  return 'general';
}

export function getRouteRecoveryContent(
  pathname: string,
  variant: RecoveryVariant
): RouteRecoveryContent {
  const section = detectRouteSection(pathname);
  const config = SECTION_CONFIG[section];

  const headline =
    variant === 'not-found' ? config.notFoundHeadline : 'Something went wrong';
  const subtext = variant === 'not-found' ? config.notFoundSubtext : config.errorSubtext;

  const primaryCta: RecoveryCta =
    variant === 'error'
      ? { label: 'Reload page', href: pathname || '/', emphasis: 'primary' }
      : config.primary;

  return {
    section,
    headline,
    subtext,
    primaryCta,
    secondaryCtas: config.secondary,
  };
}
