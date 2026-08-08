import { useEffect, useRef, useState } from "react";
import { Scene } from "./scene";
import { main, play, stop, get_stats, set_stats } from "../../../wasm/pkg";
import { Icon } from "../../lib/icons";

const useWasm = true;

export function FluidSimulation() {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const sceneRef = useRef<Scene | undefined>(undefined);
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

    main();
    play();

    return () => {
      sceneRef.current?.destroy();
      stop();
    };
  }, []);

  return (
    <>
      <canvas
        className="bg-background fixed top-0 left-0 -z-10 h-screen w-screen"
        ref={canvas}
      />
      {show && useWasm && <Stats />}
    </>
  );
}

function Stats() {
  const [show, setShow] = useState(false);

  const [averageFps, setFps] = useState<number>();
  const [resolution, setResolution] = useState<number>();
  const [subdivisions, setSubdivisions] = useState<number>();

  const initialStats = useRef<{
    average_fps: number;
    resolution: number;
    subdivisions: number;
  }>(null);

  const then = useRef(0);
  const debounceTimeout = useRef<number | null>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    function update(now: DOMHighResTimeStamp) {
      const delta = now - then.current;

      if (delta > 1000) {
        const newStats = get_stats();

        setFps(newStats?.average_fps);

        const newResolution = newStats?.resolution;
        setResolution((res) => (res ? res : newResolution));

        const newSubdivisions = newStats?.subdivisions;
        setSubdivisions((subdiv) => (subdiv ? subdiv : newSubdivisions));

        if (newStats) {
          if (!initialStats.current) {
            initialStats.current = {
              average_fps: newStats.average_fps,
              resolution: newStats.resolution,
              subdivisions: newStats.subdivisions,
            };
          }
        }

        then.current = now;
        newStats?.free();
      }
      animationId.current = requestAnimationFrame(update);
    }

    then.current = performance.now();
    animationId.current = requestAnimationFrame(update);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  function updateStats(resolution?: number, subdivisions?: number) {
    if (!resolution || resolution < 20 || !subdivisions || subdivisions < 1) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      set_stats(resolution, subdivisions);
    }, 500);
  }

  return (
    <div
      className="bg-background/80 fixed right-0 bottom-0 flex w-45 flex-col gap-2 rounded-tl-md p-2 opacity-50 backdrop-blur-md hover:opacity-100"
      style={{ opacity: show ? 1 : undefined }}
    >
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => {
          return setShow(!show);
        }}
      >
        <Icon.Up style={{ rotate: show ? "180deg" : "0deg" }} />
        <p>{averageFps?.toFixed(2) ?? 0} fps</p>
      </div>
      {show && initialStats.current && (
        <>
          <label className="flex flex-col gap-1" htmlFor="resolution">
            <p>Resolution: {resolution}</p>
            <input
              type="range"
              min={20}
              max={(initialStats.current.resolution ?? 100) * 4}
              value={resolution}
              className="w-full"
              id="resolution"
              name="resolution"
              onChange={(e) => {
                setResolution(Number(e.target.value));
                updateStats(Number(e.target.value), subdivisions);
              }}
            />
          </label>
          <div className="text-text-secondary flex items-center gap-1">
            <span>made in rust (btw)</span>
            <a
              href="https://github.com/mingli202/portfolio"
              target="_blank"
              rel="noreferrer"
            >
              <Icon.Github
                className="h-3 w-3"
                foregroundFill="var(--text-color-secondary)"
              />
            </a>
          </div>
          <button
            type="button"
            className="w-full text-center hover:underline"
            onClick={() => {
              if (!initialStats.current) return;
              set_stats(
                initialStats.current.resolution,
                initialStats.current.subdivisions,
              );
              setResolution(initialStats.current.resolution);
              setSubdivisions(initialStats.current.subdivisions);
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
