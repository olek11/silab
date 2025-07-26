import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🧠 Jika kamu sudah hapus `assets/theme`, ganti dengan theme basic
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme(); // default theme MUI

// 🔐 Hapus jika `context` sudah tidak digunakan
// import { AuthProvider } from "./context/AuthContext";
// import { MaterialUIControllerProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* Jika context tidak digunakan, panggil App langsung */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
