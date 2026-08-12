"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
import HeroPortrait from "@/components/HeroPortrait";
import { getGsap } from "@/lib/gsap";

const HEADLINE = ["I build with AI", "as my pair", "programmer."];

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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
    >
      <GradientBackground />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent-2"
          >
            Software Engineer · Hyderabad, India
          </motion.p>

          <h1
            ref={headlineRef}
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className={`hero-line-inner block ${
                    i === 2 ? "text-gradient" : ""
                  }`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl"
          >
            I design, prompt, and ship backend systems, RAG pipelines, and
            full-stack apps — using Claude and Codex as real engineering
            partners, not autocomplete. Currently building at{" "}
            <span className="text-foreground">Fission Labs</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
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
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-subtle"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
