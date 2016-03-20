// Loads libraries then get server ready.
var app = require('express')();
var http = require('http').Server(app);

//Library to create socket connection on node.js
var io = require('socket.io')(http);

//Loads arduino-js library and get it ready
var jfive = require("johnny-five");
var board = new jfive.Board();

var board, socket, connected = false;

//SERVER
//What server should do when reciving a connection.
//(send index.html to the browser)
app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

//What to do when a connection recieved.
io.on('connection', function(s){
   console.log('A user has connected');
   // Tracking connection
   connected = true;
   // Saving this for the board on ready callback function
   socket = s;
});

//Port 3000 listens for connections.
http.listen(3000, function(){
   console.log('listening on *:3000');
});

var tellTemperature = function(that) {
   socket.emit('Temperature reading', that.celsius)
}

//ARDUINO
board.on("ready", function() {
   console.log('board has connected');    

   var tempSensor = new jfive.Thermometer({
      controller: "TMP36",
      pin: "A0",
      freq: "1000"
   });
   
   tempSensor.on("change", function() {
      // We send the temperature when the browser is connected.
      var that = this;
      // if(connected) debounce(tellTemperature, 10);
      if(connected) tellTemperature(that); 
      // if(connected) socket.emit('Temperature reading', this.celsius);
   }); 
});




