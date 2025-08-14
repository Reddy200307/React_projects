from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyUSB0')  # Replace with your actual port
it = util.Iterator(board)
it.start()
board.analog[0].enable_reporting()

while True:
    value = board.analog[0].read()
    if value is not None:
        # print(f"Analog value: {value:.4f}")
        if value < 0.5:
            print("Object is detected")
    else:
        print("No valid analog reading")
    time.sleep(2)
