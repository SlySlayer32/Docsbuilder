import React from 'react';

interface SelectionCardProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  label,
  description,
  icon,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-xl border-2 transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${selected 
          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-cyan-300'
        }
      `}
    >
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
        {label}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
};
