import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "otrservicesie@gmail.com";

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
      { ok: false, error: "Project request email is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 180);
    const businessName = clean(body.businessName, 180);
    const details = clean(body.details, 5000);
    const website = clean(body.website, 200);

    // Honeypot. Real visitors never see or fill this field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !phone || !email || !businessName || !details || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please complete every field with a valid email address." },
        { status: 400 }
      );
    }

    const safe = {
      name: escapeHtml(name),
      phone: escapeHtml(phone),
      email: escapeHtml(email),
      businessName: escapeHtml(businessName),
      details: escapeHtml(details).replaceAll("\n", "<br />"),
    };

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
        subject: `New OTR Project Request — ${businessName}`,
        html: `
          <div style="margin:0;padding:36px 18px;background:#111;color:#f3f1eb;font-family:Arial,Helvetica,sans-serif;">
            <div style="max-width:680px;margin:0 auto;border:1px solid #373737;background:#1b1b1b;">
              <div style="padding:26px 28px;border-bottom:1px solid #373737;">
                <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9d9b95;">OTR SERVICES / NEW LEAD</div>
                <h1 style="margin:12px 0 0;font-size:30px;line-height:1.05;color:#f3f1eb;">NEW PROJECT REQUEST</h1>
              </div>
              <div style="padding:28px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;color:#f3f1eb;">
                  <tr><td style="padding:9px 0;color:#9d9b95;width:150px;">Name</td><td style="padding:9px 0;">${safe.name}</td></tr>
                  <tr><td style="padding:9px 0;color:#9d9b95;">Phone</td><td style="padding:9px 0;">${safe.phone}</td></tr>
                  <tr><td style="padding:9px 0;color:#9d9b95;">Email</td><td style="padding:9px 0;"><a href="mailto:${safe.email}" style="color:#f3f1eb;">${safe.email}</a></td></tr>
                  <tr><td style="padding:9px 0;color:#9d9b95;">Business</td><td style="padding:9px 0;">${safe.businessName}</td></tr>
                </table>
                <div style="margin-top:26px;padding-top:24px;border-top:1px solid #373737;">
                  <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#9d9b95;margin-bottom:12px;">What they need</div>
                  <div style="font-size:15px;line-height:1.65;color:#f3f1eb;">${safe.details}</div>
                </div>
              </div>
              <div style="padding:18px 28px;border-top:1px solid #373737;color:#777;font-size:11px;">Submitted through otrservicesie.com</div>
            </div>
          </div>
        `,
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend project request failed", resendResponse.status, resendError.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: "We couldn't send your request right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request right now. Please try again." },
      { status: 500 }
    );
  }
}
