import { useState, useEffect } from 'react'

/**
 * CookieBanner — GDPR-friendly cookie consent banner.
 * Shows once on first visit, remembers preference in localStorage.
 * Slim, non-intrusive design matching the site aesthetic.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't already made a choice
    const consent = localStorage.getItem('em-cookie-consent')
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem('em-cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('em-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[200] transition-all duration-500 ease-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className="max-w-site mx-auto px-4 pb-4">
        <div
          className="bg-ink text-paper rounded-lg border border-white/10 shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          role="alert"
          aria-live="polite"
        >
          {/* Text */}
          <p className="text-[13px] font-light leading-relaxed flex-1">
            We use essential cookies to keep this site running smoothly.
            By continuing to browse, you agree to our{' '}
            <button
              onClick={() => window.open('#privacy', '_self')}
              className="underline text-accent-mid hover:text-accent transition-colors font-medium"
            >
              Privacy Policy
            </button>
            .
          </p>

          {/* Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={accept}
              className="text-[12px] font-semibold px-5 py-2 bg-accent text-paper rounded-md hover:bg-accent-dark transition-colors"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="text-[12px] font-medium px-5 py-2 bg-white/10 text-white/70 rounded-md hover:bg-white/20 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
