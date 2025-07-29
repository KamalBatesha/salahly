import React, { useState } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './SideBar';

const ProviderLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FBFCFE]" dir="rtl">
      {/* Sidebar on the right */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'pr-45' : 'pr-0'}`}>
        <TopNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
