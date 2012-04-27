data = [
  // 16 in outer ring
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2900, fill: '#fff'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2800, fill: '#eee'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2700, fill: '#ddd'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2600, fill: '#ccc'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2500, fill: '#bbb'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2400, fill: '#aaa'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2300, fill: '#999'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2200, fill: '#888'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2100, fill: '#777'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2000, fill: '#666'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1900, fill: '#555'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1800, fill: '#444'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1700, fill: '#333'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1600, fill: '#222'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1500, fill: '#111'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1400, fill: '#000'},
  // 8 in middle ring
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2850, fill: '#fff'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2650, fill: '#ddd'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2450, fill: '#bbb'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2250, fill: '#999'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2050, fill: '#777'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1850, fill: '#555'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1650, fill: '#333'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1450, fill: '#111'},
  // 4 in inner ring
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 2700, fill: '#ccc'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 2300, fill: '#888'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 1900, fill: '#444'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 1500, fill: '#000'},
];

function writeMessage(messageLayer, message) {
  var context = messageLayer.getContext();
  messageLayer.clear();
  context.font = "18pt Calibri";
  context.fillStyle = "white";
  context.fillText(message, 10, 25);
}

var Box = function(options) {
  var randomFactor = (Math.random() - 0.5);

  this.width = options.width;
  this.height = options.height;
  this.fill = options.fill;
  this.krect = new Kinetic.Rect(this);
  window.layer.add(this.krect);
  //this.amplitude = options.amplitude;
  this.amplitude = {
    x: 600 + (randomFactor * 400),
    y: 300 + (randomFactor * 200)
  };
  //this.period = options.period;
  this.period = 8000 + (randomFactor * 500);
  this.stopped = false;
  this.timeLag = Math.floor((Math.random() - 0.5) * this.period * 8);
  this.krect.box = this;

  this.krect.on('mouseover', function() {
    this.box.stopped = true;
    this.moveToTop();
  });

  this.krect.on('mouseout', function() {
    this.box.stopped = false;
  });

  this.offset = {
    x: (window.stage.getWidth() - this.width) / 2,
    y: (window.stage.getHeight() - this.height) / 2
  };

  this.move = function(time, timeDiff) {
    if(!this.stopped) {
      timeFactor = (time - this.timeLag) / this.period;
      this.x = this.amplitude.x * Math.sin(timeFactor) + this.offset.x;
      this.y = this.amplitude.y * Math.cos(timeFactor) + this.offset.y;
      this.krect.setX(this.x);
      this.krect.setY(this.y);
      window.layer.draw();
    } else {
      this.timeLag += timeDiff;
      writeMessage(messageLayer, this.timeLag);
    }
  }
};

window.onload = function() {
  var K = Kinetic;
  stage_options = {container: 'canvas', width: $(document).width(), height: $(document).height()};

  var stage = new K.Stage(stage_options);
  var layer = new K.Layer();
  var messageLayer = new K.Layer();
  stage.add(layer);
  stage.add(messageLayer);

  window.stage = stage;
  window.layer = layer;
  window.messageLayer = messageLayer;

  boxes = [];
  $.each(data, function(i) {
    boxes.push(new Box(data[i]));
  });

  stage.onFrame(function(frame) {
    writeMessage(messageLayer, 1000 / frame.timeDiff);
    for(var i = 0; i < boxes.length; i++) {
      boxes[i].move(frame.time, frame.timeDiff);
    }
  });

  stage.start();
};

