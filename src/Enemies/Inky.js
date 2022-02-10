import Enemy from "/src/Enemies/Enemy.js";
import PathFinding from "/src/PathFinding.js";
import MovingDirection from "/src/MovingDirection.js";

export default class Inky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman, blinky) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap, pacman);
    this.moves = false;
    this.goal = [];
    this.blinky = blinky;
    super.loadImages("inky");
  }
  draw(ctx) {
    this.move();
    this.animate();
    super.draw(ctx);
  }

  move() {
    // if inky is entirely inside a tile
    if (
      Number.isInteger(this.x / this.tileWidth) &&
      Number.isInteger(this.y / this.tileHeight)
    ) {
      this.getPath();
      // if the target tile is not the same as current
      if (
        !(
          this.goal[0] === this.x / this.tileWidth &&
          this.goal[1] === this.y / this.tileHeight
        )
      ) {
        this.movingDirection = this.moves.shift();
      }
    }
    // if inky wont collide with a wall by moving in decided direction.
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    )
      super.move();
  }
  // method for retrieving the shortest path to inkys target tile
  getPath() {
    // set start and goal coordinates
    let start = [this.x / this.tileWidth, this.y / this.tileHeight];
    this.goal = this.getTargetCoordinates();
    // create a copy of the gameboard grid
    let grid = JSON.parse(JSON.stringify(this.tileMap.map));

    // populate the moves list with moves
    this.moves = PathFinding(start, this.goal, grid, this.movingDirection);
  }
  // method that determines the target tile based on rules for inkys movement
  getTargetCoordinates() {
    let goalX = 0;
    let goalY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let blinkyDiffX = 0;
    let blinkyDiffY = 0;
    // if pacman is facing right
    if (this.pacman.imageIndex[0] === MovingDirection.right) {
      offsetX = Math.round(this.pacman.x / this.tileWidth + 2);
      offsetY = Math.round(this.pacman.y / this.tileHeight);
      blinkyDiffX = offsetX - Math.round(this.blinky.x / this.tileWidth);
      blinkyDiffY = offsetY - Math.round(this.blinky.y / this.tileHeight);

      goalX = offsetX + blinkyDiffX;
      goalY = offsetY + blinkyDiffY;

      this.goal = this.setInBound(goalX, goalY);

      goalX = this.goal[0];
      goalY = this.goal[1];

      console.log(goalX + ", " + goalY);
      this.goal = this.findValid(goalX, goalY, blinkyDiffX + 2, blinkyDiffY);

      goalX = this.goal[0];
      goalY = this.goal[1];
      // if pacman is facing left
    } else if (this.pacman.imageIndex[0] === MovingDirection.left) {
      offsetX = Math.round(this.pacman.x / this.tileWidth - 2);
      offsetY = Math.round(this.pacman.y / this.tileHeight);

      blinkyDiffX = offsetX - Math.round(this.blinky.x / this.tileWidth);
      blinkyDiffY = offsetY - Math.round(this.blinky.y / this.tileHeight);

      goalX = offsetX + blinkyDiffX;
      goalY = offsetY + blinkyDiffY;

      this.goal = this.setInBound(goalX, goalY);

      goalX = this.goal[0];
      goalY = this.goal[1];

      console.log(goalX + ", " + goalY);
      this.goal = this.findValid(goalX, goalY, blinkyDiffX - 2, blinkyDiffY);

      goalX = this.goal[0];
      goalY = this.goal[1];
      // if pacman is facing up
    } else if (this.pacman.imageIndex[0] === MovingDirection.up) {
      offsetX = Math.round(this.pacman.x / this.tileWidth);
      offsetY = Math.round(this.pacman.y / this.tileHeight - 2);

      blinkyDiffX = offsetX - Math.round(this.blinky.x / this.tileWidth);
      blinkyDiffY = offsetY - Math.round(this.blinky.y / this.tileHeight);

      goalX = offsetX + blinkyDiffX;
      goalY = offsetY + blinkyDiffY;
      this.goal = this.setInBound(goalX, goalY);

      goalX = this.goal[0];
      goalY = this.goal[1];

      console.log(goalX + ", " + goalY);
      this.goal = this.findValid(goalX, goalY, blinkyDiffX, blinkyDiffY - 2);

      goalX = this.goal[0];
      goalY = this.goal[1];
      // if pacman is facing down
    } else if (this.pacman.imageIndex[0] === MovingDirection.down) {
      offsetX = Math.round(this.pacman.x / this.tileWidth);
      offsetY = Math.round(this.pacman.y / this.tileHeight + 2);

      blinkyDiffX = offsetX - Math.round(this.blinky.x / this.tileWidth);
      blinkyDiffY = offsetY - Math.round(this.blinky.y / this.tileHeight);

      goalX = offsetX + blinkyDiffX;
      goalY = offsetY + blinkyDiffY;
      this.goal = this.setInBound(goalX, goalY);
      goalX = this.goal[0];
      goalY = this.goal[1];

      console.log(goalX + ", " + goalY);
      this.goal = this.findValid(goalX, goalY, blinkyDiffX, blinkyDiffY + 2);

      goalX = this.goal[0];
      goalY = this.goal[1];
    }
    return [goalX, goalY];
  }

  // method that ensures the target is within the canvas
  setInBound(goalX, goalY) {
    if (goalX < 0) {
      goalX = 0;
    } else if (goalX >= this.tileMap.map[0].length) {
      goalX = this.tileMap.map[0].length - 1;
    }
    if (goalY < 0) {
      goalY = 0;
    } else if (goalY >= this.tileMap.map.length) {
      goalY = this.tileMap.map.length - 1;
    }
    return [goalX, goalY];
  }

  // method that ensures that the target tile is accessible (not a wall or black space outside the maze)
  findValid(goalX, goalY, blinkyDiffX, blinkyDiffY) {
    while (
      this.tileMap.map[goalY][goalX] === 1 ||
      this.tileMap.map[goalY][goalX] === undefined ||
      this.tileMap.map[goalY][goalX] === -2
    ) {
      if (blinkyDiffX > 0) {
        goalX--;
        blinkyDiffX--;
      } else if (blinkyDiffX !== 0) {
        goalX++;
        blinkyDiffX++;
      }

      if (blinkyDiffY > 0) {
        goalY--;
        blinkyDiffY--;
      } else if (blinkyDiffY !== 0) {
        goalY++;
        blinkyDiffY++;
      }
    }
    return [goalX, goalY];
  }
}
