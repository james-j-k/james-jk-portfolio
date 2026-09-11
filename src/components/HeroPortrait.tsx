"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const STAMP_LIFETIME_MS = 1000;
const MIN_STAMP_DISTANCE = 12;

type Dab = { dx: number; dy: number; rx: number; ry: number; rot: number };
type Stamp = { x: number; y: number; t: number; dabs: Dab[] };

function makeDabs(): Dab[] {
  const count = 5 + Math.floor(Math.random() * 3);
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 16;
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      rx: 14 + Math.random() * 16,
      ry: 14 + Math.random() * 16,
      rot: Math.random() * Math.PI,
    };
  });
}

export default function HeroPortrait() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorImgRef = useRef<HTMLImageElement>(null);

  // scroll-driven "flies away" behavior as the hero scrolls out of view
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.15]);
  const exitRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // mouse-driven tilt + spotlight sheen
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springX = useSpring(mvX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mvY, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,0.4), transparent 70%)`;

  // canvas-based paint trail: brush daubs of the color photo appear along
  // the cursor's path and fade out ~1s after being laid down
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const container = tiltRef.current;
    const canvas = canvasRef.current;
    const colorImg = colorImgRef.current;
    if (prefersReduced || !container || !canvas || !colorImg) return;

    const ctx = canvas.getContext("2d");
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    if (!ctx || !maskCtx) return;

    let stamps: Stamp[] = [];
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = maskCanvas.width = width * dpr;
      canvas.height = maskCanvas.height = height * dpr;
      canvas.style.width = maskCanvas.style.width = `${width}px`;
      canvas.style.height = maskCanvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = () => {
      const now = performance.now();
      stamps = stamps.filter((s) => now - s.t < STAMP_LIFETIME_MS);

      maskCtx.clearRect(0, 0, width, height);
      for (const s of stamps) {
        const age = now - s.t;
        const t = age / STAMP_LIFETIME_MS;
        const alpha = Math.max(0, 1 - t * t);
        maskCtx.globalAlpha = alpha;
        maskCtx.fillStyle = "#fff";
        for (const d of s.dabs) {
          maskCtx.beginPath();
          maskCtx.ellipse(
            s.x + d.dx,
            s.y + d.dy,
            d.rx,
            d.ry,
            d.rot,
            0,
            Math.PI * 2
          );
          maskCtx.fill();
        }
      }
      maskCtx.globalAlpha = 1;

      ctx.clearRect(0, 0, width, height);
      if (stamps.length && colorImg.complete) {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(colorImg, 0, 0, width, height);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(maskCanvas, 0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
      }

      if (stamps.length) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const addStamp = (x: number, y: number) => {
      const last = stamps[stamps.length - 1];
      if (last && Math.hypot(x - last.x, y - last.y) < MIN_STAMP_DISTANCE) {
        return;
      }
      stamps.push({ x, y, t: performance.now(), dabs: makeDabs() });
      if (stamps.length > 150) stamps.shift();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      addStamp(e.clientX - rect.left, e.clientY - rect.top);
    };

    container.addEventListener("pointermove", handlePointerMove);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

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
      className="relative mx-auto w-full max-w-md"
    >
      <motion.div
        style={{
          scale: exitScale,
          opacity: exitOpacity,
          rotate: exitRotate,
          y: exitY,
          perspective: 1000,
        }}
        className="relative brutalist-border btn-shadow bg-background p-4"
      >
        <div
          ref={tiltRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="group relative aspect-[4/5] w-full overflow-hidden brutalist-border bg-foreground"
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
              sizes="(min-width: 1024px) 400px, 360px"
              className="object-cover grayscale contrast-150 brightness-75"
            />
            <div className="pointer-events-none absolute inset-0 bg-foreground mix-blend-multiply opacity-20" />
            {/* eslint-disable-next-line @next/next/no-img-element -- hidden canvas draw source only, never displayed */}
            <img
              ref={colorImgRef}
              src="/images/hero-portrait.png"
              alt=""
              aria-hidden
              className="hidden"
            />
            <canvas
              ref={canvasRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-between font-mono text-[10px] font-bold uppercase text-foreground">
          <span>Software Engineer</span>
          <span>Portrait_Still.jpg</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
