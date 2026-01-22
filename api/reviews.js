// Vercel Serverless Function: /api/reviews
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization;
  const { accountId, locationId, reviewId, action } = req.query;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    // Handle reply actions
    if (reviewId && action === 'reply') {
      const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`;

      if (req.method === 'PUT') {
        const { comment } = req.body;
        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment })
        });
        const data = await response.json();
        if (!response.ok) return res.status(response.status).json(data);
        return res.json(data);
      }

      if (req.method === 'DELETE') {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          const data = await response.json();
          return res.status(response.status).json(data);
        }
        return res.json({ success: true });
      }
    }

    // GET reviews list
    if (req.method === 'GET') {
      const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
      const response = await fetch(url, {
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error with reviews:', error);
    res.status(500).json({ error: error.message });
  }
}
