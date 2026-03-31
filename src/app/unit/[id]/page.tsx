"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { units } from "@/content/units";

/* ── colour helpers ─────────────────────────────────────────── */
const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#a855f7",
  yellow: "#eab308",
  green: "#22c55e",
  orange: "#f97316",
  red: "#ef4444",
  teal: "#14b8a6",
  pink: "#ec4899",
  indigo: "#6366f1",
  cyan: "#06b6d4",
};

const colorBgMap: Record<string, string> = {
  blue: "rgba(59,130,246,0.12)",
  purple: "rgba(168,85,247,0.12)",
  yellow: "rgba(234,179,8,0.12)",
  green: "rgba(34,197,94,0.12)",
  orange: "rgba(249,115,22,0.12)",
  red: "rgba(239,68,68,0.12)",
  teal: "rgba(20,184,166,0.12)",
  pink: "rgba(236,72,153,0.12)",
  indigo: "rgba(99,102,241,0.12)",
  cyan: "rgba(6,182,212,0.12)",
};

/* ── activities for every unit ──────────────────────────────── */
const activities = [
  {
    key: "learn",
    name: "Learn",
    icon: "📖",
    description: "Read the lesson material and key concepts",
    href: (id: number) => `/unit/${id}/learn`,
  },
  {
    key: "quiz",
    name: "Quiz",
    icon: "❓",
    description: "Test your knowledge with multiple-choice questions",
    href: (id: number) => `/unit/${id}/quiz`,
  },
  {
    key: "code-lab",
    name: "Code Lab",
    icon: "💻",
    description: "Write and run Java code in the browser",
    href: (id: number) => `/unit/${id}/code-lab`,
  },
  {
    key: "frq",
    name: "FRQ Practice",
    icon: "✍️",
    description: "Tackle AP-style free-response questions",
    href: (id: number) => `/unit/${id}/frq`,
  },
  {
    key: "review",
    name: "Review",
    icon: "📝",
    description: "Recap key terms and common pitfalls",
    href: (id: number) => `/unit/${id}/review`,
  },
];

/* ── animation variants ────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ── page ───────────────────────────────────────────────────── */
export default function UnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const unitId = Number(id);
  const unit = units.find((u) => u.id === unitId);

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="text-xl font-bold text-foreground">Unit not found</h1>
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const accent = colorMap[unit.color] ?? "#6366f1";
  const accentBg = colorBgMap[unit.color] ?? "rgba(99,102,241,0.12)";

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ─── Back link ────────────────────────────────────── */}
      <motion.div variants={fadeUp}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Dashboard
        </Link>
      </motion.div>

      {/* ─── Unit Header ──────────────────────────────────── */}
      <motion.section
        variants={fadeUp}
        className="glass rounded-2xl p-6 sm:p-8"
        style={{ borderLeft: `4px solid ${accent}` }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-xl text-3xl"
            style={{ background: accentBg }}
          >
            {unit.icon}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: accent, background: accentBg }}
              >
                Unit {unit.id}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {unit.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {unit.description}
            </p>
          </div>
        </div>
      </motion.section>

      {/* ─── Topics ───────────────────────────────────────── */}
      <motion.section variants={fadeUp}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          What you&apos;ll learn
        </h2>
        <div className="glass rounded-xl p-5">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {unit.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <span
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ color: accent, background: accentBg }}
                >
                  {i + 1}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ─── Activity Cards ───────────────────────────────── */}
      <motion.section variants={fadeUp}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Activities
        </h2>

        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {activities.map((activity) => (
            <motion.div key={activity.key} variants={fadeUp}>
              <Link
                href={activity.href(unit.id)}
                className="glass group relative flex flex-col gap-3 rounded-xl p-5 transition-all duration-200 hover:ring-1 hover:ring-white/20 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-10 items-center justify-center rounded-lg text-xl"
                    style={{ background: accentBg }}
                  >
                    {activity.icon}
                  </div>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Not started
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-[15px] font-semibold text-foreground group-hover:text-white transition-colors">
                    {activity.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <div
                  className="mt-auto flex h-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors"
                  style={{ color: accent, background: accentBg }}
                >
                  Start →
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
