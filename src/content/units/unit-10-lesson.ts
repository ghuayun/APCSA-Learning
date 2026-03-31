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

export const unit10Lesson: { title: string; sections: LessonSection[] } = {
  title: "Recursion",
  sections: [
    {
      id: "what-is-recursion",
      title: "What is Recursion?",
      content: `Have you ever stood between two mirrors and seen your reflection go on forever? Or opened a set of Russian nesting dolls, where each doll contains a smaller version of itself? That's the vibe of **recursion**.

In programming, **recursion** is when a method calls itself. Yeah, you read that right — a method can literally call *itself*. It's like the movie Inception: a dream within a dream within a dream. 🎬

\`\`\`
method() calls → method() calls → method() calls → ... (until something stops it)
\`\`\`

But why would you want a method to call itself? Because some problems are naturally **self-similar** — they can be broken down into smaller versions of the same problem. Want to compute 5 factorial? Well, 5! = 5 × 4!. And 4! = 4 × 3!. See the pattern? Each step is a smaller version of the original question.

**The two key ingredients of every recursive method:**

| Ingredient | What it does | Analogy |
|-----------|-------------|---------|
| **Base case** | Stops the recursion | The smallest Russian doll that doesn't open |
| **Recursive case** | Calls the method again with a smaller input | Opening a doll to find a smaller one inside |

Without both pieces, your recursion is broken. A recursive method without a base case is like a TikTok scroll with no end — it just keeps going until your phone (or in Java's case, the call stack) crashes. 💀`,
      codeExample: {
        code: `public static void countDown(int n) {
    if (n == 0) {
        System.out.println("Liftoff! 🚀");
        return; // Base case: stop here
    }
    System.out.println(n);
    countDown(n - 1); // Recursive case: count down
}

// Calling: countDown(3);`,
        language: "java",
        output: `3
2
1
Liftoff! 🚀`,
      },
      miniQuiz: {
        question:
          "Which of the following is an example of a recursive structure?",
        options: [
          "A for loop that counts from 1 to 10",
          "A folder that contains subfolders, which contain more subfolders",
          "An array of 5 integers",
          "A method that takes two parameters",
        ],
        correct: 1,
        explanation:
          "A folder containing subfolders is naturally recursive — each subfolder has the same structure as its parent. This self-similar structure is exactly what recursion is great at processing!",
      },
    },
    {
      id: "base-case",
      title: "Base Case — The Emergency Brake",
      content: `Every recursive method needs a **base case**. It's the condition that says "STOP! Don't call yourself again!" Without it, your method will call itself forever until Java throws a \`StackOverflowError\`. 💥

Think of it like this: imagine you're walking down a flight of stairs. Each step, you go down one more stair (that's the recursive case). But eventually, you reach the ground floor and **stop walking** (that's the base case). Without the ground floor, you'd walk down into the Earth forever.

**How to spot a base case:**
- It's usually an \`if\` statement at the **top** of your recursive method
- It returns a value **without** making another recursive call
- It handles the **simplest** version of the problem

**Common base cases you'll see on the AP exam:**

| Problem | Base case | Why? |
|---------|-----------|------|
| Factorial | \`n == 0\` → return 1 | 0! is defined as 1 |
| Fibonacci | \`n <= 1\` → return n | fib(0) = 0, fib(1) = 1 |
| String processing | \`s.length() == 0\` or \`s.length() <= 1\` | Empty or single-char string |
| Array processing | \`index == arr.length\` | No more elements to process |
| Binary search | \`low > high\` | Nothing left to search |

**What happens without a base case?**

\`\`\`java
// 🚨 DANGER: No base case!
public static void infinite(int n) {
    System.out.println(n);
    infinite(n - 1); // Calls itself forever!
}
\`\`\`

Each call adds a new frame to the **call stack** (Java's memory for tracking method calls). Without a base case, frames pile up until the stack overflows. It's like stacking infinite books on a shelf — eventually, the shelf collapses.

**Pro tip:** Always write your base case FIRST when creating a recursive method. It's like putting on your seatbelt before driving. 🚗`,
      miniQuiz: {
        question:
          "A recursive method keeps calling itself and eventually crashes with a StackOverflowError. What is the most likely cause?",
        options: [
          "The method has too many parameters",
          "The base case is missing or never reached",
          "The method returns a String instead of an int",
          "The method is declared as static",
        ],
        correct: 1,
        explanation:
          "A StackOverflowError almost always means the base case is missing, wrong, or the recursive calls never reach it. Each call piles up on the stack, and without a base case to stop the chain, it overflows.",
      },
    },
    {
      id: "recursive-case",
      title: "Recursive Case — The Magic Step",
      content: `The **recursive case** is where the magic happens. It's the part of the method that calls itself, but with a **smaller or simpler input**. This is absolutely key — if the input doesn't get smaller, you'll never reach the base case!

Think of it like a group project (stay with me here 😅). You're the team leader. Instead of doing ALL the work yourself, you do a tiny piece and then delegate the rest to another version of yourself who does a tiny piece and delegates... until someone gets a task so simple they just do it (that's the base case).

**The "Leap of Faith" strategy:**

Here's the secret to writing recursive code: **trust that the recursive call works**. Don't try to trace through every single call in your head. Instead:

1. Define what the method should do
2. Write the base case (the trivial answer)
3. Assume the recursive call returns the correct answer for a smaller input
4. Use that answer to build the solution for the current input

For example, to write \`factorial(n)\`:
1. \`factorial(n)\` should return n!
2. Base case: \`factorial(0)\` returns 1
3. **Trust** that \`factorial(n - 1)\` correctly returns (n-1)!
4. Then \`factorial(n)\` = n × \`factorial(n - 1)\`

That's it! You don't need to mentally trace factorial(5) → factorial(4) → factorial(3)... just trust each call does its job. 🤝

**The key rule:** Every recursive call MUST move toward the base case. Otherwise, you have infinite recursion.

| ✅ Moves toward base case | ❌ Doesn't move toward base case |
|--------------------------|----------------------------------|
| \`mystery(n - 1)\` | \`mystery(n)\` |
| \`process(s.substring(1))\` | \`process(s + "a")\` |
| \`search(arr, index + 1)\` | \`search(arr, index)\` |`,
      codeExample: {
        code: `// Computing the sum of numbers from 1 to n
public static int sumTo(int n) {
    if (n == 1) return 1;             // Base case
    return n + sumTo(n - 1);          // Recursive case
}

// Trust the recursion:
// sumTo(4) = 4 + sumTo(3)    "I trust sumTo(3) returns 6"
//          = 4 + 6
//          = 10

System.out.println(sumTo(4));
System.out.println(sumTo(10));`,
        language: "java",
        output: `10
55`,
      },
    },
    {
      id: "tracing-call-stack",
      title: "Tracing Recursion (Call Stack Visualization)",
      content: `OK, even though we said "trust the recursion," for the AP exam you WILL need to **trace** recursive calls step by step. Let's learn how the **call stack** works.

Every time a method is called, Java creates a **stack frame** — a little block of memory that holds the method's parameters and local variables. These frames stack on top of each other like a stack of plates. 🍽️

**The call stack for \`factorial(4)\`:**

\`\`\`
Step 1: factorial(4) called → needs factorial(3) → WAIT
Step 2: factorial(3) called → needs factorial(2) → WAIT
Step 3: factorial(2) called → needs factorial(1) → WAIT
Step 4: factorial(1) called → needs factorial(0) → WAIT
Step 5: factorial(0) called → BASE CASE! Returns 1
\`\`\`

Now the stack **unwinds** (like unstacking plates):

\`\`\`
Step 6: factorial(1) = 1 × 1 = 1   → returns 1
Step 7: factorial(2) = 2 × 1 = 2   → returns 2
Step 8: factorial(3) = 3 × 2 = 6   → returns 6
Step 9: factorial(4) = 4 × 6 = 24  → returns 24 ✅
\`\`\`

**Visualizing the stack frames:**

\`\`\`
                    ┌──────────────────┐
Step 5 (top):      │ factorial(0) → 1 │  ← base case, starts returning
                    ├──────────────────┤
Step 4:             │ factorial(1)     │  ← waiting...
                    ├──────────────────┤
Step 3:             │ factorial(2)     │  ← waiting...
                    ├──────────────────┤
Step 2:             │ factorial(3)     │  ← waiting...
                    ├──────────────────┤
Step 1 (bottom):    │ factorial(4)     │  ← waiting...
                    └──────────────────┘
\`\`\`

**AP Exam tracing tips:**
- Make a table with columns for each variable and the return value
- Go DOWN the stack (building frames) until you hit the base case
- Then go BACK UP (unwinding) to compute each return value
- Don't skip steps — write every single call out`,
      codeExample: {
        code: `public static int factorial(int n) {
    System.out.println("Calling factorial(" + n + ")");
    if (n == 0) {
        System.out.println("  factorial(0) returns 1");
        return 1;
    }
    int result = n * factorial(n - 1);
    System.out.println("  factorial(" + n + ") returns " + result);
    return result;
}

// Calling: factorial(4)`,
        language: "java",
        output: `Calling factorial(4)
Calling factorial(3)
Calling factorial(2)
Calling factorial(1)
Calling factorial(0)
  factorial(0) returns 1
  factorial(1) returns 1
  factorial(2) returns 2
  factorial(3) returns 6
  factorial(4) returns 24`,
      },
      miniQuiz: {
        question:
          "When tracing factorial(3), what is the FIRST value returned by any call?",
        options: [
          "6 from factorial(3)",
          "3 from factorial(3)",
          "1 from factorial(0)",
          "1 from factorial(1)",
        ],
        correct: 2,
        explanation:
          "The base case factorial(0) is the first call to actually return a value (1). All other calls are waiting on the stack for their recursive calls to complete. The stack unwinds from the top: factorial(0) returns 1 first, then factorial(1), then factorial(2), then factorial(3).",
      },
    },
    {
      id: "classic-examples",
      title: "Classic Examples (Factorial, Fibonacci)",
      content: `These two are the "Hello World" of recursion — you'll see them everywhere, especially on the AP exam. Let's break both down.

### Factorial (n!)

Factorial is the cleanest example of recursion. The math definition IS the code:
- 0! = 1 (base case)
- n! = n × (n-1)! (recursive case)

That's literally it. The math formula translates directly into Java.

### Fibonacci

The Fibonacci sequence — 0, 1, 1, 2, 3, 5, 8, 13, 21... — shows up everywhere from flower petals to the golden ratio. Each number is the sum of the two before it:
- fib(0) = 0 (base case)
- fib(1) = 1 (base case)
- fib(n) = fib(n-1) + fib(n-2) (recursive case)

⚠️ **Warning about Fibonacci:** The recursive version is elegant but SLOW. Each call branches into TWO more calls, creating a tree that grows exponentially. Computing \`fib(40)\` makes over a billion calls! For the AP exam, just know the recursive version. In real life, you'd use an iterative approach or **memoization** (caching results).

| n | fib(n) | Total calls (recursive) |
|---|--------|------------------------|
| 5 | 5 | 15 |
| 10 | 55 | 177 |
| 20 | 6765 | 21,891 |
| 30 | 832040 | ~2.7 million 😱 |

The takeaway: recursion is powerful, but sometimes it does WAY more work than necessary. Fibonacci is the classic example of when recursion can be inefficient.`,
      codeExample: {
        code: `// Factorial — clean and efficient recursion
public static int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

// Fibonacci — elegant but exponentially slow
public static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

System.out.println("5! = " + factorial(5));
System.out.println("10! = " + factorial(10));
System.out.println("fib(7) = " + fib(7));
System.out.println("fib(10) = " + fib(10));`,
        language: "java",
        output: `5! = 120
10! = 3628800
fib(7) = 13
fib(10) = 55`,
      },
    },
    {
      id: "recursive-string-processing",
      title: "Recursive String Processing",
      content: `Strings are a natural fit for recursion because you can always break a string into two parts:
1. **The first character:** \`s.charAt(0)\`
2. **The rest of the string:** \`s.substring(1)\`

This is exactly the "do one small thing, then recurse on the rest" pattern. Let's look at three classic string recursion problems:

### 1. Reverse a String
Idea: Reverse everything after the first character, then stick the first character at the end.

### 2. Count Character Occurrences
Idea: Check if the first character matches. Then count in the rest of the string.

### 3. Palindrome Check
Idea: Check if the first and last characters match. If so, check if the middle is a palindrome.

**String methods you'll use constantly:**
| Method | What it does | Example |
|--------|-------------|---------|
| \`s.charAt(0)\` | First character | \`"hello".charAt(0)\` → \`'h'\` |
| \`s.substring(1)\` | Everything after first char | \`"hello".substring(1)\` → \`"ello"\` |
| \`s.substring(1, s.length()-1)\` | Remove first and last char | \`"hello".substring(1, 4)\` → \`"ell"\` |
| \`s.length()\` | Length of the string | \`"hello".length()\` → \`5\` |

**Common base cases for string recursion:**
- Empty string: \`s.length() == 0\` → return \`""\` or \`0\` or \`true\`
- Single character: \`s.length() <= 1\` → return the string itself, or \`1\`, or \`true\``,
      codeExample: {
        code: `// Reverse a string
public static String reverse(String s) {
    if (s.length() <= 1) return s;
    return reverse(s.substring(1)) + s.charAt(0);
}

// Count occurrences of a character
public static int countChar(String s, char target) {
    if (s.length() == 0) return 0;
    int rest = countChar(s.substring(1), target);
    if (s.charAt(0) == target) return 1 + rest;
    return rest;
}

// Check if a string is a palindrome
public static boolean isPalindrome(String s) {
    if (s.length() <= 1) return true;
    if (s.charAt(0) != s.charAt(s.length() - 1)) return false;
    return isPalindrome(s.substring(1, s.length() - 1));
}

System.out.println(reverse("hello"));
System.out.println(countChar("mississippi", 's'));
System.out.println(isPalindrome("racecar"));
System.out.println(isPalindrome("hello"));`,
        language: "java",
        output: `olleh
4
true
false`,
      },
      miniQuiz: {
        question:
          'What does `reverse("AB")` return, step by step?\n```java\npublic static String reverse(String s) {\n    if (s.length() <= 1) return s;\n    return reverse(s.substring(1)) + s.charAt(0);\n}\n```',
        options: [
          '"AB" — it returns the string unchanged',
          '"BA" — reverse("B") returns "B", then "B" + \'A\' = "BA"',
          '"A" — it only processes the first character',
          'It causes a StackOverflowError',
        ],
        correct: 1,
        explanation:
          'reverse("AB"): s.length() is 2, so we skip the base case. We call reverse("B") which returns "B" (base case, length 1). Then "B" + \'A\' = "BA". The string is reversed!',
      },
    },
    {
      id: "recursion-vs-iteration",
      title: "Recursion vs Iteration",
      content: `Here's a fact that surprises a lot of students: **every recursive solution can be rewritten as a loop, and every loop can be rewritten as recursion.** They're equally powerful! So when should you use which? 🤔

### Side-by-Side Comparison

Let's look at factorial both ways:

\`\`\`java
// Recursive                          // Iterative
int factorial(int n) {                int factorial(int n) {
    if (n == 0) return 1;                 int result = 1;
    return n * factorial(n - 1);          for (int i = 1; i <= n; i++) {
}                                             result *= i;
                                          }
                                          return result;
                                      }
\`\`\`

### When to use each:

| | Recursion ♻️ | Iteration 🔄 |
|--|-------------|-------------|
| **Readability** | Often cleaner for self-similar problems | Better for simple counting/accumulating |
| **Memory** | Uses more (call stack frames) | Uses less (just loop variables) |
| **Speed** | Can be slower (overhead per call) | Generally faster |
| **Best for** | Trees, divide & conquer, backtracking | Simple loops, performance-critical code |
| **Risk** | StackOverflowError if too deep | Infinite loop if condition is wrong |

### The Bottom Line

- **Use recursion** when the problem is naturally recursive (trees, file systems, divide & conquer algorithms, problems that break into smaller sub-problems)
- **Use iteration** when you're doing something simple and repetitive (counting, summing, searching through a flat list)
- On the **AP exam**, you need to be comfortable reading AND tracing both. You might be asked to identify what a recursive method does — often it's the same thing as a loop you already know

**Fun fact:** Some languages (like Haskell) don't even have loops — everything is recursion! Java gives you both tools. Choose wisely. 🧠`,
      miniQuiz: {
        question:
          "Which of the following is an advantage of recursion over iteration?",
        options: [
          "Recursion always runs faster",
          "Recursion uses less memory",
          "Recursive code can be more readable for self-similar problems",
          "Recursion never causes errors",
        ],
        correct: 2,
        explanation:
          "Recursion often produces cleaner, more readable code for naturally self-similar problems like tree traversals. However, it generally uses MORE memory (call stack) and is NOT always faster. Each approach has trade-offs!",
      },
    },
    {
      id: "when-to-use-recursion",
      title: "When to Use Recursion",
      content: `Now that you've got the tools, let's talk strategy. When does recursion actually *shine* in real programming? 💡

### 1. Tree Structures 🌳
File systems on your computer are trees — folders inside folders inside folders. Processing them recursively is natural: "Process this folder, then recursively process each subfolder." Video game skill trees, HTML/DOM elements, and organizational charts all work the same way.

### 2. Divide and Conquer ⚔️
Some of the most famous algorithms use this strategy: split the problem in half, solve each half recursively, combine the results. **Merge sort** and **quicksort** (which you might learn later) are classic examples. Even **binary search** works this way:

\`\`\`
Search the whole array → Search the left OR right half → Search a quarter → ... → Found it!
\`\`\`

### 3. Binary Search 🔍
You've probably done binary search iteratively. The recursive version is elegant: check the middle, then recurse on the left or right half.

### 4. Backtracking 🔙
Solving mazes, Sudoku puzzles, generating all possible combinations — these problems try a path, and if it doesn't work, they **backtrack** and try another. This is extremely natural with recursion.

### Practical Tips for the AP Exam 📝

1. **Trace carefully:** Make a table. Write down every call, every parameter value, every return value. Don't do it in your head!
2. **Identify base cases first:** When reading a recursive method, find the base case immediately. It tells you when the method stops.
3. **Watch for double recursion:** Methods like Fibonacci that make TWO recursive calls per step can be tricky to trace. Draw a tree diagram.
4. **Common trick questions:** A method that doesn't move toward the base case → StackOverflowError. A missing base case → StackOverflowError. These are popular wrong-answer traps.
5. **Don't overthink it:** If you're asked what a method returns, sometimes the quickest approach is to just trace it with the given input, step by step.

**You've got this!** Recursion is one of those things that feels like magic at first, but once it clicks, you'll start seeing recursive patterns everywhere. It's like learning to ride a bike — wobbly at first, then second nature. 🚲`,
      codeExample: {
        code: `// Recursive binary search — elegant and efficient
public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1; // Base case: not found

    int mid = (low + high) / 2;

    if (arr[mid] == target) return mid;        // Found it!
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high); // Search right
    else
        return binarySearch(arr, target, low, mid - 1);  // Search left
}

int[] scores = {55, 62, 71, 78, 83, 90, 95};
System.out.println("Found 83 at index: " +
    binarySearch(scores, 83, 0, scores.length - 1));
System.out.println("Found 60 at index: " +
    binarySearch(scores, 60, 0, scores.length - 1));`,
        language: "java",
        output: `Found 83 at index: 4
Found 60 at index: -1`,
      },
      miniQuiz: {
        question:
          "You need to process every file in a folder, including all files in subfolders, sub-subfolders, and so on. Which approach is most natural?",
        options: [
          "A single for loop",
          "Nested for loops (one per subfolder level)",
          "Recursion",
          "A while loop with a counter",
        ],
        correct: 2,
        explanation:
          "Folder structures are recursive by nature — each folder can contain more folders. Recursion is the natural choice: \"process each file, and for each subfolder, recursively process it.\" You don't know how deep the nesting goes, so fixed loops won't work!",
      },
    },
  ],
};
