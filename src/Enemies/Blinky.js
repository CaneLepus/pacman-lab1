import State from "/src/State.js";
import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";

export default class Blinky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, settings, tileMap, pacman) {
    super(x, y, tileWidth, tileHeight, settings, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    super.loadImages("blinky");
    this.scatterGoal = [26, 4];
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
      this.getPath();
      // if there are future moves in the moves list.
      if (
        !(
          this.goal[0] === this.x / this.tileWidth &&
          this.goal[1] === this.y / this.tileHeight
        )
      ) {
        this.movingDirection = this.moves.shift();
        console.log(this.movingDirection);
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
      Number.isInteger(this.pacman.y / this.tileHeight) || !this.moves
    ) {
      // set start and goal coordinates
      let start = [this.x / this.tileWidth, this.y / this.tileHeight];
      this.#setGoal();
      // create a copy of the gameboard grid
      let grid = JSON.parse(JSON.stringify(this.tileMap.map));

      // populate the moves list with moves
      this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
    }
  }
  #setGoal() {
    if (this.state === State.dead) {
      this.goal = this.deadGoal;
    } else if (this.state === State.scared) {
      this.goal = this.scatterGoal;
    } else {
      this.goal = [
        this.pacman.x / this.tileWidth,
        this.pacman.y / this.tileHeight,
      ];
    }
  }
}
