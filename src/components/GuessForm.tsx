import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Sparkles } from 'lucide-react';

interface GuessFormProps {
  initialName?: string;
  initialTime?: string;
}

const timeOptions = [
  { value: '', label: 'Any time' },
  { value: 'morning', label: '🌅 Morning (6am - 12pm)' },
  { value: 'day', label: '☀️ Afternoon (12pm - 5pm)' },
  { value: 'evening', label: '🌆 Evening (5pm - 8pm)' },
  { value: 'night', label: '🌙 Night (8pm - 6am)' },
];

export function GuessForm({ initialName = '', initialTime = '' }: GuessFormProps) {
  const [name, setName] = useState(initialName);
  const [timeOfBirth, setTimeOfBirth] = useState(initialTime);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const params = new URLSearchParams();
    params.set('name', name.trim());
    if (timeOfBirth) params.set('time', timeOfBirth);
    
    navigate(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a Kenyan name..."
          className="input-tribal pl-12 text-lg"
          autoFocus
        />
      </div>
      
      <div className="relative">
        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <select
          value={timeOfBirth}
          onChange={(e) => setTimeOfBirth(e.target.value)}
          className="input-tribal pl-12 appearance-none cursor-pointer"
        >
          {timeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Sparkles className="w-5 h-5" />
        Guess My Tribe
      </button>
    </form>
  );
}
