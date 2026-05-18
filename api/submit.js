// Vercel serverless function — all forms POST here
// Verifies Cloudflare Turnstile, then sends via Resend
// Never exposes API keys to the client

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    name, email, company, investment,
    'cf-turnstile-response': token
  } = req.body;

  // ── Cloudflare Turnstile verification ──────────────────────────────────────
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret:   process.env.TURNSTILE_SECRET,
      response: token
    })
  });
  const { success } = await verify.json();
  if (!success) return res.status(400).json({ error: 'Turnstile verification failed' });

  // ── Send lead email via Resend ─────────────────────────────────────────────
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type':  'application/json'
    },
    body: JSON.stringify({
      from:    'ZOLCUZ Studios <hello@zolcuz.com>',
      to:      process.env.CONTACT_EMAIL,
      subject: `New lead: ${company}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Investment:</strong> ${investment}</p>
      `
    })
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }

  return res.status(200).json({ success: true });
}
