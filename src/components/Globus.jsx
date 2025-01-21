import { useRef } from 'react'
import { useTexture } from "@react-three/drei"
import AddPointsOnGlobus from './AddPointsOnGlobus.jsx'

export default function Globus(points) {

    const sphere = useRef()

    const props = useTexture({
        map: 'textures/earth/day.jpg',
    })

    let townData = points.points.points

    // console.log(townData)

    return <group>
        <mesh rotation-y={ -Math.PI * 0.5 } ref={ sphere }>
            <sphereGeometry args={[ 2, 64, 64 ]}/>
            <meshStandardMaterial {...props} />
        </mesh>
        <AddPointsOnGlobus towns={townData} refSphere={ sphere } />
    </group>
}