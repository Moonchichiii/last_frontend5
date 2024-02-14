export function useAuth() {
  const setCurrentUser = useContext(SetCurrentUserContext);

  async function register(username, email, password) {
    try {
      const response = await axiosJson.post("/users/register/", {
        username,
        email,
        password1: password,
        password2: password,
      });

      setCurrentUser(response.data.user);
    } catch (error) {
      throw error;
    }
  }

  async function login(username, password) {
    try {
      const response = await axiosJson.post("/users/token/", {
        username,
        password,
      });
      setCurrentUser(response.data.user);
    } catch (error) {
      throw error;
    }
  }

  const logOut = () => {
    setToken(null);
    setUser(null);
    setErrors({});
  };

  return { register, login };
}
