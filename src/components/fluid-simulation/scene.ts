import type { Fluid } from "./fluid";

export class Scene {
  fluid: Fluid;
  canvas: HTMLCanvasElement;

  showDivergence: boolean = false;
  showGridLines: boolean = true;
  showVelocities: boolean = false;
  showCenterVelocities: boolean = true;
  enableMouseMove: boolean = false;

  velocityMultiplier: number = 20;
  lastMousePosition: [number, number] = [-1, -1];
  lastTime: DOMHighResTimeStamp = 0;

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

  public drawHelperData(): void {
    this.clearHelperData();
    if (this.showDivergence) this.drawDivergence();
    if (this.showVelocities) this.drawVelocities();
    if (this.showCenterVelocities) this.drawCenterVelocities();
    if (this.showGridLines) this.drawGridLines();
  }

  public clearHelperData(): void {
    this.canvas
      .getContext("2d")!
      .clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawVelocities(): void {
    const radius = 4;

    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = 2;

    ctx.strokeStyle = "#ff0";
    ctx.fillStyle = "#ff0";
    this.fluid.u.forEach((value, x, y) => {
      x = x * this.fluid.squareSize;
      y = (y + 1 / 2) * this.fluid.squareSize;

      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + value * this.velocityMultiplier, y);
      ctx.closePath();
      ctx.stroke();
    });

    ctx.strokeStyle = "#0ff";
    ctx.fillStyle = "#0ff";
    this.fluid.v.forEach((value, x, y) => {
      x = (x + 1 / 2) * this.fluid.squareSize;
      y = y * this.fluid.squareSize;

      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + value * this.velocityMultiplier);
      ctx.closePath();
      ctx.stroke();
    });
  }

  public drawGridLines(): void {
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = 1;

    ctx.strokeStyle = "#555";
    for (let i = 0; i <= this.fluid.gridWidth; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.fluid.squareSize, 0);
      ctx.lineTo(i * this.fluid.squareSize, this.canvas.height);
      ctx.closePath();
      ctx.stroke();
    }

    for (let k = 0; k <= this.fluid.gridHeight; k++) {
      ctx.beginPath();
      ctx.moveTo(0, k * this.fluid.squareSize);
      ctx.lineTo(this.canvas.width * 20, k * this.fluid.squareSize);
      ctx.closePath();
      ctx.stroke();
    }
  }

  public generateRandomVelocities(): void {
    this.fluid.obstacles.forEach((_, x, y) => {
      this.fluid.v.set(x, y, 4 * Math.random() - 2);
      this.fluid.u.set(x, y, 4 * Math.random() - 2);
    });
    this.drawHelperData();
  }

  public drawDivergence(): void {
    const ctx = this.canvas.getContext("2d")!;

    ctx.fillStyle = "#fff";

    this.fluid.obstacles.forEach((_, x, y) => {
      const div = this.fluid.getDivergence(x, y);

      ctx.fillText(
        div.toFixed(2),
        x * this.fluid.squareSize + this.fluid.squareSize / 3,
        y * this.fluid.squareSize + this.fluid.squareSize / 2,
      );
    });
  }

  public solveDivergenceInteractive(): void {
    this.canvas.addEventListener("mousedown", (e) => {
      switch (e.button) {
        case 0: {
          const [x, y] = this.fluid.getGridPointFromCanvasPoint([
            e.offsetX,
            e.offsetY,
          ]);

          console.log("solve divergence for", x, y);
          this.fluid.solveDivergence(x, y);
          break;
        }
      }
      this.drawHelperData();
    });
  }

  public runSolveDivergenceAll() {
    console.log("solve divergence all");
    this.fluid.solveDivergenceAll();
    this.drawHelperData();
  }

  public runProjection() {
    console.log("solve divergence all");
    this.fluid.projection();
    this.drawHelperData();
  }

  public drawCenterVelocities() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#f0f";
    ctx.fillStyle = "#f0f";

    this.fluid.obstacles.forEach((_, x, y) => {
      const v = this.fluid.v.get(x, y) * this.velocityMultiplier;
      const u = this.fluid.u.get(x, y) * this.velocityMultiplier;

      x = x * this.fluid.squareSize + this.fluid.squareSize / 2;
      y = y * this.fluid.squareSize + this.fluid.squareSize / 2;

      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + u, y + v);
      ctx.closePath();
      ctx.stroke();
    });
  }

  public toggleMouseMove() {
    const f = (e: MouseEvent) => this.handleMouseMove(e);

    if (this.enableMouseMove) {
      this.canvas.removeEventListener("mousemove", f);
    } else {
      this.canvas.addEventListener("mousemove", f);
    }

    this.enableMouseMove = !this.enableMouseMove;
  }

  public handleMouseMove(e: MouseEvent) {
    if (
      this.lastTime === 0 ||
      !this.lastMousePosition ||
      this.lastMousePosition[0] === -1
    ) {
      this.lastTime = e.timeStamp;
      this.lastMousePosition = [e.offsetX, e.offsetY];
      return;
    }

    const deltaT = e.timeStamp - this.lastTime;

    if (deltaT < 100) {
      return;
    }
    this.lastTime = e.timeStamp;

    const deltaX = e.offsetX - this.lastMousePosition[0];
    const deltaY = e.offsetY - this.lastMousePosition[1];
    const norm = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (norm < 1) {
      return;
    }

    this.lastMousePosition = [e.offsetX, e.offsetY];

    const [x, y] = this.fluid.getGridPointFromCanvasPoint([
      e.offsetX,
      e.offsetY,
    ]);

    this.fluid.v.set(x, y, (deltaY / norm) * (this.fluid.squareSize / 40));
    this.fluid.u.set(x, y, (deltaX / norm) * (this.fluid.squareSize / 40));

    this.drawHelperData();
  }
}
