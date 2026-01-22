// Vercel Serverless Function: /api/metrics
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const { locationId } = req.query;
  const { startDate, endDate } = req.body;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    const start = startDate || getDateDaysAgo(28);
    const end = endDate || getDateDaysAgo(1);

    const params = new URLSearchParams();
    params.append('dailyRange.startDate.year', start.year);
    params.append('dailyRange.startDate.month', start.month);
    params.append('dailyRange.startDate.day', start.day);
    params.append('dailyRange.endDate.year', end.year);
    params.append('dailyRange.endDate.month', end.month);
    params.append('dailyRange.endDate.day', end.day);

    const metrics = [
      'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
      'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
      'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
      'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
      'BUSINESS_DIRECTION_REQUESTS',
      'CALL_CLICKS',
      'WEBSITE_CLICKS'
    ];
    metrics.forEach(metric => params.append('dailyMetrics', metric));

    const url = `https://businessprofileperformance.googleapis.com/v1/locations/${locationId}:fetchMultiDailyMetricsTimeSeries?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': authHeader }
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
        return res.status(response.status || 500).json({
          error: {
            message: 'API returned HTML instead of JSON. Verify Business Profile Performance API is enabled.',
            code: response.status
          }
        });
      }
      return res.status(500).json({ error: { message: 'Invalid response from Google API' } });
    }

    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: { message: error.message } });
  }
}

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}
