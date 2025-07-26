import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ Tunggu sampai AuthContext selesai load
  if (loading) return null;

  // 🛑 Jika belum login atau data user invalid
  if (!user || !user.roles || user.roles.length === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔍 Ambil dan normalisasi role user
  const rawRole = user.roles;
  const userRole = Array.isArray(rawRole)
    ? rawRole[0]?.toLowerCase()
    : typeof rawRole === "string"
    ? rawRole.toLowerCase()
    : "";

  const requiredRole = role?.toLowerCase();

  // 🚫 Role tidak sesuai → redirect fallback berdasarkan role yang diminta
  if (requiredRole && userRole !== requiredRole) {
    const fallback =
      requiredRole === "admin" ? "/admin/admindashboard" : "/dashboard";
    return <Navigate to={fallback} replace />;
  }

  // ✅ Role valid dan sudah login
  return children;
};

export default AuthGuard;
