import React from 'react';
import { BoilerplateComponent } from '../../types/components';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

interface SelectionSummaryProps {
  selectedComponents: BoilerplateComponent[];
  onRemove: (componentId: string) => void;
  onGenerate: () => void;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selectedComponents,
  onRemove,
  onGenerate,
}) => {
  const totalHours = selectedComponents.reduce(
    (sum, comp) => sum + comp.estimatedHours,
    0
  );

  if (selectedComponents.length === 0) {
    return (
      <Card className="p-6 bg-gray-50 dark:bg-gray-900 sticky top-4">
        <h3 className="text-lg font-semibold mb-2">Selection Summary</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select components to get started
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-cyan-200 dark:border-cyan-800 sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Selected Components</h3>
      
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {selectedComponents.map((component) => (
          <div
            key={component.id}
            className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-xl">{component.icon}</span>
              <span className="text-sm font-medium">{component.name}</span>
            </div>
            <button
              onClick={() => onRemove(component.id)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
              aria-label={`Remove ${component.name}`}
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Components:</span>
          <Badge variant="secondary">{selectedComponents.length}</Badge>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Est. Time:</span>
          <Badge variant="secondary">{totalHours}h</Badge>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        Generate Documentation
      </button>
      
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
        {selectedComponents.length} component{selectedComponents.length !== 1 ? 's' : ''} • 40+ files • Instant generation
      </p>
    </Card>
  );
};
