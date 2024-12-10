import React, { useState } from "react";


const MyAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Add logic to handle saving changes
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    // Reset form or navigate away as needed
    alert("Changes canceled!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-600 text-sm">Home / My Account</h2>
        <h2 className="text-gray-600 text-sm">
          Welcome! <span className="text-red-500 font-semibold">Md Rimel</span>
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <ul className="space-y-4 text-gray-700">
            <li className="font-bold text-red-500">Manage My Account</li>
            <li className="hover:underline cursor-pointer">My Profile</li>
            <li className="hover:underline cursor-pointer">Address Book</li>
            <li className="hover:underline cursor-pointer">My Payment Options</li>
            <li className="mt-6 font-bold text-gray-700">My Orders</li>
            <li className="hover:underline cursor-pointer">My Returns</li>
            <li className="hover:underline cursor-pointer">My Cancellations</li>
            <li className="mt-6 font-bold text-gray-700">My WishList</li>
          </ul>
        </div>

        {/* Edit Profile */}
        <div className="col-span-3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-red-500 font-bold text-lg mb-4">Edit Your Profile</h2>
          <form onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
            </div>

            {/* Password Changes */}
            <h3 className="font-bold text-gray-700 mb-4">Password Changes</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
