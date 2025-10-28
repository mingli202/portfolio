import { useEffect, useRef, useState } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";
import HelperMenu from "./HelperMenu";

export function FluidSimulation() {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const fluid = new Fluid(canvas.current, 5);
    const scene = new Scene(canvas.current, fluid);

    scene.drawNextFrame();

    setScene(scene);

    window.scene = scene;
    window.fluid = fluid;
  }, []);

  return (
    <>
      <canvas
        className="fixed top-0 left-0 z-10 h-screen w-screen bg-black"
        ref={canvas}
      />
      {scene && <HelperMenu scene={scene} />}
    </>
  );
}
