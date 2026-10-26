class Inputs {
  static THRUST = 360;
  static REVERSE_THRUST = 180;
  static TURN_RATE = 2.4;

  magpie;

  constructor(magpie) {
    this.magpie = magpie;
  }

  handleKeyDown(delta) {
    if (keyIsDown("w")) {
      this.magpie.physics.thrust(Inputs.THRUST, delta);
    }
    if (keyIsDown("s")) {
      this.magpie.physics.thrust(-Inputs.REVERSE_THRUST, delta);
    }
    if (keyIsDown("a")) {
      this.magpie.physics.rotate(-Inputs.TURN_RATE, delta);
    }
    if (keyIsDown("d")) {
      this.magpie.physics.rotate(Inputs.TURN_RATE, delta);
    }
    // beam is on exactly while space is held
    this.magpie.enableBeam(keyIsDown(" "));
  }
}

const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

function keyPressed() {
  if (game && (key === "~" || key === "`")) {
    game.debug = !game.debug;
  }
  if (SCROLL_KEYS.includes(key)) {
    return false;
  }
}