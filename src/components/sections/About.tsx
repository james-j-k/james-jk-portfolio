import Reveal from "@/components/Reveal";

const STATS = [
  { value: "02", label: "IEEE papers published" },
  { value: "01", label: "Patent pending" },
  { value: "8.5", label: "GPA / 10" },
  { value: "06", label: "Certifications" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-grid-brutalist px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
            About
          </span>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_auto_0.8fr] lg:gap-0">
          <Reveal delay={0.05} className="lg:pr-16">
            <h2 className="font-display text-4xl font-black uppercase leading-[1.1] tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              James J Koduppanapolackal. CS undergrad at{" "}
              <span className="underline decoration-[6px]">
                SRM Institute
              </span>
              . Intern at{" "}
              <span className="bg-foreground px-2 text-background">
                Fission Labs
              </span>
              .
            </h2>

            <div className="mt-10 max-w-2xl brutalist-border-l border-l-[3px] border-foreground pl-8">
              <p className="text-lg font-bold leading-relaxed text-foreground">
                My work sits at the intersection of backend engineering and
                applied AI — building FastAPI services, retrieval pipelines
                with FAISS/HyDE/RRF, and full-stack products, then using
                tools like Claude and Codex to move faster without cutting
                corners on correctness.
              </p>
              <p className="mt-6 text-base font-medium leading-relaxed text-foreground-muted">
                Two of my personal projects have been published as IEEE
                papers, and one is patent-pending.
              </p>
            </div>
          </Reveal>

          <div className="hidden w-1 self-stretch bg-foreground lg:block" />

          <Reveal delay={0.15} className="lg:pl-16">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="brutalist-border card-shadow bg-background p-6"
                >
                  <span className="font-display block text-5xl font-black leading-none text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-2 block font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
