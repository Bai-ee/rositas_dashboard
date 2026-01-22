// Vercel Serverless Function: /api/health
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
}
