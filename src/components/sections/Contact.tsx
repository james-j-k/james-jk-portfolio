import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
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
    <section
      id="contact"
      className="relative px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-2">
            Contact
          </p>
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl">
            Have something worth building?{" "}
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <MagneticButton
            href="mailto:jamesjk1403@gmail.com"
            className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background"
          >
            jamesjk1403@gmail.com
            <ArrowUpRight size={20} />
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.25} className="mt-16 flex flex-wrap gap-6 border-t border-border pt-10">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <social.icon size={16} />
              {social.label}
              <ArrowUpRight
                size={12}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </Reveal>
      </div>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row">
        <p>© {new Date().getFullYear()} James J Koduppanapolackal.</p>
        <p className="font-mono">Built with Next.js, GSAP & Framer Motion.</p>
      </div>
    </section>
  );
}
