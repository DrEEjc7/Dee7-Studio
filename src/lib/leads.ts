/**
 * Email alert for each new lead, sent through Resend.
 *
 * The API key is a secret (RESEND_API_KEY). Until the dee7studio.com domain is
 * verified in Resend, the sandbox sender below can only email the address the
 * Resend account was created with, which is exactly the inbox we notify.
 * Without the key the alert is skipped and the lead is still stored.
 */
export const NOTIFY = {
  apiUrl: "https://api.resend.com/emails",
  to: "dee7.office@gmail.com",
  from: "Dee7 Studio Leads <onboarding@resend.dev>",
} as const;

/**
 * Where contact-form leads are stored: the "Dee7 Studio Leads" table in the
 * Zite workspace "Contact Form" (Fillout's database product).
 *
 * The API key is a secret (ZITE_API_KEY): `.dev.vars` locally,
 * `wrangler secret put ZITE_API_KEY` in production. Never commit it.
 */
export const LEADS = {
  apiBase: "https://tables.zite.com/api/v1",
  baseId: "90ba0d2a49271bd0",
  tableId: "taJKHgVxoXK",
  /** Our form field -> column name in the table */
  columns: {
    name: "Name",
    email: "Email",
    website: "Website",
    service: "What Do You Need",
    timing: "Timing",
    budget: "Budget",
    message: "Goal",
    intent: "Intent",
    page: "Source Page",
  } as Record<string, string>,
} as const;
