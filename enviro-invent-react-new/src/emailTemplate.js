/**
 * Enviro Invent — branded HTML email template for demo requests.
 *
 * @param {{ name: string, email: string, company: string, fleetSize?: string, message?: string }} data
 * @returns {string} Full HTML email body
 */
export function buildDemoRequestEmail({ name, email, company, fleetSize, message }) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const rows = [
    { label: 'Full Name',   value: name },
    { label: 'Work Email',  value: `<a href="mailto:${email}" style="color:#1a6b4a;text-decoration:none;">${email}</a>` },
    { label: 'Company',     value: company },
    { label: 'Fleet Size',  value: fleetSize || '—' },
  ]

  const tableRows = rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:10px 16px;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;border-bottom:1px solid #f0f0f0;width:140px;vertical-align:top;">
          ${label}
        </td>
        <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0f0f0;vertical-align:top;">
          ${value}
        </td>
      </tr>`
    )
    .join('')

  const messageBlock = message
    ? `
    <tr>
      <td style="padding:10px 16px;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;border-bottom:1px solid #f0f0f0;width:140px;vertical-align:top;">
        Message
      </td>
      <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0f0f0;vertical-align:top;line-height:1.6;">
        ${message.replace(/\n/g, '<br/>')}
      </td>
    </tr>`
    : ''

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Demo Request — Enviro Invent</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0d1f17;border-radius:8px 8px 0 0;padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#1a6b4a;border-radius:6px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                          <span style="color:#ffffff;font-size:18px;font-weight:700;line-height:36px;">E</span>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">Enviro Invent</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;background:#1a6b4a22;color:#4ade80;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;padding:5px 12px;border-radius:100px;border:1px solid #1a6b4a;">
                      Demo Request
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Green strip -->
          <tr>
            <td style="background:#1a6b4a;padding:3px 0;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-radius:0 0 8px 8px;border:1px solid #e8e8e4;border-top:none;">
              <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#0d1f17;letter-spacing:-0.02em;">
                New Demo Request 🌿
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#666;line-height:1.6;">
                <strong>${name}</strong> from <strong>${company}</strong> submitted a request on <span style="color:#1a6b4a;">${date}</span>.
              </p>

              <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 24px;"/>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #f0f0f0;border-radius:6px;overflow:hidden;">
                ${tableRows}
                ${messageBlock}
              </table>

              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="background:#0d1f17;border-radius:6px;">
                    <a href="mailto:${email}?subject=Re: Your Enviro Invent demo request"
                       style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:-0.01em;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
                Sent by the Enviro Invent contact form.<br/>
                © ${new Date().getFullYear()} Enviro Invent · Location Intelligence for Hazmat Compliance
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`.trim()
}
