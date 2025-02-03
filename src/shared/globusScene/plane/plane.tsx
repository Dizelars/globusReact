import React from "react";
import * as THREE from "three";

export type Props = {
  visible: boolean;
  color: string;
  side: typeof THREE.DoubleSide;
  args?: [
    width?: number | undefined,
    height?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined
  ];
};

// Plane => 2-мерная поверхность
export default function Plane({ visible, color, side, args }: Props) {
  return (
    <mesh visible={visible}>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} side={side} />
    </mesh>
  );
}
