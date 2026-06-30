<div align="center">

# 🌊 Enviro Maint

### Maritime Hazardous Material Intelligence Platform

*Know what's onboard. Know where it is. Stay compliant.*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)]()

---

**Enviro Maint** maps, tracks, and manages hazardous materials across maritime fleets — from first inventory to final recycling. Built for ship owners, fleet operators, classification societies, and recycling yards who need to stay ahead of global compliance frameworks.

[🔗 Live Demo](#) · [📋 Features](#-features) · [🚀 Quick Start](#-quick-start) · [📁 Architecture](#-architecture) · [🔧 Configuration](#-configuration)

</div>

---

## 📸 Overview

Enviro Maint provides **location-aware hazardous material intelligence** for the maritime industry. The platform enables:

- **Deck-level precision mapping** of hazardous materials across vessel blueprints
- **IHM (Inventory of Hazardous Materials)** generation and lifecycle management
- **Real-time compliance tracking** against HKC, IMO, EU SRR, and Basel Convention
- **Fleet-wide dashboards** with vessel registry, survey readiness, and audit trails

---

## ✨ Features

### Core Platform
| Feature | Description |
|---------|-------------|
| **Fleet Dashboard** | Monitor active vessels, IHM readiness, inventory points, and PO status across your entire fleet |
| **Vessel Registry** | Browse, filter, and manage your complete vessel portfolio with real-time compliance indicators |
| **Ship Intelligence** | Access IHM certificates, hazmat breakdowns, PO scan results, and downloadable reports per vessel |
| **Location Mapping** | Interactive deck plans with drag-and-drop inventory points — see exactly where every hazardous material lives onboard |
| **Compliance Engine** | Automated alignment with HKC, IMO MEPC.269(68), Basel Convention Annex IX, and EU SRR Art. 12 |

### Website & UX
| Feature | Description |
|---------|-------------|
| **Glassmorphism Navigation** | Dynamic navbar transitions from transparent → frosted glass with scroll-responsive opacity |
| **Scroll Spy** | Real-time active section highlighting with green neon glow effect |
| **Animated Statistics** | Count-up animations with easeOutExpo curve triggered by IntersectionObserver |
| **Interactive Deck Plan** | SVG-based vessel blueprint with animated hazard markers and auto-cycling locations |
| **GDPR Cookie Consent** | Non-intrusive banner with localStorage persistence and Accept/Decline controls |
| **Performance Optimized** | React.lazy code-splitting, CSS-only marquee, lazy-loaded assets, preloaded critical resources |
| **Mobile-First Design** | Responsive layouts, touch-optimized interactions, battery-saving animation pauses |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/PallaviSaini2006/enviro-invent-react-new.git
cd enviro-invent-react-new/enviro-invent-react-new

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your SMTP credentials (see Configuration section)

# Start development server (frontend + email API)
npm run dev
```

The app will be available at **http://localhost:5173**  
The email API runs on **http://localhost:3001**

### Production Build

```bash
npm run build       # Output to dist/
npm run preview     # Preview production build locally
```

Deploy the `dist/` folder to any static host — Vercel, Netlify, Cloudflare Pages, AWS S3, etc.

---

## 📁 Architecture

```
enviro-invent-react-new/
├── public/
│   ├── favicon.svg                 # Branded SVG favicon
│   ├── deck-plan.png               # Vessel blueprint for mapping section
│   ├── product-dashboard.png       # Fleet dashboard screenshot
│   ├── product-ships.png           # Vessel registry screenshot
│   ├── product-ship-dashboard.png  # Ship intelligence screenshot
│   ├── product-location.png        # Location mapping screenshot
│   └── ship-bwg.html              # Canvas-based ship animation (hero)
│
├── src/
│   ├── assets/
│   │   └── Logo.jpg               # Brand logo
│   │
│   ├── components/
│   │   ├── Nav.jsx                # Fixed navbar — glassmorphism, scroll spy, neon glow
│   │   ├── Hero.jsx               # Hero section — animated vessel cross-section
│   │   ├── ShipHero.jsx           # Ship animation (desktop: iframe, mobile: CSS gradient)
│   │   ├── Stats.jsx              # Animated count-up statistics section
│   │   ├── Challenge.jsx          # The problem — current regulatory landscape
│   │   ├── Platform.jsx           # Platform introduction
│   │   ├── SectionDivider.jsx     # Animated SVG divider between sections
│   │   ├── ProductShowcase.jsx    # Auto-rotating product screenshot gallery
│   │   ├── Mapping.jsx            # Interactive SVG deck plan with hazard markers
│   │   ├── Workflow.jsx           # Vessel-to-recycling lifecycle workflow
│   │   ├── Capabilities.jsx       # Feature capability grid
│   │   ├── Stakeholders.jsx       # Target audience personas
│   │   ├── ScreenshotStrip.jsx    # CSS-animated horizontal screenshot marquee
│   │   ├── Compliance.jsx         # Global compliance frameworks (HKC/IMO/EU/Basel)
│   │   ├── Mission.jsx            # Mission statement
│   │   ├── Cta.jsx                # Demo request form with validation & email API
│   │   ├── Footer.jsx             # Footer with privacy/legal links
│   │   ├── ScrollToTop.jsx        # Floating scroll-to-top button
│   │   ├── CookieBanner.jsx       # GDPR cookie consent banner
│   │   └── Shared.jsx             # Reveal animation wrapper, Eyebrow, SectionHead
│   │
│   ├── hooks.js                   # useReveal, useScrollProgress, useParallax
│   ├── emailTemplate.js           # Branded HTML email template for demo requests
│   ├── App.jsx                    # Root — assembles sections with React.lazy
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind imports, global styles, keyframes
│
├── server.js                      # Express 5 email API (Nodemailer + SMTP)
├── tailwind.config.js             # Brand design tokens (colors, fonts, spacing)
├── vite.config.js                 # Vite configuration with React plugin
├── postcss.config.js              # PostCSS with Tailwind & Autoprefixer
└── package.json
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# SMTP Configuration for demo request emails
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=465
EMAIL_USER=noreply@your-domain.com
EMAIL_PASS=your-app-password
EMAIL_TO=demo@your-domain.com
```

### Brand Tokens

All brand colors, fonts, and spacing are defined in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `accent` | `#1A7A40` | Primary green — CTAs, links, badges |
| `accent-dark` | `#145F32` | Hover states |
| `accent-mid` | `#22A052` | Gradients, secondary accents |
| `ink` | `#0A0A0A` | Primary text, dark sections |
| `paper` | `#FAFAF8` | Background |
| `paper-dim` | `#F1F0EC` | Alternate section backgrounds |

### Fonts

Loaded via Google Fonts in `index.html`:

- **Archivo** (Display) — Headlines and section titles
- **Inter** (Body) — Body text and UI elements
- **JetBrains Mono** (Mono) — Badges, labels, technical data

---

## ⚡ Performance

The site is optimized for fast initial loads and smooth interactions:

| Optimization | Technique |
|---|---|
| **Code Splitting** | 12 below-fold components lazy-loaded via `React.lazy` + `Suspense` |
| **Asset Deferral** | Images use `loading="lazy"`, hero iframe deferred until visible |
| **Critical Path** | Logo preloaded with `fetchpriority="high"`, fonts use `display=swap` |
| **Animation** | Screenshot marquee uses GPU-accelerated CSS instead of 60fps JS `rAF` loop |
| **Mobile** | Heavy canvas animation replaced with lightweight CSS gradient on mobile devices |
| **Scroll Handling** | Single passive scroll listener handles progress bar + scroll spy + nav opacity |

---

## 🌍 Compliance Frameworks

Enviro Maint is built around the regulatory bodies that govern the maritime industry:

| Framework | Standard | Coverage |
|-----------|----------|----------|
| 🇭🇰 **HKC** | Hong Kong Convention | IHM Part I & II, flag-state submission |
| 🇺🇳 **IMO** | MEPC.269(68) | Material hierarchy, survey workflows |
| 🌐 **Basel** | Annex IX Amendment (2023) | Hazardous material evidence, export reporting |
| 🇪🇺 **EU SRR** | Art. 12 | Certified IHM reports, port-state control checks |

---

## 📧 Contact Form & Email API

The demo request form (`Cta.jsx`) submits to a built-in Express API (`server.js`) that sends branded HTML emails via SMTP:

- **Validation**: Client-side (name, email format, company required) + server-side
- **Loading States**: Animated spinner with green glow during submission
- **Success State**: Animated checkmark with confirmation message
- **Error Handling**: Graceful fallback with retry option
- **Email Template**: Branded HTML table layout with all form data (`emailTemplate.js`)

---

## 🛠 Tech Stack

<table>
<tr>
<td align="center" width="120">
<strong>React 18</strong><br/>
<sub>UI Components</sub>
</td>
<td align="center" width="120">
<strong>Vite 5</strong><br/>
<sub>Build Tool</sub>
</td>
<td align="center" width="120">
<strong>Tailwind 3</strong><br/>
<sub>Styling</sub>
</td>
<td align="center" width="120">
<strong>Express 5</strong><br/>
<sub>Email API</sub>
</td>
<td align="center" width="120">
<strong>Nodemailer</strong><br/>
<sub>SMTP Transport</sub>
</td>
</tr>
</table>

---

## 📄 License

This project is proprietary software. All rights reserved.  
© 2026 Enviro Maint. Unauthorized use, reproduction, or distribution is prohibited.

---

<div align="center">

**Built for a safer, greener maritime future.**  
Compliant recycling starts with better data.

🌊 **Enviro Maint** 🌊

</div>
