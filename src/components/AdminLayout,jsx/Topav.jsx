import React from 'react';
import profileCircle from '../../assets/profile-circle.png';

export const Topav = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4" dir="rtl">
      <div className="flex items-center justify-between">
        {/* Menu Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <i className="fas fa-bars text-xl text-gray-600"></i>
        </button>
        
        {/* Page Title */}
        {/* <h1 className="text-2xl font-bold text-gray-900">خدماتي</h1> */}
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <img src={profileCircle} alt="User" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">محمد علي</h3>
            <p className="text-sm text-gray-600">فني</p>
          </div>
          <i className="fas fa-chevron-down text-gray-500 text-sm"></i>
        </div>
      </div>
    </header>
  );
};