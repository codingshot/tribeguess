import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Users, ArrowRight, Info } from 'lucide-react';
import { getAllTribes } from '@/lib/tribeDetection';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FamilyTreeProps {
  currentTribe: {
    id: string;
    name: string;
    slug: string;
    language?: {
      family: string;
      name: string;
    };
  };
  ethnicComponents?: {
    name: string;
    description: string;
    historicalRole?: string;
    population?: string;
  }[];
}

// Define major language family trees for African tribes
const languageFamilyHierarchy: Record<string, { parent?: string; siblings: string[]; description: string }> = {
  'Bantu (Niger-Congo)': {
    parent: 'Niger-Congo',
    siblings: ['Nguni', 'Great Lakes Bantu', 'Congo Basin Bantu', 'East African Bantu'],
    description: 'Largest African language family, spoken across sub-Saharan Africa'
  },
  'Nilotic': {
    parent: 'Nilo-Saharan',
    siblings: ['Western Nilotic', 'Eastern Nilotic', 'Southern Nilotic'],
    description: 'Spoken by pastoralist and agro-pastoralist communities in East Africa'
  },
  'Cushitic': {
    parent: 'Afroasiatic',
    siblings: ['Highland East Cushitic', 'Lowland East Cushitic', 'Central Cushitic'],
    description: 'Major branch of Afroasiatic, spoken in the Horn of Africa'
  },
  'Semitic': {
    parent: 'Afroasiatic',
    siblings: ['Ethiopian Semitic', 'Arabic'],
    description: 'Includes Amharic, Tigrinya, and Arabic-influenced languages'
  },
  'Niger-Congo (Volta-Niger)': {
    parent: 'Niger-Congo',
    siblings: ['Yoruboid', 'Igboid', 'Edo', 'Nupe'],
    description: 'Major West African language grouping including Yoruba and Igbo'
  },
  'Afroasiatic (Chadic)': {
    parent: 'Afroasiatic',
    siblings: ['Hausa', 'Other Chadic languages'],
    description: 'Largest Chadic language is Hausa with 100+ million speakers'
  }
};

export const TribeFamilyTree: React.FC<FamilyTreeProps> = ({ currentTribe, ethnicComponents }) => {
  const allTribes = getAllTribes();
  const languageFamily = currentTribe.language?.family || '';
  
  // Find related tribes with the same language family
  const relatedByLanguage = allTribes.filter(t => {
    const tLang = (t as any).language?.family;
    return tLang && tLang === languageFamily && t.id !== currentTribe.id;
  }).slice(0, 6);
  
  const familyInfo = languageFamilyHierarchy[languageFamily];

  return (
    <TooltipProvider>
      <section className="bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl p-4 border border-accent/50">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
          <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Ethnic Lineage & Language Family
        </h2>
        
        {/* Ethnic Components Section (for groups like Banyarwanda with Hutu/Tutsi/Twa) */}
        {ethnicComponents && ethnicComponents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Ethnic Components of {currentTribe.name}
            </h3>
            <div className="grid gap-3">
              {ethnicComponents.map((component, i) => (
                <div 
                  key={i} 
                  className="p-3 bg-background/60 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{component.name}</span>
                        {component.population && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {component.population}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                      {component.historicalRole && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          📜 Historical: {component.historicalRole}
                        </p>
                      )}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="text-xs">
                          ⚠️ These categories reflect historical classifications that have been 
                          misused. Modern {currentTribe.name.split(' ')[0]} emphasize national unity 
                          over ethnic divisions.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Language Family Tree */}
        {languageFamily && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Language Family Tree</h3>
            <div className="relative">
              {/* Root */}
              {familyInfo?.parent && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {familyInfo.parent}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              
              {/* Current family */}
              <div className="ml-4 border-l-2 border-primary/30 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    {languageFamily}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{familyInfo?.description || `The ${languageFamily} language family.`}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                {/* Current language */}
                {currentTribe.language?.name && (
                  <div className="ml-4 border-l-2 border-accent/50 pl-4 py-2">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-lg inline-flex items-center gap-1">
                      🗣️ {currentTribe.language.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Related Tribes by Language */}
        {relatedByLanguage.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Related Peoples ({languageFamily})
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedByLanguage.map(tribe => (
                <Link
                  key={tribe.id}
                  to={`/learn/${tribe.slug}`}
                  className="px-2.5 py-1 bg-background/80 hover:bg-primary/10 text-xs rounded-lg border border-border hover:border-primary/30 transition-colors inline-flex items-center gap-1"
                >
                  <span>{tribe.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-4 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          Language family connections reflect linguistic heritage, not necessarily shared ethnic identity. 
          Colonial-era classifications often oversimplified complex social relationships.
        </p>
      </section>
    </TooltipProvider>
  );
};

export default TribeFamilyTree;
