import React, { useEffect } from "react";
import { axiosJson } from "../api/axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";

export function useAuth() {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const setCookies = (accessToken, refreshToken) => {
    const secure = window.location.protocol.includes("https");
    Cookies.set("jwt_access", accessToken, {
      path: "/",
      sameSite: "Lax",
      secure: secure,
    });
    Cookies.set("jwt_refresh", refreshToken, {
      path: "/token/refresh/",
      sameSite: "Lax",
      secure: secure,
    });
  };

  // Register a new user
  async function register(username, email, password) {
    try {
      const response = await axiosJson.post("/users/register/", { username, email, password });
      if (response.status === 201) {
        login(username, password); 
      }
    } catch (error) {
      console.error("Registration failed:", error.response || error.message);
    }
  }

  // Login an existing user
  async function login(username, password) {
    try {
      const response = await axiosJson.post("/users/login/", {
        username,
        password
      });
      if (response.status === 200) {
        const { access, refresh, user_id } = response.data;
        setCookies(access, refresh);

        setCurrentUser({ isLoggedIn: true, userId: user_id });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  // Logout current user, backend will revoke the refresh token

  const removeCookies = () => {
    const secure = window.location.protocol.includes("https");
    Cookies.remove("jwt_access", { path: "/", sameSite: "Lax", secure: secure });
    Cookies.remove("jwt_refresh", { path: "/token/refresh/", sameSite: "Lax", secure: secure });
  };

  

  

  async function logout() {
    try {
      const response = await axiosJson.post("/users/logout/");
      if (response.status === 200) {
        removeCookies();
        setCurrentUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error.response || error.message);
    }
  }

  return { register, login, logout };
}
