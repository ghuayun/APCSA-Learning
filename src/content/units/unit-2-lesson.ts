import { LessonSection } from "./unit-1-lesson";

export const unit2Lesson: { title: string; sections: LessonSection[] } = {
  title: "Using Objects",
  sections: [
    {
      id: "why-objects-matter",
      title: "Why Objects Matter",
      content: `In Unit 1, you worked with primitive types — simple values like numbers and booleans. But real programs need more. When you send a text message, that message isn't just a number — it's a **String** of characters. When your phone calculates the distance to a restaurant, it uses the **Math** class. When a game creates a new enemy, it creates a new **object**.

**Objects** are like the tools in your backpack. A primitive is just a single item (a pencil), but an object is a whole toolkit with built-in features (a Swiss Army knife). A String isn't just text — it comes with methods to search, slice, compare, and transform that text.

In this unit, you'll learn how to:
- Create objects using \`new\`
- Use String methods (your most powerful tool in AP CSA)
- Work with the Math class for calculations
- Understand wrapper classes and the dreaded \`null\`

This is where Java starts feeling like a real programming language. Let's go! 🎮`,
    },
    {
      id: "creating-objects",
      title: "Creating Objects with new",
      content: `An **object** is an instance of a class. Think of a class as a blueprint (like the blueprint for a house) and an object as the actual house built from that blueprint. You can build many houses from the same blueprint.

To create an object, you use the \`new\` keyword followed by a **constructor** — a special method that sets up the object:

\`\`\`java
ClassName objectName = new ClassName(arguments);
\`\`\`

The **constructor** is like the "setup wizard" for the object. It runs once when the object is created and initializes everything.

For example, Strings can be created two ways:
- **Literal:** \`String s = "hello";\` (shortcut — Java creates the object for you)
- **Constructor:** \`String s = new String("hello");\` (explicit — you call new yourself)

Most of the time, you'll use the literal shortcut for Strings. But for other classes (which you'll see in later units), you MUST use \`new\`.

**Key concept:** The variable doesn't hold the object itself — it holds a **reference** (an address) pointing to where the object lives in memory. Think of it like a variable holding a URL, not the actual website.`,
      codeExample: {
        code: `// String literal (the common shortcut)
String greeting = "Hello, World!";
System.out.println(greeting);

// String constructor (explicit object creation)
String name = new String("Alice");
System.out.println(name);

// Both work the same way for using the String
System.out.println(greeting.length());
System.out.println(name.length());`,
        language: "java",
        output: `Hello, World!
Alice
13
5`,
      },
      miniQuiz: {
        question:
          "What does the `new` keyword do in Java?",
        options: [
          "Declares a new variable",
          "Creates a new object in memory",
          "Imports a new class",
          "Deletes the old value"
        ],
        correct: 1,
        explanation:
          "The `new` keyword creates a new object in memory and calls the constructor to initialize it. The variable then holds a reference (address) to that new object.",
      },
    },
    {
      id: "string-methods",
      title: "String Methods — The Swiss Army Knife",
      content: `Strings are **the most tested topic on the AP CSA exam**. You NEED to know these methods cold. Think of a String as a row of characters, each with an index starting at 0:

\`\`\`
String s = "HELLO";
Index:       0 1 2 3 4
Character:   H E L L O
\`\`\`

Here are the essential String methods:

| Method | What it does | Example |
|--------|-------------|---------|
| \`length()\` | Returns the number of characters | \`"HELLO".length()\` → \`5\` |
| \`substring(start, end)\` | Returns characters from start to end-1 | \`"HELLO".substring(1, 4)\` → \`"ELL"\` |
| \`substring(start)\` | Returns characters from start to the end | \`"HELLO".substring(2)\` → \`"LLO"\` |
| \`indexOf(str)\` | Returns the index where str first appears (-1 if not found) | \`"HELLO".indexOf("LL")\` → \`2\` |
| \`equals(other)\` | Compares content (case-sensitive) | \`"Hi".equals("hi")\` → \`false\` |
| \`compareTo(other)\` | Compares alphabetically (returns negative, 0, or positive) | \`"A".compareTo("B")\` → negative |

**Critical rules:**
- Strings are **immutable** — methods return NEW strings. The original never changes.
- Indices start at **0**, not 1!
- \`substring(a, b)\` includes index \`a\` but **excludes** index \`b\` (think: the door is open on the left, closed on the right)`,
      codeExample: {
        code: `String msg = "AP Computer Science";

System.out.println(msg.length());           // 19
System.out.println(msg.substring(3, 11));    // "Computer"
System.out.println(msg.indexOf("Science"));  // 12
System.out.println(msg.indexOf("math"));     // -1 (not found)

// Strings are IMMUTABLE — the original doesn't change
String lower = msg.toLowerCase();
System.out.println(msg);    // still "AP Computer Science"
System.out.println(lower);  // "ap computer science"

// equals vs compareTo
System.out.println("apple".equals("apple"));     // true
System.out.println("apple".compareTo("banana")); // negative (a before b)`,
        language: "java",
        output: `19
Computer
12
-1
AP Computer Science
ap computer science
true
-1`,
      },
      miniQuiz: {
        question:
          'What does `"gaming".substring(1, 4)` return?',
        options: ['"gam"', '"ami"', '"amin"', '"gami"'],
        correct: 1,
        explanation:
          'In "gaming": index 0=g, 1=a, 2=m, 3=i, 4=n, 5=g. substring(1, 4) returns characters at indices 1, 2, 3 — which is "ami". Remember: start is inclusive, end is exclusive!',
      },
    },
    {
      id: "string-concatenation",
      title: "String Concatenation",
      content: `**Concatenation** means joining strings together using the \`+\` operator. It's like snapping LEGO bricks together — you combine pieces into one longer piece.

\`\`\`java
String first = "Hello";
String second = "World";
String result = first + " " + second;  // "Hello World"
\`\`\`

**The magic of + with Strings:** When one side of \`+\` is a String, Java converts the other side to a String automatically:
- \`"Score: " + 100\` → \`"Score: 100"\`
- \`"GPA: " + 3.85\` → \`"GPA: 3.85"\`
- \`"Pass: " + true\` → \`"Pass: true"\`

**⚠️ The concatenation order trap** — this shows up on the AP exam ALL the time:
\`\`\`java
System.out.println("Sum: " + 3 + 4);    // "Sum: 34" (NOT "Sum: 7"!)
System.out.println("Sum: " + (3 + 4));   // "Sum: 7"  (parentheses fix it)
\`\`\`

Why? Java evaluates left to right. \`"Sum: " + 3\` makes \`"Sum: 3"\` (String + int = String). Then \`"Sum: 3" + 4\` makes \`"Sum: 34"\`.

**Escape sequences** let you put special characters inside Strings:
- \`\\\\\n\` → newline (next line)
- \`\\\\\t\` → tab (indent)
- \`\\\\"\` → a literal quote character
- \`\\\\\\\\\` → a literal backslash`,
      codeExample: {
        code: `String player = "Alex";
int score = 2500;
double kd = 1.75;

// Concatenation with different types
System.out.println("Player: " + player);
System.out.println("Score: " + score);
System.out.println("K/D: " + kd);

// The order trap
System.out.println(1 + 2 + " cats");     // "3 cats" (1+2 = 3, then "3" + " cats")
System.out.println("cats " + 1 + 2);     // "cats 12" (string + 1 = "cats 1", + 2 = "cats 12")

// Escape sequences
System.out.println("She said \\"hi\\"");
System.out.println("Line1\\nLine2");`,
        language: "java",
        output: `Player: Alex
Score: 2500
K/D: 1.75
3 cats
cats 12
She said "hi"
Line1
Line2`,
      },
    },
    {
      id: "math-class",
      title: "The Math Class",
      content: `The \`Math\` class is Java's built-in calculator. Unlike Strings, you don't create Math objects — you just call its methods directly using \`Math.methodName()\`. These are called **static methods**.

**Essential Math methods for the AP exam:**

| Method | What it does | Example |
|--------|-------------|---------|
| \`Math.abs(x)\` | Absolute value (distance from 0) | \`Math.abs(-7)\` → \`7\` |
| \`Math.pow(base, exp)\` | Raises base to a power (returns double) | \`Math.pow(2, 10)\` → \`1024.0\` |
| \`Math.sqrt(x)\` | Square root (returns double) | \`Math.sqrt(144)\` → \`12.0\` |
| \`Math.random()\` | Random double from 0.0 (inclusive) to 1.0 (exclusive) | \`0.0 ≤ result < 1.0\` |

**The random number formula** — memorize this! To get a random integer from \`min\` to \`max\`:
\`\`\`java
int result = (int)(Math.random() * (max - min + 1)) + min;
\`\`\`

For example, to simulate a dice roll (1 to 6):
\`\`\`java
int die = (int)(Math.random() * 6) + 1;
\`\`\`

Why does this work?
1. \`Math.random()\` → 0.0 to 0.999...
2. \`* 6\` → 0.0 to 5.999...
3. \`(int)\` → 0 to 5 (truncates)
4. \`+ 1\` → 1 to 6 ✅`,
      codeExample: {
        code: `// Absolute value
System.out.println(Math.abs(-42));     // 42
System.out.println(Math.abs(42));      // 42

// Powers and square roots
System.out.println(Math.pow(3, 4));    // 81.0 (3^4)
System.out.println(Math.sqrt(81));     // 9.0

// Distance between two points: sqrt((x2-x1)^2 + (y2-y1)^2)
int x1 = 1, y1 = 2, x2 = 4, y2 = 6;
double distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
System.out.println("Distance: " + distance);  // 5.0

// Random number: 1 to 10
int random = (int)(Math.random() * 10) + 1;
System.out.println("Random (1-10): " + random);`,
        language: "java",
        output: `42
42
81.0
9.0
Distance: 5.0
Random (1-10): 7`,
      },
      miniQuiz: {
        question:
          "Which expression generates a random integer from 5 to 15 (inclusive)?",
        options: [
          "(int)(Math.random() * 15) + 5",
          "(int)(Math.random() * 10) + 5",
          "(int)(Math.random() * 11) + 5",
          "(int)(Math.random() * 10) + 6"
        ],
        correct: 2,
        explanation:
          "The range from 5 to 15 has 11 values (15 - 5 + 1 = 11). So we multiply Math.random() by 11 to get 0–10, then add 5 to shift to 5–15. Formula: (int)(Math.random() * (max - min + 1)) + min.",
      },
    },
    {
      id: "wrapper-classes",
      title: "Wrapper Classes & Autoboxing",
      content: `Java has a split personality. It has **primitive types** (\`int\`, \`double\`, \`boolean\`) which are simple values, and **objects** which have methods and features. Sometimes you need an object version of a primitive — that's where **wrapper classes** come in.

| Primitive | Wrapper Class |
|-----------|--------------|
| \`int\` | \`Integer\` |
| \`double\` | \`Double\` |
| \`boolean\` | \`Boolean\` |

Why do we need these? Some Java features (like ArrayLists, which you'll learn later) can ONLY store objects, not primitives. So if you want a list of numbers, you need \`Integer\` objects, not \`int\` values.

**Autoboxing** — Java automatically converts between primitives and wrapper objects:

\`\`\`java
Integer x = 5;    // autoboxing: int 5 → Integer object
int y = x;        // unboxing: Integer object → int 5
\`\`\`

Think of it like Java being your personal assistant — it wraps and unwraps the gift boxes for you. You say "put 5 in an Integer box" and Java handles the wrapping.

**Useful methods:**
- \`Integer.parseInt("42")\` → converts String to int: \`42\`
- \`Double.parseDouble("3.14")\` → converts String to double: \`3.14\`
- \`Integer.MAX_VALUE\` → the largest possible int: \`2,147,483,647\`
- \`Integer.MIN_VALUE\` → the smallest possible int: \`-2,147,483,648\``,
      codeExample: {
        code: `// Autoboxing: primitive → wrapper object
Integer score = 95;         // int 95 auto-wrapped into Integer
Double gpa = 3.75;          // double 3.75 auto-wrapped into Double

// Unboxing: wrapper object → primitive
int rawScore = score;       // Integer unwrapped to int
double rawGpa = gpa;        // Double unwrapped to double

System.out.println(rawScore + 5);  // works like a normal int

// Parsing Strings to numbers
String ageText = "17";
int age = Integer.parseInt(ageText);
System.out.println("Next year: " + (age + 1));

// Useful constants
System.out.println("Max int: " + Integer.MAX_VALUE);
System.out.println("Min int: " + Integer.MIN_VALUE);`,
        language: "java",
        output: `100
Next year: 18
Max int: 2147483647
Min int: -2147483648`,
      },
    },
    {
      id: "null-references",
      title: "null — The Billion Dollar Mistake",
      content: `The inventor of null references, Tony Hoare, called it his "billion dollar mistake" because null causes SO many bugs. But you need to understand it for the AP exam.

**null** means "this variable doesn't point to any object." It's like having a label for a locker, but the locker doesn't exist.

\`\`\`java
String name = null;  // name doesn't point to any String object
\`\`\`

**The danger:** If you try to call a method on null, your program crashes with a **NullPointerException** (NPE):

\`\`\`java
String name = null;
name.length();  // 💥 CRASH! NullPointerException!
\`\`\`

This is like trying to open a locker that doesn't exist — you can't look inside something that isn't there.

**Key rules:**
1. Only **reference types** (objects like String, Integer) can be null. Primitives (int, double, boolean) CANNOT be null.
2. You can **check** for null before using an object: \`if (name != null) { ... }\`
3. \`null == null\` is \`true\`
4. Calling ANY method on null throws NullPointerException

**Common pattern — the null guard:**
\`\`\`java
if (name != null && name.length() > 0) {
    // safe to use name here
}
\`\`\`
The short-circuit \`&&\` makes this safe: if name is null, it stops and never calls \`.length()\`.`,
      codeExample: {
        code: `String greeting = "Hello";
String empty = null;

// Checking for null
System.out.println(greeting != null);  // true
System.out.println(empty != null);     // false

// Safe null check before using the object
if (greeting != null) {
    System.out.println(greeting.length());  // 5
}

if (empty != null) {
    System.out.println(empty.length());  // this line never runs
} else {
    System.out.println("Variable is null!");
}

// Primitives can't be null
int score = 0;  // this is 0, NOT null — it has a value!
System.out.println(score);`,
        language: "java",
        output: `true
false
5
Variable is null!
0`,
      },
      miniQuiz: {
        question:
          "What happens when you run: `String s = null; System.out.println(s.toUpperCase());`?",
        options: [
          "Prints \"NULL\"",
          "Prints nothing",
          "NullPointerException at runtime",
          "Compilation error"
        ],
        correct: 2,
        explanation:
          "Calling any method on a null reference causes a NullPointerException at runtime. The code compiles fine (Java doesn't check for null at compile time), but crashes when it tries to execute .toUpperCase() on null.",
      },
    },
  ],
};
