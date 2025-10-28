import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadTickets } from "../utils/storage";
import { logout } from "../utils/auth";
import Toast from "../components/Toast";
export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const list = loadTickets();
      setTickets(list);
    } catch {
      setToast({ type: "error", message: "Failed to load tickets. Please retry." });
    }
  }, []);

  const total = useMemo(() => tickets.length, [tickets]);
  const open = useMemo(() => tickets.filter(t => t.status === "open").length, [tickets]);
  const resolved = useMemo(() => tickets.filter(t => t.status === "closed").length, [tickets]);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/auth/login");
  }

  return (
    <div>
      <header className="site-header">
        <div className="container nav">
          <div><strong>TicketApp</strong></div>

          <button 
            className="hamburger" 
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/tickets" onClick={() => setMenuOpen(false)}>Tickets</Link>
            <button onClick={handleLogout} className="btn-ghost" style={{marginLeft: 12}}>Logout</button>
          </nav>
        </div>
      </header>

      <main className="container" style={{padding:"40px 20px"}}>
        <h2>Dashboard</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginTop:16}}>
          <div className="card"><strong>Total</strong><div style={{fontSize:24, marginTop:8}}>{total}</div></div>
          <div className="card"><strong>Open</strong><div style={{fontSize:24, marginTop:8}}>{open}</div></div>
          <div className="card"><strong>Resolved</strong><div style={{fontSize:24, marginTop:8}}>{resolved}</div></div>
        </div>

        <div style={{marginTop:24}}>
          <Link to="/tickets" className="btn">Manage Tickets</Link>
        </div>
      </main>

      <footer className="site-footer"><div className="container">© TicketApp</div></footer>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
