import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Button, Form, Alert } from "react-bootstrap";
import { axiosFormData } from "../../api/axiosConfig";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const PostForm = () => {
  const currentUser = useContext(CurrentUserContext);
  console.log("Current user:", currentUser);

  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    time: "10",
    image: null
  });

  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const [selectedTime, setSelectedTime] = useState(10);
  const cookingTimeOptions = [
    { label: "10 minutes", value: 10 },
    { label: "15 minutes", value: 15 },
    { label: "20 minutes", value: 20 },
    { label: "25 minutes", value: 25 },
    { label: "30 minutes", value: 30 },
    { label: "40 minutes", value: 40 },
    { label: "50 minutes", value: 50 },
    { label: "1 hour", value: 60 },
    { label: "2 hours", value: 120 },
    { label: "3 hours", value: 180 },
    { label: "4 hours", value: 240 },
    { label: "4 hours or more", value: 270 }
  ];

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
    setPostData({ ...postData, time: selectedTime });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostData({ ...postData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const accessToken = Cookies.get("access");
      const response = await axiosFormData.post("/posts/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      setError("Something went wrong during the post!");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Recipe Posting</h2>
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="ingredients"
            value={postData.ingredients}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recipe</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="recipe"
            value={postData.recipe}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cooking Time</Form.Label>
          <Form.Control
            as="select"
            name="time"
            value={postData.time}
            onChange={handleChange}
            required
          >
            {cookingTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
