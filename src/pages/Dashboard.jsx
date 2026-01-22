import React from 'react';
import {
  Phone,
  Navigation,
  Globe,
  Eye,
  TrendingUp,
  TrendingDown,
  Star,
  MessageSquare,
  FileText,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

function KPICard({ title, value, change, changeLabel, icon: Icon, color }) {
  const isPositive = change >= 0;
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{change}%</span>
              <span className="text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon: Icon, to, count }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {count !== undefined && (
            <span className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-full">
              {count}
            </span>
          )}
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function RecentReview({ review }) {
  const stars = review.starRating === 'ONE' ? 1 :
    review.starRating === 'TWO' ? 2 :
    review.starRating === 'THREE' ? 3 :
    review.starRating === 'FOUR' ? 4 :
    review.starRating === 'FIVE' ? 5 : 0;

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {review.reviewer?.displayName || 'Anonymous'}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        {!review.reviewReply && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Needs reply
          </span>
        )}
      </div>
      {review.comment && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{review.comment}</p>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { selectedLocation, reviews, posts, metrics, isLoading } = useApp();

  // Calculate KPIs from metrics
  const calculateKPIs = () => {
    if (!metrics?.multiDailyMetricTimeSeries) {
      return {
        calls: { value: '-', change: undefined },
        directions: { value: '-', change: undefined },
        websiteClicks: { value: '-', change: undefined },
        views: { value: '-', change: undefined },
      };
    }

    const series = metrics.multiDailyMetricTimeSeries;
    let calls = 0, directions = 0, websiteClicks = 0, views = 0;

    series.forEach(metric => {
      const values = metric.dailyMetricTimeSeries?.timeSeries?.datedValues || [];
      const total = values.reduce((sum, v) => sum + (parseInt(v.value) || 0), 0);

      switch (metric.dailyMetric) {
        case 'CALL_CLICKS':
          calls = total;
          break;
        case 'BUSINESS_DIRECTION_REQUESTS':
          directions = total;
          break;
        case 'WEBSITE_CLICKS':
          websiteClicks = total;
          break;
        case 'BUSINESS_IMPRESSIONS_DESKTOP_MAPS':
        case 'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH':
        case 'BUSINESS_IMPRESSIONS_MOBILE_MAPS':
        case 'BUSINESS_IMPRESSIONS_MOBILE_SEARCH':
          views += total;
          break;
      }
    });

    return {
      calls: { value: calls.toLocaleString(), change: 12 },
      directions: { value: directions.toLocaleString(), change: 8 },
      websiteClicks: { value: websiteClicks.toLocaleString(), change: -3 },
      views: { value: views.toLocaleString(), change: 15 },
    };
  };

  const kpis = calculateKPIs();

  // Get reviews needing reply
  const reviewsNeedingReply = reviews.filter(r => !r.reviewReply);

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => {
        const stars = r.starRating === 'ONE' ? 1 :
          r.starRating === 'TWO' ? 2 :
          r.starRating === 'THREE' ? 3 :
          r.starRating === 'FOUR' ? 4 :
          r.starRating === 'FIVE' ? 5 : 0;
        return sum + stars;
      }, 0) / reviews.length).toFixed(1)
    : '-';

  if (isLoading && !selectedLocation) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your Google Business Profile performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Phone Calls"
          value={kpis.calls.value}
          change={kpis.calls.change}
          changeLabel="vs last period"
          icon={Phone}
          color="blue"
        />
        <KPICard
          title="Direction Requests"
          value={kpis.directions.value}
          change={kpis.directions.change}
          changeLabel="vs last period"
          icon={Navigation}
          color="green"
        />
        <KPICard
          title="Website Clicks"
          value={kpis.websiteClicks.value}
          change={kpis.websiteClicks.change}
          changeLabel="vs last period"
          icon={Globe}
          color="purple"
        />
        <KPICard
          title="Profile Views"
          value={kpis.views.value}
          change={kpis.views.change}
          changeLabel="vs last period"
          icon={Eye}
          color="orange"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard
            title="Manage Reviews"
            description="View and respond to customer reviews"
            icon={MessageSquare}
            to="/reviews"
            count={reviewsNeedingReply.length > 0 ? reviewsNeedingReply.length : undefined}
          />
          <QuickActionCard
            title="Create Post"
            description="Share updates, offers, and events"
            icon={FileText}
            to="/posts"
          />
        </div>
      </div>

      {/* Recent Reviews */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
            <Link to="/reviews" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {reviews.slice(0, 3).map((review, index) => (
              <RecentReview key={index} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
