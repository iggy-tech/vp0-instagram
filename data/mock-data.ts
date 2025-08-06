// Complete mock data for Instagram clone using your specific video files

export const storyUsers = [
  { 
    id: 'your-story', 
    username: 'Your story', 
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '2h'
      }
    ]
  },
  { 
    id: '1', 
    username: 'architectandde', 
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '3h'
      },
      {
        id: '2',
        type: 'video',
        media: './assets/videos/bamboo.mp4',
        timestamp: '4h'
      },
      {
        id: '3',
        type: 'image',
        media: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '5h'
      }
    ]
  },
  { 
    id: '2', 
    username: 'creators', 
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '6h'
      },
      {
        id: '2',
        type: 'video',
        media: './assets/videos/tiger.mp4',
        timestamp: '7h'
      }
    ]
  },
  { 
    id: '3', 
    username: 'vogueliving', 
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '8h'
      }
    ]
  },
  { 
    id: '4', 
    username: 'foodie_life', 
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '1h'
      },
      {
        id: '2',
        type: 'image',
        media: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '2h'
      }
    ]
  },
  { 
    id: '5', 
    username: 'travel_diaries', 
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'video',
        media: './assets/videos/turtle.mp4',
        timestamp: '3h'
      }
    ]
  },
  { 
    id: '6', 
    username: 'fitness_guru', 
    avatar: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '4h'
      },
      {
        id: '2',
        type: 'image',
        media: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '5h'
      }
    ]
  },
  { 
    id: '7', 
    username: 'artsy_vibes', 
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'video',
        media: './assets/videos/parrot.mp4',
        timestamp: '6h'
      }
    ]
  },
  { 
    id: '8', 
    username: 'nature_lover', 
    avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stories: [
      {
        id: '1',
        type: 'image',
        media: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '7h'
      },
      {
        id: '2',
        type: 'image',
        media: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
        timestamp: '8h'
      }
    ]
  }
];

export const suggestedUsers = [
  { 
    id: '1', 
    username: 'Nadine', 
    category: 'Popular', 
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    isVerified: false 
  },
  { 
    id: '2', 
    username: 'SGAG', 
    category: 'Popular', 
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    isVerified: true,
    isCompany: true
  },
  { 
    id: '3', 
    username: 'Alex Photography', 
    category: 'Suggested for you', 
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    isVerified: false 
  },
  { 
    id: '4', 
    username: 'Sarah Wilson', 
    category: 'Popular', 
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    isVerified: true 
  },
];

export const feedPosts = [
  // Single image post
  {
    id: '1',
    username: 'artsyesme',
    musicTitle: 'The Macarons Project • Too Sweet',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 1234,
    comments: 89,
    shares: 45,
    caption: 'Perfect afternoon vibes ✨ #aesthetic #photography #mood #inspiration',
    timestamp: '2h',
    type: 'single'
  },
  
  // Carousel with bamboo video and architecture images
  {
    id: '2',
    username: 'architectanddesign',
    musicTitle: null,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/bamboo.mp4'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 96200,
    comments: 2847,
    shares: 5621,
    caption: 'Sustainable architecture with natural bamboo elements 🎋 Swipe to see the complete design process → #architecture #sustainable #design #bamboo #ecofriendly #greenbuilding',
    timestamp: '6 days ago',
    type: 'carousel',
    isVerified: true,
    suggestedText: 'Suggested for you'
  },

  // Single video post - basketball
  {
    id: '3',
    username: 'sports_highlights',
    musicTitle: null,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/basketball.mp4'
      }
    ],
    likes: 12800,
    comments: 756,
    shares: 892,
    caption: 'That crossover though! 🏀 Practice makes perfect 💯 #basketball #crossover #skills #sports #hoops #training',
    timestamp: '4h',
    type: 'single',
    suggestedText: 'Suggested for you'
  },

  // Carousel with food images only
  {
    id: '4',
    username: 'foodie_adventures',
    musicTitle: 'Lofi Hip Hop • Chill Beats',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 892,
    comments: 134,
    shares: 67,
    caption: 'Homemade pasta night 🍝 Recipe in my stories! Swipe to see the process ➡️ #homemade #pasta #cooking #foodie #recipe #italian',
    timestamp: '4h',
    type: 'carousel'
  },

  // Single video post - golf
  {
    id: '5',
    username: 'golf_pro_tips',
    musicTitle: 'Peaceful Golf • Relaxing Vibes',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/golf.mp4'
      }
    ],
    likes: 2156,
    comments: 298,
    shares: 445,
    caption: 'Perfect swing on a beautiful morning ⛳ #golflife #perfectswing #golf #sports #morning #practice',
    timestamp: '6h',
    type: 'single'
  },

  // Carousel with soccer video and sports images
  {
    id: '6',
    username: 'soccer_skills',
    musicTitle: null,
    avatar: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/soccer.mp4'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 5430,
    comments: 892,
    shares: 1247,
    caption: 'Training session highlights ⚽ Working on those skills every day! Swipe for more → #soccer #training #skills #football #sports #dedication',
    timestamp: '8h',
    type: 'carousel'
  },

  // Single image post
  {
    id: '7',
    username: 'minimalist_home',
    musicTitle: 'Ambient • Peaceful Morning',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 756,
    comments: 42,
    shares: 89,
    caption: 'Clean spaces, clear mind 🤍 #minimalism #home #interior #design #peaceful #clean',
    timestamp: '8h',
    type: 'single'
  },

  // Single video post - parrot
  {
    id: '8',
    username: 'exotic_birds',
    musicTitle: 'Tropical Sounds • Bird Calls',
    avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/parrot.mp4'
      }
    ],
    likes: 3847,
    comments: 567,
    shares: 234,
    caption: 'Meet Charlie! 🦜 He loves showing off his beautiful colors ✨ #parrot #birds #exotic #pets #charlie #beautiful',
    timestamp: '10h',
    type: 'single'
  },

  // Single image post
  {
    id: '9',
    username: 'street_photography',
    musicTitle: 'Urban Beats • City Life',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 1843,
    comments: 156,
    shares: 278,
    caption: 'Golden hour magic in the city ✨📸 #goldenhour #streetphotography #urban #city #photography #magic',
    timestamp: '12h',
    type: 'single'
  },

  // Carousel with tiger video and wildlife images
  {
    id: '10',
    username: 'wildlife_explorer',
    musicTitle: 'Nature Documentary • Wild Sounds',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/tiger.mp4'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/158109/kodiak-brown-bear-adult-portrait-wildlife-158109.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 4521,
    comments: 1089,
    shares: 2156,
    caption: 'Majestic tiger in its natural habitat 🐅 What an incredible experience! Swipe for more wildlife → #tiger #wildlife #nature #animals #majestic #conservation',
    timestamp: '1 day ago',
    type: 'carousel'
  },

  // Single video post - turtle
  {
    id: '11',
    username: 'ocean_life',
    musicTitle: 'Ocean Waves • Underwater Sounds',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'video',
        url: './assets/videos/turtle.mp4'
      }
    ],
    likes: 2890,
    comments: 423,
    shares: 567,
    caption: 'Swimming with sea turtles 🐢 Such peaceful creatures! #oceanlife #conservation #turtle #sea #underwater #peaceful',
    timestamp: '1 day ago',
    type: 'single'
  },

  // Carousel mixing all remaining elements
  {
    id: '12',
    username: 'adventure_seeker',
    musicTitle: 'Adventure Mix • Epic Journey',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
      }
    ],
    likes: 6743,
    comments: 892,
    shares: 1456,
    caption: 'Weekend mountain adventure 🏔️ The views were absolutely breathtaking! Nature never fails to amaze me ✨ #adventure #mountains #nature #hiking #breathtaking #weekend',
    timestamp: '2 days ago',
    type: 'carousel'
  }
];