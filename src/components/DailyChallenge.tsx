import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, Flame, Trophy, Star, Clock, Target, 
  ChevronRight, Check, X, Zap, Gift
} from 'lucide-react';
import { useDailyChallenge, DailyChallengeResult } from '@/hooks/useDailyChallenge';
import quizData from '@/data/quizzes.json';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface DailyChallengeProps {
  onComplete?: () => void;
}

export function DailyChallenge({ onComplete }: DailyChallengeProps) {
  const { 
    dailyStats, 
    hasCompletedToday, 
    getTodayResult,
    addDailyResult,
    getStreakBonus
  } = useDailyChallenge();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correctAnswer: number; isCorrect: boolean }[]>([]);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [startTime, setStartTime] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  // Generate daily questions based on today's date
  const dailyQuestions = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Gather all questions from all quizzes
    const allQuestions: Question[] = quizData.quizzes.flatMap(quiz => 
      quiz.questions.map(q => ({ ...q, categoryId: quiz.categoryId }))
    );
    
    // Seeded shuffle
    const shuffled = [...allQuestions];
    let seedState = seed;
    for (let i = shuffled.length - 1; i > 0; i--) {
      seedState = (seedState * 1103515245 + 12345) & 0x7fffffff;
      const j = seedState % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return 5 questions for daily challenge
    return shuffled.slice(0, 5);
  }, []);

  const todayResult = getTodayResult();

  const selectedAnswerRef = useRef(selectedAnswer);
  selectedAnswerRef.current = selectedAnswer;
  const handleAnswerRef = useRef<(answerIndex: number) => void>(() => {});

  const handleTimeUp = useCallback(() => {
    if (selectedAnswerRef.current === null) {
      handleAnswerRef.current(-1);
    }
  }, []);

  const startChallenge = () => {
    setIsPlaying(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    answersRef.current = [];
    setTimeRemaining(90);
    setStartTime(Date.now());
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return; // Prevent double-click / rapid clicks
    
    const currentQ = dailyQuestions[currentQuestion];
    if (!currentQ) return; // Guard against missing question
    
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setAnswers((prev) => {
      const next = [
        ...prev,
        {
          questionId: currentQ.id || `q-${currentQuestion}`,
          selectedAnswer: answerIndex,
          correctAnswer: currentQ.correctAnswer,
          isCorrect,
        },
      ];
      answersRef.current = next;
      return next;
    });
  };
  handleAnswerRef.current = handleAnswer;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && timeRemaining > 0 && !showExplanation && !showResults) {
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
  }, [isPlaying, timeRemaining, showExplanation, showResults, handleTimeUp]);

  const nextQuestion = () => {
    if (currentQuestion < dailyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const finalAnswers = answersRef.current;
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      const score = finalAnswers.filter((a) => a.isCorrect).length;
      
      const result: DailyChallengeResult = {
        date: new Date().toISOString().split('T')[0],
        score,
        totalQuestions: dailyQuestions.length,
        percentage: Math.round((score / dailyQuestions.length) * 100),
        timeTaken,
        completedAt: new Date().toISOString(),
      };
      
      addDailyResult(result);
      setShowResults(true);
      onComplete?.();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const streakBonus = getStreakBonus();

  // Show completed state
  if (hasCompletedToday() && !isPlaying && !showResults) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <CardTitle className="text-xl">Daily Challenge Complete!</CardTitle>
          <CardDescription>Come back tomorrow for a new challenge</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {todayResult && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold text-primary">{todayResult.score}/{todayResult.totalQuestions}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">{dailyStats.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatTime(todayResult.timeTaken)}</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            </div>
          )}
          
          {dailyStats.currentStreak > 0 && (
            <div className="flex items-center justify-center gap-2 text-orange-500">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">{dailyStats.currentStreak} Day Streak!</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show results
  if (showResults && todayResult) {
    return (
      <Card className="border-primary/30">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
          
          <div className="text-5xl font-bold text-primary mb-2">
            {todayResult.score}/{todayResult.totalQuestions}
          </div>
          <p className="text-muted-foreground mb-4">{todayResult.percentage}% Correct</p>

          {streakBonus > 0 && (
            <Badge className="mb-4 bg-orange-500/20 text-orange-400">
              <Gift className="w-3 h-3 mr-1" />
              +{streakBonus}% Streak Bonus!
            </Badge>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 rounded-lg bg-muted/50">
              <Flame className="w-6 h-6 mx-auto mb-1 text-orange-500" />
              <p className="text-xl font-bold">{dailyStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <Star className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
              <p className="text-xl font-bold">{dailyStats.longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
          </div>

          {dailyStats.currentStreak >= 7 && (
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
              <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
              <p className="font-semibold text-yellow-400">Weekly Warrior!</p>
              <p className="text-xs text-muted-foreground">7+ day streak achieved</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show start screen
  if (!isPlaying) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle className="text-xl">Daily Challenge</CardTitle>
          </div>
          <CardDescription>
            5 random questions • 90 seconds • Build your streak!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-muted/50">
              <Flame className="w-5 h-5 mx-auto mb-1 text-orange-500" />
              <p className="text-lg font-bold">{dailyStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-lg font-bold">{dailyStats.longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <Target className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <p className="text-lg font-bold">{dailyStats.totalDaysPlayed}</p>
              <p className="text-xs text-muted-foreground">Days</p>
            </div>
          </div>

          {dailyStats.currentStreak > 0 && (
            <div className="mb-4 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm text-orange-400">
                <Flame className="w-4 h-4 inline mr-1" />
                {dailyStats.currentStreak} day streak! Don't break it!
              </p>
            </div>
          )}

          <Button size="lg" className="w-full" onClick={startChallenge}>
            <Zap className="w-4 h-4 mr-2" />
            Start Daily Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing state - guard against out-of-bounds
  const currentQ = dailyQuestions[currentQuestion];
  if (!currentQ || !currentQ.options || !Array.isArray(currentQ.options)) {
    return (
      <Card className="border-destructive/30">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Unable to load question. Please try again.</p>
          <Button className="mt-4" onClick={() => { setIsPlaying(false); setShowResults(false); }}>
            Back to Start
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-base">
          <Calendar className="w-4 h-4 mr-1" />
          Question {currentQuestion + 1}/{dailyQuestions.length}
        </Badge>
        <Badge variant={timeRemaining < 20 ? 'destructive' : 'secondary'} className="text-base">
          <Clock className="w-4 h-4 mr-1" />
          {formatTime(timeRemaining)}
        </Badge>
      </div>

      <Progress value={((currentQuestion + 1) / dailyQuestions.length) * 100} />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQ.correctAnswer;
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
                <span className="mr-3 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left">{option}</span>
                {showResult && isCorrect && <Check className="w-4 h-4 ml-auto shrink-0 text-green-500" />}
                {showResult && isSelected && !isCorrect && <X className="w-4 h-4 ml-auto shrink-0 text-red-500" />}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-4">
            <p className="text-sm">{currentQ.explanation}</p>
          </CardContent>
        </Card>
      )}

      {/* Next Button */}
      {showExplanation && (
        <Button className="w-full" size="lg" onClick={nextQuestion}>
          {currentQuestion < dailyQuestions.length - 1 ? (
            <>
              Next Question
              <ChevronRight className="w-4 h-4 ml-2" />
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
  );
}
