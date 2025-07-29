import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import hammer1 from '../../assets/hammer1.png';

export const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const mainMenu = [
        { id: 'home', icon: 'fas fa-home', label: 'الرئيسية', path: '/' },
        { id: 'orders', icon: 'fas fa-clipboard-list', label: 'طلباتي', path: '/orders' },
        { id: 'services', icon: 'fas fa-tools', label: 'خدماتي', path: '/services' },
        { id: 'messages', icon: 'fas fa-comments', label: 'الرسائل', path: '/messages' },
        { id: 'notifications', icon: 'fas fa-bell', label: 'الاشعارات', path: '/notifications' },
        { id: 'profile', icon: 'fas fa-user', label: 'الملف الشخصي', path: '/profile' },
    ];

    const bottomMenu = [
        { id: 'settings', icon: 'fas fa-cog', label: 'الاعدادات', path: '/settings' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'تسجيل الخروج', path: '/logout' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    const renderMenuItems = (items) => (
        items.map((item) => {
            const active = isActive(item.path);
            return (
                <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex flex-row-reverse items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm
                    ${active ? 'bg-[#004AAD] text-white text-xl font-bold' : 'text-[#004AAD] hover:bg-gray-100 font-medium'}`}
                >
                    <span className="text-right w-full">{item.label}</span>
                    <i className={`${item.icon} text-lg`}></i>
                </button>
            );
        })
    );

    return (
        <div className={`fixed right-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 transition-all duration-300 z-40 
            ${isOpen ? 'w-64' : 'w-0'} overflow-hidden rounded-tl-3xl rounded-bl-2xl flex flex-col justify-between`}>

            {/* Logo */}
            <div>
                <div className="h-18 border-b border-gray-200 flex items-center justify-start p-4">
                    <div className="flex items-center gap-3">
                        <img src={hammer1} alt="Logo" className="h-8 w-8 object-contain" />
                        <span className="text-2xl font-bold text-[#004AAD]">صلحلي</span>
                    </div>
                </div>

                {/* Main menu */}
                <div className="p-4">
                    <nav className="space-y-2">
                        {renderMenuItems(mainMenu)}
                    </nav>
                </div>
            </div>

            {/* Bottom menu */}
            <div className="p-4 border-t border-gray-100">
                <nav className="space-y-2">
                    {renderMenuItems(bottomMenu)}
                </nav>
            </div>
        </div>
    );
};