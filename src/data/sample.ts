/**
 * Content layer data: real studio proof and offers from the Dee7 strategy doc.
 * Projects and offers are real; blog posts are placeholder until Sanity is wired.
 */
import type { Project, Post, Offer } from "../lib/types";

export const offers: Offer[] = [
  {
    slug: "landing-page-sprint",
    name: "Landing Page Sprint",
    problem: "Launching something new?",
    forWho:
      "SaaS demos, product launches, course launches, campaigns and clinic bookings. One audience, one action.",
    timeline: "2–3 weeks",
    fromPrice: "From $5,000",
    description:
      "One page built around one audience and one action. We research your buyers, write the copy, design and build the page, connect your form or booking flow, and launch with tracking in place.",
    deliverables: [
      "Audience research and messaging",
      "Conversion copywriting",
      "Custom design, no templates",
      "Webflow or Astro build",
      "Form or booking connection",
      "Analytics and launch checks",
      "Two feedback rounds included",
    ],
    steps: [
      {
        title: "Research",
        text: "We dig into your audience, your offer and the pages your buyers see before yours.",
      },
      {
        title: "Message",
        text: "Copy first, design second. The page is written around the one action you need visitors to take.",
      },
      {
        title: "Design & build",
        text: "Custom design on a strict system, built fast and mobile-first.",
      },
      {
        title: "Launch",
        text: "Tracking, forms and launch checks. Live in two to three weeks.",
      },
    ],
    faq: [
      {
        q: "What if I need copy help?",
        a: "Copywriting is included. You bring the product knowledge; we turn it into a page that sells.",
      },
      {
        q: "Webflow or Astro?",
        a: "Whichever fits your team. Webflow when marketers need to edit freely; Astro when speed and code ownership matter most.",
      },
      {
        q: "What does the final price depend on?",
        a: "Scope: research depth, integrations and animation complexity. You get a fixed quote after a short call, with no surprises mid-project.",
      },
    ],
    cta: "Start Your Sprint",
    featured: true,
  },
  {
    slug: "website-project",
    name: "Website Project",
    problem: "Website underselling your product?",
    forWho:
      "B2B software companies and growing businesses that need a full launch or redesign. Up to eight pages, done properly.",
    timeline: "5–8 weeks",
    fromPrice: "From $15,000",
    description:
      "A complete website: planning, copy, design, build, CMS and training. We start with your business. Who are your customers, what do they need to understand, and what should they do next?",
    deliverables: [
      "Up to eight core pages",
      "Planning and page structure",
      "Conversion copywriting",
      "Custom design system you own",
      "Webflow build with CMS collection",
      "Basic SEO and tracking setup",
      "Team training",
      "30 days of bug support",
    ],
    steps: [
      {
        title: "Plan",
        text: "A workshop on your customers, your offer and your pages. Structure before pixels.",
      },
      {
        title: "Message",
        text: "Sitemap and copy built around what buyers need to understand to act.",
      },
      {
        title: "Design",
        text: "A design system plus every page, reviewed with you section by section.",
      },
      {
        title: "Build & hand over",
        text: "Webflow build, CMS, SEO basics, tracking, and training so your team can update content without us.",
      },
    ],
    faq: [
      {
        q: "What if our scope is unclear?",
        a: "Start with a Website Roadmap instead: a short paid discovery that gives you page structure, priorities and a build estimate. It's useful with any team, including ours.",
      },
      {
        q: "Can you migrate our existing content?",
        a: "Yes. Migrations are priced by content volume and redirects, quoted up front.",
      },
      {
        q: "What does the final price depend on?",
        a: "Page count, content readiness and integrations. You get a fixed quote and payment milestones after a scoping call.",
      },
    ],
    cta: "Plan Your Project",
  },
  {
    slug: "monthly-partner",
    name: "Monthly Partner",
    problem: "Need a design team on tap?",
    forWho:
      "Agencies that need white-label web capacity, and companies with regular website work, without hiring in-house.",
    timeline: "Monthly, from 20 reserved hours",
    fromPrice: "From $3,000/mo",
    description:
      "Reserved design and Webflow capacity every month. One active task at a time, weekly updates, and work that can run under your brand if you're an agency.",
    deliverables: [
      "Reserved design & Webflow hours",
      "One active task at a time",
      "Weekly progress updates",
      "Landing pages, site updates, new sections",
      "White-label option for agencies",
      "Pause or stop with notice",
    ],
    steps: [
      {
        title: "Set priorities",
        text: "We agree what matters this month and keep a shared queue.",
      },
      {
        title: "Ship weekly",
        text: "One task at a time, updated every week. No black box.",
      },
      {
        title: "Review & adjust",
        text: "A short monthly review: what shipped, what's next, what to change.",
      },
    ],
    faq: [
      {
        q: "Who is this for?",
        a: "Agencies that resell web work, and businesses whose site needs steady attention: new pages, campaigns, improvements.",
      },
      {
        q: "What if we need more capacity?",
        a: "Hours scale up in agreed steps. We'd rather you start small and grow than overcommit on day one.",
      },
      {
        q: "Is it really white-label?",
        a: "Yes. For agencies, the work runs under your brand, your tools and your client relationships.",
      },
    ],
    cta: "Reserve Capacity",
  },
  {
    slug: "website-roadmap",
    name: "Website Roadmap",
    problem: "Not sure where to start?",
    forWho:
      "Larger or unclear projects, when you need a plan and an honest estimate before committing to a build.",
    timeline: "3–5 business days",
    fromPrice: "From $750",
    description:
      "A short, paid discovery. One workshop, a review of your current website, a proposed page structure, priorities, and a build estimate you can use with any team, including ours.",
    deliverables: [
      "One working session",
      "Current website review",
      "Proposed page structure",
      "Priorities and quick wins",
      "Build estimate and timeline",
    ],
    steps: [
      {
        title: "Workshop",
        text: "One session on your business, customers and goals.",
      },
      {
        title: "Review",
        text: "We audit your current site against what your buyers need.",
      },
      {
        title: "Roadmap",
        text: "Structure, priorities and an estimate, yours to use anywhere.",
      },
    ],
    faq: [
      {
        q: "Do I have to build with you afterwards?",
        a: "No. The roadmap is designed to be useful with any team. If we're a fit, the roadmap fee counts toward the project.",
      },
    ],
    cta: "Get Your Roadmap",
  },
];

export const projects: Project[] = [
  {
    slug: "lobelia-earth",
    title: "Lobelia Earth",
    client: "Lobelia Earth",
    industry: "Climate & Earth Data",
    services: ["Web Design", "Webflow Development"],
    highlight: "Award winner",
    summary:
      "Award-winning website for a climate and Earth-data company. Complex scientific services made clear and navigable.",
    url: "https://www.lobelia.earth",
    featured: true,
  },
  {
    slug: "touchcast",
    title: "Touchcast",
    client: "Touchcast",
    industry: "SaaS / AI",
    services: ["Web Design", "Webflow Development"],
    highlight: "Award-winning SaaS",
    summary:
      "Award-winning SaaS website for an AI events platform. Enterprise polish with a complex product story.",
    url: "https://touchcast.io",
    featured: true,
  },
  {
    slug: "mind-ninja",
    title: "Mind Ninja",
    client: "Mind Ninja",
    industry: "E-commerce",
    services: ["E-commerce Design", "Webflow Development"],
    highlight: "E-commerce",
    summary:
      "Full e-commerce build in Webflow for a UK brand: catalogue, checkout and content designed to sell.",
    url: "https://www.mind-ninja.co.uk",
    featured: true,
  },
  {
    slug: "emew",
    title: "Emew",
    client: "Emew",
    industry: "Cleantech / Industrial",
    services: ["Web Design", "Localization"],
    highlight: "4 languages",
    summary:
      "Industrial cleantech website localized in four languages. Technical depth without the clutter.",
    url: "https://emew.com",
  },
  {
    slug: "ai-institute",
    title: "AI Institute",
    client: "AI Institute",
    industry: "B2B Training",
    services: ["Web Design", "Webflow Development"],
    highlight: "B2B AI training",
    summary:
      "B2B website for an AI training provider, positioning a new category offer for enterprise buyers.",
    url: "https://www.aitraining.institute",
  },
  {
    slug: "dynamis",
    title: "Dynamis",
    client: "Dynamis",
    industry: "Consumer / Games",
    services: ["Web Design", "Localization"],
    highlight: "3 languages",
    summary:
      "Playful, simple website for a board game, shipped in three languages on a lean scope.",
    url: "https://www.playdynamis.com",
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
      "We audited 50 B2B SaaS landing pages over the past year: HealthTech, EdTech, and Fintech companies spending $10k to $200k a month on paid traffic. The same seven problems appeared on 40 of them.",
      "Fix number one: your headline describes your product, not your visitor's outcome. 'AI-powered patient engagement platform' tells a clinician nothing. '30% fewer no-shows in 60 days' starts a conversation.",
      "Fix number two: your primary CTA appears once, at the bottom. High-performing pages repeat one CTA four to six times: after the hero, after proof, after pricing, and at the end. Same words every time.",
      "The remaining five fixes (social proof placement, mobile form friction, speed, message match with ads, and the one-page-one-goal rule) follow the same logic: remove every reason to hesitate.",
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
      "Your pricing page is where deals are won or silently lost. Most B2B pricing pages fail at the same three moments: anchoring, comparison, and the next step.",
    category: "Conversion",
    date: "2026-09-02",
    readingTime: "7 min read",
    body: [
      "A buyer who reaches your pricing page is closer to a deal than anyone else on your site. Yet most pricing pages get less design attention than the blog.",
      "Mistake one: no anchor. Three tiers with no visual hierarchy forces the buyer to do the comparison work themselves. Mark the recommended plan with a border, a badge and one accent, and conversion on that tier typically rises 15–30%.",
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
