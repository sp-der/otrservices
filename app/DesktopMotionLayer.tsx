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

export default function DesktopMotionLayer() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 761px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors.join(","))
    );
    if (!revealElements.length) return;

    revealElements.forEach((element) => element.classList.add("otr-desk-motion"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-active");
          revealObserver.unobserve(element);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      revealElements.forEach((element) => {
        element.classList.remove("otr-desk-motion", "is-active");
        element.classList.remove("otr-desk-drift", "is-near");
        element.style.removeProperty("--otr-scroll-y");
      });
    };
  }, []);

  return null;
}
