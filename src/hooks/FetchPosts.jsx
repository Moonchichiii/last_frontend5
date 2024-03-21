import { useState, useEffect, useCallback } from 'react';
import { axiosFormData } from '../api/axiosConfig';

function useFetchPosts(searchTerm = '', initialPage = 1) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);

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

    // Search and infinite scroll function 
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosFormData.get(`/posts/?search=${encodeURIComponent(searchTerm)}&page=${initialPage}`);
                setPosts(prevPosts => initialPage === 1 ? response.data.results : [...prevPosts, ...response.data.results]);
                setHasMore(response.data.results.length > 0);
            } catch (err) {
                if (err.response.status === 404) {
                    setHasMore(false);
                    setError('No more posts to load!'); 
                } else {
                    setError('Failed to fetch posts. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [searchTerm, initialPage]);

    return { posts, loading, error, hasMore };

}

export default useFetchPosts;