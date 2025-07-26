import axios from "axios";
import { toast } from "react-toastify";

// 🌐 Backend Laravel
// const baseURL = "http://localhost:8000/api";
// 🌐 Base URL via env
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 🔧 Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: Kirim token dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const msg =
      error?.response?.data?.message || "Terjadi kesalahan tak terduga";

    // 🔒 Session kadaluarsa
    if (status === 401) {
      toast.error("🔒 Sesi kadaluarsa. Anda akan logout...");

      // 💥 Bersihkan token & user
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🧭 Redirect ke login (pastikan URL valid)
      setTimeout(() => {
        window.location.href = "/login"; // bisa disesuaikan jika pakai navigate()
      }, 1500);
    }

    // ❌ Server error
    else if (status >= 500) {
      toast.error("❌ Server error. Coba beberapa saat lagi.");
    }

    // ⚠️ Client-side error (misalnya 400, 403)
    else {
      toast.error(`⚠️ ${msg}`);
    }

    return Promise.reject(error);
  }
);

export default api;
