import { useReveal } from '../hooks.js'

/**
 * Reveal — wraps children in a div that fades/rises into view on scroll.
 * variant: 'up' (default) | 'left' | 'scale'
 */
export function Reveal({ children, variant = 'up', delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useReveal()
  const base = variant === 'left' ? 'reveal-left' : variant === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <Tag
      ref={ref}
      className={`${base} ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function Eyebrow({ children, dark = false, center = false }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2.5
        ${dark ? 'text-paper-dim' : 'text-accent'}
        ${center ? 'justify-center' : ''}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
        style={{ background: dark ? '#22A052' : '#1A7A40' }}
      />
      {children}
    </p>
  )
}

export function SectionHead({ eyebrow, title, body, dark = false, maxW = 'max-w-[560px]' }) {
  return (
    <div className="max-w-[680px] mb-16 md:mb-[72px]">
      <Reveal>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[32px] md:text-[44px] lg:text-[52px] mt-5">
          {title}
        </h2>
        {/* Green underline accent */}
        <div className="mt-3 h-[3px] w-16 rounded-full" style={{ background: dark ? '#22A052' : '#1A7A40' }} />
      </Reveal>
      <Reveal delay={160}>
        <p className={`mt-5 text-[17px] font-light leading-relaxed ${dark ? 'text-[#9A9A96]' : 'text-grey'} ${maxW}`}>
          {body}
        </p>
      </Reveal>
    </div>
  )
}
