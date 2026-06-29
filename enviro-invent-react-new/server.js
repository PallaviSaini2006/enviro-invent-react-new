import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { buildDemoRequestEmail } from './src/emailTemplate.js'

// Robust manual .env loader fallback to guarantee env vars are loaded across all Node platforms & spawners
try {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8')
    envConfig.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=')
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim()
        }
      }
    })
  }
} catch (err) {
  // Silent fallback
}

const app = express()
const PORT = 3001

const SMTP_HOST = process.env.SMTP_HOST || 'enviro-maint.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465
const SMTP_USER = process.env.SMTP_USER || 'noreply-demo@enviro-maint.com'
const SMTP_PASS = process.env.SMTP_PASS || 'Alfa@460#2024%'
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'demo@enviro-maint.com'

// Configure nodemailer SMTP transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))
app.use(express.json())

// Browser-friendly status page at http://localhost:3001
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Enviro Maint — Email API</title>
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
    <div class="logo">Enviro<span>Maint</span></div>
    <p class="subtitle">Email API Server is running.<br/>Listening on port <strong style="color:#a3c9b0">3001</strong></p>
    <div class="endpoint">
      <span class="method">POST</span>
      <div class="path">/api/send-email</div>
      <div class="desc">Accepts { name, email, company, fleetSize?, message? } — sends a branded demo-request email via SMTP (${SMTP_USER}).</div>
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
    const info = await transporter.sendMail({
      from: `"Enviro Maint" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Demo request — ${company}`,
      html: buildDemoRequestEmail({ name, email, company, fleetSize, message }),
    })

    console.log(`✅ Email sent to ${RECIPIENT_EMAIL} (messageId: ${info.messageId})`)
    return res.json({ success: true, id: info.messageId })
  } catch (err) {
    console.error('SMTP error sending email:', err)
    return res.status(500).json({ error: err.message || 'Failed to send email via SMTP.' })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 Enviro Maint email API running at http://localhost:${PORT}`)
  console.log(`📧 Configured SMTP User: ${SMTP_USER} (${SMTP_HOST}:${SMTP_PORT})`)
})
