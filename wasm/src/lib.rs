mod fluid;
mod grid;
mod scene;
mod util;

use self::fluid::FluidSimulation;
use self::scene::Scene;
use self::util::is_mobile;
use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;

thread_local! {
    static SCENE: Rc<RefCell<Option<Scene>>> = Rc::new(RefCell::new(None));
}

#[wasm_bindgen]
pub fn main() {
    console_error_panic_hook::set_once();

    if is_mobile() {
        return;
    }

    SCENE.with(move |s| {
        let document = web_sys::window().unwrap().document().unwrap();
        let canvas = document
            .query_selector("canvas")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::HtmlCanvasElement>()
            .unwrap();

        let window = web_sys::window().unwrap();

        canvas.set_width(window.inner_width().unwrap().as_f64().unwrap() as u32);
        canvas.set_height(window.inner_height().unwrap().as_f64().unwrap() as u32);

        let fluid = fluid::Fluid::new(&canvas, None, None, None, None);
        let scene = scene::Scene::new(canvas, fluid);
        s.borrow_mut().replace(scene);

        Scene::init(Rc::clone(s));
    });
}

#[wasm_bindgen]
pub fn play() {
    if is_mobile() {
        return;
    }
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        Scene::play(Rc::clone(scene));
    });
}

#[wasm_bindgen]
pub fn next_frame() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        scene.borrow_mut().as_mut().unwrap().draw_next_frame();
    });
}

#[wasm_bindgen]
pub fn toggle_playing() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        Scene::toggle_playing(Rc::clone(scene));
    });
}

#[wasm_bindgen]
pub fn stop() {
    if is_mobile() {
        return;
    }
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        Scene::stop(Rc::clone(scene));
    });
}

#[wasm_bindgen]
pub fn print_fluid_info() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        web_sys::console::log_1(&JsValue::from(&format!(
            "{:#?}",
            scene.borrow().as_ref().unwrap().fluid
        )));
    });
}

#[wasm_bindgen]
pub fn run_projection() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        scene.borrow_mut().as_mut().unwrap().fluid.projection();
        scene.borrow_mut().as_mut().unwrap().draw_next_frame();
    });
}

#[wasm_bindgen]
pub fn run_advection() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        scene.borrow_mut().as_mut().unwrap().fluid.advection();
        scene.borrow_mut().as_mut().unwrap().draw_next_frame();
    });
}

#[wasm_bindgen]
pub fn clear_scene() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        scene.borrow_mut().as_mut().unwrap().clear();
    });
}

#[wasm_bindgen]
pub fn run_solve_divergence_for_all() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        scene
            .borrow_mut()
            .as_mut()
            .unwrap()
            .fluid
            .solve_divergence_for_all();
        scene.borrow_mut().as_mut().unwrap().draw_next_frame();
    });
}

#[wasm_bindgen]
pub struct FpsStats {
    pub average_fps: f64,
    pub resolution: usize,
    pub subdivisions: u8,
}

#[wasm_bindgen]
pub fn get_stats() -> Option<FpsStats> {
    let mut stats = None;

    SCENE.with(|scene| {
        if let Ok(scene) = scene.try_borrow() {
            if let Some(scene) = scene.as_ref() {
                stats = Some(FpsStats {
                    average_fps: scene.get_average_fps().min(1.0 / scene.fluid.delta_t),
                    resolution: scene.fluid.max_squares,
                    subdivisions: scene.subdivisions,
                });
            }
        }
    });

    stats
}
