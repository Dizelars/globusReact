import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience';
import AddLocationForm from './components/AddLocationForm';
import { StrictMode } from 'react'
import { Leva } from 'leva'

const App = () => {
  let [points, setPoints] = useState([
    { id: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { id: 'Beijing', lat: 39.9042, lng: 116.4074 },
    { id: 'Melbourne', lat: -37.813755, lng: 144.962672 },
    { id: 'Zanzibar', lat: -6.137971, lng: 39.359217 },
    { id: 'Shanghai', lat: 31.230860, lng: 121.468894 },
    { id: 'Mumbai', lat: 18.932191, lng: 72.831107 },
    { id: 'Kairo', lat: 30.050986, lng: 31.246586 },
    { id: 'Dubai', lat: 25.229794, lng: 55.289289 },
    { id: 'Istanbul', lat: 41.011225, lng: 28.978151 },
    { id: 'Perth', lat: -32.088789, lng: 115.894707 },
    { id: 'Nya Delhi', lat: 28.614198, lng: 77.202425 },
  ]);

// Dakar
// 14.669213
// -17.432573

  const handleAddLocation = (newPoint) => {
    setPoints((prevPoints) => {
      // Проверяем уникальность точки
      const exists = prevPoints.some(
        (point) => point.lat === newPoint.lat && point.lng === newPoint.lng
      );
      if (exists) return prevPoints; // Если точка уже существует, не обновляем состояние
      return [...prevPoints, newPoint]; // Добавляем только уникальные точки
    });
  };

  const handlePointClick = (id) => {
    console.log(`Clicked on point ID: ${id}`);
  };

  return (
    <>
      <StrictMode>
        <Leva collapsed />
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
          <Experience points={points} handlePointClick={handlePointClick} />
        </Canvas>
        <AddLocationForm onAddLocation={handleAddLocation} />
      </StrictMode>
    </>
  );
};

export default App;
