import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
  const [formFilled, setFormFilled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Example accounts
  const exampleAccounts = [
    { email: 'admin@gmail.com', password: '123456', role: "admin" },
    { email: 'viphong1909@gmail.com', password: '123456', role: "user" },
  ];

  const handleInputChange = (e) => {
    setFormFilled(true);
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
    if (id === 'name') setName(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const account = exampleAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      if (account.role === "admin") {
        navigate("/admin"); // Redirect to admin page
      } else {
        onLoginSuccess(email); // Notify parent about login success
        onClose(); // Close the modal
      }
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleBack = () => {
    if (formFilled) {
      setShowConfirmation(true); // Show confirmation if the form is filled
    } else {
      setIsRegister(false); // Directly go back to login modal
    }
  };

  const confirmBack = (confirm) => {
    if (confirm) {
      setShowConfirmation(false);
      setIsRegister(false);
      setFormFilled(false); // Reset formFilled when switching back
    } else {
      setShowConfirmation(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full flex overflow-hidden">
        {/* Login Form */}
        {!isRegister && (
          <div className="w-1/2 p-10">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Logo Here</h1>
            <p className="text-gray-500 mb-6">Welcome back !!!</p>
            <h2 className="text-3xl font-extrabold mb-8">Sign in</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  value={password}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
              >
                Sign In →
              </button>
            </form>
            <p className="mt-4 text-center text-gray-500 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="text-red-500 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        )}

        {/* Register Form */}
        {isRegister && (
          <div className="w-1/2 p-10">
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              onClick={handleBack}
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-red-500 mb-2">Logo Here</h1>
            <p className="text-gray-500 mb-6">Welcome to our platform!</p>
            <h2 className="text-3xl font-extrabold mb-8">Register</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  onChange={handleInputChange}
                  value={name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
              >
                Create Account →
              </button>
            </form>
            <p className="mt-4 text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="text-red-500 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {/* Illustration */}
        <div className="w-1/2 bg-red-50 flex items-center justify-center">
          <img
            src="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center mb-4">Are you sure you want to go back?</p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => confirmBack(true)}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => confirmBack(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
