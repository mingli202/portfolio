import { useEffect, useRef, useState } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";
import HelperMenu from "./HelperMenu";
import { main, play, stop } from "../../../wasm/pkg";

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
      play();
    }

    return () => {
      if (scene) scene.destroy();
      stop();
    };
  }, []);

  return (
    <>
      <canvas
        className="fixed top-0 left-0 -z-10 h-screen w-screen bg-black"
        ref={canvas}
      />
      {/* <div className="fixed top-0 left-0 -z-9 h-screen w-screen bg-black/0 backdrop-blur-md" /> */}
      {!useWasm && scene && <HelperMenu scene={scene} />}
    </>
  );
}
