import socketio
# import serial
from tkinter import Tk, Label
from PIL import Image, ImageTk
import cv2
import time
from pyfirmata import Arduino, util
# ser = serial.Serial('/dev/ttyUSB0', 9600)
# print(ser)
# standard Python
sio = socketio.Client()
board = Arduino('/dev/ttyUSB0') 
def send_message():
    door_status = "locked"  # Initialize door_status outside the loop
    object_detected = False  # Initialize object_detected outside the loop
    it = util.Iterator(board)
    it.start()
    board.analog[0].enable_reporting()
    line=0
    try:
        while True:
            try:
                value = board.analog[0].read()
                if value is not None:
                    if value < 0.5:
                        print("Object is detected")
                        line =1
                        object_detected=True
                        sio.emit('message', {'data': "Object detected"})
                        object_detected = True
                        face_name = face_recognise()
                        print(face_name)
                        sio.emit('face_recognise', {'data': face_name})
                        sio.emit('door_status', {'data': "Door Unlocked"})
                        door_status = "unlocked"
                        print(door_status)
                        time.sleep(10)  # Delay after unlocking the door
                        sio.emit('message', {'data': "Object Not detected"})
                        sio.emit('face_recognise', {'data': "unknown"})
                        sio.emit('door_status', {'data': "Door Locked"})
                        door_status = "locked"
                        object_detected = False
                        print(door_status)
                    else:
                        # print("No valid analog reading")
                        line=0
                        # print(line)
                        object_detected=False
                        sio.sleep(1)
                else:
                    sio.sleep(1)
            except KeyboardInterrupt:
                print("Program interrupted by user")
                break  # Break out of the loop to handle the interrupt
    except KeyboardInterrupt:
        print("Program interrupted by user, disconnecting...")
        sio.disconnect()

def handle_ack(data):
    # Handle the acknowledgment data
    if data['status'] == 'received' and data['code'] == 200:
        print("Message received by the server.\n")


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
    name_list = ["", "Prashanth Reddy", "hemanth"]
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

@sio.event
def connect():
    print("I'm connected to the server.")
    sio.start_background_task(send_message)

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected from the server.")

# Connect to the Flask-SocketIO server
sio.connect('http://127.0.0.1:5000/')

try:
    # Prevent the program from exiting immediately
    sio.wait()
except KeyboardInterrupt:
    print("Exiting program...")
