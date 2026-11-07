# Dee7 Studio website

See AGENTS.md for dev-server instructions. Node 22.23.4 via nvm (`.nvmrc`); deploy with `npm run deploy`.

## Design workflow

- The explicit brief, approved references, and the existing brand system
  (src/styles/global.css tokens, the "Ink & Signal" concept) take precedence
  over generic skill recommendations.
- Use UI UX Pro Max only for relevant research or missing design decisions.
  Do not overwrite the established design system with generated defaults.
- Use Impeccable for targeted critique, audit, and refinement.
- Use Playwright CLI to inspect rendered pages and test interactions.
- Open and visually inspect screenshots; merely saving them is not review.
- Reuse existing components and tokens. Do not create a parallel theme.
- Preserve functionality and avoid unrelated refactoring.
- Report anything not verified in the browser.
- Never use em dashes in copy or comments; reword instead.
