"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import {
  unit1Lesson,
  type LessonSection,
} from "@/content/units/unit-1-lesson";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Inline mini-quiz                                                   */
/* ------------------------------------------------------------------ */
function MiniQuizCard({
  quiz,
}: {
  quiz: NonNullable<LessonSection["miniQuiz"]>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 overflow-hidden my-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="size-4" />
          Quick Check
        </span>
        {open ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <p className="text-sm text-foreground leading-relaxed">
                {renderContent(quiz.question)}
              </p>

              <div className="grid gap-2">
                {quiz.options.map((opt, idx) => {
                  let style = "border-border bg-card hover:bg-accent";
                  if (answered) {
                    if (idx === quiz.correct)
                      style =
                        "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                    else if (idx === selected)
                      style =
                        "border-red-500/50 bg-red-500/10 text-red-300";
                    else style = "border-border bg-card opacity-50";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !answered && setSelected(idx)}
                      disabled={answered}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm text-left transition-all cursor-pointer",
                        style,
                        answered && "cursor-default"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "rounded-lg border p-3 text-sm",
                    selected === quiz.correct
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                      : "border-red-500/30 bg-red-500/5 text-red-300"
                  )}
                >
                  <p className="font-medium mb-1">
                    {selected === quiz.correct
                      ? "\u2705 Correct!"
                      : "\u274C Not quite"}
                  </p>
                  <p className="text-muted-foreground">{quiz.explanation}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content renderer (basic markdown-like parsing)                     */
/* ------------------------------------------------------------------ */
function renderContent(text: string): React.ReactNode[] {
  const blocks = text.split(/(```[\s\S]*?```)/);

  return blocks.map((block, bi) => {
    const codeMatch = block.match(/^```(\w+)?\n([\s\S]*?)```$/);
    if (codeMatch) {
      return (
        <CodeBlock
          key={bi}
          code={codeMatch[2].trimEnd()}
          language={codeMatch[1] || "java"}
          showLineNumbers={false}
        />
      );
    }

    const paragraphs = block.split("\n\n");
    return paragraphs.map((para, pi) => {
      const lines = para.trim().split("\n");
      if (
        lines.length >= 2 &&
        lines[0].includes("|") &&
        lines[1].match(/^\|[\s\-|]+\|$/)
      ) {
        return renderTable(lines, `${bi}-${pi}`);
      }

      if (
        lines.every((l) => l.trim().startsWith("- ") || l.trim() === "")
      ) {
        return (
          <ul
            key={`${bi}-${pi}`}
            className="list-disc list-inside space-y-1 text-muted-foreground"
          >
            {lines
              .filter((l) => l.trim().startsWith("- "))
              .map((l, li) => (
                <li key={li}>{renderInline(l.trim().slice(2))}</li>
              ))}
          </ul>
        );
      }

      const headingMatch = para.trim().match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const Tag = `h${level + 1}` as keyof React.JSX.IntrinsicElements;
        return (
          <Tag
            key={`${bi}-${pi}`}
            className={cn(
              "font-semibold text-foreground",
              level === 1 && "text-lg mt-4 mb-2",
              level === 2 && "text-base mt-3 mb-1.5",
              level === 3 && "text-sm mt-2 mb-1"
            )}
          >
            {renderInline(headingMatch[2])}
          </Tag>
        );
      }

      if (para.trim() === "") return null;

      return (
        <p
          key={`${bi}-${pi}`}
          className="text-muted-foreground leading-relaxed"
        >
          {renderInline(para.trim())}
        </p>
      );
    });
  });
}

function renderTable(lines: string[], key: string) {
  const parseRow = (line: string) =>
    line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);

  return (
    <div key={key} className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border border-border px-3 py-2 text-left font-medium text-foreground bg-muted/50"
              >
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-border px-3 py-2 text-muted-foreground"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[#CE9178] font-mono text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ------------------------------------------------------------------ */
/*  Section component                                                  */
/* ------------------------------------------------------------------ */
function LessonSectionView({
  section,
  index,
  onVisible,
}: {
  section: LessonSection;
  index: number;
  onVisible: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(section.id);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [section.id, onVisible]);

  return (
    <motion.section
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="scroll-mt-24"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>

        <div className="space-y-3">{renderContent(section.content)}</div>

        {section.codeExample && (
          <CodeBlock
            code={section.codeExample.code}
            language={section.codeExample.language}
            output={section.codeExample.output}
          />
        )}

        {section.miniQuiz && <MiniQuizCard quiz={section.miniQuiz} />}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Learn Page                                                    */
/* ------------------------------------------------------------------ */
export default function LearnPage() {
  const { sections } = unit1Lesson;
  const [readSections, setReadSections] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);

  const markVisible = useCallback((id: string) => {
    setReadSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const allRead = readSections.size >= sections.length;

  return (
    <div className="flex gap-8">
      {/* Left progress rail */}
      <aside className="hidden xl:block w-48 shrink-0">
        <div className="sticky top-24 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Sections
          </p>
          <nav className="space-y-0.5">
            {sections.map((s) => {
              const isRead = readSections.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cn(
                    "flex items-center gap-2 w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer",
                    isRead
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {isRead ? (
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="size-3.5 shrink-0" />
                  )}
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-12">
        {/* Mobile progress indicator */}
        <div className="xl:hidden flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-emerald-400" />
          <span>
            {readSections.size} / {sections.length} sections read
          </span>
        </div>

        {sections.map((section, idx) => (
          <LessonSectionView
            key={section.id}
            section={section}
            index={idx}
            onVisible={markVisible}
          />
        ))}

        {/* Footer */}
        <div className="border-t border-border pt-8 pb-8 text-center space-y-4">
          {completed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="text-4xl">{"\uD83C\uDF89"}</div>
              <p className="font-semibold text-foreground">
                Lesson Complete!
              </p>
              <Button render={<Link href="/unit/1/quiz" />}>
                Take the Quiz →
              </Button>
            </motion.div>
          ) : (
            <Button
              onClick={() => setCompleted(true)}
              size="lg"
              disabled={!allRead}
              className="h-10 px-6"
            >
              {allRead
                ? "\u2713 Mark as Complete"
                : `Read all sections to complete (${readSections.size}/${sections.length})`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}