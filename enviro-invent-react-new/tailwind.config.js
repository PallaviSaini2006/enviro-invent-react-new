/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        'ink-soft': '#1A1A1A',
        paper: '#FAFAF8',
        'paper-dim': '#F1F0EC',
        grey: '#6B6B68',
        'grey-line': '#D8D6D0',
        // ── Green system ───────────────────────────────────
        accent:        '#1A7A40',   // vibrant forest green (primary)
        'accent-dark': '#135C30',   // deep green (hover / dark bg)
        'accent-mid':  '#22A052',   // lighter green (highlights on dark bg)
        'accent-muted':'#E4F2EB',   // very light green tint (card bg)
        'accent-wash': '#F0F8F3',   // near-white green wash (section bg)
        'accent-line': '#A8D5B8',   // green border / divider
        // hazard = accent alias (keeps old className references valid)
        hazard: '#1A7A40',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        'draw-hull': {
          to: { strokeDashoffset: '0' },
        },
        'marker-pop': {
          '0%':   { opacity: '0', r: '0' },
          '60%':  { opacity: '1', r: '7' },
          '100%': { opacity: '1', r: '5' },
        },
        'ring-pulse': {
          '0%':   { opacity: '0.6', r: '6' },
          '100%': { opacity: '0', r: '18' },
        },
        'leaf-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-4deg)' },
          '50%':       { transform: 'translateY(-12px) rotate(4deg)' },
        },
        'green-fade-in': {
          '0%':   { opacity: '0', transform: 'scaleX(0)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(26,122,64,0.3)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(26,122,64,0)' },
        },
      },
      animation: {
        'draw-hull':    'draw-hull 2.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
        'marker-pop':   'marker-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ring-pulse':   'ring-pulse 1.8s ease-out infinite',
        'leaf-float':   'leaf-float 4s ease-in-out infinite',
        'green-bar':    'green-fade-in 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-green':  'pulse-green 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
