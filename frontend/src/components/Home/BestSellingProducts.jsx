import React from 'react';

const BestSellingProducts = () => {
  const products = [
    {
      name: 'The north coat',
      price: 260,
      originalPrice: 360,
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Gucci duffle bag',
      price: 960,
      originalPrice: 1160,
      rating: 5,
      reviews: 65,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'RGB liquid CPU Cooler',
      price: 160,
      originalPrice: 170,
      rating: 4,
      reviews: 65,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Small BookSelf',
      price: 360,
      originalPrice: null,
      rating: 4.8,
      reviews: 65,
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="bg-white py-8 px-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-2 h-8 bg-red-500 rounded-sm mr-4"></div>
            <h2 className="text-lg text-red-500 font-medium">This Month</h2>
          </div>
          <h1 className="text-3xl font-bold">Best Selling Products</h1>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          View All
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center shadow hover:shadow-lg transition"
          >
            <a href='/detail'>
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-4"
            />
            <h2 className="font-bold text-lg text-center mb-2">{product.name}</h2>
            </a>
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold text-lg">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? '' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.164L12 18.897l-7.334 3.863 1.4-8.164-5.934-5.787 8.2-1.191z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
