import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarMenu from "./SidebarMenu";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="wrapper">
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="content-area">{children}</main>
    </div>
  );
}

export default AdminLayout;
