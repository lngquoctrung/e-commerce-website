import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1, image: "https://via.placeholder.com/50" },
    { id: 2, name: "HI Gamepad", price: 550, quantity: 2, image: "https://via.placeholder.com/50" },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Home / </span>
        <span className="text-black font-medium">Cart</span>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-gray-600 font-medium">Product</th>
              <th className="py-4 px-6 text-gray-600 font-medium">Price</th>
              <th className="py-4 px-6 text-gray-600 font-medium">Quantity</th>
              <th className="py-4 px-6 text-gray-600 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 px-6 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                  <div>
                    <span>{item.name}</span>
                    <button
                      className="text-red-500 text-sm ml-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      &#10005;
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">${item.price}</td>
                <td className="py-4 px-6">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    className="border px-2 py-1 rounded"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-6">
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
          Return To Shop
        </button>
        <button className="px-4 py-2 border rounded-lg bg-gray-800 text-white">
          Update Cart
        </button>
      </div>

      {/* Coupon and Cart Total */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Coupon Section */}
        <div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder="Coupon Code"
              className="w-full border px-4 py-2 rounded-lg"
            />
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            <a href="/checkout">Proceed to checkout</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
