"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

type CaseStudy = {
  tag: string;
  title: string;
  period: string;
  problem: string;
  approach: string[];
  stack: string[];
  impact: string;
  ieeeUrl?: string;
  repoUrl?: string;
  internalOnly?: boolean;
  featured?: boolean;
  inDevelopment?: boolean;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Independent Product // RBAC Platform",
    title: "Jubilee OS — Delivery & Field-Ops Platform",
    period: "In Development",
    featured: true,
    inDevelopment: true,
    problem:
      "A local LPG distributor's office staff were hand-copying delivery confirmation codes from paper into logbooks — illegible handwriting caused mismatched entries and delivery disputes across a 15,000+ customer base.",
    approach: [
      "Android app (Kotlin, Jetpack Compose) lets delivery executives look up a customer by number and see only what they need — name, phone, active booking status — sourced from office-uploaded Excel registries.",
      "A two-tier RBAC data model keeps sensitive customer PII (KYC, ration card, Aadhaar) structurally separate from field-facing data, enforced by Firestore security rules rather than hidden in the UI.",
      "TypeScript Firebase Cloud Functions handle server-side Excel ingestion and RBAC-gated batch writes, with shared TypeScript types keeping the Cloud Functions backend and React dashboard contract-safe end to end.",
      "An offline-first submission queue lets delivery staff save confirmation codes without signal, auto-syncing with idempotent writes once connectivity returns — plus a white-label, multi-tenant template (one Firebase project per client) so the platform can be resold to other businesses.",
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "TypeScript",
      "React",
      "Firebase Cloud Functions",
      "Firestore",
      "GitHub Actions",
    ],
    impact:
      "Architecture and RBAC data model finalized; actively in development.",
  },
  {
    tag: "IEEE Paper // INCIP 2025",
    title: "Real-Time Stock Price Prediction & Visualization",
    period: "Sep 2024",
    problem:
      "Stock price movement is noisy and hard to act on — raw predictions mean little without a way to see them against real trading signals.",
    approach: [
      "Built an LSTM-based prediction pipeline using the Alpha Vantage API for data ingestion.",
      "Used PySpark for cleaning and feature engineering — moving averages, RSI — and TensorFlow/Keras for the model, evaluated with MSE/RMSE.",
      "Built an interactive Dash dashboard visualizing actual vs. predicted prices, moving averages, Bollinger Bands, and trading volume.",
    ],
    stack: ["Python", "PySpark", "TensorFlow/Keras", "Dash", "Alpha Vantage API"],
    impact: "Published as first author at INCIP 2025 (IEEE).",
    ieeeUrl: "https://ieeexplore.ieee.org/document/11019476",
  },
  {
    tag: "Patent Pending // IEEE Paper",
    title: "Human BlackBox",
    period: "Mar 2025",
    problem:
      "Emergency sounds — screams, glass breaking — often go unnoticed or unreported in the critical seconds after they happen.",
    approach: [
      "Built a Python prototype that continuously analyzes live microphone audio using Google's YAMNet model (TensorFlow Hub) to detect emergency sounds in real time.",
      "On detection, the system automatically captures a photo, resolves the current location, and sends an alert.",
      "The alert bundles the audio clip, photo, and location, delivered to a registered contact via email.",
    ],
    stack: ["Python", "TensorFlow Hub (YAMNet)", "Geolocation", "Email alerting"],
    impact: "Patent-pending, and published as an IEEE paper.",
    ieeeUrl: "https://ieeexplore.ieee.org/document/11315541",
  },
  {
    tag: "Fission Labs // Internship",
    title: "Finance RAG & Movie RAG",
    period: "Feb 2026 — Present",
    problem:
      "Naive retrieval-augmented generation often surfaces irrelevant context, which quietly wrecks answer quality on domain-specific questions.",
    approach: [
      "Built Finance RAG and Movie RAG systems on top of FastAPI services with JWT auth and Redis caching.",
      "Applied FAISS for vector search, HyDE (Hypothetical Document Embeddings) for query expansion, and RRF (Reciprocal Rank Fusion) to combine retrieval signals.",
      "Designed and refined prompts with senior engineers to improve code-generation quality and correctness across the stack.",
    ],
    stack: ["FastAPI", "FAISS", "Redis", "JWT", "HyDE", "RRF"],
    impact: "Built and presented to engineering mentors at Fission Labs.",
    internalOnly: true,
  },
];

export default function Projects() {
  return (
    <section
      id="work"
      className="relative bg-grid-brutalist px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16">
          <span className="inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
            Selected Work
          </span>
          <h2 className="font-display mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-5xl md:text-7xl">
            Case studies,
            <br />
            not bullet points.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-20">
          {CASE_STUDIES.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="relative brutalist-border feature-shadow bg-background p-5 sm:p-8 md:p-12">
                {project.featured && (
                  <span className="absolute -right-4 -top-4 z-10 rotate-3 brutalist-border bg-foreground px-4 py-2 font-display text-sm font-black uppercase text-background">
                    Featured
                  </span>
                )}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground-muted">
                    {project.tag}
                  </span>
                  {project.inDevelopment && (
                    <div className="flex items-center gap-2 brutalist-border bg-background px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
                      <span className="h-2 w-2 animate-pulse bg-foreground" />
                      In Development
                    </div>
                  )}
                </div>
                <h3 className="font-display mb-6 text-2xl font-black uppercase tracking-tighter text-foreground sm:text-3xl md:text-4xl">
                  {project.title}
                </h3>

                <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-8">
                    <div className="border-l-4 border-foreground pl-6">
                      <p className="text-lg font-bold leading-tight text-foreground">
                        {project.problem}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="brutalist-border px-3 py-1 font-mono text-[10px] font-bold uppercase text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.ieeeUrl ? (
                      <a
                        href={project.ieeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-foreground underline decoration-2 hover:text-foreground-muted"
                      >
                        Read the paper
                        <ArrowUpRight size={16} />
                      </a>
                    ) : project.internalOnly ? (
                      <p className="font-mono text-xs font-bold uppercase italic text-foreground-subtle">
                        Internal Fission Labs project — not publicly available
                      </p>
                    ) : (
                      <p className="font-mono text-xs font-bold uppercase text-foreground-subtle">
                        Case study will update as it ships
                      </p>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h4 className="border-b-2 border-foreground pb-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                      Approach
                    </h4>
                    <ul className="space-y-4">
                      {project.approach.map((step) => (
                        <li
                          key={step}
                          className="flex gap-3 text-sm font-bold text-foreground"
                        >
                          <span className="text-xl leading-none">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="brutalist-border mt-6 bg-background-elevated p-4">
                      <p className="mb-1 font-mono text-[10px] font-bold uppercase text-foreground-muted">
                        Impact
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
