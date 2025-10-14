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
      {
        id: 'api-design',
        title: 'What API design approach will you use?',
        type: 'single',
        options: [
          { id: 'rest', label: 'REST API', icon: '🔄', description: 'Traditional RESTful API' },
          { id: 'graphql', label: 'GraphQL', icon: '⚡', description: 'Query language for APIs' },
          { id: 'grpc', label: 'gRPC', icon: '🚀', description: 'High performance RPC' },
          { id: 'mixed', label: 'Mixed/Hybrid', icon: '🔀', description: 'Combination of approaches' },
        ],
        allowDetails: true,
      },
      {
        id: 'real-time',
        title: 'Do you need real-time features?',
        type: 'single',
        options: [
          { id: 'websockets', label: 'WebSockets', icon: '🔌', description: 'Full-duplex communication' },
          { id: 'sse', label: 'Server-Sent Events', icon: '📡', description: 'Server-to-client streaming' },
          { id: 'polling', label: 'Polling', icon: '🔁', description: 'Regular interval requests' },
          { id: 'no', label: 'No real-time features', icon: '❌' },
        ],
        allowDetails: true,
      },
      {
        id: 'file-storage',
        title: 'Do you need file upload and storage?',
        type: 'single',
        options: [
          { id: 's3', label: 'AWS S3', icon: '☁️', description: 'Amazon S3 storage' },
          { id: 'cloudinary', label: 'Cloudinary', icon: '🖼️', description: 'Media management' },
          { id: 'local', label: 'Local Storage', icon: '💾', description: 'Server file system' },
          { id: 'no', label: 'No file storage', icon: '❌' },
        ],
        allowDetails: true,
      },
      {
        id: 'search',
        title: 'Do you need search functionality?',
        type: 'single',
        options: [
          { id: 'elastic', label: 'Elasticsearch', icon: '🔍', description: 'Full-text search engine' },
          { id: 'algolia', label: 'Algolia', icon: '⚡', description: 'Hosted search service' },
          { id: 'database', label: 'Database Search', icon: '🗄️', description: 'Built-in database search' },
          { id: 'no', label: 'No search needed', icon: '❌' },
        ],
        allowDetails: true,
      },
      {
        id: 'email-service',
        title: 'Do you need email/notification services?',
        type: 'multiple',
        options: [
          { id: 'transactional', label: 'Transactional Emails', icon: '📧', description: 'Account-related emails' },
          { id: 'marketing', label: 'Marketing Emails', icon: '📣', description: 'Bulk email campaigns' },
          { id: 'push', label: 'Push Notifications', icon: '🔔', description: 'Mobile/browser push' },
          { id: 'sms', label: 'SMS Notifications', icon: '💬', description: 'Text messages' },
          { id: 'no', label: 'No notifications', icon: '❌' },
        ],
        allowDetails: true,
      },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & Operations',
    icon: '🧪',
    questions: [
      {
        id: 'testing-strategy',
        title: 'What testing approaches will you use?',
        type: 'multiple',
        options: [
          { id: 'unit', label: 'Unit Tests', icon: '🔬', description: 'Test individual components' },
          { id: 'integration', label: 'Integration Tests', icon: '🔗', description: 'Test component interactions' },
          { id: 'e2e', label: 'End-to-End Tests', icon: '🎯', description: 'Test complete workflows' },
          { id: 'manual', label: 'Manual Testing', icon: '👤', description: 'Manual QA process' },
        ],
        allowDetails: true,
      },
      {
        id: 'deployment',
        title: 'What is your deployment preference?',
        type: 'single',
        options: [
          { id: 'vercel', label: 'Vercel', icon: '▲', description: 'Frontend platform' },
          { id: 'netlify', label: 'Netlify', icon: '🌐', description: 'Web hosting' },
          { id: 'aws', label: 'AWS', icon: '☁️', description: 'Amazon Web Services' },
          { id: 'docker', label: 'Docker/Kubernetes', icon: '🐳', description: 'Container orchestration' },
          { id: 'heroku', label: 'Heroku', icon: '💜', description: 'Platform as a Service' },
        ],
        allowDetails: true,
      },
      {
        id: 'monitoring',
        title: 'Do you need monitoring and logging?',
        type: 'single',
        options: [
          { id: 'full', label: 'Full Stack Monitoring', icon: '📊', description: 'APM, logs, metrics' },
          { id: 'basic', label: 'Basic Logging', icon: '📝', description: 'Application logs only' },
          { id: 'later', label: 'Add Later', icon: '⏰', description: 'Not needed initially' },
        ],
        allowDetails: true,
      },
    ],
  },
];
