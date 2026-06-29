import { Reveal, SectionHead } from './Shared.jsx'

const CHALLENGES = [
  {
    ref: '01',
    title: 'Records without location',
    body: 'Inventories list materials by type and quantity, but disconnect them from the physical spaces where surveyors and recyclers actually need to find them.',
  },
  {
    ref: '02',
    title: 'Fragmented documentation',
    body: "Material Declarations, Supplier's Declarations of Conformity, and survey reports live in separate files, spreadsheets, and inboxes across different teams.",
  },
  {
    ref: '03',
    title: 'Compliance that drifts',
    body: "As vessels are modified, repaired, and re-equipped over decades of service, hazardous material records fall out of sync with the ship's true condition.",
  },
  {
    ref: '04',
    title: 'Recycling without a map',
    body: "At end of life, recycling facilities inherit incomplete pictures of what's onboard and where — raising risk for workers and the environment alike.",
  },
]

const REGULATIONS = [
  {
    code: 'EU SRR',
    year: '2024',
    color: '#1A7A40',
    title: 'EU Ship Recycling Regulation — Art. 12 IHM mandate',
    body: 'All EU-flagged vessels and ships calling at EU ports must maintain a verified Inventory of Hazardous Materials. As of 2024, ships must carry an IHM Part I certified by an authorised classification society or recycling authority.',
    badge: 'In force',
  },
  {
    code: 'HKC',
    year: '2025',
    color: '#22A052',
    title: 'Hong Kong Convention — Entered into force Jun 2025',
    body: 'The IMO\'s Hong Kong Convention became binding in June 2025. Signatory states must ensure ships flying their flag carry a current IHM and that recycling facilities meet minimum safety and environmental standards.',
    badge: 'Active',
  },
  {
    code: 'IMO MEPC',
    year: 'Ongoing',
    color: '#1A7A40',
    title: 'IMO MEPC — Biannual compliance reviews',
    body: 'The Marine Environment Protection Committee reviews and tightens IHM and waste management obligations each session. MEPC 82 (2024) introduced enhanced reporting requirements for hazardous material surveys.',
    badge: 'Evolving',
  },
  {
    code: 'BASEL',
    year: '2023',
    color: '#22A052',
    title: 'Basel Convention — Amendment B to Annex IX',
    body: 'The 2023 Basel Amendment tightened controls on transboundary movement of ship waste, requiring exporting countries to confirm that destination recycling facilities meet equivalent environmental and safety standards.',
    badge: 'Amended',
  },
]

export default function Challenge() {
  return (
    <section id="problem" className="bg-paper-dim py-[90px] md:py-[140px]">
      <div className="max-w-site mx-auto px-6 md:px-12">

        {/* ── Top grid: problem description + challenge list ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <SectionHead
            eyebrow="The Problem"
            title="Hazardous materials don't announce themselves."
            body="Every vessel carries asbestos, PCBs, ozone-depleting substances, and heavy metals built into its structure. Regulations require organizations to know what these materials are — but rarely do they know exactly where they sit inside the ship."
          />

          <div className="flex flex-col mt-2">
            {CHALLENGES.map((item, i) => (
              <Reveal key={item.ref} delay={i * 100}>
                <div
                  className={`grid grid-cols-[52px_1fr] gap-5 py-7 border-t border-grey-line
                    ${i === CHALLENGES.length - 1 ? 'border-b' : ''}`}
                >
                  <span className="font-mono text-xs text-hazard pt-0.5">{item.ref}</span>
                  <div>
                    <h3 className="font-semibold text-[17px] mb-2">{item.title}</h3>
                    <p className="text-[15px] text-grey font-light leading-relaxed max-w-[420px]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Regulatory landscape block ── */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  Current Regulatory Landscape
                </p>
                <h3 className="font-display font-bold text-[26px] sm:text-[32px] md:text-[36px] leading-[1.1] tracking-tight max-w-[520px]">
                  The rules are tightening. <span className="text-accent">Right now.</span>
                </h3>
              </div>
              <p className="text-[14px] text-grey font-light max-w-[280px] sm:text-right">
                Four major frameworks are actively reshaping what ship owners and recyclers must document and prove.
              </p>
            </div>
          </Reveal>

          {/* Green top gradient bar */}
          <Reveal delay={80}>
            <div className="h-px w-full bg-gradient-to-r from-accent via-accent-mid to-transparent mb-8 opacity-60" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REGULATIONS.map((reg, i) => (
              <Reveal key={reg.code} delay={i * 80}>
                <div className="group relative border border-grey-line rounded-sm p-6 bg-paper hover:border-accent-line hover:shadow-sm transition-all duration-300 overflow-hidden">
                  {/* Corner accent */}
                  <div
                    className="absolute top-0 left-0 w-10 h-[2px] rounded-full opacity-80 group-hover:w-16 transition-all duration-300"
                    style={{ background: reg.color }}
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-4 mt-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-sm border"
                      style={{
                        color: reg.color,
                        borderColor: `${reg.color}40`,
                        background: `${reg.color}0D`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: reg.color }}
                      />
                      {reg.code}
                    </span>
                    <div className="text-right">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-grey">{reg.year}</span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wide font-medium"
                        style={{ color: reg.color }}
                      >
                        {reg.badge}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-[15px] leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                    {reg.title}
                  </h4>
                  <p className="text-[13px] text-grey font-light leading-relaxed">
                    {reg.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Urgency callout ── */}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 border border-accent-line rounded-sm px-6 py-5 bg-accent-wash">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-muted border border-accent-line flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[14px] text-ink">Non-compliance carries real consequences.</p>
                <p className="text-[13px] text-grey font-light mt-0.5">
                  Port-state detention, trading restrictions, and recycling facility rejection are the most immediate penalties under HKC and EU SRR for fleets without verified IHMs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
