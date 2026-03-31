"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";

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

const SAMPLE_FRQ = {
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
};

export default function FrqPage() {
  const [code, setCode] = useState(SAMPLE_FRQ.methodSignature);
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
    setCode(SAMPLE_FRQ.methodSignature);
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
            {SAMPLE_FRQ.concepts.map((concept) => (
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
                  <CardTitle className="text-lg">{SAMPLE_FRQ.title}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="text-purple-400">
                      {SAMPLE_FRQ.points} points
                    </span>{" "}
                    · Suggested time: {SAMPLE_FRQ.timeLimit}
                  </CardDescription>
                </div>
                <Badge className="border bg-amber-500/20 text-amber-400 border-amber-500/30">
                  FRQ
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-sm">
                {SAMPLE_FRQ.description.split("\n").map((line, i) => {
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
                {SAMPLE_FRQ.expectedOutput}
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
                    value={SAMPLE_FRQ.solution}
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
