import React, { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { useModal } from "../../contexts/ModalContext";

const LoginForm = () => {
  const { login } = useAuth();
  const { handleCloseModal } = useModal();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //  handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      handleCloseModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Login failed due to an unexpected error.";
      setErrors({ ...errors, login: errorMessage });
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
        </div>

        {errors.login && (
          <div className="alert alert-danger">{errors.login}</div>
        )}

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
