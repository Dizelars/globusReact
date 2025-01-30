import { OrbitControls } from '@react-three/drei'
import Globus from './Globus.jsx'
import CustomGeometryParticles from './CustomGeometryParticles.jsx'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three';

export default function Experience({points, handlePointClick}) {

    const { perfVisible } = useControls({
        perfVisible: true
    })

    const { particlesCount, particlesPosition, particlesScale, particlesColor, particlesVisible, particlesPointSize } = useControls('particles', {
        particlesCount: {
            value: 10000,
            step: 500,
            min: 1000,
            max: 10000
        },
        particlesPosition:
        {
            value: { x: 0, y: 0, z: -1 },
            step: 0.01,
            joystick: 'invertY'
        },
        particlesScale:
        {
            value: 0.5,
            step: 0.01,
            min: 0.1,
            max: 6
        },
        particlesColor: '#5786F5',
        particlesVisible: true,
        particlesPointSize: {
            value: 0.015,
            step: 0.001,
            min: 0,
            max: 0.2
        }
    })

    const { planeColor, planeVisible } = useControls('plane', {
        planeColor: 'orange',
        planeVisible: true
    })

    return <>

        { perfVisible && <Perf position="top-left" /> }

        <OrbitControls />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        {/* <Globus points={points} handlePointClick={handlePointClick} /> */}

        <mesh visible={ planeVisible }>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={ planeColor } side={ THREE.DoubleSide } />
        </mesh>

        <CustomGeometryParticles 
            count={ particlesCount } 
            shape="box" 
            position={[ particlesPosition.x, particlesPosition.y, particlesPosition.z ]} 
            scale={ particlesScale }
            color={ particlesColor }
            visible={ particlesVisible }
            pointSize={ particlesPointSize }
        />
    </>
}