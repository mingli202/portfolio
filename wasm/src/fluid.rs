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
    fn interpolate(&mut self, x: usize, y: usize, field: Option<Field>) -> f32;
    fn get_grid_indices_from_xy(&self, x: usize, y: usize, field: Option<Field>) -> (usize, usize);
    fn get_xy_from_grid_indices(&self, x: usize, y: usize, field: Option<Field>) -> (usize, usize);
}

pub struct Fluid {
    pub u: Vec<Vec<f32>>,      // velocity in x direction
    pub v: Vec<Vec<f32>>,      // velocity in y direction
    pub b: Vec<Vec<u8>>,       // obstacles
    pub s: Vec<Vec<f32>>,      // smoke (density)
    pub next_u: Vec<Vec<f32>>, // velocity in x direction
    pub next_v: Vec<Vec<f32>>, // velocity in y direction
    pub next_s: Vec<Vec<f32>>, // smoke (density)

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

        let u = vec![vec![0.0; grid_height]; grid_width + 1];
        let v = vec![vec![0.0; grid_height + 1]; grid_width];
        let b = vec![vec![1; grid_height]; grid_width];
        let s = vec![vec![0.0; b[0].len()]; b.len()];

        let next_u = vec![vec![0.0; u[0].len()]; u.len()];
        let next_v = vec![vec![0.0; v[0].len()]; v.len()];
        let next_s = vec![vec![0.0; s[0].len()]; s.len()];

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
        for i in 0..self.b.len() {
            self.b[i][0] = 0;
            *self.b[i].last_mut().unwrap() = 0;
        }

        for k in 0..self.b[0].len() {
            self.b[0][k] = 0;
            self.b.last_mut().unwrap()[k] = 0;
        }
    }
}

impl FluidSimulation for Fluid {
    fn projection(&mut self) {}
    fn advection(&mut self) {}
    fn interpolate(&mut self, x: usize, y: usize, field: Option<Field>) -> f32 {}

    fn get_grid_indices_from_xy(&self, x: usize, y: usize, field: Option<Field>) -> (usize, usize) {
        let i = (x as f32
            - if let Some(f) = &field {
                match f {
                    Field::V | Field::S => self.square_size / 2.0,
                    _ => 0.0,
                }
            } else {
                0.0
            })
            / self.square_size;

        let k = (y as f32
            - if let Some(f) = &field {
                match f {
                    Field::U | Field::S => self.square_size / 2.0,
                    _ => 0.0,
                }
            } else {
                0.0
            })
            / self.square_size;

        (i as usize, k as usize)
    }

    fn get_xy_from_grid_indices(&self, i: usize, k: usize, field: Option<Field>) -> (usize, usize) {
        let x = i as f32 * self.square_size
            + if let Some(f) = &field {
                match f {
                    Field::V | Field::S => self.square_size / 2.0,
                    _ => 0.0,
                }
            } else {
                0.0
            };

        let y = k as f32 * self.square_size
            + if let Some(f) = &field {
                match f {
                    Field::U | Field::S => self.square_size / 2.0,
                    _ => 0.0,
                }
            } else {
                0.0
            };

        (x as usize, y as usize)
    }
}
