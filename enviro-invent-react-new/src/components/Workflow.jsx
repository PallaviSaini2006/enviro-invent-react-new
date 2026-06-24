import { Reveal, SectionHead } from './Shared.jsx'

const STEPS = [
  { num: '01', label: 'VESSEL',    title: 'Vessel',               body: "Define the ship's structure, decks, and compartments as the foundation for everything else." },
  { num: '02', label: 'INVENTORY', title: 'Inventory',            body: 'Record every hazardous material present, with quantities, sources, and supporting documentation.' },
  { num: '03', label: 'IDENTIFY',  title: 'Hazard identification',body: 'Classify materials against regulatory thresholds and flag what requires active management.' },
  { num: '04', label: 'LOCATE',    title: 'Location mapping',     body: "Pin every material to its physical position on the vessel's deck plans and general arrangement." },
  { num: '05', label: 'MONITOR',   title: 'Compliance monitoring',body: 'Track audits, surveys, and certificate status continuously against applicable frameworks.' },
  { num: '06', label: 'RECYCLE',   title: 'Recycling readiness',  body: 'Hand off a complete, verified hazard map to recycling facilities for safe, compliant dismantling.' },
]

export default function Workflow() {
  return (
    <section id="workflow" className="bg-ink text-paper py-[90px] md:py-[140px] relative overflow-hidden">

      {/* ── Green glow accents on dark background ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,160,82,0.1) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,122,64,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">
        <SectionHead
          eyebrow="The Workflow"
          title="One platform, one continuous record."
          body="From the moment a material enters the vessel to the day it's recycled, Enviro Invent keeps inventory, location, and compliance status moving together."
          dark
        />

        <div className="flex flex-col md:flex-row md:items-stretch -mx-1 overflow-x-auto pb-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.label} delay={i * 90} className="flex-1 min-w-[160px]">
              <div className="relative px-1 md:pr-7 py-7 md:py-0 group">
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute top-[18px] right-0 w-px h-[60px] bg-[#2C2C2A]" />
                )}
                {i < STEPS.length - 1 && (
                  <span className="md:hidden absolute bottom-0 left-1 right-1 h-px bg-[#2C2C2A]" />
                )}

                {/* Green step number */}
                <span className="font-mono text-[13px] font-bold text-accent-mid mb-1 block">{step.num}</span>
                {/* Green label tag */}
                <span className="font-mono text-[10px] text-[#22A052] mb-3 block tracking-widest uppercase opacity-80">{step.label}</span>

                <h4 className="font-display font-semibold text-lg mb-2.5 tracking-tight group-hover:text-accent-mid transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-[13.5px] text-[#9A9A96] font-light leading-snug max-w-[200px]">
                  {step.body}
                </p>

                {/* Animated green bottom border on hover */}
                <span className="absolute bottom-0 left-1 right-4 h-[2px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 md:block hidden" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Green CTA strip at bottom of Workflow ── */}
        <Reveal delay={600}>
          <div className="mt-16 pt-10 border-t border-[#2C2C2A] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-[#9A9A96] text-sm font-light max-w-[440px]">
                Every step is connected. No data falls through the gaps.
              </p>
            </div>
            <a
              href="#cta"
              className="text-sm font-medium px-6 py-3 bg-accent text-paper rounded-sm hover:bg-accent-dark transition-colors whitespace-nowrap"
            >
              Start your compliance journey →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
