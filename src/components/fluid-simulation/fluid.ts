import { Grid } from "./grid";

export const Field = {
  U: "U",
  V: "V",
  S: "S", // smoke
} as const;

export type Field = (typeof Field)[keyof typeof Field];

export class Fluid {
  public u: Grid; // x-direction
  public v: Grid; // y-direction
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

  public get smoke(): Grid {
    return this.s;
  }

  public get obstacles(): Grid {
    return this.b;
  }

  public constructor(
    canvas: HTMLCanvasElement,
    minSquares: number = 60,
    nIterations: number = 40,
    deltaT: number = 1 / 30,
    density: number = 1000,
    gravity: number = 9.81,
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

    this.u = new Grid(this.gridWidth + 1, this.gridHeight);
    this.v = new Grid(this.gridWidth, this.gridHeight + 1);
    this.b = new Grid(this.gridWidth, this.gridHeight);
    this.s = new Grid(this.gridWidth, this.gridHeight);
    // this.p = new Grid(this.gridWidth, this.gridHeight);
    this.nextU = new Grid(this.gridWidth, this.gridHeight);
    this.nextV = new Grid(this.gridWidth, this.gridHeight);
    this.nextS = new Grid(this.gridWidth, this.gridHeight);

    // initial smoke density
    this.s.fill(1.0);
    // the edges of the grid are obstacles
    this.b.fill(1.0);
  }

  public simulate() {
    // this.applyExternalForces();
    this.projection();
    this.advection();
  }

  public projection() {
    for (let l = 0; l < this.nIterations; l++) {
      this.solveDivergenceAll();
    }
  }

  public solveDivergenceAll() {
    this.b.forEach((value, i, k) => {
      if (value === 0) {
        return;
      }
      this.solveDivergence(i, k);
    });
  }

  public solveDivergence(i: number, k: number) {
    const b0 = this.b.get(i - 1, k);
    const b1 = this.b.get(i + 1, k);
    const b2 = this.b.get(i, k - 1);
    const b3 = this.b.get(i, k + 1);

    const b = b0 + b1 + b2 + b3;

    if (b === 0) {
      return;
    }

    const divergence =
      (this.getDivergence(i, k) * this.overrelaxationCoefficient) / b;

    this.u.set(i, k, (v) => v + divergence * b0);
    this.u.set(i + 1, k, (v) => v - divergence * b1);
    this.v.set(i, k, (v) => v + divergence * b2);
    this.v.set(i, k + 1, (v) => v - divergence * b3);
  }

  public getDivergence(i: number, k: number): number {
    return (
      this.u.get(i + 1, k) -
      this.u.get(i, k) +
      this.v.get(i, k + 1) -
      this.v.get(i, k)
    );
  }

  public advection() {
    this.nextV = this.v;
    this.nextU = this.u;
    this.nextS = this.s;

    this.b.forEach((value, i, k) => {
      if (value === 0) {
        return;
      }

      this.advectU(i, k);
      this.advectV(i, k);
      // this.advectS(i, k);
    });

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

    // const b = this.b.get(i, k);
    // const bLeft = this.b.get(i - 1, k);
    // const bTop = this.b.get(i, k + 1);
    // const bTopLeft = this.b.get(i - 1, k + 1);
    //
    // const bSum = b + bLeft + bTop + bTopLeft;

    // return (v * b + vLeft * bLeft + vTop * bTop + vTopLeft * bTopLeft) / bSum;
    return (v + vLeft + vTop + vTopLeft) / 4;
  }

  public getGridPointFromCanvasPoint(
    point: [number, number],
    field?: Field,
  ): [number, number] {
    const x = Math.floor(
      (point[0] - (field && field === Field.V ? this.squareSize / 2 : 0)) /
        this.squareSize,
    );
    const y = Math.floor(
      (point[1] - (field && field === Field.U ? this.squareSize / 2 : 0)) /
        this.squareSize,
    );
    return [x, y] as const;
  }

  public getCanvasPointFromGridPoint(
    point: [number, number],
    field?: Field,
  ): [number, number] {
    const x =
      point[0] * this.squareSize +
      (field && field === Field.V ? this.squareSize / 2 : 0);
    const y =
      point[1] * this.squareSize +
      (field && field === Field.U ? this.squareSize / 2 : 0);
    return [x, y] as const;
  }

  public advectU(i: number, k: number) {
    const u = this.u.get(i, k);
    const vAvg = this.getNeighborsAverage(i, k, Field.V);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k], Field.U);

    const previousX = x - u * this.deltaT;
    const previousY = y - vAvg * this.deltaT;

    this.nextU.set(i, k, this.interpolate(previousX, previousY, Field.U));
  }

  public advectV(i: number, k: number) {
    const v = this.v.get(i, k);
    const uAvg = this.getNeighborsAverage(i, k, Field.U);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k], Field.V);

    const previousX = x - uAvg * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextV.set(i, k, this.interpolate(previousX, previousY, Field.V));
  }

  private advectS(i: number, k: number) {
    const v = (this.v.get(i, k) + this.v.get(i, k + 1)) / 2;
    const u = (this.u.get(i, k) + this.u.get(i + 1, k)) / 2;

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    x += this.squareSize / 2;
    y += this.squareSize / 2;

    const previousX = x - u * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextS.set(i, k, this.interpolate(previousX, previousY, Field.S));
  }

  public interpolate(x: number, y: number, field: Field) {
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

    const [i, k] = this.getGridPointFromCanvasPoint([x, y], field);

    const [gridX, gridY] = this.getCanvasPointFromGridPoint([i, k], field);

    const xx = x - gridX;
    const yy = y - gridY;

    const wX = Math.min(Math.max(0, 1 - xx / this.squareSize), 1);
    const wY = Math.min(Math.max(0, 1 - yy / this.squareSize), 1);

    const newValBot =
      wX * fieldArr.get(i, k) + (1 - wX) * fieldArr.get(i + 1, k);

    const newValTop =
      wX * fieldArr.get(i, k + 1) + (1 - wX) * fieldArr.get(i + 1, k + 1);

    const newVal = wY * newValBot + (1 - wY) * newValTop;

    return newVal;
  }

  public clear() {
    this.u.fill(0);
    this.v.fill(0);
    this.s.fill(0);
  }
}
