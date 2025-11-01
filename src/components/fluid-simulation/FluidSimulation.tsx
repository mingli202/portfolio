import { useEffect, useRef, useState } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";
import HelperMenu from "./HelperMenu";
import {
  main,
  play,
  stop,
  next_frame,
  print_fluid_info,
  clear_scene,
  run_projection,
  run_advection,
  run_solve_divergence_for_all,
} from "../../../wasm/pkg";

export function FluidSimulation() {
  const useWasm = true;

  const canvas = useRef<HTMLCanvasElement>(null!);
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    if (!useWasm) {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      const fluid = new Fluid(canvas.current, 40);
      const scene = new Scene(canvas.current, fluid, 2);

      scene.drawNextFrame();

      setScene(scene);
    } else {
      main();
      // next_frame();
      play();
      window.play = play;
      window.nextFrame = next_frame;
      window.printFluidInfo = print_fluid_info;
      window.clearScene = clear_scene;
      window.runProjection = run_projection;
      window.runAdvection = run_advection;
      window.runSolveDivergenceForAll = run_solve_divergence_for_all;
    }

    return () => {
      if (scene) scene.destroy();
      stop();
    };
  }, []);

  return (
    <>
      <canvas
        className="fixed top-0 left-0 z-10 h-screen w-screen bg-black"
        ref={canvas}
      />
      {!useWasm && scene && <HelperMenu scene={scene} />}
    </>
  );
}
