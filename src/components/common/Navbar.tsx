import React from 'react';

interface NavbarProps {
  onLogoClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick, showBackButton, onBackClick }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back
            </button>
          )}
          <button
            onClick={onLogoClick}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            📝 DocGen AI
          </button>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Docs
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Pricing
          </a>
        </div>
      </div>
    </nav>
  );
};
