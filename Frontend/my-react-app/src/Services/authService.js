import { apiFetch } from "../api/api";

//const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://canteen-management-system-pidg.onrender.com";

// ✅ Use fetch directly for public (no-token) requests
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error.message);
    throw new Error(error.message || "Registration failed");
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // ✅ Save token for authenticated requests
    if (data.token) {
      if (data.role === "ADMIN") {
        localStorage.setItem("adminToken", data.token);
      } else {
        localStorage.setItem("token", data.token);
      }
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

// ✅ For authenticated requests, still use apiFetch
export const getProtectedData = async () => {
  const response = await apiFetch(`${BASE_URL}/some-protected-endpoint`);
  if (!response.ok) {
    throw new Error("Failed to fetch protected data");
  }
  return await response.json();
};
