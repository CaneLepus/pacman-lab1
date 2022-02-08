import Enemy from "/src/Enemies/Enemy.js";

export default class Blinky extends Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap) {
    super(x, y, tileWidth, tileHeight, velocity, tileMap);

    super.loadImages("blinky");
  }
}
