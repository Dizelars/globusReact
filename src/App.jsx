import React, { useState } from 'react';
import Globus from './components/Globus';
import AddLocationForm from './components/AddLocationForm';

const App = () => {
  const [points, setPoints] = useState([
    { id: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { id: 'Beijing', lat: 39.9042, lng: 116.4074 },
  ]);

  const handleAddLocation = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
    // setPoints(() => newPoint);
  };

  const handlePointClick = (id) => {
    alert(`Point clicked: ${id}`);
  };

  return (
    <div className="App">
      <Globus points={points} onAddPoint={handlePointClick} />
      <AddLocationForm onAddLocation={handleAddLocation} />
    </div>
  );
};

export default App;
