import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import ProtectedRoute from "./pages/routing/ProtectedRoute";

import { ModalProvider } from "./contexts/ModalContext";

import Layout from './assets/styles/LayOut.jsx';
import PostCard from "./components/Card.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = lazy(() => import("./pages/dashboard/DashBoard.jsx"));

function App() {
  

  return (
      
      <ModalProvider>
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Loading...
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <div className="container">
                    <PostCard />
                  </div>
                </Layout>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <ProfileDataProvider>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProfileDataProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ModalProvider>
  );
}

export default App;
