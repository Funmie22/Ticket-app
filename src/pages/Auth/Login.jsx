import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginMock } from "../../utils/auth";
import Toast from "../../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("reason") === "expired") {
      setToast({ type: "error", message: "Your session has expired. Please log in again." });
      params.delete("reason");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.search, navigate, location.pathname]);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    if (!password) e.password = "Password is required.";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setErrors({});
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setToast({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }
    try {
      await loginMock(email.trim(), password);
      setToast({ type: "success", message: "Login successful — redirecting..." });
      setTimeout(() => navigate("/dashboard"), 700);
    } catch {
      setToast({ type: "error", message: "Invalid credentials." });
    }
  }

  return (
    <div>
      <header className="site-header">
        <div className="container nav">
          <div>TicketApp</div>
          <div><Link to="/">Home</Link></div>
        </div>
      </header>

      <main className="container" style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="form-card" role="region" aria-labelledby="login-heading">
            <h2 id="login-heading">Login</h2>
            <form onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="err-email" />
                <div id="err-email" className="small-muted" role="alert">{errors.email || ""}</div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} aria-describedby="err-pass" />
                <div id="err-pass" className="small-muted" role="alert">{errors.password || ""}</div>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button className="btn-primary" type="submit">Login</button>
                <Link to="/auth/signup">Create account</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">© TicketApp</div>
      </footer>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
