import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [userEmail, setUserEmail] = useState(""); // Track logged-in user's email
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility

    const handleLoginSuccess = (email) => {
        setIsLoggedIn(true); // Set login state to true
        setUserEmail(email); // Set the logged-in user's email
        setIsAuthModalOpen(false); // Close the modal
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Reset login state
        setUserEmail(""); // Clear user email
        setIsDropdownOpen(false); // Close dropdown
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                {/* Logo */}
                <div className="text-xl font-bold">Exclusive</div>

                {/* Links */}
                <ul
                    className={`${
                        isMobileMenuOpen ? "block" : "hidden"
                    } md:flex md:space-x-6 text-sm font-medium`}
                >
                    <li className="hover:underline">
                        <Link
                            to="/"
                            className="text-black"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="hover:underline">
                        <Link
                            to="/shopnow"
                            className="text-black"
                        >
                            Shop Now
                        </Link>
                    </li>
                    <li className="hover:underline">
                        <Link
                            to="#"
                            className="text-black"
                        >
                            About
                        </Link>
                    </li>
                    {!isLoggedIn && (
                        <li className="hover:underline">
                            <button
                                className="text-black"
                                onClick={() => setIsAuthModalOpen(true)}
                            >
                                Sign Up
                            </button>
                        </li>
                    )}
                </ul>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        className="text-gray-500 hover:text-gray-700"
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
                </div>

                {/* Search and Icons */}
                <div className="flex items-center space-x-4">
                    {/* Search Box */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="w-64 px-4 py-2 text-sm border rounded-full shadow-inner focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="8"
                                />
                                <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Favorite Icon */}
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
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <a href="/cart">
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
                    </a>

                    {/* Profile Icon (Visible after login) */}
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
                                            <Link to="/profile">
                                                Manage My Account
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100">
                                            My Order
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100">
                                            My Reviews
                                        </li>
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

            {/* Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
};

export default Navbar;
