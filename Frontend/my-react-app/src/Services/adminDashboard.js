import axios from "axios";
import { apiFetch } from "../api/api";

const BASE_URL = "https://canteen-management-system-pidg.onrender.com";

//const BASE_URL = "http://localhost:8080";

export async function fetchTotalUsers() {
  try {
    const response = await apiFetch(`${BASE_URL}/admin/users`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json(); // ✅ convert Response to JSON
    return data.totalUsers; // expects { totalUsers: number }
  } catch (error) {
    console.error("Error in fetchTotalUsers:", error);
    return 0;
  }
}

export async function fetchAllUsers() {
  try {
    const response = await apiFetch(`${BASE_URL}/admin/users-list`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("Users list:", data);
    return data; // expects Array<User>
  } catch (error) {
    console.error("Error in fetching users", error);
    return [];
  }
}

export async function deleteUser(id) {
  try {
    const response = await apiFetch(`${BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const fetchTotalOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/total-orders`);
  return response.data.totalOrders;
};

export const fetchTotalRevenue = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/total-revenue`);
  return response.data.totalRevenue;
};

export async function updateUser(id, userData) {
  try {
    console.log(userData);
    const response = await apiFetch(`${BASE_URL}/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const response = await apiFetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // expects Array<Order>
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return [];
  }
}

//const API_BASE_URL = "http://localhost:8085";
const API_BASE_URL = "https://order-service-yjpu.onrender.com";

// ✅ Get single order by ID
export async function getOrderById(orderId) {
  try {
    const response = await apiFetch(`${API_BASE_URL}/${orderId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error(`Error fetching order ${orderId}`, error);
    throw error;
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/orders/${orderId}/status`,
      null,
      { params: { status } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${orderId}`, error);
    throw error;
  }
};
