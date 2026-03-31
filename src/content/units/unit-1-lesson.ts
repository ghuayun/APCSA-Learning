export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: {
    code: string;
    language: string;
    output?: string;
  };
  miniQuiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export const unit1Lesson: { title: string; sections: LessonSection[] } = {
  title: "Primitive Types",
  sections: [
    {
      id: "why-this-matters",
      title: "Why This Matters",
      content: `Every app you use — Spotify, Instagram, Minecraft — is built on data. When Spotify tracks how many seconds you've listened to a song, that's a number. When Instagram checks if your account is private, that's a true/false value. When a game calculates your health after taking damage, that's math with numbers.

**Primitive types** are the simplest building blocks for storing data in Java. They're the atoms of your programs — tiny, fundamental, and everywhere. Without them, your code can't remember anything, calculate anything, or make any decisions.

In this unit, you'll learn how Java stores numbers and true/false values, how to do math with them, and how to avoid some sneaky traps that catch even experienced programmers.

Let's get into it. 🚀`,
    },
    {
      id: "variables-and-data-types",
      title: "Variables & Data Types",
      content: `A **variable** is like a labeled box that holds a value. You give the box a name, tell Java what type of thing it holds, and then put something inside.

Java has three primitive types you need to know for the AP exam:

| Type | What it stores | Example values |
|------|---------------|----------------|
| \`int\` | Whole numbers (no decimals) | \`42\`, \`-7\`, \`0\`, \`2000000\` |
| \`double\` | Decimal numbers | \`3.14\`, \`-0.5\`, \`98.6\` |
| \`boolean\` | True or false | \`true\`, \`false\` |

Think of it this way:
- **int** = your follower count (always a whole number)
- **double** = your GPA (has decimals)
- **boolean** = "Is my profile public?" (yes or no)

Java is **strongly typed**, which means you have to tell it what type each variable is. You can't just throw anything into any box — a box labeled "int" will only hold whole numbers.`,
      codeExample: {
        code: `int followers = 1500;
double gpa = 3.85;
boolean isOnline = true;

System.out.println(followers);
System.out.println(gpa);
System.out.println(isOnline);`,
        language: "java",
        output: `1500
3.85
true`,
      },
      miniQuiz: {
        question:
          "Which data type would you use to store whether a user has accepted the terms of service?",
        options: ["int", "double", "boolean", "String"],
        correct: 2,
        explanation:
          'Accepting terms of service is a yes/no (true/false) situation, which is exactly what boolean is for!',
      },
    },
    {
      id: "declaring-and-initializing",
      title: "Declaring & Initializing Variables",
      content: `There are two steps to creating a variable:

1. **Declaring** — telling Java "Hey, I want a box of this type with this name."
2. **Initializing** — putting a value into the box.

You can do both at once (and usually should):

\`\`\`java
int lives = 3;  // declared AND initialized
\`\`\`

Or separately:

\`\`\`java
int lives;      // declared (box exists but is empty)
lives = 3;      // initialized (now the box has a value)
\`\`\`

**Naming rules:**
- Must start with a letter, \`_\`, or \`$\` (but just use letters, seriously)
- Can't use Java reserved words (\`int\`, \`class\`, \`public\`, etc.)
- Convention: use **camelCase** → \`playerScore\`, \`isGameOver\`, \`maxHealth\`

**Important:** When you assign a value with \`=\`, you're saying "store this value." It's NOT the same as "equals" in math. Think of \`=\` as an arrow pointing left: the value on the right goes into the variable on the left.`,
      codeExample: {
        code: `int playerScore = 0;
double healthPercent = 100.0;
boolean isGameOver = false;

// Updating variables — the old value is overwritten
playerScore = 500;
healthPercent = 73.5;

System.out.println("Score: " + playerScore);
System.out.println("Health: " + healthPercent + "%");
System.out.println("Game Over? " + isGameOver);`,
        language: "java",
        output: `Score: 500
Health: 73.5%
Game Over? false`,
      },
    },
    {
      id: "arithmetic-operators",
      title: "Arithmetic Operators",
      content: `Java can do math! Here are the five arithmetic operators:

| Operator | What it does | Example | Result |
|----------|-------------|---------|--------|
| \`+\` | Addition | \`7 + 3\` | \`10\` |
| \`-\` | Subtraction | \`7 - 3\` | \`4\` |
| \`*\` | Multiplication | \`7 * 3\` | \`21\` |
| \`/\` | Division | \`7 / 3\` | \`2\` ⚠️ |
| \`%\` | Modulo (remainder) | \`7 % 3\` | \`1\` |

**Order of operations** follows standard math rules (PEMDAS):
1. Parentheses \`()\` first
2. Then \`*\`, \`/\`, \`%\` (left to right)
3. Then \`+\`, \`-\` (left to right)

The **modulo operator** (\`%\`) is super useful. It gives you the remainder after division. Some real uses:
- \`number % 2 == 0\` → checks if a number is **even**
- \`totalSeconds % 60\` → gets the **seconds** part of a time
- \`number % 10\` → gets the **last digit** of a number`,
      codeExample: {
        code: `int totalSeconds = 754;

int minutes = totalSeconds / 60;
int seconds = totalSeconds % 60;

System.out.println(minutes + " minutes and " + seconds + " seconds");
// That's 12 minutes and 34 seconds!

int number = 247;
int lastDigit = number % 10;
System.out.println("Last digit of " + number + " is " + lastDigit);`,
        language: "java",
        output: `12 minutes and 34 seconds
Last digit of 247 is 7`,
      },
      miniQuiz: {
        question: "What is the result of `20 % 6`?",
        options: ["3", "2", "3.33", "0"],
        correct: 1,
        explanation:
          "20 ÷ 6 = 3 remainder 2. The modulo operator returns the remainder, so 20 % 6 = 2.",
      },
    },
    {
      id: "integer-division",
      title: "Integer Division — The Sneaky Trap",
      content: `This is the single most common mistake in AP CSA, so pay close attention! 🚨

When you divide two **ints**, Java does **integer division** — it chops off the decimal part. It does NOT round. It just deletes everything after the decimal point.

\`\`\`
7 / 2  →  3      (not 3.5!)
1 / 3  →  0      (not 0.333...!)
99 / 100  →  0   (not 0.99!)
\`\`\`

This is like splitting a pizza: if you have 7 slices for 2 people, each person gets 3 whole slices. Java doesn't do half-slices.

**The trap:** Even if you store the result in a double, the damage is already done!

\`\`\`java
double result = 7 / 2;  // result is 3.0, NOT 3.5!
\`\`\`

Why? Because Java evaluates \`7 / 2\` first (both ints → integer division → 3), and THEN stores that 3 into the double as 3.0.

**The fix:** Make at least one operand a double:
- \`7.0 / 2\` → \`3.5\` ✅
- \`7 / 2.0\` → \`3.5\` ✅
- \`(double) 7 / 2\` → \`3.5\` ✅`,
      codeExample: {
        code: `// The trap in action
double wrong = 7 / 2;
System.out.println("Wrong: " + wrong);

// The fixes
double fix1 = 7.0 / 2;
double fix2 = 7 / 2.0;
double fix3 = (double) 7 / 2;
System.out.println("Fix 1: " + fix1);
System.out.println("Fix 2: " + fix2);
System.out.println("Fix 3: " + fix3);`,
        language: "java",
        output: `Wrong: 3.0
Fix 1: 3.5
Fix 2: 3.5
Fix 3: 3.5`,
      },
      miniQuiz: {
        question: "What is the value of `x` after this code runs?\n```java\ndouble x = 1 / 4;\n```",
        options: ["0.25", "0.0", "0", "1"],
        correct: 1,
        explanation:
          "1 / 4 is integer division (both operands are ints), which gives 0. That 0 is then stored in the double as 0.0. The decimal is lost before it ever reaches the variable!",
      },
    },
    {
      id: "type-casting",
      title: "Type Casting",
      content: `Sometimes you need to convert between types. Java has two kinds of casting:

### Widening (Automatic) — Small → Big
Going from \`int\` to \`double\` is safe because a double can hold any int value. Java does this automatically:
\`\`\`java
int score = 95;
double scoreAsDouble = score;  // Automatic! 95 → 95.0
\`\`\`

Think of it like pouring a small cup of water into a big cup — nothing is lost.

### Narrowing (Manual) — Big → Small
Going from \`double\` to \`int\` is risky because you lose the decimal part. Java makes you do this explicitly with a **cast**:
\`\`\`java
double price = 9.99;
int rounded = (int) price;  // You must write (int)! Result: 9
\`\`\`

This is like pouring a big cup of water into a small cup — some spills out! The decimal part is **truncated** (chopped off), NOT rounded.

**Key AP Exam Detail:** \`(int) 9.99\` is \`9\`, not \`10\`. Casting always truncates toward zero.

Casting is also crucial for fixing integer division:
\`\`\`java
int a = 7, b = 2;
double result = (double) a / b;  // Casts a to 7.0, then 7.0 / 2 = 3.5
\`\`\``,
      codeExample: {
        code: `// Widening: int → double (automatic)
int points = 85;
double pointsDouble = points;
System.out.println(pointsDouble);  // 85.0

// Narrowing: double → int (manual, truncates!)
double temperature = 98.6;
int tempInt = (int) temperature;
System.out.println(tempInt);  // 98 (not 99!)

// Casting to fix integer division
int totalPoints = 37;
int numTests = 4;
double average = (double) totalPoints / numTests;
System.out.println(average);  // 9.25`,
        language: "java",
        output: `85.0
98
9.25`,
      },
    },
    {
      id: "compound-assignment",
      title: "Compound Assignment Operators",
      content: `Writing \`score = score + 10\` works, but Java gives you a shortcut:

| Long version | Shortcut | What it does |
|-------------|----------|-------------|
| \`x = x + 5\` | \`x += 5\` | Add 5 to x |
| \`x = x - 3\` | \`x -= 3\` | Subtract 3 from x |
| \`x = x * 2\` | \`x *= 2\` | Multiply x by 2 |
| \`x = x / 4\` | \`x /= 4\` | Divide x by 4 |
| \`x = x % 3\` | \`x %= 3\` | Set x to x mod 3 |

These do **exactly** the same thing as the long version — they're just cleaner to write. Think of it like texting: "on my way" vs "omw." Same meaning, less typing.

You'll also see the **increment** and **decrement** operators:
- \`x++\` means \`x += 1\` (add 1)
- \`x--\` means \`x -= 1\` (subtract 1)

These show up ALL the time in loops (which you'll learn in a later unit).`,
      codeExample: {
        code: `int health = 100;

health -= 25;   // Took damage! 100 - 25 = 75
System.out.println("After hit: " + health);

health += 10;   // Found a health pack! 75 + 10 = 85
System.out.println("After heal: " + health);

health *= 2;    // Power-up doubles health! 85 * 2 = 170
System.out.println("After power-up: " + health);

int coins = 0;
coins++;        // Picked up a coin!
coins++;        // Another one!
coins++;        // And another!
System.out.println("Coins: " + coins);`,
        language: "java",
        output: `After hit: 75
After heal: 85
After power-up: 170
Coins: 3`,
      },
      miniQuiz: {
        question:
          "What is the value of `n` after this code?\n```java\nint n = 10;\nn %= 3;\nn += 5;\n```",
        options: ["6", "5", "1", "8"],
        correct: 0,
        explanation:
          "First, n %= 3 sets n to 10 % 3 = 1 (remainder of 10 ÷ 3). Then n += 5 sets n to 1 + 5 = 6.",
      },
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes & Tips",
      content: `Here are the mistakes that haunt AP CSA students every year. Learn them now and save yourself on the exam! 🎯

### Mistake 1: Integer Division Surprise
\`\`\`java
double half = 1 / 2;  // half is 0.0, NOT 0.5!
\`\`\`
**Fix:** Use \`1.0 / 2\` or \`(double) 1 / 2\`.

### Mistake 2: Using \`=\` Instead of \`==\`
\`\`\`java
// WRONG — this assigns, not compares!
if (x = 5) { ... }

// RIGHT — this compares
if (x == 5) { ... }
\`\`\`
Single \`=\` means "store this value." Double \`==\` means "are these equal?"

### Mistake 3: Thinking Casting Rounds
\`\`\`java
int x = (int) 3.99;  // x is 3, NOT 4!
\`\`\`
Casting **truncates** (chops the decimal). It never rounds up.

### Mistake 4: Integer Overflow
An \`int\` can hold values from about -2.1 billion to +2.1 billion. Go past that, and it wraps around to a negative number silently. Java won't warn you!

### Mistake 5: Forgetting to Initialize
\`\`\`java
int score;
System.out.println(score);  // ERROR! score has no value yet
\`\`\`
Local variables MUST be initialized before use.

### Pro Tips for the AP Exam 💡
- When you see division on the exam, **immediately** check: are both operands ints?
- Trace through code **one line at a time** — don't try to do it in your head all at once.
- Write down variable values as they change. Literally make a table.
- When in doubt about order of operations, **add parentheses** in your code to make it clear.`,
      codeExample: {
        code: `// A tracing example — practice this technique!
int a = 10;       // a = 10
int b = 3;        // b = 3
a = a + b;        // a = 13, b = 3
b = a - b;        // a = 13, b = 10
a = a - b;        // a = 3,  b = 10
// Wait... we just swapped a and b without a temp variable! 🤯

System.out.println("a = " + a);
System.out.println("b = " + b);`,
        language: "java",
        output: `a = 3
b = 10`,
      },
    },
  ],
};
