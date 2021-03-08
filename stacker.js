function setup() {
  createCanvas(700, 300);
  player = new Player(0, 2);
  print(player.x)
}

function keyPressed() {
  if (keyCode == 32) {
    player.y -= 1;
    print("space bar")
  }
}

function draw() {
  background(220);
  player.update();
  player.draw();

}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // other stuff
  }
}

class Board {
  constructor() {
    // construct board stuff
    
    // dont place players stuff on the board until after the space bar is pressed
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;

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
    this.setSpeed(10);
    this.setRandomX();
  }

  update() {
    if (millis() - this.t > 1000) {
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
    fill(255, 255, 0);
    rect(this.x * this.width, this.y * this.width, this.width, this.width);
    rect((this.x + 1) * this.width, this.y * this.width, this.width, this.width);
    rect((this.x + 2) * this.width, this.y * this.width, this.width, this.width);
  }
}