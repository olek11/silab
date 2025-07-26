import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Tooltip,
  Button,
  Card,
  CardContent,
  Box,
  Avatar,
} from "@mui/material";

import ConstructionIcon from "@mui/icons-material/Construction";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

function DashboardAdmin() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      logout();
      navigate("/home");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  const cards = [
    {
      title: "Kelola Alat",
      desc: "CRUD data alat laboratorium.",
      icon: <ConstructionIcon />,
      link: "/admin/tools",
      color: "primary",
    },
    {
      title: "Impor & Ekspor",
      desc: "Kelola data Excel alat & ruangan.",
      icon: <SyncAltIcon />,
      link: "/admin/import-export",
      color: "info",
    },
    {
      title: "Kelola Pengguna",
      desc: "Ubah role dan kontrol akses pengguna.",
      icon: <ManageAccountsIcon />,
      link: "/admin/users",
      color: "success",
    },
  ];

  if (loading) return null;

  if (!user || !user.name) {
    return (
      <AdminLayout>
        <Container sx={{ mt: 10 }}>
          <Typography variant="h6" color="error" align="center">
            ⚠️ Gagal memuat data pengguna. Silakan login ulang.
          </Typography>
        </Container>
      </AdminLayout>
    );
  }

  if (!user.roles?.includes("admin")) {
    return (
      <AdminLayout>
        <Container sx={{ mt: 10 }}>
          <Typography variant="h6" color="error" align="center">
            ⚠️ Akses ditolak. Hanya admin yang dapat mengakses halaman ini.
          </Typography>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Header */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          gap={2}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📊 Dashboard Admin
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Halo, <strong>{user.name}</strong> — Anda login sebagai{" "}
              <span
                style={{
                  color: "#fff",
                  background: "#dc3545",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                Admin
              </span>
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Logout dari akun">
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                <LogoutIcon sx={{ mr: 1 }} /> Keluar
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Cards */}
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {cards.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                minWidth: 260,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "#f5f7fa",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    textAlign="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: `${item.color}.main`,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: "48px" }}
                    >
                      {item.desc}
                    </Typography>
                    <Button
                      variant="contained"
                      color={item.color}
                      fullWidth
                      size="medium"
                      sx={{ textTransform: "none", fontWeight: "bold", mt: 1 }}
                      onClick={() => navigate(item.link)}
                    >
                      🚀 Buka
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box mt={6} textAlign="center" color="text.secondary">
          <small>© {new Date().getFullYear()} LabApp Admin Panel</small>
        </Box>
      </Container>
    </AdminLayout>
  );
}

export default DashboardAdmin;
