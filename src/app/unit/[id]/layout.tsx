"use client";

import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { units } from "@/content/units";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Learn", slug: "learn" },
  { label: "Quiz", slug: "quiz" },
  { label: "Code Lab", slug: "code-lab" },
  { label: "FRQ", slug: "frq" },
  { label: "Review", slug: "review" },
] as const;

export default function UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pathname = usePathname();
  const unit = units.find((u) => u.id === Number(id));

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Unit not found</p>
        <Link href="/" className="text-primary hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const basePath = `/unit/${id}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Unit header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All Units
        </Link>

        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none">{unit.icon}</span>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Unit {unit.id}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {unit.title}
            </h1>
            <p className="text-sm text-muted-foreground">{unit.description}</p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <nav className="flex gap-1 overflow-x-auto border-b border-white/10 pb-px">
        {tabs.map((tab) => {
          const href = `${basePath}/${tab.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={tab.slug}
              href={href}
              className={cn(
                "relative shrink-0 rounded-t-md px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Tab content */}
      <div>{children}</div>
    </div>
  );
}
