pub struct Grid<T> {
    grid: Vec<Vec<T>>,
}

impl<T: Default + Copy> Grid<T> {
    pub fn new(width: usize, height: usize) -> Grid<T> {
        let grid = vec![vec![T::default(); height]; width];

        Grid { grid }
    }

    pub fn width(&self) -> usize {
        self.grid.len()
    }

    pub fn height(&self) -> usize {
        self.grid[0].len()
    }

    pub fn has(&self, i: i32, k: i32) -> bool {
        i >= 0 && i < self.grid.len() as i32 && k >= 0 && k < self.grid[0].len() as i32
    }

    pub fn get(&self, i: i32, k: i32) -> T {
        if !self.has(i, k) {
            T::default()
        } else {
            let i = i as usize;
            let k = k as usize;
            self.grid[i][k]
        }
    }

    pub fn set(&mut self, i: i32, k: i32, value: T) {
        if !self.has(i, k) {
            return;
        }
        let i = i as usize;
        let k = k as usize;

        self.grid[i][k] = value;
    }

    pub fn update<F: Fn(T) -> T>(&mut self, i: i32, k: i32, f: F) {
        if !self.has(i, k) {
            return;
        }
        let i = i as usize;
        let k = k as usize;

        let value = f(self.grid[i][k]);

        self.grid[i][k] = value;
    }

    pub fn fill(&mut self, value: T) {
        for i in 0..self.grid.len() {
            for k in 0..self.grid[0].len() {
                self.grid[i][k] = value;
            }
        }
    }

    pub fn copy_from(&mut self, other: &Grid<T>) {
        assert_eq!(self.width(), other.width());
        assert_eq!(self.height(), other.height());

        for i in 0..self.grid.len() {
            for k in 0..self.grid[0].len() {
                self.grid[i][k] = other.grid[i][k];
            }
        }
    }
}
