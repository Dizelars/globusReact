import React, { createRef } from "react";
import { useTexture } from "@react-three/drei";
import PointsOnGlobus from "./PointsOnGlobus.js";
import { button, useControls } from "leva";
import { Point } from "app/App";
import {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
} from "three";

type Props = {
  points: Point[];
  handlePointClick: ({ id, end }: { id: string; end: Vector3 }) => void;
};

export type SphereType = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[],
  Object3DEventMap
>;

export default function Globus({ points, handlePointClick }: Props) {
  const { positionGlob, rotationGlob, visible } = useControls("globus", {
    positionGlob: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      // joystick: 'invertY'
    },
    rotationGlob: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    visible: true,
    clickMe: button(() => {
      if (!groupGlobus.current) {
        return;
      }

      groupGlobus.current.scale.x += 0.1;
      groupGlobus.current.scale.y += 0.1;
      groupGlobus.current.scale.z += 0.1;
    }),
  });

  const sphere = createRef<SphereType>();
  const groupGlobus = createRef<Group<Object3DEventMap>>();

  const props = useTexture({
    map: "textures/earth/day.jpg",
  });

  // const BasicParticles = () => {
  //     // This reference gives us direct access to our points
  //     const points = useRef();

  //     // You can see that, like our mesh, points also takes a geometry and a material,
  //     // but a specific material => pointsMaterial
  //     return (
  //         <points ref={points}>
  //             <sphereGeometry args={[1, 48, 48]} />
  //             <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation />
  //         </points>
  //     );
  // };

  return (
    <group
      ref={groupGlobus}
      position={[positionGlob.x, positionGlob.y, positionGlob.z]}
      rotation={[rotationGlob.x, rotationGlob.y, rotationGlob.z]}
    >
      <mesh rotation-y={-Math.PI * 0.5} ref={sphere} visible={visible}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial {...props} />
      </mesh>
      {/* <points ref={ sphere } visible={ visible } >
            <sphereGeometry args={[2, 64, 64]} />
            <pointsMaterial size={0.1} sizeAttenuation />
        </points> */}
      <PointsOnGlobus
        points={points}
        refSphere={sphere}
        handlePointClick={handlePointClick}
      />
    </group>
  );
}
