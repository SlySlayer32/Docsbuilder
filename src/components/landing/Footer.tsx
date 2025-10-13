import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DocGen AI</h3>
            <p className="text-gray-400">
              Transform your ideas into comprehensive, AI-ready project documentation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400">Templates</a></li>
              <li><a href="#" className="hover:text-cyan-400">Pricing</a></li>
              <li><a href="#" className="hover:text-cyan-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400">About</a></li>
              <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400">Privacy</a></li>
              <li><a href="#" className="hover:text-cyan-400">Terms</a></li>
              <li><a href="#" className="hover:text-cyan-400">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 DocGen AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
