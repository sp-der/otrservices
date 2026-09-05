"use client";

import { useEffect } from "react";

const embeds = [
  { card: 1, name: "Pressed In Pink", url: "https://pressedinpink.com" },
  { card: 2, name: "Pacific Stay Properties", url: "https://pacificstay-git-main-pressed-in-pink.vercel.app" },
  { card: 3, name: "JMB 2 Creations", url: "https://jmb2creations.com" },
  { card: 4, name: "Muerto De Hambre", url: "https://meurtodehambre-git-main-pressed-in-pink.vercel.app" },
];

export default function PortfolioEmbeds() {
  useEffect(() => {
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
            <iframe src="${url}" title="${name} website preview" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
        </div>
      `;
    });
  }, []);

  return null;
}
