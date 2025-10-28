const TKEY = "ticketapp_tickets";
const ALLOWED_STATUS = ["open", "in_progress", "closed"];

export function loadTickets() {
  const raw = localStorage.getItem(TKEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTickets(list) {
  localStorage.setItem(TKEY, JSON.stringify(list));
}

function validateTicket(ticket) {
  if (!ticket.title?.trim()) throw new Error("Title is required.");
  if (!ticket.status) throw new Error("Status is required.");
  if (!ALLOWED_STATUS.includes(ticket.status))
    throw new Error("Status must be one of: open, in_progress, closed.");
  if (ticket.description && ticket.description.length > 300)
    throw new Error("Description cannot exceed 300 characters.");
  if (ticket.priority && !["low", "normal", "high"].includes(ticket.priority))
    throw new Error("Priority must be low, normal, or high.");
}

export function createTicket(ticket) {
  if (!ALLOWED_STATUS.includes(ticket.status)) throw new Error("Invalid status");

  validateTicket(ticket);
  const list = loadTickets();
  const newTicket = {
    id: Date.now().toString(),
    title: ticket.title.trim(),
    description: ticket.description?.trim() || "",
    status: ticket.status,
    priority: ticket.priority || "normal",
    createdAt: new Date().toISOString(),
  };
  list.unshift(newTicket);
  saveTickets(list);
  return newTicket;
}

export function updateTicket(id, patch) {
  if (patch.status && !ALLOWED_STATUS.includes(patch.status))
    throw new Error("Invalid status");

  const list = loadTickets();
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found.");
  const updatedTicket = { ...list[idx], ...patch };
  validateTicket(updatedTicket);
  list[idx] = updatedTicket;
  saveTickets(list);
  return updatedTicket;
}

export function deleteTicket(id) {
  let list = loadTickets();
  list = list.filter((t) => t.id !== id);
  saveTickets(list);
  return list;
}
