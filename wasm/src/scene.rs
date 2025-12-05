use std::cell::RefCell;
use std::rc::Rc;

use crate::fluid::{Field, Fluid, FluidSimulation};
use crate::util::{gaussian, map, RingBuffer};
use wasm_bindgen::prelude::*;

type AnimationFrameCb = Rc<RefCell<Option<Closure<dyn FnMut(f64)>>>>;
type MouseEventCb = Rc<Closure<dyn FnMut(web_sys::PointerEvent)>>;
type ResizeEventCb = Rc<Closure<dyn FnMut(web_sys::Event)>>;

pub struct Scene {
    pub fluid: Fluid,
    pub canvas: web_sys::HtmlCanvasElement,

    pub mouse_radius: i32,
    pub subdivisions: u8,
    is_mouse_down: bool,
    last_time: f64,
    last_mouse_xy: (i32, i32),
    then: f64,
    max_velocity: f64,

    enable_playing: bool,
    enable_mouse_move: bool,
    enable_projection: bool,
    enable_advection: bool,
    enable_divergence_free: bool,

    show_smoke: bool,
    show_velocity_colors: bool,
    show_gridlines: bool,
    show_center_velocities: bool,
    ready: bool,

    animation_id: Option<i32>,
    animation_cb: Option<AnimationFrameCb>,
    mouse_move_cb: Option<MouseEventCb>,
    mouse_down_cb: Option<MouseEventCb>,
    resize_cb: Option<ResizeEventCb>,

    time_to_next_frame_ring: RingBuffer,
}

impl Scene {
    pub fn new(canvas: web_sys::HtmlCanvasElement, fluid: Fluid) -> Scene {
        let max_velocity =
            f64::min(canvas.width() as f64, canvas.height() as f64) * fluid.square_size;

        let mouse_radius = fluid.max_squares as i32 / 20;
        let time_to_next_frame_ring = RingBuffer::new((1.0 / fluid.delta_t) as usize);

        Scene {
            fluid,
            canvas,
            mouse_radius,
            subdivisions: 1,
            max_velocity,
            is_mouse_down: false,
            last_time: -1.0,
            last_mouse_xy: (0, 0),
            then: 0.0,
            ready: false,
            animation_id: None,
            animation_cb: None,
            mouse_move_cb: None,
            mouse_down_cb: None,
            resize_cb: None,

            enable_playing: true,
            enable_mouse_move: true,
            enable_projection: true,
            enable_advection: true,
            enable_divergence_free: true,

            show_gridlines: false,
            show_center_velocities: false,
            show_smoke: true,
            show_velocity_colors: false,

            time_to_next_frame_ring,
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

    pub fn draw_next_frame(&mut self) -> f64 {
        let now = web_sys::window().unwrap().performance().unwrap().now();

        self.clear_canvas();
        if self.enable_projection {
            self.fluid.projection();
        }

        if self.enable_advection {
            self.fluid.advection();
        }

        if self.enable_divergence_free {
            self.fluid.divergence_free();
        }

        let ctx = self.get_ctx();
        let scale = self.fluid.square_size / self.subdivisions as f64;

        for x in 0..self.fluid.b.width() {
            for y in 0..self.fluid.b.height() {
                for i in 0..self.subdivisions {
                    for k in 0..self.subdivisions {
                        if self.show_velocity_colors {
                            self.draw_velocity_colors(&ctx, scale, x, y, i, k);
                        } else if self.show_smoke {
                            self.draw_smoke(&ctx, scale, x, y, i, k);
                        }

                        if self.show_center_velocities {
                            self.draw_center_velocities(&ctx, scale, x, y, i, k);
                        }
                    }
                }
            }
        }

        if self.show_gridlines {
            self.draw_gridlines(&ctx);
        }

        let then = web_sys::window().unwrap().performance().unwrap().now();
        let elapsed = then - now;

        self.time_to_next_frame_ring.push(elapsed);

        elapsed / 1000.0
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

    pub fn draw_velocity_colors(
        &self,
        ctx: &web_sys::CanvasRenderingContext2d,
        scale: f64,
        x: usize,
        y: usize,
        i: u8,
        k: u8,
    ) {
        let x = x as i32;
        let y = y as i32;
        let i = i as f64;
        let k = k as f64;

        let (xx, yy) = self.fluid.get_xy_from_grid_indices(x, y, None);

        let v = self
            .fluid
            .interpolate(xx + (i + 0.5) * scale, yy + (k + 0.5) * scale, Field::V);
        let u = self
            .fluid
            .interpolate(xx + (i + 0.5) * scale, yy + (k + 0.5) * scale, Field::U);

        let length = f64::sqrt(v * v + u * u);

        let hue = (240.0 - map(length, 0.0, self.max_velocity, 0.0, 240.0)).clamp(0.0, 240.0);

        ctx.set_fill_style_str(&format!("hsl({}, 100%, 50%)", hue));
        ctx.fill_rect(xx + (i * scale), yy + (k * scale), scale + 1.0, scale + 1.0);
    }

    pub fn draw_smoke(
        &self,
        ctx: &web_sys::CanvasRenderingContext2d,
        scale: f64,
        x: usize,
        y: usize,
        i: u8,
        k: u8,
    ) {
        let x = x as i32;
        let y = y as i32;
        let i = i as f64;
        let k = k as f64;

        let (xx, yy) = self.fluid.get_xy_from_grid_indices(x, y, None);

        let s = if self.ready {
            self.fluid
                .interpolate(xx + (i + 0.5) * scale, yy + (k + 0.5) * scale, Field::S)
        } else {
            0.0
        };

        let hue = map(
            (s / self.max_velocity).clamp(0.0, 1.0),
            0.0,
            1.0,
            253.64,
            249.0,
        );

        let saturation = map(
            (s / self.max_velocity).clamp(0.0, 1.0),
            0.0,
            1.0,
            28.2,
            100.0,
        );
        let lightness = map(
            (s / self.max_velocity).clamp(0.0, 1.0),
            0.0,
            1.0,
            15.20,
            80.0,
        );

        let hsl = format!("hsl({:.2}, {:.2}%, {:.2}%)", hue, saturation, lightness);

        ctx.set_fill_style_str(&hsl);
        ctx.fill_rect(xx + (i * scale), yy + (k * scale), scale + 1.0, scale + 1.0);
    }

    pub fn draw_gridlines(&self, ctx: &web_sys::CanvasRenderingContext2d) {
        ctx.set_stroke_style_str("#555");
        ctx.set_line_width(1.0);

        for x in 0..=self.fluid.grid_width {
            ctx.begin_path();
            ctx.move_to(
                x as f64 * self.fluid.square_size - self.fluid.block_offset,
                0.0,
            );
            ctx.line_to(
                x as f64 * self.fluid.square_size - self.fluid.block_offset,
                self.canvas.height() as f64,
            );
            ctx.close_path();
            ctx.stroke();
        }

        for y in 0..=self.fluid.grid_height {
            ctx.begin_path();
            ctx.move_to(
                0.0,
                y as f64 * self.fluid.square_size - self.fluid.block_offset,
            );
            ctx.line_to(
                self.canvas.width() as f64,
                y as f64 * self.fluid.square_size - self.fluid.block_offset,
            );
            ctx.close_path();
            ctx.stroke();
        }
    }

    pub fn draw_center_velocities(
        &self,
        ctx: &web_sys::CanvasRenderingContext2d,
        scale: f64,
        x: usize,
        y: usize,
        i: u8,
        k: u8,
    ) {
        let x = x as i32;
        let y = y as i32;
        let i = i as f64;
        let k = k as f64;

        let (xx, yy) = self.fluid.get_xy_from_grid_indices(x, y, None);

        let x = xx + (i + 0.5) * scale;
        let y = yy + (k + 0.5) * scale;

        let v = self.fluid.interpolate(x, y, Field::V) * self.fluid.delta_t;
        let u = self.fluid.interpolate(x, y, Field::U) * self.fluid.delta_t;

        ctx.set_stroke_style_str("#08f");
        ctx.set_fill_style_str("#08f");

        ctx.arc(x, y, 2.0, 0.0, 2.0 * std::f64::consts::PI)
            .expect("arc error");
        ctx.fill();

        ctx.begin_path();
        ctx.move_to(x, y);
        ctx.line_to(x + u, y + v);
        ctx.close_path();
        ctx.stroke();
    }

    pub fn adjust_to_device_performance(&mut self) {
        let mut elapsed = self.draw_next_frame();

        while elapsed > self.fluid.delta_t {
            let lower_count = Self::get_n(
                elapsed,
                self.fluid.max_squares,
                self.fluid.delta_t,
                self.subdivisions,
                self.fluid.n_iterations,
            );

            web_sys::console::log_1(
                &format!(
                    "time to next frame: {}, lowering to {}",
                    elapsed, self.fluid.max_squares
                )
                .into(),
            );

            self.fluid.max_squares = lower_count;

            self.fluid
                .resize(self.canvas.width() as f64, self.canvas.height() as f64);

            elapsed = self.draw_next_frame();
        }

        web_sys::console::log_1(&format!("final resolution: {}", self.fluid.max_squares).into());

        self.mouse_radius = self.fluid.max_squares as i32 / 20;

        self.ready = true;
    }

    fn get_n(
        measured_delta_t: f64,
        current_n: usize,
        fluid_delta_t: f64,
        subdivisions: u8,
        n_iterations: usize,
    ) -> usize {
        (f64::sqrt(
            (fluid_delta_t / measured_delta_t)
                * (n_iterations as f64 + subdivisions.pow(2) as f64 - 1.0 / 400.0)
                / (n_iterations as f64 + subdivisions.pow(2) as f64 + 1.0 / 400.0),
        ) * current_n as f64) as usize
    }

    pub fn get_average_fps(&self) -> f64 {
        1000.0 / self.time_to_next_frame_ring.average()
    }

    pub fn init(self_ref: Rc<RefCell<Option<Self>>>) {
        let s0 = Rc::clone(&self_ref);
        let s1 = Rc::clone(&self_ref);
        let s2 = Rc::clone(&self_ref);

        s0.borrow_mut()
            .as_mut()
            .unwrap()
            .fluid
            .fill_edges_with_obstacles();

        s0.borrow_mut()
            .as_mut()
            .unwrap()
            .adjust_to_device_performance();

        if s0.borrow().as_ref().unwrap().enable_mouse_move {
            let mouse_move_cb = Rc::new(Closure::wrap(Box::new(move |e: web_sys::PointerEvent| {
                let s = Rc::clone(&self_ref);

                if let Ok(s) = s.try_borrow_mut().as_mut() {
                    let s = s.as_mut().unwrap();

                    if !s.enable_playing || !s.ready {
                        return;
                    }
                    if s.last_time <= 0.0 {
                        s.last_time = e.time_stamp();
                        s.last_mouse_xy = (e.client_x(), e.client_y());
                        return;
                    }

                    let fluid = &mut s.fluid;

                    let delta_t = e.time_stamp() - s.last_time;

                    s.last_time = e.time_stamp();

                    let delta_x = e.client_x() - s.last_mouse_xy.0;
                    let delta_y = e.client_y() - s.last_mouse_xy.1;

                    let norm = f64::sqrt((delta_x * delta_x + delta_y * delta_y) as f64);

                    s.last_mouse_xy = (e.client_x(), e.client_y());

                    let (x, y) = fluid.get_grid_indices_from_xy(
                        e.client_x() as f64,
                        e.client_y() as f64,
                        None,
                    );

                    if fluid.b.get(x, y) == 0 {
                        return;
                    }

                    for i in 0..(s.mouse_radius * 2 + 1) {
                        for k in 0..(s.mouse_radius * 2 + 1) {
                            let xx = x - s.mouse_radius + i;
                            let yy = y - s.mouse_radius + k;

                            if fluid.b.get(xx, yy) == 0
                                || fluid.b.get(xx - 1, yy) == 0
                                || fluid.b.get(xx, yy - 1) == 0
                            {
                                continue;
                            }

                            let mult = gaussian(
                                i - s.mouse_radius,
                                k - s.mouse_radius,
                                s.mouse_radius as f64 / 2.0,
                            ) * 2.0
                                * 1000.0
                                / delta_t;

                            fluid.u.update(xx, yy, |u| u + mult * delta_x as f64);
                            fluid.v.update(xx, yy, |v| v + mult * delta_y as f64);
                            fluid.s.update(xx, yy, |sm| {
                                f64::min(sm + mult * norm * 3.0, s.max_velocity * 3.0)
                            });
                        }
                    }
                }

                drop(s);
            }) as Box<dyn FnMut(_)>));

            let s = &mut s0.borrow_mut();
            let s = s.as_mut().unwrap();

            s.mouse_move_cb.replace(Rc::clone(&mouse_move_cb));

            web_sys::window()
                .unwrap()
                .set_onpointermove(Some((*mouse_move_cb).as_ref().unchecked_ref()));
        }

        let mouse_down_cb = Rc::new(Closure::wrap(Box::new(move |e: web_sys::PointerEvent| {
            if let Ok(s) = s1.try_borrow_mut().as_mut() {
                let s = s.as_mut().unwrap();

                if !s.ready {
                    return;
                }

                s.is_mouse_down = !s.is_mouse_down;

                if !s.is_mouse_down {
                    s.last_time = -1.0;
                } else {
                    let fluid = &mut s.fluid;

                    let (x, y) = fluid.get_grid_indices_from_xy(
                        e.client_x() as f64,
                        e.client_y() as f64,
                        None,
                    );

                    for i in 0..(s.mouse_radius * 2 + 1) {
                        for k in 0..(s.mouse_radius * 2 + 1) {
                            let xx = x - s.mouse_radius + i;
                            let yy = y - s.mouse_radius + k;

                            if fluid.b.get(xx, yy) == 0
                                || fluid.b.get(xx - 1, yy) == 0
                                || fluid.b.get(xx, yy - 1) == 0
                            {
                                continue;
                            }

                            let mult = gaussian(
                                i - s.mouse_radius,
                                k - s.mouse_radius,
                                s.mouse_radius as f64 / 2.0,
                            );

                            fluid
                                .s
                                .update(xx, yy, |sm| sm + mult * s.max_velocity * 1.5);
                        }
                    }
                }
            }
        }) as Box<dyn FnMut(_)>));

        let s = &mut s0.borrow_mut();
        let s = s.as_mut().unwrap();

        s.mouse_down_cb.replace(Rc::clone(&mouse_down_cb));

        web_sys::window()
            .unwrap()
            .set_onpointerdown(Some((*mouse_down_cb).as_ref().unchecked_ref()));

        web_sys::window()
            .unwrap()
            .set_onpointerup(Some((*mouse_down_cb).as_ref().unchecked_ref()));

        let resize_cb = Rc::new(Closure::wrap(Box::new(move |_e: web_sys::Event| {
            if let Ok(s) = s2.try_borrow_mut().as_mut() {
                let s = s.as_mut().unwrap();

                let width = web_sys::window()
                    .unwrap()
                    .inner_width()
                    .unwrap()
                    .as_f64()
                    .unwrap();

                let height = web_sys::window()
                    .unwrap()
                    .inner_height()
                    .unwrap()
                    .as_f64()
                    .unwrap();

                s.canvas.set_width(width as u32);
                s.canvas.set_height(height as u32);

                s.fluid.resize(width, height);
            }
        }) as Box<dyn FnMut(_)>));

        s.resize_cb.replace(Rc::clone(&resize_cb));

        web_sys::window()
            .unwrap()
            .set_onresize(Some((*resize_cb).as_ref().unchecked_ref()));
    }

    pub fn play(self_ref: Rc<RefCell<Option<Self>>>) {
        let f: AnimationFrameCb = Rc::new(RefCell::new(None));
        let g = Rc::clone(&f);
        let s = Rc::clone(&self_ref);

        *g.borrow_mut() = Some(Closure::wrap(Box::new(move |now: f64| {
            if let Ok(s) = s.try_borrow_mut().as_mut() {
                let s = s.as_mut().unwrap();

                if !s.enable_playing {
                    return;
                }

                let delta = now - s.then;
                if delta > s.fluid.delta_t * 1000.0 {
                    s.then = now;
                    s.draw_next_frame();
                }

                let id = web_sys::window()
                    .unwrap()
                    .request_animation_frame(f.borrow().as_ref().unwrap().as_ref().unchecked_ref())
                    .expect("recusrive request_animation_frame error");
                s.animation_id.replace(id);
            }
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
        let s = &mut self_ref.borrow_mut();
        let s = s.as_mut().unwrap();

        let id = s.animation_id.take();
        let window = web_sys::window().unwrap();

        if let Some(id) = id {
            window
                .cancel_animation_frame(id)
                .expect("cancel_animation_frame error");
        }

        drop(s.animation_cb.take());
        drop(s.mouse_move_cb.take());
        drop(s.mouse_down_cb.take());
        drop(s.resize_cb.take());

        window.set_onpointermove(None);
        window.set_onpointerdown(None);
        window.set_onpointerup(None);
        window.set_onresize(None);
    }

    pub fn toggle_playing(self_ref: Rc<RefCell<Option<Self>>>) {
        let enable_playing = self_ref.borrow().as_ref().unwrap().enable_playing;
        self_ref.borrow_mut().as_mut().unwrap().enable_playing = !enable_playing;
    }
}
