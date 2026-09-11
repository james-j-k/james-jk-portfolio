"use client";

import { useEffect, useRef } from "react";
import { Code2, Smartphone, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getGsap } from "@/lib/gsap";

const EXPERIENCE = [
  {
    company: "Fission Labs",
    role: "Software Engineering Intern",
    period: "Feb 2026 — Aug 2026",
    location: "Hyderabad, Telangana · On-site",
    icon: Code2,
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
    icon: Smartphone,
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
      className="relative bg-grid-brutalist px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16">
          <span className="inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
            Experience
          </span>
          <h2 className="font-display mt-4 text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl">
            Where James has <span className="block headline-stroke">been building.</span>
          </h2>
        </Reveal>

        <div className="relative flex gap-10 md:gap-16">
          <div className="absolute left-0 top-0 h-full w-2 bg-foreground/15" />
          <div className="timeline-line-fill absolute left-0 top-0 h-full w-2 origin-top bg-foreground" />

          <div className="flex w-full flex-col gap-16 pl-8 md:pl-16">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.1} className="relative">
                <div className="brutalist-border absolute -left-[3.5rem] top-10 flex h-8 w-8 items-center justify-center bg-foreground text-background md:-left-[5.5rem] md:h-10 md:w-10">
                  <job.icon size={18} />
                </div>

                <article className="relative brutalist-border card-shadow bg-background p-8 md:p-12">
                  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <h3 className="font-display text-3xl font-black uppercase tracking-tight text-foreground">
                        {job.role}
                      </h3>
                      <p className="mt-2 font-mono text-xl font-bold text-foreground">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <span className="bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-tighter text-background">
                        {job.period}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-foreground-muted">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <ul className="flex max-w-3xl flex-col gap-4">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-lg font-bold leading-tight text-foreground"
                      >
                        <span className="marker-square mt-2" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-24 flex justify-center">
          <a
            href="#work"
            className="group flex items-center gap-6 brutalist-border bg-foreground px-12 py-6 font-display text-2xl font-black uppercase text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Next: View Work
            <ArrowRight
              size={32}
              className="transition-transform group-hover:translate-x-2"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
