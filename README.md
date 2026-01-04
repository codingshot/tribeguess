<p align="center">
  <img src="src/assets/logo.png" alt="TribeGuess Logo" width="120" height="120" />
</p>

<h1 align="center">🌍 TribeGuess - African Tribe Guesser</h1>

<p align="center">
  <strong>Discover African heritage through names, culture, and traditions</strong>
</p>

<p align="center">
  <a href="https://tribeguess.com">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#quick-links">Quick Links</a> •
  <a href="#user-stories">User Stories</a> •
  <a href="#improvements">Improvements</a>
</p>

---

## 📖 About

**TribeGuess** is an educational entertainment web application that predicts African tribal heritage based on names. It combines a sophisticated name-matching algorithm with a comprehensive cultural encyclopedia covering 50+ tribes across 25+ African countries.

The app serves as both:
1. **A Guessing Game** - Enter a name and discover its likely tribal origin
2. **A Cultural Encyclopedia** - Explore detailed information about African tribes, languages, traditions, and famous people

### 🎯 Mission

To celebrate and preserve African cultural diversity by making tribal heritage accessible, educational, and engaging for a global audience.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| **🔮 Name-Based Tribe Detection** | AI-powered algorithm analyzing 500+ name patterns, prefixes, and suffixes |
| **📚 Tribe Encyclopedia** | Detailed pages for 50+ tribes with history, culture, and traditions |
| **🗺️ Interactive Maps** | OpenStreetMap integration showing tribal territories with custom overlays |
| **🎲 Random Tribe Explorer** | SEO-optimized random tribe discovery feature |
| **🔊 Audio Greetings** | Web Speech API pronunciation for tribal greetings |
| **📺 Culture Documentaries** | Verified YouTube embeds for each tribe |
| **🔍 Advanced Search & Filters** | Multi-country, language family, and region filtering |

### Advanced Features

- **Multi-Country Support**: Tracks tribes across borders (e.g., Maasai in Kenya & Tanzania)
- **URL State Synchronization**: All filters and searches are shareable via URL
- **Gender Dynamics**: Cultural context on traditional roles and stereotypes
- **Religious Influence Profiles**: Visualized religious demographics per tribe
- **Name Meaning Database**: 500+ verified name meanings with gender classification
- **Population Statistics**: Demographic data with visual breakdowns

---

## 🔗 Quick Links

| Route | Description |
|-------|-------------|
| [`tribeguess.com/`](https://tribeguess.com/) | Home - Guess tribe by name |
| [`tribeguess.com/learn`](https://tribeguess.com/learn) | Encyclopedia - Browse all tribes |
| [`tribeguess.com/learn/:slug`](https://tribeguess.com/learn/kikuyu) | Tribe Detail - Individual tribe page |
| [`tribeguess.com/random`](https://tribeguess.com/random) | Random - Discover a random tribe |
| [`tribeguess.com/learn?country=NG`](https://tribeguess.com/learn?country=NG) | Filter by Country |
| [`tribeguess.com/learn?macroRegion=West%20Africa`](https://tribeguess.com/learn?macroRegion=West%20Africa) | Filter by Region |
| [`tribeguess.com/learn?languageFamily=Bantu`](https://tribeguess.com/learn?languageFamily=Bantu) | Filter by Language |
| [`tribeguess.com/?name=Wanjiku&country=KE`](https://tribeguess.com/?name=Wanjiku&country=KE) | Direct Guess Link |

---

## 📁 Project Structure

```
tribeguess/
├── public/
│   ├── tribes/                    # Tribe-specific images
│   │   └── himba/                 # Example: Himba tribe gallery
│   ├── favicon.png                # Site favicon
│   ├── og-image.png               # Social sharing preview
│   └── robots.txt                 # SEO crawl rules
│
├── src/
│   ├── assets/
│   │   └── logo.png               # Main application logo
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui component library (50+ components)
│   │   ├── DynamicMapView.tsx     # Africa-wide map with country bounds
│   │   ├── GuessForm.tsx          # Name input with advanced clues
│   │   ├── Header.tsx             # Navigation with Random button
│   │   ├── ImageGallery.tsx       # Tribe culture photo gallery
│   │   ├── KenyaMapView.tsx       # Legacy Kenya-specific map
│   │   ├── NameSearch.tsx         # Name meaning search component
│   │   ├── NavLink.tsx            # Navigation link component
│   │   ├── PersonCard.tsx         # Famous person profile card
│   │   ├── TribeCard.tsx          # Tribe preview card for grid
│   │   ├── TribeMap.tsx           # Individual tribe territory map
│   │   └── TribeResultCard.tsx    # Prediction result display
│   │
│   ├── data/
│   │   └── tribes.json            # Master tribe database (50+ tribes)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notification hook
│   │
│   ├── lib/
│   │   ├── tribeDetection.ts      # Core detection algorithm (2300+ lines)
│   │   └── utils.ts               # Utility functions
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Home page - guess form
│   │   ├── Learn.tsx              # Encyclopedia page - grid/map view
│   │   ├── TribePage.tsx          # Individual tribe detail page
│   │   ├── RandomTribe.tsx        # SEO-optimized random redirect
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── App.tsx                    # Root component with routing
│   ├── App.css                    # Global styles
│   ├── index.css                  # Tailwind base & custom tokens
│   └── main.tsx                   # Application entry point
│
├── index.html                     # HTML template with SEO meta
├── tailwind.config.ts             # Tailwind configuration
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies & scripts
```

---

## 👤 User Stories

### Primary User Stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-01 | Curious user | Enter a name and see which tribe it belongs to | I can learn about my heritage or a friend's |
| US-02 | Student | Browse an encyclopedia of African tribes | I can learn about cultural diversity |
| US-03 | Researcher | Filter tribes by country, region, and language family | I can find specific cultural groups |
| US-04 | Explorer | Click "Random" to discover a new tribe | I can expand my cultural knowledge |
| US-05 | Learner | Watch documentary videos on tribe pages | I can see visual representations of cultures |
| US-06 | User | Share my results via URL | My friends can see the same prediction |

### Secondary User Stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-07 | Mobile user | Use the app on my phone seamlessly | I can access it anywhere |
| US-08 | Visitor | See an interactive map of tribal territories | I can understand geographic distribution |
| US-09 | Language enthusiast | Listen to greetings in tribal languages | I can learn basic phrases |
| US-10 | History buff | Read about tribal origins and colonial history | I can understand historical context |
| US-11 | User | Search for names and see their meanings | I can understand name etymology |
| US-12 | Power user | Use advanced clues (time, region, build) | I can get more accurate predictions |

### Future User Stories (Backlog)

| ID | As a... | I want to... | Priority |
|----|---------|--------------|----------|
| US-13 | User | Create an account to save favorite tribes | Medium |
| US-14 | Contributor | Submit corrections to tribe data | High |
| US-15 | User | Take a cultural quiz about tribes | Low |
| US-16 | Developer | Access an API for tribe data | Low |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | ^18.3.1 |
| **TypeScript** | Type Safety | ~5.6.2 |
| **Vite** | Build Tool | ^5.4.11 |
| **Tailwind CSS** | Styling | ^3.4.17 |
| **shadcn/ui** | Component Library | Latest |
| **React Router** | Navigation | ^6.30.1 |

### Key Libraries

| Library | Purpose |
|---------|---------|
| `@tanstack/react-query` | Data fetching & caching |
| `lucide-react` | Icon library |
| `react-helmet-async` | SEO meta management |
| `sonner` | Toast notifications |
| `recharts` | Data visualization |
| `class-variance-authority` | Component variants |
| `tailwind-merge` | Class merging utility |
| `zod` | Schema validation |
| `react-hook-form` | Form management |
| `date-fns` | Date utilities |
| `embla-carousel-react` | Carousel component |

### External APIs & Services

| Service | Usage |
|---------|-------|
| **OpenStreetMap** | Interactive map tiles |
| **YouTube Embed** | Documentary videos |
| **Web Speech API** | Audio pronunciation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tribeguess.git

# Navigate to project directory
cd tribeguess

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📈 Improvements & Roadmap

### 🔴 High Priority

| Improvement | Description | Impact |
|-------------|-------------|--------|
| **Central African Data** | Add DR Congo, Cameroon, CAR tribes with Bantu/Pygmy patterns | Data completeness |
| **Data Validation Dashboard** | Show tribes missing YouTube, images, famous people | Quality control |
| **Phonetic Fuzzy Matching** | Handle spelling variations and typos | Accuracy |
| **Performance Optimization** | Lazy load tribe data, virtualize lists | Speed |
| **PWA Support** | Add service worker for offline access | Accessibility |

### 🟡 Medium Priority

| Improvement | Description | Impact |
|-------------|-------------|--------|
| **User Accounts** | Save favorite tribes, history | Engagement |
| **Community Corrections** | Allow users to submit data fixes | Data quality |
| **Multi-language Support** | Translate UI to French, Swahili, etc. | Reach |
| **Advanced Analytics** | Track popular searches, tribe views | Insights |
| **API Endpoint** | Public API for tribe data | Developer adoption |

### 🟢 Future Ideas

| Feature | Description |
|---------|-------------|
| **Cultural Quiz** | Interactive quiz about tribe traditions |
| **Family Tree Builder** | Map multi-tribal heritage |
| **AR Name Cards** | Augmented reality name meaning cards |
| **Voice Search** | Speak a name to search |
| **Tribe Comparison** | Side-by-side culture comparison |
| **Historical Timeline** | Interactive migration timelines |

### 🐛 Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Some map overlays in ocean | Investigating | Coordinates being verified |
| Speech synthesis limited languages | Browser limitation | Falls back to closest locale |
| Mobile keyboard covers input | CSS fix needed | Scroll up manually |

---

## 📊 Data Sources & Verification

All tribe data is triple fact-checked against verified sources:

### Academic Sources
- Ethnologue (ethnologue.com)
- Joshua Project (joshuaproject.net)
- Wikipedia (with cross-referencing)

### Cultural Archives
- Gikuyu Cultural Foundation
- Buganda Kingdom Archives
- Luo Cultural Heritage
- YorubaName.com
- Ulwazi Programme (South Africa)

### Media Sources
- YouTube documentaries (manually verified)
- Cultural photography archives

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### Areas Needing Help

1. **Data Entry**: Adding more tribes, especially from Central/North Africa
2. **Translations**: UI in African languages
3. **Verification**: Cross-checking name meanings
4. **Photography**: Cultural images with proper licensing

---

## 📄 License

This project is for educational and entertainment purposes. Tribe data is compiled from public sources.

---

## ⚠️ Disclaimer

This application is for **entertainment and educational purposes only**. 

- Predictions are based on common naming patterns and may not be accurate for all names
- Stereotypes presented are common perceptions and may not apply to individuals
- We respect all cultures and aim to celebrate African diversity

---

<p align="center">
  <strong>Made with ❤️ for African Cultural Heritage</strong>
</p>

<p align="center">
  <a href="https://tribeguess.com">tribeguess.com</a>
</p>
