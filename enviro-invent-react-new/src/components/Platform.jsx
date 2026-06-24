import { Reveal, Eyebrow } from './Shared.jsx'

const META = [
  { label: 'Built for', value: 'Ship owners & operators' },
  { label: 'Core function', value: 'IHM & location intelligence' },
  { label: 'Compliance scope', value: 'Hong Kong Convention, EU SRR' },
  { label: 'Lifecycle coverage', value: 'Build → Operation → Recycling' },
]

export default function Platform() {
  return (
    <section id="platform" className="bg-ink text-paper py-[90px] md:py-[140px]">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <Reveal>
          <Eyebrow dark>The Platform</Eyebrow>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-8">
          <Reveal delay={100}>
            <p className="font-display font-semibold leading-[1.2] tracking-tight text-[28px] md:text-[36px] lg:text-[42px]">
              Enviro Maint is <span className="text-[#7A7A76]">not a records archive.</span> It's
              a maritime intelligence platform that connects every hazardous material to{' '}
              <span className="text-[#7A7A76]">its exact place</span> inside your vessel — and
              keeps it that way for the ship's entire life.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col gap-0 pt-2 border-t border-[#2C2C2A]">
              {META.map((item, i) => (
                <div
                  key={item.label}
                  className="flex justify-between font-mono text-[13px] py-[18px] border-b border-[#2C2C2A]"
                >
                  <span className="text-[#7A7A76]">{item.label}</span>
                  <span className="text-paper text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
