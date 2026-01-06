def detect_emotion(landmarks):
    brow_l = landmarks.landmark[70].y
    brow_r = landmarks.landmark[300].y
    eye = landmarks.landmark[159].y

    if brow_l < eye - 0.02 and brow_r < eye - 0.02:
        return "Confused"

    return "Focused"
