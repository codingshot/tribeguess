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

// Comprehensive African language family hierarchy
const languageFamilyHierarchy: Record<string, { parent?: string; siblings: string[]; description: string; speakersRange?: string; migrationNote?: string }> = {
  // Niger-Congo (largest family)
  'Bantu (Niger-Congo)': {
    parent: 'Niger-Congo',
    siblings: ['Nguni', 'Great Lakes Bantu', 'Congo Basin Bantu', 'East African Bantu', 'Southern Bantu'],
    description: 'Largest African language family with 500+ languages, spoken from Cameroon to South Africa',
    speakersRange: '350+ million',
    migrationNote: 'Bantu expansion began ~3000 BCE from Cameroon/Nigeria, reaching Southern Africa by 500 CE'
  },
  'Grassfields Bantu (Niger-Congo)': {
    parent: 'Niger-Congo',
    siblings: ['Bamileke languages', 'Bamoun', 'Tikar', 'Ring languages'],
    description: 'Highland languages of Cameroon\'s Western grassfields, known for complex chieftaincy systems',
    speakersRange: '5+ million',
    migrationNote: 'Remained in the Bantu homeland region while others migrated south and east'
  },
  'Nguni (Bantu, Niger-Congo)': {
    parent: 'Bantu (Niger-Congo)',
    siblings: ['Zulu', 'Xhosa', 'Swazi', 'Ndebele'],
    description: 'Southern Bantu languages characterized by click consonants borrowed from Khoisan',
    speakersRange: '25+ million',
    migrationNote: 'Nguni speakers arrived in Southern Africa around 1000 CE, adopting clicks from Khoisan peoples'
  },
  'Niger-Congo (Volta-Niger)': {
    parent: 'Niger-Congo',
    siblings: ['Yoruboid', 'Igboid', 'Edoid', 'Nupe-Gbagyi'],
    description: 'Major West African grouping including Yoruba (~45M) and Igbo (~45M) speakers',
    speakersRange: '100+ million'
  },
  'Niger-Congo (Atlantic)': {
    parent: 'Niger-Congo',
    siblings: ['Wolof', 'Serer', 'Fula/Fulfulde'],
    description: 'Spoken along the Atlantic coast of West Africa from Senegal to Guinea',
    speakersRange: '50+ million'
  },
  'Niger-Congo (Mande)': {
    parent: 'Niger-Congo',
    siblings: ['Mandinka', 'Bambara', 'Dyula', 'Soninke'],
    description: 'West African languages with rich oral traditions and historical empires',
    speakersRange: '40+ million',
    migrationNote: 'Mande languages spread with the Mali and Songhai empires (13th-16th centuries)'
  },
  'Niger-Congo (Gur)': {
    parent: 'Niger-Congo',
    siblings: ['Mossi', 'Dagbani', 'Frafra'],
    description: 'Spoken in the savanna regions of West Africa, especially Burkina Faso and Ghana',
    speakersRange: '20+ million'
  },
  'Niger-Congo (Kwa)': {
    parent: 'Niger-Congo',
    siblings: ['Akan/Twi', 'Ewe', 'Ga', 'Fon'],
    description: 'Coastal West African languages including Akan (~30M speakers)',
    speakersRange: '40+ million'
  },
  'Gbe (Niger-Congo)': {
    parent: 'Niger-Congo (Kwa)',
    siblings: ['Ewe', 'Fon', 'Gen', 'Aja'],
    description: 'Vodun-practicing coastal peoples of Ghana, Togo, Benin; origin of Haitian Voodoo',
    speakersRange: '10+ million'
  },
  
  // Afro-Asiatic (including Berber)
  'Berber (Afro-Asiatic)': {
    parent: 'Afro-Asiatic',
    siblings: ['Tamazight', 'Kabyle', 'Tuareg (Tamasheq)', 'Riffian', 'Shilha'],
    description: 'Indigenous languages of North Africa predating Arab conquest, with ancient Tifinagh script',
    speakersRange: '30+ million',
    migrationNote: 'Berber peoples have inhabited North Africa for at least 5,000 years, with Tuareg expanding across Sahara'
  },
  
  // Nilo-Saharan
  'Nilotic': {
    parent: 'Nilo-Saharan',
    siblings: ['Western Nilotic (Luo, Dinka)', 'Eastern Nilotic (Maasai, Turkana)', 'Southern Nilotic (Kalenjin)'],
    description: 'East African pastoralist languages spoken from South Sudan to Tanzania',
    speakersRange: '30+ million',
    migrationNote: 'Nilotic peoples migrated south from the Nile Valley starting ~3000 years ago'
  },
  'Nilo-Saharan (Eastern Sudanic)': {
    parent: 'Nilo-Saharan',
    siblings: ['Nubian', 'Nara', 'Tama', 'Nilotic'],
    description: 'Ancient language family of the Nile Valley and Sudan, including the Nubian languages',
    speakersRange: '35+ million',
    migrationNote: 'Nubians have lived in the Nile Valley for over 5,000 years with the Kingdom of Kush'
  },
  'Western Nilotic': {
    parent: 'Nilotic',
    siblings: ['Luo languages', 'Dinka', 'Nuer', 'Shilluk'],
    description: 'Includes the Luo cluster (Kenya, Tanzania) and Dinka/Nuer (South Sudan)',
    speakersRange: '15+ million'
  },
  'Eastern Nilotic': {
    parent: 'Nilotic',
    siblings: ['Maa (Maasai)', 'Turkana', 'Samburu', 'Teso'],
    description: 'Pastoralist languages of Kenya, Tanzania, and Uganda',
    speakersRange: '5+ million'
  },
  'Southern Nilotic': {
    parent: 'Nilotic',
    siblings: ['Kalenjin languages', 'Datoga'],
    description: 'Highland East African languages, home of world-famous long-distance runners',
    speakersRange: '6+ million'
  },
  
  // Afroasiatic
  'Cushitic': {
    parent: 'Afroasiatic',
    siblings: ['Highland East Cushitic', 'Lowland East Cushitic (Oromo, Somali)', 'Central Cushitic'],
    description: 'Major Horn of Africa family including Oromo (~40M) and Somali (~20M)',
    speakersRange: '70+ million',
    migrationNote: 'Cushitic peoples have inhabited the Horn of Africa for over 7,000 years'
  },
  'Cushitic (Afro-Asiatic)': {
    parent: 'Afroasiatic',
    siblings: ['Oromo', 'Somali', 'Afar', 'Saho', 'Beja'],
    description: 'Ancient language family of the Horn of Africa with diverse pastoralist cultures',
    speakersRange: '70+ million'
  },
  'Semitic': {
    parent: 'Afroasiatic',
    siblings: ['Ethiopian Semitic (Amharic, Tigrinya)', 'Arabic dialects'],
    description: 'Includes Amharic (~30M), Tigrinya (~7M), and North African Arabic varieties',
    speakersRange: '200+ million'
  },
  'Ethiopian Semitic': {
    parent: 'Semitic',
    siblings: ['Amharic', 'Tigrinya', 'Tigre', 'Gurage languages'],
    description: 'Unique African Semitic languages with the ancient Ge\'ez script tradition',
    speakersRange: '40+ million',
    migrationNote: 'South Arabian migrants crossed the Red Sea ~3000 years ago, founding Aksumite civilization'
  },
  'Ethiopian Semitic (Afro-Asiatic)': {
    parent: 'Afroasiatic',
    siblings: ['Amharic', 'Tigrinya', 'Gurage', 'Harari'],
    description: 'Unique African Semitic languages using the ancient Ge\'ez script system',
    speakersRange: '40+ million'
  },
  'Afroasiatic (Chadic)': {
    parent: 'Afroasiatic',
    siblings: ['Hausa', 'Ron', 'Bole', 'Masa'],
    description: 'Largest is Hausa with 80M+ speakers, lingua franca of West African Sahel',
    speakersRange: '100+ million'
  },
  
  // Khoisan
  'Khoisan': {
    parent: undefined,
    siblings: ['!Kung', 'Nama', 'Sandawe', 'Hadza'],
    description: 'Ancient click languages of Southern Africa, among oldest human language families',
    speakersRange: '~400,000',
    migrationNote: 'Khoisan peoples are among the oldest human populations, present in Southern Africa for 100,000+ years'
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
              
              {/* Current family - now clickable */}
              <div className="ml-4 border-l-2 border-primary/30 pl-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Link 
                    to={`/languages/${languageFamily.toLowerCase().split(' ')[0].replace(/[()]/g, '')}`}
                    className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                  >
                    {languageFamily}
                  </Link>
                  {familyInfo?.speakersRange && (
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      👥 {familyInfo.speakersRange} speakers
                    </span>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-popover text-popover-foreground border border-border shadow-md p-3">
                      <p className="text-xs font-medium mb-1">{languageFamily}</p>
                      <p className="text-xs text-muted-foreground">
                        {familyInfo?.description || `A language family within the broader African linguistic tradition. ${currentTribe.name} is part of this linguistic group.`}
                      </p>
                      {familyInfo?.speakersRange && (
                        <p className="text-xs mt-1">
                          <strong>Total speakers:</strong> {familyInfo.speakersRange}
                        </p>
                      )}
                      {familyInfo?.siblings && familyInfo.siblings.length > 0 && (
                        <p className="text-xs mt-1">
                          <strong>Related languages:</strong> {familyInfo.siblings.slice(0, 5).join(', ')}{familyInfo.siblings.length > 5 ? '...' : ''}
                        </p>
                      )}
                      {familyInfo?.migrationNote && (
                        <p className="text-xs mt-2 text-primary/80 italic border-t border-border/50 pt-2">
                          🗺️ {familyInfo.migrationNote}
                        </p>
                      )}
                      {!familyInfo && (
                        <p className="text-xs mt-1 text-muted-foreground italic">
                          Explore related tribes to learn more about this language family.
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                {/* Migration history note if available */}
                {familyInfo?.migrationNote && (
                  <div className="mt-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-primary">🗺️</span>
                      <span><strong>Migration:</strong> {familyInfo.migrationNote}</span>
                    </p>
                  </div>
                )}
                
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
