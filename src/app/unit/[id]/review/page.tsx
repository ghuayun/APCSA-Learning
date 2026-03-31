"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";

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

// ─── Types ───────────────────────────────────────────────────────────────────

interface DataTypeRow { type: string; size: string; range: string; example: string; }
interface OperatorRow { op: string; desc: string; }
interface CastingRule { title: string; desc: string; example: string; safe: boolean; }
interface PitfallRow { mistake: string; fix: string; }
interface FlipCardData { term: string; definition: string; }
interface QuizQuestion { question: string; options: string[]; correctIndex: number; explanation: string; }

interface ReviewContent {
  dataTypes: { title: string; description: string; rows: DataTypeRow[] };
  operators: { title: string; description: string; rows: OperatorRow[] };
  castingRules: { title: string; description: string; rules: CastingRule[] };
  pitfalls: { title: string; description: string; items: PitfallRow[] };
  keyTerms: FlipCardData[];
  quizQuestions: QuizQuestion[];
}

// ─── Data per unit ───────────────────────────────────────────────────────────

const UNIT_REVIEW: Record<number, ReviewContent> = {
  1: {
    dataTypes: {
      title: "📊 Primitive Data Types",
      description: "The building blocks of Java — every variable starts with a type.",
      rows: [
        { type: "int", size: "32 bits", range: "-2³¹ to 2³¹ − 1", example: "int x = 42;" },
        { type: "double", size: "64 bits", range: "±1.7 × 10³⁰⁸", example: "double pi = 3.14;" },
        { type: "boolean", size: "1 bit*", range: "true / false", example: "boolean ok = true;" },
        { type: "char", size: "16 bits", range: "Unicode char", example: "char c = 'A';" },
        { type: "long", size: "64 bits", range: "-2⁶³ to 2⁶³ − 1", example: "long big = 100L;" },
        { type: "byte", size: "8 bits", range: "-128 to 127", example: "byte b = 100;" },
      ],
    },
    operators: {
      title: "⚙️ Operators",
      description: "Java operators for arithmetic, comparison, and assignment.",
      rows: [
        { op: "+  -  *", desc: "Addition, subtraction, multiplication" },
        { op: "/", desc: "Division (integer truncates, double keeps decimal)" },
        { op: "%", desc: "Modulus — remainder after division" },
        { op: "+=  -=  *=  /=  %=", desc: "Compound assignment operators" },
        { op: "++  --", desc: "Increment / decrement by 1" },
        { op: "==  !=  <  >  <=  >=", desc: "Comparison operators (return boolean)" },
      ],
    },
    castingRules: {
      title: "🔄 Casting Rules",
      description: "Know when Java does it for you and when you must be explicit.",
      rules: [
        { title: "Widening (automatic)", desc: "Smaller → larger type. No data loss.", example: "int x = 5;\ndouble d = x; // 5.0", safe: true },
        { title: "Narrowing (manual cast)", desc: "Larger → smaller type. May lose data!", example: "double pi = 3.14;\nint n = (int) pi; // 3", safe: false },
        { title: "int ÷ int = int", desc: "Integer division truncates the decimal.", example: "int r = 7 / 2; // 3, not 3.5", safe: false },
        { title: "Cast one operand for double result", desc: "Cast at least one operand to double.", example: "double r = (double) 7 / 2; // 3.5", safe: true },
      ],
    },
    pitfalls: {
      title: "⚠️ Common Pitfalls",
      description: "Mistakes that trip up even experienced students on the AP exam.",
      items: [
        { mistake: "Using = instead of ==", fix: "= is assignment, == is comparison. if (x == 5) not if (x = 5)." },
        { mistake: "Integer division surprise", fix: "5 / 2 → 2 (not 2.5). Use 5.0 / 2 or cast to double." },
        { mistake: "Overflow without warning", fix: "int maxes at ~2.1 billion. Adding 1 to Integer.MAX_VALUE wraps to negative!" },
        { mistake: "Comparing doubles with ==", fix: "Floating-point math isn't exact. Use Math.abs(a - b) < 0.0001 instead." },
        { mistake: "Uninitialized local variables", fix: "Java won't compile if you use a local variable before assigning a value." },
      ],
    },
    keyTerms: [
      { term: "Variable", definition: "A named storage location in memory that holds a value." },
      { term: "Literal", definition: "A fixed value written directly in code, like 42 or 3.14." },
      { term: "Casting", definition: "Converting a value from one data type to another." },
      { term: "Truncation", definition: "Cutting off the decimal part when converting double → int." },
      { term: "Modulus (%)", definition: "Returns the remainder of integer division. 7 % 3 = 1." },
      { term: "Overflow", definition: "When a value exceeds the max of its type and wraps around." },
    ],
    quizQuestions: [
      { question: "What is the value of 7 / 2 in Java?", options: ["3", "3.5", "4", "3.0"], correctIndex: 0, explanation: "Integer division truncates the decimal. Both operands are int, so the result is int → 3." },
      { question: "What does (double) 5 / 2 evaluate to?", options: ["2", "2.0", "2.5", "3.0"], correctIndex: 2, explanation: "Casting 5 to double makes it 5.0. Then 5.0 / 2 promotes 2 to 2.0, giving 2.5." },
      { question: "What is the result of 17 % 5?", options: ["3", "2", "3.4", "5"], correctIndex: 1, explanation: "17 ÷ 5 = 3 remainder 2. The modulus operator returns the remainder → 2." },
    ],
  },
  2: {
    dataTypes: {
      title: "📦 Reference Types vs. Primitives",
      description: "Understand the difference between objects and primitive values.",
      rows: [
        { type: "String", size: "varies", range: "Any text", example: 'String s = "hello";' },
        { type: "Integer", size: "32 bits", range: "Wrapper for int", example: "Integer n = 5;" },
        { type: "Double", size: "64 bits", range: "Wrapper for double", example: "Double d = 3.14;" },
        { type: "null", size: "N/A", range: "No object", example: "String s = null;" },
      ],
    },
    operators: {
      title: "🔧 Key Object Methods",
      description: "Essential methods for Strings and the Math class.",
      rows: [
        { op: ".length()", desc: "Returns the number of characters in a String" },
        { op: ".substring(a, b)", desc: "Returns characters from index a to b-1" },
        { op: ".indexOf(str)", desc: "Returns the first index of str, or -1" },
        { op: ".equals(other)", desc: "Compares String content (not ==)" },
        { op: "Math.abs(x)", desc: "Returns the absolute value of x" },
        { op: "Math.pow(a, b)", desc: "Returns a raised to the power b" },
      ],
    },
    castingRules: {
      title: "🔄 Autoboxing & Unboxing",
      description: "Java automatically converts between primitives and wrappers.",
      rules: [
        { title: "Autoboxing", desc: "Primitive → Wrapper automatically.", example: "Integer n = 5; // int → Integer", safe: true },
        { title: "Unboxing", desc: "Wrapper → Primitive automatically.", example: "int x = new Integer(5); // Integer → int", safe: true },
        { title: "null unboxing", desc: "Unboxing null throws NullPointerException!", example: "Integer n = null;\nint x = n; // NPE!", safe: false },
        { title: "== vs .equals()", desc: "Use .equals() for object content comparison.", example: 'String a = new String("hi");\na.equals("hi"); // true\na == "hi"; // may be false', safe: false },
      ],
    },
    pitfalls: {
      title: "⚠️ Common Pitfalls",
      description: "Watch out for these common object-related mistakes.",
      items: [
        { mistake: "Comparing Strings with ==", fix: "Use .equals() to compare String content." },
        { mistake: "Calling methods on null", fix: "Always check for null before calling methods on objects." },
        { mistake: "Off-by-one with substring", fix: "substring(a, b) includes index a but excludes b." },
        { mistake: "Forgetting Math is static", fix: "Call Math.sqrt(x), not x.sqrt(). Math methods are all static." },
      ],
    },
    keyTerms: [
      { term: "Object", definition: "An instance of a class that has state (data) and behavior (methods)." },
      { term: "Reference", definition: "A variable that stores the memory address of an object, not the object itself." },
      { term: "null", definition: "A special value meaning 'no object' — the reference points to nothing." },
      { term: "Constructor", definition: "A special method called with 'new' to create and initialize an object." },
      { term: "Immutable", definition: "An object whose state cannot change after creation (e.g., String)." },
      { term: "Wrapper Class", definition: "A class that wraps a primitive type as an object (Integer, Double, etc.)." },
    ],
    quizQuestions: [
      { question: 'What does "hello".substring(1, 3) return?', options: ['"hel"', '"el"', '"ell"', '"he"'], correctIndex: 1, explanation: "substring(1, 3) returns characters at indices 1 and 2 → \"el\"." },
      { question: 'What does "hello".indexOf("ll") return?', options: ["1", "2", "3", "-1"], correctIndex: 1, explanation: "The substring \"ll\" starts at index 2... wait, actually \"ll\" starts at index 2. indexOf returns the first index → 2." },
      { question: "What is Math.pow(2, 3)?", options: ["6", "8.0", "8", "6.0"], correctIndex: 1, explanation: "Math.pow returns a double. 2³ = 8, returned as 8.0." },
    ],
  },
  3: {
    dataTypes: {
      title: "🔍 Boolean Expressions",
      description: "Expressions that evaluate to true or false.",
      rows: [
        { type: "==", size: "Operator", range: "Equal to", example: "x == 5" },
        { type: "!=", size: "Operator", range: "Not equal to", example: "x != 0" },
        { type: "<, >", size: "Operator", range: "Less/greater than", example: "x < 10" },
        { type: "<=, >=", size: "Operator", range: "Less/greater or equal", example: "x >= 1" },
      ],
    },
    operators: {
      title: "🔗 Logical Operators",
      description: "Combine boolean expressions for complex conditions.",
      rows: [
        { op: "&&", desc: "AND — both must be true" },
        { op: "||", desc: "OR — at least one must be true" },
        { op: "!", desc: "NOT — inverts the boolean value" },
        { op: "Short-circuit", desc: "&& stops if left is false; || stops if left is true" },
      ],
    },
    castingRules: {
      title: "🔄 De Morgan's Laws",
      description: "Rules for distributing NOT over AND/OR.",
      rules: [
        { title: "!(A && B)", desc: "Equivalent to !A || !B", example: "!(x > 0 && y > 0)\n// same as: x <= 0 || y <= 0", safe: true },
        { title: "!(A || B)", desc: "Equivalent to !A && !B", example: "!(x > 0 || y > 0)\n// same as: x <= 0 && y <= 0", safe: true },
        { title: "Nested if vs. &&", desc: "Nested if statements can be combined with &&.", example: "if (a) { if (b) { ... } }\n// same as: if (a && b) { ... }", safe: true },
        { title: "if/else chains", desc: "Use else-if to avoid redundant checks.", example: "if (x >= 90) grade = 'A';\nelse if (x >= 80) grade = 'B';", safe: true },
      ],
    },
    pitfalls: {
      title: "⚠️ Common Pitfalls",
      description: "Boolean logic mistakes on the AP exam.",
      items: [
        { mistake: "Using = instead of ==", fix: "= assigns a value, == compares. Java catches this for booleans." },
        { mistake: "Comparing objects with ==", fix: "Use .equals() for Strings and objects; == checks reference, not value." },
        { mistake: "Forgetting short-circuit evaluation", fix: "&& and || stop evaluating early — this matters when the second expression has side effects." },
        { mistake: "Wrong De Morgan's transformation", fix: "!(A && B) is !A || !B, NOT !A && !B. Flip both the operator and each term." },
      ],
    },
    keyTerms: [
      { term: "Boolean", definition: "A data type with only two values: true or false." },
      { term: "Conditional", definition: "A statement that executes code only when a condition is true." },
      { term: "Short-circuit", definition: "Evaluation that stops as soon as the result is determined." },
      { term: "De Morgan's Laws", definition: "!(A&&B) = !A||!B and !(A||B) = !A&&!B." },
      { term: "Nested conditional", definition: "An if statement inside another if statement." },
      { term: "Dangling else", definition: "An else that could match multiple ifs — Java matches the nearest if." },
    ],
    quizQuestions: [
      { question: "What is !(true && false)?", options: ["true", "false", "Error", "null"], correctIndex: 0, explanation: "true && false = false. !(false) = true." },
      { question: "Which is equivalent to !(a || b)?", options: ["!a || !b", "!a && !b", "a && b", "!a || b"], correctIndex: 1, explanation: "By De Morgan's Law: !(a || b) = !a && !b." },
      { question: "What does if (x > 0 && x < 10) check?", options: ["x is negative", "x is between 0 and 10 exclusive", "x is 0 or 10", "x is any positive number"], correctIndex: 1, explanation: "Both conditions must be true: x must be greater than 0 AND less than 10." },
    ],
  },
};

// Generate placeholder review content for units 4-10
function generatePlaceholderReview(unitId: number): ReviewContent {
  const unitNames: Record<number, string> = {
    4: "Iteration",
    5: "Writing Classes",
    6: "Array",
    7: "ArrayList",
    8: "2D Array",
    9: "Inheritance",
    10: "Recursion",
  };
  const title = unitNames[unitId] ?? `Unit ${unitId}`;
  return {
    dataTypes: {
      title: `📊 ${title} — Key Concepts`,
      description: `Essential concepts for ${title}. Full content coming soon!`,
      rows: [
        { type: "Concept 1", size: "—", range: "—", example: "Coming soon" },
      ],
    },
    operators: {
      title: `⚙️ ${title} — Key Syntax`,
      description: `Important syntax and patterns for ${title}.`,
      rows: [
        { op: "...", desc: `${title} syntax coming soon` },
      ],
    },
    castingRules: {
      title: `🔄 ${title} — Important Rules`,
      description: `Rules and patterns to remember for ${title}.`,
      rules: [
        { title: "Coming Soon", desc: `${title} rules are being developed.`, example: "// Check back soon!", safe: true },
      ],
    },
    pitfalls: {
      title: "⚠️ Common Pitfalls",
      description: `Common mistakes when working with ${title}.`,
      items: [
        { mistake: "Content coming soon", fix: `Check back for ${title} pitfalls and tips.` },
      ],
    },
    keyTerms: [
      { term: title, definition: `Key term for Unit ${unitId}. Full definitions coming soon.` },
    ],
    quizQuestions: [
      { question: `Placeholder question for ${title}. What is 2 + 2?`, options: ["3", "4", "5", "6"], correctIndex: 1, explanation: "2 + 2 = 4. Full quiz content for this unit is being developed." },
    ],
  };
}

function getReviewContent(unitId: number): ReviewContent {
  return UNIT_REVIEW[unitId] ?? generatePlaceholderReview(unitId);
}

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

function QuickQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      if (idx === q.correctIndex) setScore((s) => s + 1);
    },
    [selected, q.correctIndex]
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 < questions.length) {
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
          You got {score}/{questions.length} correct!
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
          Question {currentQ + 1} of {questions.length}
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
              {currentQ + 1 < questions.length ? "Next Question →" : "See Results"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const params = useParams();
  const unitId = Number(params.id);
  const review = getReviewContent(unitId);

  return (
    <div className="space-y-8">
      {/* Data Types / Key Concepts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card>
          <CardHeader>
            <CardTitle>{review.dataTypes.title}</CardTitle>
            <CardDescription>{review.dataTypes.description}</CardDescription>
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
                  {review.dataTypes.rows.map((dt) => (
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

      {/* Operators / Key Syntax */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>{review.operators.title}</CardTitle>
            <CardDescription>{review.operators.description}</CardDescription>
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
                  {review.operators.rows.map((o) => (
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

      {/* Casting Rules / Important Rules */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle>{review.castingRules.title}</CardTitle>
            <CardDescription>{review.castingRules.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {review.castingRules.rules.map((rule) => (
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
            <CardTitle>{review.pitfalls.title}</CardTitle>
            <CardDescription>{review.pitfalls.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {review.pitfalls.items.map((p) => (
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
              {review.keyTerms.map((t) => (
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
            <CardDescription>{review.quizQuestions.length} rapid-fire questions — test yourself before moving on.</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickQuiz questions={review.quizQuestions} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
