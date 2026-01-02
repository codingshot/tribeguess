import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Sparkles, HelpCircle, ChevronDown, ChevronUp, MapPin, Users, Heart } from 'lucide-react';

interface GuessFormProps {
  initialName?: string;
  initialTime?: string;
  initialRegion?: string;
  initialBuild?: string;
  initialPersonality?: string;
}

const timeOptions = [
  { value: '', label: 'Unknown / Skip' },
  { value: 'morning', label: '🌅 Morning (6am - 12pm)' },
  { value: 'day', label: '☀️ Afternoon (12pm - 5pm)' },
  { value: 'evening', label: '🌆 Evening (5pm - 8pm)' },
  { value: 'night', label: '🌙 Night (8pm - 6am)' },
];

const regionOptions = [
  { value: '', label: 'Unknown / Skip' },
  { value: 'central', label: '🏔️ Central Kenya (Nairobi, Kiambu, Nyeri, Murang\'a)' },
  { value: 'western', label: '🌾 Western Kenya (Kakamega, Bungoma, Kisumu)' },
  { value: 'rift-valley', label: '🏃 Rift Valley (Eldoret, Nakuru, Kericho)' },
  { value: 'eastern', label: '🌿 Eastern Kenya (Machakos, Kitui, Meru)' },
  { value: 'coast', label: '🏖️ Coastal Region (Mombasa, Malindi, Lamu)' },
  { value: 'nyanza', label: '🐟 Nyanza (Kisii, Homa Bay, Migori)' },
];

const buildOptions = [
  { value: '', label: 'Unknown / Skip' },
  { value: 'tall-slender', label: '📏 Tall & Slender' },
  { value: 'athletic', label: '💪 Athletic Build' },
  { value: 'petite', label: '🌸 Petite' },
  { value: 'curvy', label: '✨ Curvy' },
  { value: 'average', label: '👤 Average Build' },
];

const personalityOptions = [
  { value: '', label: 'Unknown / Skip' },
  { value: 'business-minded', label: '💼 Business-minded & Ambitious' },
  { value: 'outgoing', label: '🎉 Outgoing & Social' },
  { value: 'reserved', label: '📚 Reserved & Thoughtful' },
  { value: 'artistic', label: '🎨 Creative & Artistic' },
  { value: 'nurturing', label: '💝 Nurturing & Family-oriented' },
];

export function GuessForm({ 
  initialName = '', 
  initialTime = '',
  initialRegion = '',
  initialBuild = '',
  initialPersonality = ''
}: GuessFormProps) {
  const [name, setName] = useState(initialName);
  const [timeOfBirth, setTimeOfBirth] = useState(initialTime);
  const [region, setRegion] = useState(initialRegion);
  const [build, setBuild] = useState(initialBuild);
  const [personality, setPersonality] = useState(initialPersonality);
  const [showTimeHelp, setShowTimeHelp] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    const namePattern = /^[a-zA-Z\s\-']+$/;
    if (!namePattern.test(trimmedName)) return;
    
    const params = new URLSearchParams();
    params.set('name', trimmedName.slice(0, 50));
    if (timeOfBirth) params.set('time', timeOfBirth);
    if (region) params.set('region', region);
    if (build) params.set('build', build);
    if (personality) params.set('personality', personality);
    
    navigate(`/?${params.toString()}`);
  };

  const hasAdvancedClues = region || build || personality;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4" role="search">
      <div>
        <label htmlFor="name-input" className="block text-sm font-medium text-foreground mb-1.5">
          Enter Her Name
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          First name works best - we'll analyze the naming patterns
        </p>
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wanjiku, Achieng, Nafula..."
            className="input-tribal pl-10 sm:pl-12 text-base sm:text-lg"
            autoFocus
            maxLength={50}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck="false"
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="time-select" className="block text-sm font-medium text-foreground">
            Time of Birth <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <button
            type="button"
            onClick={() => setShowTimeHelp(!showTimeHelp)}
            className="text-muted-foreground hover:text-primary p-1 touch-manipulation"
            aria-label="Why does time matter?"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        {showTimeHelp && (
          <div className="text-xs text-muted-foreground mb-2 p-2 bg-secondary rounded-lg animate-fade-in">
            💡 <strong>Why time matters:</strong> Many Kenyan tribes name children based on when they were born. 
            For example, "Otieno" (Luo) means born at night, while "Kipkoech" (Kalenjin) means born in the morning.
          </div>
        )}
        <div className="relative">
          <Clock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
          <select
            id="time-select"
            value={timeOfBirth}
            onChange={(e) => setTimeOfBirth(e.target.value)}
            className="input-tribal pl-10 sm:pl-12 appearance-none cursor-pointer text-sm sm:text-base"
          >
            {timeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Advanced Mode Toggle */}
      <button
        type="button"
        onClick={() => setAdvancedMode(!advancedMode)}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
      >
        {advancedMode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {advancedMode ? 'Hide' : 'Show'} Advanced Clues
        {hasAdvancedClues && !advancedMode && (
          <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
            {[region, build, personality].filter(Boolean).length} added
          </span>
        )}
      </button>

      {advancedMode && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Add more clues to improve prediction accuracy
          </p>
          
          {/* Region */}
          <div>
            <label htmlFor="region-select" className="block text-sm font-medium text-foreground mb-1.5">
              <MapPin className="w-4 h-4 inline mr-1" />
              Where is she from?
            </label>
            <div className="relative">
              <select
                id="region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-tribal appearance-none cursor-pointer text-sm"
              >
                {regionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Build */}
          <div>
            <label htmlFor="build-select" className="block text-sm font-medium text-foreground mb-1.5">
              <Users className="w-4 h-4 inline mr-1" />
              Body Build
            </label>
            <div className="relative">
              <select
                id="build-select"
                value={build}
                onChange={(e) => setBuild(e.target.value)}
                className="input-tribal appearance-none cursor-pointer text-sm"
              >
                {buildOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div>
            <label htmlFor="personality-select" className="block text-sm font-medium text-foreground mb-1.5">
              <Heart className="w-4 h-4 inline mr-1" />
              Personality Vibe
            </label>
            <div className="relative">
              <select
                id="personality-select"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="input-tribal appearance-none cursor-pointer text-sm"
              >
                {personalityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base py-3 sm:py-4 touch-manipulation"
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        Guess the Tribe
      </button>
    </form>
  );
}
