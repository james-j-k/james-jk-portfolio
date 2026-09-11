# Extractable Components

Candidates for extraction as reusable Superdesign `DraftComponent` entities (`<sd-component>` tags).

## Layout Components (appear on every page — only one page exists, but these are structurally "global")

## NavBar
- Source: `src/components/Navbar.tsx`
- Category: layout
- Description: Fixed top nav — logo, 5 anchor links, "Let's talk" CTA pill, scroll-progress hairline, mobile hamburger + accordion menu.
- Extractable props: none obviously dynamic today (no `activeItem`/route highlighting — this is a single-page site so all links are always "inactive" until clicked). Could extract `links` (array of `{href, label}`) if the design flow wants to vary nav items across drafts.
- Hardcoded: "James J-K." logo text, all 5 link labels/hrefs, "Let's talk" label, all CSS/colors/icons (Menu/X from lucide-react).

## FloatingPortrait
- Source: `src/components/FloatingPortrait.tsx`
- Category: layout (global, persistent — not a per-page component but appears everywhere post-scroll)
- Description: Fixed bottom-right circular photo avatar, scroll-velocity-reactive tilt, idle 3D sway loop, click-to-top.
- Extractable props: `imageSrc` (currently hardcoded to `/images/hero-portrait.png`), visibility threshold.
- Hardcoded: photo path, all animation timing/easing, size (`h-16 w-16 lg:h-20 lg:w-20`).
- Note: heavily behavioral (scroll listeners, motion values) — a static Petite-Vue conversion would only capture the resting visual, not the scroll-reactive behavior. Low priority for extraction; more useful as design reference than a live component.

## Basic Components (used across sections)

## MagneticButton
- Source: `src/components/MagneticButton.tsx`
- Category: basic
- Description: Cursor-following magnetic `<a>` button — currently only used once (Contact's email CTA), but is a reusable pattern worth extracting if more CTAs are added across new drafts.
- Extractable props: `href` (string), `children` (label content).
- Hardcoded: none — fully generic; className is passed in per-usage.

## Reveal
- Source: `src/components/Reveal.tsx`
- Category: basic / utility
- Description: Not a visual component — a scroll-triggered animation wrapper (fade + slide-up on `whileInView`). Wraps almost every section heading/content block.
- Extractable props: `delay` (number), `as` (div/span/li).
- Note: skip extracting this as a `DraftComponent` (per SKILL.md guidance — "skip basic UI primitives" and non-visual wrappers). It's pure motion behavior with no distinct visual identity of its own; static design drafts should just show its resting (fully-revealed) state.

## BrandIcons (GithubGlyph, LinkedinGlyph)
- Source: `src/components/icons/BrandIcons.tsx`
- Category: basic / icon
- Description: Inline SVG brand marks for GitHub and LinkedIn (replacement for lucide-react's dropped brand icons).
- Extractable props: `size` (number).
- Hardcoded: SVG paths (brand marks — must stay pixel-exact, do not regenerate/reinterpret these as a different icon style).

## Not extraction candidates (too simple / one-off, keep inline per SKILL.md guidance)
- Stat tiles in `About.tsx` (`STATS.map`) — trivial two-line number+label blocks.
- Timeline entries in `Experience.tsx` — page-specific, not reused elsewhere.
- Case-study cards in `Projects.tsx` — page-specific, complex per-item markup (featured badge, in-development pill, stack chips, approach list) that's easier to keep as one page's inline `.map()` than a generalized component. If the design flow wants to explore new project cards, treat the existing card markup in `Projects.tsx` as reference structure rather than extracting a formal component.
- Skill category cards / certification rows in `Skills.tsx` — same reasoning, page-specific.
