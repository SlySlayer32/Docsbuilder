import React from 'react';
import { BoilerplateComponent } from '../../types/components';
import { ComponentCard } from './ComponentCard';

interface CategorySectionProps {
  category: string;
  components: BoilerplateComponent[];
  selectedComponents: string[];
  onToggle: (componentId: string) => void;
}

const categoryIcons: Record<string, string> = {
  authentication: '🔐',
  dashboard: '📊',
  'data-management': '📝',
  payments: '💳',
  api: '🔄',
  communication: '📧',
  content: '📄',
  social: '👥',
  mobile: '📱',
  gaming: '🎮',
  ecommerce: '🛒',
  admin: '⚙️',
  security: '🔒',
  devops: '🚀',
};

const categoryLabels: Record<string, string> = {
  authentication: 'Authentication',
  dashboard: 'Dashboard',
  'data-management': 'Data Management',
  payments: 'Payments',
  api: 'API',
  communication: 'Communication',
  content: 'Content',
  social: 'Social',
  mobile: 'Mobile',
  gaming: 'Gaming',
  ecommerce: 'E-Commerce',
  admin: 'Admin',
  security: 'Security',
  devops: 'DevOps',
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  components,
  selectedComponents,
  onToggle,
}) => {
  if (components.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-3xl">{categoryIcons[category] || '📦'}</span>
        <h2 className="text-2xl font-bold">
          {categoryLabels[category] || category}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({components.length} component{components.length !== 1 ? 's' : ''})
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            isSelected={selectedComponents.includes(component.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};
