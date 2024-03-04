import { useState, useEffect } from 'react';
import { axiosFormData } from '../api/axiosConfig';

function useSearchAndScrollPosts(searchTerm, page = 1) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {        
        setPosts([]);
    }, [searchTerm]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchPosts = async () => {
            try {
                const response = await axiosFormData.get(`/posts?search=${searchTerm}&page=${page}`);
                setPosts(prevPosts => [...prevPosts, ...response.data.results]);
                setHasMore(response.data.results.length > 0);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchTerm, page]);

    return { posts, loading, error, hasMore };
}

export default useSearchAndScrollPosts;