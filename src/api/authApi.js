import axios from "axios";

// ✅ Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // 🔥 Debug (remove in production)
    console.log("BASE URL:", config.baseURL);
    console.log("TOKEN:", token);
    console.log("USER ID:", userId);

    // ✅ Attach JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Attach userId (needed for your backend)
    if (userId) {
      config.headers["userId"] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response || error.message);

    // 🔥 Handle Unauthorized
    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      window.location.href = "/login";
    }

    // 🔥 Handle Bad Request (400)
    if (error.response?.status === 400) {
      console.warn("Bad Request:", error.response.data);
    }

    // 🔥 Handle Forbidden (403)
    if (error.response?.status === 403) {
      console.warn("Access Denied");
    }

    // 🔥 Handle Server Error (500)
    if (error.response?.status === 500) {
      console.error("Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;