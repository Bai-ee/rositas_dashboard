import React, { useState, useEffect } from 'react';
import {
  Target,
  Calendar,
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Send,
  MapPin,
  Phone,
  FileText,
  BarChart3,
  Trophy,
  Heart,
  Gift,
  Utensils,
  Flag,
  Globe,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Campaign Templates - These are generated based on the master prompt
const CAMPAIGN_TEMPLATES = {
  superbowl: {
    id: 'superbowl',
    name: 'Super Bowl LVIII',
    icon: '🏈',
    date: 'February 9, 2025',
    color: 'from-green-600 to-emerald-700',
    products: [
      { name: 'Deluxe Kit', price: 25, serves: '8-10', items: ['½ pan chips', 'Refried beans, cheese, peppers', 'Sour cream + guacamole on side'] },
      { name: 'Olé Kit', price: 25, serves: '8-10', items: ['½ pan chips', 'Refried beans, beef', 'Cheese, peppers, onions, tomatoes', 'Sour cream on side'] },
      { name: 'Taco Kit', price: 99, serves: '8-10', items: ['20 crispy taco shells', 'Beef or chicken filling', 'Lettuce, tomato, cheese', '24oz queso con pico', 'Chips + sour cream'] }
    ],
    campaign: {
      campaign_objective: "Sell maximum carry-out platters for Super Bowl Sunday. Target 50+ kit orders. Generate $2,500+ in Super Bowl weekend revenue.",
      target_segments: [
        {
          name: "NIU Watch Party Hosts",
          why_they_convert: "Students hosting 5-15 friends, price-sensitive but want easy solution. High social proof potential.",
          core_message: "Feed your whole crew for less than $3/person",
          best_platform: "Instagram",
          priority: 1
        },
        {
          name: "DeKalb Family Hosts",
          why_they_convert: "Parents hosting family gatherings, want reliable local option, prefer phone ordering",
          core_message: "Game day food that actually fills everyone up",
          best_platform: "Facebook",
          priority: 2
        },
        {
          name: "Last-Minute Planners",
          why_they_convert: "Procrastinators searching 'Super Bowl food near me' on game day weekend",
          core_message: "Still time to order — pickup available until kickoff",
          best_platform: "Google Business Profile",
          priority: 3
        },
        {
          name: "Local Small Businesses",
          why_they_convert: "Office watch parties, can expense it, want hassle-free catering",
          core_message: "Office party sorted in one call",
          best_platform: "Facebook",
          priority: 4
        }
      ],
      budget_allocation: {
        total: 400,
        google_business_profile: { amount: 0, note: "Organic posts only - high intent searchers" },
        instagram: { amount: 200, note: "Target NIU students 18-24, 5-mile radius" },
        facebook: { amount: 200, note: "Target families 28-55, DeKalb + Sycamore" },
        breakdown: "50/50 split between platforms reaching different segments"
      },
      platform_strategies: {
        google_business_profile: {
          tactics: [
            "Post Super Bowl menu 10 days before game",
            "Update hours to show extended pickup times",
            "Add 'Super Bowl Catering' to business description temporarily",
            "Post daily countdown 5 days before",
            "Enable messaging for quick orders"
          ],
          posting_times: ["Mon 11am", "Wed 6pm", "Fri 12pm", "Sat 10am", "Sun 9am"],
          geo_radius: "N/A - organic reach"
        },
        instagram: {
          tactics: [
            "Reels showing kit assembly (15-30 sec)",
            "Stories with countdown sticker",
            "Collab post with local NIU pages if possible",
            "UGC repost from previous customers",
            "Story poll: 'Which kit for your party?'"
          ],
          ad_targeting: {
            age: "18-34",
            radius: "5 miles from NIU campus",
            interests: ["NFL", "Super Bowl", "College Football", "Mexican Food"]
          },
          posting_times: ["Daily 6-8pm", "Game day morning 10am"]
        },
        facebook: {
          tactics: [
            "Event post for Super Bowl ordering",
            "Carousel ad showing all 3 kits",
            "Testimonial post from previous customer",
            "Share in DeKalb community groups (organic)",
            "Messenger auto-reply for orders"
          ],
          ad_targeting: {
            age: "28-55",
            radius: "10 miles",
            interests: ["Cooking", "NFL", "Family", "Local Events"],
            behaviors: ["Parents", "Homeowners"]
          },
          posting_times: ["Tue 7pm", "Thu 12pm", "Sat 9am"]
        }
      },
      creative_hooks: [
        {
          type: "headline",
          text: "Super Bowl Sunday Sorted",
          use_for: "Primary ad headline"
        },
        {
          type: "headline",
          text: "Feed 10 People. Under $100.",
          use_for: "Value-focused ads"
        },
        {
          type: "hook",
          text: "Your friends are coming over. The fridge is empty. We got you.",
          use_for: "Instagram Reel opener"
        },
        {
          type: "hook",
          text: "Still figuring out game day food?",
          use_for: "Retargeting ads"
        },
        {
          type: "cta",
          text: "Call now — limited kits available",
          use_for: "Scarcity push"
        },
        {
          type: "cta",
          text: "Order by Friday, pickup Sunday",
          use_for: "Deadline clarity"
        },
        {
          type: "visual",
          text: "Overhead shot of full spread on coffee table with TV showing football in background",
          use_for: "Hero image"
        },
        {
          type: "visual",
          text: "Side-by-side of all 3 kits with price tags",
          use_for: "Comparison post"
        }
      ],
      posting_schedule: {
        "10_days_before": {
          date: "Jan 30",
          tasks: [
            { platform: "GBP", action: "Post Super Bowl menu announcement", status: "pending" },
            { platform: "Instagram", action: "Teaser Reel: 'Something big is coming'", status: "pending" },
            { platform: "Facebook", action: "Create event: Super Bowl Ordering", status: "pending" }
          ]
        },
        "7_days_before": {
          date: "Feb 2",
          tasks: [
            { platform: "Instagram", action: "Launch paid ads targeting NIU", status: "pending" },
            { platform: "Facebook", action: "Launch paid ads targeting families", status: "pending" },
            { platform: "GBP", action: "Update business description with Super Bowl mention", status: "pending" }
          ]
        },
        "5_days_before": {
          date: "Feb 4",
          tasks: [
            { platform: "Instagram", action: "Stories: Kit breakdown with prices", status: "pending" },
            { platform: "Facebook", action: "Carousel post: All 3 kits", status: "pending" },
            { platform: "GBP", action: "Post: '5 days until kickoff - order now'", status: "pending" }
          ]
        },
        "3_days_before": {
          date: "Feb 6",
          tasks: [
            { platform: "Instagram", action: "Reel: Kit assembly video", status: "pending" },
            { platform: "Facebook", action: "Testimonial post", status: "pending" },
            { platform: "All", action: "Increase ad spend 20%", status: "pending" }
          ]
        },
        "1_day_before": {
          date: "Feb 8",
          tasks: [
            { platform: "Instagram", action: "Stories: 'Last chance to order'", status: "pending" },
            { platform: "Facebook", action: "Final push post with phone number", status: "pending" },
            { platform: "GBP", action: "Post: Pickup times for tomorrow", status: "pending" }
          ]
        },
        "game_day": {
          date: "Feb 9",
          tasks: [
            { platform: "Instagram", action: "Stories: Behind the scenes prep", status: "pending" },
            { platform: "Facebook", action: "Post: 'Pickups happening now!'", status: "pending" },
            { platform: "GBP", action: "Update hours, respond to any questions", status: "pending" }
          ]
        }
      },
      conversion_constraints: [
        {
          type: "scarcity",
          message: "Limited kits available — we sell out every year",
          where_to_use: "All platforms, especially last 3 days"
        },
        {
          type: "pickup_clarity",
          message: "Pickup: Sunday Feb 9, 10am-5pm. 642 E Lincoln Hwy.",
          where_to_use: "Every post and ad"
        },
        {
          type: "deadline",
          message: "Order by Saturday 6pm for guaranteed availability",
          where_to_use: "Final 48 hours"
        },
        {
          type: "ordering",
          message: "Call (815) 756-3817 to order. Cash or card at pickup.",
          where_to_use: "Primary CTA on all content"
        }
      ],
      success_metrics: [
        {
          metric: "Kit Orders",
          target: "50+ total orders",
          measurement: "Phone log + POS data"
        },
        {
          metric: "Revenue",
          target: "$2,500+ Super Bowl weekend",
          measurement: "POS total for Feb 8-9"
        },
        {
          metric: "Ad ROAS",
          target: "5x return ($400 spend → $2,000+ attributed)",
          measurement: "Track 'saw ad' mentions at pickup"
        },
        {
          metric: "GBP Actions",
          target: "100+ direction requests, 50+ calls",
          measurement: "GBP Insights for Feb 1-9"
        }
      ],
      failure_signals: [
        "Less than 10 orders by Thursday Feb 6 → increase scarcity messaging",
        "Low engagement on Instagram → shift budget to Facebook",
        "GBP not driving calls → add phone number to every post"
      ]
    }
  },
  valentines: {
    id: 'valentines',
    name: "Valentine's Day",
    icon: '❤️',
    date: 'February 14, 2025',
    color: 'from-pink-600 to-rose-700',
    products: [
      { name: 'Dinner for Two', price: 45, serves: '2', items: ['2 entrees of choice', 'Shared appetizer', 'Rice & beans', 'Complimentary dessert'] },
      { name: 'Romance Package', price: 65, serves: '2', items: ['Fajitas for 2', 'Guacamole', '2 margaritas', 'Churros'] },
      { name: 'Family Valentine', price: 89, serves: '4-6', items: ['Family fajita platter', 'Nachos', 'Kids meals included', 'Dessert sampler'] }
    ],
    campaign: null // Will be generated
  },
  cincodemayo: {
    id: 'cincodemayo',
    name: 'Cinco de Mayo',
    icon: '🇲🇽',
    date: 'May 5, 2025',
    color: 'from-green-600 to-red-600',
    products: [],
    campaign: null
  }
};

export default function CampaignHub() {
  const { reviews, posts, metrics, selectedLocation, createPost } = useApp();
  const [activeCampaign, setActiveCampaign] = useState('superbowl');
  const [expandedSections, setExpandedSections] = useState({
    segments: true,
    budget: true,
    schedule: true,
    creative: false,
    metrics: false
  });
  const [taskStatuses, setTaskStatuses] = useState({});

  const campaign = CAMPAIGN_TEMPLATES[activeCampaign];
  const campaignData = campaign?.campaign;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleTask = (scheduleKey, taskIndex) => {
    const key = `${scheduleKey}-${taskIndex}`;
    setTaskStatuses(prev => ({
      ...prev,
      [key]: prev[key] === 'completed' ? 'pending' : 'completed'
    }));
  };

  const getTaskStatus = (scheduleKey, taskIndex) => {
    return taskStatuses[`${scheduleKey}-${taskIndex}`] || 'pending';
  };

  const calculateProgress = () => {
    if (!campaignData?.posting_schedule) return 0;
    let total = 0;
    let completed = 0;
    Object.entries(campaignData.posting_schedule).forEach(([key, schedule]) => {
      schedule.tasks.forEach((_, idx) => {
        total++;
        if (getTaskStatus(key, idx) === 'completed') completed++;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (!campaignData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-yellow-900">Campaign Not Generated</h3>
        <p className="text-yellow-700 mt-2">This campaign strategy hasn't been generated yet.</p>
        <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          Generate with AI
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campaign Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Object.values(CAMPAIGN_TEMPLATES).map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCampaign(c.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 whitespace-nowrap transition-all ${
              activeCampaign === c.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-500">{c.date}</p>
            </div>
            {c.campaign && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Campaign Header */}
      <div className={`bg-gradient-to-r ${campaign.color} rounded-xl p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{campaign.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{campaign.name} Campaign</h2>
                <p className="text-white/80">{campaign.date}</p>
              </div>
            </div>
            <p className="text-white/90 mt-2 max-w-2xl">{campaignData.campaign_objective}</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm text-white/80">Progress</p>
              <p className="text-3xl font-bold">{calculateProgress()}%</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">${campaignData.budget_allocation.total}</p>
            <p className="text-sm text-white/80">Total Budget</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{campaignData.target_segments.length}</p>
            <p className="text-sm text-white/80">Segments</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-white/80">Platforms</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{Object.keys(campaignData.posting_schedule).length}</p>
            <p className="text-sm text-white/80">Milestones</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-purple-600" />
          Campaign Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaign.products.map((product, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <span className="text-xl font-bold text-green-600">${product.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Serves {product.serves}</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Target Segments */}
      <CollapsibleSection
        title="Target Segments"
        icon={Users}
        isExpanded={expandedSections.segments}
        onToggle={() => toggleSection('segments')}
      >
        <div className="space-y-4">
          {campaignData.target_segments.map((segment, idx) => (
            <div key={idx} className={`border-l-4 ${
              segment.priority === 1 ? 'border-green-500 bg-green-50' :
              segment.priority === 2 ? 'border-blue-500 bg-blue-50' :
              segment.priority === 3 ? 'border-yellow-500 bg-yellow-50' :
              'border-gray-300 bg-gray-50'
            } rounded-r-lg p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      segment.priority === 1 ? 'bg-green-200 text-green-800' :
                      segment.priority === 2 ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      Priority {segment.priority}
                    </span>
                    <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{segment.why_they_convert}</p>
                </div>
                <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">
                  {segment.best_platform}
                </span>
              </div>
              <div className="mt-3 p-2 bg-white rounded">
                <p className="text-sm text-gray-500">Core Message:</p>
                <p className="font-medium text-gray-900">"{segment.core_message}"</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Budget Allocation */}
      <CollapsibleSection
        title="Budget Allocation"
        icon={DollarSign}
        isExpanded={expandedSections.budget}
        onToggle={() => toggleSection('budget')}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BudgetCard
            platform="Google Business Profile"
            amount={campaignData.budget_allocation.google_business_profile.amount}
            note={campaignData.budget_allocation.google_business_profile.note}
            color="blue"
          />
          <BudgetCard
            platform="Instagram"
            amount={campaignData.budget_allocation.instagram.amount}
            note={campaignData.budget_allocation.instagram.note}
            color="pink"
          />
          <BudgetCard
            platform="Facebook"
            amount={campaignData.budget_allocation.facebook.amount}
            note={campaignData.budget_allocation.facebook.note}
            color="blue"
          />
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">{campaignData.budget_allocation.breakdown}</p>
      </CollapsibleSection>

      {/* Posting Schedule / Action Items */}
      <CollapsibleSection
        title="Campaign Timeline & Actions"
        icon={Calendar}
        isExpanded={expandedSections.schedule}
        onToggle={() => toggleSection('schedule')}
      >
        <div className="space-y-4">
          {Object.entries(campaignData.posting_schedule).map(([key, schedule]) => (
            <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{schedule.date}</span>
                  <span className="text-sm text-gray-500">
                    ({key.replace(/_/g, ' ')})
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {schedule.tasks.filter((_, idx) => getTaskStatus(key, idx) === 'completed').length}/{schedule.tasks.length} complete
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {schedule.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                      getTaskStatus(key, idx) === 'completed' ? 'bg-green-50' : ''
                    }`}
                    onClick={() => toggleTask(key, idx)}
                  >
                    <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      getTaskStatus(key, idx) === 'completed'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {getTaskStatus(key, idx) === 'completed' && (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                    </button>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      task.platform === 'GBP' ? 'bg-blue-100 text-blue-700' :
                      task.platform === 'Instagram' ? 'bg-pink-100 text-pink-700' :
                      task.platform === 'Facebook' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.platform}
                    </span>
                    <span className={`flex-1 ${
                      getTaskStatus(key, idx) === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Creative Hooks */}
      <CollapsibleSection
        title="Creative Hooks & Copy"
        icon={Sparkles}
        isExpanded={expandedSections.creative}
        onToggle={() => toggleSection('creative')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaignData.creative_hooks.map((hook, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  hook.type === 'headline' ? 'bg-purple-100 text-purple-700' :
                  hook.type === 'hook' ? 'bg-blue-100 text-blue-700' :
                  hook.type === 'cta' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {hook.type}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(hook.text);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="font-medium text-gray-900">{hook.text}</p>
              <p className="text-xs text-gray-500 mt-2">Use for: {hook.use_for}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Success Metrics */}
      <CollapsibleSection
        title="Success Metrics & KPIs"
        icon={BarChart3}
        isExpanded={expandedSections.metrics}
        onToggle={() => toggleSection('metrics')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {campaignData.success_metrics.map((metric, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
              <p className="text-2xl font-bold text-green-600 mt-1">{metric.target}</p>
              <p className="text-sm text-gray-500 mt-1">Measured by: {metric.measurement}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            Failure Signals & Adjustments
          </h4>
          <ul className="space-y-2">
            {campaignData.failure_signals.map((signal, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>

      {/* Conversion Constraints */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Conversion Constraints (Must Include in All Content)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaignData.conversion_constraints.map((constraint, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                constraint.type === 'scarcity' ? 'bg-red-100 text-red-700' :
                constraint.type === 'deadline' ? 'bg-yellow-100 text-yellow-700' :
                constraint.type === 'pickup_clarity' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {constraint.type.replace(/_/g, ' ')}
              </span>
              <p className="font-medium text-gray-900 mt-2">"{constraint.message}"</p>
              <p className="text-xs text-gray-500 mt-1">Where: {constraint.where_to_use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, isExpanded, onToggle, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
      >
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Icon className="w-5 h-5 text-purple-600" />
          {title}
        </h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Budget Card Component
function BudgetCard({ platform, amount, note, color }) {
  return (
    <div className={`border rounded-lg p-4 ${
      color === 'pink' ? 'border-pink-200 bg-pink-50' :
      color === 'blue' ? 'border-blue-200 bg-blue-50' :
      'border-gray-200 bg-gray-50'
    }`}>
      <h4 className="font-medium text-gray-900">{platform}</h4>
      <p className="text-3xl font-bold text-gray-900 mt-1">
        {amount === 0 ? 'Free' : `$${amount}`}
      </p>
      <p className="text-sm text-gray-600 mt-2">{note}</p>
    </div>
  );
}
