import React, { useState,Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/routing/ProtectedRoute";

import { ModalProvider } from "./contexts/ModalContext";

import Layout from './assets/styles/LayOut.jsx';
import PostCard from "./components/Card.jsx";

import SearchBar from './components/SearchBar.jsx'
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetchPosts from './hooks/FetchPosts';





import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Dashboard = lazy(() => import("./pages/dashboard/DashBoard.jsx"));

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { posts, loading, error, hasMore } = useFetchPosts(searchTerm, page);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

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
                  <SearchBar onSearch={handleSearch} />
                  <Suspense fallback={<div>Loading...</div>}>
                    <InfiniteScroll
                      dataLength={posts.length}
                      next={() => setPage(page + 1)}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                    >
                      <PostCard posts={posts} />
                                          </InfiniteScroll>
                    {loading && <div>Loading posts...</div>}
                    {error && <div>Error: {error.message}</div>}
                  </Suspense>
                </div>
              </Layout>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </ModalProvider>
  );
}

export default App;
