import { useEffect, useRef, useState } from 'react'
import { Reveal, Eyebrow } from './Shared.jsx'

const STATS = [
  { value: 7200, suffix: '+', label: 'HazMat locations mapped' },
  { value: 4, suffix: '', label: 'Major frameworks covered' },
  { value: 100, suffix: '%', label: 'IHM-ready documentation' },
]

/**
 * useCountUp — Animates a number from 0 to `target` over `duration`ms
 * when `start` becomes true. Uses easeOutExpo for a satisfying deceleration.
 */
function useCountUp(target, start, duration = 2000) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return
    const t0 = performance.now()

    function tick(now) {
      const elapsed = now - t0
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo — fast start, slow finish
      const ease = 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(target * ease))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, start, duration])

  return value
}

function StatCard({ value, suffix, label, delay, inView }) {
  const count = useCountUp(value, inView, 2200)

  return (
    <Reveal delay={delay}>
      <div className="group text-center py-8 px-4 rounded-sm border border-grey-line bg-paper hover:border-accent-line hover:bg-accent-muted/30 transition-all duration-500 cursor-default">
        <div className="font-display font-extrabold text-[42px] md:text-[52px] leading-none tracking-tight text-ink group-hover:text-accent transition-colors duration-500">
          {count.toLocaleString()}
          <span className="text-accent">{suffix}</span>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
          {label}
        </p>
      </div>
    </Reveal>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex justify-center mb-10">
            <Eyebrow>By the Numbers</Eyebrow>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 120}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
