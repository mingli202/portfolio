import { useEffect, useRef, useState } from "react";
import { Fluid } from "./fluid";
import { Scene } from "./scene";
import HelperMenu from "./HelperMenu";
import { main, play, stop, FpsStats, get_stats } from "../../../wasm/pkg";
import { Icon } from "../../lib/icons";

export function FluidSimulation() {
  const useWasm = true;

  const canvas = useRef<HTMLCanvasElement>(null!);
  const [scene, setScene] = useState<Scene>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      const ctx = canvas.current.getContext("2d");

      if (!ctx) return;
      ctx.fillStyle = "#211c32";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      return;
    }
    setShow(true);

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
        className="bg-background fixed top-0 left-0 -z-10 h-screen w-screen"
        ref={canvas}
      />
      {/* <div className="fixed top-0 left-0 -z-9 h-screen w-screen bg-black/0 backdrop-blur-md" /> */}
      {!useWasm && scene && <HelperMenu scene={scene} />}
      {show && useWasm && <Stats />}
    </>
  );
}

function Stats() {
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState<FpsStats>();

  const then = useRef(0);

  useEffect(() => {
    function update(now: DOMHighResTimeStamp) {
      const delta = now - then.current;

      if (delta > 1000) {
        const stats = get_stats();

        if (stats) {
          setStats(stats);
        }

        then.current = now;
      }
      requestAnimationFrame(update);
    }

    then.current = performance.now();
    requestAnimationFrame(update);
  }, []);

  return (
    <div
      className="bg-background/80 fixed right-0 bottom-0 flex flex-col gap-2 rounded-tl-md p-2 opacity-50 backdrop-blur-md hover:opacity-100"
      style={{ opacity: show ? 1 : undefined }}
    >
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => {
          console.log("click");
          return setShow(!show);
        }}
      >
        <Icon.Up style={{ rotate: show ? "180deg" : "0deg" }} />
        <p>{stats?.average_fps.toFixed(2) ?? 0} fps</p>
      </div>
      {show && stats && (
        <>
          <p>Resolution: {stats.resolution}</p>
          <p>Subdivisions: {stats.subdivisions}</p>
        </>
      )}
    </div>
  );
}
