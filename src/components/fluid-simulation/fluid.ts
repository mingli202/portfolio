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
  public s: Grid; // smoke
  private b: Grid; // blocks and obstacles
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
  public overrelaxationCoefficient: number;

  public blockOffset: number;

  public get obstacles(): Grid {
    return this.b;
  }

  public constructor(
    canvas: HTMLCanvasElement,
    minSquares: number = 60,
    nIterations: number = 40,
    deltaT: number = 1 / 60,
    overrelaxationCoefficient: number = 1.7,
  ) {
    this.canvas = canvas;
    this.minSquares = minSquares;
    this.nIterations = nIterations;
    this.deltaT = deltaT;
    this.overrelaxationCoefficient = overrelaxationCoefficient;

    const h = Math.min(this.canvas.height, this.canvas.width);
    this.squareSize = h / this.minSquares;
    this.gridWidth = Math.ceil(this.canvas.width / this.squareSize);
    this.gridHeight = Math.ceil(this.canvas.height / this.squareSize);

    const n = 1;
    this.blockOffset = this.squareSize * n;

    this.u = new Grid(this.gridWidth + 1 + 2 * n, this.gridHeight + 2 * n);
    this.v = new Grid(this.gridWidth + 2 * n, this.gridHeight + 1 + 2 * n);
    this.b = new Grid(this.gridWidth + 2 * n, this.gridHeight + 2 * n);
    this.s = new Grid(this.gridWidth + 2 * n, this.gridHeight + 2 * n);

    this.nextU = new Grid(this.u.width, this.u.height);
    this.nextV = new Grid(this.v.width, this.v.height);
    this.nextS = new Grid(this.s.width, this.s.height);

    // initial smoke density
    this.randomizeSmoke();

    // the edges of the grid are obstacles
    this.b.fill(1);
    for (let i = 0; i < this.b.width; i++) {
      this.b.set(i, 0, 0);
      this.b.set(i, this.b.height - 1, 0);
    }

    for (let k = 0; k < this.b.height; k++) {
      this.b.set(0, k, 0);
      this.b.set(this.b.width - 1, k, 0);
    }
  }

  public simulate() {
    this.projection();
    this.advection();
  }

  public projection() {
    for (let l = 0; l < this.nIterations; l++) {
      this.solveDivergenceAll();
    }
  }

  public solveDivergenceAll() {
    this.b.forEach((val, i, k) => {
      if (val === 0) {
        this.v.set(i, k, 0);
        this.u.set(i, k, 0);
        return;
      }

      if (this.b.get(i - 1, k) === 0) {
        this.u.set(i, k, 0);
      }
      if (this.b.get(i, k - 1) === 0) {
        this.v.set(i, k, 0);
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
    // this.nextV = this.v;
    // this.nextU = this.u;
    // this.nextS = this.s;

    this.b.forEach((value, i, k) => {
      if (value === 0) {
        this.nextU.set(i, k, this.u.get(i, k));
        this.nextV.set(i, k, this.v.get(i, k));
        this.nextS.set(i, k, this.s.get(i, k));
        return;
      }

      // if (i === 5 && k === 5) {
      //   console.log(this.v.get(i, k));
      // }

      this.advectU(i, k);
      this.advectV(i, k);
      this.advectS(i, k);
    });

    this.b.forEach((_, i, k) => {
      this.u.set(i, k, this.nextU.get(i, k));
      this.v.set(i, k, this.nextV.get(i, k));
      this.s.set(i, k, this.nextS.get(i, k));
    });
  }

  public getGridPointFromCanvasPoint(
    point: [number, number],
    field?: Field,
  ): [number, number] {
    const x = Math.floor(
      (point[0] -
        ((field && field === Field.V) || field === Field.S
          ? this.squareSize / 2
          : 0) +
        this.blockOffset) /
        this.squareSize,
    );
    const y = Math.floor(
      (point[1] -
        ((field && field === Field.U) || field === Field.S
          ? this.squareSize / 2
          : 0) +
        this.blockOffset) /
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
      ((field && field === Field.V) || field === Field.S
        ? this.squareSize / 2
        : 0) -
      this.blockOffset;
    const y =
      point[1] * this.squareSize +
      ((field && field === Field.U) || field === Field.S
        ? this.squareSize / 2
        : 0) -
      this.blockOffset;
    return [x, y] as const;
  }

  public advectU(i: number, k: number) {
    if (this.b.get(i - 1, k) === 0) {
      this.nextU.set(i, k, this.u.get(i, k));
      return;
    }

    let [x, y] = this.getCanvasPointFromGridPoint([i, k], Field.U);

    const u = this.u.get(i, k);
    const vAvg = this.interpolate(x, y, Field.V);

    const previousX = x - u * this.deltaT;
    const previousY = y - vAvg * this.deltaT;

    this.nextU.set(i, k, this.interpolate(previousX, previousY, Field.U));
  }

  public advectV(i: number, k: number) {
    if (this.b.get(i, k - 1) === 0) {
      this.nextV.set(i, k, this.v.get(i, k));
      return;
    }

    let [x, y] = this.getCanvasPointFromGridPoint([i, k], Field.V);

    const v = this.v.get(i, k);
    const uAvg = this.interpolate(x, y, Field.U);

    const previousX = x - uAvg * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextV.set(i, k, this.interpolate(previousX, previousY, Field.V));
  }

  private advectS(i: number, k: number) {
    let [x, y] = this.getCanvasPointFromGridPoint([i, k], Field.S);
    const u = this.interpolate(x, y, Field.U);
    const v = this.interpolate(x, y, Field.V);

    const previousX = x - u * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextS.set(
      i,
      k,
      Math.max(this.interpolate(previousX, previousY, Field.S) - 2, 0),
    );
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

    const wX = 1 - xx / this.squareSize;
    const wY = 1 - yy / this.squareSize;

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

  public randomizeSmoke() {
    this.s.forEach((_, i, k) => {
      if (this.b.get(i, k) === 0) {
        return;
      }
      this.s.set(i, k, Math.random());
    });
  }
}
