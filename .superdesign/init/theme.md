# Theme

## Part 1 — Compact token summary

**Stack**: Tailwind CSS v4, CSS-first config (`@theme inline` in `globals.css`) — no `tailwind.config.*` file exists in this project. Dark-only design (`color-scheme: dark` set on `html`; no light mode).

**Color palette** (defined in `:root`, mapped 1:1 to Tailwind color tokens via `@theme inline`):

| Token | Value | Tailwind class | Role |
|---|---|---|---|
| `--background` | `#06070c` | `bg-background` | Page base — near-black |
| `--background-elevated` | `#0c0e17` | `bg-background-elevated` | Card/panel surface (used at `/60` opacity) |
| `--foreground` | `#f4f5fa` | `text-foreground` | Primary text — near-white |
| `--foreground-muted` | `#9aa0b4` | `text-foreground-muted` | Secondary/body text |
| `--foreground-subtle` | `#5c6178` | `text-foreground-subtle` | Tertiary/label text |
| `--accent` | `#8b5cf6` | `text-accent` / `bg-accent` | Primary accent — violet |
| `--accent-2` | `#22d3ee` | `text-accent-2` / `bg-accent-2` | Secondary accent — cyan |
| `--accent-warm` | `#ff8a5c` | `text-accent-warm` | Warm accent (defined, not currently used in any component) |
| `--border` | `rgba(244,245,250,0.08)` | `border-border` | Default hairline border |
| `--border-strong` | `rgba(244,245,250,0.16)` | `border-border-strong` | Emphasized border (hover states, nav) |

The signature look is a **violet→cyan gradient** (`.text-gradient` utility: `linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 100%)`, clipped to text) used sparingly for emphasis words (e.g. "programmer." in the hero, "Let's talk." in contact) — never as a full-page background gradient.

**Typography** — 3 Google Fonts via `next/font/google`, all variable-mapped:

| Font | CSS var | Tailwind token | Role |
|---|---|---|---|
| Inter | `--font-inter` | `font-sans` (default body) | Body copy |
| Space Grotesk | `--font-space-grotesk` | `font-display` | All headings (`h1`–`h3`), big numerals |
| JetBrains Mono | `--font-jetbrains-mono` | `font-mono` | Eyebrow labels, nav links, tags/chips, timestamps — always `uppercase tracking-widest` or `tracking-[0.25em]` |

Type scale is Tailwind's default scale (`text-xs` → `text-7xl`), no custom scale. Headings are large and tight (`leading-[1.05]`, `tracking-tight`). Eyebrow/mono labels are consistently `text-xs uppercase tracking-[0.25em] text-accent-2` (section labels) or `text-[10px]`/`text-[11px]` for finer chips.

**Spacing / layout**: standard Tailwind spacing scale. Sections use `px-6 py-28 md:px-10 md:py-36` (generous vertical rhythm). Max content width `max-w-6xl`, centered. No custom spacing scale.

**Border radius**: generous and consistent — `rounded-full` for pills/buttons/nav chips, `rounded-2xl`/`rounded-3xl` for cards, up to `rounded-[2rem]`/`rounded-[3rem]` for the hero portrait card and its ambient glow.

**Shadows**: minimal — the only explicit box-shadow is on the floating portrait avatar: `shadow-[0_8px_30px_rgba(0,0,0,0.55)]`. Depth is otherwise conveyed via blurred gradient "glow" blobs (`blur-[120px]`, `blur-3xl`) rather than drop shadows — fits the dark theme (shadows barely read on near-black).

**Breakpoints**: Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px). Mobile nav collapses `md:hidden`↔`md:flex`; hero switches from single-column to `lg:grid-cols-[1.15fr_0.85fr]` at `lg`; floating avatar is `hidden sm:block`.

**Motion vocabulary**: Framer Motion `whileInView` fade+slide-up (`Reveal` component, 28px rise, 0.7s, custom ease `[0.16,1,0.3,1]`) for nearly all section entrances; GSAP for the hero headline stagger-reveal and the Experience timeline's scroll-scrubbed line fill; Lenis for global smooth scroll. `prefers-reduced-motion: reduce` is respected both via a global CSS override (forces near-zero animation/transition durations) and explicit JS checks in Hero/Experience/SmoothScrollProvider/FloatingPortrait.

## Part 2 — Raw source

### `src/app/globals.css` (full file — under 900 lines)

```css
@import "tailwindcss";

:root {
  --background: #06070c;
  --background-elevated: #0c0e17;
  --foreground: #f4f5fa;
  --foreground-muted: #9aa0b4;
  --foreground-subtle: #5c6178;
  --accent: #8b5cf6;
  --accent-2: #22d3ee;
  --accent-warm: #ff8a5c;
  --border: rgba(244, 245, 250, 0.08);
  --border-strong: rgba(244, 245, 250, 0.16);
}

@theme inline {
  --color-background: var(--background);
  --color-background-elevated: var(--background-elevated);
  --color-foreground: var(--foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-foreground-subtle: var(--foreground-subtle);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-accent-warm: var(--accent-warm);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --font-sans: var(--font-inter);
  --font-display: var(--font-space-grotesk);
  --font-mono: var(--font-jetbrains-mono);
}

html {
  color-scheme: dark;
  scroll-behavior: auto;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

::selection {
  background: var(--accent);
  color: #fff;
}

.text-gradient {
  background: linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bg-grid {
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 64px 64px;
}

.noise {
  position: relative;
}

.noise::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 32s linear infinite;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--background);
}
::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 999px;
}
```

### Font loading (`src/app/layout.tsx`, relevant excerpt)

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });
```

No `tailwind.config.ts/js` exists — Tailwind v4's CSS-first `@theme inline` block above (in `globals.css`) is the complete token config.
