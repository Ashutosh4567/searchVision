🎓 searchVision 

searchVision is a smart classroom system.
It helps teachers understand students better during online classes.

Instead of spying on students, it:

Tells when a student is confused

Checks basic exam integrity

Shows everything live on a teacher dashboard

🤔 What Problem Does It Solve?

In online classes:

Teachers don’t know if students are confused

Proctoring tools feel strict and invasive

Super Vision solves this by giving teachers insights, not control.

🧠 How Does It Work? (Very Simple)
Student Camera
   ↓
AI analyzes face & behavior
   ↓
Teacher sees status (Focused / Confused / Alert)


The student’s camera is used

AI looks at face movements

Only status is sent to the teacher

No video is saved

🤖 Is Machine Learning Used?

✅ YES

Deep Learning

MediaPipe AI detects face and facial points

Machine Learning

A trained ML model decides if the student is confused

Uses things like:

Eyebrow movement

Mouth movement

Head tilt

Stillness over time

Confusion is detected over time, not from one frame.

🧩 Main Features

🎥 Real-time webcam analysis

😕 Detects confused students

👀 Proctoring alerts (no face / multiple faces)

📊 Live teacher dashboard

🧑‍🎓 Supports many students at once

🔐 Privacy-friendly design

📁 Project Structure
super-vision/
│
├── backend/        # AI + server
├── frontend/       # Student & Teacher apps
└── README.md

⚙️ How to Run the Project
1️⃣ Backend (AI + Server)
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r backend/requirements.txt
python backend/ai/train.py
uvicorn backend.app:app --reload

2️⃣ Student Portal
cd frontend/student-portal
npm install
npm run dev


Opens camera

Sends data to AI

3️⃣ Teacher Dashboard
cd frontend/teacher-dashboard
npm install
npm run dev


Shows live student status

▶️ Correct Run Order
1. Train ML model
2. Start backend
3. Start student app
4. Start teacher app

🧪 How to Test

Look confused for a few seconds → 🟡 Confused

Leave camera / show two faces → 🔴 Alert

Teacher sees updates instantly

🔐 Privacy

❌ No video recording

❌ No face storage

✅ Only simple status is shared

🎯 Why This Project Is Good

Easy to understand

Uses real AI & ML

Works in real time

Useful for real classrooms

Looks impressive in exams, hackathons, interviews

👨‍💻 Author

Ashutosh Thakur
B.Tech – AI & ML
