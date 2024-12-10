import React from 'react';

const HeroSection = () => {
  return (
    <div className="border-t border-gray-300">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Categories */}
        <div className="w-full lg:w-1/4 bg-white p-4 border-r hidden lg:block">
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Woman’s Fashion
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Men’s Fashion
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Electronics
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Home & Lifestyle
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Medicine
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Sports & Outdoor
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Baby’s & Toys
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Groceries & Pets
              <span>➤</span>
            </li>
            <li className="flex justify-between items-center text-black font-medium cursor-pointer hover:text-gray-500">
              Health & Beauty
              <span>➤</span>
            </li>
          </ul>
        </div>

        {/* Main Banner */}
        <div className="w-full lg:w-3/4 relative bg-black">
          <div className="relative w-full h-80 text-white flex flex-col lg:flex-row items-center justify-between px-8">
            {/* Text Section */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold">iPhone 14 Series</h3>
              <h1 className="text-4xl font-bold mt-2">Up to 10% off Voucher</h1>
              <button className="mt-4 px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200">
                Shop Now ➤
              </button>
            </div>

            {/* Image Section */}
            <img
              src=""
              alt="iPhone 14"
              className="h-40 lg:h-80 w-auto"
            />
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
