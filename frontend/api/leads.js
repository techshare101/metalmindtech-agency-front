// Vercel Serverless Function — POST /api/leads
// Path: /app/frontend/api/leads.js  ->  https://<project>.vercel.app/api/leads
//
// Replaces the FastAPI /api/leads endpoint when deployed to Vercel.
// Sends a luxury-formatted notification email via Resend and returns the same
// JSON shape the React frontend expects (matches backend Lead model in
// /app/backend/server.py), so no frontend changes are required.
//
// Required environment variables (set in Vercel → Project → Settings → Env):
//   RESEND_API_KEY     (e.g. re_xxxx — from https://resend.com/api-keys)
//   LEAD_NOTIFY_FROM   (e.g. "MetalMindTech Agency <leads@metalmindtech.com>"
//                      — must be a verified domain in Resend)
//   LEAD_NOTIFY_TO     (one or comma-separated recipients, e.g. "kodjo@metalmindtech.com")
// Optional:
//   LEAD_NOTIFY_BCC    (comma-separated)

const { Resend } = require("resend");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s) {
    if (s == null) return "";
    return String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
}

function newId() {
    try {
        if (
            typeof globalThis.crypto !== "undefined" &&
            globalThis.crypto.randomUUID
        ) {
            return globalThis.crypto.randomUUID();
        }
    } catch (_) {
        /* fallthrough */
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function splitList(v) {
    if (!v) return [];
    return String(v)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

module.exports = async function handler(req, res) {
    // Same-origin in production, but keep CORS permissive for safety.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    if (req.method !== "POST") {
        res.status(405).json({ detail: "Method not allowed" });
        return;
    }

    const { RESEND_API_KEY, LEAD_NOTIFY_FROM, LEAD_NOTIFY_TO, LEAD_NOTIFY_BCC } =
        process.env;

    if (!RESEND_API_KEY || !LEAD_NOTIFY_FROM || !LEAD_NOTIFY_TO) {
        console.error("[leads] Missing Resend env vars", {
            hasKey: !!RESEND_API_KEY,
            hasFrom: !!LEAD_NOTIFY_FROM,
            hasTo: !!LEAD_NOTIFY_TO,
        });
        res.status(500).json({
            detail:
                "Lead notification is not configured on the server. Please email contact@metalmindtech.com directly.",
        });
        return;
    }

    // Vercel parses JSON bodies automatically when content-type is application/json
    const body = req.body || {};
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const company = (body.company || "").toString().trim();
    const role = (body.role || "").toString().trim();
    const annual_revenue = (body.annual_revenue || "").toString().trim();
    const notes = (body.notes || "").toString().trim();
    const source = (body.source || "audit").toString().trim().toLowerCase();

    if (!name || !email || !company) {
        res.status(400).json({
            detail: "name, email, and company are required.",
        });
        return;
    }
    if (!EMAIL_RE.test(email)) {
        res.status(400).json({ detail: "Please provide a valid email." });
        return;
    }
    if (name.length > 200 || company.length > 200 || notes.length > 4000) {
        res.status(400).json({ detail: "One or more fields exceed length limits." });
        return;
    }

    const id = newId();
    const created_at = new Date().toISOString();
    const subject = `New ${source.toUpperCase()} request — ${company} (${name})`;

    const html = `<!doctype html>
<html><body style="margin:0;background:#0A0A0A">
  <div style="font-family:'IBM Plex Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0A0A0A;color:#ffffff;padding:32px;max-width:640px;margin:0 auto">
    <div style="font-family:'IBM Plex Mono',ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.22em;color:#CC5500;text-transform:uppercase;margin-bottom:18px">
      / MetalMindTech &middot; New Engagement Request
    </div>
    <h1 style="font-family:'Cabinet Grotesk',sans-serif;font-size:26px;line-height:1.15;margin:0 0 8px;font-weight:800;letter-spacing:-.02em;color:#ffffff">
      ${escapeHtml(name)} &mdash; ${escapeHtml(company)}
    </h1>
    <div style="height:1px;background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);margin:24px 0"></div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#fff">
      <tbody>
        <tr><td style="padding:10px 0;color:#888;width:170px;text-transform:uppercase;font-size:11px;letter-spacing:.2em;font-family:monospace">Source</td><td style="padding:10px 0">${escapeHtml(source)}</td></tr>
        <tr><td style="padding:10px 0;color:#888;text-transform:uppercase;font-size:11px;letter-spacing:.2em;font-family:monospace">Email</td><td style="padding:10px 0"><a style="color:#E6843A;text-decoration:none" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:10px 0;color:#888;text-transform:uppercase;font-size:11px;letter-spacing:.2em;font-family:monospace">Role</td><td style="padding:10px 0">${escapeHtml(role || "—")}</td></tr>
        <tr><td style="padding:10px 0;color:#888;text-transform:uppercase;font-size:11px;letter-spacing:.2em;font-family:monospace">Revenue band</td><td style="padding:10px 0">${escapeHtml(annual_revenue || "—")}</td></tr>
      </tbody>
    </table>
    <div style="height:1px;background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);margin:24px 0"></div>
    <div style="color:#888;text-transform:uppercase;font-size:11px;letter-spacing:.2em;font-family:monospace;margin-bottom:10px">
      Outcome they want to extract
    </div>
    <div style="background:#121212;border:1px solid rgba(255,255,255,.1);padding:18px;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#E6E6E6">
      ${escapeHtml(notes || "(no notes provided)")}
    </div>
    <div style="margin-top:36px;font-family:monospace;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.22em">
      Lead ID &middot; ${escapeHtml(id)} &middot; ${escapeHtml(created_at)}
    </div>
  </div>
</body></html>`;

    const text = [
        "New MetalMindTech engagement request",
        "",
        `Name:           ${name}`,
        `Company:        ${company}`,
        `Email:          ${email}`,
        `Role:           ${role || "—"}`,
        `Revenue band:   ${annual_revenue || "—"}`,
        `Source:         ${source}`,
        "",
        "Notes:",
        notes || "—",
        "",
        `Lead ID:    ${id}`,
        `Submitted:  ${created_at}`,
    ].join("\n");

    const resend = new Resend(RESEND_API_KEY);
    const sendOpts = {
        from: LEAD_NOTIFY_FROM,
        to: splitList(LEAD_NOTIFY_TO),
        replyTo: email,
        subject,
        html,
        text,
    };
    const bcc = splitList(LEAD_NOTIFY_BCC);
    if (bcc.length) sendOpts.bcc = bcc;

    try {
        const { data, error } = await resend.emails.send(sendOpts);
        if (error) {
            console.error("[leads] Resend error:", error);
            res.status(502).json({
                detail:
                    error.message ||
                    "Failed to send notification. Please email contact@metalmindtech.com.",
            });
            return;
        }
        console.log("[leads] sent", { id, email, company, source, resendId: data?.id });
    } catch (err) {
        console.error("[leads] unexpected error:", err);
        res.status(500).json({ detail: "Server error. Please try again." });
        return;
    }

    // Match the FastAPI Lead response shape exactly.
    res.status(200).json({
        id,
        name,
        email,
        company,
        role: role || null,
        annual_revenue: annual_revenue || null,
        notes: notes || null,
        source,
        created_at,
    });
};
