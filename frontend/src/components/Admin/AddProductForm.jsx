import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AddProductForm = ({ onClose, product, onSave }) => {
  const [productName, setProductName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [images, setImages] = useState(product?.images || []);
  const [colors, setColors] = useState(
    product?.colors || [{ id: Date.now(), color: "", image: null }]
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    if (images.length + validImages.length > 8) {
      alert("You can only upload up to 8 images.");
      return;
    }
    const imageUrls = validImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleColorChange = (id, field, value) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === id ? { ...color, [field]: value } : color
      )
    );
  };

  const addNewColorBox = () => {
    setColors((prev) => [...prev, { id: Date.now(), color: "", image: null }]);
  };

  const removeColorBox = (id) => {
    setColors((prev) => prev.filter((color) => color.id !== id));
  };

  const handleSave = () => {
    if (!productName || !category || !description) {
      setError("All fields are required.");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }
    setError("");
  
    // Create a new product object with required fields
    const newProduct = {
      id: product?.id || Date.now(), // Use existing id for edits, or generate a new one
      name: productName,
      productId: product?.productId || `#${Math.floor(Math.random() * 10000000)}`,
      price: "$1,000.00", // Default price for new products
      quantity: 100, // Default quantity for new products
      sale: 0, // Default sale percentage
      stock: "In stock", // Default stock status
      startDate: new Date().toLocaleDateString(), // Current date
      images,
      colors,
      category,
      description,
    };
  
    onSave(newProduct);
    onClose();
  };
  

  const handleCancel = () => {
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmCancel = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    onClose(); // Close the form
  };

  const closeConfirmation = () => {
    setShowConfirmation(false); // Close the confirmation dialog
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 lg:w-2/3 xl:w-1/2 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>

        <form
          className="overflow-y-auto"
          style={{
            maxHeight: "75vh", // Adjust height for better scrolling
          }}
        >
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Upload Images */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images (max 8)
            </label>
            <div className="flex gap-4 items-center flex-wrap">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Uploaded"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ))}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Color Selection
            </label>
            {colors.map((colorBox, index) => (
              <div key={colorBox.id} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Enter color name"
                  value={colorBox.color}
                  onChange={(e) =>
                    handleColorChange(colorBox.id, "color", e.target.value)
                  }
                  className="w-1/3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleColorChange(
                      colorBox.id,
                      "image",
                      URL.createObjectURL(e.target.files[0])
                    )
                  }
                  className="border px-4 py-2 rounded-lg"
                />
                {colorBox.image && (
                  <img
                    src={colorBox.image}
                    alt="Color"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <button
                  onClick={() => removeColorBox(colorBox.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewColorBox}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Add Color
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to cancel?
            </h2>
            <p className="text-gray-700 mb-4">
              All the entered details will be discarded.
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={closeConfirmation}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
