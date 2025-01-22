import { useRef } from 'react'
import { useTexture } from "@react-three/drei"
import PointsOnGlobus from './PointsOnGlobus.jsx'
import { button, useControls } from 'leva'

export default function Globus({points, handlePointClick}) {

    const { positionGlob, rotationGlob, visible } = useControls('globus', {
        positionGlob:
        {
            value: { x: 0, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        rotationGlob:
        {
            value: { x: 0, y: 0, z: 0 },
            step: 0.01
        },
        visible: true,
        clickMe: button(() => { console.log('ok') })
    })

    const sphere = useRef()

    const props = useTexture({
        map: 'textures/earth/day.jpg',
    })

    return <group position={[ positionGlob.x, positionGlob.y, 0 ]} rotation={[ rotationGlob.x, rotationGlob.y, rotationGlob.z ]}>
        <mesh rotation-y={ -Math.PI * 0.5 } ref={ (el) => {
            if (el) {
                sphere.current = el
            }
        } } visible={ visible }>
            <sphereGeometry args={[ 2, 32, 32 ]}/>
            <meshStandardMaterial {...props} />
        </mesh>
        <PointsOnGlobus points={points} refSphere={ sphere } handlePointClick={handlePointClick} />
    </group>
}