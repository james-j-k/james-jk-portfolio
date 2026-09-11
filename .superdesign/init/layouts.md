# Layouts

This is a single-page site — there is no separate app shell/sidebar. The "layout" pieces are: the root layout (fonts + smooth-scroll provider), a fixed top Navbar, and a fixed floating portrait avatar that persists across scroll. There is no separate Footer component — the footer row (copyright + tagline) is inline at the bottom of the Contact section (see `pages.md` / Contact source in the Projects/Contact section context).

## Root Layout
- File: `src/app/layout.tsx`
- Renders: `<html>`/`<body>` shell, loads 3 Google fonts via `next/font/google` (Inter = sans/body, Space Grotesk = display/headings, JetBrains Mono = mono/labels), wraps all page content in `SmoothScrollProvider`.

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "James J Koduppanapolackal — Software Engineer",
  description:
    "Software engineer building AI-assisted backend systems, RAG pipelines, and full-stack applications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

## SmoothScrollProvider
- File: `src/components/SmoothScrollProvider.tsx`
- Renders: no visible UI — wires up Lenis smooth scroll synced to GSAP's ticker/ScrollTrigger. Respects `prefers-reduced-motion` (skips entirely if set).

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as never);
    };
  }, []);

  return <>{children}</>;
}
```

## Navbar
- File: `src/components/Navbar.tsx`
- Renders: fixed top header, transparent until `scrollY > 24` then blurred background + bottom border. Scroll-progress hairline (gradient, width = scroll progress) along the bottom edge. Logo "James J-K." left, desktop nav links center-right (About/Experience/Work/Skills/Contact), "Let's talk" pill button far right, hamburger menu on mobile (`md:hidden`) that expands an accordion list of the same links.

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-background/70 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent to-accent-2 origin-left"
        style={{ scaleX: progress, right: 0 }}
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="font-display text-sm font-semibold tracking-tight text-foreground"
        >
          James J-K<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent md:inline-block"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-border">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 font-mono text-sm uppercase tracking-widest text-foreground-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
```

## FloatingPortrait (persistent, not per-page)
- File: `src/components/FloatingPortrait.tsx`
- Renders: a fixed bottom-right circular-ish avatar button (the hero portrait photo), hidden until the user scrolls past ~65% of viewport height, hidden entirely on mobile (`hidden sm:block`). Idles with a continuous 3D sway/bob loop; tilts sharply in response to scroll velocity/direction, settling back to neutral ~180ms after scrolling stops. Click scrolls back to top. Respects `prefers-reduced-motion` (disables the loop/tilt, keeps the opacity fade).
- Full source is in `pages.md`'s dependency tree / `components.md`-adjacent — included here as it renders on every "page" (there being only one route) outside the Navbar.

Rendered alongside Navbar at the top of `src/app/page.tsx`, i.e. it is effectively a global layout element even though it isn't in `layout.tsx` itself (kept client-scoped per page for simplicity, but this is the only page so it's equivalent).
