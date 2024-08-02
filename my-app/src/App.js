import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';  // Import the CSS file for styling

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ideal-fishstick-jj4pq4wv9jg9354gx-5000.app.github.dev/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => setError(error.toString()));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Map Application</h1>
        <nav className="App-navbar">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      {error && <div className="error">Error: {error}</div>}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Find Data
</h1>
      <div className="Map-container">
        <MapContainer center={[80.0, 135.0]} zoom={3} className="Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data && data.features.map((feature, index) => {
            if (feature.geometry.type === 'Point') {
              return (
                <Marker
                  key={index}
                  position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                >
                  <Popup>
                    <div>
                      <strong>{feature.properties.name}</strong><br />
                      <a href={feature.properties.link} target="_blank" rel="noopener noreferrer">
                        Visit Link
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            } else if (feature.geometry.type === 'Polygon') {
              return (
                <Polygon
                  key={index}
                  positions={feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                >
                  <Popup>
                    <div>
                      <strong>{feature.properties.name}</strong><br />
                      <a href={feature.properties.link} target="_blank" rel="noopener noreferrer">
                        Visit Link
                      </a>
                    </div>
                  </Popup>
                </Polygon>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
