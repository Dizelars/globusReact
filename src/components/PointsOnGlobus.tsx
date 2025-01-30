import * as THREE from "three";
import { Html } from "@react-three/drei";
import { memo, useState } from "react";
import { Point } from "../App";
import { SphereType } from "./Globus";
import { Vector3 } from "three";

type Props = {
  points: Point[];
  refSphere: React.RefObject<SphereType>;
  handlePointClick: ({ id, end }: { id: string; end: Vector3 }) => void;
};

const PointsOnGlobus = memo(function PointsOnGlobus({
  points,
  refSphere,
  handlePointClick,
}: Props) {
  const [hoveredPoint, setHoveredPoint] = useState({}); // Состояние видимости для каждой точки

  if (!points || !Array.isArray(points)) return null;

  const handleMouseEnter = (id: string) => {
    setHoveredPoint((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredPoint((prev) => ({ ...prev, [id]: false }));
  };

  const createLine = (
    id: string,
    lat: number,
    lng: number,
    isNew?: boolean
  ) => {
    const coordSpherical = {
      lat: THREE.MathUtils.degToRad(90 - lat),
      lon: THREE.MathUtils.degToRad(lng),
    };

    const positionVector = new THREE.Vector3().setFromSphericalCoords(
      2,
      coordSpherical.lat,
      coordSpherical.lon
    );

    // const start = new THREE.Vector3(0, 0, 0);
    const end = positionVector.clone();
    // const lineGeom = new THREE.BufferGeometry().setFromPoints([start, end]);

    return (
      // geometry={ lineGeom }
      <line userData={{ id }} key={`${lat}-${lng}`}>
        {/* <mesh position={end.toArray()}>
            <sphereGeometry args={[0.03, 14, 14]} />
            <meshStandardMaterial color="green" />
        </mesh>  */}
        {/* <lineBasicMaterial color="yellow" /> */}
        <Html
          position={end.toArray()}
          wrapperClass={isNew ? "point new-point" : "point"}
          center
          distanceFactor={7}
          occlude={[refSphere]}
        >
          <div className="pulseTipon" />
          <div
            className="label"
            onMouseEnter={() => handleMouseEnter(id)} // Наведение
            onMouseLeave={() => handleMouseLeave(id)} // Отведение
            onClick={() => handlePointClick({ id, end })} // Клик
          >
            {hoveredPoint[id] ? (
              <div className="text">
                <p className="city_name">{id}</p>
                <p className="city_latitude">{lat}</p>
                <p className="city_longitude">{lng}</p>
              </div>
            ) : null}
          </div>
        </Html>
      </line>
    );
  };

  return (
    <group>
      {points.map((point) =>
        createLine(point.id, point.lat, point.lng, point.isNew)
      )}
    </group>
  );
});

export default PointsOnGlobus;
