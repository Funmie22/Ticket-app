import React, { useEffect } from "react";

export default function Toast({ type = "info", message = "", duration = 3500, onClose = () => {} }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div role="status" aria-live="polite" className="toast" style={{background: type === "error" ? "#7f1d1d" : "#111"}}>
      {message}
    </div>
  );
}
