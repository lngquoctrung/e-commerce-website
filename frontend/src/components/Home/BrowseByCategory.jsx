import React, { useState, useEffect } from 'react';

const BrowseByCategory = () => {
  const categories = [
    { name: 'Phones', icon: '📱', isActive: false },
    { name: 'Computers', icon: '💻', isActive: false },
    { name: 'SmartWatch', icon: '⌚', isActive: false },
    { name: 'Camera', icon: '📷', isActive: true },
    { name: 'HeadPhones', icon: '🎧', isActive: false },
    { name: 'Gaming', icon: '🎮', isActive: false },
  ];

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handlePrev = () => {
    setVisibleIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setVisibleIndex((prev) => Math.min(prev + 1, categories.length - itemsPerPage));
  };

  return (
    <div className="bg-white py-8 px-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-2 h-8 bg-red-500 rounded-sm mr-4"></div>
            <h2 className="text-lg text-red-500 font-medium">Categories</h2>
          </div>
          <h1 className="text-3xl font-bold">Browse By Category</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={visibleIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={visibleIndex >= categories.length - itemsPerPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="overflow-hidden flex justify-center">
        <div
          className="flex gap-4 transition-transform"
          style={{
            transform: `translateX(-${visibleIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-4 w-32 h-32 border rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                category.isActive ? 'bg-red-500 text-white' : 'bg-white text-black'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
