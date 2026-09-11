'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import './DotGrid.css';

type DotState = {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  vx: number;
  vy: number;
};

type PointerState = {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  lastTime: number;
};

type BoundsState = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type GridMeta = {
  cols: number;
  rows: number;
  cell: number;
  startX: number;
  startY: number;
};

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: CSSProperties;
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<DotState[]>([]);
  const boundsRef = useRef<BoundsState>({ left: 0, top: 0, width: 0, height: 0 });
  const gridRef = useRef<GridMeta>({ cols: 0, rows: 0, cell: 1, startX: 0, startY: 0 });
  const visibleRef = useRef(true);
  const moveRafRef = useRef(0);
  const latestPointerRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef<PointerState>({ x: -9999, y: -9999, lastX: 0, lastY: 0, lastTime: 0 });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const sameColor = baseColor.toLowerCase() === activeColor.toLowerCase();

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    boundsRef.current = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width,
      height,
    };

    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const cols = Math.max(1, Math.floor((width + gap) / cell));
    const rows = Math.max(1, Math.floor((height + gap) / cell));
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    gridRef.current = { cols, rows, cell, startX, startY };

    const dots: DotState[] = new Array(cols * rows);
    let index = 0;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        dots[index] = {
          cx: startX + col * cell,
          cy: startY + row * cell,
          xOffset: 0,
          yOffset: 0,
          vx: 0,
          vy: 0,
        };
        index += 1;
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();

    const ro = new ResizeObserver(buildGrid);
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    const io = new IntersectionObserver(
      entries => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '200px 0px' },
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [buildGrid]);

  useEffect(() => {
    let rafId = 0;
    let lastFrame = performance.now();
    const radius = dotSize / 2;
    const proxSq = proximity * proximity;

    const draw = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!visibleRef.current) {
        lastFrame = now;
        rafId = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bounds = boundsRef.current;
      const meta = gridRef.current;
      const dots = dotsRef.current;
      const frameScale = Math.min((now - lastFrame) / 16.667, 2);
      lastFrame = now;

      ctx.clearRect(0, 0, bounds.width, bounds.height);

      const viewportTop = Math.max(0, window.scrollY - bounds.top - 120);
      const viewportBottom = Math.min(bounds.height, viewportTop + window.innerHeight + 240);
      const firstRow = Math.max(0, Math.floor((viewportTop - meta.startY) / meta.cell));
      const lastRow = Math.min(meta.rows - 1, Math.ceil((viewportBottom - meta.startY) / meta.cell));

      const spring = Math.min(0.14, 0.105 / Math.max(returnDuration, 0.35));
      const dampingBase = Math.min(0.9, Math.max(0.72, 0.79 + resistance / 10000));
      const damping = Math.pow(dampingBase, frameScale);
      const { x: px, y: py } = pointerRef.current;

      if (sameColor) {
        ctx.beginPath();
        for (let row = firstRow; row <= lastRow; row += 1) {
          const rowStart = row * meta.cols;
          for (let col = 0; col < meta.cols; col += 1) {
            const dot = dots[rowStart + col];
            dot.vx += -dot.xOffset * spring * frameScale;
            dot.vy += -dot.yOffset * spring * frameScale;
            dot.vx *= damping;
            dot.vy *= damping;
            dot.xOffset += dot.vx * frameScale;
            dot.yOffset += dot.vy * frameScale;

            if (Math.abs(dot.xOffset) < 0.01 && Math.abs(dot.vx) < 0.01) {
              dot.xOffset = 0;
              dot.vx = 0;
            }
            if (Math.abs(dot.yOffset) < 0.01 && Math.abs(dot.vy) < 0.01) {
              dot.yOffset = 0;
              dot.vy = 0;
            }

            const ox = dot.cx + dot.xOffset;
            const oy = dot.cy + dot.yOffset;
            ctx.moveTo(ox + radius, oy);
            ctx.arc(ox, oy, radius, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = baseColor;
        ctx.fill();
      } else {
        for (let row = firstRow; row <= lastRow; row += 1) {
          const rowStart = row * meta.cols;
          for (let col = 0; col < meta.cols; col += 1) {
            const dot = dots[rowStart + col];
            dot.vx += -dot.xOffset * spring * frameScale;
            dot.vy += -dot.yOffset * spring * frameScale;
            dot.vx *= damping;
            dot.vy *= damping;
            dot.xOffset += dot.vx * frameScale;
            dot.yOffset += dot.vy * frameScale;

            const dx = dot.cx - px;
            const dy = dot.cy - py;
            const dsq = dx * dx + dy * dy;
            let fillStyle = baseColor;
            if (dsq <= proxSq) {
              const t = 1 - Math.sqrt(dsq) / proximity;
              const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
              const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
              const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
              fillStyle = `rgb(${r},${g},${b})`;
            }

            ctx.beginPath();
            ctx.arc(dot.cx + dot.xOffset, dot.cy + dot.yOffset, radius, 0, Math.PI * 2);
            ctx.fillStyle = fillStyle;
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [dotSize, proximity, baseColor, sameColor, baseRgb, activeRgb, resistance, returnDuration]);

  const forNearbyDots = useCallback((x: number, y: number, radius: number, callback: (dot: DotState, dx: number, dy: number, dist: number) => void) => {
    const meta = gridRef.current;
    const dots = dotsRef.current;
    const minCol = Math.max(0, Math.floor((x - radius - meta.startX) / meta.cell));
    const maxCol = Math.min(meta.cols - 1, Math.ceil((x + radius - meta.startX) / meta.cell));
    const minRow = Math.max(0, Math.floor((y - radius - meta.startY) / meta.cell));
    const maxRow = Math.min(meta.rows - 1, Math.ceil((y + radius - meta.startY) / meta.cell));
    const radiusSq = radius * radius;

    for (let row = minRow; row <= maxRow; row += 1) {
      const rowStart = row * meta.cols;
      for (let col = minCol; col <= maxCol; col += 1) {
        const dot = dots[rowStart + col];
        const dx = dot.cx - x;
        const dy = dot.cy - y;
        const distSq = dx * dx + dy * dy;
        if (distSq > radiusSq) continue;
        callback(dot, dx, dy, Math.sqrt(distSq));
      }
    }
  }, []);

  useEffect(() => {
    const processPointer = () => {
      moveRafRef.current = 0;
      const { x: clientX, y: clientY } = latestPointerRef.current;
      const bounds = boundsRef.current;
      const docX = clientX + window.scrollX;
      const docY = clientY + window.scrollY;

      if (
        docX < bounds.left ||
        docX > bounds.left + bounds.width ||
        docY < bounds.top ||
        docY > bounds.top + bounds.height
      ) {
        pointerRef.current.x = -9999;
        pointerRef.current.y = -9999;
        return;
      }

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? Math.max(now - pr.lastTime, 8) : 16;
      const dx = clientX - pr.lastX;
      const dy = clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastX = clientX;
      pr.lastY = clientY;
      pr.lastTime = now;
      pr.x = docX - bounds.left;
      pr.y = docY - bounds.top;

      if (speed <= speedTrigger) return;

      const speedFactor = Math.min(speed / Math.max(speedTrigger, 1), 5);
      forNearbyDots(pr.x, pr.y, proximity, (dot, dotDx, dotDy, dist) => {
        const falloff = 1 - dist / proximity;
        const invDist = 1 / Math.max(dist, 1);
        const outward = falloff * (1.4 + speedFactor * 0.45);
        dot.vx += dotDx * invDist * outward + vx * 0.00045 * falloff;
        dot.vy += dotDy * invDist * outward + vy * 0.00045 * falloff;
      });
    };

    const onMove = (e: PointerEvent) => {
      latestPointerRef.current.x = e.clientX;
      latestPointerRef.current.y = e.clientY;
      if (!moveRafRef.current) moveRafRef.current = requestAnimationFrame(processPointer);
    };

    const onPointerDown = (e: PointerEvent) => {
      const bounds = boundsRef.current;
      const docX = e.clientX + window.scrollX;
      const docY = e.clientY + window.scrollY;
      if (
        docX < bounds.left ||
        docX > bounds.left + bounds.width ||
        docY < bounds.top ||
        docY > bounds.top + bounds.height
      ) return;

      const x = docX - bounds.left;
      const y = docY - bounds.top;
      forNearbyDots(x, y, shockRadius, (dot, dx, dy, dist) => {
        const falloff = Math.max(0, 1 - dist / shockRadius);
        const invDist = 1 / Math.max(dist, 1);
        const impulse = shockStrength * 2.2 * falloff;
        dot.vx += dx * invDist * impulse;
        dot.vy += dy * invDist * impulse;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onPointerDown);
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
    };
  }, [maxSpeed, speedTrigger, proximity, shockRadius, shockStrength, forNearbyDots]);

  return (
    <section className={`dot-grid ${className}`.trim()} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
}
