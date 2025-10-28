import React, { useEffect, useState } from "react";

/*
Props:
 - initial: ticket object if editing; null to create
 - onCreate(payload)
 - onUpdate(id, patch)
 - onCancel()
*/
export default function TicketForm({ initial = null, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "open");
  const [priority, setPriority] = useState(initial?.priority || "normal");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setStatus(initial?.status || "open");
    setPriority(initial?.priority || "normal");
    setErrors({});
  }, [initial]);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (title && (title.trim().length < 3 || title.trim().length > 200)) e.title = "Title must be 3-200 characters.";
    const allowed = ["open","in_progress","closed"];
    if (!allowed.includes(status)) e.status = "Invalid status.";
    if (description && description.length > 2000) e.description = "Description too long.";
    return e;
  }

  function submitHandler(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const payload = { title: title.trim(), description: description.trim(), status, priority };
    if (initial) onUpdate(initial.id, payload);
    else {
      onCreate(payload);
      setTitle(""); setDescription(""); setStatus("open"); setPriority("normal");
    }
  }

  return (
    <form onSubmit={submitHandler} noValidate>
      <div className="form-group">
        <label htmlFor="t-title">Title</label>
        <input id="t-title" value={title} onChange={e=>setTitle(e.target.value)} aria-describedby="err-title" />
        <div id="err-title" className="small-muted" role="alert">{errors.title || ""}</div>
      </div>

      <div className="form-group">
        <label htmlFor="t-desc">Description (optional)</label>
        <textarea id="t-desc" rows="5" value={description} onChange={e=>setDescription(e.target.value)} aria-describedby="err-desc" />
        <div id="err-desc" className="small-muted" role="alert">{errors.description || ""}</div>
      </div>

      <div className="form-group">
        <label htmlFor="t-status">Status</label>
        <select id="t-status" value={status} onChange={e=>setStatus(e.target.value)} aria-describedby="err-status">
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        <div id="err-status" className="small-muted" role="alert">{errors.status || ""}</div>
      </div>

      <div className="form-group">
        <label htmlFor="t-pri">Priority</label>
        <select id="t-pri" value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="low">low</option>
          <option value="normal">normal</option>
          <option value="high">high</option>
        </select>
      </div>

      <div style={{display:"flex", gap:8, marginTop:8}}>
        <button className="btn-primary" type="submit">{initial ? "Save" : "Create"}</button>
        {initial ? <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  );
}
