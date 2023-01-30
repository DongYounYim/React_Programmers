export class Plugin {
  canvas = undefined;

  constructor(initialValue) {
    this.name = "";

    Object.assign(this, initialValue);
  }

  draw(data) {
    // x, y, color, lineWidth
    const context = this.canvas.getContext("2d");
    //context의 기본적인 속성 정의
    //각 플러그인에 오염되지 않게 초기화
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = data.color;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.shadowColor = "";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.lineWidth = data.lineWidth;
    context.textAlign = "left";
    context.textBaseline = "top";
    context.direction = "ltr";
    context.lineDashOffset = 0;
    context.miterLimit = 0;
    context.globalAlpha = 1;
    context.fillStyle = data.color;
  }
}
