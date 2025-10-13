import { Section } from '../types/interview';

export const interviewSections: Section[] = [
  {
    id: 'vision',
    title: 'Project Vision',
    icon: '🎯',
    questions: [
      {
        id: 'purpose',
        title: 'What is the primary purpose of your project?',
        type: 'single',
        options: [
          { id: 'saas', label: 'SaaS Product', description: 'Subscription-based software service' },
          { id: 'marketplace', label: 'Marketplace', description: 'Connect buyers and sellers' },
          { id: 'ecommerce', label: 'E-commerce', description: 'Sell products online' },
          { id: 'internal', label: 'Internal Tool', description: 'Business operations tool' },
          { id: 'content', label: 'Content Platform', description: 'Publishing and media' },
          { id: 'social', label: 'Social Network', description: 'Community and connections' },
        ],
        allowDetails: true,
      },
      {
        id: 'target-users',
        title: 'Who are your target users?',
        type: 'multiple',
        options: [
          { id: 'consumers', label: 'Consumers', description: 'Individual end users' },
          { id: 'businesses', label: 'Businesses', description: 'Small to medium businesses' },
          { id: 'enterprises', label: 'Enterprises', description: 'Large organizations' },
          { id: 'developers', label: 'Developers', description: 'Technical users' },
        ],
        allowDetails: true,
      },
    ],
  },
  {
    id: 'tech',
    title: 'Technical Stack',
    icon: '⚙️',
    questions: [
      {
        id: 'frontend',
        title: 'Choose your frontend framework',
        type: 'single',
        options: [
          { id: 'react', label: 'React', icon: '⚛️' },
          { id: 'vue', label: 'Vue.js', icon: '🟢' },
          { id: 'nextjs', label: 'Next.js', icon: '▲' },
          { id: 'svelte', label: 'Svelte', icon: '🔥' },
        ],
        allowDetails: false,
      },
      {
        id: 'backend',
        title: 'Choose your backend technology',
        type: 'single',
        options: [
          { id: 'nodejs', label: 'Node.js', icon: '🟩' },
          { id: 'python', label: 'Python', icon: '🐍' },
          { id: 'go', label: 'Go', icon: '🔵' },
          { id: 'ruby', label: 'Ruby', icon: '💎' },
        ],
        allowDetails: false,
      },
      {
        id: 'database',
        title: 'Select your database',
        type: 'single',
        options: [
          { id: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
          { id: 'mongodb', label: 'MongoDB', icon: '🍃' },
          { id: 'mysql', label: 'MySQL', icon: '🐬' },
          { id: 'supabase', label: 'Supabase', icon: '⚡' },
        ],
        allowDetails: false,
      },
    ],
  },
  {
    id: 'features',
    title: 'Core Features',
    icon: '✨',
    questions: [
      {
        id: 'auth',
        title: 'What authentication methods do you need?',
        type: 'multiple',
        options: [
          { id: 'email', label: 'Email/Password', icon: '📧' },
          { id: 'social', label: 'Social Login', icon: '🔗' },
          { id: 'magic', label: 'Magic Link', icon: '✨' },
          { id: 'sso', label: 'Enterprise SSO', icon: '🏢' },
        ],
        allowDetails: true,
      },
      {
        id: 'payments',
        title: 'Do you need payment processing?',
        type: 'single',
        options: [
          { id: 'yes-stripe', label: 'Yes - Stripe', icon: '💳' },
          { id: 'yes-other', label: 'Yes - Other', icon: '💰' },
          { id: 'no', label: 'No payments', icon: '❌' },
        ],
        allowDetails: true,
      },
    ],
  },
];
