import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to the returned ref.
 * Once the element crosses the threshold, `inView` flips to true permanently
 * (elements don't re-hide on scroll-up, matching premium-site conventions).
 *
 * @param {number} threshold - fraction of element visible before triggering
 * @param {string} rootMargin - shrink/grow the trigger viewport
 */
export function useReveal(threshold = 0.15, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion: show immediately, skip observer entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}

/**
 * useScrollProgress — returns 0–1 representing how far the user has
 * scrolled through the full document. Used for the nav progress bar.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

/**
 * useParallax — returns a translateY value driven by scroll position,
 * for subtle parallax effects. `speed` < 1 moves slower than scroll (recedes),
 * speed > 1 moves faster (advances).
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ticking = false
    function handleScroll() {
      if (!ref.current) return
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = ref.current.getBoundingClientRect()
          const center = rect.top + rect.height / 2 - window.innerHeight / 2
          setOffset(center * speed * -1)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}
