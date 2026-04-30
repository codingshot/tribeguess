import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Users, Globe, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { getAllReligions, TraditionalReligionData } from '@/data/traditionalReligions';

const REGION_COLORS: Record<string, string> = {
  'West Africa': '#F59E0B',
  'East Africa': '#3B82F6',
  'Southern Africa': '#8B5CF6',
  'Central Africa': '#EC4899',
  'Horn of Africa': '#22C55E',
  'North Africa': '#06B6D4',
  'Madagascar': '#F97316'
};

const PIE_COLORS = ['#F59E0B', '#3B82F6', '#22C55E', '#EC4899', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];

export function ReligionStatsDashboard() {
  const religions = getAllReligions();
  
  // Stats by region
  const regionStats = useMemo(() => {
    const stats: Record<string, { count: number; religions: string[] }> = {};
    religions.forEach(r => {
      if (!stats[r.region]) {
        stats[r.region] = { count: 0, religions: [] };
      }
      stats[r.region].count++;
      stats[r.region].religions.push(r.name);
    });
    return Object.entries(stats).map(([region, data]) => ({
      region,
      count: data.count,
      religions: data.religions,
      color: REGION_COLORS[region] || '#666'
    })).sort((a, b) => b.count - a.count);
  }, [religions]);

  // Followers by region (estimated)
  const followersByRegion = useMemo(() => {
    const parseFollowers = (str: string): number => {
      const match = str.match(/~?(\d+)/);
      if (!match) return 0;
      const num = parseInt(match[1], 10);
      if (str.includes('million')) return num * 1000000;
      if (str.includes('thousand')) return num * 1000;
      return num;
    };

    const stats: Record<string, number> = {};
    religions.forEach(r => {
      const followers = parseFollowers(r.estimatedFollowers);
      stats[r.region] = (stats[r.region] || 0) + followers;
    });

    return Object.entries(stats).map(([region, followers]) => ({
      region,
      followers,
      displayFollowers: followers >= 1000000 
        ? `${(followers / 1000000).toFixed(1)}M` 
        : `${(followers / 1000).toFixed(0)}K`,
      color: REGION_COLORS[region] || '#666'
    })).sort((a, b) => b.followers - a.followers);
  }, [religions]);

  // Top religions by estimated followers
  const topReligions = useMemo(() => {
    const parseFollowers = (str: string): number => {
      const match = str.match(/~?(\d+)/);
      if (!match) return 0;
      const num = parseInt(match[1], 10);
      if (str.includes('million')) return num * 1000000;
      if (str.includes('thousand')) return num * 1000;
      return num;
    };

    return religions
      .map(r => ({
        name: r.name.split(' ')[0], // Short name
        fullName: r.name,
        region: r.region,
        followers: parseFollowers(r.estimatedFollowers),
        estimatedFollowers: r.estimatedFollowers
      }))
      .sort((a, b) => b.followers - a.followers)
      .slice(0, 8);
  }, [religions]);

  // Country spread data
  const countrySpread = useMemo(() => {
    const countryMap: Record<string, { count: number; religions: string[] }> = {};
    religions.forEach(r => {
      r.countryBreakdown.forEach(c => {
        if (!countryMap[c.country]) {
          countryMap[c.country] = { count: 0, religions: [] };
        }
        countryMap[c.country].count++;
        countryMap[c.country].religions.push(r.name);
      });
    });
    return Object.entries(countryMap)
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [religions]);

  // Tribes with traditional religion
  const totalTribes = useMemo(() => {
    const tribes = new Set<string>();
    religions.forEach(r => {
      r.tribesFollowing.forEach(t => tribes.add(t.tribeName));
    });
    return tribes.size;
  }, [religions]);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-amber-500/10 to-background border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/20">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{religions.length}</p>
                <p className="text-xs text-muted-foreground">Documented Religions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-background border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Globe className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{regionStats.length}</p>
                <p className="text-xs text-muted-foreground">African Regions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-background border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalTribes}+</p>
                <p className="text-xs text-muted-foreground">Practicing Tribes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-background border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/20">
                <MapPin className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{countrySpread.length}+</p>
                <p className="text-xs text-muted-foreground">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Religions by Region Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Religions by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionStats}
                    dataKey="count"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    label={({ region, count }) => `${region.split(' ')[0]}: ${count}`}
                    labelLine={false}
                  >
                    {regionStats.map((entry, i) => (
                      <Cell key={`region-pie-${entry.region}-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} religions`,
                      props.payload.region
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {regionStats.map(r => (
                <div key={r.region} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-muted-foreground">{r.region}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Followers by Region Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Estimated Followers by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={followersByRegion} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="region" 
                    width={100}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [
                      value >= 1000000 
                        ? `${(value / 1000000).toFixed(1)}M followers` 
                        : `${(value / 1000).toFixed(0)}K followers`,
                      'Estimated'
                    ]}
                  />
                  <Bar dataKey="followers" radius={[0, 4, 4, 0]}>
                    {followersByRegion.map((entry, i) => (
                      <Cell key={`followers-bar-${entry.region}-${i}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Religions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Largest Traditional Religions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topReligions}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [
                    value >= 1000000 
                      ? `~${(value / 1000000).toFixed(0)}M followers` 
                      : `~${(value / 1000).toFixed(0)}K followers`,
                    'Estimated'
                  ]}
                  labelFormatter={(label, payload) => 
                    payload?.[0]?.payload?.fullName || label
                  }
                />
                <Bar dataKey="followers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {topReligions.map((entry, i) => (
                    <Cell key={`top-rel-${entry.fullName}-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Country Presence */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Countries with Most Traditional Religions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {countrySpread.slice(0, 10).map(c => (
              <div key={c.country} className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold text-foreground">{c.count}</p>
                <p className="text-xs text-muted-foreground truncate">{c.country}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
