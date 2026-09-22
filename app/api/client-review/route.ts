import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "otrservicesie@gmail.com";
const PROJECTS = new Set([
  "Pressed In Pink",
  "Pacific Stay Properties",
  "JMB 2 Creations",
  "Muerto De Hambre",
  "Muebleria 3R",
]);

function clean(value: unknown, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Review delivery is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const project = clean(body.project, 180);
    const review = clean(body.review, 1200);
    const website = clean(body.website, 200);
    const rating = Number(body.rating);
    const approvedForDisplay = body.approvedForDisplay === true;

    // Honeypot. Normal visitors never see or fill this field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (
      !name ||
      !email ||
      !isEmail(email) ||
      !PROJECTS.has(project) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      review.length < 20 ||
      !approvedForDisplay
    ) {
      return NextResponse.json(
        { ok: false, error: "Please complete every field and confirm review display permission." },
        { status: 400 }
      );
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      project: escapeHtml(project),
      review: escapeHtml(review).replaceAll("\n", "<br />"),
    };

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const from = process.env.RESEND_FROM_EMAIL || "OTR Services <onboarding@resend.dev>";

    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New OTR Client Review — ${project} — ${rating}★`,
        html: `
          <div style="margin:0;padding:36px 18px;background:#0e0e0f;color:#f3f1eb;font-family:Arial,Helvetica,sans-serif;">
            <div style="max-width:680px;margin:0 auto;border:1px solid #373737;background:#19191b;">
              <div style="padding:26px 28px;border-bottom:1px solid #373737;">
                <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a09c95;">OTR SERVICES / CLIENT REVIEW</div>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.1;color:#f3f1eb;">${safe.project}</h1>
              </div>

              <div style="padding:28px;">
                <div style="font-size:28px;letter-spacing:.08em;color:#f1c75b;margin-bottom:22px;">${stars}</div>

                <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;color:#f3f1eb;">
                  <tr><td style="padding:7px 0;color:#9d9b95;width:150px;">Client</td><td style="padding:7px 0;">${safe.name}</td></tr>
                  <tr><td style="padding:7px 0;color:#9d9b95;">Email</td><td style="padding:7px 0;"><a href="mailto:${safe.email}" style="color:#f3f1eb;">${safe.email}</a></td></tr>
                  <tr><td style="padding:7px 0;color:#9d9b95;">Project</td><td style="padding:7px 0;">${safe.project}</td></tr>
                  <tr><td style="padding:7px 0;color:#9d9b95;">Display permission</td><td style="padding:7px 0;">Approved</td></tr>
                </table>

                <div style="margin-top:26px;padding-top:24px;border-top:1px solid #373737;">
                  <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#9d9b95;margin-bottom:12px;">Their review</div>
                  <div style="font-size:16px;line-height:1.7;color:#f3f1eb;">“${safe.review}”</div>
                </div>

                <div style="margin-top:28px;padding:14px 16px;border:1px solid #3d3250;background:#17131c;color:#bba8ca;font-size:12px;line-height:1.55;">
                  This review is not published automatically. Add it to the matching project on OTR Services only after you approve the wording.
                </div>
              </div>

              <div style="padding:18px 28px;border-top:1px solid #373737;color:#777;font-size:11px;">Submitted through the private OTR client review link.</div>
            </div>
          </div>
        `,
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend client review failed", resendResponse.status, resendError.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: "We couldn't send your review right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your review right now. Please try again." },
      { status: 500 }
    );
  }
}
