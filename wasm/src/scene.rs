use std::cell::RefCell;
use std::rc::Rc;

use crate::fluid::{Fluid, FluidSimulation};
use crate::util::gaussian;
use wasm_bindgen::prelude::*;

pub struct Scene {
    fluid: Fluid,
    canvas: web_sys::HtmlCanvasElement,

    mouse_radius: u8,
    subdivisions: u8,
    is_mouse_down: Rc<RefCell<bool>>,
    last_time: Rc<RefCell<f64>>,
    last_mouse_xy: (i32, i32),

    enable_playing: bool,
    show_smoke: bool,
    show_velocity_colors: bool,
}

impl Scene {
    pub fn new(canvas: web_sys::HtmlCanvasElement, fluid: Fluid) -> Scene {
        Scene {
            fluid,
            canvas,
            mouse_radius: 10,
            subdivisions: 40,
            is_mouse_down: Rc::new(RefCell::new(false)),
            enable_playing: false,
            show_smoke: false,
            show_velocity_colors: true,
            last_time: Rc::new(RefCell::new(-1.0)),
            last_mouse_xy: (0, 0),
        }
    }

    pub fn init(&mut self) {
        self.fluid.fill_edges_with_obstacles();

        let mouse_move_cb = Closure::wrap(Box::new(|e: web_sys::PointerEvent| {
            if !self.enable_playing || !*self.is_mouse_down.borrow() {
                return;
            }
            if *self.last_time.borrow() <= 0.0 {
                *self.last_time.borrow_mut() = e.time_stamp();
                self.last_mouse_xy = (e.offset_x(), e.offset_y());
                return;
            }

            let fluid = &mut self.fluid;

            let delta_t = e.time_stamp() - *self.last_time.borrow();
            if delta_t < fluid.delta_t as f64 * 1000.0 {
                return;
            }

            *self.last_time.borrow_mut() = e.time_stamp();

            let delta_x = e.offset_x() - self.last_mouse_xy.0;
            let delta_y = e.offset_y() - self.last_mouse_xy.1;
            let norm = f64::sqrt((delta_x * delta_x + delta_y * delta_y) as f64);

            self.last_mouse_xy = (e.offset_x(), e.offset_y());

            let (x, y) =
                fluid.get_grid_indices_from_xy(e.offset_x() as f32, e.offset_y() as f32, None);

            if fluid.b.get(x, y) == 0 {
                return;
            }

            for i in 0..self.mouse_radius {
                for k in 0..self.mouse_radius {
                    let i = i as i32;
                    let k = k as i32;
                    let mult = gaussian(i, k, self.mouse_radius as f64 / 2.0);

                    fluid
                        .u
                        .update(x + i, y + k, |u| u + (mult * delta_t) as f32);
                    fluid
                        .v
                        .update(x + i, y + k, |v| v + (mult * delta_t) as f32);
                    fluid.s.update(x + i, y + k, |s| s + (mult * norm) as f32);
                }
            }
        }) as Box<dyn FnMut(_)>);

        self.canvas
            .set_onpointermove(Some(mouse_move_cb.as_ref().unchecked_ref()));

        self.canvas.set_onpointerdown(Some(
            Closure::wrap(Box::new(|_e: web_sys::PointerEvent| {
                *self.is_mouse_down.borrow_mut() = true;
            }) as Box<dyn FnMut(_)>)
            .as_ref()
            .unchecked_ref(),
        ));

        self.canvas.set_onpointerup(Some(
            Closure::wrap(Box::new(|_e: web_sys::PointerEvent| {
                *self.is_mouse_down.borrow_mut() = false;
                *self.last_time.borrow_mut() = -1.0;
            }) as Box<dyn FnMut(_)>)
            .as_ref()
            .unchecked_ref(),
        ));
    }

    pub fn draw_next_frame(&mut self) {}

    pub fn clear(&mut self) {
        self.fluid.clear();
        self.draw_next_frame();
    }
}

impl Drop for Scene {
    fn drop(&mut self) {
        self.canvas.set_onpointermove(None);
    }
}
