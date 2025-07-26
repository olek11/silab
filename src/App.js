import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/AuthGuard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardUser from "./pages/Dashboard";
import BookingForm from "./pages/BookingForm";

import DashboardAdmin from "./pages/admin/AdminDashboard";
import ToolsPage from "./pages/admin/ToolsPage";
import ImportExportPage from "./pages/admin/ImportExportPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import ImportUserExcel from "./pages/admin/ImportUserExcel";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 👥 User-only routes */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard role="user">
                <DashboardUser />
              </AuthGuard>
            }
          />

          <Route
            path="/booking"
            element={
              <AuthGuard role="user">
                <BookingForm />
              </AuthGuard>
            }
          />

          {/* 🛂 Admin-only routes */}
          <Route
            path="/admin/admindashboard"
            element={
              <AuthGuard role="admin">
                <DashboardAdmin />
              </AuthGuard>
            }
          />

          <Route
            path="/admin/tools"
            element={
              <AuthGuard role="admin">
                <ToolsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/import-export"
            element={
              <AuthGuard role="admin">
                <ImportExportPage />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AuthGuard role="admin">
                <AdminUserPage />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/import-users"
            element={
              <AuthGuard role="admin">
                <ImportUserExcel />
              </AuthGuard>
            }
          />

          {/* 🔁 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
