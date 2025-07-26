import Navbar from "../landing/Navbar";
import "../../styles/LandingLayout.css";

function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="content-area-landing">{children}</main>
      <footer className="footer-landing">
        <small>
          © {new Date().getFullYear()} LabApp — Sistem Laboratorium Modern
        </small>
      </footer>
    </>
  );
}

export default LandingLayout;
