var five = require('johnny-five');
var arduino = new five.Board();
var light = 0;

arduino.on('ready', function(){
  var lightSensor = new five.Sensor({
    pin: 'A1',
    freq: 1000 
  });

  lightSensor.on('data', function(){
    light = this.value;
    console.log(light);

    if (light < 290) {
      console.log('quita!!!')
    }
  });
});