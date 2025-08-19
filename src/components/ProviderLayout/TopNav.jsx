import React, { useContext } from 'react';
import { Menu } from 'lucide-react';
import { UserContext } from '../../context/UserContext';

export const TopNav = ({ toggleSidebar, isSidebarOpen }) => {
    const { userInfo } = useContext(UserContext);
      console.log(userInfo);
      console.log("userInfo");

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
                    src={userInfo?.profilePic?.secure_url || "/images/avatar.jpg"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-right ml-10">
                    <span className="text-sm font-bold text-gray-800">{userInfo?.name}</span>
                    <span className="text-xs text-gray-500">صنايعي</span>
                </div>
            </div>
        </nav>
    );
};