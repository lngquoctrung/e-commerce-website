import React, { useState } from "react";

const ProductGrid = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Default");

  const products = [
    {
      id: 1,
      name: "Ribbed Tank Top",
      price: "$10.00",
      colors: ["bg-orange-500", "bg-black", "bg-gray-500"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Ribbed Modal T-shirt",
      price: "$12.00",
      colors: ["bg-red-500", "bg-blue-500", "bg-green-500"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Oversized Printed T-shirt",
      price: "$15.00",
      colors: ["bg-black", "bg-white"],
      image: "https://via.placeholder.com/300",
    },
  ];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Filter Button */}
          <button
            onClick={toggleFilter}
            className="p-2 border rounded-lg text-gray-700 hover:text-black"
          >
            <span className="sr-only">Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-4.586l-5.707-5.707A1 1 0 012 6V4z"
              />
            </svg>
          </button>
          <span>12 product(s) found</span>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-black"
          >
            <option value="Default">Default</option>
            <option value="AlphabeticalAZ">Alphabetically, A-Z</option>
            <option value="AlphabeticalZA">Alphabetically, Z-A</option>
            <option value="PriceLowToHigh">Price, low to high</option>
            <option value="PriceHighToLow">Price, high to low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              {/* Title */}
              <h3 className="text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              {/* Price */}
              <div className="text-gray-600 text-sm">{product.price}</div>
              {/* Color Options */}
              <div className="flex items-center gap-2 mt-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">
        <button className="px-4 py-2 bg-black text-white rounded-lg mx-2">
          1
        </button>
        <button className="px-4 py-2 border rounded-lg mx-2">2</button>
        <button className="px-4 py-2 border rounded-lg mx-2">3</button>
        <button className="px-4 py-2 border rounded-lg mx-2">4</button>
      </div>

      {/* Sliding Filter Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <div className="p-6">
          <button
            onClick={toggleFilter}
            className="text-gray-500 hover:text-black mb-4"
          >
            &#x2715; Close
          </button>
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          {/* Product Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">
              Product Categories
            </h3>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-black">Fashion</li>
              <li className="cursor-pointer hover:text-black">Men</li>
              <li className="cursor-pointer hover:text-black">Women</li>
              <li className="cursor-pointer hover:text-black">Denim</li>
              <li className="cursor-pointer hover:text-black">Dress</li>
            </ul>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Available (9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Out of Stock (3)</span>
              </label>
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Price</h3>
            <input
              type="range"
              min="10"
              max="50"
              className="w-full mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$10</span>
              <span>$50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop to Close Filter */}
      {isFilterOpen && (
        <div
          onClick={toggleFilter}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default ProductGrid;
