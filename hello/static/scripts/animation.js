let spriteSheet = new Image();
{% load static %}
spriteSheet.src = '{% static "img/pac_sprite_sheet.png" %}'


function pacmanDemo() {
  const canvas = document.getElementById("board");
  const context = canvas.getContext("2d");
  Graphics.initialize();

  class Arc {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }
  }

  const pacMouthsArcs = {
    open_right: new Arc(Math.PI/4, 7*Math.PI/4),
    closed_right: new Arc(0, 2*Math.PI),
    open_left: new Arc(5*Math.PI/4, 3*Math.PI/4),
    closed_left: new Arc(Math.PI, 3*Math.PI)
  };

  class Ghost { // Pac people could be any gender
    constructor(color) {
      this.x = 0;
      this.direction = "right";
      this.frame = 456;
      if(color === "red"){
       this.y_offset = 65;
       this.y = 200;
      }
      else if(color === "pink"){
       this.y_offset = 80; 
       this.y = 300;
      }
      else if(color === "blue"){
       this.y_offset = 96; 
       this.y = 400;
      }
      else if(color === "orange"){
       this.y_offset = 112; 
       this.y = 500;
      }
      this.lastFrame = undefined;
      this.frameRate = 12; // per second
      this.color = "red";
      this.size = 100;
    }

    render() {
       Graphics.drawTexture({
           image : spriteSheet, 
           center : {x : this.x,  y : this.y}, 
           clip : { x: this.frame, y : this.y_offset , width: 15, height: 15},
           im : {width : 100, height : 80},
           size : this.size,
       });
    }

    update(time) {
      if (this.lastFrame === undefined)
        this.lastFrame = time;
      else if ((time - this.lastFrame) / 1000 > 1 / this.frameRate) {
        if(this.frame === 456 && this.direction === "right"){
            this.frame += 16;
        }   
        else if(this.direction === "right"){
            this.frame -= 16;
        }
        else if(this.direction === "left" && this.frame != 488){
            this.frame = 488; 
        }
        else{
            this.frame += 16;
        }
        this.lastFrame = time;
        this.x += this.size / 8 * (this.direction === "right" ? 1 : -1);
      }
        if (this.x > canvas.width){ // turn around
          this.direction = "left";
        }
        else if (this.x < 0){
          this.direction = "right"
      }
    }
  }
  

  class PacPerson { // Pac people could be any gender
    constructor() {
      this.x = 0;
      this.y = 100;
      this.mouth = "open";
      this.size = 30; // radius
      this.direction = "right";
      this.lastFrame = undefined;
      this.frameRate = 12; // per second
      this.color = "yellow";
    }

    render(context) {
      context.save();
      context.fillStyle = this.color;
      const mouth = pacMouthsArcs[this.mouth + "_" + this.direction];
      context.beginPath();
      context.arc(this.x, this.y, this.size, mouth.start, mouth.end);
      context.lineTo(this.x, this.y);
      context.fill();
      context.restore();
    }

    update(time) {
      if (this.lastFrame === undefined)
        this.lastFrame = time;
      else if ((time - this.lastFrame) / 1000 > 1 / this.frameRate) {
        this.mouth = this.mouth === "open" ? "closed" : "open";
        this.lastFrame = time;
        this.x += this.size / 2 * (this.direction === "right" ? 1 : -1);

        if (this.x > canvas.width) // turn around
          this.direction = "left";
        else if (this.x < 0)
          this.direction = "right"
      }
    }
  }

  var pacman = new PacPerson();
  var redGhost = new Ghost("red");
  var pinkGhost = new Ghost("pink");
  var blueGhost = new Ghost("blue");
  var orangeGhost = new Ghost("orange");

  function render(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pacman.render(context);
    pacman.update(time);
    redGhost.render();
    redGhost.update(time);
    pinkGhost.render();
    pinkGhost.update(time);
    blueGhost.render();
    blueGhost.update(time);
    orangeGhost.render();
    orangeGhost.update(time);
    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}
