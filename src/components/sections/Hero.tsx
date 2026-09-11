"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroPortrait from "@/components/HeroPortrait";
import { getGsap } from "@/lib/gsap";

const HEADLINE = ["I build", "with AI", "partner."];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-line-inner", { yPercent: 0 });
        return;
      }
      gsap.set(".hero-line-inner", { yPercent: 110 });
      gsap.to(".hero-line-inner", {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-grid-brutalist px-6 pt-28 md:px-10"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background"
          >
            Software Engineer // Hyderabad, India
          </motion.div>

          <h1
            ref={headlineRef}
            className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className={`hero-line-inner block ${
                    i === 1 ? "headline-stroke" : ""
                  }`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 max-w-xl brutalist-border-l border-l-[3px] border-foreground pl-6"
          >
            <p className="text-xl font-bold leading-tight text-foreground">
              I design, prompt, and ship backend systems, RAG pipelines, and
              full-stack apps — using Claude and Codex as real engineering
              partners. Currently building at Fission Labs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href="#work"
              className="btn-shadow inline-flex items-center gap-3 brutalist-border bg-foreground px-10 py-5 font-display text-lg font-black uppercase text-background"
            >
              View my work
              <ArrowUpRight size={22} />
            </a>
            <a
              href="#contact"
              className="btn-shadow inline-flex items-center gap-3 brutalist-border bg-background px-10 py-5 font-display text-lg font-black uppercase text-foreground"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <HeroPortrait />
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-foreground"
        aria-label="Scroll to about section"
      >
        <span className="brutalist-border bg-background px-2 font-mono text-xs font-black uppercase tracking-[0.2em]">
          Scroll down
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        >
          <ArrowDown size={28} />
        </motion.span>
      </motion.a>
    </section>
  );
}
