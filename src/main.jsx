import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CurrentUserProvider>
    <ProfileDataProvider>
      <App />
    </ProfileDataProvider>
  </CurrentUserProvider>
</React.StrictMode>,
);
