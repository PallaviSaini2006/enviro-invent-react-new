import { Reveal, SectionHead } from './Shared.jsx'

const STAKEHOLDERS = [
  { name: 'Ship Owners', body: 'Maintain a single, accurate hazardous material record across an entire fleet — ready for any survey, sale, or recycling decision.' },
  { name: 'Surveyors', body: 'Walk onto a vessel with a precise map of what to inspect and where, instead of reconciling outdated paperwork on arrival.' },
  { name: 'Maritime Consultants', body: 'Advise clients with confidence using a platform that keeps inventory, location, and compliance status in sync.' },
  { name: 'Classification Societies', body: 'Review certification-ready documentation that\'s already structured to the frameworks you audit against.' },
  { name: 'Recycling Facilities', body: 'Receive a verified hazard map before a vessel arrives, so dismantling can be planned safely from day one.' },
]

export default function Stakeholders() {
  return (
    <section id="stakeholders" className="bg-paper-dim py-[90px] md:py-[140px]">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <SectionHead
          eyebrow="Who It's For"
          title="Built around how maritime compliance actually works."
          body="Different stakeholders need different views of the same vessel record. Enviro Maint gives each one exactly what they need."
        />

        <div className="mt-2">
          {STAKEHOLDERS.map((s, i) => (
            <Reveal key={s.name} variant="left" delay={i * 90}>
              <div
                className={`grid md:grid-cols-[280px_1fr] gap-2 md:gap-12 py-9 border-t border-grey-line items-baseline group
                  ${i === STAKEHOLDERS.length - 1 ? 'border-b' : ''}`}
              >
                <span className="font-display font-semibold text-[22px] tracking-tight group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                  {s.name}
                </span>
                <p className="text-[15.5px] text-grey font-light leading-relaxed max-w-[560px]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
