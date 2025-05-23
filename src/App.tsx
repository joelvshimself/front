import { useState } from "react";

import Tabla from "./components/tabla";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loginForm, setLoginForm] = useState({ CorreoElectronico: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert("Login fallido. Verifica tus credenciales.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={loginForm.CorreoElectronico}
          onChange={(e) => setLoginForm({ ...loginForm, CorreoElectronico: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    );
  }

  return <Tabla token={token} onLogout={handleLogout} />;
}

export default App;
