from flask import Flask
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import base64
# import webview
import signal
import threading
app = Flask(__name__, static_folder='sources', static_url_path='/')
CORS(app)
# Ensure the secret key is set for session management
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app,cors_allowed_origins="*")

@app.route('/')
def index():
    print("server started")
    return app.send_static_file('index.html')


@socketio.on('message')
def handle_message(data):
    print('Received message: ', data['data'])
    socketio.emit("object_detected_status",data['data'])
    return {'status': 'received', 'code': 200}
@socketio.on('door_status')
def door_status(data):
    print('Door Status: ', data['data'])
    socketio.emit("door_status",data['data'])
    return {'status': 'received', 'code': 200}

@socketio.on('face_recognise')
def face_recognised(data):
    print('The Face is: ', data['data'])
    name=data['data']
    socketio.emit("face_recognise",name)
    if name!="unknown":
        filename = f'./face_{name}.jpg'
        with open(filename, 'rb') as image_file:
            image_data = image_file.read()
    # socketio.emit('image_size', {'size': len(image_data)})
    # socketio.emit('image_data', {'data': base64.b64encode(image_data).decode('utf-8')})
        socketio.emit('image_data', {'data': image_data})
    return {'status': 'received', 'code': 200}

@socketio.on('image_size')
def handle_image_size(data):
    global image_size
    image_size = data['size']
    print(f"Receiving an image of size: {image_size} bytes")

@socketio.on('image_data')
def handle_image_data(data):
    image_data = data['data']
    # You can now save the image data to a file or process it as needed
    with open('received_image.jpg', 'wb') as image_file:
        print("image received")
        socketio.emit("image_file",image_file)
    #     image_file.write(image_data)
    # print("Image has been received and saved.")

@socketio.on('button_click')
def button_click(data):
    print( data)
    socketio.emit("data_from_server","hello this is from the server")


@socketio.on('connect')
def handle_connect():
    a=10
    print('Client connected')
    socketio.emit("data_from_server","hello this is from the server")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

def run_flask_app():
    print("Starting Server")
    socketio.run(app,)

def signal_handler(sig, frame):
    print('Shutting down gracefully...')
    socketio.stop()  # Stop the SocketIO server
    sys.exit(0)  # Exit the program

# Register the signal handler for CTRL+C
signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    # socketio.start_background_task(start_web_view)
    flask_thread = threading.Thread(target=run_flask_app)
    flask_thread.start()
    # print("Starting Webview")
    # first_window = webview.create_window('Smart Door lock using Face Auth', 'http://localhost:5000/')
    # Start the webview without blocking
    # webview.start(http_server=True)
