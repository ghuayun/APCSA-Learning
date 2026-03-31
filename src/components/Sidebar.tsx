"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Menu, X, Flame, Star, Trophy } from "lucide-react";
import { units } from "@/content/units";
import { useProgress } from "@/stores/useProgress";
import { ProgressRing } from "@/components/ProgressRing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { currentStreak, totalXP, level } = useProgress();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary backdrop-blur-sm lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "glass fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Close navigation"
        >
          <X className="size-4" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Code2 className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              APCSA Hub
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Study Guide
            </p>
          </div>
        </div>

        {/* Units list */}
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-0.5 px-3">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Units
            </p>
            {units.map((unit) => {
              const href = `/unit/${unit.id}`;
              const isActive =
                pathname === href || pathname?.startsWith(`${href}/`);
              const up = useProgress.getState().unitProgress[unit.id];
              const topicCount = unit.topics.length || 1;
              const progress = up
                ? Math.min(
                    100,
                    Math.round(
                      ((up.lessonsComplete + up.codeLabsDone + up.frqsDone) /
                        (topicCount * 3)) *
                        100
                    )
                  )
                : 0;

              return (
                <Link
                  key={unit.id}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary-rgb,59,130,246),0.25)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <span className="text-base leading-none">{unit.icon}</span>
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                    <span className="truncate font-medium">
                      <span className="text-xs opacity-60">
                        {unit.id}.{" "}
                      </span>
                      {unit.title}
                    </span>
                  </div>
                  <ProgressRing
                    percentage={progress}
                    size={24}
                    strokeWidth={2.5}
                    color={
                      isActive
                        ? "oklch(0.65 0.24 264)"
                        : "oklch(0.55 0.15 264)"
                    }
                  />
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Stats footer */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 px-2 py-2">
              <Flame className="size-4 text-orange-400" />
              <span className="text-xs font-bold text-foreground">{currentStreak}</span>
              <span className="text-[10px] text-muted-foreground">Streak</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 px-2 py-2">
              <Star className="size-4 text-yellow-400" />
              <span className="text-xs font-bold text-foreground">{totalXP}</span>
              <span className="text-[10px] text-muted-foreground">XP</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 px-2 py-2">
              <Trophy className="size-4 text-emerald-400" />
              <span className="text-xs font-bold text-foreground">{level}</span>
              <span className="text-[10px] text-muted-foreground">Level</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
