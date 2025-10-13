import { Section } from '../types/interview';

export const allSections: Section[] = [
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
          { id: 'saas', label: 'SaaS Product' },
          { id: 'marketplace', label: 'Marketplace' },
          { id: 'ecommerce', label: 'E-commerce' },
          { id: 'internal', label: 'Internal Tool' },
          { id: 'content', label: 'Content Platform' },
          { id: 'social', label: 'Social Network' },
        ],
        allowDetails: true,
      },
      {
        id: 'target-users',
        title: 'Who are your target users?',
        type: 'multiple',
        options: [
          { id: 'consumers', label: 'Consumers' },
          { id: 'businesses', label: 'Businesses' },
          { id: 'enterprises', label: 'Enterprises' },
          { id: 'developers', label: 'Developers' },
        ],
        allowDetails: true,
      },
    ],
  },
  {
    id: 'tech',
    title: 'Technical Architecture',
    icon: '⚙️',
    questions: [
      {
        id: 'frontend',
        title: 'Choose your frontend framework',
        type: 'single',
        options: [
          { id: 'react', label: 'React' },
          { id: 'vue', label: 'Vue.js' },
          { id: 'nextjs', label: 'Next.js' },
          { id: 'svelte', label: 'Svelte' },
        ],
        allowDetails: false,
      },
      {
        id: 'backend',
        title: 'Choose your backend technology',
        type: 'single',
        options: [
          { id: 'nodejs', label: 'Node.js' },
          { id: 'python', label: 'Python' },
          { id: 'go', label: 'Go' },
          { id: 'ruby', label: 'Ruby' },
        ],
        allowDetails: false,
      },
      {
        id: 'database',
        title: 'Select your database',
        type: 'single',
        options: [
          { id: 'postgresql', label: 'PostgreSQL' },
          { id: 'mongodb', label: 'MongoDB' },
          { id: 'mysql', label: 'MySQL' },
          { id: 'supabase', label: 'Supabase' },
        ],
        allowDetails: false,
      },
    ],
  },
];
