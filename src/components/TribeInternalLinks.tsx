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

  // Same-country tribes (top 6, excluding self)
  const sameCountryTribes = useMemo(() => {
    const countryCodes = ((tribe as any).countries || []) as string[];
    if (countryCodes.length === 0) return [];
    const allTribes = getAllTribes();
    return allTribes
      .filter(t => t.id !== tribe.id && ((t as any).countries || []).some((c: string) => countryCodes.includes(c)))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 6);
  }, [tribe]);

  // Same-language-family tribes (top 6, excluding self)
  const sameLangTribes = useMemo(() => {
    const family = (tribe as any).language?.family;
    if (!family) return [];
    const allTribes = getAllTribes();
    return allTribes
      .filter(t => t.id !== tribe.id && (t as any).language?.family === family)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 6);
  }, [tribe]);

  const countries = useMemo(() => getCountries(), []);
  const countryCodes = ((tribe as any).countries || []) as string[];
  const primaryCountry = countryCodes[0] ? countries.find(c => c.code === countryCodes[0]) : null;

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

        {/* Same Country Tribes */}
        {primaryCountry && sameCountryTribes.length > 0 && (
          <Link
            to={`/country/${countryCodeToSlug(primaryCountry.code)}`}
            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                Other Tribes in {primaryCountry.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {sameCountryTribes.length}+ including {sameCountryTribes[0]?.name}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
          </Link>
        )}

        {/* Compare — opens compare tool with this tribe pre-filled */}
        <Link
          to={`/compare?tribes=${encodeURIComponent(tribe.slug)}`}
          className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm group-hover:text-primary transition-colors">Quick tribe compare</p>
            <p className="text-xs text-muted-foreground">Add more tribes and compare side by side</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>

        {/* Quiz */}
        <Link
          to="/quiz"
          className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm group-hover:text-primary transition-colors">
              Test Your Knowledge
            </p>
            <p className="text-xs text-muted-foreground">
              Take a quiz about African tribes & culture
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>

      {/* Same-language tribe chips */}
      {sameLangTribes.length > 0 && (tribe as any).language?.family && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            Other {(tribe as any).language.family} tribes:
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
        <div className="mt-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            More tribes in {primaryCountry.name}:
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
