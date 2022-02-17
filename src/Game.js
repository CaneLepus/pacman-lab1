import TileMap from "/src/TileMap.js";

const velocity = 4;
const enemyVelocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(canvas.width, canvas.height);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(enemyVelocity);
let pause = false;

// the main game loop
function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx, pause, enemies);
  for (const enemy of enemies) {
    enemy.draw(ctx, pause);
  }
}
function gameOver() {
  pause = true;
}

// calls the game loop 75 times per second.
setInterval(gameLoop, 1000 / 75);
