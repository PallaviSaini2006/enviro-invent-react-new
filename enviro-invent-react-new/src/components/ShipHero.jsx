import { useEffect, useRef } from 'react'

/**
 * ShipHero — full-bleed hero background animation.
 *
 * Design goals:
 *  • Fills 100% of the hero section absolutely (z-index 0)
 *  • Parallax: background scrolls at ~40% speed of page so it "stays"
 *    as the user scrolls — classic big-brand hero effect
 *  • Colors re-mapped to site palette (paper-white bg, grey hull, green accents)
 *  • Five gradient overlays blend all edges into the site background (#FAFAF8)
 *  • pointer-events: none — never blocks clicks
 */
export default function ShipHero({ containerRef }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const hero = containerRef?.current
    if (!hero || !wrapRef.current) return

    function onScroll() {
      const scrollY = window.scrollY
      const heroBottom = hero.offsetTop + hero.offsetHeight

      // Only apply parallax while hero is in view
      if (scrollY > heroBottom) return

      // Move ship container DOWN at 40% scroll speed → visually scrolls slower
      wrapRef.current.style.transform = `translateY(${scrollY * 0.42}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // apply initial state
    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return (
    // This outer div is absolute-positioned by Hero.jsx (position:absolute, inset-0)
    // We give it extra height so the parallax has room to move without showing a gap
    <div
      ref={wrapRef}
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: '-8%', height: '115%', willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* ── Animated ship iframe ── */}
      <iframe
        src="/ship-hero-light.html"
        title="Ship diagram background"
        scrolling="no"
        className="absolute inset-0 w-full h-full border-0"
        style={{ pointerEvents: 'none', opacity: 0.82 }}
      />

      {/* ── Gradient overlays: blend all four edges into site bg #FAFAF8 ── */}

      {/* Top — strong fade (nav area and hero heading must be on clean white) */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '38%',
          background: 'linear-gradient(to bottom, #FAFAF8 0%, #FAFAF8 20%, rgba(250,250,248,0.7) 60%, transparent 100%)',
        }}
      />

      {/* Bottom — strong fade to white (transition into next section) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '45%',
          background: 'linear-gradient(to top, #FAFAF8 0%, #FAFAF8 12%, rgba(250,250,248,0.75) 55%, transparent 100%)',
        }}
      />

      {/* Left fade */}
      <div
        className="absolute top-0 left-0 bottom-0 pointer-events-none z-10"
        style={{
          width: '12%',
          background: 'linear-gradient(to right, #FAFAF8 0%, rgba(250,250,248,0.6) 60%, transparent 100%)',
        }}
      />

      {/* Right fade */}
      <div
        className="absolute top-0 right-0 bottom-0 pointer-events-none z-10"
        style={{
          width: '12%',
          background: 'linear-gradient(to left, #FAFAF8 0%, rgba(250,250,248,0.6) 60%, transparent 100%)',
        }}
      />

      {/* ── Subtle green tint to tie into eco identity ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 55% 50%, rgba(26,122,64,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
