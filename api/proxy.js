// ═══════════════════════════════════════════════════════
// Vercel Serverless Function — proxies all requests to
// Google Apps Script. Solves CORS completely.
// ═══════════════════════════════════════════════════════

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8s_3vSblUAVsPA9fGtntqCn9IVyiuvnQDwyxQhNWXc5S5c4ExTOqIaU0wyML3AVE/exec';

export default async function handler(req, res) {
  // Allow requests from any origin (your domain, localhost etc.)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let response;

    if (req.method === 'GET') {
      // Forward query params to Apps Script
      const params = new URLSearchParams(req.query).toString();
      const url    = `${SCRIPT_URL}${params ? '?' + params : ''}`;
      response = await fetch(url, { redirect: 'follow' });

    } else if (req.method === 'POST') {
      // Forward POST body to Apps Script
      response = await fetch(SCRIPT_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(req.body),
        redirect: 'follow'
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({
      success: false,
      error:   'Proxy error: ' + err.message
    });
  }
}
