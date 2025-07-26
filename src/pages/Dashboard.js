import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      logout();
      toast.success("Anda berhasil logout!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      toast.error("Gagal logout!");
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  if (loading) return null;

  if (!user || !user.name) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h6" color="error" align="center">
          ⚠️ Data pengguna tidak tersedia. Silakan login ulang.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" fontWeight="bold">
          🧑‍💻 Dashboard Pengguna
        </Typography>
        <Tooltip title="Logout dari akun">
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </Button>
        </Tooltip>
      </Box>

      {/* Card User Info */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Box mb={2}>
            <Typography>
              <strong>Nama:</strong> {user.name || "-"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email || "-"}
            </Typography>
            <Typography>
              <strong>Role:</strong>{" "}
              {Array.isArray(user.roles)
                ? user.roles.join(", ")
                : user.roles || "-"}
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              📝 Ajukan Peminjaman
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anda dapat meminjam alat atau ruangan melalui tombol di bawah.
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => navigate("/booking")}
              startIcon={<AssignmentIcon />}
              sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
            >
              Ajukan Peminjaman
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box mt={6} textAlign="center" color="text.secondary">
        <small>© {new Date().getFullYear()} LabApp User Panel</small>
      </Box>
    </Container>
  );
}

export default Dashboard;
