import React from 'react';

interface CTAProps {
  onGetStarted: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  return (
    <div className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-xl mb-8 text-cyan-50">
          Start creating comprehensive documentation for your next project in minutes.
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-5 bg-white text-cyan-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
        >
          Get Started Free
        </button>
      </div>
    </div>
  );
};
