function drawEverywhere({ offset, drawFn }) {
  push();
  translate(offset.x, offset.y);
  drawFn();
  pop();
}

function drawPlaceholder({ rotation, w, h }) {
  push();
  rotate(rotation);
  noFill();
  stroke("#ffffff");
  rectMode(CENTER);
  rect(0, 0, w, h);
  line(0, 0, 0, -h);
  pop();
}

function timeToStringParts(timeMs) {
  const secondsLeft = Math.ceil(timeMs / 1000);
  const minutes = String(Math.trunc(secondsLeft / 60));
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  return { minutes, seconds };
}