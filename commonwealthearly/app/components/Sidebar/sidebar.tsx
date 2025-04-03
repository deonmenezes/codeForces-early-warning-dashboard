import React, { useState } from 'react'; 
import {
    LayoutDashboard,
    Newspaper,
    Activity,
    Users,
    Globe,
    Settings,
    HelpCircle,
    Menu,
    X
} from 'lucide-react';

interface SidebarProps {
   username?: string;
   userAvatar?: string;
   onMenuItemSelect?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    username = "Andrew Smith",
    userAvatar = "/api/placeholder/40/40",
    onMenuItemSelect
}) => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, name: 'Dashboard', disabled: false },
        { icon: Newspaper, name: 'View News', disabled: false },
        { icon: Activity, name: 'What we do', disabled: false },
        { icon: Users, name: 'Advisory Panel', disabled: true },
        { icon: Globe, name: 'Our Impact', disabled: true },
        { icon: Settings, name: 'Resources', disabled: true },
        { icon: Settings, name: 'Language', disabled: true },
        { icon: Settings, name: 'Country Analytics', disabled: true }
    ];

    const handleItemClick = (item: string) => {
        if (menuItems.find(m => m.name === item)?.disabled) return;
        
        setActiveItem(item);
        onMenuItemSelect?.(item);
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Toggle Button */}
            <button 
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-[9999] bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div 
                className={`
                    fixed top-0 left-0 h-screen w-64 bg-gray-800 
                    shadow-2xl z-[9998] transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* User Profile */}
                <div className="flex items-center p-4 border-b border-gray-700">
                    <img
                        src={userAvatar}
                        alt={username}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h2 className="text-white font-semibold">{username}</h2>
                        <p className="text-xs text-gray-400">Administrator</p>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-grow py-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            className={`
                                w-full flex items-center px-4 py-3 text-left
                                transition-colors duration-200
                                ${activeItem === item.name
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'}
                                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            onClick={() => handleItemClick(item.name)}
                            disabled={item.disabled}
                        >
                            <item.icon className="mr-3" size={20} />
                            <span className="text-sm">{item.name}</span>
                        </button>
                    ))}
                </nav>

                {/* About Button */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        className="w-full bg-orange-500 text-white py-2 rounded-full
                        hover:bg-orange-600 transition-colors duration-300 flex
                        items-center justify-center"
                    >
                        <HelpCircle className="mr-2" size={20} />
                        About
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div 
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 z-[9997]"
                />
            )}
        </>
    );
};

export default Sidebar;