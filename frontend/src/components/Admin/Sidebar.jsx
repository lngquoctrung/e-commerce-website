import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Overview", icon: "fas fa-chart-bar", href: "/admin/overview" },
    { name: "Product", icon: "fas fa-box", href: "/admin/product" },
    { name: "Orders", icon: "fas fa-shopping-cart", href: "/admin/orders" },
    { name: "Category", icon: "fas fa-cash-register", href: "/admin/category"},
    { name: "Setting", icon: "fas fa-cogs", href: "/admin/setting" },
  ];

  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigate to another page programmatically

  const handleLogout = () => {
    // Perform logout logic here if needed
    console.log("User logged out!");
    navigate('/'); // Redirect to the main page
  };

  return (
    <aside
      className={`bg-white shadow-lg flex flex-col h-full fixed top-0 left-0 z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '16rem' }}
    >
      {/* Sidebar Header */}
      <div className="p-6 text-blue-600 font-extrabold text-2xl tracking-wide flex justify-between items-center">
        Aeon
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-500 hover:text-red-600 focus:outline-none"
        >
          &#10005; {/* Close icon */}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-6">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`group flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
              location.pathname === item.href
                ? 'text-blue-600 bg-blue-50 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
            }`}
          >
            <i
              className={`mr-4 text-lg ${
                location.pathname === item.href ? 'text-blue-600' : 'text-gray-400'
              } ${item.icon}`}
            ></i>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <a
          href="/help-centre"
          className={`group flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
            location.pathname === '/help-centre' ? 'text-blue-600 bg-blue-50 font-medium' : ''
          }`}
        >
          <i
            className={`mr-4 text-lg ${
              location.pathname === '/help-centre' ? 'text-blue-600' : 'text-gray-400'
            } fas fa-info-circle`}
          ></i>
          <span>Help Centre</span>
        </a>
        <a
          href="/contact-us"
          className={`group flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
            location.pathname === '/contact-us' ? 'text-blue-600 bg-blue-50 font-medium' : ''
          }`}
        >
          <i
            className={`mr-4 text-lg ${
              location.pathname === '/contact-us' ? 'text-blue-600' : 'text-gray-400'
            } fas fa-comment-alt`}
          ></i>
          <span>Contact Us</span>
        </a>
        <button
          onClick={handleLogout}
          className="group flex items-center px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
        >
          <i className="mr-4 text-lg fas fa-sign-out-alt"></i>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
