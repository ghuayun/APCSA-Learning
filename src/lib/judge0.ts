const JUDGE0_URL =
  process.env.NEXT_PUBLIC_JUDGE0_URL ?? "https://judge0-ce.p.rapidapi.com";

const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
const JAVA_LANGUAGE_ID = 62; // Java OpenJDK 13.0.1

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Judge0Status {
  id: number;
  description: string;
}

export interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: Judge0Status;
  time: string | null;
  memory: number | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isRapidApi(): boolean {
  return JUDGE0_URL.includes("rapidapi.com");
}

function headers(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };

  if (isRapidApi()) {
    const key = process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? "";
    h["X-RapidAPI-Key"] = key;
    h["X-RapidAPI-Host"] = RAPIDAPI_HOST;
  }

  return h;
}

// ---------------------------------------------------------------------------
// Submit & poll
// ---------------------------------------------------------------------------

export async function submitCode(
  sourceCode: string,
  stdin?: string,
): Promise<Judge0Result> {
  const url = `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`;

  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      language_id: JAVA_LANGUAGE_ID,
      source_code: sourceCode,
      stdin: stdin ?? "",
    }),
  });

  if (!res.ok) {
    throw new Error(`Judge0 submission failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return {
    stdout: data.stdout ?? null,
    stderr: data.stderr ?? null,
    compile_output: data.compile_output ?? null,
    status: data.status as Judge0Status,
    time: data.time ?? null,
    memory: data.memory ?? null,
  };
}

// ---------------------------------------------------------------------------
// Friendly error translator
// ---------------------------------------------------------------------------

const ERROR_MAP: [RegExp, string][] = [
  [
    /NullPointerException/,
    "🫥 Oops — you tried to use something that doesn't exist yet (null). Make sure your variable actually points to an object before calling methods on it!",
  ],
  [
    /ArrayIndexOutOfBoundsException/,
    "📏 You went past the edge of your array! Remember: arrays start at index 0 and end at length − 1.",
  ],
  [
    /StringIndexOutOfBoundsException/,
    "✂️ You tried to grab a character that isn't there. Double-check your string index — is it within 0 to length() − 1?",
  ],
  [
    /ClassCastException/,
    "🎭 Type mix-up! You tried to treat an object as a type it isn't. Check your casts and make sure the object is actually that type.",
  ],
  [
    /StackOverflowError/,
    "🌀 Infinite loop alert! Your method keeps calling itself without stopping. Make sure your recursion has a proper base case.",
  ],
  [
    /ArithmeticException/,
    "➗ Math error — you probably divided by zero. Always check the denominator before dividing!",
  ],
  [
    /NumberFormatException/,
    '🔢 That string can\'t become a number. Make sure the text you\'re parsing actually looks like a number (no letters or symbols like "abc").',
  ],
  [
    /ConcurrentModificationException/,
    "🚧 You changed a list while looping through it. Use an Iterator or loop backwards when removing items.",
  ],
  [
    /IllegalArgumentException/,
    "🚫 You passed a bad argument to a method. Double-check what values the method actually accepts.",
  ],
  [
    /InputMismatchException/,
    "⌨️ The Scanner got a different type than it expected. If you called nextInt(), make sure the input is actually a number!",
  ],
  [
    /OutOfMemoryError/,
    "💾 Your program used too much memory. You might be creating way too many objects — check for infinite loops or huge arrays.",
  ],
  [
    /FileNotFoundException/,
    "📂 Can't find that file! Make sure the filename and path are spelled correctly.",
  ],
];

export function translateError(stderr: string): string {
  for (const [pattern, friendly] of ERROR_MAP) {
    if (pattern.test(stderr)) {
      return friendly;
    }
  }
  return stderr;
}
