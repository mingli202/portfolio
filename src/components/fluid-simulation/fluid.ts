export const Field = {
  U: "U",
  V: "V",
  S: "S", // smoke
} as const;

export type Field = (typeof Field)[keyof typeof Field];

export class Fluid {
  private u: Float32Array[]; // x-direction
  private v: Float32Array[]; // y-direction
  private s: Float32Array[]; // blocks and obstacles
  private p: Float32Array[]; // pressure
  private canvas: HTMLCanvasElement;

  private nextU: Float32Array[]; // x-direction
  private nextV: Float32Array[]; // y-direction
  private nextS: Float32Array[]; // smoke

  private squareSize: number;
  private gridWidth: number;
  private gridHeight: number;

  public minSquares: number;
  public nIterations: number;
  public deltaT: number;
  public density: number;
  public gravity: number;
  public overrelaxationCoefficient: number;

  public constructor(
    minSquares: number = 100,
    nIterations: number = 100,
    deltaT: number = 1 / 30,
    density: number = 1,
    gravity: number = -9.81,
    overrelaxationCoefficient: number = 1.9,
  ) {
    this.minSquares = minSquares;
    this.nIterations = nIterations;
    this.deltaT = deltaT;
    this.density = density;
    this.gravity = gravity;
    this.overrelaxationCoefficient = overrelaxationCoefficient;

    this.canvas = document.querySelector("canvas")!;

    const h = Math.min(this.canvas.height, this.canvas.width);
    this.squareSize = Math.ceil(h / this.minSquares);
    this.gridWidth = Math.ceil(this.canvas.width / this.squareSize);
    this.gridHeight = Math.ceil(this.canvas.height / this.squareSize);

    this.u = Array(this.gridHeight + 1)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth + 1).fill(0));
    this.v = Array(this.gridHeight + 1)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth + 1).fill(0));
    this.s = Array(this.gridHeight)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth).fill(1));
    this.p = Array(this.gridHeight)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth).fill(0));
    this.nextU = Array(this.gridHeight)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth).fill(0));
    this.nextV = Array(this.gridHeight)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth).fill(0));
    this.nextS = Array(this.gridHeight)
      .fill(0)
      .map(() => new Float32Array(this.gridWidth).fill(0));

    console.log(this.s);
  }

  public simulate() {
    this.applyExternalForces();
    this.projection();
    this.advection();
  }

  private applyExternalForces() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let k = 0; k < this.gridWidth; k++) {
        this.v[i][k] += this.deltaT * this.gravity;
      }
    }
  }

  private projection() {
    for (let l = 0; l < this.nIterations; l++) {
      for (let i = 0; i < this.gridHeight; i++) {
        for (let k = 0; k < this.gridWidth; k++) {
          const divergence =
            (this.u[i][k + 1] -
              this.u[i][k] +
              this.v[i + 1][k] -
              this.v[i][k]) *
            this.overrelaxationCoefficient;

          const s0 = k + 1 < this.gridWidth ? this.s[i][k + 1] : 0;
          const s1 = k - 1 >= 0 ? this.s[i][k - 1] : 0;
          const s2 = i + 1 < this.gridHeight ? this.s[i + 1][k] : 0;
          const s3 = i - 1 >= 0 ? this.s[i - 1][k] : 0;

          const s = s0 + s1 + s2 + s3;

          this.u[i][k] += (divergence * s1) / s;
          this.u[i][k + 1] -= (divergence * s0) / s;
          this.v[i][k] += (divergence * s3) / s;
          this.v[i + 1][k] -= (divergence * s2) / s;

          this.p[i][k] +=
            (divergence / s) * ((this.density * this.squareSize) / this.deltaT);
        }
      }
    }
  }

  private advection() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let k = 0; k < this.gridWidth; k++) {
        this.advectV(i, k);
        this.advectU(i, k);
        this.advectS(i, k);
      }
    }

    this.v = this.nextV;
    this.u = this.nextU;
    this.s = this.nextS;
  }

  private getNeighborsVAverage(i: number, k: number) {
    let s = 0;
    let n = 0;

    s += this.v[i][k];
    if (k - 1 >= 0) {
      s += this.v[i][k - 1];
      n++;
    }
    if (i + 1 < this.gridHeight) {
      s += this.v[i + 1][k];
      n++;
    }
    if (k - 1 >= 0 && i + 1 < this.gridHeight) {
      s += this.v[i + 1][k - 1];
      n++;
    }

    return s / n;
  }

  private getNeighborsUAverage(i: number, k: number) {
    let s = 0;
    let n = 0;

    s += this.u[i][k];
    if (k - 1 >= 0) {
      s += this.u[i][k - 1];
      n++;
    }
    if (i + 1 < this.gridHeight) {
      s += this.u[i + 1][k];
      n++;
    }
    if (k - 1 >= 0 && i + 1 < this.gridHeight) {
      s += this.u[i + 1][k - 1];
      n++;
    }

    return s / n;
  }

  private getGridPointFromCanvasPoint(
    point: [number, number],
  ): [number, number] {
    console.log("point", point);
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
    const u = this.u[i][k];
    const vAvg = this.getNeighborsVAverage(i, k);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    y += this.squareSize / 2;

    const previousX = x - u * this.deltaT;
    const previousY = y - vAvg * this.deltaT;

    this.nextV[i][k] = this.interpolate(previousX, previousY, Field.V);
  }

  private advectU(i: number, k: number) {
    const v = this.v[i][k];
    const uAvg = this.getNeighborsUAverage(i, k);
    console.log("uAvg", uAvg);

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    x += this.squareSize / 2;
    console.log("x", x);
    console.log("y", y);

    const previousX = x - uAvg * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextU[i][k] = this.interpolate(previousX, previousY, Field.U);
  }

  private advectS(i: number, k: number) {
    const v =
      (this.v[i][k] + (i + 1 < this.gridHeight ? this.v[i + 1][k] : 0)) / 2;
    const u =
      (this.u[i][k] + (k + 1 < this.gridWidth ? this.u[i][k + 1] : 0)) / 2;

    let [x, y] = this.getCanvasPointFromGridPoint([i, k]);
    x += this.squareSize / 2;
    y += this.squareSize / 2;

    const previousX = x - u * this.deltaT;
    const previousY = y - v * this.deltaT;

    this.nextS[i][k] = this.interpolate(previousX, previousY, Field.S);
  }

  private interpolate(previousX: number, previousY: number, field: Field) {
    let fieldArr: Float32Array[];

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

    const [previousI, previousK] = this.getGridPointFromCanvasPoint([
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

    console.log(field);
    console.log(fieldArr);
    console.log(previousI, previousK, fieldArr[previousI]);

    const newVal =
      w_00 *
        w_10 *
        (previousK - 1 >= 0 ? fieldArr[previousI][previousK - 1] : 0) +
      w_01 * w_10 * fieldArr[previousI][previousK] +
      w_00 *
        w_11 *
        (previousI + 1 < this.gridHeight && previousK - 1 >= 0
          ? fieldArr[previousI + 1][previousK - 1]
          : 0) +
      w_01 *
        w_11 *
        (previousI < this.gridHeight ? fieldArr[previousI + 1][previousK] : 0);

    return newVal;
  }
}
