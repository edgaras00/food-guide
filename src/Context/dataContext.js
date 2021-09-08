import React, { useState } from "react";

// React Context
const DataContext = React.createContext();

const DataContextProvider = (props) => {
  // State available to multiple components

  // Array of venue objects
  const [placesData, setPlacesData] = useState([]);
  // Currently selected venue object
  // Additional venue information is shown when a venue object is selected
  // A marker popup is shown on the map when a venue object is selected
  const [selected, setSelected] = useState(null);
  const [selectMarker, setSelectMarker] = useState(null);
  // Latitude
  const [mapLat, setMapLat] = useState(40.76556);
  // Longitude
  const [mapLon, setMapLon] = useState(-73.9561);
  // Array of location search suggestions
  const [suggestions, setSuggestions] = useState([]);

  return (
    <DataContext.Provider
      value={{
        placesData,
        setPlacesData,
        selected,
        setSelected,
        mapLat,
        setMapLat,
        mapLon,
        setMapLon,
        selectMarker,
        setSelectMarker,
        suggestions,
        setSuggestions,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContextProvider, DataContext };
