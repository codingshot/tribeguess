import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, Medal, TrendingUp, TrendingDown, Minus, Globe, Users,
  ArrowRight, Filter, Crown, Flame, Star
} from 'lucide-react';
import { analyzeGender, getNameHistory } from '@/lib/genderNameAnalysis';

// Top names data with rankings
const TOP_NAMES_DATA = {
  '2020s': {
    overall: ['Amara', 'Zuri', 'Kofi', 'Imani', 'Kwame', 'Nia', 'Malik', 'Zendaya', 'Jabari', 'Sanaa'],
    male: ['Kofi', 'Malik', 'Jabari', 'Kwame', 'Zion', 'Amari', 'Khalid', 'Darius', 'Omari', 'Tariq'],
    female: ['Amara', 'Zuri', 'Nia', 'Imani', 'Zendaya', 'Sanaa', 'Aaliyah', 'Amaya', 'Ife', 'Adaeze']
  },
  '2010s': {
    overall: ['Aaliyah', 'Malik', 'Imani', 'Kofi', 'Nia', 'Amara', 'Jaylen', 'Zuri', 'Omari', 'Faith'],
    male: ['Malik', 'Kofi', 'Jaylen', 'Omari', 'Darius', 'Tariq', 'Jabari', 'Kwame', 'Rashid', 'Jamal'],
    female: ['Aaliyah', 'Imani', 'Nia', 'Amara', 'Zuri', 'Faith', 'Sanaa', 'Adaeze', 'Amaya', 'Joy']
  },
  '2000s': {
    overall: ['Aaliyah', 'Malik', 'Imani', 'Faith', 'Precious', 'Blessing', 'Jayden', 'Gift', 'Joy', 'Mercy'],
    male: ['Malik', 'Jayden', 'Brandon', 'Kevin', 'Brian', 'Trevor', 'Clinton', 'Ryan', 'Ethan', 'Darius'],
    female: ['Aaliyah', 'Imani', 'Faith', 'Precious', 'Blessing', 'Gift', 'Joy', 'Mercy', 'Princess', 'Favor']
  },
  '1990s': {
    overall: ['Kofi', 'Wangari', 'Amina', 'Kwame', 'Fatima', 'Nelson', 'Grace', 'Samuel', 'Mercy', 'Blessing'],
    male: ['Kofi', 'Kwame', 'Nelson', 'Samuel', 'George', 'Yaya', 'Fela', 'Youssou', 'Didier', 'Mamadou'],
    female: ['Wangari', 'Amina', 'Fatima', 'Grace', 'Mercy', 'Blessing', 'Faith', 'Hope', 'Patience', 'Precious']
  },
  '1980s': {
    overall: ['Kofi', 'Nelson', 'Miriam', 'Samuel', 'Grace', 'Kwame', 'Winnie', 'George', 'Mary', 'David'],
    male: ['Kofi', 'Nelson', 'Samuel', 'Kwame', 'George', 'David', 'Peter', 'John', 'Julius', 'James'],
    female: ['Miriam', 'Grace', 'Winnie', 'Mary', 'Mercy', 'Stella', 'Patience', 'Faith', 'Hope', 'Victoria']
  }
};

const REGIONS = ['All Regions', 'East Africa', 'West Africa', 'North Africa', 'Southern Africa', 'Central Africa', 'Horn of Africa'];

interface LeaderboardFilters {
  decade: string;
  gender: 'overall' | 'male' | 'female';
  region: string;
}

export function TopNamesLeaderboard() {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    decade: '2020s',
    gender: 'overall',
    region: 'All Regions'
  });
  const [showFilters, setShowFilters] = useState(false);

  const topNames = useMemo(() => {
    const decadeData = TOP_NAMES_DATA[filters.decade as keyof typeof TOP_NAMES_DATA];
    if (!decadeData) return [];
    
    const names = decadeData[filters.gender] || decadeData.overall;
    
    return names.map((name, index) => {
      const gender = analyzeGender(name);
      const history = getNameHistory(name);
      const trend = history.popularityTrends?.trendDirection || 'stable';
      const change = history.popularityTrends?.percentageChange || 0;
      
      return {
        rank: index + 1,
        name,
        gender: gender.detectedGender,
        trend,
        change,
        peakDecade: history.popularityTrends?.peakDecade || filters.decade,
        popularity: history.popularityTrends?.overallRank || (100 - index * 8)
      };
    });
  }, [filters]);

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
      case 3: return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const decades = Object.keys(TOP_NAMES_DATA);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top 10 Names Leaderboard
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="grid gap-3 sm:grid-cols-3 mt-4 pt-4 border-t">
            {/* Decade Filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Decade</label>
              <select
                value={filters.decade}
                onChange={(e) => setFilters(prev => ({ ...prev, decade: e.target.value }))}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                {decades.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            {/* Gender Filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value as LeaderboardFilters['gender'] }))}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="overall">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            {/* Region Filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Decade Quick Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {decades.map(d => (
            <Button
              key={d}
              variant={filters.decade === d ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, decade: d }))}
              className="flex-shrink-0"
            >
              {d}
            </Button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {topNames.map((item, index) => (
            <div
              key={item.name}
              className={`
                group flex items-center gap-4 p-3 rounded-lg border transition-all duration-300
                hover:shadow-md hover:border-primary/30
                ${index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-card'}
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'slideInLeft 0.5s ease-out forwards'
              }}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-12 text-center">
                {getRankIcon(item.rank) || (
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                    ${getRankBadgeColor(item.rank)}
                  `}>
                    {item.rank}
                  </span>
                )}
                {item.rank <= 3 && (
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                    ${getRankBadgeColor(item.rank)}
                  `}>
                    {item.rank}
                  </span>
                )}
              </div>

              {/* Name & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg truncate">{item.name}</h3>
                  {index === 0 && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs capitalize">
                    {item.gender === 'male' ? '♂' : item.gender === 'female' ? '♀' : '⚥'} {item.gender}
                  </Badge>
                  <span className="hidden sm:inline">Peak: {item.peakDecade}</span>
                </div>
              </div>

              {/* Popularity Bar */}
              <div className="hidden md:block w-24">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.popularity}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {item.popularity}%
                </p>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {getTrendIcon(item.trend)}
                <span className={`text-sm font-medium ${
                  item.change > 0 ? 'text-green-600' : item.change < 0 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </div>

              {/* Action */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <Link to={`/?name=${item.name}`}>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* SEO-friendly summary */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <p>
            <strong>Top African Names {filters.decade}:</strong> This leaderboard shows the most popular 
            {filters.gender !== 'overall' ? ` ${filters.gender}` : ''} African names of the {filters.decade}. 
            Names like {topNames[0]?.name}, {topNames[1]?.name}, and {topNames[2]?.name} continue to 
            be favorites across the continent, reflecting both traditional heritage and modern trends.
          </p>
        </div>
      </CardContent>
      
      {/* Add CSS animation */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Card>
  );
}
