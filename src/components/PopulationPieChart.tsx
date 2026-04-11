import { useState, forwardRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getCountries } from '@/lib/tribeDetection';
import { CountryFlag, getCodeFromName } from '@/components/CountryFlag';

interface PopulationByCountry {
  country: string;
  population: string;
  percent: string;
}

interface DiasporaBreakdown {
  country: string;
  population: string;
  cities?: string[];
}

interface PopulationPieChartProps {
  populationByCountry?: PopulationByCountry[];
  diaspora?: DiasporaBreakdown[];
  tribeName: string;
  type?: 'country' | 'diaspora';
}

// Parse population string to number (handles "1.2 million", "500,000", etc.)
const parsePopulation = (popStr: string): number => {
  const cleaned = popStr.toLowerCase().replace(/[~,]/g, '');
  const match = cleaned.match(/([\d.]+)\s*(million|m|thousand|k)?/);
  if (!match) return 0;
  
  const num = parseFloat(match[1]);
  const unit = match[2];
  
  if (unit === 'million' || unit === 'm') return num * 1000000;
  if (unit === 'thousand' || unit === 'k') return num * 1000;
  return num;
};

// Format number for display
const formatPopulation = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

// Country code map for diaspora countries (name → ISO code)
const diasporaCountryCodes: Record<string, string> = {
  'United States': 'US', 'USA': 'US',
  'United Kingdom': 'GB', 'UK': 'GB',
  'Canada': 'CA', 'Germany': 'DE', 'France': 'FR',
  'Australia': 'AU', 'South Africa': 'ZA',
  'Tanzania': 'TZ', 'Uganda': 'UG', 'Kenya': 'KE',
  'Ethiopia': 'ET', 'Nigeria': 'NG', 'Ghana': 'GH',
  'Netherlands': 'NL', 'Belgium': 'BE',
  'Sweden': 'SE', 'Norway': 'NO',
  'Italy': 'IT', 'Spain': 'ES',
  'UAE': 'AE', 'Saudi Arabia': 'SA',
  'China': 'CN', 'India': 'IN', 'Brazil': 'BR',
};

// Color palette for countries
const COLORS = [
  'hsl(var(--primary))',
  'hsl(142, 76%, 36%)', // Green
  'hsl(217, 91%, 60%)', // Blue
  'hsl(45, 93%, 47%)',  // Gold
  'hsl(280, 67%, 50%)', // Purple
  'hsl(12, 76%, 61%)',  // Coral
  'hsl(173, 58%, 39%)', // Teal
  'hsl(330, 81%, 60%)', // Pink
];

export const PopulationPieChart = forwardRef<HTMLDivElement, PopulationPieChartProps>(function PopulationPieChart({ populationByCountry, diaspora, tribeName, type = 'country' }, ref) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const countries = getCountries();
  
  // Build chart data based on type
  const chartData = type === 'country' && populationByCountry
    ? populationByCountry.map((item, index) => {
        const countryObj = countries.find(c => c.code === item.country);
        const population = parsePopulation(item.population);
        
        return {
          name: countryObj?.name || item.country,
          countryCode: countryObj?.code || item.country,
          code: item.country,
          value: population,
          displayValue: item.population,
          percent: item.percent,
          color: COLORS[index % COLORS.length],
          cities: undefined as string[] | undefined,
        };
      }).filter(item => item.value > 0)
    : diaspora
      ? diaspora.map((item, index) => {
          const population = parsePopulation(item.population);
          const countryCode = diasporaCountryCodes[item.country] || '';
          
          return {
            name: item.country,
            countryCode,
            code: item.country,
            value: population,
            displayValue: item.population,
            percent: '',
            color: COLORS[index % COLORS.length],
            cities: item.cities,
          };
        }).filter(item => item.value > 0)
      : [];

  const totalPopulation = chartData.reduce((sum, item) => sum + item.value, 0);

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3 min-w-[180px] z-50">
          <div className="flex items-center gap-2 mb-1">
            <CountryFlag code={data.countryCode} size={20} label={data.name} />
            <span className="font-semibold text-foreground">{data.name}</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-0.5">
            <p>Population: <span className="font-medium text-foreground">{data.displayValue}</span></p>
            <p>Share: <span className="font-medium text-foreground">{((data.value / totalPopulation) * 100).toFixed(1)}%</span></p>
            {data.percent && (
              <p className="text-xs opacity-75">({data.percent} of country)</p>
            )}
            {data.cities && data.cities.length > 0 && (
              <p className="text-xs mt-1">📍 {data.cities.slice(0, 3).join(', ')}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {chartData.map((entry, index) => (
        <button
          key={entry.code}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all ${
            activeIndex === index 
              ? 'bg-primary/20 ring-2 ring-primary scale-105' 
              : 'bg-secondary hover:bg-secondary/80'
          }`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          <CountryFlag code={entry.countryCode} size={14} label={entry.name} />
          <span className="font-medium">{entry.name}</span>
          <span className="text-muted-foreground">({formatPopulation(entry.value)})</span>
        </button>
      ))}
    </div>
  );

  if (chartData.length < 2) return null;

  const title = type === 'country' 
    ? `${tribeName} Population Distribution`
    : `${tribeName} Global Diaspora`;

  return (
    <div ref={ref} className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
      <h3 className="text-sm font-semibold mb-3 text-center">
        {title}
      </h3>
      
      <div className="h-[200px] sm:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={activeIndex !== null ? 85 : 80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  style={{
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease-out',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <CustomLegend />
      
      <p className="text-xs text-muted-foreground mt-3 text-center italic">
        📊 Hover or tap on segments to see detailed {type === 'country' ? 'population' : 'diaspora'} data
      </p>
    </div>
  );
});
