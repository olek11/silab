import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

function ImportUserExcel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) return toast.error("⚠️ Pilih file Excel terlebih dahulu");

    // Validasi tipe file
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.type)) {
      return toast.error(
        "❌ File tidak valid. Gunakan Excel (.xlsx atau .xls)"
      );
    }

    // Siapkan FormData
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await api.post("/users/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Tampilkan toast sukses jika berhasil
      toast.success(res.data?.message || "✅ Import pengguna berhasil");
      setFile(null);
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Gagal impor data pengguna";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <h4 className="mb-4 fw-bold">⬆️ Impor Data Pengguna dari Excel</h4>

      {/* Input file */}
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <small className="text-success">
            📎 File dipilih: <strong>{file.name}</strong>
          </small>
        )}
      </div>

      {/* Tombol aksi */}
      <div className="d-flex justify-content-between align-items-center">
        <a
          href="/users_template.xlsx"
          download
          className="btn btn-outline-secondary"
        >
          📄 Unduh Template
        </a>
        <button
          className="btn btn-primary"
          onClick={handleImport}
          disabled={loading}
        >
          {loading ? "Memproses..." : "🚀 Impor Sekarang"}
        </button>
      </div>
    </div>
  );
}

export default ImportUserExcel;
