import * as Canvas from './canvas.js';
import * as Key from './key.js';

const canvas = Canvas.getCanvas(0);
const ctx = Canvas.getContext2D(canvas);
const W = canvas.width;
const H = canvas.height;

const clear = () => ctx.clearRect(0, 0, W, H);

Key.AddKeyHandler((key, down) => {
  console.log([key, down]);
});

Canvas.AddMouseHandler(canvas, (x, y, t, b, m) => {
  clear();
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.stroke();
});
