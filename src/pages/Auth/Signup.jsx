import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupMock } from "../../utils/auth";
import Toast from "../../components/Toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  function validate(){
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    if (!password) e.password = "Password is required.";
    if (password && password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function onSubmit(ev){
    ev.preventDefault();
    setErrors({});
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setToast({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }
    try {
      await signupMock(email.trim(), password);
      setToast({ type: "success", message: "Account created — redirecting..." });
      setTimeout(()=> navigate("/dashboard"), 700);
    } catch (err) {
      setToast({ type: "error", message: "Failed to create account." });
    }
  }

  return (
    <div>
      <header className="site-header">
        <div className="container nav"><div>TicketApp</div><div><Link to="/">Home</Link></div></div>
      </header>

      <main className="container" style={{padding: "40px 20px"}}>
        <div style={{maxWidth:640, margin:"0 auto"}}>
          <div className="form-card" role="region" aria-labelledby="signup-heading">
            <h2 id="signup-heading">Create account</h2>
            <form onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} aria-describedby="err-email"/>
                <div id="err-email" className="small-muted" role="alert">{errors.email || ""}</div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} aria-describedby="err-pass"/>
                <div id="err-pass" className="small-muted" role="alert">{errors.password || ""}</div>
              </div>

              <div style={{display:"flex", gap:12, alignItems:"center"}}>
                <button className="btn-primary" type="submit">Sign up</button>
                <Link to="/auth/login">Have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="site-footer"><div className="container">© TicketApp</div></footer>

      {toast && <Toast type={toast.type} message={toast.message} onClose={()=>setToast(null)} />}
    </div>
  );
}
