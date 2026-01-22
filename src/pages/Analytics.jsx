import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Eye,
  Phone,
  Navigation,
  Globe,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, subDays } from 'date-fns';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function MetricCard({ title, value, change, icon: Icon, color }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change}% vs previous period
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const { metrics, isLoading, selectedLocation } = useApp();
  const [dateRange, setDateRange] = useState('28');

  // Process metrics data for charts
  const chartData = useMemo(() => {
    if (!metrics?.multiDailyMetricTimeSeries) return [];

    const dataByDate = {};

    metrics.multiDailyMetricTimeSeries.forEach(metricData => {
      const metric = metricData.dailyMetric;
      const timeSeries = metricData.dailyMetricTimeSeries?.timeSeries?.datedValues || [];

      timeSeries.forEach(item => {
        const dateKey = `${item.date.year}-${String(item.date.month).padStart(2, '0')}-${String(item.date.day).padStart(2, '0')}`;

        if (!dataByDate[dateKey]) {
          dataByDate[dateKey] = { date: dateKey };
        }

        const value = parseInt(item.value) || 0;

        switch (metric) {
          case 'CALL_CLICKS':
            dataByDate[dateKey].calls = (dataByDate[dateKey].calls || 0) + value;
            break;
          case 'BUSINESS_DIRECTION_REQUESTS':
            dataByDate[dateKey].directions = (dataByDate[dateKey].directions || 0) + value;
            break;
          case 'WEBSITE_CLICKS':
            dataByDate[dateKey].websiteClicks = (dataByDate[dateKey].websiteClicks || 0) + value;
            break;
          case 'BUSINESS_IMPRESSIONS_DESKTOP_MAPS':
          case 'BUSINESS_IMPRESSIONS_MOBILE_MAPS':
            dataByDate[dateKey].mapsViews = (dataByDate[dateKey].mapsViews || 0) + value;
            break;
          case 'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH':
          case 'BUSINESS_IMPRESSIONS_MOBILE_SEARCH':
            dataByDate[dateKey].searchViews = (dataByDate[dateKey].searchViews || 0) + value;
            break;
        }
      });
    });

    return Object.values(dataByDate).sort((a, b) => a.date.localeCompare(b.date));
  }, [metrics]);

  // Calculate totals
  const totals = useMemo(() => {
    const result = {
      calls: 0,
      directions: 0,
      websiteClicks: 0,
      mapsViews: 0,
      searchViews: 0,
      totalViews: 0,
    };

    chartData.forEach(day => {
      result.calls += day.calls || 0;
      result.directions += day.directions || 0;
      result.websiteClicks += day.websiteClicks || 0;
      result.mapsViews += day.mapsViews || 0;
      result.searchViews += day.searchViews || 0;
    });

    result.totalViews = result.mapsViews + result.searchViews;

    return result;
  }, [chartData]);

  // View distribution for pie chart
  const viewDistribution = [
    { name: 'Maps', value: totals.mapsViews, color: '#3B82F6' },
    { name: 'Search', value: totals.searchViews, color: '#10B981' },
  ];

  // Actions distribution for pie chart
  const actionsDistribution = [
    { name: 'Calls', value: totals.calls, color: '#3B82F6' },
    { name: 'Directions', value: totals.directions, color: '#10B981' },
    { name: 'Website', value: totals.websiteClicks, color: '#F59E0B' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Debug: log metrics
  console.log('Analytics - metrics:', metrics);
  console.log('Analytics - chartData:', chartData);

  if (!metrics || chartData.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Performance insights for your business</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-900">Performance Data Not Available</h3>
              <p className="text-yellow-700 mt-1">
                {metrics?.error ? (
                  metrics.error.code === 'API_NOT_ENABLED' ? (
                    <span className="font-medium">{metrics.error.message}</span>
                  ) : (
                    <>API Error: {metrics.error.message || JSON.stringify(metrics.error)}</>
                  )
                ) : (
                  <>The Performance API returned no data. This could mean:</>
                )}
              </p>
              <ul className="text-yellow-700 mt-2 list-disc list-inside space-y-1">
                <li>The Business Profile Performance API isn't enabled in your Google Cloud project</li>
                <li>Your location doesn't have enough data yet (new listings may take time)</li>
                <li>The API quota has been exceeded</li>
              </ul>
              <p className="text-yellow-700 mt-3">
                <strong>To enable:</strong> Visit the{' '}
                <a
                  href="https://console.cloud.google.com/apis/library/businessprofileperformance.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  Google Cloud Console
                </a>
                {' '}and enable "Business Profile Performance API".
              </p>
              {selectedLocation && (
                <p className="text-yellow-600 mt-2 text-sm">
                  Location: {selectedLocation.title} ({selectedLocation.name})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Show raw metrics data for debugging */}
        {metrics && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h4 className="font-medium text-gray-700 mb-2">Debug: Raw API Response</h4>
            <pre className="text-xs text-gray-600 overflow-auto max-h-48">
              {JSON.stringify(metrics, null, 2)}
            </pre>
          </div>
        )}

        {/* Additional troubleshooting steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-4">
          <h4 className="font-medium text-blue-900 mb-3">Troubleshooting Steps:</h4>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>
              Go to <a href="https://console.cloud.google.com/apis/library" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google Cloud Console → API Library</a>
            </li>
            <li>
              Search for "<strong>Business Profile Performance API</strong>" and enable it
            </li>
            <li>
              Also ensure "<strong>My Business Business Information API</strong>" and "<strong>My Business Account Management API</strong>" are enabled
            </li>
            <li>
              Wait a few minutes for the API to activate
            </li>
            <li>
              Refresh this page and try again
            </li>
          </ol>
          <p className="mt-4 text-blue-700 text-sm">
            <strong>Note:</strong> New Google Business Profile listings may take several days to accumulate enough performance data to be visible through the API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Performance insights for the last {dateRange} days</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="28">Last 28 days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Views"
          value={totals.totalViews.toLocaleString()}
          icon={Eye}
          color="bg-blue-100 text-blue-600"
        />
        <MetricCard
          title="Phone Calls"
          value={totals.calls.toLocaleString()}
          icon={Phone}
          color="bg-green-100 text-green-600"
        />
        <MetricCard
          title="Direction Requests"
          value={totals.directions.toLocaleString()}
          icon={Navigation}
          color="bg-purple-100 text-purple-600"
        />
        <MetricCard
          title="Website Clicks"
          value={totals.websiteClicks.toLocaleString()}
          icon={Globe}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Views Over Time Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => format(new Date(value), 'MMM d')}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="mapsViews"
                name="Maps Views"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="searchViews"
                name="Search Views"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions Over Time Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Actions</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => format(new Date(value), 'MMM d')}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Legend />
              <Bar dataKey="calls" name="Calls" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="directions" name="Directions" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="websiteClicks" name="Website" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Views Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Views by Source</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={viewDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {viewDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actionsDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {actionsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
