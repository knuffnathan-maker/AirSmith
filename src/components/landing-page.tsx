import { Cpu, Layers, Zap } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

import { LandingSignIn } from "@/components/landing-sign-in";
import { LandingThankYou } from "@/components/landing-thank-you";
import { holo } from "@/lib/holo-styles";
import { cn } from "@/lib/utils";

type LandingPageProps = {
  user: User | null;
  authError?: boolean;
};

const features = [
  {
    icon: Layers,
    label: "Platform-first builds",
    detail: "Pick your base — parts filter to what actually fits.",
  },
  {
    icon: Cpu,
    label: "Live compatibility",
    detail: "FPS, weight, and fit scores update as you assemble.",
  },
  {
    icon: Zap,
    label: "Holographic bench",
    detail: "A cyberpunk mod workspace built for serious tinkering.",
  },
] as const;

export function LandingPage({ user, authError }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-space-void">
      <div className="pointer-events-none absolute inset-0 bg-holo-bg" />
      <div className="pointer-events-none absolute inset-0 holo-grid bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[28rem] rounded-full bg-neon/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-96 rounded-full bg-holo-purple/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030508_75%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-10 sm:px-8 sm:py-14">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-md border border-neon/40 bg-neon/10 neon-glow-btn">
              <Zap className="size-5 text-neon" strokeWidth={2.5} />
            </div>
            <div>
              <p className={holo.logo}>AirSmith</p>
              <p className={holo.logoSub}>Holographic 3D Mod Bench</p>
            </div>
          </div>
          <Link
            href="/builder"
            className={cn(
              "inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem]",
              holo.outlineBtn
            )}
          >
            Prototype
          </Link>
        </header>

        <main className="mt-14 flex flex-1 flex-col justify-center sm:mt-20">
          <div className="max-w-2xl">
            <p className={holo.sectionLabel}>// Coming soon</p>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Configure airsoft builds in a{" "}
              <span className="text-neon neon-text-subtle">holographic</span>{" "}
              workspace
            </h1>
            <p className={cn("mt-4 max-w-xl", holo.bodyMuted)}>
              AirSmith is a PC-first mod bench: platform selector, parts
              library, live stats, and a 3D assembly viewer — styled like
              tactical HUD tech, built for people who actually run their guns.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {features.map(({ icon: Icon, label, detail }) => (
              <li
                key={label}
                className={cn(
                  "glass-card rounded-lg p-4 transition-colors hover:border-neon/30",
                  holo.panel
                )}
              >
                <Icon className="size-4 text-neon" strokeWidth={2} />
                <p className="mt-2 font-heading text-xs font-bold tracking-wide text-foreground uppercase">
                  {label}
                </p>
                <p className={cn("mt-1", holo.bodyDim)}>{detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-md">
            {user ? (
              <LandingThankYou email={user.email ?? "your account"} />
            ) : (
              <LandingSignIn authError={authError} />
            )}
          </div>
        </main>

        <footer className="mt-14 border-t border-neon/10 pt-6">
          <p className={holo.monoMeta}>
            SYS.STATUS: PREVIEW // BUILD v0.1 // HOLO INTERFACE ONLINE
          </p>
        </footer>
      </div>
    </div>
  );
}
