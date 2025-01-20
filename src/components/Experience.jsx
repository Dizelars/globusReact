import { OrbitControls } from '@react-three/drei'
import Globus from './Globus.jsx'

export default function Experience(points) {
    return <>
        <OrbitControls />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Globus points={points} />
    </>
}