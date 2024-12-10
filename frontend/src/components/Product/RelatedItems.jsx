import React from "react";

const RelatedItems = () => {
  const products = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      originalPrice: "$160",
      discount: "-40%",
      rating: 4,
      reviews: 88,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: "$960",
      originalPrice: "$1160",
      discount: "-35%",
      rating: 3.5,
      reviews: 75,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      originalPrice: "$400",
      discount: "-30%",
      rating: 5,
      reviews: 99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "RGB Liquid CPU Cooler",
      price: "$160",
      originalPrice: "$170",
      discount: "-30%",
      rating: 4.5,
      reviews: 65,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6">
        <span className="text-red-500">Related Item</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white text-black px-4 py-2 text-sm font-bold rounded shadow hover:bg-gray-200">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-bold">{product.price}</span>
                <span className="line-through text-gray-500 text-sm">
                  {product.originalPrice}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                    <span key={i}>&#9733;</span>
                  ))}
                  {product.rating % 1 !== 0 && <span>&#9734;</span>}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
