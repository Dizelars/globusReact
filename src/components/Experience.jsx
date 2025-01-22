import { OrbitControls } from '@react-three/drei'
import Globus from './Globus.jsx'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience({points, handlePointClick}) {

    const { perfVisible } = useControls({
        perfVisible: true
    })

    return <>

        { perfVisible && <Perf position="top-left" /> }

        <OrbitControls />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Globus points={points} handlePointClick={handlePointClick} />
    </>
}