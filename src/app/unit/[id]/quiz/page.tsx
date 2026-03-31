"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import quizData from "@/content/units/unit-1-quiz.json";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function QuizPage() {
  const questions: Question[] = quizData as Question[];
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, { selected: number; correct: boolean }>
  >({});
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const progress = (answeredCount / total) * 100;

  const handleAnswer = useCallback(
    (selectedIndex: number, isCorrect: boolean) => {
      setAnswers((prev) => ({
        ...prev,
        [current]: { selected: selectedIndex, correct: isCorrect },
      }));
    },
    [current]
  );

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const goNext = () => {
    if (current < total - 1) goTo(current + 1);
  };
  const goPrev = () => {
    if (current > 0) goTo(current - 1);
  };

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsed(Date.now() - startTime);
    setFinished(true);
  };

  const handleRestart = () => {
    setCurrent(0);
    setDirection(0);
    setAnswers({});
    setFinished(false);
    window.location.reload();
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const q = questions[current];

  if (finished) {
    const accuracy =
      total > 0 ? Math.round((correctCount / total) * 100) : 0;
    let grade = "Keep Practicing!";
    let gradeEmoji = "\uD83D\uDCDA";
    if (accuracy >= 90) {
      grade = "Outstanding!";
      gradeEmoji = "\uD83C\uDFC6";
    } else if (accuracy >= 70) {
      grade = "Great Job!";
      gradeEmoji = "\uD83C\uDF1F";
    } else if (accuracy >= 50) {
      grade = "Getting There!";
      gradeEmoji = "\uD83D\uDCAA";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center py-8"
      >
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 space-y-8 text-center">
          <div className="text-6xl">{gradeEmoji}</div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{grade}</h2>
            <p className="text-muted-foreground mt-1">Quiz Complete</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-muted/50 p-4 space-y-1">
              <Trophy className="size-5 mx-auto text-amber-400" />
              <p className="text-2xl font-bold text-foreground">
                {correctCount}/{total}
              </p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 space-y-1">
              <Target className="size-5 mx-auto text-blue-400" />
              <p className="text-2xl font-bold text-foreground">
                {accuracy}%
              </p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 space-y-1">
              <Clock className="size-5 mx-auto text-emerald-400" />
              <p className="text-2xl font-bold text-foreground">
                {formatTime(elapsed)}
              </p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="text-left space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Question Breakdown
            </p>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, idx) => {
                const a = answers[idx];
                return (
                  <div
                    key={idx}
                    className={`size-8 rounded-md flex items-center justify-center text-xs font-medium ${
                      a?.correct
                        ? "bg-emerald-500/15 text-emerald-400"
                        : a
                          ? "bg-red-500/15 text-red-400"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="flex-1 h-10"
            >
              <RotateCcw className="size-4 mr-2" />
              Try Again
            </Button>
            <Button render={<Link href="/unit/1/learn" />} className="flex-1 h-10">
              Review Lesson
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Question {current + 1} of {total}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                difficultyColors[q.difficulty] ?? ""
              }`}
            >
              {q.difficulty}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatTime(elapsed)}
            </span>
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <QuizQuestion
            question={q.question}
            options={q.options}
            correct={q.correct}
            explanation={q.explanation}
            difficulty={q.difficulty}
            onAnswer={handleAnswer}
            showResult={current in answers}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          onClick={goPrev}
          variant="ghost"
          disabled={current === 0}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`size-2 rounded-full transition-all cursor-pointer ${
                idx === current
                  ? "bg-blue-500 w-5"
                  : idx in answers
                    ? answers[idx].correct
                      ? "bg-emerald-500"
                      : "bg-red-500"
                    : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {answeredCount === total && current === total - 1 ? (
          <Button onClick={handleFinish} className="gap-2">
            Finish Quiz
            <Trophy className="size-4" />
          </Button>
        ) : (
          <Button
            onClick={goNext}
            variant="ghost"
            disabled={current === total - 1}
            className="gap-2"
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}