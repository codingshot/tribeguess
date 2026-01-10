import { useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, User, X } from 'lucide-react';
import { getAllPeople, getAllCategories, getPeopleCountByCategory, getAllTribesWithPeople, type Person } from '@/lib/peopleUtils';
import { getCountries } from '@/lib/tribeDetection';

const CATEGORY_ICONS: Record<string, string> = {
  'Politics': '🏛️',
  'Sports': '⚽',
  'Music': '🎵',
  'Film & TV': '🎬',
  'Literature': '📚',
  'Activism': '✊',
  'Business': '💼',
  'Royalty': '👑',
  'Military': '⚔️',
  'Science & Academia': '🔬',
  'Religion': '🙏',
  'Historical': '📜',
  'Notable Figure': '⭐',
};

export default function People() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read from URL params
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedCountry = searchParams.get('country') || 'ALL';
  const selectedTribe = searchParams.get('tribe') || 'all';
  
  const allPeople = useMemo(() => getAllPeople(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const categoryCounts = useMemo(() => getPeopleCountByCategory(), []);
  const countries = useMemo(() => getCountries(), []);
  const tribes = useMemo(() => getAllTribesWithPeople(), []);
  
  // Update URL params
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== 'ALL' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };
  
  // Filter people
  const filteredPeople = useMemo(() => {
    let results = allPeople;
    
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.tribeName.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(p => p.category === selectedCategory);
    }
    
    if (selectedCountry !== 'ALL') {
      results = results.filter(p => p.countries.includes(selectedCountry));
    }
    
    if (selectedTribe !== 'all') {
      results = results.filter(p => p.tribeSlug === selectedTribe);
    }
    
    // Sort alphabetically by name
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [allPeople, searchQuery, selectedCategory, selectedCountry, selectedTribe]);
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedCountry !== 'ALL' || selectedTribe !== 'all';

  // Build page title based on filters
  const pageTitle = useMemo(() => {
    const parts = ['Famous African People'];
    if (selectedCategory !== 'all') parts.unshift(selectedCategory);
    if (selectedTribe !== 'all') {
      const tribe = tribes.find(t => t.slug === selectedTribe);
      if (tribe) parts.push(`from ${tribe.name} Tribe`);
    }
    return parts.join(' ') + ' | TribeGuess';
  }, [selectedCategory, selectedTribe, tribes]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta 
          name="description" 
          content={`Discover ${allPeople.length}+ notable people from African tribes. Explore politicians, athletes, artists, activists and more with their tribal heritage and biographies.`} 
        />
        <meta name="keywords" content="famous africans, african celebrities, african politicians, african athletes, african musicians, african tribal heritage" />
        <link rel="canonical" href="https://tribeguess.com/people" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Famous African People",
            "description": `Directory of ${allPeople.length}+ notable people from African tribes`,
            "url": "https://tribeguess.com/people",
            "numberOfItems": allPeople.length,
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-4">
              <Users className="w-4 h-4" />
              {allPeople.length}+ Notable People
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
              Famous People of African Tribes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore notable politicians, athletes, artists, activists, and historical figures 
              with their tribal heritage and contributions to history.
            </p>
          </section>

          {/* Category Pills */}
          <section className="mb-6 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateParams('category', 'all')}
                className="rounded-full"
              >
                All ({allPeople.length})
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateParams('category', cat)}
                  className="rounded-full"
                >
                  {CATEGORY_ICONS[cat] || '⭐'} {cat} ({categoryCounts[cat] || 0})
                </Button>
              ))}
            </div>
          </section>

          {/* Search and Filters */}
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, role, or tribe..."
                  value={searchQuery}
                  onChange={(e) => updateParams('q', e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedTribe} onValueChange={(v) => updateParams('tribe', v)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tribe" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg max-h-[300px]">
                  <SelectItem value="all">All Tribes</SelectItem>
                  {tribes.map(t => (
                    <SelectItem key={t.slug} value={t.slug}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCountry} onValueChange={(v) => updateParams('country', v)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg">
                  <SelectItem value="ALL">🌍 All Africa</SelectItem>
                  {countries.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {hasFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </section>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'}
              {hasFilters && ' (filtered)'}
            </p>
          </div>

          {/* People Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPeople.map((person) => (
              <PersonCard key={person.id} person={person} onCategoryClick={(cat) => updateParams('category', cat)} />
            ))}
          </section>

          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No people found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}

interface PersonCardProps {
  person: Person;
  onCategoryClick: (category: string) => void;
}

function PersonCard({ person, onCategoryClick }: PersonCardProps) {
  const countries = useMemo(() => getCountries(), []);
  const countryFlags = person.countries
    .map(code => countries.find(c => c.code === code)?.flag)
    .filter(Boolean)
    .join(' ');

  return (
    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30 group">
      <CardContent className="p-4">
        <Link to={`/person/${person.id}`} className="block">
          <div className="flex gap-3">
            {/* Avatar */}
            {person.image ? (
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-primary/50" />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                {person.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {person.role}
              </p>
            </div>
          </div>
        </Link>
        
        {/* Category Badge - Clickable */}
        <div className="mt-2">
          <Badge 
            variant="secondary" 
            className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onCategoryClick(person.category);
            }}
          >
            {CATEGORY_ICONS[person.category]} {person.category}
          </Badge>
        </div>

        {/* Tribe & Country */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
          <Link 
            to={`/people?tribe=${person.tribeSlug}`}
            className="text-primary hover:underline truncate max-w-[60%]"
          >
            {person.tribeName}
          </Link>
          <span className="text-muted-foreground">{countryFlags}</span>
        </div>
      </CardContent>
    </Card>
  );
}
