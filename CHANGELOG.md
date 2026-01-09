# Changelog

All notable changes to TribeGuess are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Central African tribe expansion (DR Congo, Cameroon, CAR)
- Tribe comparison tool
- PWA support for offline access
- Multi-language UI (French, Swahili)

---

## [2.5.0] - 2025-01-09

### Added
- **Comprehensive tribe data expansion**: Added detailed `eatingCustoms`, `tradeRelations`, and `independenceHistory` to Dogon, Himba, San, Fante, Sukuma, and Chagga tribes
- **Recipe-Language cross-linking**: Recipes now link to their associated language family pages
- **Additional language phrases**: 30 new phrases added across Chadic, Omotic, Atlantic, Kwa, and Gur language families
- **CONTRIBUTING.md**: Detailed guidelines for data entry, translations, and code contributions
- **CHANGELOG.md**: Version history tracking

### Changed
- Mobile country dropdown now shows full country name (e.g., "🇷🇼 Rwanda" instead of just flag)
- Improved README with screenshots and user guides

---

## [2.4.0] - 2025-01-08

### Added
- **Language Families System**: 16 major language groups with detailed pages
  - Niger-Congo, Afroasiatic, Nilo-Saharan, Khoisan
  - Sub-families: Bantu, Cushitic, Semitic, Berber, Nilotic, Chadic, Omotic, Atlantic, Kwa, Gur
- **Audio pronunciations**: Web Speech API with African accents for all phrases
- **Language-Tribe connections**: Bidirectional linking between language families and tribes
- **Language-Recipe connections**: Recipes linked to their linguistic origins

### Changed
- Improved mobile navigation with icon-based compact layout
- Enhanced recipe cards with difficulty badges and cooking times

---

## [2.3.0] - 2025-01-07

### Added
- **Religion Timeline Map**: Interactive animated map showing:
  - Trans-Saharan trade routes with caravan stops
  - Indian Ocean maritime routes
  - Nile Valley trade corridor
  - Atlantic slave trade routes
  - Bantu migration patterns
  - 150+ historical events with dates
- **Timeline controls**: Playback, speed adjustment, and century slider
- **Religion spread visualization**: Dynamic influence radii based on historical data

### Changed
- Religion statistics dashboard now shows real-time filtered data
- Improved pie chart rendering with proper legends

---

## [2.2.0] - 2025-01-06

### Added
- **Religion Comparison Tool**: Compare up to 4 religions side-by-side
  - Floating compare bar on religions page
  - "Compare with others" button on detail pages
  - Side-by-side tenets and practices comparison
- **Religion Statistics Dashboard**: Interactive charts showing:
  - Followers by region (bar chart)
  - Religions per region (pie chart)
  - Country-specific breakdowns
- **29 documented religions**: Including Vodun, Bwiti, Serer, Odinani, and major faiths

### Changed
- Religion detail pages now include YouTube videos
- Improved religion card layout with follower estimates

---

## [2.1.0] - 2025-01-05

### Added
- **Ingredients Database**: Dedicated pages for African staples
  - Plantain, Cassava, Yam, Sorghum, Millet
  - Shea Butter, Palm Oil, Baobab, Hibiscus
  - Nutritional info, local names, varieties
- **Recipe-Ingredient linking**: Click ingredients in recipes to learn more
- **Quiz Achievements**: 13 unique achievements with score bonuses
  - "Speed Demon", "Perfect Day", "Streak Master", etc.
- **Daily Challenge**: 90-second timed quiz with streak tracking

### Changed
- Recipe page now shows ingredient links
- Improved quiz category organization

---

## [2.0.0] - 2025-01-04

### Added
- **Traditional Recipes System**: 100+ authentic African dishes
  - Searchable recipe directory
  - Filter by tribe
  - Detailed recipe pages with instructions
  - YouTube cooking tutorials
  - Cooking time and difficulty ratings
- **Quiz System**: Interactive learning with 9 categories
  - Tribe Identification, Cultural Traditions
  - Famous Africans, Colonial History
  - Geography, Languages, Music & Dance
  - Food & Cuisine, Religion & Spirituality
- **Flashcard mode**: Study cultural facts
- **Global Origins Explorer**: `/global-origins` page for non-African names

### Changed
- Complete redesign of home page hero section
- New "Top African Tribes" carousel with sorting options

---

## [1.9.0] - 2025-01-03

### Added
- **Religious Name Detection**: Algorithm identifies Muslim/Christian names
  - 70+ religious name patterns
  - Suggests tribes with matching religious demographics
- **Global Name Origin Detection**: Identifies non-African patterns
  - European, Asian, Middle Eastern, Pacific origins
  - Explains historical diaspora connections
- **GlobalOriginCard component**: Displays origin info with explanations

### Changed
- Detection algorithm now explains match reasoning
- Improved fallback logic for country-filtered searches

---

## [1.8.0] - 2025-01-02

### Added
- **Cultural Blog System**: SEO-optimized articles
  - "How Kenyan Names Reveal the Time You Were Born"
  - "Nigeria's 250+ Ethnic Groups"
  - "Ghana's Akan Day Names"
  - "Ethiopia: 80+ Ethnic Groups and Never Colonized"
  - "The Himba of Namibia: The Red Ochre People"
  - And more...
- **Blog features**:
  - Search and filter by region/tags
  - Audio player with African accents (TTS)
  - Automatic tribe linking in article text
  - Footnote citation system
  - Related articles suggestions
- **Share functionality**: Social sharing for blogs and recipes

### Changed
- Footer now includes blog navigation
- Improved SEO with JSON-LD structured data

---

## [1.7.0] - 2024-12-30

### Added
- **African Religions Directory**: `/religions` page
  - 29 indigenous and major religions
  - Detailed belief systems and rituals
  - Regional distribution data
- **Religion-Tribe connections**: Link religions to practicing tribes
- **Tribe religious history**: When/how religions were introduced

### Changed
- Tribe pages now show "Religious Influence" section
- Improved tribe detail page layout

---

## [1.6.0] - 2024-12-28

### Added
- **250+ tribes** in database (up from 65)
  - Horn of Africa clans expansion
  - Berber/Amazigh groups
  - Ethiopian Semitic tribes (Harari, Tigre)
- **Cultural Landmarks System**: 260+ verified sites
  - Historical sites, sacred places, museums, UNESCO sites
  - GPS coordinates for map integration
  - Wikimedia Commons images
- **Meal Traditions section**: Eating customs for each tribe
  - Meals per day patterns
  - Food taboos
  - Hospitality customs

### Changed
- Improved territory mapping accuracy for 100+ tribes
- Map overlays now show precise GPS coordinates

---

## [1.5.0] - 2024-12-25

### Added
- **Interactive Map View**: OpenStreetMap integration
  - Country-specific framing with `countryBounds`
  - Territory overlays for each tribe
  - Click markers to navigate to tribe pages
- **List View mode**: Alternative to grid layout
- **View toggle with active states**: Grid/List/Map buttons

### Changed
- Learn page filters now sync with URL parameters
- Improved mobile filter layout with scrollable pills

---

## [1.4.0] - 2024-12-22

### Added
- **Multi-country tribe support**: Track tribes across borders
  - Fulani (13+ countries)
  - Tuareg (7 countries)
  - Somali (5 countries)
  - Maasai (Kenya & Tanzania)
- **Population Pie Charts**: Visual breakdown by country
- **Precision Territory Mapping**: Verified coordinates for 100+ tribes

### Changed
- Tribe cards now show multiple country flags
- Improved population display formatting

---

## [1.3.0] - 2024-12-20

### Added
- **Audio Greetings**: Web Speech API pronunciation
  - East African voice preference
  - Phonetic breakdown display
  - 0.65x speech rate for clarity
- **Culture Documentary Videos**: Verified YouTube embeds for 55+ tribes
- **Language Videos**: Pronunciation tutorials

### Changed
- Greeting section redesigned with audio controls
- Improved phonetic guide formatting

---

## [1.2.0] - 2024-12-18

### Added
- **Advanced Search Clues**: Time of birth, region, build, personality
- **Live Search**: Filters as you type (no Enter required)
- **Full Country Dropdown**: "All Africa" option with names
- **Mobile Search Button**: Touch-friendly submit button

### Changed
- Form layout improved for mobile devices
- Country dropdown now shows flag + name

---

## [1.1.0] - 2024-12-15

### Added
- **Random Tribe Feature**: `/random` route with navbar button
- **SEO Optimization**: Meta tags, Open Graph, JSON-LD
- **Sitemap**: `public/sitemap.xml` for crawlers
- **404 Page**: Custom not found page with suggestions
- **Legal Pages**: Privacy Policy and Terms of Service

### Changed
- Improved header navigation with icons
- Footer redesigned with more links

---

## [1.0.0] - 2024-12-10

### Added
- **Initial Release**
- Name-based tribe detection algorithm (600+ patterns)
- Tribe encyclopedia with 65+ tribes
- Grid view with country/region filters
- Tribe detail pages with:
  - Description and stereotypes
  - Famous people
  - Name meanings database
  - Gender dynamics section
- OpenStreetMap territory display
- Mobile-responsive design
- URL state synchronization

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| 2.5.0 | 2025-01-09 | Expanded tribe data, language cross-linking |
| 2.4.0 | 2025-01-08 | Language families system |
| 2.3.0 | 2025-01-07 | Religion timeline map |
| 2.2.0 | 2025-01-06 | Religion comparison tool |
| 2.1.0 | 2025-01-05 | Ingredients database, quiz achievements |
| 2.0.0 | 2025-01-04 | Recipes system, quiz system |
| 1.9.0 | 2025-01-03 | Religious name detection |
| 1.8.0 | 2025-01-02 | Cultural blog system |
| 1.7.0 | 2024-12-30 | Religions directory |
| 1.6.0 | 2024-12-28 | 250+ tribes, landmarks, meal traditions |
| 1.5.0 | 2024-12-25 | Interactive map view |
| 1.4.0 | 2024-12-22 | Multi-country tribes |
| 1.3.0 | 2024-12-20 | Audio greetings, videos |
| 1.2.0 | 2024-12-18 | Advanced search, live search |
| 1.1.0 | 2024-12-15 | Random tribe, SEO, legal pages |
| 1.0.0 | 2024-12-10 | Initial release |

---

[Unreleased]: https://github.com/yourusername/tribeguess/compare/v2.5.0...HEAD
[2.5.0]: https://github.com/yourusername/tribeguess/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/yourusername/tribeguess/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/yourusername/tribeguess/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/yourusername/tribeguess/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/yourusername/tribeguess/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/yourusername/tribeguess/compare/v1.9.0...v2.0.0
[1.9.0]: https://github.com/yourusername/tribeguess/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/yourusername/tribeguess/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/yourusername/tribeguess/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/yourusername/tribeguess/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/yourusername/tribeguess/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/yourusername/tribeguess/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/yourusername/tribeguess/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/yourusername/tribeguess/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/yourusername/tribeguess/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/yourusername/tribeguess/releases/tag/v1.0.0
