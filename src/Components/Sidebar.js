import React, { useContext } from "react";
import SidebarItem from "./SidebarItem";
import { DataContext } from "../Context/dataContext";
import "../Styles/sidebar.css";

const Sidebar = () => {
  // Functional sidebar component
  // Holds data about different venues

  const {
    placesData,
    setSelected,
    selected,
    setSelectMarker,
    setSuggestions,
  } = useContext(DataContext);

  const handleItemClick = async (index, venueId) => {
    try {
      setSelectMarker(index);
      setSuggestions([]);
      // Fetch details of venue
      const main = "https://api.foursquare.com/v2/venues/";
      const clientId = process.env.REACT_APP_API;
      const secret = process.env.REACT_APP_SECRET;
      const v = "20201205";
      const completeQuery = `${main}${venueId}?client_id=${clientId}&client_secret=${secret}&v=${v}`;

      const response = await fetch(completeQuery);
      if (response.status === 429) {
        alert("REquest limit reached (50)!");
      }
      const data = await response.json();
      setSelected(data.response.venue);
    } catch (error) {
      console.log(error);
    }
  };
  // Create sidebar item components
  // Each item represents a different venue and contains info about it
  const sidebarComponents = placesData.map((item, index) => {
    return (
      <SidebarItem
        key={index + item.venue.name}
        logo={`${item.venue.categories[0].icon.prefix}64.png`}
        category={item.venue.categories[0].name}
        name={item.venue.name}
        url={selected && selected.url ? selected.url : null}
        address={item.venue.location.address}
        priceTier={selected && selected.price.tier ? selected.price.tier : null}
        phone={
          selected && selected.contact.formattedPhone
            ? selected.contact.formattedPhone
            : null
        }
        menu={selected && selected.menu ? selected.menu.url : null}
        onItemClick={() => {
          handleItemClick(index, item.venue.id);
        }}
      />
    );
  });

  return <div className="sidebar">{sidebarComponents}</div>;
};

export default Sidebar;
