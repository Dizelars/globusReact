import React from "react";
import Canvas from "./canvas/canvas";
import { OrbitControls } from "@react-three/drei";
import Plane from "./plane/plane";
import * as THREE from "three";
import GlobusParticles from "./globusParticles/globusParticles";

// export type Point = {
//   id: string;
//   lat: number;
//   lng: number;
//   isNew?: boolean;
// };

// type Props = {
//   points: Point[];
//   onPointClick: ({ id, end }: { id: string; end: THREE.Vector3 }) => void;
// };

export default function GlobusScene() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 25, near: 0.1, far: 100, position: [0, 0, 10] }}
      >
        <OrbitControls />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <Plane
          visible
          color="orange"
          side={THREE.DoubleSide}
          args={[1, 1]}
        ></Plane>

        <GlobusParticles
          visible
          count={5000}
          shape="sphere"
          position={[0, 0, -1]}
          scale={0.5}
          color="#5786F5"
          pointSize={0.015}
          radius={2}
        ></GlobusParticles>
      </Canvas>
    </>
  );
}
