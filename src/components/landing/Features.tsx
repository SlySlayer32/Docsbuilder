import React from 'react';

const features = [
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326450655_394868db.webp',
    title: 'Smart Interview System',
    description: 'Answer selection-based questions with optional details for rapid specification.',
  },
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326452374_faaecad3.webp',
    title: 'Comprehensive Docs',
    description: '40+ markdown files covering every aspect from vision to deployment.',
  },
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326454086_9cbda3d2.webp',
    title: 'AI-Ready Format',
    description: 'Structured documentation optimized for AI development tools.',
  },
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326455822_f55d386c.webp',
    title: 'Live Editor',
    description: 'Edit and refine documentation with real-time markdown preview.',
  },
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326457522_ac1a9180.webp',
    title: 'Export & Share',
    description: 'Download as ZIP or share via link with team members.',
  },
  {
    icon: 'https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326459576_178de4be.webp',
    title: 'Project Templates',
    description: 'Start fast with templates for SaaS, marketplace, e-commerce, and more.',
  },
];

export const Features: React.FC = () => {
  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional documentation generation in minutes, not hours
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-all"
            >
              <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-4 rounded-lg" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
