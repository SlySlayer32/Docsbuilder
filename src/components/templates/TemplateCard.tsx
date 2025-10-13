import React from 'react';

interface TemplateCardProps {
  name: string;
  description: string;
  image: string;
  features: string[];
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  description,
  image,
  features,
  onSelect,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="text-cyan-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onSelect}
          className="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};
