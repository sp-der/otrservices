"use client";

import { useEffect } from "react";

const selectors = [
  ".fm-manifesto-title",
  ".fm-manifesto-copy",
  ".fm-proof-row > *",
  ".fm-services .fm-section-head > *",
  ".fm-service-list article",
  ".fm-work .fm-section-head > *",
  ".fm-project-card",
  ".fm-brand-break-inner > *",
  ".fm-process-head > *",
  ".fm-process-grid article",
  ".fm-contact-inner > *",
  ".fm-footer-inner > *",
];

export default function DesktopMotionLayer() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduceMotion.matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(","))
    );

    elements.forEach((element) => element.classList.add("fm-desktop-depth"));

    let frame = 0;

    const render = () => {
      frame = 0;
      const viewport = window.innerHeight || 1;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewport * 0.35 || rect.top > viewport * 1.35) return;

        const raw = (viewport - rect.top) / (viewport + rect.height);
        const progress = Math.max(0, Math.min(1, raw));
        const centerStrength = Math.sin(progress * Math.PI);
        const direction = 0.5 - progress;
        const stagger = (index % 4) * 5;
        const y = direction * 150 + stagger;
        const opacity = 0.3 + centerStrength * 0.7;
        const blur = (1 - centerStrength) * 5;

        element.style.setProperty("--fm-desktop-y", `${y.toFixed(2)}px`);
        element.style.setProperty("--fm-desktop-opacity", opacity.toFixed(3));
        element.style.setProperty("--fm-desktop-blur", `${blur.toFixed(2)}px`);
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
      elements.forEach((element) => {
        element.classList.remove("fm-desktop-depth");
        element.style.removeProperty("--fm-desktop-y");
        element.style.removeProperty("--fm-desktop-opacity");
        element.style.removeProperty("--fm-desktop-blur");
      });
    };
  }, []);

  return null;
}
