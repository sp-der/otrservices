import type { Metadata } from "next";
import ReviewForm from "./ReviewForm";
import styles from "./review.module.css";

export const metadata: Metadata = {
  title: "Client Review | OTR Services",
  description: "Private client feedback for OTR Services.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ReviewPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="OTR Services home">
          <img src="/ScriptW.png" alt="On The Run" />
        </a>
        <span>PRIVATE CLIENT REVIEW</span>
      </header>

      <section className={styles.shell}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>OTR SERVICES / CLIENT FEEDBACK</p>
          <h1>YOUR EXPERIENCE.<br /><span>IN YOUR WORDS.</span></h1>
          <p className={styles.lead}>
            Pick your project, rate the experience, and leave a few words about working together. Nothing is posted automatically. Every review is checked by OTR first.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelTop}>
            <span>REVIEW FORM / 01</span>
            <span>1–2 MINUTES</span>
          </div>
          <ReviewForm />
        </div>
      </section>

      <footer className={styles.footer}>
        <span>ON THE RUN / CREATIVE STUDIO</span>
        <span>THANK YOU FOR BUILDING WITH US.</span>
      </footer>
    </main>
  );
}
