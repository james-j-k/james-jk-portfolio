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
    // Touch devices (phones/tablets) already have excellent native
    // momentum scroll. Lenis intercepting scroll/touch on top of that is
    // what was fighting Safari's own pinch-zoom and scroll handling on
    // iOS, so skip it entirely there and let native scrolling take over.
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarsePointer) return;

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
