import { useMemo } from 'react';
import { CountryFlag } from '@/components/CountryFlag';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, MapPin, ExternalLink, ArrowLeft, Users, 
  Calendar, Briefcase, Globe, ChevronRight 
} from 'lucide-react';
import { getPersonBySlug, getPeopleByTribe, type Person } from '@/lib/peopleUtils';
import { ViralCTAs } from '@/components/ViralCTAs';
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

export default function PersonPage() {
  const { slug } = useParams<{ slug: string }>();
  const person = useMemo(() => slug ? getPersonBySlug(slug) : undefined, [slug]);
  const countries = useMemo(() => getCountries(), []);
  
  // Get other people from same tribe
  const tribePeople = useMemo(() => {
    if (!person) return [];
    return getPeopleByTribe(person.tribeSlug).filter(p => p.id !== person.id).slice(0, 6);
  }, [person]);

  if (!person) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <User className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Person Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The person you're looking for doesn't exist in our database.
            </p>
            <Link to="/people">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse All People
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const countryInfo = person.countries.map(code => 
    countries.find(c => c.code === code)
  ).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{person.name} | Famous {person.tribeName} People | TribeGuess</title>
        <meta 
          name="description" 
          content={`${person.name} - ${person.role}. Notable figure from the ${person.tribeName} tribe. Discover their contributions and tribal heritage.`} 
        />
        <meta name="keywords" content={`${person.name}, ${person.tribeName}, ${person.category}, famous africans, african heritage`} />
        <link rel="canonical" href={`https://africantribenames.com/person/${person.id}`} />
        <meta property="og:title" content={`${person.name} | ${person.tribeName} Tribe`} />
        <meta property="og:description" content={person.role} />
        <meta property="og:type" content="profile" />
        {person.image && <meta property="og:image" content={person.image} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": person.name,
            "description": person.role,
            "image": person.image,
            "sameAs": person.wikipedia ? [person.wikipedia] : [],
            "nationality": countryInfo.map(c => c?.name).filter(Boolean),
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto">
            <Link to="/people" className="hover:text-primary transition-colors whitespace-nowrap">
              People
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to={`/learn/${person.tribeSlug}`} className="hover:text-primary transition-colors whitespace-nowrap">
              {person.tribeName}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-foreground truncate">{person.name}</span>
          </nav>

          {/* Hero Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Photo */}
                {person.image ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <User className="w-16 h-16 text-primary/30" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <Link to={`/people?category=${encodeURIComponent(person.category)}`}>
                    <Badge className="mb-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {CATEGORY_ICONS[person.category]} {person.category}
                    </Badge>
                  </Link>
                  
                  <h1 className="text-2xl md:text-4xl font-serif font-bold mb-2">
                    {person.name}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-4">
                    {person.role}
                  </p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                    <Link 
                      to={`/learn/${person.tribeSlug}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Users className="w-4 h-4" />
                      {person.tribeName} Tribe
                    </Link>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="flex items-center gap-2 flex-wrap">
                        {countryInfo.map(c => c ? (
                          <span key={c.code} className="inline-flex items-center gap-1">
                            <CountryFlag code={c.code} size={16} label={c.name} />
                            {c.name}
                          </span>
                        ) : null)}
                      </span>
                    </div>
                    
                    {(person.birthYear || person.deathYear) && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {person.birthYear && person.deathYear 
                          ? `${person.birthYear} – ${person.deathYear}`
                          : person.birthYear 
                            ? `Born ${person.birthYear}`
                            : `Died ${person.deathYear}`
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Sources */}
              <div className="flex flex-wrap gap-3">
                {person.wikipedia && (
                  <a
                    href={person.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Wikipedia Biography
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                
                <Link to={`/learn/${person.tribeSlug}`}>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View {person.tribeName} Tribe
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Category Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Field of Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  {CATEGORY_ICONS[person.category]} {person.category}
                </Badge>
                <p className="mt-4 text-muted-foreground text-sm">
                  {person.name} is recognized for their contributions in {person.category.toLowerCase()}, 
                  representing the {person.tribeName} people on the national and international stage.
                </p>
              </CardContent>
            </Card>

            {/* Tribal Heritage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Tribal Heritage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link 
                  to={`/learn/${person.tribeSlug}`}
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{person.tribeName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {countryInfo.map(c => c?.name).join(', ')}
                    </p>
                  </div>
                </Link>
                <p className="mt-4 text-muted-foreground text-sm">
                  Learn more about the {person.tribeName} tribe's culture, traditions, and famous people.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Other people from same tribe */}
          {tribePeople.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  More Notable {person.tribeName} People
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tribePeople.map(p => (
                    <Link
                      key={p.id}
                      to={`/person/${p.id}`}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      {p.image ? (
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary/50" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{p.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{p.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Link to={`/learn/${person.tribeSlug}`} className="mt-4 block">
                  <Button variant="outline" className="w-full">
                    View All {person.tribeName} People
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <ViralCTAs tribeName={person.tribeName} tribeSlug={person.tribeSlug} className="mt-8" />

          {/* Back to list */}
          <div className="mt-8 text-center">
            <Link to="/people">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All People
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
