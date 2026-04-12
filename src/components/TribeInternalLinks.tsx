import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChefHat, Church, Languages, ArrowRight } from 'lucide-react';
import { getPeopleByTribe } from '@/lib/peopleUtils';
import { getRecipesByTribe } from '@/data/recipes';
import { findReligionByName } from '@/data/traditionalReligions';
import languageFamiliesData from '@/data/languageFamilies.json';
import type { TribeData } from '@/types/tribe';

interface TribeInternalLinksProps {
  tribe: TribeData;
}

export function TribeInternalLinks({ tribe }: TribeInternalLinksProps) {
  const people = useMemo(() => getPeopleByTribe(tribe.slug).slice(0, 6), [tribe.slug]);
  const recipes = useMemo(() => getRecipesByTribe(tribe.slug), [tribe.slug]);
  
  const religion = useMemo(() => {
    const tradRel = (tribe as any).traditionalReligion;
    if (tradRel?.name) return findReligionByName(tradRel.name);
    return findReligionByName(tribe.name);
  }, [tribe]);

  const languageFamily = useMemo(() => {
    const family = (tribe as any).language?.family?.toLowerCase();
    if (!family) return null;
    return languageFamiliesData.languageFamilies.find(f =>
      family.includes(f.id.toLowerCase()) || family.includes(f.name.toLowerCase())
    );
  }, [tribe]);

  const hasLinks = people.length > 0 || recipes.length > 0 || religion || languageFamily;
  if (!hasLinks) return null;

  return (
    <section className="border-t border-border pt-6">
      <h2 className="font-display text-lg sm:text-xl font-semibold mb-4">
        Explore More About the {tribe.name}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Famous People */}
        {people.length > 0 && (
          <Link
            to={`/people?tribe=${tribe.slug}`}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                Famous {tribe.name} People
              </p>
              <p className="text-xs text-muted-foreground">
                {people.length}+ notable figures including {people[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Recipes */}
        {recipes.length > 0 && (
          <Link
            to={`/recipes?tribe=${tribe.slug}`}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ChefHat className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {tribe.name} Traditional Recipes
              </p>
              <p className="text-xs text-muted-foreground">
                {recipes.length} dishes including {recipes[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Religion */}
        {religion && (
          <Link
            to={`/religion/${religion.id}`}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Church className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {tribe.name} Religion & Beliefs
              </p>
              <p className="text-xs text-muted-foreground">
                {religion.name} — spiritual practices & traditions
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Language Family */}
        {languageFamily && (
          <Link
            to={`/languages/${languageFamily.slug}`}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Languages className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {languageFamily.name} Language Family
              </p>
              <p className="text-xs text-muted-foreground">
                {languageFamily.totalSpeakers} speakers across Africa
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}
      </div>
    </section>
  );
}
