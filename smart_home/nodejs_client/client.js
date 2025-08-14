const { Board, Led,Button,Pin } = require("johnny-five");
var five = require("johnny-five");
var board = new five.Board();
const io = require('socket.io-client');
const socket = io('http://localhost:5000');
var led,button;
var isLedOn = false; 
  socket.on('connect', () => {
    console.log('Connected to the server');
    socket.emit('message', 'Hello from the node client!');
  });
  
  socket.on('data_from_server', (data) => {
    console.log('Message from server:', data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server' );
  });
  socket.on('button_click_client', () => {
    console.log('Button is clicked on the client' );
    toggleLed(led)

  });

  function toggleLed(led) {
    led.toggle();
    isLedOn=!isLedOn;
    console.log(isLedOn);
    console.log(`LED is ${isLedOn ? "on" : "off"}`);
    socket.emit('ledState',{"ledState":`${isLedOn ? "on" : "off"}`});  
  }

  board.on("ready", function () {
     led = new Led(13); // Assuming the LED is connected to pin 13
   button = new Button({
    pin: 8,
    isPullup: true, // Set to true if your button is connected to ground (GND)
    holdtime: 200, // Adjust the hold time as needed
    invert: true,
  });

  button.on("press", () => toggleLed(led));
  button.on("hold", () => {}); // No action for hold
  button.on("release", () => {}); // No action for release
});
