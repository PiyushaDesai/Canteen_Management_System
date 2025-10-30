export const apiFetch = async (url, options = {}) => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("adminToken");

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  // Only add token if not calling login
  if (token && !url.endsWith("/login")) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
