import { axiosJson } from "../api/axiosConfig";
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";

export function useAuth() {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const setCookies = (accessToken, refreshToken) => {
    Cookies.set("access", accessToken, { path: "/", sameSite: "lax" });
    Cookies.set("refresh", refreshToken, {
      path: "/token/refresh/",
      sameSite: "lax"
    });
  };

  // Register a new user
  async function register(username, email, password) {
    try {
      const response = await axiosJson.post("/users/register/", {
        username,
        email,
        password
      });

      if (response.status === 200 || response.status === 201) {
        setCurrentUser({ isLoggedIn: true });
        setCookies(response.data.access, response.data.refresh);
        navigate("/dashboard");
      }
    } catch (error) {
      throw error;
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
        setCurrentUser({ isLoggedIn: true });
        setCookies(response.data.access, response.data.refresh);
        navigate("/dashboard");
      }
    } catch (error) {
      throw error;
    }
  }
  // Logout current user, backend will revoke the refresh token

  const removeCookies = () => {
    Cookies.remove("access", { path: "/" });
    Cookies.remove("refresh", { path: "/token/refresh/" });
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
