"use client";

import { useEffect } from "react";

const revealSelectors = [
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

/*
 * Continuous drift stays off the live iframe cards. Moving iframe surfaces on
 * every scroll frame is noticeably more expensive than moving text/content.
 */
const driftSelectors = [
  ".fm-manifesto-title",
  ".fm-manifesto-copy",
  ".fm-proof-row > *",
  ".fm-services .fm-section-head > *",
  ".fm-service-list article",
  ".fm-work .fm-section-head > *",
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

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors.join(","))
    );
    const driftElements = Array.from(
      document.querySelectorAll<HTMLElement>(driftSelectors.join(","))
    );

    if (!revealElements.length) return;

    revealElements.forEach((element) => element.classList.add("otr-desk-motion"));
    driftElements.forEach((element) => element.classList.add("otr-desk-drift"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-active");
          revealObserver.unobserve(element);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const nearby = new Set<HTMLElement>();
    const proximityObserver = new IntersectionObserver(
      (entries) => {
        let changed = false;

        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            nearby.add(element);
            element.classList.add("is-near");
          } else {
            nearby.delete(element);
            element.classList.remove("is-near");
          }
          changed = true;
        });

        if (changed) requestRender();
      },
      {
        threshold: 0,
        rootMargin: "32% 0px 32% 0px",
      }
    );

    driftElements.forEach((element) => proximityObserver.observe(element));

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
        const y = clamped * 46;

        element.style.setProperty("--otr-scroll-y", `${y.toFixed(1)}px`);
      });
    };

    function requestRender() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      revealObserver.disconnect();
      proximityObserver.disconnect();
      nearby.clear();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);

      revealElements.forEach((element) => {
        element.classList.remove("otr-desk-motion", "is-active");
      });

      driftElements.forEach((element) => {
        element.classList.remove("otr-desk-drift", "is-near");
        element.style.removeProperty("--otr-scroll-y");
      });
    };
  }, []);

  return null;
}
