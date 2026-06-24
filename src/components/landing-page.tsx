"use client";

"use client";

import { BarChart3, Box, Layers } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

import { LandingAppPreview } from "@/components/landing-app-preview";
import { LandingNav } from "@/components/landing-nav";
import { LandingSignIn } from "@/components/landing-sign-in";
import { LandingThankYou } from "@/components/landing-thank-you";
import { cn } from "@/lib/utils";

type LandingPageProps = {
  user: User | null;
  authError?: boolean;
};

const features = [
  {
    icon: Layers,
    title: "Platform Selector & Parts Library",
    description:
      "Choose AAP-01 or Hi-Capa and drag real parts. Every component is filtered to what actually fits your platform.",
  },
  {
    icon: BarChart3,
    title: "Live Stats & Compatibility",
    description:
      'See fitment, cost estimates, and "Worth It?" scores in real time as you build — no guesswork.',
  },
  {
    icon: Box,
    title: "Realistic 3D Viewer",
    description:
      "Assemble and inspect your build with accurate lighting and measurements. Orbit, pan, and zoom like a real workbench.",
  },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function LandingPage({ user, authError }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-charcoal-black text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,#0c0d0c_0%,#0a0b0a_40%,#080908_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(122,130,137,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(122,130,137,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(92,122,148,0.06)_0%,transparent_50%)]" />

      <div className="relative z-10">
        <LandingNav />

        {/* ── Hero ── */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-heading text-xs font-semibold tracking-[0.2em] text-sage uppercase">
                PC-First Virtual Mod Bench
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                Build Better Airsoft Guns
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-steel-light sm:text-lg">
                The realistic PC-first virtual mod bench. Configure parts, test
                compatibility, calculate costs, and visualize builds in accurate
                3D.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo("preview")}
                  className={cn(
                    "inline-flex h-11 items-center rounded border border-sage-dim/50",
                    "bg-sage-dim/25 px-6 text-sm font-semibold text-sage-light",
                    "transition-colors hover:border-sage/50 hover:bg-sage-dim/35"
                  )}
                >
                  See the App
                </button>
                <Link
                  href="/builder"
                  className={cn(
                    "inline-flex h-11 items-center rounded border border-charcoal-border-light",
                    "bg-charcoal-raised px-6 text-sm font-medium text-foreground",
                    "transition-colors hover:border-steel-dim hover:bg-charcoal-panel"
                  )}
                >
                  Try the App
                </Link>
              </div>
              <p className="mt-6 font-mono text-[11px] tracking-wide text-steel">
                AAP-01 · Hi-Capa · Live compatibility · STL-ready exports
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-accent-blue/5 blur-2xl" />
              <LandingAppPreview large className="relative" />
            </div>
          </div>
        </section>

        {/* ── Feature cards ── */}
        <section className="border-y border-charcoal-border bg-charcoal-void/80">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className={cn(
                    "group rounded-lg border border-charcoal-border bg-charcoal-panel p-6",
                    "transition-colors hover:border-charcoal-border-light hover:bg-charcoal-raised/60"
                  )}
                >
                  <div className="flex size-10 items-center justify-center rounded border border-charcoal-border-light bg-charcoal-raised">
                    <Icon className="size-5 text-sage-light" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-light">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── See the App ── */}
        <section id="preview" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-heading text-xs font-semibold tracking-[0.2em] text-accent-blue uppercase">
                Interface Preview
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                See the App
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-light">
                Three panels. One workflow. Platform selector and parts library on
                the left, realistic 3D assembly in the center, live stats and cost
                breakdown on the right — built like military planning software.
              </p>
            </div>

            <div className="relative mt-12">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-accent-blue/5 to-transparent" />
              <LandingAppPreview large className="relative mx-auto max-w-5xl" />
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/builder"
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded border border-sage-dim/50",
                  "bg-sage-dim/25 px-8 text-sm font-semibold text-sage-light",
                  "transition-colors hover:border-sage/50 hover:bg-sage-dim/35"
                )}
              >
                Open the Prototype
              </Link>
            </div>
          </div>
        </section>

        {/* ── Coming Soon / Signup ── */}
        <section
          id="signup"
          className="scroll-mt-20 border-t border-charcoal-border bg-charcoal-void/90"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-heading text-xs font-semibold tracking-[0.2em] text-sage uppercase">
                  Coming Soon
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Want early access?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-steel-light sm:text-base">
                  Sign up with your email to register interest. Your signup helps
                  prioritize features and shows who genuinely wants a professional
                  airsoft mod bench — not just curious clicks.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-sage" />
                    No password — magic link sign-in
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-sage" />
                    Be first when full builds go live
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-sage" />
                    Help shape the roadmap
                  </li>
                </ul>
              </div>

              <div>
                {user ? (
                  <LandingThankYou email={user.email ?? "your account"} />
                ) : (
                  <LandingSignIn authError={authError} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-charcoal-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
            <p className="font-mono text-[11px] tracking-wide text-steel">
              AIRSMITH v0.1 — TACTICAL MOD BENCH
            </p>
            <div className="flex gap-6 text-sm text-steel">
              <Link href="/builder" className="transition-colors hover:text-foreground">
                Prototype
              </Link>
              <button
                type="button"
                onClick={() => scrollTo("signup")}
                className="transition-colors hover:text-foreground"
              >
                Sign In
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
