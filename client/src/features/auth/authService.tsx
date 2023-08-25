import axios from "axios";
import {baseUrl} from "../../constants/constants";
const API = axios.create({
  baseURL: baseUrl,
});
const API_URL = "/api/auth/";
const USER_API_URL = "/api/user";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access-token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access-token") as string
    )}`;
  }

  return req;
});
// Login User
const login = async (userData: any) => {
  const {data} = await API.post(API_URL, userData);
  if (data) {
    localStorage.setItem(
      "access-user",
      JSON.stringify({...data.user, profilePhoto: null})
    );
    localStorage.setItem("access-token", JSON.stringify(data.token));
  }

  return data.user;
};

// Logout user
const logout = () => {
  localStorage.removeItem("access-user");
  localStorage.removeItem("access-token");
};

export const updateProfilePhotoApi = async (id: string, profilePhoto: any) => {
  console.log(profilePhoto);
  const {data} = await API.patch(
    `${USER_API_URL}/profile/${id}`,
    {
      profilePhoto,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (data) {
    localStorage.setItem("access-user", JSON.stringify(data));
  }

  return data;
};
const getUser = async (id: string) => {
  const {data} = await API.get(`${USER_API_URL}/my/${id}`);

  if (data) {
    localStorage.setItem(
      "access-user",
      JSON.stringify({...data, profilePhoto: null})
    );
  }
  return data;
};
const updateBio = async (id: string, bio: string) => {
  const {data} = await API.patch(`${USER_API_URL}/bio/${id}`, {bio});
  if (data) {
    localStorage.setItem(
      "access-user",
      JSON.stringify({...data, profilePhoto: null})
    );
  }
  return data;
};

const authService = {
  logout,
  login,
  getUser,
  updateBio,
};

export default authService;
