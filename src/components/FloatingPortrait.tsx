"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FloatingPortrait() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 120, damping: 12, mass: 0.6 });
  const shift = useMotionValue(0);
  const springShift = useSpring(shift, { stiffness: 140, damping: 16, mass: 0.5 });

  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      setVisible(y > window.innerHeight * 0.65);

      if (!mql.matches) {
        const target = Math.max(-18, Math.min(18, delta * 1.4));
        rotate.set(target);
        shift.set(Math.max(-12, Math.min(12, delta * 0.7)));

        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          rotate.set(0);
          shift.set(0);
        }, 180);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [rotate, shift]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.6,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed bottom-6 right-6 z-40 hidden sm:block"
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -8, 0], rotateY: [0, 10, 0, -10, 0] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: 600 }}
      >
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            rotateZ: springRotate,
            x: springShift,
            transformStyle: "preserve-3d",
          }}
          className="group relative block h-16 w-16 overflow-hidden brutalist-border bg-background btn-shadow transition-transform hover:scale-105 lg:h-20 lg:w-20"
        >
          <Image
            src="/images/hero-portrait.png"
            alt="Back to top"
            fill
            sizes="80px"
            className="object-cover grayscale contrast-150 brightness-75"
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
