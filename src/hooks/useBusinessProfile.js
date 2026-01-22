import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = 'http://localhost:3001/api';

export function useBusinessProfile(accessToken) {
  const [accounts, setAccounts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use ref to always have current token
  const tokenRef = useRef(accessToken);
  tokenRef.current = accessToken;

  // Fetch reviews for a location
  const fetchReviews = useCallback(async (accountId, locationId) => {
    const token = tokenRef.current;
    console.log('fetchReviews called with:', { accountId, locationId, hasToken: !!token });

    if (!token || !accountId || !locationId) {
      console.log('fetchReviews: missing required params');
      return;
    }

    try {
      const url = `${API_BASE}/accounts/${accountId}/locations/${locationId}/reviews`;
      console.log('Fetching reviews from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Reviews response status:', response.status);

      const data = await response.json();
      console.log('Reviews data:', data);

      if (!response.ok) {
        console.warn('Could not fetch reviews:', data);
        return;
      }

      setReviews(data.reviews || []);
    } catch (err) {
      console.warn('Error fetching reviews:', err);
    }
  }, []);

  // Fetch locations for an account
  const fetchLocations = useCallback(async (accountId) => {
    const token = tokenRef.current;
    console.log('fetchLocations called with:', { accountId, hasToken: !!token });

    if (!token || !accountId) return;

    try {
      const response = await fetch(
        `${API_BASE}/accounts/${accountId}/locations`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      console.log('Locations response:', data);

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch locations');
      }

      const locationsList = data.locations || [];
      setLocations(locationsList);

      // Auto-select first location and fetch reviews
      if (locationsList.length > 0) {
        const firstLocation = locationsList[0];
        setSelectedLocation(firstLocation);

        // Extract location ID - format is "locations/XXXXXX" or "accounts/XXX/locations/XXXXX"
        console.log('First location name:', firstLocation.name);

        let locationId;
        if (firstLocation.name.includes('/locations/')) {
          locationId = firstLocation.name.split('/locations/')[1];
        } else if (firstLocation.name.startsWith('locations/')) {
          locationId = firstLocation.name.replace('locations/', '');
        } else {
          locationId = firstLocation.name;
        }

        console.log('Extracted locationId:', locationId);

        // Fetch reviews
        await fetchReviews(accountId, locationId);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err.message);
    }
  }, [fetchReviews]);

  // Fetch accounts
  const fetchAccounts = useCallback(async () => {
    const token = tokenRef.current;
    console.log('fetchAccounts called, hasToken:', !!token);

    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/accounts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Accounts response:', data);

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch accounts');
      }

      const accountsList = data.accounts || [];
      setAccounts(accountsList);

      // If we have accounts, fetch locations for the first one
      if (accountsList.length > 0) {
        const accountId = accountsList[0].name.replace('accounts/', '');
        console.log('Extracted accountId:', accountId);
        await fetchLocations(accountId);
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchLocations]);

  // Fetch data when token is available
  useEffect(() => {
    if (accessToken) {
      console.log('Token available, fetching accounts...');
      fetchAccounts();
    }
  }, [accessToken, fetchAccounts]);

  const selectLocation = useCallback(async (location) => {
    setSelectedLocation(location);
    // Extract account and location IDs from name like "accounts/XXX/locations/YYY"
    const parts = location.name.split('/');
    const accountId = parts[1];
    const locationId = parts[3];
    console.log('selectLocation:', { accountId, locationId });
    await fetchReviews(accountId, locationId);
  }, [fetchReviews]);

  const refresh = useCallback(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    accounts,
    locations,
    selectedLocation,
    reviews,
    isLoading,
    error,
    selectLocation,
    refresh
  };
}
