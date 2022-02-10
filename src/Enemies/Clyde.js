import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";

export default class Clyde extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    this.scatterGoal = [1, 31];
    super.loadImages("clyde");
  }
  draw(ctx) {
    this.move();
    this.animate();
    super.draw(ctx);
  }

  move() {
    // if clyde is entirely inside a tile
    if (
      Number.isInteger(this.x / this.tileWidth) &&
      Number.isInteger(this.y / this.tileHeight)
    ) {
      this.getPath();
      // if the goal tile isnt the current
      if (
        !(
          this.goal[0] === this.x / this.tileWidth &&
          this.goal[1] === this.y / this.tileHeight
        )
      ) {
        this.movingDirection = this.moves.shift();
      }
    }
    // if clyde wont collide with a wall by moving in decided direction.
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
    // if pacman is entirely inside a tile
    if (
      Number.isInteger(this.pacman.x / this.tileWidth) &&
      Number.isInteger(this.pacman.y / this.tileHeight)
    ) {
      // set start and goal coordinates
      let start = [this.x / this.tileWidth, this.y / this.tileHeight];
      this.setTargetTile();
      // create a copy of the gameboard grid
      let grid = JSON.parse(JSON.stringify(this.tileMap.map));

      // populate the moves list with moves
      this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
    }
  }
  // method for deciding target tile based on rules for clydes movement.
  setTargetTile() {
    let diffX = this.pacman.x / this.tileWidth - this.x / this.tileWidth;
    let diffY = this.pacman.y / this.tileHeight - this.y / this.tileHeight;
    if (diffX > 8 || diffX < -8 || diffY > 8 || diffY < -8) {
      this.goal = [
        this.pacman.x / this.tileWidth,
        this.pacman.y / this.tileHeight,
      ];
    } else {
      this.goal = this.scatterGoal;
    }
  }
}
