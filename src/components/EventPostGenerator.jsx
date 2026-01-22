import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Trophy,
  Heart,
  Sun,
  Snowflake,
  Users,
  Gift,
  Utensils,
  GraduationCap,
  MapPin,
  Phone,
  Globe,
  Clock,
  RefreshCw,
  Copy,
  Send,
  ChevronDown,
  ChevronUp,
  Image,
  Link,
  AlertCircle
} from 'lucide-react';

// Predefined events with content templates
const events = [
  {
    id: 'superbowl',
    name: 'Super Bowl LVIII',
    date: 'February 9, 2025',
    icon: '🏈',
    category: 'Sports',
    impact: 'Very High',
    description: 'The biggest food ordering day of the year',
    color: 'from-green-600 to-emerald-700',
    templates: {
      standard: {
        title: '🏈 Super Bowl Party Headquarters',
        body: "Don't fumble your game day food! Rosita's has everything you need for the big game - from our famous nachos to family-size fajita platters. Order catering by Friday to guarantee delivery!\n\n✅ Taco bars starting at $12/person\n✅ Nacho stations for 20+ guests\n✅ Family fajita platters\n✅ Fresh guacamole by the pound\n\n📞 Call (815) 756-3817 to order!",
        cta: 'CALL',
      },
      offer: {
        title: '🏈 Game Day Catering Special',
        body: 'Score big with Rosita\'s! Get 15% off all catering orders of $100 or more for Super Bowl Sunday. Feed your whole crew with authentic Mexican food that\'s sure to be a touchdown!',
        discount: '15% off catering orders $100+',
        cta: 'CALL',
      },
      event: {
        title: '🏈 Super Bowl Watch Party at Rosita\'s',
        body: 'Join us Super Bowl Sunday! Big screens, great food, and cold drinks. The best place to watch the big game in DeKalb!',
        startDate: '2025-02-09T17:00:00',
        endDate: '2025-02-09T23:00:00',
        cta: 'CALL',
      }
    }
  },
  {
    id: 'valentines',
    name: "Valentine's Day",
    date: 'February 14, 2025',
    icon: '❤️',
    category: 'Holiday',
    impact: 'High',
    description: 'Romantic dinner opportunity',
    color: 'from-pink-600 to-rose-700',
    templates: {
      standard: {
        title: "❤️ Valentine's Day at Rosita's",
        body: "Make this Valentine's Day unforgettable with an authentic Mexican dinner for two. Candlelit tables, handcrafted margaritas, and dishes made with love.\n\n🌹 Romantic atmosphere\n🍹 Specialty cocktails\n🍰 Complimentary dessert for couples\n\nReservations recommended!\n📞 (815) 756-3817",
        cta: 'CALL',
      },
      offer: {
        title: "❤️ Valentine's Dinner Special",
        body: "Share the love (and the fajitas!) this Valentine's Day. Book your romantic dinner at Rosita's and receive a complimentary dessert for two!",
        discount: 'Free dessert with dinner for 2',
        cta: 'CALL',
      },
      event: {
        title: "❤️ Valentine's Dinner at Rosita's",
        body: 'Join us for a romantic Valentine\'s dinner! Special menu, candlelit ambiance, and love in the air. Reservations strongly recommended.',
        startDate: '2025-02-14T17:00:00',
        endDate: '2025-02-14T22:00:00',
        cta: 'CALL',
      }
    }
  },
  {
    id: 'cincodemayo',
    name: 'Cinco de Mayo',
    date: 'May 5, 2025',
    icon: '🇲🇽',
    category: 'Cultural',
    impact: 'Very High',
    description: 'Biggest day for Mexican restaurants',
    color: 'from-green-600 to-red-600',
    templates: {
      standard: {
        title: '🇲🇽 Cinco de Mayo Fiesta!',
        body: "The biggest celebration of the year is HERE! Join Rosita's for Cinco de Mayo - the party starts at 11am!\n\n🎉 Live mariachi music\n🍹 Margarita specials all day\n🌮 Authentic Mexican cuisine\n🎊 Festive atmosphere\n\n¡Viva la fiesta!",
        cta: 'GET_DIRECTIONS',
      },
      offer: {
        title: '🇲🇽 Cinco de Mayo Special!',
        body: 'Celebrate Cinco de Mayo with half-price margaritas all day! Plus 25% off party catering. The biggest fiesta in DeKalb is at Rosita\'s!',
        discount: 'Half-price margaritas + 25% off catering',
        cta: 'GET_DIRECTIONS',
      },
      event: {
        title: '🇲🇽 Cinco de Mayo Celebration',
        body: "DeKalb's biggest Cinco de Mayo party! Live music, drink specials, authentic food, and a whole lot of fiesta. Don't miss it!",
        startDate: '2025-05-05T11:00:00',
        endDate: '2025-05-05T23:00:00',
        cta: 'GET_DIRECTIONS',
      }
    }
  },
  {
    id: 'mothersday',
    name: "Mother's Day",
    date: 'May 11, 2025',
    icon: '💐',
    category: 'Holiday',
    impact: 'Very High',
    description: '#1 restaurant day of the year',
    color: 'from-purple-600 to-pink-600',
    templates: {
      standard: {
        title: "💐 Treat Mom to Rosita's",
        body: "This Mother's Day, give Mom the gift of delicious Mexican food and quality family time. Our chefs are preparing something special!\n\n👩‍👧‍👦 Family-style platters\n🌮 Mom's favorites made fresh\n🍹 Complimentary mimosa for moms\n\nReservations recommended - we fill up fast!\n📞 (815) 756-3817",
        cta: 'CALL',
      },
      offer: {
        title: "💐 Mother's Day Special",
        body: "Moms deserve the best! Bring mom to Rosita's this Mother's Day and she eats FREE with purchase of 2+ entrees. Show her how much you care!",
        discount: 'Moms eat FREE with 2+ entrees',
        cta: 'CALL',
      },
      event: {
        title: "💐 Mother's Day Brunch & Dinner",
        body: 'Celebrate the most important woman in your life with a special Mother\'s Day meal at Rosita\'s. Brunch 10am-2pm, Dinner 4pm-9pm.',
        startDate: '2025-05-11T10:00:00',
        endDate: '2025-05-11T21:00:00',
        cta: 'CALL',
      }
    }
  },
  {
    id: 'fathersday',
    name: "Father's Day",
    date: 'June 15, 2025',
    icon: '👔',
    category: 'Holiday',
    impact: 'High',
    description: 'Family dining opportunity',
    color: 'from-blue-600 to-indigo-700',
    templates: {
      standard: {
        title: "👔 Father's Day at Rosita's",
        body: "Treat Dad to his favorite Mexican food this Father's Day! Sizzling fajitas, cold beers, and time with the family.\n\n🥩 Steak fajitas Dad will love\n🍺 Ice-cold cerveza specials\n👨‍👧‍👦 Quality family time\n\nMake Dad's day special!\n📞 (815) 756-3817",
        cta: 'CALL',
      },
      offer: {
        title: "👔 Father's Day Special",
        body: "This Father's Day, dads get a FREE appetizer with any entree purchase! Bring the family to Rosita's and make Dad's day delicious.",
        discount: 'FREE appetizer for dads',
        cta: 'CALL',
      }
    }
  },
  {
    id: 'tacotuesday',
    name: 'Taco Tuesday',
    date: 'Every Tuesday',
    icon: '🌮',
    category: 'Recurring',
    impact: 'Medium',
    description: 'Weekly traffic driver',
    color: 'from-yellow-500 to-orange-600',
    templates: {
      standard: {
        title: '🌮 Taco Tuesday is HERE!',
        body: "It's the day you've been waiting for! $2 tacos all day long at Rosita's.\n\n🌮 Carnitas\n🌮 Al Pastor\n🌮 Carne Asada\n🌮 Chicken Tinga\n🌮 Barbacoa\n\nSee you at Rosita's! 642 E Lincoln Hwy, DeKalb",
        cta: 'GET_DIRECTIONS',
      },
      offer: {
        title: '🌮 $2 Taco Tuesday!',
        body: 'Every Tuesday at Rosita\'s means $2 tacos! All varieties, all day long. The best deal in DeKalb!',
        discount: '$2 tacos all day',
        cta: 'GET_DIRECTIONS',
      }
    }
  },
  {
    id: 'niuhomecoming',
    name: 'NIU Homecoming',
    date: 'October 2025',
    icon: '🎓',
    category: 'Local',
    impact: 'High',
    description: 'Major university event',
    color: 'from-red-700 to-black',
    templates: {
      standard: {
        title: '🎓 Go Huskies! NIU Homecoming',
        body: "Welcome back, Huskies! Rosita's is your homecoming headquarters for pre-game fuel and post-game celebrations.\n\n🏈 Open early for tailgate orders\n🍻 Drink specials for alumni\n🌮 The best Mexican food near campus\n\nGo Huskies! 🐾",
        cta: 'GET_DIRECTIONS',
      },
      offer: {
        title: '🎓 Homecoming Special!',
        body: "NIU Homecoming weekend! Show your Huskie pride and get 15% off your order. Go Huskies! 🐾",
        discount: '15% off with NIU gear',
        cta: 'GET_DIRECTIONS',
      }
    }
  }
];

export default function EventPostGenerator({ onPublish }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [selectedType, setSelectedType] = useState('standard');
  const [editedContent, setEditedContent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showUTMBuilder, setShowUTMBuilder] = useState(false);

  // Get current template
  const currentTemplate = selectedEvent.templates[selectedType] || selectedEvent.templates.standard;

  // Initialize edited content when selection changes
  React.useEffect(() => {
    setEditedContent({
      title: currentTemplate.title,
      body: currentTemplate.body,
      discount: currentTemplate.discount || '',
      cta: currentTemplate.cta,
    });
  }, [selectedEvent, selectedType]);

  const handleCopy = () => {
    const text = `${editedContent.title}\n\n${editedContent.body}`;
    navigator.clipboard.writeText(text);
  };

  const generateUTM = () => {
    const baseUrl = 'https://rositas.com';
    const params = new URLSearchParams({
      utm_source: 'google',
      utm_medium: 'gbp',
      utm_campaign: selectedEvent.id,
      utm_content: selectedType
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Event-Based Post Generator</h3>
            <p className="text-sm text-gray-500">Create posts for upcoming events and holidays</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="p-6">
          {/* Event Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  selectedEvent.id === event.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{event.icon}</span>
                <p className="text-xs font-medium text-gray-900 mt-1 truncate">{event.name}</p>
              </button>
            ))}
          </div>

          {/* Selected Event Info */}
          <div className={`bg-gradient-to-r ${selectedEvent.color} rounded-xl p-6 text-white mb-6`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{selectedEvent.icon}</span>
                  <h4 className="text-2xl font-bold">{selectedEvent.name}</h4>
                </div>
                <p className="text-white/80">{selectedEvent.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    {selectedEvent.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedEvent.impact === 'Very High' ? 'bg-yellow-400 text-yellow-900' :
                    selectedEvent.impact === 'High' ? 'bg-white/30' : 'bg-white/20'
                  }`}>
                    {selectedEvent.impact} Impact
                  </span>
                </div>
              </div>
              <Sparkles className="w-8 h-8 text-white/50" />
            </div>
          </div>

          {/* Post Type Selection */}
          <div className="flex gap-2 mb-6">
            {Object.keys(selectedEvent.templates).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'standard' ? 'Standard Post' :
                 type === 'offer' ? 'Offer Post' :
                 type === 'event' ? 'Event Post' : type}
              </button>
            ))}
          </div>

          {/* Content Editor */}
          {editedContent && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input
                  type="text"
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
                <textarea
                  value={editedContent.body}
                  onChange={(e) => setEditedContent({ ...editedContent, body: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {selectedType === 'offer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer/Discount</label>
                  <input
                    type="text"
                    value={editedContent.discount}
                    onChange={(e) => setEditedContent({ ...editedContent, discount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call to Action</label>
                <select
                  value={editedContent.cta}
                  onChange={(e) => setEditedContent({ ...editedContent, cta: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="CALL">Call Now</option>
                  <option value="GET_DIRECTIONS">Get Directions</option>
                  <option value="ORDER_ONLINE">Order Online</option>
                  <option value="LEARN_MORE">Learn More</option>
                  <option value="BOOK">Book Now</option>
                </select>
              </div>

              {/* UTM Builder */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowUTMBuilder(!showUTMBuilder)}
                >
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">UTM Tracking Link</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUTMBuilder ? 'rotate-180' : ''}`} />
                </div>

                {showUTMBuilder && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">
                      Use this tracked URL in your GBP website link to measure traffic in GA4:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-white border border-gray-200 rounded text-xs text-gray-700 overflow-x-auto">
                        {generateUTM()}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(generateUTM())}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Preview</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🌮</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Rosita's Mexican Restaurant</span>
                        <span className="text-xs text-gray-500">• Just now</span>
                      </div>
                      <h5 className="font-medium text-gray-900 mt-2">{editedContent.title}</h5>
                      <p className="text-gray-700 mt-1 whitespace-pre-line text-sm">{editedContent.body}</p>
                      {selectedType === 'offer' && editedContent.discount && (
                        <div className="mt-3 p-2 bg-green-50 rounded-lg">
                          <p className="text-green-700 font-medium text-sm">{editedContent.discount}</p>
                        </div>
                      )}
                      <div className="mt-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                          editedContent.cta === 'CALL' ? 'bg-blue-100 text-blue-700' :
                          editedContent.cta === 'GET_DIRECTIONS' ? 'bg-green-100 text-green-700' :
                          editedContent.cta === 'ORDER_ONLINE' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {editedContent.cta === 'CALL' && <Phone className="w-3 h-3" />}
                          {editedContent.cta === 'GET_DIRECTIONS' && <MapPin className="w-3 h-3" />}
                          {editedContent.cta === 'ORDER_ONLINE' && <Globe className="w-3 h-3" />}
                          {editedContent.cta.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Image className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
                <button
                  onClick={() => onPublish && onPublish(editedContent, selectedEvent)}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Publish to GBP
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
