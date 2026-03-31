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

export const unit6Lesson: { title: string; sections: LessonSection[] } = {
  title: "Array",
  sections: [
    {
      id: "why-arrays-matter",
      title: "Why Arrays Matter",
      content: `Imagine you're building a grade tracker and need to store 30 students' test scores. Are you going to create 30 separate variables?

\`\`\`java
int score1 = 85;
int score2 = 92;
int score3 = 78;
// ... 27 more lines? No way! 😤
\`\`\`

An **array** is a container that holds a fixed number of values of the same type. Instead of 30 variables, you get one:

\`\`\`java
int[] scores = new int[30];  // Done. 30 slots, one variable.
\`\`\`

Arrays are everywhere in real apps:
- 🎵 **Spotify** stores your playlist as an array of songs
- 🎮 **Games** store high scores in an array
- 📱 **Instagram** stores your feed posts in an array
- 📊 **Apps** store sensor data, pixel colors, survey responses...

Arrays are the foundation of data structures. Master them here, and everything from ArrayLists to databases will click. Let's dive in! 🏊`,
    },
    {
      id: "declaring-and-creating-arrays",
      title: "Declaring and Creating Arrays",
      content: `There are two ways to create an array in Java:

### Way 1: Declare size, fill later
\`\`\`java
int[] scores = new int[5];  // 5 slots, all initialized to 0
\`\`\`

### Way 2: Declare with values (initializer list)
\`\`\`java
int[] scores = {95, 87, 72, 100, 88};  // 5 slots, pre-filled
\`\`\`

**Key facts about arrays:**
- Arrays have a **fixed size** — once created, they cannot grow or shrink
- All elements must be the **same type**
- Elements are accessed by **index** (position number), starting at **0**
- The \`.length\` property tells you how many elements the array can hold

| Type | Default value |
|------|--------------|
| \`int[]\` | \`0\` |
| \`double[]\` | \`0.0\` |
| \`boolean[]\` | \`false\` |
| \`String[]\` | \`null\` |

**Common gotcha:** \`.length\` is a **property** (no parentheses!), not a method. It's \`arr.length\`, NOT \`arr.length()\`. Strings use \`.length()\` with parentheses — arrays don't. This trips people up on the AP exam every year.`,
      codeExample: {
        code: `// Way 1: Create then fill
int[] temps = new int[3];
temps[0] = 72;
temps[1] = 68;
temps[2] = 75;

// Way 2: Initializer list
String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri"};

System.out.println("Temps array length: " + temps.length);
System.out.println("First temp: " + temps[0]);
System.out.println("Days array length: " + days.length);
System.out.println("Last day: " + days[days.length - 1]);`,
        language: "java",
        output: `Temps array length: 3
First temp: 72
Days array length: 5
Last day: Fri`,
      },
      miniQuiz: {
        question:
          "What is the default value of each element in `double[] data = new double[10];`?",
        options: ["null", "0", "0.0", "undefined"],
        correct: 2,
        explanation:
          "When you create a double array with `new`, Java fills every slot with 0.0 (the default for doubles). For int arrays it's 0, for booleans it's false, and for object arrays (like String[]) it's null.",
      },
    },
    {
      id: "accessing-and-modifying-elements",
      title: "Accessing and Modifying Elements",
      content: `You access array elements using **bracket notation** with an index:

\`\`\`java
int[] scores = {90, 85, 92, 78, 95};

int first = scores[0];    // 90 — first element
int third = scores[2];    // 92 — third element
int last = scores[scores.length - 1];  // 95 — last element

scores[1] = 100;          // Change the second element to 100
\`\`\`

**Index rules:**
- First element is at index **0** (not 1!)
- Last element is at index **length - 1**
- Valid indices: \`0\` to \`length - 1\`

### The Dreaded ArrayIndexOutOfBoundsException 💀

If you try to access an index that doesn't exist, Java throws an **ArrayIndexOutOfBoundsException** at runtime:

\`\`\`java
int[] arr = {1, 2, 3};
System.out.println(arr[3]);   // 💥 CRASH! Index 3 doesn't exist
System.out.println(arr[-1]);  // 💥 CRASH! Negative indices don't work in Java
\`\`\`

This is a **runtime error**, not a compilation error. Your code compiles fine but crashes when it runs. These bugs are sneaky — always double-check your loop bounds!`,
      codeExample: {
        code: `int[] grades = {88, 95, 72, 100, 64};

// Reading elements
System.out.println("First grade: " + grades[0]);
System.out.println("Last grade: " + grades[grades.length - 1]);

// Modifying elements
grades[2] = 85;  // Changed 72 to 85 (retake, maybe?)
System.out.println("Updated grade: " + grades[2]);

// A common pattern: swapping two elements
int temp = grades[0];
grades[0] = grades[4];
grades[4] = temp;
System.out.println("After swap — first: " + grades[0] + ", last: " + grades[4]);`,
        language: "java",
        output: `First grade: 88
Last grade: 64
Updated grade: 85
After swap — first: 64, last: 88`,
      },
    },
    {
      id: "traversing-arrays",
      title: "Traversing Arrays (for and for-each)",
      content: `**Traversing** means visiting every element in the array. There are two main ways:

### Regular \`for\` loop — when you NEED the index
\`\`\`java
for (int i = 0; i < arr.length; i++) {
    System.out.println("Index " + i + ": " + arr[i]);
}
\`\`\`

Use this when you need to:
- Know the position (index) of each element
- Modify elements in the array
- Access elements by their position
- Skip elements or go backwards

### Enhanced \`for\` loop (for-each) — cleaner, simpler
\`\`\`java
for (int val : arr) {
    System.out.println(val);
}
\`\`\`

Read it as: "for each value in arr." Use this when you:
- Just need to look at every element
- Don't need the index
- Don't need to modify the array

### ⚠️ The for-each trap
The for-each loop gives you a **copy** of each element. Changing the variable does NOT change the array:

\`\`\`java
for (int val : arr) {
    val = val * 2;  // This changes the COPY, not the array!
}
// arr is unchanged! 😱
\`\`\`

To modify elements, use a regular for loop: \`arr[i] = arr[i] * 2;\``,
      codeExample: {
        code: `int[] scores = {85, 92, 78, 95, 88};

// Regular for loop — prints index AND value
System.out.println("=== Scores with indices ===");
for (int i = 0; i < scores.length; i++) {
    System.out.println("Student " + (i + 1) + ": " + scores[i]);
}

// Enhanced for loop — just the values
System.out.println("=== All scores ===");
int total = 0;
for (int score : scores) {
    total += score;
}
double average = (double) total / scores.length;
System.out.println("Average: " + average);`,
        language: "java",
        output: `=== Scores with indices ===
Student 1: 85
Student 2: 92
Student 3: 78
Student 4: 95
Student 5: 88
=== All scores ===
Average: 87.6`,
      },
      miniQuiz: {
        question:
          "Which type of loop should you use if you need to modify elements in an array?",
        options: [
          "Enhanced for loop (for-each)",
          "Regular for loop with index",
          "Either one works the same",
          "Neither — arrays can't be modified",
        ],
        correct: 1,
        explanation:
          "The enhanced for loop gives you a COPY of each element, so changes don't affect the original array. A regular for loop with an index lets you modify the actual elements: `arr[i] = newValue;`.",
      },
    },
    {
      id: "array-algorithms",
      title: "Array Algorithms (min, max, sum, average)",
      content: `These algorithms show up on the AP exam every year. Know them cold! ❄️

### Find the Maximum
\`\`\`java
int max = arr[0];  // Assume first is the biggest
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];  // Found something bigger!
    }
}
\`\`\`

### Find the Minimum
Same idea, but flip the comparison to \`<\`.

### Sum All Elements
\`\`\`java
int sum = 0;
for (int val : arr) {
    sum += val;
}
\`\`\`

### Calculate Average
\`\`\`java
double avg = (double) sum / arr.length;
\`\`\`
⚠️ Don't forget the \`(double)\` cast! Without it, you get integer division.

### Count Occurrences
\`\`\`java
int count = 0;
for (int val : arr) {
    if (val == target) {
        count++;
    }
}
\`\`\`

**Pattern recognition:** Notice how every algorithm follows the same structure:
1. Initialize a variable before the loop
2. Loop through the array
3. Check each element and update the variable
4. Use the variable after the loop

Once you see this pattern, every array algorithm becomes the same skeleton with different logic in the middle.`,
      codeExample: {
        code: `int[] temps = {72, 68, 75, 81, 65, 79, 73};

// Find min and max
int min = temps[0];
int max = temps[0];
for (int i = 1; i < temps.length; i++) {
    if (temps[i] < min) min = temps[i];
    if (temps[i] > max) max = temps[i];
}

// Calculate sum and average
int sum = 0;
for (int t : temps) {
    sum += t;
}
double avg = (double) sum / temps.length;

System.out.println("Min: " + min);
System.out.println("Max: " + max);
System.out.println("Sum: " + sum);
System.out.println("Average: " + avg);`,
        language: "java",
        output: `Min: 65
Max: 81
Sum: 513
Average: 73.28571428571429`,
      },
    },
    {
      id: "searching-and-sorting-basics",
      title: "Searching and Sorting Basics",
      content: `### Linear Search
The simplest way to find something — check every element one by one:

\`\`\`java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;     // Found it! Return the index
        }
    }
    return -1;            // Not found
}
\`\`\`

Returning \`-1\` when not found is a common convention — since -1 is never a valid index, it's a clear signal that the search failed.

### Selection Sort (Preview)
Selection sort works by repeatedly finding the minimum element and putting it in the right place:

1. Find the smallest element → swap it to position 0
2. Find the next smallest → swap it to position 1
3. Repeat until sorted

You don't need to memorize the code for AP CSA, but understanding the **concept** is important. It's like sorting a hand of cards by always picking the smallest card and moving it to the left.

### Key Insight: Searching vs Sorting
- **Linear search** works on ANY array (sorted or not). It checks every element, so it's slow for big arrays — O(n) time.
- **Binary search** (Unit 10) only works on SORTED arrays, but it's much faster — O(log n) time.
- Sorting first, then searching, can be worthwhile when you need to search many times.`,
      codeExample: {
        code: `// Linear search in action
int[] ids = {1042, 2057, 3019, 4081, 5023};

int target = 3019;
int foundAt = -1;
for (int i = 0; i < ids.length; i++) {
    if (ids[i] == target) {
        foundAt = i;
        break;  // Stop early — no need to keep looking!
    }
}

if (foundAt != -1) {
    System.out.println("Found " + target + " at index " + foundAt);
} else {
    System.out.println(target + " not found");
}

// Searching for something that doesn't exist
int missing = 9999;
int result = -1;
for (int i = 0; i < ids.length; i++) {
    if (ids[i] == missing) {
        result = i;
        break;
    }
}
System.out.println("Search for " + missing + ": index " + result);`,
        language: "java",
        output: `Found 3019 at index 2
Search for 9999: index -1`,
      },
    },
    {
      id: "arrays-as-method-parameters",
      title: "Arrays as Method Parameters",
      content: `You can pass arrays to methods and return arrays from methods. But there's one critical thing to understand:

### Arrays are passed by reference! 📌

When you pass an array to a method, you're passing a **reference** (a pointer) to the array, not a copy. This means the method can **modify the original array**:

\`\`\`java
public static void doubleAll(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * 2;  // Modifies the ORIGINAL array!
    }
}
\`\`\`

This is different from primitives, where changes inside a method don't affect the original:

\`\`\`java
public static void tryToChange(int x) {
    x = 99;  // Only changes the local copy
}
// The original variable is still the same!
\`\`\`

### Returning arrays from methods
Methods can create and return new arrays:
\`\`\`java
public static int[] createDoubled(int[] arr) {
    int[] result = new int[arr.length];
    for (int i = 0; i < arr.length; i++) {
        result[i] = arr[i] * 2;
    }
    return result;  // New array, original untouched
}
\`\`\`

**Tip:** If you don't want to modify the original, create a new array inside the method and return it.`,
      codeExample: {
        code: `public static void addBonus(int[] scores, int bonus) {
    for (int i = 0; i < scores.length; i++) {
        scores[i] += bonus;  // Modifies original!
    }
}

public static double calculateAverage(int[] arr) {
    int sum = 0;
    for (int val : arr) {
        sum += val;
    }
    return (double) sum / arr.length;
}

// In main:
int[] grades = {82, 75, 91, 68, 88};
System.out.println("Before bonus avg: " + calculateAverage(grades));

addBonus(grades, 5);  // Adds 5 to every grade
System.out.println("After bonus avg: " + calculateAverage(grades));
System.out.println("First grade: " + grades[0]);  // Was 82, now 87`,
        language: "java",
        output: `Before bonus avg: 80.8
After bonus avg: 85.8
First grade: 87`,
      },
      miniQuiz: {
        question:
          "What happens when you pass an array to a method and the method changes an element?",
        options: [
          "Only the local copy changes — the original is safe",
          "The original array is changed because arrays are passed by reference",
          "Java throws an error because arrays are immutable",
          "The method creates a new array automatically",
        ],
        correct: 1,
        explanation:
          "Arrays are reference types. When you pass an array to a method, you pass a reference to the SAME array. Any changes the method makes affect the original. This is different from primitives (int, double) which pass a copy.",
      },
    },
    {
      id: "common-array-mistakes",
      title: "Common Array Mistakes",
      content: `Avoid these traps — they show up constantly on the AP exam! 🎯

### Mistake 1: Off-By-One Errors
\`\`\`java
// WRONG — index arr.length doesn't exist!
for (int i = 0; i <= arr.length; i++) { ... }

// RIGHT — use < not <=
for (int i = 0; i < arr.length; i++) { ... }
\`\`\`

### Mistake 2: Confusing .length (array) and .length() (String)
\`\`\`java
int[] arr = {1, 2, 3};
arr.length      // ✅ Correct — no parentheses for arrays
arr.length()    // ❌ Error!

String s = "hello";
s.length()      // ✅ Correct — parentheses for Strings
s.length        // ❌ Error!
\`\`\`

### Mistake 3: Trying to Resize an Array
\`\`\`java
int[] arr = new int[5];
// There's NO way to make arr hold 6 elements
// You'd need to create a new, bigger array and copy values over
\`\`\`

### Mistake 4: Printing an Array Directly
\`\`\`java
System.out.println(arr);  // Prints something like [I@1a2b3c 😱
\`\`\`
Use \`Arrays.toString(arr)\` for a readable output, or loop through manually.

### Mistake 5: Modifying with for-each
\`\`\`java
for (int val : arr) {
    val = val * 2;  // ❌ Changes the copy, not the array!
}
\`\`\`

### Pro Tips 💡
- When you see an array problem, **draw the array** with indices above it: [0][1][2][3][4]
- Trace through loop iterations one at a time
- Always ask: "What happens on the first iteration? The last iteration?"
- Check: is my loop starting at 0? Ending at length - 1?`,
      codeExample: {
        code: `// Demonstrating the "print array" gotcha
int[] nums = {10, 20, 30, 40, 50};

// Wrong way — prints memory address
System.out.println("Wrong: " + nums);

// Right way — manual loop
System.out.print("Right: ");
for (int i = 0; i < nums.length; i++) {
    if (i > 0) System.out.print(", ");
    System.out.print(nums[i]);
}
System.out.println();

// Or use Arrays.toString() (import java.util.Arrays)
// System.out.println(Arrays.toString(nums));  // [10, 20, 30, 40, 50]`,
        language: "java",
        output: `Wrong: [I@1a2b3c
Right: 10, 20, 30, 40, 50`,
      },
    },
  ],
};
