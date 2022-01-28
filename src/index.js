import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { DataContextProvider } from "./context/dataContext";

ReactDOM.render(
  <DataContextProvider>
    <App />
  </DataContextProvider>,
  document.getElementById("root")
);
