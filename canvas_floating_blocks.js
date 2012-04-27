data = [
  // 16 in outer ring
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2900, fill: '#3a5c7d', text: 'A Night to Remember'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2800, fill: '#3a5c7d', text: 'Drift' },
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2700, fill: '#f4f5f7', text: 'Mrs. Kennedy and Me'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2600, fill: '#eff2f5', text: 'Heaven is for Real'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2500, fill: '#ebeef1', text: 'The Big Miss'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2400, fill: '#e4e9ee', text: 'The Power of Habit'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2300, fill: '#dfe5ea', text: 'Imagine'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2200, fill: '#d4dbe2', text: 'Drop Dead Healthy'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2100, fill: '#ced6df', text: 'Steve Jobs'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 2000, fill: '#c1cbd6', text: 'Lifeboat No. 8'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1900, fill: '#b1becc', text: 'A Natural Woman'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1800, fill: '#a3b4c3', text: 'Wild'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1700, fill: '#9aabbd', text: 'Unbroken'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1600, fill: '#94a6b8', text: 'Escape from Camp 14'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1500, fill: '#8fa1b5', text: 'American Sniper'},
  {width: 200, height: 50, amplitude: {x: 800, y: 400}, period: 1400, fill: '#7e95aa', text: 'Killing Lincoln'},
  // 8 in middle ring
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2850, fill: '#778ea5', text: 'Trickle Down Tyranny'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2650, fill: '#6f88a0', text: 'Bossypants'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2450, fill: '#6b849d', text: 'The Vow'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2250, fill: '#647f99', text: 'The Immortal Life of Henrietta Lacks'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 2050, fill: '#5d7994', text: 'Quiet'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1850, fill: '#567390', text: "No, They Can't"},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1650, fill: '#506e8c', text: 'Confessions of a Scarry Mommy'},
  {width: 200, height: 50, amplitude: {x: 600, y: 300}, period: 1450, fill: '#4f6d8a', text: 'Thinking, Fast and Slow'},
  // 4 in inner ring
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 2700, fill: '#496887', text: 'Rebuild the Dream'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 2300, fill: '#456584', text: 'Heaven is Here'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 1900, fill: '#416382', text: 'Bringing up B&#233;b&#233;'},
  {width: 200, height: 50, amplitude: {x: 400, y: 200}, period: 1500, fill: '#3f6080', text: 'Bloom'},
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
  //this.fill = options.fill;
  this.fontSize = '16';
  this.fontFamily = 'Aeriel';
  this.textFill = '#fff';
  this.text = options.text;
  this.krect = new Kinetic.Text(this);
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
      timeFactor = (time - this.timeLag) / this.period * -1;
      this.x = this.amplitude.x * Math.sin(timeFactor) + this.offset.x;
      this.y = this.amplitude.y * Math.cos(timeFactor) + this.offset.y;
      this.krect.setX(this.x);
      this.krect.setY(this.y);
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
    window.layer.draw();
  });

  stage.start();
};

