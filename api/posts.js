// Vercel Serverless Function: /api/posts
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization;
  const { accountId, locationId, postId } = req.query;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    const baseUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;

    // GET posts list
    if (req.method === 'GET') {
      const response = await fetch(baseUrl, {
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.json(data);
    }

    // POST create new post
    if (req.method === 'POST') {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.json(data);
    }

    // PATCH update post
    if (req.method === 'PATCH' && postId) {
      const response = await fetch(`${baseUrl}/${postId}`, {
        method: 'PATCH',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json(data);
      return res.json(data);
    }

    // DELETE post
    if (req.method === 'DELETE' && postId) {
      const response = await fetch(`${baseUrl}/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const data = await response.json();
        return res.status(response.status).json(data);
      }
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error with posts:', error);
    res.status(500).json({ error: error.message });
  }
}
