import { Crosshair, Layers, Target } from "lucide-react";
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
    icon: Target,
    label: "Live compatibility",
    detail: "FPS, weight, and fit scores update as you assemble.",
  },
  {
    icon: Crosshair,
    label: "Tactical mod bench",
    detail: "A professional planning workspace built for serious operators.",
  },
] as const;

export function LandingPage({ user, authError }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-matte-void">
      <div className="pointer-events-none absolute inset-0 bg-tactical-bg" />
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#080907_85%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-10 sm:px-8 sm:py-14">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-sm border border-matte-border-light bg-matte-raised">
              <Crosshair className="size-5 text-olive-bright" strokeWidth={2} />
            </div>
            <div>
              <p className={holo.logo}>AirSmith</p>
              <p className={holo.logoSub}>Tactical Mod Bench</p>
            </div>
          </div>
          <Link
            href="/builder"
            className={cn(
              "inline-flex h-7 items-center gap-1 rounded-sm px-2.5 text-[0.8rem]",
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
              <span className="text-olive-bright">tactical</span> workspace
            </h1>
            <p className={cn("mt-4 max-w-xl", holo.bodyMuted)}>
              AirSmith is a PC-first mod bench: platform selector, parts library,
              live stats, and a 3D assembly viewer — built like military planning
              software for operators who actually run their kit.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {features.map(({ icon: Icon, label, detail }) => (
              <li
                key={label}
                className={cn(
                  "tactical-card rounded-sm p-4 transition-colors hover:border-matte-border-light",
                  holo.panel
                )}
              >
                <Icon className="size-4 text-olive-bright" strokeWidth={2} />
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

        <footer className="mt-14 border-t border-matte-border pt-6">
          <p className={holo.monoMeta}>
            SYS.STATUS: PREVIEW // BUILD v0.1 // TACTICAL INTERFACE ONLINE
          </p>
        </footer>
      </div>
    </div>
  );
}
