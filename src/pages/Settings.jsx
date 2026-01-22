import React, { useState } from 'react';
import {
  User,
  MapPin,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Building,
  Phone,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

function StatusBadge({ status, label }) {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'bg-green-100 text-green-700', iconColor: 'text-green-600' },
    error: { icon: XCircle, color: 'bg-red-100 text-red-700', iconColor: 'text-red-600' },
    warning: { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-700', iconColor: 'text-yellow-600' },
    pending: { icon: Clock, color: 'bg-gray-100 text-gray-700', iconColor: 'text-gray-600' },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.color}`}>
      <Icon className={`w-4 h-4 ${config.iconColor}`} />
      {label}
    </span>
  );
}

function SettingSection({ title, description, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function Settings({ user, onLogout }) {
  const {
    accounts,
    locations,
    selectedLocation,
    selectLocation,
    syncData,
    lastSync,
    isLoading
  } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncData();
    } finally {
      setIsSyncing(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return 'No address available';
    const parts = [];
    if (address.addressLines) parts.push(...address.addressLines);
    const cityStateZip = [
      address.locality,
      address.administrativeArea,
      address.postalCode
    ].filter(Boolean).join(', ');
    if (cityStateZip) parts.push(cityStateZip);
    return parts.join(', ') || 'No address available';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and business settings</p>
      </div>

      {/* Account Info */}
      <SettingSection title="Connected Account" description="Your linked Google account">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{user?.name || 'Unknown User'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </SettingSection>

      {/* Business Accounts */}
      <SettingSection title="Business Accounts" description="Google Business Profile accounts you have access to">
        {accounts.length > 0 ? (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{account.accountName}</p>
                    <p className="text-sm text-gray-500">
                      {account.type} • {account.verificationState}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  status={account.verificationState === 'VERIFIED' ? 'success' : 'warning'}
                  label={account.verificationState}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No business accounts found</p>
        )}
      </SettingSection>

      {/* Location Selection */}
      <SettingSection title="Business Location" description="Select the location to manage">
        {locations.length > 0 ? (
          <div className="space-y-4">
            {locations.map((location) => {
              const isSelected = selectedLocation?.name === location.name;
              return (
                <div
                  key={location.name}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => selectLocation(location)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{location.title}</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {formatAddress(location.storefrontAddress)}
                        </p>
                        {location.phoneNumbers?.primaryPhone && (
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {location.phoneNumbers.primaryPhone}
                          </p>
                        )}
                        {location.websiteUri && (
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <a
                              href={location.websiteUri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {location.websiteUri}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No locations found</p>
        )}
      </SettingSection>

      {/* API Status */}
      <SettingSection title="API Status" description="Connection status for Google APIs">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Business Profile API</span>
            </div>
            <StatusBadge status="success" label="Connected" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Reviews API</span>
            </div>
            <StatusBadge status="success" label="Connected" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Performance API</span>
            </div>
            <StatusBadge status="warning" label="May require setup" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Posts API</span>
            </div>
            <StatusBadge status="success" label="Connected" />
          </div>
        </div>
      </SettingSection>

      {/* Data Sync */}
      <SettingSection title="Data Sync" description="Manually sync data from Google Business Profile">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">
              Last synced:{' '}
              <span className="font-medium">
                {lastSync ? format(lastSync, 'MMM d, yyyy h:mm a') : 'Never'}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Data is automatically synced when you load the dashboard
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={isSyncing || isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </SettingSection>

      {/* External Links */}
      <SettingSection title="External Resources" description="Helpful links and resources">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://business.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Google Business Profile</p>
              <p className="text-sm text-gray-500">Manage your profile directly</p>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </a>
          <a
            href="https://console.cloud.google.com/apis/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Google Cloud Console</p>
              <p className="text-sm text-gray-500">Manage APIs and credentials</p>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </SettingSection>
    </div>
  );
}
