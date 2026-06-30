import { useEffect, useState, useRef } from 'react'
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const progress = useScrollProgress()

  useEffect(() => {
    function onScroll() {
      // Ramp from 0 → 1 over the first 1200px of scroll
      const p = Math.min(window.scrollY / 1200, 1)
      setScrollProgress(p)

      // Scroll spy — find which section is currently in view
      const sectionIds = LINKS.map(l => l.href.replace('#', ''))
      let current = '#home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Section is "active" when its top is above 40% of viewport
        if (rect.top <= window.innerHeight * 0.4) {
          current = '#' + id
        }
      }
      setActiveSection(current)
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
        className="fixed top-0 left-0 right-0 z-[100] transition-[border] duration-300"
        style={{
          background: `rgba(0, 0, 0, ${0.15 + scrollProgress * 0.85})`,
          backdropFilter: `blur(${scrollProgress * 16}px) saturate(${1 + scrollProgress * 0.4})`,
          WebkitBackdropFilter: `blur(${scrollProgress * 16}px) saturate(${1 + scrollProgress * 0.4})`,
          boxShadow: scrollProgress > 0.3
            ? `0 1px 24px rgba(0,0,0,${scrollProgress * 0.35}), 0 1px 0 rgba(26,122,64,${scrollProgress * 0.15})`
            : 'none',
          borderBottom: `1px solid rgba(255,255,255,${scrollProgress * 0.06})`,
        }}
      >
        <div className="max-w-site mx-auto px-6 md:px-12 flex items-center justify-between h-[76px]">
          <div className="flex items-center">
            <img src={logo} alt="Enviro Maint" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-8 text-sm">
            {LINKS.map((link) => {
              const isActive = activeSection === link.href
              // Interpolate from black → white as user scrolls
              const r = Math.round(10 + 245 * scrollProgress)
              const g = Math.round(10 + 245 * scrollProgress)
              const b = Math.round(10 + 245 * scrollProgress)
              const inactiveColor = `rgba(${r}, ${g}, ${b}, 0.85)`
              const activeColor = `rgb(${r}, ${g}, ${b})`
              // Green neon glow — always visible, eye-catching
              const textGlow = '0 0 6px rgba(34,160,82,0.9), 0 0 14px rgba(34,160,82,0.5), 0 0 30px rgba(26,122,64,0.25)'
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative group transition-all duration-300 tracking-wide font-light hover:!text-white hover:tracking-wider"
                  style={{ color: isActive ? activeColor : inactiveColor, textShadow: textGlow }}
                >
                  {link.label}
                  {/* Green underline — always visible when active, hover otherwise */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300
                      ${isActive ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-70'}`}
                    style={{ background: 'linear-gradient(90deg, #1A7A40, #22A052)', boxShadow: isActive ? '0 0 8px rgba(34,160,82,0.8)' : '0 0 6px rgba(34,160,82,0.7)' }}
                  />
                </a>
              )
            })}
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
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-sm hover:bg-white/10 transition-colors"
            >
              <span
                className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}
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

        {/* Drawer panel — dark theme */}
        <div
          className={`absolute top-[76px] left-0 right-0 border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{ background: '#000000' }}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {LINKS.map((link, i) => {
              const isActive = activeSection === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`flex items-center justify-between py-3.5 border-b border-white/10 text-[15px] transition-all duration-200 group
                    ${isActive ? 'text-white pl-2' : 'text-white/75 hover:text-white hover:pl-2'}`}
                  style={{ transitionDelay: menuOpen ? `${i * 30}ms` : '0ms' }}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                    {link.label}
                  </span>
                  <span className={`text-accent transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
                </a>
              )
            })}
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
