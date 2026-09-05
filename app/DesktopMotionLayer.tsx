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
  ".fm-contact-heading > *",
  ".fm-project-form",
  ".fm-footer-inner > *",
];

export default function DesktopMotionLayer() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 761px)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(","))
    );

    if (!elements.length) return;

    elements.forEach((element) => element.classList.add("otr-desk-motion"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-active");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    let frame = 0;

    const render = () => {
      frame = 0;
      const viewport = Math.max(window.innerHeight, 1);
      const center = viewport * 0.5;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewport * 0.5 || rect.top > viewport * 1.5) return;

        const elementCenter = rect.top + rect.height / 2;
        const distance = (elementCenter - center) / viewport;
        const clamped = Math.max(-1, Math.min(1, distance));
        const abs = Math.abs(clamped);

        const y = clamped * 64;
        const opacity = Math.max(0.56, 1 - Math.max(0, abs - 0.2) * 0.48);

        element.style.setProperty("--otr-scroll-y", `${y.toFixed(2)}px`);
        element.style.setProperty("--otr-scroll-opacity", opacity.toFixed(3));
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);

      elements.forEach((element) => {
        element.classList.remove("otr-desk-motion", "is-active");
        element.style.removeProperty("--otr-scroll-y");
        element.style.removeProperty("--otr-scroll-opacity");
      });
    };
  }, []);

  return null;
}
