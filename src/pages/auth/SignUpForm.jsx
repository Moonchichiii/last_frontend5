import React, { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { useModal } from "../../contexts/ModalContext";

const RegistrationForm = () => {
  const { register } = useAuth();
  const { handleCloseModal } = useModal();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register(formData.username, formData.email, formData.password);
      handleCloseModal();
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
