class Magpie {
  static DOME_WIDTH = 20;
  static DOME_HEIGHT = 30;
  static PLATFORM_WIDTH = Magpie.DOME_WIDTH + 6;
  static PLATFORM_HEIGHT = 3;
  static BEAM_WIDTH = 50;
  static BEAM_HEIGHT = 60;
  static WINDOW_WIDTH = Magpie.DOME_WIDTH / 4;
  static WINDOW_HEIGHT = Magpie.DOME_HEIGHT / 4;
  static CARGO_Y = 40;

  physics;
  beam;
  capturedJunk;

  constructor() {
    this.physics = new Physics();
    this.beam = false;
    this.capturedJunk = null;
  }

  draw() {
    push();
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        // cargo first, so the ship is drawn on top of it
        if (this.capturedJunk) {
          push();
          rotate(this.physics.rotation);
          translate(0, Magpie.CARGO_Y);
          Junk.drawJunk();
          pop();
        }
        Magpie.drawMagpie({ rotation: this.physics.rotation, beam: this.beam });
        if (game.debug) {
          this.physics.draw();
        }
      },
    });
    pop();
  }

  captureJunk(junk) {
    this.capturedJunk = junk;
    this.enableBeam(false);
  }

  static drawMagpie({ rotation, beam }) {
    push();
    rotate(rotation);
    rectMode(CENTER);
    noStroke();

    if (beam) {
      fill("#f5f37040");
      triangle(
        0, 0,
        -Magpie.BEAM_WIDTH / 2, Magpie.BEAM_HEIGHT,
        Magpie.BEAM_WIDTH / 2, Magpie.BEAM_HEIGHT
      );
    }

    fill("#525c80");
    rect(0, 0, Magpie.DOME_WIDTH, Magpie.DOME_HEIGHT, 8);

    fill("#9aa3c2");
    rect(0, Magpie.DOME_HEIGHT / 2, Magpie.PLATFORM_WIDTH, Magpie.PLATFORM_HEIGHT);

    fill("#72f2f5");
    rect(
      Magpie.DOME_WIDTH / 2 - Magpie.WINDOW_WIDTH / 2,
      -Magpie.DOME_HEIGHT / 8,
      Magpie.WINDOW_WIDTH,
      Magpie.WINDOW_HEIGHT,
      2
    );
    pop();
  }

  move(delta) {
    this.physics.move(delta, { constrain: true });
    if (this.capturedJunk) {
      push();
      translate(this.physics.x, this.physics.y);
      rotate(this.physics.rotation);
      const cargo = worldToScreen(0, Magpie.CARGO_Y);
      pop();
      this.capturedJunk.physics.x = cargo.x;
      this.capturedJunk.physics.y = cargo.y;
    }
  }

  beamContains({ x, y }) {
    if (!this.beam) {
      return false;
    }
    let inside = false;
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        rotate(this.physics.rotation);
        const p = screenToWorld(x, y);
        const halfWidth = (p.y / Magpie.BEAM_HEIGHT) * (Magpie.BEAM_WIDTH / 2);
        const withinDepth = p.y >= 0 && p.y <= Magpie.BEAM_HEIGHT;
        if (withinDepth && Math.abs(p.x) <= halfWidth) {
          inside = true;
        }
      },
    });
    return inside;
  }

  enableBeam(v) {
    this.beam = v && this.capturedJunk === null;
  }
}