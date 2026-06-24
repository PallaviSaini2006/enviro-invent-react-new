# Enviro Maint — Marketing Site (React)

A premium, marketing site for Enviro Maint, a maritime
hazardous material compliance platform. Built with React, Vite, and Tailwind CSS.

This is a 1:1 React port of the original static HTML build — same copy, same
sections, same visual design and motion. Nothing was changed creatively in
the conversion; only the implementation moved from a single HTML file to a
componentized React codebase.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The production build is output to `dist/`. Deploy that folder to any static
host (Vercel, Netlify, Cloudflare Pages, S3, etc).

## Project structure

```
src/
  components/
    Nav.jsx           Fixed nav bar with scroll-progress indicator
    Hero.jsx          Hero section with the animated vessel cross-section
    Challenge.jsx     Section 1 — the problem
    Platform.jsx      Section 2 — platform introduction
    Mapping.jsx        Section 3 — hazard mapping showcase (deck plan)
    Workflow.jsx       Section 4 — vessel-to-recycling workflow chain
    Capabilities.jsx   Section 5 — capability grid
    Stakeholders.jsx   Section 6 — who it's for
    Compliance.jsx     Section 7 — global compliance frameworks
    Mission.jsx        Section 8 — mission statement
    Cta.jsx            Final CTA + demo request form (email)
    Footer.jsx         Footer
    Shared.jsx         Reveal animation wrapper, Eyebrow, SectionHead
  hooks.js             useReveal, useScrollProgress, useParallax
  App.jsx              Assembles all sections in order
  main.jsx             React entry point
  index.css            Tailwind imports + global styles + reveal CSS
```

## The contact / demo request form

`Cta.jsx` contains a form (name, work email, company, fleet size, message).
By default, submitting it opens the visitor's email client via a `mailto:`
link pre-filled with their details — no backend required.

To connect it to a real backend instead (recommended for production, since
`mailto:` depends on the visitor having a configured mail client), open
`Cta.jsx` and replace the body of `handleSubmit` with a `fetch()` call to
your form endpoint of choice — Formspree, Resend, your own API route, etc.
The validation and UI state (`status`, `errors`) are already wired up and
don't need to change.

Update `RECIPIENT_EMAIL` at the top of `Cta.jsx` to your real inbox.

## Motion / animation notes

- Scroll reveals use `IntersectionObserver` (`useReveal` in `hooks.js`) —
  performant, no scroll-event thrashing.
- The nav has a thin hazard-red progress bar that fills as the visitor
  scrolls through the page (`useScrollProgress`).
- The hero's vessel diagram has a subtle parallax drift as you scroll
  (`useParallax`).
- The deck-plan hazard markers in the Mapping section auto-cycle through
  locations on a timer once scrolled into view, in addition to responding
  to hover/focus — so the "we know exactly where it is" story plays out
  even for visitors who don't interact.
- All animations respect `prefers-reduced-motion`.

## Customization

- Brand tokens (colors, fonts) live in `tailwind.config.js`.
- Fonts are loaded via Google Fonts `<link>` tags in `index.html`
  (Archivo, Inter, JetBrains Mono).
- Copy for every section lives directly in its component file as plain
  arrays/strings — easy to find and edit without touching markup.
