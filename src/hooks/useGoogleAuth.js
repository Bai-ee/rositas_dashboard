import { useState, useEffect, useCallback } from 'react';
import { GOOGLE_CONFIG } from '../config';

export function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('gbp_access_token');
    const storedUser = localStorage.getItem('gbp_user');
    const tokenExpiry = localStorage.getItem('gbp_token_expiry');

    if (storedToken && tokenExpiry) {
      const isExpired = Date.now() > parseInt(tokenExpiry);
      if (!isExpired) {
        setAccessToken(storedToken);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        // Clear expired token
        localStorage.removeItem('gbp_access_token');
        localStorage.removeItem('gbp_user');
        localStorage.removeItem('gbp_token_expiry');
      }
    }
    setIsLoading(false);
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        const expiresIn = params.get('expires_in');

        if (token) {
          const expiry = Date.now() + (parseInt(expiresIn) * 1000);
          localStorage.setItem('gbp_access_token', token);
          localStorage.setItem('gbp_token_expiry', expiry.toString());
          setAccessToken(token);

          // Fetch user info
          try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await response.json();
            setUser(userData);
            localStorage.setItem('gbp_user', JSON.stringify(userData));
          } catch (err) {
            console.error('Failed to fetch user info:', err);
          }

          // Clean up URL
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    handleCallback();
  }, []);

  const login = useCallback(() => {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', GOOGLE_CONFIG.clientId);
    authUrl.searchParams.set('redirect_uri', GOOGLE_CONFIG.redirectUri);
    authUrl.searchParams.set('response_type', 'token');
    authUrl.searchParams.set('scope', GOOGLE_CONFIG.scopes);
    authUrl.searchParams.set('include_granted_scopes', 'true');
    authUrl.searchParams.set('prompt', 'consent');

    window.location.href = authUrl.toString();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('gbp_access_token');
    localStorage.removeItem('gbp_user');
    localStorage.removeItem('gbp_token_expiry');
    setAccessToken(null);
    setUser(null);
  }, []);

  return {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated: !!accessToken,
    login,
    logout
  };
}
