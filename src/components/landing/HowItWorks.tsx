import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Choose Template',
    description: 'Select from pre-built templates or start from scratch',
  },
  {
    number: '2',
    title: 'Answer Questions',
    description: 'Complete the interactive interview with selection cards',
  },
  {
    number: '3',
    title: 'Review & Edit',
    description: 'Refine generated documentation with built-in editor',
  },
  {
    number: '4',
    title: 'Export & Build',
    description: 'Download docs and use as context for AI development',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            From idea to implementation-ready docs in 4 simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-cyan-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
