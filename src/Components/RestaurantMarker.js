import React, { useRef, useEffect, useContext } from "react";
import { Marker, Popup } from "react-leaflet";
import { DataContext } from "../context/dataContext";
import "../styles/marker.css";

const RestaurantMarker = (props) => {
  // Functional map marker component
  // Marker for a venue

  const markerRef = useRef(null);
  const { position, name, address, openPopup, id } = props;
  const { setSelected, selected, setSelectMarker } = useContext(DataContext);

  const handleClick = async () => {
    try {
      // Function that fetches venue data when a marker is clicked
      // The venue data is displayed on the sidebar
      if (id) {
        const main = "https://api.foursquare.com/v2/venues/";
        const clientId = process.env.REACT_APP_API;
        const secret = process.env.REACT_APP_SECRET;
        const v = "20201205";
        const completeQuery = `${main}${id}?client_id=${clientId}&client_secret=${secret}&v=${v}`;

        const response = await fetch(completeQuery);
        const data = await response.json();
        setSelected(data.response.venue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupClose = () => {
    // Unselect and hide data when venue marker popup is closed
    setSelected(null);
    setSelectMarker(null);
  };

  useEffect(() => {
    // Open popup
    if (openPopup) markerRef.current.openPopup();
  }, [openPopup]);

  return (
    <Marker
      ref={markerRef}
      position={position}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup onClose={handlePopupClose}>
        <div>
          {selected && selected.url ? (
            <a href={selected.url} target="_blank" rel="noopener noreferrer">
              <h3>{name}</h3>
            </a>
          ) : (
            <h3>{name}</h3>
          )}

          <br />
          <h4>{address}</h4>
        </div>
      </Popup>
    </Marker>
  );
};

export default RestaurantMarker;
