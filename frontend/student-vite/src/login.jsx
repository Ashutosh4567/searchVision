import { useState } from "react";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail);

      if (mode === "login") {
        onLogin(role, data.access_token);
      } else {
        alert("Registered successfully. Now login.");
        setMode("login");
      }

    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>{mode.toUpperCase()}</h2>

      <div>
        <button onClick={() => setMode("login")}>Login</button>
        <button onClick={() => setMode("register")}>Register</button>
      </div>

      <div>
        <button onClick={() => setRole("student")}>Student</button>
        <button onClick={() => setRole("teacher")}>Teacher</button>
      </div>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={submit}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
