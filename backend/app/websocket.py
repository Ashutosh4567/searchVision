from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

router = APIRouter()

students = set()
teachers = set()

@router.websocket("/ws/student")
async def student_ws(ws: WebSocket):
    await ws.accept()
    students.add(ws)
    print("✅ Student connected")

    try:
        while True:
            data = await ws.receive_text()

            # TODO: ML / gaze / emotion logic here
            status = "Focused"  # placeholder

            # Broadcast to teachers
            for t in teachers:
                await t.send_text(status)

    except WebSocketDisconnect:
        students.remove(ws)
        print("❌ Student disconnected")


@router.websocket("/ws/teacher")
async def teacher_ws(ws: WebSocket):
    await ws.accept()
    teachers.add(ws)
    print("✅ Teacher connected")

    try:
        while True:
            await asyncio.sleep(10)
    except WebSocketDisconnect:
        teachers.remove(ws)
        print("❌ Teacher disconnected")
