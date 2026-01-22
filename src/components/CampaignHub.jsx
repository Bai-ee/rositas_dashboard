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
  Share2,
  Eye,
  MessageSquare,
  ExternalLink,
  Wand2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PostChatEditor from './PostChatEditor';

// Enhanced Campaign Templates with comprehensive strategy
const CAMPAIGN_TEMPLATES = {
  superbowl: {
    id: 'superbowl',
    name: 'Super Bowl LVIII',
    icon: '🏈',
    date: 'February 9, 2025',
    orderDeadline: 'February 8, 2025 5:00 PM',
    color: 'from-green-600 to-emerald-700',
    products: [
      {
        name: 'Deluxe Nacho Kit',
        price: 25,
        serves: '8-10',
        items: ['½ pan chips', 'Refried beans, cheese, peppers', 'Sour cream + guacamole on side'],
        tagline: 'The crowd-pleaser starter'
      },
      {
        name: 'Olé Nacho Kit',
        price: 25,
        serves: '8-10',
        items: ['½ pan chips', 'Refried beans, beef', 'Cheese, peppers, onions, tomatoes', 'Sour cream on side'],
        tagline: 'Loaded with everything'
      },
      {
        name: 'Taco Party Kit',
        price: 99,
        serves: '8-10',
        items: ['20 crispy taco shells', 'Beef or chicken filling', 'Lettuce, tomato, cheese', '24oz queso con pico', 'Chips + sour cream'],
        tagline: 'The MVP of party platters'
      },
      {
        name: 'App Kit',
        price: 'XX',
        serves: 'TBD',
        items: ['Appetizer items - TBD', 'Sides - TBD', 'Dips & extras - TBD'],
        tagline: 'Perfect party starters'
      }
    ],
    campaign: {
      campaign_objective: "Sell maximum carry-out platters for Super Bowl Sunday. Target 50+ kit orders. Generate $2,500+ in Super Bowl weekend revenue.",

      // Enhanced target segments based on the strategic analysis
      target_segments: [
        {
          name: "Young Families & Multi-Family Hosts",
          priority: 1,
          why_they_convert: "Local households with the most mouths to feed. 93% of Americans watch at home or at a friend's house. They value convenience for feeding kids and guests.",
          core_message: "Let our family at Rosita's (serving DeKalb since 1972) do the cooking for yours.",
          secondary_message: "Spend Sunday with family and football, not cooking.",
          best_platform: "Facebook",
          secondary_platform: "Google",
          age_range: "25-50",
          interests: ["Family", "Parenting", "NFL", "Local Community"],
          geo_focus: "DeKalb + Sycamore, 5-7 mile radius"
        },
        {
          name: "NIU Students Hosting Watch Parties",
          priority: 2,
          why_they_convert: "College students gather in groups, will pool money for affordable & sharable food. Convert if offer is fun, budget-friendly, different from usual pizza.",
          core_message: "Be the MVP host – we'll bring the tacos, you bring the amigos!",
          secondary_message: "20 tacos + sides can feed the whole dorm floor. Way more exciting than cold pizza.",
          best_platform: "Instagram",
          secondary_platform: "Instagram Stories",
          age_range: "18-24",
          interests: ["College Life", "NIU", "Football", "Budget-friendly"],
          geo_focus: "1-2 miles around NIU campus"
        },
        {
          name: "Local Sports Fan Groups (Adults 30+)",
          priority: 3,
          why_they_convert: "Longtime community members, NIU alumni, locals hosting friends. Disposable income and loyalty to local institutions like Rosita's.",
          core_message: "Game on, tacos on – support your hometown team (Rosita's)!",
          secondary_message: "Trusted by DeKalb fans for generations since 1972.",
          best_platform: "Facebook",
          secondary_platform: "Google",
          age_range: "30-55",
          interests: ["NFL", "NIU Alumni", "Local Business", "Community"],
          geo_focus: "DeKalb County, 7 mile radius"
        },
        {
          name: "Small Businesses & Office Gatherings",
          priority: 4,
          why_they_convert: "Office watch parties, can expense it, want hassle-free catering for team appreciation.",
          core_message: "Treat your team to a touchdown-worthy spread",
          secondary_message: "Easy way to reward staff or cater Monday lunch post-game celebration.",
          best_platform: "Facebook",
          secondary_platform: "Google",
          age_range: "28-55",
          interests: ["Business Owner", "HR", "Office Manager"],
          geo_focus: "DeKalb business district"
        }
      ],

      budget_allocation: {
        total: 400,
        facebook: {
          amount: 180,
          percentage: 45,
          note: "Broadest local reach, highest ROI for families. Boost posts + targeted campaign.",
          expected_outcome: "Reach thousands of local users, ~20-30 direct orders from families"
        },
        google: {
          amount: 120,
          percentage: 30,
          note: "High-intent 'Super Bowl catering DeKalb' searches. Last-mile customers ready to buy.",
          expected_outcome: "Few hundred clicks, 10-15 larger orders from businesses/groups"
        },
        instagram: {
          amount: 100,
          percentage: 25,
          note: "Target NIU students 18-24. Story ads + feed ads for discovery.",
          expected_outcome: "High impressions in NIU community, 5-10 party orders"
        },
        google_business_profile: {
          amount: 0,
          note: "Organic posts only - capture high-intent local searchers for free"
        },
        breakdown: "Facebook (45%) for families, Google (30%) for intent, Instagram (25%) for students"
      },

      platform_strategies: {
        google_business_profile: {
          overview: "Our catch-all net for anyone searching with intent. Offer posts, urgent language, easy contact path.",
          tactics: [
            "Publish OFFER post: '🏈 Super Bowl Party Kits – Pre-Order Now!' ending Feb 8, 5 PM",
            "Add EVENT post: 'Super Bowl Sunday Catering' for Feb 8",
            "Include keywords: 'Super Bowl catering DeKalb', 'party platter', 'taco catering NIU'",
            "Add each kit as a PRODUCT with price on GBP listing",
            "Enable Google Business Messaging for quick inquiries",
            "Update hours for extended Feb 8 pickup (2-5 PM)",
            "Post real-time 'What's New' updates: 'Only 10 kits left!'",
            "Respond to all reviews and Q&A actively"
          ],
          posting_times: ["Mon 11am", "Wed 6pm", "Fri 12pm", "Sat 10am", "Sun 9am"],
          key_phrases: ["Super Bowl catering in DeKalb", "game day taco platter DeKalb", "party food NIU"]
        },
        facebook: {
          overview: "Largest share of budget. Community reach + paid boosting for families and local adults.",
          tactics: [
            "Organic: 3 posts - announcement, reminder with photos, 1-2 day countdown",
            "Boost announcement post and final reminder post",
            "Run targeted ad campaign Jan 31 - Feb 8",
            "Ad Set 1: Page followers + their friends (warm audience)",
            "Ad Set 2: DeKalb 60115 + age 25-50 + NFL/parenting interests",
            "Use 'Call Now' button or 'Learn More' to order page",
            "Share in DeKalb community groups (organic)",
            "Encourage engagement: 'Tag a friend who owes you tacos!'",
            "Day-part ads: heavier evening delivery when families browse"
          ],
          ad_targeting: {
            audience_1: "Page followers + friends",
            audience_2: "60115 zip + age 25-50 + interests: NFL, family, parenting",
            radius: "5-7 miles around restaurant",
            schedule: "Jan 31 - Feb 8, higher spend Feb 5-8"
          },
          posting_times: ["Tue 7pm", "Thu 12pm", "Sat 9am", "Sun morning"]
        },
        instagram: {
          overview: "Visual storytelling for NIU students. Reels, Stories, and targeted ads for discovery.",
          tactics: [
            "Post photo/Reel of kits - quick montage of assembly, staff in jerseys",
            "Stories with countdown sticker until order deadline",
            "Poll: 'Which kit for your party - Deluxe vs Olé?'",
            "Run Story ads + feed ads targeting NIU demographic",
            "Use eye-catching video of friends cheering with tacos",
            "Tight geo-target: 1-2 miles around NIU campus for under-25",
            "Direct to 'link in bio' for orders (no clickable captions)",
            "Game day morning Story: 'Last call - closing orders at 2 PM!'",
            "Reshare any UGC from early customers"
          ],
          ad_targeting: {
            age: "18-24",
            radius: "1-2 miles from NIU campus",
            interests: ["College Life", "NFL", "Mexican Food", "Budget Eats"],
            schedule: "Run through Feb 8 morning for last-minute decisions"
          },
          posting_times: ["Daily 6-8pm", "Late night for students", "Game day 10am"]
        }
      },

      creative_hooks: [
        {
          type: "headline",
          text: "🏈 Game Day Taco Kits – Feed 10 for $99!",
          use_for: "Primary ad headline - immediate value + context",
          platforms: ["Facebook", "Instagram", "Google"]
        },
        {
          type: "headline",
          text: "Super Bowl Party at Home? Leave the Food to Rosita's!",
          use_for: "Solution-focused headline for families",
          platforms: ["Facebook", "GBP"]
        },
        {
          type: "headline",
          text: "Score Big with Rosita's Taco Kit",
          use_for: "Playful sports metaphor",
          platforms: ["Instagram", "Facebook"]
        },
        {
          type: "headline",
          text: "Touchdown Tacos for Your Team",
          use_for: "Fun alliteration for social",
          platforms: ["Instagram"]
        },
        {
          type: "hook",
          text: "Hosting a Super Bowl party? 🙌 Don't get stuck in the kitchen – grab a Rosita's Taco Kit and actually enjoy the game.",
          use_for: "Facebook/Instagram ad opener",
          platforms: ["Facebook", "Instagram"]
        },
        {
          type: "hook",
          text: "Your friends are coming over. The fridge is empty. We got you.",
          use_for: "Instagram Reel opener - relatable scenario",
          platforms: ["Instagram"]
        },
        {
          type: "hook",
          text: "NIU Huskies, ready to fiesta on game day? 🏈🌮",
          use_for: "Instagram caption for student audience",
          platforms: ["Instagram"]
        },
        {
          type: "hook",
          text: "Skip the delivery app surge pricing and cold food – pick up fresh from us and save money and time.",
          use_for: "Value comparison hook",
          platforms: ["Facebook", "Instagram"]
        },
        {
          type: "hook",
          text: "No one ever cheered for doing dishes – let us handle the food!",
          use_for: "Humor hook for families",
          platforms: ["Facebook"]
        },
        {
          type: "cta",
          text: "Call 815-756-3817 to reserve your kit now!",
          use_for: "Primary CTA on all content",
          platforms: ["All"]
        },
        {
          type: "cta",
          text: "Order by Saturday 5 PM to guarantee your platter!",
          use_for: "Deadline CTA",
          platforms: ["All"]
        },
        {
          type: "cta",
          text: "Limited 50 kits available – when they're gone, they're gone!",
          use_for: "Scarcity CTA",
          platforms: ["All"]
        },
        {
          type: "cta",
          text: "DM to order or call us – link in bio for details!",
          use_for: "Instagram-specific CTA",
          platforms: ["Instagram"]
        },
        {
          type: "visual",
          text: "Overhead shot of full spread on coffee table with TV showing football in background",
          use_for: "Hero image - lifestyle shot",
          platforms: ["All"]
        },
        {
          type: "visual",
          text: "Side-by-side of all 3 kits with price tags",
          use_for: "Comparison post - show options",
          platforms: ["Facebook", "Instagram"]
        },
        {
          type: "visual",
          text: "Staff in team jerseys packing orders with Rosita's banner",
          use_for: "Behind-the-scenes authenticity shot",
          platforms: ["Instagram"]
        },
        {
          type: "visual",
          text: "Quick cuts: grilling meat → layering toppings → packaging → 'Ready for Game Day!' text",
          use_for: "Instagram Reel/Story",
          platforms: ["Instagram"]
        }
      ],

      // Daily posting schedule with specific content for each platform
      daily_posts: {
        "2025-01-28": {
          day_label: "Tuesday - 12 Days Before",
          theme: "Soft Launch Announcement",
          posts: [
            {
              platform: "GBP",
              type: "Offer Post",
              title: "🏈 Super Bowl Party Kits – Pre-Order Now!",
              content: "Game day is coming! Pre-order Rosita's Super Bowl Carry-Out Kits and actually enjoy the game. Deluxe Nacho Kit $25 | Olé Nacho Kit $25 | Taco Party Kit $99 (feeds 8-10). Authentic family recipes since 1972. Limited kits available – order by Feb 8, 5 PM. Call 815-756-3817 to reserve yours!",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Photo Post",
              content: "🏈 IT'S ALMOST GAME TIME, DEKALB! 🌮\n\nHosting the Super Bowl this year? Let our family at Rosita's do the cooking for yours!\n\nIntroducing our Super Bowl Carry-Out Kits:\n🌮 Taco Party Kit – $99 (20 tacos + all the fixings, feeds 8-10)\n🧀 Deluxe Nacho Kit – $25 (chips, beans, cheese, guac)\n🔥 Olé Nacho Kit – $25 (loaded with beef & all toppings)\n\nNo cooking. No cleanup. Just touchdowns and tacos.\n\n📞 Call 815-756-3817 to reserve yours!\n⏰ Pre-orders close Feb 8 at 5 PM\n📍 Pickup Sunday Feb 9, 2-5 PM\n\nTag someone who needs to see this! 👇",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Carousel Post",
              content: "🏈 SUPER BOWL PARTY KITS ARE HERE! 🌮\n\nNIU Huskies & DeKalb fam – hosting the game this year?\n\nWe've got your food covered:\n• Taco Party Kit – $99 (20 tacos, feeds your whole crew)\n• Nacho Kits – $25 each\n\nWay better than cold pizza. Way easier than cooking.\n\n📞 815-756-3817 to order\n🔗 Link in bio\n\n#SuperBowl #DeKalbEats #NIU #GameDayFood #TacoParty #RositasMexican",
              cta: "Link in Bio",
              status: "pending"
            }
          ]
        },
        "2025-01-29": {
          day_label: "Wednesday - 11 Days Before",
          theme: "Product Spotlight: Taco Kit",
          posts: [
            {
              platform: "Instagram",
              type: "Reel",
              content: "🎬 REEL IDEA: Quick montage of Taco Kit assembly\n\n[Shot 1] Sizzling meat on grill\n[Shot 2] Crispy taco shells lined up\n[Shot 3] Fresh toppings being prepped\n[Shot 4] Kit being packed in box\n[Shot 5] Happy customer grabbing box\n[Text overlay] 'Feed 10 hungry fans for $99'\n[End] 'Rosita's Game Day Kits – Link in Bio'\n\nAudio: Trending upbeat sound\n\n#SuperBowlFood #TacoParty #DeKalbIL #NIU #GameDay",
              cta: "Link in Bio",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Story",
              content: "📱 STORY: Countdown sticker\n\n'Only 11 days until Super Bowl! 🏈'\n\nPoll: 'Hosting a watch party?'\n- Yes, need food! ✋\n- No, going to a friend's\n\nSwipe up / Link for kits",
              cta: "Swipe Up",
              status: "pending"
            }
          ]
        },
        "2025-01-30": {
          day_label: "Thursday - 10 Days Before",
          theme: "Family Focus + Heritage",
          posts: [
            {
              platform: "Facebook",
              type: "Story Post",
              content: "Rosita's has been part of DeKalb game nights since 1972. 🏈\n\nFor over 50 years, local families have trusted us for celebrations big and small. This Super Bowl, let us handle the food so you can focus on what matters – time with your people.\n\nOur Super Bowl Kits are designed for easy hosting:\n✅ Ready to serve (no cooking required)\n✅ Feeds 8-10 hungry fans\n✅ Pickup Sunday 2-5 PM (before kickoff!)\n\nSpend Sunday with family and football, not cooking.\n\n📞 815-756-3817 to reserve\n💚 Serving DeKalb since 1972",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "GBP",
              type: "What's New",
              content: "🏈 10 days until Super Bowl! Rosita's Party Kits are going fast. Our $99 Taco Kit feeds 8-10 and includes 20 tacos, queso, chips & all the fixings. Perfect for your watch party! Call 815-756-3817 to pre-order. Pickup Feb 9, 2-5 PM.",
              cta: "Call Now",
              status: "pending"
            }
          ]
        },
        "2025-01-31": {
          day_label: "Friday - 9 Days Before (Ads Launch)",
          theme: "Paid Campaign Launch + Student Focus",
          posts: [
            {
              platform: "Facebook",
              type: "Paid Ad Launch",
              content: "🚀 LAUNCH FACEBOOK ADS\n\nAd Set 1: Warm Audience\n- Target: Page followers + their friends\n- Budget: $15/day\n- Creative: Hero image of spread\n- Headline: 'Super Bowl Party at Home? Leave the Food to Rosita's!'\n\nAd Set 2: Cold Audience - Families\n- Target: 60115 zip, age 25-50, interests: NFL, family, parenting\n- Budget: $15/day\n- Creative: Family gathering image\n- Headline: 'Game Day Taco Kits – Feed 10 for $99!'",
              cta: "Call Now",
              status: "pending",
              isAd: true
            },
            {
              platform: "Instagram",
              type: "Paid Ad Launch",
              content: "🚀 LAUNCH INSTAGRAM ADS\n\nStory Ads + Feed Ads\n- Target: 18-24, 1-2 miles from NIU\n- Interests: College Life, NFL, Mexican Food\n- Budget: $12/day\n- Creative: Reel of kit assembly or friends with tacos\n- Headline: 'Be the MVP host 🏈🌮'\n- CTA: Learn More → Link to order info",
              cta: "Learn More",
              status: "pending",
              isAd: true
            },
            {
              platform: "Instagram",
              type: "Feed Post",
              content: "POV: You're hosting the Super Bowl party and everyone's asking 'where'd you get this food?!' 😎🌮\n\nRosita's Taco Party Kit = 20 tacos + queso + chips for $99\n\nThat's less than $10/person to feed your whole crew.\n\nP.S. Way cheaper than 5 boxes of pizza – and way tastier 🍕❌\n\n📞 815-756-3817\n🔗 Link in bio\n\n#NIU #DeKalbEats #SuperBowlParty #TacoTuesday #CollegeLife #WatchParty",
              cta: "Link in Bio",
              status: "pending"
            }
          ]
        },
        "2025-02-01": {
          day_label: "Saturday - 8 Days Before",
          theme: "Social Proof + Comparison",
          posts: [
            {
              platform: "Facebook",
              type: "Comparison Post",
              content: "Let's do the math on Super Bowl food: 🧮\n\n🍕 5 pizzas from delivery app = ~$80 + fees + cold by halftime\n🌮 Rosita's Taco Kit = $99 for 20 tacos + queso + chips, feeds 10, picked up HOT\n\nNo surge pricing. No cold food. No regrets.\n\nJust authentic Mexican food from a family that's been feeding DeKalb since 1972.\n\n📞 815-756-3817 to order\n⏰ Pickup Feb 9, 2-5 PM",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Story Poll",
              content: "📱 STORY SEQUENCE:\n\nSlide 1: 'Game day food dilemma...'\nSlide 2: Poll - 'What's worse?'\n- Cold delivery pizza 🍕\n- Cooking during the game 🍳\nSlide 3: 'OR... just get Rosita's Taco Kit 🌮'\nSlide 4: Kit photo + 'Feeds 10 for $99 – Link in bio'",
              cta: "Link in Bio",
              status: "pending"
            }
          ]
        },
        "2025-02-02": {
          day_label: "Sunday - 7 Days Before (1 Week Out)",
          theme: "1 Week Countdown + Urgency Begins",
          posts: [
            {
              platform: "GBP",
              type: "Event Post",
              content: "🏈 Super Bowl Sunday Catering\n📅 February 9, 2025\n⏰ Pickup: 2:00 PM - 5:00 PM\n\nOne week until game day! Rosita's Super Bowl Kits are the easiest way to feed your crowd:\n\n• Taco Party Kit $99 (20 tacos + sides)\n• Deluxe Nacho Kit $25\n• Olé Nacho Kit $25\n\nLimited availability – we sold out last year! Pre-order now at 815-756-3817.",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Countdown Post",
              content: "⏰ ONE WEEK until Super Bowl Sunday!\n\nHave you ordered your party food yet? 🤔\n\nRosita's Super Bowl Kits are going fast:\n🌮 Taco Kit $99 – feeds 8-10\n🧀 Nacho Kits $25 – the perfect starter\n\nDon't be the host scrambling for food on game day. Pre-order now and relax.\n\n📞 815-756-3817\n📍 642 E Lincoln Hwy, DeKalb\n⏰ Pickup Feb 9, 2-5 PM\n\nTag someone who needs to get their order in! 👇",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Countdown Story",
              content: "📱 STORY: Countdown sticker to Super Bowl\n\n'7 DAYS until kickoff! 🏈'\n\n'Have you ordered yet?'\n\nQuiz sticker: 'How many tacos in our party kit?'\n- 10\n- 15\n- 20 ✓\n\n'20 tacos for $99 – Link in bio to order'",
              cta: "Link in Bio",
              status: "pending"
            }
          ]
        },
        "2025-02-03": {
          day_label: "Monday - 6 Days Before",
          theme: "Behind the Scenes + Authenticity",
          posts: [
            {
              platform: "Instagram",
              type: "Behind-the-Scenes Reel",
              content: "🎬 REEL: 'Day in the life prepping for Super Bowl'\n\n[Morning] Staff arriving, putting on Rosita's aprons\n[Kitchen] Prep work - chopping, seasoning\n[Staff member to camera] 'We've been doing this for 52 years'\n[Montage] Food being made with love\n[End] 'Order your Super Bowl kit – link in bio'\n\nCaption: Behind the scenes at Rosita's 🌮 Every kit is made with 50+ years of family recipes. \n\n#BehindTheScenes #SmallBusiness #DeKalbIL #FamilyBusiness #SuperBowlFood",
              cta: "Link in Bio",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Heritage Post",
              content: "Some things never change at Rosita's. 💚\n\nSame family recipes since 1972.\nSame commitment to quality.\nSame love for this community.\n\nThis Super Bowl, let us take care of the food like we've done for DeKalb families for over 50 years.\n\n🌮 Taco Party Kit – $99\n🧀 Nacho Kits – $25\n\n📞 815-756-3817 to pre-order\n📍 642 E Lincoln Hwy",
              cta: "Call Now",
              status: "pending"
            }
          ]
        },
        "2025-02-04": {
          day_label: "Tuesday - 5 Days Before",
          theme: "Scarcity Messaging Begins",
          posts: [
            {
              platform: "GBP",
              type: "What's New",
              content: "🏈 5 DAYS until Super Bowl! Our party kits are selling fast. We have limited capacity, so don't wait! Taco Kit $99, Nacho Kits $25. Call 815-756-3817 to reserve. Order by Saturday for guaranteed pickup Sunday 2-5 PM.",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Scarcity Post",
              content: "🚨 HEADS UP, DEKALB!\n\nWe have limited Super Bowl kits available and orders are coming in fast.\n\nLast year we sold out by Saturday. Don't be the one scrambling for food on game day!\n\n🌮 Taco Party Kit – $99 (20 tacos, queso, chips)\n🧀 Nacho Kits – $25 each\n\n📞 Call 815-756-3817 NOW to reserve\n⏰ Pre-orders close Saturday 5 PM\n📍 Pickup Sunday Feb 9, 2-5 PM\n\nWhen they're gone, they're gone!",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Story Sequence",
              content: "📱 STORIES:\n\nSlide 1: '⚠️ PSA for Super Bowl hosts'\nSlide 2: 'Our kits are selling FAST'\nSlide 3: 'Last year = SOLD OUT by Saturday'\nSlide 4: Photo of kit + 'Don't miss out'\nSlide 5: 'Call 815-756-3817 or link in bio'",
              cta: "Link in Bio",
              status: "pending"
            }
          ]
        },
        "2025-02-05": {
          day_label: "Wednesday - 4 Days Before",
          theme: "NIU Student Push + Increase Ad Spend",
          posts: [
            {
              platform: "Instagram",
              type: "Student-Targeted Post",
              content: "NIU watch party hosts, this one's for you 🎓🏈\n\nSplit a $99 Taco Kit with your roommates:\n• 20 tacos\n• Queso con pico\n• Chips & sour cream\n\nThat's like $10/person if 10 of you chip in. Cheaper than ordering delivery and 100x better.\n\n📞 815-756-3817\n📍 Quick pickup on Lincoln Hwy\n\nBe the MVP of your friend group 🏆\n\n#NIU #Huskies #DeKalb #SuperBowlParty #CollegeEats #WatchParty",
              cta: "Link in Bio",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Ad Budget Increase",
              content: "📈 INCREASE AD SPEND 20%\n\nFinal push begins! Increase daily budgets:\n- Facebook: $15 → $20/day per ad set\n- Instagram: $12 → $15/day\n\nFocus remaining budget on Feb 5-8 for maximum impact during decision-making window.",
              cta: "N/A",
              status: "pending",
              isAd: true
            }
          ]
        },
        "2025-02-06": {
          day_label: "Thursday - 3 Days Before",
          theme: "Testimonial + Social Proof",
          posts: [
            {
              platform: "Facebook",
              type: "Testimonial Post",
              content: "Don't just take our word for it... 💬\n\n'Ordered Rosita's for our Super Bowl party last year and everyone couldn't stop talking about the tacos. So much easier than cooking!' – Sarah M., DeKalb\n\n'The taco kit was a hit with my coworkers. Already ordering again for this year!' – Mike T., Sycamore\n\nJoin the hundreds of DeKalb families who trust Rosita's for their game day food.\n\n🌮 Taco Kit $99 | Nacho Kits $25\n📞 815-756-3817\n⏰ Order by Saturday!",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Reel",
              content: "🎬 REEL: Customer reaction compilation\n\n[Clip 1] Friends opening taco kit box\n[Clip 2] Someone taking first bite, eyes go wide\n[Clip 3] Group cheering with tacos\n[Text] 'This could be your squad on Sunday'\n[End] 'Rosita's Game Day Kits – Link in bio'\n\nCaption: The reactions say it all 🌮🏈 Link in bio to order!\n\n#SuperBowl #GameDay #TacoParty #DeKalbIL",
              cta: "Link in Bio",
              status: "pending"
            },
            {
              platform: "GBP",
              type: "What's New",
              content: "3 days until game day! 🏈 Orders are flying in for our Super Bowl kits. If you're hosting, now's the time to call. Taco Kit $99 (20 tacos + sides), Nacho Kits $25. Call 815-756-3817 today!",
              cta: "Call Now",
              status: "pending"
            }
          ]
        },
        "2025-02-07": {
          day_label: "Friday - 2 Days Before",
          theme: "Urgency Peak + Clear Logistics",
          posts: [
            {
              platform: "Facebook",
              type: "Urgency Post",
              content: "⏰ 2 DAYS LEFT TO ORDER!\n\nSuper Bowl Sunday is almost here. If you haven't ordered your party food, NOW is the time.\n\n📋 WHAT YOU NEED TO KNOW:\n🌮 Taco Party Kit – $99 (feeds 8-10)\n🧀 Nacho Kits – $25 each\n📞 Call 815-756-3817 to order\n⏰ Orders close TOMORROW (Sat) at 5 PM\n📍 Pickup Sunday Feb 9, 2-5 PM\n📍 642 E Lincoln Hwy, DeKalb\n\nDon't be the host with no food. Call now! ☎️",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Reminder Post + Stories",
              content: "📱 FEED POST:\n⏰ 2 DAYS. Have you ordered? 🌮\n\nSuper Bowl kits close TOMORROW at 5 PM.\n\n$99 = 20 tacos + all the fixings for 10 people\n\n📞 815-756-3817\n📍 Pickup Sunday 2-5 PM\n\n#SuperBowl #LastChance #DeKalbEats\n\n---\n\n📱 STORIES (Post 3-4 throughout day):\n• Morning: 'Friday reminder: Order closes TOMORROW!'\n• Afternoon: Poll - 'Have you ordered yet?' Yes/Not yet\n• Evening: 'Still time! Call us tonight'",
              cta: "Link in Bio",
              status: "pending"
            },
            {
              platform: "GBP",
              type: "What's New",
              content: "📢 Last call for Super Bowl orders! Pre-orders close TOMORROW (Saturday) at 5 PM. We have a few Taco Kits ($99) and Nacho Kits ($25) left. Call 815-756-3817 now to reserve yours. Pickup Sunday 2-5 PM at 642 E Lincoln Hwy.",
              cta: "Call Now",
              status: "pending"
            }
          ]
        },
        "2025-02-08": {
          day_label: "Saturday - 1 Day Before (Order Deadline)",
          theme: "FINAL CALL + Last-Minute Push",
          posts: [
            {
              platform: "Facebook",
              type: "Final Call",
              content: "🚨 FINAL CALL – ORDERS CLOSE AT 5 PM TODAY! 🚨\n\nThis is it, DeKalb! Last chance to order your Super Bowl Party Kit from Rosita's.\n\n🌮 Taco Kit $99 – 20 tacos, queso, chips (feeds 8-10)\n🧀 Nacho Kits $25 – Deluxe or Olé\n\n📞 CALL NOW: 815-756-3817\n⏰ Pickup TOMORROW (Sunday) 2-5 PM\n📍 642 E Lincoln Hwy, DeKalb\n\n⚠️ Once we're sold out, we're sold out. Don't wait!\n\nShare this with anyone still scrambling for party food! 👇",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Stories Throughout Day",
              content: "📱 STORY SEQUENCE (Post every 2-3 hours):\n\n9 AM: '⏰ Orders close TODAY at 5 PM!'\n12 PM: 'Half the day is gone... have you called yet?'\n2 PM: '3 hours left! 📞 815-756-3817'\n4 PM: 'FINAL HOUR for Super Bowl orders!'\n5 PM: 'Orders are CLOSED! See you tomorrow for pickup 🌮'",
              cta: "Link in Bio / Call",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Feed Post",
              content: "⏰ TODAY IS THE DAY ⏰\n\nOrders for Super Bowl kits close at 5 PM.\n\n$99 Taco Kit = 20 tacos + sides for your whole crew\n\nStill figuring out game day food? This is your sign. 🌮🏈\n\n📞 815-756-3817 to order\n📍 Pickup tomorrow 2-5 PM\n\n#SuperBowl #LastChance #GameDayFood #DeKalbEats #NIU",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "GBP",
              type: "What's New",
              content: "🚨 LAST CHANCE! Super Bowl orders close TODAY at 5 PM. A few kits remain! Call 815-756-3817 immediately to secure yours. Pickup tomorrow (Sunday) 2-5 PM. Don't miss out!",
              cta: "Call Now",
              status: "pending"
            }
          ]
        },
        "2025-02-09": {
          day_label: "Sunday - GAME DAY",
          theme: "Pickup Day + Real-Time Updates",
          posts: [
            {
              platform: "GBP",
              type: "Game Day Update",
              content: "🏈 GAME DAY IS HERE! 🌮\n\nPickup hours: 2:00 PM - 5:00 PM\nLocation: 642 E Lincoln Hwy, DeKalb\n\nLook for the Super Bowl Kit Pickup sign! We'll have you in and out fast so you don't miss a play.\n\nFrom our family to yours – enjoy the game! 🏆\n\n📞 Questions? Call 815-756-3817",
              cta: "Call Now",
              status: "pending"
            },
            {
              platform: "Facebook",
              type: "Game Day Post",
              content: "🏈 IT'S GAME DAY! 🌮\n\nPickups are happening NOW!\n⏰ 2 PM - 5 PM\n📍 642 E Lincoln Hwy, DeKalb\n\nGrab your kit and get home before kickoff! We've got your order ready and waiting.\n\nThank you to everyone who ordered – you're about to win the Super Bowl of party food! 🏆\n\nTag us in your game day pics! We'd love to see those spreads! 📸",
              cta: "Get Directions",
              status: "pending"
            },
            {
              platform: "Instagram",
              type: "Stories - Live Updates",
              content: "📱 STORIES THROUGHOUT THE DAY:\n\n11 AM: Behind-the-scenes prep – 'Getting your kits ready! 🌮'\n2 PM: 'Pickups have started! See you soon!'\n3 PM: Customer picking up kit – 'Another happy host!'\n4 PM: 'One hour left for pickup!'\n5 PM: 'That's a wrap! Thanks DeKalb! 🏈'\n\n---\n\nFEED POST (Evening): Thank you post with any customer photos tagged",
              cta: "Tag Us",
              status: "pending"
            }
          ]
        }
      },

      conversion_constraints: [
        {
          type: "scarcity",
          message: "Limited kits available – we sold out last year!",
          where_to_use: "All platforms, especially last 3 days",
          psychology: "Creates FOMO and immediate action"
        },
        {
          type: "pickup_clarity",
          message: "Pickup: Sunday Feb 9, 2-5 PM at 642 E Lincoln Hwy, DeKalb",
          where_to_use: "Every post and ad",
          psychology: "Removes friction, shows you've planned their convenience"
        },
        {
          type: "deadline",
          message: "Order by Saturday 5 PM for guaranteed availability",
          where_to_use: "Final 48 hours especially",
          psychology: "Forces decision, prevents procrastination"
        },
        {
          type: "ordering",
          message: "Call 815-756-3817 to order. Cash or card at pickup.",
          where_to_use: "Primary CTA on all content",
          psychology: "One clear action, no confusion"
        },
        {
          type: "value",
          message: "Feed 10 people for $99 – less than $10/person",
          where_to_use: "Especially for student audience",
          psychology: "Math makes decision easy"
        }
      ],

      success_metrics: [
        {
          metric: "Kit Orders",
          target: "50+ total orders",
          measurement: "Phone log + POS data",
          stretch_goal: "75 orders"
        },
        {
          metric: "Revenue",
          target: "$2,500+ Super Bowl weekend",
          measurement: "POS total for Feb 8-9",
          stretch_goal: "$4,000"
        },
        {
          metric: "Ad ROAS",
          target: "5x return ($400 spend → $2,000+ attributed)",
          measurement: "Track 'saw ad' or 'how did you hear about this?' at pickup",
          stretch_goal: "7x return"
        },
        {
          metric: "GBP Actions",
          target: "100+ direction requests, 50+ calls",
          measurement: "GBP Insights for Feb 1-9",
          stretch_goal: "150 directions, 75 calls"
        },
        {
          metric: "Social Engagement",
          target: "50+ shares/tags across platforms",
          measurement: "FB + IG analytics",
          stretch_goal: "100+ shares"
        }
      ],

      failure_signals: [
        {
          signal: "Less than 10 orders by Thursday Feb 6",
          action: "Increase scarcity messaging, boost ad spend by 30%"
        },
        {
          signal: "Low engagement on Instagram (under 1% rate)",
          action: "Shift $30 budget from IG to Facebook"
        },
        {
          signal: "GBP not driving calls (under 20 clicks)",
          action: "Add phone number prominently to every post, create new Offer post"
        },
        {
          signal: "Mostly small orders (Nacho kits only)",
          action: "Push Taco Kit value messaging harder: 'Best deal at $99!'"
        },
        {
          signal: "Students not responding",
          action: "Create more meme-style content, partner with NIU food pages for reshare"
        }
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
    campaign: null
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
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'daily', 'creative'
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    segments: true,
    budget: true,
    schedule: false,
    creative: false,
    metrics: false,
    platforms: false
  });
  const [taskStatuses, setTaskStatuses] = useState({});
  const [copiedText, setCopiedText] = useState(null);
  const [editingPost, setEditingPost] = useState(null); // { post, dateKey, index, dayLabel, theme }
  const [editingCreative, setEditingCreative] = useState(null); // { text, type, use_for, platforms }

  const campaign = CAMPAIGN_TEMPLATES[activeCampaign];
  const campaignData = campaign?.campaign;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleTask = (dateKey, postIndex) => {
    const key = `${dateKey}-${postIndex}`;
    setTaskStatuses(prev => ({
      ...prev,
      [key]: prev[key] === 'completed' ? 'pending' : 'completed'
    }));
  };

  const getTaskStatus = (dateKey, postIndex) => {
    return taskStatuses[`${dateKey}-${postIndex}`] || 'pending';
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Open AI editor for a post
  const openPostEditor = (post, dateKey, index, dayLabel, theme) => {
    setEditingPost({ post, dateKey, index, dayLabel, theme });
  };

  // Update post content after AI editing
  const handleUpdatePost = (newContent) => {
    if (!editingPost) return;

    // Update the post content in the campaign data
    // Note: Since CAMPAIGN_TEMPLATES is a const, we'd need state management for persistence
    // For now, we'll update it locally for the session
    const { dateKey, index } = editingPost;
    if (campaignData?.daily_posts?.[dateKey]?.posts?.[index]) {
      campaignData.daily_posts[dateKey].posts[index].content = newContent;
    }

    setEditingPost(null);
  };

  const calculateProgress = () => {
    if (!campaignData?.daily_posts) return 0;
    let total = 0;
    let completed = 0;
    Object.entries(campaignData.daily_posts).forEach(([dateKey, day]) => {
      day.posts.forEach((_, idx) => {
        total++;
        if (getTaskStatus(dateKey, idx) === 'completed') completed++;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getTodaysPosts = () => {
    if (!campaignData?.daily_posts) return null;
    const today = new Date().toISOString().split('T')[0];
    // For demo, show the first available date's posts
    const dates = Object.keys(campaignData.daily_posts).sort();
    const targetDate = selectedDate || dates[0];
    return { date: targetDate, ...campaignData.daily_posts[targetDate] };
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">f</div>;
      case 'instagram': return <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">IG</div>;
      case 'gbp': return <Globe className="w-5 h-5 text-green-600" />;
      default: return <Globe className="w-5 h-5 text-gray-600" />;
    }
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
                <p className="text-white/80">{campaign.date} | Orders close: {campaign.orderDeadline}</p>
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
        <div className="grid grid-cols-5 gap-4 mt-6">
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
            <p className="text-2xl font-bold">{Object.keys(campaignData.daily_posts).length}</p>
            <p className="text-sm text-white/80">Days</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">
              {Object.values(campaignData.daily_posts).reduce((acc, day) => acc + day.posts.length, 0)}
            </p>
            <p className="text-sm text-white/80">Total Posts</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'daily', label: 'Daily Posts', icon: Calendar },
          { id: 'creative', label: 'Creative Library', icon: Sparkles }
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeView === view.id
                ? 'bg-white shadow-sm text-purple-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW VIEW */}
      {activeView === 'overview' && (
        <>
          {/* Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-purple-600" />
              Campaign Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campaign.products.map((product, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                  </div>
                  <p className="text-xs text-purple-600 font-medium mb-2">{product.tagline}</p>
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
            title="Target Segments (Ranked by ROI)"
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
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          segment.priority === 1 ? 'bg-green-200 text-green-800' :
                          segment.priority === 2 ? 'bg-blue-200 text-blue-800' :
                          segment.priority === 3 ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          #{segment.priority} Priority
                        </span>
                        <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{segment.why_they_convert}</p>
                    </div>
                    <div className="text-right text-xs">
                      <div className="flex items-center gap-1">
                        {getPlatformIcon(segment.best_platform)}
                        <span className="font-medium">{segment.best_platform}</span>
                      </div>
                      <p className="text-gray-500 mt-1">{segment.age_range} | {segment.geo_focus}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-white rounded border">
                      <p className="text-xs text-gray-500 mb-1">Primary Message:</p>
                      <p className="text-sm font-medium text-gray-900">"{segment.core_message}"</p>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <p className="text-xs text-gray-500 mb-1">Secondary Message:</p>
                      <p className="text-sm text-gray-700">"{segment.secondary_message}"</p>
                    </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <BudgetCard
                platform="Facebook"
                icon={<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">f</div>}
                amount={campaignData.budget_allocation.facebook.amount}
                percentage={campaignData.budget_allocation.facebook.percentage}
                note={campaignData.budget_allocation.facebook.note}
                outcome={campaignData.budget_allocation.facebook.expected_outcome}
                color="blue"
              />
              <BudgetCard
                platform="Google Ads"
                icon={<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">G</div>}
                amount={campaignData.budget_allocation.google.amount}
                percentage={campaignData.budget_allocation.google.percentage}
                note={campaignData.budget_allocation.google.note}
                outcome={campaignData.budget_allocation.google.expected_outcome}
                color="green"
              />
              <BudgetCard
                platform="Instagram"
                icon={<div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">IG</div>}
                amount={campaignData.budget_allocation.instagram.amount}
                percentage={campaignData.budget_allocation.instagram.percentage}
                note={campaignData.budget_allocation.instagram.note}
                outcome={campaignData.budget_allocation.instagram.expected_outcome}
                color="pink"
              />
              <BudgetCard
                platform="GBP (Organic)"
                icon={<Globe className="w-8 h-8 text-blue-500" />}
                amount={0}
                percentage={0}
                note={campaignData.budget_allocation.google_business_profile.note}
                outcome="Free high-intent traffic"
                color="gray"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">{campaignData.budget_allocation.breakdown}</p>
          </CollapsibleSection>

          {/* Platform Strategies */}
          <CollapsibleSection
            title="Platform-Specific Strategies"
            icon={Target}
            isExpanded={expandedSections.platforms}
            onToggle={() => toggleSection('platforms')}
          >
            <div className="space-y-4">
              {Object.entries(campaignData.platform_strategies).map(([platform, strategy]) => (
                <div key={platform} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getPlatformIcon(platform)}
                    <h4 className="font-semibold text-gray-900 capitalize">{platform.replace(/_/g, ' ')}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{strategy.overview}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-2">TACTICS</h5>
                      <ul className="space-y-1">
                        {strategy.tactics.slice(0, 5).map((tactic, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {tactic}
                          </li>
                        ))}
                        {strategy.tactics.length > 5 && (
                          <li className="text-sm text-purple-600">+{strategy.tactics.length - 5} more tactics</li>
                        )}
                      </ul>
                    </div>
                    {strategy.ad_targeting && (
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-2">AD TARGETING</h5>
                        <div className="bg-gray-50 rounded p-3 text-sm">
                          {Object.entries(strategy.ad_targeting).map(([key, value]) => (
                            <p key={key} className="text-gray-700">
                              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span> {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {campaignData.success_metrics.map((metric, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                  <p className="text-2xl font-bold text-green-600 mt-1">{metric.target}</p>
                  <p className="text-xs text-purple-600 mt-1">Stretch: {metric.stretch_goal}</p>
                  <p className="text-sm text-gray-500 mt-2">Measured by: {metric.measurement}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                Failure Signals & Corrective Actions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {campaignData.failure_signals.map((item, idx) => (
                  <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-900">⚠️ {item.signal}</p>
                    <p className="text-sm text-yellow-700 mt-1">→ {item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Conversion Constraints */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Conversion Constraints (Include in ALL Content)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaignData.conversion_constraints.map((constraint, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      constraint.type === 'scarcity' ? 'bg-red-100 text-red-700' :
                      constraint.type === 'deadline' ? 'bg-yellow-100 text-yellow-700' :
                      constraint.type === 'pickup_clarity' ? 'bg-blue-100 text-blue-700' :
                      constraint.type === 'value' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {constraint.type.replace(/_/g, ' ')}
                    </span>
                    <button
                      onClick={() => copyToClipboard(constraint.message, `constraint-${idx}`)}
                      className="p-1 text-gray-400 hover:text-purple-600"
                    >
                      {copiedText === `constraint-${idx}` ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="font-medium text-gray-900">"{constraint.message}"</p>
                  <p className="text-xs text-gray-500 mt-2">Where: {constraint.where_to_use}</p>
                  <p className="text-xs text-purple-600 mt-1">Why: {constraint.psychology}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* DAILY POSTS VIEW */}
      {activeView === 'daily' && (
        <div className="space-y-4">
          {/* Date Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Select Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(campaignData.daily_posts).map(([dateKey, day]) => {
                const completedCount = day.posts.filter((_, idx) => getTaskStatus(dateKey, idx) === 'completed').length;
                const isSelected = selectedDate === dateKey || (!selectedDate && dateKey === Object.keys(campaignData.daily_posts)[0]);

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(dateKey).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-500">{day.theme}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(completedCount / day.posts.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{completedCount}/{day.posts.length}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Posts Content */}
          {(() => {
            const todayData = getTodaysPosts();
            if (!todayData) return null;

            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{todayData.day_label}</h3>
                    <p className="text-sm text-purple-600">Theme: {todayData.theme}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{todayData.posts.length} posts to publish</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {todayData.posts.map((post, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-4 transition-all ${
                        getTaskStatus(todayData.date, idx) === 'completed'
                          ? 'bg-green-50 border-green-200'
                          : post.isAd
                          ? 'bg-blue-50 border-blue-200'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleTask(todayData.date, idx)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              getTaskStatus(todayData.date, idx) === 'completed'
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-purple-500'
                            }`}
                          >
                            {getTaskStatus(todayData.date, idx) === 'completed' && (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <span className="font-medium text-gray-900">{post.platform}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              post.isAd ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {post.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openPostEditor(post, todayData.date, idx, todayData.day_label, todayData.theme)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                            title="Edit with AI"
                          >
                            <Wand2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(post.content, `post-${todayData.date}-${idx}`)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                            title="Copy content"
                          >
                            {copiedText === `post-${todayData.date}-${idx}` ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {post.title && (
                        <p className="font-semibold text-gray-900 mb-2">{post.title}</p>
                      )}

                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                          {post.content}
                        </pre>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">CTA: {post.cta}</span>
                        {post.platform === 'GBP' && (
                          <button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700">
                            <Send className="w-3 h-3" />
                            Publish to GBP
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* AI Post Editor Modal */}
      {editingPost && (
        <PostChatEditor
          post={editingPost.post}
          onUpdatePost={handleUpdatePost}
          onClose={() => setEditingPost(null)}
          platform={editingPost.post.platform}
          dateLabel={editingPost.dayLabel}
          theme={editingPost.theme}
        />
      )}

      {/* CREATIVE LIBRARY VIEW */}
      {activeView === 'creative' && (
        <div className="space-y-6">
          {/* Headlines */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Headlines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {campaignData.creative_hooks.filter(h => h.type === 'headline').map((hook, idx) => (
                <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-gray-900 text-lg">{hook.text}</p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingCreative({ ...hook, idx, category: 'headline' })}
                        className="p-1 text-gray-400 hover:text-purple-600"
                        title="Edit with AI"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(hook.text, `headline-${idx}`)}
                        className="p-1 text-gray-400 hover:text-purple-600"
                      >
                        {copiedText === `headline-${idx}` ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">Use for: {hook.use_for}</p>
                  <div className="flex gap-1 mt-2">
                    {hook.platforms.map(p => (
                      <span key={p} className="text-xs bg-white px-2 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hooks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Opening Hooks
            </h3>
            <div className="space-y-3">
              {campaignData.creative_hooks.filter(h => h.type === 'hook').map((hook, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-900">{hook.text}</p>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => setEditingCreative({ ...hook, idx, category: 'hook' })}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Edit with AI"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(hook.text, `hook-${idx}`)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        {copiedText === `hook-${idx}` ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Use for: {hook.use_for}</p>
                  <div className="flex gap-1 mt-2">
                    {hook.platforms.map(p => (
                      <span key={p} className="text-xs bg-white px-2 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Calls to Action
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {campaignData.creative_hooks.filter(h => h.type === 'cta').map((hook, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-gray-900">{hook.text}</p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingCreative({ ...hook, idx, category: 'cta' })}
                        className="p-1 text-gray-400 hover:text-green-600"
                        title="Edit with AI"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(hook.text, `cta-${idx}`)}
                        className="p-1 text-gray-400 hover:text-green-600"
                      >
                        {copiedText === `cta-${idx}` ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">Use for: {hook.use_for}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Ideas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Visual Ideas
            </h3>
            <div className="space-y-3">
              {campaignData.creative_hooks.filter(h => h.type === 'visual').map((hook, idx) => (
                <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-900">{hook.text}</p>
                    <button
                      onClick={() => setEditingCreative({ ...hook, idx, category: 'visual' })}
                      className="p-1 text-gray-400 hover:text-orange-600 ml-2"
                      title="Edit with AI"
                    >
                      <Wand2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-orange-600 mt-2">Use for: {hook.use_for}</p>
                  <div className="flex gap-1 mt-2">
                    {hook.platforms.map(p => (
                      <span key={p} className="text-xs bg-white px-2 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Creative Editor Modal */}
      {editingCreative && (
        <PostChatEditor
          post={{ content: editingCreative.text }}
          onUpdatePost={(newContent) => {
            // Update would need state management for persistence
            // For now, user can copy the improved version
            copyToClipboard(newContent, 'ai-edited');
            setEditingCreative(null);
          }}
          onClose={() => setEditingCreative(null)}
          platform={editingCreative.platforms?.join(', ') || 'All Platforms'}
          dateLabel={`${editingCreative.category?.charAt(0).toUpperCase() + editingCreative.category?.slice(1) || 'Creative'} Element`}
          theme={`${editingCreative.use_for || 'Campaign creative'} - ${editingCreative.type || 'copy element'}`}
        />
      )}
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
function BudgetCard({ platform, icon, amount, percentage, note, outcome, color }) {
  return (
    <div className={`border rounded-lg p-4 ${
      color === 'pink' ? 'border-pink-200 bg-pink-50' :
      color === 'blue' ? 'border-blue-200 bg-blue-50' :
      color === 'green' ? 'border-green-200 bg-green-50' :
      'border-gray-200 bg-gray-50'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-medium text-gray-900">{platform}</h4>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {amount === 0 ? 'Free' : `$${amount}`}
        {percentage > 0 && <span className="text-sm font-normal text-gray-500 ml-1">({percentage}%)</span>}
      </p>
      <p className="text-sm text-gray-600 mt-2">{note}</p>
      {outcome && (
        <p className="text-xs text-purple-600 mt-2">Expected: {outcome}</p>
      )}
    </div>
  );
}
