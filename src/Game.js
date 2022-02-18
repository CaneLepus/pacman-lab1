import TileMap from "/src/TileMap.js";

const velocity = 4;
const enemyVelocity = 2;
let loop;

let canvas;
let ctx;
let tileMap;
let pacman;
let enemies;
let startSound;

let pause = false;
let player = "";

window.onload = function () {
  let start = document.getElementById("start");
  let canvas = document.getElementById("gameCanvas");
  let gameOver = document.getElementById("gameOver");
  let startButton = document.getElementById("startButton");
  let restartButton = document.getElementById("restartButton");
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
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
  } else {
    gameOver();
  }
  for (const enemy of enemies) {
    enemy.draw(ctx, pause);
  }
}
function gameOver() {
  let start = document.getElementById("start");
  let canvas = document.getElementById("gameCanvas");
  let gameOver = document.getElementById("gameOver");
  start.style.display = "none";
  canvas.style.display = "none";
  gameOver.style.display = "block";
  clearInterval(loop);
}

function startGame() {
  init();
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
  loop = setInterval(gameLoop, 1000 / 75);
}
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  tileMap = new TileMap(canvas.width, canvas.height);
  pacman = tileMap.getPacman(velocity);
  enemies = tileMap.getEnemies(enemyVelocity);
  startSound = new Audio("/sounds/pacman_beginning.wav");
}
