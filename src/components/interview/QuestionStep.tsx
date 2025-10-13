import React, { useState } from 'react';
import { Question } from '../../types/interview';
import { SelectionCard } from './SelectionCard';

interface QuestionStepProps {
  question: Question;
  selectedOptions: string[];
  details: string;
  onSelectionChange: (optionIds: string[]) => void;
  onDetailsChange: (details: string) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  selectedOptions,
  details,
  onSelectionChange,
  onDetailsChange,
}) => {
  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      onSelectionChange([optionId]);
    } else {
      if (selectedOptions.includes(optionId)) {
        onSelectionChange(selectedOptions.filter(id => id !== optionId));
      } else {
        onSelectionChange([...selectedOptions, optionId]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-gray-600 dark:text-gray-400">{question.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {question.options.map(option => (
          <SelectionCard
            key={option.id}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedOptions.includes(option.id)}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>

      {question.allowDetails && selectedOptions.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Details (Optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => onDetailsChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            rows={4}
            placeholder="Add any specific requirements or context..."
          />
        </div>
      )}
    </div>
  );
};
