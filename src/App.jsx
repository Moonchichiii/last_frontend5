import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import { CurrentUserProvider } from './contexts/CurrentUserContext'; 
import { ProfileDataProvider } from './contexts/ProfileDataContext';
import ProtectedRoute from './pages/routing/ProtectedRoute';

import Layout from './assets/styles/LayOut.jsx';

// import PostCard from "./components/Card.jsx";
import LoginForm from './pages/auth/LoginForm';
import RegistrationForm from './pages/auth/SignUpForm';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = lazy(() => import('./pages/dashboard/DashBoard.jsx'));

function App() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={
          <Layout>
            <div className="container">
              {/* <PostCard />  */}
              <RegistrationForm />            
              <LoginForm />
            </div>
          </Layout>
        } />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <CurrentUserProvider>
                <ProfileDataProvider>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProfileDataProvider>
              </CurrentUserProvider>
            </ProtectedRoute>
          }
        />
        
      </Routes>    
    </Suspense>
  );
}

export default App;
