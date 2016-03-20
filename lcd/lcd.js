var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Parallel LCD
  var lcd = new five.LCD({ 
    controller: "JHD1313M1",
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 13,
    rows: 2,
    cols: 16
  });

  lcd.print("Hello");
});