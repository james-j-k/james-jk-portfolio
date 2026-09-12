"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const GRID_SIZE = 20;
const INITIAL_TICK_MS = 130;
const MIN_TICK_MS = 70;
const TICK_STEP_MS = 3;
const HIGH_SCORE_KEY = "snake-high-score";

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const DIRECTION_DELTA: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

function initialSnake(): Point[] {
  const mid = Math.floor(GRID_SIZE / 2);
  return [
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
    { x: mid - 3, y: mid },
  ];
}

export default function SnakeEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState<"idle" | "playing" | "gameover">(
    "idle"
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(initialSnake());
  const foodRef = useRef<Point>(randomFood(initialSnake()));
  const directionRef = useRef<Direction>("right");
  const pendingDirectionRef = useRef<Direction>("right");
  const tickMsRef = useRef(INITIAL_TICK_MS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const konamiBufferRef = useRef<string[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const cell = canvas.width / GRID_SIZE;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }

    const food = foodRef.current;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      food.x * cell + 4,
      food.y * cell + 4,
      cell - 8,
      cell - 8
    );

    ctx.fillStyle = "#000000";
    snakeRef.current.forEach((seg, i) => {
      const pad = i === 0 ? 1 : 2;
      ctx.fillRect(
        seg.x * cell + pad,
        seg.y * cell + pad,
        cell - pad * 2,
        cell - pad * 2
      );
    });
  }, []);

  const startGame = useCallback(() => {
    snakeRef.current = initialSnake();
    foodRef.current = randomFood(snakeRef.current);
    directionRef.current = "right";
    pendingDirectionRef.current = "right";
    tickMsRef.current = INITIAL_TICK_MS;
    setScore(0);
    setStatus("playing");
  }, []);

  const gameOver = useCallback(() => {
    setStatus("gameover");
    setScore((s) => {
      setHighScore((prevHigh) => {
        const next = Math.max(prevHigh, s);
        try {
          window.localStorage.setItem(HIGH_SCORE_KEY, String(next));
        } catch {}
        return next;
      });
      return s;
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    directionRef.current = pendingDirectionRef.current;
    const delta = DIRECTION_DELTA[directionRef.current];
    const head = snakeRef.current[0];
    const newHead: Point = { x: head.x + delta.x, y: head.y + delta.y };

    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE ||
      snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y)
    ) {
      gameOver();
      draw();
      return;
    }

    const ateFood =
      newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
    const newSnake = [newHead, ...snakeRef.current];
    if (ateFood) {
      setScore((s) => s + 1);
      foodRef.current = randomFood(newSnake);
      tickMsRef.current = Math.max(
        MIN_TICK_MS,
        tickMsRef.current - TICK_STEP_MS
      );
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, tickMsRef.current);
      }
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
    draw();
  }, [draw, gameOver]);

  // start/stop the tick loop when play status changes
  useEffect(() => {
    if (status !== "playing") return;
    intervalRef.current = setInterval(tick, tickMsRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // draw once whenever the modal opens / resets to idle
  useEffect(() => {
    if (isOpen) draw();
  }, [isOpen, draw]);

  // load high score once
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
      if (stored) setHighScore(Number(stored) || 0);
    } catch {}
  }, []);

  const setDirection = useCallback((dir: Direction) => {
    if (OPPOSITE[dir] === directionRef.current) return;
    pendingDirectionRef.current = dir;
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // global Konami-code listener (only while the game is closed)
  useEffect(() => {
    if (isOpen) return;
    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const buf = konamiBufferRef.current;
      buf.push(key);
      if (buf.length > KONAMI_CODE.length) buf.shift();
      if (
        buf.length === KONAMI_CODE.length &&
        buf.every((k, i) => k === KONAMI_CODE[i])
      ) {
        konamiBufferRef.current = [];
        setIsOpen(true);
        setStatus("idle");
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  // in-game controls + escape to close
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "escape") {
        close();
        return;
      }
      const map: Record<string, Direction> = {
        arrowup: "up",
        arrowdown: "down",
        arrowleft: "left",
        arrowright: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      if (map[key]) {
        e.preventDefault();
        if (status === "playing") setDirection(map[key]);
      }
      if (
        (key === "enter" || key === " ") &&
        (status === "idle" || status === "gameover")
      ) {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, status, setDirection, close, startGame]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md brutalist-border feature-shadow bg-background p-5 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close game"
          className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center brutalist-border bg-foreground text-background"
        >
          <X size={18} />
        </button>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-black uppercase tracking-tighter text-foreground sm:text-2xl">
            Snake.exe
          </h2>
          <div className="flex gap-2">
            <span className="brutalist-border bg-background px-2 py-1 font-mono text-[10px] font-bold uppercase text-foreground">
              Score {score}
            </span>
            <span className="brutalist-border bg-foreground px-2 py-1 font-mono text-[10px] font-bold uppercase text-background">
              Best {highScore}
            </span>
          </div>
        </div>

        <div className="relative brutalist-border bg-background">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="block h-auto w-full"
          />

          {status !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/90 p-6 text-center">
              <p className="font-display text-2xl font-black uppercase text-foreground">
                {status === "gameover" ? "Game Over" : "Ready?"}
              </p>
              {status === "gameover" && (
                <p className="font-mono text-xs font-bold uppercase text-foreground-muted">
                  You scored {score}
                </p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="btn-shadow brutalist-border bg-foreground px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background"
              >
                {status === "gameover" ? "Retry" : "Start"}
              </button>
              <p className="font-mono text-[10px] uppercase text-foreground-subtle">
                Arrow keys / WASD to move
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:hidden">
          <div />
          <button
            type="button"
            onClick={() => setDirection("up")}
            aria-label="Up"
            className="btn-shadow brutalist-border flex h-12 items-center justify-center bg-background font-black text-foreground"
          >
            ↑
          </button>
          <div />
          <button
            type="button"
            onClick={() => setDirection("left")}
            aria-label="Left"
            className="btn-shadow brutalist-border flex h-12 items-center justify-center bg-background font-black text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setDirection("down")}
            aria-label="Down"
            className="btn-shadow brutalist-border flex h-12 items-center justify-center bg-background font-black text-foreground"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => setDirection("right")}
            aria-label="Right"
            className="btn-shadow brutalist-border flex h-12 items-center justify-center bg-background font-black text-foreground"
          >
            →
          </button>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
          Press ESC to exit
        </p>
      </div>
    </div>
  );
}
