use std::fmt::{Debug, Formatter};

#[derive(Clone)]
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

    pub fn swap(&mut self, other: &mut Grid<T>) {
        std::mem::swap(&mut self.grid, &mut other.grid);
    }

    pub fn resize(&mut self, width: usize, height: usize) {
        self.grid.resize(width, vec![T::default(); self.height()]);

        for i in 0..self.grid.len() {
            self.grid[i].resize(height, T::default());
        }
    }
}

impl<T: Debug> Debug for Grid<T> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "[")?;
        for k in 0..self.grid[0].len() {
            write!(f, "[")?;
            for i in 0..self.grid.len() {
                write!(f, "{:?},", self.grid[i][k])?;
            }
            writeln!(f, "]")?;
        }
        write!(f, "]")
    }
}
