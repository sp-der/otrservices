"use client";

import { FormEvent, useState } from "react";

export default function ProjectForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const businessName = String(data.get("businessName") || "");
    const details = String(data.get("details") || "");

    const subject = encodeURIComponent(`OTR Website Request - ${businessName || name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone Number: ${phone}`,
        `Email: ${email}`,
        `Business Name: ${businessName}`,
        "",
        "Business / Website Request:",
        details,
      ].join("\n")
    );

    setStatus("Opening your email app...");
    window.location.href = `mailto:otrservicesie@gmail.com?subject=${subject}&body=${body}`;
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
      </div>
      <div className="fm-form-footer">
        <button type="submit">SEND PROJECT REQUEST <span>↗</span></button>
        <small aria-live="polite">{status}</small>
      </div>
    </form>
  );
}
