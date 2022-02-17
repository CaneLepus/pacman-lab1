import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";
import MovingDirection from "/src/MovingDirection.js";
import State from "/src/State.js";

export default class Pinky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    this.scatterGoal = [1, 4];
    super.loadImages("pinky");
  }
  draw(ctx, pause) {
    if (!pause) {
      this.move();
      this.animate();
    }
    super.draw(ctx);
  }

  move() {
    // if pinky is entirely inside a tile

    if (
      Number.isInteger(this.x / this.tileWidth) &&
      Number.isInteger(this.y / this.tileHeight)
    ) {
      this.getPath();
      // if the target tile is not the current
      if (
        !(
          this.goal[0] === this.x / this.tileWidth &&
          this.goal[1] === this.y / this.tileHeight
        )
      ) {
        this.movingDirection = this.moves.shift();
      }
    }
    // if pinky wont collide with a wall by moving in decided direction.
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    )
      super.move();
  }
  // method for retrieving the shortest path to pinkys target tile
  getPath() {
    // set start and goal coordinates
    let start = [this.x / this.tileWidth, this.y / this.tileHeight];
    this.setGoal();
    // create a copy of the gameboard grid
    let grid = JSON.parse(JSON.stringify(this.tileMap.map));

    // populate the moves list with moves
    this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
  }

  // method that determines the target tile based on rules for pinkys movement
  setGoal() {
    if (this.state === State.dead) {
      this.goal = this.deadGoal;
    } else if (this.state === State.scared) {
      this.goal = this.scatterGoal;
    } else {
      let goalX = 0;
      let goalY = 0;
      if (this.pacman.imageIndex[0] === MovingDirection.right) {
        goalX = Math.round(this.pacman.x / this.tileWidth + 4);
        goalY = Math.round(this.pacman.y / this.tileHeight);
        while (
          this.tileMap.map[goalY][goalX] === 1 ||
          this.tileMap.map[goalY][goalX] === undefined
        ) {
          goalX--;
        }
      } else if (this.pacman.imageIndex[0] === MovingDirection.left) {
        goalX = Math.round(this.pacman.x / this.tileWidth - 4);
        goalY = Math.round(this.pacman.y / this.tileHeight);
        while (
          this.tileMap.map[goalY][goalX] === 1 ||
          this.tileMap.map[goalY][goalX] === undefined
        ) {
          goalX++;
        }
      } else if (this.pacman.imageIndex[0] === MovingDirection.up) {
        goalX = Math.round(this.pacman.x / this.tileWidth);
        goalY = Math.round(this.pacman.y / this.tileHeight - 4);
        if (goalY < 0) {
          goalY = 0;
        }
        while (
          this.tileMap.map[goalY][goalX] === 1 ||
          this.tileMap.map[goalY][goalX] === undefined ||
          this.tileMap.map[goalY][goalX] === -2
        ) {
          goalY++;
        }
      } else if (this.pacman.imageIndex[0] === MovingDirection.down) {
        goalX = Math.round(this.pacman.x / this.tileWidth);
        goalY = Math.round(this.pacman.y / this.tileHeight + 4);
        if (goalY >= this.tileMap.map.length) {
          goalY = this.tileMap.map.length - 1;
        }

        while (
          this.tileMap.map[goalY][goalX] === 1 ||
          this.tileMap.map[goalY][goalX] === undefined ||
          this.tileMap.map[goalY][goalX] === -2
        ) {
          goalY--;
        }
      }
      this.goal = [goalX, goalY];
    }
  }
}
