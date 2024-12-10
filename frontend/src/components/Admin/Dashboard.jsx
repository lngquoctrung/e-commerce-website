import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total users", value: "89,935", change: "+1.01%", status: "up" },
    { title: "Total products", value: "23,283.5", change: "+0.49%", status: "up" },
    { title: "Active users", value: "46,827", change: "-0.91%", status: "down" },
    { title: "Refunded", value: "124,854", change: "+1.51%", status: "up" },
  ];

  const orders = [
    { id: "#12594", date: "Dec 1, 2021", customer: "Frank Murlo", location: "312 S Wilmette Ave", amount: "$847.69", status: "New Order" },
    { id: "#12490", date: "Nov 15, 2021", customer: "Thomas Bleir", location: "Lathrop Ave, Harvey", amount: "$477.14", status: "On Delivery" },
    { id: "#12306", date: "Nov 02, 2021", customer: "Bill Norton", location: "5685 Bruce Ave, Portage", amount: "$477.14", status: "On Delivery" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Marci</h1>
        <p className="text-gray-500">Here is the information about all your orders</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
            <span
              className={`text-sm ${
                stat.status === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Analytics and Earnings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Orders Analytics</h3>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Earnings</h3>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
            Earnings Chart Placeholder
          </div>
        </div>
      </div>

      {/* Order List Section */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Order List</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="border-b p-2 text-gray-600">No</th>
              <th className="border-b p-2 text-gray-600">ID</th>
              <th className="border-b p-2 text-gray-600">Date</th>
              <th className="border-b p-2 text-gray-600">Customer</th>
              <th className="border-b p-2 text-gray-600">Location</th>
              <th className="border-b p-2 text-gray-600">Amount</th>
              <th className="border-b p-2 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.location}</td>
                <td className="p-2">{order.amount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "New Order"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
