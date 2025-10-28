import { type HTMLAttributes } from "react";
import cn from "../../lib/cn";
import type { Scene } from "./scene";

type Props = {
  scene: Scene;
};
export default function HelperMenu({ scene }: Props) {
  return (
    <div className="fixed top-0 left-0 z-20 flex flex-col gap-2 bg-black p-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.showDivergence}
          onChange={(e) => {
            scene.showDivergence = !scene.showDivergence;
            scene.drawNextFrame();
            e.currentTarget.checked = scene.showDivergence;
          }}
        />
        Show divergence
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.showGridLines}
          onChange={(e) => {
            scene.showGridLines = !scene.showGridLines;
            scene.drawNextFrame();
            e.target.checked = scene.showGridLines;
          }}
        />
        Show grid lines
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.showVelocities}
          onChange={(e) => {
            scene.showVelocities = !scene.showVelocities;
            scene.drawNextFrame();
            e.target.checked = scene.showVelocities;
          }}
        />
        Show velocities
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.showCenterVelocities}
          onChange={(e) => {
            scene.showCenterVelocities = !scene.showCenterVelocities;
            scene.drawNextFrame();
            e.target.checked = scene.showCenterVelocities;
          }}
        />
        Center velocities
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.enableMouseMove}
          onChange={(e) => {
            scene.enableMouseMove = !scene.enableMouseMove;
            e.target.checked = scene.enableMouseMove;
          }}
        />
        Enable mouse move
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.enableProjection}
          onChange={(e) => {
            scene.enableProjection = !scene.enableProjection;
            e.target.checked = scene.enableProjection;
          }}
        />
        Enable projection
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.enableAdvection}
          onChange={(e) => {
            scene.enableAdvection = !scene.enableAdvection;
            e.target.checked = scene.enableAdvection;
          }}
        />
        Enable advection
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.enablePlaying}
          onChange={(e) => {
            scene.enablePlaying = !scene.enablePlaying;
            e.target.checked = scene.enablePlaying;

            requestAnimationFrame(scene.play.bind(scene));
          }}
        />
        Enable playing
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={scene.showDetailedVelocities}
          onChange={(e) => {
            scene.showDetailedVelocities = !scene.showDetailedVelocities;
            e.target.checked = scene.showDetailedVelocities;
            scene.drawNextFrame();
          }}
        />
        Show detailed velocities
      </label>
      <Button
        onClick={() => {
          scene.runSolveDivergenceAll();
        }}
      >
        Solve divergence
      </Button>
      <Button
        onClick={() => {
          scene.runProjection();
        }}
      >
        Projection
      </Button>
      <Button
        onClick={() => {
          scene.runAdvection();
        }}
      >
        Advection
      </Button>
      <Button
        onClick={() => {
          scene.generateRandomVelocities();
        }}
      >
        Randomize velocities
      </Button>
      <Button
        onClick={() => {
          scene.drawNextFrame();
        }}
      >
        Next frame
      </Button>
      <Button
        onClick={() => {
          scene.clear();
        }}
      >
        Clear
      </Button>
    </div>
  );
}

function Button({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-md bg-white px-2 py-1 text-black hover:bg-gray-300 active:bg-gray-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
