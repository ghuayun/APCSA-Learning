import { LessonSection } from "./unit-1-lesson";

export const unit3Lesson: { title: string; sections: LessonSection[] } = {
  title: "Boolean Expressions & if Statements",
  sections: [
    {
      id: "why-booleans-matter",
      title: "Why Booleans Matter",
      content: `Every app you use makes decisions constantly. Should this notification show up? Did you enter the right password? Is your health low enough to show a warning? Can you afford that in-game item?

All of these decisions boil down to one thing: **true or false**.

**Boolean expressions** are questions your program asks that have a yes/no answer. **if statements** are how your program acts on those answers. Without them, your program would do the exact same thing every single time — no matter what. Imagine a game where you can't die, can't level up, and every enemy does the same thing. Boring, right?

Conditionals are what make programs **smart**. They let your code:
- React differently based on user input
- Handle errors gracefully
- Make decisions without you being there

Think of it like this: primitives and math are the **muscles** of your program. Booleans and if statements are the **brain**. 🧠

Let's teach your code to think.`,
    },
    {
      id: "comparison-operators",
      title: "Comparison Operators",
      content: `Comparison operators compare two values and return a boolean (\`true\` or \`false\`):

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`==\` | Equal to | \`5 == 5\` | \`true\` |
| \`!=\` | Not equal to | \`5 != 3\` | \`true\` |
| \`<\` | Less than | \`3 < 7\` | \`true\` |
| \`>\` | Greater than | \`3 > 7\` | \`false\` |
| \`<=\` | Less than or equal | \`5 <= 5\` | \`true\` |
| \`>=\` | Greater than or equal | \`10 >= 20\` | \`false\` |

These work with all numeric types (\`int\`, \`double\`).

**⚠️ Critical warning for Strings and objects:**
- \`==\` checks if two variables point to the **same object in memory** (same address)
- \`.equals()\` checks if two objects have the **same content** (same text)

For primitives (\`int\`, \`double\`), \`==\` works perfectly. For objects (like \`String\`), ALWAYS use \`.equals()\` to compare content!

\`\`\`java
String a = new String("hello");
String b = new String("hello");
a == b       // false! (different objects in memory)
a.equals(b)  // true!  (same content)
\`\`\`

Think of \`==\` as asking "Are these the same house?" and \`.equals()\` as asking "Do these houses look identical?"`,
      codeExample: {
        code: `int playerHP = 75;
int maxHP = 100;

System.out.println(playerHP == maxHP);   // false
System.out.println(playerHP != maxHP);   // true
System.out.println(playerHP < maxHP);    // true
System.out.println(playerHP >= 50);      // true

// String comparison — use .equals(), NOT ==
String input = "yes";
System.out.println(input.equals("yes"));   // true (correct way!)
System.out.println(input.equals("Yes"));   // false (case-sensitive)

// Comparing doubles — watch for floating-point issues
double result = 0.1 + 0.2;
System.out.println(result == 0.3);  // false! (floating-point precision)
System.out.println(Math.abs(result - 0.3) < 0.0001);  // true (safe way)`,
        language: "java",
        output: `false
true
true
true
true
false
false
true`,
      },
      miniQuiz: {
        question:
          "How should you compare two String variables `s1` and `s2` to check if they contain the same text?",
        options: ["s1 == s2", "s1.equals(s2)", "s1.compareTo(s2)", "s1 = s2"],
        correct: 1,
        explanation:
          "Always use .equals() to compare String content. == compares memory addresses (whether they're the same object), which might give false even if the Strings contain the same text. compareTo() returns an int (not a boolean), and = is assignment, not comparison.",
      },
    },
    {
      id: "boolean-operators",
      title: "Boolean Operators (AND, OR, NOT)",
      content: `You can combine boolean expressions to ask more complex questions using three logical operators:

### AND (\`&&\`) — Both Must Be True
Like needing both a ticket AND an ID to enter a concert:
\`\`\`java
boolean hasTicket = true;
boolean hasID = true;
boolean canEnter = hasTicket && hasID;  // true (both are true)
\`\`\`

| A | B | A && B |
|---|---|--------|
| true | true | **true** |
| true | false | false |
| false | true | false |
| false | false | false |

### OR (\`||\`) — At Least One Must Be True
Like being able to pay with cash OR card:
\`\`\`java
boolean hasCash = false;
boolean hasCard = true;
boolean canPay = hasCash || hasCard;  // true (one is true)
\`\`\`

| A | B | A \\|\\| B |
|---|---|--------|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

### NOT (\`!\`) — Flips the Value
Like a light switch — true becomes false, false becomes true:
\`\`\`java
boolean isRaining = true;
boolean isSunny = !isRaining;  // false
\`\`\`

**Short-circuit evaluation:** Java is lazy (in a good way)! With \`&&\`, if the left side is false, Java doesn't even check the right side — it already knows the result is false. With \`||\`, if the left side is true, Java skips the right side. This matters when the right side could cause an error!`,
      codeExample: {
        code: `int age = 16;
boolean hasPermit = true;
boolean hasLicense = false;

// AND: both conditions must be true
boolean canDrive = age >= 16 && (hasPermit || hasLicense);
System.out.println("Can drive: " + canDrive);  // true

// OR: at least one condition must be true
boolean isWeekend = false;
boolean isHoliday = true;
boolean dayOff = isWeekend || isHoliday;
System.out.println("Day off: " + dayOff);  // true

// NOT: flip the value
boolean isLoggedIn = false;
System.out.println("Show login button: " + !isLoggedIn);  // true

// Short-circuit in action (safe null check)
String name = null;
boolean safe = (name != null) && (name.length() > 0);
System.out.println("Is safe: " + safe);  // false (no crash!)`,
        language: "java",
        output: `Can drive: true
Day off: true
Show login button: true
Is safe: false`,
      },
    },
    {
      id: "if-statements",
      title: "if Statements — Making Decisions",
      content: `An \`if\` statement is like a bouncer at a club: it checks a condition, and only lets the code inside run if the condition is true.

\`\`\`java
if (condition) {
    // this code runs ONLY if condition is true
}
\`\`\`

Think of the curly braces \`{}\` as the VIP room. The condition is the bouncer. If the condition is true, you're in. If it's false, Java skips right past the entire block.

**Important:** The condition MUST be a boolean expression (something that evaluates to true or false). Unlike some languages, you can't use numbers as conditions in Java:

\`\`\`java
if (1) { ... }       // ERROR! 1 is not a boolean
if (true) { ... }    // OK!
if (x > 5) { ... }   // OK! x > 5 evaluates to true or false
\`\`\`

**Style tip:** ALWAYS use curly braces, even for single-line if statements. While Java allows you to skip them for one-liners, it's a common source of bugs:

\`\`\`java
// BAD — adding a second line later could break things
if (score > 100)
    System.out.println("High score!");

// GOOD — always clear where the if block begins and ends
if (score > 100) {
    System.out.println("High score!");
}
\`\`\``,
      codeExample: {
        code: `int temperature = 95;

if (temperature > 90) {
    System.out.println("It's hot! Stay hydrated! 🥵");
}

if (temperature < 32) {
    System.out.println("It's freezing! Wear a jacket! 🥶");
}

// The second if doesn't print because 95 is not < 32
// Each if is checked independently

int balance = 50;
int price = 30;

if (balance >= price) {
    balance -= price;
    System.out.println("Purchase complete!");
    System.out.println("Remaining balance: $" + balance);
}`,
        language: "java",
        output: `It's hot! Stay hydrated! 🥵
Purchase complete!
Remaining balance: $20`,
      },
    },
    {
      id: "if-else-chains",
      title: "if-else and else-if Chains",
      content: `Sometimes you want to do one thing if a condition is true and something ELSE if it's false. That's what \`if-else\` is for:

\`\`\`java
if (condition) {
    // runs if true
} else {
    // runs if false
}
\`\`\`

And when you have multiple options, you chain them with \`else if\`:

\`\`\`java
if (condition1) {
    // runs if condition1 is true
} else if (condition2) {
    // runs if condition1 is false AND condition2 is true
} else if (condition3) {
    // runs if all above are false AND condition3 is true
} else {
    // runs if ALL conditions above are false
}
\`\`\`

**Key rule:** In an if-else-if chain, Java evaluates conditions **top to bottom** and runs ONLY the **first** block whose condition is true. Then it **skips the rest**. This is different from having multiple separate if statements!

\`\`\`java
// DIFFERENT BEHAVIOR:
// Multiple ifs — each is checked independently
if (x > 0) { ... }
if (x > 5) { ... }   // this ALSO runs if x is 10

// if-else-if — only the FIRST true block runs
if (x > 5) { ... }
else if (x > 0) { ... }   // this is SKIPPED if x > 5 was true
\`\`\`

Think of it like exits on a highway — you take the first exit that matches your destination and skip all the rest.`,
      codeExample: {
        code: `int score = 87;

// if-else-if chain — only ONE block executes
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");  // this one runs!
} else if (score >= 70) {
    System.out.println("Grade: C");
} else if (score >= 60) {
    System.out.println("Grade: D");
} else {
    System.out.println("Grade: F");
}

// Simple if-else
boolean isRaining = true;
if (isRaining) {
    System.out.println("Bring an umbrella ☔");
} else {
    System.out.println("Enjoy the sunshine ☀️");
}`,
        language: "java",
        output: `Grade: B
Bring an umbrella ☔`,
      },
      miniQuiz: {
        question:
          "In an if-else-if chain, how many blocks of code can execute?",
        options: [
          "All blocks where the condition is true",
          "Exactly one block (the first true condition, or the else)",
          "At most two blocks",
          "It depends on the conditions"
        ],
        correct: 1,
        explanation:
          "In an if-else-if chain, Java finds the FIRST true condition, runs that block, and skips ALL remaining blocks — including the else. At most one block executes.",
      },
    },
    {
      id: "de-morgans-laws",
      title: "De Morgan's Laws (the NOT Distributor)",
      content: `**De Morgan's Laws** tell you what happens when you negate (NOT) a compound boolean expression. They come up on almost every AP exam.

The rules are simple:
1. **\`!(A && B)\`  →  \`!A || !B\`** — NOT distributes and flips AND to OR
2. **\`!(A || B)\`  →  \`!A && !B\`** — NOT distributes and flips OR to AND

Think of it like a vending machine. "NOT (has dollar AND has quarters)" means "doesn't have a dollar OR doesn't have quarters." If either form of payment is missing, the whole thing fails.

**Memory trick:** When NOT goes through the door, it:
1. **Flips each condition** (true ↔ false)
2. **Flips the operator** (&& ↔ ||)

**Real-world example:**
- "It's NOT true that I'm hungry AND tired" = "I'm NOT hungry OR I'm NOT tired" (at least one isn't true)
- "It's NOT true that I'm hungry OR tired" = "I'm NOT hungry AND I'm NOT tired" (neither is true)

**Why this matters on the AP exam:**
The exam LOVES to give you a complex expression and ask you to simplify it using De Morgan's Laws, or ask which expression is equivalent.`,
      codeExample: {
        code: `boolean isSunny = true;
boolean isWarm = false;

// Original expression
boolean goOutside = isSunny && isWarm;
System.out.println("Go outside? " + goOutside);       // false

// Negation using De Morgan's Law
// !(isSunny && isWarm) is the same as !isSunny || !isWarm
boolean stayIn1 = !(isSunny && isWarm);
boolean stayIn2 = !isSunny || !isWarm;
System.out.println("Stay in (v1)? " + stayIn1);       // true
System.out.println("Stay in (v2)? " + stayIn2);       // true
System.out.println("Both equal? " + (stayIn1 == stayIn2)); // true

// Another example: "not between 1 and 10"
int x = 15;
boolean notInRange1 = !(x >= 1 && x <= 10);
boolean notInRange2 = x < 1 || x > 10;
System.out.println("Not in range: " + notInRange1);    // true
System.out.println("Same result: " + notInRange2);     // true`,
        language: "java",
        output: `Go outside? false
Stay in (v1)? true
Stay in (v2)? true
Both equal? true
Not in range: true
Same result: true`,
      },
      miniQuiz: {
        question:
          "Which expression is equivalent to `!(a > 5 || b < 3)`?",
        options: [
          "a > 5 && b < 3",
          "a <= 5 && b >= 3",
          "a <= 5 || b >= 3",
          "!(a > 5) || !(b < 3)"
        ],
        correct: 1,
        explanation:
          "By De Morgan's Law: !(A || B) = !A && !B. So !(a > 5 || b < 3) becomes !(a > 5) && !(b < 3), which simplifies to a <= 5 && b >= 3. The NOT flips both the operator (|| to &&) and each condition.",
      },
    },
    {
      id: "nested-conditionals",
      title: "Nested Conditionals",
      content: `You can put an if statement **inside** another if statement. This is called **nesting**, and it's useful when one decision depends on another.

\`\`\`java
if (outerCondition) {
    if (innerCondition) {
        // runs only if BOTH conditions are true
    }
}
\`\`\`

This is logically the same as \`outerCondition && innerCondition\`, but nesting can make the logic clearer when the conditions are complex or when you need different else blocks at each level.

**When to nest vs. when to use &&:**
- Use \`&&\` for simple combinations: \`if (age >= 18 && hasID)\`
- Use nesting when the else blocks need to be different:

\`\`\`java
if (hasAccount) {
    if (passwordCorrect) {
        // login
    } else {
        // wrong password message
    }
} else {
    // account not found message
}
\`\`\`

With a flat \`&&\`, you can't give different error messages.

**Warning:** Don't nest too deep! If you have more than 2-3 levels of nesting, your code becomes hard to read. In the industry, this is called "pyramid of doom" or "arrow code." Try to simplify with &&, || or early returns.`,
      codeExample: {
        code: `int age = 20;
boolean isStudent = true;
double ticketPrice;

// Nested if to determine ticket price
if (age < 12) {
    ticketPrice = 5.00;     // child price
} else if (age >= 65) {
    ticketPrice = 7.00;     // senior price
} else {
    // Adult pricing — but students get a discount
    if (isStudent) {
        ticketPrice = 8.00;  // student discount
    } else {
        ticketPrice = 12.00; // full adult price
    }
}

System.out.println("Ticket price: $" + ticketPrice);

// Same logic flattened with &&
String category;
if (age < 12) {
    category = "Child";
} else if (age >= 65) {
    category = "Senior";
} else if (isStudent) {
    category = "Student";
} else {
    category = "Adult";
}
System.out.println("Category: " + category);`,
        language: "java",
        output: `Ticket price: $8.0
Category: Student`,
      },
    },
    {
      id: "common-boolean-mistakes",
      title: "Common Boolean Mistakes",
      content: `These mistakes show up on the AP exam every year. Learn them now and you'll avoid losing easy points! 🎯

### Mistake 1: Using == Instead of .equals() for Strings
\`\`\`java
String a = new String("hi");
String b = new String("hi");
if (a == b) { ... }       // WRONG — compares memory addresses
if (a.equals(b)) { ... }  // RIGHT — compares content
\`\`\`

### Mistake 2: Confusing = and ==
\`\`\`java
if (x = 5) { ... }   // WRONG — this assigns 5 to x!
if (x == 5) { ... }  // RIGHT — this checks if x equals 5
\`\`\`
Java will catch this with a compiler error (since \`x = 5\` returns an int, not a boolean), but it's still a conceptual trap.

### Mistake 3: Redundant Boolean Comparisons
\`\`\`java
if (isReady == true) { ... }  // Redundant — isReady is already a boolean!
if (isReady) { ... }          // Clean and correct

if (isDone == false) { ... }  // Redundant
if (!isDone) { ... }          // Clean and correct
\`\`\`

### Mistake 4: Forgetting Short-Circuit Order
\`\`\`java
// DANGEROUS — crashes if name is null
if (name.length() > 0 && name != null) { ... }

// SAFE — checks null first, short-circuits if null
if (name != null && name.length() > 0) { ... }
\`\`\`

### Mistake 5: Wrong De Morgan's Application
\`\`\`java
// WRONG — forgot to flip the operator!
!(a && b)  ≠  !a && !b

// RIGHT — flip both conditions AND the operator
!(a && b)  =  !a || !b
\`\`\`

### Pro Tips for the AP Exam 💡
- When you see a complex boolean expression, build a truth table.
- Check for De Morgan's Laws on every "which is equivalent" question.
- Remember: \`.equals()\` for Strings, \`==\` for primitives.
- Read nested ifs from the **outside in** — handle the outer condition first.`,
      codeExample: {
        code: `// Mistake 1 demo: == vs .equals()
String s1 = "hello";
String s2 = "hel" + "lo";  // compiler may optimize this
String s3 = new String("hello");

// These might surprise you:
System.out.println(s1.equals(s3));  // true  (same content)
System.out.println(s1 == s3);      // false (different objects)

// Mistake 3 demo: redundant comparisons
boolean loggedIn = true;

// Don't write this:
if (loggedIn == true) {
    System.out.println("Redundant but works");
}

// Write this instead:
if (loggedIn) {
    System.out.println("Clean and correct!");
}`,
        language: "java",
        output: `true
false
Redundant but works
Clean and correct!`,
      },
    },
  ],
};
