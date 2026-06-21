/** Shared holographic UI class tokens — use with cn() across AirSmith */
export const holo = {
  /* ── Typography scale ── */
  logo: "font-logo text-[1.4rem] font-black leading-none tracking-[0.2em] uppercase logo-neon-glow",
  logoSub:
    "font-heading text-[10px] font-semibold tracking-[0.26em] text-neon/50 uppercase",
  sectionLabel:
    "font-heading text-[11px] font-bold tracking-[0.2em] text-neon/55 uppercase",
  categoryLabel:
    "font-heading text-[10px] font-semibold tracking-[0.14em] text-neon/70 uppercase",
  title: "font-heading text-sm font-bold tracking-tight text-foreground",
  titleNeon:
    "font-heading text-sm font-bold tracking-[0.16em] text-neon uppercase neon-text-subtle",
  body: "text-sm font-normal leading-relaxed text-foreground",
  bodySmall: "text-xs font-normal leading-snug text-foreground",
  bodyMuted: "text-sm leading-relaxed text-muted-foreground",
  bodyMutedSmall: "text-xs leading-snug text-muted-foreground",
  bodyDim: "text-xs leading-snug text-foreground/55",
  caption: "text-[10px] font-medium tracking-wide text-muted-foreground",
  monoMeta: "font-mono text-[10px] tracking-wide text-muted-foreground",
  neonValue: "font-mono text-xs font-semibold tabular-nums text-neon neon-text-subtle",
  neonValueLg:
    "font-mono text-2xl font-bold tabular-nums tracking-tight text-neon neon-text-subtle",
  neonHeading:
    "font-heading text-sm font-bold tracking-[0.18em] text-neon uppercase neon-text-subtle",
  purpleAccent: "font-heading text-holo-purple font-semibold neon-text-purple",

  /* ── Surfaces ── */
  panel: "glass-panel border-neon/15",
  panelEdgeRight:
    "absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-neon/40 to-holo-purple/30",
  panelEdgeLeft:
    "absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-neon/40 to-holo-purple/30",

  badge:
    "border border-neon/25 bg-neon/5 font-heading text-[10px] font-semibold tracking-wide text-neon shadow-neon-xs backdrop-blur-card",
  badgePurple:
    "border border-holo-purple/30 bg-holo-purple/10 font-heading text-[10px] font-semibold tracking-wide text-holo-purple shadow-neon-purple backdrop-blur-card",

  card: "glass-card rounded-lg transition-all duration-200",
  cardHover:
    "hover:border-neon/40 hover:bg-neon/5 hover:shadow-neon-sm active:scale-[0.98]",
  cardActive: "neon-border-active border-neon/60 bg-neon/10",

  iconBtn:
    "font-sans text-muted-foreground hover:bg-neon/10 hover:text-neon hover:shadow-neon-sm",
  primaryBtn:
    "font-heading font-semibold tracking-wide border border-neon/50 bg-neon/15 text-neon neon-glow-btn hover:bg-neon/25 hover:shadow-neon",
  outlineBtn:
    "font-heading font-semibold tracking-wide border-neon/25 bg-neon/5 text-neon hover:border-neon/50 hover:bg-neon/10 hover:shadow-neon-sm",

  statRow:
    "glass-card flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:border-neon/30 hover:shadow-glass-glow",
  emptyState:
    "rounded-lg border border-dashed border-neon/20 bg-neon/[0.02] backdrop-blur-card",
} as const;
