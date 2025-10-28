const SESSION_KEY = "ticketapp_session";
const SESSION_EXP_KEY = "ticketapp_session_exp"; // new key for expiration time

export function loginMock(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const okEmails = ["test@example.com", "user@example.com"];
      if (okEmails.includes(email) && password === "password123") {
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem(SESSION_KEY, token);
        localStorage.setItem(
          SESSION_EXP_KEY,
          String(Date.now() + 24 * 3600 * 1000) // expires in 24h
        );
        resolve({ token });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 400);
  });
}

export function signupMock(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = btoa(`${email}:${Date.now()}`);
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(
        SESSION_EXP_KEY,
        String(Date.now() + 24 * 3600 * 1000) // also expires in 24h
      );
      resolve({ token });
    }, 400);
  });
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EXP_KEY);
}

export function isAuthenticated() {
  const token = localStorage.getItem(SESSION_KEY);
  const exp = Number(localStorage.getItem(SESSION_EXP_KEY) || 0);
  if (!token) return false;

  if (Date.now() > exp) {
    // Session expired
    logout();
    return false;
  }

  return true;
}
