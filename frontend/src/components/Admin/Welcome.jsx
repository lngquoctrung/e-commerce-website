import React from 'react';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to the Admin Panel!</h1>
        <p className="text-gray-600 mb-6">
          Manage your products, orders, and settings efficiently. Use the sidebar to navigate through each section.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
