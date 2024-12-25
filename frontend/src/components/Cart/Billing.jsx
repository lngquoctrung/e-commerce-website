import React, { useState } from "react";

const Billing = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [couponCode, setCouponCode] = useState("");
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handlePlaceOrder = () => {
    // Simulate order confirmation
    setIsOrderConfirmed(true);
  };

  const handleReturnToMain = () => {
    // Navigate back to the main page (implement routing logic if using React Router)
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isOrderConfirmed ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div>
            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="townCity" className="block text-sm font-medium">
                  Town/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="townCity"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            <div className="border p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">LCD Monitor</span>
                <span className="font-medium">$650</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">HI Gamepad</span>
                <span className="font-medium">$1100</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$1750</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>$1750</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="Bank"
                    checked={paymentMethod === "Bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 border rounded focus:ring-2 focus:ring-red-500"
                  />
                  <label htmlFor="bank" className="ml-2">
                    Bank
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="Cash on delivery"
                    checked={paymentMethod === "Cash on delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 border rounded focus:ring-2 focus:ring-red-500"
                  />
                  <label htmlFor="cod" className="ml-2">Cash on delivery</label>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        // Confirmation Popup
        <div className="text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold text-green-500 mb-4">
              Your order has been confirmed!
            </h2>
            <p className="text-gray-600 mb-4">
              We will call you to confirm the information before sending the
              goods within a day.
            </p>
            <button
              onClick={handleReturnToMain}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Return to Main Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
