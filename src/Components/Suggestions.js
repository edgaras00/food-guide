import React, { useContext } from "react";
import { DataContext } from "../context/dataContext";
import "../styles/suggestions.css";

const Suggestions = (props) => {
  const { setMapLat, setMapLon, setPlacesData } = useContext(DataContext);

  // API Query
  const main = "https://api.foursquare.com/v2/venues/explore?";
  const clientId = process.env.REACT_APP_API;
  const secret = process.env.REACT_APP_SECRET;
  const v = "20201205";
  const categoryId = "4d4b7105d754a06374d81259";
  const offset = "5";
  const limit = "10";
  const price = "1,2,3";

  // Break up long query into multiple parts for readability
  const queryOne = `${main}client_id=${clientId}&client_secret=${secret}`;
  const queryTwo = `&v=${v}&categoryId=${categoryId}&limit=${limit}`;
  const queryThree = `&offset=${offset}&price=${price}`;
  const completeQuery = queryOne + queryTwo + queryThree;

  const handleClick = async (name, lat, lon) => {
    // Function that handles a place suggestion click
    // Fetches location data and centers the map at that location
    try {
      const response = await fetch(`${completeQuery}&ll=${lat},${lon}`);
      const data = await response.json();
      setPlacesData(data.response.groups[0].items);
      setMapLat(parseFloat(lat));
      setMapLon(parseFloat(lon));
      props.changeData([]);
      props.locationValue(name);
    } catch (error) {}
  };

  const suggestionItems = props.data.map((item, index) => {
    return (
      <h6
        key={index}
        onClick={() => handleClick(item.display_name, item.lat, item.lon)}
      >
        {item.display_name}
      </h6>
    );
  });
  return <div className="suggestion-container">{suggestionItems}</div>;
};

export default Suggestions;
