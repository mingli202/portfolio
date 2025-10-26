import type { Fluid } from "./fluid";

export class Scene {
  fluid: Fluid;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, fluid: Fluid) {
    this.canvas = canvas;
    this.fluid = fluid;
  }

  public draw() {
    for (let i = 1; i <= this.fluid.gridHeight; i++) {
      for (let k = 1; k <= this.fluid.gridWidth; k++) {
        const color = this.getSmokeColor(this.fluid.smoke[i][k]);
        this.drawRect(k, i, color);
      }
    }
  }

  private getSmokeColor(value: number): string {
    return `rgb(255, 255, 255, ${Math.min(Math.max(0, value * 255), 255)})`;
  }

  private drawRect(x: number, y: number, color: string): void {
    const ctx = this.canvas.getContext("2d")!;

    ctx.fillStyle = color;
    ctx.fillRect(
      x * this.fluid.squareSize,
      y * this.fluid.squareSize,
      this.fluid.squareSize,
      this.fluid.squareSize,
    );
  }
}
