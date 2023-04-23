window.onload = () => {

  let carXPosition = 125;
  let carYPosition = 345;
  let carWidth = 30;
  let carHeight = 80;
  const leftRoadLimit = 30;
  const rightRoadLimit = 215;
  let obstacles = [];
  let i = 0;
  
  const canvasObj = {
    canvas: null,
    ctx: null,
    intervalId: null,
    clear: function() {
        this.ctx.clearRect(0, 0, 500, 700);
    },
    start: function() {
       this.canvas =  document.getElementById("canvas");
       this.ctx = this.canvas.getContext("2d");
       this.intervalId = setInterval(update, 120);
    },
    stop: function() {
        clearInterval(this.intervalId);
    }
  }
  
  document.getElementById('start-button').onclick = () => {
    canvasObj.start();
  };
  // Draw the game board and the car
  function drawGameBoardAndCar(ctx){
    const img1= new Image();
    const img2= new Image();
    img1.src = "./images/road.png"; //board dim. 500x700
    img2.src = "./images/car.png"; //car dim. 158x319

    // Draw the road
    img1.onload = function () {
      canvasObj.ctx.drawImage(img1, 0, 0);
    }
    // draw the car
    img2.onload = function () {
      canvasObj.ctx.drawImage(img2, carXPosition, carYPosition, carWidth, carHeight);
    }
  }

  function moveCar(leftOrRight){
    if (leftOrRight === "left"){
      if (carXPosition>=leftRoadLimit){
        carXPosition -= 10;
      }
    }
    else if (leftOrRight === "right"){
      if(carXPosition<=rightRoadLimit){
        carXPosition += 10;
      }
    }
    drawGameBoardAndCar(ctx);
  }

  // Make the car move right and left
  document.body.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowLeft") {
      moveCar("left");
    }
    if(e.key == "ArrowRight") {
      moveCar("right");
    }
  });

  class Rectangle {
    constructor (x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
    }
    recalculatePosition(incX, incY) {
        this.x += incX;
        this.y += incY;
    }
    print() {
        canvasObj.ctx.fillStyle = this.color;
        canvasObj.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const update = () => {
    i++;
    //clear canvas
    canvasObj.clear();

    if(i%20 == 0) {
      let obstHeight = 20; // obstacle has a fixed height
      let obstMaxWidth = rightRoadLimit - leftRoadLimit - carWidth - 10; // Added 10px margin to ensure car doesn't touch random obstacle
      let obstWidth = Math.floor(Math.random() * obstMaxWidth);
      let obstMaxX = rightRoadLimit - obstMaxWidth;
      let obstX = Math.floor(Math.random() * obstMaxX) + leftRoadLimit;
      let newObstacle = new Rectangle(obstX, 20, obstWidth, obstHeight, "red"); 
      obstacles.push(newObstacle);
    }

    obstacles.forEach((obstacle)=>{
      obstacle.recalculatePosition(0, 20);

      //is there a collision between obstacle and the player?
      if(!((carYPosition > (obstacle.y + obstacle.height)) || (carXPosition > (obstacle.x + obstacle.width)) || ((carXPosition + carWidth) < obstacle.x) || (carYPosition + carHeight < obstacle.y)) ) {
          //COLLISION!!!!!
          alert("COLLISION!!!!!!!");
          canvasObj.stop();
      }

      obstacle.print();
    })
    drawGameBoardAndCar(canvasObj.ctx);
  }
}

