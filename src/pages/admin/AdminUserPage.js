import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";
import { toast } from "react-toastify";
import "./css/AdminUserPage.css"; // gunakan path sesuai struktur kamu

function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data); // 🔧 fix: ambil array data dari respon Laravel
    } catch {
      toast.error("Gagal ambil data pengguna");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.patch(`/users/${id}/role`, { role: newRole });
      toast.success("Role berhasil diperbarui");
      await loadUsers(); // refresh agar data sinkron
    } catch {
      toast.error("Gagal ubah role");
    }
  };

  const handleTambahUser = () => setShowModal(true);

  const handleExport = async () => {
    try {
      const res = await api.get("/users/export", { responseType: "blob" });
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.xlsx";
      a.click();
      toast.success("Data pengguna berhasil diekspor");
    } catch {
      toast.error("Gagal ekspor data");
    }
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        await api.post("/users/import", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Data pengguna berhasil diimpor");
        await loadUsers(); // Refresh setelah import
      } catch (err) {
        const msg =
          err.response?.data?.message || "❌ Gagal impor data pengguna";
        toast.error(msg);
      }
    };

    input.click(); // Trigger file picker
  };

  const handleEditUser = (user) => {
    setNewUser({
      name: user.name,
      email: user.email,
      password: "",
      role: user.roles?.[0]?.name || user.role || "user",
      id: user.id,
    });
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      toast.success("Pengguna berhasil dihapus");
      await loadUsers(); // 🔧 fix: refresh data setelah delete
    } catch {
      toast.error("Gagal menghapus pengguna");
    }
  };

  const handleSubmitTambah = async () => {
    const { name, email, password, role, id } = newUser;
    if (!name || !email || (!id && !password)) {
      toast.error("Semua field wajib diisi");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await api.patch(`/users/${id}`, { name, email });
        await api.patch(`/users/${id}/role`, { role });
        toast.success("Pengguna berhasil diperbarui");
      } else {
        await api.post("/users", { name, email, password, role });
        toast.success("Pengguna berhasil ditambahkan");
      }

      setShowModal(false);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      await loadUsers(); // 🔧 fix: refresh setelah simpan
    } catch {
      toast.error("Gagal menyimpan pengguna");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">👥 Kelola Pengguna</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleTambahUser}>
            ➕ Tambah Pengguna
          </button>
          <button className="btn btn-success" onClick={handleExport}>
            ⬇️ Export
          </button>
          <button className="btn btn-warning" onClick={handleImport}>
            ⬆️ Import
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Role Aktif</th>
              <th>Ubah Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => {
                const roleName = u.roles?.[0]?.name || u.role || "-";
                return (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          roleName === "admin" ? "bg-danger" : "bg-primary"
                        }`}
                      >
                        {roleName}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={roleName}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info me-1"
                        onClick={() => handleEditUser(u)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h5 className="mb-3 fw-bold">
              {newUser.id ? "✏️ Edit Pengguna" : "➕ Tambah Pengguna"}
            </h5>

            <div className="mb-2">
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            {!newUser.id && (
              <div className="mb-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
            )}
            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    role: "user",
                  });
                }}
                disabled={loading}
              >
                ❌ Batal
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitTambah}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "💾 Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminUserPage;
