import React from 'react';

const stats = [
  { value: '10,000+', label: 'Projects Created' },
  { value: '40+', label: 'Documentation Files' },
  { value: '5 min', label: 'Average Setup Time' },
  { value: '99%', label: 'User Satisfaction' },
];

export const Stats: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
