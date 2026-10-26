class Physics {
  x;
  y;
  dx;
  dy;
  rotation;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.rotation = 0;
  }

  draw() {
    push();
    noFill();
    stroke("#ffffff");
    strokeWeight(1);
    circle(0, 0, 10);
    const v = createVector(this.dx, this.dy);
    const future = v.copy().mult(0.5);
    line(0, 0, future.x, future.y);
    strokeWeight(2);
    const dir = v.copy().setMag(10);
    line(0, 0, dir.x, dir.y);
    pop();
  }

  move(delta, { constrain = false } = {}) {
    const seconds = delta / 1000;
    this.x += this.dx * seconds;
    this.y += this.dy * seconds;

    if (constrain) {
      while (this.x < 0) this.x += width;
      while (this.y < 0) this.y += height;
      while (this.x >= width) this.x -= width;
      while (this.y >= height) this.y -= height;
    }
  }

  rotate(rate, delta) {
    this.rotation += rate * (delta / 1000);
  }

  thrust(accel, delta) {
    const amt = accel * (delta / 1000);
    this.dx += amt * Math.sin(this.rotation);
    this.dy -= amt * Math.cos(this.rotation);
  }
}