import { toast } from "react-toastify";
import { apiFetch } from "../api/api";

// const BASE_URL =
//   "https://canteen-management-system-pidg.onrender.com/MenuItems";
const BASE_URL = "http://localhost:8080/MenuItems";

export const addMenuItem = async (formData, onSuccess) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("category", formData.category);
  data.append("available", formData.available.toString());
  data.append("isSpecial", formData.isSpecial.toString());
  data.append("itemType", formData.itemType.toString());

  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    const adminToken = localStorage.getItem("adminToken"); // ✅ Include admin token
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`, // ✅ Send token for backend authentication
      },
      body: data,
    });

    if (!response.ok) throw new Error("Upload failed");

    await response.json();
    toast.success("Item added successfully!");
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Error adding menu item:", err);
    toast.error("Failed to add item");
  }
};
