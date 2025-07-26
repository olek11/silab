import { useState, useEffect } from "react";
import api from "../api";

function BookingForm() {
  const [form, setForm] = useState({
    bookable_type: "tool",
    bookable_id: "",
    start_date: "",
    end_date: "",
    purpose: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = form.bookable_type === "tool" ? "/tools" : "/rooms";
    api.get(endpoint).then((res) => setItems(res.data));
  }, [form.bookable_type]);

  const submitBooking = async () => {
    try {
      await api.post("/bookings", form);
      alert("Peminjaman berhasil diajukan!");
    } catch (err) {
      alert("Gagal melakukan booking");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Form Peminjaman</h4>
      <select
        onChange={(e) => setForm({ ...form, bookable_type: e.target.value })}
      >
        <option value="tool">Alat</option>
        <option value="room">Ruangan</option>
      </select>

      <select
        onChange={(e) => setForm({ ...form, bookable_id: e.target.value })}
      >
        <option value="">-- Pilih --</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        placeholder="Mulai"
        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
      />
      <input
        type="date"
        placeholder="Selesai"
        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tujuan"
        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
      />
      <button className="btn btn-primary mt-2" onClick={submitBooking}>
        Ajukan
      </button>
    </div>
  );
}

export default BookingForm;
