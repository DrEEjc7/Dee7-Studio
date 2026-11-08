import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { LEADS, NOTIFY } from "../../lib/leads";

// On-demand endpoint: everything else on the site stays static.
export const prerender = false;

type Secrets = { ZITE_API_KEY?: string; RESEND_API_KEY?: string };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** One line only, so visitor input can never add headers to the email. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type Lead = Record<string, string>;

/** Saves the lead to the Zite table. Throws on any failure. */
async function storeLead(lead: Lead, apiKey: string) {
  const record: Record<string, string> = {};
  for (const [field, column] of Object.entries(LEADS.columns)) record[column] = lead[field] ?? "";

  const response = await fetch(
    `${LEADS.apiBase}/bases/${LEADS.baseId}/tables/${LEADS.tableId}/records`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ record }),
      signal: AbortSignal.timeout(8000),
    }
  );
  if (!response.ok) throw new Error(`zite_${response.status}`);
}

/** Emails the lead to the studio inbox. Replying goes straight to the visitor. */
async function notifyLead(lead: Lead, apiKey: string) {
  const details = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.website && `Website: ${lead.website}`,
    `Need: ${lead.service || "(not chosen)"}`,
    lead.timing && `Timing: ${lead.timing}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.intent && `Form: ${lead.intent}`,
    lead.page && `Page: ${lead.page}`,
  ].filter(Boolean);
  const text = [
    ...details,
    "",
    "Goal:",
    lead.message || "(not filled in)",
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

  const response = await fetch(NOTIFY.apiUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: NOTIFY.from,
      to: [NOTIFY.to],
      reply_to: lead.email,
      subject: oneLine(`New lead: ${lead.name} (${lead.service || "no service chosen"})`).slice(0, 200),
      text,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`resend_${response.status}`);
}

/**
 * Receives the contact form, saves it to the Zite leads table and emails an
 * alert. The lead counts as received if either of the two worked. Only when
 * both fail does the page fall back to the pre-filled email draft, so a lead
 * is never lost to a backend problem.
 */
export const POST: APIRoute = async ({ request }) => {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (clean(input.company, 200)) return json({ ok: true });

  const lead: Lead = {
    name: clean(input.name, 200),
    email: clean(input.email, 320),
    website: clean(input.website, 500),
    service: clean(input.service, 100),
    timing: clean(input.timing, 100),
    budget: clean(input.budget, 100),
    message: clean(input.message, 5000),
    intent: clean(input.intent, 40),
    page: clean(input.page, 200),
  };

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return json({ ok: false, error: "invalid" }, 422);
  }

  const secrets = env as Secrets;
  const jobs: { name: string; run: Promise<void> }[] = [];
  if (secrets.ZITE_API_KEY) jobs.push({ name: "store", run: storeLead(lead, secrets.ZITE_API_KEY) });
  if (secrets.RESEND_API_KEY) jobs.push({ name: "notify", run: notifyLead(lead, secrets.RESEND_API_KEY) });
  if (jobs.length === 0) return json({ ok: false, error: "not_configured" }, 503);

  const results = await Promise.allSettled(jobs.map((job) => job.run));
  let delivered = false;
  results.forEach((result, i) => {
    if (result.status === "fulfilled") delivered = true;
    else console.error(`lead_${jobs[i].name}_failed`, String(result.reason));
  });

  return delivered ? json({ ok: true }) : json({ ok: false, error: "upstream" }, 502);
};
