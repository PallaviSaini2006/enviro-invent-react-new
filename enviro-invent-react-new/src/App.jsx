import { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Challenge from './components/Challenge.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CookieBanner from './components/CookieBanner.jsx'

/* ── Below-fold: code-split & lazy-loaded ──────────────────────────── */
const Platform = lazy(() => import('./components/Platform.jsx'))
const SectionDivider = lazy(() => import('./components/SectionDivider.jsx'))
const ProductShowcase = lazy(() => import('./components/ProductShowcase.jsx'))
const Mapping = lazy(() => import('./components/Mapping.jsx'))
const Workflow = lazy(() => import('./components/Workflow.jsx'))
const Capabilities = lazy(() => import('./components/Capabilities.jsx'))
const Stakeholders = lazy(() => import('./components/Stakeholders.jsx'))
const ScreenshotStrip = lazy(() => import('./components/ScreenshotStrip.jsx'))
const Compliance = lazy(() => import('./components/Compliance.jsx'))
const Mission = lazy(() => import('./components/Mission.jsx'))
const Cta = lazy(() => import('./components/Cta.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))

export default function App() {
  return (
    <div className="bg-paper text-ink font-body">
      {/* ── Above-fold: loaded immediately ── */}
      <Nav />
      <Hero />
      <Stats />
      <Challenge />

      {/* ── Below-fold: lazy-loaded on scroll ── */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Platform />
        <SectionDivider fromLabel="Platform" toLabel="Product" />
        <ProductShowcase />
        <Mapping />
        <Workflow />
        <Capabilities />
        <Stakeholders />
        <ScreenshotStrip />
        <Compliance />
        <Mission />
        <Cta />
        <Footer />
      </Suspense>

      <ScrollToTop />
      <CookieBanner />
    </div>
  )
}
