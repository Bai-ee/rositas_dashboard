// Determine the redirect URI based on environment
const getRedirectUri = () => {
  // Check if running on Vercel/production
  if (typeof window !== 'undefined') {
    const host = window.location.host;
    const protocol = window.location.protocol;

    // If on Vercel or any non-localhost domain
    if (!host.includes('localhost')) {
      return `${protocol}//${host}/callback`;
    }
  }
  // Default to localhost for development
  return 'http://localhost:5173/callback';
};

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: '949123415288-8qbn2po17i0e5icm0mqjl68eov1nvkbc.apps.googleusercontent.com',

  // IMPORTANT: Add your Client Secret here (keep this file secure!)
  // You can find this in Google Cloud Console > APIs & Services > Credentials
  clientSecret: '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',

  // OAuth redirect URI - dynamically set based on environment
  get redirectUri() {
    return getRedirectUri();
  },

  // Scopes required for Google Business Profile API
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ].join(' ')
};

// Google Business Profile API base URL
export const GBP_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
export const ACCOUNT_API_BASE = 'https://mybusinessaccountmanagement.googleapis.com/v1';
