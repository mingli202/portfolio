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

    pub fn has(&self, i: usize, k: usize) -> bool {
        i >= 0 && i < self.grid.len() && k >= 0 && k < self.grid[0].len()
    }

    pub fn get(&self, i: usize, k: usize) -> T {
        if !self.has(i, k) {
            T::default()
        } else {
            self.grid[i][k]
        }
    }

    pub fn set(&mut self, i: usize, k: usize, value: T) {
        if !self.has(i, k) {
            return;
        }

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
