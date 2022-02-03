export default class TileMap {
  constructor() {
    this.wall = new Image();
    this.wall.src = "/images/walls/wall.png";

    this.dot = new Image();
    this.dot.src = "/images/dots/dot.png";
    this.dot.style.border = "1px solid black";
    this.dot.style.borderRadius = "50%";

    this.powerDot0 = new Image();
    this.powerDot0.src = "/images/dots/power_0.png";
    this.powerDot0.style.border = "1px solid black";
    this.powerDot0.style.borderRadius = "50%";

    this.powerDot1 = new Image();
    this.powerDot1.src = "/images/dots/power_1.png";
    this.powerDot1.style.border = "1px solid black";
    this.powerDot1.style.borderRadius = "50%";

    this.powerDot = this.powerDot0;

    this.powerDotAnimationTimerDefault = 60;
    this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
  }
  // -1 - blank
  // 0 - dot
  // 1 - wall
  // 2 - power-dot
  // 3 - entry ghost lair
  // 4 - pacman
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
      1, 1, 1, 1, 1, 1, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
      0, 1, 1, 1, 1, 1, 1,
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

  draw(ctx, canvasWidth, canvasHeight) {
    let tileWidth = canvasWidth / this.map[0].length;
    let tileHeight = canvasHeight / this.map.length;

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
          this.#drawDot(ctx, column, row, tileWidth, tileHeight);
        } else if (tile === 1) {
          this.#drawWall(ctx, column, row, tileWidth, tileHeight);
        } else if (tile === 2) {
          this.#drawPowerDot(ctx, column, row, tileWidth, tileHeight);
        }
      }
    }
  }

  #drawWall(ctx, column, row, width, height) {
    ctx.drawImage(this.wall, column * width, row * height, width, height);
  }

  #drawDot(ctx, column, row, width, height) {
    ctx.drawImage(
      this.dot,
      column * width + width / 3,
      row * height + height / 3,
      width / 4,
      height / 4
    );
  }
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

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }
}
