// src/services/menuItemService.js
import axios from "axios";
import { apiFetch } from "../api/api";

const BASE_URL =
  "https://canteen-management-system-pidg.onrender.com/MenuItems";

//const BASE_URL = "http://localhost:8080/MenuItems";

export const getAllMenuItems = async () => {
  try {
    const response = await apiFetch(`${BASE_URL}/getItems`);
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    throw error;
  }
};

// 2. DELETE menu item by ID
export const deleteMenuItemById = async (id) => {
  try {
    const response = await apiFetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete menu item:", error);
    throw error;
  }
};

// 3. UPDATE menu item by ID
export const updateMenuItem = async (id, updatedData) => {
  try {
    const response = await apiFetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" }, // merged with token in apiFetch
    });

    if (!response.ok) {
      const errMsg = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errMsg}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update menu item:", error);
    throw error;
  }
};

// 4. GET menu item by ID
export const getMenuItemById = async (id) => {
  try {
    const response = await apiFetch(`${BASE_URL}/get/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch menu item with id ${id}:`, error);
    throw error;
  }
};
