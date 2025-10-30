import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemById, updateMenuItem } from "../Services/menuItemService";
import { toast } from "react-toastify";
import "../styles/AddMenuItem.css"; // Reuse same styles

const EditMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getMenuItemById(id);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          available: data.available ?? true,
        });
      } catch (error) {
        toast.error("Failed to load item data");
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMenuItem(id, {
        ...formData,
        price: parseFloat(formData.price),
      });
      toast.success("Item updated successfully");
      navigate("/admin-Dashboard");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 rounded bg-white shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h4 className="text-center mb-3 text-orange fw-bold">Edit Menu Item</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
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
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
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

          <div className="d-grid">
            <button type="submit" className="btn btn-warning text-white">
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItem;
