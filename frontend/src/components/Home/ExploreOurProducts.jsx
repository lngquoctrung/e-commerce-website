import React from 'react';

const ExploreOurProducts = () => {
  const products = [
    {
      name: 'Breed Dry Dog Food',
      price: 100,
      rating: 3.5,
      reviews: 35,
      image: 'https://via.placeholder.com/150',
      tag: 'NEW',
    },
    {
      name: 'CANON EOS DSLR Camera',
      price: 360,
      rating: 5,
      reviews: 95,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'ASUS FHD Gaming Laptop',
      price: 700,
      rating: 4.8,
      reviews: 325,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Curology Product Set',
      price: 500,
      rating: 4.2,
      reviews: 145,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Kids Electric Car',
      price: 960,
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/150',
      tag: 'NEW',
    },
    {
      name: 'Jr. Zoom Soccer Cleats',
      price: 1160,
      rating: 3.5,
      reviews: 35,
      image: 'https://via.placeholder.com/150',
      tag: 'NEW',
    },
    {
      name: 'GP1 Shooter USB Gamepad',
      price: 660,
      rating: 4.5,
      reviews: 55,
      image: 'https://via.placeholder.com/150',
      tag: 'NEW',
    },
    {
      name: 'Quilted Satin Jacket',
      price: 660,
      rating: 4.5,
      reviews: 55,
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="bg-white py-8 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-2 h-8 bg-red-500 rounded-sm mr-4"></div>
            <h2 className="text-lg text-red-500 font-medium">Our Products</h2>
          </div>
          <h1 className="text-3xl font-bold">Explore Our Products</h1>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        <a href='/shopnow'>
          View All Products
        </a>
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Product Image */}
            <div className="relative group w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-t-md"
              />
              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              {/* Add to Cart Button */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-black bg-opacity-75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white w-full text-center p-4 rounded-b-md shadow">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <div className="flex items-center justify-center mb-2">
                <span className="text-red-500 font-bold text-lg">${product.price}</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.164L12 18.897l-7.334 3.863 1.4-8.164-5.934-5.787 8.2-1.191z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreOurProducts;
