pub fn gaussian(x: i32, y: i32, sigma: f64) -> f64 {
    (-(x.pow(2) + y.pow(2)) as f64 / (2.0 * sigma * sigma)).exp()
        / (2.0 * std::f64::consts::PI * sigma * sigma)
}

pub fn map(x: f32, in_min: f32, in_max: f32, out_min: f32, out_max: f32) -> f32 {
    (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
