/**
 * Sample content — placeholder until Sanity is connected.
 * Shapes mirror the Sanity schema so swapping is a one-line change in content.ts.
 */
import type { Project, Post, Offer } from "../lib/types";

export const offers: Offer[] = [
  {
    name: "Landing Page Design",
    price: "$4,997",
    delivery: "5–7 day delivery",
    description:
      "One conversion-focused landing page, built to turn paid traffic into booked demos.",
    includes: [
      "Conversion copywriting included",
      "Custom design, no templates",
      "Built in Astro or Webflow",
      "Mobile-first and fast by default",
      "2 revision rounds",
    ],
    cta: "Start Your Page",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Web Design",
    price: "$19,997",
    delivery: "4–6 week delivery",
    description:
      "A full site redesign that positions you as the obvious choice in your category.",
    includes: [
      "Up to 10 core pages",
      "Messaging and positioning workshop",
      "Design system you own",
      "CMS setup for your team",
      "30 days of post-launch support",
    ],
    cta: "Plan Your Redesign",
  },
  {
    name: "In-House Design Studio",
    price: "$4,997",
    cadence: "/mo",
    delivery: "Ongoing partnership",
    description:
      "Your own senior design team on subscription. Unlimited requests, one at a time.",
    includes: [
      "Unlimited design requests",
      "48-hour average turnaround",
      "Landing pages, product UI, brand assets",
      "Pause or cancel anytime",
      "Slack access to your designer",
    ],
    cta: "Hire Your Studio",
    badge: "Top Value",
  },
];

export const projects: Project[] = [
  {
    slug: "calmora-health",
    title: "38% more demo bookings for a telehealth platform",
    client: "Calmora Health",
    industry: "HealthTech",
    services: ["Landing Page Design", "Conversion Copy"],
    metric: "+38%",
    metricLabel: "demo bookings in 21 days",
    summary:
      "Calmora's paid traffic converted at 1.1%. We rebuilt their landing page around the one question clinicians actually ask — and bookings jumped 38% in three weeks.",
    challenge:
      "Calmora was spending $40k/month on ads sending clinicians to a homepage built for investors. Visitors couldn't tell within 10 seconds what the product did or why it was safe to trust with patient data.",
    approach:
      "We interviewed 6 of their closed-won customers, pulled the exact phrases they used to describe the product, and rebuilt the page around clinical workflow outcomes. Compliance badges and security proof moved above the fold. One CTA, repeated five times.",
    results: [
      { value: "+38%", label: "demo bookings" },
      { value: "2.9%", label: "conversion rate, up from 1.1%" },
      { value: "21 days", label: "from kickoff to lift" },
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: "ledgerpay",
    title: "2.4× sign-up conversion for a B2B payments API",
    client: "LedgerPay",
    industry: "Fintech",
    services: ["Web Design", "Design System"],
    metric: "2.4×",
    metricLabel: "sign-up conversion",
    summary:
      "LedgerPay's site read like API documentation. We redesigned it to sell outcomes to finance leaders first and engineers second — sign-ups more than doubled.",
    challenge:
      "The old site led with endpoint lists and rate limits. Developers loved it; the CFOs approving the contract bounced. Sales called the website 'the thing we apologize for on demos.'",
    approach:
      "We split the narrative: an outcome-led story for buyers, a dedicated docs-style path for engineers. New pricing page with an interactive fee calculator. A design system in Figma and code so their team ships consistent pages without us.",
    results: [
      { value: "2.4×", label: "sign-up conversion" },
      { value: "−31%", label: "bounce rate on pricing" },
      { value: "9", label: "pages shipped by their team since" },
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: "studyloop",
    title: "41% lower cost per lead for an EdTech scale-up",
    client: "StudyLoop",
    industry: "EdTech",
    services: ["Landing Page Design", "CRO Program"],
    metric: "−41%",
    metricLabel: "cost per qualified lead",
    summary:
      "Six landing page variants in eight weeks. The winner cut StudyLoop's cost per qualified lead by 41% — and became the template for every campaign since.",
    challenge:
      "StudyLoop's growth team was testing ad creative weekly but sending everything to one generic page. CPL had climbed 60% in two quarters and the board was asking questions.",
    approach:
      "We built a modular landing page system — one layout, swappable proof blocks per audience. District admins saw compliance and rollout stories; teachers saw time saved. Every variant shipped in under a week.",
    results: [
      { value: "−41%", label: "cost per qualified lead" },
      { value: "6", label: "variants tested in 8 weeks" },
      { value: "+19%", label: "demo show-up rate" },
    ],
    year: 2025,
    featured: true,
  },
  {
    slug: "nordvital",
    title: "$860k in pipeline from a patient portal redesign",
    client: "NordVital",
    industry: "HealthTech",
    services: ["Web Design", "UX Audit"],
    metric: "$860k",
    metricLabel: "pipeline in 90 days",
    summary:
      "NordVital's enterprise deals stalled at the demo stage — the product looked dated next to competitors. A focused redesign of their portal and site generated $860k in new pipeline in one quarter.",
    challenge:
      "Prospects compared NordVital side-by-side with newer competitors and the visual gap was costing deals. The product worked; it just didn't look like it belonged in the shortlist.",
    approach:
      "A two-week UX audit found 23 friction points. We redesigned the five screens that appear in every sales demo, then rebuilt the marketing site to match. Sales got a before/after deck for open opportunities.",
    results: [
      { value: "$860k", label: "new pipeline in 90 days" },
      { value: "23", label: "friction points resolved" },
      { value: "4 wks", label: "audit to launch" },
    ],
    year: 2025,
  },
];

export const posts: Post[] = [
  {
    slug: "why-your-saas-landing-page-isnt-converting",
    title: "Why your SaaS landing page isn't converting (and the 7 fixes that work)",
    excerpt:
      "We audited 50 B2B landing pages this year. The same seven problems showed up in 80% of them. Here's each one, with the fix and the expected lift.",
    category: "Conversion",
    date: "2026-10-21",
    readingTime: "8 min read",
    featured: true,
    body: [
      "Most landing pages don't fail because of bad design. They fail because the visitor can't answer three questions in the first ten seconds: What is this? Is it for me? What do I do next?",
      "We audited 50 B2B SaaS landing pages over the past year — HealthTech, EdTech, and Fintech companies spending $10k to $200k a month on paid traffic. The same seven problems appeared on 40 of them.",
      "Fix number one: your headline describes your product, not your visitor's outcome. 'AI-powered patient engagement platform' tells a clinician nothing. '30% fewer no-shows in 60 days' starts a conversation.",
      "Fix number two: your primary CTA appears once, at the bottom. High-performing pages repeat one CTA four to six times — after the hero, after proof, after pricing, and at the end. Same words every time.",
      "The remaining five fixes — social proof placement, mobile form friction, speed, message match with ads, and the one-page-one-goal rule — follow the same logic: remove every reason to hesitate.",
    ],
  },
  {
    slug: "the-30-second-scan-test",
    title: "The 30-second scan test: how buyers actually read your homepage",
    excerpt:
      "Nobody reads your homepage. They scan it in an F-pattern, make a gut call in half a minute, and leave or click. Design for the scan, not the read.",
    category: "UX",
    date: "2026-09-30",
    readingTime: "6 min read",
    body: [
      "Give a stranger your homepage for 30 seconds, then take it away. Ask them: what does this company do, who is it for, and what were you supposed to click? If they can't answer all three, the page is costing you money.",
      "Eye-tracking studies have shown the same thing for two decades: visitors scan in an F-pattern. Headline, first line of the intro, then down the left edge hitting subheadings. Everything outside that path is decoration.",
      "Practical consequence: your headline, your first subheading, and your section labels carry the entire message. Write those four or five lines first, as one connected argument. The paragraphs underneath are supporting evidence for the few who commit.",
    ],
  },
  {
    slug: "pricing-pages-that-close",
    title: "Pricing pages that close: what 50 Fintech sites get wrong",
    excerpt:
      "Your pricing page is where deals are won or silently lost. Most B2B pricing pages fail at the same three moments — anchoring, comparison, and the next step.",
    category: "Conversion",
    date: "2026-09-02",
    readingTime: "7 min read",
    body: [
      "A buyer who reaches your pricing page is closer to a deal than anyone else on your site. Yet most pricing pages get less design attention than the blog.",
      "Mistake one: no anchor. Three tiers with no visual hierarchy forces the buyer to do the comparison work themselves. Mark the recommended plan — border, badge, one accent — and conversion on that tier typically rises 15–30%.",
      "Mistake two: feature lists instead of outcomes. 'Unlimited API calls' is a spec. 'Handle Black Friday volume without an upgrade call' is a reason to buy.",
      "Mistake three: a dead end. The page answers the price question and then just... stops. Every pricing page needs an explicit next step for the undecided: a calculator, an FAQ, or a 'talk to us' path with a named human.",
    ],
  },
  {
    slug: "design-systems-for-small-teams",
    title: "Design systems for small teams: ship faster without a full-time designer",
    excerpt:
      "You don't need a 200-component library. You need 12 components, clear rules, and the discipline to say no. Here's the minimum system that keeps quality high.",
    category: "Design",
    date: "2026-08-12",
    readingTime: "5 min read",
    body: [
      "Every small team hits the same wall: page three looks nothing like page one, every new section is a fresh negotiation, and shipping anything takes a designer's sign-off.",
      "The fix is not a massive component library. It's a small set of hard rules: one type scale, one spacing grid, three button styles, two card styles. Twelve components cover 90% of marketing pages.",
      "The real value is what the system forbids. No new colors without a reason. No spacing values off the grid. Constraints are what make a junior marketer's page look like a senior designer built it.",
    ],
  },
];
