function setup() {
  createCanvas(700/3, 1500/3);
  game = new Game();
}

function keyPressed() {
  if (keyCode == 32) {
    print("space bar")
    game.updateBoard();

    //game.player.y -= 1;

  }
}

function draw() {
  background(220);
  game.draw();


}





class Game {
  // TODO the tileWidth should not be set in 3 different places... at least don't
  // hard code it in 3 different places

  constructor() {
    this.player = new Player(0, 14);
    this.board = new Board();
    this.isPaused = false;
  }

  updateBoard() {
    if (this.player.y == this.board.height - 1) {
          this.board.placeBlocks(this.player.x, this.player.y, this.player.size);
          this.player.y -= 1;
    } else {
      // need to check if tiles are being dropped
      // check under  but this will happen in board placeBlocks for now
          let newSize = this.board.placeBlocks(this.player.x, this.player.y, this.player.size);
          this.player.y -= 1;
          this.player.setSize(newSize);
    }

    this.player.setRandomX();
    this.player.speed *= 1.2
  }

  dropPlayer() {
  }
  
  draw() {
    this.player.update();
    this.board.draw();
    this.player.draw();
  }
}







class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 700/3/7;
    // other stuff
  }
  
  draw() {
    fill(255, 255, 0);
    rect(this.x * this.width, this.y * this.width, this.width, this.width);
    rect((this.x + 1) * this.width, this.y * this.width, this.width, this.width);
    rect((this.x + 2) * this.width, this.y * this.width, this.width, this.width);
  }
}










class Board {
  constructor() {
    // construct board stuff
    
    this.width = 7;
    this.height = 15
    
    this.tileWidth = 700/3/7;
    
    this.grid = [];
    this.reset();

  }



placeBlocks(x, y, size) {
  var newSize = 0;
  if (y == this.height - 1) {
    for (let i = 0; i < size; i++) {
      this.grid[x + i][y] = 1;

    }
    newSize = 3
  } else {
    for (let i = 0; i < size; i++) {
      if (this.grid[x + i][y + 1] == 1) {
        this.grid[x + i][y] = 1;
        newSize += 1;
      }
      

    }

  }

  return newSize;
  
}


  
  reset() {
    for (let i = 0; i < this.width; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.height; j++) {
        this.grid[i].push(0);
      }
    }
  }
  
  draw() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.grid[i][j] == 0) {
          fill(100, 100, 255);
          rect(i * this.tileWidth, j * this.tileWidth, this.tileWidth, this.tileWidth);
        } else {
          fill(150, 150, 255);
          rect(i * this.tileWidth, j * this.tileWidth, this.tileWidth, this.tileWidth);
        }
      }
    }
  }
  
    
}










class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 700/3/7;

    this.t = millis();
    this.size = 0;
    this.speed = 0;
    this.direction = 0;
    
    this.reset();
  }

  setSize(size) {
    this.size = size;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setRandomX() {
    this.x = Math.floor(Math.random() * (8 - this.size));
  }

  reset() {
    this.setSize(3);
    this.setSpeed(1);
    this.setRandomX();
  }

  update() {
    if (millis() - this.t > 750 / this.speed) {
      if (this.x + this.size == 7) {
        this.direction = -1
      }

      if (this.x == 0) {
        this.direction = 1;
      }

      this.x += this.direction;
      this.t = millis();
    }
    
  }

  draw() {
    fill(150, 150, 255);
    for (var i = 0; i < this.size; i++) {
        rect((this.x + i) * this.width, this.y * this.width, this.width, this.width);

    }
  }
}