import { Reveal, Eyebrow } from './Shared.jsx'

export default function Mission() {
  return (
    <section id="mission" className="bg-ink text-paper text-center py-[90px] md:py-[140px] relative overflow-hidden">

      {/* ── Green glow accents on dark background ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,160,82,0.12) 0%, transparent 65%)' }}
      />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-[840px] mx-auto">
          <Reveal>
            <div className="mb-8 flex justify-center">
              <Eyebrow dark>Our Mission</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* Green decorative quote border */}
            <div className="relative border-l-4 border-accent pl-8 text-left py-2">
              <p className="font-display font-semibold leading-[1.22] tracking-tight text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px]">
                Safer vessels. Greater environmental accountability.{' '}
                <span className="text-accent-mid">Smarter recycling</span> — through digital compliance
                intelligence that knows exactly where every hazard lives.
              </p>
            </div>
          </Reveal>

          {/* ── Green bottom tagline ── */}
          <Reveal delay={250}>
            <div className="mt-12 flex justify-start gap-8">
              {['Zero harm to workers', 'Traceable end-of-life', 'Greener oceans'].map((tag) => (
                <span key={tag} className="text-[12px] font-mono text-accent-mid uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mid flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
