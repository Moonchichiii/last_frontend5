import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <CurrentUserProvider>
      <App />
      </CurrentUserProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);


