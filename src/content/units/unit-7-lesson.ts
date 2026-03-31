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

export const unit7Lesson: { title: string; sections: LessonSection[] } = {
  title: "ArrayList",
  sections: [
    {
      id: "why-arraylist",
      title: "Why ArrayList? (Arrays Are Rigid)",
      content: `You just learned about arrays. They're fast, simple, and useful. But they have one massive limitation: **arrays can't change size**.

Created an array of 5 elements and now need 6? Tough luck. You'd have to:
1. Create a new, bigger array
2. Copy everything over
3. Add the new element

That's a lot of work every time your list grows. In real life, lists change size ALL the time:
- 📝 A to-do list grows and shrinks as you add and complete tasks
- 🎵 A playlist changes when you add or remove songs
- 👥 A group chat's member list changes when people join or leave

**ArrayList** solves this problem. It's like an array that can **grow and shrink automatically**. You never have to worry about the size — just add and remove, and ArrayList handles the rest.

\`\`\`java
import java.util.ArrayList;  // Don't forget this import!
\`\`\`

Think of an array as a fixed row of lockers 🔒 — you can't add more lockers. An ArrayList is like a stretchy backpack 🎒 — it expands to fit whatever you put in.`,
    },
    {
      id: "creating-arraylists-with-generics",
      title: "Creating ArrayLists with Generics",
      content: `Here's how you create an ArrayList:

\`\`\`java
ArrayList<String> names = new ArrayList<String>();
\`\`\`

The type in angle brackets (\`< >\`) is called a **generic** — it tells Java what type of objects the list can hold.

### Important Rules:
1. **Must use wrapper classes, not primitives.** You can't write \`ArrayList<int>\`. Use \`ArrayList<Integer>\` instead.

| Primitive | Wrapper Class |
|-----------|--------------|
| \`int\` | \`Integer\` |
| \`double\` | \`Double\` |
| \`boolean\` | \`Boolean\` |

2. **Must import** — add \`import java.util.ArrayList;\` at the top of your file.

3. **Diamond operator** — you can skip the type on the right side:
\`\`\`java
ArrayList<String> names = new ArrayList<>();  // Shorter! Java infers the type
\`\`\`

### ArrayList vs Array Declaration

| | Array | ArrayList |
|---|-------|-----------|
| Create | \`int[] nums = new int[5];\` | \`ArrayList<Integer> nums = new ArrayList<>();\` |
| Size | Fixed at creation | Grows/shrinks automatically |
| Get size | \`nums.length\` | \`nums.size()\` |
| Holds | Primitives or objects | Objects only (use wrappers) |
| Access | \`nums[i]\` | \`nums.get(i)\` |`,
      codeExample: {
        code: `import java.util.ArrayList;

// Create an ArrayList of Strings
ArrayList<String> colors = new ArrayList<String>();
colors.add("Red");
colors.add("Blue");
colors.add("Green");
System.out.println(colors);
System.out.println("Size: " + colors.size());

// Create an ArrayList of Integers (not int!)
ArrayList<Integer> scores = new ArrayList<Integer>();
scores.add(95);    // Autoboxing: int 95 → Integer 95
scores.add(87);
scores.add(92);
System.out.println(scores);`,
        language: "java",
        output: `[Red, Blue, Green]
Size: 3
[95, 87, 92]`,
      },
      miniQuiz: {
        question: "Why do you write `ArrayList<Integer>` instead of `ArrayList<int>`?",
        options: [
          "int is too short — Java needs the full word",
          "ArrayList can only hold objects, and int is a primitive, not an object",
          "Integer is faster than int",
          "There's no difference — both work",
        ],
        correct: 1,
        explanation:
          "ArrayLists can only hold objects, and primitives (int, double, boolean) are not objects. Wrapper classes like Integer, Double, and Boolean are the object versions of primitives. Java's autoboxing makes the conversion seamless.",
      },
    },
    {
      id: "adding-getting-setting-removing",
      title: "Adding, Getting, Setting, Removing",
      content: `ArrayList gives you methods for everything you need. Here's the cheat sheet:

### Adding Elements
| Method | What it does |
|--------|-------------|
| \`add(value)\` | Adds to the **end** of the list |
| \`add(index, value)\` | Inserts at the given index, shifting everything right |

### Accessing Elements
| Method | What it does |
|--------|-------------|
| \`get(index)\` | Returns the element at that index |
| \`size()\` | Returns how many elements are in the list |

### Modifying Elements
| Method | What it does |
|--------|-------------|
| \`set(index, value)\` | **Replaces** the element at that index |

### Removing Elements
| Method | What it does |
|--------|-------------|
| \`remove(index)\` | Removes by position, shifts everything left |
| \`remove(object)\` | Removes first occurrence of the value |

### ⚠️ Tricky: remove() with Integers
\`\`\`java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(10);
nums.add(20);
nums.remove(1);              // Removes at INDEX 1 → removes 20
nums.remove(Integer.valueOf(10)); // Removes the VALUE 10
\`\`\`

When you call \`remove(1)\` on an \`ArrayList<Integer>\`, Java treats 1 as an **index**, not a value. To remove the value 1, use \`remove(Integer.valueOf(1))\`. This is one of the trickiest AP exam questions! 🎯`,
      codeExample: {
        code: `import java.util.ArrayList;

ArrayList<String> tasks = new ArrayList<String>();

// add() — adds to the end
tasks.add("Study Java");
tasks.add("Do homework");
tasks.add("Play games");
System.out.println("After adds: " + tasks);

// add(index, value) — insert at position
tasks.add(1, "Eat lunch");
System.out.println("After insert: " + tasks);

// get() — access by index
System.out.println("First task: " + tasks.get(0));

// set() — replace an element
tasks.set(2, "Finish homework");
System.out.println("After set: " + tasks);

// remove() — delete an element
tasks.remove(3);  // Remove "Play games"
System.out.println("After remove: " + tasks);
System.out.println("Size: " + tasks.size());`,
        language: "java",
        output: `After adds: [Study Java, Do homework, Play games]
After insert: [Study Java, Eat lunch, Do homework, Play games]
First task: Study Java
After set: [Study Java, Eat lunch, Finish homework, Play games]
After remove: [Study Java, Eat lunch, Finish homework]
Size: 3`,
      },
    },
    {
      id: "traversing-arraylists",
      title: "Traversing ArrayLists",
      content: `Just like arrays, you can loop through ArrayLists in two ways:

### Regular for loop
\`\`\`java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
\`\`\`

Note: use \`.size()\` (not \`.length\`) and \`.get(i)\` (not \`[i]\`).

### Enhanced for loop (for-each)
\`\`\`java
for (String item : list) {
    System.out.println(item);
}
\`\`\`

Same rules as arrays — the for-each variable is a copy, so you can't modify the list through it.

### When to use which?

| Situation | Use |
|-----------|-----|
| Just reading each element | for-each ✅ |
| Need the index | regular for ✅ |
| Modifying element values | regular for with \`set()\` ✅ |
| Removing elements | regular for **(backwards!)** ✅ |
| Adding elements while looping | regular for (carefully!) ✅ |

**Key difference from arrays:** With arrays, you use \`arr[i]\` and \`arr.length\`. With ArrayLists, you use \`list.get(i)\` and \`list.size()\`. Don't mix them up!`,
      codeExample: {
        code: `import java.util.ArrayList;

ArrayList<Integer> numbers = new ArrayList<Integer>();
numbers.add(10);
numbers.add(25);
numbers.add(30);
numbers.add(15);
numbers.add(42);

// Regular for loop — good for reading with index
System.out.println("=== With indices ===");
for (int i = 0; i < numbers.size(); i++) {
    System.out.println("Index " + i + ": " + numbers.get(i));
}

// Enhanced for loop — cleaner for just reading
System.out.println("=== Sum with for-each ===");
int sum = 0;
for (int num : numbers) {
    sum += num;
}
System.out.println("Total: " + sum);

// Regular for loop to modify — double every value
for (int i = 0; i < numbers.size(); i++) {
    numbers.set(i, numbers.get(i) * 2);
}
System.out.println("Doubled: " + numbers);`,
        language: "java",
        output: `=== With indices ===
Index 0: 10
Index 1: 25
Index 2: 30
Index 3: 15
Index 4: 42
=== Sum with for-each ===
Total: 122
Doubled: [20, 50, 60, 30, 84]`,
      },
      miniQuiz: {
        question:
          "What do you use to get the number of elements in an ArrayList?",
        options: [".length", ".length()", ".size()", ".count()"],
        correct: 2,
        explanation:
          "ArrayList uses `.size()` — it's a method call with parentheses. Arrays use `.length` (no parentheses). Strings use `.length()` (with parentheses). Three similar things, three different syntax — classic Java!",
      },
    },
    {
      id: "remove-while-iterating-trap",
      title: "The Remove-While-Iterating Trap",
      content: `This is the #1 ArrayList bug. Let's say you want to remove all negative numbers from a list. You might try this:

### ❌ WRONG: Forward loop with remove
\`\`\`java
for (int i = 0; i < list.size(); i++) {
    if (list.get(i) < 0) {
        list.remove(i);  // 💀 Bug! Elements shift, and you skip one
    }
}
\`\`\`

When you remove element at index 2, everything after it shifts LEFT. The element that was at index 3 is now at index 2 — but \`i\` moves to 3, so you **skip** it!

### ❌ EVEN WORSE: For-each with remove
\`\`\`java
for (int val : list) {
    if (val < 0) {
        list.remove(Integer.valueOf(val));  // 💥 ConcurrentModificationException!
    }
}
\`\`\`

Java's for-each loop detects that you modified the list and throws \`ConcurrentModificationException\`. Game over.

### ✅ FIX 1: Loop BACKWARDS
\`\`\`java
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i) < 0) {
        list.remove(i);  // Removing from the end doesn't affect earlier indices!
    }
}
\`\`\`

### ✅ FIX 2: Build a new list
\`\`\`java
ArrayList<Integer> clean = new ArrayList<>();
for (int val : list) {
    if (val >= 0) {
        clean.add(val);  // Keep only the good ones
    }
}
\`\`\`

**AP Exam Tip:** When you see "remove while iterating" on the exam, immediately think backwards loop!`,
      codeExample: {
        code: `import java.util.ArrayList;

ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(5);
nums.add(-3);
nums.add(8);
nums.add(-1);
nums.add(12);
nums.add(-7);
nums.add(4);
System.out.println("Before: " + nums);

// Safe removal — looping backwards!
for (int i = nums.size() - 1; i >= 0; i--) {
    if (nums.get(i) < 0) {
        nums.remove(i);
    }
}
System.out.println("After removing negatives: " + nums);`,
        language: "java",
        output: `Before: [5, -3, 8, -1, 12, -7, 4]
After removing negatives: [5, 8, 12, 4]`,
      },
      miniQuiz: {
        question:
          "What happens if you try to remove elements from an ArrayList inside a for-each loop?",
        options: [
          "It works fine",
          "The removed elements come back",
          "Java throws ConcurrentModificationException",
          "The loop runs forever",
        ],
        correct: 2,
        explanation:
          "Java's for-each loop internally uses an iterator that detects when the list has been modified. If you add or remove during iteration, it throws ConcurrentModificationException. Use a backwards regular for loop instead!",
      },
    },
    {
      id: "arraylist-vs-array",
      title: "ArrayList vs Array — When to Use Which",
      content: `Both arrays and ArrayLists store collections of data, but they shine in different situations:

### Use an **Array** when:
- ✅ You know the exact size ahead of time
- ✅ You need to store primitive types for performance
- ✅ You're working with a fixed-size structure (like a game board)
- ✅ You need multi-dimensional data (\`int[][]\`)

### Use an **ArrayList** when:
- ✅ The size might change (adding/removing elements)
- ✅ You need convenient methods like \`add()\`, \`remove()\`, \`contains()\`
- ✅ You want the list to grow automatically
- ✅ You don't know the final size when you start

### Side-by-Side Comparison

| Feature | Array | ArrayList |
|---------|-------|-----------|
| Size | Fixed | Dynamic |
| Syntax to create | \`new int[5]\` | \`new ArrayList<Integer>()\` |
| Access element | \`arr[i]\` | \`list.get(i)\` |
| Set element | \`arr[i] = val\` | \`list.set(i, val)\` |
| Get size | \`arr.length\` | \`list.size()\` |
| Add to end | Can't! | \`list.add(val)\` |
| Remove | Can't easily! | \`list.remove(i)\` |
| Primitives | ✅ Yes | ❌ No (use wrappers) |
| Print nicely | ❌ \`Arrays.toString()\` | ✅ \`System.out.println(list)\` |

**The AP exam tests your knowledge of both.** Know the syntax differences cold!`,
      codeExample: {
        code: `import java.util.ArrayList;

// Array version — fixed size, must know count ahead of time
String[] colorsArray = new String[3];
colorsArray[0] = "Red";
colorsArray[1] = "Blue";
colorsArray[2] = "Green";
// Can't add a 4th color without creating a new array!

// ArrayList version — flexible, grows as needed
ArrayList<String> colorsList = new ArrayList<String>();
colorsList.add("Red");
colorsList.add("Blue");
colorsList.add("Green");
colorsList.add("Yellow");  // No problem — ArrayList grows!
colorsList.remove("Blue");  // Easy removal too!

System.out.println("Array length: " + colorsArray.length);
System.out.println("ArrayList size: " + colorsList.size());
System.out.println("ArrayList: " + colorsList);

// ArrayList has helpful methods arrays don't
System.out.println("Contains Red? " + colorsList.contains("Red"));
System.out.println("Index of Green: " + colorsList.indexOf("Green"));`,
        language: "java",
        output: `Array length: 3
ArrayList size: 3
ArrayList: [Red, Green, Yellow]
Contains Red? true
Index of Green: 1`,
      },
    },
    {
      id: "wrapper-classes-and-autoboxing",
      title: "Wrapper Classes & Autoboxing",
      content: `Since ArrayLists can only hold **objects** (not primitives), Java provides **wrapper classes** — object versions of each primitive type:

| Primitive | Wrapper Class | Example |
|-----------|--------------|---------|
| \`int\` | \`Integer\` | \`Integer x = 5;\` |
| \`double\` | \`Double\` | \`Double y = 3.14;\` |
| \`boolean\` | \`Boolean\` | \`Boolean b = true;\` |

### Autoboxing — Java's Magic Trick 🎩

**Autoboxing** is Java automatically converting between primitives and wrapper classes:

\`\`\`java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(42);        // Autoboxing: int 42 → Integer.valueOf(42)
int val = nums.get(0);  // Unboxing: Integer → int
\`\`\`

You write normal \`int\` values, and Java silently wraps them in \`Integer\` objects. When you read them back, Java silently unwraps them. It's seamless — you rarely need to think about it.

### When Autoboxing Bites You 🦷

\`\`\`java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);    // true (Java caches small Integers)

Integer c = 200;
Integer d = 200;
System.out.println(c == d);    // false! (beyond the cache range)
System.out.println(c.equals(d)); // true (use .equals() for objects!)
\`\`\`

**Rule:** Use \`==\` for primitives, \`.equals()\` for objects. Since \`Integer\` is an object, use \`.equals()\` to compare values.`,
      codeExample: {
        code: `import java.util.ArrayList;

ArrayList<Integer> scores = new ArrayList<Integer>();

// Autoboxing: int → Integer (automatic)
scores.add(95);     // Java wraps 95 in Integer.valueOf(95)
scores.add(87);
scores.add(92);

// Unboxing: Integer → int (automatic)
int firstScore = scores.get(0);  // Java unwraps the Integer
System.out.println("First score: " + firstScore);

// Math works seamlessly thanks to unboxing
int total = 0;
for (int score : scores) {  // Each Integer auto-unboxed to int
    total += score;
}
System.out.println("Total: " + total);
System.out.println("Average: " + (double) total / scores.size());

// Comparing Integer objects
Integer x = 100;
Integer y = 100;
System.out.println("== : " + (x == y));           // true (cached)
System.out.println(".equals(): " + x.equals(y));  // true (always safe)`,
        language: "java",
        output: `First score: 95
Total: 274
Average: 91.33333333333333
== : true
.equals(): true`,
      },
    },
    {
      id: "arraylist-algorithms",
      title: "ArrayList Algorithms",
      content: `The same algorithms you learned with arrays work with ArrayLists — just swap the syntax:

| Array | ArrayList |
|-------|-----------|
| \`arr[i]\` | \`list.get(i)\` |
| \`arr.length\` | \`list.size()\` |
| \`arr[i] = val\` | \`list.set(i, val)\` |

### Find the Maximum
\`\`\`java
int max = list.get(0);
for (int i = 1; i < list.size(); i++) {
    if (list.get(i) > max) {
        max = list.get(i);
    }
}
\`\`\`

### Remove Duplicates (Keep First Occurrence)
\`\`\`java
for (int i = list.size() - 1; i >= 1; i--) {
    if (list.indexOf(list.get(i)) < i) {
        list.remove(i);  // It appeared earlier, so remove this one
    }
}
\`\`\`

### Check if All Elements Meet a Condition
\`\`\`java
boolean allPassing = true;
for (int score : scores) {
    if (score < 60) {
        allPassing = false;
        break;
    }
}
\`\`\`

### Useful ArrayList Methods You Should Know
- \`contains(value)\` — returns true if the value is in the list
- \`indexOf(value)\` — returns the index of the first occurrence (-1 if not found)
- \`isEmpty()\` — returns true if size is 0
- \`clear()\` — removes all elements

**Pro tip:** On the AP exam, they love asking you to trace through ArrayList code. Practice reading code that uses \`add()\`, \`remove()\`, and \`set()\` — track how the indices shift after each operation. Draw the list after every line! 📝`,
      codeExample: {
        code: `import java.util.ArrayList;

ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(4); nums.add(7); nums.add(2); nums.add(7);
nums.add(9); nums.add(2); nums.add(4); nums.add(1);
System.out.println("Original: " + nums);

// Find the max
int max = nums.get(0);
for (int n : nums) {
    if (n > max) max = n;
}
System.out.println("Max: " + max);

// Remove duplicates (keep first occurrence)
for (int i = nums.size() - 1; i >= 1; i--) {
    if (nums.indexOf(nums.get(i)) < i) {
        nums.remove(i);
    }
}
System.out.println("No duplicates: " + nums);

// Check if list contains a value
System.out.println("Contains 7? " + nums.contains(7));
System.out.println("Contains 5? " + nums.contains(5));
System.out.println("Index of 9: " + nums.indexOf(9));`,
        language: "java",
        output: `Original: [4, 7, 2, 7, 9, 2, 4, 1]
Max: 9
No duplicates: [4, 7, 2, 9, 1]
Contains 7? true
Contains 5? false
Index of 9: 3`,
      },
      miniQuiz: {
        question:
          "What is the safest way to remove all occurrences of a value from an ArrayList?",
        options: [
          "Use a for-each loop and call remove()",
          "Loop forwards and remove matching elements",
          "Loop backwards and remove matching elements",
          "You can't remove multiple elements from an ArrayList",
        ],
        correct: 2,
        explanation:
          "Looping backwards is the safest approach. When you remove an element, only elements AFTER it shift — but since you're moving backwards, those elements have already been checked. Forward loops skip elements after removal, and for-each throws ConcurrentModificationException.",
      },
    },
  ],
};
