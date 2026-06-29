/**
 * Enviro Maint — branded HTML email template for demo requests.
 *
 * @param {{ name: string, email: string, company: string, fleetSize?: string, message?: string }} data
 * @returns {string} Full HTML email body
 */
export function buildDemoRequestEmail({ name, email, company, fleetSize, message }) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  const copyYear = new Date().getFullYear()

  const rows = [
    { label: 'Full Name',  value: name },
    { label: 'Work Email', value: `<a href="mailto:${email}" style="color:#20b14b;text-decoration:none;">${email}</a>` },
    { label: 'Company',    value: company },
    { label: 'Fleet Size', value: fleetSize || '—' },
  ]

  const tableRows = rows
    .map(({ label, value }) => `
      <tr>
        <td style="padding:10px 16px;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;border-bottom:1px solid #e5e7eb;width:140px;vertical-align:top;background:#f8faf9;">
          ${label}
        </td>
        <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #e5e7eb;vertical-align:top;">
          ${value}
        </td>
      </tr>`)
    .join('')

  const messageBlock = message
    ? `
      <tr>
        <td style="padding:10px 16px;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;width:140px;vertical-align:top;background:#f8faf9;">
          Message
        </td>
        <td style="padding:10px 16px;font-size:14px;color:#1a1a1a;vertical-align:top;line-height:22px;">
          ${message.replace(/\n/g, '<br/>')}
        </td>
      </tr>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Demo Request</title>
</head>
<body style="margin:0;background:#f3f5f7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:30px 15px;">
<table width="650" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e5e7eb;">

  <!-- Header -->
  <tr><td style="border-top:5px solid #20b14b;border-bottom:1px solid #e5e7eb;padding:22px 30px;">
    <table width="100%"><tr>
      <td style="font-size:38px;font-weight:bold;color:#1f2937;">ENVIRO MAINT</td>
      <td align="right" style="font-size:22px;color:#555;">Demo Request</td>
    </tr></table>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:35px;color:#333;line-height:24px;">

    <p style="margin:0 0 6px;font-size:20px;font-weight:bold;color:#1f2937;">New Demo Request</p>
    <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:22px;">
      <b>${name}</b> has submitted a demo request on <span style="color:#20b14b;">${date}</span>.
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px;"/>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-collapse:collapse;">
      ${tableRows}
      ${messageBlock}
    </table>

    <table cellpadding="0" cellspacing="0" style="margin-top:25px;">
      <tr>
        <td>
          <a href="mailto:${email}?subject=Re: Your Enviro Maint demo request"
             style="background:#20b14b;color:#fff;text-decoration:none;padding:13px 24px;border-radius:6px;font-size:14px;font-weight:bold;display:inline-block;">
            Reply to ${name} &rarr;
          </a>
        </td>
      </tr>
    </table>

    <p style="margin-top:30px;font-size:13px;color:#888;">
      This email was sent by the Enviro Maint contact form. Please do not reply directly to this message.
    </p>

  </td></tr>

  <!-- Copyright -->
  <tr><td style="padding:15px;text-align:center;color:#888;border-top:3px solid #20b14b;">
    &copy; ${copyYear} <a href="https://www.alfathread.com" target="_blank" style="color:#000000;text-decoration:none;font-weight:bold;">ALFA THREAD</a>. All rights reserved.
  </td></tr>

</table>
</td></tr></table>
</body>
</html>`.trim()
}
