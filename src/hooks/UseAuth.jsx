import { axiosJson } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom"; 
import { useSetCurrentUser } from "../contexts/CurrentUserContext";


export function useAuth() {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();


  
   // Register a new user
   async function register(username, email, password) {
    try {
      const response = await axiosJson.post("/users/register/", { username, email, password });
      if (response.status === 200 || response.status === 201) {        
        setCurrentUser({ isLoggedIn: true });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }


  
  // Login an existing user
  async function login(username, password) {
    try {
      const response = await axiosJson.post("/users/login/", { username, password });
      if (response.status === 200) {
        
        setCurrentUser({ isLoggedIn: true }); 
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }


  // Logout current user, backend will revoke the refresh token
  async function logout() {
    try {
      await axiosJson.post("/users/logout/");      
      setCurrentUser(null);      
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  return { register, login, logout };
}
