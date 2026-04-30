import { useState, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Wand2, Shuffle, Sparkles, Globe, Users, TrendingUp, 
  Heart, RefreshCw, Copy, Check, ArrowRight, Filter, 
  Languages, BookOpen, Info
} from 'lucide-react';
import { analyzeGender, getNameHistory } from '@/lib/genderNameAnalysis';
import { useFavoriteNames } from '@/hooks/useFavoriteNames';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { shuffleArray } from '@/lib/shuffleArray';

// Extended name database with tribe and language family metadata
const NAME_DATABASE: Record<string, {
  male: string[];
  female: string[];
  unisex: string[];
  tribes: string[];
  languageFamily: string;
}> = {
  'East Africa': {
    male: ['Otieno', 'Kipkoech', 'Baraka', 'Juma', 'Mugisha', 'Mutiso', 'Kimani', 'Ochieng', 'Waswa', 'Gitau'],
    female: ['Wanjiku', 'Achieng', 'Nafula', 'Neema', 'Zawadi', 'Rehema', 'Nakato', 'Uwimana', 'Mwende', 'Njeri'],
    unisex: ['Amani', 'Imani', 'Furaha', 'Tumaini', 'Upendo', 'Baraka'],
    tribes: ['Kikuyu', 'Luo', 'Kalenjin', 'Luhya', 'Maasai', 'Baganda', 'Banyankole'],
    languageFamily: 'Niger-Congo (Bantu)'
  },
  'West Africa': {
    male: ['Chukwuemeka', 'Okonkwo', 'Adebayo', 'Kofi', 'Kwame', 'Amadou', 'Mamadou', 'Ousmane', 'Sekou', 'Modibo'],
    female: ['Adaeze', 'Chiamaka', 'Ngozi', 'Akosua', 'Abena', 'Yaa', 'Fatou', 'Aminata', 'Mariama', 'Fanta'],
    unisex: ['Oluwaseun', 'Ayo', 'Tunde', 'Femi', 'Tobi'],
    tribes: ['Yoruba', 'Igbo', 'Hausa', 'Akan', 'Fulani', 'Wolof', 'Mandinka'],
    languageFamily: 'Niger-Congo'
  },
  'North Africa': {
    male: ['Mohamed', 'Ahmed', 'Omar', 'Yusuf', 'Ibrahim', 'Hassan', 'Tariq', 'Khalid', 'Rashid', 'Jamal'],
    female: ['Fatima', 'Aisha', 'Khadija', 'Maryam', 'Zahra', 'Salma', 'Leila', 'Samira', 'Nadia', 'Layla'],
    unisex: ['Noor', 'Iman', 'Amal'],
    tribes: ['Arab', 'Berber', 'Tuareg', 'Nubian', 'Coptic'],
    languageFamily: 'Afroasiatic'
  },
  'Southern Africa': {
    male: ['Sipho', 'Themba', 'Bongani', 'Thabo', 'Nkosi', 'Mandla', 'Siyanda', 'Thabiso', 'Sibusiso', 'Lefa'],
    female: ['Thandiwe', 'Nomvula', 'Lindiwe', 'Mpho', 'Lerato', 'Sibongile', 'Zodwa', 'Zinhle', 'Nokuthula', 'Bongi'],
    unisex: ['Mpho', 'Themba', 'Lesedi'],
    tribes: ['Zulu', 'Xhosa', 'Sotho', 'Tswana', 'Ndebele', 'Venda', 'Swazi'],
    languageFamily: 'Niger-Congo (Bantu - Nguni)'
  },
  'Central Africa': {
    male: ['Kabila', 'Mutombo', 'Lukaku', 'Lumumba', 'Ilunga', 'Kazadi', 'Kasongo', 'Wemba', 'Tshisekedi', 'Bemba'],
    female: ['Nzinga', 'Ngono', 'Mbarga', 'Ngalula', 'Kalala', 'Yolanda', 'Esther', 'Grace', 'Patience', 'Blessing'],
    unisex: ['Fofana', 'Kanda'],
    tribes: ['Luba', 'Kongo', 'Mongo', 'Fang', 'Bamileke', 'Bakongo'],
    languageFamily: 'Niger-Congo (Bantu)'
  },
  'Horn of Africa': {
    male: ['Haile', 'Abebe', 'Biruk', 'Abdi', 'Hussein', 'Yohannes', 'Bekele', 'Gebre', 'Tesfaye', 'Dawit'],
    female: ['Tigist', 'Meron', 'Tsehay', 'Mahlet', 'Asha', 'Sahra', 'Ayan', 'Hodan', 'Selam', 'Bethlehem'],
    unisex: ['Farah', 'Amara'],
    tribes: ['Amhara', 'Oromo', 'Tigray', 'Somali', 'Afar'],
    languageFamily: 'Afroasiatic (Cushitic/Semitic)'
  }
};

// Origin explanations for names
const NAME_ORIGINS: Record<string, { meaning: string; origin: string; culturalNote?: string }> = {
  'Otieno': { meaning: 'Born at night', origin: 'Luo (Kenya)', culturalNote: 'Reflects the Luo tradition of naming children based on time of birth' },
  'Wanjiku': { meaning: 'Of the Mugumo tree', origin: 'Kikuyu (Kenya)', culturalNote: 'Named after one of the nine daughters of Gikuyu and Mumbi' },
  'Chukwuemeka': { meaning: 'God has done great things', origin: 'Igbo (Nigeria)', culturalNote: 'Praise name expressing gratitude to the supreme being' },
  'Adaeze': { meaning: 'King\'s daughter / Princess', origin: 'Igbo (Nigeria)', culturalNote: 'Traditional royal title given to daughters of nobility' },
  'Kofi': { meaning: 'Born on Friday', origin: 'Akan (Ghana)', culturalNote: 'Part of the Akan day-naming tradition' },
  'Mohamed': { meaning: 'Praiseworthy', origin: 'Arabic/Islamic', culturalNote: 'Most common Muslim name across Africa' },
  'Thandiwe': { meaning: 'Beloved', origin: 'Zulu/Xhosa (South Africa)', culturalNote: 'Often shortened to Thandi' },
  'Sipho': { meaning: 'Gift', origin: 'Zulu (South Africa)', culturalNote: 'Common name expressing gratitude for a child' },
  'Haile': { meaning: 'Power, might', origin: 'Amharic (Ethiopia)', culturalNote: 'Associated with Emperor Haile Selassie' },
  'Amani': { meaning: 'Peace', origin: 'Swahili', culturalNote: 'Used across East Africa regardless of tribe' },
  'Imani': { meaning: 'Faith', origin: 'Swahili', culturalNote: 'One of the Nguzo Saba (seven principles of Kwanzaa)' },
  'Baraka': { meaning: 'Blessing', origin: 'Swahili/Arabic', culturalNote: 'Reflects Islamic influence in East Africa' },
  'Fatima': { meaning: 'One who abstains', origin: 'Arabic/Islamic', culturalNote: 'Named after Prophet Muhammad\'s daughter' },
  'Nzinga': { meaning: 'Beauty', origin: 'Kongo (Angola)', culturalNote: 'Associated with Queen Nzinga who resisted Portuguese colonization' },
  'Mandla': { meaning: 'Strength, power', origin: 'Zulu (South Africa)', culturalNote: 'Often given to boys expected to be leaders' },
  'Yohannes': { meaning: 'God is gracious', origin: 'Ge\'ez/Amharic (Ethiopia)', culturalNote: 'Ethiopian Orthodox Christian name' },
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
  tribe: string;
  languageFamily: string;
}

export function NameGenerator() {
  const [filters, setFilters] = useState<GeneratorFilters>({
    region: '',
    gender: 'any',
    meaning: '',
    popularity: '',
    tribe: '',
    languageFamily: ''
  });
  const { toggleFavorite, isFavorite } = useFavoriteNames();
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const isGeneratingRef = useRef(false);
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
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setIsGenerating(true);

    setTimeout(() => {
      const shuffled = shuffleArray(availableNames);
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));
      setGeneratedNames(selected);
      isGeneratingRef.current = false;
      setIsGenerating(false);
    }, 500);
  }, [availableNames]);

  const copyToClipboard = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // Clipboard API may fail in insecure contexts - silent fallback
      console.warn('Clipboard API unavailable');
    }
  };

  const updateFilter = (key: keyof GeneratorFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ region: '', gender: 'any', meaning: '', popularity: '', tribe: '', languageFamily: '' });
    setGeneratedNames([]);
  };

  // Get all tribes and language families for filters
  const allTribes = useMemo(() => {
    const tribes = new Set<string>();
    Object.values(NAME_DATABASE).forEach(r => r.tribes.forEach(t => tribes.add(t)));
    return Array.from(tribes).sort();
  }, []);

  const allLanguageFamilies = useMemo(() => {
    const families = new Set<string>();
    Object.values(NAME_DATABASE).forEach(r => families.add(r.languageFamily));
    return Array.from(families).sort();
  }, []);

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

              {/* Tribe Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Tribe
                </label>
                <select
                  value={filters.tribe}
                  onChange={(e) => updateFilter('tribe', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Any Tribe</option>
                  {allTribes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Language Family Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Languages className="w-4 h-4" />
                  Language Family
                </label>
                <select
                  value={filters.languageFamily}
                  onChange={(e) => updateFilter('languageFamily', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Any Family</option>
                  {allLanguageFamilies.map(f => (
                    <option key={f} value={f}>{f}</option>
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
                const originInfo = NAME_ORIGINS[name];
                const isFav = isFavorite(name);
                
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
                        {originInfo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-xs text-primary mt-2 flex items-center gap-1 cursor-help">
                                  <Info className="w-3 h-3" />
                                  {originInfo.meaning} • {originInfo.origin}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-medium">{originInfo.meaning}</p>
                                <p className="text-xs text-muted-foreground">{originInfo.culturalNote}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(name, { region: filters.region })}
                          className={isFav ? 'text-red-500' : ''}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </Button>
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
