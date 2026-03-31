"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import { useParams } from "next/navigation";

import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface FRQData {
  id: string;
  title: string;
  description: string;
  methodSignature: string;
  solution: string;
  expectedOutput: string;
  points: number;
  timeLimit: string;
  concepts: string[];
}

const UNIT_FRQS: Record<number, FRQData> = {
  1: {
    id: "frq-u1-1",
    title: "Change Calculator",
    description: `Write a method \`calculateChange\` that takes a price (\`double\`) and a payment (\`double\`) and returns an \`int\` array representing the change broken down into the fewest coins.

The returned array should contain exactly 5 elements:
  \`[dollars, quarters, dimes, nickels, pennies]\`

**Example:**
- \`calculateChange(17.38, 20.00)\` → \`[2, 2, 1, 0, 2]\`
  (change = $2.62 → 2 dollars, 2 quarters, 1 dime, 0 nickels, 2 pennies)

**Important notes:**
- Use integer arithmetic after converting the change to cents to avoid floating-point errors.
- Use \`Math.round()\` when converting dollars to cents.
- Assume payment ≥ price (no negative change).`,
    methodSignature: `public class Main {
    /**
     * Calculates change as [dollars, quarters, dimes, nickels, pennies].
     * @param price   the cost of the item
     * @param payment the amount paid
     * @return int array with 5 elements representing coin breakdown
     */
    public static int[] calculateChange(double price, double payment) {
        // Your code here
        return new int[5];
    }

    public static void main(String[] args) {
        int[] change = calculateChange(17.38, 20.00);
        System.out.println("Dollars:  " + change[0]);
        System.out.println("Quarters: " + change[1]);
        System.out.println("Dimes:    " + change[2]);
        System.out.println("Nickels:  " + change[3]);
        System.out.println("Pennies:  " + change[4]);
    }
}`,
    solution: `public class Main {
    public static int[] calculateChange(double price, double payment) {
        int totalCents = (int) Math.round((payment - price) * 100);
        int[] result = new int[5];

        result[0] = totalCents / 100;       // dollars
        totalCents %= 100;

        result[1] = totalCents / 25;        // quarters
        totalCents %= 25;

        result[2] = totalCents / 10;        // dimes
        totalCents %= 10;

        result[3] = totalCents / 5;         // nickels
        totalCents %= 5;

        result[4] = totalCents;             // pennies

        return result;
    }

    public static void main(String[] args) {
        int[] change = calculateChange(17.38, 20.00);
        System.out.println("Dollars:  " + change[0]);
        System.out.println("Quarters: " + change[1]);
        System.out.println("Dimes:    " + change[2]);
        System.out.println("Nickels:  " + change[3]);
        System.out.println("Pennies:  " + change[4]);
    }
}`,
    expectedOutput:
      "Dollars:  2\nQuarters: 2\nDimes:    1\nNickels:  0\nPennies:  2",
    points: 9,
    timeLimit: "25 minutes",
    concepts: [
      "int and double types",
      "Type casting (narrowing)",
      "Integer division & modulus",
      "Math.round()",
      "Arrays (return type)",
    ],
  },
  2: {
    id: "frq-u2-1",
    title: "Student Greeting Generator",
    description: `Write a method \`buildGreeting\` that takes a \`String\` full name and an \`int\` period number and returns a formatted greeting.

**Requirements:**
- Extract the first name from the full name (everything before the first space).
- Convert the first name to uppercase.
- Return: \`"Welcome, [FIRST_NAME]! You are in period [period]."\`

**Example:**
- \`buildGreeting("Alice Johnson", 3)\` → \`"Welcome, ALICE! You are in period 3."\``,
    methodSignature: `public class Main {
    public static String buildGreeting(String fullName, int period) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(buildGreeting("Alice Johnson", 3));
    }
}`,
    solution: `public class Main {
    public static String buildGreeting(String fullName, int period) {
        String firstName = fullName.substring(0, fullName.indexOf(" "));
        return "Welcome, " + firstName.toUpperCase() + "! You are in period " + period + ".";
    }

    public static void main(String[] args) {
        System.out.println(buildGreeting("Alice Johnson", 3));
    }
}`,
    expectedOutput: "Welcome, ALICE! You are in period 3.",
    points: 9,
    timeLimit: "25 minutes",
    concepts: ["String methods", "substring", "indexOf", "toUpperCase", "String concatenation"],
  },
  3: {
    id: "frq-u3-1",
    title: "Grade Classifier",
    description: `Write a method \`classifyGrade\` that takes an \`int\` score (0–100) and returns a \`String\` letter grade.

**Grading scale:**
- 90–100 → "A"
- 80–89 → "B"
- 70–79 → "C"
- 60–69 → "D"
- Below 60 → "F"

If the score is outside 0–100, return "Invalid".

**Example:**
- \`classifyGrade(85)\` → \`"B"\``,
    methodSignature: `public class Main {
    public static String classifyGrade(int score) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(classifyGrade(85));
        System.out.println(classifyGrade(92));
        System.out.println(classifyGrade(45));
    }
}`,
    solution: `public class Main {
    public static String classifyGrade(int score) {
        if (score < 0 || score > 100) return "Invalid";
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }

    public static void main(String[] args) {
        System.out.println(classifyGrade(85));
        System.out.println(classifyGrade(92));
        System.out.println(classifyGrade(45));
    }
}`,
    expectedOutput: "B\nA\nF",
    points: 9,
    timeLimit: "20 minutes",
    concepts: ["if/else if/else", "Boolean expressions", "Relational operators", "Return statements"],
  },
  4: {
    id: "frq-u4-1",
    title: "Digit Sum Calculator",
    description: `Write a method \`digitSum\` that takes a positive \`int\` and returns the sum of its digits using a \`while\` loop.

**Example:**
- \`digitSum(1234)\` → \`10\` (1 + 2 + 3 + 4)
- \`digitSum(99)\` → \`18\` (9 + 9)

**Hint:** Use \`% 10\` to get the last digit and \`/ 10\` to remove it.`,
    methodSignature: `public class Main {
    public static int digitSum(int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(digitSum(1234));
        System.out.println(digitSum(99));
    }
}`,
    solution: `public class Main {
    public static int digitSum(int n) {
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(digitSum(1234));
        System.out.println(digitSum(99));
    }
}`,
    expectedOutput: "10\n18",
    points: 9,
    timeLimit: "20 minutes",
    concepts: ["while loops", "Modulus operator", "Integer division", "Loop control"],
  },
  5: {
    id: "frq-u5-1",
    title: "BankAccount Class",
    description: `Design a \`BankAccount\` class with the following:

**Instance variables:** \`accountHolder\` (String), \`balance\` (double)

**Constructor:** Takes the account holder name and an initial balance.

**Methods:**
- \`deposit(double amount)\` — adds to balance (ignore if amount ≤ 0)
- \`withdraw(double amount)\` — subtracts from balance (ignore if amount ≤ 0 or exceeds balance)
- \`getBalance()\` — returns the current balance
- \`toString()\` — returns \`"[name]: $[balance]"\` formatted to 2 decimal places`,
    methodSignature: `public class BankAccount {
    // Instance variables

    // Constructor

    // Methods: deposit, withdraw, getBalance, toString

    public static void main(String[] args) {
        BankAccount acct = new BankAccount("Alice", 100.0);
        acct.deposit(50.25);
        acct.withdraw(30.0);
        System.out.println(acct);
    }
}`,
    solution: `public class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    public String toString() {
        return accountHolder + ": $" + String.format("%.2f", balance);
    }

    public static void main(String[] args) {
        BankAccount acct = new BankAccount("Alice", 100.0);
        acct.deposit(50.25);
        acct.withdraw(30.0);
        System.out.println(acct);
    }
}`,
    expectedOutput: "Alice: $120.25",
    points: 9,
    timeLimit: "30 minutes",
    concepts: ["Instance variables", "Constructors", "Accessor/mutator methods", "Encapsulation", "toString"],
  },
  6: {
    id: "frq-u6-1",
    title: "Array Statistics",
    description: `Write a method \`arrayStats\` that takes an \`int[]\` array and prints the minimum, maximum, and average of its elements.

**Example:**
- For \`{3, 7, 1, 9, 4}\`, output:
  \`Min: 1\`
  \`Max: 9\`
  \`Avg: 4.8\`

**Note:** The average should be a \`double\` value.`,
    methodSignature: `public class Main {
    public static void arrayStats(int[] arr) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] data = {3, 7, 1, 9, 4};
        arrayStats(data);
    }
}`,
    solution: `public class Main {
    public static void arrayStats(int[] arr) {
        int min = arr[0], max = arr[0], sum = 0;
        for (int val : arr) {
            if (val < min) min = val;
            if (val > max) max = val;
            sum += val;
        }
        System.out.println("Min: " + min);
        System.out.println("Max: " + max);
        System.out.println("Avg: " + (double) sum / arr.length);
    }

    public static void main(String[] args) {
        int[] data = {3, 7, 1, 9, 4};
        arrayStats(data);
    }
}`,
    expectedOutput: "Min: 1\nMax: 9\nAvg: 4.8",
    points: 9,
    timeLimit: "25 minutes",
    concepts: ["Array traversal", "for-each loop", "Min/max algorithm", "Casting to double"],
  },
  7: {
    id: "frq-u7-1",
    title: "Remove Duplicates",
    description: `Write a method \`removeDuplicates\` that takes an \`ArrayList<String>\` and removes all duplicate values, keeping only the first occurrence.

**Example:**
- Input: \`["apple", "banana", "apple", "cherry", "banana"]\`
- After: \`["apple", "banana", "cherry"]\`

**Hint:** Be careful with indices when removing during traversal!`,
    methodSignature: `import java.util.ArrayList;

public class Main {
    public static void removeDuplicates(ArrayList<String> list) {
        // Your code here
    }

    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("apple"); items.add("banana");
        items.add("apple"); items.add("cherry"); items.add("banana");
        removeDuplicates(items);
        System.out.println(items);
    }
}`,
    solution: `import java.util.ArrayList;

public class Main {
    public static void removeDuplicates(ArrayList<String> list) {
        for (int i = 0; i < list.size(); i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (list.get(i).equals(list.get(j))) {
                    list.remove(j);
                    j--;
                }
            }
        }
    }

    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("apple"); items.add("banana");
        items.add("apple"); items.add("cherry"); items.add("banana");
        removeDuplicates(items);
        System.out.println(items);
    }
}`,
    expectedOutput: "[apple, banana, cherry]",
    points: 9,
    timeLimit: "25 minutes",
    concepts: ["ArrayList methods", "Nested loops", "Removing during traversal", ".equals()"],
  },
  8: {
    id: "frq-u8-1",
    title: "Row Sum Calculator",
    description: `Write a method \`rowSums\` that takes a 2D \`int[][]\` array and returns a 1D \`int[]\` array where each element is the sum of the corresponding row.

**Example:**
- For \`{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}\`, return \`{6, 15, 24}\``,
    methodSignature: `public class Main {
    public static int[] rowSums(int[][] matrix) {
        // Your code here
        return new int[0];
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[] sums = rowSums(matrix);
        for (int s : sums) System.out.println(s);
    }
}`,
    solution: `public class Main {
    public static int[] rowSums(int[][] matrix) {
        int[] sums = new int[matrix.length];
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                sums[r] += matrix[r][c];
            }
        }
        return sums;
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[] sums = rowSums(matrix);
        for (int s : sums) System.out.println(s);
    }
}`,
    expectedOutput: "6\n15\n24",
    points: 9,
    timeLimit: "20 minutes",
    concepts: ["2D array traversal", "Nested for loops", "Row-major order", "Array creation"],
  },
  9: {
    id: "frq-u9-1",
    title: "Shape Hierarchy",
    description: `Create a class hierarchy:

1. \`Shape\` (superclass) with a method \`area()\` that returns \`0.0\`.
2. \`Circle\` extends \`Shape\` — takes a \`double radius\`. Override \`area()\` to return \`π × r²\`.
3. \`Rectangle\` extends \`Shape\` — takes \`double width\` and \`double height\`. Override \`area()\` to return \`width × height\`.

Demonstrate polymorphism in \`main\`.`,
    methodSignature: `public class Main {
    // Define Shape, Circle, Rectangle here or as inner classes

    public static void main(String[] args) {
        // Create a Circle with radius 5 and a Rectangle 4x6
        // Print their areas
    }
}`,
    solution: `public class Main {
    static class Shape {
        public double area() { return 0.0; }
    }

    static class Circle extends Shape {
        private double radius;
        public Circle(double radius) { this.radius = radius; }
        public double area() { return Math.PI * radius * radius; }
    }

    static class Rectangle extends Shape {
        private double width, height;
        public Rectangle(double w, double h) { width = w; height = h; }
        public double area() { return width * height; }
    }

    public static void main(String[] args) {
        Shape c = new Circle(5);
        Shape r = new Rectangle(4, 6);
        System.out.println("Circle area: " + c.area());
        System.out.println("Rectangle area: " + r.area());
    }
}`,
    expectedOutput: "Circle area: 78.53981633974483\nRectangle area: 24.0",
    points: 9,
    timeLimit: "30 minutes",
    concepts: ["Inheritance", "Method overriding", "Polymorphism", "super keyword", "Constructors"],
  },
  10: {
    id: "frq-u10-1",
    title: "Recursive Power",
    description: `Write a recursive method \`power\` that takes a \`double\` base and an \`int\` exponent (≥ 0) and returns base^exponent.

**Rules:**
- Base case: any number to the power of 0 is 1.
- Recursive case: \`base * power(base, exponent - 1)\`

**Example:**
- \`power(2.0, 10)\` → \`1024.0\`
- \`power(3.0, 0)\` → \`1.0\``,
    methodSignature: `public class Main {
    public static double power(double base, int exp) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(power(2.0, 10));
        System.out.println(power(3.0, 0));
    }
}`,
    solution: `public class Main {
    public static double power(double base, int exp) {
        if (exp == 0) return 1.0;
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println(power(2.0, 10));
        System.out.println(power(3.0, 0));
    }
}`,
    expectedOutput: "1024.0\n1.0",
    points: 9,
    timeLimit: "20 minutes",
    concepts: ["Recursion", "Base case", "Recursive case", "Call stack"],
  },
};

function getFRQ(unitId: number): FRQData {
  return UNIT_FRQS[unitId] ?? {
    id: `frq-u${unitId}-1`,
    title: `Unit ${unitId} FRQ`,
    description: `Free response question for Unit ${unitId} is coming soon. Check back later!`,
    methodSignature: `public class Main {\n    public static void main(String[] args) {\n        // Coming soon\n    }\n}`,
    solution: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Coming soon!");\n    }\n}`,
    expectedOutput: "Coming soon!",
    points: 9,
    timeLimit: "25 minutes",
    concepts: ["Coming soon"],
  };
}

export default function FrqPage() {
  const params = useParams();
  const unitId = Number(params.id);
  const frq = getFRQ(unitId);

  const [code, setCode] = useState(frq.methodSignature);
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(
        "Code submitted! ⏳ (Judge0 integration coming soon)\n\nYour code compiled successfully."
      );
      setSubmitted(true);
      setIsRunning(false);
    }, 800);
  }, []);

  const handleReset = useCallback(() => {
    setCode(frq.methodSignature);
    setShowSolution(false);
    setSubmitted(false);
    setOutput(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* FRQ intro */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">About AP FRQs</CardTitle>
          <CardDescription>
            Free Response Questions make up 40% of your AP exam score. You write
            Java code by hand (or in a digital editor) to solve multi-part
            problems. Practice here with auto-grading and hints!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {frq.concepts.map((concept) => (
              <Badge key={concept} variant="outline" className="text-xs">
                {concept}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FRQ question */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: problem description */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{frq.title}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="text-purple-400">
                      {frq.points} points
                    </span>{" "}
                    · Suggested time: {frq.timeLimit}
                  </CardDescription>
                </div>
                <Badge className="border bg-amber-500/20 text-amber-400 border-amber-500/30">
                  FRQ
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-sm">
                {frq.description.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="mt-3 font-semibold text-foreground">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <p key={i} className="ml-4 text-muted-foreground">
                        • {line.slice(2)}
                      </p>
                    );
                  }
                  if (line.trim() === "") return <br key={i} />;
                  return (
                    <p key={i} className="text-muted-foreground">
                      {line.split(/(`[^`]+`)/).map((seg, j) =>
                        seg.startsWith("`") && seg.endsWith("`") ? (
                          <code
                            key={j}
                            className="rounded bg-secondary px-1 py-0.5 font-mono text-xs text-foreground"
                          >
                            {seg.slice(1, -1)}
                          </code>
                        ) : (
                          <span key={j}>{seg}</span>
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Expected output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Expected Output</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-[#0d1117] p-3 font-mono text-sm text-emerald-400">
                {frq.expectedOutput}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Right: editor + controls */}
        <div className="space-y-4">
          {/* Editor */}
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 bg-secondary/30 px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">
                Main.java
              </span>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleReset}
                className="text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
            </div>
            <CodeEditor
              value={code}
              onChange={(v) => setCode(v)}
              height="380px"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              <CheckCircle2 className="size-4" />
              {isRunning ? "Running…" : "Submit"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1"
            >
              {showSolution ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
          </div>

          {/* Output */}
          <AnimatePresence>
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap rounded-lg bg-[#0d1117] p-3 font-mono text-sm text-emerald-400">
                      {output}
                    </pre>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solution comparison */}
          <AnimatePresence>
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="overflow-hidden rounded-lg border border-emerald-500/30">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-emerald-500/10 px-4 py-2">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">
                      Solution
                    </span>
                  </div>
                  <CodeEditor
                    value={frq.solution}
                    readOnly
                    height="380px"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

