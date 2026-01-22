import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Send,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Wand2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import PostChatEditor from '../components/PostChatEditor';

const SUGGESTED_REPLIES = [
  {
    id: 'thank-positive',
    label: 'Thank for positive review',
    text: "Thank you so much for your wonderful review! We're thrilled that you enjoyed your experience at Rosita's. We look forward to seeing you again soon!",
  },
  {
    id: 'apologize',
    label: 'Apologize for negative experience',
    text: "We sincerely apologize that your experience didn't meet expectations. Your feedback is important to us, and we'd like to make it right. Please reach out to us directly so we can address your concerns.",
  },
  {
    id: 'thank-feedback',
    label: 'Thank for feedback',
    text: "Thank you for taking the time to share your feedback with us. We truly appreciate it and are always looking for ways to improve. We hope to serve you again soon!",
  },
];

function StarRating({ rating }) {
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
          className={`w-5 h-5 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIEditor, setShowAIEditor] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      // Extract review ID from the name
      const reviewId = review.name?.split('/reviews/')[1] || review.reviewId;
      await onReply(reviewId, replyText);
      setReplyText('');
      setIsReplying(false);
    } catch (err) {
      console.error('Error submitting reply:', err);
      alert('Failed to submit reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedReply = (text) => {
    setReplyText(text);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {review.reviewer?.profilePhotoUrl ? (
              <img
                src={review.reviewer.profilePhotoUrl}
                alt={review.reviewer.displayName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-lg">
                  {review.reviewer?.displayName?.charAt(0) || '?'}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {review.reviewer?.displayName || 'Anonymous'}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <StarRating rating={review.starRating} />
                <span className="text-sm text-gray-500">
                  {formatDate(review.createTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {review.reviewReply ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              Replied
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              Needs reply
            </span>
          )}
        </div>

        {/* Review Content */}
        {review.comment && (
          <p className="mt-4 text-gray-700">{review.comment}</p>
        )}

        {/* Existing Reply */}
        {review.reviewReply && (
          <div className="mt-4 pl-4 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg p-4">
            <p className="text-sm font-medium text-blue-700 mb-1">Your Response</p>
            <p className="text-gray-700">{review.reviewReply.comment}</p>
            <p className="text-xs text-gray-500 mt-2">
              {formatDate(review.reviewReply.updateTime)}
            </p>
          </div>
        )}

        {/* Reply Section */}
        {!review.reviewReply && !isReplying && (
          <button
            onClick={() => setIsReplying(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Reply to Review
          </button>
        )}

        {isReplying && (
          <div className="mt-4 space-y-4">
            {/* Suggested Replies */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Suggested Replies</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_REPLIES.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestedReply(suggestion.text)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reply Input */}
            <div className="relative">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <button
                onClick={() => setShowAIEditor(true)}
                className="absolute right-3 top-3 p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                title="Edit with AI"
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setIsReplying(false);
                  setReplyText('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReply}
                disabled={!replyText.trim() || isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish Reply
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* AI Editor Modal for Reply */}
        {showAIEditor && (
          <PostChatEditor
            post={{ content: replyText || "Thank you for your review! We appreciate your feedback." }}
            onUpdatePost={(newContent) => {
              setReplyText(newContent);
              setShowAIEditor(false);
            }}
            onClose={() => setShowAIEditor(false)}
            platform="Review Reply"
            dateLabel={`Response to ${review.reviewer?.displayName || 'Customer'}`}
            theme={`${review.starRating} star review - ${review.comment?.substring(0, 50) || 'No comment'}...`}
          />
        )}
      </div>
    </div>
  );
}

export default function Reviews() {
  const { reviews, replyToReview, isLoading } = useApp();
  const [filter, setFilter] = useState('all'); // all, needs-reply, replied
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    // Status filter
    if (filter === 'needs-reply' && review.reviewReply) return false;
    if (filter === 'replied' && !review.reviewReply) return false;

    // Rating filter
    if (ratingFilter !== 'all') {
      const stars = review.starRating === 'ONE' ? 1 :
        review.starRating === 'TWO' ? 2 :
        review.starRating === 'THREE' ? 3 :
        review.starRating === 'FOUR' ? 4 :
        review.starRating === 'FIVE' ? 5 : 0;
      if (stars !== parseInt(ratingFilter)) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = review.reviewer?.displayName?.toLowerCase().includes(query);
      const matchesComment = review.comment?.toLowerCase().includes(query);
      if (!matchesName && !matchesComment) return false;
    }

    return true;
  });

  // Calculate stats
  const needsReplyCount = reviews.filter(r => !r.reviewReply).length;
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

  if (isLoading && reviews.length === 0) {
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
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">
          Manage and respond to customer reviews
        </p>
      </div>

      {/* Stats */}
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
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Needs Reply</p>
              <p className="text-2xl font-bold text-gray-900">{needsReplyCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Reviews</option>
              <option value="needs-reply">Needs Reply</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          {/* Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <ReviewCard
              key={review.name || index}
              review={review}
              onReply={replyToReview}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
            <p className="text-gray-500 mt-2">
              {searchQuery || filter !== 'all' || ratingFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Reviews will appear here once customers leave feedback'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
