import React, { useContext } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RestaurantMarker from "./components/RestaurantMarker";
import { DataContext } from "./context/dataContext";
import "./styles/app.css";

const App = () => {
  // React Context data
  // State objects that are accessible to multiple components
  const {
    placesData,
    mapLat,
    mapLon,
    selectMarker,
    setSuggestions,
  } = useContext(DataContext);

  // Create marker components that will be displayed on the map
  // Each marker has venue name and its address shown on the map
  const markerComponents = placesData.map((item, index) => {
    return (
      <RestaurantMarker
        key={index + item.venue.name}
        position={[item.venue.location.lat, item.venue.location.lng]}
        name={item.venue.name}
        address={item.venue.location.address}
        openPopup={selectMarker === index}
        id={item.venue.id}
      />
    );
  });

  const ChangeView = ({ center }) => {
    // Center the map at new location
    const map = useMap();
    map.setView([mapLat, mapLon]);
    return null;
  };

  // Function to remove suggestions from the searchbar when user clicks
  // anywhere else on the app
  const handleAppClick = () => setSuggestions([]);

  return (
    <div className="app" onClick={handleAppClick}>
      <div className="container">
        <Navbar />
        <div className="content">
          <Sidebar />
          <MapContainer center={[mapLat, mapLon]} zoom={14}>
            <ChangeView center={[mapLat, mapLon]} zoom={14} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerComponents}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
