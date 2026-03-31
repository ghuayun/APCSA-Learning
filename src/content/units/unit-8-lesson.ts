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

export const unit8Lesson: { title: string; sections: LessonSection[] } = {
  title: "2D Arrays",
  sections: [
    {
      id: "why-2d-arrays",
      title: "Why 2D Arrays?",
      content: `So far you've been working with regular arrays — simple lists of values in a single row. But what if you need to represent something with **rows AND columns**? 🤔

Think about it:
- 🎮 **Minecraft** stores its world as layers of blocks — each layer is a grid of squares
- 🚢 **Battleship** uses a grid to track hits and misses (A1, B3, C5…)
- 📸 **Instagram photos** are just grids of tiny colored pixels — a 1080×1080 post is over a million pixels arranged in rows and columns
- 🪑 **Your classroom seating chart** — rows of desks, each row has multiple seats
- 📊 **Excel spreadsheets** organize data into rows and columns

All of these are **2D** (two-dimensional) — they have both a **row** direction and a **column** direction. A regular array is like a single shelf. A 2D array is like a whole bookcase with multiple shelves, each holding multiple books.

In Java, a **2D array** lets you store data in a grid format using rows and columns. It's one of the most powerful data structures you'll learn in AP CSA, and it shows up on the exam every single year. 📝

By the end of this lesson, you'll be able to create 2D arrays, access any element by its row and column, and loop through them like a pro. Let's go! 🚀`,
    },
    {
      id: "declaring-creating",
      title: "Declaring and Creating 2D Arrays",
      content: `A 2D array in Java is really just an **array of arrays**. Each element of the outer array is itself an inner array. Picture a bookcase: the bookcase is the outer array, and each shelf (inner array) holds a row of books.

### Declaring and Creating

There are two main ways to create a 2D array:

**Method 1: Specify the size (filled with default values)**
\`\`\`java
int[][] grid = new int[3][4];  // 3 rows, 4 columns, all zeros
\`\`\`

**Method 2: Initialize with specific values**
\`\`\`java
int[][] grid = {{1, 2, 3}, {4, 5, 6}};  // 2 rows, 3 columns
\`\`\`

Notice the syntax: \`int[][]\` — the double brackets \`[][]\` tell Java "this is a 2D array of ints."

| Part | What it means |
|------|--------------|
| \`int[][]\` | The type: a 2D array of integers |
| \`grid\` | The variable name |
| \`new int[3][4]\` | Creates 3 rows, each with 4 columns |

When you use \`new int[3][4]\`, Java fills every cell with \`0\` (the default for \`int\`). For \`boolean\`, the default is \`false\`. For \`double\`, it's \`0.0\`. For object types like \`String\`, it's \`null\`.

Think of \`int[][] grid = new int[3][4]\` like creating a spreadsheet with 3 rows and 4 columns — every cell starts empty (zero). Then you can fill in the values however you want! 📊`,
      codeExample: {
        code: `// Method 1: Create with size (defaults to zeros)
int[][] grid = new int[2][3];
System.out.println("grid has " + grid.length + " rows");
System.out.println("Each row has " + grid[0].length + " columns");

// Method 2: Initialize with values
int[][] scores = {
    {90, 85, 92},
    {78, 88, 95},
    {84, 91, 87}
};
System.out.println("scores[0][1] = " + scores[0][1]);
System.out.println("scores[2][2] = " + scores[2][2]);`,
        language: "java",
        output: `grid has 2 rows
Each row has 3 columns
scores[0][1] = 85
scores[2][2] = 87`,
      },
      miniQuiz: {
        question:
          "What does `int[][] grid = new int[2][3];` create?",
        options: [
          "2 rows and 3 columns",
          "3 rows and 2 columns",
          "A single array with 6 elements",
          "2 arrays with 2 elements each",
        ],
        correct: 0,
        explanation:
          "In `new int[rows][cols]`, the first number is the number of rows and the second is the number of columns. So `new int[2][3]` creates a grid with 2 rows and 3 columns.",
      },
    },
    {
      id: "accessing-elements",
      title: "Accessing Elements [row][col]",
      content: `To access a specific element in a 2D array, you use **two indices**: one for the **row** and one for the **column**. The syntax is:

\`\`\`java
grid[row][col]
\`\`\`

Just like regular arrays, indexing starts at **0**. So the top-left element is always \`grid[0][0]\`.

Here's a visual for a 3×3 grid:

| | Col 0 | Col 1 | Col 2 |
|------|-------|-------|-------|
| **Row 0** | \`[0][0]\` | \`[0][1]\` | \`[0][2]\` |
| **Row 1** | \`[1][0]\` | \`[1][1]\` | \`[1][2]\` |
| **Row 2** | \`[2][0]\` | \`[2][1]\` | \`[2][2]\` |

Think of it like coordinates in Battleship: you say the row first, then the column. "Row 1, Column 2" → \`grid[1][2]\`. 🚢

**Pro tip:** If you ever mix up rows and columns, remember: **R** comes before **C** in the alphabet, just like \`[row][col]\` in Java! 🔤

You can both **read** and **write** values using this syntax:
- **Read:** \`int val = grid[1][2];\` — grabs the value at row 1, column 2
- **Write:** \`grid[1][2] = 42;\` — stores 42 at row 1, column 2

It works exactly like a regular array, just with two indices instead of one. If you've ever used coordinates in math class (x, y), this is the same idea — except Java does (row, col) instead of (x, y).`,
      codeExample: {
        code: `int[][] grid = {
    {10, 20, 30},
    {40, 50, 60},
    {70, 80, 90}
};

// Reading elements
System.out.println("Top-left: " + grid[0][0]);
System.out.println("Row 1, Col 2: " + grid[1][2]);
System.out.println("Bottom-right: " + grid[2][2]);

// Modifying an element
grid[1][1] = 999;
System.out.println("After change: " + grid[1][1]);`,
        language: "java",
        output: `Top-left: 10
Row 1, Col 2: 60
Bottom-right: 90
After change: 999`,
      },
      miniQuiz: {
        question:
          "Given `int[][] m = {{5, 10}, {15, 20}, {25, 30}};`, what is `m[2][0]`?",
        options: ["10", "15", "25", "20"],
        correct: 2,
        explanation:
          "m[2] is the third row {25, 30} (remember, indexing starts at 0!). Then [0] is the first element of that row, which is 25.",
      },
    },
    {
      id: "row-major-traversal",
      title: "Row-Major Traversal",
      content: `To visit every element in a 2D array, you need **nested loops** — a loop inside a loop. **Row-major traversal** means you go through the array **row by row**: finish all columns in row 0, then all columns in row 1, and so on.

### Regular Nested For Loop

\`\`\`java
for (int row = 0; row < grid.length; row++) {
    for (int col = 0; col < grid[row].length; col++) {
        // process grid[row][col]
    }
}
\`\`\`

The **outer loop** controls which **row** you're on. The **inner loop** moves across the **columns** within that row. It's like reading a book — you read left to right across each line (columns), then move down to the next line (row). 📖

### Enhanced For Loop Version

Java's enhanced for loop works beautifully with 2D arrays:

\`\`\`java
for (int[] row : grid) {       // each row is a 1D array
    for (int val : row) {      // each val is an element in that row
        // process val
    }
}
\`\`\`

Notice that the outer loop variable is \`int[] row\` — because each row of a 2D \`int\` array is itself a 1D \`int[]\` array! This is what we mean by "array of arrays."

**When to use which?**
- Use the **regular for loop** when you need to know the **indices** (row and column position)
- Use the **enhanced for loop** when you just need the **values** and don't care about position

Row-major order is the most common traversal and the **default** way to process 2D arrays. On the AP exam, if they don't specify an order, assume row-major! ✅`,
      codeExample: {
        code: `int[][] grid = {
    {1, 2, 3},
    {4, 5, 6}
};

// Regular for loop (row-major)
System.out.println("Regular for loop:");
for (int row = 0; row < grid.length; row++) {
    for (int col = 0; col < grid[row].length; col++) {
        System.out.print(grid[row][col] + " ");
    }
    System.out.println();
}

// Enhanced for loop (also row-major)
System.out.println("Enhanced for loop:");
for (int[] row : grid) {
    for (int val : row) {
        System.out.print(val + " ");
    }
    System.out.println();
}`,
        language: "java",
        output: `Regular for loop:
1 2 3 
4 5 6 
Enhanced for loop:
1 2 3 
4 5 6 `,
      },
      miniQuiz: {
        question:
          "In row-major traversal of a 2D array, which loop is the outer loop?",
        options: [
          "The loop over columns",
          "The loop over rows",
          "The enhanced for loop",
          "It doesn't matter which is outer",
        ],
        correct: 1,
        explanation:
          "In row-major traversal, the outer loop iterates over rows and the inner loop iterates over columns. You process all columns in row 0, then all columns in row 1, and so on — just like reading a book line by line!",
      },
    },
    {
      id: "column-major-traversal",
      title: "Column-Major Traversal",
      content: `**Column-major traversal** is the opposite of row-major: you go **column by column** instead of row by row. The outer loop controls the **column**, and the inner loop moves down the **rows**.

\`\`\`java
for (int col = 0; col < grid[0].length; col++) {
    for (int row = 0; row < grid.length; row++) {
        // process grid[row][col]
    }
}
\`\`\`

Notice the loops are **swapped** compared to row-major:

| | Outer loop | Inner loop | Reading order |
|------|-----------|-----------|--------------|
| **Row-major** | Rows | Columns | Like reading a book 📖 |
| **Column-major** | Columns | Rows | Like reading a newspaper column 📰 |

**When would you use column-major?**
- Processing spreadsheet data column by column (e.g., calculating the average for each subject across all students)
- Transposing a matrix (flipping rows and columns)
- Any time your data is organized by columns rather than rows

For example, imagine a gradebook where each column is a different test and each row is a student. Column-major traversal lets you process all students' scores for Test 0, then all scores for Test 1, then Test 2 — perfect for calculating class averages per test!

⚠️ **AP Exam Note:** The exam loves to test whether you can tell the difference between row-major and column-major output. The trick: look at which loop is on the outside. Outer loop = rows? Row-major. Outer loop = columns? Column-major.

**Important:** You can't use the enhanced for loop (\`for-each\`) for column-major traversal — it always goes row by row. You need the regular indexed for loops to control the traversal order.`,
      codeExample: {
        code: `int[][] grid = {
    {1, 2, 3},
    {4, 5, 6}
};

// Column-major: outer loop = columns, inner loop = rows
System.out.println("Column-major traversal:");
for (int col = 0; col < grid[0].length; col++) {
    System.out.print("Column " + col + ": ");
    for (int row = 0; row < grid.length; row++) {
        System.out.print(grid[row][col] + " ");
    }
    System.out.println();
}`,
        language: "java",
        output: `Column-major traversal:
Column 0: 1 4 
Column 1: 2 5 
Column 2: 3 6 `,
      },
    },
    {
      id: "2d-array-algorithms",
      title: "2D Array Algorithms",
      content: `Now that you can create and traverse 2D arrays, let's put it all together with some common algorithms. These patterns show up all the time on the AP exam! 🎯

### Row Sums
Add up all the values in a single row. This is useful for things like calculating a student's total score across all their tests.

### Column Sums
Add up all the values in a single column. Useful for finding the class average on one specific test.

### Finding an Element
Search the entire 2D array for a specific value. You need nested loops to check every single cell — there's no shortcut.

### Counting Occurrences
Count how many times a particular value appears in the grid. Same nested loop pattern, but with a counter.

Here's the general pattern for most 2D array algorithms:

\`\`\`java
int result = 0;  // accumulator (sum, count, max, etc.)
for (int row = 0; row < grid.length; row++) {
    for (int col = 0; col < grid[row].length; col++) {
        // Do something with grid[row][col]
    }
}
\`\`\`

The key insight: these are all just **variations of traversal** combined with a simple operation (adding, comparing, counting). Once you've mastered traversal, these algorithms are just a small twist on top. You already have the hard part down! 💪

**Pro tip for the AP exam:** When they ask you to "find" or "count" or "sum" something in a 2D array, start by writing the nested loop skeleton, then fill in the logic inside. It's the same structure every time — only the inside changes.`,
      codeExample: {
        code: `int[][] grades = {
    {90, 85, 92},
    {78, 88, 95},
    {84, 91, 87}
};

// Row sums: each student's total
for (int row = 0; row < grades.length; row++) {
    int rowSum = 0;
    for (int col = 0; col < grades[row].length; col++) {
        rowSum += grades[row][col];
    }
    System.out.println("Student " + row + " total: " + rowSum);
}

// Count how many grades are 90 or above
int highGrades = 0;
for (int[] row : grades) {
    for (int grade : row) {
        if (grade >= 90) {
            highGrades++;
        }
    }
}
System.out.println("Grades 90+: " + highGrades);`,
        language: "java",
        output: `Student 0 total: 267
Student 1 total: 261
Student 2 total: 262
Grades 90+: 4`,
      },
      miniQuiz: {
        question:
          "What does this code calculate?\n```java\nint total = 0;\nfor (int r = 0; r < grid.length; r++) {\n    total += grid[r][2];\n}\n```",
        options: [
          "Sum of row 2",
          "Sum of column 2",
          "Sum of all elements",
          "The number of rows",
        ],
        correct: 1,
        explanation:
          "The loop goes through every row (r goes from 0 to grid.length - 1) but always accesses column index 2 with grid[r][2]. This adds up all the values in column 2!",
      },
    },
    {
      id: "ragged-arrays",
      title: "Ragged Arrays",
      content: `Here's something that surprises a lot of students: in Java, the rows of a 2D array **don't have to be the same length**! 🤯

Since a 2D array is really an "array of arrays," each inner array (row) can have a different number of elements. This is called a **ragged array** (or jagged array).

### Creating a Ragged Array

\`\`\`java
int[][] triangle = new int[3][];   // 3 rows, columns TBD
triangle[0] = new int[]{1};        // row 0 has 1 element
triangle[1] = new int[]{2, 3};     // row 1 has 2 elements
triangle[2] = new int[]{4, 5, 6};  // row 2 has 3 elements
\`\`\`

Notice that when creating the outer array, we only specify the number of rows: \`new int[3][]\`. The second bracket is **empty** because each row will be created separately with its own length.

### The .length Gotcha

This is where things get tricky:
- \`grid.length\` → number of **rows**
- \`grid[i].length\` → number of **columns in row i**

| Expression | What it returns |
|-----------|----------------|
| \`grid.length\` | Number of rows |
| \`grid[0].length\` | Columns in row 0 |
| \`grid[i].length\` | Columns in row i (might differ per row!) |

For a **rectangular** array (all rows same length), \`grid[0].length\` safely gives you the column count. But for a **ragged** array, each row might have a different length!

⚠️ **Warning:** Always use \`grid[row].length\` (not \`grid[0].length\`) in your inner loop condition when the array might be ragged. Using \`grid[0].length\` assumes every row has the same number of columns — if they don't, you'll get an \`ArrayIndexOutOfBoundsException\` on shorter rows, or miss elements on longer rows!

Ragged arrays aren't super common on the AP exam, but understanding them deepens your knowledge of how 2D arrays actually work under the hood — and that understanding will make every other 2D array question easier. 🧠`,
      codeExample: {
        code: `// Creating a ragged (jagged) array
int[][] triangle = new int[3][];
triangle[0] = new int[]{1};
triangle[1] = new int[]{2, 3};
triangle[2] = new int[]{4, 5, 6};

System.out.println("Rows: " + triangle.length);

// Safe traversal: use triangle[row].length for each row
for (int row = 0; row < triangle.length; row++) {
    System.out.print("Row " + row + " (length " + triangle[row].length + "): ");
    for (int col = 0; col < triangle[row].length; col++) {
        System.out.print(triangle[row][col] + " ");
    }
    System.out.println();
}`,
        language: "java",
        output: `Rows: 3
Row 0 (length 1): 1 
Row 1 (length 2): 2 3 
Row 2 (length 3): 4 5 6 `,
      },
    },
    {
      id: "common-mistakes",
      title: "Common 2D Array Mistakes",
      content: `2D arrays are powerful, but they come with some classic traps. Here are the mistakes that trip up AP CSA students every year — learn them now so they don't catch you on the exam! 🚨

### Mistake 1: Off-By-One Errors ❌
\`\`\`java
// WRONG — causes ArrayIndexOutOfBoundsException!
for (int r = 0; r <= grid.length; r++) { ... }

// RIGHT — use < not <=
for (int r = 0; r < grid.length; r++) { ... }
\`\`\`
If your array has 3 rows (indices 0, 1, 2), then \`grid.length\` is 3, and \`grid[3]\` doesn't exist! Always use \`<\`, never \`<=\`, with \`.length\`.

### Mistake 2: Confusing Rows and Columns 🔄
\`\`\`java
// If you wanted row 1, column 3...
grid[1][3]   // ✅ Correct: [row][col]
grid[3][1]   // ❌ Wrong! This is row 3, column 1
\`\`\`
Remember: it's always \`[row][col]\`. **R** before **C**, just like in the alphabet!

### Mistake 3: ArrayIndexOutOfBoundsException 💥
This is the most common runtime error with 2D arrays. It happens when you try to access a row or column that doesn't exist. Common causes:
- Using \`<=\` instead of \`<\` in loops
- Mixing up rows and columns (accessing column index as row or vice versa)
- Hardcoding a column count that doesn't match the actual array

### Mistake 4: Mixing Up .length 📏
\`\`\`java
int[][] grid = new int[3][5];

grid.length      // → 3 (number of ROWS)
grid[0].length   // → 5 (number of COLUMNS)
\`\`\`
A classic exam trap: "What is \`grid.length\`?" They want you to accidentally say the number of columns, but it's actually the number of **rows**! And \`grid[0].length\` gives you the columns — but only if the array is rectangular (see the ragged arrays section!).

### Survival Guide for the AP Exam 💡
- When you see a 2D array question, **draw the grid** on scratch paper immediately
- Label the rows and columns with their indices (starting from 0!)
- Trace through loops **one iteration at a time** — don't try to do it in your head
- Always double-check: is the outer loop rows or columns?
- When in doubt, check both \`grid.length\` and \`grid[0].length\` and make sure you know which is which`,
      miniQuiz: {
        question:
          "What's wrong with this code?\n```java\nint[][] grid = new int[3][4];\nfor (int r = 0; r <= grid.length; r++) {\n    for (int c = 0; c < grid[0].length; c++) {\n        grid[r][c] = 0;\n    }\n}\n```",
        options: [
          "Nothing, it works perfectly",
          "The inner loop should use <= too",
          "The outer loop uses <= instead of <, causing an out-of-bounds error",
          "grid[0].length should be grid.length",
        ],
        correct: 2,
        explanation:
          "The outer loop condition `r <= grid.length` allows r to reach 3, but the valid row indices are 0, 1, and 2. Accessing grid[3] throws an ArrayIndexOutOfBoundsException! The fix is to change <= to < so it stops at r = 2.",
      },
    },
  ],
};
