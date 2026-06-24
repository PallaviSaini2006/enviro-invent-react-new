import { useRef } from 'react'
import { Eyebrow } from './Shared.jsx'
import ShipHero from './ShipHero.jsx'

export default function Hero() {
  // Give ShipHero a ref to the section so it can measure scroll boundaries
  const sectionRef = useRef(null)

  return (
    <header
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ═══════════════════════════════════════════════════════
          BACKGROUND LAYER — animated ship (z-index 0)
          Fills the full section, parallax on scroll
      ═══════════════════════════════════════════════════════ */}
      <ShipHero containerRef={sectionRef} />

      {/* ═══════════════════════════════════════════════════════
          CONTENT LAYER — sits above the ship (z-index 10)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Top content block — centred vertically in first viewport ── */}
        <div className="flex-1 flex flex-col justify-center pt-[120px] pb-16 px-6 md:px-12">
          <div className="max-w-site mx-auto w-full">
            <div className="max-w-[680px]">

              {/* ── Eyebrow + live badge ── */}
              <div className="mb-7 flex flex-wrap items-center gap-4">
                <Eyebrow>Maritime Hazardous Material Intelligence</Eyebrow>
                <span className="green-badge hidden sm:inline-flex">Eco-Compliant</span>
              </div>

              {/* ── Hero headline ── */}
              <h1 className="font-display font-bold leading-[1.05] tracking-tight text-[44px] sm:text-[58px] md:text-[74px] lg:text-[86px]">
                Know what's<br />
                onboard.<br />
                <span className="text-accent">Stay compliant.</span>
              </h1>

              {/* ── Sub-copy ── */}
              <p className="mt-8 max-w-[520px] text-lg text-grey font-light leading-relaxed">
                Enviro Invent turns hazardous material records into a living map
                of your vessel — locating, tracking, and managing every compliance
                obligation from build to recycling.
              </p>

              {/* ── Compliance stat pills ── */}
              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { label: 'IHM Ready' },
                  { label: 'HKC Compliant' },
                  { label: 'EU SRR Aligned' },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-3 py-1.5 rounded-sm border border-accent-line bg-accent-muted text-accent"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-mid flex-shrink-0" />
                    {s.label}
                  </span>
                ))}
              </div>

              {/* ── CTAs ── */}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                <a
                  href="#cta"
                  className="text-sm font-medium px-7 py-[15px] bg-accent text-paper rounded-sm hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300 inline-block"
                >
                  Request a demo
                </a>
                <a
                  href="#platform"
                  className="text-sm font-medium border-b border-accent pb-0.5 text-accent group inline-flex items-center gap-1"
                >
                  See how it works
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll-down hint at bottom of viewport ── */}
        <div className="flex justify-center pb-10 relative z-10">
          <button
            onClick={() => {
              const next = document.getElementById('problem') || document.getElementById('platform')
              if (next) next.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex flex-col items-center gap-2 text-grey hover:text-accent transition-colors group"
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              Explore
            </span>
            {/* Animated chevron */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="animate-bounce"
              aria-hidden="true"
            >
              <path
                d="M4 7l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
