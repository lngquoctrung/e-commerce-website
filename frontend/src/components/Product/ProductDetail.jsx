import React, { useState } from "react";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Array of images
  const images = [
    "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max.png",
    "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max-2.png",
    "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max-3.png",
    "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max-4.png",
    "https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max-5.png",
  ];

  // Handle thumbnail clicks
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle next/previous navigation
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Handle quantity changes
  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Account / Gaming / </span>
        <span className="text-black font-medium">Havic HV G-92 Gamepad</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Left Section: Images */}
        <div className="w-full lg:w-1/2 relative">
          <div className="mb-4 relative">
            {/* Big Image */}
            <img
              src={images[currentImageIndex]}
              alt="Main Product"
              className="w-full rounded-lg"
            />
            {/* Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
              &#8249;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
              &#8250;
            </button>
          </div>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded-lg border cursor-pointer ${
                  currentImageIndex === index
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">Havic HV G-92 Gamepad</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-lg">
              &#9733;&#9733;&#9733;&#9733;&#9734;
            </span>
            <span className="text-gray-500 text-sm">(150 Reviews)</span>
            <span className="text-green-500 text-sm font-medium">In Stock</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-4">$192.00</div>
          <p className="text-gray-600 mb-4">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble-free install & mess-free removal.
            Pressure-sensitive.
          </p>

          {/* Colours */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Colours:</h3>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer border"></div>
              <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border"></div>
              <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer border"></div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Size:</h3>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    selectedSize === size
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-sm font-semibold">Quantity:</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border rounded-l-lg text-gray-600"
              >
                -
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-12 text-center border-y"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border rounded-r-lg text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
              Buy Now
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200">
              Add to Wishlist
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-green-500">&#10003;</span>
              <p className="text-sm text-gray-600">
                Free Delivery: Enter your postal code for delivery
                availability.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">&#10003;</span>
              <p className="text-sm text-gray-600">
                Return Delivery: Free 30 days delivery returns. Details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
