"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [phase, setPhase] = useState<"visible" | "exit" | "hidden">("visible");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setPhase("exit"), 1500);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = previousOverflow;
    }, 1900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`otr-intro ${phase === "exit" ? "is-exiting" : ""}`} aria-hidden="true">
      <div className="otr-intro-ring" />
      <img src="/OTR.png" alt="" className="otr-intro-logo" />
    </div>
  );
}
