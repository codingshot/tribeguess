import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Sparkles, ChefHat, MapPin, Languages, Moon, 
  Trophy, Star, BookOpen, Flame, Zap, Timer, Award,
  Play, ArrowRight, RotateCcw, Check, X, Clock, Target,
  ChevronLeft, ChevronRight, Shuffle, Brain, Music, Calendar,
  Globe, UtensilsCrossed, Heart, Mic
} from 'lucide-react';
import { useQuizResults, QuizResult } from '@/hooks/useQuizResults';
import { useDailyChallenge, dailyAchievements } from '@/hooks/useDailyChallenge';
import { DailyChallenge } from '@/components/DailyChallenge';
import quizData from '@/data/quizzes.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Sparkles, ChefHat, MapPin, Languages, Moon, Trophy, Star, 
  BookOpen, Flame, Zap, Timer, Award, Music, Calendar, Target, RotateCcw
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  greetings: Languages,
  tribes: Globe,
  recipes: UtensilsCrossed,
  famous: Star,
  names: Heart,
  music: Mic,
};

const categoryColors: Record<string, string> = {
  greetings: 'from-rose-500 to-pink-600',
  tribes: 'from-amber-500 to-orange-600',
  recipes: 'from-green-500 to-emerald-600',
  famous: 'from-yellow-500 to-amber-600',
  names: 'from-purple-500 to-violet-600',
  music: 'from-pink-500 to-rose-600',
};

const categoryLabels: Record<string, string> = {
  greetings: '🗣️ Greetings',
  tribes: '🌍 Tribes',
  recipes: '🍲 Recipes',
  famous: '⭐ Famous People',
  names: '💜 Name Meanings',
  music: '🎵 Music & Instruments',
};

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  categoryId: string;
  title: string;
  difficulty: string;
  timeLimit: number;
  questions: Question[];
}

interface FlashCard {
  front: string;
  back: string;
  tribe: string;
}

type GameMode = 'menu' | 'quiz' | 'flashcards' | 'results' | 'stats';

export default function QuizPage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correctAnswer: number; isCorrect: boolean }[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  
  // Flashcard state
  const [selectedFlashcardSet, setSelectedFlashcardSet] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [flashcardFilter, setFlashcardFilter] = useState<string>('all');
  
  const { stats, addResult, getBestResult, getCategoryStats } = useQuizResults();
  const { dailyStats, unlockedAchievements: dailyUnlockedAchievements } = useDailyChallenge();

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameMode === 'quiz' && timeRemaining > 0 && !showExplanation) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameMode, timeRemaining, showExplanation]);

  const handleTimeUp = () => {
    if (selectedAnswer === null && selectedQuiz) {
      handleAnswer(-1);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setTimeRemaining(quiz.timeLimit);
    setQuizStartTime(Date.now());
    setGameMode('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation || !selectedQuiz) return;
    
    const currentQ = selectedQuiz.questions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setAnswers([...answers, {
      questionId: currentQ.id,
      selectedAnswer: answerIndex,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
    }]);
  };

  const nextQuestion = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // answers already includes all responses from handleAnswer - no need to push again
      const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
      const totalQ = selectedQuiz.questions.length;
      const correctCount = answers.filter((a) => a.isCorrect).length;
      
      const result: QuizResult = {
        quizId: selectedQuiz.id,
        quizTitle: selectedQuiz.title,
        categoryId: selectedQuiz.categoryId,
        score: correctCount,
        totalQuestions: totalQ,
        percentage: totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0,
        timeTaken,
        completedAt: new Date().toISOString(),
        answers,
      };
      
      addResult(result);
      setGameMode('results');
    }
  };

  const startFlashcards = (setId: string) => {
    const set = quizData.flashcardSets.find((s) => s.id === setId);
    if (set) {
      setSelectedFlashcardSet(setId);
      const shuffled = [...set.cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setCurrentCard(0);
      setIsFlipped(false);
      setGameMode('flashcards');
    }
  };

  const currentFlashcardSet = useMemo(() => 
    quizData.flashcardSets.find((s) => s.id === selectedFlashcardSet),
    [selectedFlashcardSet]
  );

  // Group flashcard sets by category
  const flashcardGroups = useMemo(() => {
    const groups: Record<string, typeof quizData.flashcardSets> = {};
    quizData.flashcardSets.forEach((set) => {
      const cat = (set as any).category || 'other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(set);
    });
    return groups;
  }, []);

  const filteredFlashcardSets = useMemo(() => {
    if (flashcardFilter === 'all') return quizData.flashcardSets;
    return quizData.flashcardSets.filter((s) => (s as any).category === flashcardFilter);
  }, [flashcardFilter]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-700 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <Helmet>
        <title>African Culture Quiz & Flashcards | TribeGuess</title>
        <meta name="description" content="Test your knowledge of African tribes, cultures, foods, and traditions with interactive quizzes, flashcards, and learning games. Track your progress!" />
        <meta name="keywords" content="African quiz, tribe quiz, African culture games, learn African traditions, flashcards, greetings" />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Menu Mode */}
          {gameMode === 'menu' && (
            <>
              {/* Header */}
              <div className="text-center mb-6 sm:mb-10">
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                  <Brain className="inline w-6 h-6 sm:w-8 sm:h-8 mr-2 text-primary" />
                  African Culture Quiz
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  Test your knowledge and learn about African tribes, traditions, and cuisines.
                </p>
              </div>

              {/* Daily Challenge */}
              <div className="mb-6 sm:mb-8">
                <div className="max-w-md mx-auto">
                  <DailyChallenge />
                </div>
              </div>

              {/* Stats Overview */}
              {stats.totalQuizzesTaken > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <Card className="text-center">
                    <CardContent className="p-3 sm:pt-4 sm:pb-3">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-yellow-500" />
                      <p className="text-xl sm:text-2xl font-bold">{stats.totalQuizzesTaken}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Quizzes</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-3 sm:pt-4 sm:pb-3">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-green-500" />
                      <p className="text-xl sm:text-2xl font-bold">{stats.averageScore}%</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Average</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-3 sm:pt-4 sm:pb-3">
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-orange-500" />
                      <p className="text-xl sm:text-2xl font-bold">{dailyStats.currentStreak}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Streak</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-3 sm:pt-4 sm:pb-3">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-purple-500" />
                      <p className="text-xl sm:text-2xl font-bold">{stats.achievements.length + dailyUnlockedAchievements.length}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Badges</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Tabs defaultValue="quizzes" className="space-y-4 sm:space-y-6">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="quizzes" className="text-xs sm:text-sm">Quizzes</TabsTrigger>
                  <TabsTrigger value="flashcards" className="text-xs sm:text-sm">Flashcards</TabsTrigger>
                  <TabsTrigger value="achievements" className="text-xs sm:text-sm">Badges</TabsTrigger>
                </TabsList>

                {/* Quizzes Tab */}
                <TabsContent value="quizzes">
                  <div className="space-y-6 sm:space-y-8">
                    {quizData.quizCategories.map((category) => {
                      const Icon = iconMap[category.icon] || Users;
                      const categoryQuizzes = quizData.quizzes.filter((q) => q.categoryId === category.id);
                      const catStats = getCategoryStats(category.id);
                      
                      return (
                        <div key={category.id} className="space-y-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h2 className="font-semibold text-sm sm:text-base">{category.name}</h2>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">{category.description}</p>
                            </div>
                            {catStats && (
                              <Badge variant="outline" className="text-xs shrink-0 hidden sm:inline-flex">
                                Best: {catStats.bestScore}%
                              </Badge>
                            )}
                          </div>
                          
                          {/* Quiz cards - responsive grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                            {categoryQuizzes.map((quiz) => {
                              const best = getBestResult(quiz.id);
                              return (
                                <Card 
                                  key={quiz.id} 
                                  className="hover:border-primary/50 transition-colors cursor-pointer active:scale-[0.98] touch-manipulation" 
                                  onClick={() => startQuiz(quiz as Quiz)}
                                >
                                  <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                                      <h3 className="font-medium text-sm sm:text-base leading-tight">{quiz.title}</h3>
                                      <Badge className={`${getDifficultyColor(quiz.difficulty)} text-[10px] sm:text-xs shrink-0`}>
                                        {quiz.difficulty}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                                      <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" />
                                        {quiz.questions.length}q
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {Math.floor(quiz.timeLimit / 60)}m
                                      </span>
                                    </div>
                                    {best ? (
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs text-muted-foreground">Best: {best.percentage}%</span>
                                        <Progress value={best.percentage} className="w-16 sm:w-24 h-2" />
                                      </div>
                                    ) : (
                                      <Button size="sm" className="w-full h-8 text-xs sm:text-sm">
                                        <Play className="w-3 h-3 mr-1" />
                                        Start
                                      </Button>
                                    )}
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Flashcards Tab - Grouped by category */}
                <TabsContent value="flashcards">
                  {/* Category filter pills */}
                  <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                    <Button
                      variant={flashcardFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      className="shrink-0 text-xs sm:text-sm h-8"
                      onClick={() => setFlashcardFilter('all')}
                    >
                      All ({quizData.flashcardSets.length})
                    </Button>
                    {Object.keys(flashcardGroups).map((cat) => {
                      const CatIcon = categoryIcons[cat] || Globe;
                      return (
                        <Button
                          key={cat}
                          variant={flashcardFilter === cat ? 'default' : 'outline'}
                          size="sm"
                          className="shrink-0 text-xs sm:text-sm h-8 gap-1"
                          onClick={() => setFlashcardFilter(cat)}
                        >
                          <CatIcon className="w-3 h-3" />
                          {categoryLabels[cat] || cat} ({flashcardGroups[cat].length})
                        </Button>
                      );
                    })}
                  </div>

                  {/* Flashcard sets grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filteredFlashcardSets.map((set) => {
                      const cat = (set as any).category || 'other';
                      const region = (set as any).region || '';
                      const CatIcon = categoryIcons[cat] || Shuffle;
                      const color = categoryColors[cat] || 'from-gray-500 to-gray-600';
                      
                      return (
                        <Card 
                          key={set.id} 
                          className="hover:border-primary/50 transition-all cursor-pointer group active:scale-[0.98] touch-manipulation overflow-hidden"
                          onClick={() => startFlashcards(set.id)}
                        >
                          {/* Color accent bar */}
                          <div className={`h-1.5 bg-gradient-to-r ${color}`} />
                          <CardHeader className="pb-1 pt-3 px-3 sm:px-4">
                            <div className="flex items-start gap-2">
                              <div className={`p-1.5 rounded-md bg-gradient-to-br ${color} shrink-0`}>
                                <CatIcon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="min-w-0">
                                <CardTitle className="text-sm sm:text-base leading-tight">{set.title}</CardTitle>
                                {region && (
                                  <Badge variant="secondary" className="text-[10px] mt-1">{region}</Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="px-3 sm:px-4 pb-3">
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{set.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground font-medium">{set.cards.length} cards</span>
                              <Button size="sm" className="h-7 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground">
                                <Play className="w-3 h-3" />
                                Practice
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements">
                  <div className="space-y-6">
                    {/* Daily Achievements */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        Daily Challenge
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {dailyAchievements.map((achievement) => {
                          const Icon = iconMap[achievement.icon] || Award;
                          const isUnlocked = dailyUnlockedAchievements.includes(achievement.id);
                          
                          return (
                            <Card key={achievement.id} className={`${isUnlocked ? 'border-orange-500/50 bg-orange-500/5' : 'opacity-60'}`}>
                              <CardContent className="p-3 sm:pt-4 text-center">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{achievement.name}</h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                                {isUnlocked && (
                                  <Badge className="mt-1.5 sm:mt-2 bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px]">
                                    <Check className="w-2.5 h-2.5 mr-0.5" />
                                    Done
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quiz Achievements */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        Quiz Achievements
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {quizData.achievements.map((achievement) => {
                          const Icon = iconMap[achievement.icon] || Award;
                          const isUnlocked = stats.achievements.includes(achievement.id);
                          
                          return (
                            <Card key={achievement.id} className={isUnlocked ? 'border-primary/50 bg-primary/5' : 'opacity-60'}>
                              <CardContent className="p-3 sm:pt-4 text-center">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{achievement.name}</h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                                {isUnlocked && (
                                  <Badge className="mt-1.5 sm:mt-2 bg-green-500/20 text-green-600 dark:text-green-400 text-[10px]">
                                    <Check className="w-2.5 h-2.5 mr-0.5" />
                                    Done
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Quiz Mode */}
          {gameMode === 'quiz' && selectedQuiz && selectedQuiz.questions.length > 0 && (
            <div className="max-w-2xl mx-auto px-1">
              {/* Quiz Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Button variant="ghost" size="sm" onClick={() => setGameMode('menu')} className="text-xs sm:text-sm">
                  <ChevronLeft className="w-4 h-4 mr-0.5 sm:mr-1" />
                  Exit
                </Button>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="text-xs sm:text-base">
                    {currentQuestion + 1}/{selectedQuiz.questions.length}
                  </Badge>
                  <Badge variant={timeRemaining < 30 ? 'destructive' : 'secondary'} className="text-xs sm:text-base">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {formatTime(timeRemaining)}
                  </Badge>
                </div>
              </div>

              <Progress value={((currentQuestion + 1) / selectedQuiz.questions.length) * 100} className="mb-4 sm:mb-6" />

              {/* Question Card */}
              <Card className="mb-4 sm:mb-6">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-xl leading-snug">
                    {selectedQuiz.questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  {selectedQuiz.questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === selectedQuiz.questions[currentQuestion].correctAnswer;
                    const showResult = showExplanation;
                    
                    let buttonClass = 'w-full justify-start text-left h-auto py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm';
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += ' bg-green-500/20 border-green-500 text-green-700 dark:text-green-400';
                      } else if (isSelected && !isCorrect) {
                        buttonClass += ' bg-red-500/20 border-red-500 text-red-700 dark:text-red-400';
                      }
                    } else if (isSelected) {
                      buttonClass += ' border-primary';
                    }
                    
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={buttonClass}
                        onClick={() => handleAnswer(index)}
                        disabled={showExplanation}
                      >
                        <span className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted flex items-center justify-center text-[10px] sm:text-sm shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && <Check className="w-4 h-4 ml-auto text-green-500 shrink-0" />}
                        {showResult && isSelected && !isCorrect && <X className="w-4 h-4 ml-auto text-red-500 shrink-0" />}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {showExplanation && (
                <Card className="mb-4 sm:mb-6 border-primary/50 bg-primary/5">
                  <CardContent className="pt-3 sm:pt-4 pb-3">
                    <p className="text-xs sm:text-sm">{selectedQuiz.questions[currentQuestion].explanation}</p>
                  </CardContent>
                </Card>
              )}

              {showExplanation && (
                <Button className="w-full" size="lg" onClick={nextQuestion}>
                  {currentQuestion < selectedQuiz.questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      See Results
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Results Mode */}
          {gameMode === 'results' && selectedQuiz && (
            <div className="max-w-lg mx-auto text-center px-1">
              <Card className="mb-4 sm:mb-6">
                <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Quiz Complete!</h2>
                  <p className="text-sm text-muted-foreground mb-4 sm:mb-6">{selectedQuiz.title}</p>
                  
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                    {answers.filter((a) => a.isCorrect).length}/{selectedQuiz.questions.length}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
                    {Math.round((answers.filter((a) => a.isCorrect).length / selectedQuiz.questions.length) * 100)}% Correct
                  </p>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold text-green-500">
                        {answers.filter((a) => a.isCorrect).length}
                      </p>
                      <p className="text-xs text-muted-foreground">Correct</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold text-red-500">
                        {answers.filter((a) => !a.isCorrect).length}
                      </p>
                      <p className="text-xs text-muted-foreground">Wrong</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold">
                        {formatTime(Math.round((Date.now() - quizStartTime) / 1000))}
                      </p>
                      <p className="text-xs text-muted-foreground">Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 sm:gap-3">
                <Button variant="outline" className="flex-1 text-xs sm:text-sm" onClick={() => setGameMode('menu')}>
                  Back to Menu
                </Button>
                <Button className="flex-1 text-xs sm:text-sm" onClick={() => startQuiz(selectedQuiz)}>
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Flashcards Mode - Improved mobile layout */}
          {gameMode === 'flashcards' && currentFlashcardSet && shuffledCards.length > 0 && (
            <div className="max-w-lg mx-auto px-1">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Button variant="ghost" size="sm" onClick={() => setGameMode('menu')} className="text-xs sm:text-sm">
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  Back
                </Button>
                <div className="text-center">
                  <p className="font-semibold text-xs sm:text-sm">{currentFlashcardSet.title}</p>
                  {(currentFlashcardSet as any).region && (
                    <Badge variant="secondary" className="text-[10px]">{(currentFlashcardSet as any).region}</Badge>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {currentCard + 1}/{shuffledCards.length}
                </Badge>
              </div>

              <Progress value={((currentCard + 1) / shuffledCards.length) * 100} className="mb-4 sm:mb-6" />

              {/* Flashcard - tap to flip */}
              <div
                className="relative min-h-[200px] sm:min-h-[240px] cursor-pointer select-none"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <Card className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${isFlipped ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}`}>
                  <CardContent className="text-center w-full">
                    <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Question</div>
                    <p className="text-base sm:text-lg font-medium leading-relaxed">{shuffledCards[currentCard].front}</p>
                    <p className="text-xs text-muted-foreground mt-4 animate-pulse">Tap to reveal →</p>
                  </CardContent>
                </Card>
                <Card className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 bg-primary/5 border-primary/30 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none scale-95'}`}>
                  <CardContent className="text-center w-full">
                    <div className="text-xs text-primary mb-3 uppercase tracking-wider">Answer</div>
                    <p className="text-base sm:text-lg font-medium text-primary leading-relaxed">{shuffledCards[currentCard].back}</p>
                    <Badge className="mt-4" variant="secondary">{shuffledCards[currentCard].tribe}</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <Button
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm"
                  disabled={currentCard === 0}
                  onClick={(e) => { e.stopPropagation(); setCurrentCard(currentCard - 1); setIsFlipped(false); }}
                >
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  Prev
                </Button>
                <Button
                  className="flex-1 text-xs sm:text-sm"
                  disabled={currentCard === shuffledCards.length - 1}
                  onClick={(e) => { e.stopPropagation(); setCurrentCard(currentCard + 1); setIsFlipped(false); }}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </div>

              {currentCard === shuffledCards.length - 1 && (
                <Button variant="outline" className="w-full mt-3 text-xs sm:text-sm" onClick={() => startFlashcards(selectedFlashcardSet!)}>
                  <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Shuffle & Restart
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
