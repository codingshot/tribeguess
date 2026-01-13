import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Star, TrendingUp, TrendingDown, Minus, Globe, 
  Users, Clock, ArrowRight, Sparkles, Heart
} from 'lucide-react';
import { analyzeGender, getNameHistory, GenderAnalysis, NameHistoryData } from '@/lib/genderNameAnalysis';

// Featured names for each day of the year (cycling)
const FEATURED_NAMES = [
  { name: 'Amara', meaning: 'Grace, immortal', origin: 'Nigerian/Ethiopian' },
  { name: 'Kofi', meaning: 'Born on Friday', origin: 'Ghanaian Akan' },
  { name: 'Zinhle', meaning: 'Beautiful', origin: 'Zulu/South African' },
  { name: 'Amadou', meaning: 'Praiseworthy', origin: 'West African/Fulani' },
  { name: 'Wanjiku', meaning: 'Founder clan mother', origin: 'Kenyan Kikuyu' },
  { name: 'Themba', meaning: 'Hope, trust', origin: 'Zulu/Xhosa' },
  { name: 'Fatima', meaning: 'Captivating', origin: 'Arabic/North African' },
  { name: 'Kwame', meaning: 'Born on Saturday', origin: 'Ghanaian Akan' },
  { name: 'Lindiwe', meaning: 'Awaited one', origin: 'Zulu/Ndebele' },
  { name: 'Sekou', meaning: 'Fighter', origin: 'Mandinka/West African' },
  { name: 'Achieng', meaning: 'Born during sunshine', origin: 'Kenyan Luo' },
  { name: 'Mandla', meaning: 'Strength, power', origin: 'Zulu' },
  { name: 'Nzinga', meaning: 'Beautiful, spiraling', origin: 'Angolan Kimbundu' },
  { name: 'Haile', meaning: 'Power of the Trinity', origin: 'Ethiopian Amharic' },
  { name: 'Chiamaka', meaning: 'God is beautiful', origin: 'Nigerian Igbo' },
  { name: 'Sipho', meaning: 'Gift', origin: 'Zulu/Xhosa' },
  { name: 'Aminata', meaning: 'Trustworthy', origin: 'West African Fulani' },
  { name: 'Otieno', meaning: 'Born at night', origin: 'Kenyan Luo' },
  { name: 'Thandiwe', meaning: 'Beloved', origin: 'Zulu/Xhosa' },
  { name: 'Yohannes', meaning: 'God is gracious', origin: 'Ethiopian' },
  { name: 'Nafula', meaning: 'Born during rain', origin: 'Kenyan Luhya' },
  { name: 'Bongani', meaning: 'Be grateful', origin: 'Zulu/Ndebele' },
  { name: 'Maryam', meaning: 'Sea of bitterness, beloved', origin: 'Arabic/North African' },
  { name: 'Kipkoech', meaning: 'Born near granary', origin: 'Kenyan Kalenjin' },
  { name: 'Nakato', meaning: 'Second of twins', origin: 'Ugandan Baganda' },
  { name: 'Adebayo', meaning: 'The crown meets joy', origin: 'Nigerian Yoruba' },
  { name: 'Tigist', meaning: 'Patience', origin: 'Ethiopian' },
  { name: 'Mutombo', meaning: 'Warrior', origin: 'Congolese' },
  { name: 'Zahra', meaning: 'Flower, brightness', origin: 'Arabic/Swahili' },
  { name: 'Oluwaseun', meaning: 'God has done well', origin: 'Nigerian Yoruba' },
  { name: 'Neema', meaning: 'Grace, blessing', origin: 'Swahili' },
];

export function NameOfTheDay() {
  const { todayName, featuredInfo, gender, history, dayOfYear } = useMemo(() => {
    // Get day of year for consistent daily rotation
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Select name based on day
    const index = dayOfYear % FEATURED_NAMES.length;
    const featured = FEATURED_NAMES[index];
    
    const genderData = analyzeGender(featured.name);
    const historyData = getNameHistory(featured.name);
    
    return {
      todayName: featured.name,
      featuredInfo: featured,
      gender: genderData,
      history: historyData,
      dayOfYear
    };
  }, []);

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const genderColor = gender.detectedGender === 'male'
    ? 'from-blue-500/10 to-blue-600/5 border-blue-500/20'
    : gender.detectedGender === 'female'
    ? 'from-pink-500/10 to-pink-600/5 border-pink-500/20'
    : 'from-purple-500/10 to-purple-600/5 border-purple-500/20';

  return (
    <Card className={`relative overflow-hidden border-2 bg-gradient-to-br ${genderColor}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Name of the Day
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Day {dayOfYear}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-2 animate-fade-in">
            {todayName}
          </h2>
          <p className="text-lg text-muted-foreground italic">
            "{featuredInfo.meaning}"
          </p>
          <Badge variant="secondary" className="mt-2">
            {featuredInfo.origin}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="text-center p-3 rounded-lg bg-background/50">
            <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="font-semibold capitalize">{gender.detectedGender}</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-background/50">
            <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Era</p>
            <p className="font-semibold text-sm">{history.estimatedAgeRange?.generationLabel || 'Classic'}</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-background/50">
            <Globe className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Peak</p>
            <p className="font-semibold">{history.popularityTrends?.peakDecade || '1990s'}</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-background/50">
            <div className="flex justify-center mb-1">
              {getTrendIcon(history.popularityTrends?.trendDirection || 'stable')}
            </div>
            <p className="text-xs text-muted-foreground">Trend</p>
            <p className="font-semibold capitalize">{history.popularityTrends?.trendDirection || 'Stable'}</p>
          </div>
        </div>

        {/* Cultural Significance */}
        {history.culturalSignificance && history.culturalSignificance.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-background/50">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Cultural Significance
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {history.culturalSignificance.slice(0, 3).map((sig, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 mt-1 flex-shrink-0" />
                  {sig}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Famous Namesakes */}
        {history.famousNamesakes && history.famousNamesakes.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-2 text-sm">Famous Namesakes</h4>
            <div className="flex flex-wrap gap-2">
              {history.famousNamesakes.slice(0, 3).map((person, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {person.name} ({person.birth})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-3">
          <Button className="flex-1" asChild>
            <Link to={`/?name=${todayName}`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Full Analysis
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/names?tab=browse">
              Browse More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
