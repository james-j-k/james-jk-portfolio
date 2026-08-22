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
    tag: "Independent Product · RBAC Platform",
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
    tag: "IEEE Paper · INCIP 2025",
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
    tag: "Patent Pending · IEEE Paper",
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
    tag: "Fission Labs · Internship",
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
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-2">
            Selected Work
          </p>
          <h2 className="font-display mt-4 max-w-xl text-3xl font-medium text-foreground sm:text-4xl">
            Case studies, not bullet points.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          {CASE_STUDIES.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article
                className={`group relative overflow-hidden rounded-3xl border bg-background-elevated/60 p-8 transition-colors duration-300 md:p-10 ${
                  project.featured
                    ? "border-accent/40 hover:border-accent/70"
                    : "border-border hover:border-border-strong"
                }`}
              >
                {project.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-background">
                    Featured
                  </span>
                )}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(139,92,246,0.12), transparent 60%)",
                  }}
                />
                <div className="relative flex flex-col gap-8 md:flex-row md:justify-between">
                  <div className="md:max-w-md">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                        {project.tag}
                      </span>
                      <span className="font-mono text-[11px] text-foreground-subtle">
                        {project.period}
                      </span>
                      {project.inDevelopment && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-2/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse" />
                          In Development
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-3 text-2xl font-medium text-foreground md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-foreground-muted">
                      {project.problem}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                      {project.ieeeUrl ? (
                        <a
                          href={project.ieeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                        >
                          Read the paper
                          <ArrowUpRight size={14} />
                        </a>
                      ) : project.internalOnly ? (
                        <span className="text-sm text-foreground-subtle">
                          Internal Fission Labs project — not publicly available
                        </span>
                      ) : project.inDevelopment ? (
                        <span className="text-sm text-foreground-subtle">
                          Case study will update as it ships
                        </span>
                      ) : (
                        <span className="text-sm text-foreground-subtle">
                          Paper link coming soon
                        </span>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                        >
                          View code
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:w-80 md:shrink-0">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-foreground-subtle">
                      Approach
                    </p>
                    <ul className="mt-3 flex flex-col gap-3">
                      {project.approach.map((step) => (
                        <li
                          key={step}
                          className="flex gap-3 text-sm text-foreground-muted"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground">
                      {project.impact}
                    </p>
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
