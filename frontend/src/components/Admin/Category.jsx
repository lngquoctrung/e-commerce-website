import React, { useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Dried food", quantity: 1638, sale: 20, startDate: "20 Nov 2023", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Wet food", quantity: 1638, sale: 20, startDate: "20 Nov 2023", image: "https://via.placeholder.com/50" },
    { id: 3, name: "Supplemental food", quantity: 1638, sale: 20, startDate: "20 Nov 2023", image: "https://via.placeholder.com/50" },
    { id: 4, name: "Puppy food", quantity: 1638, sale: 20, startDate: "20 Nov 2023", image: "https://via.placeholder.com/50" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCategory((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSaveNewCategory = () => {
    if (newCategory.name && newCategory.image) {
      const newEntry = {
        id: categories.length + 1,
        name: newCategory.name,
        icon: "fas fa-box", // Default icon
        quantity: 0,
        sale: 0,
        startDate: new Date().toLocaleDateString("en-GB"), // Current date
        image: newCategory.image,
      };
      setCategories((prev) => [...prev, newEntry]);
      setNewCategory({ name: "", image: null });
      setIsAddNewOpen(false);
    } else {
      alert("Please fill in all fields and select an image.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Add Attribute</h1>
        <button
          onClick={() => setIsAddNewOpen(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Sale</th>
                <th className="py-3 px-6 text-left">Start Date</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {paginatedCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left flex items-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <span>{category.name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">{category.quantity}</td>
                  <td className="py-3 px-6 text-left">{category.sale}</td>
                  <td className="py-3 px-6 text-left">{category.startDate}</td>
                  <td className="py-3 px-6 text-center flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-3 border-t gap-4">
          <span className="text-sm text-gray-600">
            Showing {itemsPerPage} of {categories.length} entries
          </span>
          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.ceil(categories.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Add New Category Modal */}
      {isAddNewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
                {newCategory.image && (
                  <img
                    src={newCategory.image}
                    alt="Preview"
                    className="mt-4 w-20 h-20 rounded-lg object-cover"
                  />
                )}
              </div>
            </form>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsAddNewOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
