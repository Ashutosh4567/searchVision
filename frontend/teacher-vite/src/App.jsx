import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Waiting for student...");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/teacher");

    ws.onmessage = (e) => setStatus(e.data);
    ws.onerror = () => setStatus("Connection error");

    return () => ws.close();
  }, []);

  const color =
    status.includes("Focused") ? "green" :
    status.includes("Confused") ? "orange" :
    "red";

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>👩‍🏫 Teacher Dashboard</h1>
      <div
        style={{
          background: color,
          padding: "30px",
          color: "white",
          fontSize: "28px",
          borderRadius: "15px",
          transition: "all 0.4s ease"
        }}
      >
        {status}
      </div>
    </div>
  );
}
