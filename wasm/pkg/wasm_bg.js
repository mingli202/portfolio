let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => state.dtor(state.a, state.b));

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            state.dtor(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

export function main() {
    wasm.main();
}

export function play() {
    wasm.play();
}

export function next_frame() {
    wasm.next_frame();
}

export function toggle_playing() {
    wasm.toggle_playing();
}

export function stop() {
    wasm.stop();
}

export function print_fluid_info() {
    wasm.print_fluid_info();
}

export function run_projection() {
    wasm.run_projection();
}

export function run_advection() {
    wasm.run_advection();
}

export function clear_scene() {
    wasm.clear_scene();
}

export function run_solve_divergence_for_all() {
    wasm.run_solve_divergence_for_all();
}

/**
 * @returns {FpsStats | undefined}
 */
export function get_stats() {
    const ret = wasm.get_stats();
    return ret === 0 ? undefined : FpsStats.__wrap(ret);
}

function wasm_bindgen__convert__closures_____invoke__hd16f8b0378c7cdfc(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__hd16f8b0378c7cdfc(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h05c40a4bb5819655(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h05c40a4bb5819655(arg0, arg1, arg2);
}

const FpsStatsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fpsstats_free(ptr >>> 0, 1));

export class FpsStats {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FpsStats.prototype);
        obj.__wbg_ptr = ptr;
        FpsStatsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FpsStatsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fpsstats_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get average_fps() {
        const ret = wasm.__wbg_get_fpsstats_average_fps(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set average_fps(arg0) {
        wasm.__wbg_set_fpsstats_average_fps(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get resolution() {
        const ret = wasm.__wbg_get_fpsstats_resolution(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set resolution(arg0) {
        wasm.__wbg_set_fpsstats_resolution(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get subdivisions() {
        const ret = wasm.__wbg_get_fpsstats_subdivisions(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set subdivisions(arg0) {
        wasm.__wbg_set_fpsstats_subdivisions(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) FpsStats.prototype[Symbol.dispose] = FpsStats.prototype.free;

export function __wbg___wbindgen_debug_string_df47ffb5e35e6763(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg___wbindgen_is_undefined_2d472862bd29a478(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbg___wbindgen_number_get_a20bf9b85341449d(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbg___wbindgen_throw_b855445ff6a94295(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbg__wbg_cb_unref_2454a539ea5790d9(arg0) {
    arg0._wbg_cb_unref();
};

export function __wbg_arc_ff23fb4f334c2788() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.arc(arg1, arg2, arg3, arg4, arg5);
}, arguments) };

export function __wbg_beginPath_ae4169e263573dcd(arg0) {
    arg0.beginPath();
};

export function __wbg_call_e762c39fa8ea36bf() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_f6c090ea700b5a50() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_clearRect_155b2e12f737565e(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearRect(arg1, arg2, arg3, arg4);
};

export function __wbg_clientX_1166635f13c2a22e(arg0) {
    const ret = arg0.clientX;
    return ret;
};

export function __wbg_clientY_6b2560a0984b55af(arg0) {
    const ret = arg0.clientY;
    return ret;
};

export function __wbg_closePath_bc64fd4702f5fc60(arg0) {
    arg0.closePath();
};

export function __wbg_document_725ae06eb442a6db(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_fillRect_726041755e54e83d(arg0, arg1, arg2, arg3, arg4) {
    arg0.fillRect(arg1, arg2, arg3, arg4);
};

export function __wbg_fill_c1b94332a3f5eecc(arg0) {
    arg0.fill();
};

export function __wbg_getContext_0b80ccb9547db509() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_height_119077665279308c(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_innerHeight_686136a20f2f5575() { return handleError(function (arg0) {
    const ret = arg0.innerHeight;
    return ret;
}, arguments) };

export function __wbg_innerWidth_8d421a8566ad80b5() { return handleError(function (arg0) {
    const ret = arg0.innerWidth;
    return ret;
}, arguments) };

export function __wbg_instanceof_CanvasRenderingContext2d_c0728747cf1e699c(arg0) {
    let result;
    try {
        result = arg0 instanceof CanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlCanvasElement_3e2e95b109dae976(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_4846dbb3de56c84c(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_lineTo_1e83b5f2f38f15f9(arg0, arg1, arg2) {
    arg0.lineTo(arg1, arg2);
};

export function __wbg_log_8cec76766b8c0e33(arg0) {
    console.log(arg0);
};

export function __wbg_moveTo_8064f6a508217dcd(arg0, arg1, arg2) {
    arg0.moveTo(arg1, arg2);
};

export function __wbg_navigator_971384882e8ea23a(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_new_8a6f238a6ece86ea() {
    const ret = new Error();
    return ret;
};

export function __wbg_new_no_args_ee98eee5275000a4(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_now_f5ba683d8ce2c571(arg0) {
    const ret = arg0.now();
    return ret;
};

export function __wbg_performance_e8315b5ae987e93f(arg0) {
    const ret = arg0.performance;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_querySelector_f2dcf5aaab20ba86() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_requestAnimationFrame_7ecf8bfece418f08() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_set_fillStyle_c41ec913f9f22a0c(arg0, arg1, arg2) {
    arg0.fillStyle = getStringFromWasm0(arg1, arg2);
};

export function __wbg_set_height_89110f48f7fd0817(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_set_lineWidth_4059ac6bb1d807f8(arg0, arg1) {
    arg0.lineWidth = arg1;
};

export function __wbg_set_onpointerdown_064d66e579da086e(arg0, arg1) {
    arg0.onpointerdown = arg1;
};

export function __wbg_set_onpointermove_b8c9d0873bf39c3e(arg0, arg1) {
    arg0.onpointermove = arg1;
};

export function __wbg_set_onpointerup_6c46d57bcffee331(arg0, arg1) {
    arg0.onpointerup = arg1;
};

export function __wbg_set_onresize_a470d6ab8bf341f4(arg0, arg1) {
    arg0.onresize = arg1;
};

export function __wbg_set_strokeStyle_475a0c2a522e1c7e(arg0, arg1, arg2) {
    arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
};

export function __wbg_set_width_dcc02c61dd01cff6(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_6fdf4b64710cc91b() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_stroke_2d2420886d092225(arg0) {
    arg0.stroke();
};

export function __wbg_timeStamp_39af1ea0e2a34f79(arg0) {
    const ret = arg0.timeStamp;
    return ret;
};

export function __wbg_userAgent_b20949aa6be940a6() { return handleError(function (arg0, arg1) {
    const ret = arg1.userAgent;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_width_9ea2df52b5d2c909(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbindgen_cast_2241b6af4c4b2941(arg0, arg1) {
    // Cast intrinsic for `Ref(String) -> Externref`.
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_cast_5a2bc49020466d7e(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { dtor_idx: 31, function: Function { arguments: [NamedExternref("Event")], shim_idx: 32, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h334319f47aa8154f, wasm_bindgen__convert__closures_____invoke__hd16f8b0378c7cdfc);
    return ret;
};

export function __wbindgen_cast_f50a0fbe635acc3c(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { dtor_idx: 31, function: Function { arguments: [F64], shim_idx: 35, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h334319f47aa8154f, wasm_bindgen__convert__closures_____invoke__h05c40a4bb5819655);
    return ret;
};

export function __wbindgen_cast_f78f9ec365eaee11(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { dtor_idx: 31, function: Function { arguments: [NamedExternref("PointerEvent")], shim_idx: 32, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h334319f47aa8154f, wasm_bindgen__convert__closures_____invoke__hd16f8b0378c7cdfc);
    return ret;
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

