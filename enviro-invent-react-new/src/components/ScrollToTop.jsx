import { useState, useEffect } from 'react'

/**
 * ScrollToTop — A sleek floating button that appears after scrolling 300px.
 * Black circle with a green hover state, smooth fade-in/out animation.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollUp}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-ink text-paper
        flex items-center justify-center shadow-lg
        hover:bg-accent hover:-translate-y-1
        transition-all duration-300 group
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      {/* Arrow icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      >
        <path
          d="M8 13V3M3.5 7L8 2.5L12.5 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
