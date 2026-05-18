// Vercel serverless function — all forms POST here
// TODO: implement in conversion-and-forms.md session
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // TODO: validate Turnstile token, validate fields, send via Resend
  return res.status(501).json({ error: 'Not yet implemented' });
}
