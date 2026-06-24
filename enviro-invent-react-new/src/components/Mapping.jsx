import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks.js'
import { Reveal, Eyebrow } from './Shared.jsx'

/**
 * HAZARDOUS MATERIAL CALLOUTS
 * Each entry maps to a real area from the deck plan screenshot:
 *  - Engine Room Water Ballast Tank, IGG MGO Tank, MGO Service/Storage Tanks,
 *    Lobby (cleaning chemicals), Engine Changing Room (lubricants/solvents),
 *    CSB Room (boiler chemicals), Fish Room (refrigerants)
 *
 * marker.x/y are percentages of the SVG viewBox (638 × 768)
 */
const CALLOUTS = [
  {
    id: 1,
    coord: 'DK.B / FR.01',
    zone: 'Fuel Storage',
    title: 'IGG MGO Tank',
    hazard: 'Flammable',
    hazardColor: '#1A7A40',
    body: 'Marine Gas Oil inventory mapped with quantity, MSDS documentation and spill-containment zone boundaries.',
    marker: { cx: 115, cy: 175 },
    severity: 'high',
  },
  {
    id: 2,
    coord: 'DK.B / FR.03',
    zone: 'Fuel System',
    title: 'No.2 MGO Service Tank',
    hazard: 'Flammable',
    hazardColor: '#1A7A40',
    body: 'Active service tank feeding main engine and generators. Continuous monitoring required under MARPOL Annex I.',
    marker: { cx: 320, cy: 175 },
    severity: 'high',
  },
  {
    id: 3,
    coord: 'DK.B / FR.04',
    zone: 'Fuel Storage',
    title: 'No.2 MGO Storage Tank',
    hazard: 'Flammable',
    hazardColor: '#1A7A40',
    body: 'Bulk MGO reserve. Transfer piping to service tank contains residual fuel — classified hazardous under HKC Schedule I.',
    marker: { cx: 530, cy: 175 },
    severity: 'high',
  },
  {
    id: 4,
    coord: 'DK.B / FR.02',
    zone: 'Ballast System',
    title: 'Engine Room Water Ballast Tank (P)',
    hazard: 'Anti-fouling / Biocide',
    hazardColor: '#1A7A40',
    body: 'Ballast water treatment chemicals and corrosion inhibitors. Documented under EU SRR Article 13 biocide inventory.',
    marker: { cx: 150, cy: 90 },
    severity: 'medium',
  },
  {
    id: 5,
    coord: 'DK.B / FR.07',
    zone: 'Technical Spaces',
    title: 'Engine Changing Room',
    hazard: 'Lubricants / Solvents',
    hazardColor: '#22A052',
    body: 'Stored lubricating oils, hydraulic fluid, and cleaning solvents. PCB-containing materials flagged during 2023 survey.',
    marker: { cx: 315, cy: 640 },
    severity: 'medium',
  },
  {
    id: 6,
    coord: 'DK.B / FR.09',
    zone: 'Utility Room',
    title: 'CSB Room (P)',
    hazard: 'Boiler Chemicals',
    hazardColor: '#22A052',
    body: 'Chemical scale and biocide treatment agents for boiler and cooling systems. Toxic under Basel Convention Schedule.',
    marker: { cx: 540, cy: 435 },
    severity: 'medium',
  },
  {
    id: 7,
    coord: 'DK.B / FR.05',
    zone: 'Provision / Cold Store',
    title: 'Fish Room',
    hazard: 'Refrigerants (ODS)',
    hazardColor: '#135C30',
    body: 'R-22 / HCFC refrigerant in cold store system — ozone-depleting substance requiring phase-out plan per Montreal Protocol.',
    marker: { cx: 305, cy: 475 },
    severity: 'low',
  },
]

/* ── Hazard severity badge color ─────────────────────────────────────── */
const SEVERITY_STYLE = {
  high:   { bg: 'bg-[#FFF3E8]', border: 'border-[#E88020]', text: 'text-[#C06010]', dot: '#E88020' },
  medium: { bg: 'bg-accent-muted', border: 'border-accent-line', text: 'text-accent', dot: '#1A7A40' },
  low:    { bg: 'bg-[#F0F8F3]', border: 'border-[#A8D5B8]', text: 'text-[#135C30]', dot: '#135C30' },
}

/* ── SVG Deck Plan ───────────────────────────────────────────────────── */
function DeckPlanSVG({ active, onHover }) {
  const activeCallout = CALLOUTS.find((c) => c.id === active)

  return (
    <svg
      viewBox="0 0 638 768"
      className="w-full h-auto"
      aria-label="Ship deck plan with hazardous material markers"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* ── Defs: glow filter, clip ── */}
      <defs>
        <filter id="haz-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="zone-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Scan sweep gradient */}
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A7A40" stopOpacity="0" />
          <stop offset="50%" stopColor="#1A7A40" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1A7A40" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ══════════════════════════════════════════════════════
          DECK PLAN BACKGROUND — Actual Screenshot
      ══════════════════════════════════════════════════════ */}
      <image href="/deck-plan.png" x="0" y="0" width="638" height="768" />

      {/* ══════════════════════════════════════════════════════
          HAZARDOUS MATERIAL MARKERS
          Show on top of all deck plan elements
      ══════════════════════════════════════════════════════ */}
      {CALLOUTS.map((c) => {
        const isActive = c.id === active
        return (
          <g
            key={c.id}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => onHover(c.id)}
            onFocus={() => onHover(c.id)}
          >
            {/* Outer pulse ring — only on active */}
            {isActive && (
              <circle
                cx={c.marker.cx}
                cy={c.marker.cy}
                r="16"
                fill="none"
                stroke={c.hazardColor}
                strokeWidth="1.2"
                opacity="0.4"
                style={{ animation: 'marker-pulse 1.8s ease-out infinite' }}
              />
            )}

            {/* Second pulse ring — active only */}
            {isActive && (
              <circle
                cx={c.marker.cx}
                cy={c.marker.cy}
                r="24"
                fill="none"
                stroke={c.hazardColor}
                strokeWidth="0.7"
                opacity="0.2"
                style={{ animation: 'marker-pulse 1.8s ease-out infinite 0.4s' }}
              />
            )}

            {/* Zone highlight circle under active marker */}
            {isActive && (
              <circle
                cx={c.marker.cx}
                cy={c.marker.cy}
                r="30"
                fill={c.hazardColor}
                fillOpacity="0.08"
                filter="url(#zone-glow)"
              />
            )}

            {/* Main marker dot */}
            <circle
              cx={c.marker.cx}
              cy={c.marker.cy}
              r={isActive ? 8 : 5.5}
              fill={c.hazardColor}
              opacity={isActive ? 1 : 0.55}
              filter={isActive ? 'url(#haz-glow)' : 'none'}
              style={{ transition: 'r 0.3s ease, opacity 0.3s ease' }}
            />

            {/* Inner white dot */}
            <circle
              cx={c.marker.cx}
              cy={c.marker.cy}
              r={isActive ? 3 : 2}
              fill="#FAFAF8"
              opacity={isActive ? 1 : 0.7}
              style={{ transition: 'r 0.3s ease' }}
            />

            {/* Marker number label */}
            <text
              x={c.marker.cx}
              y={isActive ? c.marker.cy - 13 : c.marker.cy - 9}
              textAnchor="middle"
              fontSize={isActive ? '8' : '6.5'}
              fontWeight="700"
              fill={c.hazardColor}
              opacity={isActive ? 1 : 0.7}
              style={{ transition: 'all 0.3s ease', letterSpacing: '0.02em' }}
            >
              {c.id}
            </text>
          </g>
        )
      })}

      {/* ── Active zone connector line to card ─────────── */}
      {/* Visual breadcrumb: dashed line from active marker to right edge */}
      {activeCallout && (
        <g style={{ opacity: 1, transition: 'opacity 0.4s ease' }}>
          <line
            x1={activeCallout.marker.cx}
            y1={activeCallout.marker.cy}
            x2="628"
            y2={activeCallout.marker.cy}
            stroke={activeCallout.hazardColor}
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.35"
          />
          <circle cx="628" cy={activeCallout.marker.cy} r="2.5" fill={activeCallout.hazardColor} opacity="0.5" />
        </g>
      )}

      {/* ── SCAN LINE ANIMATION (ambient pulse sweep) ─── */}
      <AnimatedScanLine />
    </svg>
  )
}

/* ── Animated scan line (ambient, functional: shows "live scan" state) */
function AnimatedScanLine() {
  const [pos, setPos] = useState(15)
  const dirRef = useRef(1)
  const rafRef = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    function tick(ts) {
      if (!lastRef.current) lastRef.current = ts
      const dt = ts - lastRef.current
      lastRef.current = ts

      setPos((p) => {
        const next = p + dirRef.current * (dt * 0.04)
        if (next >= 750) dirRef.current = -1
        if (next <= 15) dirRef.current = 1
        return Math.max(15, Math.min(750, next))
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <line
      x1="10"
      y1={pos}
      x2="628"
      y2={pos}
      stroke="url(#scanGrad)"
      strokeWidth="18"
      opacity="0.6"
      style={{ pointerEvents: 'none' }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
export default function Mapping() {
  const [active, setActive] = useState(1)
  const [deckRef, deckInView] = useReveal(0.2)

  // Auto-cycle through callouts when in view
  useEffect(() => {
    if (!deckInView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = CALLOUTS.findIndex((c) => c.id === prev)
        return CALLOUTS[(idx + 1) % CALLOUTS.length].id
      })
    }, 3800)
    return () => clearInterval(interval)
  }, [deckInView])

  const activeCallout = CALLOUTS.find((c) => c.id === active)
  const sev = activeCallout ? SEVERITY_STYLE[activeCallout.severity] : SEVERITY_STYLE.medium

  return (
    <>
      {/* Inject marker pulse keyframe */}
      <style>{`
        @keyframes marker-pulse {
          0%   { r: 14; opacity: 0.5; }
          100% { r: 36; opacity: 0; }
        }
      `}</style>

      <section id="mapping" className="py-[90px] md:py-[140px]">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[0.82fr_1.18fr] gap-10 md:gap-14 items-start">

            {/* ═══════════════════════════════════
                LEFT PANEL — callout list
            ═══════════════════════════════════ */}
            <div>
              <Reveal>
                <Eyebrow>Vessel Layout Intelligence</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[30px] md:text-[38px] lg:text-[44px] mt-5">
                  Deck plans become compliance assets.
                </h2>
                <div className="mt-3 h-[3px] w-14 rounded-full bg-accent" />
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-[16px] text-grey font-light leading-relaxed max-w-[440px]">
                  Enviro Invent overlays hazardous material locations directly onto your vessel's
                  actual deck plans — so any surveyor, consultant, or recycling yard can find
                  what they need in seconds.
                </p>
              </Reveal>

              {/* ── Callout list ── */}
              <div className="mt-8 flex flex-col">
                {CALLOUTS.map((c, i) => {
                  const isActive = c.id === active
                  const s = SEVERITY_STYLE[c.severity]
                  return (
                    <Reveal key={c.id} delay={240 + i * 60}>
                      <button
                        onMouseEnter={() => setActive(c.id)}
                        onFocus={() => setActive(c.id)}
                        onClick={() => setActive(c.id)}
                        className={`w-full text-left py-4 border-t border-grey-line transition-all duration-300 group
                          ${isActive ? 'opacity-100' : 'opacity-55 hover:opacity-80'}`}
                      >
                        <div className="grid grid-cols-[72px_1fr] gap-3 items-start">
                          {/* Coord + number */}
                          <div className="flex flex-col gap-1 pt-0.5">
                            <span
                              className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold text-paper"
                              style={{ background: c.hazardColor }}
                            >
                              {c.id}
                            </span>
                            <span className="font-mono text-[9px] text-grey leading-tight">{c.coord}</span>
                          </div>

                          {/* Title, hazard tag, body */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-[14px] leading-snug">{c.title}</h4>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-medium px-2 py-0.5 rounded-sm border ${s.bg} ${s.border} ${s.text} mb-1.5`}>
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                              {c.hazard}
                            </span>
                            {isActive && (
                              <p className="text-[12.5px] text-grey font-light leading-snug mt-1 max-w-[320px]">
                                {c.body}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Active green indicator bar */}
                        {isActive && (
                          <div className="mt-2 ml-[84px] h-[2px] rounded-full bg-accent" style={{ width: '60%' }} />
                        )}
                      </button>
                    </Reveal>
                  )
                })}

                {/* Bottom border */}
                <div className="border-t border-grey-line" />
              </div>

              {/* Legend */}
              <Reveal delay={700}>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { label: 'Flammable / Fuel', dot: SEVERITY_STYLE.high.dot },
                    { label: 'Chemical / Biocide', dot: SEVERITY_STYLE.medium.dot },
                    { label: 'Refrigerants (ODS)', dot: SEVERITY_STYLE.low.dot },
                  ].map((leg) => (
                    <span key={leg.label} className="inline-flex items-center gap-1.5 text-[10px] font-mono text-grey">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: leg.dot }} />
                      {leg.label}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* ═══════════════════════════════════
                RIGHT PANEL — deck plan
            ═══════════════════════════════════ */}
            <Reveal variant="scale" delay={200}>
              <div
                ref={deckRef}
                className="relative border border-grey-line bg-paper-dim rounded-sm overflow-hidden"
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-grey-line bg-paper">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[10px] text-grey uppercase tracking-widest">
                      Live Deck Scan — B Deck
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-medium px-2 py-0.5 rounded-sm border ${sev.bg} ${sev.border} ${sev.text}`}>
                      <span className="w-1 h-1 rounded-full" style={{ background: sev.dot }} />
                      Zone {active} · {activeCallout?.hazard}
                    </span>
                    <span className="font-mono text-[9px] text-grey">
                      {active} / {CALLOUTS.length} hazards
                    </span>
                  </div>
                </div>

                {/* SVG deck plan */}
                <div className="p-4">
                  <DeckPlanSVG active={active} onHover={setActive} />
                </div>

                {/* Footer bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-grey-line bg-paper">
                  <span className="font-mono text-[9px] text-grey">
                    General Arrangement · B Deck · Provision & Engine Support Area
                  </span>
                  <span className="font-mono text-[9px] text-accent">
                    {CALLOUTS.length} HazMat zones mapped
                  </span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  )
}
