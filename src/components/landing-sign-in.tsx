"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type LandingSignInProps = {
  authError?: boolean;
};

export function LandingSignIn({ authError }: LandingSignInProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-charcoal-border-light bg-charcoal-panel p-6 text-center">
        <p className="font-heading text-sm font-bold tracking-wide text-sage-light uppercase">
          Check your inbox
        </p>
        <p className="mt-3 text-sm leading-relaxed text-steel-light">
          We sent a sign-in link to{" "}
          <span className="font-medium text-foreground">{email}</span>. Click it
          to confirm your spot.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-charcoal-border-light bg-charcoal-panel p-6 sm:p-8">
      <h3 className="font-heading text-lg font-bold text-foreground">
        Sign in with email
      </h3>
      <p className="mt-2 text-sm text-steel-light">
        No password required. We&apos;ll send a one-time link.
      </p>

      {authError && (
        <p className="mt-4 rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          Sign-in link expired or was invalid. Request a new one below.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={cn(
            "w-full rounded border border-charcoal-border bg-charcoal-raised px-4 py-3",
            "text-sm text-foreground placeholder:text-steel",
            "transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30",
            "disabled:opacity-50"
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || !email.trim()}
          className={cn(
            "h-11 w-full rounded border border-sage-dim/50 bg-sage-dim/25",
            "font-semibold text-sage-light hover:bg-sage-dim/35"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send />
          )}
          Get early access
        </Button>
      </form>

      {status === "error" && message && (
        <p className="mt-3 text-xs text-destructive">{message}</p>
      )}
    </div>
  );
}
