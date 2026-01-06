import { useEffect, useRef } from "react";

export default function StudentDashboard() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });

    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/student");

    const interval = setInterval(sendFrame, 500);
    return () => clearInterval(interval);
  }, []);

  const sendFrame = () => {
    if (!videoRef.current || wsRef.current.readyState !== 1) return;

    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];
    wsRef.current.send(base64);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎓 Student Portal</h2>
      <video ref={videoRef} autoPlay muted width="320" />
    </div>
  );
}
