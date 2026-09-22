"use client";

import { FormEvent, useState } from "react";
import styles from "./review.module.css";

const projects = [
  "Pressed In Pink",
  "Pacific Stay Properties",
  "JMB 2 Creations",
  "Muerto De Hambre",
  "Muebleria 3R",
];

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!rating) {
      setStatus("error");
      setMessage("Choose a star rating before submitting.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/client-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          project: data.get("project"),
          review: data.get("review"),
          approvedForDisplay: data.get("approvedForDisplay") === "on",
          website: data.get("website"),
          rating,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Your review could not be sent.");
      }

      form.reset();
      setRating(0);
      setHoveredRating(0);
      setStatus("success");
      setMessage("Review sent. Thank you for trusting OTR with your business.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your review could not be sent. Please try again.");
    }
  }

  const visibleRating = hoveredRating || rating;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" maxLength={120} required placeholder="Name" />
        </label>

        <label className={styles.field}>
          <span>Email <small>for verification only</small></span>
          <input name="email" type="email" autoComplete="email" maxLength={180} required placeholder="you@example.com" />
        </label>
      </div>

      <label className={styles.field}>
        <span>Which website is yours?</span>
        <select name="project" defaultValue="" required>
          <option value="" disabled>Select your project</option>
          {projects.map(project => (
            <option value={project} key={project}>{project}</option>
          ))}
        </select>
      </label>

      <fieldset className={styles.ratingField}>
        <legend>How would you rate working with OTR?</legend>
        <div className={styles.stars} onMouseLeave={() => setHoveredRating(0)}>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              className={star <= visibleRating ? styles.starActive : styles.star}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              aria-pressed={rating === star}
              onMouseEnter={() => setHoveredRating(star)}
              onFocus={() => setHoveredRating(star)}
              onBlur={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
          <span className={styles.ratingText}>{rating ? `${rating}/5` : "Choose 1–5"}</span>
        </div>
      </fieldset>

      <label className={styles.field}>
        <span>Tell us about working together</span>
        <textarea
          name="review"
          minLength={20}
          maxLength={1200}
          required
          placeholder="What did OTR build for you, and what was the experience like?"
          rows={6}
        />
        <small className={styles.helper}>A few honest sentences is perfect.</small>
      </label>

      <label className={styles.consent}>
        <input name="approvedForDisplay" type="checkbox" required />
        <span>I’m okay with OTR Services displaying this review publicly with my name and project.</span>
      </label>

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className={styles.submit} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SUBMIT REVIEW"}
        <span aria-hidden="true">↗</span>
      </button>

      {message && (
        <p className={status === "success" ? styles.success : styles.error} role="status">
          {message}
        </p>
      )}
    </form>
  );
}
