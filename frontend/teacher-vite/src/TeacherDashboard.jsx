import { useEffect, useRef, useState } from "react";

export default function TeacherDashboard() {
  const [status, setStatus] = useState("Waiting...");
  const [animate, setAnimate] = useState(false);
  const prevStatus = useRef("");
  const alertSound = useRef(new Audio("/alert.mp3"));

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/teacher");

    ws.onmessage = (e) => {
      if (e.data !== prevStatus.current) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 600);

        if (e.data.includes("🚨")) {
          alertSound.current.play();
        }

        prevStatus.current = e.data;
        setStatus(e.data);
      }
    };
  }, []);

  const getStyle = () => {
    if (status.includes("🚨")) return "red";
    if (status.includes("⚠️")) return "orange";
    return "green";
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>👩‍🏫 Teacher Dashboard</h2>

      <div
        style={{
          padding: 30,
          fontSize: 28,
          color: "white",
          backgroundColor: getStyle(),
          borderRadius: 12,
          transform: animate ? "scale(1.1)" : "scale(1)",
          transition: "all 0.4s ease",
          boxShadow: animate ? "0 0 20px white" : "none",
        }}
      >
        {status}
      </div>
    </div>
  );
}
