import { Canvas } from '@react-three/fiber'
import Experience from './Experience';
import AddLocationForm from './AddLocationForm';
import { Leva } from 'leva'

export default function SceneWithGlobus({ points, handleAddLocation, handlePointClick}) {
    return <>
        <Leva collapsed />
        <Canvas
        className='webgl'
            dpr={ [ 1, 2 ] }
            camera={ {
                fov: 25,
                near: 0.1,
                far: 100
            } }
        >
            {/* position: [ 12, 5, 4 ] */}
          <Experience points={points} handlePointClick={handlePointClick} />
        </Canvas>
        {/* <AddLocationForm onAddLocation={handleAddLocation} /> */}
    </>
}