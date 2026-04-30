/**
 * Reusable, SEO-optimized content section components for tribe pages.
 * Each section renders semantic HTML with proper headings for crawlability.
 */

import { Link } from 'react-router-dom';
import { MapPin, Languages, History, Church, Users, Star, Book, UtensilsCrossed } from 'lucide-react';
import type { TribeData, TribeLanguage } from '@/types/tribe';
import { generateTribeIntro } from '@/lib/tribeSeoTemplates';

// ─── Intro / Featured Snippet ──────────────────────────────────────

interface TribeIntroProps {
  tribe: TribeData;
  countryNames: string;
}

export function TribeIntroSnippet({ tribe, countryNames }: TribeIntroProps) {
  const intro = generateTribeIntro(tribe, countryNames);
  return (
    <section aria-label="Overview">
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
        {intro}
      </p>
    </section>
  );
}

// ─── Overview Section ──────────────────────────────────────────────

interface OverviewProps {
  tribe: TribeData;
}

export function TribeOverviewSection({ tribe }: OverviewProps) {
  if (!tribe.description) return null;
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
        <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
        About the {tribe.name} People
      </h2>
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
        {tribe.description}
      </p>
      {tribe.slugAliases && tribe.slugAliases.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          Also known as: {tribe.slugAliases.join(', ')}
        </p>
      )}
    </section>
  );
}

// ─── Naming Conventions Section ────────────────────────────────────

interface NamingProps {
  tribe: TribeData;
}

export function TribeNamingSection({ tribe }: NamingProps) {
  const hasNames = tribe.commonNames?.female?.length || tribe.commonNames?.male?.length;
  const hasTimeBased = tribe.timeBasedNames && Object.keys(tribe.timeBasedNames).length > 0;
  const hasPrefixes = tribe.namePrefixes && tribe.namePrefixes.length > 0;

  if (!hasNames && !hasTimeBased && !hasPrefixes) return null;

  return (
    <section className="border-t border-border pt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
        {tribe.name} Naming Conventions
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Names in {tribe.name} culture carry deep significance, often reflecting circumstances of birth, family lineage, or spiritual beliefs.
      </p>

      {hasNames && (
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {tribe.commonNames?.female && tribe.commonNames.female.length > 0 && (
            <div className="p-3 bg-secondary rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">Common Female Names</h3>
              <div className="flex flex-wrap gap-1.5">
                {tribe.commonNames.female.slice(0, 12).map((name, i) => (
                  <span key={i} className="px-2 py-0.5 bg-background rounded-full text-xs text-muted-foreground border border-border">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {tribe.commonNames?.male && tribe.commonNames.male.length > 0 && (
            <div className="p-3 bg-secondary rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">Common Male Names</h3>
              <div className="flex flex-wrap gap-1.5">
                {tribe.commonNames.male.slice(0, 12).map((name, i) => (
                  <span key={i} className="px-2 py-0.5 bg-background rounded-full text-xs text-muted-foreground border border-border">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {hasPrefixes && (
        <div className="mb-3">
          <h3 className="text-sm font-medium text-foreground mb-1">Name Prefixes</h3>
          <p className="text-xs text-muted-foreground">
            {tribe.name} names often begin with: {tribe.namePrefixes!.join(', ')}
          </p>
        </div>
      )}

      {hasTimeBased && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Time-Based Names</h3>
          <dl className="grid sm:grid-cols-2 gap-2">
            {Object.entries(tribe.timeBasedNames!).map(([time, names]) => (
              <div key={time} className="p-2 bg-secondary rounded-lg">
                <dt className="text-xs font-medium text-foreground capitalize inline">{time}:</dt>
                <dd className="text-xs text-muted-foreground ml-1 inline">
                  {(names as string[]).join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

// ─── Marriage & Family Section ─────────────────────────────────────

interface MarriageProps {
  tribe: TribeData;
}

interface TribeGenderRolesBlock {
  male?: string;
  female?: string;
}

interface TribeGenderRoles {
  traditional?: TribeGenderRolesBlock;
  modern?: TribeGenderRolesBlock;
}

function asGenderRoles(val: unknown): TribeGenderRoles | null {
  if (val === null || typeof val !== 'object') return null;
  return val as TribeGenderRoles;
}

export function TribeMarriageSection({ tribe }: MarriageProps) {
  const genderRoles = asGenderRoles(tribe.genderRoles);
  if (!genderRoles) return null;

  return (
    <section className="border-t border-border pt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
        {tribe.name} Marriage & Family Customs
      </h2>

      {genderRoles.traditional && (
        <div className="p-4 bg-secondary rounded-xl mb-3">
          <h3 className="font-medium text-foreground mb-2">Traditional Roles</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {genderRoles.traditional.male && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Men</p>
                <p className="text-sm text-foreground">{genderRoles.traditional.male}</p>
              </div>
            )}
            {genderRoles.traditional.female && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Women</p>
                <p className="text-sm text-foreground">{genderRoles.traditional.female}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {genderRoles.modern && (
        <div className="p-4 bg-secondary rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Modern Roles</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {genderRoles.modern.male && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Men</p>
                <p className="text-sm text-foreground">{genderRoles.modern.male}</p>
              </div>
            )}
            {genderRoles.modern.female && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Women</p>
                <p className="text-sm text-foreground">{genderRoles.modern.female}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Quick Internal Links Bar ──────────────────────────────────────

interface QuickLinksProps {
  tribe: TribeData;
  hasReligion: boolean;
  hasFood: boolean;
  hasPeople: boolean;
}

export function TribeQuickLinks({ tribe, hasReligion, hasFood, hasPeople }: QuickLinksProps) {
  return (
    <nav aria-label="Page sections" className="flex flex-wrap gap-2 text-xs">
      <a href="#overview" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
        Overview
      </a>
      <a href="#language" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
        Language
      </a>
      <a href="#history" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
        History
      </a>
      <a href="#names" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
        Names
      </a>
      {hasReligion && (
        <a href="#religion" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          Religion
        </a>
      )}
      {hasFood && (
        <a href="#food" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          Food
        </a>
      )}
      {hasPeople && (
        <a href="#people" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          Famous People
        </a>
      )}
      <a href="#faq" className="px-2.5 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
        FAQ
      </a>
    </nav>
  );
}
