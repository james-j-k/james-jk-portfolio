# Design System — James J Koduppanapolackal Portfolio

## Product context

A personal portfolio site for James J Koduppanapolackal, a CS undergrad (SRM Institute of Science and Technology) and Software Engineering Intern at Fission Labs (Hyderabad). Purpose: land opportunities (internships/jobs/freelance) by demonstrating both his engineering work (backend/AI systems, published IEEE research) and his ability to build a polished, animated, AI-assisted frontend himself. Explicit brief from the owner: "high conversion, impressive, immersive, very interactive, cool animations, scroll motion — show off that I can do anything with AI."

**Key pages & architecture**: single-page marketing/portfolio site (Next.js App Router, one route `/`), composed of six stacked sections navigated by anchor links + smooth scroll: Hero → About → Experience → Projects (case studies) → Skills/Certifications → Contact. No auth, no dashboard, no dynamic data — fully static content defined in-component.

**Key features**:
- Scroll-driven, physically-feeling motion throughout (not just fade-ins): GSAP-staggered hero headline, scroll-scrubbed experience timeline, an infinite skills marquee, a 3D mouse-tilt hero portrait that "flies away" on scroll, and a persistent scroll-reactive floating avatar.
- Case studies (not resume bullet points) for each project — problem / approach / stack / impact structure, with an honest "In Development" status pattern for unshipped work and an "Internal — not publicly available" pattern for confidential employer work.
- Fully responsive with a dedicated mobile nav; respects `prefers-reduced-motion` throughout.

**JTBD**: a recruiter/hiring manager/potential collaborator scans the hero in seconds, is impressed enough to keep scrolling, understands James's actual technical depth from the case studies (not just a skills list), and converts to an email/contact action.

## Branding & styling

**Aesthetic**: dark, technical, "AI-native." Confident negative space, not maximalist. Two-color accent system (violet→cyan) used sparingly as emphasis, not as a dominant background wash. Mono type for anything label-like signals "engineer," echoing the AI-assisted-development narrative without leaning on clichés (no glowing circuit boards, no literal robot imagery, no neon-everywhere cyberpunk).

**Color** (full token table + raw CSS in `.superdesign/init/theme.md` Part 1/Part 2 — treat that as source of truth, summarized here):
- Background: `#06070c` (near-black), elevated surfaces `#0c0e17`
- Text: `#f4f5fa` primary, `#9aa0b4` muted, `#5c6178` subtle
- Accents: `#8b5cf6` (violet) + `#22d3ee` (cyan), combined in a 100°-angle gradient for emphasis text/badges only
- Borders: near-white at 8%/16% opacity (hairline, not heavy strokes)

**Typography**: Space Grotesk (display/headings) + Inter (body) + JetBrains Mono (labels/eyebrows/tags, always uppercase + wide tracking). Large, tight-tracked headlines; generous body line-height.

**Layout**: centered `max-w-6xl` content column, generous vertical section rhythm (`py-28`/`py-36`). Pill shapes for buttons/nav/tags; large rounded corners (up to `rounded-[3rem]`) for feature cards/portrait frame. Depth via blurred gradient glow blobs, not drop shadows (shadows barely read on near-black backgrounds).

**Imagery**: one real photo of James (moody/cinematic, dark background) used twice — as the interactive hero portrait and as the persistent floating avatar. No stock photography, no AI-generated hero backgrounds currently (that direction was explored and intentionally deferred — see Specific project requirements below).

## Motion/animation patterns

- **Entrance**: fade + 28px slide-up on scroll-into-view (Framer Motion `whileInView`, `once: true`), staggered by section via a shared `delay` prop convention (0, 0.05, 0.08, 0.1, 0.15... per sibling).
- **Hero headline**: GSAP stagger reveal, lines translate up from below a clip mask (`yPercent 110 → 0`), `power4.out`, staggered 0.12s.
- **Scroll-scrubbed**: Experience timeline's gradient line fills top-to-bottom tied directly to scroll position (GSAP ScrollTrigger `scrub`), not a fixed-duration animation.
- **Continuous/ambient**: hero background gradient blobs drift slowly (18–22s loops); skills marquee scrolls infinitely (32s linear).
- **Interactive/reactive** (the signature "immersive" layer): hero portrait does 3D mouse-tilt (±10°) + a cursor-following spotlight sheen + scroll-linked "flying away" (shrink/rotate/fade) as it scrolls out of the hero; the floating avatar reacts to scroll velocity/direction with a spring-damped tilt that snaps back to neutral ~180ms after scrolling stops, plus a slow idle 3D sway loop.
- **Micro-interaction**: magnetic button (Contact CTA) translates toward the cursor within a small radius.
- **Accessibility**: every animated component checks `prefers-reduced-motion` and either skips or drastically shortens motion; a global CSS media query backstops anything missed.

New design drafts should treat scroll and cursor position as first-class animation inputs, not just viewport-entry triggers — that reactive quality is the site's core differentiator, more than any single visual embellishment.

## Specific project requirements

- **No stock/generic imagery.** Only James's own photo, or abstract/generated visuals that were deliberately chosen (see below).
- **Accuracy over polish for unshipped work.** The "Jubilee OS" project card is explicitly labeled "In Development" / "Featured" — do not let a redesign imply it has shipped, has metrics, or has a public repo/demo link. Same for the Fission Labs RAG project (internal, no public link) — its case study must keep saying so, not invent a link.
- **AI-generated hero visual was intentionally deferred**, not forgotten: the owner wanted a Higgsfield-generated animated motion loop of his photo for the hero, but the Higgsfield workspace has 0 credits on a free plan with no top-up option. He chose to proceed with the free, code-driven 3D-tilt/parallax treatment instead of subscribing. If a redesign explores hero visuals, the current interactive-photo-card pattern is the deliberate, already-approved direction — not a placeholder waiting to be replaced by AI video.
- **Keep the dark-only, two-accent-color discipline.** No light mode. No third accent color. No random fonts — Space Grotesk/Inter/JetBrains Mono only, per DESIGN SYSTEM FIDELITY rules for any generated draft.
