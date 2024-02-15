import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import { CurrentUserProvider } from './contexts/CurrentUserContext'; 
import { ProfileDataProvider } from './contexts/ProfileDataContext';
import ProtectedRoute from './pages/routing/ProtectedRoute';

import NavBar from './components/NavBar'
import LoginForm from './pages/auth/LoginForm';
import RegistrationForm from './pages/auth/SignUpForm';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = lazy(() => import('./pages/dashboard/DashBoard.jsx'));

function App() {
  
  
  return (

      <Routes>
        <Route path="/" element={
          <>
            <div className="container">
              <NavBar />
              <RegistrationForm />            
              <LoginForm /> 
            </div>
          </>
        } />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
                  <CurrentUserProvider>
              <ProfileDataProvider> 
                <Dashboard />
              </ProfileDataProvider>
              </CurrentUserProvider>
            </ProtectedRoute>
          }
        />
      </Routes>    
  );
}

export default App;