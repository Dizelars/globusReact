import React, { useState } from 'react';
// import Globus_native from './components/Globus_native';
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience';
import AddLocationForm from './components/AddLocationForm';

// const App = () => {
//   const [points, setPoints] = useState([
//     { id: 'Moscow', lat: 55.7558, lng: 37.6173 },
//     { id: 'Beijing', lat: 39.9042, lng: 116.4074 },
//   ]);

//   const handleAddLocation = (newPoint) => {
//     setPoints((prevPoints) => [...prevPoints, newPoint]);
//     // setPoints(() => newPoint);
//   };

//   const handlePointClick = (id) => {
//     alert(`Point clicked: ${id}`);
//   };

//   return (
//     <div className="App">
//       <Globus points={points} onAddPoint={handlePointClick} />
//       <AddLocationForm onAddLocation={handleAddLocation} />
//     </div>
//   );
// };

const App = () => {
  const [points, setPoints] = useState([
    { id: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { id: 'Beijing', lat: 39.9042, lng: 116.4074 },
  ]);

  const handleAddLocation = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };

  const handlePointClick = (id) => {
    alert(`Point clicked: ${id}`);
  };

  return (
    <>
      <Canvas
      className='webgl'
          dpr={ [ 1, 2 ] }
          camera={ {
              fov: 25,
              near: 0.1,
              far: 100,
              position: [ 12, 5, 4 ]
          } }
      >
        <Experience points={points} onAddPoint={handlePointClick} />
      </Canvas>
      <AddLocationForm onAddLocation={handleAddLocation} />
    </>
  );
};

export default App;
