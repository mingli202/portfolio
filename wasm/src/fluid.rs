use crate::grid::Grid;

#[derive(Debug, Clone)]
pub enum Field {
    U,
    V,
    S,
}
pub trait FluidSimulation {
    fn projection(&mut self);
    fn advection(&mut self);
    fn interpolate(&self, x: f64, y: f64, field: Field) -> f64;
    fn get_grid_indices_from_xy(&self, x: f64, y: f64, field: Option<&Field>) -> (i32, i32);
    fn get_xy_from_grid_indices(&self, x: i32, y: i32, field: Option<&Field>) -> (f64, f64);
}

#[derive(Debug, Clone)]
pub struct Fluid {
    pub u: Grid<f64>,      // velocity in x direction
    pub v: Grid<f64>,      // velocity in y direction
    pub b: Grid<u8>,       // obstacles
    pub s: Grid<f64>,      // smoke (density)
    pub next_u: Grid<f64>, // velocity in x direction
    pub next_v: Grid<f64>, // velocity in y direction
    pub next_s: Grid<f64>, // smoke (density)

    pub n: usize,
    pub square_size: f64,
    pub n_iterations: usize,
    pub delta_t: f64,
    pub overrelaxation_coefficient: f64,
    pub grid_width: usize,
    pub grid_height: usize,
    pub max_squares: usize,

    pub block_offset: f64,
}

impl Fluid {
    pub fn new(
        canvas: &web_sys::HtmlCanvasElement,
        min_squares: Option<usize>,
        n_iterations: Option<usize>,
        delta_t: Option<f64>,
        overrelaxation_coefficient: Option<f64>,
    ) -> Fluid {
        let max_squares = min_squares.unwrap_or(200);

        let h = u32::max(canvas.width(), canvas.height());

        let square_size: f64 = h as f64 / max_squares as f64;

        let grid_width = (canvas.width() as f64 / square_size).ceil() as usize;
        let grid_height = (canvas.height() as f64 / square_size).ceil() as usize;

        let n_iterations = n_iterations.unwrap_or(40);
        let delta_t = delta_t.unwrap_or(1_f64 / 60_f64);
        let overrelaxation_coefficient = overrelaxation_coefficient.unwrap_or(1.7);

        let n = 1;
        let block_offset = square_size * n as f64;

        let u = Grid::new(grid_width + 1 + 2 * n, grid_height + 2 * n);
        let v = Grid::new(grid_width + 2 * n, grid_height + 1 + 2 * n);
        let s = Grid::new(grid_width + 2 * n, grid_height + 2 * n);
        let b = Grid::new(grid_width + 2 * n, grid_height + 2 * n);

        let next_u = Grid::new(u.width(), u.height());
        let next_v = Grid::new(v.width(), v.height());
        let next_s = Grid::new(s.width(), s.height());

        Fluid {
            u,
            v,
            b,
            s,
            next_u,
            next_v,
            next_s,
            block_offset,
            grid_width,
            grid_height,
            max_squares,
            n,

            square_size,
            n_iterations,
            delta_t,
            overrelaxation_coefficient,
        }
    }

    pub fn fill_edges_with_obstacles(&mut self) {
        self.b.fill(1);

        for i in 0..self.b.width() {
            let i = i as i32;
            self.b.set(i, 0, 0);
            self.b.set(i, self.b.height() as i32 - 1, 0);
        }

        for k in 0..self.b.height() {
            let k = k as i32;
            self.b.set(0, k, 0);
            self.b.set(self.b.width() as i32 - 1, k, 0);
        }
    }

    pub fn solve_divergence_for_all(&mut self) {
        for i in 0..self.b.width() {
            for k in 0..self.b.height() {
                let i = i as i32;
                let k = k as i32;

                if self.b.get(i, k) == 0 {
                    self.u.set(i, k, 0.0);
                    self.v.set(i, k, 0.0);
                    continue;
                }
                if self.b.get(i - 1, k) == 0 {
                    self.u.set(i, k, 0.0);
                }
                if self.b.get(i, k - 1) == 0 {
                    self.v.set(i, k, 0.0);
                }

                self.solve_divergence(i, k);
            }
        }
    }

    fn solve_divergence(&mut self, i: i32, k: i32) {
        let b0 = self.b.get(i - 1, k);
        let b1 = self.b.get(i + 1, k);
        let b2 = self.b.get(i, k - 1);
        let b3 = self.b.get(i, k + 1);

        let b = b0 + b1 + b2 + b3;

        if b == 0 {
            return;
        }

        let divergence = (self.get_divergence(i, k) * self.overrelaxation_coefficient) / b as f64;

        self.u.update(i, k, |v| v + divergence * b0 as f64);
        self.u.update(i + 1, k, |v| v - divergence * b1 as f64);
        self.v.update(i, k, |v| v + divergence * b2 as f64);
        self.v.update(i, k + 1, |v| v - divergence * b3 as f64);
    }

    fn get_divergence(&self, i: i32, k: i32) -> f64 {
        self.u.get(i + 1, k) - self.u.get(i, k) + self.v.get(i, k + 1) - self.v.get(i, k)
    }

    fn advect_u(&mut self, i: i32, k: i32) {
        if self.b.get(i - 1, k) == 0 {
            self.next_u.set(i, k, self.u.get(i, k));
            return;
        }

        let (x, y) = self.get_xy_from_grid_indices(i, k, Some(&Field::U));

        let u = self.u.get(i, k);
        let v = self.interpolate(x, y, Field::V);

        let previous_x = x - u * self.delta_t;
        let previous_y = y - v * self.delta_t;

        let next_val = self.interpolate(previous_x, previous_y, Field::U);

        self.next_u.set(i, k, next_val);
    }

    fn advect_v(&mut self, i: i32, k: i32) {
        if self.b.get(i, k - 1) == 0 {
            self.next_v.set(i, k, self.v.get(i, k));
            return;
        }

        let (x, y) = self.get_xy_from_grid_indices(i, k, Some(&Field::V));

        let u = self.interpolate(x, y, Field::U);
        let v = self.v.get(i, k);

        let previous_x = x - u * self.delta_t;
        let previous_y = y - v * self.delta_t;

        let next_val = self.interpolate(previous_x, previous_y, Field::V);

        self.next_v.set(i, k, next_val);
    }

    fn advect_s(&mut self, i: i32, k: i32) {
        let (x, y) = self.get_xy_from_grid_indices(i, k, Some(&Field::S));

        let u = self.interpolate(x, y, Field::U);
        let v = self.interpolate(x, y, Field::V);

        let previous_x = x - u * self.delta_t;
        let previous_y = y - v * self.delta_t;

        let next_val = f64::max(
            self.interpolate(previous_x, previous_y, Field::S) / 1.1 - 0.1,
            0.0,
        );

        self.next_s.set(i, k, next_val);
    }

    pub fn clear(&mut self) {
        self.u.fill(0.0);
        self.v.fill(0.0);
        self.s.fill(0.0);
    }

    pub fn resize(&mut self, width: f64, height: f64) {
        let h = f64::max(width, height);
        let square_size: f64 = h / self.max_squares as f64;
        self.square_size = square_size;

        let grid_width = (width / square_size).ceil() as usize;
        let grid_height = (height / square_size).ceil() as usize;

        self.grid_width = grid_width;
        self.grid_height = grid_height;

        self.u
            .resize(grid_width + 2 * self.n + 1, grid_height + 2 * self.n);
        self.v
            .resize(grid_width + 2 * self.n, grid_height + 2 * self.n + 1);
        self.s
            .resize(grid_width + 2 * self.n, grid_height + 2 * self.n);
        self.b
            .resize(grid_width + 2 * self.n, grid_height + 2 * self.n);

        self.next_u.resize(self.u.width(), self.u.height());
        self.next_v.resize(self.v.width(), self.v.height());
        self.next_s.resize(self.s.width(), self.s.height());

        self.fill_edges_with_obstacles();
    }
}

impl FluidSimulation for Fluid {
    fn projection(&mut self) {
        for _ in 0..self.n_iterations {
            self.solve_divergence_for_all();
        }
    }

    fn advection(&mut self) {
        for i in 0..self.b.width() {
            for k in 0..self.b.height() {
                let i = i as i32;
                let k = k as i32;

                if self.b.get(i, k) == 0 {
                    self.next_u.set(i, k, self.u.get(i, k));
                    self.next_v.set(i, k, self.v.get(i, k));
                    self.next_s.set(i, k, self.s.get(i, k));
                    continue;
                }

                self.advect_u(i, k);
                self.advect_v(i, k);
                self.advect_s(i, k);
            }
        }

        self.u.swap(&mut self.next_u);
        self.v.swap(&mut self.next_v);
        self.s.swap(&mut self.next_s);
    }

    fn interpolate(&self, x: f64, y: f64, field: Field) -> f64 {
        let field_arr = match field {
            Field::U => &self.u,
            Field::V => &self.v,
            Field::S => &self.s,
        };

        let (i, k) = self.get_grid_indices_from_xy(x, y, Some(&field));
        let (grid_x, grid_y) = self.get_xy_from_grid_indices(i, k, Some(&field));

        let xx = x - grid_x;
        let yy = y - grid_y;

        let w_x = 1.0 - xx / self.square_size;
        let w_y = 1.0 - yy / self.square_size;

        let new_value_bot = w_x * field_arr.get(i, k) + (1.0 - w_x) * field_arr.get(i + 1, k);
        let new_value_top =
            w_x * field_arr.get(i, k + 1) + (1.0 - w_x) * field_arr.get(i + 1, k + 1);

        w_y * new_value_bot + (1.0 - w_y) * new_value_top
    }

    fn get_grid_indices_from_xy(&self, x: f64, y: f64, field: Option<&Field>) -> (i32, i32) {
        let i = (x - match field {
            Some(Field::V | Field::S) => self.square_size / 2.0,
            _ => 0.0,
        } + self.block_offset)
            / self.square_size;

        let k = (y - match field {
            Some(Field::U | Field::S) => self.square_size / 2.0,
            _ => 0.0,
        } + self.block_offset)
            / self.square_size;

        (i as i32, k as i32)
    }

    fn get_xy_from_grid_indices(&self, i: i32, k: i32, field: Option<&Field>) -> (f64, f64) {
        let x = i as f64 * self.square_size
            + match field {
                Some(Field::V | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            }
            - self.block_offset;

        let y = k as f64 * self.square_size
            + match field {
                Some(Field::U | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            }
            - self.block_offset;

        (x, y)
    }
}
