/** Shared tactical UI tokens — grounded military operator software */
export const holo = {
  logo: "font-logo text-[1.35rem] font-bold leading-none tracking-[0.16em] uppercase text-foreground",
  logoSub:
    "font-heading text-[10px] font-semibold tracking-[0.2em] text-steel uppercase",
  sectionLabel:
    "font-heading text-[11px] font-bold tracking-[0.16em] text-sage-light uppercase",
  categoryLabel:
    "font-heading text-[10px] font-semibold tracking-[0.1em] text-steel uppercase",
  title: "font-heading text-sm font-bold tracking-tight text-foreground",
  titleAccent:
    "font-heading text-sm font-bold tracking-[0.08em] text-sage-light uppercase",
  body: "text-sm font-normal leading-relaxed text-foreground",
  bodySmall: "text-xs font-normal leading-snug text-foreground",
  bodyMuted: "text-sm leading-relaxed text-muted-foreground",
  bodyMutedSmall: "text-xs leading-snug text-muted-foreground",
  bodyDim: "text-xs leading-snug text-steel",
  caption: "text-[10px] font-medium tracking-wide text-muted-foreground",
  monoMeta: "font-mono text-[10px] tracking-wide text-steel",
  accentValue: "font-mono text-xs font-semibold tabular-nums text-sage-light",
  accentValueLg:
    "font-mono text-2xl font-bold tabular-nums tracking-tight text-sage-light",
  accentHeading:
    "font-heading text-sm font-bold tracking-[0.12em] text-sage-light uppercase",
  sandAccent: "font-heading text-steel-light font-semibold",

  panel: "tactical-panel border-charcoal-border",
  panelEdgeRight: "absolute inset-y-0 right-0 w-px bg-charcoal-border-light/50",
  panelEdgeLeft: "absolute inset-y-0 left-0 w-px bg-charcoal-border-light/50",

  badge:
    "border border-charcoal-border-light bg-charcoal-raised font-heading text-[10px] font-semibold tracking-wide text-sage-light",
  badgeMuted:
    "border border-charcoal-border bg-charcoal-raised font-heading text-[10px] font-semibold tracking-wide text-steel",

  card: "tactical-card rounded-sm transition-colors duration-150",
  cardHover:
    "hover:border-charcoal-border-light hover:bg-charcoal-panel active:scale-[0.99]",
  cardActive: "border-sage-dim/50 bg-sage-dim/10 shadow-tactical-active",

  iconBtn:
    "font-sans text-muted-foreground hover:bg-charcoal-raised hover:text-sage-light",
  primaryBtn:
    "font-heading font-semibold tracking-wide border border-sage-dim/50 bg-sage-dim/20 text-sage-light hover:bg-sage-dim/30 hover:border-sage/40",
  outlineBtn:
    "font-heading font-semibold tracking-wide border-charcoal-border-light bg-charcoal-raised text-steel-light hover:border-steel-dim hover:text-foreground",

  statRow:
    "tactical-card flex items-center justify-between rounded-sm px-3 py-2 transition-colors hover:border-charcoal-border-light hover:bg-charcoal-panel",
  emptyState:
    "rounded-sm border border-dashed border-charcoal-border bg-charcoal-deep/60",
} as const;
