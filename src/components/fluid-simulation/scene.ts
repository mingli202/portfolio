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

    this.fluid.smoke.forEach((value, x, y) => {
      const color =
        this.fluid.obstacles.get(x, y) === 0 // red if obstacle
          ? "#ff0"
          : this.getSmokeColor(value);
      this.drawRect(x, y, color, ctx);
    });
  }

  private getSmokeColor(value: number): string {
    return `rgb(255, 255, 255, ${Math.min(Math.max(0, value * 255), 255)})`;
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
}
