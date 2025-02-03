import React from "react";
import { OrbitControls } from "@react-three/drei";
import Globus from "./Globus";
import CustomGeometryParticles from "./CustomGeometryParticles";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Point } from "app/App";
import { Vector3 } from "three";

type Props = {
  points: Point[];
  handlePointClick: ({ id, end }: { id: string; end: Vector3 }) => void;
};

export default function Experience({ points, handlePointClick }: Props) {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const {
    particlesCount,
    particlesPosition,
    particlesScale,
    particlesColor,
    particlesVisible,
    particlesPointSize,
    particlesRadius,
  } = useControls("particles", {
    particlesCount: {
      value: 5000,
      step: 500,
      min: 1000,
      max: 10000,
    },
    particlesPosition: {
      value: { x: 0, y: 0, z: -1 },
      step: 0.01,
      joystick: "invertY",
    },
    particlesScale: {
      value: 0.5,
      step: 0.01,
      min: 0.1,
      max: 6,
    },
    particlesColor: "#5786F5",
    particlesVisible: true,
    particlesPointSize: {
      value: 0.015,
      step: 0.001,
      min: 0,
      max: 0.2,
    },
    particlesRadius: {
      value: 2,
      step: 1,
      min: 1,
      max: 10,
    },
  });

  const { planeColor, planeVisible } = useControls("plane", {
    planeColor: "orange",
    planeVisible: true,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* <Globus points={points} handlePointClick={handlePointClick} /> */}

      <mesh visible={planeVisible}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={planeColor} side={THREE.DoubleSide} />
      </mesh>

      <CustomGeometryParticles
        count={particlesCount}
        shape="sphere"
        position={[
          particlesPosition.x,
          particlesPosition.y,
          particlesPosition.z,
        ]}
        scale={particlesScale}
        color={particlesColor}
        visible={particlesVisible}
        pointSize={particlesPointSize}
        radius={particlesRadius}
      />
    </>
  );
}
