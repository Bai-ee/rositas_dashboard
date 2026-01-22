import React from 'react';
import { Star, MessageSquare, ThumbsUp, Calendar } from 'lucide-react';

export function ReviewsPanel({ reviews }) {
  const calculateStats = () => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] };
    }

    const distribution = [0, 0, 0, 0, 0];
    let total = 0;

    reviews.forEach(review => {
      const rating = review.starRating;
      const stars = rating === 'ONE' ? 1 :
        rating === 'TWO' ? 2 :
          rating === 'THREE' ? 3 :
            rating === 'FOUR' ? 4 :
              rating === 'FIVE' ? 5 : 0;
      if (stars > 0) {
        distribution[stars - 1]++;
        total += stars;
      }
    });

    return {
      average: reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0,
      total: reviews.length,
      distribution
    };
  };

  const stats = calculateStats();

  const StarRating = ({ rating }) => {
    const stars = rating === 'ONE' ? 1 :
      rating === 'TWO' ? 2 :
        rating === 'THREE' ? 3 :
          rating === 'FOUR' ? 4 :
            rating === 'FIVE' ? 5 : 0;

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
      </div>

      <div className="p-6">
        {/* Stats Summary */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{stats.average}</div>
            <div className="flex justify-center mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i <= Math.round(stats.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{stats.total} reviews</p>
          </div>

          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.distribution[stars - 1];
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3">{stars}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {review.reviewer?.profilePhotoUrl ? (
                      <img
                        src={review.reviewer.profilePhotoUrl}
                        alt={review.reviewer.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {review.reviewer?.displayName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.reviewer?.displayName || 'Anonymous'}
                      </p>
                      <StarRating rating={review.starRating} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(review.createTime)}
                  </div>
                </div>

                {review.comment && (
                  <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
                )}

                {review.reviewReply && (
                  <div className="mt-3 pl-4 border-l-2 border-blue-200">
                    <p className="text-xs font-medium text-blue-600 mb-1">Business Response</p>
                    <p className="text-sm text-gray-600">{review.reviewReply.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No reviews available</p>
            <p className="text-sm text-gray-400 mt-1">
              Reviews will appear here once customers leave feedback
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
