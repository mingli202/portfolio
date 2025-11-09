/* tslint:disable */
/* eslint-disable */
export function main(): void;
export function play(): void;
export function next_frame(): void;
export function toggle_playing(): void;
export function stop(): void;
export function print_fluid_info(): void;
export function run_projection(): void;
export function run_advection(): void;
export function clear_scene(): void;
export function run_solve_divergence_for_all(): void;
export function get_stats(): FpsStats | undefined;
export function set_stats(resolution: number, subdivisions: number): void;
export function adjust_to_device_performance(): FpsStats | undefined;
export class FpsStats {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  average_fps: number;
  resolution: number;
  subdivisions: number;
}
