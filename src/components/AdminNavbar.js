import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";

function AdminNavbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = user?.name?.[0]?.toUpperCase() || "A";

  return (
    <nav className="navbar fixed-top navbar-dark bg-gradient-dark px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-light d-md-none"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
        <span className="navbar-brand fw-bold">🧪 Lab Dashboard</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="text-light d-none d-md-block">
          👋 Hi, <strong>{user?.name || "Admin"}</strong>
        </span>
        <Tooltip title="Logout">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </Tooltip>
        <Avatar sx={{ bgcolor: "#ffffff1a", fontSize: "0.9rem" }}>
          {initials}
        </Avatar>
      </div>
    </nav>
  );
}

export default AdminNavbar;
