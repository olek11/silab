import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/LandingLayout.css"; // ✅ Ganti path sesuai folder kamu

function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  if (isAdminPage) return null;

  const isAdmin = user?.roles?.includes("admin");

  return (
    <nav className="landing-navbar">
      <div className="container-fluid navbar-container">
        <NavLink to="/" className="brand-logo">
          🧪 LabApp
        </NavLink>

        <input type="checkbox" id="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          ☰
        </label>

        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Beranda
          </NavLink>
          <NavLink to="/booking" className="nav-item">
            Peminjaman
          </NavLink>

          {token && (
            <>
              <NavLink to="/dashboard" className="nav-item">
                Dashboard
              </NavLink>
              {isAdmin && (
                <div className="dropdown">
                  <NavLink
                    to="#"
                    className="nav-item dropdown-toggle"
                    role="button"
                  >
                    Admin
                  </NavLink>
                  <div className="dropdown-menu">
                    <NavLink className="dropdown-item" to="/admin/tools">
                      Kelola Alat
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/import-export"
                    >
                      Impor/Ekspor
                    </NavLink>
                  </div>
                </div>
              )}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
          {!token && (
            <>
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
