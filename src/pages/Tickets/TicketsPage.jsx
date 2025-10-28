import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadTickets, createTicket, updateTicket, deleteTicket } from "../../utils/storage";
import TicketForm from "../../components/Tickets/TicketForm";
import Toast from "../../components/Toast";

function StatusBadge({ status }) {
  const cls = status === "open" ? "status-open" : status === "in_progress" ? "status-in_progress" : "status-closed";
  return <span className={`status-badge ${cls}`}>{status.replace("_", " ")}</span>;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTickets(loadTickets());
  }, []);

  function handleCreate(payload) {
    try {
      const t = createTicket(payload);
      setTickets(prev => [t, ...prev]);
      setToast({ type: "success", message: "Ticket created." });
    } catch {
      setToast({ type: "error", message: "Failed to create ticket." });
    }
  }

  function handleUpdate(id, patch) {
    try {
      const updated = updateTicket(id, patch);
      setTickets(prev => prev.map(t => (t.id === id ? updated : t)));
      setEditing(null);
      setToast({ type: "success", message: "Ticket updated." });
    } catch {
      setToast({ type: "error", message: "Failed to update ticket." });
    }
  }

  function handleDelete(id) {
    if (!confirm("Delete this ticket?")) return;
    try {
      deleteTicket(id);
      setTickets(prev => prev.filter(t => t.id !== id));
      setToast({ type: "success", message: "Ticket deleted." });
    } catch {
      setToast({ type: "error", message: "Failed to delete ticket." });
    }
  }

  return (
    <div>
      <header className="site-header">
        <div className="container nav">
          <div><strong>TicketApp</strong></div>
          <div><Link to="/dashboard">Dashboard</Link></div>
        </div>
      </header>

      <main className="container" style={{padding:"32px 20px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 360px", gap:20}}>
          <section>
            <h2>Tickets</h2>
            <div className="ticket-grid" aria-live="polite">
              {tickets.length === 0 && <p>No tickets yet. Create one.</p>}
              {tickets.map(t => (
                <article key={t.id} className="ticket-card" aria-labelledby={`t-${t.id}`}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <h3 id={`t-${t.id}`} className="ticket-title">{t.title}</h3>
                    <StatusBadge status={t.status} />
                  </div>
                  <p style={{marginTop:8}}>{t.description || <span className="small-muted">No description</span>}</p>
                  <div style={{marginTop:12, display:"flex", gap:8}}>
                    <button className="btn-primary" onClick={()=>setEditing(t)}>Edit</button>
                    <button className="btn-danger" onClick={()=>handleDelete(t.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside>
            <div className="form-card">
              <h3>{editing ? "Edit ticket" : "Create ticket"}</h3>
              <TicketForm initial={editing} onCreate={handleCreate} onUpdate={handleUpdate} onCancel={()=>setEditing(null)} />
            </div>
          </aside>
        </div>
      </main>

      <footer className="site-footer"><div className="container">© TicketApp</div></footer>

      {toast && <Toast type={toast.type} message={toast.message} onClose={()=>setToast(null)} />}
    </div>
  );
}
