import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

// ✅ Import ikon langsung dari MUI
import DashboardIcon from "@mui/icons-material/Dashboard";
import HandymanIcon from "@mui/icons-material/Handyman";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import "./SidebarMenu.css";

const menu = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    path: "/admin/admindashboard",
  },
  {
    icon: <HandymanIcon />,
    label: "Kelola Alat",
    path: "/admin/tools",
  },
  {
    icon: <SyncAltIcon />,
    label: "Import & Export",
    path: "/admin/import-export",
  },
  {
    icon: <AdminPanelSettingsIcon />,
    label: "Kelola Pengguna",
    path: "/admin/users",
  },
];

function SidebarMenu({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");

  if (isMobile) {
    return (
      <Drawer anchor="left" open={open} onClose={onClose} sx={{ width: 240 }}>
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="brand">🧪 LabApp</span>
      </div>
      <ul className="sidebar-menu mt-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `menu-link ${isActive ? "active" : ""}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}

export default SidebarMenu;
