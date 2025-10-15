import React, { useState, useMemo } from 'react';
import { boilerplateComponents, getAllCategories } from '../../data/boilerplateComponents';
import { TechStack } from '../../types/components';
import { CategorySection } from './CategorySection';
import { TechStackSelector } from './TechStackSelector';
import { SelectionSummary } from './SelectionSummary';

interface ComponentSelectorProps {
  onGenerate: (componentIds: string[], techStack: TechStack) => void;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  onGenerate,
}) => {
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<TechStack>({
    frontend: 'react',
    backend: 'nodejs',
    database: 'postgresql',
  });

  const categories = getAllCategories();

  const componentsByCategory = useMemo(() => {
    const map: Record<string, typeof boilerplateComponents> = {};
    categories.forEach((category) => {
      map[category] = boilerplateComponents.filter((c) => c.category === category);
    });
    return map;
  }, [categories]);

  const selectedComponents = useMemo(() => {
    return boilerplateComponents.filter((c) =>
      selectedComponentIds.includes(c.id)
    );
  }, [selectedComponentIds]);

  const handleToggle = (componentId: string) => {
    setSelectedComponentIds((prev) =>
      prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleRemove = (componentId: string) => {
    setSelectedComponentIds((prev) => prev.filter((id) => id !== componentId));
  };

  const handleGenerate = () => {
    if (selectedComponentIds.length === 0) {
      alert('Please select at least one component');
      return;
    }
    onGenerate(selectedComponentIds, techStack);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Select Your Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose from our library of production-ready boilerplate components
          </p>
        </div>

        {/* Tech Stack Selector */}
        <div className="mb-8">
          <TechStackSelector
            techStack={techStack}
            onTechStackChange={setTechStack}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Components List */}
          <div className="lg:col-span-2">
            {categories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                components={componentsByCategory[category] || []}
                selectedComponents={selectedComponentIds}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Selection Summary Sidebar */}
          <div className="lg:col-span-1">
            <SelectionSummary
              selectedComponents={selectedComponents}
              onRemove={handleRemove}
              onGenerate={handleGenerate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
