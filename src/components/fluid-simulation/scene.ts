import { Field, type Fluid } from "./fluid";

export class Scene {
  fluid: Fluid;
  canvas: HTMLCanvasElement;

  showDivergence: boolean = false;
  showGridLines: boolean = false;
  showVelocities: boolean = false;
  showCenterVelocities: boolean = false;
  showDetailedVelocities: boolean = false;
  showVelocityColor: boolean = false;
  showSmoke: boolean = true;

  enableMouseMove: boolean = false;
  enableProjection: boolean = true;
  enableAdvection: boolean = true;
  enablePlaying: boolean = true;

  lastMousePosition: [number, number] = [-1, -1];
  lastTime: DOMHighResTimeStamp = 0;
  isMouseDown: boolean = false;

  radius: number = 2;
  lineWidth: number = 1;

  start: DOMHighResTimeStamp = 0;
  mouseRadius: number = 3;

  subdivisions: number = 2;

  constructor(canvas: HTMLCanvasElement, fluid: Fluid) {
    this.canvas = canvas;
    this.fluid = fluid;

    this.canvas.onpointerdown = () => {
      this.isMouseDown = true;
    };

    this.canvas.onpointerup = () => {
      this.isMouseDown = false;
      this.lastMousePosition = [-1, -1];
    };

    this.addMouseMove();

    if (this.enablePlaying) {
      requestAnimationFrame(this.play.bind(this));
    }
  }

  public play(now: DOMHighResTimeStamp) {
    if (!this.enablePlaying) {
      return;
    }

    const delta = now - this.start;

    let t = Math.max(this.fluid.deltaT * 1000 - delta, 0);

    setTimeout(() => {
      this.start = now;
      this.drawNextFrame();

      requestAnimationFrame(this.play.bind(this));
    }, t);
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

  public drawNextFrame(): void {
    this.clearCanvas();
    if (this.enableProjection) this.fluid.projection();
    if (this.enableAdvection) this.fluid.advection();

    if (this.showVelocityColor) this.drawVelocityColor();
    if (this.showDivergence) this.drawDivergence();
    if (this.showCenterVelocities) this.drawCenterVelocities();
    if (this.showVelocities) this.drawVelocities();
    if (this.showSmoke) this.drawSmoke();
    if (this.showGridLines) this.drawGridLines();
  }

  public clearCanvas(): void {
    this.canvas
      .getContext("2d")!
      .clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawVelocities(): void {
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = "#ff0";
    ctx.fillStyle = "#ff0";
    this.fluid.u.forEach((value, x, y) => {
      x = x * this.fluid.squareSize;
      y = (y + 1 / 2) * this.fluid.squareSize;

      ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + value, y);
      ctx.closePath();
      ctx.stroke();
    });

    ctx.strokeStyle = "#0ff";
    ctx.fillStyle = "#0ff";
    this.fluid.v.forEach((value, x, y) => {
      x = (x + 1 / 2) * this.fluid.squareSize;
      y = y * this.fluid.squareSize;

      ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + value);
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

  private randomVelocity(range: number = 1): number {
    return (2 * range * Math.random() - range) * this.fluid.squareSize;
  }

  public generateRandomVelocities(): void {
    this.fluid.obstacles.forEach((_, x, y) => {
      this.fluid.v.set(x, y, this.randomVelocity());
      this.fluid.u.set(x, y, this.randomVelocity());
    });
    this.drawNextFrame();
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
      this.drawNextFrame();
    });
  }

  public runSolveDivergenceAll() {
    console.log("solve divergence all");
    this.fluid.solveDivergenceAll();
    this.drawNextFrame();
  }

  public runProjection() {
    console.log("solve divergence all");
    this.fluid.projection();
    this.drawNextFrame();
  }

  public runAdvection() {
    console.log("advection");
    this.fluid.advection();
    this.drawNextFrame();
  }

  public drawCenterVelocities() {
    const n = this.fluid.squareSize;
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = "#08f";
    ctx.fillStyle = "#08f";

    this.fluid.obstacles.forEach((_, x, y) => {
      x = x * this.fluid.squareSize + n / 2;
      y = y * this.fluid.squareSize + n / 2;

      const points = [[x, y]];
      ctx.lineWidth = this.lineWidth;

      if (this.showDetailedVelocities) {
        points.push(
          [x - n / 4, y],
          [x + n / 4, y],
          [x, y - n / 4],
          [x, y + n / 4],
          [x - n / 4, y - n / 4],
          [x + n / 4, y - n / 4],
          [x - n / 4, y + n / 4],
          [x + n / 4, y + n / 4],
          [x - n / 4, y + n / 2],
          [x - n / 2, y + n / 2],
          [x, y + n / 2],
          [x + n / 4, y + n / 2],
          [x + (3 * n) / 2, y + n / 2],
          [x + n / 2, y - n / 4],
          [x + n / 2, y + n / 4],
          [x + n / 2, y],
          [x - n / 2, y],
        );
      }

      for (var [otherX, otherY] of points) {
        const v = this.fluid.interpolate(otherX, otherY, Field.V);
        const u = this.fluid.interpolate(otherX, otherY, Field.U);

        this.drawVelocityArrow(otherX, otherY, u, v);
      }
    });
  }

  public drawVelocityArrow(x: number, y: number, u: number, v: number) {
    const ctx = this.canvas.getContext("2d")!;
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + u, y + v);
    ctx.closePath();
    ctx.stroke();
  }

  public addMouseMove() {
    const f = (e: MouseEvent) => this.handleMouseMove(e);
    this.canvas.onpointermove = f;

    this.enableMouseMove = !this.enableMouseMove;
  }

  public handleMouseMove(e: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }

    if (!this.enableMouseMove) {
      return;
    }

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

    if (deltaT < this.fluid.deltaT * 1000) {
      return;
    }
    this.lastTime = e.timeStamp;

    const deltaX = e.offsetX - this.lastMousePosition[0];
    const deltaY = e.offsetY - this.lastMousePosition[1];

    const norm = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    this.lastMousePosition = [e.offsetX, e.offsetY];

    const [x, y] = this.fluid.getGridPointFromCanvasPoint([
      e.offsetX,
      e.offsetY,
    ]);

    for (let i = 0; i < this.mouseRadius * 2 + 1; i++) {
      for (let k = 0; k < this.mouseRadius * 2 + 1; k++) {
        const v1 =
          (this.gaussian(i - this.mouseRadius, k - this.mouseRadius) /
            (deltaT / 1000)) *
          2;

        this.fluid.v.set(
          x - this.mouseRadius + i,
          y - this.mouseRadius + k,
          (val) => val + deltaY * v1,
        );
        this.fluid.u.set(
          x - this.mouseRadius + i,
          y - this.mouseRadius + k,
          (val) => val + deltaX * v1,
        );
      }
    }
  }

  public gaussian(x: number, y: number, sigma: number = 10) {
    return Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
  }

  public drawVelocityColor() {
    const ctx = this.canvas.getContext("2d")!;

    const scale = this.fluid.squareSize / this.subdivisions;

    this.fluid.obstacles.forEach((_, x, y) => {
      for (let i = 0; i < this.subdivisions; i++) {
        for (let k = 0; k < this.subdivisions; k++) {
          const v = this.fluid.interpolate(
            x * this.fluid.squareSize + i * scale,
            y * this.fluid.squareSize + k * scale,
            Field.V,
          );
          const u = this.fluid.interpolate(
            x * this.fluid.squareSize + i * scale,
            y * this.fluid.squareSize + k * scale,
            Field.U,
          );

          const length = Math.sqrt(v * v + u * u);

          const hue = Math.max(
            Math.min(
              240 - this.map(length, 0, 30 * this.fluid.squareSize, 0, 240),
              240,
            ),
            0,
          );

          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

          ctx.fillRect(
            x * this.fluid.squareSize + i * scale,
            y * this.fluid.squareSize + k * scale,
            this.fluid.squareSize,
            this.fluid.squareSize,
          );
        }
      }
    });
  }

  public drawSmoke() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = this.lineWidth;

    const scale = this.fluid.squareSize / this.subdivisions;

    this.fluid.s.forEach((_, x, y) => {
      for (let i = 0; i < this.subdivisions; i++) {
        for (let k = 0; k < this.subdivisions; k++) {
          const v = this.fluid.interpolate(
            x * this.fluid.squareSize + i * scale,
            y * this.fluid.squareSize + k * scale,
            Field.S,
          );

          const color =
            this.fluid.obstacles.get(x, y) === 0 // red if obstacle
              ? "#ff0"
              : this.getSmokeColor(v);
          this.drawRect(x + i * scale, y + k * scale, color, ctx);
        }
      }
    });
  }

  public map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  public clear() {
    this.fluid.clear();
    this.drawNextFrame();
  }
}
