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
  ChevronLeft, ChevronRight, Shuffle, Brain, Music, Calendar
} from 'lucide-react';
import { useQuizResults, QuizResult } from '@/hooks/useQuizResults';
import { useDailyChallenge, dailyAchievements } from '@/hooks/useDailyChallenge';
import { DailyChallenge } from '@/components/DailyChallenge';
import quizData from '@/data/quizzes.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Sparkles, ChefHat, MapPin, Languages, Moon, Trophy, Star, 
  BookOpen, Flame, Zap, Timer, Award, Music, Calendar, Target, RotateCcw
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
  
  const { stats, addResult, getBestResult, getCategoryStats } = useQuizResults();
  const { dailyStats, unlockedAchievements: dailyUnlockedAchievements } = useDailyChallenge();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
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
      const currentQ = selectedQuiz.questions[currentQuestion];
      handleAnswer(-1); // Mark as wrong
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
      // Quiz complete
      const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
      const score = answers.filter((a) => a.isCorrect).length + (selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer ? 1 : 0);
      const finalAnswers = [...answers];
      if (selectedAnswer !== null) {
        const currentQ = selectedQuiz.questions[currentQuestion];
        finalAnswers.push({
          questionId: currentQ.id,
          selectedAnswer,
          correctAnswer: currentQ.correctAnswer,
          isCorrect: selectedAnswer === currentQ.correctAnswer,
        });
      }
      
      const result: QuizResult = {
        quizId: selectedQuiz.id,
        quizTitle: selectedQuiz.title,
        categoryId: selectedQuiz.categoryId,
        score: finalAnswers.filter((a) => a.isCorrect).length,
        totalQuestions: selectedQuiz.questions.length,
        percentage: Math.round((finalAnswers.filter((a) => a.isCorrect).length / selectedQuiz.questions.length) * 100),
        timeTaken,
        completedAt: new Date().toISOString(),
        answers: finalAnswers,
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <Helmet>
        <title>African Culture Quiz & Learning Games | TribeGuess</title>
        <meta name="description" content="Test your knowledge of African tribes, cultures, foods, and traditions with interactive quizzes, flashcards, and learning games. Track your progress!" />
        <meta name="keywords" content="African quiz, tribe quiz, African culture games, learn African traditions, flashcards" />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Menu Mode */}
          {gameMode === 'menu' && (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                  <Brain className="inline w-8 h-8 mr-2 text-primary" />
                  African Culture Quiz
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Test your knowledge, earn achievements, and learn about African tribes, traditions, and cuisines through interactive games.
                </p>
              </div>

              {/* Daily Challenge Section */}
              <div className="mb-8">
                <div className="max-w-md mx-auto">
                  <DailyChallenge />
                </div>
              </div>

              {/* Stats Overview */}
              {stats.totalQuizzesTaken > 0 && (
                <div className="grid sm:grid-cols-4 gap-4 mb-8">
                  <Card className="text-center">
                    <CardContent className="pt-4 pb-3">
                      <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                      <p className="text-2xl font-bold">{stats.totalQuizzesTaken}</p>
                      <p className="text-xs text-muted-foreground">Quizzes Taken</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-4 pb-3">
                      <Target className="w-6 h-6 mx-auto mb-1 text-green-500" />
                      <p className="text-2xl font-bold">{stats.averageScore}%</p>
                      <p className="text-xs text-muted-foreground">Average Score</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-4 pb-3">
                      <Flame className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                      <p className="text-2xl font-bold">{dailyStats.currentStreak}</p>
                      <p className="text-xs text-muted-foreground">Daily Streak</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-4 pb-3">
                      <Star className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                      <p className="text-2xl font-bold">{stats.achievements.length + dailyUnlockedAchievements.length}</p>
                      <p className="text-xs text-muted-foreground">Achievements</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Tabs defaultValue="quizzes" className="space-y-6">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                {/* Quizzes Tab */}
                <TabsContent value="quizzes">
                  <div className="space-y-6">
                    {quizData.quizCategories.map((category) => {
                      const Icon = iconMap[category.icon] || Users;
                      const categoryQuizzes = quizData.quizzes.filter((q) => q.categoryId === category.id);
                      const catStats = getCategoryStats(category.id);
                      
                      return (
                        <div key={category.id} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h2 className="font-semibold">{category.name}</h2>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                            {catStats && (
                              <Badge variant="outline" className="ml-auto">
                                Best: {catStats.bestScore}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categoryQuizzes.map((quiz) => {
                              const best = getBestResult(quiz.id);
                              return (
                                <Card key={quiz.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => startQuiz(quiz as Quiz)}>
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="font-medium">{quiz.title}</h3>
                                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                                        {quiz.difficulty}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                      <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" />
                                        {quiz.questions.length} questions
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {Math.floor(quiz.timeLimit / 60)}:{(quiz.timeLimit % 60).toString().padStart(2, '0')}
                                      </span>
                                    </div>
                                    {best ? (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Best: {best.percentage}%</span>
                                        <Progress value={best.percentage} className="w-24 h-2" />
                                      </div>
                                    ) : (
                                      <Button size="sm" className="w-full">
                                        <Play className="w-3 h-3 mr-1" />
                                        Start Quiz
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

                {/* Flashcards Tab */}
                <TabsContent value="flashcards">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizData.flashcardSets.map((set) => (
                      <Card key={set.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => startFlashcards(set.id)}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shuffle className="w-4 h-4 text-primary" />
                            {set.title}
                          </CardTitle>
                          <CardDescription>{set.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{set.cards.length} cards</span>
                            <Button size="sm">
                              <Play className="w-3 h-3 mr-1" />
                              Practice
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements">
                  <div className="space-y-6">
                    {/* Daily Achievements Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Daily Challenge Achievements
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dailyAchievements.map((achievement) => {
                          const Icon = iconMap[achievement.icon] || Award;
                          const isUnlocked = dailyUnlockedAchievements.includes(achievement.id);
                          
                          return (
                            <Card key={achievement.id} className={isUnlocked ? 'border-orange-500/50 bg-orange-500/5' : 'opacity-60'}>
                              <CardContent className="pt-4 text-center">
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                {isUnlocked && (
                                  <Badge className="mt-2 bg-orange-500/20 text-orange-400">
                                    <Check className="w-3 h-3 mr-1" />
                                    Unlocked
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quiz Achievements Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        Quiz Achievements
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quizData.achievements.map((achievement) => {
                          const Icon = iconMap[achievement.icon] || Award;
                          const isUnlocked = stats.achievements.includes(achievement.id);
                          
                          return (
                            <Card key={achievement.id} className={isUnlocked ? 'border-primary/50 bg-primary/5' : 'opacity-60'}>
                              <CardContent className="pt-4 text-center">
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                {isUnlocked && (
                                  <Badge className="mt-2 bg-green-500/20 text-green-400">
                                    <Check className="w-3 h-3 mr-1" />
                                    Unlocked
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
          {gameMode === 'quiz' && selectedQuiz && (
            <div className="max-w-2xl mx-auto">
              {/* Quiz Header */}
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={() => setGameMode('menu')}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Exit Quiz
                </Button>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-base">
                    {currentQuestion + 1}/{selectedQuiz.questions.length}
                  </Badge>
                  <Badge variant={timeRemaining < 30 ? 'destructive' : 'secondary'} className="text-base">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeRemaining)}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={((currentQuestion + 1) / selectedQuiz.questions.length) * 100} className="mb-6" />

              {/* Question Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {selectedQuiz.questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedQuiz.questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === selectedQuiz.questions[currentQuestion].correctAnswer;
                    const showResult = showExplanation;
                    
                    let buttonClass = 'w-full justify-start text-left h-auto py-3 px-4';
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += ' bg-green-500/20 border-green-500 text-green-400';
                      } else if (isSelected && !isCorrect) {
                        buttonClass += ' bg-red-500/20 border-red-500 text-red-400';
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
                        <span className="mr-3 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                        {showResult && isCorrect && <Check className="w-4 h-4 ml-auto text-green-500" />}
                        {showResult && isSelected && !isCorrect && <X className="w-4 h-4 ml-auto text-red-500" />}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Explanation */}
              {showExplanation && (
                <Card className="mb-6 border-primary/50 bg-primary/5">
                  <CardContent className="pt-4">
                    <p className="text-sm">{selectedQuiz.questions[currentQuestion].explanation}</p>
                  </CardContent>
                </Card>
              )}

              {/* Next Button */}
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
            <div className="max-w-lg mx-auto text-center">
              <Card className="mb-6">
                <CardContent className="pt-8 pb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                  <p className="text-muted-foreground mb-6">{selectedQuiz.title}</p>
                  
                  <div className="text-5xl font-bold text-primary mb-2">
                    {answers.filter((a) => a.isCorrect).length}/{selectedQuiz.questions.length}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {Math.round((answers.filter((a) => a.isCorrect).length / selectedQuiz.questions.length) * 100)}% Correct
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-2xl font-semibold text-green-500">
                        {answers.filter((a) => a.isCorrect).length}
                      </p>
                      <p className="text-muted-foreground">Correct</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-red-500">
                        {answers.filter((a) => !a.isCorrect).length}
                      </p>
                      <p className="text-muted-foreground">Wrong</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">
                        {formatTime(Math.round((Date.now() - quizStartTime) / 1000))}
                      </p>
                      <p className="text-muted-foreground">Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setGameMode('menu')}>
                  Back to Menu
                </Button>
                <Button className="flex-1" onClick={() => startQuiz(selectedQuiz)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Flashcards Mode */}
          {gameMode === 'flashcards' && currentFlashcardSet && shuffledCards.length > 0 && (
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={() => setGameMode('menu')}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Exit
                </Button>
                <Badge variant="outline">
                  {currentCard + 1}/{shuffledCards.length}
                </Badge>
              </div>

              <Progress value={((currentCard + 1) / shuffledCards.length) * 100} className="mb-6" />

              {/* Flashcard */}
              <div
                className="relative h-64 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <Card className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}>
                  <CardContent className="text-center">
                    <p className="text-lg font-medium">{shuffledCards[currentCard].front}</p>
                    <p className="text-sm text-muted-foreground mt-4">Tap to reveal answer</p>
                  </CardContent>
                </Card>
                <Card className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 bg-primary/10 ${isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'}`}>
                  <CardContent className="text-center">
                    <p className="text-lg font-medium text-primary">{shuffledCards[currentCard].back}</p>
                    <Badge className="mt-4">{shuffledCards[currentCard].tribe}</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={currentCard === 0}
                  onClick={() => { setCurrentCard(currentCard - 1); setIsFlipped(false); }}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  className="flex-1"
                  disabled={currentCard === shuffledCards.length - 1}
                  onClick={() => { setCurrentCard(currentCard + 1); setIsFlipped(false); }}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {currentCard === shuffledCards.length - 1 && (
                <Button variant="outline" className="w-full mt-3" onClick={() => startFlashcards(selectedFlashcardSet!)}>
                  <Shuffle className="w-4 h-4 mr-2" />
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
