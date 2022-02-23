import TileMap from "/src/TileMap.js";
import Scorehandler from "/src/scoreHandler.js";


const velocity = 4;
const enemyVelocity = 2;
let loop;

let canvas;
let ctx;
let tileMap;
let pacman;
let enemies;
let startSound;

let startDiv;
let canvasDiv;
let gameOverDiv;
let highscoreDiv;
let scoreHandler;

let pause = false;

window.onload = function () {
  startDiv = document.getElementById("start");
  canvasDiv = document.getElementById("gameCanvas");
  gameOverDiv = document.getElementById("gameOver");
  highscoreDiv = document.getElementById("highscore");
  let startButton = document.getElementById("startButton");
  let restartButton = document.getElementById("restartButton");
  let highscoreButton = document.getElementById("highscoreButton");
  let startMenuButton = document.getElementById("startMenuButton");
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
  highscoreButton.addEventListener("click", highscores);
  startMenuButton.addEventListener("click", startMenu);
  startDiv.style.display = "block";
  canvasDiv.style.display = "none";
  gameOverDiv.style.display = "none";
  scoreHandler = new Scorehandler();
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
  scoreHandler.saveScore(pacman.score);
  startDiv.style.display = "none";
  canvasDiv.style.display = "none";
  gameOverDiv.style.display = "block";
  highscoreDiv.style.display = "none";
  clearInterval(loop);
}

function startGame() {
  init();
  startSound.play();
  startDiv.style.display = "none";
  canvasDiv.style.display = "block";
  gameOverDiv.style.display = "none";
  highscoreDiv.style.display = "none";
  // calls the game loop 75 times per second.
  loop = setInterval(gameLoop, 1000 / 75);
}

function highscores(){
  scoreHandler.printScores();
  startDiv.style.display = "none";
  canvasDiv.style.display = "none";
  gameOverDiv.style.display = "none";
  highscoreDiv.style.display = "block";
}
function startMenu(){
  startDiv.style.display = "block";
  canvasDiv.style.display = "none";
  gameOverDiv.style.display = "none";
  highscoreDiv.style.display = "none";
}
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  tileMap = new TileMap(canvas.width, canvas.height);
  pacman = tileMap.getPacman(velocity);
  enemies = tileMap.getEnemies(enemyVelocity);
  startSound = new Audio("/sounds/pacman_beginning.wav");
  scoreHandler.setName(document.getElementById("pname").value);
}
