"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const STAMP_LIFETIME_MS = 1800;
const MIN_STAMP_DISTANCE = 6;
const BRUSH_RADIUS = 34;

type Stamp = { x: number; y: number; t: number };

/** Mirrors CSS `object-fit: cover`: returns the source rect to sample so the
 * image fills destW x destH without distortion, cropped and centered. */
function coverSourceRect(
  naturalW: number,
  naturalH: number,
  destW: number,
  destH: number
) {
  const srcRatio = naturalW / naturalH;
  const destRatio = destW / destH;
  if (srcRatio > destRatio) {
    const sh = naturalH;
    const sw = sh * destRatio;
    return { sx: (naturalW - sw) / 2, sy: 0, sw, sh };
  }
  const sw = naturalW;
  const sh = sw / destRatio;
  return { sx: 0, sy: (naturalH - sh) / 2, sw, sh };
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

    const alphaOf = (s: Stamp, now: number) => {
      const t = (now - s.t) / STAMP_LIFETIME_MS;
      return Math.max(0, 1 - t * t);
    };

    const draw = () => {
      const now = performance.now();
      stamps = stamps.filter((s) => now - s.t < STAMP_LIFETIME_MS);

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "#fff";
      maskCtx.strokeStyle = "#fff";
      maskCtx.lineCap = "round";
      maskCtx.lineJoin = "round";
      maskCtx.lineWidth = BRUSH_RADIUS * 2;

      for (let i = 0; i < stamps.length; i++) {
        const s = stamps[i];
        const alpha = alphaOf(s, now);

        if (i > 0) {
          const prev = stamps[i - 1];
          maskCtx.globalAlpha = Math.min(alpha, alphaOf(prev, now));
          maskCtx.beginPath();
          maskCtx.moveTo(prev.x, prev.y);
          maskCtx.lineTo(s.x, s.y);
          maskCtx.stroke();
        }

        maskCtx.globalAlpha = alpha;
        maskCtx.beginPath();
        maskCtx.arc(s.x, s.y, BRUSH_RADIUS, 0, Math.PI * 2);
        maskCtx.fill();
      }
      maskCtx.globalAlpha = 1;

      ctx.clearRect(0, 0, width, height);
      if (stamps.length && colorImg.complete && colorImg.naturalWidth) {
        const { sx, sy, sw, sh } = coverSourceRect(
          colorImg.naturalWidth,
          colorImg.naturalHeight,
          width,
          height
        );
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(colorImg, sx, sy, sw, sh, 0, 0, width, height);
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
      stamps.push({ x, y, t: performance.now() });
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

        <a
          href="https://itsolamco.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shadow group/olam mt-4 flex items-center justify-between gap-3 brutalist-border bg-background px-5 py-4 transition-colors hover:bg-background-elevated"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] font-bold uppercase leading-tight text-foreground-subtle">
              Founder
              <br />
              of
            </span>
            <Image
              src="/images/olam-logo.png"
              alt="It's Olam Company"
              width={2000}
              height={1042}
              className="h-10 w-auto sm:h-12"
            />
          </div>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-foreground-subtle transition-transform group-hover/olam:translate-x-0.5 group-hover/olam:-translate-y-0.5"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}
