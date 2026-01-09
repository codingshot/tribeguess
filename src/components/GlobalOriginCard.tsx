import { Globe, MapPin, BookOpen, Heart, AlertCircle, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalOrigin } from '@/lib/globalOrigins';

interface GlobalOriginCardProps {
  origins: GlobalOrigin[];
  inputName: string;
  religion?: 'muslim' | 'christian' | 'hindu' | 'buddhist' | 'jewish' | 'sikh' | 'other';
  religiousNote?: string;
  religiousTribes?: string[];
  confidence: number;
}

const religionIcons: Record<string, string> = {
  muslim: '☪️',
  christian: '✝️',
  hindu: '🕉️',
  buddhist: '☸️',
  jewish: '✡️',
  sikh: '🪯',
  other: '🙏'
};

const continentFlags: Record<string, string> = {
  'Europe': '🇪🇺',
  'Asia': '🌏',
  'Asia/Africa': '🌍',
  'North America': '🌎',
  'South America': '🌎',
  'Oceania': '🌏',
  'Africa': '🌍'
};

export function GlobalOriginCard({ 
  origins, 
  inputName, 
  religion, 
  religiousNote,
  religiousTribes = [],
  confidence 
}: GlobalOriginCardProps) {
  if (origins.length === 0 && !religion) return null;
  
  const hasNonAfricanOrigin = origins.length > 0 && origins.some(o => o.continent !== 'Africa');
  
  return (
    <div className="card-tribe p-4 sm:p-6 border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
            Global Name Origins
            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200">
              {confidence}% match
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            "{inputName}" appears to have origins outside Africa
          </p>
        </div>
      </div>
      
      {/* Important Notice */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Our database currently focuses on <strong>African tribes</strong>. 
            We've detected this name may have global origins and are showing relevant information below.
          </div>
        </div>
      </div>
      
      {/* Religious Connection */}
      {religion && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{religionIcons[religion] || '🙏'}</span>
            <span className="font-semibold text-sm sm:text-base text-purple-800 dark:text-purple-200 capitalize">
              {religion === 'muslim' ? 'Islamic' : religion === 'christian' ? 'Christian' : religion} Name Detected
            </span>
          </div>
          {religiousNote && (
            <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 mb-2">
              {religiousNote}
            </p>
          )}
          {religiousTribes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
              <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 mb-2">
                <strong>African tribes with strong {religion === 'muslim' ? 'Islamic' : 'Christian'} influence:</strong>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {religiousTribes.slice(0, 6).map((tribe) => (
                  <Link
                    key={tribe}
                    to={`/learn/${tribe}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {tribe.charAt(0).toUpperCase() + tribe.slice(1).replace('_', ' ')}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Global Origins */}
      {hasNonAfricanOrigin && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm sm:text-base flex items-center gap-2 text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            Possible Global Origins
          </h4>
          
          {origins.map((origin) => (
            <div 
              key={origin.id}
              className="p-3 bg-white dark:bg-gray-900/50 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h5 className="font-semibold text-sm sm:text-base text-foreground flex items-center gap-2">
                    <span>{continentFlags[origin.continent] || '🌍'}</span>
                    {origin.name}
                    {origin.religion && (
                      <span className="text-sm">{religionIcons[origin.religion]}</span>
                    )}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {origin.region} • {origin.countries.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                {origin.description}
              </p>
              
              {origin.culturalNotes && (
                <div className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2 rounded">
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{origin.culturalNotes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Database Disclaimer */}
      <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Users className="w-4 h-4 flex-shrink-0" />
          <div>
            <p className="mb-1">
              <strong>About TribeGuess:</strong> We specialize in <strong>African tribal origins</strong> with 200+ verified tribes.
            </p>
            <p>
              Global name origins shown above are informational. For detailed ancestry from other regions, 
              consider specialized genealogy resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
