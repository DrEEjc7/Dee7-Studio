/**
 * Content layer data: real studio proof and offers from the Dee7 strategy doc.
 * Projects and offers are real. Blog posts live only in Sanity.
 */
import type { Project, Offer } from "../lib/types";

export const offers: Offer[] = [
  {
    slug: "landing-page-sprint",
    name: "Landing Page Sprint",
    problem: "Launching something new?",
    forWho:
      "SaaS demos, product launches, course launches, campaigns and clinic bookings. One audience, one action.",
    timeline: "3–7 days",
    fromPrice: "From $5,000",
    description:
      "One page built around one audience and one action, live in days instead of the weeks or months a typical agency takes. We research your buyers, write the copy, design and build the page, connect your form or booking flow, and launch with tracking in place.",
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
        text: "Tracking, forms and launch checks. Live in three to seven days.",
      },
    ],
    faq: [
      {
        q: "How can it be this fast?",
        a: "One page, one audience, one action: a scope tight enough to run as a true sprint. We clear the calendar, work in daily iterations, and skip the agency overhead that stretches a single page into a multi-week project.",
      },
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
    timeline: "4–6 weeks",
    fromPrice: "From $15,000",
    description:
      "A complete website: planning, copy, design, build, CMS and training. We start with your business. Who are your customers, what do they need to understand, and what should they do next?",
    deliverables: [
      "Up to eight core pages",
      "Planning and page structure",
      "Conversion copywriting",
      "Custom design system you own",
      "Webflow or Astro build with CMS",
      "Two feedback rounds per stage",
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
        text: "A design system plus every page, reviewed with you section by section, with two feedback rounds at every stage.",
      },
      {
        title: "Build & hand over",
        text: "Webflow or Astro build, CMS, SEO basics, tracking, and training so your team can update content without us.",
      },
    ],
    faq: [
      {
        q: "Webflow or Astro?",
        a: "Whichever fits your team. Webflow when marketers need to edit freely; Astro when speed and code ownership matter most. We recommend one on the scoping call.",
      },
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
    timeline: "Monthly, pause anytime",
    fromPrice: "$2,995/mo",
    description:
      "A flat-rate design and development subscription. Add as many requests as you like to your queue; we work through them one at a time, with most deliverables back in 24 to 48 hours. Pause or cancel anytime.",
    deliverables: [
      "Unlimited requests, one active at a time",
      "Most deliverables in 24–48 hours",
      "Unlimited revisions",
      "Landing pages, site updates, new sections",
      "White-label option for agencies",
      "Pause or cancel anytime",
    ],
    steps: [
      {
        title: "Request",
        text: "Add requests to your queue: pages, sections, fixes, whole flows. As many as you like.",
      },
      {
        title: "Receive",
        text: "We work one request at a time. Most deliverables land within 24 to 48 hours.",
      },
      {
        title: "Revise",
        text: "Not happy? We revise until you are, then move to the next request in the queue.",
      },
    ],
    faq: [
      {
        q: "Who is this for?",
        a: "Agencies that resell web work, and businesses whose site needs steady attention: new pages, campaigns, improvements.",
      },
      {
        q: "How fast will I really get work back?",
        a: "Most requests come back within 24 to 48 hours. Bigger pieces, like a full landing page, are split into milestones so you still see progress every day or two.",
      },
      {
        q: "Is it really white-label?",
        a: "Yes. For agencies, the work runs under your brand, your tools and your client relationships.",
      },
      {
        q: "What does pausing mean?",
        a: "Billing cycles are 30 days of active service. If work slows down, pause the subscription and the remaining days wait for you. Cancel whenever you want.",
      },
    ],
    cta: "Reserve Capacity",
  },
  {
    slug: "ai-automation",
    name: "AI Automation & Agentic Workflows",
    problem: "Drowning in manual work?",
    forWho:
      "Founders and teams losing hours to repetitive work: lead handling, content operations, reporting, support triage. We build automations and AI agents that run it for you.",
    timeline: "2–4 weeks",
    fromPrice: "From $4,000",
    description:
      "Custom AI automations and agentic workflows wired into the tools you already use. We map your processes, find what can run without you, and ship agents that handle it reliably, with a human in the loop where it matters.",
    deliverables: [
      "Process audit and automation map",
      "Custom AI agents and workflows",
      "Integrations with your CRM, email, Slack and docs",
      "Human-in-the-loop checkpoints where it matters",
      "Documentation and team handover",
      "30 days of monitoring and tuning",
    ],
    steps: [
      {
        title: "Map",
        text: "We audit how work moves through your team and find what can run without you.",
      },
      {
        title: "Design",
        text: "Triggers, agents, tools, and the checkpoints where a human stays in control.",
      },
      {
        title: "Build",
        text: "We build the workflow and test it against real cases from your business.",
      },
      {
        title: "Ship & tune",
        text: "We launch it, watch it run, and tune it for 30 days.",
      },
    ],
    faq: [
      {
        q: "What can you actually automate?",
        a: "Lead qualification and follow-up, content pipelines, reporting, data entry between tools, support triage, internal operations. If it's repetitive and you can describe the rules, it's a candidate.",
      },
      {
        q: "Which tools do you build on?",
        a: "Whatever fits your stack: Claude and other LLM APIs, n8n or Make for orchestration, and direct integrations with your CRM, email and docs. You own everything we build.",
      },
      {
        q: "What does the final price depend on?",
        a: "The number of workflows, the integrations involved, and how much reliability tooling the process needs. You get a fixed quote after a short call.",
      },
    ],
    cta: "Automate Your Ops",
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
    slug: "aws-partner-security",
    title: "AWS Partner Security",
    client: "Amazon Web Services",
    industry: "Enterprise / Cybersecurity",
    services: ["Landing Page System", "UX Design", "UI Design"],
    highlight: "10-page system",
    summary:
      "Complete landing page design system for the AWS Partner Security Initiative: ten responsive pages plus mobile designs for enterprise cybersecurity.",
    image: "/work/aws.avif",
    featured: true,
  },
  {
    slug: "creator-clip",
    title: "Creator Clip",
    client: "Creator Clip",
    industry: "Creator Economy",
    services: ["Branding", "Web Design", "Webflow Development"],
    highlight: "Brand to build",
    summary:
      "Branding, UX/UI, web design, Webflow development and SEO, delivered as one seamless package for a dynamic creator platform.",
    url: "https://creatorclip.webflow.io",
    image: "/work/creator-clip.avif",
    featured: true,
  },
  {
    slug: "blended",
    title: "Blended",
    client: "Blended",
    industry: "EdTech / AI",
    services: ["UX Design", "Web Design", "Webflow Development"],
    highlight: "AI-native school",
    summary:
      "Digital experience for an AI-powered school operating system: advanced UX/UI, web design and Webflow development built for clarity.",
    url: "https://www.get-blended.com",
    image: "/work/blended.avif",
    featured: true,
  },
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
    image: "/work/lobelia-earth.jpg",
  },
  {
    slug: "im360",
    title: "IM360",
    client: "IM360",
    industry: "SaaS / Analytics",
    services: ["UX Design", "UI Design", "Landing Page Design"],
    highlight: "SaaS analytics",
    summary:
      "Complete website design for a customer analytics platform: modern SaaS interface and conversion-focused landing pages.",
    image: "/work/im360.avif",
  },
  {
    slug: "fiverr-dashboard",
    title: "Fiverr",
    client: "Fiverr",
    industry: "Marketplace / SaaS",
    services: ["Dashboard Design", "UX Design", "UI Design"],
    highlight: "Analytics dashboard",
    summary:
      "Custom analytics dashboard design for Fiverr's internal team: clean data visualization and actionable insights for creators.",
    image: "/work/fiverr.avif",
  },
  {
    slug: "weno-travel",
    title: "Weno",
    client: "Weno",
    industry: "Travel / Consumer App",
    services: ["Landing Page Design", "App Design", "Prototyping"],
    highlight: "Web + mobile",
    summary:
      "Complete design system for an AI-powered group travel app: landing page, mobile UI/UX and user journey optimization.",
    image: "/work/weno.avif",
  },
  {
    slug: "signos",
    title: "Signos",
    client: "Signos",
    industry: "HealthTech",
    services: ["Landing Page Design", "Webflow Development"],
    highlight: "Health data, simplified",
    summary:
      "Landing page design and Webflow build for a glucose monitoring app. Complex health data made simple, built to convert.",
    image: "/work/signos.avif",
  },
  {
    slug: "dropservicing",
    title: "Dropservicing",
    client: "Dropservicing",
    industry: "Education",
    services: ["Branding", "Web Design", "Development"],
    highlight: "Course launch",
    summary:
      "Branding, UX/UI and development for an educational course teaching entrepreneurs to build online service businesses.",
    url: "https://go.dropservicing.com",
    image: "/work/dropservicing.webp",
  },
  {
    slug: "mind-ninja",
    title: "Mind Ninja",
    client: "Mind Ninja",
    industry: "E-commerce / Wellbeing",
    services: ["Branding", "Webflow Development", "SEO"],
    highlight: "SquareSpace to Webflow",
    summary:
      "Full migration from SquareSpace to Webflow with eight custom-designed pages and digital product integration.",
    url: "https://www.mind-ninja.co.uk",
    image: "/work/mind-ninja.webp",
  },
  {
    slug: "ai-institute",
    title: "AI Institute",
    client: "AI Training Institute",
    industry: "B2B Training",
    services: ["UX Design", "Web Design", "Webflow Development"],
    highlight: "B2B AI training",
    summary:
      "B2B website for an AI training provider, positioning a new category offer for enterprise buyers.",
    url: "https://www.aitraining.institute",
    image: "/work/ai-institute.avif",
  },
  {
    slug: "calypso-commodities",
    title: "Calypso Commodities",
    client: "Calypso Commodities",
    industry: "Commodities / AI",
    services: ["Web Design", "Webflow Development"],
    highlight: "AI trading platform",
    summary:
      "Dark, confident marketing site for an AI platform in LNG trading, a company quoted in the WSJ, Bloomberg and the Financial Times.",
    url: "https://calypso-commodities.com",
    image: "/work/calypso-commodities.jpg",
  },
];
