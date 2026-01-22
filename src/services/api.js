const API_BASE = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('No access token set');
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || data.error || 'API request failed');
    }

    return data;
  }

  // ============================================
  // ACCOUNTS
  // ============================================
  async getAccounts() {
    return this.request('/accounts');
  }

  // ============================================
  // LOCATIONS
  // ============================================
  async getLocations(accountId) {
    return this.request(`/accounts/${accountId}/locations`);
  }

  // ============================================
  // REVIEWS
  // ============================================
  async getReviews(accountId, locationId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews`);
  }

  async replyToReview(accountId, locationId, reviewId, comment) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  }

  async deleteReviewReply(accountId, locationId, reviewId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // POSTS
  // ============================================
  async getPosts(accountId, locationId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts`);
  }

  async createPost(accountId, locationId, postData) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts`, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(accountId, locationId, postId, postData) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(accountId, locationId, postId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // METRICS / PERFORMANCE
  // ============================================
  async getMetrics(locationId, startDate, endDate) {
    // Don't throw on metrics errors - return the error response instead
    if (!this.token) {
      return { error: { message: 'No access token set' } };
    }

    try {
      const response = await fetch(`${API_BASE}/locations/${locationId}/metrics`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      // Get response as text first to handle non-JSON responses
      const responseText = await response.text();

      // Try to parse as JSON
      try {
        const data = JSON.parse(responseText);
        return data;
      } catch (parseError) {
        // If response starts with HTML, it means the API returned an error page
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
          return {
            error: {
              message: 'The Business Profile Performance API is not enabled or accessible. Please enable it in Google Cloud Console.',
              hint: 'Go to Google Cloud Console → APIs & Services → Library → Search for "Business Profile Performance API" and enable it.',
              code: 'API_NOT_ENABLED'
            }
          };
        }
        return { error: { message: 'Invalid response from API: ' + responseText.substring(0, 100) } };
      }
    } catch (err) {
      return { error: { message: err.message } };
    }
  }

  async getSearchKeywords(locationId) {
    return this.request(`/locations/${locationId}/searchkeywords`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  // ============================================
  // MEDIA
  // ============================================
  async getMedia(accountId, locationId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/media`);
  }

  async uploadMedia(accountId, locationId, mediaData) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/media`, {
      method: 'POST',
      body: JSON.stringify(mediaData),
    });
  }

  // ============================================
  // QUESTIONS
  // ============================================
  async getQuestions(accountId, locationId) {
    return this.request(`/accounts/${accountId}/locations/${locationId}/questions`);
  }
}

export const api = new ApiService();
export default api;
