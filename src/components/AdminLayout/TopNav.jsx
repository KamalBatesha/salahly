import React from 'react';
import { Menu } from 'lucide-react';

export const TopNav = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between w-full">
        
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            <div className="flex items-center gap-3 ml-4">
                <img
                    src="/images/avatar.jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-bold text-gray-800">محمد علي</span>
            </div>
        </nav>
    );
};
