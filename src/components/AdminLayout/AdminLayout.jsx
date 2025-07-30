import React, { useState } from 'react';
import { TopNav } from './TopNav';
import { AdminSidebar } from './SideBar';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FBFCFE]" dir="rtl">
      {/* Sidebar on the right */}
      <AdminSidebar isOpen={isSidebarOpen} />
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'}`}>
        <TopNav 
          sidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;