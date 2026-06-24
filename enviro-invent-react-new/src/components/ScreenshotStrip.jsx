import { useRef, useEffect, useState } from 'react'

/* ── Data: rotating screenshots in a marquee ─────────────────────────── */
const MARQUEE_IMAGES = [
  { src: '/product-dashboard.png',    label: 'Fleet Dashboard' },
  { src: '/product-ships.png',        label: 'Vessel Registry' },
  { src: '/product-ship-dashboard.png', label: 'Ship Intelligence' },
  { src: '/product-location.png',     label: 'Location Mapping' },
]

/* ═══════════════════════════════════════════════════════════════════════
   SCREENSHOT STRIP — horizontal scrolling gallery with parallax
   Sits between sections to break up text-heavy areas
   ═══════════════════════════════════════════════════════════════════════ */
export default function ScreenshotStrip() {
  const stripRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let raf
    function tick() {
      setOffset((prev) => (prev + 0.5) % (MARQUEE_IMAGES.length * 360))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Duplicate for seamless loop
  const items = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES]

  return (
    <section
      ref={stripRef}
      className="py-12 bg-paper-dim overflow-hidden relative"
      aria-label="Product screenshots marquee"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #F1F0EC, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #F1F0EC, transparent)' }} />

      {/* Scrolling strip */}
      <div
        className="flex gap-6 will-change-transform"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {items.map((img, i) => (
          <div
            key={`${img.label}-${i}`}
            className="flex-shrink-0 relative group"
          >
            <div className="w-[340px] md:w-[420px] rounded-lg overflow-hidden border border-grey-line shadow-sm
              hover:shadow-md hover:border-accent-line transition-all duration-300 hover:-translate-y-1">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            {/* Label below */}
            <div className="mt-3 flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[11px] text-grey uppercase tracking-widest group-hover:text-accent transition-colors">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
