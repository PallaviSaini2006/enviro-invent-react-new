import { useEffect, useRef, useState } from 'react'

/**
 * ShipHero — full-bleed hero background animation.
 *
 * Desktop: iframe canvas animation + parallax scroll effect
 * Mobile:  lightweight static gradient (no iframe, no rAF, no battery drain)
 */
export default function ShipHero({ containerRef }) {
  const wrapRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)

  // Track mobile/desktop on resize
  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth < 1024) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Parallax — desktop only
  useEffect(() => {
    if (isMobile) return
    const hero = containerRef?.current
    if (!hero || !wrapRef.current) return

    function onScroll() {
      const scrollY = window.scrollY
      const heroBottom = hero.offsetTop + hero.offsetHeight
      if (scrollY > heroBottom) return
      wrapRef.current.style.transform = `translateY(${scrollY * 0.42}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef, isMobile])

  /* ── Mobile: static, lightweight gradient background ── */
  if (isMobile) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(160deg, #f0f8f3 0%, #e8f4ed 30%, #f5fbf7 60%, #FAFAF8 100%)',
        }}
      >
        {/* Subtle green radial glow top-left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 55% at 15% 20%, rgba(26,122,64,0.10) 0%, transparent 70%)',
          }}
        />
        {/* Soft wave pattern at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, rgba(168,213,184,0.22) 0%, transparent 100%)',
          }}
        />
        {/* Bottom fade into site bg */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '30%',
            background: 'linear-gradient(to top, #FAFAF8 0%, transparent 100%)',
          }}
        />
      </div>
    )
  }

  /* ── Desktop: full iframe animation + parallax ── */
  return (
    <div
      ref={wrapRef}
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: '-8%', height: '115%', willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* ── Animated ship iframe ── */}
      <iframe
        src="/ship-bwg.html"
        title="Ship diagram background"
        scrolling="no"
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        style={{ pointerEvents: 'none', opacity: 0.82 }}
      />

      {/* ── Gradient overlays: blend all four edges into site bg #FAFAF8 ── */}

      {/* Top — strong fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '38%',
          background: 'linear-gradient(to bottom, #FAFAF8 0%, #FAFAF8 20%, rgba(250,250,248,0.7) 60%, transparent 100%)',
        }}
      />

      {/* Bottom — strong fade */}
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

      {/* ── Subtle green tint ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 55% 50%, rgba(26,122,64,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
