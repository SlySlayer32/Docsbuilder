import React from 'react';
import { TechStack } from '../../types/components';
import { Card } from '../ui/card';

interface TechStackSelectorProps {
  techStack: TechStack;
  onTechStackChange: (techStack: TechStack) => void;
}

const techOptions = {
  frontend: [
    { id: 'react', label: 'React', icon: '⚛️' },
    { id: 'vue', label: 'Vue.js', icon: '🟢' },
    { id: 'nextjs', label: 'Next.js', icon: '▲' },
    { id: 'svelte', label: 'Svelte', icon: '🔥' },
  ],
  backend: [
    { id: 'nodejs', label: 'Node.js', icon: '🟩' },
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'go', label: 'Go', icon: '🔵' },
    { id: 'firebase', label: 'Firebase', icon: '🔥' },
  ],
  database: [
    { id: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
    { id: 'mongodb', label: 'MongoDB', icon: '🍃' },
    { id: 'mysql', label: 'MySQL', icon: '🐬' },
    { id: 'supabase', label: 'Supabase', icon: '⚡' },
  ],
};

export const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  techStack,
  onTechStackChange,
}) => {
  const handleChange = (layer: keyof TechStack, value: string) => {
    onTechStackChange({
      ...techStack,
      [layer]: value,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-cyan-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Select Your Tech Stack</h3>
      <div className="space-y-6">
        {Object.entries(techOptions).map(([layer, options]) => (
          <div key={layer}>
            <label className="block text-sm font-medium mb-2 capitalize">
              {layer}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange(layer as keyof TechStack, option.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    techStack[layer as keyof TechStack] === option.id
                      ? 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900 shadow-md'
                      : 'border-gray-200 dark:border-gray-600 hover:border-cyan-300 dark:hover:border-cyan-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
