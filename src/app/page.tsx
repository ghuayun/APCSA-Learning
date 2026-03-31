"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { units } from "@/content/units";

/* ── colour map ─────────────────────────────────────────────── */
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

/* ── mock data (to be wired up to Zustand later) ───────────── */
const mockStats = {
  level: "Code Apprentice",
  xp: 750,
  xpMax: 1500,
  streak: 3,
  totalAnswered: 42,
  accuracy: 78,
  unitsCompleted: 0,
};

/* ── animation variants ────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ── page ───────────────────────────────────────────────────── */
export default function Home() {
  const xpPercent = Math.round((mockStats.xp / mockStats.xpMax) * 100);

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ─── Hero ─────────────────────────────────────────── */}
      <motion.section variants={fadeUp} className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back! 🚀
            </h1>
            <p className="text-sm text-muted-foreground">
              {mockStats.level} — {mockStats.xp.toLocaleString()}/{mockStats.xpMax.toLocaleString()} XP
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-orange-500/10 px-4 py-2.5">
            <span className="text-2xl">🔥</span>
            <div className="leading-tight">
              <p className="text-lg font-bold text-orange-400">{mockStats.streak}</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-orange-400/70">
                day streak
              </p>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Level progress</span>
            <span className="tabular-nums">{xpPercent}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </motion.section>

      {/* ─── Quick Stats ──────────────────────────────────── */}
      <motion.section
        variants={fadeUp}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Questions Answered", value: mockStats.totalAnswered, icon: "📝" },
          { label: "Accuracy", value: `${mockStats.accuracy}%`, icon: "🎯" },
          { label: "Units Completed", value: `${mockStats.unitsCompleted}/10`, icon: "✅" },
          { label: "Current Streak", value: `${mockStats.streak} days`, icon: "🔥" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass flex flex-col items-center gap-2 rounded-xl px-4 py-4 text-center"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.section>

      {/* ─── Unit Grid ────────────────────────────────────── */}
      <div>
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-lg font-semibold tracking-tight text-foreground"
        >
          Your Units
        </motion.h2>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {units.map((unit) => {
            const accent = colorMap[unit.color] ?? "#6366f1";
            const accentBg = colorBgMap[unit.color] ?? "rgba(99,102,241,0.12)";
            const progress = unit.progress;
            const started = progress > 0;

            return (
              <motion.div key={unit.id} variants={fadeUp}>
                <Link
                  href={`/unit/${unit.id}`}
                  className="glass group relative flex flex-col gap-4 overflow-hidden rounded-xl p-5 transition-all duration-200 hover:ring-1 hover:ring-white/20 hover:shadow-lg hover:shadow-black/20"
                  style={{ borderLeft: `3px solid ${accent}` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg text-xl"
                      style={{ background: accentBg }}
                    >
                      {unit.icon}
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: accent, background: accentBg }}
                    >
                      Unit {unit.id}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-0.5">
                    <h3 className="text-[15px] font-semibold text-foreground group-hover:text-white transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {unit.subtitle}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Progress</span>
                      <span className="tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          background: accent,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-auto flex h-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors"
                    style={{
                      color: accent,
                      background: accentBg,
                    }}
                  >
                    {started ? "Continue →" : "Start →"}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
