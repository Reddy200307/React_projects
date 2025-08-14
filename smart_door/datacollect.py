import cv2

video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
id = input("Enter Your ID: ")
count = 0

while True:
    ret, frame = video.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)  # Histogram equalization
    faces = facedetect.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        count += 1
        face_img = gray[y:y+h, x:x+w]
        face_img = cv2.resize(face_img, (200, 200))  # Consistent image size
        cv2.imwrite(f'datasets/User.{id}.{count}.jpg', face_img)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (50, 50, 300), 1)

    cv2.imshow("Frame", frame)
    if cv2.waitKey(1) & 0xFF == ord('q') or count >= 1000:  # Press 'q' to quit or reach 1000 images
        break

video.release()
cv2.destroyAllWindows()
print("Dataset Collection Done.")
