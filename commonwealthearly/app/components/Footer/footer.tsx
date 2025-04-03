import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-400">
          © 2025 Early Warning System. All rights reserved.
        </div>
        <div className="flex space-x-4 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;