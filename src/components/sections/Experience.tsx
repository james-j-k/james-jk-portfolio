"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { getGsap } from "@/lib/gsap";

const EXPERIENCE = [
  {
    company: "Fission Labs",
    role: "Software Engineering Intern",
    period: "Feb 2026 — Aug 2026",
    location: "Hyderabad, Telangana · On-site",
    points: [
      "Built backend services and full applications using AI-assisted development tools (Claude, Codex), exploring JWT auth, FastAPI, and Redis — presented to mentors.",
      "Developed a Finance RAG and Movie RAG system using optimization techniques including FAISS, HyDE, and RRF.",
      "Designed and refined prompts to improve code generation quality and correctness, working closely with senior engineers to review and validate output.",
    ],
  },
  {
    company: "PIT Solutions",
    role: "Software Engineering Intern",
    period: "Jun 2025 — Jul 2025",
    location: "Infopark, Kochi, Kerala · On-site",
    points: [
      "Developed a React Native front end, integrating Stripe for secure payment workflows.",
      "Participated in weekly client update calls, clarifying requirements and aligning expectations.",
      "Collaborated using Azure DevOps and explored Azure IoT Hub for real-time data ingestion.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-2">
            Experience
          </p>
          <h2 className="font-display mt-4 max-w-xl text-3xl font-medium text-foreground sm:text-4xl">
            Where I&apos;ve been building.
          </h2>
        </Reveal>

        <div className="relative mt-16 pl-8 md:pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
          <div className="timeline-line-fill absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2" />

          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.1} className="relative">
                <span className="absolute -left-[2.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background md:-left-[2.85rem]" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-xl font-medium text-foreground md:text-2xl">
                    {job.role}{" "}
                    <span className="text-foreground-muted">
                      · {job.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground-subtle">
                  {job.location}
                </p>
                <ul className="mt-4 flex max-w-2xl flex-col gap-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-foreground-muted"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
