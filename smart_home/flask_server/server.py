from flask import Flask
from flask_socketio import SocketIO,emit
from flask_cors import CORS
app = Flask(__name__, static_folder='dist', static_url_path='/')
CORS(app)
# Ensure the secret key is set for session management
app.config['SECRET_KEY'] = 'hello'
socketio = SocketIO(app,cors_allowed_origins="*")

@app.route('/')
def index():
    print("server started")
    return app.send_static_file('index.html')



@socketio.on('connect')
def handle_connect():
    print('Client connected')
    socketio.emit("data_from_server","hello this is from the server")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    print(data)
@socketio.on('ledState')
def handle_ledState(data):
    print(data)
    socketio.emit("ledState",data)
@socketio.on('btnClick')
def handle_btnClick(data):
    print(data)
    socketio.emit("button_click_client",data)



if __name__ == '__main__':
    print("Starting Server")
    socketio.run(app,debug=False,host='0.0.0.0')
