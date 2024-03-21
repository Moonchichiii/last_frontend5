import React, { useState } from "react";
import PostCard from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchPosts from "../../hooks/FetchPosts";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { posts, loading, error, hasMore, fetchPosts } = useFetchPosts(
    searchTerm,
    page
  );

  

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    fetchPosts();
  };
  const handleFeed = () => {
    fetchPosts();
    setPage(1);
  };
  
  
  return (
    <div>
      <main>
        <div className="mb-3 text-center">
          <h1>Dashboard</h1>
          <p>Post and interact!</p>
          <SearchBar onSearch={handleSearch} />
        </div>

        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
            
          <PostCard posts={posts}
           />
          
        </InfiniteScroll>
        {loading && <div>Loading posts...</div>}
        {error && <div>{error}</div>}
      </main>
    </div>
  );
};

export default Dashboard;
