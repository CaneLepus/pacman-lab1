import TileMap from "/src/TileMap.js";

const velocity = 4;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(canvas.width, canvas.height);
const pacman = tileMap.getPacman(velocity);
function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx);
}

setInterval(gameLoop, 1000 / 75);
