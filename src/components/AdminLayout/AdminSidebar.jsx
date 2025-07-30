import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import hammer1 from '../../assets/hammer1.png';

export const AdminSidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = [
    { id: 'home', icon: 'fas fa-home', label: 'الرئيسية', path: '/' },
    { id: 'orders', icon: 'fas fa-clipboard-list', label: 'طلباتي', path: '/orders' },
    { id: 'categories', icon: 'fas fa-layer-group', label: 'تخصص', path: '/categories' },
    { id: 'services', icon: 'fas fa-tools', label: 'خدمات', path: '/services' },
    { id: 'clients', icon: 'fas fa-users', label: 'العملاء', path: '/clients' },
    { id: 'providers', icon: 'fas fa-user-cog', label: 'الصنايعية', path: '/providers' },
    { id: 'messages', icon: 'fas fa-comments', label: 'الرسائل', path: '/AdminChat' },
  ];

  const bottomMenu = [
    { id: 'help', icon: 'fas fa-question-circle', label: 'المساعدة', path: '/help' },
    { id: 'logout', icon: 'fas fa-sign-out-alt', label: 'تسجيل الخروج', path: '/logout' },
  ];

  const isActive = (path) => location.pathname === path;

  const renderMenuItems = (items) =>
    items.map((item) => {
      const active = isActive(item.path);
      return (
        <button
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`w-full flex flex-row-reverse items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-base
            ${active
              ? 'bg-[#004AAD] text-white font-bold'
              : 'text-[#004AAD] hover:bg-gray-100 font-medium'}`}
        >
          <span className="flex-1 text-right">{item.label}</span>
          <i className={`${item.icon} text-lg`}></i>
        </button>
      );
    });

  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-200 z-50
        ${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden
        flex flex-col justify-between rounded-tl-3xl rounded-bl-2xl`}
      dir="rtl"
    >
      {/* Logo Header */}
      <div>
        <div className="h-20 border-b border-gray-200 flex items-center justify-start px-5">
          <div className="flex items-center gap-3">
            <img src={hammer1} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-bold text-[#004AAD]">صلحلي</span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="p-4">
          <nav className="space-y-2">
            {renderMenuItems(mainMenu)}
          </nav>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100">
        <nav className="space-y-2">
          {renderMenuItems(bottomMenu)}
        </nav>
      </div>
    </aside>
  );
};
