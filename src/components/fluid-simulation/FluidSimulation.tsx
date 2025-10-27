import { useEffect, useRef } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";

export function FluidSimulation() {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const start = useRef<DOMHighResTimeStamp>(0);

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
      scene.draw();
      requestAnimationFrame(update);
      // }, t);
    }

    // update(0);
    scene.drawVelocities();
    scene.drawGridLines();
  }, []);

  return (
    <canvas
      className="fixed top-0 left-0 z-10 h-screen w-screen bg-black"
      ref={canvas}
    />
  );
}
