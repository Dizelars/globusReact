import { useRef } from 'react'
import { useTexture } from "@react-three/drei"
import AddPointsOnGlobus from './AddPointsOnGlobus.jsx'
import { button, useControls } from 'leva'

export default function Globus(points) {

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

    let townData = points.points.points

    // console.log(townData)

    return <group position={[ positionGlob.x, positionGlob.y, 0 ]} rotation={[ rotationGlob.x, rotationGlob.y, rotationGlob.z ]}>
        <mesh rotation-y={ -Math.PI * 0.5 } ref={ sphere } visible={ visible }>
            <sphereGeometry args={[ 2, 32, 32 ]}/>
            <meshStandardMaterial {...props} />
        </mesh>
        <AddPointsOnGlobus towns={townData} refSphere={ sphere } />
    </group>
}