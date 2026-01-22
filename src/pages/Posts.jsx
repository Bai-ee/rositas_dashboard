import React, { useState } from 'react';
import {
  Plus,
  FileText,
  Calendar,
  Tag,
  Sparkles,
  Trash2,
  ExternalLink,
  Image,
  Clock,
  CheckCircle,
  X,
  Wand2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import PostChatEditor from '../components/PostChatEditor';

const POST_TYPES = [
  { id: 'STANDARD', label: 'Update', icon: FileText, description: 'Share news and updates' },
  { id: 'EVENT', label: 'Event', icon: Calendar, description: 'Promote an upcoming event' },
  { id: 'OFFER', label: 'Offer', icon: Tag, description: 'Share a special promotion' },
];

const CTA_TYPES = [
  { id: 'CALL', label: 'Call now' },
  { id: 'BOOK', label: 'Book' },
  { id: 'ORDER', label: 'Order online' },
  { id: 'SHOP', label: 'Shop' },
  { id: 'LEARN_MORE', label: 'Learn more' },
  { id: 'SIGN_UP', label: 'Sign up' },
];

function PostCard({ post, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch {
      return dateString;
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      const postId = post.name?.split('/localPosts/')[1];
      await onDelete(postId);
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getPostTypeLabel = () => {
    switch (post.topicType) {
      case 'EVENT': return 'Event';
      case 'OFFER': return 'Offer';
      default: return 'Update';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Image */}
      {post.media?.[0]?.googleUrl && (
        <div className="aspect-video bg-gray-100">
          <img
            src={post.media[0].googleUrl}
            alt="Post media"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {getPostTypeLabel()}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(post.createTime)}
            </span>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Content */}
        {post.summary && (
          <p className="text-gray-700 mb-4">{post.summary}</p>
        )}

        {/* Event Details */}
        {post.event && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900">{post.event.title}</h4>
            {post.event.schedule && (
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(post.event.schedule.startDate)} - {formatDate(post.event.schedule.endDate)}
              </p>
            )}
          </div>
        )}

        {/* Offer Details */}
        {post.offer && (
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-green-900">{post.offer.couponCode}</h4>
            {post.offer.redeemOnlineUrl && (
              <a
                href={post.offer.redeemOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:underline flex items-center gap-1 mt-1"
              >
                Redeem online <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* CTA Button */}
        {post.callToAction && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">Call to action:</span>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
              {post.callToAction.actionType?.replace('_', ' ')}
            </span>
          </div>
        )}

        {/* Stats */}
        {post.searchUrl && (
          <a
            href={post.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-4"
          >
            View on Google <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function CreatePostModal({ isOpen, onClose, onCreate }) {
  const [postType, setPostType] = useState('STANDARD');
  const [summary, setSummary] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [offerUrl, setOfferUrl] = useState('');
  const [ctaType, setCtaType] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIEditor, setShowAIEditor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build post data according to Google My Business API spec
    const postData = {
      languageCode: 'en-US',
      summary: summary.trim(),
    };

    // Only set topicType for EVENT or OFFER, STANDARD posts don't need it
    if (postType === 'EVENT') {
      postData.topicType = 'EVENT';
      if (eventTitle) {
        postData.event = {
          title: eventTitle,
          schedule: {}
        };
        if (eventStartDate) {
          const start = new Date(eventStartDate);
          postData.event.schedule.startDate = {
            year: start.getFullYear(),
            month: start.getMonth() + 1,
            day: start.getDate()
          };
          postData.event.schedule.startTime = {
            hours: 12,
            minutes: 0
          };
        }
        if (eventEndDate) {
          const end = new Date(eventEndDate);
          postData.event.schedule.endDate = {
            year: end.getFullYear(),
            month: end.getMonth() + 1,
            day: end.getDate()
          };
          postData.event.schedule.endTime = {
            hours: 23,
            minutes: 59
          };
        }
      }
    } else if (postType === 'OFFER') {
      postData.topicType = 'OFFER';
      postData.offer = {};
      if (offerCode) {
        postData.offer.couponCode = offerCode;
      }
      if (offerUrl) {
        postData.offer.redeemOnlineUrl = offerUrl;
      }
      // Offers require terms
      postData.offer.termsConditions = 'See store for details. While supplies last.';
    }
    // STANDARD posts use topicType: 'STANDARD' or can omit it

    // Add CTA if selected - must have a URL
    if (ctaType && ctaUrl) {
      postData.callToAction = {
        actionType: ctaType,
        url: ctaUrl
      };
    }

    console.log('Creating post with data:', JSON.stringify(postData, null, 2));

    setIsSubmitting(true);
    try {
      await onCreate(postData);
      onClose();
      // Reset form
      setSummary('');
      setEventTitle('');
      setEventStartDate('');
      setEventEndDate('');
      setOfferCode('');
      setOfferUrl('');
      setCtaType('');
      setCtaUrl('');
    } catch (err) {
      console.error('Error creating post:', err);
      alert(`Failed to create post: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Post Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {POST_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPostType(type.id)}
                  className={`p-4 border-2 rounded-xl text-left transition-colors ${
                    postType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${postType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <p className="font-medium text-gray-900">{type.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <div className="relative">
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write your post content..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                required
              />
              <button
                type="button"
                onClick={() => setShowAIEditor(true)}
                className="absolute right-3 top-3 p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                title="Edit with AI"
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {summary.length}/1500 characters
            </p>
          </div>

          {/* Event Fields */}
          {postType === 'EVENT' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Offer Fields */}
          {postType === 'OFFER' && (
            <div className="space-y-4 p-4 bg-green-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={offerCode}
                  onChange={(e) => setOfferCode(e.target.value)}
                  placeholder="e.g., SAVE20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redemption URL (optional)
                </label>
                <input
                  type="url"
                  value={offerUrl}
                  onChange={(e) => setOfferUrl(e.target.value)}
                  placeholder="https://example.com/offer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call to Action (optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={ctaType}
                onChange={(e) => setCtaType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No CTA</option>
                {CTA_TYPES.map((cta) => (
                  <option key={cta.id} value={cta.id}>{cta.label}</option>
                ))}
              </select>
              {ctaType && (
                <input
                  type="url"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="Button URL"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!summary.trim() || isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI Editor Modal */}
        {showAIEditor && (
          <PostChatEditor
            post={{ content: summary || "Write your Google Business Profile post here..." }}
            onUpdatePost={(newContent) => {
              setSummary(newContent);
              setShowAIEditor(false);
            }}
            onClose={() => setShowAIEditor(false)}
            platform="Google Business Profile"
            dateLabel={postType === 'EVENT' ? `Event: ${eventTitle || 'New Event'}` : postType === 'OFFER' ? 'Offer Post' : 'Update Post'}
            theme={postType === 'EVENT' ? 'Event promotion' : postType === 'OFFER' ? 'Special offer/promotion' : 'Business update'}
          />
        )}
      </div>
    </div>
  );
}

export default function Posts() {
  const { posts, createPost, deletePost, isLoading } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-500 mt-1">
            Create and manage posts on your Google Business Profile
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Post
        </button>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard
              key={post.name || index}
              post={post}
              onDelete={deletePost}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Create your first post to share updates with your customers
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createPost}
      />
    </div>
  );
}
