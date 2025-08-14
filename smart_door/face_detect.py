from tkinter import Tk, Label
from PIL import Image, ImageTk
import cv2

def capture_and_save_photo(name, frame):
    cv2.imwrite(f'./face_{name}.jpg', frame)
def face_recognise():
    # Initialize Tkinter window

    # Initialize video capture
    video = cv2.VideoCapture(0)
    if not video.isOpened():
        print("Error: Camera resource not available.")
        return

    # Load face detection and recognition models
    facedetect = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("Trainer.yml")
    name_list = ["", "Prashanth Reddy", "aaron"]
    name = "unknown"

    while True:
        ret,frame=video.read()
        gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = facedetect.detectMultiScale(gray, 1.3, 5)
        for (x,y,w,h) in faces:
            serial, conf = recognizer.predict(gray[y:y+h, x:x+w])
        # print(conf)
            if conf>50:
                cv2.rectangle(frame, (x,y), (x+w, y+h), (0,0,255), 1)
                cv2.rectangle(frame,(x,y),(x+w,y+h),(50,50,255),2)
                cv2.rectangle(frame,(x,y-40),(x+w,y),(50,50,255),-1)
                cv2.putText(frame, "Unknown", (x, y-10),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)
            else:
                cv2.rectangle(frame, (x,y), (x+w, y+h), (0,0,255), 1)
                cv2.rectangle(frame,(x,y),(x+w,y+h),(50,50,255),2)
                cv2.rectangle(frame,(x,y-40),(x+w,y),(50,50,255),-1)
                cv2.putText(frame, name_list[serial], (x, y-10),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)
                name=name_list[serial]
                capture_and_save_photo(name_list[serial], frame[y:y+h, x:x+w])
        frame=cv2.resize(frame, (940, 680))
    # imgBackground[162:162 + 980, 55:55 + 980] = frame
        cv2.imshow("Frame",frame)
        if(name!="unknown"):
            break
    
        k=cv2.waitKey(1)
        if k==ord("q"):
            break

    video.release()
    cv2.destroyAllWindows()
    return name

name =face_recognise()
print(name)