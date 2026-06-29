import { useEffect, useState } from 'react'
import { useScrollProgress } from '../hooks.js'
import logo from '../assets/logo.jpg'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#problem', label: 'Problem' },
  { href: '#platform', label: 'Platform' },
  { href: '#mapping', label: 'Mapping' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#stakeholders', label: "Who it's for" },
  { href: '#compliance', label: 'Compliance' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleClick(e, href) {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 76
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md transition-colors duration-300
          ${scrolled ? 'border-b border-grey-line' : 'border-b border-transparent'}`}
        style={{ background: 'rgba(250,250,248,0.92)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-12 flex items-center justify-between h-[76px]">
          <div className="flex items-center">
            <img src={logo} alt="Enviro Maint" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-9 text-sm text-grey">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative group hover:text-ink transition-colors"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              onClick={(e) => handleClick(e, '#cta')}
              className="text-[13px] font-medium px-4 py-2 bg-accent text-paper rounded-sm whitespace-nowrap hover:bg-accent-dark transition-colors"
            >
              Request a demo
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-sm hover:bg-accent-muted transition-colors"
            >
              <span
                className={`block h-[1.5px] w-5 bg-ink rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-ink rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-ink rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="h-px w-full bg-transparent">
          <div
            className="h-px bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </nav>

      {/* ── Mobile drawer overlay ── */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-[76px] left-0 right-0 bg-paper border-b border-accent-line shadow-lg transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="flex items-center justify-between py-3.5 border-b border-grey-line text-[15px] text-grey hover:text-ink hover:pl-2 transition-all duration-200 group"
                style={{ transitionDelay: menuOpen ? `${i * 30}ms` : '0ms' }}
              >
                {link.label}
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
            <a
              href="#cta"
              onClick={(e) => handleClick(e, '#cta')}
              className="mt-4 w-full text-center text-sm font-medium px-6 py-3.5 bg-accent text-paper rounded-sm hover:bg-accent-dark transition-colors"
            >
              Request a demo
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
