import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Exclusive Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Exclusive</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <form className="flex items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full bg-gray-800 text-white rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-red-500 p-2 rounded-r-md hover:bg-red-600 transition"
            >
              →
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Account</h3>
          <ul className="space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Link</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
