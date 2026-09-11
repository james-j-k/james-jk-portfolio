import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GithubGlyph, LinkedinGlyph } from "@/components/icons/BrandIcons";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/james-j-k",
    icon: GithubGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jamezjk",
    icon: LinkedinGlyph,
  },
  {
    label: "Email",
    href: "mailto:jamesjk1403@gmail.com",
    icon: Mail,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative flex flex-col">
      <div className="flex-1 bg-grid-brutalist px-6 pb-24 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <span className="inline-block bg-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
              Contact
            </span>
            <h2 className="font-display mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="block">Have something</span>
              <span className="block headline-stroke">worth building?</span>
              <span className="block">Let&apos;s talk.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 max-w-2xl">
            <a
              href="mailto:jamesjk1403@gmail.com"
              className="btn-shadow flex w-full items-center justify-between brutalist-border bg-foreground px-8 py-8 font-display text-2xl font-black uppercase text-background md:px-10 md:py-10 md:text-4xl"
            >
              <span>jamesjk1403@gmail.com</span>
              <ArrowUpRight size={44} />
            </a>
          </Reveal>

          <Reveal delay={0.2} className="mt-16 h-[6px] w-full bg-foreground" />

          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="btn-shadow flex h-16 w-16 items-center justify-center brutalist-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <social.icon size={26} />
              </a>
            ))}
          </Reveal>
        </div>
      </div>

      <footer className="brutalist-border-t bg-foreground px-6 py-12 text-background md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 font-mono text-xs font-bold uppercase tracking-widest sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} James J Koduppanapolackal</p>
          <p className="text-background/60">
            Built with Next.js, GSAP &amp; Framer Motion
          </p>
        </div>
      </footer>
    </section>
  );
}
