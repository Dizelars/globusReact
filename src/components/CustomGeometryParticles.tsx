import React, {
  createRef,
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from "three";
// import vertexShader from "assets/shaders/particles/vertexShader.glsl";
// import fragmentShader from "assets/shaders/particles/fragmentShader.glsl";

type Props = {
  count: number;
  shape: string;
  color: string;
  pointSize: number;
  visible: boolean;
  position: [number, number, number];
  scale: number;
  radius: number;
  onModeChange: (value: string) => void;
  mode: string;
};

export default function CustomGeometryParticles({
  count,
  shape,
  position,
  scale: initialScale,
  color,
  visible,
  pointSize,
  radius,
  onModeChange,
  mode
}: Props) {
  // This reference gives us direct access to our points
  const points =
    createRef<
      Points<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >();

  // const [targetScene, setSceneMode] = useState(mode);
  const [targetScale, setTargetScale] = useState(initialScale);
  const currentScale = useRef(initialScale);

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3); // Добавляем массив цветов

    const color1 = new THREE.Color("#4423F0");
    const color2 = new THREE.Color("#AEF21F");
  
    const distance = 1;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);

      // Чередуем цвета
      const color = i % 2 === 0 ? color1 : color2;
      colors.set([color.r, color.g, color.b], i * 3);
    }
  
    return { positions, colors };
  }, [count]);

  // Массив атрибутов наших позиций для шейдера
  // const particlesPosition = useMemo(() => {
  //   const positions = new Float32Array(count * 3);

  //   for (let i = 0; i < count; i++) {
  //     const theta = THREE.MathUtils.randFloatSpread(360);
  //     const phi = THREE.MathUtils.randFloatSpread(360);

  //     // Выставляем координаты в хаотичном порядке, заполняя весь шар
  //     const distance = Math.sqrt(Math.random()) * radius;
  //     let x = distance * Math.sin(theta) * Math.cos(phi)
  //     let y = distance * Math.sin(theta) * Math.sin(phi);
  //     let z = distance * Math.cos(theta);

  //     // Выставляем координаты по линии радиуса окружности
  //     // let x = radius * Math.sin(theta) * Math.cos(phi);
  //     // let y = radius * Math.sin(theta) * Math.sin(phi);
  //     // let z = radius * Math.cos(theta);

  //     positions.set([x, y, z], i * 3);
  //   }

  //   return positions;
  // }, [count]);

  // Шейдер
  // const uniforms = useMemo(
  //   () => ({
  //     uTime: {
  //       value: 0.0,
  //     },
  //     uRadius: {
  //       value: radius,
  //     },
  //   }),
  //   []
  // );

  useFrame((state, delta) => {
    // const { clock } = state;

    if (!points.current) {
      return;
    }

    // Анимация частиц при помощи атрибутов геометрии
    // for (let i = 0; i < count; i++) {
    //   const i3 = i * 3;

    //   points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 50) * 0.002;
    //   points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 50) * 0.002;
    //   points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 50) * 0.002;
    // }

    // points.current.geometry.attributes.position.needsUpdate = true;

    // Анимация частиц при помощи шейдеров
    // Анимируем scale с плавной интерполяцией
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.1 // Чем меньше значение, тем медленнее анимация
    );

    points.current.scale.set(
      currentScale.current,
      currentScale.current,
      currentScale.current
    );

    // (points.current.material as any).uniforms.uTime.value = clock.elapsedTime;
    // Вращение шара с частицами
    points.current.rotation.y += delta * 0.1;
    points.current.rotation.x += delta * 0.1;
  });

  // Функция для изменения состояния сцены
  const changeSceneMode = useCallback((mode: string) => {
    // setSceneMode(mod);
    onModeChange(mode);
  }, []);

  // console.log(mode);

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
      setTargetScale(1); // Увеличиваем шар
    } else {
      setTargetScale(0.25); // Возвращаем шар к обычному размеру
    }
  }, [mode]);

  return (
    <points
      ref={points}
      position={position}
      scale={initialScale}
      visible={visible}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesPosition.colors.length / 3}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        // color={color}
        vertexColors
        sizeAttenuation
        depthWrite={false}
      />
      {/* <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      /> */}
    </points>
  );
}
