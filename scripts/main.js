function resizeCanvas() {
  const canvas = document.getElementById("board");
  canvas.width  = window.innerWidth;
  canvas.height  = window.innerHeight;
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

/*function startGame()
{
    //myGameArea.start();
    const canvas = document.getElementById("board");
    canvas.style.backgroundColor = "#1b23b7";

    pacmanDemo();
}*/

/*var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width = 1000;
        this.canvas.id = "board";
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}*/
