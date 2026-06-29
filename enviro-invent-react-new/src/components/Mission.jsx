import { Reveal, Eyebrow } from './Shared.jsx'

const PILLARS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Zero harm to workers',
    body: 'Every hazard located before it becomes a threat.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    label: 'Traceable end-of-life',
    body: 'Full material lineage from build to final recycling.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Greener oceans',
    body: 'Sustainable maritime practices, measurably enforced.',
  },
]

export default function Mission() {
  return (
    <section id="mission" className="bg-ink text-paper py-[90px] md:py-[140px] relative overflow-hidden">

      {/* ── Layered background glows ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(34,160,82,0.18) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(26,122,64,0.14) 0%, transparent 65%)' }}
      />

      {/* ── Subtle grid texture overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">

        {/* ── Section Header — left-aligned ── */}
        <div className="max-w-[820px]">
          <Reveal>
            <Eyebrow dark>Our Mission</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[32px] md:text-[44px] lg:text-[52px] mt-5">
              Built for a future where <span className="text-accent-mid">every hazard</span> is known, mapped, and managed.
            </h2>
            <div className="mt-3 h-[3px] w-16 rounded-full bg-accent" />
          </Reveal>

          <Reveal delay={160}>
            {/* Green decorative quote border */}
            <div className="relative border-l-4 border-accent pl-8 py-2 mt-8">
              <p className="font-display font-semibold leading-[1.22] tracking-tight text-[20px] sm:text-[26px] md:text-[30px] text-paper-dim">
                Safer vessels. Greater environmental accountability.{' '}
                <span className="text-accent-mid">Smarter recycling</span> — through digital compliance
                intelligence that knows exactly where every hazard lives.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Mission Pillars ── */}
        <Reveal delay={250}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.label}
                className="group relative border border-white/10 rounded-sm p-6 hover:border-accent/40 transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.06]"
              >
                {/* Top-left accent corner */}
                <div className="absolute top-0 left-0 w-6 h-[2px] bg-accent rounded-full" />
                <div className="absolute top-0 left-0 w-[2px] h-6 bg-accent rounded-full" />

                <div className="text-accent-mid mb-4">{pillar.icon}</div>
                <h4 className="font-semibold text-[14px] uppercase tracking-widest font-mono text-accent-mid mb-2">
                  {pillar.label}
                </h4>
                <p className="text-[14px] text-[#9A9A96] font-light leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Bottom commitment line ── */}
        <Reveal delay={350}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="w-8 h-px bg-accent flex-shrink-0" />
            <p className="text-sm text-accent font-mono font-medium tracking-wider uppercase">
              Environmentally sound · Globally compliant · Human-first design
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
