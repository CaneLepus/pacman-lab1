import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";

export default class Blinky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    super.loadImages("blinky");
  }
  draw(ctx) {
    this.move();
    this.animate();
    super.draw(ctx);
  }
  move() {
    if (
      Number.isInteger(this.x / this.tileWidth) &&
      Number.isInteger(this.y / this.tileHeight)
    ) {
      if (this.moves === false || this.moves.length === 0) {
        this.getPath();
      } else {
        this.movingDirection = this.moves.shift();
      }
    }
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    )
      super.move();
  }
  getPath() {
    if (
      Number.isInteger(this.pacman.x / this.tileWidth) &&
      Number.isInteger(this.pacman.y / this.tileHeight)
    ) {
      let start = [this.x / this.tileWidth, this.y / this.tileHeight];
      this.goal = [
        this.pacman.x / this.tileWidth,
        this.pacman.y / this.tileHeight,
      ];
      let grid = JSON.parse(JSON.stringify(this.tileMap.map));
      this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
    }
  }
}
