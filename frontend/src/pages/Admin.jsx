import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from '../components/Admin/Sidebar';

export const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Auto-toggle sidebar based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Show sidebar on large screens
      } else {
        setSidebarOpen(false); // Hide sidebar on small screens
      }
    };

    // Set initial state based on current screen size
    handleResize();

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-6 lg:ml-64">
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 bg-blue-600 text-white rounded-full fixed top-4 left-4 z-50 shadow-md"
        >
          ☰
        </button>

        {/* Render Child Routes */}
        <Outlet /> {/* Displays the active child route */}
      </div>
    </div>
  );
};
