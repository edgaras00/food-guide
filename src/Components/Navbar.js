import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../Context/dataContext";
import Suggestions from "../Components/Suggestions";
import "../Styles/navbar.css";

const fetchData = async (query) => {
  try {
    const response = await fetch(`${query}&ll=40.765560,-73.956100`);
    const data = await response.json();
    return data.response.groups[0].items;
    //    setPlacesData(data.response.groups[0].items);
  } catch (error) {
    console.log(error);
  }
};

const Navbar = () => {
  // Functional navbar component

  const { setPlacesData, suggestions, setSuggestions } = useContext(
    DataContext
  );
  // Controlled input state for user's searched location
  const [loc, setLoc] = useState("");
  // Boolean to hide location search suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    // API query
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

    const setupData = async () => {
      try {
        const data = await fetchData(completeQuery);
        setPlacesData(data);
      } catch (error) {
        console.log(error);
      }
    };
    setupData();
    // No need to add setupData() into dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoc = async (location) => {
    // Function to get search location suggestions

    try {
      setLoc(location);
      // Suggest only when the length of the input query is >= 4 characters
      if (location.length >= 10) {
        const baseUrl = `https://nominatim.openstreetmap.org/search?q=${location}`;
        const q = "&format=json&countrycodes=us";
        const response = await fetch(baseUrl + q);
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <h2>FOOD GUIDE</h2>
      <div className="search-input">
        <input
          placeholder="Enter location address"
          type="search"
          name="loc"
          value={loc}
          onChange={(e) => getLoc(e.target.value)}
          onFocus={() => setHideSuggestions(false)}
        />
        {suggestions.length > 0 && !hideSuggestions ? (
          <Suggestions
            data={suggestions.slice(0, 5)}
            changeData={setSuggestions}
            locationValue={setLoc}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
