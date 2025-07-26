import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Akun berhasil dibuat!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal daftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Konfirmasi Password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
