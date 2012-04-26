data = [
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 3000, fill: '#fff'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2200, fill: '#ddd'},
  {width: 200, height: 50, amplitude: {x: 700, y: 300}, period: 2800, fill: '#bbb'},
  {width: 200, height: 50, amplitude: {x: 500, y: 350}, period: 1700, fill: '#999'},
  {width: 200, height: 50, amplitude: {x: 600, y: 400}, period: 1400, fill: '#777'}
];

function writeMessage(messageLayer, message) {
  var context = messageLayer.getContext();
  messageLayer.clear();
  context.font = "18pt Calibri";
  context.fillStyle = "white";
  context.fillText(message, 10, 25);
}

var Box = function(options) {
  this.width = options.width;
  this.height = options.height;
  this.fill = options.fill;
  this.krect = new Kinetic.Rect(this);
  window.layer.add(this.krect);
  this.amplitude = options.amplitude;
  this.period = options.period;
  this.stopped = false;
  this.timeLag = 0;
  this.krect.box = this;

  this.krect.on('mouseover', function() {
    this.box.stopped = true;
  });

  this.krect.on('mouseout', function() {
    this.box.stopped = false;
  });

  this.move = function(time, timeDiff) {
    if(!this.stopped) {
      this.x = this.amplitude.x * Math.sin((time - this.timeLag) / this.period) + (window.stage.getWidth() / 2) - (this.width / 2);
      this.y = this.amplitude.y * Math.cos((time - this.timeLag) / this.period) + (window.stage.getHeight() / 2) - (this.height / 2);
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
    $.each(boxes, function(i, box) {box.move(frame.time, frame.timeDiff)});
  });

  stage.start();
};

