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

    const nearby = new Set<HTMLElement>();
    elements.forEach((element) => element.classList.add("otr-desk-motion"));

    const observer = new IntersectionObserver(
      (entries) => {
        let needsRender = false;

        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            nearby.add(element);
            element.classList.add("is-active");
            needsRender = true;
          } else {
            nearby.delete(element);
          }
        });

        if (needsRender) requestRender();
      },
      {
        threshold: 0,
        rootMargin: "45% 0px 45% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    let frame = 0;

    const render = () => {
      frame = 0;
      const viewport = Math.max(window.innerHeight, 1);
      const center = viewport * 0.5;

      nearby.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height * 0.5;
        const distance = (elementCenter - center) / viewport;
        const clamped = Math.max(-1, Math.min(1, distance));
        const abs = Math.abs(clamped);

        /* Deliberately restrained so the page moves without feeling floaty. */
        const y = clamped * 52;
        const opacity = Math.max(0.68, 1 - Math.max(0, abs - 0.22) * 0.38);

        element.style.setProperty("--otr-scroll-y", `${y}px`);
        element.style.setProperty("--otr-scroll-opacity", `${opacity}`);
      });
    };

    function requestRender() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      observer.disconnect();
      nearby.clear();
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
