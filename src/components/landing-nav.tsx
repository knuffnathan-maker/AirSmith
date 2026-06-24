"use client";

import { Crosshair } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-border/80 bg-charcoal-black/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded border border-charcoal-border-light bg-charcoal-raised">
            <Crosshair className="size-4 text-sage-light" strokeWidth={2} />
          </div>
          <div>
            <p className="font-heading text-sm font-bold tracking-[0.14em] text-foreground uppercase">
              AirSmith
            </p>
            <p className="text-[10px] font-medium tracking-[0.2em] text-steel uppercase">
              Mod Bench
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => scrollTo("signup")}
            className={cn(
              "hidden h-9 items-center rounded px-4 text-sm font-medium text-steel-light",
              "transition-colors hover:text-foreground sm:inline-flex"
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => scrollTo("preview")}
            className={cn(
              "inline-flex h-9 items-center rounded border border-charcoal-border-light",
              "bg-charcoal-raised px-4 text-sm font-medium text-foreground",
              "transition-colors hover:border-sage-dim/60 hover:bg-charcoal-panel"
            )}
          >
            Try the App
          </button>
          <Link
            href="/builder"
            className={cn(
              "inline-flex h-9 items-center rounded border border-sage-dim/50",
              "bg-sage-dim/20 px-4 text-sm font-semibold text-sage-light",
              "transition-colors hover:border-sage/50 hover:bg-sage-dim/30"
            )}
          >
            Open Prototype
          </Link>
        </nav>
      </div>
    </header>
  );
}
