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
