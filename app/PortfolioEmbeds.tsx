"use client";

import { useEffect } from "react";

const embeds = [
  { card: 1, name: "Pressed In Pink", url: "https://pressedinpink.com" },
  { card: 2, name: "Pacific Stay Properties", url: "https://pacificstayproperties.com" },
  { card: 3, name: "JMB 2 Creations", url: "https://jmb2creations.com" },
  { card: 4, name: "Muerto De Hambre", url: "https://mdhgrill.com" },
];

export default function PortfolioEmbeds() {
  useEffect(() => {
    const visuals: Element[] = [];

    embeds.forEach(({ card, name, url }) => {
      const visual = document.querySelector(`.project-card-${card} .project-visual`);
      if (!visual || visual.querySelector("iframe")) return;

      visual.innerHTML = `
        <div class="site-preview-browser">
          <div class="site-preview-bar">
            <span class="site-preview-dots"><i></i><i></i><i></i></span>
            <span class="site-preview-url">${url.replace(/^https?:\/\//, "")}</span>
            <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${name} website">OPEN ↗</a>
          </div>
          <div class="site-preview-window">
            <iframe data-src="${url}" title="${name} website preview" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
        </div>
      `;
      visuals.push(visual);
    });

    const setActive = (visual: Element, active: boolean) => {
      const iframe = visual.querySelector<HTMLIFrameElement>("iframe");
      if (!iframe) return;
      const target = iframe.dataset.src;
      if (!target) return;

      if (active) {
        if (!iframe.src || iframe.src === "about:blank") iframe.src = target;
      } else if (iframe.src && iframe.src !== "about:blank") {
        iframe.src = "about:blank";
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => setActive(entry.target, entry.isIntersecting));
      },
      { rootMargin: "650px 0px", threshold: 0 }
    );

    visuals.forEach(visual => observer.observe(visual));

    return () => {
      observer.disconnect();
      visuals.forEach(visual => setActive(visual, false));
    };
  }, []);

  return null;
}
