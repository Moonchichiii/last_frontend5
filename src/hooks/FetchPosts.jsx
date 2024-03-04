import { useState, useEffect, useCallback } from 'react';
import { axiosFormData } from '../api/axiosConfig';

function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetching posts from the backend
    const fetchPosts = async () => {
        try {
            setLoading(true);            
            const response = await axiosFormData.get("/posts/");
            setPosts(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to fetch posts. Please try again.");
            setLoading(false);
        }
    };

    // updating the like count, 
    const updateLikesCount = useCallback((postId, increment) => {
        setPosts(currentPosts => 
          currentPosts.map(post => 
            post.id === postId ? { ...post, likes_count: post.likes_count + (increment ? 1 : -1) } : post
          )
        );
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, error, fetchPosts, updateLikesCount };
}

export default useFetchPosts;

