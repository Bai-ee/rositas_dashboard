// Use localhost for development, relative path for Vercel production
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.host;
    // If on localhost, use the Express server
    if (host.includes('localhost')) {
      return 'http://localhost:3001/api';
    }
  }
  // On Vercel, use relative path to serverless functions
  return '/api';
};

const API_BASE = getApiBase();

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
    // Support both local Express (path params) and Vercel (query params)
    if (this.isVercel()) {
      return this.request(`/locations?accountId=${accountId}`);
    }
    return this.request(`/accounts/${accountId}/locations`);
  }

  // ============================================
  // REVIEWS
  // ============================================
  async getReviews(accountId, locationId) {
    if (this.isVercel()) {
      return this.request(`/reviews?accountId=${accountId}&locationId=${locationId}`);
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews`);
  }

  async replyToReview(accountId, locationId, reviewId, comment) {
    if (this.isVercel()) {
      return this.request(`/reviews?accountId=${accountId}&locationId=${locationId}&reviewId=${reviewId}&action=reply`, {
        method: 'PUT',
        body: JSON.stringify({ comment }),
      });
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  }

  async deleteReviewReply(accountId, locationId, reviewId) {
    if (this.isVercel()) {
      return this.request(`/reviews?accountId=${accountId}&locationId=${locationId}&reviewId=${reviewId}&action=reply`, {
        method: 'DELETE',
      });
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // POSTS
  // ============================================
  async getPosts(accountId, locationId) {
    if (this.isVercel()) {
      return this.request(`/posts?accountId=${accountId}&locationId=${locationId}`);
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts`);
  }

  async createPost(accountId, locationId, postData) {
    if (this.isVercel()) {
      return this.request(`/posts?accountId=${accountId}&locationId=${locationId}`, {
        method: 'POST',
        body: JSON.stringify(postData),
      });
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts`, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(accountId, locationId, postId, postData) {
    if (this.isVercel()) {
      return this.request(`/posts?accountId=${accountId}&locationId=${locationId}&postId=${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
      });
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(accountId, locationId, postId) {
    if (this.isVercel()) {
      return this.request(`/posts?accountId=${accountId}&locationId=${locationId}&postId=${postId}`, {
        method: 'DELETE',
      });
    }
    return this.request(`/accounts/${accountId}/locations/${locationId}/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  isVercel() {
    return typeof window !== 'undefined' && !window.location.host.includes('localhost');
  }

  // ============================================
  // METRICS / PERFORMANCE
  // ============================================
  async getMetrics(locationId, startDate, endDate) {
    // Don't throw on metrics errors - return the error response instead
    if (!this.token) {
      return { error: { message: 'No access token set' } };
    }

    const endpoint = this.isVercel()
      ? `${API_BASE}/metrics?locationId=${locationId}`
      : `${API_BASE}/locations/${locationId}/metrics`;

    try {
      const response = await fetch(endpoint, {
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
