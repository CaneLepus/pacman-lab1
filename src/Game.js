import TileMap from "/src/TileMap.js";

const velocity = 4;
const enemyVelocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(canvas.width, canvas.height);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(enemyVelocity);
const startSound = new Audio("/sounds/pacman_beginning.wav");
let pause = false;
let player = "";

window.onload = function () {
  let start = document.getElementById("start");
  let canvas = document.getElementById("gameCanvas");
  let gameOver = document.getElementById("gameOver");
  let startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);
  start.style.display = "block";
  canvas.style.display = "none";
  gameOver.style.display = "none";
};

// the main game loop
function gameLoop() {
  tileMap.draw(ctx);
  if (
    !(
      pacman.imageIndex[2] === 2 &&
      pacman.imageIndex[1] === pacman.deathImages.length - 1
    )
  ) {
    pacman.draw(ctx, pause, enemies);
  }
  for (const enemy of enemies) {
    enemy.draw(ctx, pause);
  }
}
function gameOver() {
  pause = true;
}

function startGame() {
  startSound.play();
  let start = document.getElementById("start");
  let canvas = document.getElementById("gameCanvas");
  let gameOver = document.getElementById("gameOver");
  player = document.getElementById("pname").value;
  console.log(player);
  start.style.display = "none";
  canvas.style.display = "block";
  gameOver.style.display = "none";
  // calls the game loop 75 times per second.
  setInterval(gameLoop, 1000 / 75);
}
