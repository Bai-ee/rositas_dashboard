// Vercel Serverless Function: /api/locations
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization;
  const { accountId } = req.query;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  if (!accountId) {
    return res.status(400).json({ error: 'accountId is required' });
  }

  try {
    const readMask = 'name,title,storefrontAddress,phoneNumbers,websiteUri,regularHours,specialHours,categories,profile,metadata,serviceArea,labels,latlng';
    const url = `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=${readMask}`;

    const response = await fetch(url, {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: error.message });
  }
}
