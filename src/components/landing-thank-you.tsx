"use client";

import { CheckCircle2, LogOut, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
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
    <div className="rounded-lg border border-charcoal-border-light bg-charcoal-panel p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded border border-sage-dim/40 bg-sage-dim/15">
          <CheckCircle2 className="size-5 text-sage-light" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Thank you for signing up
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-steel-light">
            Your registration at{" "}
            <span className="font-medium text-foreground">{email}</span> is
            recorded. That tells me who would{" "}
            <span className="text-foreground">really</span> want a professional
            airsoft mod bench.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-steel">
            I use this list to prioritize features, gauge demand, and reach out
            when the builder opens up.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link
          href="/builder"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded border border-sage-dim/50",
            "bg-sage-dim/25 px-4 text-sm font-semibold text-sage-light",
            "transition-colors hover:bg-sage-dim/35"
          )}
        >
          <Wrench className="size-4" />
          Open the prototype
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-steel hover:text-foreground"
        >
          <LogOut />
          Sign out
        </Button>
      </div>
    </div>
  );
}
