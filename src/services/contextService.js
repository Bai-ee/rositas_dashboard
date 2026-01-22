// Context Service - Fetches external signals for AI strategy decisions

// Local events and context data
export const localContext = {
  // NIU (Northern Illinois University) calendar
  niuSchedule: {
    fallStart: '2024-08-26',
    fallEnd: '2024-12-13',
    springStart: '2025-01-13',
    springEnd: '2025-05-09',
    homeGames: [
      { date: '2024-09-07', opponent: 'Western Illinois', type: 'football' },
      { date: '2024-09-21', opponent: 'Buffalo', type: 'football' },
      { date: '2024-10-05', opponent: 'Ball State', type: 'football' },
      { date: '2024-11-02', opponent: 'Central Michigan', type: 'football' },
    ]
  },

  // Major holidays affecting restaurant traffic
  holidays: [
    { date: '2025-01-01', name: "New Year's Day", impact: 'low', note: 'Many closed' },
    { date: '2025-01-20', name: 'MLK Day', impact: 'medium', note: 'Some offices closed' },
    { date: '2025-02-02', name: 'Super Bowl Sunday', impact: 'high', note: '#1 food day' },
    { date: '2025-02-09', name: 'Super Bowl LVIII', impact: 'high', note: 'Game day catering' },
    { date: '2025-02-14', name: "Valentine's Day", impact: 'high', note: 'Romantic dinners' },
    { date: '2025-03-17', name: "St. Patrick's Day", impact: 'medium', note: 'Bar traffic' },
    { date: '2025-04-20', name: 'Easter', impact: 'medium', note: 'Family brunch' },
    { date: '2025-05-05', name: 'Cinco de Mayo', impact: 'very_high', note: 'Peak Mexican restaurant day' },
    { date: '2025-05-11', name: "Mother's Day", impact: 'high', note: '#1 restaurant day' },
    { date: '2025-05-26', name: 'Memorial Day', impact: 'medium', note: 'BBQ/cookout competition' },
    { date: '2025-06-15', name: "Father's Day", impact: 'high', note: 'Family dining' },
    { date: '2025-07-04', name: 'Independence Day', impact: 'medium', note: 'Cookout competition' },
    { date: '2025-09-01', name: 'Labor Day', impact: 'medium', note: 'End of summer' },
    { date: '2025-10-31', name: 'Halloween', impact: 'low', note: 'Trick-or-treating' },
    { date: '2025-11-27', name: 'Thanksgiving', impact: 'low', note: 'Most closed' },
    { date: '2025-11-28', name: 'Black Friday', impact: 'medium', note: 'Shopping lunch' },
    { date: '2025-12-24', name: 'Christmas Eve', impact: 'medium', note: 'Last minute dining' },
    { date: '2025-12-25', name: 'Christmas Day', impact: 'low', note: 'Most closed' },
    { date: '2025-12-31', name: "New Year's Eve", impact: 'high', note: 'Celebration dining' },
  ],

  // Local DeKalb events (would be populated from local event API)
  localEvents: [
    { date: '2024-08-01', name: 'Corn Fest', type: 'festival', impact: 'high' },
    { date: '2024-10-15', name: 'NIU Homecoming', type: 'university', impact: 'high' },
  ],

  // Weather patterns for DeKalb, IL (would use real weather API)
  weatherPatterns: {
    winter: { months: [12, 1, 2], avgTemp: 28, strategy: 'comfort_food' },
    spring: { months: [3, 4, 5], avgTemp: 52, strategy: 'fresh_flavors' },
    summer: { months: [6, 7, 8], avgTemp: 75, strategy: 'patio_dining' },
    fall: { months: [9, 10, 11], avgTemp: 50, strategy: 'hearty_meals' },
  }
};

// Restaurant data (would be scraped from rositas.com)
export const restaurantData = {
  name: "Rosita's Mexican Restaurant",
  address: '642 E Lincoln Hwy, DeKalb, IL 60115',
  phone: '(815) 756-3817',
  website: 'https://rositas.com',

  hours: {
    monday: '11:00 AM - 9:00 PM',
    tuesday: '11:00 AM - 9:00 PM',
    wednesday: '11:00 AM - 9:00 PM',
    thursday: '11:00 AM - 9:00 PM',
    friday: '11:00 AM - 10:00 PM',
    saturday: '11:00 AM - 10:00 PM',
    sunday: '11:00 AM - 8:00 PM',
  },

  // Menu highlights (would be scraped from menu page)
  menuHighlights: {
    appetizers: [
      { name: 'Nachos Supreme', description: 'Crispy tortilla chips with beans, cheese, jalapeños', popular: true },
      { name: 'Queso Dip', description: 'Warm cheese dip with chips', popular: true },
      { name: 'Guacamole', description: 'Fresh avocado dip made to order', popular: true },
    ],
    entrees: [
      { name: 'Fajitas', description: 'Sizzling chicken, steak, or combo with peppers and onions', popular: true },
      { name: 'Enchiladas', description: 'Corn tortillas filled with your choice of meat', popular: true },
      { name: 'Tacos', description: 'Three tacos with your choice of filling', popular: true },
      { name: 'Burritos', description: 'Large flour tortilla stuffed with beans, rice, and meat', popular: false },
      { name: 'Chimichanga', description: 'Deep fried burrito with sauce and cheese', popular: false },
    ],
    combos: [
      { name: 'Lunch Special', description: 'Choice of 2 items with rice and beans', price: '$9.99' },
      { name: 'Dinner Combo', description: 'Choice of 3 items with rice and beans', price: '$13.99' },
    ],
    drinks: [
      { name: 'Margarita', description: 'Classic lime margarita', popular: true },
      { name: 'House Sangria', description: 'Red wine with fresh fruit', popular: false },
      { name: 'Mexican Beer', description: 'Corona, Modelo, Dos Equis', popular: true },
    ]
  },

  // Catering info
  catering: {
    available: true,
    minimumOrder: '$100',
    notice: '48 hours advance notice required',
    popular: ['Taco Bar', 'Fajita Bar', 'Enchilada Tray', 'Nacho Station'],
    contact: '(815) 756-3817',
  },

  // Specials
  weeklySpecials: {
    monday: { name: 'Margarita Monday', description: '$5 House Margaritas' },
    tuesday: { name: 'Taco Tuesday', description: '$2 Tacos' },
    wednesday: { name: 'Wine Wednesday', description: 'Half-price bottles of wine' },
    thursday: { name: 'Thirsty Thursday', description: '$3 Draft Beers' },
    friday: { name: 'Friday Fiesta', description: 'Live music, Happy Hour 4-7pm' },
    saturday: { name: 'Family Saturday', description: 'Kids eat free with adult entree' },
    sunday: { name: 'Sunday Brunch', description: 'Brunch menu 10am-2pm' },
  }
};

// Content templates for different angles/strategies
export const contentTemplates = {
  gameDay: {
    headlines: [
      '🏈 Game Day Fiesta at Rosita\'s!',
      '🏈 Fuel Your Fandom with Rosita\'s!',
      '🏈 The Real MVP: Our Game Day Menu',
    ],
    bodies: [
      'Don\'t fumble your game day food! Our nachos, tacos, and fajita platters are ready to score big at your watch party.',
      'Touchdown-worthy food for the big game! Order catering and let us handle the food while you handle the cheering.',
      'Game day just got tastier. Swing by or order ahead for all your favorite Mexican dishes.',
    ],
    offers: [
      { title: 'Game Day Pack', discount: '15% off catering $100+' },
      { title: 'Watch Party Deal', discount: 'Free queso with $50+ order' },
    ],
    ctas: ['ORDER_ONLINE', 'CALL'],
  },

  familyWeekend: {
    headlines: [
      '👨‍👩‍👧‍👦 Family Fiesta This Weekend!',
      '👨‍👩‍👧‍👦 Quality Family Time at Rosita\'s',
      '👨‍👩‍👧‍👦 Bring the Whole Crew!',
    ],
    bodies: [
      'This weekend, bring the family to Rosita\'s for delicious Mexican food everyone will love. Kids menu available!',
      'Create memories over chips, salsa, and sizzling fajitas. Family dining at its finest.',
      'Weekend plans? Sorted. Bring the kids, bring the appetite, bring the whole family!',
    ],
    offers: [
      { title: 'Family Deal', discount: 'Kids eat FREE with adult entree' },
      { title: 'Family Platter', discount: '20% off family combo platters' },
    ],
    ctas: ['GET_DIRECTIONS', 'CALL'],
  },

  tacoTuesday: {
    headlines: [
      '🌮 Taco Tuesday is HERE!',
      '🌮 $2 Tacos All Day!',
      '🌮 Taco \'Bout a Great Deal!',
    ],
    bodies: [
      'It\'s the day you\'ve been waiting for! $2 tacos all day. Carnitas, al pastor, carne asada - take your pick!',
      'Taco Tuesday at Rosita\'s: the best $2 you\'ll spend all week. Don\'t miss out!',
      'Every Tuesday is a fiesta at Rosita\'s. $2 tacos, big flavor, no regrets.',
    ],
    offers: [
      { title: 'Taco Tuesday', discount: '$2 tacos all day' },
      { title: 'Taco Trio', discount: '3 tacos + drink for $8' },
    ],
    ctas: ['GET_DIRECTIONS', 'ORDER_ONLINE'],
  },

  comfortFood: {
    headlines: [
      '❄️ Warm Up at Rosita\'s!',
      '❄️ Beat the Cold with Bold Flavors',
      '❄️ Cozy Up with Mexican Comfort Food',
    ],
    bodies: [
      'Cold outside? Warm up with our sizzling fajitas and hearty burritos. The perfect comfort food for chilly days.',
      'Nothing beats the cold like hot, delicious Mexican food. Join us for something warm and wonderful.',
      'Let Rosita\'s warm you from the inside out. Hot plates, bold flavors, and a cozy atmosphere await.',
    ],
    offers: [
      { title: 'Warm Up Special', discount: 'Free soup with any entree' },
      { title: 'Cozy Combo', discount: '$12.99 burrito + soup combo' },
    ],
    ctas: ['GET_DIRECTIONS', 'ORDER_ONLINE'],
  },

  valentines: {
    headlines: [
      '❤️ Valentine\'s Dinner at Rosita\'s',
      '❤️ Share the Love (and the Fajitas)',
      '❤️ A Mexican Romance Awaits',
    ],
    bodies: [
      'Make this Valentine\'s Day unforgettable with authentic Mexican cuisine. Candlelit tables, handcrafted margaritas, and dishes made with love.',
      'Skip the crowded chains. Share a romantic dinner at Rosita\'s with someone special.',
      'Love is in the air... and so is the aroma of fresh fajitas. Book your Valentine\'s table today!',
    ],
    offers: [
      { title: 'Valentine\'s Special', discount: 'Free dessert for couples' },
      { title: 'Romance Package', discount: 'Dinner for 2 + margaritas $49.99' },
    ],
    ctas: ['CALL', 'GET_DIRECTIONS'],
  },

  cincodemayo: {
    headlines: [
      '🇲🇽 Cinco de Mayo Fiesta!',
      '🇲🇽 Celebrate Cinco at Rosita\'s!',
      '🇲🇽 The Biggest Party of the Year!',
    ],
    bodies: [
      'Join us for the biggest celebration of the year! Live music, drink specials, and the most authentic Mexican food in DeKalb.',
      'Cinco de Mayo is our Super Bowl! Don\'t miss the party at Rosita\'s. Reservations recommended!',
      'Viva la fiesta! Come celebrate Cinco de Mayo with us - the party starts at 11am!',
    ],
    offers: [
      { title: 'Cinco Special', discount: 'Half-price margaritas' },
      { title: 'Fiesta Pack', discount: '25% off party catering' },
    ],
    ctas: ['CALL', 'GET_DIRECTIONS'],
  },

  catering: {
    headlines: [
      '🎉 Let Rosita\'s Cater Your Event!',
      '🎉 Stress-Free Party Planning',
      '🎉 Catering That Wows',
    ],
    bodies: [
      'Planning an event? Let Rosita\'s handle the food! From taco bars to fajita stations, we\'ve got you covered.',
      'Office lunch? Birthday party? Graduation? Our catering makes any event a fiesta.',
      'Great food, no stress. Our catering team delivers delicious Mexican cuisine right to your event.',
    ],
    offers: [
      { title: 'Catering Special', discount: '20% off orders over $200' },
      { title: 'Early Bird', discount: 'Book 2 weeks ahead, save 15%' },
    ],
    ctas: ['CALL', 'ORDER_ONLINE'],
  },

  studentSpecial: {
    headlines: [
      '🎓 NIU Students: This Deal\'s For You!',
      '🎓 Study Break at Rosita\'s',
      '🎓 Huskies Eat Here!',
    ],
    bodies: [
      'NIU students, we\'ve got your back! Show your student ID for 10% off any order. Study hard, eat well.',
      'Need a study break? Rosita\'s is the perfect spot for great food and better prices. Student discounts every day!',
      'Fuel your finals with the best Mexican food near campus. Go Huskies!',
    ],
    offers: [
      { title: 'Student Deal', discount: '10% off with student ID' },
      { title: 'Study Combo', discount: '$7.99 lunch special for students' },
    ],
    ctas: ['GET_DIRECTIONS', 'ORDER_ONLINE'],
  }
};

// Review response templates
export const reviewResponseTemplates = {
  positive5Star: [
    "Thank you so much, {name}! We're thrilled you enjoyed your experience at Rosita's. Our team works hard to bring authentic Mexican flavors to DeKalb, and reviews like yours make it all worthwhile. We can't wait to serve you again soon! 🌮",
    "{name}, your kind words made our day! We're so happy you loved your visit. Our familia at Rosita's takes pride in every dish we serve, and it means the world to hear such positive feedback. See you next time!",
    "Wow, thank you {name}! Five stars from you is the best compliment. We're dedicated to providing great food and service, and we're grateful you noticed. Hope to see you again soon!",
  ],
  positive4Star: [
    "Thanks for the great review, {name}! We're so glad you had a good time. If there's anything we can do to make your next visit even better, please let us know. See you soon!",
    "{name}, thank you for sharing your experience! We appreciate the kind words and are always looking to improve. We'd love to know what would make your next visit a 5-star experience!",
    "We appreciate you, {name}! Thanks for dining with us and for the lovely review. We hope to wow you even more next time!",
  ],
  neutral3Star: [
    "Thank you for your feedback, {name}. We appreciate you taking the time to share your experience. We'd love the opportunity to exceed your expectations next time. Please reach out if there's anything specific we can improve!",
    "{name}, we appreciate your honest review. We're always working to improve, and your feedback helps. We'd love another chance to impress you - please let us know how we can do better!",
    "Thanks for visiting, {name}. We're sorry we didn't hit the mark this time. We'd love to learn more about what we could improve. Please feel free to reach out to us directly!",
  ],
  negative2Star: [
    "{name}, we're sorry to hear your experience didn't meet expectations. This isn't the standard we hold ourselves to. Please contact us directly at (815) 756-3817 so we can learn more and make this right.",
    "We appreciate your feedback, {name}, and we're sorry we fell short. Your experience matters to us, and we'd like the opportunity to make it right. Please reach out to our team directly.",
    "{name}, thank you for letting us know. We take all feedback seriously and would like to understand what happened. Please call us at (815) 756-3817 - we want to fix this.",
  ],
  negative1Star: [
    "{name}, we're truly sorry about your experience. This is not what we strive for at Rosita's. Please contact us immediately at (815) 756-3817 so we can personally address your concerns and make this right.",
    "We sincerely apologize, {name}. Your feedback is important to us, and we want to understand what went wrong. Please reach out to our manager directly at (815) 756-3817 so we can resolve this.",
    "{name}, we're deeply sorry to hear this. Every guest deserves an excellent experience, and we clearly missed the mark. Please give us a chance to make it right - call us at (815) 756-3817.",
  ]
};

// FAQ templates for AI Search optimization
export const faqTemplates = [
  {
    category: 'Hours & Location',
    questions: [
      { q: "What are Rosita's hours?", a: "Rosita's is open Monday-Thursday 11am-9pm, Friday-Saturday 11am-10pm, and Sunday 11am-8pm. Located at 642 E Lincoln Hwy, DeKalb, IL 60115." },
      { q: "Where is Rosita's located?", a: "Rosita's Mexican Restaurant is located at 642 E Lincoln Hwy, DeKalb, IL 60115, near Northern Illinois University. We offer dine-in, takeout, and catering." },
      { q: "Does Rosita's have parking?", a: "Yes, we have a free parking lot for customers. Street parking is also available on Lincoln Highway." },
    ]
  },
  {
    category: 'Menu & Dietary',
    questions: [
      { q: "Does Rosita's have vegetarian options?", a: "Yes! We offer many vegetarian dishes including cheese enchiladas, veggie fajitas, bean burritos, cheese quesadillas, and more. Ask your server about our vegetarian specials!" },
      { q: "Does Rosita's have gluten-free options?", a: "Many of our dishes can be made gluten-free. Our corn tortillas, rice, beans, and most meat dishes are naturally gluten-free. Please inform your server of any dietary restrictions." },
      { q: "What's the most popular dish at Rosita's?", a: "Our sizzling fajitas are a customer favorite! We also get rave reviews for our street tacos, enchilada suizas, and fresh guacamole made tableside." },
    ]
  },
  {
    category: 'Services',
    questions: [
      { q: "Does Rosita's offer catering?", a: "Yes! We cater events of all sizes with authentic Mexican food. Our catering menu includes taco bars, fajita platters, enchiladas, and more. Call (815) 756-3817 for a custom quote." },
      { q: "Does Rosita's take reservations?", a: "Yes, we accept reservations for parties of 6 or more. Call (815) 756-3817 to book your table. Walk-ins are always welcome!" },
      { q: "Does Rosita's deliver?", a: "Yes, we offer delivery through DoorDash, Grubhub, and Uber Eats. You can also order directly for pickup at (815) 756-3817." },
    ]
  },
  {
    category: 'Events & Specials',
    questions: [
      { q: "Does Rosita's have daily specials?", a: "Yes! We have Taco Tuesday ($2 tacos), Margarita Monday ($5 margaritas), and Thirsty Thursday ($3 drafts). Check our Google Business Profile for current specials!" },
      { q: "Can Rosita's host private events?", a: "Yes, we can accommodate private parties and events. Contact us at (815) 756-3817 to discuss your event needs and reserve space." },
      { q: "Does Rosita's have happy hour?", a: "Yes! Happy Hour is Monday-Friday 4pm-7pm with discounted drinks and appetizers. Join us for $4 margaritas and half-price apps!" },
    ]
  }
];

// Get upcoming events/holidays in the next N days
export function getUpcomingEvents(days = 30) {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + days);

  return localContext.holidays.filter(h => {
    const eventDate = new Date(h.date);
    return eventDate >= today && eventDate <= endDate;
  });
}

// Get current season strategy
export function getCurrentSeasonStrategy() {
  const month = new Date().getMonth() + 1;

  for (const [season, data] of Object.entries(localContext.weatherPatterns)) {
    if (data.months.includes(month)) {
      return { season, ...data };
    }
  }

  return { season: 'default', strategy: 'fresh_flavors' };
}

// Check if NIU is in session
export function isNIUInSession() {
  const today = new Date().toISOString().split('T')[0];
  const { fallStart, fallEnd, springStart, springEnd } = localContext.niuSchedule;

  return (today >= fallStart && today <= fallEnd) ||
         (today >= springStart && today <= springEnd);
}

// Get random item from array
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
