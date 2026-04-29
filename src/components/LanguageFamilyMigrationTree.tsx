import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, MapPin, Users, ChevronDown, ChevronRight, Globe, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MigrationEvent {
  period: string;
  description: string;
}

interface LanguageBranch {
  name: string;
  speakers: string;
  region: string;
  tribes: { name: string; slug: string }[];
  migration?: MigrationEvent;
  color: string;
}

interface LanguageFamilyNode {
  id: string;
  name: string;
  icon: string;
  speakers: string;
  origin: string;
  originPeriod: string;
  description: string;
  color: string;
  branches: LanguageBranch[];
  migrations: MigrationEvent[];
  connections?: string[]; // IDs of families this one connects to
}

const FAMILY_DATA: LanguageFamilyNode[] = [
  {
    id: 'niger-congo',
    name: 'Niger-Congo',
    icon: '🌍',
    speakers: '700M+',
    origin: 'West Africa (Nigeria/Cameroon border)',
    originPeriod: '~10,000 BCE',
    description: "World's largest language family by number of languages (1,500+). Includes Bantu, Mande, Kwa, and Atlantic branches.",
    color: 'from-emerald-500 to-teal-600',
    branches: [
      {
        name: 'Bantu',
        speakers: '350M+',
        region: 'Sub-Saharan Africa',
        tribes: [
          { name: 'Zulu', slug: 'zulu' },
          { name: 'Kikuyu', slug: 'kikuyu' },
          { name: 'Shona', slug: 'shona' },
          { name: 'Kongo', slug: 'kongo' },
          { name: 'Swahili', slug: 'swahili' },
          { name: 'Luba', slug: 'luba' },
          { name: 'Tswana', slug: 'tswana' },
          { name: 'Bemba', slug: 'bemba' },
          { name: 'Tonga', slug: 'tonga-zambia' },
        ],
        migration: { period: '3000 BCE – 500 CE', description: 'The Bantu Expansion: From Cameroon/Nigeria, Bantu speakers migrated south and east across the continent over 3,000 years' },
        color: 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700'
      },
      {
        name: 'Mande',
        speakers: '40M+',
        region: 'West Africa (Sahel)',
        tribes: [
          { name: 'Mandinka', slug: 'mandinka' },
          { name: 'Bambara', slug: 'bambara' },
          { name: 'Soninke', slug: 'soninke' },
        ],
        migration: { period: '1200–1600 CE', description: 'Spread with the Mali and Songhai empires across the West African savanna' },
        color: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700'
      },
      {
        name: 'Kwa',
        speakers: '40M+',
        region: 'Coastal West Africa',
        tribes: [
          { name: 'Ashanti', slug: 'ashanti' },
          { name: 'Ewe', slug: 'ewe' },
          { name: 'Fante', slug: 'fante' },
        ],
        color: 'bg-lime-100 dark:bg-lime-900/30 border-lime-300 dark:border-lime-700'
      },
      {
        name: 'Atlantic',
        speakers: '50M+',
        region: 'Senegambia & Guinea Coast',
        tribes: [
          { name: 'Wolof', slug: 'wolof' },
          { name: 'Fulani', slug: 'fulani' },
        ],
        color: 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-300 dark:border-cyan-700'
      },
      {
        name: 'Volta-Niger',
        speakers: '100M+',
        region: 'Nigeria & Benin',
        tribes: [
          { name: 'Yoruba', slug: 'yoruba' },
          { name: 'Igbo', slug: 'igbo' },
          { name: 'Edo', slug: 'edo' },
        ],
        color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
      }
    ],
    migrations: [
      { period: '~10,000 BCE', description: 'Proto-Niger-Congo homeland in West Africa' },
      { period: '~3000 BCE', description: 'Bantu expansion begins from Cameroon/Nigeria border region' },
      { period: '~1000 BCE', description: 'Bantu speakers reach East Africa (Great Lakes)' },
      { period: '~500 CE', description: 'Bantu expansion reaches Southern Africa (Zulu, Xhosa ancestors)' },
      { period: '1200 CE', description: 'Mali Empire spreads Mande languages across West Africa' },
    ],
    connections: ['nilo-saharan', 'khoisan']
  },
  {
    id: 'nilo-saharan',
    name: 'Nilo-Saharan',
    icon: '🏜️',
    speakers: '50M+',
    origin: 'Upper Nile Valley (Sudan/South Sudan)',
    originPeriod: '~15,000 BCE',
    description: 'One of the oldest language families, spoken by pastoralist peoples of the Nile Valley and Great Rift.',
    color: 'from-orange-500 to-red-600',
    branches: [
      {
        name: 'Western Nilotic',
        speakers: '15M+',
        region: 'South Sudan, Kenya, Uganda',
        tribes: [
          { name: 'Dinka', slug: 'dinka' },
          { name: 'Nuer', slug: 'nuer' },
          { name: 'Luo', slug: 'luo' },
          { name: 'Shilluk', slug: 'shilluk' },
        ],
        migration: { period: '3000 BCE – present', description: 'Migrated south from Nile Valley into South Sudan and eventually Kenya/Tanzania' },
        color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
      },
      {
        name: 'Eastern Nilotic',
        speakers: '5M+',
        region: 'Kenya, Tanzania, Uganda',
        tribes: [
          { name: 'Maasai', slug: 'maasai' },
          { name: 'Turkana', slug: 'turkana' },
          { name: 'Samburu', slug: 'samburu' },
        ],
        migration: { period: '1000 BCE – 500 CE', description: 'Pastoralists migrated from the Nile into the East African Rift Valley' },
        color: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
      },
      {
        name: 'Southern Nilotic',
        speakers: '6M+',
        region: 'Kenya Highlands',
        tribes: [
          { name: 'Kalenjin', slug: 'kalenjin' },
        ],
        migration: { period: '500 BCE – 500 CE', description: 'Settled in the Kenya Highlands, becoming famous long-distance runners' },
        color: 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700'
      }
    ],
    migrations: [
      { period: '~15,000 BCE', description: 'Proto-Nilo-Saharan speakers in the Nile Valley' },
      { period: '~3000 BCE', description: 'Nilotic peoples begin southward migration from Upper Nile' },
      { period: '~1000 BCE', description: 'Eastern Nilotic (Maasai ancestors) enter the Rift Valley' },
      { period: '~500 CE', description: 'Luo peoples reach Lake Victoria region' },
    ],
    connections: ['niger-congo', 'afroasiatic']
  },
  {
    id: 'afroasiatic',
    name: 'Afroasiatic',
    icon: '📜',
    speakers: '500M+',
    origin: 'Horn of Africa / Nile Valley',
    originPeriod: '~18,000 BCE',
    description: 'Ancient family spanning North and East Africa, including Semitic, Cushitic, Berber, and Chadic branches.',
    color: 'from-blue-500 to-indigo-600',
    branches: [
      {
        name: 'Cushitic',
        speakers: '70M+',
        region: 'Horn of Africa',
        tribes: [
          { name: 'Oromo', slug: 'oromo' },
          { name: 'Somali', slug: 'kenyan-somali' },
          { name: 'Afar', slug: 'afar' },
          { name: 'Beja', slug: 'beja' },
        ],
        migration: { period: '7000+ years ago', description: 'Among the oldest inhabitants of the Horn, with continuous presence for millennia' },
        color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
      },
      {
        name: 'Ethiopian Semitic',
        speakers: '40M+',
        region: 'Ethiopian Highlands',
        tribes: [
          { name: 'Amhara', slug: 'amhara' },
          { name: 'Tigrinya', slug: 'tigrinya' },
        ],
        migration: { period: '~3000 years ago', description: 'South Arabian migrants crossed the Red Sea, founding Aksumite civilization' },
        color: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700'
      },
      {
        name: 'Berber (Amazigh)',
        speakers: '30M+',
        region: 'North Africa & Sahara',
        tribes: [
          { name: 'Kabyle', slug: 'kabyle' },
          { name: 'Tuareg', slug: 'tuareg' },
          { name: 'Amazigh', slug: 'amazigh' },
        ],
        migration: { period: '5000+ years ago', description: 'Indigenous to North Africa, with Tuareg expanding across the Sahara' },
        color: 'bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700'
      },
      {
        name: 'Chadic',
        speakers: '80M+',
        region: 'West African Sahel',
        tribes: [
          { name: 'Hausa', slug: 'hausa' },
        ],
        migration: { period: 'Ancient', description: 'Hausa became the lingua franca of West African trade routes' },
        color: 'bg-sky-100 dark:bg-sky-900/30 border-sky-300 dark:border-sky-700'
      }
    ],
    migrations: [
      { period: '~18,000 BCE', description: 'Proto-Afroasiatic homeland in the Horn/Nile region' },
      { period: '~7000 BCE', description: 'Cushitic peoples establish pastoralist cultures in Horn of Africa' },
      { period: '~3000 BCE', description: 'Berber peoples spread across North Africa and Sahara' },
      { period: '~1000 BCE', description: 'South Arabian migrants found Aksumite civilization (Ethiopia)' },
    ],
    connections: ['nilo-saharan']
  },
  {
    id: 'khoisan',
    name: 'Khoisan',
    icon: '🏹',
    speakers: '~400K',
    origin: 'Southern Africa',
    originPeriod: '~100,000 BCE',
    description: "Among humanity's oldest languages, characterized by click consonants. Spoken by the San and Khoekhoe peoples.",
    color: 'from-yellow-500 to-orange-500',
    branches: [
      {
        name: 'Khoisan Languages',
        speakers: '~400K',
        region: 'Botswana, Namibia, South Africa, Tanzania',
        tribes: [
          { name: 'San (Bushmen)', slug: 'san' },
        ],
        migration: { period: '100,000+ years', description: 'The oldest continuous inhabitants of Southern Africa, with click languages that influenced Zulu and Xhosa' },
        color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
      }
    ],
    migrations: [
      { period: '~100,000 BCE', description: 'Khoisan peoples are among the oldest human populations' },
      { period: '~2000 years ago', description: 'Bantu expansion pushes Khoisan to marginal areas' },
      { period: 'Ongoing', description: 'Click consonants borrowed by Nguni (Zulu, Xhosa) languages' },
    ],
    connections: ['niger-congo']
  }
];

const CONNECTION_DESCRIPTIONS: Record<string, string> = {
  'niger-congo→nilo-saharan': 'Bantu and Nilotic peoples interacted in the Great Lakes region, sharing agricultural techniques and cattle culture',
  'niger-congo→khoisan': 'Bantu expansion displaced Khoisan peoples, but Nguni languages (Zulu, Xhosa) absorbed Khoisan click consonants',
  'nilo-saharan→afroasiatic': 'Nilotic and Cushitic peoples have co-existed in the Horn for millennia, sharing pastoralist traditions',
};

function BranchCard({ branch }: { branch: LanguageBranch }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`rounded-lg border p-3 ${branch.color} transition-all`}>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-sm truncate">{branch.name}</span>
          <Badge variant="secondary" className="text-xs shrink-0">{branch.speakers}</Badge>
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {branch.region}
          </p>
          
          {branch.migration && (
            <div className="p-2 bg-background/60 rounded-md">
              <p className="text-xs font-medium">{branch.migration.period}</p>
              <p className="text-xs text-muted-foreground">{branch.migration.description}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            {branch.tribes.map(tribe => (
              <Link
                key={tribe.slug}
                to={`/learn/${tribe.slug}`}
                className="px-2 py-0.5 bg-background/80 hover:bg-primary/10 text-xs rounded border border-border hover:border-primary/30 transition-colors"
              >
                {tribe.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FamilyNode({ family }: { family: LanguageFamilyNode }) {
  const [showTimeline, setShowTimeline] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <div className={`relative h-16 bg-gradient-to-r ${family.color} flex items-center px-4 gap-3`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" aria-hidden />
        <span className="text-2xl relative z-10 drop-shadow-sm">{family.icon}</span>
        <div className="relative z-10 min-w-0">
          <h3 className="text-white font-bold text-lg drop-shadow-sm truncate">{family.name}</h3>
          <p className="text-white/90 text-xs drop-shadow-sm">{family.speakers} speakers</p>
        </div>
      </div>
      <CardContent className="pt-4 space-y-3">
        <p className="text-sm text-muted-foreground">{family.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {family.origin}</span>
          <span>{family.originPeriod}</span>
        </div>
        
        {/* Branches */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-primary" /> Branches
          </h4>
          {family.branches.map((branch, i) => (
            <BranchCard key={i} branch={branch} />
          ))}
        </div>
        
        {/* Migration Timeline Toggle */}
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          {showTimeline ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          Migration Timeline ({family.migrations.length} events)
        </button>
        
        {showTimeline && (
          <div className="pl-3 border-l-2 border-primary/30 space-y-2">
            {family.migrations.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[17px] w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                <p className="text-xs font-semibold text-primary ml-2">{m.period}</p>
                <p className="text-xs text-muted-foreground ml-2">{m.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function LanguageFamilyMigrationTree() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 flex items-center justify-center gap-2">
          <GitBranch className="w-6 h-6 text-primary" />
          Language Family Migration Tree
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Africa's four major language families trace migrations spanning 100,000 years. 
          Expand each branch to explore tribes and their linguistic journeys.
        </p>
      </div>

      {/* Cross-family connections */}
      <div className="grid sm:grid-cols-3 gap-3">
        {Object.entries(CONNECTION_DESCRIPTIONS).map(([key, desc]) => {
          const [from, to] = key.split('→');
          const fromFamily = FAMILY_DATA.find(f => f.id === from);
          const toFamily = FAMILY_DATA.find(f => f.id === to);
          return (
            <div key={key} className="p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">{fromFamily?.icon}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{toFamily?.icon}</span>
                <span className="text-xs font-semibold">{fromFamily?.name} ↔ {toFamily?.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          );
        })}
      </div>

      {/* Family Nodes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {FAMILY_DATA.map(family => (
          <FamilyNode key={family.id} family={family} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center italic">
        Language classifications are based on scholarly consensus. Real linguistic relationships are complex, 
        and some classifications remain debated by researchers.
      </p>
    </section>
  );
}