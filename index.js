const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const width = (canvas.width = 1024);
const height = (canvas.height = 576);

c.fillRect(0, 0, width, height);

const gravity = 0.2;
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRigh: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, width, height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player.velocity.y = -10;
    case "ArrowRight":
      keys.ArrowRigh.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.w.pressed = true;
      player.velocity.y = -10;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      lastKey = "d";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      lastKey = "a";
      break;
    case " ":
      keys.space.pressed = true;
  }
});
