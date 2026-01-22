import React from 'react';
import { Star, MessageSquare, MapPin, TrendingUp } from 'lucide-react';

export function StatsCards({ location, reviews }) {
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;

    let total = 0;
    reviews.forEach(review => {
      const rating = review.starRating;
      const stars = rating === 'ONE' ? 1 :
        rating === 'TWO' ? 2 :
          rating === 'THREE' ? 3 :
            rating === 'FOUR' ? 4 :
              rating === 'FIVE' ? 5 : 0;
      total += stars;
    });

    return (total / reviews.length).toFixed(1);
  };

  const stats = [
    {
      title: 'Average Rating',
      value: calculateAverageRating(),
      icon: Star,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      suffix: '/5'
    },
    {
      title: 'Total Reviews',
      value: reviews?.length || 0,
      icon: MessageSquare,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Locations',
      value: 1,
      icon: MapPin,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Profile Status',
      value: location ? 'Active' : 'N/A',
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
                {stat.suffix && <span className="text-sm text-gray-500">{stat.suffix}</span>}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
