import logo from '../assets/Logo.jpg'

export default function Footer() {
  return (
    <footer className="border-t border-grey-line">
      {/* ── Green eco banner strip ── */}
      <div className="bg-accent py-3 px-6">
        <p className="max-w-site mx-auto text-center text-paper text-xs font-mono tracking-wider uppercase opacity-90 flex items-center justify-center gap-2">
          <span aria-hidden="true">🌿</span>
          Built for a safer, greener maritime future — compliant recycling starts with better data
          <span aria-hidden="true">🌿</span>
        </p>
      </div>

      <div className="py-6 bg-paper">
        <div className="max-w-site mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-grey text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Enviro Maint" className="h-10 w-auto object-contain"/>
            <span className="hidden sm:block text-[11px] font-mono text-accent uppercase tracking-widest">Eco Maritime Intelligence</span>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-5">
            <a href="#home"         className="hover:text-accent transition-colors">Home</a>
            <a href="#problem"      className="hover:text-accent transition-colors">Problem</a>
            <a href="#platform"     className="hover:text-accent transition-colors">Platform</a>
            <a href="#capabilities" className="hover:text-accent transition-colors">Capabilities</a>
            <a href="#compliance"   className="hover:text-accent transition-colors">Compliance</a>
            <a href="#cta"          className="hover:text-accent transition-colors">Contact</a>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div>© 2026 Enviro Maint</div>
            <span className="text-[10px] font-mono text-accent-line uppercase tracking-wider">Greener Oceans. Safer Ships.</span>
          </div>
        </div>

        {/* ── Privacy / legal links ── */}
        <div className="max-w-site mx-auto px-6 md:px-12 mt-4 pt-4 border-t border-grey-line">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#privacy" className="text-[11px] font-mono text-grey hover:text-accent transition-colors uppercase tracking-wider">Privacy Policy</a>
            <a href="#privacy" className="text-[11px] font-mono text-grey hover:text-accent transition-colors uppercase tracking-wider">Cookie Policy</a>
            <a href="#privacy" className="text-[11px] font-mono text-grey hover:text-accent transition-colors uppercase tracking-wider">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
