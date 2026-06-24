"use client";

import { CheckCircle2, LogOut, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { holo } from "@/lib/holo-styles";
import { cn } from "@/lib/utils";

type LandingThankYouProps = {
  email: string;
};

export function LandingThankYou({ email }: LandingThankYouProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div className={cn("tactical-card rounded-sm p-6", holo.panel)}>
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-olive-dim/50 bg-olive-deep/20">
          <CheckCircle2 className="size-6 text-olive-bright" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={holo.sectionLabel}>// You&apos;re on the list</p>
          <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">
            Thank you for signing up
          </h2>
          <p className={cn("mt-3", holo.bodyMuted)}>
            Your registration at{" "}
            <span className="font-medium text-olive-bright">{email}</span> is recorded.
            That single step tells me who would{" "}
            <span className="text-foreground">really</span> want a tactical airsoft
            mod bench — not just curious clicks, but people willing to put their name
            on it.
          </p>
          <p className={cn("mt-3", holo.bodyMutedSmall)}>
            I use this list to prioritize features, gauge demand, and reach out
            when the builder opens up. You&apos;re helping shape what AirSmith
            becomes.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link
          href="/builder"
          className={cn(
            "inline-flex h-7 items-center gap-1 rounded-sm px-2.5 text-[0.8rem]",
            holo.primaryBtn
          )}
        >
          <Wrench className="size-3.5" />
          Open the prototype
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={holo.iconBtn}
        >
          <LogOut />
          Sign out
        </Button>
      </div>
    </div>
  );
}
