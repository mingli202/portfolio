import { CameraControls, CameraControlsImpl, Grid } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const { ACTION } = CameraControlsImpl;

function App() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden" id="canvas">
      <Canvas>
        <Box />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <CameraControls
          makeDefault
          mouseButtons={{
            left: ACTION.ROTATE,
            right: ACTION.ROTATE,
            wheel: ACTION.DOLLY,
            middle: ACTION.OFFSET,
          }}
        />
        <Grid position={[0, 0, 0]} cellColor="black" />
      </Canvas>
    </div>
  );
}

function Box() {
  const ref = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default App;
