import Pacman from "/src/Pacman.js";
import Blinky from "/src/Enemies/Blinky.js";
import MovingDirection from "/src/MovingDirection.js";

export default class TileMap {
  constructor(canvasWidth, canvasHeight) {
    this.tileWidth = canvasWidth / this.map[0].length;
    this.tileHeight = canvasHeight / this.map.length;

    this.wall = new Image();
    this.wall.src = "/images/walls/wall.png";

    this.dot = new Image();
    this.dot.src = "/images/dots/dot.png";

    this.powerDot0 = new Image();
    this.powerDot0.src = "/images/dots/power_0.png";

    this.powerDot1 = new Image();
    this.powerDot1.src = "/images/dots/power_1.png";

    this.powerDot = this.powerDot0;

    this.powerDotAnimationTimerDefault = 60;
    this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    this.pacman = null;
  }
  // -1 - blank
  // 0 - dot
  // 1 - wall
  // 2 - power-dot
  // 3 - entry ghost lair
  // 4 - pacman
  // 5 - blinky
  // 6 - pinky
  // 7 - inky
  // 8 - clyde
  // 9 - fruit
  map = [
    [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
    [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
    [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 2, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],

    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 1, 1, 0,
      1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 1, 1, 1, 3, 3, 1, 1, 1, -1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],
    [
      -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1,
      -1, -1, 0, -1, -1, -1, -1, -1, -1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 0,
      1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
      0, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 0, 1, 1,
      1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 2, 1,
    ],
    [
      1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
      1, 1, 1,
    ],
    [
      1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
      1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 1,
    ],

    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1,
    ],
    [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
    [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile !== 1) {
          this.#drawBlank(ctx, column, row, this.tileWidth, this.tileHeight);
        }
        if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileWidth, this.tileHeight);
        } else if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileWidth, this.tileHeight);
        } else if (tile === 2) {
          this.#drawPowerDot(ctx, column, row, this.tileWidth, this.tileHeight);
        }
      }
    }
  }

  // Initiates a pacman object at start position and returns it
  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = -1;
          this.pacman = new Pacman(
            column * this.tileWidth,
            row * this.tileHeight,
            this.tileWidth,
            this.tileHeight,
            velocity,
            this
          );
          return this.pacman;
        }
      }
    }
  }

  getEnemies(velocity) {
    let enemies = [];
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 5) {
          this.map[row][column] = -1;
          enemies.push(
            new Blinky(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              velocity,
              this,
              this.pacman
            )
          );
        }
      }
    }
    return enemies;
  }

  // returns true if the entity (player or ghost) where to collide with a wall if they
  // were to continue in the sasme direction.
  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    // if entity is fully within a tile
    if (
      Number.isInteger(x / this.tileWidth) &&
      Number.isInteger(y / this.tileHeight)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      // check next tile of current direction
      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileWidth;
          column = nextColumn / this.tileWidth;
          row = y / this.tileHeight;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileWidth;
          column = nextColumn / this.tileWidth;
          row = y / this.tileHeight;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileHeight;
          row = nextRow / this.tileHeight;
          column = x / this.tileWidth;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileHeight;
          row = nextRow / this.tileHeight;
          column = x / this.tileWidth;
          break;
      }
      const currentTile = this.map[row][column];
      if (currentTile === 1) {
        return true;
      }
      return false;
    }
  }

  // returns true and converts tile to a blank tile if
  // provided coordinates match a tile with a dot.
  eatDot(x, y) {
    const row = y / this.tileHeight;
    const column = x / this.tileWidth;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 0) {
        this.map[row][column] = -1;
        return true;
      }
    }
    return false;
  }

  // returns true and converts tile to a blank tile if
  // provided coordinates match a tile with a power-dot.
  eatPowerDot(x, y) {
    const row = y / this.tileHeight;
    const column = x / this.tileWidth;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 2) {
        this.map[row][column] = -1;
        return true;
      }
    }
    return false;
  }

  // draws walls of the gameboard to canvas.
  #drawWall(ctx, column, row, width, height) {
    ctx.drawImage(this.wall, column * width, row * height, width, height);
  }

  // draws dots to th canvas
  #drawDot(ctx, column, row, width, height) {
    ctx.drawImage(
      this.dot,
      column * width + width / 3,
      row * height + height / 3,
      width / 4,
      height / 4
    );
  }

  // draws power-dots to the canvas
  #drawPowerDot(ctx, column, row, width, height) {
    this.powerDotAnimationTimer--;
    if (this.powerDotAnimationTimer === 0) {
      this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
      if (this.powerDot === this.powerDot0) {
        this.powerDot = this.powerDot1;
      } else {
        this.powerDot = this.powerDot0;
      }
    }
    ctx.drawImage(
      this.powerDot,
      column * width + width / 4,
      row * height + height / 4,
      width / 2,
      height / 2
    );
  }

  // fills empty tiles on canvas with black color.
  #drawBlank(ctx, column, row, width, height) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * width, row * height, width, height);
  }
}
