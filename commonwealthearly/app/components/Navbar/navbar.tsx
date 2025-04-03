import React from 'react';
import { Globe, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4 bg-gray-800/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl flex justify-between items-center">
        {/* Left Section - Logo and Tabs */}
        <div className="flex items-center space-x-4">
          <div className="text-white p-2 bg-gray-700 rounded-full">
            <Globe size={24} />
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-2">
            {['Active', 'Potential', 'All News'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Right Section - Search and Admin */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-full w-64"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="bg-gray-700 p-2 rounded-full">
            <span className="text-white text-sm">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;