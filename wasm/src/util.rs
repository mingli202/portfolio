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

pub struct RingBuffer {
    buf: Vec<f64>,
    tail: usize,
    sum: f64,
    size: usize,
    capacity: usize,
}

impl RingBuffer {
    pub fn new(capacity: usize) -> RingBuffer {
        RingBuffer {
            buf: vec![0.0; capacity],
            tail: 0,
            sum: 0.0,
            size: 0,
            capacity,
        }
    }

    pub fn push(&mut self, x: f64) {
        let prev = self.buf[self.tail];
        self.buf[self.tail] = x;

        self.sum -= prev;
        self.sum += x;

        self.tail = (self.tail + 1) % self.buf.len();
        self.size = self.capacity.min(self.size + 1);
    }

    pub fn average(&self) -> f64 {
        if self.size == 0 {
            return 0.0;
        }

        self.sum / self.size as f64
    }
}
