import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";

export default function AppLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="site-header">
        <div className="container nav">
          <div className="brand">
            <strong>TicketApp</strong>
          </div>

          <button 
            className="hamburger" 
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </nav>
        </div>
      </header>

      <main>
        <Hero />

        <section className="features container" aria-label="features">
          <div className="card">⚡ Fast CRUD — Create, Read, Update, Delete</div>
          <div className="card">🔒 Protected routes & session simulation</div>
          <div className="card">🌍 Accessible and fully responsive</div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} TicketApp — Built with ❤️</div>
      </footer>
    </div>
  );
}
