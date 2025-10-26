import { Grid } from "./grid";

export const Field = {
  U: "U",
  V: "V",
  S: "S", // smoke
} as const;

export type Field = (typeof Field)[keyof typeof Field];

export class Fluid {
  private u: Grid; // x-direction
  private v: Grid; // y-direction
  private b: Grid; // blocks and obstacles
  private s: Grid; // smoke
  // private p: Grid; // pressure
  private canvas: HTMLCanvasElement;

  private nextU: Grid; // x-direction
  private nextV: Grid; // y-direction
  private nextS: Grid; // smoke

  public squareSize: number;
  public gridWidth: number;
  public gridHeight: number;

  public minSquares: number;
  public nIterations: number;
  public deltaT: number;
  public density: number;
  public gravity: number;
  public overrelaxationCoefficient: number;

  public get smoke(): Float32Array[] {
    return this.s.grid;
  }

  public constructor(
    canvas: HTMLCanvasElement,
    minSquares: number = 100,
    nIterations: number = 100,
    deltaT: number = 1 / 30,
    density: number = 1,
    gravity: number = -9.81,
    overrelaxationCoefficient: number = 1.9,
  ) {
    this.canvas = canvas;
    this.minSquares = minSquares;
    this.nIterations = nIterations;
    this.deltaT = deltaT;
    this.density = density;
    this.gravity = gravity;
    this.overrelaxationCoefficient = overrelaxationCoefficient;

    const h = Math.min(this.canvas.height, this.canvas.width);
    this.squareSize = h / this.minSquares;
    this.gridWidth = Math.ceil(this.canvas.width / this.squareSize);
    this.gridHeight = Math.ceil(this.canvas.height / this.squareSize);

    this.u = new Grid(this.gridWidth, this.gridHeight);
    this.v = new Grid(this.gridWidth, this.gridHeight);
    this.b = new Grid(this.gridWidth, this.gridHeight);
    this.s = new Grid(this.gridWidth, this.gridHeight);
    this.p = new Grid(this.gridWidth, this.gridHeight);
    this.nextU = new Grid(this.gridWidth, this.gridHeight);
    this.nextV = new Grid(this.gridWidth, this.gridHeight);
    this.nextS = new Grid(this.gridWidth, this.gridHeight);

    // the edges of the grid are obstacles
    this.b.fill(1);
    for (let k = 0; k < this.b.height; k++) {
      this.b.set(0, k, 0);
      this.b.set(this.b.width - 1, k, 0);
    }
    for (let i = 0; i < this.b.width; i++) {
      this.b.set(i, 0, 0);
      this.b.set(i, this.b.height - 1, 0);
    }
  }

  public simulate() {
    this.applyExternalForces();
    this.projection();
    this.advection();
  }

  private applyExternalForces() {
    this.b.forEach((value, x, y) => {
      this.v.set(x, y, value + this.deltaT * this.gravity);
    });
  }

  private projection() {
    for (let l = 0; l < this.nIterations; l++) {
      for (let i = 0; i < this.b.width; i++) {
        for (let k = 0; k < this.b.height; k++) {
          const divergence =
            (this.u.get(i + 1, k) -
              this.u.get(i, k) +
              this.v.get(i, k + 1) -
              this.v.get(i, k)) *
            this.overrelaxationCoefficient;

          const b0 = this.b.get(i - 1, k);
          const b1 = this.b.get(i + 1, k);
          const b2 = this.b.get(i, k - 1);
          const b3 = this.b.get(i, k + 1);

          const b = b0 + b1 + b2 + b3;

          this.nextU.set(i, k, (v) => v + (divergence * b0) / b);
          this.nextU.set(i + 1, k, (v) => v - (divergence * b1) / b);
          this.nextV.set(i, k, (v) => v + (divergence * b2) / b);
          this.nextV.set(i, k + 1, (v) => v - (divergence * b3) / b);
        }
      }
    }
  }

  private advection() {
    for (let i = 1; i < this.gridHeight + 1; i++) {
      for (let k = 1; k < this.gridWidth + 1; k++) {
        this.advectV(i, k);
        this.advectU(i, k);
        this.advectS(i, k);
      }
    }

    this.v = this.nextV;
    this.u = this.nextU;
    this.s = this.nextS;
  }

  private getNeighborsAverage(i: number, k: number, field: Field) {
    const fieldGrid = field === Field.U ? this.u : this.v;

    const v = fieldGrid.get(i, k);
    const vLeft = fieldGrid.get(i - 1, k);
    const vTop = fieldGrid.get(i, k + 1);
    const vTopLeft = fieldGrid.get(i - 1, k + 1);

    const b = this.b.get(i, k);
    const bLeft = this.b.get(i - 1, k);
    const bTop = this.b.get(i, k + 1);
    const bTopLeft = this.b.get(i - 1, k + 1);

    const bSum = b + bLeft + bTop + bTopLeft;

    return (v * b + vLeft * bLeft + vTop * bTop + vTopLeft * bTopLeft) / bSum;
  }

  private getGridPointFromCanvasPoint(
    point: [number, number],
  ): [number, number] {
    const x = Math.round(point[0] / this.squareSize);
    const y = Math.round(point[1] / this.squareSize);
    return [x, y] as const;
  }

  private getCanvasPointFromGridPoint(
    point: [number, number],
  ): [number, number] {
    const x = point[0] * this.squareSize;
    const y = point[1] * this.squareSize;
    return [x, y] as const;
  }

  private advectV(i: number, k: number) {
    const u = this.u.get(i, k);
    const vAvg = this.getNeighborsAverage(i, k, Field.V);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    y += this.squareSize / 2;

    const previousX = x - u * this.deltaT;
    const previousY = y - vAvg * this.deltaT;

    this.nextV.set(i, k, this.interpolate(previousX, previousY, Field.V));
  }

  private advectU(i: number, k: number) {
    const v = this.v.get(i, k);
    const uAvg = this.getNeighborsAverage(i, k, Field.U);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    x += this.squareSize / 2;

    const previousX = x - uAvg * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextU.set(i, k, this.interpolate(previousX, previousY, Field.U));
  }

  private advectS(i: number, k: number) {
    const v = (this.v.get(i, k) + this.v.get(i, k + 1)) / 2;
    const u = (this.u.get(i, k) + this.u.get(i + 1, k)) / 2;

    let [x, y] = this.getCanvasPointFromGridPoint([i - 1, k - 1]);
    x += this.squareSize / 2;
    y += this.squareSize / 2;

    const previousX = x - u * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextS.set(i, k, this.interpolate(previousX, previousY, Field.S));
  }

  private interpolate(previousX: number, previousY: number, field: Field) {
    let fieldArr: Grid;

    switch (field) {
      case Field.U:
        fieldArr = this.u;
        break;
      case Field.V:
        fieldArr = this.v;
        break;
      case Field.S:
        fieldArr = this.s;
        break;
    }

    let [previousI, previousK] = this.getGridPointFromCanvasPoint([
      previousX,
      previousY,
    ]);

    let [gridX, gridY] = this.getCanvasPointFromGridPoint([
      previousI,
      previousK,
    ]);

    if (field === Field.U || field === Field.S) {
      gridY -= this.squareSize / 2;
    }
    if (field === Field.V || field === Field.S) {
      gridX -= this.squareSize / 2;
    }

    const xx = previousX - gridX;
    const yy = previousY - gridY;

    const w_00 = 1 - xx / this.squareSize;
    const w_01 = xx / this.squareSize;
    const w_10 = 1 - yy / this.squareSize;
    const w_11 = yy / this.squareSize;

    const newVal =
      w_00 * w_10 * fieldArr.get(previousI, previousK - 1) +
      w_01 * w_10 * fieldArr.get(previousI, previousK) +
      w_00 * w_11 * fieldArr.get(previousI + 1, previousK - 1) +
      w_01 * w_11 * fieldArr.get(previousI + 1, previousK);

    return newVal;
  }
}
