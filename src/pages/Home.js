import { useEffect, useState } from "react";
import LandingLayout from "../components/layouts/LandingLayout";
import api from "../api";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Beranda - Sistem Laboratorium");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/tools")
      .then((res) => setTools(res.data))
      .catch((err) => {
        console.error("Gagal ambil data tools:", err);
        setTools([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LandingLayout>
      {/* HERO SECTION */}
      <section
        className="hero-section text-center text-white"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/hero.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "contain",
        }}
      >
        <div className="hero-overlay py-5">
          <h1 className="display-4 fw-bold">🚀 Sistem Laboratorium Digital</h1>
          <p className="lead mt-3">
            Kelola alat, ruangan, bahan, dan peminjaman secara efisien & modern.
          </p>
          <a href="/login" className="btn btn-light btn-lg mt-4">
            Mulai Sekarang
          </a>
        </div>
      </section>

      {/* INFO GRID */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h5>Manajemen Alat</h5>
            <p>Peminjaman, stok, dan pencatatan alat laboratorium.</p>
          </div>
          <div className="col-md-4">
            <h5>Ruangan & Jadwal</h5>
            <p>Booking ruangan dengan validasi dan histori pemakaian.</p>
          </div>
          <div className="col-md-4">
            <h5>Akses Role-Based</h5>
            <p>Dashboard berbeda untuk pengguna dan admin.</p>
          </div>
        </div>
      </section>

      {/* TOOLS LIST */}
      <section className="container pb-5">
        <h4 className="mb-3">📦 Daftar Alat Tersedia</h4>
        {loading ? (
          <div className="text-center py-4">⏳ Memuat data alat...</div>
        ) : tools.length === 0 ? (
          <div className="text-center text-muted">
            Belum ada data alat tersedia.
          </div>
        ) : (
          <ul className="list-group">
            {tools.map((tool) => (
              <li
                key={tool.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tool.name}
                <span className="badge bg-success">{tool.stock} tersedia</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </LandingLayout>
  );
}

export default Home;
