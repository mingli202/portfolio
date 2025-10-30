use crate::fluid::{Fluid, FluidSimulation};
use crate::util::gaussian;
use wasm_bindgen::prelude::*;

pub struct Scene {
    fluid: Fluid,
    canvas: web_sys::HtmlCanvasElement,

    mouse_radius: u8,
    subdivisions: u8,
    is_mouse_down: bool,
    last_time: f64,
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
            is_mouse_down: false,
            enable_playing: false,
            show_smoke: false,
            show_velocity_colors: true,
            last_time: -1.0,
            last_mouse_xy: (0, 0),
        }
    }

    pub fn init(&mut self) {
        self.fluid.fill_edges_with_obstacles();

        let cb = Closure::wrap(Box::new(|e: web_sys::PointerEvent| {
            if !&self.enable_playing || !&self.is_mouse_down {
                return;
            }

            if self.last_time <= 0.0 {
                self.last_time = e.time_stamp();
                self.last_mouse_xy = (e.offset_x(), e.offset_y());
                return;
            }

            let fluid = &mut self.fluid;

            let delta_t = e.time_stamp() - self.last_time;
            if delta_t < fluid.delta_t as f64 * 1000.0 {
                return;
            }

            self.last_time = e.time_stamp();

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
            .set_onpointermove(Some(cb.as_ref().unchecked_ref()));
    }
}

impl Drop for Scene {
    fn drop(&mut self) {
        self.canvas.set_onpointermove(None);
    }
}
