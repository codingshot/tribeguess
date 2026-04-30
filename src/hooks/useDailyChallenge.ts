import { useState, useEffect, useCallback } from 'react';

export interface DailyChallengeResult {
  date: string; // YYYY-MM-DD format
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
}

export interface DailyStats {
  currentStreak: number;
  longestStreak: number;
  totalDaysPlayed: number;
  totalCorrectAnswers: number;
  averageScore: number;
  perfectDays: number;
  lastPlayedDate: string | null;
}

export interface DailyAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

const DAILY_RESULTS_KEY = 'tribeguess_daily_results';
const DAILY_STATS_KEY = 'tribeguess_daily_stats';
const DAILY_ACHIEVEMENTS_KEY = 'tribeguess_daily_achievements';

const defaultStats: DailyStats = {
  currentStreak: 0,
  longestStreak: 0,
  totalDaysPlayed: 0,
  totalCorrectAnswers: 0,
  averageScore: 0,
  perfectDays: 0,
  lastPlayedDate: null,
};

/** Reset streak when localStorage shows a gap of more than one day (load-time only). */
function checkStreakContinuityOnLoad(currentStats: DailyStats): DailyStats {
  if (!currentStats.lastPlayedDate) return currentStats;
  const todayStr = new Date().toISOString().split('T')[0];
  const today = new Date(todayStr);
  const lastPlayed = new Date(currentStats.lastPlayedDate);
  const diffDays = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) {
    return { ...currentStats, currentStreak: 0 };
  }
  return currentStats;
}

// Daily-specific achievements
export const dailyAchievements: DailyAchievement[] = [
  { id: 'first-daily', name: 'First Steps', description: 'Complete your first daily challenge', icon: 'Calendar' },
  { id: 'streak-3', name: 'Warming Up', description: 'Maintain a 3-day streak', icon: 'Flame' },
  { id: 'streak-7', name: 'Weekly Warrior', description: 'Maintain a 7-day streak', icon: 'Flame' },
  { id: 'streak-14', name: 'Fortnight Fighter', description: 'Maintain a 14-day streak', icon: 'Flame' },
  { id: 'streak-30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: 'Trophy' },
  { id: 'streak-100', name: 'Centurion', description: 'Maintain a 100-day streak', icon: 'Star' },
  { id: 'perfect-day', name: 'Perfect Day', description: 'Score 100% on a daily challenge', icon: 'Zap' },
  { id: 'perfect-week', name: 'Perfect Week', description: 'Score 100% for 7 consecutive days', icon: 'Trophy' },
  { id: 'speed-demon', name: 'Lightning Fast', description: 'Complete daily challenge in under 30 seconds', icon: 'Timer' },
  { id: 'ten-days', name: 'Dedicated Learner', description: 'Complete 10 daily challenges', icon: 'Target' },
  { id: 'fifty-days', name: 'Knowledge Seeker', description: 'Complete 50 daily challenges', icon: 'BookOpen' },
  { id: 'hundred-days', name: 'African Scholar', description: 'Complete 100 daily challenges', icon: 'Award' },
  { id: 'comeback-kid', name: 'Comeback Kid', description: 'Return after missing a day and start a new streak', icon: 'RotateCcw' },
];

export function useDailyChallenge() {
  const [results, setResults] = useState<DailyChallengeResult[]>([]);
  const [stats, setStats] = useState<DailyStats>(defaultStats);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // Get today's date string
  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Load from localStorage on mount with validation
  useEffect(() => {
    try {
      const savedResults = localStorage.getItem(DAILY_RESULTS_KEY);
      const savedStats = localStorage.getItem(DAILY_STATS_KEY);
      const savedAchievements = localStorage.getItem(DAILY_ACHIEVEMENTS_KEY);
      
      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        if (Array.isArray(parsed)) {
          // Validate each result has required fields and cap at 365
          const validated = parsed
            .filter((r: unknown) => {
              if (r == null || typeof r !== 'object') return false;
              const o = r as Record<string, unknown>;
              return (
                typeof o.date === 'string' &&
                typeof o.score === 'number' &&
                typeof o.totalQuestions === 'number'
              );
            })
            .slice(-365);
          setResults(validated);
        }
      }
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        if (parsedStats && typeof parsedStats === 'object' && typeof parsedStats.totalDaysPlayed === 'number') {
          // Clamp numeric values to sane ranges
          parsedStats.currentStreak = Math.max(0, Math.min(parsedStats.currentStreak || 0, 9999));
          parsedStats.longestStreak = Math.max(0, Math.min(parsedStats.longestStreak || 0, 9999));
          parsedStats.totalDaysPlayed = Math.max(0, Math.min(parsedStats.totalDaysPlayed || 0, 99999));
          const updatedStats = checkStreakContinuityOnLoad(parsedStats);
          setStats(updatedStats);
          if (updatedStats !== parsedStats) {
            localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(updatedStats));
          }
        }
      }
      if (savedAchievements) {
        const parsed = JSON.parse(savedAchievements);
        if (Array.isArray(parsed)) {
          // Only keep valid achievement IDs
          const validIds = dailyAchievements.map(a => a.id);
          setUnlockedAchievements(parsed.filter((id: unknown) => typeof id === 'string' && validIds.includes(id)));
        }
      }
    } catch (error) {
      console.warn('[DailyChallenge] Error loading data, resetting:', error);
      try {
        localStorage.removeItem(DAILY_RESULTS_KEY);
        localStorage.removeItem(DAILY_STATS_KEY);
        localStorage.removeItem(DAILY_ACHIEVEMENTS_KEY);
      } catch {
        /* localStorage unavailable */
      }
    }
  }, []);

  // Save results to localStorage
  const saveResults = useCallback((newResults: DailyChallengeResult[]) => {
    try {
      localStorage.setItem(DAILY_RESULTS_KEY, JSON.stringify(newResults));
      setResults(newResults);
    } catch (error) {
      console.error('Error saving daily results:', error);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((newStats: DailyStats) => {
    try {
      localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.error('Error saving daily stats:', error);
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = useCallback((achievements: string[]) => {
    try {
      localStorage.setItem(DAILY_ACHIEVEMENTS_KEY, JSON.stringify(achievements));
      setUnlockedAchievements(achievements);
    } catch (error) {
      console.error('Error saving daily achievements:', error);
    }
  }, []);

  // Check if today's challenge is completed
  const hasCompletedToday = useCallback(() => {
    const today = getTodayString();
    return results.some(r => r.date === today);
  }, [results]);

  // Get today's result
  const getTodayResult = useCallback(() => {
    const today = getTodayString();
    return results.find(r => r.date === today) || null;
  }, [results]);

  // Calculate streak bonus percentage
  const getStreakBonus = useCallback(() => {
    if (stats.currentStreak >= 30) return 20;
    if (stats.currentStreak >= 14) return 15;
    if (stats.currentStreak >= 7) return 10;
    if (stats.currentStreak >= 3) return 5;
    return 0;
  }, [stats.currentStreak]);

  // Check for consecutive perfect days
  const checkPerfectStreak = useCallback((newResults: DailyChallengeResult[]) => {
    const sortedResults = [...newResults].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let perfectStreak = 0;
    for (const result of sortedResults) {
      if (result.percentage === 100) {
        perfectStreak++;
      } else {
        break;
      }
    }
    return perfectStreak;
  }, []);

  // Add a new daily result
  const addDailyResult = useCallback((result: DailyChallengeResult) => {
    if (hasCompletedToday()) return;

    const prevLen = results.length;
    const mergedHolder: { value: DailyChallengeResult[] } = { value: results };

    setResults((prev) => {
      const today = getTodayString();
      if (prev.some((r) => r.date === today)) {
        mergedHolder.value = prev;
        return prev;
      }
      const next = [...prev, result];
      mergedHolder.value = next;
      try {
        localStorage.setItem(DAILY_RESULTS_KEY, JSON.stringify(next));
      } catch (error) {
        console.error('Error saving daily results:', error);
      }
      return next;
    });

    if (mergedHolder.value.length === prevLen) return;

    const newResults = mergedHolder.value;

    const newStats = { ...stats };
    const today = getTodayString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    const wasStreak = stats.lastPlayedDate === yesterdayString || stats.lastPlayedDate === today;
    const hadPreviousStreak = stats.currentStreak > 0 && !wasStreak;

    if (wasStreak || stats.currentStreak === 0) {
      newStats.currentStreak = stats.currentStreak + 1;
    } else {
      newStats.currentStreak = 1;
    }

    newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
    newStats.totalDaysPlayed = stats.totalDaysPlayed + 1;
    newStats.totalCorrectAnswers = stats.totalCorrectAnswers + result.score;
    newStats.averageScore = Math.round(
      (newStats.totalCorrectAnswers / (newStats.totalDaysPlayed * result.totalQuestions)) * 100
    );
    newStats.lastPlayedDate = today;

    if (result.percentage === 100) {
      newStats.perfectDays = stats.perfectDays + 1;
    }

    saveStats(newStats);

    const newAchievements = [...unlockedAchievements];

    if (newStats.totalDaysPlayed === 1 && !newAchievements.includes('first-daily')) {
      newAchievements.push('first-daily');
    }

    if (newStats.currentStreak >= 3 && !newAchievements.includes('streak-3')) {
      newAchievements.push('streak-3');
    }
    if (newStats.currentStreak >= 7 && !newAchievements.includes('streak-7')) {
      newAchievements.push('streak-7');
    }
    if (newStats.currentStreak >= 14 && !newAchievements.includes('streak-14')) {
      newAchievements.push('streak-14');
    }
    if (newStats.currentStreak >= 30 && !newAchievements.includes('streak-30')) {
      newAchievements.push('streak-30');
    }
    if (newStats.currentStreak >= 100 && !newAchievements.includes('streak-100')) {
      newAchievements.push('streak-100');
    }

    if (result.percentage === 100 && !newAchievements.includes('perfect-day')) {
      newAchievements.push('perfect-day');
    }

    const perfectStreak = checkPerfectStreak(newResults);
    if (perfectStreak >= 7 && !newAchievements.includes('perfect-week')) {
      newAchievements.push('perfect-week');
    }

    if (result.timeTaken < 30 && !newAchievements.includes('speed-demon')) {
      newAchievements.push('speed-demon');
    }

    if (newStats.totalDaysPlayed >= 10 && !newAchievements.includes('ten-days')) {
      newAchievements.push('ten-days');
    }
    if (newStats.totalDaysPlayed >= 50 && !newAchievements.includes('fifty-days')) {
      newAchievements.push('fifty-days');
    }
    if (newStats.totalDaysPlayed >= 100 && !newAchievements.includes('hundred-days')) {
      newAchievements.push('hundred-days');
    }

    if (hadPreviousStreak && !newAchievements.includes('comeback-kid')) {
      newAchievements.push('comeback-kid');
    }

    if (newAchievements.length > unlockedAchievements.length) {
      saveAchievements(newAchievements);
    }
  }, [results, stats, unlockedAchievements, hasCompletedToday, saveStats, saveAchievements, checkPerfectStreak]);

  // Get recent results (last 7 days)
  const getRecentResults = useCallback(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return results.filter(r => new Date(r.date) >= weekAgo)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [results]);

  // Clear all daily data
  const clearAllDailyData = useCallback(() => {
    localStorage.removeItem(DAILY_RESULTS_KEY);
    localStorage.removeItem(DAILY_STATS_KEY);
    localStorage.removeItem(DAILY_ACHIEVEMENTS_KEY);
    setResults([]);
    setStats(defaultStats);
    setUnlockedAchievements([]);
  }, []);

  return {
    results,
    dailyStats: stats,
    unlockedAchievements,
    dailyAchievements,
    hasCompletedToday,
    getTodayResult,
    addDailyResult,
    getStreakBonus,
    getRecentResults,
    clearAllDailyData,
  };
}
