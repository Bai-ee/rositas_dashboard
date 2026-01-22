import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { AppProvider } from './context/AppContext';
import { LoginScreen } from './components/LoginScreen';
import { LoadingScreen } from './components/LoadingScreen';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import Posts from './pages/Posts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Strategy from './pages/Strategy';

function AppContent() {
  const {
    user,
    accessToken,
    isLoading: authLoading,
    isAuthenticated,
    login,
    logout
  } = useGoogleAuth();

  // Show loading screen during auth check
  if (authLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <AppProvider accessToken={accessToken}>
      <BrowserRouter>
        <Layout user={user} onLogout={logout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings user={user} onLogout={logout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
