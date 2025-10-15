import React from 'react';
import { BoilerplateComponent } from '../../types/components';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check } from 'lucide-react';

interface ComponentCardProps {
  component: BoilerplateComponent;
  isSelected: boolean;
  onToggle: (componentId: string) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isSelected,
  onToggle,
}) => {
  const complexityColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  return (
    <Card
      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-950'
          : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={() => onToggle(component.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="text-4xl">{component.icon}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{component.name}</h3>
              {isSelected && (
                <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-white rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {component.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="secondary"
                className={complexityColors[component.complexity]}
              >
                {component.complexity}
              </Badge>
              <Badge variant="outline">{component.estimatedHours}h</Badge>
              {component.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
