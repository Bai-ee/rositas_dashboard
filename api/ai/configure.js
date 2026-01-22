// Vercel Serverless Function: /api/ai/configure
// Note: On Vercel, API keys must be set via Environment Variables in the dashboard
// This endpoint provides guidance for Vercel users

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // On Vercel, we can't dynamically set environment variables
  // The key must be configured in Vercel Dashboard → Settings → Environment Variables
  if (process.env.OPENAI_API_KEY) {
    return res.json({
      success: true,
      keyPreview: 'sk-•••••••••••',
      message: 'OpenAI API key is configured via Vercel environment variables.'
    });
  }

  return res.status(400).json({
    success: false,
    error: 'On Vercel, please set OPENAI_API_KEY in your Vercel Dashboard → Settings → Environment Variables, then redeploy.',
    isVercel: true
  });
}
