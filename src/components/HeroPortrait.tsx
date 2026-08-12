"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function HeroPortrait() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // scroll-driven "flies away" behavior as the hero scrolls out of view
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.15]);
  const exitRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // mouse-driven tilt + spotlight sheen
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springX = useSpring(mvX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mvY, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,0.35), transparent 70%)`;
  const parallaxX = useTransform(springX, [0, 1], [-16, 16]);
  const parallaxY = useTransform(springY, [0, 1], [-16, 16]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[22rem]"
    >
      <motion.div
        style={{
          scale: exitScale,
          opacity: exitOpacity,
          rotate: exitRotate,
          y: exitY,
          perspective: 1000,
        }}
        className="relative"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-3xl"
          style={{ x: parallaxX, y: parallaxY }}
        />

        <div
          ref={tiltRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="group relative aspect-square w-full overflow-hidden rounded-[2rem] border border-border-strong"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/hero-portrait.png"
              alt="Portrait of James J Koduppanapolackal"
              fill
              priority
              sizes="(min-width: 1024px) 352px, 320px"
              className="object-cover"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
