data = [
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 3000, fill: '#fff'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2200, fill: '#ddd'},
  {width: 200, height: 50, amplitude: {x: 700, y: 300}, period: 2800, fill: '#bbb'},
  {width: 200, height: 50, amplitude: {x: 500, y: 350}, period: 1700, fill: '#999'},
  {width: 200, height: 50, amplitude: {x: 600, y: 400}, period: 1400, fill: '#777'}
];

var Box = function(options) {
  this.width = options.width;
  this.height = options.height;
  this.fill = options.fill;
  this.krect = new Kinetic.Rect(this);
  window.layer.add(this.krect);
  this.amplitude = options.amplitude;
  this.period = options.period;

  this.move = function(time) {
    this.x = this.amplitude.x * Math.sin(time / this.period) + (window.stage.getWidth() / 2) - (this.width / 2);
    this.y = this.amplitude.y * Math.cos(time / this.period) + (window.stage.getHeight() / 2) - (this.height / 2);
    this.krect.setX(this.x);
    this.krect.setY(this.y);
    window.layer.draw();
  }
};

window.onload = function() {
  var K = Kinetic;
  stage_options = {container: 'canvas', width: $(document).width(), height: $(document).height()};

  var stage = new K.Stage(stage_options);
  window.stage = stage;
  var layer = new K.Layer();
  window.layer = layer;
  stage.add(layer);

  boxes = [];
  $.each(data, function(i) {
    boxes.push(new Box(data[i]));
  });


  stage.onFrame(function(frame) {
    $.each(boxes, function(i, box) {box.move(frame.time)});
  });

  stage.start();
};

