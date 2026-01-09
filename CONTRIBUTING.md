# Contributing to TribeGuess

Thank you for your interest in contributing to TribeGuess! This project aims to celebrate and preserve African cultural diversity, and we welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Data Entry Guidelines](#data-entry-guidelines)
- [Translation Guidelines](#translation-guidelines)
- [Code Contribution Guidelines](#code-contribution-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

---

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a respectful, harassment-free experience for everyone. We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Cultural Sensitivity

Given the nature of this project, we ask all contributors to:

- ✅ Respect all African cultures and traditions equally
- ✅ Avoid stereotypes that could be offensive or harmful
- ✅ Use verified, factual information from reputable sources
- ✅ Present cultural practices in their proper context
- ✅ Acknowledge the diversity within ethnic groups
- ❌ Never use derogatory language about any ethnic group
- ❌ Avoid generalizations that erase individual experiences

---

## How Can I Contribute?

### 1. 📊 Data Entry
Add or improve tribe, recipe, religion, or language data.

### 2. 🌍 Translations
Help translate the UI into African languages.

### 3. 💻 Code Contributions
Fix bugs, add features, or improve performance.

### 4. 📝 Content Writing
Write blog articles about African cultures.

### 5. 📸 Photography
Contribute properly licensed cultural images.

### 6. 🔍 Fact-Checking
Verify existing data against authoritative sources.

### 7. 🐛 Bug Reports
Report issues you find while using the app.

---

## Data Entry Guidelines

### Adding a New Tribe

Tribes are stored in `src/data/tribes.json`. Each tribe entry should follow this structure:

```json
{
  "id": "tribe-name-lowercase",
  "name": "Tribe Name",
  "alternateNames": ["Alternative Name 1", "Alternative Name 2"],
  "countries": ["Country1", "Country2"],
  "region": "Specific Region",
  "macroRegion": "East Africa | West Africa | Central Africa | Southern Africa | North Africa | Horn of Africa",
  "population": "~X million",
  "language": "Primary Language",
  "languageFamily": "Bantu | Nilotic | Cushitic | Semitic | etc.",
  "description": "2-3 sentence overview of the tribe.",
  "stereotype": "Common perceptions (presented respectfully)",
  "greeting": "Hello in their language",
  "greetingPhonetic": "[pho-NE-tic GUIDE]",
  "greetingMeaning": "English translation",
  "famousPeople": [
    {
      "name": "Person Name",
      "role": "Their role/profession",
      "description": "Brief bio"
    }
  ],
  "names": [
    {
      "name": "Example Name",
      "meaning": "Name meaning",
      "gender": "male | female | unisex"
    }
  ],
  "eatingCustoms": {
    "mealsPerDay": "Number and pattern",
    "mealPattern": "Description of eating habits",
    "communalEating": "How meals are shared",
    "foodTaboos": ["Taboo 1", "Taboo 2"],
    "hospitalityCustoms": "How guests are treated"
  },
  "tradeRelations": {
    "historical": "Pre-colonial trade description",
    "modern": "Current economic activities",
    "partners": ["Trade partner 1", "Trade partner 2"]
  },
  "independenceHistory": {
    "colonialPower": "Colonial ruler",
    "resistance": "How they resisted colonialism",
    "independence": "Post-independence status",
    "notableEvents": ["Event 1", "Event 2"]
  },
  "religiousHistory": {
    "traditional": "Indigenous beliefs",
    "islamIntroduction": "When/how Islam arrived (if applicable)",
    "christianityIntroduction": "When/how Christianity arrived (if applicable)",
    "currentPractice": "Modern religious landscape"
  },
  "territoryLat": -1.2345,
  "territoryLng": 36.7890,
  "territorySpan": 1.5,
  "cultureVideoId": "YouTube_Video_ID",
  "languageVideoId": "YouTube_Video_ID"
}
```

#### Required Fields
- `id`, `name`, `countries`, `region`, `macroRegion`, `population`, `language`, `languageFamily`, `description`

#### Data Quality Checklist
- [ ] Population is from Ethnologue or Joshua Project (within last 5 years)
- [ ] Description is factual, not stereotypical
- [ ] Name meanings are verified against cultural sources
- [ ] YouTube videos are from reputable cultural channels
- [ ] Territory coordinates are accurate (verified on map)

### Adding a Recipe

Recipes are stored in `src/data/recipes.ts`. Follow this structure:

```typescript
{
  id: "recipe-slug",
  name: "Recipe Name",
  localName: "Name in Local Language",
  tribe: "Associated Tribe",
  tribeSlug: "tribe-slug",
  description: "Brief description of the dish",
  difficulty: "easy" | "medium" | "hard",
  category: "Staple" | "Special" | "Beverage" | "Snack",
  prepTime: "15 minutes",
  cookTime: "30 minutes",
  servings: 4,
  ingredients: [
    { item: "Ingredient", amount: "2 cups", notes: "optional notes" }
  ],
  instructions: [
    "Step 1 instructions",
    "Step 2 instructions"
  ],
  history: "Cultural/historical context of the dish",
  videoId: "YouTube_Video_ID",
  imageUrl: "/recipes/image.jpg"
}
```

### Adding a Religion

Religions are stored in `src/data/traditionalReligions.ts`. Include:

- Name and alternate names
- Region/countries where practiced
- Core beliefs and tenets
- Key rituals and ceremonies
- Associated tribes
- Estimated followers
- Historical context

### Adding Language Data

Language families are in `src/data/languageFamilies.json`. For new phrases:

```json
{
  "phrase": "Hello",
  "translation": "Local translation",
  "pronunciation": "/pho-ne-tic/",
  "audioHint": "Notes for TTS engine"
}
```

---

## Translation Guidelines

### Priority Languages

We're actively seeking translations for:

1. 🇫🇷 **French** - Widely spoken in West/Central Africa
2. 🇰🇪 **Swahili** - East African lingua franca
3. 🇸🇦 **Arabic** - North Africa
4. 🇵🇹 **Portuguese** - Lusophone Africa
5. 🇿🇦 **Zulu/Xhosa** - Southern Africa

### What to Translate

| File | Content |
|------|---------|
| `src/components/Header.tsx` | Navigation labels |
| `src/components/Footer.tsx` | Footer links |
| `src/pages/Index.tsx` | Home page text |
| `src/components/GuessForm.tsx` | Form labels and placeholders |

### Translation Format

Create a new file: `src/locales/{language-code}.json`

```json
{
  "nav.guess": "Guess",
  "nav.learn": "Learn",
  "nav.blog": "Blog",
  "nav.randomTribe": "Random Tribe",
  "home.title": "Guess Her Tribe",
  "home.subtitle": "Enter a name to discover the tribe...",
  "form.name": "Name",
  "form.country": "Country",
  "form.submit": "Guess the Tribe"
}
```

### Translation Quality

- ✅ Use natural, colloquial language (not literal translations)
- ✅ Maintain cultural context
- ✅ Test that translated strings fit in the UI
- ✅ Have a native speaker review translations

---

## Code Contribution Guidelines

### Setting Up Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/tribeguess.git
cd tribeguess

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Build for production
npm run build
```

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-swahili-translation` |
| Bug Fix | `fix/description` | `fix/recipe-link-broken` |
| Data | `data/description` | `data/add-maasai-recipes` |
| Docs | `docs/description` | `docs/update-readme` |

### Commit Messages

Use conventional commits:

```
feat: add Yoruba language phrases
fix: correct Kikuyu population data
docs: update contributing guidelines
data: add 5 new Nigerian tribes
style: improve mobile navigation
refactor: extract tribe card component
```

### Code Quality Checklist

Before submitting:

- [ ] Code compiles without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] UI is responsive (test on mobile viewport)
- [ ] New features work in both light and dark mode
- [ ] Console has no errors or warnings
- [ ] Changes are documented in code comments

### Testing Your Changes

1. **Run regression tests** (see `src/__tests__/REGRESSION_TESTS.md`)
2. **Test key user flows**:
   - Name search works correctly
   - Filters update URL and results
   - Links navigate properly
   - Audio plays without errors
3. **Check mobile responsiveness**

---

## Pull Request Process

### Before Submitting

1. ✅ Read the [Style Guide](#style-guide)
2. ✅ Complete the relevant checklist above
3. ✅ Test your changes thoroughly
4. ✅ Update documentation if needed

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Data addition/update
- [ ] Translation
- [ ] Documentation

## Checklist
- [ ] Code compiles without errors
- [ ] Changes tested on mobile
- [ ] Data verified against sources
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots of UI changes

## Data Sources (if applicable)
List sources for any new data
```

### Review Process

1. Submit PR to `main` branch
2. Maintainers review within 48-72 hours
3. Address any feedback
4. Once approved, PR is merged

---

## Style Guide

### TypeScript/React

```typescript
// Use functional components with TypeScript
interface TribeCardProps {
  tribe: Tribe;
  onClick?: () => void;
}

export function TribeCard({ tribe, onClick }: TribeCardProps) {
  return (
    <div className="card" onClick={onClick}>
      {/* Content */}
    </div>
  );
}
```

### Tailwind CSS

- Use semantic color tokens: `bg-primary`, `text-foreground`, `border-border`
- Avoid arbitrary values when possible
- Use responsive prefixes: `sm:`, `md:`, `lg:`
- Group related classes logically

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-4 bg-card rounded-lg border">

// ❌ Avoid
<div className="flex items-center gap-[17px] p-[15px] bg-[#fff] rounded-[8px]">
```

### Data Formatting

- Use sentence case for descriptions
- Population: `~X million` or `~X,000`
- Dates: `YYYY` or `Xth century`
- Coordinates: Decimal degrees (4 decimal places)

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level components
├── data/           # Static data files
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── assets/         # Images, fonts
```

---

## Questions?

- 💬 Open a GitHub Discussion
- 🐛 File an Issue for bugs
- 📧 Contact maintainers

Thank you for helping preserve African cultural heritage! 🌍
