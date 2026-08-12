import Reveal from "@/components/Reveal";

const MARQUEE_ITEMS = [
  "Python",
  "FastAPI",
  "React",
  "React Native",
  "Redis",
  "JWT",
  "FAISS",
  "TensorFlow",
  "Claude",
  "Codex",
  "SQL",
  "Docker",
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    items: ["Python", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Frameworks & Tools",
    items: ["FastAPI", "React", "React Native", "Redis", "JWT"],
  },
  {
    title: "AI-Assisted Development",
    items: [
      "Claude",
      "Codex",
      "Prompt-driven code generation",
      "Rapid prototyping",
    ],
  },
  {
    title: "Developer Tools",
    items: ["Git", "Docker", "VS Code", "Azure DevOps"],
  },
];

const CERTIFICATIONS = [
  {
    name: "Oracle Cloud Infrastructure Certified Foundations Associate",
    org: "Oracle",
    year: "2025",
  },
  { name: "Computer Networking", org: "Scaler", year: "2024" },
  {
    name: "Intel Unnati Artificial Intelligence of Things Certification",
    org: "Intel",
    year: "2024",
  },
  {
    name: "AWS Academy Machine Learning Foundations",
    org: "AWS Academy",
    year: "2024",
  },
  {
    name: "DBMS: Fundamentals and Advanced Concepts",
    org: "Scaler",
    year: "2024",
  },
  { name: "AWS Data Engineering", org: "AWS Academy", year: "2024" },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-2">
            Skills & Certifications
          </p>
          <h2 className="font-display mt-4 max-w-xl text-3xl font-medium text-foreground sm:text-4xl">
            The toolkit behind the work.
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display whitespace-nowrap text-3xl font-medium text-foreground-subtle md:text-4xl"
            >
              {item}
              <span className="ml-10 text-accent">/</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-foreground-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
            Certifications
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start justify-between gap-4 rounded-xl border border-border px-5 py-4"
              >
                <div>
                  <p className="text-sm text-foreground">{cert.name}</p>
                  <p className="mt-1 text-xs text-foreground-subtle">
                    {cert.org}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-foreground-subtle">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
