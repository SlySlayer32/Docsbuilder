import React from 'react';

interface SectionProgressProps {
  sections: { id: string; title: string; icon: string }[];
  currentSectionIndex: number;
}

export const SectionProgress: React.FC<SectionProgressProps> = ({ sections, currentSectionIndex }) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              idx === currentSectionIndex
                ? 'bg-cyan-500 text-white'
                : idx < currentSectionIndex
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
            {idx < currentSectionIndex && <span className="text-green-500">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
