import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Wand2, Shuffle, Sparkles, Globe, Users, TrendingUp, 
  Heart, RefreshCw, Copy, Check, ArrowRight, Filter
} from 'lucide-react';
import { analyzeGender, getNameHistory } from '@/lib/genderNameAnalysis';

// Name database organized by criteria
const NAME_DATABASE = {
  'East Africa': {
    male: ['Otieno', 'Kipkoech', 'Baraka', 'Juma', 'Mugisha', 'Mutiso', 'Kimani', 'Ochieng', 'Waswa', 'Gitau'],
    female: ['Wanjiku', 'Achieng', 'Nafula', 'Neema', 'Zawadi', 'Rehema', 'Nakato', 'Uwimana', 'Mwende', 'Njeri'],
    unisex: ['Amani', 'Imani', 'Furaha', 'Tumaini', 'Upendo', 'Baraka']
  },
  'West Africa': {
    male: ['Chukwuemeka', 'Okonkwo', 'Adebayo', 'Kofi', 'Kwame', 'Amadou', 'Mamadou', 'Ousmane', 'Sekou', 'Modibo'],
    female: ['Adaeze', 'Chiamaka', 'Ngozi', 'Akosua', 'Abena', 'Yaa', 'Fatou', 'Aminata', 'Mariama', 'Fanta'],
    unisex: ['Oluwaseun', 'Ayo', 'Tunde', 'Femi', 'Tobi']
  },
  'North Africa': {
    male: ['Mohamed', 'Ahmed', 'Omar', 'Yusuf', 'Ibrahim', 'Hassan', 'Tariq', 'Khalid', 'Rashid', 'Jamal'],
    female: ['Fatima', 'Aisha', 'Khadija', 'Maryam', 'Zahra', 'Salma', 'Leila', 'Samira', 'Nadia', 'Layla'],
    unisex: ['Noor', 'Iman', 'Amal']
  },
  'Southern Africa': {
    male: ['Sipho', 'Themba', 'Bongani', 'Thabo', 'Nkosi', 'Mandla', 'Siyanda', 'Thabiso', 'Sibusiso', 'Lefa'],
    female: ['Thandiwe', 'Nomvula', 'Lindiwe', 'Mpho', 'Lerato', 'Sibongile', 'Zodwa', 'Zinhle', 'Nokuthula', 'Bongi'],
    unisex: ['Mpho', 'Themba', 'Lesedi']
  },
  'Central Africa': {
    male: ['Kabila', 'Mutombo', 'Lukaku', 'Lumumba', 'Ilunga', 'Kazadi', 'Kasongo', 'Wemba', 'Tshisekedi', 'Bemba'],
    female: ['Nzinga', 'Ngono', 'Mbarga', 'Ngalula', 'Kalala', 'Yolanda', 'Esther', 'Grace', 'Patience', 'Blessing'],
    unisex: ['Fofana', 'Kanda']
  },
  'Horn of Africa': {
    male: ['Haile', 'Abebe', 'Biruk', 'Abdi', 'Hussein', 'Yohannes', 'Bekele', 'Gebre', 'Tesfaye', 'Dawit'],
    female: ['Tigist', 'Meron', 'Tsehay', 'Mahlet', 'Asha', 'Sahra', 'Ayan', 'Hodan', 'Selam', 'Bethlehem'],
    unisex: ['Farah', 'Amara']
  }
};

const MEANINGS = {
  spiritual: ['Imani', 'Baraka', 'Neema', 'Ibrahim', 'Fatima', 'Noor', 'Iman', 'Mohamed', 'Yusuf'],
  strength: ['Themba', 'Mandla', 'Sipho', 'Okonkwo', 'Haile', 'Nkosi', 'Chukwuemeka', 'Kabila'],
  beauty: ['Zinhle', 'Thandiwe', 'Lindiwe', 'Adaeze', 'Zahra', 'Leila', 'Wanjiku', 'Njeri'],
  joy: ['Furaha', 'Amani', 'Upendo', 'Zawadi', 'Tumaini', 'Neema', 'Joy', 'Happy'],
  wisdom: ['Kofi', 'Kwame', 'Sekou', 'Amadou', 'Rashid', 'Hakim', 'Solomon'],
  royalty: ['Adebayo', 'Nkosi', 'Oba', 'Eze', 'Nzinga', 'Kabila', 'Lumumba'],
  warrior: ['Shaka', 'Okonkwo', 'Haile', 'Nzinga', 'Amina', 'Mandla', 'Themba']
};

const POPULARITY_RANGES = {
  classic: { label: 'Classic/Timeless', min: 0, max: 30 },
  moderate: { label: 'Moderately Popular', min: 30, max: 60 },
  trending: { label: 'Currently Trending', min: 60, max: 100 }
};

interface GeneratorFilters {
  region: string;
  gender: 'male' | 'female' | 'unisex' | 'any';
  meaning: string;
  popularity: string;
}

export function NameGenerator() {
  const [filters, setFilters] = useState<GeneratorFilters>({
    region: '',
    gender: 'any',
    meaning: '',
    popularity: ''
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  // Get all available names based on filters
  const availableNames = useMemo(() => {
    let names: string[] = [];
    
    const regions = filters.region 
      ? [filters.region] 
      : Object.keys(NAME_DATABASE);
    
    regions.forEach(region => {
      const regionData = NAME_DATABASE[region as keyof typeof NAME_DATABASE];
      if (regionData) {
        if (filters.gender === 'any') {
          names = [...names, ...regionData.male, ...regionData.female, ...regionData.unisex];
        } else {
          names = [...names, ...(regionData[filters.gender] || [])];
        }
      }
    });

    // Filter by meaning
    if (filters.meaning) {
      const meaningNames = MEANINGS[filters.meaning as keyof typeof MEANINGS] || [];
      names = names.filter(n => meaningNames.includes(n));
    }

    // Filter by popularity
    if (filters.popularity) {
      names = names.filter(name => {
        const history = getNameHistory(name);
        const popLevel = history.popularityTrends?.currentPopularity || 'moderate';
        if (filters.popularity === 'classic') return popLevel === 'rare' || popLevel === 'low';
        if (filters.popularity === 'moderate') return popLevel === 'moderate';
        if (filters.popularity === 'trending') return popLevel === 'high' || popLevel === 'very_high';
        return true;
      });
    }

    return [...new Set(names)];
  }, [filters]);

  const generateNames = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate generation delay for effect
    setTimeout(() => {
      const shuffled = [...availableNames].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));
      setGeneratedNames(selected);
      setIsGenerating(false);
    }, 500);
  }, [availableNames]);

  const copyToClipboard = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const updateFilter = (key: keyof GeneratorFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ region: '', gender: 'any', meaning: '', popularity: '' });
    setGeneratedNames([]);
  };

  const regions = Object.keys(NAME_DATABASE);
  const meanings = Object.keys(MEANINGS);

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Name Generator
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 mb-6 pb-6 border-b">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  Region
                </label>
                <select
                  value={filters.region}
                  onChange={(e) => updateFilter('region', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">All Regions</option>
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => updateFilter('gender', e.target.value as GeneratorFilters['gender'])}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="any">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              {/* Meaning Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Meaning
                </label>
                <select
                  value={filters.meaning}
                  onChange={(e) => updateFilter('meaning', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Any Meaning</option>
                  {meanings.map(m => (
                    <option key={m} value={m} className="capitalize">{m}</option>
                  ))}
                </select>
              </div>

              {/* Popularity Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Popularity
                </label>
                <select
                  value={filters.popularity}
                  onChange={(e) => updateFilter('popularity', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Any Popularity</option>
                  {Object.entries(POPULARITY_RANGES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {availableNames.length} names match your criteria
              </p>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex gap-3 mb-6">
          <Button 
            onClick={generateNames} 
            disabled={isGenerating || availableNames.length === 0}
            className="flex-1"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Names
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={generateNames}
            disabled={isGenerating || availableNames.length === 0}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        {/* Generated Names */}
        {generatedNames.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Generated Names:</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {generatedNames.map((name, index) => {
                const gender = analyzeGender(name);
                const history = getNameHistory(name);
                
                return (
                  <div 
                    key={name}
                    className="group relative p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {gender.detectedGender}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {history.estimatedAgeRange?.generationLabel || 'Classic'}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedName === name ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/?name=${name}`}>
                          Analyze
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {generatedNames.length === 0 && !isGenerating && (
          <div className="text-center py-8 text-muted-foreground">
            <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Set your preferences and click "Generate Names"</p>
            <p className="text-sm mt-1">to discover perfect African names</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
