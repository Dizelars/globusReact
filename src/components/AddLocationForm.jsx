import React, { useState } from 'react';

const AddLocationForm = ({ onAddLocation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude), id: name });
    setLatitude('');
    setLongitude('');
    setName('');
  };

  return (
    <div className="addLocations">
      <div className="addLocations_wrapper">
        <h1 className="title">Add a point to the globe</h1>
        <form onSubmit={handleSubmit} className="addLocations_form">
          <div>
            <label>Latitude:</label>
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
          </div>
          <div>
            <label>Longitude:</label>
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm;
