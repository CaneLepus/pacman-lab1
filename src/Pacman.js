import MovingDirection from "/src/MovingDirection.js";
import State from "/src/State.js";

export default class Pacman {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.defaultAnimationTimer = 10;
    this.animationTimer = null;

    this.chompSound = new Audio("/sounds/pacman_chomp.wav");
    this.powerDotSound = new Audio("/sounds/pacman_eatfruit.wav");
    this.eatGhost = new Audio("/sounds/pacman_eatGhost.wav");
    this.deathSound = new Audio("/sounds/pacman_death.wav");
    this.powerDotActive = false;
    this.powerDotAboutToExpire = false;
    this.powerTimers = [];
    this.damageTaken = 0;
    this.lives = 3;

    this.imageIndex = [2, 0, 0];

    document.addEventListener("keydown", this.#keydown);

    this.#loadImages();
  }

  draw(ctx, pause, enemies) {
    if (!pause) {
      if (this.lives > 0) {
        this.#move();
        this.#takeDamage(enemies);
      }
      this.#animate();
    }
    this.#eatDot();
    this.#eatPowerDot();
    this.#eatGhost(enemies);
    if (this.imageIndex[2] === 0) {
      ctx.drawImage(
        this.images[this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else if (this.imageIndex[2] === 1) {
      ctx.drawImage(
        this.damageImages[this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else {
      ctx.drawImage(
        this.deathImages[this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    }
  }
  // updates coordinates for where the player should get drawn to the canvas
  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileWidth) &&
        Number.isInteger(this.y / this.tileHeight)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        ) {
          this.currentMovingDirection = this.requestedMovingDirection;
        }
      }
    }
    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      this.animationTimer = null;
      this.imageIndex[0] = this.currentMovingDirection;
      this.imageIndex[1] = 0;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.animationTimer == null
    ) {
      this.animationTimer = this.defaultAnimationTimer;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.imageIndex[0] = MovingDirection.up;
        this.imageIndex[1] = 0;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.imageIndex[0] = MovingDirection.down;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        this.imageIndex[0] = MovingDirection.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.imageIndex[0] = MovingDirection.right;
        break;
    }
  }

  // loops through all images of the player according to the direction he is moving
  // this creates the animated effect of the player eating his way forward.
  #animate() {
    if (this.animationTimer == null) {
      return;
    }
    this.animationTimer--;
    if (this.animationTimer === 0) {
      this.animationTimer = this.defaultAnimationTimer;
      if (this.damageTaken > 0 && this.imageIndex[2] !== 2) {
        this.damageTaken--;
        if (this.imageIndex[2] === 1) {
          this.imageIndex[2] = 0;
        } else {
          this.imageIndex[2] = 1;
        }
      } else if (this.imageIndex[2] === 1) {
        this.imageIndex[2] = 0;
      }
      if (this.lives > 0) {
        this.imageIndex[1]++;
        if (this.imageIndex[1] === this.images[this.imageIndex[0]].length) {
          this.imageIndex[1] = 0;
        }
      } else {
        this.imageIndex[1]++;
        if (this.imageIndex[1] === this.deathImages.length) {
          this.imageIndex[1] = 0;
        }
      }
    }
  }
  // loads the images of the player and saves them to a 2 dimensional list.
  #loadImages() {
    const down_0 = new Image();
    down_0.src = "/images/pacman/down_0.png";

    const down_1 = new Image();
    down_1.src = "/images/pacman/down_1.png";

    const down_2 = new Image();
    down_2.src = "/images/pacman/down_2.png";

    const left_0 = new Image();
    left_0.src = "/images/pacman/left_0.png";

    const left_1 = new Image();
    left_1.src = "/images/pacman/left_1.png";

    const left_2 = new Image();
    left_2.src = "/images/pacman/left_2.png";

    const right_0 = new Image();
    right_0.src = "/images/pacman/right_0.png";

    const right_1 = new Image();
    right_1.src = "/images/pacman/right_1.png";

    const right_2 = new Image();
    right_2.src = "/images/pacman/right_2.png";

    const up = new Image();
    up.src = "/images/pacman/up.png";

    const damage_down_0 = new Image();
    damage_down_0.src = "/images/pacman_damage/down_0.png";

    const damage_down_1 = new Image();
    damage_down_1.src = "/images/pacman_damage/down_1.png";

    const damage_down_2 = new Image();
    damage_down_2.src = "/images/pacman_damage/down_2.png";

    const damage_left_0 = new Image();
    damage_left_0.src = "/images/pacman_damage/left_0.png";

    const damage_left_1 = new Image();
    damage_left_1.src = "/images/pacman_damage/left_1.png";

    const damage_left_2 = new Image();
    damage_left_2.src = "/images/pacman_damage/left_2.png";

    const damage_right_0 = new Image();
    damage_right_0.src = "/images/pacman_damage/right_0.png";

    const damage_right_1 = new Image();
    damage_right_1.src = "/images/pacman_damage/right_1.png";

    const damage_right_2 = new Image();
    damage_right_2.src = "/images/pacman_damage/right_2.png";

    const damage_up = new Image();
    damage_up.src = "/images/pacman_damage/up.png";

    const death_1 = new Image();
    death_1.src = "/images/death_animation/1.png";

    const death_2 = new Image();
    death_2.src = "/images/death_animation/2.png";

    const death_3 = new Image();
    death_3.src = "/images/death_animation/3.png";

    const death_4 = new Image();
    death_4.src = "/images/death_animation/4.png";

    const death_5 = new Image();
    death_5.src = "/images/death_animation/5.png";

    const death_6 = new Image();
    death_6.src = "/images/death_animation/6.png";

    const death_7 = new Image();
    death_7.src = "/images/death_animation/7.png";

    const death_8 = new Image();
    death_8.src = "/images/death_animation/8.png";

    const death_9 = new Image();
    death_9.src = "/images/death_animation/9.png";

    const death_10 = new Image();
    death_10.src = "/images/death_animation/10.png";

    const death_11 = new Image();
    death_11.src = "/images/death_animation/11.png";

    this.images = [
      [down_0, down_1, down_2],
      [left_0, left_1, left_2],
      [right_0, right_1, right_2],
      [up],
    ];
    this.damageImages = [
      [damage_down_0, damage_down_1, damage_down_2],
      [damage_left_0, damage_left_1, damage_left_2],
      [damage_right_0, damage_right_1, damage_right_2],
      [damage_up],
    ];

    this.deathImages = [
      death_1,
      death_2,
      death_3,
      death_4,
      death_5,
      death_6,
      death_7,
      death_8,
      death_9,
      death_10,
      death_11,
    ];
  }

  // used to listen for the pressing of a directional key.
  #keydown = () => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down) {
        this.currentMovingDirection = MovingDirection.up;
      }
      this.requestedMovingDirection = MovingDirection.up;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up) {
        this.currentMovingDirection = MovingDirection.down;
      }
      this.requestedMovingDirection = MovingDirection.down;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right) {
        this.currentMovingDirection = MovingDirection.left;
      }
      this.requestedMovingDirection = MovingDirection.left;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left) {
        this.currentMovingDirection = MovingDirection.right;
      }
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  // checks if player eats a dot and if so plays sound.
  #eatDot() {
    if (this.tileMap.eatDot(this.x, this.y)) {
      this.chompSound.play();
    }
  }
  // checks if player eats a power-dot and if so
  //plays sound and starts timer for when the effect expires.
  #eatPowerDot() {
    if (this.tileMap.eatPowerDot(this.x, this.y)) {
      this.powerDotSound.play();
      this.powerDotActive = true;
      this.powerDotAboutToExpire = false;
      this.powerTimers.forEach((timer) => clearTimeout(timer));
      this.powerTimers = [];

      let powerDotTimer = setTimeout(() => {
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
      }, 1000 * 6);

      this.powerTimers.push(powerDotTimer);

      let powerDotAboutToExpireTimer = setTimeout(() => {
        this.powerDotAboutToExpire = true;
      }, 1000 * 3);

      this.powerTimers.push(powerDotAboutToExpireTimer);
    }
  }

  #eatGhost(enemies) {
    if (this.powerDotActive) {
      const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
      collideEnemies.forEach((enemy) => {
        enemy.state = State.dead;
        this.eatGhost.play();
      });
    }
  }
  #takeDamage(enemies) {
    if (!this.powerDotActive && this.damageTaken === 0) {
      const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));

      collideEnemies.forEach((enemy) => {
        this.lives--;
        this.imageIndex[2] = 1;
        this.damageTaken = 6;
        if (this.lives === 0) {
          this.deathSound.play();
          this.imageIndex[2] = 2;
          this.imageIndex[1] = 0;
        }
      });
    }
  }
}
