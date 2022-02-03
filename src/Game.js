import TileMap from "/src/TileMap.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap();
function gameLoop() {
  tileMap.draw(ctx, canvas.width, canvas.height);
}

setInterval(gameLoop, 1000 / 75);
