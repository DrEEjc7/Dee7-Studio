# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: decision-makers at B2B software companies (founders, marketing leads) who are launching a product or whose current website undersells them. They usually arrive referred, from targeted outreach, or from a partner, and visit the site as a credibility check before replying. Secondary: agencies buying white-label design and Webflow capacity (Monthly Partner).

## Product Purpose

dee7studio.com is Dee7 Studio's own marketing site. Its job: pass the 30-second credibility scan for referred and outreach prospects, explain the offers as problems solved, and convert visitors into low-friction enquiries (free website review) or qualified project leads (contact form with goal, timing, budget).

## Positioning

A web design studio that brings planning, copy, design, and build into one process, measured in conversions. The claim neighbors can't truthfully copy: 10+ years, 2,000+ projects, Certified Webflow Partner and Certified Notion Partner, with award-winning shipped work (Lobelia Earth) and work for AWS and Fiverr.

## Operating Context

Acquisition is referrals, partner relationships, and targeted outreach, not cold search traffic. The site supports those flows; the blog exists for SEO/AEO as a secondary channel. Offers follow a ladder: free website review (3 fixes in a short video), paid Website Roadmap, Landing Page Sprint, Website Project, Monthly Partner. Sauce (saucesites.com, managed websites for local businesses) is a separate brand and stays entirely off this site.

## Capabilities and Constraints

- Stack: Astro 7, Cloudflare Workers (worker "dee7-studio"), Sanity planned as CMS (not yet connected; content layer in src/lib/content.ts serves src/data/sample.ts until then). Node 22.23.4 via nvm.
- No pricing on the home page. "From $X" appears only on /services/[slug] pages; budget ranges live in the contact form.
- Contact form composes a mailto to hello@dee7studio.com; no backend yet.
- Blog posts are placeholder content pending the Sanity content pass.
- Touchcast may only be shown using its archived design from the Figma Design Highlights file, never the current touchcast.com.

## Brand Commitments

- Name: DEE7 Studio. Voice: "we" (the studio), Andrej-led, plain and outcome-first; short sentences; second person; no filler phrases; never any em dashes (reword instead).
- Studio time zone: CET (Europe).
- Visual identity is binding: ink #111827, accent green #088981 (action/signal only), background #FCFCF9, Cabinet Grotesk display + Inter body, 8px grid, 8/12/16px radii, no gradients or decorative illustration. Design concept "Ink & Signal" (editorial restraint, poster type, dot motif, index numerals).
- Logo: wordmark SVGs in public/brand/ (light and dark variants); source files in /Branding.

## Evidence on Hand

- Portfolio mockups (user-provided, from the previous site's CDN) in public/work/: 12 live on the site plus spares (white-invoice, big-note, ask-mavis, getmilo, icg-florida).
- Verbatim client testimonials on the home page: Jonah Smith (Vespa), Dan Denegre (Space Race Studio), Oscar Alcantara (EventScouts AG). More exist on the old site.
- Live client sites that verify: lobelia.earth (award winner), mind-ninja.co.uk, emew.com, aitraining.institute, calypso-commodities.com, creatorclip.webflow.io, go.dropservicing.com, get-blended.com.
- Strategy source: Google Doc "Dee7 Studio Basics" (offers, pricing, channels, proof).
- No fabricated metrics, testimonials, or case-study results anywhere; absent evidence stays absent until real.

## Product Principles

1. Proof over claims: real projects, real quotes, real certifications; nothing invented.
2. The offer is the problem solved; price comes after fit, on offer pages and in the form.
3. One signal at a time: green means the action to take; everything else is ink.
4. Match the ask to intent: visitors ready to talk get "Book a call" (TidyCal) or a message; visitors still researching (blog readers) get the free website review. The nav button is the neutral "Let's Talk" to /contact.
5. The site must be scannable in 30 seconds by a referred prospect.

## Accessibility & Inclusion

Respect prefers-reduced-motion (scroll reveals and pulses disable). Maintain legible contrast on ink and off-white surfaces. No formal standard committed beyond this.
