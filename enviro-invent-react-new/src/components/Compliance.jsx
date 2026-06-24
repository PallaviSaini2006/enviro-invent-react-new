import { Reveal, SectionHead } from './Shared.jsx'

const FRAMEWORKS = [
  { code: 'HKC',    title: 'Hong Kong Convention',        body: 'Safe and environmentally sound ship recycling requirements.' },
  { code: 'IMO',    title: 'IMO Guidelines',              body: 'International standards for hazardous material inventories and survey.' },
  { code: 'BASEL',  title: 'Basel Convention',            body: 'Controls on transboundary movement of hazardous waste.' },
  { code: 'EU SRR', title: 'EU Ship Recycling Regulation',body: 'European requirements for vessel recycling and certification.' },
]

export default function Compliance() {
  return (
    <section id="compliance" className="py-[90px] md:py-[140px]">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <SectionHead
          eyebrow="Global Compliance"
          title="Aligned with the frameworks that govern your fleet."
          body="Enviro Invent is structured around the regulatory bodies that ship owners and recyclers answer to worldwide."
        />

        <Reveal delay={100}>
          {/* ── Green top accent bar ── */}
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-accent via-accent-mid to-transparent mb-12 opacity-70" />

          <div className="border border-accent-line rounded-sm bg-accent-wash py-12 px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FRAMEWORKS.map((fw) => (
                <div key={fw.code} className="group">
                  {/* Green pill code badge */}
                  <span className="green-badge mb-4 inline-flex">{fw.code}</span>
                  <h4 className="font-semibold text-[15px] mb-2 leading-snug group-hover:text-accent transition-colors duration-200">{fw.title}</h4>
                  <p className="text-[13px] text-grey font-light leading-relaxed">{fw.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Green sustainability tagline ── */}
          <div className="mt-10 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            <p className="text-sm text-accent font-mono font-medium tracking-wider uppercase">
              Environmentally sound. Globally recognised. Fully traceable.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
