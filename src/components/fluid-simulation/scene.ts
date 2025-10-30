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
  showObstacles: boolean = false;

  enableMouseMove: boolean = false;
  enableProjection: boolean = true;
  enableAdvection: boolean = true;
  enablePlaying: boolean = false;

  lastMousePosition: [number, number] = [-1, -1];
  lastTime: DOMHighResTimeStamp = 0;
  isMouseDown: boolean = false;

  radius: number = 2;
  lineWidth: number = 1;

  start: DOMHighResTimeStamp = 0;
  mouseRadius: number = 2;

  subdivisions: number = 2;
  maxVelocity: number;

  constructor(
    canvas: HTMLCanvasElement,
    fluid: Fluid,
    subdivisions: number = 2,
  ) {
    this.canvas = canvas;
    this.fluid = fluid;
    this.subdivisions = subdivisions;

    this.maxVelocity =
      Math.min(this.fluid.gridHeight, this.fluid.gridWidth) *
      this.fluid.squareSize;

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
    const v = Math.min(Math.max(0, value / this.maxVelocity), 1) * 255;

    return `rgba(${v}, ${v}, ${v}, 1)`;
  }

  private drawRect(
    x: number,
    y: number,
    color: string,
    ctx: CanvasRenderingContext2D,
  ): void {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.fluid.squareSize, this.fluid.squareSize);
  }

  public drawNextFrame(): void {
    this.clearCanvas();
    if (this.enableProjection) this.fluid.projection();
    if (this.enableAdvection) this.fluid.advection();

    if (this.showVelocityColor) this.drawVelocityColor();
    if (this.showObstacles) this.drawObstacles();
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
      const [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y], Field.U);

      ctx.arc(xx, yy, this.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xx, yy);
      ctx.lineTo(xx + value / 20, yy);
      ctx.closePath();
      ctx.stroke();
    });

    ctx.strokeStyle = "#0ff";
    ctx.fillStyle = "#0ff";
    this.fluid.v.forEach((value, x, y) => {
      const [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y], Field.V);

      ctx.arc(xx, yy, this.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xx, yy);
      ctx.lineTo(xx, yy + value / 20);
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
      ctx.moveTo(i * this.fluid.squareSize - this.fluid.blockOffset, 0);
      ctx.lineTo(
        i * this.fluid.squareSize - this.fluid.blockOffset,
        this.canvas.height,
      );
      ctx.closePath();
      ctx.stroke();
    }

    for (let k = 0; k <= this.fluid.gridHeight; k++) {
      ctx.beginPath();
      ctx.moveTo(0, k * this.fluid.squareSize - this.fluid.blockOffset);
      ctx.lineTo(
        this.canvas.width * 20,
        k * this.fluid.squareSize - this.fluid.blockOffset,
      );
      ctx.closePath();
      ctx.stroke();
    }
  }

  private randomVelocity(range: number = 1): number {
    return (2 * range * Math.random() - range) * this.fluid.squareSize;
  }

  public generateRandomVelocities(): void {
    this.fluid.obstacles.forEach((_, x, y) => {
      this.fluid.v.set(x, y, this.randomVelocity() * 20);
      this.fluid.u.set(x, y, this.randomVelocity() * 20);
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
        x * this.fluid.squareSize +
          this.fluid.squareSize / 3 -
          this.fluid.blockOffset,
        y * this.fluid.squareSize +
          this.fluid.squareSize / 2 -
          this.fluid.blockOffset,
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

          // console.log("solve divergence for", x, y);
          this.fluid.solveDivergence(x, y);
          break;
        }
      }
      this.drawNextFrame();
    });
  }

  public runSolveDivergenceAll() {
    // console.log("solve divergence all");
    this.fluid.solveDivergenceAll();
    this.drawNextFrame();
  }

  public runProjection() {
    // console.log("solve divergence all");
    this.fluid.projection();
    this.drawNextFrame();
  }

  public runAdvection() {
    // console.log("advection");
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
      const [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y], Field.S);

      const points = [[xx, yy]];
      ctx.lineWidth = this.lineWidth;

      if (this.showDetailedVelocities) {
        points.push(
          [xx - n / 4, yy],
          [xx + n / 4, yy],
          [xx, yy - n / 4],
          [xx, yy + n / 4],
          [xx - n / 4, yy - n / 4],
          [xx + n / 4, yy - n / 4],
          [xx - n / 4, yy + n / 4],
          [xx + n / 4, yy + n / 4],
          [xx - n / 4, yy + n / 2],
          [xx - n / 2, yy + n / 2],
          [xx, yy + n / 2],
          [xx + n / 4, yy + n / 2],
          [xx + (3 * n) / 2, yy + n / 2],
          [xx + n / 2, yy - n / 4],
          [xx + n / 2, yy + n / 4],
          [xx + n / 2, yy],
          [xx - n / 2, yy],
        );
      }

      for (var [otherX, otherY] of points) {
        const v = this.fluid.interpolate(otherX, otherY, Field.V) / 20;
        const u = this.fluid.interpolate(otherX, otherY, Field.U) / 20;

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

    if (this.fluid.obstacles.get(x, y) === 0) {
      return;
    }

    for (let i = 0; i < this.mouseRadius * 2 + 1; i++) {
      for (let k = 0; k < this.mouseRadius * 2 + 1; k++) {
        const xx = x - this.mouseRadius + i;
        const yy = y - this.mouseRadius + k;

        if (
          this.fluid.obstacles.get(xx - 1, yy) === 0 ||
          this.fluid.obstacles.get(xx, yy - 1) === 0 ||
          this.fluid.obstacles.get(xx, yy) === 0
        ) {
          continue;
        }

        const v =
          (this.gaussian(i - this.mouseRadius, k - this.mouseRadius) /
            (deltaT / 1000)) *
          2;

        this.fluid.v.set(xx, yy, (val) => val + deltaY * v);
        this.fluid.u.set(xx, yy, (val) => val + deltaX * v);
        this.fluid.s.set(xx, yy, (val) =>
          Math.min(val + norm * v, this.maxVelocity * 1.5),
        );
      }
    }
  }

  public gaussian(x: number, y: number, sigma: number = this.mouseRadius / 2) {
    return Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
  }

  public drawVelocityColor() {
    const ctx = this.canvas.getContext("2d")!;

    const scale = this.fluid.squareSize / this.subdivisions;

    this.fluid.obstacles.forEach((_, x, y) => {
      for (let i = 0; i < this.subdivisions; i++) {
        for (let k = 0; k < this.subdivisions; k++) {
          let [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y]);

          const v = this.fluid.interpolate(
            xx + (i + 1 / 2) * scale,
            yy + (k + 1 / 2) * scale,
            Field.V,
          );
          const u = this.fluid.interpolate(
            xx + (i + 1 / 2) * scale,
            yy + (k + 1 / 2) * scale,
            Field.U,
          );

          const length = Math.sqrt(v * v + u * u);

          const hue = Math.max(
            Math.min(240 - this.map(length, 0, this.maxVelocity, 0, 240), 240),
            0,
          );

          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

          ctx.fillRect(
            xx + i * scale,
            yy + k * scale,
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
          const [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y]);

          const v = this.fluid.interpolate(
            xx + i * scale,
            yy + k * scale,
            Field.S,
          );

          const color = this.getSmokeColor(v);
          this.drawRect(xx + i * scale, yy + k * scale, color, ctx);
        }
      }
    });
  }

  public drawObstacles() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.lineWidth = this.lineWidth;

    this.fluid.obstacles.forEach((value, x, y) => {
      if (value === 0) {
        const [xx, yy] = this.fluid.getCanvasPointFromGridPoint([x, y]);
        this.drawRect(xx, yy, "#aaa", ctx);
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

  public destroy() {
    this.canvas.onpointermove = null;
    this.canvas.onpointerdown = null;
    this.canvas.onpointerup = null;
  }
}
