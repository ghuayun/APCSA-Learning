"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA_TYPES = [
  { type: "int", size: "32 bits", range: "-2³¹ to 2³¹ − 1", example: "int x = 42;" },
  { type: "double", size: "64 bits", range: "±1.7 × 10³⁰⁸", example: "double pi = 3.14;" },
  { type: "boolean", size: "1 bit*", range: "true / false", example: "boolean ok = true;" },
  { type: "char", size: "16 bits", range: "Unicode char", example: "char c = 'A';" },
  { type: "long", size: "64 bits", range: "-2⁶³ to 2⁶³ − 1", example: "long big = 100L;" },
  { type: "byte", size: "8 bits", range: "-128 to 127", example: "byte b = 100;" },
];

const OPERATORS = [
  { op: "+  -  *", desc: "Addition, subtraction, multiplication" },
  { op: "/", desc: "Division (integer truncates, double keeps decimal)" },
  { op: "%", desc: "Modulus — remainder after division" },
  { op: "+=  -=  *=  /=  %=", desc: "Compound assignment operators" },
  { op: "++  --", desc: "Increment / decrement by 1" },
  { op: "==  !=  <  >  <=  >=", desc: "Comparison operators (return boolean)" },
];

const CASTING_RULES = [
  {
    title: "Widening (automatic)",
    desc: "Smaller → larger type. No data loss.",
    example: "int x = 5;\ndouble d = x; // 5.0",
    safe: true,
  },
  {
    title: "Narrowing (manual cast)",
    desc: "Larger → smaller type. May lose data!",
    example: "double pi = 3.14;\nint n = (int) pi; // 3",
    safe: false,
  },
  {
    title: "int ÷ int = int",
    desc: "Integer division truncates the decimal.",
    example: "int r = 7 / 2; // 3, not 3.5",
    safe: false,
  },
  {
    title: "Cast one operand for double result",
    desc: "Cast at least one operand to double.",
    example: "double r = (double) 7 / 2; // 3.5",
    safe: true,
  },
];

const PITFALLS = [
  { mistake: "Using = instead of ==", fix: "= is assignment, == is comparison. if (x == 5) not if (x = 5)." },
  { mistake: "Integer division surprise", fix: "5 / 2 → 2 (not 2.5). Use 5.0 / 2 or cast to double." },
  { mistake: "Overflow without warning", fix: "int maxes at ~2.1 billion. Adding 1 to Integer.MAX_VALUE wraps to negative!" },
  { mistake: "Comparing doubles with ==", fix: "Floating-point math isn't exact. Use Math.abs(a - b) < 0.0001 instead." },
  { mistake: "Uninitialized local variables", fix: "Java won't compile if you use a local variable before assigning a value." },
];

interface FlipCardData {
  term: string;
  definition: string;
}

const KEY_TERMS: FlipCardData[] = [
  { term: "Variable", definition: "A named storage location in memory that holds a value." },
  { term: "Literal", definition: "A fixed value written directly in code, like 42 or 3.14." },
  { term: "Casting", definition: "Converting a value from one data type to another." },
  { term: "Truncation", definition: "Cutting off the decimal part when converting double → int." },
  { term: "Modulus (%)", definition: "Returns the remainder of integer division. 7 % 3 = 1." },
  { term: "Overflow", definition: "When a value exceeds the max of its type and wraps around." },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the value of 7 / 2 in Java?",
    options: ["3", "3.5", "4", "3.0"],
    correctIndex: 0,
    explanation: "Integer division truncates the decimal. Both operands are int, so the result is int → 3.",
  },
  {
    question: "What does (double) 5 / 2 evaluate to?",
    options: ["2", "2.0", "2.5", "3.0"],
    correctIndex: 2,
    explanation: "Casting 5 to double makes it 5.0. Then 5.0 / 2 promotes 2 to 2.0, giving 2.5.",
  },
  {
    question: "What is the result of 17 % 5?",
    options: ["3", "2", "3.4", "5"],
    correctIndex: 1,
    explanation: "17 ÷ 5 = 3 remainder 2. The modulus operator returns the remainder → 2.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FlipCard({ term, definition }: FlipCardData) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="relative h-28 w-full cursor-pointer [perspective:600px]"
    >
      <motion.div
        className="absolute inset-0 rounded-xl border border-white/10 [backface-visibility:hidden]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex h-full flex-col items-center justify-center rounded-xl bg-card p-4">
          <span className="text-sm font-bold text-foreground">{term}</span>
          <span className="mt-1 text-[10px] text-muted-foreground">click to reveal</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-xl border border-blue-500/30 bg-blue-500/10 [backface-visibility:hidden]"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped ? 360 : 180 }}
        transition={{ duration: 0.4 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex h-full items-center justify-center rounded-xl p-4">
          <span className="text-center text-sm text-blue-200">{definition}</span>
        </div>
      </motion.div>
    </button>
  );
}

function QuickQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentQ];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      if (idx === q.correctIndex) setScore((s) => s + 1);
    },
    [selected, q.correctIndex]
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <p className="text-4xl">🎉</p>
        <p className="text-lg font-semibold">
          You got {score}/{QUIZ_QUESTIONS.length} correct!
        </p>
        <Button variant="outline" size="sm" onClick={handleRestart}>
          <RotateCcw className="size-3.5" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
        </p>
        <Badge variant="outline" className="text-xs">
          Score: {score}
        </Badge>
      </div>

      <p className="font-medium">{q.question}</p>

      <div className="grid gap-2">
        {q.options.map((option, idx) => {
          const isCorrect = idx === q.correctIndex;
          const isSelected = idx === selected;
          const answered = selected !== null;

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                answered && isCorrect
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : answered && isSelected && !isCorrect
                    ? "border-red-500/50 bg-red-500/10 text-red-400"
                    : "border-white/10 hover:bg-secondary/50"
              )}
            >
              <span className="flex items-center gap-2">
                {answered && isCorrect && <CheckCircle2 className="size-4 text-emerald-400" />}
                {answered && isSelected && !isCorrect && <XCircle className="size-4 text-red-400" />}
                {option}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-muted-foreground">{q.explanation}</p>
            <Button size="sm" onClick={handleNext}>
              {currentQ + 1 < QUIZ_QUESTIONS.length ? "Next Question →" : "See Results"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  return (
    <div className="space-y-8">
      {/* Data Types */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card>
          <CardHeader>
            <CardTitle>📊 Primitive Data Types</CardTitle>
            <CardDescription>The building blocks of Java — every variable starts with a type.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Type</th>
                    <th className="pb-2 pr-4 font-medium">Size</th>
                    <th className="pb-2 pr-4 font-medium">Range</th>
                    <th className="pb-2 font-medium">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_TYPES.map((dt) => (
                    <tr key={dt.type} className="border-b border-white/5 last:border-0">
                      <td className="py-2 pr-4">
                        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-blue-400">{dt.type}</code>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">{dt.size}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{dt.range}</td>
                      <td className="py-2">
                        <code className="font-mono text-xs text-foreground">{dt.example}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Operators */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Operators</CardTitle>
            <CardDescription>Java operators for arithmetic, comparison, and assignment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-muted-foreground">
                    <th className="pb-2 pr-6 font-medium">Operator</th>
                    <th className="pb-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {OPERATORS.map((o) => (
                    <tr key={o.op} className="border-b border-white/5 last:border-0">
                      <td className="py-2 pr-6">
                        <code className="font-mono text-xs text-amber-400">{o.op}</code>
                      </td>
                      <td className="py-2 text-muted-foreground">{o.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Casting Rules */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle>🔄 Casting Rules</CardTitle>
            <CardDescription>Know when Java does it for you and when you must be explicit.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {CASTING_RULES.map((rule) => (
                <div
                  key={rule.title}
                  className={cn(
                    "rounded-lg border p-3",
                    rule.safe ? "border-emerald-500/20 bg-emerald-500/5" : "border-amber-500/20 bg-amber-500/5"
                  )}
                >
                  <p className="text-sm font-semibold">{rule.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{rule.desc}</p>
                  <pre className="mt-2 rounded bg-[#0d1117] p-2 font-mono text-xs text-foreground">{rule.example}</pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Common Pitfalls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>⚠️ Common Pitfalls</CardTitle>
            <CardDescription>Mistakes that trip up even experienced students on the AP exam.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PITFALLS.map((p) => (
                <div key={p.mistake} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-sm font-semibold text-red-400">❌ {p.mistake}</p>
                  <p className="mt-1 text-xs text-muted-foreground">✅ {p.fix}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Terms — flip cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <CardHeader>
            <CardTitle>🗂️ Key Terms</CardTitle>
            <CardDescription>Click each card to reveal the definition.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {KEY_TERMS.map((t) => (
                <FlipCard key={t.term} {...t} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Quiz */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>⚡ Quick Quiz</CardTitle>
            <CardDescription>3 rapid-fire questions — test yourself before moving on.</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickQuiz />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
