import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Kristin Watson",
      orderId: "#7712309",
      price: "$1,452.500",
      quantity: 1638,
      payment: 20,
      status: "Success",
    },
    {
      id: 2,
      product: "Kristin Watson",
      orderId: "#7712310",
      price: "$1,452.500",
      quantity: 1638,
      payment: 20,
      status: "Pending",
    },
    // Add more sample orders here...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orders/details`, { state: { orderId } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Orders</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Export all orders
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full hidden md:table text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Payment</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Tracking</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={order.product}
                    className="w-10 h-10 rounded"
                  />
                  {order.product}
                </td>
                <td className="py-3 px-6">{order.orderId}</td>
                <td className="py-3 px-6">{order.price}</td>
                <td className="py-3 px-6">{order.quantity}</td>
                <td className="py-3 px-6">{order.payment}</td>
                <td
                  className={`py-3 px-6 ${
                    order.status === "Success"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-gray-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-3 px-6 text-blue-600">Tracking</td>
                <td className="py-3 px-6 flex gap-2 justify-center">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleViewOrder(order.orderId)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="border-b py-4 px-4 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <span className="font-bold">{order.product}</span>
                <span>{order.price}</span>
              </div>
              <div className="text-sm text-gray-500">
                Order ID: {order.orderId}
              </div>
              <div className="text-sm text-gray-500">
                Quantity: {order.quantity}
              </div>
              <div
                className={`text-sm ${
                  order.status === "Success"
                    ? "text-green-500"
                    : order.status === "Pending"
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => handleViewOrder(order.orderId)}
                >
                  View
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {itemsPerPage} of {filteredOrders.length} entries
        </span>
        <div className="flex gap-2">
          {Array.from(
            { length: Math.ceil(filteredOrders.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
