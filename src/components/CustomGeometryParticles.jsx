import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "../assets/shaders/particles/vertexShader.glsl";
import fragmentShader from "../assets/shaders/particles/fragmentShader.glsl";

export default function CustomGeometryParticles(props) {
  const { count, shape, position, scale, color, visible, pointSize, radius } =
    props;

  // Прямой доступ к нашим точкам
  const points = useRef();

  // Массив атрибутов наших позиций для атрибутов геометрии
  // const particlesPosition = useMemo(() => {
  //   const positions = new Float32Array(count * 3);

  //   if (shape === "box") {
  //     for (let i = 0; i < count; i++) {
  //       let x = (Math.random() - 0.5) * 2;
  //       let y = (Math.random() - 0.5) * 2;
  //       let z = (Math.random() - 0.5) * 2;

  //       positions.set([x, y, z], i * 3);
  //     }
  //   }

  //   if (shape === "sphere") {
  //     const distance = 1;

  //     for (let i = 0; i < count; i++) {
  //       const theta = THREE.MathUtils.randFloatSpread(360);
  //       const phi = THREE.MathUtils.randFloatSpread(360);

  //       let x = distance * Math.sin(theta) * Math.cos(phi);
  //       let y = distance * Math.sin(theta) * Math.sin(phi);
  //       let z = distance * Math.cos(theta);

  //       positions.set([x, y, z], i * 3);
  //     }
  //   }

  //   return positions;
  // }, [count, shape]);

  // Массив атрибутов наших позиций для шейдера
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      // Выставляем координаты в хаотичном порядке, заполняя весь шар
      // const distance = Math.sqrt(Math.random()) * radius;
      // let x = distance * Math.sin(theta) * Math.cos(phi)
      // let y = distance * Math.sin(theta) * Math.sin(phi);
      // let z = distance * Math.cos(theta);

      // Выставляем координаты по линии радиуса окружности
      let x = radius * Math.sin(theta) * Math.cos(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count, radius]);

  // Шейдер
  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
    }),
    []
  );

  useFrame((state, delta) => {
    const { clock } = state;

    // Анимация частиц при помощи атрибутов геометрии
    // for (let i = 0; i < count; i++) {
    //   const i3 = i * 3;

    //   points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 50) * 0.002;
    //   points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 50) * 0.002;
    //   points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 50) * 0.002;
    // }

    // points.current.geometry.attributes.position.needsUpdate = true;

    // Анимация частиц при помощи шейдеров
    points.current.material.uniforms.uTime.value = clock.elapsedTime;

    points.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={points} position={position} scale={scale} visible={visible}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <pointsMaterial
          size={ pointSize }
          color={ color }
          sizeAttenuation
          depthWrite={ false }
        /> */}
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
}
