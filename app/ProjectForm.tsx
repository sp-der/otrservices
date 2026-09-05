"use client";

import { FormEvent, useState } from "react";

export default function ProjectForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      businessName: String(data.get("businessName") || ""),
      details: String(data.get("details") || ""),
      website: String(data.get("website") || ""),
    };

    setIsSubmitting(true);
    setStatus("Sending your request...");

    try {
      const response = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your request right now.");
      }

      form.reset();
      setStatus("Request sent. We'll be in touch soon.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We couldn't send your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="fm-project-form" onSubmit={handleSubmit}>
      <div className="fm-form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Phone Number</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Business Name</span>
          <input name="businessName" type="text" autoComplete="organization" required />
        </label>
        <label className="fm-form-wide">
          <span>Tell us about your business and what you want for your website</span>
          <textarea
            name="details"
            rows={7}
            placeholder="What kind of business are you running? What do you need the website to do? What are you trying to improve or launch?"
            required
          />
        </label>
        <label style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="fm-form-footer">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "SENDING..." : "SEND PROJECT REQUEST"} <span>↗</span>
        </button>
        <small aria-live="polite">{status}</small>
      </div>
    </form>
  );
}
