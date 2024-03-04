import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Button, Form, Alert } from "react-bootstrap";
import { axiosFormData } from "../../api/axiosConfig";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useModal } from "../../contexts/ModalContext";


const PostEditForm = ({ post }) => {
    const [postData, setPostData] = useState({
        title: post?.title || "",
        ingredients: post?.ingredients || "",
        recipe: post?.recipe || "",
        time: post?.time || "10",
        image: null 
      });

  const [error, setError] = useState("");
  const { handleCloseModal } = useModal(); 

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        ingredients: post.ingredients,
        recipe: post.recipe,
        time: post.time.toString(),
        
      });      
      
    }
  }, [post]);

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostData({ ...postData, image: file });
      
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();    
    try {
      const accessToken = Cookies.get("access");
      await axiosFormData.put(`/posts/${post.id}/`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      handleCloseModal();
    } catch (error) {
      setError("Something went wrong!");
    }
  };
  
};

export default PostEditForm;

