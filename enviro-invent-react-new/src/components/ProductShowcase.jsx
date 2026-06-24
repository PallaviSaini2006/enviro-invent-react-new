import { useState, useEffect, useRef, useCallback } from 'react'
import { Reveal, SectionHead, Eyebrow } from './Shared.jsx'

/* ── Screenshot data ─────────────────────────────────────────────────── */
const SCREENSHOTS = [
  {
    id: 'dashboard',
    src: '/product-dashboard.png',
    title: 'Fleet Dashboard',
    subtitle: 'Real-time fleet intelligence at a glance',
    description: 'Monitor active vessels, IHM readiness, total inventory points, and purchase order status across your entire fleet — all from one screen.',
    stats: [
      { label: 'Active Vessels', value: '78' },
      { label: 'IHM Ready', value: '52' },
      { label: 'Inventory Points', value: '254' },
    ],
  },
  {
    id: 'ships',
    src: '/product-ships.png',
    title: 'Vessel Registry',
    subtitle: 'Every ship. Every detail. One place.',
    description: 'Browse, filter, and manage your complete vessel portfolio with real-time compliance status, IHM class tracking, and survey readiness indicators.',
    stats: [
      { label: 'Registered', value: '104' },
      { label: 'Ship Types', value: '6+' },
      { label: 'Compliance Rate', value: '96%' },
    ],
  },
  {
    id: 'ship-dashboard',
    src: '/product-ship-dashboard.png',
    title: 'Ship Intelligence',
    subtitle: 'Deep dive into any vessel',
    description: 'Access IHM certificates, hazmat inventory breakdowns, PO scan results, and downloadable reports — everything a surveyor or operator needs.',
    stats: [
      { label: 'Certificates', value: '2' },
      { label: 'Reports', value: '4+' },
      { label: 'Hazmat Items', value: '18' },
    ],
  },
  {
    id: 'location',
    src: '/product-location.png',
    title: 'Location Mapping',
    subtitle: 'Pin hazards to their exact position',
    description: 'Interactive deck plans with drag-and-drop inventory points. See exactly where every hazardous material lives onboard, with full material breakdowns.',
    stats: [
      { label: 'Check Points', value: '32' },
      { label: 'Materials', value: '7' },
      { label: 'Accuracy', value: 'Deck-level' },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════════
   MAIN SHOWCASE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)

  // Auto-rotate unless hovering
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SCREENSHOTS.length)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!isHovering) startTimer()
    return () => clearInterval(timerRef.current)
  }, [isHovering, startTimer])

  const current = SCREENSHOTS[active]

  return (
    <section
      id="product"
      className="bg-ink text-paper py-[90px] md:py-[140px] relative overflow-hidden"
    >
      {/* ── Ambient green glows ── */}
      <div
        aria-hidden="true"
        className="absolute top-[-100px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,160,82,0.08) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,122,64,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        {/* ── Section Header ── */}
        <SectionHead
          eyebrow="The Product"
          title="See Enviro Maint in action."
          body="Four views, one platform. From fleet-wide dashboards to deck-level hazard pins — explore the system built for maritime compliance."
          dark
        />

        {/* ── Main showcase area ── */}
        <div className="mt-14 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Screenshot viewer ── */}
          <Reveal delay={100}>
            <div
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Glowing border container */}
              <div className="relative rounded-lg overflow-hidden border border-[#2C2C2A] bg-[#111]">
                {/* Green glow top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] z-20"
                  style={{ background: 'linear-gradient(90deg, transparent, #1A7A40, #22A052, #1A7A40, transparent)' }}
                />

                {/* ── Toolbar simulation ── */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] border-b border-[#2C2C2A]">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-4 font-mono text-[11px] text-[#6B6B68] tracking-wider">
                    enviro-maint.com — {current.title}
                  </span>
                  <span className="ml-auto">
                    <LiveDot />
                  </span>
                </div>

                {/* ── Screenshot with perspective tilt ── */}
                <ScreenshotViewer
                  src={current.src}
                  alt={current.title}
                  isHovering={isHovering}
                />
              </div>

              {/* ── Floating stats cards ── */}
              <div className="absolute -bottom-5 left-4 right-4 flex justify-center gap-3 z-30">
                {current.stats.map((stat, i) => (
                  <div
                    key={`${current.id}-${stat.label}`}
                    className="bg-[#111] border border-[#2C2C2A] rounded-md px-4 py-2.5 text-center backdrop-blur-sm
                      transform transition-all duration-500 hover:-translate-y-1 hover:border-accent"
                    style={{
                      animationDelay: `${i * 120}ms`,
                      animation: 'fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
                      opacity: 0,
                    }}
                  >
                    <span className="block text-accent font-display font-bold text-lg leading-none">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] font-mono text-[#6B6B68] mt-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: Info panel + navigation ── */}
          <Reveal delay={200}>
            <div className="flex flex-col pt-2">
              {/* Progress indicator */}
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[11px] text-accent-mid tracking-widest">
                  {String(active + 1).padStart(2, '0')} / {String(SCREENSHOTS.length).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-[#2C2C2A] relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-accent transition-all duration-500 ease-out"
                    style={{ width: `${((active + 1) / SCREENSHOTS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Active screenshot info */}
              <h3 className="font-display font-bold text-[28px] md:text-[34px] tracking-tight leading-tight mb-2">
                {current.title}
              </h3>
              <p className="text-accent-mid text-sm font-mono mb-4 tracking-wide">
                {current.subtitle}
              </p>
              <p className="text-[#9A9A96] text-[15px] font-light leading-relaxed mb-10 max-w-[340px]">
                {current.description}
              </p>

              {/* ── Tab buttons ── */}
              <div className="flex flex-col gap-0 border-t border-[#2C2C2A]">
                {SCREENSHOTS.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => { setActive(i); startTimer() }}
                    className={`flex items-center gap-4 text-left py-4 border-b border-[#2C2C2A] group transition-all duration-300
                      ${i === active ? 'pl-3' : 'pl-0 hover:pl-2'}`}
                  >
                    {/* Active indicator */}
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300
                        ${i === active ? 'bg-accent scale-100' : 'bg-[#2C2C2A] scale-75 group-hover:bg-accent-mid group-hover:scale-100'}`}
                    />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-widest flex-shrink-0 transition-colors duration-300
                        ${i === active ? 'text-accent' : 'text-[#6B6B68] group-hover:text-accent-mid'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[15px] font-medium tracking-tight transition-colors duration-300
                        ${i === active ? 'text-paper' : 'text-[#6B6B68] group-hover:text-paper'}`}
                    >
                      {item.title}
                    </span>

                    {/* Auto-progress bar for active tab */}
                    {i === active && !isHovering && (
                      <span className="ml-auto w-16 h-[3px] bg-[#2C2C2A] rounded-full overflow-hidden">
                        <span
                          className="block h-full bg-accent rounded-full"
                          style={{ animation: 'progressFill 5s linear forwards' }}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}

/* ── Screenshot viewer with perspective tilt on mouse move ──────────── */
function ScreenshotViewer({ src, alt, isHovering }) {
  const imgRef = useRef(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')

  function handleMouseMove(e) {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`)
  }

  function handleMouseLeave() {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
  }

  return (
    <div
      ref={imgRef}
      className="relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block transition-transform duration-300 ease-out"
        style={{ transform }}
        loading="lazy"
      />

      {/* Subtle animated scan line overlay */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(26,122,64,0.03) 50%, transparent 100%)',
            animation: 'scanDown 2.5s linear infinite',
          }}
        />
      )}

      <style>{`
        @keyframes scanDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}

/* ── Live indicator dot ────────────────────────────────────────────── */
function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-2 h-2 rounded-full bg-accent"
        style={{ animation: 'livePulse 2s ease-in-out infinite' }}
      />
      <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Live</span>
    </span>
  )
}
