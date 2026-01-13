/**
 * Migration Timeline Visualization
 * Shows historical movement of tribes and naming patterns across Africa
 */

import { useState, useMemo } from 'react';
import { ChevronRight, MapPin, Calendar, Users, Globe, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MigrationEvent {
  tribe: string;
  fromRegion: string;
  toRegion: string;
  timePeriod: string;
  era: number; // Century for sorting
  path: string[];
  namingInfluence: string;
  populationMovement: string;
}

interface MigrationTimelineProps {
  highlightTribe?: string;
  showOnlyRelated?: boolean;
  className?: string;
}

// Comprehensive migration data
const MIGRATION_DATA: MigrationEvent[] = [
  // Bantu Expansion (2000 BCE - 1000 CE)
  {
    tribe: 'Proto-Bantu',
    fromRegion: 'Nigeria/Cameroon Highlands',
    toRegion: 'Central & Southern Africa',
    timePeriod: '2000 BCE - 500 CE',
    era: -20,
    path: ['Cameroon Highlands', 'Congo Basin', 'Great Lakes', 'Southern Africa'],
    namingInfluence: 'Introduced common prefixes: Mu-, Ba-, Ki-, Chi-',
    populationMovement: 'Largest African migration, ~100 million descendants'
  },
  {
    tribe: 'Swahili',
    fromRegion: 'Bantu Core',
    toRegion: 'East African Coast',
    timePeriod: '500 - 1000 CE',
    era: 5,
    path: ['Great Lakes', 'Coastal Kenya/Tanzania', 'Zanzibar', 'Comoros'],
    namingInfluence: 'Arabic-Bantu fusion: Mwana-, -dini, -amina',
    populationMovement: 'Trade-driven coastal settlement'
  },
  // Nilotic Migrations
  {
    tribe: 'Maasai',
    fromRegion: 'Nile Valley (Sudan)',
    toRegion: 'Kenya/Tanzania Rift Valley',
    timePeriod: '15th - 18th century',
    era: 15,
    path: ['Upper Nile', 'Lake Turkana', 'Great Rift Valley', 'Serengeti'],
    namingInfluence: 'Age-set naming: Ole-, Nai-, -serian',
    populationMovement: 'Pastoral expansion following cattle routes'
  },
  {
    tribe: 'Luo',
    fromRegion: 'Bahr el Ghazal (South Sudan)',
    toRegion: 'Western Kenya & Northern Uganda',
    timePeriod: '15th - 17th century',
    era: 15,
    path: ['South Sudan', 'Northern Uganda', 'Lake Victoria', 'Nyanza'],
    namingInfluence: 'Patronymic: O- (male), A- (female)',
    populationMovement: 'Followed river systems to Lake Victoria'
  },
  {
    tribe: 'Dinka',
    fromRegion: 'Upper Nile',
    toRegion: 'South Sudan Grasslands',
    timePeriod: '14th - 16th century',
    era: 14,
    path: ['Upper Nile', 'Sudd Wetlands', 'Bahr el Ghazal'],
    namingInfluence: 'Cattle-color naming, -deng, -bol prefixes',
    populationMovement: 'Pastoral settlement along Nile tributaries'
  },
  // West African Empires
  {
    tribe: 'Fulani',
    fromRegion: 'Senegambia',
    toRegion: 'Across Sahel to Red Sea',
    timePeriod: '11th - 19th century',
    era: 11,
    path: ['Senegal', 'Mali', 'Niger', 'Nigeria', 'Cameroon', 'Sudan'],
    namingInfluence: 'Islamic + Pastoral: Ba-, Sow, Diallo, Amadou',
    populationMovement: 'Largest nomadic migration in Africa'
  },
  {
    tribe: 'Hausa',
    fromRegion: 'Hausaland (Niger/Nigeria)',
    toRegion: 'West African Trade Centers',
    timePeriod: '10th - 18th century',
    era: 10,
    path: ['Niger', 'Northern Nigeria', 'Ghana', 'Cameroon'],
    namingInfluence: 'Islamic naming + Hausa titles: Mai-, Dan-, -awa',
    populationMovement: 'Trade-driven urban expansion'
  },
  {
    tribe: 'Wolof',
    fromRegion: 'Senegal River Valley',
    toRegion: 'Senegambia Coast',
    timePeriod: '12th - 16th century',
    era: 12,
    path: ['Senegal River', 'Jolof Empire', 'Coastal Senegal', 'Gambia'],
    namingInfluence: 'Patronymics: -ndiaye, -fall, -diop',
    populationMovement: 'Kingdom formation and coastal trade'
  },
  // Southern Africa
  {
    tribe: 'Zulu',
    fromRegion: 'Northern KwaZulu',
    toRegion: 'KwaZulu-Natal',
    timePeriod: '18th - 19th century',
    era: 18,
    path: ['Emakhosini Valley', 'Mfolozi River', 'KwaZulu-Natal'],
    namingInfluence: 'Clan prefixes: Khu-, Cele-, -zwe',
    populationMovement: 'Shaka\'s military expansion (Mfecane)'
  },
  {
    tribe: 'Xhosa',
    fromRegion: 'Great Lakes',
    toRegion: 'Eastern Cape',
    timePeriod: '16th - 18th century',
    era: 16,
    path: ['Great Lakes', 'Natal', 'Transkei', 'Eastern Cape'],
    namingInfluence: 'Click consonant names, N-, -kwe',
    populationMovement: 'Gradual southward migration'
  },
  {
    tribe: 'Shona',
    fromRegion: 'Great Lakes',
    toRegion: 'Zimbabwe Plateau',
    timePeriod: '11th - 15th century',
    era: 11,
    path: ['Great Lakes', 'Limpopo', 'Great Zimbabwe', 'Zimbabwe Plateau'],
    namingInfluence: 'Totemic: Chi-, -moyo (heart), -shumba (lion)',
    populationMovement: 'Built Great Zimbabwe civilization'
  },
  // Central Africa
  {
    tribe: 'Kongo',
    fromRegion: 'Congo Basin',
    toRegion: 'Lower Congo River',
    timePeriod: '13th - 15th century',
    era: 13,
    path: ['Upper Congo', 'Kwango River', 'Atlantic Coast'],
    namingInfluence: 'Ki- prefix, royal titles: Ne-, -kanga',
    populationMovement: 'Kongo Kingdom formation'
  },
  {
    tribe: 'Luba',
    fromRegion: 'Katanga',
    toRegion: 'DRC Heartland',
    timePeriod: '15th - 17th century',
    era: 15,
    path: ['Katanga Plateau', 'Lake Upemba', 'Kasai Region'],
    namingInfluence: 'Spirit names: Ka-, Mu-luba',
    populationMovement: 'Luba Empire expansion'
  },
  // North Africa & Sahel
  {
    tribe: 'Tuareg',
    fromRegion: 'Libya/Morocco',
    toRegion: 'Central Sahara',
    timePeriod: '7th - 12th century',
    era: 7,
    path: ['Libya', 'Algeria', 'Niger', 'Mali', 'Mauritania'],
    namingInfluence: 'Berber + Islamic: Ag- (son of), Oult- (daughter)',
    populationMovement: 'Trans-Saharan trade route control'
  },
  {
    tribe: 'Nubian',
    fromRegion: 'Nile Valley',
    toRegion: 'Southern Egypt/Northern Sudan',
    timePeriod: '3000 BCE - Present',
    era: -30,
    path: ['Upper Nile', 'Nubia', 'Dongola', 'Kordofan'],
    namingInfluence: 'Ancient Egyptian influence + Arabic: -dina, -nour',
    populationMovement: 'Ancient civilization with continuous presence'
  },
  // Horn of Africa
  {
    tribe: 'Somali',
    fromRegion: 'Ethiopian Highlands',
    toRegion: 'Horn of Africa',
    timePeriod: '10th - 16th century',
    era: 10,
    path: ['Ethiopian Highlands', 'Ogaden', 'Somali Peninsula', 'Coastal Cities'],
    namingInfluence: 'Clan-based: Abdi-, -shire, -yare',
    populationMovement: 'Pastoral expansion to coast'
  },
  {
    tribe: 'Oromo',
    fromRegion: 'Southern Ethiopian Highlands',
    toRegion: 'Greater Ethiopia',
    timePeriod: '16th century',
    era: 16,
    path: ['Borana', 'Central Ethiopia', 'Northern Kenya'],
    namingInfluence: 'Gada system names: -faa, -galgalo',
    populationMovement: 'Rapid 16th century expansion'
  },
];

// Era labels for timeline
const ERAS = [
  { label: 'Ancient', start: -50, end: 0 },
  { label: 'Early Medieval', start: 1, end: 10 },
  { label: 'High Medieval', start: 11, end: 15 },
  { label: 'Early Modern', start: 16, end: 18 },
  { label: 'Modern', start: 19, end: 21 },
];

export function MigrationTimeline({ highlightTribe, showOnlyRelated, className }: MigrationTimelineProps) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    let events = [...MIGRATION_DATA].sort((a, b) => a.era - b.era);
    
    if (highlightTribe && showOnlyRelated) {
      const tribeLower = highlightTribe.toLowerCase();
      events = events.filter(e => 
        e.tribe.toLowerCase().includes(tribeLower) ||
        e.path.some(p => p.toLowerCase().includes(tribeLower))
      );
    }
    
    if (selectedEra) {
      const era = ERAS.find(e => e.label === selectedEra);
      if (era) {
        events = events.filter(e => e.era >= era.start && e.era <= era.end);
      }
    }
    
    return events;
  }, [highlightTribe, showOnlyRelated, selectedEra]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Era Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedEra(null)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
            !selectedEra
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80 text-foreground"
          )}
        >
          All Eras
        </button>
        {ERAS.map(era => (
          <button
            key={era.label}
            onClick={() => setSelectedEra(era.label)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
              selectedEra === era.label
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

        <div className="space-y-3">
          {filteredEvents.map((event, index) => {
            const isExpanded = expandedEvent === index;
            const isHighlighted = highlightTribe && 
              event.tribe.toLowerCase().includes(highlightTribe.toLowerCase());

            return (
              <div
                key={`${event.tribe}-${index}`}
                className={cn(
                  "relative pl-10 transition-all duration-200",
                  isHighlighted && "scale-[1.01]"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isHighlighted
                      ? "bg-primary border-primary"
                      : isExpanded
                      ? "bg-primary/80 border-primary"
                      : "bg-background border-primary/40"
                  )}
                >
                  <MapPin className={cn(
                    "w-2.5 h-2.5",
                    isHighlighted || isExpanded ? "text-primary-foreground" : "text-primary/60"
                  )} />
                </div>

                {/* Event card */}
                <div
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all",
                    isHighlighted
                      ? "bg-primary/10 border-primary"
                      : isExpanded
                      ? "bg-secondary border-primary/50"
                      : "bg-background border-border hover:border-primary/30 hover:bg-secondary/50"
                  )}
                  onClick={() => setExpandedEvent(isExpanded ? null : index)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn(
                        "font-semibold text-sm truncate",
                        isHighlighted ? "text-primary" : "text-foreground"
                      )}>
                        {event.tribe}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground whitespace-nowrap">
                        {event.timePeriod}
                      </span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0",
                      isExpanded && "rotate-90"
                    )} />
                  </div>

                  {/* Migration path preview */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground overflow-x-auto pb-1">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{event.fromRegion}</span>
                    <TrendingUp className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{event.toRegion}</span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
                      {/* Full migration path */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          Migration Path
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {event.path.map((location, i) => (
                            <span key={i} className="flex items-center gap-1">
                              <span className="px-2 py-0.5 bg-primary/10 rounded text-xs text-primary">
                                {location}
                              </span>
                              {i < event.path.length - 1 && (
                                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Naming influence */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1">
                          <Users className="w-3 h-3" />
                          Naming Patterns
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {event.namingInfluence}
                        </p>
                      </div>

                      {/* Population info */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1">
                          <Calendar className="w-3 h-3" />
                          Historical Impact
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {event.populationMovement}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No migration events found for the selected filters.
        </div>
      )}
    </div>
  );
}
