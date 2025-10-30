use crate::grid::Grid;

enum Field {
    U,
    V,
    S,
}

trait FluidSimulation {
    fn simulate(&mut self) {
        self.projection();
        self.advection();
    }
    fn projection(&mut self);
    fn advection(&mut self);
    fn interpolate(&mut self, x: usize, y: usize, field: Field) -> f32;
    fn get_grid_indices_from_xy(&self, x: usize, y: usize, field: Option<&Field>)
        -> (usize, usize);
    fn get_xy_from_grid_indices(&self, x: usize, y: usize, field: Option<&Field>)
        -> (usize, usize);
}

pub struct Fluid {
    pub u: Grid<f32>,      // velocity in x direction
    pub v: Grid<f32>,      // velocity in y direction
    pub b: Grid<u8>,       // obstacles
    pub s: Grid<f32>,      // smoke (density)
    pub next_u: Grid<f32>, // velocity in x direction
    pub next_v: Grid<f32>, // velocity in y direction
    pub next_s: Grid<f32>, // smoke (density)

    pub square_size: f32,
    pub grid_width: usize,
    pub grid_height: usize,

    pub min_squares: usize,
    pub n_iterations: usize,
    pub delta_t: f32,
    pub overrelaxation_coefficient: f32,

    pub canvas: web_sys::HtmlCanvasElement,
}

impl Fluid {
    pub fn new(
        canvas: web_sys::HtmlCanvasElement,
        min_squares: Option<usize>,
        n_iterations: Option<usize>,
        delta_t: Option<f32>,
        overrelaxation_coefficient: Option<f32>,
    ) -> Fluid {
        let min_squares = min_squares.unwrap_or(40);

        let h = u32::min(canvas.width(), canvas.height());

        let square_size: f32 = h as f32 / min_squares as f32;
        let grid_width = canvas.width() as usize / square_size as usize;
        let grid_height = canvas.height() as usize / square_size as usize;

        let n_iterations = n_iterations.unwrap_or(40);
        let delta_t = delta_t.unwrap_or(1_f32 / 30_f32);
        let overrelaxation_coefficient = overrelaxation_coefficient.unwrap_or(1.7);

        let u = Grid::new(grid_width + 1, grid_height);
        let v = Grid::new(grid_width, grid_height + 1);
        let s = Grid::new(grid_width, grid_height);
        let mut b = Grid::new(grid_width, grid_height);
        b.fill(1);

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

            square_size,
            grid_width,
            grid_height,
            min_squares,
            n_iterations,
            delta_t,
            overrelaxation_coefficient,
            canvas,
        }
    }

    pub fn fill_edges_with_obstacles(&mut self) {
        for i in 0..self.b.width() {
            self.b.set(i, 0, 0);
            self.b.set(i, self.b.height() - 1, 0);
        }

        for k in 0..self.b.height() {
            self.b.set(0, k, 0);
            self.b.set(self.b.width() - 1, k, 0);
        }
    }
}

impl FluidSimulation for Fluid {
    fn projection(&mut self) {}
    fn advection(&mut self) {}
    fn interpolate(&mut self, x: usize, y: usize, field: Field) -> f32 {
        let fieldArr = match field {
            Field::U => &self.u,
            Field::V => &self.v,
            Field::S => &self.s,
        };

        let (i, k) = self.get_grid_indices_from_xy(x, y, Some(&field));
        let (gridX, gridY) = self.get_xy_from_grid_indices(i, k, Some(&field));

        let xx = x - gridX;
        let yy = y - gridY;

        let w_x = 1.0 - xx as f32 / self.square_size;
        let w_y = 1.0 - yy as f32 / self.square_size;

        let new_value_bot = w_x * fieldArr.get(i, k) + (1.0 - w_x) * fieldArr.get(i + 1, k);
        let new_value_top = w_x * fieldArr.get(i, k + 1) + (1.0 - w_x) * fieldArr.get(i + 1, k + 1);

        let new_value = w_y * new_value_bot + (1.0 - w_y) * new_value_top;

        new_value
    }

    fn get_grid_indices_from_xy(
        &self,
        x: usize,
        y: usize,
        field: Option<&Field>,
    ) -> (usize, usize) {
        let i = (x as f32
            - match field {
                Some(Field::V | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            })
            / self.square_size;

        let k = (y as f32
            - match field {
                Some(Field::U | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            })
            / self.square_size;

        (i as usize, k as usize)
    }

    fn get_xy_from_grid_indices(
        &self,
        i: usize,
        k: usize,
        field: Option<&Field>,
    ) -> (usize, usize) {
        let x = i as f32 * self.square_size
            + match field {
                Some(Field::V | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            };

        let y = k as f32 * self.square_size
            + match field {
                Some(Field::U | Field::S) => self.square_size / 2.0,
                _ => 0.0,
            };

        (x as usize, y as usize)
    }
}
