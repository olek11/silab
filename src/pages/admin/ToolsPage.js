import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

function ToolsPage() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api.get("/tools").then((res) => setTools(res.data));
  }, []);

  return (
    <AdminLayout>
      <h4 className="fw-bold mb-4">Kelola Alat</h4>

      {tools.length === 0 ? (
        <p className="text-muted">Belum ada data alat tersedia.</p>
      ) : (
        <ul className="list-group">
          {tools.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{t.name}</span>
              <span className="badge bg-info text-dark">Stok: {t.stock}</span>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}

export default ToolsPage;
