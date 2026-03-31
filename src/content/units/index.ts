// ─── Unit metadata (moved from ../units.ts) ─────────────────────────────────

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  emoji: string;
  color: string;
  topics: string[];
  progress: number;
}

export const units: Unit[] = [
  {
    id: 1,
    title: "Primitive Types",
    subtitle: "Variables, data types & expressions",
    description:
      "Learn the building blocks of Java — declaring variables, using int/double/boolean, writing arithmetic expressions, and understanding type casting.",
    icon: "🔢",
    emoji: "🔢",
    color: "blue",
    progress: 0,
    topics: [
      "Declaring & initializing variables (int, double, boolean)",
      "Arithmetic operators & integer vs. floating-point division",
      "Type casting and promotion",
      "Compound assignment operators (+=, -=, *=, /=, %=)",
      "The modulus (%) operator",
    ],
  },
  {
    id: 2,
    title: "Using Objects",
    subtitle: "Strings, Math, and object basics",
    description:
      "Explore how to create and use objects in Java — from calling methods on Strings to using the Math class and understanding references vs. values.",
    icon: "📦",
    emoji: "📦",
    color: "purple",
    progress: 0,
    topics: [
      "Creating objects with constructors & the new keyword",
      "Calling void and return methods",
      "String methods (substring, indexOf, length, equals, compareTo)",
      "The Math class (abs, pow, sqrt, random)",
      "Wrapper classes (Integer, Double) and autoboxing",
      "Null references and NullPointerException",
    ],
  },
  {
    id: 3,
    title: "Boolean Expressions & if Statements",
    subtitle: "Decisions and control flow",
    description:
      "Master conditional logic — write boolean expressions with comparison & logical operators, then control program flow with if / else if / else.",
    icon: "⚡",
    emoji: "⚡",
    color: "yellow",
    progress: 0,
    topics: [
      "Boolean expressions and relational operators (==, !=, <, >, <=, >=)",
      "Logical operators (&&, ||, !)",
      "if, else if, and else statements",
      "Nested conditionals",
      "Comparing objects with .equals() vs ==",
      "De Morgan's Laws",
    ],
  },
  {
    id: 4,
    title: "Iteration",
    subtitle: "Loops: while, for, and beyond",
    description:
      "Repeat actions efficiently — use while loops, for loops, and nested loops to process data, search arrays, and implement algorithms.",
    icon: "🔄",
    emoji: "🔄",
    color: "green",
    progress: 0,
    topics: [
      "while loops and loop control",
      "for loops and counter variables",
      "Nested loops (loop within a loop)",
      "String traversal with loops",
      "Infinite loops and off-by-one errors",
      "Algorithm tracing and loop invariants",
    ],
  },
  {
    id: 5,
    title: "Writing Classes",
    subtitle: "Design your own data types",
    description:
      "Design and implement your own classes — define instance variables, write constructors and methods, and understand encapsulation and scope.",
    icon: "🏗️",
    emoji: "🏗️",
    color: "orange",
    progress: 0,
    topics: [
      "Defining classes with instance variables",
      "Writing constructors",
      "Accessor (getter) and mutator (setter) methods",
      "The this keyword",
      "Static variables and methods",
      "Scope and access modifiers (public, private)",
    ],
  },
  {
    id: 6,
    title: "Array",
    subtitle: "Fixed-size indexed collections",
    description:
      "Store and manipulate ordered collections of data — declare arrays, traverse them with loops, and apply common algorithms like search and sort.",
    icon: "📊",
    emoji: "📊",
    color: "red",
    progress: 0,
    topics: [
      "Declaring and initializing arrays",
      "Accessing and modifying elements by index",
      "Traversing arrays with for and for-each loops",
      "Common array algorithms (sum, average, min, max)",
      "ArrayIndexOutOfBoundsException",
    ],
  },
  {
    id: 7,
    title: "ArrayList",
    subtitle: "Resizable dynamic lists",
    description:
      "Use Java's ArrayList for flexible, resizable storage — add, remove, and search elements while understanding the power of generics.",
    icon: "📋",
    emoji: "📋",
    color: "teal",
    progress: 0,
    topics: [
      "Creating and using ArrayList<E>",
      "add, remove, set, get, and size methods",
      "Traversing with for, for-each, and while loops",
      "ArrayList vs. array trade-offs",
      "Searching and sorting ArrayLists",
      "ConcurrentModificationException pitfalls",
    ],
  },
  {
    id: 8,
    title: "2D Array",
    subtitle: "Grids, matrices & tables",
    description:
      "Work with two-dimensional arrays — declare grids, traverse rows and columns with nested loops, and solve matrix-based problems.",
    icon: "🗃️",
    emoji: "🗃️",
    color: "pink",
    progress: 0,
    topics: [
      "Declaring and initializing 2D arrays",
      "Row-major and column-major traversal",
      "Nested loops for 2D array processing",
      "Jagged arrays (rows of different lengths)",
      "Common 2D algorithms (row/column sums, diagonal traversal)",
    ],
  },
  {
    id: 9,
    title: "Inheritance",
    subtitle: "Superclasses, subclasses & polymorphism",
    description:
      "Build class hierarchies — extend classes, override methods, and use polymorphism to write flexible, reusable code.",
    icon: "🧬",
    emoji: "🧬",
    color: "indigo",
    progress: 0,
    topics: [
      "Extending classes with the extends keyword",
      "Overriding methods and using super",
      "Polymorphism and dynamic binding",
      "The Object class (toString, equals)",
      "Abstract classes and interfaces (conceptual)",
      "Type compatibility and casting (upcasting / downcasting)",
    ],
  },
  {
    id: 10,
    title: "Recursion",
    subtitle: "Methods that call themselves",
    description:
      "Understand recursive thinking — write methods with base cases and recursive calls, trace execution, and compare recursion to iteration.",
    icon: "🪞",
    emoji: "🪞",
    color: "cyan",
    progress: 0,
    topics: [
      "Recursive methods and base cases",
      "Tracing recursive calls and the call stack",
      "Recursive vs. iterative solutions",
      "Recursive search (binary search)",
      "Recursive sorting (merge sort concepts)",
    ],
  },
];

// ─── Lesson types ────────────────────────────────────────────────────────────

export type { LessonSection } from "./unit-1-lesson";

export interface UnitLesson {
  title: string;
  sections: import("./unit-1-lesson").LessonSection[];
}

// ─── Lesson imports ──────────────────────────────────────────────────────────

import { unit1Lesson } from "./unit-1-lesson";
import { unit2Lesson } from "./unit-2-lesson";
import { unit3Lesson } from "./unit-3-lesson";
import { unit4Lesson } from "./unit-4-lesson";
import { unit5Lesson } from "./unit-5-lesson";
import { unit6Lesson } from "./unit-6-lesson";
import { unit7Lesson } from "./unit-7-lesson";
import { unit8Lesson } from "./unit-8-lesson";
import { unit9Lesson } from "./unit-9-lesson";
import { unit10Lesson } from "./unit-10-lesson";

// ─── Quiz imports ────────────────────────────────────────────────────────────

import unit1Quiz from "./unit-1-quiz.json";
import unit2Quiz from "./unit-2-quiz.json";
import unit3Quiz from "./unit-3-quiz.json";
import unit4Quiz from "./unit-4-quiz.json";
import unit5Quiz from "./unit-5-quiz.json";
import unit6Quiz from "./unit-6-quiz.json";
import unit7Quiz from "./unit-7-quiz.json";
import unit8Quiz from "./unit-8-quiz.json";
import unit9Quiz from "./unit-9-quiz.json";
import unit10Quiz from "./unit-10-quiz.json";

// ─── Exercise imports ────────────────────────────────────────────────────────

import unit1Exercises from "./unit-1-exercises.json";
import unit2Exercises from "./unit-2-exercises.json";
import unit3Exercises from "./unit-3-exercises.json";
import unit4Exercises from "./unit-4-exercises.json";
import unit5Exercises from "./unit-5-exercises.json";
import unit6Exercises from "./unit-6-exercises.json";
import unit7Exercises from "./unit-7-exercises.json";
import unit8Exercises from "./unit-8-exercises.json";
import unit9Exercises from "./unit-9-exercises.json";
import unit10Exercises from "./unit-10-exercises.json";

// ─── Content maps ────────────────────────────────────────────────────────────

const lessonMap: Record<number, UnitLesson> = {
  1: unit1Lesson,
  2: unit2Lesson,
  3: unit3Lesson,
  4: unit4Lesson,
  5: unit5Lesson,
  6: unit6Lesson,
  7: unit7Lesson,
  8: unit8Lesson,
  9: unit9Lesson,
  10: unit10Lesson,
};

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
}

const quizMap: Record<number, QuizQuestion[]> = {
  1: unit1Quiz as QuizQuestion[],
  2: unit2Quiz as QuizQuestion[],
  3: unit3Quiz as QuizQuestion[],
  4: unit4Quiz as QuizQuestion[],
  5: unit5Quiz as QuizQuestion[],
  6: unit6Quiz as QuizQuestion[],
  7: unit7Quiz as QuizQuestion[],
  8: unit8Quiz as QuizQuestion[],
  9: unit9Quiz as QuizQuestion[],
  10: unit10Quiz as QuizQuestion[],
};

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

const exerciseMap: Record<number, Exercise[]> = {
  1: unit1Exercises as Exercise[],
  2: unit2Exercises as Exercise[],
  3: unit3Exercises as Exercise[],
  4: unit4Exercises as Exercise[],
  5: unit5Exercises as Exercise[],
  6: unit6Exercises as Exercise[],
  7: unit7Exercises as Exercise[],
  8: unit8Exercises as Exercise[],
  9: unit9Exercises as Exercise[],
  10: unit10Exercises as Exercise[],
};

// ─── Fallback content ────────────────────────────────────────────────────────

function fallbackLesson(unitId: number): UnitLesson {
  const unit = units.find((u) => u.id === unitId);
  const title = unit?.title ?? `Unit ${unitId}`;
  return {
    title,
    sections: [
      {
        id: "coming-soon",
        title: "Coming Soon",
        content: `The lesson content for **${title}** is currently being developed. Check back soon!`,
      },
    ],
  };
}

function fallbackQuiz(unitId: number): QuizQuestion[] {
  const unit = units.find((u) => u.id === unitId);
  const title = unit?.title ?? `Unit ${unitId}`;
  return [
    {
      id: `u${unitId}q1`,
      question: `This is a placeholder quiz for ${title}. Content coming soon! What is 1 + 1?`,
      options: ["1", "2", "3", "4"],
      correct: 1,
      explanation: "1 + 1 = 2. Full quiz content is being developed.",
      difficulty: "easy",
    },
  ];
}

function fallbackExercises(unitId: number): Exercise[] {
  const unit = units.find((u) => u.id === unitId);
  const title = unit?.title ?? `Unit ${unitId}`;
  return [
    {
      id: `u${unitId}e1`,
      title: `${title} — Practice`,
      difficulty: "easy",
      description: `Practice exercise for ${title}. Full content is being developed.`,
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n        System.out.println("Hello, ${title}!");\n    }\n}`,
      expectedOutput: `Hello, ${title}!`,
      hints: ["This is a placeholder exercise."],
    },
  ];
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getUnitLesson(unitId: number): UnitLesson {
  return lessonMap[unitId] ?? fallbackLesson(unitId);
}

export function getUnitQuiz(unitId: number): QuizQuestion[] {
  const data = quizMap[unitId];
  return data && data.length > 0 ? data : fallbackQuiz(unitId);
}

export function getUnitExercises(unitId: number): Exercise[] {
  const data = exerciseMap[unitId];
  return data && data.length > 0 ? data : fallbackExercises(unitId);
}
