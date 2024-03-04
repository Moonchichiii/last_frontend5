import { useState, useCallback } from 'react';
import { axiosJson } from '../api/axiosConfig';

const usePostActions = (updateLikesCount) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // post deletion
    const deletePost = useCallback(async (postId) => {
        setLoading(true);
        try {
            await axiosJson.delete(`/posts/${postId}`);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, []);

    // liking a post
    const likePost = useCallback(async (postId) => {
        setLoading(true);
        try {
            await axiosJson.post(`/likes/`, { post: postId });
            updateLikesCount(postId, true); 
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, [updateLikesCount]);

    //  unliking a post
    const unlikePost = useCallback(async (likeId) => {
        setLoading(true);
        try {
            await axiosJson.delete(`/likes/${likeId}`);
            updateLikesCount(likeId, false); 
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unexpected error occurred');
            setLoading(false);
        }
    }, [updateLikesCount]);

    return { likePost, unlikePost, deletePost, loading, error };
};

export default usePostActions;

