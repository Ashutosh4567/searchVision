import mediapipe as mp
import cv2

mp_face = mp.solutions.face_mesh.FaceMesh(refine_landmarks=True)

def detect_face(frame):
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = mp_face.process(rgb)

    if not result.multi_face_landmarks:
        return False, None

    return True, result.multi_face_landmarks[0]
