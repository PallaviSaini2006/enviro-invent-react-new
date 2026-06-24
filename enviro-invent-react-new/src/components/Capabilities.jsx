import { Reveal, SectionHead } from './Shared.jsx'

const CAPABILITIES = [
  { ref: 'IHM', title: 'IHM Management',          body: 'Maintain a complete, audit-ready Inventory of Hazardous Materials aligned with current regulatory thresholds.' },
  { ref: 'VLI', title: 'Vessel Layout Intelligence',body: "Model your vessel's decks and compartments as a structured, searchable digital layout." },
  { ref: 'HM',  title: 'Hazard Mapping',           body: 'Place every hazardous material on the vessel layout, so its physical location is never in question.' },
  { ref: 'MD',  title: 'MD & SDoC Management',     body: "Centralize Material Declarations and Supplier's Declarations of Conformity with full traceability." },
  { ref: 'VSCP',title: 'VSCP Planning',            body: 'Build and maintain Vessel Specific Cleaning Plans aligned to your hazard inventory and layout.' },
  { ref: 'AUD', title: 'Audit Tracking',           body: "Schedule, document, and follow up on surveys and audits without losing the paper trail." },
  { ref: 'CM',  title: 'Compliance Monitoring',    body: 'See certificate status, upcoming deadlines, and open findings across your fleet at a glance.' },
  { ref: 'SRR', title: 'Recycling Readiness',      body: 'Generate the documentation recycling facilities need for safe, compliant dismantling.' },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-[90px] md:py-[140px] section-green-wash">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <SectionHead
          eyebrow="Capabilities"
          title="Everything compliance teams need, connected."
          body="Eight capabilities, one source of truth — built specifically for the realities of maritime hazardous material management."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-grey-line">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.ref} variant="scale" delay={(i % 4) * 80}>
              <div className="relative border-r border-b border-grey-line p-9 hover:bg-accent-muted transition-colors duration-300 h-full group overflow-hidden">
                {/* Green left accent bar on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-400" />

                <span className="font-mono text-[11px] text-accent font-bold block mb-6 tracking-wider">{cap.ref}</span>
                <h3 className="font-semibold text-[17px] mb-2.5 tracking-tight group-hover:text-accent transition-colors duration-300">{cap.title}</h3>
                <p className="text-[14.5px] text-grey font-light leading-relaxed">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
