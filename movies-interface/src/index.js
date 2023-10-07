import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Importing BrowserRouter for routing purpose
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Importing Provider for Redux
import { store } from './store'; // Inporting redux store

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the app inside a BrowserRouter (for routing) and a Provider (for Redux state management)
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App /> </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

