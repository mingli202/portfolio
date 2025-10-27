import type { HTMLAttributes } from "react";
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
            scene.drawHelperData();
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
            scene.drawHelperData();
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
            scene.drawHelperData();
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
            scene.drawHelperData();
            e.target.checked = scene.showCenterVelocities;
          }}
        />
        Center velocities
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
          scene.generateRandomVelocities();
        }}
      >
        Randomize velocities
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
      className={cn("rounded-md bg-white px-2 py-1 text-black", className)}
      {...props}
    >
      {children}
    </button>
  );
}
