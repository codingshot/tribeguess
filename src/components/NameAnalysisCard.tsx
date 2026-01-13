import { AlertCircle, Sparkles, Globe, Search, ArrowRight, Puzzle, BarChart3, MapPin, Users, BookOpen, TrendingUp, ChevronDown, ChevronUp, User, Calendar, Clock, Award, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { MigrationTimeline } from './MigrationTimeline';
import type { CrossCulturalMatch, ReligiousContext, PopularityData } from '@/lib/fullNameAnalysis';
import { analyzeGender, getNameHistory, type GenderAnalysis, type NameHistoryData, type PopularityTrends } from '@/lib/genderNameAnalysis';
import { cn } from '@/lib/utils';

export interface NameBreakdown {
  fullName: string;
  prefix?: { text: string; tribes: { name: string; percentage: number }[] };
  suffix?: { text: string; tribes: { name: string; percentage: number }[] };
  root?: { text: string; meaning?: string };
  religiousIndicator?: { type: string; note: string };
  phoneticCodes?: { soundex: string; metaphone: string; african: string };
}

export interface SimilarName {
  name: string;
  tribe: string;
  tribeSlug: string;
  similarity: number;
}

export interface GlobalMatch {
  origin: string;
  region: string;
  confidence: number;
}

interface NameAnalysisCardProps {
  inputName: string;
  breakdown: NameBreakdown | null;
  similarNames: SimilarName[];
  globalMatches: GlobalMatch[];
  hasResults: boolean;
  topConfidence: number;
  crossCulturalMatches?: CrossCulturalMatch[];
  religiousContext?: ReligiousContext;
  popularityData?: PopularityData;
  detectedTribe?: string;
}

export function NameAnalysisCard({ 
  inputName, 
  breakdown, 
  similarNames, 
  globalMatches, 
  hasResults,
  topConfidence,
  crossCulturalMatches = [],
  religiousContext,
  popularityData,
  detectedTribe
}: NameAnalysisCardProps) {
  const showNoResults = !hasResults || topConfidence < 30;
  const showWeakResults = topConfidence >= 30 && topConfidence < 60;
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCrossCultural, setShowCrossCultural] = useState(false);
  const [showGenderDetails, setShowGenderDetails] = useState(false);
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const [showPopularityTrends, setShowPopularityTrends] = useState(false);
  
  // Analyze gender and history for the input name
  const genderAnalysis = useMemo(() => analyzeGender(inputName), [inputName]);
  const nameHistory = useMemo(() => getNameHistory(inputName), [inputName]);
  
  // Get Muslim name regions from religious context
  const muslimRegions = religiousContext?.religion === 'muslim' || religiousContext?.religion === 'mixed'
    ? religiousContext.africanTribesWithReligion
    : [];
  
  // Gender background gradient based on analysis
  const genderGradient = genderAnalysis.detectedGender === 'male' 
    ? 'from-blue-50/50 to-sky-50/50 dark:from-blue-950/20 dark:to-sky-950/20'
    : genderAnalysis.detectedGender === 'female'
    ? 'from-pink-50/50 to-rose-50/50 dark:from-pink-950/20 dark:to-rose-950/20'
    : 'from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20';
  
  const genderBorder = genderAnalysis.detectedGender === 'male'
    ? 'border-blue-200 dark:border-blue-800'
    : genderAnalysis.detectedGender === 'female'
    ? 'border-pink-200 dark:border-pink-800'
    : 'border-purple-200 dark:border-purple-800';
  
  const genderIcon = genderAnalysis.detectedGender === 'male' ? '♂️' : genderAnalysis.detectedGender === 'female' ? '♀️' : '⚥';
  
  return (
    <div className="mb-6 space-y-4 animate-fade-in">
      {/* Name Breakdown Analysis */}
      {breakdown && (breakdown.prefix || breakdown.suffix || breakdown.religiousIndicator) && (
        <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/30 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Puzzle className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Name Breakdown</h3>
          </div>
          
          {/* Visual word breakdown */}
          <div className="flex items-center justify-center gap-1 mb-4 p-3 bg-background/80 rounded-lg">
            {breakdown.prefix && (
              <div className="relative group">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded font-mono text-sm font-bold border-2 border-blue-300 dark:border-blue-700">
                  {breakdown.prefix.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  prefix
                </div>
              </div>
            )}
            {breakdown.root && (
              <div className="relative group">
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-mono text-sm font-bold border-2 border-amber-300 dark:border-amber-700">
                  {breakdown.root.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-600 dark:text-amber-400 whitespace-nowrap">
                  root
                </div>
              </div>
            )}
            {breakdown.suffix && (
              <div className="relative group">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded font-mono text-sm font-bold border-2 border-green-300 dark:border-green-700">
                  {breakdown.suffix.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-green-600 dark:text-green-400 whitespace-nowrap">
                  suffix
                </div>
              </div>
            )}
          </div>
          
          {/* Phonetic Codes */}
          {breakdown.phoneticCodes && (
            <div className="mt-6 mb-3 p-2 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-medium">Phonetic Codes:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-0.5 bg-background rounded font-mono">
                  <span className="text-muted-foreground">Soundex:</span> {breakdown.phoneticCodes.soundex}
                </span>
                <span className="px-2 py-0.5 bg-background rounded font-mono">
                  <span className="text-muted-foreground">Metaphone:</span> {breakdown.phoneticCodes.metaphone}
                </span>
                <span className="px-2 py-0.5 bg-background rounded font-mono">
                  <span className="text-muted-foreground">African:</span> {breakdown.phoneticCodes.african}
                </span>
              </div>
            </div>
          )}
          
          {/* Percentage breakdown row */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Pattern Match Confidence</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {breakdown.prefix && breakdown.prefix.tribes.slice(0, 3).map((match, i) => (
                <div key={`prefix-${i}`} className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs">
                  <span className="font-medium text-blue-700 dark:text-blue-300">{match.name}</span>
                  <span className="text-blue-600/70 dark:text-blue-400/70">{match.percentage}%</span>
                </div>
              ))}
              {breakdown.suffix && breakdown.suffix.tribes.slice(0, 3).map((match, i) => (
                <div key={`suffix-${i}`} className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-full text-xs">
                  <span className="font-medium text-green-700 dark:text-green-300">{match.name}</span>
                  <span className="text-green-600/70 dark:text-green-400/70">{match.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Religious indicator */}
          {breakdown.religiousIndicator && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-xs">
                <span className="text-purple-600 dark:text-purple-400">🕊️ {breakdown.religiousIndicator.type}</span>
                <span className="text-purple-500/80 dark:text-purple-300/80">{breakdown.religiousIndicator.note}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gender Analysis Card */}
      {genderAnalysis.genderCues.length > 0 && (
        <div className={cn("p-4 rounded-xl border", `bg-gradient-to-r ${genderGradient}`, genderBorder)}>
          <button 
            onClick={() => setShowGenderDetails(!showGenderDetails)}
            className="w-full flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{genderIcon}</span>
              <h3 className="text-sm font-semibold text-foreground">Gender Analysis</h3>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                genderAnalysis.detectedGender === 'male' 
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : genderAnalysis.detectedGender === 'female'
                  ? "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300"
                  : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
              )}>
                {genderAnalysis.pronoun}
              </span>
            </div>
            {showGenderDetails ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {/* Summary */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Likely <span className="font-medium text-foreground capitalize">{genderAnalysis.detectedGender}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{genderAnalysis.genderConfidence}%</span> confidence
              </span>
            </div>
            {genderAnalysis.alternativeGender && (
              <div className="text-xs text-muted-foreground">
                (sometimes {genderAnalysis.alternativeGender.gender}: {genderAnalysis.alternativeGender.percentage}%)
              </div>
            )}
          </div>

          {showGenderDetails && (
            <div className="mt-4 space-y-3 animate-fade-in">
              {/* Gender Cues */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                  <Sparkles className="w-3 h-3" />
                  Gender Indicators
                </div>
                <div className="space-y-2">
                  {genderAnalysis.genderCues.map((cue, i) => (
                    <div key={i} className="p-2 bg-background rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">
                          {cue.indicator}
                        </span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          cue.suggestsGender === 'male' 
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : cue.suggestsGender === 'female'
                            ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        )}>
                          {cue.confidence}% → {cue.suggestsGender}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{cue.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Name History & Age Estimation Card */}
      <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
        <button 
          onClick={() => setShowHistoryDetails(!showHistoryDetails)}
          className="w-full flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-foreground">Name History & Age Estimate</h3>
          </div>
          {showHistoryDetails ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        
        {/* Quick Stats */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 bg-background rounded-lg text-center">
            <div className="text-xs text-muted-foreground">Peak Era</div>
            <div className="text-xs font-medium text-foreground truncate" title={nameHistory.peakPopularity.era}>
              {nameHistory.peakPopularity.era.split('(')[0].trim()}
            </div>
          </div>
          <div className="p-2 bg-background rounded-lg text-center">
            <div className="text-xs text-muted-foreground">Likely Age</div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {nameHistory.estimatedAgeRange.mostCommonAge > 0 
                ? `~${nameHistory.estimatedAgeRange.mostCommonAge} yrs`
                : 'Timeless'}
            </div>
          </div>
          <div className="p-2 bg-background rounded-lg text-center">
            <div className="text-xs text-muted-foreground">Generation</div>
            <div className="text-xs font-medium text-foreground truncate">
              {nameHistory.estimatedAgeRange.generationLabel}
            </div>
          </div>
          <div className="p-2 bg-background rounded-lg text-center">
            <div className="text-xs text-muted-foreground">Trend</div>
            <div className={cn(
              "text-xs font-medium capitalize",
              nameHistory.namingTrend === 'rising' ? "text-green-600 dark:text-green-400" :
              nameHistory.namingTrend === 'declining' ? "text-orange-600 dark:text-orange-400" :
              "text-foreground"
            )}>
              {nameHistory.namingTrend === 'rising' ? '📈' : nameHistory.namingTrend === 'declining' ? '📉' : '📊'} {nameHistory.namingTrend}
            </div>
          </div>
        </div>

        {showHistoryDetails && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {/* Born Between */}
            <div className="p-3 bg-background rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                <Clock className="w-3 h-3" />
                Birth Year Estimate
              </div>
              <p className="text-xs text-muted-foreground">
                People named <span className="font-medium text-foreground">{inputName}</span> were most commonly born between{' '}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {nameHistory.estimatedAgeRange.likelyBornBetween.start}
                </span> and{' '}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {nameHistory.estimatedAgeRange.likelyBornBetween.end}
                </span>.
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${nameHistory.estimatedAgeRange.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{nameHistory.estimatedAgeRange.confidence}%</span>
              </div>
            </div>

            {/* Cultural Significance */}
            {nameHistory.culturalSignificance.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                  <Globe className="w-3 h-3" />
                  Cultural Context
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {nameHistory.culturalSignificance.map((sig, i) => (
                    <span key={i} className="px-2 py-0.5 bg-background rounded text-xs text-muted-foreground">
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Famous Namesakes */}
            {nameHistory.famousNamesakes.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                  <Award className="w-3 h-3" />
                  Famous Namesakes
                </div>
                <div className="space-y-2">
                  {nameHistory.famousNamesakes.map((person, i) => (
                    <div key={i} className="p-2 bg-background rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">{person.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {person.birth}{person.death ? ` - ${person.death}` : ''}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{person.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Peak Era Reason */}
            {nameHistory.peakPopularity.peakReason && (
              <div className="p-2 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                  <span className="font-medium">Why this era?</span> {nameHistory.peakPopularity.peakReason}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popularity Trends Card */}
      {nameHistory.popularityTrends && (
        <div className="p-4 bg-gradient-to-r from-cyan-50/50 to-sky-50/50 dark:from-cyan-950/20 dark:to-sky-950/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <button 
            onClick={() => setShowPopularityTrends(!showPopularityTrends)}
            className="w-full flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-semibold text-foreground">Popularity Trends</h3>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                nameHistory.popularityTrends.trendDirection === 'rising' 
                  ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                  : nameHistory.popularityTrends.trendDirection === 'declining'
                  ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}>
                {nameHistory.popularityTrends.trendDirection === 'rising' ? '↑' : 
                 nameHistory.popularityTrends.trendDirection === 'declining' ? '↓' : '→'} 
                {' '}{nameHistory.popularityTrends.percentageChange > 0 ? '+' : ''}{nameHistory.popularityTrends.percentageChange}%
              </span>
            </div>
            {showPopularityTrends ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {/* Quick Stats Row */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="p-2 bg-background rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Peak Decade</div>
              <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                {nameHistory.popularityTrends.peakDecade}
              </div>
            </div>
            <div className="p-2 bg-background rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Current</div>
              <div className={cn(
                "text-xs font-medium capitalize",
                nameHistory.popularityTrends.currentPopularity === 'very_high' ? "text-green-600 dark:text-green-400" :
                nameHistory.popularityTrends.currentPopularity === 'high' ? "text-blue-600 dark:text-blue-400" :
                nameHistory.popularityTrends.currentPopularity === 'moderate' ? "text-yellow-600 dark:text-yellow-400" :
                "text-gray-600 dark:text-gray-400"
              )}>
                {nameHistory.popularityTrends.currentPopularity.replace('_', ' ')}
              </div>
            </div>
            <div className="p-2 bg-background rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Overall Rank</div>
              <div className="text-sm font-bold text-foreground">
                #{nameHistory.popularityTrends.overallRank}
              </div>
            </div>
          </div>

          {showPopularityTrends && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {/* Decade-by-Decade Chart */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-3">
                  <BarChart3 className="w-3 h-3" />
                  Popularity by Decade
                </div>
                <div className="space-y-2">
                  {nameHistory.popularityTrends.byDecade.map((decade, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-12">{decade.decade}</span>
                      <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden relative">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            decade.popularity > 80 ? "bg-gradient-to-r from-cyan-500 to-blue-500" :
                            decade.popularity > 60 ? "bg-gradient-to-r from-cyan-400 to-sky-400" :
                            decade.popularity > 40 ? "bg-cyan-400/70" :
                            "bg-cyan-400/40"
                          )}
                          style={{ width: `${decade.popularity}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-foreground/70">
                          {decade.popularity > 30 ? `${decade.popularity}%` : ''}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground w-10 text-right">
                        {decade.births}/M
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground text-center">
                  Estimated births per million population
                </p>
              </div>

              {/* Regional Popularity */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  Regional Popularity
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {nameHistory.popularityTrends.byRegion.map((region, i) => (
                    <div key={i} className="p-2 bg-background rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{region.region}</span>
                        <div className="flex items-center gap-1">
                          <span className={cn(
                            "text-xs font-bold",
                            region.popularity > 80 ? "text-green-600 dark:text-green-400" :
                            region.popularity > 60 ? "text-blue-600 dark:text-blue-400" :
                            region.popularity > 40 ? "text-yellow-600 dark:text-yellow-400" :
                            "text-gray-600 dark:text-gray-400"
                          )}>
                            {region.popularity}%
                          </span>
                          {region.rank && (
                            <span className="text-[10px] text-muted-foreground">
                              #{region.rank}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-1">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            region.popularity > 80 ? "bg-green-500" :
                            region.popularity > 60 ? "bg-blue-500" :
                            region.popularity > 40 ? "bg-yellow-500" :
                            "bg-gray-400"
                          )}
                          style={{ width: `${region.popularity}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">
                          {region.countries.slice(0, 3).join(', ')}
                        </span>
                      </div>
                      {region.culturalNote && (
                        <p className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-1 italic">
                          {region.culturalNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Insight */}
              <div className="p-3 bg-cyan-100/50 dark:bg-cyan-900/20 rounded-lg">
                <div className="flex items-start gap-2">
                  {nameHistory.popularityTrends.trendDirection === 'rising' ? (
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                  ) : nameHistory.popularityTrends.trendDirection === 'declining' ? (
                    <TrendingDown className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {nameHistory.popularityTrends.trendDirection === 'rising' 
                        ? `"${inputName}" is gaining popularity!`
                        : nameHistory.popularityTrends.trendDirection === 'declining'
                        ? `"${inputName}" has become less common in recent years`
                        : `"${inputName}" maintains steady popularity`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {nameHistory.popularityTrends.trendDirection === 'rising' 
                        ? 'This name saw increased usage in the 2010s-2020s, possibly influenced by cultural pride movements and African diaspora identity.'
                        : nameHistory.popularityTrends.trendDirection === 'declining'
                        ? 'While less common today, this name carries rich historical significance and may experience a revival.'
                        : 'This timeless name has remained consistently popular across generations and regions.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {(religiousContext || crossCulturalMatches.length > 0) && (
        <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <button 
            onClick={() => setShowCrossCultural(!showCrossCultural)}
            className="w-full flex items-center justify-between gap-2 mb-2"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-foreground">Cross-Cultural & Religious Context</h3>
            </div>
            {showCrossCultural ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {/* Religious context summary */}
          {religiousContext && (
            <div className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg text-xs">
                <span className={religiousContext.religion === 'muslim' ? '🕌' : religiousContext.religion === 'christian' ? '⛪' : '🌍'}>
                  {religiousContext.religion === 'muslim' ? '🕌' : religiousContext.religion === 'christian' ? '⛪' : '🌍'}
                </span>
                <span className="font-medium text-foreground capitalize">{religiousContext.religion} Heritage</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{religiousContext.note}</p>
            </div>
          )}

          {showCrossCultural && (
            <div className="space-y-4 animate-fade-in">
              {/* Muslim tribes with this name pattern */}
              {muslimRegions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                    <MapPin className="w-3 h-3" />
                    Popular Among These African Muslim Communities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {muslimRegions.slice(0, 6).map((tribe, i) => (
                      <Link
                        key={i}
                        to={`/learn/${tribe.tribe.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-1.5 px-2 py-1 bg-background rounded-lg text-xs hover:bg-secondary transition-colors"
                      >
                        <span className="font-medium text-foreground">{tribe.tribe}</span>
                        <span className="text-muted-foreground">{tribe.percentage}% Muslim</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ({tribe.countries.slice(0, 2).join(', ')})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Cross-cultural matches */}
              {crossCulturalMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-teal-700 dark:text-teal-300 mb-2">
                    <Globe className="w-3 h-3" />
                    Cross-Cultural Name Patterns
                  </div>
                  <div className="space-y-2">
                    {crossCulturalMatches.slice(0, 3).map((match, i) => (
                      <div key={i} className="p-2 bg-background rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{match.originCulture}</span>
                          <span className="text-xs px-1.5 py-0.5 bg-teal-100 dark:bg-teal-900/40 rounded text-teal-700 dark:text-teal-300">
                            {match.popularity}% popular
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1.5">{match.historicalNote}</p>
                        <div className="flex flex-wrap gap-1">
                          {match.africanTribes.slice(0, 4).map((tribe, j) => (
                            <Link
                              key={j}
                              to={`/learn/${tribe.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-xs px-1.5 py-0.5 bg-secondary rounded hover:text-primary transition-colors"
                            >
                              {tribe}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popularity trends */}
              {popularityData && (popularityData.firstName.regions.length > 0 || popularityData.lastName.regions.length > 0) && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                    <TrendingUp className="w-3 h-3" />
                    Regional Popularity
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularityData.firstName.regions.slice(0, 4).map((region, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-background rounded text-xs">
                        <span className="text-muted-foreground">{region.region}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${region.popularity}%` }}
                            />
                          </div>
                          <span className="text-foreground font-medium">{region.popularity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Migration Timeline */}
      {detectedTribe && (
        <div className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
          <button 
            onClick={() => setShowTimeline(!showTimeline)}
            className="w-full flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-semibold text-foreground">Migration History & Name Origins</h3>
            </div>
            {showTimeline ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          <p className="mt-2 text-xs text-muted-foreground">
            Explore how {detectedTribe} naming patterns evolved through historical migrations.
          </p>
          
          {showTimeline && (
            <div className="mt-4 animate-fade-in">
              <MigrationTimeline 
                highlightTribe={detectedTribe}
                showOnlyRelated={false}
                className="max-h-[400px] overflow-y-auto"
              />
            </div>
          )}
        </div>
      )}
      
      {/* Global Name Matches */}
      {globalMatches.length > 0 && (
        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Global Name Origins</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {globalMatches.map((match, i) => (
              <Link 
                key={i}
                to="/global-origins"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {match.origin}
                </span>
                <span className="text-xs text-muted-foreground">{match.region}</span>
                <span className="text-xs font-medium px-1.5 py-0.5 bg-secondary rounded text-muted-foreground">
                  {match.confidence}%
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            This name may have origins outside Africa. <Link to="/global-origins" className="text-primary hover:underline">Explore global origins →</Link>
          </p>
        </div>
      )}
      
      {/* No Results / Weak Results Message */}
      {showNoResults && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                We couldn't confidently identify "{inputName}"
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                This name doesn't match our African naming patterns database. It may be a unique spelling, 
                a non-African name, or simply not in our records yet.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link 
                  to="/global-origins" 
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  Check global origins
                </Link>
                <span className="text-amber-500">•</span>
                <Link 
                  to="/learn" 
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
                >
                  <Search className="w-3 h-3" />
                  Browse all tribes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showWeakResults && !showNoResults && (
        <div className="p-3 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ Low confidence match. Results below are our best guesses based on partial pattern matching.
          </p>
        </div>
      )}
      
      {/* Similar Names Suggestions */}
      {similarNames.length > 0 && (
        <div className="p-4 bg-background rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Similar Names in Database</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Did you mean one of these? Names with similar spelling patterns:
          </p>
          <div className="flex flex-wrap gap-2">
            {similarNames.slice(0, 6).map((similar, i) => (
              <a
                key={i}
                href={`/?name=${encodeURIComponent(similar.name)}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
              >
                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {similar.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({similar.tribe})
                </span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}