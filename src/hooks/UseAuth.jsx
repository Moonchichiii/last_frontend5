import { axiosJson } from "../api/axiosConfig";
import { useContext } from "react";

import { SetCurrentUserContext } from "../contexts/CurrentUserContext";

export function useAuth() {
  const setCurrentUser = useContext(SetCurrentUserContext);

  // Register a new user
  async function register(username, email, password) {
    try {
      const response = await axiosJson.post("users/register/", {
        username,
        email,
        password
      });

      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }
// Login an existing user
  async function login(username, password) {
    try {
      const response = await axiosJson.post("users/login/", {
        username,
        password
      });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }
// Logout current user, backend will revoke the refresh token 
  async function logout() {
    try {
      await axiosJson.post("users/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  return { register, login, logout };
}
