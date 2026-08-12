import Reveal from "@/components/Reveal";

const STATS = [
  { value: "2", label: "IEEE papers published" },
  { value: "1", label: "Patent pending" },
  { value: "8.5", label: "GPA / 10" },
  { value: "6", label: "Certifications" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-2">
            About
          </p>
        </Reveal>

        <div className="mt-8 grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.05}>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl md:text-4xl">
              I&apos;m a Computer Science undergrad at SRM Institute of
              Science and Technology, currently interning as a Software
              Engineer at{" "}
              <span className="text-gradient font-medium">Fission Labs</span>{" "}
              in Hyderabad.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
              My work sits at the intersection of backend engineering and
              applied AI — building FastAPI services, retrieval pipelines
              with FAISS/HyDE/RRF, and full-stack products, then using tools
              like Claude and Codex to move faster without cutting corners on
              correctness. Two of my personal projects have been published as
              IEEE papers, and one is patent-pending.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-medium text-foreground md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
