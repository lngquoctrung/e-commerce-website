import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 text-lg font-medium">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shopnow" onClick={() => setIsMobileMenuOpen(false)}>
                Shop Now
              </Link>
            </li>
            <li>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </a>
            </li>
            {!isLoggedIn && (
              <li>
                <button onClick={() => setIsAuthModalOpen(true)}>Sign Up</button>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shopnow">Shop Now</Link>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          {!isLoggedIn && (
            <li>
              <button onClick={() => setIsAuthModalOpen(true)}>Sign Up</button>
            </li>
          )}
        </ul>

        {/* Right-Side Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6h15l-1.5 9H8l1.5-9zM6 6H4M9 22a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </button>
          </Link>

          {/* Profile Icon */}
          {isLoggedIn && (
            <div className="relative">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A11.963 11.963 0 0112 15c2.5 0 4.847.776 6.879 2.092M9 12a3 3 0 110-6 3 3 0 010 6zm6 0a3 3 0 110-6 3 3 0 010 6z"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/profile">Manage My Account</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">My Orders</li>
                    <li className="px-4 py-2 hover:bg-gray-100">My Reviews</li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
