import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";

export default class Blinky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    super.loadImages("blinky");
  }
  draw(ctx, pause) {
    if (!pause) {
      this.move();
      this.animate();
    }
    super.draw(ctx);
  }
  move() {
    // if blinky is entirely inside a tile
    if (
      Number.isInteger(this.x / this.tileWidth) &&
      Number.isInteger(this.y / this.tileHeight)
    ) {
      // if there are no future moves in the moves list.
      if (!(this.pacman.x === this.x && this.pacman.y === this.y)) {
        this.getPath();
        // if there are future moves in the moves list
        this.movingDirection = this.moves.shift();
      }
    }
    // if blinky wont collide with a wall by moving in decided direction.
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    )
      super.move();
  }
  // method that fetches an array of future moves that leads blinky to pacmans current position
  getPath() {
    // if pacman is entirely inside a tile
    if (
      Number.isInteger(this.pacman.x / this.tileWidth) &&
      Number.isInteger(this.pacman.y / this.tileHeight)
    ) {
      // set start and goal coordinates
      let start = [this.x / this.tileWidth, this.y / this.tileHeight];
      this.goal = [
        this.pacman.x / this.tileWidth,
        this.pacman.y / this.tileHeight,
      ];
      // create a copy of the gameboard grid
      let grid = JSON.parse(JSON.stringify(this.tileMap.map));

      // populate the moves list with moves
      this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
    }
  }
}
