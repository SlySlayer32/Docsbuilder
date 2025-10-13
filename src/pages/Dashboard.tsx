import React, { useState } from 'react';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { TemplateCard } from '../components/templates/TemplateCard';

const templates = [
  {
    id: 'saas',
    name: 'SaaS Platform',
    description: 'Subscription-based software service',
    image: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326461004_43072648.webp',
    features: ['User auth', 'Billing', 'Dashboard', 'API'],
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Connect buyers and sellers',
    image: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326463013_ae59fade.webp',
    features: ['Listings', 'Search', 'Payments', 'Reviews'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store platform',
    image: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326464752_5324d5e9.webp',
    features: ['Products', 'Cart', 'Checkout', 'Orders'],
  },
  {
    id: 'internal',
    name: 'Internal Tool',
    description: 'Business operations tool',
    image: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326466515_c37296f2.webp',
    features: ['Admin panel', 'Reports', 'Workflows', 'Integrations'],
  },
];

interface DashboardProps {
  onStartProject: (template?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartProject }) => {
  const [projects] = useState([
    {
      id: '1',
      name: 'My SaaS App',
      template: 'SaaS Platform',
      updatedAt: '2 days ago',
      progress: 75,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Projects
          </h1>
          <button
            onClick={() => onStartProject()}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            + New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Start from Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map(template => (
            <TemplateCard
              key={template.id}
              {...template}
              onSelect={() => onStartProject(template.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
