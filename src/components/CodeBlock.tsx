"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  output?: string;
  showLineNumbers?: boolean;
}

const JAVA_KEYWORDS = new Set([
  "public",
  "private",
  "protected",
  "class",
  "static",
  "void",
  "int",
  "double",
  "boolean",
  "String",
  "if",
  "else",
  "for",
  "while",
  "return",
  "new",
  "true",
  "false",
  "null",
  "final",
  "abstract",
  "extends",
  "implements",
  "import",
  "package",
  "this",
  "super",
  "try",
  "catch",
  "throw",
  "throws",
]);

const BUILTIN_METHODS = new Set(["System.out.println", "System.out.print"]);

function highlightLine(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // Single-line comment
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push(
        <span key={i} className="text-[#6A9955]">
          {line.slice(i)}
        </span>
      );
      return tokens;
    }

    // String literal
    if (line[i] === '"') {
      let end = i + 1;
      while (end < len && line[end] !== '"') {
        if (line[end] === "\\") end++;
        end++;
      }
      end = Math.min(end + 1, len);
      tokens.push(
        <span key={i} className="text-[#CE9178]">
          {line.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }

    // Char literal
    if (line[i] === "'") {
      let end = i + 1;
      while (end < len && line[end] !== "'") {
        if (line[end] === "\\") end++;
        end++;
      }
      end = Math.min(end + 1, len);
      tokens.push(
        <span key={i} className="text-[#CE9178]">
          {line.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }

    // Check for System.out.println / System.out.print
    const remaining = line.slice(i);
    let matchedBuiltin = false;
    for (const method of BUILTIN_METHODS) {
      if (remaining.startsWith(method)) {
        tokens.push(
          <span key={i} className="text-[#DCDCAA]">
            {method}
          </span>
        );
        i += method.length;
        matchedBuiltin = true;
        break;
      }
    }
    if (matchedBuiltin) continue;

    // Number literal
    if (/[0-9]/.test(line[i]) && (i === 0 || !/[a-zA-Z_]/.test(line[i - 1]))) {
      let end = i;
      while (end < len && /[0-9.]/.test(line[end])) end++;
      tokens.push(
        <span key={i} className="text-[#B5CEA8]">
          {line.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }

    // Word (keyword or identifier)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let end = i;
      while (end < len && /[a-zA-Z0-9_$]/.test(line[end])) end++;
      const word = line.slice(i, end);

      if (JAVA_KEYWORDS.has(word)) {
        const isType = [
          "int",
          "double",
          "boolean",
          "String",
          "void",
        ].includes(word);
        const isLiteral = ["true", "false", "null"].includes(word);
        tokens.push(
          <span
            key={i}
            className={cn(
              isLiteral
                ? "text-[#569CD6]"
                : isType
                  ? "text-[#4EC9B0]"
                  : "text-[#C586C0]"
            )}
          >
            {word}
          </span>
        );
      } else if (
        end < len &&
        line[end] === "(" &&
        !["if", "for", "while"].includes(word)
      ) {
        tokens.push(
          <span key={i} className="text-[#DCDCAA]">
            {word}
          </span>
        );
      } else {
        tokens.push(
          <span key={i} className="text-[#9CDCFE]">
            {word}
          </span>
        );
      }
      i = end;
      continue;
    }

    // Operators and punctuation
    if (/[+\-*/%=<>!&|^~?:]/.test(line[i])) {
      let end = i;
      while (end < len && /[+\-*/%=<>!&|^~?:]/.test(line[end])) end++;
      tokens.push(
        <span key={i} className="text-[#D4D4D4]">
          {line.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }

    // Everything else (whitespace, braces, etc.)
    tokens.push(
      <span key={i} className="text-[#D4D4D4]">
        {line[i]}
      </span>
    );
    i++;
  }

  return tokens;
}

export function CodeBlock({
  code,
  language = "java",
  output,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split("\n");

  return (
    <div className="rounded-lg overflow-hidden border border-[#2d2d2d] my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d]">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="bg-[#1e1e1e] overflow-x-auto">
        <pre className="p-4 text-sm leading-6 font-mono">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="flex">
                {showLineNumbers && (
                  <span className="inline-block w-8 shrink-0 text-right pr-4 text-zinc-600 select-none">
                    {idx + 1}
                  </span>
                )}
                <span className="flex-1">
                  {language === "java" ? highlightLine(line) : line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Output panel */}
      {output && (
        <div className="border-t border-[#2d2d2d]">
          <div className="px-4 py-1.5 bg-[#252526]">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Output
            </span>
          </div>
          <div className="bg-[#1a1a1a] px-4 py-3">
            <pre className="text-sm leading-6 font-mono text-emerald-400 whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
