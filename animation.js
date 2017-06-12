let spriteSheet = new Image();
spriteSheet.src = 'pac_sprite_sheet.png'


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
    constructor() {
      this.x = 0;
      this.y = 200;
      this.direction = "right";
      this.frame = 455;
      this.lastFrame = undefined;
      this.frameRate = 12; // per second
      this.color = "red";
      this.size = 100;
    }

    render() {
       Graphics.drawTexture({
           image : spriteSheet, 
           center : {x : this.x,  y : this.y}, 
           clip : { x: this.frame, y : 62 , width: 17, height: 17},
           im : {width : 100, height : 80},
           size : this.size,
       });
    }

    update(time) {
        if(this.frame === 455){
            this.frame += 17;
        }   
        else{
            this.frame -= 17;
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
  var redGhost = new Ghost();

  function render(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pacman.render(context);
    pacman.update(time);
    redGhost.render();
    redGhost.update(time);
    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}
