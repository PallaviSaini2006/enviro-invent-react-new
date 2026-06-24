import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════════════
   SECTION DIVIDER — Animated circuit-line separator
   A glowing green energy pulse travels along a tech-inspired path,
   with a center diamond node and side labels.
   ═══════════════════════════════════════════════════════════════════════ */
export default function SectionDivider({ fromLabel = 'Platform', toLabel = 'Product' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-ink relative overflow-hidden select-none"
      style={{ height: '120px' }}
      aria-hidden="true"
    >
      {/* ── The SVG divider line ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <defs>
          {/* Gradient for the static line */}
          <linearGradient id="divLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#2C2C2A" />
            <stop offset="50%" stopColor="#3A3A38" />
            <stop offset="85%" stopColor="#2C2C2A" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filter for the energy pulse */}
          <filter id="divGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated energy pulse gradient */}
          <linearGradient id="pulseGrad">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#1A7A40" />
            <stop offset="50%" stopColor="#22A052" />
            <stop offset="60%" stopColor="#1A7A40" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* ── Main horizontal path (with angled kinks for visual interest) ── */}
        <path
          d="M 0,60 L 200,60 L 230,40 L 350,40 L 380,60 L 540,60 L 560,48 L 600,48 L 600,48 L 640,48 L 660,60 L 820,60 L 850,40 L 970,40 L 1000,60 L 1200,60"
          fill="none"
          stroke="url(#divLineGrad)"
          strokeWidth="1"
          className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* ── Secondary parallel lines (subtle depth) ── */}
        <path
          d="M 100,60 L 200,60 L 230,40 L 350,40 L 380,60 L 540,60"
          fill="none"
          stroke="#2C2C2A"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          opacity="0.4"
          transform="translate(0, 8)"
          className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-40' : 'opacity-0'}`}
        />
        <path
          d="M 660,60 L 820,60 L 850,40 L 970,40 L 1000,60 L 1100,60"
          fill="none"
          stroke="#2C2C2A"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          opacity="0.4"
          transform="translate(0, 8)"
          className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-40' : 'opacity-0'}`}
        />

        {/* ── Tick marks along the path ── */}
        {[200, 350, 540, 660, 850, 1000].map((x) => (
          <line
            key={x}
            x1={x} y1="55" x2={x} y2="65"
            stroke="#2C2C2A"
            strokeWidth="1"
            className={`transition-opacity duration-500 ${visible ? 'opacity-60' : 'opacity-0'}`}
          />
        ))}

        {/* ── Center diamond node ── */}
        <g
          transform="translate(600, 48)"
          className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Outer glow ring */}
          <circle r="16" fill="none" stroke="#1A7A40" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.08;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Diamond shape */}
          <rect
            x="-6" y="-6" width="12" height="12"
            fill="#0A0A0A"
            stroke="#1A7A40"
            strokeWidth="1.2"
            transform="rotate(45)"
          />
          {/* Inner glowing dot */}
          <circle r="2.5" fill="#22A052">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── Energy pulse traveling left to right ── */}
        {visible && (
          <circle r="3" fill="#22A052" filter="url(#divGlow)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 0,60 L 200,60 L 230,40 L 350,40 L 380,60 L 540,60 L 560,48 L 600,48 L 600,48 L 640,48 L 660,60 L 820,60 L 850,40 L 970,40 L 1000,60 L 1200,60"
            />
            <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
          </circle>
        )}

        {/* ── Second pulse (offset timing, dimmer) ── */}
        {visible && (
          <circle r="2" fill="#1A7A40" filter="url(#divGlow)" opacity="0.6">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
              path="M 1200,60 L 1000,60 L 970,40 L 850,40 L 820,60 L 660,60 L 640,48 L 600,48 L 600,48 L 560,48 L 540,60 L 380,60 L 350,40 L 230,40 L 200,60 L 0,60"
            />
            <animate attributeName="opacity" values="0;0.6;0.6;0.6;0" dur="4s" repeatCount="indefinite" begin="2s" />
          </circle>
        )}

        {/* ── Small node dots at kink points ── */}
        {[
          [230, 40], [350, 40], [380, 60], [540, 60],
          [660, 60], [820, 60], [850, 40], [970, 40],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r="2"
            fill="#0A0A0A"
            stroke="#2C2C2A"
            strokeWidth="1"
            className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: `${400 + i * 80}ms` }}
          />
        ))}
      </svg>

      {/* ── Text labels flanking the center ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-24 md:gap-40">
          <span
            className={`font-mono text-[10px] text-[#4A4A48] uppercase tracking-[0.25em] transition-all duration-700 delay-700
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
          >
            {fromLabel} ↑
          </span>
          <span
            className={`font-mono text-[10px] text-[#4A4A48] uppercase tracking-[0.25em] transition-all duration-700 delay-700
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          >
            ↓ {toLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
