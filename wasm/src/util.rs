pub fn gaussian(x: i32, y: i32, sigma: f64) -> f64 {
    (-(x.pow(2) + y.pow(2)) as f64 / (2.0 * sigma * sigma)).exp()
}

pub fn map(x: f64, in_min: f64, in_max: f64, out_min: f64, out_max: f64) -> f64 {
    (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

pub fn is_mobile() -> bool {
    let user_agent = web_sys::window()
        .unwrap()
        .navigator()
        .user_agent()
        .unwrap_or("".to_string());

    user_agent.contains("Mobi") || user_agent.contains("Android")
}
