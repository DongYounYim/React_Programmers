import { Plugin } from "./plugin";

export class EraserPlugin extends Plugin {
  oldX = -1;
  oldY = -1;
  constructor(initialValue) {
    super({
      ...initialValue,
      name: "eraser",
    });
  }

  draw(data) {
    super.draw(data);
    //state => draw-start / drawing / draw-finished
    const { x, y, state } = data;
    const context = this.canvas.getContext("2d");

    if (this.oldX === -1) this.oldX = x;
    if (this.oldY === -1) this.oldY = y;

    context.globalCompositeOperation = "destination-out";

    if (state === "draw-started" || state === "drawing") {
      context.beginPath();
      context.moveTo(this.oldX, this.oldY);
      context.lineTo(x, y);
      context.stroke();

      this.oldX = x;
      this.oldY = y;
    } else {
      this.oldX = -1;
      this.oldY = -1;
    }
  }
}
