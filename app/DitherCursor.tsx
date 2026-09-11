"use client";

import { useEffect, useRef } from "react";
import "./DitherCursor.css";

type DitherCursorProps = {
  ditherSize?: number;
  radius?: number;
  exponent?: number;
  decay?: number;
  intensity?: number;
  color?: string;
  className?: string;
};

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
].map((value) => (value + 0.5) / 16);

function parseHex(hex: string) {
  const clean = hex.replace("#", "").trim();
  const value = clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean.slice(0, 6);
  const num = Number.parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function DitherCursor({
  ditherSize = 6,
  radius = 0.1,
  exponent = 2,
  decay = 0.01,
  intensity = 0.5,
  color = "#FF9FFC",
  className = "",
}: DitherCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const valuesRef = useRef<Float32Array>(new Float32Array(0));
  const dimensionsRef = useRef({ width: 1, height: 1, cols: 1, rows: 1, dpr: 1 });
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rebuild = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cols = Math.max(1, Math.ceil(width / ditherSize));
      const rows = Math.max(1, Math.ceil(height / ditherSize));

      dimensionsRef.current = { width, height, cols, rows, dpr };
      valuesRef.current = new Float32Array(cols * rows);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
    };

    const draw = (now: number) => {
      const { width, height, cols, rows } = dimensionsRef.current;
      const values = valuesRef.current;
      const elapsedMs = Math.min(50, Math.max(0, now - lastFrameRef.current));
      lastFrameRef.current = now;
      const frameScale = elapsedMs > 0 ? elapsedMs / (1000 / 60) : 1;
      const fade = Math.pow(Math.max(0, 1 - decay), frameScale);
      const { r, g, b } = parseHex(color);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      let anyVisible = false;
      const tile = Math.max(1, ditherSize);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          let value = values[index] * fade;
          if (value < 0.003) {
            values[index] = 0;
            continue;
          }

          values[index] = value;
          anyVisible = true;

          const threshold = BAYER_4X4[(row % 4) * 4 + (col % 4)];
          const normalized = Math.min(1, value);
          if (normalized <= threshold) continue;

          const alpha = Math.min(1, 0.38 + normalized * 0.95);
          ctx.globalAlpha = alpha;
          ctx.fillRect(col * tile, row * tile, tile, tile);
        }
      }

      ctx.globalAlpha = 1;

      if (anyVisible) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        runningRef.current = false;
        rafRef.current = null;
      }
    };

    const wake = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastFrameRef.current = performance.now();
      rafRef.current = requestAnimationFrame(draw);
    };

    const energize = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      if (
        clientX < rect.left || clientX > rect.right ||
        clientY < rect.top || clientY > rect.bottom
      ) {
        return;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const { width, height, cols, rows } = dimensionsRef.current;
      const values = valuesRef.current;
      const influenceRadius = Math.max(18, Math.min(width, height) * radius);
      const minCol = Math.max(0, Math.floor((x - influenceRadius) / ditherSize));
      const maxCol = Math.min(cols - 1, Math.ceil((x + influenceRadius) / ditherSize));
      const minRow = Math.max(0, Math.floor((y - influenceRadius) / ditherSize));
      const maxRow = Math.min(rows - 1, Math.ceil((y + influenceRadius) / ditherSize));

      for (let row = minRow; row <= maxRow; row += 1) {
        const cy = row * ditherSize + ditherSize * 0.5;
        for (let col = minCol; col <= maxCol; col += 1) {
          const cx = col * ditherSize + ditherSize * 0.5;
          const distance = Math.hypot(cx - x, cy - y);
          if (distance > influenceRadius) continue;

          const falloff = Math.pow(Math.max(0, 1 - distance / influenceRadius), exponent);
          const index = row * cols + col;
          const nextValue = Math.min(1, falloff * intensity * 2);
          if (nextValue > values[index]) values[index] = nextValue;
        }
      }

      wake();
    };

    const handlePointerMove = (event: PointerEvent) => {
      energize(event.clientX, event.clientY);
    };

    const resizeObserver = new ResizeObserver(() => rebuild());
    resizeObserver.observe(root);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rebuild();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [color, decay, ditherSize, exponent, intensity, radius]);

  return (
    <div
      ref={rootRef}
      className={`dither-cursor ${className}`.trim()}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="dither-cursor__canvas" />
    </div>
  );
}
