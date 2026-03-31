import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UnitProgress {
  lessonsComplete: number;
  quizBest: number;
  codeLabsDone: number;
  frqsDone: number;
}

export type Level =
  | "Java Novice"
  | "Code Apprentice"
  | "Algorithm Adept"
  | "AP Ready"
  | "CS Master";

export interface ProgressState {
  currentStreak: number;
  totalXP: number;
  level: Level;
  unitProgress: Record<number, UnitProgress>;
  lastActiveDate: string | null; // ISO date string (YYYY-MM-DD)

  // Actions
  addXP: (amount: number) => void;
  completeLesson: (unitId: number) => void;
  recordQuiz: (unitId: number, score: number, total: number) => void;
  completeCodeLab: (unitId: number) => void;
  completeFRQ: (unitId: number) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LEVEL_THRESHOLDS: [number, Level][] = [
  [5000, "CS Master"],
  [3000, "AP Ready"],
  [1500, "Algorithm Adept"],
  [500, "Code Apprentice"],
  [0, "Java Novice"],
];

function computeLevel(xp: number): Level {
  for (const [threshold, label] of LEVEL_THRESHOLDS) {
    if (xp >= threshold) return label;
  }
  return "Java Novice";
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(lastActiveDate: string | null, currentStreak: number) {
  const today = todayISO();

  if (lastActiveDate === today) {
    return { currentStreak, lastActiveDate: today };
  }

  if (lastActiveDate) {
    const last = new Date(lastActiveDate);
    const now = new Date(today);
    const diffMs = now.getTime() - last.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return { currentStreak: currentStreak + 1, lastActiveDate: today };
    }
  }

  // First visit or streak broken
  return { currentStreak: 1, lastActiveDate: today };
}

function ensureUnit(
  progress: Record<number, UnitProgress>,
  unitId: number,
): UnitProgress {
  return (
    progress[unitId] ?? {
      lessonsComplete: 0,
      quizBest: 0,
      codeLabsDone: 0,
      frqsDone: 0,
    }
  );
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      currentStreak: 0,
      totalXP: 0,
      level: "Java Novice" as Level,
      unitProgress: {},
      lastActiveDate: null,

      addXP: (amount) =>
        set((s) => {
          const totalXP = s.totalXP + amount;
          const streak = updateStreak(s.lastActiveDate, s.currentStreak);
          return { totalXP, level: computeLevel(totalXP), ...streak };
        }),

      completeLesson: (unitId) =>
        set((s) => {
          const unit = ensureUnit(s.unitProgress, unitId);
          const totalXP = s.totalXP + 50;
          const streak = updateStreak(s.lastActiveDate, s.currentStreak);
          return {
            totalXP,
            level: computeLevel(totalXP),
            ...streak,
            unitProgress: {
              ...s.unitProgress,
              [unitId]: { ...unit, lessonsComplete: unit.lessonsComplete + 1 },
            },
          };
        }),

      recordQuiz: (unitId, score, total) =>
        set((s) => {
          const unit = ensureUnit(s.unitProgress, unitId);
          const pct = total > 0 ? Math.round((score / total) * 100) : 0;
          const quizBest = Math.max(unit.quizBest, pct);
          const xpGain = Math.round((score / Math.max(total, 1)) * 100);
          const totalXP = s.totalXP + xpGain;
          const streak = updateStreak(s.lastActiveDate, s.currentStreak);
          return {
            totalXP,
            level: computeLevel(totalXP),
            ...streak,
            unitProgress: {
              ...s.unitProgress,
              [unitId]: { ...unit, quizBest },
            },
          };
        }),

      completeCodeLab: (unitId) =>
        set((s) => {
          const unit = ensureUnit(s.unitProgress, unitId);
          const totalXP = s.totalXP + 75;
          const streak = updateStreak(s.lastActiveDate, s.currentStreak);
          return {
            totalXP,
            level: computeLevel(totalXP),
            ...streak,
            unitProgress: {
              ...s.unitProgress,
              [unitId]: { ...unit, codeLabsDone: unit.codeLabsDone + 1 },
            },
          };
        }),

      completeFRQ: (unitId) =>
        set((s) => {
          const unit = ensureUnit(s.unitProgress, unitId);
          const totalXP = s.totalXP + 150;
          const streak = updateStreak(s.lastActiveDate, s.currentStreak);
          return {
            totalXP,
            level: computeLevel(totalXP),
            ...streak,
            unitProgress: {
              ...s.unitProgress,
              [unitId]: { ...unit, frqsDone: unit.frqsDone + 1 },
            },
          };
        }),
    }),
    { name: "apcsa-progress" },
  ),
);
