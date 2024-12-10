import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate(); // For navigation
  const [currentStage, setCurrentStage] = useState(0); // Track current order process stage
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Toggle cancel modal
  const [cancelReason, setCancelReason] = useState(""); // Selected cancel reason

  const stages = [
    "Receiving Order",
    "Order Processing",
    "Being Delivered",
    "Delivered",
  ];

  const progressBarWidth = `${(currentStage / (stages.length - 1)) * 100}%`;

  const handleNextStage = () => {
    setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
  };

  const handleCancelOrder = () => {
    console.log("Cancel Reason:", cancelReason);
    setIsCancelModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>

      {/* Order Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold">Pouch Pocket Hoodie Orange</h2>
                <p>Order ID: #192847</p>
                <p>Brand: 20 Nov 2023</p>
                <p>Order Placed: 20 Nov 2023</p>
                <p>Quantity: 1</p>
              </div>
            </div>
          </div>

          {/* Track Order Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Order Process</h3>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full bg-gray-300 h-1" />
              <div
                className="absolute top-1/2 left-0 bg-blue-600 h-1"
                style={{ width: progressBarWidth }}
              />
              <div className="flex justify-between">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      index <= currentStage ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= currentStage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {index <= currentStage ? "✔" : index + 1}
                    </div>
                    <p className="text-sm mt-2">{stage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleNextStage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next Stage
            </button>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Cancel Order
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded shadow-md p-6">
          <h2 className="font-bold">Summary</h2>
          <p>Order ID: #192847</p>
          <p>Date: 20 Nov 2023</p>
          <p className="text-red-500">Total: $948.5</p>
          <h3 className="font-bold mt-4">Shipping Address</h3>
          <p>3517 W. Gray St. Utica, Pennsylvania 57867</p>
          <h3 className="font-bold mt-4">Payment Method</h3>
          <p>Cash on Delivery (COD)</p>
          <h3 className="font-bold mt-4">Expected Delivery</h3>
          <p>20 Nov 2023</p>
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Cancel Order</h2>
            <p className="mb-4">Please select a reason for cancellation:</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="">Select a reason</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Weather Issues">Weather Issues</option>
              <option value="Customer Changed Mind">
                Customer Changed Mind
              </option>
              <option value="Other">Other</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={!cancelReason}
                className={`px-4 py-2 rounded-lg ${
                  cancelReason
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
