import { useMemo, useRef } from 'react'
import * as THREE from 'three';

export default function CustomGeometryParticles(props) {
    const { count, shape, position, scale, color, visible, pointSize } = props;
  
    // This reference gives us direct access to our points
    const points = useRef();
  
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(count * 3);
  
      if (shape === "box") {
        for (let i = 0; i < count; i++) {
          let x = (Math.random() - 0.5) * 2;
          let y = (Math.random() - 0.5) * 2;
          let z = (Math.random() - 0.5) * 2;
  
          positions.set([x, y, z], i * 3);
        }
      }
  
      if (shape === "sphere") {
        const distance = 1;
  
        for (let i = 0; i < count; i++) {
          const theta = THREE.MathUtils.randFloatSpread(360);
          const phi = THREE.MathUtils.randFloatSpread(360);
  
          let x = distance * Math.sin(theta) * Math.cos(phi);
          let y = distance * Math.sin(theta) * Math.sin(phi);
          let z = distance * Math.cos(theta);
  
          positions.set([x, y, z], i * 3);
        }
      }
  
      return positions;
    }, [count, shape]);
  
    return (
      <points ref={ points } position={ position } scale={ scale } visible={ visible }>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ particlesPosition.length / 3 }
            array={ particlesPosition }
            itemSize={ 3 }
          />
        </bufferGeometry>
        <pointsMaterial
          size={ pointSize }
          color={ color }
          sizeAttenuation
          depthWrite={ false }
        />
      </points>
    );
  };