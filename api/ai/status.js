// Vercel Serverless Function: /api/ai/status
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if OpenAI API key is configured via environment variable
  const configured = !!process.env.OPENAI_API_KEY;

  res.json({
    configured,
    keyPreview: configured ? 'sk-•••••••••••' : null
  });
}
