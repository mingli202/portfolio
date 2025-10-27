import { useEffect, useRef, useState } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";
import HelperMenu from "./HelperMenu";

export function FluidSimulation() {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const start = useRef<DOMHighResTimeStamp>(0);

  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const fluid = new Fluid(canvas.current);
    const scene = new Scene(canvas.current, fluid);

    function update(now: DOMHighResTimeStamp) {
      const delta = now - start.current;

      let t = Math.max(fluid.deltaT * 1000 - delta, 0);

      // setTimeout(() => {
      start.current = now;
      fluid.simulate();
      // scene.draw();

      scene.drawVelocities();
      scene.drawGridLines();
      requestAnimationFrame(update);
      // }, t);
    }

    // update(0);
    scene.drawHelperData();
    scene.solveDivergenceInteractive();

    setScene(scene);
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
