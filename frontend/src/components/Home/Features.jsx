import React from 'react';

const Features = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16V8a1 1 0 011-1h11m4 5h-5V7H7v9m11-6h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0121 12.414V15a1 1 0 01-1 1h-1m-1-6h-2m1 8a2 2 0 100-4 2 2 0 000 4zm-9 2a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      ),
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12H3m6 0H6a3 3 0 00-3 3v3m6-6h6m0 0h3m-3 0a3 3 0 013 3v3m0 0H6m6-6a3 3 0 013-3h3m-6-6a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22c5.523 0 10-4.477 10-10V5.236a1 1 0 00-.447-.832l-8-5a1 1 0 00-1.106 0l-8 5A1 1 0 002 5.236V12c0 5.523 4.477 10 10 10zm-3-6l3-3m0 0l3-3m-3 3h.01"
          />
        </svg>
      ),
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ];

  return (
    <div className="bg-white py-10 px-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Icon with Circle */}
            <div className="w-16 h-16 flex justify-center items-center bg-gray-800 rounded-full shadow-md">
              {feature.icon}
            </div>
            {/* Title */}
            <h3 className="text-lg font-bold">{feature.title}</h3>
            {/* Description */}
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
