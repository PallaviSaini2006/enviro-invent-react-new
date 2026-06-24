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
 * marker.x/y are percentages of the SVG viewBox (760 × 700)
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
    marker: { cx: 78, cy: 178 },
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
    marker: { cx: 290, cy: 68 },
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
    marker: { cx: 560, cy: 68 },
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
    marker: { cx: 220, cy: 35 },
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
    marker: { cx: 338, cy: 530 },
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
    marker: { cx: 630, cy: 370 },
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
    marker: { cx: 338, cy: 415 },
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
      viewBox="0 0 760 700"
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
          DECK PLAN BACKGROUND — replicating the screenshot
      ══════════════════════════════════════════════════════ */}

      {/* Overall outer boundary */}
      <rect x="10" y="10" width="730" height="680" rx="2"
        fill="#F8F8F6" stroke="#1a2830" strokeWidth="1.5" />

      {/* ── TOP ZONE: Tank Row ───────────────────────────── */}
      {/* Outer tank boundary */}
      <rect x="10" y="10" width="730" height="120" fill="#EEF2F0" stroke="#1a2830" strokeWidth="1.2" />
      {/* IGG MGO Tank */}
      <rect x="10" y="10" width="138" height="120" fill="#E8F0EE" stroke="#1a2830" strokeWidth="1" />
      <text x="30" y="55" fontSize="8.5" fill="#2a3840" fontWeight="600">IGG MGO</text>
      <text x="30" y="68" fontSize="8.5" fill="#2a3840" fontWeight="600">TANK</text>
      {/* engine room sub-diagram in IGG tank area */}
      <rect x="18" y="18" width="70" height="55" rx="1" fill="none" stroke="#607880" strokeWidth="0.8" strokeDasharray="3 2" />
      <rect x="22" y="22" width="30" height="22" rx="1" fill="#d0dce2" stroke="#607880" strokeWidth="0.6" />
      <rect x="56" y="22" width="26" height="22" rx="1" fill="#d0dce2" stroke="#607880" strokeWidth="0.6" />
      <rect x="22" y="48" width="56" height="22" rx="1" fill="#c8d4da" stroke="#607880" strokeWidth="0.6" />
      {/* Divider after IGG tank */}
      <line x1="148" y1="10" x2="148" y2="130" stroke="#1a2830" strokeWidth="1.2" />

      {/* Engine Room Water Ballast Tank center label */}
      <text x="155" y="50" fontSize="8" fill="#2a3840" fontWeight="700">ENGINE ROOM WATER BALLAST TANK (P)</text>

      {/* Ballast tank detail lines */}
      <line x1="148" y1="90" x2="580" y2="90" stroke="#607880" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.5" />
      <path d="M165,95 L195,65 M210,65 L240,95 M255,95 L285,65 M300,65 L330,95"
        stroke="#607880" strokeWidth="0.6" fill="none" opacity="0.4" />

      {/* Divider between ballast and MGO tanks */}
      <line x1="420" y1="10" x2="420" y2="130" stroke="#1a2830" strokeWidth="1.2" />

      {/* No.2 MGO Service Tank */}
      <rect x="420" y="10" width="155" height="120" fill="#E8F4EE" stroke="#1a2830" strokeWidth="1" />
      <text x="435" y="55" fontSize="8" fill="#2a3840" fontWeight="600">NO.2 MGO</text>
      <text x="435" y="68" fontSize="8" fill="#2a3840" fontWeight="600">SERVICE TANK</text>
      <line x1="440" y1="80" x2="560" y2="80" stroke="#1A7A40" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.5" />
      <line x1="440" y1="90" x2="560" y2="90" stroke="#1A7A40" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.5" />

      {/* Divider */}
      <line x1="575" y1="10" x2="575" y2="130" stroke="#1a2830" strokeWidth="1.2" />

      {/* No.2 MGO Storage Tank */}
      <rect x="575" y="10" width="165" height="120" fill="#E8F4EE" stroke="#1a2830" strokeWidth="1" />
      <text x="590" y="55" fontSize="8" fill="#2a3840" fontWeight="600">NO.2 MGO</text>
      <text x="590" y="68" fontSize="8" fill="#2a3840" fontWeight="600">STORAGE TANK</text>
      <line x1="595" y1="80" x2="725" y2="80" stroke="#1A7A40" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.5" />
      <line x1="595" y1="95" x2="725" y2="95" stroke="#1A7A40" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.5" />

      {/* ── MIDDLE ZONE: Provision & Living Spaces ──────── */}
      {/* Horizontal divider */}
      <line x1="10" y1="130" x2="740" y2="130" stroke="#1a2830" strokeWidth="1.2" />

      {/* Left column: Vegetable Room */}
      <rect x="10" y="130" width="148" height="120" fill="#F2F4F0" stroke="#1a2830" strokeWidth="1" />
      <text x="28" y="192" fontSize="8.5" fill="#2a3840" fontWeight="600">VEGETABLE</text>
      <text x="28" y="205" fontSize="8.5" fill="#2a3840" fontWeight="600">ROOM</text>
      {/* Door symbol */}
      <path d="M130,220 Q148,220 148,240" fill="none" stroke="#607880" strokeWidth="0.9" />
      <line x1="130" y1="220" x2="130" y2="248" stroke="#607880" strokeWidth="0.9" />

      {/* Dairy Room */}
      <rect x="158" y="130" width="152" height="120" fill="#F2F4F0" stroke="#1a2830" strokeWidth="1" />
      <line x1="158" y1="130" x2="158" y2="250" stroke="#1a2830" strokeWidth="1.2" />
      <text x="178" y="192" fontSize="8.5" fill="#2a3840" fontWeight="600">DAIRY ROOM</text>
      <path d="M280,220 Q310,220 310,248" fill="none" stroke="#607880" strokeWidth="0.9" />
      <line x1="280" y1="220" x2="280" y2="248" stroke="#607880" strokeWidth="0.9" />

      {/* Meat Room */}
      <rect x="310" y="130" width="160" height="120" fill="#F2F4F0" stroke="#1a2830" strokeWidth="1" />
      <line x1="310" y1="130" x2="310" y2="250" stroke="#1a2830" strokeWidth="1.2" />
      <text x="348" y="192" fontSize="8.5" fill="#2a3840" fontWeight="600">MEAT ROOM</text>
      <path d="M420,220 Q470,220 470,248" fill="none" stroke="#607880" strokeWidth="0.9" />
      <line x1="420" y1="220" x2="420" y2="248" stroke="#607880" strokeWidth="0.9" />

      {/* Right column: upper right piping corridor */}
      <rect x="470" y="130" width="270" height="120" fill="#EEF0EE" stroke="#1a2830" strokeWidth="1" />
      <line x1="470" y1="130" x2="470" y2="250" stroke="#1a2830" strokeWidth="1.2" />
      {/* piping details */}
      <line x1="490" y1="150" x2="730" y2="150" stroke="#607880" strokeWidth="0.7" />
      <line x1="490" y1="165" x2="730" y2="165" stroke="#607880" strokeWidth="0.7" />
      <circle cx="510" cy="157" r="5" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="560" cy="157" r="5" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="620" cy="157" r="5" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="680" cy="157" r="5" fill="none" stroke="#607880" strokeWidth="0.8" />

      {/* ── MIDDLE ZONE 2: Row with Lobby ───────────────── */}
      <line x1="10" y1="250" x2="740" y2="250" stroke="#1a2830" strokeWidth="1.2" />

      {/* Left: Dry Provision Store (tall) */}
      <rect x="10" y="250" width="148" height="320" fill="#F2F4F0" stroke="#1a2830" strokeWidth="1" />
      <text x="28" y="365" fontSize="8.5" fill="#2a3840" fontWeight="600">DRY PROVISION</text>
      <text x="28" y="378" fontSize="8.5" fill="#2a3840" fontWeight="600">STORE</text>
      {/* To Galley arrow */}
      <text x="18" y="545" fontSize="7" fill="#607880" transform="rotate(-90 18 545)">TO GALLEY →</text>

      {/* Center: Lobby */}
      <rect x="158" y="250" width="152" height="90" fill="#EAEEED" stroke="#1a2830" strokeWidth="1" />
      <text x="205" y="300" fontSize="8.5" fill="#2a3840" fontWeight="600">LOBBY</text>
      {/* Door symbols in lobby */}
      <path d="M175,335 Q175,338 172,340" fill="none" stroke="#607880" strokeWidth="0.8" />
      <path d="M250,295 Q258,295 258,303" fill="none" stroke="#607880" strokeWidth="0.8" />
      <line x1="258" y1="295" x2="258" y2="315" stroke="#607880" strokeWidth="0.8" />

      {/* Fish Room */}
      <rect x="158" y="340" width="312" height="130" fill="#EEF2F0" stroke="#1a2830" strokeWidth="1" />
      <line x1="158" y1="340" x2="470" y2="340" stroke="#1a2830" strokeWidth="1.2" />
      <text x="265" y="405" fontSize="8.5" fill="#2a3840" fontWeight="600">FISH ROOM</text>
      {/* Refrigeration pipes */}
      <line x1="175" y1="360" x2="460" y2="360" stroke="#607880" strokeWidth="0.6" strokeDasharray="4 3" opacity="0.5" />
      <line x1="175" y1="440" x2="460" y2="440" stroke="#607880" strokeWidth="0.6" strokeDasharray="4 3" opacity="0.5" />
      <rect x="175" y="370" width="50" height="60" rx="2" fill="#D8E8E4" stroke="#607880" strokeWidth="0.7" />
      <rect x="240" y="370" width="50" height="60" rx="2" fill="#D8E8E4" stroke="#607880" strokeWidth="0.7" />
      <rect x="305" y="370" width="50" height="60" rx="2" fill="#D8E8E4" stroke="#607880" strokeWidth="0.7" />
      <rect x="370" y="370" width="80" height="60" rx="2" fill="#D8E8E4" stroke="#607880" strokeWidth="0.7" />

      {/* Center right: Meat/Service passage */}
      <rect x="310" y="250" width="160" height="90" fill="#F2F4F0" stroke="#1a2830" strokeWidth="1" />
      <line x1="310" y1="250" x2="310" y2="340" stroke="#1a2830" strokeWidth="1.2" />
      {/* Staircase symbol */}
      <rect x="320" y="260" width="50" height="70" fill="none" stroke="#607880" strokeWidth="0.7" />
      <line x1="320" y1="270" x2="370" y2="270" stroke="#607880" strokeWidth="0.5" />
      <line x1="320" y1="280" x2="370" y2="280" stroke="#607880" strokeWidth="0.5" />
      <line x1="320" y1="290" x2="370" y2="290" stroke="#607880" strokeWidth="0.5" />
      <line x1="320" y1="300" x2="370" y2="300" stroke="#607880" strokeWidth="0.5" />
      <line x1="320" y1="310" x2="370" y2="310" stroke="#607880" strokeWidth="0.5" />
      <line x1="320" y1="320" x2="370" y2="320" stroke="#607880" strokeWidth="0.5" />
      <text x="378" y="300" fontSize="7.5" fill="#607880">TO ER</text>

      {/* Right column middle: CSB Room */}
      <rect x="470" y="250" width="270" height="220" fill="#EEF2EE" stroke="#1a2830" strokeWidth="1" />
      <line x1="470" y1="250" x2="470" y2="470" stroke="#1a2830" strokeWidth="1.2" />
      <text x="530" y="365" fontSize="8.5" fill="#2a3840" fontWeight="600">CSB ROOM (P)</text>
      {/* Chemical storage details */}
      <rect x="490" y="270" width="45" height="35" rx="2" fill="#D8E8E0" stroke="#607880" strokeWidth="0.7" />
      <rect x="545" y="270" width="45" height="35" rx="2" fill="#D8E8E0" stroke="#607880" strokeWidth="0.7" />
      <rect x="490" y="320" width="95" height="35" rx="2" fill="#D8E8E0" stroke="#607880" strokeWidth="0.7" />
      <line x1="490" y1="390" x2="720" y2="390" stroke="#607880" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.4" />

      {/* ── BOTTOM ZONE: Engine Changing Room ──────────── */}
      <line x1="10" y1="470" x2="740" y2="470" stroke="#1a2830" strokeWidth="1.2" />
      <rect x="158" y="470" width="312" height="220" fill="#EEF0EE" stroke="#1a2830" strokeWidth="1" />
      <text x="230" y="560" fontSize="8.5" fill="#2a3840" fontWeight="600">ENGINE CHANGING RM</text>
      {/* Engine detail elements */}
      <rect x="175" y="490" width="80" height="120" rx="2" fill="#D8DCE0" stroke="#607880" strokeWidth="0.8" />
      <rect x="178" y="495" width="74" height="12" rx="1" fill="#C0C8D0" stroke="#607880" strokeWidth="0.5" />
      <rect x="178" y="512" width="74" height="12" rx="1" fill="#C0C8D0" stroke="#607880" strokeWidth="0.5" />
      <rect x="178" y="529" width="74" height="12" rx="1" fill="#C0C8D0" stroke="#607880" strokeWidth="0.5" />
      <rect x="178" y="546" width="74" height="12" rx="1" fill="#C0C8D0" stroke="#607880" strokeWidth="0.5" />
      <rect x="178" y="563" width="74" height="12" rx="1" fill="#C0C8D0" stroke="#607880" strokeWidth="0.5" />
      {/* Fire symbol F */}
      <rect x="370" y="590" width="18" height="18" fill="#E8F4EE" stroke="#1A7A40" strokeWidth="0.8" />
      <text x="374" y="602" fontSize="9" fill="#1A7A40" fontWeight="700">F</text>

      {/* Right lower: piping */}
      <rect x="470" y="470" width="270" height="220" fill="#EEF2EE" stroke="#1a2830" strokeWidth="1" />
      <line x1="470" y1="470" x2="470" y2="690" stroke="#1a2830" strokeWidth="1.2" />
      <circle cx="510" cy="520" r="18" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="560" cy="560" r="18" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="510" cy="610" r="14" fill="none" stroke="#607880" strokeWidth="0.8" />
      <circle cx="580" cy="630" r="10" fill="none" stroke="#607880" strokeWidth="0.8" />

      {/* ── SCAN LINE ANIMATION (ambient pulse sweep) ─── */}
      <AnimatedScanLine />

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
            x2="748"
            y2={activeCallout.marker.cy}
            stroke={activeCallout.hazardColor}
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.35"
          />
          <circle cx="748" cy={activeCallout.marker.cy} r="2.5" fill={activeCallout.hazardColor} opacity="0.5" />
        </g>
      )}
    </svg>
  )
}

/* ── Animated scan line (ambient, functional: shows "live scan" state) */
function AnimatedScanLine() {
  const [pos, setPos] = useState(10)
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
        if (next >= 688) dirRef.current = -1
        if (next <= 12) dirRef.current = 1
        return Math.max(12, Math.min(688, next))
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
      x2="740"
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
