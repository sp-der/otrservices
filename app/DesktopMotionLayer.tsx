"use client";

import { useEffect } from "react";

const selectors = [
  ".fm-hero-copy-refresh > *",
  ".fm-availability",
  ".fm-manifesto-title > *",
  ".fm-manifesto-copy > *",
  ".fm-proof-row > *",
  ".fm-services .fm-section-head > *",
  ".fm-service-list article",
  ".fm-work .fm-section-head > *",
  ".fm-project-card",
  ".fm-brand-break-inner > *",
  ".fm-process-head > *",
  ".fm-process-grid article",
  ".fm-contact-heading > *",
  ".fm-project-form",
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
      const center = viewport * 0.5;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewport * 0.45 || rect.top > viewport * 1.45) return;

        const elementCenter = rect.top + rect.height / 2;
        const distance = (elementCenter - center) / viewport;
        const clamped = Math.max(-1.1, Math.min(1.1, distance));
        const abs = Math.abs(clamped);
        const stagger = ((index % 4) - 1.5) * 3;

        const translateY = clamped * 112 + stagger;
        const opacity = Math.max(0.22, 1 - Math.max(0, abs - 0.05) * 0.9);
        const blur = Math.max(0, abs - 0.18) * 6;

        element.style.setProperty("--fm-desktop-y", `${translateY.toFixed(2)}px`);
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
