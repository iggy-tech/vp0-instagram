// Conversations mock data for Instagram clone

export interface Message {
  id: number;
  text?: string;
  imageUrl?: string;
  sender: 'me' | 'other';
  timestamp: string;
  type: 'text' | 'image';
}

export interface Conversation {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

export const conversations: Conversation[] = [
  {
    id: 'alex-johnson',
    username: 'Alex Johnson',
    handle: 'alexj_photo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for sharing that article',
    timestamp: '2m',
    unread: true,
    messages: [
      {
        id: 1,
        text: 'Hey! Did you see that new photography exhibition?',
        sender: 'other',
        timestamp: '10:30 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'No, which one?',
        sender: 'me',
        timestamp: '10:35 AM',
        type: 'text'
      },
      {
        id: 3,
        text: 'The one at the modern art gallery downtown',
        sender: 'other',
        timestamp: '10:36 AM',
        type: 'text'
      },
      {
        id: 4,
        imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        sender: 'other',
        timestamp: '10:37 AM',
        type: 'image'
      },
      {
        id: 5,
        text: 'Wow that looks amazing! 📸',
        sender: 'me',
        timestamp: '10:45 AM',
        type: 'text'
      },
      {
        id: 6,
        text: 'I know right? We should go together',
        sender: 'other',
        timestamp: '10:46 AM',
        type: 'text'
      },
      {
        id: 7,
        text: 'Definitely! When are you free?',
        sender: 'me',
        timestamp: '10:50 AM',
        type: 'text'
      },
      {
        id: 8,
        text: 'Thanks for sharing that article',
        sender: 'other',
        timestamp: '2:28 PM',
        type: 'text'
      }
    ]
  },
  {
    id: 'sarah-williams',
    username: 'Sarah Williams',
    handle: 'sarahwilliams',
    avatar: 'https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastMessage: 'Sounds good, see you tomorrow',
    timestamp: '15m',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Hey Sarah! How was your weekend?',
        sender: 'me',
        timestamp: '9:15 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'It was great! Went hiking with some friends',
        sender: 'other',
        timestamp: '9:20 AM',
        type: 'text'
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        sender: 'other',
        timestamp: '9:21 AM',
        type: 'image'
      },
      {
        id: 4,
        text: 'Beautiful view! 🏔️',
        sender: 'me',
        timestamp: '9:25 AM',
        type: 'text'
      },
      {
        id: 5,
        text: 'Want to grab coffee tomorrow?',
        sender: 'me',
        timestamp: '1:45 PM',
        type: 'text'
      },
      {
        id: 6,
        text: 'Sounds good, see you tomorrow',
        sender: 'other',
        timestamp: '2:25 PM',
        type: 'text'
      }
    ]
  },
  {
    id: 'mike-chen',
    username: 'Mike Chen',
    handle: 'mikechen_dev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Got it, will review and get back to you',
    timestamp: '1h',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Hey Mike, can you review this code when you get a chance?',
        sender: 'me',
        timestamp: '11:30 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'Sure thing! Send it over',
        sender: 'other',
        timestamp: '11:45 AM',
        type: 'text'
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        sender: 'me',
        timestamp: '11:46 AM',
        type: 'image'
      },
      {
        id: 4,
        text: 'Got it, will review and get back to you',
        sender: 'other',
        timestamp: '1:30 PM',
        type: 'text'
      }
    ]
  },
  {
    id: 'team-workspace',
    username: 'Team Workspace',
    handle: 'teamworkspace',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Meeting notes have been shared',
    timestamp: '3h',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Good morning team! 👋',
        sender: 'other',
        timestamp: '9:00 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'Morning! Ready for the sprint review?',
        sender: 'me',
        timestamp: '9:05 AM',
        type: 'text'
      },
      {
        id: 3,
        text: 'Absolutely! I have the presentation ready',
        sender: 'other',
        timestamp: '9:10 AM',
        type: 'text'
      },
      {
        id: 4,
        text: 'Meeting notes have been shared',
        sender: 'other',
        timestamp: '11:45 AM',
        type: 'text'
      }
    ]
  },
  {
    id: 'emma-davis',
    username: 'Emma Davis',
    handle: 'emmadavis',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Perfect, let\'s move forward with this',
    timestamp: '5h',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Hey there!',
        sender: 'other',
        timestamp: '8:00 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'Hello! How are you?',
        sender: 'me',
        timestamp: '8:05 AM',
        type: 'text'
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        sender: 'other',
        timestamp: '8:06 AM',
        type: 'image'
      },
      {
        id: 4,
        text: 'I\'m doing well! Just shared some photos from my latest project',
        sender: 'other',
        timestamp: '8:07 AM',
        type: 'text'
      },
      {
        id: 5,
        text: 'Looks great! I love the minimalist design',
        sender: 'me',
        timestamp: '8:15 AM',
        type: 'text'
      },
      {
        id: 6,
        text: 'Thank you! Want to collaborate on something similar?',
        sender: 'other',
        timestamp: '8:20 AM',
        type: 'text'
      },
      {
        id: 7,
        text: 'Perfect, let\'s move forward with this',
        sender: 'other',
        timestamp: '9:30 AM',
        type: 'text'
      }
    ]
  },
  {
    id: 'project-team',
    username: 'Project Team',
    handle: 'projectteam',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Updated timeline is ready for review',
    timestamp: '1d',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Team update: We\'re ahead of schedule! 🎉',
        sender: 'other',
        timestamp: 'Yesterday 2:00 PM',
        type: 'text'
      },
      {
        id: 2,
        text: 'That\'s awesome news!',
        sender: 'me',
        timestamp: 'Yesterday 2:05 PM',
        type: 'text'
      },
      {
        id: 3,
        text: 'Updated timeline is ready for review',
        sender: 'other',
        timestamp: 'Yesterday 4:30 PM',
        type: 'text'
      }
    ]
  },
  {
    id: 'david-smith',
    username: 'David Smith',
    handle: 'davidsmith',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Delivery confirmed for Friday',
    timestamp: '2d',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Hi David! Quick question about the delivery',
        sender: 'me',
        timestamp: '2 days ago 10:00 AM',
        type: 'text'
      },
      {
        id: 2,
        text: 'Sure, what\'s up?',
        sender: 'other',
        timestamp: '2 days ago 10:15 AM',
        type: 'text'
      },
      {
        id: 3,
        text: 'Can we reschedule to Friday instead?',
        sender: 'me',
        timestamp: '2 days ago 10:16 AM',
        type: 'text'
      },
      {
        id: 4,
        text: 'Delivery confirmed for Friday',
        sender: 'other',
        timestamp: '2 days ago 10:20 AM',
        type: 'text'
      }
    ]
  },
  {
    id: 'lisa-brown',
    username: 'Lisa Brown',
    handle: 'lisabrown',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thank you for the quick response',
    timestamp: '3d',
    unread: false,
    messages: [
      {
        id: 1,
        text: 'Hi Lisa! I have some updates on the project',
        sender: 'me',
        timestamp: '3 days ago 3:00 PM',
        type: 'text'
      },
      {
        id: 2,
        text: 'Great! I\'d love to hear them',
        sender: 'other',
        timestamp: '3 days ago 3:15 PM',
        type: 'text'
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        sender: 'me',
        timestamp: '3 days ago 3:16 PM',
        type: 'image'
      },
      {
        id: 4,
        text: 'This looks fantastic!',
        sender: 'other',
        timestamp: '3 days ago 3:25 PM',
        type: 'text'
      },
      {
        id: 5,
        text: 'Thank you for the quick response',
        sender: 'other',
        timestamp: '3 days ago 3:30 PM',
        type: 'text'
      }
    ]
  }
];