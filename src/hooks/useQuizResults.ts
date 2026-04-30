import { useState, useEffect, useCallback } from 'react';
import { safeReadStorage, safeWriteStorage, validateQuizResults, validateQuizStats } from '@/lib/dataValidation';
export interface QuizResult {
  quizId: string;
  quizTitle: string;
  categoryId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
  answers: {
    questionId: string;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
}

export interface QuizStats {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageScore: number;
  bestStreak: number;
  currentStreak: number;
  categoriesCompleted: string[];
  perfectScores: number;
  fastestQuiz: { quizId: string; time: number } | null;
  achievements: string[];
  lastPlayedAt: string | null;
}

const STORAGE_KEY = 'tribeguess_quiz_results';
const STATS_KEY = 'tribeguess_quiz_stats';

const defaultStats: QuizStats = {
  totalQuizzesTaken: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  averageScore: 0,
  bestStreak: 0,
  currentStreak: 0,
  categoriesCompleted: [],
  perfectScores: 0,
  fastestQuiz: null,
  achievements: [],
  lastPlayedAt: null,
};

export function useQuizResults() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState<QuizStats>(defaultStats);

  // Load from localStorage on mount with validation
  useEffect(() => {
    const loadedResults = safeReadStorage<QuizResult[]>(
      STORAGE_KEY,
      (data) => validateQuizResults(data) as QuizResult[] | null,
      []
    );
    const loadedStats = safeReadStorage<QuizStats>(
      STATS_KEY,
      (data) => validateQuizStats(data) as unknown as QuizStats | null,
      defaultStats
    );
    setResults(loadedResults);
    setStats(loadedStats);
  }, []);

  // Save results to localStorage
  const saveResults = useCallback((newResults: QuizResult[]) => {
    // Cap stored results at 200
    const capped = newResults.slice(-200);
    safeWriteStorage(STORAGE_KEY, capped);
    setResults(capped);
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((newStats: QuizStats) => {
    safeWriteStorage(STATS_KEY, newStats);
    setStats(newStats);
  }, []);

  // Add a new quiz result (functional updates avoid dropped results on rapid completions)
  const addResult = useCallback((result: QuizResult) => {
    setResults((prev) => {
      const newResults = [...prev, result];
      const capped = newResults.slice(-200);
      safeWriteStorage(STORAGE_KEY, capped);
      return capped;
    });

    setStats((prev) => {
      const newStats = { ...prev };
      newStats.totalQuizzesTaken += 1;
      newStats.totalQuestionsAnswered += result.totalQuestions;
      newStats.totalCorrectAnswers += result.score;
      newStats.averageScore = Math.round(
        (newStats.totalCorrectAnswers / newStats.totalQuestionsAnswered) * 100
      );
      newStats.lastPlayedAt = result.completedAt;

      if (result.percentage === 100) {
        newStats.perfectScores += 1;
      }

      if (!newStats.categoriesCompleted.includes(result.categoryId)) {
        newStats.categoriesCompleted.push(result.categoryId);
      }

      if (!newStats.fastestQuiz || result.timeTaken < newStats.fastestQuiz.time) {
        newStats.fastestQuiz = { quizId: result.quizId, time: result.timeTaken };
      }

      let currentStreak = 0;
      let maxStreak = 0;
      result.answers.forEach((answer) => {
        if (answer.isCorrect) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });
      newStats.bestStreak = Math.max(newStats.bestStreak, maxStreak);
      newStats.currentStreak = currentStreak;

      const newAchievements = [...newStats.achievements];

      if (newStats.totalQuizzesTaken === 1 && !newAchievements.includes('first-quiz')) {
        newAchievements.push('first-quiz');
      }
      if (result.percentage === 100 && !newAchievements.includes('perfect-score')) {
        newAchievements.push('perfect-score');
      }
      if (newStats.totalQuizzesTaken >= 5 && !newAchievements.includes('five-quizzes')) {
        newAchievements.push('five-quizzes');
      }
      if (newStats.categoriesCompleted.length >= 6 && !newAchievements.includes('all-categories')) {
        newAchievements.push('all-categories');
      }
      if (maxStreak >= 3 && !newAchievements.includes('streak-3')) {
        newAchievements.push('streak-3');
      }
      if (maxStreak >= 10 && !newAchievements.includes('streak-10')) {
        newAchievements.push('streak-10');
      }
      if (result.timeTaken < 60 && !newAchievements.includes('speed-demon')) {
        newAchievements.push('speed-demon');
      }
      if (result.quizId === 'tribe-names-beginner' && result.percentage === 100 && !newAchievements.includes('tribe-master')) {
        newAchievements.push('tribe-master');
      }

      newStats.achievements = newAchievements;
      safeWriteStorage(STATS_KEY, newStats);
      return newStats;
    });
  }, []);

  // Get results for a specific quiz
  const getQuizResults = useCallback((quizId: string) => {
    return results.filter((r) => r.quizId === quizId);
  }, [results]);

  // Get best result for a quiz
  const getBestResult = useCallback((quizId: string) => {
    const quizResults = getQuizResults(quizId);
    if (quizResults.length === 0) return null;
    return quizResults.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
  }, [getQuizResults]);

  // Get category stats
  const getCategoryStats = useCallback((categoryId: string) => {
    const categoryResults = results.filter((r) => r.categoryId === categoryId);
    if (categoryResults.length === 0) return null;
    
    const totalScore = categoryResults.reduce((sum, r) => sum + r.percentage, 0);
    return {
      quizzesTaken: categoryResults.length,
      averageScore: Math.round(totalScore / categoryResults.length),
      bestScore: Math.max(...categoryResults.map((r) => r.percentage)),
    };
  }, [results]);

  // Clear all data
  const clearAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATS_KEY);
    setResults([]);
    setStats(defaultStats);
  }, []);

  return {
    results,
    stats,
    addResult,
    getQuizResults,
    getBestResult,
    getCategoryStats,
    clearAllData,
  };
}
