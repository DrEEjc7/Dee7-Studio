---
target: home page
total_score: 19
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/antoniodemac/Library/CloudStorage/Dropbox/All Projects/WEB Projects/8. Websites/Dee7 Studio/src/pages/index.astro"
target_fingerprint: "sha256:f05324efc9318a3d09e1a193808650270f47fd34b0a0100682d1631e954c9e25"
target_path: /Users/antoniodemac/Library/CloudStorage/Dropbox/All Projects/WEB Projects/8. Websites/Dee7 Studio/src/pages/index.astro
timestamp: 2026-11-07T00-28-36Z
slug: src-pages-index-astro
---
# Critique: Dee7 Studio home page (src/pages/index.astro)

Method: dual-agent (A: design review subagent · B: detector/browser subagent)

## Design Health Score (Persuade surface)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live signals good; data-rise sections can sit blank mid-scroll; CTA destination unclear |
| 2 | Match System / Real World | 4 | Problem-first language excellent; "MONTHLY, FROM 20 RESERVED HOURS" is insider-speak |
| 3 | User Control and Freedom | 3 | No mobile nav menu at <=720px; only hero button or footer reaches Work |
| 4 | Consistency and Standards | 2 | Three labels for one action; badge--delivery has three meanings; work-card cue mismatch |
| 5 | Error Prevention | n/a | No inputs on this page |
| 6 | Recognition Rather Than Recall | 3 | "Website Roadmap" presumes knowledge; two competing "start here" instructions |
| 7 | Flexibility and Efficiency | n/a | One-shot persuade surface |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained; minor testimonial dead space; double ink slab at page end |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | n/a | FAQs live on service pages |
| **Total** | | **19/24** | **Good (79%)** |

## Design Specificity Verdict

Authored, not generic, but the authorship lives in voice, motif, and proof rather than composition (~7.5/10). The Ink & Signal system is genuinely executed (signal dot, index numerals, link-cue dots, live CET clock). The page skeleton is the standard agency template: swap copy and wordmark and the composition serves any studio. Detector agrees structurally: hero-eyebrow-chip and kicker-above-heading flagged as saturated conventions.

Deterministic scan: 1 CLI finding (overused-font: Inter, Base.astro:33; false positive here, brand-mandated). In-page detector: 6 findings, 4 low-contrast pairs (white on #088981 4.3:1; #088981 on #111827 4.1:1; #6b7280 on #111827 3.7:1; #088981 on #FCFCF9 4.2:1) plus the two pattern flags. Assessment A computed the same contrast numbers independently.

## Priority Issues

1. **[P0] Mobile H1 renders "productimpossible".** The br class="hero__br" is display:none at <=720px and Astro compression strips the whitespace, fusing the words. The clarity studio's headline, broken on phones. Fix: keep an explicit space before the br in index.astro (hero title), or drop the manual break.
2. **[P1] No mobile navigation.** .nav__links is display:none at <=720px with no replacement. Fix: compact second row of links or minimal disclosure menu.
3. **[P1] Promise/destination mismatch.** Every green button promises a free review; all land on generic /contact asking goal, timing, and budget. Fix: review-intent state (/contact?intent=review) with URL + email + goal only.
4. **[P2] One action, three labels; one badge, three meanings.** Standardize "Get a Free Website Review"; shorten Monthly Partner badge to one line; make the hero audience tag a neutral badge.
5. **[P2] Accent fails AA at small sizes.** All four accent pairs sit at 3.7-4.3:1 against the 4.5:1 normal-text bar. Fix: --accent-text (~#067068) for small text on light; brighter accent for small text on dark; keep #088981 for fills and display sizes.
6. **[P3] data-rise can leave grids blank** for fast scrollers/slow devices; add early-trigger rootMargin and a timed fallback.

## Persona Red Flags

- Jordan (first-timer): nav says "Get a Free Review" (of what?); landing page says "Tell us what you're trying to do." with no three-fixes echo; roadmap strip vs CTA band = two first steps; budget field after "free, no obligation".
- Riley (stress tester): blank sections when scrolling fast; AWS card says "See all work" while siblings say "Visit live site"; 2,000+ projects / 10+ years invites arithmetic with no proof link; no :focus-visible styles defined.
- Casey (mobile): reads "productimpossible" first; cannot reach Work without scrolling to footer; FOUT from two font CDNs on 3G; mailto form dead-ends without a configured mail app.

## Minor Observations

- Footer tagline "Turning visions into exceptional websites." violates the brand's own no-filler rule.
- No og:image; link previews in Slack/email are text-only.
- Hero stats repeat dt "Certified Partner" twice; work-card eyebrow taxonomy mixed (output/scope/category).
- Testimonial card heights unbalanced; CTA band + footer form one unbroken ink slab on mobile.
- roadmap-strip has a dead transition: transform rule; external links lack noreferrer.

## Questions to Consider

1. Why does "impossible to misunderstand" resolve to a page that opens by asking the visitor to explain themselves?
2. Would one concrete artifact (Lobelia award, AWS mark) outperform "2,000+ projects" as hero proof?
3. Is the accent-green "misunderstand." (negative, non-actionable) the signal system's one self-contradiction, and is the mint roadmap strip signal or decoration?
