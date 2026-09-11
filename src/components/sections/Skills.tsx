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
    <section id="skills" className="relative bg-grid-brutalist py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
            Skills & Certifications
          </span>
          <h2 className="font-display mt-4 text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl">
            The toolkit behind the work.
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 overflow-hidden border-y-8 border-foreground bg-foreground py-8">
        <div className="flex w-max animate-marquee gap-12">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display whitespace-nowrap text-7xl font-black uppercase text-background md:text-9xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="brutalist-border card-shadow h-full bg-background p-8 transition-transform duration-75 hover:-translate-x-1 hover:-translate-y-1">
                <h3 className="brutalist-border-b mb-6 pb-2 font-display text-xl font-black uppercase text-foreground">
                  {group.title}
                </h3>
                <ul className="space-y-3 font-mono text-sm font-bold uppercase text-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-24">
          <h3 className="font-display mb-8 text-3xl font-black uppercase text-foreground">
            Certifications
          </h3>
          <div className="brutalist-border card-shadow overflow-hidden bg-background">
            <div className="hidden grid-cols-12 brutalist-border-b bg-foreground p-4 font-mono text-xs font-bold uppercase text-background md:grid">
              <div className="col-span-6">Certification Name</div>
              <div className="col-span-4">Issuing Organization</div>
              <div className="col-span-2 text-right">Year</div>
            </div>
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={cert.name}
                className={`grid grid-cols-1 gap-2 p-6 hover:bg-background-elevated md:grid-cols-12 md:gap-0 ${
                  i < CERTIFICATIONS.length - 1 ? "brutalist-border-b" : ""
                }`}
              >
                <div className="font-display font-black uppercase text-foreground md:col-span-6 md:text-lg">
                  {cert.name}
                </div>
                <div className="font-mono text-sm font-bold text-foreground md:col-span-4">
                  {cert.org}
                </div>
                <div className="font-mono text-sm font-bold text-foreground md:col-span-2 md:text-right">
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
