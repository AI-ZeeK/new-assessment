import axios from "axios";
const API = axios.create({
  baseURL: `https://newassessment.onrender.com`,
  //   baseURL: `http://localhost:5000`,
});
const API_URL = "/api/auth/";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("access-user") as string).token
    }`;
  }

  return req;
});
// Login User
const login = async (userData: any) => {
  console.log(userData);
  const {data} = await API.post(API_URL, userData);
  if (data) {
    localStorage.setItem("access-user", JSON.stringify(data));
  }

  return data.user;
};

// Logout user
const logout = () => {
  localStorage.removeItem("access-user");
};

const authService = {
  logout,
  login,
};

export default authService;
