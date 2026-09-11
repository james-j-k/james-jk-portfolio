# Routes

Next.js App Router. This is a **single-page site** — one real route, composed of section components stacked on the page rather than separate pages.

| URL path | File | Layout |
|---|---|---|
| `/` (and in-page anchors `#about`, `#experience`, `#work`, `#skills`, `#contact`) | `src/app/page.tsx` | `src/app/layout.tsx` |

No router config file (file-based routing, no `router.ts`/React Router). No other route files exist (no `/about`, `/projects/[slug]`, etc. — everything lives as `<section id="...">` blocks on the one page, navigated via anchor links + smooth scroll).

## `/` — Home (the entire site)

```tsx
import Navbar from "@/components/Navbar";
import FloatingPortrait from "@/components/FloatingPortrait";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingPortrait />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
```

Section summary (in scroll order):
1. **Hero** (`#top`) — full-viewport intro: eyebrow label, 3-line staggered headline (GSAP), body copy, two CTAs ("View my work" / "Get in touch"), scroll cue, and a 3D-tilt interactive portrait photo card on the right (desktop) / below (mobile). Animated gradient-blob background.
2. **About** (`#about`) — two-column: bio paragraph left, 4 stat tiles right (IEEE papers, patent pending, GPA, certifications).
3. **Experience** (`#experience`) — vertical timeline (2 entries: Fission Labs, PIT Solutions), scroll-scrubbed gradient line-fill.
4. **Projects** (`#work`) — 4 stacked case-study cards (problem / approach list / stack chips / impact), one marked "Featured" with an accent border, one marked "In Development".
5. **Skills** (`#skills`) — full-bleed infinite horizontal marquee of skill keywords, then a 4-column grid of skill-category cards, then a certifications list.
6. **Contact** (`#contact`) — large CTA heading, magnetic email button, social links row (GitHub/LinkedIn/Email), footer copyright row.

There are no dashboard/settings/detail/auth pages — this is a marketing/portfolio site only.
