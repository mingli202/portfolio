import type { Fluid } from "./fluid";

export class Scene {
  fluid: Fluid;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, fluid: Fluid) {
    this.canvas = canvas;
    this.fluid = fluid;
  }

  public draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.fluid.smoke.forEach((value, x, y) => {
      const color =
        this.fluid.obstacles.get(x, y) === 0 // red if obstacle
          ? "#ff0"
          : this.getSmokeColor(value);
      this.drawRect(x, y, color, ctx);
    });
  }

  private getSmokeColor(value: number): string {
    const v = Math.min(Math.max(0, value), 1) * 255;

    return `rgba(${v}, ${v}, ${v}, 1)`;
  }

  private drawRect(
    x: number,
    y: number,
    color: string,
    ctx: CanvasRenderingContext2D,
  ): void {
    ctx.fillStyle = color;
    ctx.fillRect(
      x * this.fluid.squareSize,
      y * this.fluid.squareSize,
      this.fluid.squareSize,
      this.fluid.squareSize,
    );
  }

  public drawVelocities(): void {
    const ctx = this.canvas.getContext("2d")!;

    ctx.strokeStyle = "#ff0";
    ctx.fillStyle = "#ff0";
    this.fluid.u.forEach((value, x, y) => {
      x = x * this.fluid.squareSize;
      y = (y + 1 / 2) * this.fluid.squareSize;

      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + value * 20, y);
      ctx.closePath();
      ctx.stroke();
    });

    ctx.strokeStyle = "#0ff";
    ctx.fillStyle = "#0ff";
    this.fluid.v.forEach((value, x, y) => {
      x = (x + 1 / 2) * this.fluid.squareSize;
      y = y * this.fluid.squareSize;

      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + value * 20);
      ctx.closePath();
      ctx.stroke();
    });
  }
}
