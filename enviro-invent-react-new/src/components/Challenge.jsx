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

export default function Challenge() {
  return (
    <section id="problem" className="bg-paper-dim py-[90px] md:py-[140px]">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          <SectionHead
            eyebrow="The Problem"
            title="Hazardous materials don't announce themselves."
            body="Every vessel carries asbestos, PCBs, ozone-depleting substances, and heavy metals built into its structure. Regulations require organizations to know what these materials are — but rarely do they know exactly where they sit inside the ship."
          />

          <div className="flex flex-col mt-2">
            {CHALLENGES.map((item, i) => (
              <Reveal key={item.ref} delay={i * 100}>
                <div
                  className={`grid grid-cols-[64px_1fr] gap-5 py-7 border-t border-grey-line
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
      </div>
    </section>
  )
}
