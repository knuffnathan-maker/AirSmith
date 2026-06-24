/** Shared tactical UI class tokens — use with cn() across AirSmith */
export const holo = {
  /* ── Typography ── */
  logo: "font-logo text-[1.35rem] font-bold leading-none tracking-[0.18em] uppercase text-foreground",
  logoSub:
    "font-heading text-[10px] font-semibold tracking-[0.22em] text-tactical-gray uppercase",
  sectionLabel:
    "font-heading text-[11px] font-bold tracking-[0.18em] text-olive-bright uppercase",
  categoryLabel:
    "font-heading text-[10px] font-semibold tracking-[0.12em] text-tactical-gray uppercase",
  title: "font-heading text-sm font-bold tracking-tight text-foreground",
  titleAccent:
    "font-heading text-sm font-bold tracking-[0.1em] text-olive-bright uppercase",
  body: "text-sm font-normal leading-relaxed text-foreground",
  bodySmall: "text-xs font-normal leading-snug text-foreground",
  bodyMuted: "text-sm leading-relaxed text-muted-foreground",
  bodyMutedSmall: "text-xs leading-snug text-muted-foreground",
  bodyDim: "text-xs leading-snug text-tactical-gray",
  caption: "text-[10px] font-medium tracking-wide text-muted-foreground",
  monoMeta: "font-mono text-[10px] tracking-wide text-tactical-gray",
  accentValue: "font-mono text-xs font-semibold tabular-nums text-olive-bright",
  accentValueLg:
    "font-mono text-2xl font-bold tabular-nums tracking-tight text-olive-bright",
  accentHeading:
    "font-heading text-sm font-bold tracking-[0.14em] text-olive-bright uppercase",
  sandAccent: "font-heading text-tactical-sand font-semibold",

  /* ── Surfaces ── */
  panel: "tactical-panel border-matte-border",
  panelEdgeRight:
    "absolute inset-y-0 right-0 w-px bg-matte-border-light/60",
  panelEdgeLeft:
    "absolute inset-y-0 left-0 w-px bg-matte-border-light/60",

  badge:
    "border border-matte-border-light bg-matte-raised font-heading text-[10px] font-semibold tracking-wide text-olive-bright",
  badgeMuted:
    "border border-matte-border bg-matte-raised font-heading text-[10px] font-semibold tracking-wide text-tactical-gray",

  card: "tactical-card rounded-sm transition-colors duration-150",
  cardHover:
    "hover:border-matte-border-light hover:bg-matte-raised active:scale-[0.99]",
  cardActive:
    "border-olive-dim/60 bg-olive-deep/20 shadow-tactical-active",

  iconBtn:
    "font-sans text-muted-foreground hover:bg-matte-raised hover:text-olive-bright",
  primaryBtn:
    "font-heading font-semibold tracking-wide border border-olive-dim bg-olive-deep/40 text-olive-bright hover:bg-olive-deep/60 hover:border-olive-bright/50",
  outlineBtn:
    "font-heading font-semibold tracking-wide border-matte-border-light bg-matte-raised text-tactical-gray hover:border-olive-dim/50 hover:text-olive-bright",

  statRow:
    "tactical-card flex items-center justify-between rounded-sm px-3 py-2 transition-colors hover:border-matte-border-light hover:bg-matte-raised",
  emptyState:
    "rounded-sm border border-dashed border-matte-border bg-matte-deep/50",
} as const;
