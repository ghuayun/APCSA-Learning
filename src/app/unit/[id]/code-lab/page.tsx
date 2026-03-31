"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Lightbulb,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Terminal,
} from "lucide-react";

import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { getUnitExercises } from "@/content/units";

interface Exercise {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  solution?: string;
}

const difficultyColor: Record<string, string> = {
  easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

function simulateRun(code: string): { stdout: string; stderr: string } {
  if (!code.trim()) {
    return { stdout: "", stderr: "Error: No code to run." };
  }
  if (!code.includes("public static void main")) {
    return {
      stdout: "",
      stderr:
        "Compilation Error: Missing main method.\nExpected: public static void main(String[] args)",
    };
  }
  return {
    stdout:
      "Code submitted! ⏳ (Judge0 integration coming soon)\n\nYour code compiled successfully.\nConnect Judge0 API to see real output.",
    stderr: "",
  };
}

export default function CodeLabPage() {
  const params = useParams();
  const unitId = Number(params.id);
  const exercises: Exercise[] = getUnitExercises(unitId) as Exercise[];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [code, setCode] = useState(exercises[0]?.starterCode ?? "");
  const [output, setOutput] = useState<{
    stdout: string;
    stderr: string;
  } | null>(null);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const exercise = exercises[selectedIdx];

  const selectExercise = useCallback((idx: number) => {
    setSelectedIdx(idx);
    setCode(exercises[idx].starterCode);
    setOutput(null);
    setHintsRevealed(0);
    setSubmitted(false);
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setSubmitted(false);
    setTimeout(() => {
      setOutput(simulateRun(code));
      setIsRunning(false);
    }, 800);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(exercise.starterCode);
    setOutput(null);
    setHintsRevealed(0);
    setSubmitted(false);
  }, [exercise]);

  const handleHint = useCallback(() => {
    if (hintsRevealed < exercise.hints.length) {
      setHintsRevealed((h) => h + 1);
    }
  }, [hintsRevealed, exercise.hints.length]);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setSubmitted(false);
    setTimeout(() => {
      setOutput(simulateRun(code));
      setIsRunning(false);
      setSubmitted(true);
    }, 1000);
  }, [code]);

  if (!exercise) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No exercises found for this unit.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Sidebar — exercise list */}
      <aside className="w-full shrink-0 lg:w-56">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Exercises
        </p>
        <nav className="flex flex-row gap-1.5 overflow-x-auto lg:flex-col lg:overflow-x-visible">
          {exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => selectExercise(idx)}
              className={cn(
                "flex w-full min-w-[150px] items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors lg:min-w-0",
                idx === selectedIdx
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <ChevronRight
                className={cn(
                  "hidden size-3.5 shrink-0 lg:block",
                  idx === selectedIdx ? "text-blue-400" : "text-transparent"
                )}
              />
              <span className="truncate">{ex.title}</span>
              <span
                className={cn(
                  "ml-auto shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium capitalize",
                  difficultyColor[ex.difficulty]
                )}
              >
                {ex.difficulty}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {/* Exercise description */}
        <div className="rounded-lg border border-white/10 bg-card p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">{exercise.title}</h2>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                difficultyColor[exercise.difficulty]
              )}
            >
              {exercise.difficulty}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {exercise.description}
          </p>
        </div>

        {/* Code Editor */}
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 bg-secondary/30 px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              Main.java
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Button
                variant="ghost"
                size="xs"
                onClick={handleReset}
                className="text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleHint}
                className="text-amber-400"
                disabled={hintsRevealed >= exercise.hints.length}
              >
                <Lightbulb className="size-3.5" />
                Hint{" "}
                {hintsRevealed > 0 && (
                  <span className="text-[10px]">
                    ({hintsRevealed}/{exercise.hints.length})
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleRun}
                disabled={isRunning}
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Play className="size-3.5" />
                {isRunning ? "Running…" : "Run"}
              </Button>
              <Button
                size="xs"
                onClick={handleSubmit}
                disabled={isRunning}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <CheckCircle2 className="size-3.5" />
                Submit
              </Button>
            </div>
          </div>
          <CodeEditor
            value={code}
            onChange={(v) => setCode(v)}
            height="320px"
          />
        </div>

        {/* Hints */}
        <AnimatePresence>
          {hintsRevealed > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
                  Hints
                </p>
                {exercise.hints.slice(0, hintsRevealed).map((hint, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      size="sm"
                      className="bg-amber-500/5 ring-amber-500/20"
                    >
                      <CardContent>
                        <p className="font-mono text-xs leading-relaxed text-amber-200 whitespace-pre-wrap">
                          💡 Hint {i + 1}: {hint}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output panel */}
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1117] px-4 py-2">
            <Terminal className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Output
            </span>
            {submitted && output && !output.stderr && (
              <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Submitted ✓
              </span>
            )}
          </div>
          <div className="min-h-[80px] bg-[#0d1117] p-4 font-mono text-sm">
            {isRunning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="size-2 animate-pulse rounded-full bg-blue-400" />
                Compiling and running…
              </motion.div>
            ) : output ? (
              <div>
                {output.stderr ? (
                  <pre className="whitespace-pre-wrap text-red-400">
                    {output.stderr}
                  </pre>
                ) : (
                  <pre className="whitespace-pre-wrap text-emerald-400">
                    {output.stdout}
                  </pre>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Click &quot;Run&quot; or &quot;Submit&quot; to see output…
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
