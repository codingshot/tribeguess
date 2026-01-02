import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Sparkles, HelpCircle } from 'lucide-react';

interface GuessFormProps {
  initialName?: string;
  initialTime?: string;
}

const timeOptions = [
  { value: '', label: 'Unknown / Skip' },
  { value: 'morning', label: '🌅 Morning (6am - 12pm)' },
  { value: 'day', label: '☀️ Afternoon (12pm - 5pm)' },
  { value: 'evening', label: '🌆 Evening (5pm - 8pm)' },
  { value: 'night', label: '🌙 Night (8pm - 6am)' },
];

export function GuessForm({ initialName = '', initialTime = '' }: GuessFormProps) {
  const [name, setName] = useState(initialName);
  const [timeOfBirth, setTimeOfBirth] = useState(initialTime);
  const [showTimeHelp, setShowTimeHelp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    // Basic validation - only allow letters, spaces, hyphens, and apostrophes
    const namePattern = /^[a-zA-Z\s\-']+$/;
    if (!namePattern.test(trimmedName)) return;
    
    const params = new URLSearchParams();
    params.set('name', trimmedName.slice(0, 50));
    if (timeOfBirth && timeOfBirth !== '') {
      params.set('time', timeOfBirth);
    }
    
    navigate(`/?${params.toString()}`);
  };

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
            Adding this can improve accuracy!
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
