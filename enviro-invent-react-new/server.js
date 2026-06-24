import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { buildDemoRequestEmail } from './src/emailTemplate.js'

// Load environment variables from .env file (native in Node.js 20.6.0+)
try {
  process.loadEnvFile()
} catch (err) {
  // Silent fallback if .env file is missing or handled externally
}

const app = express()
const PORT = 3001

// ⚠️  Keep this key secret — loaded from process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY || '')

const RECIPIENT_EMAIL = 'pallavisaini.ps2006@gmail.com'

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))
app.use(express.json())

// Browser-friendly status page at http://localhost:3001
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Enviro Invent — Email API</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1f17;min-height:100vh;display:flex;align-items:center;justify-content:center;color:#fff}
    .card{background:#142a1e;border:1px solid #1f3d2a;border-radius:16px;padding:48px 56px;max-width:480px;width:90%;text-align:center}
    .badge{display:inline-flex;align-items:center;gap:8px;background:#0a2a18;border:1px solid #1a6b4a;border-radius:100px;padding:6px 16px;font-size:12px;color:#4ade80;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:28px}
    .dot{width:8px;height:8px;border-radius:50%;background:#4ade80;animation:pulse 1.5s ease-in-out infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
    .logo{font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.03em;margin-bottom:8px}
    .logo span{color:#4ade80}
    .subtitle{font-size:14px;color:#6b8a76;margin-bottom:32px;line-height:1.6}
    .endpoint{background:#0d1f17;border:1px solid #1f3d2a;border-radius:10px;padding:20px 24px;text-align:left;margin-bottom:20px}
    .method{display:inline-block;background:#1a6b4a;color:#fff;font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.08em;padding:3px 8px;border-radius:4px;margin-bottom:10px}
    .path{font-family:monospace;font-size:14px;color:#a3c9b0;margin-bottom:6px}
    .desc{font-size:12px;color:#6b8a76}
    .footer{font-size:12px;color:#3a5a44;margin-top:24px}
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><span class="dot"></span> Server Online</div>
    <div class="logo">Enviro<span>Invent</span></div>
    <p class="subtitle">Email API Server is running.<br/>Listening on port <strong style="color:#a3c9b0">3001</strong></p>
    <div class="endpoint">
      <span class="method">POST</span>
      <div class="path">/api/send-email</div>
      <div class="desc">Accepts { name, email, company, fleetSize?, message? } — sends a branded demo-request email via Resend.</div>
    </div>
    <div class="footer">Connected to → ${RECIPIENT_EMAIL}</div>
  </div>
</body>
</html>`)
})

app.post('/api/send-email', async (req, res) => {
  const { name, email, company, fleetSize, message } = req.body

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: RECIPIENT_EMAIL,
      subject: `Demo request — ${company}`,
      html: buildDemoRequestEmail({ name, email, company, fleetSize, message }),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log(`✅ Email sent to ${RECIPIENT_EMAIL} (id: ${data.id})`)
    return res.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 Enviro Invent email API running at http://localhost:${PORT}`)
})
