import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🚀 Buat context global
const AuthContext = createContext();

// 🛡 Provider utama
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🧠 Inisialisasi dari localStorage saat refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error("Gagal parse state:", err);
        setUser(null);
        setToken(null);
      }
    }

    setLoading(false);
  }, []);

  // ✅ Login sukses → simpan user & token
  const login = (userData, accessToken) => {
    if (!userData || !accessToken) return;

    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", accessToken);
      setUser(userData);
      setToken(accessToken);
    } catch (error) {
      console.error("Gagal simpan ke localStorage:", error);
    }
  };

  // 🔐 Logout → bersihkan semua dan redirect
  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Gagal hapus localStorage:", error);
    }

    setUser(null);
    setToken(null);
    navigate("/login"); // redirect halus
  };

  // 🔄 Update sebagian data user
  const updateUser = (newData) => {
    if (!user) return;

    const updatedUser = { ...user, ...newData };
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Gagal update user:", error);
    }
  };

  // 🧭 Value context lengkap
  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔧 Hook supaya bisa dipakai di semua komponen
export const useAuth = () => useContext(AuthContext);
