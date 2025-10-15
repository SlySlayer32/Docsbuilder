import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Select Components,
              <span className="text-cyan-400"> Generate Docs Instantly</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose from pre-built boilerplate components and generate production-ready documentation in seconds.
              No AI needed, just instant results.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-cyan-500 text-white rounded-lg text-lg font-semibold hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl"
              >
                Start New Project
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
                View Demo
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/68ec72fae2337ff4f5139642_1760326449498_250c0a97.webp"
              alt="Documentation Platform"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
