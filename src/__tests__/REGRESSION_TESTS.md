# Regression Test Specification

**Version:** 1.0.0  
**Last Updated:** 2026-01-04  
**Purpose:** Comprehensive test documentation to prevent AI-induced regressions

---

## Table of Contents
1. [Routing & Links](#1-routing--links)
2. [Tribe Detection Engine](#2-tribe-detection-engine)
3. [Search Functionality](#3-search-functionality)
4. [Data Integrity](#4-data-integrity)
5. [Component Tests](#5-component-tests)
6. [Snapshot Baselines](#6-snapshot-baselines)

---

## 1. Routing & Links

### 1.1 Core Routes Must Resolve

| Route | Expected Component | Status |
|-------|-------------------|--------|
| `/` | Index (Home) | ✅ |
| `/learn` | Learn (Encyclopedia) | ✅ |
| `/learn/:slug` | TribePage | ✅ |
| `/random` | RandomTribe | ✅ |
| `/blog` | Blog | ✅ |
| `/blog/:slug` | BlogPost | ✅ |
| `/terms` | Terms | ✅ |
| `/privacy` | Privacy | ✅ |
| `/invalid-route` | NotFound (404) | ✅ |

### 1.2 Slug Alias Resolution

These slugs MUST resolve to the correct tribe page:

```
/learn/hutu       → Banyarwanda page (via slugAliases)
/learn/tutsi      → Banyarwanda page (via slugAliases)
/learn/twa        → Banyarwanda page (via slugAliases)
/learn/banyarwanda → Banyarwanda page (direct)
/learn/kikuyu     → Kikuyu page
/learn/wolof      → Wolof page
/learn/zulu       → Zulu page
```

### 1.3 Link Integrity Checklist

- [ ] All tribe cards on `/learn` link to valid `/learn/:slug` routes
- [ ] All blog cards on `/blog` link to valid `/blog/:slug` routes
- [ ] Header navigation links work (Home, Learn, Blog)
- [ ] Footer links work (Terms, Privacy)
- [ ] "Related Tribes" links in blog posts resolve correctly
- [ ] Map markers link to correct tribe pages

---

## 2. Tribe Detection Engine

### 2.1 Core Detection Function Tests

**Function:** `detectTribe(firstName: string, lastName?: string, countryHint?: string)`

#### East African Names (Kenya)

| Input | Expected Primary Tribe | Confidence | Reason |
|-------|----------------------|------------|--------|
| `Wanjiku` | Kikuyu | 90%+ | Direct name match |
| `Otieno` | Luo | 90%+ | Night-born male name |
| `Achieng` | Luo | 90%+ | Sun-born female name |
| `Wafula` | Luhya | 90%+ | Rain-born name |
| `Chemutai` | Kalenjin | 85%+ | Honey harvest season |
| `Kipchoge` | Kalenjin | 95%+ | Famous athlete pattern |

#### West African Names (Nigeria/Ghana)

| Input | Expected Primary Tribe | Confidence | Reason |
|-------|----------------------|------------|--------|
| `Chukwuemeka` | Igbo | 90%+ | Chukwu- prefix |
| `Oluwaseun` | Yoruba | 90%+ | Olu- prefix |
| `Kofi` | Akan | 85%+ | Friday-born male |
| `Kwame` | Akan | 95%+ | Saturday-born male |
| `Adebayo` | Yoruba | 90%+ | Ade- prefix |

#### Central/Southern African Names

| Input | Expected Primary Tribe | Confidence | Reason |
|-------|----------------------|------------|--------|
| `Ngozi` | Igbo | 85%+ | Blessing name |
| `Thabo` | Sotho | 85%+ | Joy/happiness |
| `Sipho` | Zulu | 85%+ | Gift name |

#### Rwanda/Burundi Names

| Input | Expected Primary Tribe | Confidence | Reason |
|-------|----------------------|------------|--------|
| `Uwimana` | Banyarwanda | 90%+ | uwi- prefix |
| `Habimana` | Banyarwanda | 90%+ | God exists |
| `Kagame` | Banyarwanda | 95%+ | Famous pattern |
| `Nkurunziza` | Banyarwanda | 90%+ | Good news herald |

### 2.2 Prefix/Suffix Pattern Tests

These linguistic patterns MUST be detected:

| Pattern | Associated Tribe | Example Names |
|---------|-----------------|---------------|
| `uwi-` | Banyarwanda | Uwimana, Uwizeye |
| `nta-` | Banyarwanda | Ntawukuliryayo |
| `olu-`/`ade-` | Yoruba | Oluwaseun, Adebayo |
| `chukwu-` | Igbo | Chukwuemeka, Chukwudi |
| `chi-` | Igbo | Chiamaka, Chinedu |
| `kip-`/`chep-` | Kalenjin | Kipchoge, Chepkoech |
| `na-`/`wa-` | Luhya | Nafula, Wafula |
| `o-`/`a-` (Luo) | Luo | Otieno, Atieno |
| `nku-` | Zulu | Nkululeko |

### 2.3 Edge Cases

| Test Case | Expected Behavior |
|-----------|------------------|
| Empty string | Return empty predictions array |
| Single character | Return empty or low confidence |
| Numbers only | Return empty predictions |
| Mixed case "WANJIKU" | Normalize and detect Kikuyu |
| Trailing spaces "  Otieno  " | Normalize and detect Luo |
| Non-African name "John" | Return low confidence or empty |

---

## 3. Search Functionality

### 3.1 Global Search Hook Tests

**Function:** `useGlobalSearch(query: string)`

| Query | Expected Results Include | Type |
|-------|-------------------------|------|
| `kikuyu` | Kikuyu tribe | tribe |
| `Luo` | Luo tribe | tribe |
| `naming` | Blog posts about naming | blog |
| `Kenya` | All Kenya-related tribes + blogs | mixed |
| `twin` | Luo tribe (twin naming) | tribe |
| `ochre` | Himba blog post | blog |
| `x` | Empty (min 2 chars) | empty |
| `` | Empty | empty |

### 3.2 Search Matching Rules

- [x] Case-insensitive matching
- [x] Matches tribe names
- [x] Matches tribe descriptions
- [x] Matches tribe regions
- [x] Matches common male/female names
- [x] Matches blog titles
- [x] Matches blog tags
- [x] Results limited to 20
- [x] Exact title matches prioritized

### 3.3 Live Search on Learn Page

- [ ] Search updates as user types (no Enter required)
- [ ] Results filter in Grid/List/Map views
- [ ] URL updates with `?q=` parameter
- [ ] Clearing search shows all tribes
- [ ] Empty state message displays correctly

---

## 4. Data Integrity

### 4.1 Tribes JSON Schema

Every tribe in `src/data/tribes.json` MUST have:

```typescript
interface Tribe {
  id: string;              // Required, unique
  name: string;            // Required
  slug: string;            // Required, URL-safe
  region: string;          // Required (East Africa, West Africa, etc.)
  countries: string[];     // Required, ISO codes
  population: string;      // Required
  description: string;     // Required
  language: {
    name: string;
    family: string;
    speakers?: string;
  };
  commonNames: {
    male: string[];        // At least 1
    female: string[];      // At least 1
  };
  traditions: string[];    // At least 1
  famousPeople?: Array<{
    name: string;
    role: string;
    achievement?: string;
    years?: string;
  }>;
  territory?: {
    description: string;
    coordinates: Array<[number, number]>;
  };
  sources?: Array<{
    title: string;
    url?: string;
  }>;
  slugAliases?: string[];  // Optional
  ethnicComponents?: Array<{...}>; // Optional
}
```

### 4.2 Population Data Verification

Spot-check critical population figures:

| Tribe | Expected Population | Verified Source |
|-------|--------------------|-----------------:|
| Kikuyu | ~8-10 million | Kenya Census |
| Yoruba | ~45-50 million | Nigeria Census |
| Zulu | ~12-14 million | SA Census |
| Oromo | ~40+ million | Ethiopia Census |
| Hausa | ~77+ million | Multiple sources |

### 4.3 Blog Posts Schema

Every post in `src/data/blogPosts.ts` MUST have:

```typescript
interface BlogPost {
  slug: string;            // Required, unique, URL-safe
  title: string;           // Required
  seoTitle: string;        // Required, <60 chars
  seoDescription: string;  // Required, <160 chars
  excerpt: string;         // Required
  emoji: string;           // Required
  gradient: string;        // Required, Tailwind class
  region: string;          // Required
  readTime: string;        // Required
  publishDate: string;     // Required, YYYY-MM-DD
  tags: string[];          // Required, at least 1
  relatedTribes: Array<{   // Required
    name: string;
    slug: string;          // Must be valid tribe slug
  }>;
  content: ContentSection[]; // Required
  sources?: Source[];      // Recommended
}
```

### 4.4 Cross-Reference Integrity

- [ ] All `relatedTribes.slug` values in blog posts resolve to real tribes
- [ ] All tribe `countries` codes exist in countries list
- [ ] All tribe `region` values match defined regions
- [ ] No duplicate tribe IDs or slugs
- [ ] No duplicate blog slugs

---

## 5. Component Tests

### 5.1 GuessForm Component

**Location:** `src/components/GuessForm.tsx`

| Test | Expected Behavior |
|------|------------------|
| Empty input + submit | Button disabled, no submission |
| Valid name + Enter key | Triggers search |
| Valid name + click button | Triggers search |
| Mobile touch on button | Triggers search |
| Input clears after submission | Depends on implementation |

### 5.2 TribeCard Component

**Location:** `src/components/TribeCard.tsx`

| Test | Expected Behavior |
|------|------------------|
| Renders tribe name | Displays correctly |
| Renders population | Formatted with commas |
| Renders country flags | Shows flag emojis |
| Click navigates | Goes to `/learn/:slug` |

### 5.3 TribeFamilyTree Component

**Location:** `src/components/TribeFamilyTree.tsx`

| Test | Expected Behavior |
|------|------------------|
| Tribe with ethnicComponents | Renders tree structure |
| Tribe with language.family | Renders language tree |
| Tribe without these props | Renders gracefully (empty or minimal) |

### 5.4 ImageGallery Component

**Location:** `src/components/ImageGallery.tsx`

| Test | Expected Behavior |
|------|------------------|
| Images array provided | Renders all images |
| Empty images array | Renders empty state |
| Image click | Opens modal/lightbox |
| Keyboard navigation | Accessible |

---

## 6. Snapshot Baselines

### 6.1 Critical Page Structures

Capture and compare these page structures:

#### Home Page (/)
- Hero section with search form
- Feature sections
- Footer

#### Learn Page (/learn)
- Navigation toggle (Grid/Map/List)
- Filter controls (region, country)
- Search input
- Tribe grid/list

#### Tribe Page (/learn/kikuyu)
- Hero with tribe name, region, population
- Map with territory
- Common names sections
- Traditions list
- Famous people
- Sources

#### Blog Page (/blog)
- Tag filters
- Blog card grid
- Each card has emoji, title, excerpt, tags

### 6.2 Responsive Breakpoints

Test at these widths:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px (Standard)
- Wide: 1920px (Full HD)

---

## Running Tests Manually

### Quick Smoke Test Checklist

1. **Home Page**
   - [ ] Page loads without errors
   - [ ] Search form accepts input
   - [ ] Search button works on mobile

2. **Learn Page**
   - [ ] All tribes display in grid
   - [ ] Search filters instantly
   - [ ] Map view works
   - [ ] Country filters work

3. **Tribe Detail Page**
   - [ ] Navigate to `/learn/kikuyu`
   - [ ] Name, population, region display
   - [ ] Map renders
   - [ ] Names section populated

4. **Detection Test**
   - [ ] Enter "Wanjiku" → Shows Kikuyu
   - [ ] Enter "Otieno" → Shows Luo
   - [ ] Enter "Kofi" → Shows Akan

5. **Blog**
   - [ ] All posts render
   - [ ] Tag filtering works
   - [ ] Related tribe links work

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-04 | 1.0.0 | Initial test specification created |

---

## AI Development Guidelines

### Before Making Changes

1. Review this test specification
2. Identify which tests may be affected
3. Run relevant manual checks after changes

### After Making Changes

1. Verify no routing broke
2. Test affected detection patterns
3. Confirm search still works
4. Check data integrity if JSON modified

### Forbidden Changes (Without Explicit Approval)

- ❌ Removing tribes from tribes.json
- ❌ Changing tribe slug or ID values
- ❌ Modifying detection confidence thresholds
- ❌ Removing name patterns from nameDatabase
- ❌ Changing route paths in App.tsx
- ❌ Modifying blog post slugs
