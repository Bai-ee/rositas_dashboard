import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for the frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ACCOUNTS API
// ============================================
app.get('/api/accounts', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// LOCATIONS API
// ============================================
app.get('/api/accounts/:accountId/locations', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

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
});

// ============================================
// REVIEWS API
// ============================================
app.get('/api/accounts/:accountId/locations/:locationId/reviews', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
    console.log('Fetching reviews from:', url);

    const response = await fetch(url, {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log('Reviews response:', response.status);

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reply to a review
app.post('/api/accounts/:accountId/locations/:locationId/reviews/:reviewId/reply', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId, reviewId } = req.params;
  const { comment } = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`;
    console.log('Replying to review:', url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error replying to review:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a review reply
app.delete('/api/accounts/:accountId/locations/:locationId/reviews/:reviewId/reply', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId, reviewId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting review reply:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// POSTS API (Local Posts)
// ============================================
app.get('/api/accounts/:accountId/locations/:locationId/posts', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;
    console.log('Fetching posts from:', url);

    const response = await fetch(url, {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log('Posts response:', response.status);

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new post
app.post('/api/accounts/:accountId/locations/:locationId/posts', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  const postData = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;
    console.log('Creating post:', url, postData);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a post
app.patch('/api/accounts/:accountId/locations/:locationId/posts/:postId', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId, postId } = req.params;
  const postData = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts/${postId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
app.delete('/api/accounts/:accountId/locations/:locationId/posts/:postId', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId, postId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts/${postId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PERFORMANCE/METRICS API
// ============================================
app.post('/api/locations/:locationId/metrics', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { locationId } = req.params;
  const { startDate, endDate } = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    // Use the Business Profile Performance API
    // The API expects the full resource name format: locations/{locationId}
    const url = `https://businessprofileperformance.googleapis.com/v1/locations/${locationId}:fetchMultiDailyMetricsTimeSeries`;

    const requestBody = {
      dailyRange: {
        startDate: startDate || getDateDaysAgo(28),
        endDate: endDate || getDateDaysAgo(1)
      },
      dailyMetrics: [
        'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
        'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
        'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
        'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
        'BUSINESS_DIRECTION_REQUESTS',
        'CALL_CLICKS',
        'WEBSITE_CLICKS'
      ]
    };

    console.log('Fetching metrics from:', url);
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    // Get response as text first to handle non-JSON responses
    const responseText = await response.text();
    console.log('Metrics response status:', response.status);
    console.log('Metrics response (first 500 chars):', responseText.substring(0, 500));

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse metrics response as JSON:', parseError.message);
      // If it's HTML, extract useful info
      if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
        return res.status(response.status || 500).json({
          error: {
            message: 'API returned HTML instead of JSON. This usually means the API endpoint is incorrect or not accessible.',
            code: response.status,
            hint: 'Verify that the Business Profile Performance API is enabled in Google Cloud Console'
          }
        });
      }
      return res.status(500).json({ error: { message: 'Invalid response from Google API: ' + responseText.substring(0, 200) } });
    }

    console.log('Metrics parsed data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error('Metrics API error:', data);
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: { message: error.message } });
  }
});

// Get search keywords
app.post('/api/locations/:locationId/searchkeywords', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { locationId } = req.params;
  const { startDate, endDate } = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://businessprofileperformance.googleapis.com/v1/locations/${locationId}/searchkeywords/impressions/monthly`;

    console.log('Fetching search keywords from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log('Search keywords response:', response.status);

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching search keywords:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// MEDIA API
// ============================================
app.get('/api/accounts/:accountId/locations/:locationId/media', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`;

    const response = await fetch(url, {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload media
app.post('/api/accounts/:accountId/locations/:locationId/media', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  const mediaData = req.body;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData)
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// QUESTIONS & ANSWERS API
// ============================================
app.get('/api/accounts/:accountId/locations/:locationId/questions', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { accountId, locationId } = req.params;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/questions`;

    const response = await fetch(url, {
      headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================
function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`========================================\n`);
});
