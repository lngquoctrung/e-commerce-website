import React, { useState } from 'react';

const SignUpModal = ({ isOpen, onClose }) => {
  const [formFilled, setFormFilled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    setFormFilled(e.target.value.trim() !== "");
  };

  const handleClose = () => {
    if (formFilled) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const confirmClose = (confirm) => {
    if (confirm) {
      setShowConfirmation(false);
      onClose();
    } else {
      setShowConfirmation(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full flex overflow-hidden">
        {/* Left Section (Form) */}
        <div className="w-1/2 p-10">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Logo Here</h1>
          <p className="text-gray-500 mb-6">Welcome back !!!</p>
          <h2 className="text-3xl font-extrabold mb-8">Sign in</h2>
          <form>
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
              />
              <a href="#" className="text-sm text-red-500 hover:underline float-right mt-2">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
            >
              Sign In →
            </button>
          </form>
          <p className="mt-4 text-center text-gray-500 text-sm">
            I dont have an account?{' '}
            <a href="#" className="text-red-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Section (Illustration) */}
        <div className="w-1/2 bg-red-50 flex items-center justify-center">
          <img
            src="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg" // Replace with your illustration path
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center mb-4">Are you sure you want to close the form?</p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => confirmClose(true)}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => confirmClose(false)}
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

export default SignUpModal;
