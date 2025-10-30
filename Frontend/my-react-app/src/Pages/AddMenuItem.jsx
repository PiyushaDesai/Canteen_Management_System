import React, { useState } from "react";
import "../styles/AddMenuItem.css";
import { addMenuItem } from "../Services/addMenuItemService";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-toastify";

const AddMenuItem = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    available: true,
    isSpecial: false,
    itemType: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.itemType
    ) {
      return toast.error("Please fill in all required fields.");
    }

    await addMenuItem(formData, () => {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        available: true,
        isSpecial: false,
        itemType: "",
      });
      setImagePreview(null);

      if (onAdd) onAdd();
    });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 rounded bg-white shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <Link
          to="/admin-dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeftIcon style={{ height: "20px", marginRight: "8px" }} />
          <strong>Back to Home</strong>
        </Link>
        <h4 className="text-center mb-3 text-warning fw-bold">
          Add New Menu Item
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Short description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>

              <option value="Breakfast">Breakfast</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
              <option value="Today's Menu">Today's Menu</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview position-relative">
                <img src={imagePreview} alt="Preview" className="w-100 h-100" />
                <button
                  type="button"
                  className="btn-close remove-image-btn"
                  aria-label="Remove"
                  onClick={handleRemoveImage}
                ></button>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label d-block">Type</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="itemType"
                value="veg"
                id="veg"
                checked={formData.itemType === "veg"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="veg">
                Veg
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="itemType"
                value="nonveg"
                id="nonveg"
                checked={formData.itemType === "nonveg"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="nonveg">
                Non-Veg
              </label>
            </div>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="available"
              className="form-check-input"
              id="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="available">
              Available
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="isSpecial"
              className="form-check-input"
              id="isSpecial"
              checked={formData.isSpecial}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isSpecial">
              Special Item
            </label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning text-white">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;
