import { LessonSection } from "./unit-1-lesson";

export const unit4Lesson: { title: string; sections: LessonSection[] } = {
  title: "Iteration",
  sections: [
    {
      id: "why-loops-matter",
      title: "Why Loops Matter",
      content: `Imagine you're building a social media app and you need to display 100 posts. Would you really write \`System.out.println(post1)\`, \`System.out.println(post2)\`, ... 100 times? That would be insane. 😵

**Loops** let you repeat code automatically. They're the "copy machine" of programming — write the instructions once, and the loop runs them as many times as you need.

Here's where loops show up in real life:
- **Games:** Every frame of a game is one iteration of a "game loop" running 60 times per second
- **Social media:** Scrolling through your feed? That's a loop displaying each post
- **Music:** Spotify's shuffle? That's a loop going through every song in your playlist
- **Search:** Finding a word in a document? Loop through every character

In this unit, you'll learn two types of loops:
- **while loops** — keep going WHILE a condition is true (like waiting for a download to finish)
- **for loops** — repeat a specific number of times (like counting to 10)

These are the workhorses of programming. Master them, and you can make your code do incredible things. Let's loop in! 🔄`,
    },
    {
      id: "while-loops",
      title: "while Loops",
      content: `A \`while\` loop keeps running **as long as** its condition is true. It checks the condition BEFORE each iteration:

\`\`\`java
while (condition) {
    // code that repeats
    // something here should eventually make the condition false!
}
\`\`\`

Think of it like a bouncer at a revolving door: before each spin, the bouncer checks "Should I let them keep going?" If yes, another spin. If no, you're out.

**How it works, step by step:**
1. Check the condition
2. If true → run the body, then go back to step 1
3. If false → skip the body and continue after the loop

**Critical rule:** Something inside the loop MUST eventually make the condition false. Otherwise, you get an **infinite loop** — your program runs forever and crashes! 💀

\`\`\`java
// INFINITE LOOP — DON'T DO THIS!
int x = 5;
while (x > 0) {
    System.out.println(x);
    // Forgot to decrease x! It's always 5, always > 0
}
\`\`\`

**When to use while loops:**
- When you don't know in advance how many times to loop
- When the loop depends on a condition that changes unpredictably
- Examples: reading user input until they type "quit", searching for a value`,
      codeExample: {
        code: `// Countdown timer
int seconds = 5;
while (seconds > 0) {
    System.out.println(seconds + "...");
    seconds--;  // CRUCIAL: makes the condition eventually false
}
System.out.println("Liftoff! 🚀");

// Finding how many times you can halve a number
int number = 100;
int halves = 0;
while (number > 1) {
    number /= 2;
    halves++;
}
System.out.println("Halved " + halves + " times");`,
        language: "java",
        output: `5...
4...
3...
2...
1...
Liftoff! 🚀
Halved 6 times`,
      },
      miniQuiz: {
        question:
          "What is the value of `x` after this loop?\n```java\nint x = 1;\nwhile (x < 100) {\n    x *= 2;\n}\n```",
        options: ["64", "128", "100", "256"],
        correct: 1,
        explanation:
          "Trace it: x = 1, 2, 4, 8, 16, 32, 64, 128. When x is 64, 64 < 100 is true, so x becomes 128. Then 128 < 100 is false, so the loop stops. x = 128.",
      },
    },
    {
      id: "for-loops",
      title: "for Loops",
      content: `A \`for\` loop is a more compact way to loop when you know how many iterations you need. It packs the initialization, condition, and update all into one line:

\`\`\`java
for (initialization; condition; update) {
    // code that repeats
}
\`\`\`

Breaking it down:
- **Initialization:** Sets up the loop variable (runs ONCE at the start)
- **Condition:** Checked BEFORE each iteration (loop continues while true)
- **Update:** Runs AFTER each iteration (usually increments the counter)

\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// Prints: 0, 1, 2, 3, 4
\`\`\`

**The execution order:**
1. \`int i = 0\` — initialize (once)
2. \`i < 5\` — check condition → true? run body. false? exit loop.
3. Run the body
4. \`i++\` — update
5. Go back to step 2

**Common patterns:**
- Count from 0 to n-1: \`for (int i = 0; i < n; i++)\`
- Count from 1 to n: \`for (int i = 1; i <= n; i++)\`
- Count backwards: \`for (int i = n; i > 0; i--)\`
- Count by 2s: \`for (int i = 0; i < n; i += 2)\`

**for vs while:** Any for loop can be rewritten as a while loop and vice versa. Use for when you have a clear counter, and while when looping until a condition changes.`,
      codeExample: {
        code: `// Classic: print numbers 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}
System.out.println();  // new line

// Counting by 3s
for (int i = 0; i <= 15; i += 3) {
    System.out.print(i + " ");
}
System.out.println();

// Countdown
for (int i = 10; i >= 1; i--) {
    System.out.print(i + " ");
}
System.out.println();

// Sum of 1 to 100 (Gauss would be proud)
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
System.out.println("Sum of 1-100: " + sum);`,
        language: "java",
        output: `1 2 3 4 5 
0 3 6 9 12 15 
10 9 8 7 6 5 4 3 2 1 
Sum of 1-100: 5050`,
      },
      miniQuiz: {
        question:
          "How many times does this loop execute?\n```java\nfor (int i = 3; i <= 9; i += 2) {\n    System.out.println(i);\n}\n```",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation:
          "i starts at 3 and goes up by 2: i = 3 (print), 5 (print), 7 (print), 9 (print), 11 (stop, 11 <= 9 is false). That's 4 iterations, printing 3, 5, 7, 9.",
      },
    },
    {
      id: "loop-tracing",
      title: "Loop Tracing (Step by Step)",
      content: `**Loop tracing** is the #1 skill for the AP exam's loop questions. You need to manually simulate the computer running each iteration, tracking how variables change.

Here's the technique:

1. Make a table with columns for each variable and the output
2. Fill in the initial values
3. For each iteration: check the condition, update variables, note any output
4. Stop when the condition is false

**Example trace:**
\`\`\`java
int x = 2;
int y = 0;
while (x < 10) {
    y += x;
    x *= 2;
}
System.out.println(x + " " + y);
\`\`\`

| Iteration | x (start) | Condition | y after \`y += x\` | x after \`x *= 2\` |
|-----------|-----------|-----------|------------------|-------------------|
| 1 | 2 | 2 < 10 ✓ | 0 + 2 = 2 | 2 * 2 = 4 |
| 2 | 4 | 4 < 10 ✓ | 2 + 4 = 6 | 4 * 2 = 8 |
| 3 | 8 | 8 < 10 ✓ | 6 + 8 = 14 | 8 * 2 = 16 |
| 4 | 16 | 16 < 10 ✗ | — | — |

Output: \`16 14\`

**Pro tip:** On the AP exam, you don't have time to trace every iteration of a 100-iteration loop. Instead:
- Trace the first 2-3 iterations to spot the pattern
- Then jump to the end
- For sums, look for well-known formulas (like n(n+1)/2)`,
      codeExample: {
        code: `// Trace this code — predict the output before running it!
int a = 1;
int b = 1;
int count = 0;

while (b < 20) {
    int temp = b;
    b = a + b;
    a = temp;
    count++;
}

// What are a, b, and count?
System.out.println("a = " + a);
System.out.println("b = " + b);
System.out.println("count = " + count);

// Trace table:
// Start: a=1, b=1
// Iter 1: temp=1, b=1+1=2, a=1     → a=1, b=2
// Iter 2: temp=2, b=1+2=3, a=2     → a=2, b=3
// Iter 3: temp=3, b=2+3=5, a=3     → a=3, b=5
// Iter 4: temp=5, b=3+5=8, a=5     → a=5, b=8
// Iter 5: temp=8, b=5+8=13, a=8    → a=8, b=13
// Iter 6: temp=13, b=8+13=21, a=13 → a=13, b=21
// b=21 >= 20, loop stops. It's the Fibonacci sequence!`,
        language: "java",
        output: `a = 13
b = 21
count = 6`,
      },
    },
    {
      id: "nested-loops",
      title: "Nested Loops",
      content: `A **nested loop** is a loop inside another loop. The inner loop runs completely for EVERY iteration of the outer loop.

Think of it like a clock:
- The **minute hand** (inner loop) goes around 60 times for every 1 tick of the **hour hand** (outer loop)
- If the hour hand goes 1-12 and the minute hand goes 0-59, you get 12 × 60 = 720 total "ticks"

\`\`\`java
for (int i = 0; i < 3; i++) {       // outer: runs 3 times
    for (int j = 0; j < 4; j++) {   // inner: runs 4 times PER outer
        System.out.print("* ");
    }
    System.out.println();  // new line after each row
}
\`\`\`

This prints a 3×4 grid of stars. Total iterations: 3 × 4 = 12.

**How to think about nested loops:**
- The **outer loop** controls the ROWS
- The **inner loop** controls the COLUMNS (or items within each row)
- The inner loop **resets** every time the outer loop starts a new iteration

**Common uses:**
- Printing patterns and grids
- Searching 2D data (like a spreadsheet)
- Comparing every pair of items (like finding duplicates)

**Performance warning:** Nested loops multiply. A loop of 1000 inside a loop of 1000 = 1,000,000 iterations. Three levels of nesting with 100 each = 1,000,000. Be careful with large inputs!`,
      codeExample: {
        code: `// Multiplication table (3x3)
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print(i * j + "\t");
    }
    System.out.println();
}

System.out.println("---");

// Right triangle pattern
for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("# ");
    }
    System.out.println();
}`,
        language: "java",
        output: `1\t2\t3\t
2\t4\t6\t
3\t6\t9\t
---
# 
# # 
# # # 
# # # # 
# # # # # `,
      },
      miniQuiz: {
        question:
          "How many times does the inner print execute?\n```java\nfor (int i = 0; i < 4; i++) {\n    for (int j = 0; j < 3; j++) {\n        System.out.print(\"X\");\n    }\n}\n```",
        options: ["3", "4", "7", "12"],
        correct: 3,
        explanation:
          "The outer loop runs 4 times. For each outer iteration, the inner loop runs 3 times. Total = 4 × 3 = 12. Nested loops multiply their iteration counts!",
      },
    },
    {
      id: "common-loop-patterns",
      title: "Common Loop Patterns",
      content: `Most loops fall into a few common patterns. Recognizing them is like having cheat codes for the AP exam:

### 1. Accumulator Pattern
Builds up a result by adding to it each iteration:
\`\`\`java
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;  // add each number to the running total
}
// sum = 55 (1+2+3+...+10)
\`\`\`

### 2. Counter Pattern
Counts how many items meet a condition:
\`\`\`java
int count = 0;
for (int i = 1; i <= 100; i++) {
    if (i % 7 == 0) {
        count++;  // count multiples of 7
    }
}
// count = 14
\`\`\`

### 3. Min/Max Pattern
Finds the smallest or largest value:
\`\`\`java
int max = Integer.MIN_VALUE;
// loop through values...
if (current > max) {
    max = current;
}
\`\`\`

### 4. Sentinel Pattern
Loops until a special "stop" value is encountered:
\`\`\`java
while (input != -1) {
    // process input
    // get next input
}
\`\`\`

### 5. Flag Pattern
Uses a boolean to track if something was found:
\`\`\`java
boolean found = false;
for (int i = 0; i < data.length; i++) {
    if (data[i] == target) {
        found = true;
    }
}
\`\`\`

These patterns appear EVERYWHERE. Once you recognize them, loops become much less intimidating.`,
      codeExample: {
        code: `// Accumulator: sum of even numbers from 2 to 20
int sum = 0;
for (int i = 2; i <= 20; i += 2) {
    sum += i;
}
System.out.println("Sum of evens: " + sum);

// Counter: how many numbers from 1-50 are divisible by 3 or 5?
int count = 0;
for (int i = 1; i <= 50; i++) {
    if (i % 3 == 0 || i % 5 == 0) {
        count++;
    }
}
System.out.println("Divisible by 3 or 5: " + count);

// Combining patterns: find the largest digit in a number
int number = 83927;
int maxDigit = 0;
int temp = number;
while (temp > 0) {
    int digit = temp % 10;
    if (digit > maxDigit) {
        maxDigit = digit;
    }
    temp /= 10;
}
System.out.println("Largest digit in " + number + ": " + maxDigit);`,
        language: "java",
        output: `Sum of evens: 110
Divisible by 3 or 5: 23
Largest digit in 83927: 9`,
      },
    },
    {
      id: "string-traversal",
      title: "String Traversal with Loops",
      content: `One of the most common uses of loops is going through a String character by character. This is called **string traversal**, and it's a huge topic on the AP exam.

The basic pattern:
\`\`\`java
String word = "Hello";
for (int i = 0; i < word.length(); i++) {
    String ch = word.substring(i, i + 1);
    // do something with ch
}
\`\`\`

**Key details:**
- Start at index \`0\` (first character)
- End at index \`word.length() - 1\` (last character)
- Use \`i < word.length()\` (NOT \`<=\`) to avoid going out of bounds
- Use \`substring(i, i + 1)\` to get each character as a String

**Common string traversal tasks:**
- **Count specific characters:** How many vowels? How many spaces?
- **Build a new string:** Reverse, encrypt, filter characters
- **Search:** Find the first/last occurrence of something
- **Validate:** Check if every character meets a condition

**Why substring(i, i + 1) instead of charAt(i)?**
Both work, but \`substring\` returns a String, which you can use with \`.equals()\`. The AP exam uses \`substring\` more often. \`charAt(i)\` returns a \`char\` (a primitive), which you compare with \`==\`.`,
      codeExample: {
        code: `String message = "Hello World";

// Count vowels
int vowelCount = 0;
for (int i = 0; i < message.length(); i++) {
    String ch = message.substring(i, i + 1).toLowerCase();
    if (ch.equals("a") || ch.equals("e") || ch.equals("i") 
        || ch.equals("o") || ch.equals("u")) {
        vowelCount++;
    }
}
System.out.println("Vowels: " + vowelCount);

// Reverse a string
String reversed = "";
for (int i = message.length() - 1; i >= 0; i--) {
    reversed += message.substring(i, i + 1);
}
System.out.println("Reversed: " + reversed);

// Replace all spaces with dashes
String dashed = "";
for (int i = 0; i < message.length(); i++) {
    String ch = message.substring(i, i + 1);
    if (ch.equals(" ")) {
        dashed += "-";
    } else {
        dashed += ch;
    }
}
System.out.println("Dashed: " + dashed);`,
        language: "java",
        output: `Vowels: 3
Reversed: dlroW olleH
Dashed: Hello-World`,
      },
      miniQuiz: {
        question:
          "What is the correct loop condition to traverse every character in a String `s`?",
        options: [
          "for (int i = 0; i <= s.length(); i++)",
          "for (int i = 0; i < s.length(); i++)",
          "for (int i = 1; i < s.length(); i++)",
          "for (int i = 0; i < s.length() - 1; i++)"
        ],
        correct: 1,
        explanation:
          "String indices go from 0 to length()-1. Using i < s.length() visits every character. Option A goes one too far (StringIndexOutOfBoundsException). Option C skips index 0. Option D skips the last character.",
      },
    },
    {
      id: "infinite-loops-off-by-one",
      title: "Infinite Loops & Off-by-One Errors",
      content: `These are the two most common loop bugs. Learn to spot them and you'll save yourself on the AP exam!

### Infinite Loops 💀
An infinite loop runs forever because the condition never becomes false:

\`\`\`java
// Bug: forgot to update i
int i = 0;
while (i < 10) {
    System.out.println(i);
    // missing i++!
}

// Bug: updating in the wrong direction
for (int j = 0; j < 10; j--) {  // j goes negative, never reaches 10
    System.out.println(j);
}

// Bug: condition can never be false
int x = 1;
while (x != 10) {
    x += 3;  // x goes 1, 4, 7, 10 — OK this one works!
    // But what if it was x += 4? Then: 1, 5, 9, 13... skips 10!
}
\`\`\`

**How to prevent:** Always verify that your loop variable moves TOWARD making the condition false.

### Off-by-One Errors (OBOE) 🎯
The most common mistake in all of programming! You loop one time too many or one time too few:

\`\`\`java
// Printing 1 to 10
for (int i = 1; i <= 10; i++)  // ✅ Correct: 1,2,...,10
for (int i = 1; i < 10; i++)   // ❌ Only goes to 9!
for (int i = 0; i < 10; i++)   // ❌ Goes 0 to 9 (10 iterations, but wrong values)
\`\`\`

**Rule of thumb:**
- Use \`< n\` when starting from 0 (gives n iterations: 0 to n-1)
- Use \`<= n\` when starting from 1 (gives n iterations: 1 to n)
- When in doubt, trace the first and last iteration!

### Pro Tips for the AP Exam 💡
- Always check: does the loop run **zero** times if the condition is initially false?
- Always check: what is the value of the loop variable **after** the loop ends?
- Fencepost problem: "How many fence sections between 5 posts?" Answer: 4, not 5.`,
      codeExample: {
        code: `// Off-by-one demo: counting fence posts vs sections
int posts = 5;
int sections = posts - 1;
System.out.println(posts + " posts, " + sections + " sections");

// Tricky: what does the loop variable equal AFTER the loop?
int i;
for (i = 0; i < 5; i++) {
    // loop body
}
System.out.println("i after loop: " + i);  // 5, not 4!

// Another gotcha: the loop that runs zero times
int start = 10;
int end = 5;
int count = 0;
for (int j = start; j < end; j++) {
    count++;
}
System.out.println("Iterations: " + count);  // 0! (10 < 5 is false immediately)

// Correct way to loop from end to start when end < start
count = 0;
for (int j = start; j > end; j--) {
    count++;
}
System.out.println("Backwards iterations: " + count);  // 5 (10,9,8,7,6)`,
        language: "java",
        output: `5 posts, 4 sections
i after loop: 5
Iterations: 0
Backwards iterations: 5`,
      },
    },
  ],
};
