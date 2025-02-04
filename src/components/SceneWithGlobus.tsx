import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
// import AddLocationForm from './AddLocationForm';
import { Leva } from "leva";
import { Point } from "../App";
import { Vector3 } from "three";

type Props = {
  points: Point[];
  mode: string;
  handleAddLocation: (value: Point) => void;
  handlePointClick: ({ id, end }: { id: string; end: Vector3 }) => void;
  onModeChange: (value: string) => void;
};

export default function SceneWithGlobus({
  points,
  mode,
  handleAddLocation,
  handlePointClick,
  onModeChange,
}: Props) {
  return (
    <>
      <Leva collapsed />
      <Canvas
        className="webgl"
        dpr={[1, 2]}
        camera={{
          fov: 25,
          near: 0.1,
          far: 100,
          position: [0, 0, 10],
        }}
      >
        {/* position: [ 12, 5, 4 ] */}
        <Experience
          points={points}
          handlePointClick={handlePointClick}
          mode={mode}
          onModeChange={onModeChange}
        />
      </Canvas>
      {/* <AddLocationForm onAddLocation={handleAddLocation} /> */}
    </>
  );
}
