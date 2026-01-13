import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, ChevronDown, Star, User, Users } from 'lucide-react';
import { analyzeGender } from '@/lib/genderNameAnalysis';
import { cn } from '@/lib/utils';

// Extended name database for searching
const ALL_NAMES = {
  'East Africa': [
    'Wanjiku', 'Achieng', 'Nafula', 'Otieno', 'Kipkoech', 'Amani', 'Neema', 'Baraka',
    'Zawadi', 'Furaha', 'Imani', 'Juma', 'Rehema', 'Tumaini', 'Upendo', 'Nakato',
    'Mugisha', 'Uwimana', 'Amahoro', 'Ingabire', 'Kaluki', 'Mwende', 'Mutiso'
  ],
  'West Africa': [
    'Adaeze', 'Chiamaka', 'Ngozi', 'Chukwuemeka', 'Okonkwo', 'Adebayo', 'Oluwaseun',
    'Kofi', 'Kwame', 'Akosua', 'Abena', 'Yaa', 'Amadou', 'Mamadou', 'Ousmane',
    'Fatou', 'Aminata', 'Mariama', 'Sekou', 'Fanta', 'Modibo', 'Djénéba'
  ],
  'North Africa': [
    'Mohamed', 'Fatima', 'Ahmed', 'Aisha', 'Omar', 'Khadija', 'Yusuf', 'Maryam',
    'Ibrahim', 'Zahra', 'Hassan', 'Salma', 'Tariq', 'Leila', 'Khalid', 'Samira'
  ],
  'Southern Africa': [
    'Thandiwe', 'Nomvula', 'Lindiwe', 'Sipho', 'Themba', 'Bongani', 'Mpho',
    'Lerato', 'Thabo', 'Sibongile', 'Nkosi', 'Zodwa', 'Mandla', 'Siyanda', 'Zinhle'
  ],
  'Central Africa': [
    'Kabila', 'Mutombo', 'Lukaku', 'Nzinga', 'Lumumba', 'Ngono', 'Mbarga',
    'Fofana', 'Ilunga', 'Kazadi', 'Kalala', 'Ngalula', 'Kasongo', 'Wemba'
  ],
  'Horn of Africa': [
    'Tigist', 'Meron', 'Haile', 'Abebe', 'Tsehay', 'Biruk', 'Mahlet', 'Abdi',
    'Farah', 'Asha', 'Hussein', 'Sahra', 'Ayan', 'Hodan', 'Yohannes', 'Selam'
  ]
};

interface NameSearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  favorites?: string[];
  className?: string;
}

export function NameSearchDropdown({
  value,
  onChange,
  placeholder = "Search or type a name...",
  label,
  favorites = [],
  className
}: NameSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // All names with metadata
  const allNamesData = useMemo(() => {
    const names: { name: string; region: string; gender: string; isFavorite: boolean }[] = [];
    Object.entries(ALL_NAMES).forEach(([region, regionNames]) => {
      regionNames.forEach(name => {
        const genderInfo = analyzeGender(name);
        names.push({
          name,
          region,
          gender: genderInfo.detectedGender,
          isFavorite: favorites.includes(name)
        });
      });
    });
    return names.sort((a, b) => {
      // Favorites first
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [favorites]);

  // Filtered names
  const filteredNames = useMemo(() => {
    if (!search) return allNamesData;
    const query = search.toLowerCase();
    return allNamesData.filter(n => 
      n.name.toLowerCase().includes(query) ||
      n.region.toLowerCase().includes(query)
    );
  }, [allNamesData, search]);

  // Group by region
  const groupedNames = useMemo(() => {
    const groups: Record<string, typeof filteredNames> = {};
    
    // Favorites group
    const favs = filteredNames.filter(n => n.isFavorite);
    if (favs.length > 0) {
      groups['⭐ Favorites'] = favs;
    }
    
    // Region groups
    filteredNames.filter(n => !n.isFavorite).forEach(n => {
      if (!groups[n.region]) {
        groups[n.region] = [];
      }
      groups[n.region].push(n);
    });
    
    return groups;
  }, [filteredNames]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
    setSearch('');
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male': return <User className="w-3 h-3 text-blue-500" />;
      case 'female': return <User className="w-3 h-3 text-pink-500" />;
      default: return <Users className="w-3 h-3 text-purple-500" />;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label && (
        <label className="text-sm font-medium mb-2 block">{label}</label>
      )}
      
      {/* Trigger button */}
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="w-full justify-between h-10"
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="hover:bg-muted rounded p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown className="w-4 h-4 opacity-50" />
        </div>
      </Button>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search names..."
                className="pl-8 h-9"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredNames.length > 0) {
                    handleSelect(filteredNames[0].name);
                  }
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
              />
            </div>
          </div>
          
          {/* Results */}
          <ScrollArea className="max-h-64">
            {Object.keys(groupedNames).length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">No names found</p>
                <p className="text-xs mt-1">Type any name to compare</p>
              </div>
            ) : (
              <div className="p-1">
                {Object.entries(groupedNames).map(([group, names]) => (
                  <div key={group} className="mb-2">
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                      {group}
                    </div>
                    {names.map(({ name, gender, isFavorite }) => (
                      <button
                        key={name}
                        onClick={() => handleSelect(name)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-accent transition-colors",
                          value === name && "bg-accent"
                        )}
                      >
                        {isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                        {getGenderIcon(gender)}
                        <span className="flex-1 text-left">{name}</span>
                        {value === name && (
                          <Badge variant="secondary" className="text-xs">Selected</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          {/* Quick entry footer */}
          {search && !filteredNames.find(n => n.name.toLowerCase() === search.toLowerCase()) && (
            <div className="border-t p-2">
              <button
                onClick={() => handleSelect(search)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-primary/10 hover:bg-primary/20 text-sm transition-colors"
              >
                <span>Use "{search}" as custom name</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
