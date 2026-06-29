import { useState } from 'react'
import { Reveal, Eyebrow } from './Shared.jsx'

const API_URL = 'http://localhost:3001/api/send-email'

const TRUST_SIGNALS = [
  { label: 'IHM Ready', icon: '✓' },
  { label: 'HKC Compliant', icon: '✓' },
  { label: 'EU SRR Aligned', icon: '✓' },
  { label: 'IMO Guidelines', icon: '✓' },
]

export default function Cta() {
  const [form, setForm] = useState({ name: '', email: '', company: '', fleetSize: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | sent | error
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.company.trim()) next.company = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('sent')
        setForm({ name: '', email: '', company: '', fleetSize: '', message: '' })
      }
    } catch {
      setServerError('Could not reach the server. Please try again later.')
      setStatus('error')
    }
  }

  return (
    <section id="cta" className="pt-[100px] md:pt-[160px] pb-[100px] md:pb-[160px] section-green-wash relative overflow-hidden">
      {/* Green ambient glow */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(26,122,64,0.09) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(34,160,82,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-site mx-auto px-6 md:px-12 relative z-10">

        {/* ── Two-column layout on desktop — stacks on mobile ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left col: copy + trust signals ── */}
          <div>
            <Reveal>
              <Eyebrow>Get Started</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[32px] sm:text-[42px] md:text-[52px] mt-5">
                Bring location intelligence to your hazardous material program.
              </h2>
              <div className="mt-3 h-[3px] w-16 rounded-full" style={{ background: '#1A7A40' }} />
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-[17px] text-grey font-light leading-relaxed max-w-[440px]">
                See how Enviro Invent maps, tracks, and manages compliance across your fleet — from
                first inventory to final recycling.
              </p>
            </Reveal>

            {/* ── Compliance trust signals ── */}
            <Reveal delay={240}>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {TRUST_SIGNALS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2.5 text-[13px] font-mono text-grey"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent-muted border border-accent-line flex items-center justify-center flex-shrink-0">
                      <span className="text-accent text-[10px] font-bold">{s.icon}</span>
                    </span>
                    {s.label}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ── What you get callout ── */}
            <Reveal delay={300}>
              <div className="mt-10 border-l-4 border-accent pl-5 py-1">
                <p className="text-[13px] font-mono text-grey uppercase tracking-wider mb-1">What to expect</p>
                <ul className="text-[15px] text-ink-soft space-y-1.5 font-light">
                  <li>→ 30-min tailored walkthrough</li>
                  <li>→ Response within one business day</li>
                  <li>→ No commitment required</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── Right col: form ── */}
          <Reveal delay={200}>
            <div className="bg-paper border border-accent-line rounded-sm p-6 sm:p-8 shadow-sm">
              {status === 'sent' ? (
                /* ── Success state ── */
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-muted mb-4">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-display font-semibold text-xl mb-2">Request sent!</p>
                  <p className="text-grey text-sm font-light max-w-[320px] mx-auto">
                    We've received your demo request and will be in touch within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-5 text-sm font-medium underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-5">Request a demo</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Full name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      autoComplete="name"
                      disabled={status === 'loading'}
                    />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      autoComplete="email"
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <Field
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      error={errors.company}
                      autoComplete="organization"
                      disabled={status === 'loading'}
                    />
                    <Field
                      label="Fleet size (optional)"
                      name="fleetSize"
                      value={form.fleetSize}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="font-mono text-[11px] uppercase tracking-wide text-grey block mb-1.5">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      disabled={status === 'loading'}
                      className="w-full bg-paper border border-grey-line rounded-sm px-3.5 py-2.5 text-sm focus:border-ink outline-none transition-colors resize-none disabled:opacity-50"
                      placeholder="Tell us about your fleet or compliance needs"
                    />
                  </div>

                  {/* Server error */}
                  {status === 'error' && serverError && (
                    <p className="mt-4 text-sm text-ink-soft font-mono bg-paper-dim border border-grey-line rounded px-3 py-2">
                      ⚠ {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-7 py-[15px] bg-accent text-paper rounded-sm hover:bg-accent-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Request a demo →'
                    )}
                  </button>
                  <p className="mt-3 text-xs text-grey font-light text-center">
                    We'll respond within one business day.
                  </p>
                </form>
              )}
            </div>

            {/* Prefer email */}
            <p className="mt-5 text-sm text-grey font-light">
              Prefer email directly?{' '}
              <a href="mailto:demo@enviro-maint.com" className="underline text-ink">
                demo@enviro-maint.com
              </a>
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', autoComplete, disabled }) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-wide text-grey block mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full bg-paper border rounded-sm px-3.5 py-2.5 text-sm outline-none transition-colors disabled:opacity-50
          ${error ? 'border-accent' : 'border-grey-line focus:border-accent'}`}
      />
      {error && <p className="text-hazard text-xs mt-1 font-mono">{error}</p>}
    </div>
  )
}
