import { die } from './util.js';

export enum MouseButton { None = 0, Left = 1, Right = 2, Middle = 4 }
export enum MouseEventType { Down = 1, Move = 0, Up = -1 }
export const AddMouseHandler = (c: HTMLCanvasElement, handler: (x: number, y: number, t: MouseEventType, b: MouseButton, m: number) => void) => {
  const r = c.getBoundingClientRect();
  const f = (t: MouseEventType, e: MouseEvent) => {
    let b = MouseButton.None;
    if (t !== MouseEventType.Move) {
      if (e.button === 0) {
        b = MouseButton.Left;
      } else if (e.button === 2) {
        b = MouseButton.Right;
      } else if (e.button === 1) {
        b = MouseButton.Middle;
      } else {
        t = MouseEventType.Move;
      }
    }
    handler(e.clientX - r.x, e.clientY - r.y, t, b, e.buttons);
  };
  c.addEventListener('mousedown', (e) => f(MouseEventType.Down, e));
  c.addEventListener('mousemove', (e) => f(MouseEventType.Move, e));
  c.addEventListener('mouseup'  , (e) => f(MouseEventType.Up  , e));
  c.addEventListener('contextmenu', (e) => e.preventDefault());
};

export const getCanvas = (id: number | string) => {
  const colle = document.getElementsByTagName('canvas');
  return (typeof id === 'number' ? colle.item(id) : colle.namedItem(id)) ?? die();
};
export const getContext2D = (c: HTMLCanvasElement) => c.getContext('2d') ?? die();
