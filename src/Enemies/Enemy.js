import MovingDirection from "/src/MovingDirection.js";
import State from "/src/State.js";

export default class Enemy {
  constructor(x, y, tileWidth, tileHeight, velocity, tileMap, pacman) {
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.movingDirection = null;

    this.defaultAnimationTimer = 10;
    this.animationTimer = null;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;

    this.timers = [];

    this.imageIndex = [2, 0, 0];
    this.deadGoal = [13, 17];
    this.pacman = pacman;
    this.state = State.normal;
  }
  draw(ctx) {
    this.#setState(this.pacman);
    if (this.imageIndex[2] === State.normal) {
      ctx.drawImage(
        this.images[this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else if (this.imageIndex[2] === State.angry) {
      ctx.drawImage(
        this.angryImages[this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else if (this.imageIndex[2] === State.dead) {
      ctx.drawImage(
        this.eyeImages[this.imageIndex[0]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else if (this.imageIndex[2] === State.scared) {
      ctx.drawImage(
        this.scaredImages[0][this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    } else {
      ctx.drawImage(
        this.scaredImages[1][this.imageIndex[0]][this.imageIndex[1]],
        this.x,
        this.y,
        this.tileWidth,
        this.tileHeight
      );
    }
  }

  collideWith(pacman) {
    const sizeX = this.tileWidth / 2;
    const sizeY = this.tileHeight / 2;
    if (
      this.x < pacman.x + sizeX &&
      this.x + sizeX > pacman.x &&
      this.y < pacman.y + sizeY &&
      this.y + sizeY > pacman.y
    ) {
      return true;
    }
    return false;
  }

  loadImages(imageFolder) {
    const down_0 = new Image();
    down_0.src = `/images/${imageFolder}/down_0.png`;

    const down_1 = new Image();
    down_1.src = `/images/${imageFolder}/down_1.png`;

    const left_0 = new Image();
    left_0.src = `/images/${imageFolder}/left_0.png`;

    const left_1 = new Image();
    left_1.src = `/images/${imageFolder}/left_1.png`;

    const right_0 = new Image();
    right_0.src = `/images/${imageFolder}/right_0.png`;

    const right_1 = new Image();
    right_1.src = `/images/${imageFolder}/right_1.png`;

    const up_0 = new Image();
    up_0.src = `/images/${imageFolder}/up_0.png`;

    const up_1 = new Image();
    up_1.src = `/images/${imageFolder}/up_1.png`;

    const angry_down_0 = new Image();
    angry_down_0.src = `/images/${imageFolder}/angry_down_0.png`;

    const angry_down_1 = new Image();
    angry_down_1.src = `/images/${imageFolder}/angry_down_1.png`;

    const angry_left_0 = new Image();
    angry_left_0.src = `/images/${imageFolder}/angry_left_0.png`;

    const angry_left_1 = new Image();
    angry_left_1.src = `/images/${imageFolder}/angry_left_1.png`;

    const angry_right_0 = new Image();
    angry_right_0.src = `/images/${imageFolder}/angry_right_0.png`;

    const angry_right_1 = new Image();
    angry_right_1.src = `/images/${imageFolder}/angry_right_1.png`;

    const eyes_down = new Image();
    eyes_down.src = `/images/ghost_eyes/down.png`;

    const eyes_left = new Image();
    eyes_left.src = `/images/ghost_eyes/left.png`;

    const eyes_right = new Image();
    eyes_right.src = `/images/ghost_eyes/right.png`;

    const eyes_up = new Image();
    eyes_up.src = `/images/ghost_eyes/up.png`;

    const scared_down_0 = new Image();
    scared_down_0.src = `/images/scared_ghost/down_0.png`;

    const scared_down_1 = new Image();
    scared_down_1.src = `/images/scared_ghost/down_1.png`;

    const scared_left_0 = new Image();
    scared_left_0.src = `/images/scared_ghost/left_0.png`;

    const scared_left_1 = new Image();
    scared_left_1.src = `/images/scared_ghost/left_1.png`;

    const scared_right_0 = new Image();
    scared_right_0.src = `/images/scared_ghost/right_0.png`;

    const scared_right_1 = new Image();
    scared_right_1.src = `/images/scared_ghost/right_1.png`;

    const scared_up_0 = new Image();
    scared_up_0.src = `/images/scared_ghost/up_0.png`;

    const scared_up_1 = new Image();
    scared_up_1.src = `/images/scared_ghost/up_1.png`;

    const end_scared_down_0 = new Image();
    end_scared_down_0.src = `/images/scared_ghost/end_down_0.png`;

    const end_scared_down_1 = new Image();
    end_scared_down_1.src = `/images/scared_ghost/end_down_1.png`;

    const end_scared_left_0 = new Image();
    end_scared_left_0.src = `/images/scared_ghost/end_left_0.png`;

    const end_scared_left_1 = new Image();
    end_scared_left_1.src = `/images/scared_ghost/end_left_1.png`;

    const end_scared_right_0 = new Image();
    end_scared_right_0.src = `/images/scared_ghost/end_right_0.png`;

    const end_scared_right_1 = new Image();
    end_scared_right_1.src = `/images/scared_ghost/end_right_1.png`;

    const end_scared_up_0 = new Image();
    end_scared_up_0.src = `/images/scared_ghost/end_up_0.png`;

    const end_scared_up_1 = new Image();
    end_scared_up_1.src = `/images/scared_ghost/end_up_1.png`;

    this.images = [
      [down_0, down_1],
      [left_0, left_1],
      [right_0, right_1],
      [up_0, up_1],
    ];
    this.angryImages = [
      [angry_down_0, angry_down_1],
      [angry_left_0, angry_left_1],
      [angry_right_0, angry_right_1],
      [up_0, up_1],
    ];
    this.eyeImages = [eyes_down, eyes_left, eyes_right, eyes_up];

    this.scaredImages = [
      [
        [scared_down_0, scared_down_1],
        [scared_left_0, scared_left_1],
        [scared_right_0, scared_right_1],
        [scared_up_0, scared_up_1],
      ],
      [
        [end_scared_down_0, end_scared_down_1],
        [end_scared_left_0, end_scared_left_1],
        [end_scared_right_0, end_scared_right_1],
        [end_scared_up_0, end_scared_up_1],
      ],
    ];
  }

  animate() {
    if (this.animationTimer === null) {
      return;
    }
    this.animationTimer--;
    if (this.animationTimer === 0) {
      this.animationTimer = this.defaultAnimationTimer;
      if (!(this.imageIndex[2] === State.dead)) {
        this.imageIndex[1]++;
        if (this.imageIndex[1] == this.images[this.imageIndex[0]].length) {
          this.imageIndex[1] = 0;
        }
      }
    }
  }

  move() {
    if (this.movingDirection != null && this.animationTimer == null) {
      this.animationTimer = this.defaultAnimationTimer;
    }

    switch (this.movingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.imageIndex[0] = MovingDirection.up;
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

  #setState(pacman) {
    if (pacman.powerDotActive && this.state !== State.dead) {
      this.state = State.scared;
      this.#isPowerDotAboutToExpire(pacman);
    } else if (this.state === State.angry) {
      this.imageIndex[2] = State.angry;
    } else if (this.state === State.dead) {
      this.imageIndex[2] = State.dead;
      if (
        this.x / this.tileWidth === this.deadGoal[0] &&
        this.y / this.tileHeight === this.deadGoal[1]
      ) {
        this.state = State.normal;
      }
    } else {
      this.state = State.normal;
      this.imageIndex[2] = State.normal;
    }
  }

  #isPowerDotAboutToExpire(pacman) {
    if (pacman.powerDotAboutToExpire) {
      this.scaredAboutToExpireTimer--;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        if (this.imageIndex[2] === State.scared) {
          this.imageIndex[2] = State.end_scared;
        } else {
          this.imageIndex[2] = State.scared;
        }
      }
    } else {
      this.imageIndex[2] = State.scared;
    }
  }
}
