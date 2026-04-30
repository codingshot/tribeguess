import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChefHat, Church, Languages, ArrowRight, Globe, MapPin, ArrowLeftRight, BookOpen } from 'lucide-react';
import { getPeopleByTribe } from '@/lib/peopleUtils';
import { getRecipesByTribe } from '@/data/recipes';
import { findReligionByName } from '@/data/traditionalReligions';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import languageFamiliesData from '@/data/languageFamilies.json';
import { countryCodeToSlug } from '@/lib/seoConstants';
import type { TribeData } from '@/types/tribe';

interface TribeInternalLinksProps {
  tribe: TribeData;
}

export function TribeInternalLinks({ tribe }: TribeInternalLinksProps) {
  const people = useMemo(() => getPeopleByTribe(tribe.slug).slice(0, 6), [tribe.slug]);
  const recipes = useMemo(() => getRecipesByTribe(tribe.slug), [tribe.slug]);
  
  const religion = useMemo(() => {
    const tr = tribe.traditionalReligion;
    if (tr && typeof tr === 'object' && 'name' in tr && typeof (tr as { name: unknown }).name === 'string') {
      return findReligionByName((tr as { name: string }).name);
    }
    return findReligionByName(tribe.name);
  }, [tribe]);

  const languageFamily = useMemo(() => {
    const family = tribe.language?.family?.toLowerCase();
    if (!family) return null;
    return languageFamiliesData.languageFamilies.find(f =>
      family.includes(f.id.toLowerCase()) || family.includes(f.name.toLowerCase())
    );
  }, [tribe]);

  // Same-country tribes (top 6, excluding self)
  const sameCountryTribes = useMemo(() => {
    const countryCodes = tribe.countries ?? [];
    if (countryCodes.length === 0) return [];
    const allTribes = getAllTribes();
    return allTribes
      .filter(t => t.id !== tribe.id && (t.countries ?? []).some(c => countryCodes.includes(c)))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 6);
  }, [tribe]);

  // Same-language-family tribes (top 6, excluding self)
  const sameLangTribes = useMemo(() => {
    const family = tribe.language?.family;
    if (!family) return [];
    const allTribes = getAllTribes();
    return allTribes
      .filter(t => t.id !== tribe.id && t.language?.family === family)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 6);
  }, [tribe]);

  const countries = useMemo(() => getCountries(), []);
  const countryCodes = tribe.countries ?? [];
  const primaryCountry = countryCodes[0] ? countries.find(c => c.code === countryCodes[0]) : null;

  return (
    <section className="border-t border-border pt-5">
      <h2 className="font-display text-base sm:text-lg font-semibold mb-3 text-foreground">
        Explore · {tribe.name}
      </h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {/* Famous People */}
        {people.length > 0 && (
          <Link
            to={`/people?tribe=${tribe.slug}`}
            className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                Famous {tribe.name} People
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {people.length}+ figures · {people[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Recipes */}
        {recipes.length > 0 && (
          <Link
            to={`/recipes?tribe=${tribe.slug}`}
            className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ChefHat className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                {tribe.name} Traditional Recipes
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {recipes.length} dishes · {recipes[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Religion */}
        {religion && (
          <Link
            to={`/religion/${religion.id}`}
            className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Church className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                {tribe.name} Religion & Beliefs
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {religion.name}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Language Family */}
        {languageFamily && (
          <Link
            to={`/languages/${languageFamily.slug}`}
            className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Languages className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                {languageFamily.name} Language Family
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {languageFamily.totalSpeakers} speakers
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Same Country Tribes */}
        {primaryCountry && sameCountryTribes.length > 0 && (
          <Link
            to={`/country/${countryCodeToSlug(primaryCountry.code)}`}
            className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                Other Tribes in {primaryCountry.name}
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {sameCountryTribes.length}+ · {sameCountryTribes[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Compare — opens compare tool with this tribe pre-filled */}
        <Link
          to={`/compare?tribes=${encodeURIComponent(tribe.slug)}`}
          className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">Compare tribes</p>
            <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">Side by side</p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>

        {/* Quiz */}
        <Link
          to="/quiz"
          className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
              Culture quiz
            </p>
            <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">Tribes & traditions</p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>

      {/* Same-language tribe chips */}
      {sameLangTribes.length > 0 && tribe.language?.family && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">
            Other {tribe.language.family} tribes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sameLangTribes.map(t => (
              <Link
                key={t.id}
                to={`/learn/${t.slug}`}
                className="px-2.5 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Same-country tribe chips */}
      {sameCountryTribes.length > 0 && primaryCountry && (
        <div className="mt-2.5">
          <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">
            More in {primaryCountry.name}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sameCountryTribes.map(t => (
              <Link
                key={t.id}
                to={`/learn/${t.slug}`}
                className="px-2.5 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
