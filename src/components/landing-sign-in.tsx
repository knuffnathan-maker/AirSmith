"use client";

import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { holo } from "@/lib/holo-styles";
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
      <div className={cn("glass-card rounded-xl p-6 text-center", holo.panel)}>
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-neon/40 bg-neon/10">
          <Mail className="size-5 text-neon" />
        </div>
        <p className={holo.neonHeading}>Check your inbox</p>
        <p className={cn("mt-3", holo.bodyMuted)}>
          We sent a sign-in link to{" "}
          <span className="font-medium text-neon">{email}</span>. Click it to
          confirm your spot — you&apos;ll land back here with a thank-you note.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-xl p-6", holo.panel)}>
      <p className={holo.sectionLabel}>// Early access</p>
      <h2 className="mt-2 font-heading text-xl font-bold tracking-tight text-foreground">
        Want to participate?
      </h2>
      <p className={cn("mt-2", holo.bodyMuted)}>
        Sign in with your email to register interest. No password — we&apos;ll
        send you a one-time link.
      </p>

      {authError && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
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
            "w-full rounded-lg border border-neon/25 bg-neon/[0.04] px-4 py-2.5",
            "font-sans text-sm text-foreground placeholder:text-muted-foreground",
            "transition-colors focus:border-neon/50 focus:outline-none focus:ring-2 focus:ring-neon/20",
            "disabled:opacity-50"
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || !email.trim()}
          className={cn("w-full", holo.primaryBtn)}
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send />
          )}
          Sign in here
        </Button>
      </form>

      {status === "error" && message && (
        <p className="mt-3 text-xs text-destructive">{message}</p>
      )}
    </div>
  );
}
