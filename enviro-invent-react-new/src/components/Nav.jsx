import { useEffect, useState } from 'react'
import { useScrollProgress } from '../hooks.js'
import logo from '../assets/logo.jpg'

const LINKS = [
  {href: '#home', label:'Home'},
  { href:'#problem', label:'Problem'},
  { href: '#platform', label: 'Platform' },
  { href: '#mapping', label: 'Mapping' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#stakeholders', label: "Who it's for" },
  { href: '#compliance', label: 'Compliance' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick(e, href) {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 76
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md transition-colors duration-300
        ${scrolled ? 'border-b border-grey-line' : 'border-b border-transparent'}`}
      style={{ background: 'rgba(250,250,248,0.82)' }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 flex items-center justify-between h-[76px]">      
        <div className="flex items-center">
          <img src={logo} alt="Enviro Maint" className="h-12 w-auto object-contain"/>
          </div>
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

        <a
          href="#cta"
          onClick={(e) => handleClick(e, '#cta')}
          className="text-[13px] font-medium px-4 py-2 bg-accent text-paper rounded-sm whitespace-nowrap hover:bg-accent-dark transition-colors"
        >
          Request a demo
        </a>
      </div>

      {/* Scroll progress bar — thin green line that fills as the user reads */}
      <div className="h-px w-full bg-transparent">
        <div
          className="h-px bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </nav>
  )
}
