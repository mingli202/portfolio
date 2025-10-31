mod fluid;
mod grid;
mod scene;
mod util;

use self::scene::Scene;
use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;

thread_local! {
    static SCENE: Rc<RefCell<Option<Scene>>> = Rc::new(RefCell::new(None));
}

#[wasm_bindgen]
pub fn main() {
    console_error_panic_hook::set_once();

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
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        Scene::play(Rc::clone(scene));
    });
}

#[wasm_bindgen]
pub fn stop() {
    SCENE.with(move |scene| {
        if scene.borrow().is_none() {
            return;
        }

        Scene::stop(Rc::clone(scene));
    });
}
