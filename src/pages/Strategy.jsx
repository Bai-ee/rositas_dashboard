import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import EventPostGenerator from '../components/EventPostGenerator';
import CampaignHub from '../components/CampaignHub';
import {
  Brain,
  TrendingUp,
  Calendar,
  MessageSquare,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Trophy,
  Thermometer,
  Users,
  Utensils,
  Gift,
  MapPin,
  Phone,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Send,
  Eye,
  Edit3,
  Copy,
  ExternalLink,
  FileText,
  Megaphone
} from 'lucide-react';

// Strategy Hub - AI-Powered Daily Content System
export default function Strategy() {
  const { reviews, posts, metrics, selectedLocation, syncData } = useApp();
  const [activeTab, setActiveTab] = useState('today');
  const [todayStrategy, setTodayStrategy] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState(null);

  // Generate today's strategy on mount
  useEffect(() => {
    generateTodayStrategy();
  }, [reviews, posts, metrics]);

  const generateTodayStrategy = () => {
    setIsGenerating(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      const strategy = analyzeAndGenerateStrategy();
      setTodayStrategy(strategy);
      setIsGenerating(false);
    }, 1500);
  };

  // AI Analysis Engine
  const analyzeAndGenerateStrategy = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const month = today.getMonth();

    // Context signals
    const signals = detectSignals(today);
    const angle = determineAngle(signals, dayOfWeek);
    const templates = selectTemplates(angle, signals);

    // Generate drafts
    const drafts = generateDrafts(angle, templates, signals);

    // Calculate metrics comparison
    const metricsComparison = calculateMetricsComparison();

    // Unreplied reviews
    const unrepliedReviews = getUnrepliedReviews();

    return {
      date: today,
      signals,
      angle,
      templates,
      drafts,
      metricsComparison,
      unrepliedReviews,
      confidence: calculateConfidence(signals),
      priority: determinePriority(signals, unrepliedReviews)
    };
  };

  // Detect real-world signals
  const detectSignals = (date) => {
    const signals = [];
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    // Super Bowl (First Sunday in February - approximate)
    if (month === 1 && day >= 1 && day <= 14 && dayOfWeek === 0) {
      signals.push({
        type: 'major_event',
        name: 'Super Bowl Sunday',
        icon: '🏈',
        impact: 'high',
        angle: 'Game Day Fiesta',
        description: 'Super Bowl is the #1 food ordering day in America'
      });
    }

    // Valentine's Day
    if (month === 1 && day >= 10 && day <= 14) {
      signals.push({
        type: 'holiday',
        name: "Valentine's Day",
        icon: '❤️',
        impact: 'high',
        angle: 'Romantic Dinner',
        description: 'Couples looking for special dinner experiences'
      });
    }

    // Weekend signals
    if (dayOfWeek === 5) {
      signals.push({
        type: 'timing',
        name: 'Friday Night',
        icon: '🎉',
        impact: 'medium',
        angle: 'Weekend Kickoff',
        description: 'Families planning weekend dinners'
      });
    }

    if (dayOfWeek === 6 || dayOfWeek === 0) {
      signals.push({
        type: 'timing',
        name: 'Weekend',
        icon: '👨‍👩‍👧‍👦',
        impact: 'medium',
        angle: 'Family Weekend',
        description: 'Family dining and brunch opportunities'
      });
    }

    // Weather-based (simulated - would use real weather API)
    if (month >= 11 || month <= 2) {
      signals.push({
        type: 'weather',
        name: 'Cold Weather',
        icon: '❄️',
        impact: 'medium',
        angle: 'Comfort Food',
        description: 'Perfect weather for warm, hearty Mexican food'
      });
    }

    // Local context - NIU (Northern Illinois University)
    const isSchoolInSession = month >= 8 || month <= 4;
    if (isSchoolInSession) {
      signals.push({
        type: 'local',
        name: 'NIU In Session',
        icon: '🎓',
        impact: 'medium',
        angle: 'Student Specials',
        description: 'College students looking for affordable dining'
      });
    }

    // Cinco de Mayo
    if (month === 4 && day >= 1 && day <= 5) {
      signals.push({
        type: 'cultural',
        name: 'Cinco de Mayo',
        icon: '🇲🇽',
        impact: 'high',
        angle: 'Celebration',
        description: 'Peak season for Mexican restaurants'
      });
    }

    // Taco Tuesday
    if (dayOfWeek === 2) {
      signals.push({
        type: 'recurring',
        name: 'Taco Tuesday',
        icon: '🌮',
        impact: 'medium',
        angle: 'Taco Specials',
        description: 'Weekly tradition drives traffic'
      });
    }

    // Catering season signals
    if (month === 11 || month === 0) {
      signals.push({
        type: 'business',
        name: 'Holiday Catering Season',
        icon: '🎄',
        impact: 'high',
        angle: 'Catering Push',
        description: 'Corporate and family holiday parties'
      });
    }

    return signals;
  };

  // Determine the day's primary angle
  const determineAngle = (signals, dayOfWeek) => {
    // Priority: major_event > holiday > cultural > business > timing > weather > recurring
    const priorityOrder = ['major_event', 'holiday', 'cultural', 'business', 'timing', 'weather', 'recurring', 'local'];

    for (const priority of priorityOrder) {
      const signal = signals.find(s => s.type === priority);
      if (signal) {
        return {
          name: signal.angle,
          signal: signal,
          reasoning: `Based on ${signal.name}: ${signal.description}`
        };
      }
    }

    // Default angle based on day
    const defaultAngles = {
      0: { name: 'Family Sunday Brunch', reasoning: 'Sundays are prime family dining time' },
      1: { name: 'Monday Motivation', reasoning: 'Start the week with comfort food' },
      2: { name: 'Taco Tuesday', reasoning: 'Classic weekly promotion' },
      3: { name: 'Midweek Break', reasoning: 'Beat the midweek slump' },
      4: { name: 'Thirsty Thursday', reasoning: 'Margarita and happy hour focus' },
      5: { name: 'Friday Fiesta', reasoning: 'Weekend celebration kickoff' },
      6: { name: 'Saturday Special', reasoning: 'Family dinner destination' }
    };

    return defaultAngles[new Date().getDay()];
  };

  // Select content templates
  const selectTemplates = (angle, signals) => {
    const hasHighImpactSignal = signals.some(s => s.impact === 'high');

    return {
      offer: selectOfferTemplate(angle, hasHighImpactSignal),
      content: selectContentTemplate(angle, signals),
      faq: selectFAQTemplate(angle, signals)
    };
  };

  const selectOfferTemplate = (angle, isHighImpact) => {
    const templates = {
      'Game Day Fiesta': {
        title: 'Super Bowl Fiesta Pack',
        description: 'Feed your whole crew with our Game Day catering special',
        cta: 'ORDER_ONLINE',
        discount: '15% off catering orders $100+'
      },
      'Romantic Dinner': {
        title: "Valentine's Dinner for Two",
        description: 'Share an authentic Mexican feast with someone special',
        cta: 'CALL',
        discount: 'Free dessert with dinner for 2'
      },
      'Family Weekend': {
        title: 'Family Fiesta Deal',
        description: 'Bring the whole family - kids eat free on weekends',
        cta: 'GET_DIRECTIONS',
        discount: 'Kids eat free with adult entree'
      },
      'Comfort Food': {
        title: 'Warm Up Special',
        description: 'Beat the cold with our hearty Mexican comfort food',
        cta: 'ORDER_ONLINE',
        discount: 'Free soup with any entree'
      },
      'Taco Tuesday': {
        title: 'Taco Tuesday Deal',
        description: 'Our famous tacos at our best prices',
        cta: 'GET_DIRECTIONS',
        discount: '$2 tacos all day'
      },
      'Catering Push': {
        title: 'Holiday Catering Special',
        description: 'Let us cater your holiday gathering',
        cta: 'CALL',
        discount: 'Book now, save 20%'
      }
    };

    return templates[angle.name] || {
      title: "Today's Special",
      description: 'Fresh, authentic Mexican cuisine awaits',
      cta: 'GET_DIRECTIONS',
      discount: '10% off your visit today'
    };
  };

  const selectContentTemplate = (angle, signals) => {
    const templates = {
      'Game Day Fiesta': {
        type: 'EVENT',
        headline: '🏈 Super Bowl Party Headquarters',
        body: "Don't fumble your game day food! Rosita's has everything you need for the big game - from our famous nachos to family-size fajita platters. Order catering by Friday to guarantee delivery!",
        hashtags: '#SuperBowl #GameDayFood #DeKalbEats #MexicanFood'
      },
      'Romantic Dinner': {
        type: 'EVENT',
        headline: "❤️ Valentine's at Rosita's",
        body: "Make this Valentine's Day unforgettable with an authentic Mexican dinner. Candlelit tables, handcrafted margaritas, and dishes made with love. Reservations recommended!",
        hashtags: "#ValentinesDay #DateNight #DeKalbRestaurants"
      },
      'Family Weekend': {
        type: 'STANDARD',
        headline: '👨‍👩‍👧‍👦 Family Weekend at Rosita\'s',
        body: "This weekend, gather the family around our table. Fresh chips & salsa, sizzling fajitas, and memories in the making. Kids menu available!",
        hashtags: '#FamilyDinner #WeekendVibes #DeKalbIL'
      },
      'Taco Tuesday': {
        type: 'OFFER',
        headline: '🌮 Taco Tuesday is HERE!',
        body: "It's the day you've been waiting for! $2 tacos all day long. Carnitas, al pastor, carne asada - take your pick. See you at Rosita's!",
        hashtags: '#TacoTuesday #Tacos #DeKalbFood'
      }
    };

    return templates[angle.name] || {
      type: 'STANDARD',
      headline: `✨ ${angle.name} at Rosita's`,
      body: "Stop by Rosita's today for fresh, authentic Mexican cuisine. Made from scratch daily with recipes passed down through generations.",
      hashtags: '#RositasMexican #DeKalbIL #AuthenticMexican'
    };
  };

  const selectFAQTemplate = (angle, signals) => {
    const templates = {
      'Game Day Fiesta': {
        question: 'Does Rosita\'s offer Super Bowl catering?',
        answer: 'Yes! We offer complete game day catering packages including nachos, tacos, fajitas, and more. Order by Friday for Super Bowl Sunday delivery. Call (815) 756-3817 to place your order.'
      },
      'Romantic Dinner': {
        question: 'Does Rosita\'s take Valentine\'s Day reservations?',
        answer: "Yes, we accept reservations for Valentine's Day. We recommend booking early as tables fill quickly. Call (815) 756-3817 or visit us at 642 E Lincoln Hwy, DeKalb, IL."
      },
      'Catering Push': {
        question: 'Does Rosita\'s cater holiday parties?',
        answer: 'Absolutely! We cater events of all sizes with authentic Mexican food. Our catering menu includes taco bars, fajita platters, enchiladas, and more. Contact us for a custom quote.'
      }
    };

    return templates[angle.name] || {
      question: 'What are Rosita\'s hours today?',
      answer: 'We\'re open for lunch and dinner. Check our Google Business Profile for today\'s exact hours or call (815) 756-3817.'
    };
  };

  // Generate all draft content
  const generateDrafts = (angle, templates, signals) => {
    return {
      gbpPost: {
        type: templates.content.type,
        title: templates.content.headline,
        body: templates.content.body,
        cta: templates.offer.cta,
        status: 'draft'
      },
      offer: {
        title: templates.offer.title,
        description: templates.offer.description,
        discount: templates.offer.discount,
        cta: templates.offer.cta,
        status: 'draft'
      },
      faq: {
        question: templates.faq.question,
        answer: templates.faq.answer,
        status: 'draft'
      },
      reviewResponses: generateReviewResponses()
    };
  };

  // Generate review response drafts
  const generateReviewResponses = () => {
    if (!reviews || reviews.length === 0) return [];

    return reviews
      .filter(r => !r.reviewReply)
      .slice(0, 5)
      .map(review => ({
        reviewId: review.reviewId,
        reviewer: review.reviewer?.displayName || 'Guest',
        rating: review.starRating,
        comment: review.comment,
        suggestedReply: generateReplyForReview(review),
        status: 'draft'
      }));
  };

  const generateReplyForReview = (review) => {
    const rating = review.starRating;
    const name = review.reviewer?.displayName?.split(' ')[0] || 'there';

    if (rating === 'FIVE' || rating === 5) {
      return `Thank you so much, ${name}! We're thrilled you enjoyed your experience at Rosita's. Our team works hard to bring authentic Mexican flavors to DeKalb, and reviews like yours make it all worthwhile. We can't wait to serve you again soon! 🌮`;
    } else if (rating === 'FOUR' || rating === 4) {
      return `Thanks for the great review, ${name}! We're so glad you had a good time. If there's anything we can do to make your next visit even better, please let us know. See you soon!`;
    } else if (rating === 'THREE' || rating === 3) {
      return `Thank you for your feedback, ${name}. We appreciate you taking the time to share your experience. We'd love the opportunity to exceed your expectations next time. Please reach out if there's anything specific we can improve!`;
    } else {
      return `${name}, we're sorry to hear your experience didn't meet expectations. This isn't the standard we hold ourselves to. Please contact us directly at (815) 756-3817 so we can make this right. Your satisfaction matters to us.`;
    }
  };

  // Calculate metrics comparison (7 days vs previous 7 days) using real data
  const calculateMetricsComparison = () => {
    // Try to use real metrics if available
    if (metrics?.multiDailyMetricTimeSeries) {
      const totals = {
        calls: { current: 0, previous: 0 },
        directions: { current: 0, previous: 0 },
        clicks: { current: 0, previous: 0 },
        impressions: { current: 0, previous: 0 }
      };

      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const fourteenDaysAgo = new Date(today);
      fourteenDaysAgo.setDate(today.getDate() - 14);

      metrics.multiDailyMetricTimeSeries.forEach(metricData => {
        const metric = metricData.dailyMetric;
        const timeSeries = metricData.dailyMetricTimeSeries?.timeSeries?.datedValues || [];

        timeSeries.forEach(item => {
          const itemDate = new Date(item.date.year, item.date.month - 1, item.date.day);
          const value = parseInt(item.value) || 0;

          const isCurrentPeriod = itemDate >= sevenDaysAgo;
          const isPreviousPeriod = itemDate >= fourteenDaysAgo && itemDate < sevenDaysAgo;

          if (metric === 'CALL_CLICKS') {
            if (isCurrentPeriod) totals.calls.current += value;
            if (isPreviousPeriod) totals.calls.previous += value;
          } else if (metric === 'BUSINESS_DIRECTION_REQUESTS') {
            if (isCurrentPeriod) totals.directions.current += value;
            if (isPreviousPeriod) totals.directions.previous += value;
          } else if (metric === 'WEBSITE_CLICKS') {
            if (isCurrentPeriod) totals.clicks.current += value;
            if (isPreviousPeriod) totals.clicks.previous += value;
          } else if (metric.includes('IMPRESSIONS')) {
            if (isCurrentPeriod) totals.impressions.current += value;
            if (isPreviousPeriod) totals.impressions.previous += value;
          }
        });
      });

      // Calculate percentage changes
      const calcChange = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous * 100).toFixed(1);
      };

      return {
        calls: { ...totals.calls, change: parseFloat(calcChange(totals.calls.current, totals.calls.previous)) },
        directions: { ...totals.directions, change: parseFloat(calcChange(totals.directions.current, totals.directions.previous)) },
        clicks: { ...totals.clicks, change: parseFloat(calcChange(totals.clicks.current, totals.clicks.previous)) },
        impressions: { ...totals.impressions, change: parseFloat(calcChange(totals.impressions.current, totals.impressions.previous)) }
      };
    }

    // Fallback: use review count as a proxy metric if no performance data
    const reviewCount = reviews?.length || 0;
    const unrepliedCount = reviews?.filter(r => !r.reviewReply)?.length || 0;
    const avgRating = reviews?.length > 0
      ? reviews.reduce((sum, r) => {
          const rating = r.starRating === 'FIVE' ? 5 : r.starRating === 'FOUR' ? 4 : r.starRating === 'THREE' ? 3 : r.starRating === 'TWO' ? 2 : 1;
          return sum + rating;
        }, 0) / reviews.length
      : 0;

    return {
      calls: { current: '--', previous: '--', change: null },
      directions: { current: '--', previous: '--', change: null },
      clicks: { current: '--', previous: '--', change: null },
      impressions: { current: '--', previous: '--', change: null },
      // Additional metrics from reviews
      reviewCount: { current: reviewCount, label: 'Total Reviews' },
      unrepliedCount: { current: unrepliedCount, label: 'Needs Response' },
      avgRating: { current: avgRating.toFixed(1), label: 'Avg Rating' }
    };
  };

  // Get unreplied reviews
  const getUnrepliedReviews = () => {
    if (!reviews) return [];
    return reviews.filter(r => !r.reviewReply);
  };

  // Calculate confidence score
  const calculateConfidence = (signals) => {
    const highImpact = signals.filter(s => s.impact === 'high').length;
    const mediumImpact = signals.filter(s => s.impact === 'medium').length;

    let confidence = 60; // Base confidence
    confidence += highImpact * 15;
    confidence += mediumImpact * 8;

    return Math.min(confidence, 98);
  };

  // Determine priority level
  const determinePriority = (signals, unrepliedReviews) => {
    const hasHighImpact = signals.some(s => s.impact === 'high');
    const hasUrgentReviews = unrepliedReviews.some(r =>
      r.starRating === 'ONE' || r.starRating === 'TWO' || r.starRating === 1 || r.starRating === 2
    );

    if (hasHighImpact || hasUrgentReviews) return 'high';
    if (unrepliedReviews.length > 3) return 'medium';
    return 'normal';
  };

  const tabs = [
    { id: 'today', label: "Today's Strategy", icon: Zap },
    { id: 'campaign', label: 'Campaigns', icon: Megaphone },
    { id: 'events', label: 'Event Posts', icon: Calendar },
    { id: 'inbox', label: 'Review Inbox', icon: MessageSquare },
    { id: 'drafts', label: 'Content Drafts', icon: Edit3 },
    { id: 'measure', label: 'Measure', icon: TrendingUp },
    { id: 'answerhub', label: 'Answer Hub', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            AI Strategy Hub
          </h1>
          <p className="text-gray-500 mt-1">Daily content strategy powered by real-world signals</p>
        </div>
        <button
          onClick={generateTodayStrategy}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Regenerate Strategy
            </>
          )}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'today' && todayStrategy && (
        <TodayStrategyTab strategy={todayStrategy} isGenerating={isGenerating} />
      )}

      {activeTab === 'campaign' && (
        <CampaignHub />
      )}

      {activeTab === 'events' && (
        <EventPostGenerator />
      )}

      {activeTab === 'inbox' && todayStrategy && (
        <ReviewInboxTab
          reviews={todayStrategy.unrepliedReviews}
          responses={todayStrategy.drafts.reviewResponses}
        />
      )}

      {activeTab === 'drafts' && todayStrategy && (
        <ContentDraftsTab drafts={todayStrategy.drafts} angle={todayStrategy.angle} />
      )}

      {activeTab === 'measure' && todayStrategy && (
        <MeasureTab metrics={todayStrategy.metricsComparison} />
      )}

      {activeTab === 'answerhub' && (
        <AnswerHubTab />
      )}
    </div>
  );
}

// Today's Strategy Tab
function TodayStrategyTab({ strategy, isGenerating }) {
  if (isGenerating) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Brain className="w-16 h-16 text-purple-600 mx-auto animate-pulse" />
          <p className="mt-4 text-gray-600">Analyzing signals and generating strategy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Strategy Card */}
      <div className="lg:col-span-2 space-y-6">
        {/* Today's Angle */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-200 text-sm">Today's Content Angle</p>
              <h2 className="text-3xl font-bold mt-1">{strategy.angle.name}</h2>
              <p className="text-purple-100 mt-2">{strategy.angle.reasoning}</p>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-1">
              <span className="text-sm font-medium">{strategy.confidence}% confidence</span>
            </div>
          </div>

          {/* Signals */}
          <div className="mt-6">
            <p className="text-purple-200 text-sm mb-2">Active Signals</p>
            <div className="flex flex-wrap gap-2">
              {strategy.signals.map((signal, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    signal.impact === 'high'
                      ? 'bg-yellow-400 text-yellow-900'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  <span>{signal.icon}</span>
                  {signal.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Today's Action Items
          </h3>

          <div className="space-y-3">
            <ActionItem
              status={strategy.unrepliedReviews.length === 0 ? 'complete' : 'pending'}
              priority={strategy.unrepliedReviews.some(r => r.starRating <= 2) ? 'high' : 'normal'}
              title="Reply to reviews"
              description={`${strategy.unrepliedReviews.length} reviews awaiting response`}
            />
            <ActionItem
              status="pending"
              priority="normal"
              title="Publish GBP Post"
              description={strategy.drafts.gbpPost.title}
            />
            <ActionItem
              status="pending"
              priority="normal"
              title="Create Offer Post"
              description={strategy.drafts.offer.title}
            />
            <ActionItem
              status="pending"
              priority="low"
              title="Update FAQ"
              description={strategy.drafts.faq.question}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Calls (7d)"
            value={strategy.metricsComparison.calls.current}
            change={strategy.metricsComparison.calls.change}
            icon={Phone}
          />
          <StatCard
            label="Directions (7d)"
            value={strategy.metricsComparison.directions.current}
            change={strategy.metricsComparison.directions.change}
            icon={MapPin}
          />
          <StatCard
            label="Website Clicks"
            value={strategy.metricsComparison.clicks.current}
            change={strategy.metricsComparison.clicks.change}
            icon={Globe}
          />
          <StatCard
            label="Impressions"
            value={strategy.metricsComparison.impressions.current}
            change={strategy.metricsComparison.impressions.change}
            icon={Eye}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Priority Alert */}
        {strategy.priority === 'high' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">High Priority</h4>
                <p className="text-sm text-red-700 mt-1">
                  {strategy.signals.some(s => s.impact === 'high')
                    ? 'Major event detected - maximize visibility today!'
                    : 'Negative reviews need immediate attention'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Content Preview</h3>

          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">GBP Post</p>
              <p className="font-medium text-gray-900">{strategy.drafts.gbpPost.title}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{strategy.drafts.gbpPost.body}</p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 uppercase tracking-wide mb-1">Offer</p>
              <p className="font-medium text-gray-900">{strategy.drafts.offer.title}</p>
              <p className="text-sm text-green-700 mt-1">{strategy.drafts.offer.discount}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            Upcoming Opportunities
          </h3>

          <div className="space-y-3">
            <EventItem
              date="Feb 9"
              name="Super Bowl LVIII"
              impact="high"
            />
            <EventItem
              date="Feb 14"
              name="Valentine's Day"
              impact="high"
            />
            <EventItem
              date="Mar 17"
              name="St. Patrick's Day"
              impact="medium"
            />
            <EventItem
              date="May 5"
              name="Cinco de Mayo"
              impact="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Action Item Component
function ActionItem({ status, priority, title, description }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${
      status === 'complete' ? 'bg-green-50' : 'bg-gray-50'
    }`}>
      {status === 'complete' ? (
        <CheckCircle2 className="w-5 h-5 text-green-600" />
      ) : (
        <Clock className={`w-5 h-5 ${priority === 'high' ? 'text-red-500' : 'text-gray-400'}`} />
      )}
      <div className="flex-1">
        <p className={`font-medium ${status === 'complete' ? 'text-green-900' : 'text-gray-900'}`}>
          {title}
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {priority === 'high' && status !== 'complete' && (
        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Urgent</span>
      )}
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, change, icon: Icon }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 text-gray-400" />
        <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// Event Item Component
function EventItem({ date, name, impact }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
        <span className="text-xs font-bold text-purple-700">{date}</span>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{name}</p>
        <span className={`text-xs ${
          impact === 'high' ? 'text-red-600' : 'text-yellow-600'
        }`}>
          {impact === 'high' ? 'High Impact' : 'Medium Impact'}
        </span>
      </div>
    </div>
  );
}

// Review Inbox Tab
function ReviewInboxTab({ reviews, responses }) {
  const [selectedReview, setSelectedReview] = useState(null);

  const allReviews = responses || [];

  if (allReviews.length === 0) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-semibold text-green-900 mt-4">All Caught Up!</h3>
        <p className="text-green-700 mt-2">Every review has been responded to. Great job!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Review List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Pending Responses ({allReviews.length})
          </h3>
          <button className="text-sm text-purple-600 hover:text-purple-700">
            Approve All Drafts
          </button>
        </div>

        {allReviews.map((review, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedReview(review)}
            className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
              selectedReview?.reviewId === review.reviewId
                ? 'border-purple-500 ring-2 ring-purple-100'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{review.reviewer}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${
                      i < (review.rating === 'FIVE' ? 5 : review.rating === 'FOUR' ? 4 : review.rating === 'THREE' ? 3 : review.rating === 'TWO' ? 2 : 1)
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}>★</span>
                  ))}
                </div>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                Draft Ready
              </span>
            </div>
            {review.comment && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{review.comment}</p>
            )}
          </div>
        ))}
      </div>

      {/* Response Editor */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {selectedReview ? (
          <>
            <h3 className="font-semibold text-gray-900 mb-4">Draft Response</h3>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500">Original Review:</p>
              <p className="text-gray-700 mt-1">{selectedReview.comment || '(No comment)'}</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Your Response:</label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue={selectedReview.suggestedReply}
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Send className="w-4 h-4" />
                Publish Response
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Select a review to see the draft response</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Content Drafts Tab
function ContentDraftsTab({ drafts, angle }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Content Drafts for "{angle.name}"
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Send className="w-4 h-4" />
          Publish All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GBP Post Draft */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">GBP Post</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                drafts.gbpPost.type === 'EVENT'
                  ? 'bg-blue-100 text-blue-700'
                  : drafts.gbpPost.type === 'OFFER'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
              }`}>
                {drafts.gbpPost.type}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-900">{drafts.gbpPost.title}</h4>
            <p className="text-gray-600 mt-2">{drafts.gbpPost.body}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">CTA: {drafts.gbpPost.cta}</span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Draft */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-green-50 px-4 py-3 border-b border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">Offer Post</span>
              <Gift className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-900">{drafts.offer.title}</h4>
            <p className="text-gray-600 mt-2">{drafts.offer.description}</p>
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium">{drafts.offer.discount}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">CTA: {drafts.offer.cta}</span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Draft */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden lg:col-span-2">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">FAQ Update (Answer Hub)</span>
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Question:</label>
                <p className="font-medium text-gray-900 mt-1">{drafts.faq.question}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Answer:</label>
                <p className="text-gray-700 mt-1">{drafts.faq.answer}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Will be added to rositas.com/faq</span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Add to Answer Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Measure Tab - Dynamic with real data
function MeasureTab({ metrics }) {
  const hasRealData = metrics?.calls?.change !== null;

  // Generate dynamic recommendations based on actual metrics
  const generateRecommendations = () => {
    const recs = [];

    if (hasRealData) {
      // Based on actual performance
      if (metrics.calls.change > 10) {
        recs.push({ type: 'keep', text: 'Phone calls up significantly - your CTAs are working! Keep using "Call Now" buttons.' });
      } else if (metrics.calls.change < -10) {
        recs.push({ type: 'action', text: 'Phone calls declining - test more prominent phone CTAs in your posts.' });
      }

      if (metrics.directions.change > 10) {
        recs.push({ type: 'keep', text: 'Direction requests growing - location-based content is resonating.' });
      } else if (metrics.directions.change < 0) {
        recs.push({ type: 'action', text: 'Direction requests down - try posts highlighting your location and parking.' });
      }

      if (metrics.clicks.change > 15) {
        recs.push({ type: 'keep', text: 'Website traffic from GBP is strong - maintain current posting frequency.' });
      }

      if (metrics.impressions.change < 0) {
        recs.push({ type: 'action', text: 'Search impressions declining - increase posting frequency to 3-4x per week.' });
      }
    }

    // Default recommendations if no specific ones
    if (recs.length === 0) {
      recs.push(
        { type: 'action', text: 'Post at least 3x per week to maintain visibility in local search.' },
        { type: 'action', text: 'Respond to all reviews within 24 hours to boost engagement signals.' },
        { type: 'action', text: 'Use Offer posts on Tuesdays to capitalize on Taco Tuesday traffic.' }
      );
    }

    return recs;
  };

  const recommendations = generateRecommendations();

  // Weekly targets for the business
  const weeklyTargets = {
    calls: { target: 50, label: 'Phone Calls', description: 'Goal: 50 calls/week from GBP' },
    directions: { target: 100, label: 'Direction Requests', description: 'Goal: 100 directions/week' },
    clicks: { target: 75, label: 'Website Clicks', description: 'Goal: 75 website clicks/week' },
    impressions: { target: 3000, label: 'Search Impressions', description: 'Goal: 3,000 impressions/week' }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Performance: Last 7 Days vs Previous 7 Days</h3>
        <div className="flex items-center gap-2">
          {!hasRealData && (
            <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
              Performance API data unavailable - showing targets only
            </span>
          )}
        </div>
      </div>

      {/* Main Metrics with Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Phone Calls"
          current={metrics.calls.current}
          previous={metrics.calls.previous}
          change={metrics.calls.change}
          target={weeklyTargets.calls.target}
          icon={Phone}
          color="blue"
        />
        <MetricCard
          title="Direction Requests"
          current={metrics.directions.current}
          previous={metrics.directions.previous}
          change={metrics.directions.change}
          target={weeklyTargets.directions.target}
          icon={MapPin}
          color="green"
        />
        <MetricCard
          title="Website Clicks"
          current={metrics.clicks.current}
          previous={metrics.clicks.previous}
          change={metrics.clicks.change}
          target={weeklyTargets.clicks.target}
          icon={Globe}
          color="purple"
        />
        <MetricCard
          title="Search Impressions"
          current={metrics.impressions.current}
          previous={metrics.impressions.previous}
          change={metrics.impressions.change}
          target={weeklyTargets.impressions.target}
          icon={Eye}
          color="yellow"
        />
      </div>

      {/* Weekly Targets Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Weekly Targets Progress</h4>
        <div className="space-y-4">
          {Object.entries(weeklyTargets).map(([key, { target, label, description }]) => {
            const current = typeof metrics[key]?.current === 'number' ? metrics[key].current : 0;
            const progress = Math.min((current / target) * 100, 100);
            const isOnTrack = progress >= 70;

            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <span className="text-sm text-gray-500">
                    {typeof metrics[key]?.current === 'number' ? metrics[key].current : '--'} / {target} ({progress.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isOnTrack ? 'bg-green-500' : progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Success Metrics & Benchmarks</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">100%</p>
            <p className="text-sm text-gray-600 mt-1">Review Response Rate</p>
            <p className="text-xs text-gray-500 mt-1">Target: Respond to all reviews within 24hrs</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">3-4x</p>
            <p className="text-sm text-gray-600 mt-1">Weekly Post Frequency</p>
            <p className="text-xs text-gray-500 mt-1">Target: Min 3 posts per week</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">4.5+</p>
            <p className="text-sm text-gray-600 mt-1">Average Star Rating</p>
            <p className="text-xs text-gray-500 mt-1">Target: Maintain 4.5+ stars</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Recommendations Based on Your Data
        </h4>
        <ul className="space-y-3 text-purple-800">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                rec.type === 'keep' ? 'bg-green-500' : rec.type === 'action' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <span>{rec.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Metric Card for Measure Tab
function MetricCard({ title, current, previous, change, target, icon: Icon, color }) {
  const isPositive = change !== null && change >= 0;
  const hasData = current !== '--' && current !== null;
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== null ? (
          <span className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(change).toFixed(1)}%
          </span>
        ) : (
          <span className="text-xs text-gray-400">No data</span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900">{hasData ? current : '--'}</h3>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-400">Previous: {hasData ? previous : '--'}</p>
        {target && (
          <p className="text-xs text-blue-600">Target: {target}</p>
        )}
      </div>
    </div>
  );
}

// Answer Hub Tab - Full editing capability
function AnswerHubTab() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What are Rosita's hours?",
      answer: "Rosita's is open Monday-Thursday 11am-9pm, Friday-Saturday 11am-10pm, and Sunday 11am-8pm.",
      status: 'published',
      lastUpdated: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      question: "Does Rosita's offer catering?",
      answer: "Yes! Rosita's offers full-service catering for events of all sizes. Our catering menu includes taco bars, fajita platters, enchiladas, and more. Contact us at (815) 756-3817 for a custom quote.",
      status: 'published',
      lastUpdated: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      question: "Does Rosita's have vegetarian options?",
      answer: "Absolutely! We offer many vegetarian dishes including cheese enchiladas, veggie fajitas, bean burritos, and cheese quesadillas. Ask your server about our vegetarian specials!",
      status: 'published',
      lastUpdated: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      question: "Does Rosita's take reservations?",
      answer: "Yes, we accept reservations for parties of 6 or more. Call (815) 756-3817 to book your table. Walk-ins are always welcome!",
      status: 'draft',
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  ]);

  const [editingFaq, setEditingFaq] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [saveStatus, setSaveStatus] = useState(null);

  const handleEdit = (faq) => {
    setEditingFaq({ ...faq });
  };

  const handleSaveEdit = () => {
    setFaqs(faqs.map(f => f.id === editingFaq.id ? {
      ...editingFaq,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : f));
    setEditingFaq(null);
    setSaveStatus('Saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handlePublish = (faqId) => {
    setFaqs(faqs.map(f => f.id === faqId ? {
      ...f,
      status: 'published',
      lastUpdated: new Date().toISOString().split('T')[0]
    } : f));
    setSaveStatus('Published to Answer Hub!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;

    const faq = {
      id: Date.now(),
      question: newFaq.question,
      answer: newFaq.answer,
      status: 'draft',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setFaqs([...faqs, faq]);
    setNewFaq({ question: '', answer: '' });
    setShowAddModal(false);
    setSaveStatus('FAQ added as draft!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDelete = (faqId) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(f => f.id !== faqId));
    }
  };

  const handleCopyToClipboard = (faq) => {
    const text = `Q: ${faq.question}\nA: ${faq.answer}`;
    navigator.clipboard.writeText(text);
    setSaveStatus('Copied to clipboard!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Save Status Toast */}
      {saveStatus && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {saveStatus}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Answer Hub - AI Search Optimization
        </h3>
        <p className="text-blue-100 mt-2">
          Create citation-worthy content that AI systems can quote. These FAQs make Rosita's the
          verifiable answer when people ask AI about Mexican food in DeKalb.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{faqs.filter(f => f.status === 'published').length}</p>
            <p className="text-sm text-blue-100">Published FAQs</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{faqs.filter(f => f.status === 'draft').length}</p>
            <p className="text-sm text-blue-100">Draft FAQs</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{faqs.length}</p>
            <p className="text-sm text-blue-100">Total FAQs</p>
          </div>
        </div>
      </div>

      {/* Entity Consistency Check */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Entity Consistency (NAP)</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Business Name</p>
                <p className="text-sm text-gray-600">Rosita's Mexican Restaurant</p>
              </div>
            </div>
            <span className="text-green-600 text-sm">Consistent</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-sm text-gray-600">642 E Lincoln Hwy, DeKalb, IL 60115</p>
              </div>
            </div>
            <span className="text-green-600 text-sm">Consistent</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">(815) 756-3817</p>
              </div>
            </div>
            <span className="text-green-600 text-sm">Consistent</span>
          </div>
        </div>
      </div>

      {/* FAQ Management */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">FAQ Content (Indexable Answers)</h4>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            <Edit3 className="w-4 h-4" />
            Add New FAQ
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6">
              {editingFaq?.id === faq.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <textarea
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingFaq(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        faq.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {faq.status}
                      </span>
                      <span className="text-xs text-gray-400">Updated {faq.lastUpdated}</span>
                    </div>
                    <h5 className="font-medium text-gray-900">{faq.question}</h5>
                    <p className="text-gray-600 mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyToClipboard(faq)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {faq.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(faq.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                        title="Publish"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New FAQ</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  placeholder="What question do customers frequently ask?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  placeholder="Provide a clear, concise answer..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 pt-4">
                <button
                  onClick={handleAddFaq}
                  disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add FAQ
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewFaq({ question: '', answer: '' });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Schema.org FAQ Markup</h4>
          <button
            onClick={() => {
              const schema = generateFAQSchema(faqs.filter(f => f.status === 'published'));
              navigator.clipboard.writeText(schema);
              setSaveStatus('Schema copied to clipboard!');
              setTimeout(() => setSaveStatus(null), 3000);
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Copy Schema
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Add this to your website's FAQ page for AI search optimization:
        </p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre-wrap text-gray-700">
{generateFAQSchema(faqs.filter(f => f.status === 'published'))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate FAQ Schema
function generateFAQSchema(faqs) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return JSON.stringify(schema, null, 2);
}
