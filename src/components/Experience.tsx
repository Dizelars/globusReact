import React, { useState, useEffect, useCallback } from "react";
import { OrbitControls } from "@react-three/drei";
import Globus from "./Globus";
import CustomGeometryParticles from "./CustomGeometryParticles";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Point } from "../App";
import { Vector3 } from "three";

type Props = {
  points: Point[];
  mode: string;
  handlePointClick: ({ id, end }: { id: string; end: Vector3 }) => void;
  onModeChange: (value: string) => void;
};

export default function Experience({
  points,
  handlePointClick,
  onModeChange,
  mode,
}: Props) {
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
      value: 2000,
      step: 500,
      min: 1000,
      max: 10000,
    },
    particlesPosition: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    particlesScale: {
      value: 0.25,
      step: 0.01,
      min: 0.1,
      max: 6,
    },
    particlesColor: "#5786F5",
    particlesVisible: true,
    particlesPointSize: {
      // value: 0.015,
      value: 0.1,
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

  const { planePosition, planeColor, planeVisible } = useControls("plane", {
    planePosition: {
      value: { x: 0, y: 0, z: 0.4 },
      step: 0.01,
      joystick: "invertY",
    },
    planeColor: "#AEF21F",
    planeVisible: true,
  });

  const [targetPlaneVisible, setPlaneVisible] = useState(planeVisible);

  // Функция для изменения состояния сцены
  const changeSceneMode = useCallback((mode: string) => {
    // setSceneMode(mod);
    onModeChange(mode);
  }, []);

  // Обработчик скролла
  const handleScroll = (event: WheelEvent) => {
    changeSceneMode(event.deltaY > 0 ? "particles" : "empty");
  };

  // Добавляем обработчик скролла
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mode === "particles") {
      setPlaneVisible(false);
    } else {
      setPlaneVisible(true);
    }
  }, [mode]);

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls enablePan={false} enableZoom={false} />

      {/* <directionalLight position={[1, 2, 3]} intensity={4.5} /> */}
      <ambientLight intensity={1.5} />

      {/* <Globus points={points} handlePointClick={handlePointClick} /> */}

      <mesh
        visible={targetPlaneVisible}
        position={[planePosition.x, planePosition.y, planePosition.z]}
      >
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
        mode={mode}
        onModeChange={onModeChange}
      />
    </>
  );
}
