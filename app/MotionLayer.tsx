"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".fm-hero-copy > *",
  ".fm-hero-meta > *",
  ".fm-collage-card",
  ".fm-capability-row > *",
  ".fm-manifesto-title > *",
  ".fm-manifesto-copy > *",
  ".fm-proof-row > *",
  ".fm-section-head > *",
  ".fm-service-list article",
  ".fm-project-card",
  ".fm-brand-break-inner > *",
  ".fm-process-head > *",
  ".fm-process-grid article",
  ".fm-contact-inner > *",
  ".fm-footer-inner > *",
];

export default function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    root.classList.add("fm-motion-ready");

    const cleanup: Array<() => void> = [];

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors.join(","))
    );

    revealElements.forEach((element) => {
      element.classList.add("fm-reveal");
      const parent = element.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((child) =>
          revealElements.includes(child as HTMLElement)
        );
        const index = Math.max(0, siblings.indexOf(element));
        element.style.setProperty("--reveal-delay", `${Math.min(index * 75, 300)}ms`);
      }
    });

    if (reduceMotion) {
      root.classList.add("fm-reduced-motion");
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      revealElements.forEach((element) => observer.observe(element));
      cleanup.push(() => observer.disconnect());
    }

    const header = document.querySelector<HTMLElement>(".fm-header");
    const progress = document.createElement("div");
    progress.className = "fm-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, y / max));
      progress.style.transform = `scaleX(${ratio})`;
      header?.classList.toggle("fm-header-scrolled", y > 24);

      if (!reduceMotion) {
        document.querySelectorAll<HTMLElement>(".fm-collage-script img, .fm-brand-break img").forEach((element) => {
          const rect = element.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const delta = (center - window.innerHeight / 2) / window.innerHeight;
          element.style.setProperty("--fm-parallax", `${Math.max(-12, Math.min(12, delta * -18))}px`);
        });
      }
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    cleanup.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      progress.remove();
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active?.target.id) return;

        document.querySelectorAll<HTMLAnchorElement>(".fm-nav a").forEach((link) => {
          link.classList.toggle("fm-nav-active", link.getAttribute("href") === `#${active.target.id}`);
        });
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-30% 0px -48% 0px" }
    );

    ["about", "services", "work", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    cleanup.push(() => sectionObserver.disconnect());

    const menuLinks = document.querySelectorAll<HTMLAnchorElement>(".fm-mobile-menu a");
    const closeMenu = (event: Event) => {
      const details = (event.currentTarget as HTMLElement).closest("details");
      details?.removeAttribute("open");
    };
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    cleanup.push(() => menuLinks.forEach((link) => link.removeEventListener("click", closeMenu)));

    if (finePointer && !reduceMotion) {
      const glow = document.createElement("div");
      glow.className = "fm-cursor-glow";
      glow.setAttribute("aria-hidden", "true");
      document.body.appendChild(glow);

      let pointerFrame = 0;
      let pointerX = window.innerWidth / 2;
      let pointerY = window.innerHeight / 2;

      const renderPointer = () => {
        pointerFrame = 0;
        glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      };

      const onPointerMove = (event: PointerEvent) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const magnetic = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".fm-header-cta, .fm-collage-cta, .fm-contact-copy a, .fm-service-list article > a"
        )
      );

      const magneticCleanups = magnetic.map((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - (rect.left + rect.width / 2)) * 0.09;
          const y = (event.clientY - (rect.top + rect.height / 2)) * 0.09;
          element.style.setProperty("--fm-magnetic-x", `${x}px`);
          element.style.setProperty("--fm-magnetic-y", `${y}px`);
          element.classList.add("fm-magnetic-active");
        };
        const leave = () => {
          element.style.setProperty("--fm-magnetic-x", "0px");
          element.style.setProperty("--fm-magnetic-y", "0px");
          element.classList.remove("fm-magnetic-active");
        };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        return () => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
        };
      });

      cleanup.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        magneticCleanups.forEach((fn) => fn());
        glow.remove();
      });
    }

    return () => {
      cleanup.forEach((fn) => fn());
      root.classList.remove("fm-motion-ready", "fm-reduced-motion");
    };
  }, []);

  return null;
}
