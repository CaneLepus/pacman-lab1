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

    this.imageIndex = [2, 0];

    this.#loadImages();
  }

  draw(ctx) {
    ctx.drawImage(
      this.images[this.imageIndex[0]][this.imageIndex[1]],
      this.x,
      this.y,
      this.tileWidth,
      this.tileHeight
    );
  }

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

    this.images = [
      [down_0, down_1, down_2],
      [left_0, left_1, left_2],
      [right_0, right_1, right_2],
      [up],
    ];
  }
}
