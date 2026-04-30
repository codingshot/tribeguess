import { useState, useMemo, forwardRef } from 'react';
import { normalizeForSearch } from '@/lib/dataValidation';
import { Search, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NameInfo {
  name: string;
  gender: 'male' | 'female';
  meaning?: string;
}

interface NameSearchProps {
  femaleNames: string[];
  maleNames: string[];
  tribeName: string;
  nameDatabase?: Record<string, { meaning: string; gender: 'male' | 'female' }>;
}

export const NameSearch = forwardRef<HTMLElement, NameSearchProps>(function NameSearch({ femaleNames, maleNames, tribeName, nameDatabase = {} }, ref) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<NameInfo | null>(null);

  const safeFemaleNames = useMemo(
    () => (Array.isArray(femaleNames) ? femaleNames.filter((n): n is string => typeof n === 'string') : []),
    [femaleNames]
  );
  const safeMaleNames = useMemo(
    () => (Array.isArray(maleNames) ? maleNames.filter((n): n is string => typeof n === 'string') : []),
    [maleNames]
  );

  const allNames = useMemo(() => {
    const names: NameInfo[] = [];
    safeFemaleNames.forEach(name => {
      const dbEntry = nameDatabase[name.toLowerCase()];
      names.push({
        name,
        gender: 'female',
        meaning: dbEntry?.meaning
      });
    });
    safeMaleNames.forEach(name => {
      const dbEntry = nameDatabase[name.toLowerCase()];
      names.push({
        name,
        gender: 'male',
        meaning: dbEntry?.meaning
      });
    });
    return names;
  }, [safeFemaleNames, safeMaleNames, nameDatabase]);

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return { female: safeFemaleNames.slice(0, 10), male: safeMaleNames.slice(0, 10) };
    
    const queryNorm = normalizeForSearch(searchQuery.slice(0, 100));
    return {
      female: safeFemaleNames.filter(n => normalizeForSearch(n).includes(queryNorm)),
      male: safeMaleNames.filter(n => normalizeForSearch(n).includes(queryNorm))
    };
  }, [searchQuery, safeFemaleNames, safeMaleNames]);

  const handleNameClick = (name: string, gender: 'male' | 'female') => {
    const dbEntry = nameDatabase[name.toLowerCase()];
    setSelectedName({
      name,
      gender,
      meaning: dbEntry?.meaning
    });
  };

  return (
    <section>
      <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
        🔤 Common Names
      </h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.slice(0, 100))}
          placeholder="Search names..."
          maxLength={100}
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected Name Info Modal */}
      {selectedName && (
        <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground">{selectedName.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedName.gender === 'female' 
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {selectedName.gender === 'female' ? '♀ Female' : '♂ Male'}
                </span>
              </div>
              {selectedName.meaning ? (
                <p className="text-sm text-muted-foreground">
                  <strong>Meaning:</strong> {selectedName.meaning}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Common {tribeName} {selectedName.gender} name
                </p>
              )}
              <Link
                to={`/?name=${selectedName.name}`}
                className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
              >
                Try guessing this name →
              </Link>
            </div>
            <button
              onClick={() => setSelectedName(null)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Names Display */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Female Names */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <span className="text-pink-500">♀</span> Female Names
            {searchQuery && <span className="text-primary">({filteredNames.female.length})</span>}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {filteredNames.female.length > 0 ? (
              filteredNames.female.map((name, i) => {
                const hasInfo = nameDatabase[name.toLowerCase()]?.meaning;
                return (
                  <button
                    key={`f-${name}-${i}`}
                    onClick={() => handleNameClick(name, 'female')}
                    className={`badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs sm:text-sm flex items-center gap-1 ${
                      hasInfo ? 'pr-1.5' : ''
                    }`}
                  >
                    {name}
                    {hasInfo && <Info className="w-3 h-3 opacity-50" />}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">No matching names</p>
            )}
          </div>
        </div>

        {/* Male Names */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <span className="text-blue-500">♂</span> Male Names
            {searchQuery && <span className="text-primary">({filteredNames.male.length})</span>}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {filteredNames.male.length > 0 ? (
              filteredNames.male.map((name, i) => {
                const hasInfo = nameDatabase[name.toLowerCase()]?.meaning;
                return (
                  <button
                    key={`m-${name}-${i}`}
                    onClick={() => handleNameClick(name, 'male')}
                    className={`badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs sm:text-sm flex items-center gap-1 ${
                      hasInfo ? 'pr-1.5' : ''
                    }`}
                  >
                    {name}
                    {hasInfo && <Info className="w-3 h-3 opacity-50" />}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">No matching names</p>
            )}
          </div>
        </div>
      </div>

      {/* Tip */}
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Info className="w-3 h-3" />
        Click on a name to see its meaning (if available)
      </p>
    </section>
  );
});
