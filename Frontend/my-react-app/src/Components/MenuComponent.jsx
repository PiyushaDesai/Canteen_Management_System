import React, { useEffect, useState } from "react";
import {
  getAllMenuItems,
  deleteMenuItemById,
} from "../Services/menuItemService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash,
  Plus,
  User,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getAllMenuItems();
        console.log("Menu API Response:", response);
        setMenuItems(response);
      } catch (err) {
        console.error("Failed to fetch menu items", err);
        setError("Unable to fetch menu items.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      console.log("user id", id);
      await deleteMenuItemById(id);
      toast.success("Item deleted successfully");

      // Refresh menu after deletion
      const updatedItems = await getAllMenuItems();

      setMenuItems(updatedItems);
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div>
      {/* Add Button */}
      <div className="d-flex justify-content-end mb-3">
        <Link
          to="/admin-AddMenuItem"
          className="btn btn-warning d-flex align-items-center gap-2"
        >
          <Plus size={16} />
          Add Menu Item
        </Link>
      </div>
      <div className="row g-4">
        {menuItems.map((item, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                {/* Header: Name + Icons */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0">{item.name}</h5>
                  <div>
                    <Edit
                      size={16}
                      className="me-2 text-muted"
                      role="button"
                      onClick={() => navigate(`/admin-editMenuItem/${item.id}`)}
                    />
                    <Trash
                      size={16}
                      className="text-danger"
                      role="button"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted small mb-3">{item.description}</p>

                {/* Footer: Price + Availability */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                  <span className="fw-semibold text-primary">
                    ₹{item.price}
                  </span>
                  <span
                    className={`badge ${
                      item.available ? "bg-success text-light" : "bg-secondary"
                    }`}
                  >
                    {item.available ? "Available" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
