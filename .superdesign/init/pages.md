# Pages — Dependency Trees

Single-page app: one entry point, `src/app/page.tsx`, rendered inside `src/app/layout.tsx`.

## / (Home — the entire site)
Entry: `src/app/page.tsx`
Dependencies:
- `src/components/Navbar.tsx`
  - (uses `framer-motion`, `lucide-react` — no local imports)
- `src/components/FloatingPortrait.tsx`
  - (uses `next/image`, `framer-motion` — no local imports; references `/images/hero-portrait.png` from `public/`)
- `src/components/sections/Hero.tsx`
  - `src/components/GradientBackground.tsx`
  - `src/components/HeroPortrait.tsx`
    - (uses `next/image`, `framer-motion`; references `/images/hero-portrait.png`)
  - `src/lib/gsap.ts`
- `src/components/sections/About.tsx`
  - `src/components/Reveal.tsx`
- `src/components/sections/Experience.tsx`
  - `src/components/Reveal.tsx`
  - `src/lib/gsap.ts`
- `src/components/sections/Projects.tsx`
  - `src/components/Reveal.tsx`
- `src/components/sections/Skills.tsx`
  - `src/components/Reveal.tsx`
- `src/components/sections/Contact.tsx`
  - `src/components/Reveal.tsx`
  - `src/components/MagneticButton.tsx`
  - `src/components/icons/BrandIcons.tsx` (GithubGlyph, LinkedinGlyph)

Plus, always-loaded regardless of page (via `src/app/layout.tsx`):
- `src/components/SmoothScrollProvider.tsx`
  - `src/lib/gsap.ts`
- `src/app/globals.css`

**Candidate `--context-file` set for designing/reproducing this page** (per PAYLOAD BUDGET rules — all files here are well under ~900 lines, so pass full unless noted):
```
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
src/components/Navbar.tsx
src/components/FloatingPortrait.tsx
src/components/GradientBackground.tsx
src/components/HeroPortrait.tsx
src/components/Reveal.tsx
src/components/MagneticButton.tsx
src/components/icons/BrandIcons.tsx
src/components/sections/Hero.tsx
src/components/sections/About.tsx
src/components/sections/Experience.tsx
src/components/sections/Projects.tsx
src/components/sections/Skills.tsx
src/components/sections/Contact.tsx
.superdesign/design-system.md
```
Note: because this is one long single-page scroll rather than several routed pages, a "reproduce the page" request likely needs to be scoped to one section at a time (e.g. just Hero, or just Projects) to stay within a sane prompt/context size — see SUPERDESIGN.md PAYLOAD BUDGET. `src/lib/gsap.ts` and `src/components/SmoothScrollProvider.tsx` are pure behavior (no visual JSX) and can be omitted from design context.
