import { useState } from "react";

export default function Register({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("Registration successful. Please login.");
      onSwitch();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already registered?{" "}
        <button className="link" onClick={onSwitch}>Login</button>
      </p>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
