import { useState, useCallback } from 'react';
import { axiosJson } from '../api/axiosConfig';

const usePostActions = (refreshPostsCallback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


// refresh after action taken
const refreshPosts = useCallback(() => {
    
}, []);


    // post deletion
    const deletePost = useCallback(async (postId) => {
        setLoading(true);
        try {
            await axiosJson.delete(`/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt_access')}`
                }
            });
            setLoading(false);
            refreshPosts(); 
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, [refreshPosts]);

    // liking a post
    const likePost = useCallback(async (postId) => {
        setLoading(true);
        try {
            await axiosJson.post(`/likes/`, { post: postId });
            refreshPosts(); 
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, [refreshPosts]);

    //  unliking a post
    const unlikePost = useCallback(async (likeId) => {
        setLoading(true);
        try {
            await axiosJson.delete(`/likes/${likeId}`);
            refreshPosts(); 
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, [refreshPosts]);

    const updateLikesCount = useCallback((postId, increment) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId ? { ...post, likes_count: post.likes_count + (increment ? 1 : -1) } : post
            )
        );
    }, []);


    return { likePost, unlikePost, deletePost, loading, error };
};

export default usePostActions;

