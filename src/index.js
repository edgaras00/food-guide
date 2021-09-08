import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/index.css';
import {DataContextProvider} from './Context/dataContext';

ReactDOM.render(
  <DataContextProvider>
    <App />
  </DataContextProvider>,
  document.getElementById('root')
)
