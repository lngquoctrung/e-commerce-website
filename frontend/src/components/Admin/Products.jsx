import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddProductForm from "./AddProductForm";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      productId: "#7712309",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      startDate: "28,672.36",
    },
    {
      id: 2,
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      productId: "#7712309",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      startDate: "28,672.36",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // Track product to edit
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null); // Track product to delete
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSnackbarMessage("Product deleted successfully.");
    setTimeout(() => setSnackbarMessage(""), 3000); // Clear snackbar after 3 seconds
  };

  const handleAddNewProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct },
    ]);
  };
  
  
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSnackbarMessage("Product updated successfully.");
    setTimeout(() => setSnackbarMessage(""), 3000); // Clear snackbar after 3 seconds
    setEditProduct(null);
    setIsAddProductOpen(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (product.productId?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );
  

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4 md:mb-0">Add Attribute</h1>
        <button
          onClick={() => {
            setEditProduct(null); // Reset edit mode
            setIsAddProductOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Search and Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <select
            className="p-2 border rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>entries</span>
        </div>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase leading-normal hidden md:table-header-group">
            <tr>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Product ID</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Sale</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 font-light">
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100 md:table-row flex flex-col md:flex-row mb-4 md:mb-0 bg-white md:bg-transparent rounded-md md:rounded-none"
              >
                <td className="py-3 px-6 text-left flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={product.name}
                    className="w-10 h-10 rounded mr-3"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="py-3 px-6 text-left">{product.productId}</td>
                <td className="py-3 px-6 text-left">{product.price}</td>
                <td className="py-3 px-6 text-left">{product.quantity}</td>
                <td className="py-3 px-6 text-left">{product.sale}</td>
                <td
                  className={`py-3 px-6 text-left ${
                    product.stock === "Out of stock"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {product.stock}
                </td>
                <td className="py-3 px-6 text-left">{product.startDate}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-3">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => {
                      setEditProduct(product);
                      setIsAddProductOpen(true);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setDeleteProductId(product.id);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 border-t gap-4">
        <span className="text-sm text-gray-600">
          Showing {itemsPerPage} of {filteredProducts.length} entries
        </span>
        <div className="flex items-center gap-2">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / itemsPerPage) },
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

      {/* Add/Edit Product Form */}
      {isAddProductOpen && (
        <AddProductForm
          onClose={() => setIsAddProductOpen(false)}
          onSave={editProduct ? handleUpdateProduct : handleAddNewProduct}
          product={editProduct}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => {
                  handleDelete(deleteProductId);
                  setShowDeleteConfirmation(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbarMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Products;
