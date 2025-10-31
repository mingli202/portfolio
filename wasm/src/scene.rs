use std::cell::RefCell;
use std::rc::Rc;

use crate::fluid::{Field, Fluid, FluidSimulation};
use crate::util::{gaussian, map};
use wasm_bindgen::prelude::*;

type AnimationFrameCb = Rc<RefCell<Option<Closure<dyn FnMut(f64)>>>>;
type MouseMoveCb = Rc<Closure<dyn FnMut(web_sys::PointerEvent)>>;

pub struct Scene {
    fluid: Fluid,
    canvas: web_sys::HtmlCanvasElement,

    mouse_radius: u8,
    subdivisions: u8,
    is_mouse_down: Rc<RefCell<bool>>,
    last_time: Rc<RefCell<f64>>,
    last_mouse_xy: (i32, i32),
    then: f64,
    max_velocity: f32,

    enable_playing: bool,
    show_smoke: bool,
    show_velocity_colors: bool,

    animation_id: Option<i32>,
    animation_cb: Option<AnimationFrameCb>,
    mouse_move_cb: Option<MouseMoveCb>,
}

impl Scene {
    pub fn new(canvas: web_sys::HtmlCanvasElement, fluid: Fluid) -> Scene {
        let max_velocity = f32::min(canvas.width() as f32, canvas.height() as f32);

        Scene {
            fluid,
            canvas,
            mouse_radius: 10,
            subdivisions: 40,
            max_velocity,
            is_mouse_down: Rc::new(RefCell::new(true)),
            enable_playing: true,
            show_smoke: false,
            show_velocity_colors: true,
            last_time: Rc::new(RefCell::new(-1.0)),
            last_mouse_xy: (0, 0),
            then: 0.0,
            animation_id: None,
            animation_cb: None,
            mouse_move_cb: None,
        }
    }

    pub fn draw_next_frame(&mut self) {
        self.clear_canvas();
        self.fluid.simulate();
        if self.show_velocity_colors {
            self.draw_velocity_colors();
        } else if self.show_smoke {
            self.draw_smoke();
        }
    }

    pub fn clear(&mut self) {
        self.fluid.clear();
        self.draw_next_frame();
    }

    pub fn clear_canvas(&mut self) {
        let ctx = self
            .canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        ctx.clear_rect(
            0.0,
            0.0,
            self.canvas.width() as f64,
            self.canvas.height() as f64,
        );
    }

    pub fn draw_velocity_colors(&self) {
        let ctx = self.get_ctx();
        let scale = self.fluid.square_size / self.subdivisions as f32;

        for i in 0..self.fluid.b.width() {
            for k in 0..self.fluid.b.height() {
                let i = i as i32;
                let k = k as i32;

                let (xx, yy) = self.fluid.get_xy_from_grid_indices(i, k, None);

                let v = self.fluid.interpolate(
                    xx + (i as f32 + 0.5) * scale,
                    yy + (k as f32 + 0.5) * scale,
                    Field::V,
                );
                let u = self.fluid.interpolate(
                    xx + (i as f32 + 0.5) * scale,
                    yy + (k as f32 + 0.5) * scale,
                    Field::U,
                );

                let length = f32::sqrt(v * v + u * u);

                let hue =
                    (240.0 - map(length, 0.0, self.max_velocity, 0.0, 240.0)).clamp(0.0, 360.0);

                ctx.set_fill_style_str(&format!("hsl({}, 100%, 50%)", hue));
                ctx.fill_rect(
                    xx as f64 + (i as f64 * scale as f64),
                    yy as f64 + (k as f64 * scale as f64),
                    scale as f64 + 1.0,
                    scale as f64 + 1.0,
                );
            }
        }
    }

    pub fn draw_smoke(&self) {
        let ctx = self.get_ctx();
        let scale = self.fluid.square_size / self.subdivisions as f32;

        for i in 0..self.fluid.s.width() {
            for k in 0..self.fluid.s.height() {
                let i = i as i32;
                let k = k as i32;

                let (xx, yy) = self.fluid.get_xy_from_grid_indices(i, k, None);

                let s = self.fluid.interpolate(
                    xx + (i as f32 + 0.5) * scale,
                    yy + (k as f32 + 0.5) * scale,
                    Field::S,
                );

                let rgb_val = (s / self.max_velocity).clamp(0.0, 1.0) * 255.0;

                ctx.set_fill_style_str(&format!("rgb({rgb_val}, {rgb_val}, {rgb_val}, 1)"));
                ctx.fill_rect(
                    xx as f64 + (i as f64 * scale as f64),
                    yy as f64 + (k as f64 * scale as f64),
                    scale as f64 + 1.0,
                    scale as f64 + 1.0,
                );
            }
        }
    }

    fn get_ctx(&self) -> web_sys::CanvasRenderingContext2d {
        self.canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap()
    }

    pub fn init(self_ref: Rc<RefCell<Option<Self>>>) {
        let s = Rc::clone(&self_ref);
        let s = &mut s.borrow_mut();
        let s = s.as_mut().unwrap();

        s.fluid.fill_edges_with_obstacles();

        let mouse_move_cb = Rc::new(Closure::wrap(Box::new(move |e: web_sys::PointerEvent| {
            let s = Rc::clone(&self_ref);
            let s = &mut s.borrow_mut();
            let s = s.as_mut().unwrap();

            web_sys::console::log_1(&"mouse_move_cb".into());

            if !s.enable_playing || !*s.is_mouse_down.borrow() {
                return;
            }
            if *s.last_time.borrow() <= 0.0 {
                *s.last_time.borrow_mut() = e.time_stamp();
                s.last_mouse_xy = (e.offset_x(), e.offset_y());
                return;
            }

            let fluid = &mut s.fluid;

            let delta_t = e.time_stamp() - *s.last_time.borrow();
            if delta_t < fluid.delta_t as f64 * 1000.0 {
                return;
            }

            *s.last_time.borrow_mut() = e.time_stamp();

            let delta_x = e.offset_x() - s.last_mouse_xy.0;
            let delta_y = e.offset_y() - s.last_mouse_xy.1;
            let norm = f64::sqrt((delta_x * delta_x + delta_y * delta_y) as f64);

            s.last_mouse_xy = (e.offset_x(), e.offset_y());

            let (x, y) =
                fluid.get_grid_indices_from_xy(e.offset_x() as f32, e.offset_y() as f32, None);

            if fluid.b.get(x, y) == 0 {
                return;
            }

            for i in 0..s.mouse_radius {
                for k in 0..s.mouse_radius {
                    let i = i as i32;
                    let k = k as i32;
                    let mult = gaussian(i, k, s.mouse_radius as f64 / 2.0);

                    fluid
                        .u
                        .update(x + i, y + k, |u| u + (mult * delta_x as f64) as f32);

                    fluid
                        .v
                        .update(x + i, y + k, |v| v + (mult * delta_y as f64) as f32);

                    fluid.s.update(x + i, y + k, |s| s + (mult * norm) as f32);
                }
            }
        }) as Box<dyn FnMut(_)>));

        s.mouse_move_cb.replace(Rc::clone(&mouse_move_cb));

        s.canvas
            .set_onpointermove(Some((*mouse_move_cb).as_ref().unchecked_ref()));

        // self.canvas.set_onpointerdown(Some(
        //     Closure::wrap(Box::new(|_e: web_sys::PointerEvent| {
        //         *self.is_mouse_down.borrow_mut() = true;
        //     }) as Box<dyn FnMut(_)>)
        //     .as_ref()
        //     .unchecked_ref(),
        // ));
        //
        // self.canvas.set_onpointerup(Some(
        //     Closure::wrap(Box::new(|_e: web_sys::PointerEvent| {
        //         *self.is_mouse_down.borrow_mut() = false;
        //         *self.last_time.borrow_mut() = -1.0;
        //     }) as Box<dyn FnMut(_)>)
        //     .as_ref()
        //     .unchecked_ref(),
        // ));
    }

    pub fn play(self_ref: Rc<RefCell<Option<Self>>>) {
        let f: AnimationFrameCb = Rc::new(RefCell::new(None));
        let g = Rc::clone(&f);
        let s = Rc::clone(&self_ref);

        *g.borrow_mut() = Some(Closure::wrap(Box::new(move |now: f64| {
            let s = &mut s.borrow_mut();
            let s = s.as_mut().unwrap();

            if !s.enable_playing {
                return;
            }

            let delta = now - s.then;
            if delta > s.fluid.delta_t as f64 * 1000.0 {
                s.then = now;
                s.draw_next_frame();
            }

            web_sys::console::log_1(&JsValue::from(&format!("{now}")));

            let id = web_sys::window()
                .unwrap()
                .request_animation_frame(f.borrow().as_ref().unwrap().as_ref().unchecked_ref())
                .expect("recusrive request_animation_frame error");
            s.animation_id.replace(id);
        }) as Box<dyn FnMut(f64)>));

        self_ref
            .borrow_mut()
            .as_mut()
            .unwrap()
            .animation_cb
            .replace(Rc::clone(&g));

        let id = web_sys::window()
            .unwrap()
            .request_animation_frame(g.borrow().as_ref().unwrap().as_ref().unchecked_ref())
            .expect("first request_animation_frame error");

        self_ref
            .borrow_mut()
            .as_mut()
            .unwrap()
            .animation_id
            .replace(id);
    }

    pub fn stop(self_ref: Rc<RefCell<Option<Self>>>) {
        let id = self_ref.borrow_mut().as_mut().unwrap().animation_id.take();
        if let Some(id) = id {
            web_sys::window()
                .unwrap()
                .cancel_animation_frame(id)
                .expect("cancel_animation_frame error");
        }
        self_ref.borrow_mut().as_mut().unwrap().animation_cb.take();
    }

    pub fn toggle_playing(self_ref: Rc<RefCell<Option<Self>>>) {
        let enable_playing = self_ref.borrow().as_ref().unwrap().enable_playing;
        self_ref.borrow_mut().as_mut().unwrap().enable_playing = !enable_playing;
    }
}

impl Drop for Scene {
    fn drop(&mut self) {
        self.clear();
        self.canvas.set_onpointermove(None);
    }
}
