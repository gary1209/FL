import * as Canvas from './canvas.js';
import * as Key from './key.js';

const canvas = Canvas.getCanvas(0);
const ctx = Canvas.getContext2D(canvas);
const W = canvas.width;
const H = canvas.height;

const clear = () => ctx.clearRect(0, 0, W, H);

let KeyU = false;
let KeyD = false;
let KeyL = false;
let KeyR = false;

Key.AddKeyHandler((key, down) => {
  if (key === 'ArrowUp') {
    KeyU = down;
  } else if (key === 'ArrowDown') {
    KeyD = down;
  } else if (key === 'ArrowLeft') {
    KeyL = down;
  } else if (key === 'ArrowRight') {
    KeyR = down;
  }
});

Canvas.AddMouseHandler(canvas, (x, y, t, b, m) => {
});

// generate 20 (r,x,y,vx,vy)
interface Rock {
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const Random = (a: number, b: number) => Math.random() * (b - a) + a;
const RandomXY = (): { x: number, y: number } => {
  let z = Random(0, 2 * (W + H));
  if (z < W) return { x: z, y: 0 }; z -= W;
  if (z < W) return { x: z, y: H }; z -= W;
  if (z < H) return { x: 0, y: z }; z -= H;
  return { x: W, y: z };
};
const RandomVXY = (): { vx: number, vy: number } => {
  const t = Random(0, 2 * Math.PI);
  const r = Random(1, 2);
  return { vx: r * Math.cos(t), vy: r * Math.sin(t) };
};

let X = W / 2, Y = H / 2; const R = 10;
const rocks: Rock[] = [];
for (let i = 0; i < 20; i++) {
  rocks.push({ r: Random(3, 5), ...RandomXY(), ...RandomVXY() });
}
const draw = (x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
};

const update = () => {
  clear();
  ctx.strokeStyle = 'blue';
  draw(X, Y, R);
  if (KeyL) X -= 1;
  if (KeyR) X += 1;
  if (KeyU) Y -= 1;
  if (KeyD) Y += 1;
  ctx.strokeStyle = 'red';
  for (let i = 0; i < 20; i++) {
    draw(rocks[i].x, rocks[i].y, rocks[i].r);
    rocks[i].x += rocks[i].vx;
    rocks[i].y += rocks[i].vy;
    if (rocks[i].x + rocks[i].r < 0 || rocks[i].x - rocks[i].r > W ||
        rocks[i].y + rocks[i].r < 0 || rocks[i].y - rocks[i].r > H) {
      const xy = RandomXY();
      const vxy = RandomVXY();
      rocks[i].x = xy.x;
      rocks[i].y = xy.y;
      rocks[i].vx = vxy.vx;
      rocks[i].vy = vxy.vy;
    }
  }
};
update();
setInterval(update, 10);
