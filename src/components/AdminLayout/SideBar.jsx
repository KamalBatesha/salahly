import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const mainMenu = [
        { id: 'dashboard', icon: 'home-filled.png', activeIcon: 'home.png', label: 'الرئيسية', path: '/adminDashboard' },
        { id: 'statistics', icon: 'service-provider-filled.png', activeIcon: 'service-provider.png', label: 'الصنايعية', path: '/providers' },
        { id: 'students', icon: 'clients-filled.png', activeIcon: 'clients.png', label: 'العملاء', path: '/clients' },
        { id: 'applications', icon: 'menu-board-filled.png', activeIcon: 'menu-board.png', label: 'الطلبات', path: '/orders' },
        { id: 'reports', icon: 'category-filled.png', activeIcon: 'category.png', label: 'تخصص', path: '/services' },
        { id: 'reports', icon: 'profile-filled.png', activeIcon: 'profile.png', label: 'خدمات', path: '/profile' },
    ];

    const bottomMenu = [
        { id: 'settings', icon: 'settings.png', activeIcon: 'settings-active.png', label: 'الإعدادات', path: '/settings' },
        { id: 'logout', icon: 'logout.png', activeIcon: 'logout-active.png', label: 'تسجيل الخروج', path: '/help' },
    ];

    const isActive = (path) => {
        if (path === '/' && (location.pathname === '/' || location.pathname === '/AdminDashBoard')) {
            return true;
        }
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
                    ${active ? 'bg-[#004AAD] text-white text-lg font-bold' : 'text-[#004AAD] hover:bg-gray-100 font-medium'}`}

                     >

                    <span className="text-right w-full">{item.label}</span>
                    <img
                        src={`/images/icons/${active ? item.activeIcon : item.icon}`}
                        alt={item.label}
                        className="w-5 h-5 object-contain"
                    />
                </button>
            );
        })
    );

    return (
        <div className={`fixed right-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 transition-all duration-300 z-40 
            ${isOpen ? 'w-50' : 'w-0'} overflow-hidden rounded-tl-3xl rounded-bl-2xl flex flex-col justify-between`}>

            {/* Logo */}
            <div>
                <div className="h-18 border-b border-gray-200 flex items-center justify-center p-4">
                    <img src="/images/logo.png" alt="Logo" className="h-10 object-contain" />
                </div>

                {/* Main menu */}
                <div className="p-4">
                    <nav className="space-y-2">
                        {renderMenuItems(mainMenu)}
                    </nav>
                </div>
            </div>

            {/* Bottom menu */}
            <div className="p-4  border-gray-100">
                <nav className="space-y-2">
                    {renderMenuItems(bottomMenu)}
                </nav>
            </div>
        </div>
    );
};
