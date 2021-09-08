import React, { useContext } from "react";
import { DataContext } from "../Context/dataContext";
import "../Styles/sidebarItem.css";

const SidebarItem = (props) => {
  // Functional component for a sidebar item that holds info about venue

  const { selected } = useContext(DataContext);

  return (
    <div className="sidebar-item" onClick={props.onItemClick}>
      {/* // <div className="sidebar-item" onClick={() => setTest((prev) => !prev)}> */}
      <img src={props.logo} alt="logo" />
      <div className="information-content">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          <h4 className="name">{props.name}</h4>
        </a>
        <div className="primary-info">
          <h6 className="category">{props.category}</h6>
          <h5>{props.address}</h5>
        </div>
        {selected && selected.name === props.name ? (
          <div className="secondary-info">
            <div className="price-menu">
              <div>
                <span className={props.priceTier >= 1 ? "filled" : "empty"}>
                  $
                </span>
                <span className={props.priceTier >= 2 ? "filled" : "empty"}>
                  $
                </span>
                <span className={props.priceTier >= 3 ? "filled" : "empty"}>
                  $
                </span>
              </div>
              {props.menu ? (
                <a
                  className="menu"
                  href={props.menu}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Menu
                </a>
              ) : null}
            </div>
            <h6 className="phone">Phone: {props.phone}</h6>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
