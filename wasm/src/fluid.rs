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

        let u = vec![vec![0.0; min_squares]; min_squares + 1];
        let v = vec![vec![0.0; min_squares + 1]; min_squares];
        let b = vec![vec![1; min_squares + 1]; min_squares + 1];
        let s = vec![vec![0.0; min_squares + 1]; min_squares + 1];

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
}
