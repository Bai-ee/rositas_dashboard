import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children, accessToken }) {
  const [accounts, setAccounts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  // Set token when it changes
  useEffect(() => {
    if (accessToken) {
      api.setToken(accessToken);
    }
  }, [accessToken]);

  // Fetch accounts on mount
  const fetchAccounts = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getAccounts();
      setAccounts(data.accounts || []);

      if (data.accounts?.length > 0) {
        const accountId = data.accounts[0].name.replace('accounts/', '');
        setSelectedAccountId(accountId);
        await fetchLocations(accountId);
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  // Fetch locations for account
  const fetchLocations = useCallback(async (accountId) => {
    if (!accessToken || !accountId) return;

    try {
      const data = await api.getLocations(accountId);
      setLocations(data.locations || []);

      if (data.locations?.length > 0) {
        const firstLocation = data.locations[0];
        setSelectedLocation(firstLocation);

        // Get location ID
        let locationId;
        if (firstLocation.name.includes('/locations/')) {
          locationId = firstLocation.name.split('/locations/')[1];
        } else {
          locationId = firstLocation.name.replace('locations/', '');
        }

        // Fetch all data for this location
        await Promise.all([
          fetchReviews(accountId, locationId),
          fetchPosts(accountId, locationId),
          fetchMetrics(locationId),
        ]);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err.message);
    }
  }, [accessToken]);

  // Fetch reviews
  const fetchReviews = useCallback(async (accountId, locationId) => {
    if (!accessToken) return;

    try {
      const data = await api.getReviews(accountId, locationId);
      setReviews(data.reviews || []);
    } catch (err) {
      console.warn('Error fetching reviews:', err);
    }
  }, [accessToken]);

  // Fetch posts
  const fetchPosts = useCallback(async (accountId, locationId) => {
    if (!accessToken) return;

    try {
      const data = await api.getPosts(accountId, locationId);
      setPosts(data.localPosts || []);
    } catch (err) {
      console.warn('Error fetching posts:', err);
    }
  }, [accessToken]);

  // Fetch metrics
  const fetchMetrics = useCallback(async (locationId) => {
    if (!accessToken) return;

    try {
      console.log('Fetching metrics for location:', locationId);
      const data = await api.getMetrics(locationId);
      console.log('Metrics data received:', data);

      // Check if the response contains an error
      if (data.error) {
        console.warn('Metrics API returned error:', data.error);
        setMetrics({ error: data.error });
      } else {
        setMetrics(data);
      }
    } catch (err) {
      console.warn('Error fetching metrics:', err);
      setMetrics({ error: { message: err.message } });
      // Metrics API might not be available for all accounts
    }
  }, [accessToken]);

  // Sync all data
  const syncData = useCallback(async () => {
    if (!selectedAccountId || !selectedLocation) return;

    setIsLoading(true);
    setError(null);

    try {
      let locationId;
      if (selectedLocation.name.includes('/locations/')) {
        locationId = selectedLocation.name.split('/locations/')[1];
      } else {
        locationId = selectedLocation.name.replace('locations/', '');
      }

      await Promise.all([
        fetchReviews(selectedAccountId, locationId),
        fetchPosts(selectedAccountId, locationId),
        fetchMetrics(locationId),
      ]);

      setLastSync(new Date());
    } catch (err) {
      console.error('Error syncing data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccountId, selectedLocation, fetchReviews, fetchPosts, fetchMetrics]);

  // Select a different location
  const selectLocation = useCallback(async (location) => {
    setSelectedLocation(location);

    let locationId;
    if (location.name.includes('/locations/')) {
      locationId = location.name.split('/locations/')[1];
    } else {
      locationId = location.name.replace('locations/', '');
    }

    setIsLoading(true);
    try {
      await Promise.all([
        fetchReviews(selectedAccountId, locationId),
        fetchPosts(selectedAccountId, locationId),
        fetchMetrics(locationId),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccountId, fetchReviews, fetchPosts, fetchMetrics]);

  // Reply to a review
  const replyToReview = useCallback(async (reviewId, comment) => {
    if (!selectedAccountId || !selectedLocation) return;

    let locationId;
    if (selectedLocation.name.includes('/locations/')) {
      locationId = selectedLocation.name.split('/locations/')[1];
    } else {
      locationId = selectedLocation.name.replace('locations/', '');
    }

    await api.replyToReview(selectedAccountId, locationId, reviewId, comment);
    await fetchReviews(selectedAccountId, locationId);
  }, [selectedAccountId, selectedLocation, fetchReviews]);

  // Create a post
  const createPost = useCallback(async (postData) => {
    if (!selectedAccountId || !selectedLocation) return;

    let locationId;
    if (selectedLocation.name.includes('/locations/')) {
      locationId = selectedLocation.name.split('/locations/')[1];
    } else {
      locationId = selectedLocation.name.replace('locations/', '');
    }

    await api.createPost(selectedAccountId, locationId, postData);
    await fetchPosts(selectedAccountId, locationId);
  }, [selectedAccountId, selectedLocation, fetchPosts]);

  // Delete a post
  const deletePost = useCallback(async (postId) => {
    if (!selectedAccountId || !selectedLocation) return;

    let locationId;
    if (selectedLocation.name.includes('/locations/')) {
      locationId = selectedLocation.name.split('/locations/')[1];
    } else {
      locationId = selectedLocation.name.replace('locations/', '');
    }

    await api.deletePost(selectedAccountId, locationId, postId);
    await fetchPosts(selectedAccountId, locationId);
  }, [selectedAccountId, selectedLocation, fetchPosts]);

  // Initialize on mount
  useEffect(() => {
    if (accessToken) {
      fetchAccounts();
    }
  }, [accessToken, fetchAccounts]);

  // Helper to get location ID
  const getLocationId = useCallback(() => {
    if (!selectedLocation) return null;
    if (selectedLocation.name.includes('/locations/')) {
      return selectedLocation.name.split('/locations/')[1];
    }
    return selectedLocation.name.replace('locations/', '');
  }, [selectedLocation]);

  const value = {
    accounts,
    locations,
    selectedLocation,
    selectedAccountId,
    reviews,
    posts,
    metrics,
    isLoading,
    error,
    lastSync,
    selectLocation,
    syncData,
    replyToReview,
    createPost,
    deletePost,
    getLocationId,
    fetchReviews,
    fetchPosts,
    fetchMetrics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
