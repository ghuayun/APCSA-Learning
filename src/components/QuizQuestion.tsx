"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/CodeBlock";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  showResult: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

function renderQuestion(text: string): React.ReactNode[] {
  const parts = text.split(/(```java[\s\S]*?```)/);
  return parts.map((part, i) => {
    const codeMatch = part.match(/^```java\n([\s\S]*?)```$/);
    if (codeMatch) {
      return (
        <CodeBlock
          key={i}
          code={codeMatch[1].trimEnd()}
          language="java"
          showLineNumbers={false}
        />
      );
    }
    // Inline code
    const inlineParts = part.split(/(`[^`]+`)/);
    return (
      <span key={i}>
        {inlineParts.map((seg, j) => {
          if (seg.startsWith("`") && seg.endsWith("`")) {
            return (
              <code
                key={j}
                className="px-1.5 py-0.5 rounded bg-zinc-800 text-[#CE9178] font-mono text-sm"
              >
                {seg.slice(1, -1)}
              </code>
            );
          }
          return seg;
        })}
      </span>
    );
  });
}

export function QuizQuestion({
  question,
  options,
  correct,
  explanation,
  onAnswer,
  showResult,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    onAnswer(idx, idx === correct);
  };

  const isCorrect = selected === correct;

  return (
    <div className="space-y-6">
      {/* Question text */}
      <div className="text-lg leading-relaxed text-foreground">
        {renderQuestion(question)}
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((option, idx) => {
          let variant: "default" | "correct" | "wrong" | "missed" = "default";
          if (showResult) {
            if (idx === correct) variant = "correct";
            else if (idx === selected && idx !== correct) variant = "wrong";
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.01 } : undefined}
              whileTap={!showResult ? { scale: 0.99 } : undefined}
              className={cn(
                "flex items-start gap-3 w-full rounded-lg border p-4 text-left transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                variant === "default" &&
                  "border-border bg-card hover:bg-accent hover:border-zinc-600",
                variant === "correct" &&
                  "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
                variant === "wrong" &&
                  "border-red-500/50 bg-red-500/10 text-red-300",
                selected === idx &&
                  !showResult &&
                  "border-blue-500/50 bg-blue-500/10",
                showResult && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center shrink-0 size-7 rounded-md text-sm font-semibold",
                  variant === "default" && "bg-muted text-muted-foreground",
                  variant === "correct" && "bg-emerald-500/20 text-emerald-300",
                  variant === "wrong" && "bg-red-500/20 text-red-300"
                )}
              >
                {LETTERS[idx]}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed">
                {renderQuestion(option)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "rounded-lg border p-4",
                isCorrect
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/30 bg-red-500/5"
              )}
            >
              <p className="font-semibold mb-1">
                {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
