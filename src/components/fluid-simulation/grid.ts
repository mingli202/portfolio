export class Grid {
  private _grid: Float32Array[];

  public get grid(): Float32Array[] {
    return this.grid;
  }

  public get width(): number {
    return this._grid[0].length;
  }

  public get height(): number {
    return this._grid.length;
  }

  constructor(width: number, height: number) {
    this._grid = Array(height)
      .fill(0)
      .map(() => new Float32Array(width).fill(0));
  }

  public fill(value: number): void {
    this.forEach((_, x, y) => {
      this.set(x, y, value);
    });
  }

  /*
   * Iterate over the grid and call the callback function for each value.
   * The callback function takes three arguments: the value of the cell, the x-coordinate of the cell, and the y-coordinate of the cell.
   * If the callback function returns true, the iteration will stop and the function will return.
   * */
  public forEach(
    callback: (value: number, x: number, y: number) => boolean | void,
  ): void {
    let breakFlag = false;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (callback(this._grid[y][x], x, y) === true) {
          breakFlag = true;
          break;
        }
      }
      if (breakFlag) {
        break;
      }
    }
  }

  public has(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  public get(x: number, y: number): number {
    if (!this.has(x, y)) {
      return 0;
    }

    return this._grid[y][x];
  }

  /**
   * Set the value of a cell in the grid.
   * @param x The x-coordinate of the cell (column).
   * @param y The y-coordinate of the cell (row)
   * @param value The value to set.
   */
  public set(
    x: number,
    y: number,
    value: number | ((val: number) => number),
  ): void {
    let val;
    if (typeof value === "function") {
      val = value(this.get(x, y));
    } else {
      val = value;
    }

    if (isNaN(val)) {
      throw new Error("value is NaN");
    }

    this._grid[y][x] = val;
  }
}
